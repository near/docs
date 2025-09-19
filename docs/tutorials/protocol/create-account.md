---
id: create-account
title: Create a NEAR Account
description: "Understand how to create a NEAR account using a wallet and the NEAR CLI"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

To start developing applications in NEAR you will need a NEAR `testnet` account. This account will allow you to deploy and test your applications without spending any real money.

You can create a `testnet` NEAR account through one of the following methods:

- [Using one of the wallets listed in wallet.near.org](#using-a-wallet)
- [Using the command line interface (CLI)](#through-the-cli)

---

## Using a Wallet

Go to [wallet.near.org](https://wallet.near.org/) and choose one of the wallets listed there. Do not worry, the list has been curated, so you can be sure that all wallets listed there are safe to use.

In general, all wallets will offer similar functionality, so in theory you can choose any of them. However, know that some wallets will readily allow you to create [named accounts](../../protocol/account-id.md#named-address) (e.g. `alice.testnet`), which are easier to remember.

Remember to write down the seed phrase, as it is the only way to access your account!

:::warning Testnet
Make sure to create a `testnet` account (ending with `.testnet`, e.g. `alice.testnet`), and not a `mainnet` account (ending with `.near`). 

NEAR `testnet` is a separate network that allows you to test your applications without spending real money.
:::

:::tip Funding the Wallet

Need `testnet` funds? try using one of our [faucets](../../faucet.md)

:::

---

## Through the CLI

When developing smart contracts you will expend lots of time interacting with the NEAR blockchain through the command line interface (CLI).

First, you will need to install the [NEAR CLI](../../tools/cli.md#installation):

<Tabs>
  <TabItem value="npm">

  ```bash
  npm install -g near-cli-rs@latest
  ```
  </TabItem>
  <TabItem value="Cargo">

  ```
  $ cargo install near-cli-rs
  ```
  </TabItem>
  <TabItem value="Mac and Linux (binaries)">

  ```bash
  curl --proto '=https' --tlsv1.2 -LsSf https://github.com/near/near-cli-rs/releases/latest/download/near-cli-rs-installer.sh | sh
  ```
  </TabItem>
  <TabItem value="Windows (binaries)">

  ```bash
  irm https://github.com/near/near-cli-rs/releases/latest/download/near-cli-rs-installer.ps1 | iex
  ```
  </TabItem>
</Tabs>

Once you have the CLI installed, you can create a new account using the following command:

```bash
near create-account <account.testnet> --useFaucet
```

This command will create a new account with the name `<account.testnet>` and fund it using the `testnet` faucet. Make sure to replace `<account.testnet>` with your desired account name.

---

## Next Steps

Now that you have created a NEAR account, you can start developing applications on the NEAR Protocol.

Here are some resources to help you get started:

- Fund the wallet through one of our [faucets](../../faucet.md)
- Create your [first smart contract](../../smart-contracts/quickstart.md)
- Build a [Web3 Application](../../web3-apps/quickstart.md)
- Learn how to build an [Auction App from end-to-end](../../tutorials/auction/0-intro.md)