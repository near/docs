---
id: debug-locally
title: Debug Testnet or Mainnet Contract Locally
sidebar_label: Debug Locally
---

After contracts are deployed on `testnet` or `mainnet` you might still experience corner case of:

- Contract execution logic does not happen expectedly.
- Storage usage is higher than expected.
- Gas cost is higher than expected.

In these cases, you may want to capture the contract state and function call arguments to debug in the local sandbox. You'll make incremental changes and test locally until everything works as expected. You will also likely want to keep the test fixtures to avoid regression in future.

The following things determine the contract call results:

- Contract code and state.
- Node's genesis config.
- Context data when the transaction happens like the current epoch, block height, gas price, etc.
- Caller (signer) of the transaction and arguments.

Except for the caller and arguments, which you already know other three information. If you don't, for example, in the case of a third party contract calling into your account, then you can find arguments from [NEAR explorer](https://explorer.testnet.near.org). The first three pieces of information are all related to the blockchain state when the transaction happened. Therefore, a "snapshot" of blockchain has to be captured to obtain this information and load it into the near sandbox. You can either load them automatically with a script or manually if you're interested to know every aspect of how a transaction is affected by blockchain status.

## Obtain Information from Testnet/Mainnet automatically

First clone the repro script repo and install dependency:

```bash
git clone https://github.com/near/repro-near-funcall.git
cd repro-near-funcall
npm i
```

To fetch the transaction in problem, you need to provide a few things:

- Sandbox node's home directory, which you were used to spin up the local sandbox node.
- Accounts and contract accounts that were used during the transaction.
- If it's on mainnet, the mainnet rpc URL.

For example:

```bash
node get-sandbox-repro-genesis.js \
  -c contract1 -c contract2 \
  -a account1 -a account2 -a account3 \
  -s /tmp/near-sandbox
  -u https://rpc.mainnet.near.org
```

This script will fetch account, contract, and blockchain state and generate and synthesize the genesis file replacing the current sandbox's genesis file. The old genesis file will be backed up as `genesis.json.bak`. You can now simply start the sandbox node as before, and it has accounts and contracts state loaded. Just send the transaction with `near-cli` or write a test, and you'll see the reproduced transaction executed on the sandbox node.

## Obtain Information from Testnet/Mainnet Manually

Usually use the above script to fetch all information to reproduce is the most effortless way. But if you want to know every detail on how transaction execution is affected by the status of blockchain, you can follow this section to fetch the information manually.

The information we needed can be divided into three categories, each of which is configured differently:

1. Genesis config
2. State records
3. Parameter provided when sending transaction

### Genesis config

The context data when a transaction happens such as the current epoch, block height, gas price, etc., as well as `testnet`/`mainnet` specific configurations (block time / the gas amount for different kinds of actions) are all part of this category. This parameter can only be set by starting a local sandbox node from a modified version of the genesis file.
The first thing you'll need to do is fetch the `testnet`/`mainnet` genesis config. This can be obtained by the [Genesis Config RPC](https://docs.near.org/docs/api/rpc#genesis-config). Use the response file to replace the sandbox's `genesis.json`. Once complete, you will have the same configuration as `testnet`/`mainnet` in the sandbox aside from the protocol version, block height, and block timestamp. This is because genesis indicates the start of the most recent hard fork of `testnet`/`mainnet` but many blocks have been produced, protocol versions released, and time has passed the blockchain genesis. If your contract logic doesn't depend on these parameters the sandbox node should give you accurate logic, gas, and storage simulation. However, if you do require info like certain epoch and block height details you can modify `"genesis_height"` and `"protocol_version"` on your `genesis.json` file.

Simply changing `"genesis_time"` won't affect. In addition, there's going to be a time travel RPC for you to tweak block timestamps. Also, note a transaction cannot be controlled to be precisely scheduled of a given height and you should not have absolute block number in test logics. This is because it's not controllable in a real node so your contract logic shouldn't rely on that. More commonly, you most likely want to depend on how many blocks or how much time has passed. This is a relative number and you may want to base on the parameters at the time the block was produced, such as a validator set, protocol feature availability, etc. These are tied to [epoch](/docs/concepts/epoch) rather than the individual block so you don't have to strictly depend on a given block number.

### State Records

Every state stored on the NEAR Blockchain including contract code, contract states, accounts, and access keys is in the form of state records. To run a node having an equivalent state as a `testnet`/`mainnet` node you need to apply the same state records as `testnet`/`mainnet`. You don't need to apply all states which can be many gigabytes but only those contract code/state and account keys that were used in the transaction. Once you have these state records you can apply them by either placing them in the `"records"` section of genesis _before_ starting the sandbox or use `sandbox_patch_state` RPC to add them dynamically _after_ starting the sandbox. Let's see how these state records can be obtained:

**Contract code:**

Most likely you already have the contract code you've deployed but in case you don't you can fetch it by `query` RPC:

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
