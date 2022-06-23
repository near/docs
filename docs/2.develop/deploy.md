---
id: deploy
title: Deploy
---
Once you finished developing and testing your smart contract you will want to deploy it, so you and
other people can start using it. Thanks to the `NEAR CLI` this is a very simple task which will take
you only two steps:

1. Compile the contract to wasm (done automatically through `yarn build` in our templates)
2. Deploy it into the desired account using the [NEAR Command Line Interface (CLI)](/concepts/tools/near-cli)

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

<blockquote class="info">
<strong>How do dApp updates work? Does a new app version get registered as a separate app on a new block or are they linked somehow?</strong><br /><br />
  
You can update your dApp by deploying to an account for which you own full access keys. The updated function calls (like called using near-cli with near view and near call, for instance) will work as expected with the new logic. Note that state will persist. For instance, if the initial version of the smart contract sets the variable foo = “bar”, an update removes the usage, and a final update brings back the variable foo, the state will persist. That is, updating and deploying a new version of a smart contract will not wipe out the previous state. In the traditional web 2 world, you may think of it like removing a server but leaving the external database instance.

NEAR is organized around `accounts`. Contract code is deployed 1:1 against an account and updating that contract replaces the code associated with that account. See [Key Concepts: Account](/docs/concepts/account) for more detail.
</blockquote>