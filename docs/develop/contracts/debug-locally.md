---
id: debug-locally
title: Debug Testnet or Mainnet Contract Locally
sidebar_label: Debug Locally
---

After contracts are deployed on testnet or mainnet, you might still experience corner case of:

- contract execution logic does not happen in expected way;
- storage usage is higher than expected;
- gas cost is higher than expected.

In these cases, you may want to capture the contract state and function call arguments to debug in the local sandbox. You'll make incremental changes, test locally until everything works as expected. You will also likely want to keep the test fixtures to avoid regression in future.

## Obtain States and Other Parameters from Testnet/Mainnet

The following things determined the contract call results:

- Contract code and state;
- Node's genesis config;
- Context data when the transaction happens, like current epoch, block height, etc;
- Caller (signer) of the transaction and arguments.

We'll need to obtain all these information to reproduce the contract call locally.

### Contract Code and State

You most likely already have the contract code you've deployed. But in case you don't, you can fetch it by `query` RPC:

```
curl https://rpc.testnet.near.org -H 'Content-Type: application/json' -d '{"jsonrpc":"2.0", "id":1, "method":"query", "params":{"request_type":"view_code","block_id": block-height-or-hash,"account_id":"contract-account"}}'
```

You can also replace the url to `https://rpc.mainnet.near.org` to fetch code from mainnet. This is same for all following RPC requests in this article.

For contract state, there's a few ways of getting it. If your contract state is less than 50Kib, you can fetch it with `query` RPC:

```
curl https://rpc.testnet.near.org -H 'Content-Type: application/json' -d '{"jsonrpc":"2.0", "id":1, "method":"query", "params":{"request_type":"view_state","block_id":block-height-or-hash,"account_id":"contract-account","prefix_base64":""}}'
```

Otherwise, you need to run a testnet or mainnet node with `nearup`, and wait it fully synced. Then you can either use `state-viewer` to aggreggate entire state to a new genesis, or use `state-viewer` to export state from only specified contracts.

### Node's Genesis Config

This can be obtained by [Genesis Config RPC](https://docs.near.org/docs/api/rpc#genesis-config)

### Context Data when Execute the Contract

This can be found by inspect the transaction information on Explorer. This should be combined with the above two sections to form a new genesis. We're going to build a tool to automate this process. For now we'll just manually edit genesis config.

### Caller of the Transaction and Arguments.

You'll also found them in explorer. If you do not control keys of the transaction caller (signer), you can use the patch_state API to add your public key to account.
