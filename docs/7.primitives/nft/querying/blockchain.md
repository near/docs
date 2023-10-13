---
id: blockchain
title: Blockchain
hide_table_of_contents: false
---

Here you can find a few tips how to use [near-cli](https://docs.near.org/tools/near-cli) and call methods of NFT contracts.

```near-cli``` is useful when you need to do something manually. Using ```near-cli``` you can make anything on NEAR blockchain - create NFT series, mint NFT, get token data from smart contracts, etc.

```bash
# Getting the price of a specific token series based on the provided series id.
near view paras-token-v2.testnet nft_get_series_price '{"token_series_id":"3"}'
```

If you want to interact with NFT smart contracts using ```near-cli```, you need to know contract id (for example, ```paras-token-v2.testnet```), its methods and parameters.

```bash
# Calling a mint method from nft-contract
near call <nft-contract> nft_mint '{"token_id": "<token-unique-id>", "receiver_id": "<nft-owner-account>", "token_metadata": {"title": "<title>", "description": "<description>", "media": "<url>" }, "royalties": {"<account>" : <percentage>, "<account>" : <percentage>}}' --accountId <your-account>
```

:::info
More examples of how to mint NFT, query metadata, attach NFTs to a contract call using `near-cli` you can [read here](/develop/relevant-contracts/nft).
:::