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