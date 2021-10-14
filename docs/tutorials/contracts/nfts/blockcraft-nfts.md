---
id: blockcraft-nfts
title: Blockcraft - NFTs in Minecraft
sidebar_label: NFTs in Minecraft
---

In this tutorial you'll learn how to integrate NFTs into minecraft as a practical extension of our tutorial on [minting NFTs](/docs/tutorials/contracts/nfts/minting-nfts)

## Overview

This tutorial will run you through minting Minecraft structures of any size onto the NEAR blockchain. It will allow you to copy and paste the designs into your own worlds. For this, we will be using WorldEdit to download and read the schematics and we'll put them on chain using IPFS.

## Prerequisites

> **Tip:** This tutorial is meant to show a cool example that builds off of our previous [NFT tutorial](/docs/tutorials/contracts/nfts/minting-nfts). If you haven't gone through it, we highly recomming doing so.

To complete this tutorial successfully, you'll need:

- A Minecraft account
- WorldEdit [installed](https://worldedit.enginehub.org/en/latest/install/)
- [A NEAR account](#wallet)
- [NEAR command-line interface](/docs/develop/contracts/rust/intro#installing-the-near-cli) (`near-cli`)

### Creating a Schematic

Once you have WorldEdit installed and Minecraft loaded up, check if WorldEdit is working properly by running:

```bash
//pos1
```

If WorldEdit is properly installed, it should output `First position set to (X, Y, Z).` where X, Y, and Z are coordinates.

For this tutorial, we will be minting a small village house. To follow along, choose any structure that you'd like to mint as shown below:

> ![Village House Minecraft](/docs/assets/nfts/village-house-minecraft.png)

You'll then want to choose the boundaries of the structure that you'd like to copy which we will turn into schematics. These schematics will be placed on chain for you or others to potentially download and paste in their own worlds. To do this, we'll need to outline the boundaries of the build using WorldEdit. Stand in the bottom left corner of your build and run:

```bash
//pos1
```

You can then move to the top right corner and run:

```bash
//pos2
```

Behind the scenes, this has created a cube around your build. We can then copy what we just selected using `//copy`. The output should look something like this:

> ![Copy Chat Message](/docs/assets/nfts/copy-chat-message-minecraft.png)

> **Tip:** Your player position matters when copying. If you copy the build and you're standing on the roof, when you paste the build, it will paste in a way that will result in you standing on the roof.

## Sanity Check

We can check and see if our build is fine by pasting what we just copied elsewhere in our world. Go to a location that you would like to paste the build and run `//paste`. In our case, we pasted the village house floating above a coral reef biome:

> ![Pasted Minecraft House](/docs/assets/nfts/pasted-minecraft-house.png)

### Minting your NFTs

NEAR has already deployed a contract to the account `example-nft.testnet` which allows users to freely mint tokens. This is the account we'll be interacting with to mint our NFTs.

Now let's mint our first token! The following command will mint one copy of your NFT.
Please remember to replace the `token_id` value with an unique string.

> **Tip:** you can also replace the `media` URL with a link to any image file hosted on your web server.

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

**_Congratulations! You just minted your first NFT token on the NEAR blockchain!_** 🎉

## Final remarks

This basic example illustrates all the required steps to call an NFT smart contract on NEAR and start minting your own non-fungible tokens.

Now that you're familiar with the process, you can check out our [NFT Example](https://examples.near.org/NFT) and learn more about the smart contract code and how you can transfer minted tokens to other accounts.
Finally, if you are new to Rust and want to dive into smart contract development, our [Quick-start guide](/docs/develop/contracts/rust/intro) is a great place to start.

**_Happy minting!_** 🪙

## Blockcraft - a Practical Extension

This basic example illustrates all the required steps to call an NFT smart contract on NEAR and start minting your own non-fungible tokens.

Now that you're familiar with the process, you can check out our [NFT Example](https://examples.near.org/NFT) and learn more about the smart contract code and how you can transfer minted tokens to other accounts.
Finally, if you are new to Rust and want to dive into smart contract development, our [Quick-start guide](/docs/develop/contracts/rust/intro) is a great place to start.

## Versioning for this article

At the time of this writing, this example works with the following versions:

- near-cli: `2.1.1`
