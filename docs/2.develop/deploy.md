---
id: deploy
title: NEAR CLI - Basics
sidebar_label: Deploying and Using
---

After your contract is ready you can deploy it in the NEAR network for everyone to use it.

Let us guide you on how to use the [NEAR CLI](../4.tools/cli.md) to deploy your contract
and call its methods.

:::info
On this page, we will only cover the basics of NEAR CLI. For more information visit the
[NEAR CLI documentation page](../4.tools/cli.md).
:::

---

## Deploying the Contract

Thanks to the `NEAR CLI` deploying a contract is as simple as:

1. Compiling the contract to wasm (done automatically through `yarn build` in our templates).
2. Deploy it into the desired account using the [NEAR CLI](../4.tools/cli.md#near-deploy):

#### Create an Account and Deploy
```bash
# Automatically deploy the wasm in a new account
near dev-deploy <route_to_wasm>

# Get the account name
cat ./neardev/dev-account
```

#### Deploy in an Existing Account
```bash
# login into your account
near login

# deploy the contract
near deploy <accountId> <route_to_wasm>
```

:::tip
You can overwrite a contract by deploying another on top of it. In this case, the account's logic
will change, but the state will persist
:::

:::info
By default `near-cli` uses the `testnet` network. Define `NEAR_ENV=mainnet` to deploy into `mainnet`.
:::

---

## Initializing the Contract
If your contract has an [initialization method](./contracts/anatomy.md#initialization-functions) you can call it to
initialize the state. This is not necessary if your contract implements `default` values for the state. 

```bash
# Call the initialization method (`init` in our examples)
near call <contractId> <initMethod> [<args>] --accountId <accountId>
```

:::info
You can initialize your contract [during deployment](#deploying-the-contract) using the `--initFunction` & `--initArgs` arguments.
:::

---

## Calling the Contract
Once your contract is deployed you can interact with it right away using [NEAR CLI](../4.tools/cli.md).

<hr class="subsection" />

### View methods
View methods are those that perform **read-only** operations. Calling these methods is free, and do not require to specify which account is being used to make the call:

```bash
near view <contractId> <methodName>
```

:::tip
View methods have by default 200 TGAS for execution
:::

<hr class="subsection" />

### Change methods
Change methods are those that perform both read and write operations. For these methods we do need to specify the account being used to make the call,
since that account will expend GAS in the call.

```bash
near call <contractId> <methodName> <jsonArgs> --accountId <yourAccount> [--deposit <amount>] [--gas <GAS>]
```
