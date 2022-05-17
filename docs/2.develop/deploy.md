---
id: deploy
title: Deploy and Use
sidebar_label: Deploy and Use
---
Once you finished developing and testing your smart contract you will want to deploy it, so you and other people can start using it. The steps bellow are the same for both the `testnet` and `mainnet` networks. We strongly recommend you to **first release in** `testnet`, where users can use NEAR toy-tokens to test your app. Gather as much feedback as possible, test thoughtfully, and then release into `mainnet`.

---

## Deploy
In order to deploy your smart contract into a specific address on you will need to:

1. Create the account you want through the [NEAR wallet](https://wallet.testnet.near.org)
2. Compile the contract to wasm (done automatically through `yarn build` in our templates)
3. Deploy it in the desired account using the [NEAR Command Line Interface (CLI)](/concepts/tools/near-cli)

```bash
# Login to NEAR
near login

# Deploy wasm to the account
near deploy <route_to_wasm> --masterAccount <accountId>
```

:::tip
To deploy into `mainnet` you can set the `NEAR_ENV` variable to mainnet (`export NEAR_ENV=mainnet`), or use the `--networkId mainnet` attribute in NEAR CLI
:::

---

## Use
In order to interact with your smart contracts you have several options. Here we will only briefly mention how to use the [NEAR CLI](/concepts/tools/near-cli). However, the most probable case is that you want to develop a web-app with a professional frontend. For this, we recommend you to visit the next section [Adding a Frontend](./frontend.md).

#### View methods
Calling a view method is as simply as:

```bash
near view <accountId> <methodName>
```

#### Change methods

```bash
near call <accountId> <methodName> <args> --attachDeposit <amount> --masterAccount <yourAccount>
```