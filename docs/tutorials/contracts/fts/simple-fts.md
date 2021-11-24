---
id: simple-fts
title: Minting FTs (Simple)
sidebar_label: Minting FTs (Simple)
---

In this tutorial, you'll learn how to easily create your own Fungible Tokens (FT) without doing any software development by using a readily-available FT smart contract.

## Overview

This article will show you how to use an existing [FT smart contract](#fungible-token-contract), and you'll learn [how to mint](#minting-your-fts) fungible tokens and view them in your Wallet.

## Prerequisites

To complete this tutorial successfully, you'll need:

- [A NEAR account](#wallet)
- [NEAR command-line interface](/docs/develop/contracts/rust/intro#installing-the-near-cli) (`near-cli`)

### Wallet

To store your fungible tokens you'll need a [NEAR Wallet](https://wallet.testnet.near.org/).
If you don't have one yet, you can create one easily by following [these instructions](/docs/develop/basics/create-account):

> **Tip:** If you already have a NEAR `testnet` account, you can [skip these steps](#installing-the-near-cli).

#### 1. Reserve an Account ID

- Navigate to https://wallet.testnet.near.org and click on "Create Account".
- Next, enter your desired account name.

#### 2. Secure your account

- Choose your account recovery method. For simplicity, in this tutorial you can select
  "E-mail Account Recovery", although "Recovery Phrase" and [Ledger](https://www.ledger.com/)
  are the most secure methods.

#### 3. E-mail / Phone Number Account Recovery

- Enter the account activation code that you received.

#### 4. Success!

- You just created a `testnet` account and received 200 Ⓝ! Upon recovery method confirmation
  you should be directed to your account dashboard.

Once you have your Wallet account, you can click on the [Balances Tab](https://wallet.testnet.near.org/?tab=balances) where all your Fungible Tokens will be listed:

![Wallet](/docs/assets/fts/empty-wallet-ft-tab.png)

### Installing the `near-cli`

The following instructions are taken from the `near-cli` [installation
guide](https://docs.near.org/docs/tools/near-cli#setup). If you already have the command line
interface, you can [skip these steps](#using-the-ft-contract).

> **Note:** Make sure you have a current version of `npm` and `NodeJS` installed.

#### Linux and macOS

1. Install `npm` and `node` using a package manager such as `nvm`. Sometimes there are issues
   using Ledger due to how macOS handles node packages related to USB devices.
   [[click here]](https://nodejs.org/en/download/package-manager/)
2. Ensure you have installed Node version 12 or above.
3. Install `near-cli` globally by running:

```bash
npm install -g near-cli
```

#### Windows

> **Note:** For Windows users, we recommend using Windows Subsystem for Linux (`WSL`).

1. Install `WSL` [[click here]](https://docs.microsoft.com/en-us/windows/wsl/install-manual#downloading-distros)
2. Install ` Node.js` [[click here]](https://nodejs.org/en/download/package-manager/)
3. Change `npm` default directory [[click here]](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally#manually-change-npms-default-directory)
   - This is to avoid any permission issues with `WSL`
4. Open `WSL` and install `near-cli` globally by running:

```bash
npm install -g near-cli
```

## Using the FT contract

Now that you have all the tools in place, you're ready to start using the FT smart contract to [mint your FTs](#minting-your-fts).

Ensure you have credentials stored locally for the `testnet` account you will be using to mint tokens with by running the following `near-cli` command in your terminal:

```bash
near login
```

To make this tutorial easier to copy/paste, we're going to set an environment variable for your account ID. In the command below, replace `YOUR_ACCOUNT_NAME` with the account name you just logged in with including the `.testnet` (or `.near` for `mainnet`):

```bash
export ID=YOUR_ACCOUNT_NAME
```

Test that the environment variable is set correctly by running:

```bash
echo $ID
```

### Minting your FTs

NEAR has already deployed a contract to the account `ft.examples.testnet` which allows users to freely mint `TeamTokens`. This is the account we'll be interacting with to mint our FTs.

Now let's mint some tokens! The following command will mint 25 TeamTokens to your account. Feel free to increase the amount up to a max of 1000.

```bash
near call ft.examples.testnet ft_mint '{"receiver_id": "'$ID'", "amount": "25"}' --deposit 0.1 --accountId $ID
```

To view tokens owned by an account you can call the FT contract with the following `near-cli` command:

```bash
near view ft.examples.testnet ft_balance_of '{"account_id": "'$ID'"}'
```

<details>
<summary>Example response: </summary>
<p>

```json
View call: ft.examples.testnet.ft_balance_of({"account_id": "benji_test.testnet"})
'25'
```

</p>
</details>

> <br/>
>
:::tip
After you mint your fungible token you can [view it in your NEAR Wallet](https://wallet.testnet.near.org)!
:::
>
> ![Wallet with token](/docs/assets/fts/teamtoken.png)
>
> <br/>

**_Congratulations! You just minted your first Fungible Token on the NEAR blockchain!_** 🎉

## Final remarks

This basic example illustrates all the required steps to call a FT smart contract on NEAR and start minting your own fungible tokens.

**_Happy minting!_** 🪙

## Versioning for this article

At the time of this writing, this example works with the following versions:

- near-cli: `2.1.1`
