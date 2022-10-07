---
id: deploy
title: NEAR CLI - Basics
sidebar_label: Deploying and Using
---

After your contract is ready you can deploy it in the NEAR network for everyone to use it.

Let us guide you on how to use the [NEAR CLI](../4.tools/cli.md) to deploy your contract
and call its methods.

---

## Deploying a Contract

Thanks to the `NEAR CLI` deploying a contract is as simple as:

1. Compiling the contract to wasm (done automatically through `yarn build` in our templates).
2. Deploy it into the desired account using the [NEAR CLI](../4.tools/cli.md):

```bash
# Login to NEAR
near login

# Deploy wasm to the <accountId> account
near deploy <accountId> <route_to_wasm>
```

:::tip
By default the contract will be deployed to the testnet. To deploy into `mainnet` you can set the `NEAR_ENV` variable to mainnet (`export NEAR_ENV=mainnet`).
:::

:::tip
You can use `near dev_deploy` to deploy the contract into a newly created account!
:::

---

## Calling the Contract
Once your contract is deployed you can interact with it using your favorite shell. For this, you can use the [NEAR CLI](../4.tools/cli.md).
Please notice that in this page we will only touch on how to use NEAR CLI to call methods in a contract. For the full documentation please visit the
[NEAR CLI documentation page](../4.tools/cli.md).

<hr class="subsection" />

## View methods
View methods are those that perform **read-only** operations. Calling these methods is free, and do not require to specify which account is being used to make the call:

```bash
near view <accountId> <methodName>
```

:::tip
View methods have by default 200 TGAS for execution
:::

<hr class="subsection" />

## Change methods
Change methods are those that perform both read and write operations. For these methods we do need to specify the account being used to make the call,
since that account will expend GAS in the call.

```bash
near call <contractId> <methodName> <jsonArgs> --accountId <yourAccount> [--attachDeposit <amount>] [--gas <GAS>]
```