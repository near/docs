---
id: simple-nfts
title: Minting NFTs (Simple)
sidebar_label: Minting NFTs
---

In this tutorial you'll learn how to easily create your own non-fungible tokens without doing any software development by using a readily-available NFT smart contract.

## Overview

This article will show you how to use an existing [NFT smart contract](#non-fungible-token-contract), and you'll learn [how to mint](#minting-your-nfts) non-fungible tokens from media files stored on a web server and view them in your Wallet.

## Prerequisites

To complete this tutorial successfully, you'll need:

- [A NEAR account](#wallet)
- [NEAR command-line interface](/docs/develop/contracts/rust/intro#installing-the-near-cli) (`near-cli`)

### Wallet

To store your non-fungible tokens you'll need a [NEAR Wallet](https://wallet.testnet.near.org/).
If you don't have one yet, you can create one easily by following [these instructions](/docs/develop/basics/create-account):

> **Tip:** If you already have a NEAR `testnet` account, you can [skip these steps](#installing-the-near-cli).

#### 1. Reserve an Account ID

* Navigate to https://wallet.testnet.near.org and click on "Create Account".
* Next, enter your desired account name.
  
#### 2. Secure your account

* Choose your account recovery method. For simplicity, in this tutorial you can select
  "E-mail Account Recovery", although "Recovery Phrase" and [Ledger](https://www.ledger.com/)
  are the most secure methods.

#### 3. E-mail / Phone Number Account Recovery

* Enter the account activation code that you received.

#### 4. Success!

* You just created a `testnet` account and received 200 Ⓝ! Upon recovery method confirmation
  you should be directed to your account dashboard.

Once you have your Wallet account, you can click on the [Collectibles](https://wallet.testnet.near.org/?tab=collectibles) tab where all your NFTs will be listed:

![Wallet](/docs/assets/nfts/nft-wallet.png)

### Installing the `near-cli`

The following instructions are taken from the `near-cli` [installation
guide](https://docs.near.org/docs/tools/near-cli#setup). If you already have the command line
interface, you can [skip these steps](#using-the-nft-contract).

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

## Using the NFT contract

Now that you have all the tools in place, you're ready to start using the NFT smart contract to [mint your NFTs](#minting-your-nfts).

Log in to your newly created account with `near-cli` by running the following command in your terminal.

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

### Minting your NFTs

A smart contract can define an initialization method that can be used to set the contract's initial state.
In our case, we need to initialize the NFT contract before usage. For now, we'll initialize it with the default metadata.

> **Note:** each account has a data area called `storage`, which is persistent between function calls and transactions.
> For example, when you initialize a contract, the initial state is saved in the persistent storage.

```bash
near call example-nft.testnet new_default_meta '{"owner_id": "'$ID'"}' --accountId $ID
```

> **Tip:** you can find more info about the NFT metadata at [nomicon.io](https://nomicon.io/Standards/NonFungibleToken/Metadata.html).

You can then view the metadata by running the following `view` call:

```bash
near view $ID nft_metadata
```

<details>
<summary>Example response: </summary>
<p>

```json
{
  "spec": "nft-1.0.0",
  "name": "Example NEAR non-fungible token",
  "symbol": "EXAMPLE",
  "icon": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 288 288'%3E%3Cg id='l' data-name='l'%3E%3Cpath d='M187.58,79.81l-30.1,44.69a3.2,3.2,0,0,0,4.75,4.2L191.86,103a1.2,1.2,0,0,1,2,.91v80.46a1.2,1.2,0,0,1-2.12.77L102.18,77.93A15.35,15.35,0,0,0,90.47,72.5H87.34A15.34,15.34,0,0,0,72,87.84V201.16A15.34,15.34,0,0,0,87.34,216.5h0a15.35,15.35,0,0,0,13.08-7.31l30.1-44.69a3.2,3.2,0,0,0-4.75-4.2L96.14,186a1.2,1.2,0,0,1-2-.91V104.61a1.2,1.2,0,0,1,2.12-.77l89.55,107.23a15.35,15.35,0,0,0,11.71,5.43h3.13A15.34,15.34,0,0,0,216,201.16V87.84A15.34,15.34,0,0,0,200.66,72.5h0A15.35,15.35,0,0,0,187.58,79.81Z'/%3E%3C/g%3E%3C/svg%3E",
  "base_uri": null,
  "reference": null,
  "reference_hash": null
}
```

</p>
</details>

Now let's mint our first token! The following command will mint one copy of your NFT. 

> **Tip:** Replace the `media` URL with a link to any image file hosted on your web server.

```bash
near call example-nft.testnet nft_mint '{"token_id": "0", "receiver_id": "'$ID'", "token_metadata": { "title": "Some Art", "description": "My NFT media", "media": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Olympus_Mons_alt.jpg/1024px-Olympus_Mons_alt.jpg", "copies": 1}}' --accountId $ID --deposit 0.1
```

<details>
<summary>Example response: </summary>
<p>

```json
{
  "token_id": "0",
  "owner_id": "dev-xxxxxx-xxxxxxx",
  "metadata": {
    "title": "Some Art",
    "description": "My NFT media",
    "media": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Olympus_Mons_alt.jpg/1024px-Olympus_Mons_alt.jpg",
    "media_hash": null,
    "copies": 1,
    "issued_at": null,
    "expires_at": null,
    "starts_at": null,
    "updated_at": null,
    "extra": null,
    "reference": null,
    "reference_hash": null
  },
  "approved_account_ids": {}
}
```

</p>
</details>

To view tokens owned by an account you can call the NFT contract with the following `near-cli` command:

```bash
near view example-nft.testnet nft_tokens_for_owner '{"account_id": "'$ID'"}'
```

<details>
<summary>Example response: </summary>
<p>

```json
[
  {
    "token_id": "0",
    "owner_id": "dev-xxxxxx-xxxxxxx",
    "metadata": {
      "title": "Some Art",
      "description": "My NFT media",
      "media": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Olympus_Mons_alt.jpg/1024px-Olympus_Mons_alt.jpg",
      "media_hash": null,
      "copies": 1,
      "issued_at": null,
      "expires_at": null,
      "starts_at": null,
      "updated_at": null,
      "extra": null,
      "reference": null,
      "reference_hash": null
    },
    "approved_account_ids": {}
  }
]
```

</p>
</details>

> <br/>
>
> **Tip:** after you mint your first non-fungible token, you can [view it in your Wallet](https://wallet.testnet.near.org/?tab=collectibles):
>
> ![Wallet with token](/docs/assets/nfts/nft-wallet-token.png)
>
> <br/>

***Congratulations! You just minted your first NFT token on the NEAR blockchain!*** 🎉

## Final remarks

This basic example illustrates all the required steps to call an NFT smart contract on NEAR and start minting your own non-fungible tokens.

Now that you're familiar with the process, you can check out our [NFT Example](https://examples.near.org/NFT) and learn more about the smart contract code and how you can transfer minted tokens to other accounts.
Finally, if you are new to Rust and want to dive into smart contract development, our [Quick-start guide](/docs/develop/contracts/rust/intro) is a great place to start.

***Happy minting!*** 🪙

## Versioning for this article

At the time of this writing, this example works with the following versions:

- near-cli: `2.1.1`
