---
id: debug-locally
title: Debug Testnet or Mainnet Contract Locally
sidebar_label: Debug Locally
---

After contracts are deployed on `testnet` or `mainnet` you might still experience corner case of:

- contract execution logic does not happen in expected way;
- storage usage is higher than expected;
- gas cost is higher than expected.

In these cases, you may want to capture the contract state and function call arguments to debug in the local sandbox. You'll make incremental changes, test locally until everything works as expected. You will also likely want to keep the test fixtures to avoid regression in future.

## Obtain States and Other Parameters from Testnet/Mainnet

The following things determined the contract call results:

- Contract code and state;
- Node's genesis config;
- Context data when the transaction happens, like current epoch, block height, gas price etc;
- Caller (signer) of the transaction and arguments.

We'll need to obtain all this information to reproduce the contract call locally. This information can be divide into three categories, each of them is configured in a different way:

- Genesis config
- State records
- Parameter provided when sending transaction

### Genesis config

The context data when transaction happens, like current epoch, block height, gas price etc. and testnet/mainnet specific configuration such as block time, gas amount for different kind of actions all come into this category. This parameters can only be set by start a local sandbox node from a modified version of genesis file.
First thing you need is fetch testnet/mainnet genesis config. This can be obtained by [Genesis Config RPC](https://docs.near.org/docs/api/rpc#genesis-config). Use response file to replace sandbox's genesis.json. Now we have the same configuration as the testnet/mainnet in sandbox. But there's still something different: protocol version, block height and block timestamp. This is because genesis indicates the start of the most recent hard fork of testnet/mainnet, but many blocks and time has passed since the genesis. There's also protocol version upgrades since genesis. If your contract logic doesn't depend on these parameters replay contract method on such parameters, sandbox node should give you accurate logic, gas and storage simulation. However if you do require info like certain epoch and block height, you can modify `"genesis_height"`, `"protocol_version"` on genesis.json.

Change `"genesis_time"` won't have effect. There's going to be a time travel RPC for you to tweak block timestamps. Also note a transaction cannot be controlled to be precisely scheduled of a given height and you should not have absolute block number in test logics. This is because it's not controllable in a real node so your contract logic shouldn't rely on that. More common you want to depend on how many blocks or times have passed, that's a relative number. And you may want to base on the parameters at the time block produced, such as validator set, protocol feature availability etc., these are tied to epoch rather than block, so you don't have to strictly depend on a given block number.

### State Records

Every state stored on NEAR Blockchain including contract code, contract states, accounts, access keys are in the form of state records. To run a node having equivalent state as a testnet/mainnet node you need to apply same state records as the testnet/mainnet. You don't need to apply all states which is many gigabytes, but only those contract code/state and account keys that were used in the transaction. Once you have these state records, you can apply them by either place them in the `"records"` section of genesis before starting sandbox, or use `sandbox_patch_state` RPC to add them dynamically after starting sandbox. Let's see how state records can be obtained:

For contract code, Most likely you already have the contract code you've deployed. But in case you don't, you can fetch it by `query` RPC:

```
curl https://rpc.testnet.near.org -H 'Content-Type: application/json' -d '{"jsonrpc":"2.0", "id":1, "method":"query", "params":{"request_type":"view_code","block_id": block-height-or-hash,"account_id":"contract-account"}}'
```

You can also replace the url to `https://rpc.mainnet.near.org` to fetch code from mainnet. This is same for all following RPC requests in this article.

For contract state, there's a few ways of getting it. If your contract state is less than 50Kib, you can fetch it with `query` RPC:

```
curl https://rpc.testnet.near.org -H 'Content-Type: application/json' -d '{"jsonrpc":"2.0", "id":1, "method":"query", "params":{"request_type":"view_state","block_id":block-height-or-hash,"account_id":"contract-account","prefix_base64":""}}'
```

Otherwise, you need to run a testnet or mainnet node with `nearup`, and wait it fully synced. Then you can either use `state-viewer` to aggreggate entire state to a new genesis, or use `state-viewer` to export state from only specified contracts.

For account and access key, you can use [view account](https://docs.near.org/docs/api/rpc#view-account) and [view access keys](https://docs.near.org/docs/api/rpc#view-access-key-list) RPCs, respectively.

### Parameter provided when sending transaction

This can be found by inspect the transaction information on Explorer. This is majorly the function call arguments, gas attached, deposit attached and the signer of the transaction. If you do not control keys of the transaction caller (signer), you can use the patch_state RPC to add your public key to account.
