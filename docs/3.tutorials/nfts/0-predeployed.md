---
id: predeployed-contract
title: Pre-deployed Contract
sidebar_label: Pre-deployed Contract
---

> Learn how to easily create your own non-fungible tokens without doing any software development by using a readily-available NFT smart contract.

## Prerequisites

To complete this tutorial successfully, you'll need:

- [A NEAR Wallet](https://wallet.testnet.near.org/create)
- [NEAR-CLI](/tools/near-cli#setup)

## Using the NFT contract

### Setup

- Log in to your newly created account with `near-cli` by running the following command in your terminal:

```bash
near login
```

 - Set an environment variable for your account ID to make it easy to copy and paste commands from this tutorial:

```bash
export NEARID=YOUR_ACCOUNT_NAME
```
:::note

Be sure to replace `YOUR_ACCOUNT_NAME` with the account name you just logged in with including the `.testnet` (or `.near` for `mainnet`).

:::

- Test that the environment variable is set correctly by running:

```bash
echo $NEARID
```

### Minting your NFTs

NEAR has deployed an NFT contract to the account `nft.examples.testnet` which allows users to freely mint tokens. Using this pre-deployed contract, let's mint our first token! 


- Run this command in your terminal, however you **must replace the `token_id` value with an UNIQUE string**.

```bash
near call nft.examples.testnet nft_mint '{"token_id": "TYPE_A_UNIQUE_VALUE_HERE", "receiver_id": "'$NEARID'", "metadata": { "title": "GO TEAM", "description": "The Team Goes", "media": "https://bafybeidl4hjbpdr6u6xvlrizwxbrfcyqurzvcnn5xoilmcqbxfbdwrmp5m.ipfs.dweb.link/", "copies": 1}}' --accountId $NEARID --deposit 0.1
```

:::tip
You can also replace the `media` URL with a link to any image file hosted on your web server.
:::

<details>
<summary>Example response: </summary>
<p>

```json
Log [nft.examples.testnet]: EVENT_JSON:{"standard":"nep171","version":"nft-1.0.0","event":"nft_mint","data":[{"owner_id":"benjiman.testnet","token_ids":["TYPE_A_UNIQUE_VALUE_HERE"]}]}
Transaction Id 8RFWrQvAsm2grEsd1UTASKpfvHKrjtBdEyXu7WqGBPUr
To see the transaction in the transaction explorer, please open this url in your browser
https://explorer.testnet.near.org/transactions/8RFWrQvAsm2grEsd1UTASKpfvHKrjtBdEyXu7WqGBPUr
''
```

</p>
</details>

- To view tokens owned by an account you can call the NFT contract with the following `near-cli` command:

```bash
near view nft.examples.testnet nft_tokens_for_owner '{"account_id": "'$NEARID'"}'
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

***Congratulations! You just minted your first NFT token on the NEAR blockchain!*** 🎉

👉 Now try going to your [NEAR Wallet](http://wallet.testnet.near.org) and view your NFT in the "Collectibles" tab. 👈 

---

## Final remarks

This basic example illustrates all the required steps to call an NFT smart contract on NEAR and start minting your own non-fungible tokens.

Now that you're familiar with the process, you can jump to [Contract Architecture](/tutorials/nfts/skeleton) and learn more about the smart contract structure and how you can build your own NFT contract from the ground up.

***Happy minting!*** 🪙

:::note Versioning for this article

At the time of this writing, this example works with the following versions:

- near-cli: `3.0.0`
:::
