---
id: predeployed-contract
title: Pre-deployed Contract
sidebar_label: Pre-deployed Contract
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

:::tip
If you don't have a Wallet account yet, you can create one easily by following [these instructions](/docs/develop/basics/create-account).
:::

Once you have your Wallet account, you can click on the [Collectibles](https://wallet.testnet.near.org/?tab=collectibles) tab where all your NFTs will be listed:

![Wallet](/docs/assets/nfts/nft-wallet.png)

### Installing the `near-cli`

To install the CLI, follow the instructions from the `near-cli` [installation
guide](/docs/tools/near-cli#setup). If you already have the command line
interface, you can [skip these steps](#using-the-nft-contract).

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

NEAR has already deployed a contract to the account `example-nft.testnet` which allows users to freely mint tokens. This is the account we'll be interacting with to mint our NFTs. 

Now let's mint our first token! The following command will mint one copy of your NFT. 
Please remember to replace the `token_id` value with an unique string.

:::tip
You can also replace the `media` URL with a link to any image file hosted on your web server.
:::

```bash
near call example-nft.testnet nft_mint '{"token_id": "my-token-unique-id", "receiver_id": "'$ID'", "token_metadata": { "title": "Some Art", "description": "My NFT media", "media": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Olympus_Mons_alt.jpg/1024px-Olympus_Mons_alt.jpg", "copies": 1}}' --accountId $ID --deposit 0.1
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

Now that you're familiar with the process, you can jump to [Contract Architecture](/docs/tutorials/contracts/nfts/skeleton) and learn more about the smart contract structure and how you can build your own NFT contract from the ground up.

***Happy minting!*** 🪙

:::note Versioning for this article

At the time of this writing, this example works with the following versions:

- near-cli: `2.1.1`
:::
