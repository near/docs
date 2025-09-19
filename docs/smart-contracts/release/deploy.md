---
id: deploy
title: NEAR CLI - Basics
sidebar_label: Deploying and Using
description: "Learn how to deploy a NEAR contract using NEAR CLI and interact with its methods securely."
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

After your contract is ready you can deploy it in the NEAR network for everyone to use it.

Let us guide you on how to use the [NEAR CLI](../../tools/cli.md) to deploy your contract
and call its methods.

:::info
On this page, we will only cover the basics of NEAR CLI. For more information visit the
[NEAR CLI documentation page](../../tools/cli.md).
:::

---

## Deploying the Contract

Thanks to the `NEAR CLI` deploying a contract is as simple as:

1. Compiling the contract to wasm.
2. [Create an account](../../tools/cli.md#create) and [deploy the contract](../../tools/cli.md#deploy) into it using `NEAR CLI`.

### Compile the Contract

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 JavaScript">

  ```bash
  yarn build
  ```

  </TabItem>

  <TabItem value="rust" label="🦀 Rust">

  ```bash
  cargo near build
  ```

  </TabItem>

</Tabs>

### Create an Account and Deploy


<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  # Create a new account pre-funded by a faucet
  near create-account <accountId> --useFaucet

  # deploy the contract
  near deploy <accountId> <route_to_wasm>
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  # Create a new account pre-funded by a faucet
  near account create-account sponsor-by-faucet-service <my-new-dev-account>.testnet autogenerate-new-keypair save-to-keychain network-config testnet create

  # deploy the contract
  near contract deploy <my-new-dev-account>.testnet use-file <route_to_wasm> without-init-call network-config testnet sign-with-keychain
  ```
  </TabItem>
</Tabs>


### Deploy in an Existing Account

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  # login into your account
  near login

  # deploy the contract
  near deploy <accountId> <route_to_wasm>
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  # login into your account
  near account import-account using-web-wallet network-config testnet

  # deploy the contract
  near contract deploy <accountId> use-file <route_to_wasm> without-init-call network-config testnet sign-with-keychain send
  ```
  </TabItem>
</Tabs>

:::tip
You can overwrite a contract by deploying another on top of it. In this case, the account's logic
will change, but the state will persist
:::

:::info
By default `near-cli` uses the `testnet` network. Define `NEAR_ENV=mainnet` to deploy into `mainnet`.
:::

:::info Naming Convention for Public-Facing Methods
Once the contract is deployed to the network, anyone and any other contract (i.e., any other account on NEAR) can interact with it by calling its methods. Furthermore, any transactions involving the contract will also be included in the network's data stream, which means its activity can also be visible to any who listens to particular events.

Considering this, we advise to name methods using `snake_case` in all SDKs as this is compatible with the remainder of the NEAR ecosystem which is predominantly comprised of Rust contracts.
:::

---

## Initializing the Contract
If your contract has an [initialization method](../anatomy/storage.md) you can call it to
initialize the state. This is not necessary if your contract implements `default` values for the state.

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  # Call the initialization method (`init` in our examples)
  near call <contractId> <initMethod> [<args>] --accountId <accountId>
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  # Call the initialization method (`init` in our examples)
  near contract call-function as-transaction <contractId> <initMethod> json-args [<args>] prepaid-gas '30 TeraGas' attached-deposit '0 NEAR' sign-as <accountId> network-config testnet sign-with-keychain send
  ```
  </TabItem>
</Tabs>

:::info
You can initialize your contract [during deployment](#deploying-the-contract) using the `--initFunction` & `--initArgs` arguments.
:::

---

## Calling the Contract

Once your contract is deployed you can interact with it right away using [NEAR CLI](../../tools/cli.md).

<hr className="subsection" />

### View methods
View methods are those that perform **read-only** operations. Calling these methods is free, and do not require to specify which account is being used to make the call:

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near view <contractId> <methodName>
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  near contract call-function as-read-only <contractId> <methodName> text-args '' network-config testnet now
  ```
  </TabItem>
</Tabs>

:::tip
View methods have by default 200 TGAS for execution
:::

<hr className="subsection" />

### Change methods

Change methods are those that perform both read and write operations. For these methods we do need to specify the account being used to make the call,
since that account will expend GAS in the call.

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near call <contractId> <methodName> <jsonArgs> --accountId <yourAccount> [--deposit <amount>] [--gas <GAS>]
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  near contract call-function as-transaction <AccountId> <MethodName> json-args <JsonArgs> prepaid-gas <PrepaidGas> attached-deposit <AttachedDeposit> sign-as <AccountId>  network-config testnet sign-with-keychain send
  ```
  </TabItem>
</Tabs>
