---
id: predeployed-contract
title: Pre-deployed Contract
sidebar_label: Pre-deployed Contract
---

Create your first non-fungible token by using a pre-deployed NFT smart contract which works exactly as the one you will build on this tutorial.

---

## Prerequisites

To complete this tutorial successfully, you'll need [a NEAR Wallet](https://testnet.mynearwallet.com/create) and [NEAR CLI RS](../../4.tools/cli-rs.md#setup)

---

## Using the NFT contract

Minting an NFT token on NEAR is a simple process that involves calling a smart contract function.

To interact with the contract you will need to first login to your NEAR account through `near-cli`.

<hr class="subsection" />

### Setup

Log in to your newly created account with `near-cli` by running the following command in your terminal:

```bash
near account import-account using-web-wallet network-config testnet
```

Set an environment variable for your account ID to make it easy to copy and paste commands from this tutorial:

```bash
export NEARID=YOUR_ACCOUNT_NAME
```

<hr class="subsection" />

### Minting your NFTs

We have already deployed an NFT contract to `nft.examples.testnet` which allows users to freely mint tokens. Let's use it to mint our first token.

Run this command in your terminal, remember to replace the `token_id` with a string of your choice. This string will uniquely identify the token you mint.

```bash
near contract call-function as-transaction nft.examples.testnet nft_mint json-args '{"token_id": "TYPE_A_UNIQUE_VALUE_HERE", "receiver_id": "'$NEARID'", "metadata": { "title": "GO TEAM", "description": "The Team Goes", "media": "https://bafybeidl4hjbpdr6u6xvlrizwxbrfcyqurzvcnn5xoilmcqbxfbdwrmp5m.ipfs.dweb.link/", "copies": 1}}' prepaid-gas '100.0 Tgas' attached-deposit '0.1 NEAR' sign-as $NEARID network-config testnet sign-with-legacy-keychain send
```

<details>
<summary>Example response: </summary>
<p>

```json
Log [nft.examples.testnet]: EVENT_JSON:{"standard":"nep171","version":"nft-1.0.0","event":"nft_mint","data":[{"owner_id":"benjiman.testnet","token_ids":["TYPE_A_UNIQUE_VALUE_HERE"]}]}
Transaction Id 8RFWrQvAsm2grEsd1UTASKpfvHKrjtBdEyXu7WqGBPUr
To see the transaction in the transaction explorer, please open this url in your browser
https://testnet.nearblocks.io/txns/8RFWrQvAsm2grEsd1UTASKpfvHKrjtBdEyXu7WqGBPUr
''
```

</p>
</details>

:::tip
You can also replace the `media` URL with a link to any image file hosted on your web server.
:::

<hr class="subsection" />

### Querying your NFT

To view tokens owned by an account you can call the NFT contract with the following `near-cli` command:

```bash
near contract call-function as-read-only nft.examples.testnet nft_tokens_for_owner json-args '{"account_id": "'$NEARID'"}' network-config testnet now
```

<details>
<summary>Example response: </summary>
<p>

```json
[
  {
    "token_id": "Goi0CZ",
    "owner_id": "bob.testnet",
    "metadata": {
      "title": "GO TEAM",
      "description": "The Team Goes",
      "media": "https://bafybeidl4hjbpdr6u6xvlrizwxbrfcyqurzvcnn5xoilmcqbxfbdwrmp5m.ipfs.dweb.link/",
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

**Congratulations!** You just minted your first NFT token on the NEAR blockchain! 🎉

Now try going to your [NEAR Wallet](https://testnet.mynearwallet.com) and view your NFT in the "Collectibles" tab.

---

## Final remarks

This basic example illustrates all the required steps to call an NFT smart contract on NEAR and start minting your own non-fungible tokens.

Now that you're familiar with the process, you can jump to [Contract Architecture](/tutorials/nfts/skeleton) and learn more about the smart contract structure and how you can build your own NFT contract from the ground up.

***Happy minting!*** 🪙

:::note Versioning for this article

At the time of this writing, this example works with the following versions:

- near-cli-rs: `0.11.0`
- NFT standard: [NEP171](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core), version `1.0.0`

:::
