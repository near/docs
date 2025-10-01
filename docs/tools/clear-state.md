---
id: clear-state
title: Clear Contract State
description: "This simple command-line tool allows you to clean up the state of a NEAR account without deleting it."
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Github} from "@site/src/components/UI/Codetabs";


This simple command-line tool allows you to clean up the state of a NEAR account without deleting it.

## How it works

This JavaScript CLI tool deploys a [`state-cleanup.wasm`](https://github.com/near-examples/near-clear-state/blob/main/contractWasm/state_cleanup.wasm) contract replacing the current one, and then uses the new contract to clean up the account's state, so you can easily redeploy a new contract or use the account in any other way.

Here's a quick snippet of the contract's main code:

<Github language="rust" url="https://github.com/near-examples/near-clear-state/blob/main/state-cleanup/src/lib.rs" start="21" end="24" />

:::tip Want to check the smart contract?

Check the GitHub repository and learn more about the [State Cleanup tool](https://github.com/near-examples/near-clear-state).

<!-- https://github.com/nameskyteam/state-cleanup -->

:::


---

## How to use


### Requirements

You'll need [NEAR CLI](cli.md). You can install it by running:

```bash
npm install -g near-cli-rs@latest
```

### Clear your Account State

To clear your Account state, follow these steps.

#### 1. Login with NEAR CLI

This will store a full access key locally on your machine.
Select the account you wish to clear the state.

```bash
near login
```

:::warning Legacy keychain
Be sure to select `Store the access key in my legacy keychain (compatible with the old near CLI)` to store the access key on the legacy keychain.
:::

#### 2. Clone the `near-clear-state` Repository

```sh
git clone https://github.com/near-examples/near-clear-state.git
```

#### 3. Install dependencies

```bash
cd near-clear-state && npm i
```

#### 4. Clear your State

```bash
npx near-clear-state clear-state --account <account-name.testnet>
```

:::tip mainnet

If you want to clean the state of a `mainnet` account, use the `--network` option:

```sh
npx near-clear-state clear-state --account <account-name.near> --network mainnet
```

:::

#### (Optional) Check your results

You can view the all the state keys have been erased in your account with:

```bash
near view-state <account-name.testnet>
```

---

## Troubleshooting

If your contract state is large, depending on the RPC node, you may get the error:

```
State of contract example.near is too large to be viewed.
```

This is an RPC issue, as the RPC node has a limited contract state view.

You can prevent the error `State of contract example.near is too large to be viewed` when calling view-state via the JSON RPC API if you select an alternative RPC provider. You can find different providers in [this RPC list](../api/rpc/providers.md).

<Github language="javascript" url="https://github.com/near-examples/near-clear-state/blob/main/commands/clearState.js" start="22" end="30" />

For example, you could replace the default RPC node in [`commands/clearState.js`](https://github.com/near-examples/near-clear-state/blob/main/commands/clearState.js) with another RPC server:

```js
config = {
  networkId: netId,
  keyStore,
  nodeUrl: "https://endpoints.omniatech.io/v1/near/"+ netId +"/public",
  ...
```
