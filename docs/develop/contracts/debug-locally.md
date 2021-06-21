---
id: debug-locally
title: Debug Testnet or Mainnet Contract Locally
sidebar_label: Debug Locally
---

After contracts are deployed on `testnet` or `mainnet` you might still experience one of the following corner cases:

- Contract execution logic does not happen expectedly.
- Storage usage is higher than expected.
- Gas cost is higher than expected.

In these cases, you may want to capture the contract state and function call arguments to debug in the local sandbox. You'll make incremental changes and test locally until everything works as expected. You will also likely want to keep the test fixtures to avoid regression in future.

Except for the contract caller and arguments passed, the following things determine the contract call results:

- Contract code and state.
- Node's genesis config.
- Context data when the transaction happens like the current epoch, block height, gas price, etc.
- Caller (signer) of the transaction and arguments.

If you do not have the contract caller or args (Ex. A third party contract calling your account) then you can find the arguments from [NEAR Explorer](https://explorer.testnet.near.org). The first three pieces of information are all related to the blockchain state when the transaction happened. Therefore, a "snapshot" of blockchain has to be captured to obtain this information and load it into the NEAR Sandbox. You can either load them automatically with a script or manually if you're interested to know every aspect of how a transaction is affected by blockchain status.

## Obtain Information from Testnet/Mainnet automatically

First clone the repro script repo and install dependency:

```bash
git clone https://github.com/near/repro-near-funcall.git
cd repro-near-funcall
npm i
```

To fetch the transaction in question, you need to provide a few things:

- Sandbox node's home directory, which you were used to spin up the local sandbox node.
- Accounts and contract accounts that were used during the transaction.
- If it's on mainnet, the mainnet rpc URL.
- Block number or hash before the transaction to reproduce what happened. This tool fetches the latest state, if not given, which might not be the state you want if this transaction has mutated the blockchain state.

For example:

```bash
node get-sandbox-repro-genesis.js \
  -c contract1 -c contract2 \
  -a account1 -a account2 -a account3 \
  -s /tmp/near-sandbox \
  -u https://rpc.mainnet.near.org \
  -b 123456
```

This script will fetch an account, contract, and blockchain state then generate and synthesize the genesis file replacing it with the current sandbox's genesis file. The old genesis file will be backed up as `genesis.json.bak`. You can now simply start the sandbox node as before and it will now have account and contract state loaded. Just send the transaction with `near-cli` or write a test and you'll see the reproduced transaction executed on the sandbox node.

### Reproduce a `testnet` Cross Contract Call on a Sandbox Node

Let's reproduce a `testnet` cross-contract call transaction in the simplest way possible using two contracts; `simple_state` and `cross-contract`. We'll use this example to demonstrate how to reproduce it locally with the sandbox node.

The `simple-state` contract has a `set_status` method which stores a string for the signer of the transaction. The `cross-contract` contract has a `set_in_other_contract` method which simply forwards a string to the `simple-state` contract and calls it's `set_status` method. 

#### Preparation

First, let's deploy the contracts and have a transaction to reproduce on `testnet`. 

Go to the `repro-near-funcall` repo we just cloned and run the following commands to create `testnet` accounts, deploy contracts, and submit a transaction:

```bash
# Replace with your testnet account
export REPRO_ACCOUNT=your-testnet-account.testnet

# Create subaccount and deploy contracts
near create-account simple-state.$REPRO_ACCOUNT --initialBalance 10 --masterAccount $REPRO_ACCOUNT
near deploy --accountId simple-state.$REPRO_ACCOUNT --wasmFile res/simple_state.wasm
near create-account cross-contract.$REPRO_ACCOUNT --initialBalance 10 --masterAccount $REPRO_ACCOUNT
near deploy --accountId cross-contract.$REPRO_ACCOUNT --wasmFile res/cross_contract.wasm --initFunction new --initArgs "{\"state_contract\":\"simple-state.$REPRO_ACCOUNT\"}"

# Set some state so we can verify the state fetched matches it on testnet
near call simple-state.$REPRO_ACCOUNT set_status --accountId $REPRO_ACCOUNT '{"message":"hello"}'
```

Now let's try to view the status string you set on `testnet`:

```bash
near call simple-state.$REPRO_ACCOUNT get_status "{\"account_id\":\"$REPRO_ACCOUNT\"}" --accountId $REPRO_ACCOUNT
```

If all went correctly, you should see that the message has been set to "hello". It'll also show a link to NEAR Explorer which will display a block hash for this `get_status` transaction. Let's export it to a shell variable as well:

```bash
# Replace with your block hash
export BLOCK=9pNq7bJ2WkYDuGT94x6Hh6jPPer5TC3Qh2dDbon5iPNz
```

It's time to run the transaction on `testnet` which we will then reproduce locally:

```bash
near call cross-contract.$REPRO_ACCOUNT set_in_other_contract --accountId $REPRO_ACCOUNT '{"message":"world"}'
```

After this transaction is complete the status of `$REPRO_ACCOUNT` should be set to "world". You can verify this by calling the `get_status` method again.

```bash
near call simple-state.$REPRO_ACCOUNT get_status "{\"account_id\":\"$REPRO_ACCOUNT\"}" --accountId $REPRO_ACCOUNT```

#### Fetch Information and Reproduce Locally

Now let's reproduce this cross-contract call locally.

1. Spin up a sandbox node by following [this guide](https://docs.near.org/docs/develop/contracts/sandbox). **Don't start the sandbox node yet.**
2. Run the `get-sandbox-repro-genesis` tool to fetch information. This assumes you have the sandbox node's home dir in /tmp/near-sandbox.

```bash
node get-sandbox-repro-genesis.js \
  -c simple-state.$REPRO_ACCOUNT -c cross-contract.$REPRO_ACCOUNT \
  -a $REPRO_ACCOUNT \
  -b $BLOCK \
  -s /tmp/near-sandbox \
  -u https://rpc.testnet.near.org
```

3. Run sandbox node
4. Copy the `$REPRO_ACCOUNT` key from `~/.near-credentials/testnet/$REPRO_ACCOUNT.json` to `~/.near-credentials/local/`.
5. Check that the status is now "hello" in sandbox:

```
export NEAR_ENV=local
near call simple-state.$REPRO_ACCOUNT get_status "{\"account_id\":\"$REPRO_ACCOUNT\"}" --accountId $REPRO_ACCOUNT
```

6. Finally we can reproduce the `testnet` cross-contract transaction:

```
near call cross-contract.$REPRO_ACCOUNT set_in_other_contract --accountId $REPRO_ACCOUNT '{"message":"world"}'
near call simple-state.$REPRO_ACCOUNT get_status "{\"account_id\":\"$REPRO_ACCOUNT\"}" --accountId $REPRO_ACCOUNT
```

You should see that the status has been successfully set to "world". If you're debugging a contract bug and want to avoid regression in the future, it's recommended to keep the genesis generated by `get-sandbox0repro-genesis.js` as a fixture and write a test script to run the transaction on a sandbox node. You can refer to [this doc](https://docs.near.org/docs/develop/contracts/sandbox) about writing sandbox test script.

## Obtain Information from Testnet/Mainnet Manually

Usually, using the above script to fetch all information to reproduce is the most effortless way. But if you want to know every detail on how a transaction execution is affected by the status of the blockchain, you can follow this section to fetch the information manually.

The information needed can be divided into three categories, each of which is configured differently:

1. Genesis config
2. State records
3. Parameter provided when sending the transaction

### Genesis config

The context data when a transaction happens (current epoch, block height, gas price, etc.), as well as `testnet`/`mainnet` specific configurations (block time / the gas amount for different kinds of actions), are all part of this category. This parameter can only be set by starting a local sandbox node from a modified version of the genesis file.
The first thing you'll need to do is fetch the `testnet`/`mainnet` genesis config. This can be obtained by the [Genesis Config RPC](https://docs.near.org/docs/api/rpc#genesis-config). Use the response file to replace the sandbox's `genesis.json`. Once complete, you will have the same configuration as `testnet`/`mainnet` in the sandbox aside from the protocol version, block height, and block timestamp. This is because genesis indicates the start of the most recent hard fork of `testnet`/`mainnet` but many blocks have been produced, protocol versions released, and time has passed since the blockchain genesis. If your contract logic doesn't depend on these parameters the sandbox node should give you accurate logic, gas, and storage simulation. However, if you do require info like certain epoch and block height details you can modify `"genesis_height"` and `"protocol_version"` on your `genesis.json` file.

Simply changing `"genesis_time"` won't have an effect. In addition, there's going to be a time travel RPC for you to tweak the block timestamps. Also, note a transaction cannot be controlled to be precisely scheduled for a given height and you should not have an absolute block number in test logics. This is because it's not controllable in a real node so your contract logic shouldn't rely on that. More commonly, you would likely want to depend on how many blocks or how much time has passed. This is a relative number and you may want to base on the parameters at the time the block was produced, such as a validator set, protocol feature, availability, etc. These are tied to [epoch](/docs/concepts/epoch) rather than the individual block so you don't have to strictly depend on a given block number.

### State Records

Every state stored on the NEAR Blockchain including contract code, contract states, accounts, and access keys is in the form of state records. To run a node having an equivalent state as a `testnet`/`mainnet` node you need to apply the same state records as `testnet`/`mainnet`. You don't need to apply all states, which can be many gigabytes, but only those contract code/state and account keys that were used in the transaction. Once you have these state records you can apply them by either placing them in the `"records"` section of genesis _before_ starting the sandbox or use `sandbox_patch_state` RPC to add them dynamically _after_ starting the sandbox. Let's see how these state records can be obtained:

**Contract code:**

Most likely, you already have the contract code you've deployed but in case you don't you can fetch it by `query` RPC:

```
curl https://rpc.testnet.near.org -H 'Content-Type: application/json' -d '{"jsonrpc":"2.0", "id":1, "method":"query", "params":{"request_type":"view_code","block_id": block-height-or-hash,"account_id":"contract-account"}}'
```

You can also replace the url to `https://rpc.mainnet.near.org` to fetch code from `mainnet`. This is same for all following RPC requests in this article.

**Contract state:**

There are a few ways of getting contract state. If your contract state is less than 50Kib you can fetch it with `query` RPC:

```
curl https://rpc.testnet.near.org -H 'Content-Type: application/json' -d '{"jsonrpc":"2.0", "id":1, "method":"query", "params":{"request_type":"view_state","block_id":block-height-or-hash,"account_id":"contract-account","prefix_base64":""}}'
```

Otherwise, you need to run a `testnet` or `mainnet` node with `nearup` and wait for it fully synced. Then you can either use `state-viewer` to aggregate the entire state to a new genesis or use `state-viewer` to export the state from only specified contracts.

**Account and Access Key:**

For account and access key, you can use [view account](https://docs.near.org/docs/api/rpc#view-account) and [view access keys](https://docs.near.org/docs/api/rpc#view-access-key-list) RPCs, respectively.

### Parameter provided when sending transaction

This can be found by inspecting the transaction information on [NEAR Explorer](/docs/tools/near-explorer). This is majorly the function call arguments, gas attached, deposit attached, and the signer of the transaction. If you do not control the keys of the transaction caller (signer) you can use the `patch_state` RPC to add your public key to the account.
