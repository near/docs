---
id: introduction
title: Introduction
hide_table_of_contents: false
---


import {FeatureList, Column, Feature} from "@site/components/featurelist"
import ContactUs from '@site/components/ContactUs.mdx';


- [What is an NFT?](#what-is-an-nft)
- [How to create NFT collection](#how-to-create-nft-collection)
- [Additional sources](#additional-sources)

---

## What is an NFT?

In contrast with [fungible tokens](/develop/relevant-contracts/ft), non-fungible tokens (NFT) are unitary and therefore unique. This makes NFTs ideal to represent ownership of assets such as a piece of digital content, or a ticket for an event.

As with fungible tokens, NFTs are **not stored** in the user's wallet, instead, each NFT lives in a **NFT contract**. The NFT contract works as a bookkeeper, this is: it is in charge of handling the creation, storage and transfers of NFTs.

In order for a contract to be considered a NFT-contract it has to follow the [**NEP-171 and NEP-177 standards**](https://nomicon.io/Standards/Tokens/NonFungibleToken). The **NEP-171** & **NEP-177** standards explain the **minimum interface** required to be implemented, as well as the expected functionality.

:::tip Reference Implementation
We provide a [reference implementation](https://github.com/near-examples/NFT) ready to be deployed and use.
:::

:::info NFT & Marketplaces
Be mindful of not confusing an NFT with an NFT-marketplace. NFT simply store information (metadata), while NFT-marketplaces are contracts where NFT can be listed and exchanged for a price.
:::

---

## How to create NFT collection

The easiest way to create NFT collection is using NFT marketplaces. Let's look at some options.

1. [Paras](https://paras.id/) - a classic NFT marketplace. Just login with your NEAR account, create collection and share the link with your community or integrate NFT functionality into your app.
2. [Mintbase](https://www.mintbase.xyz/) - a marketplace allows you not only create your own NFT collection, but buy NFT with credit cards and stablecoins as well.
3. [Enleap](https://enleap.app/) - a NFT no code launchpad. Provides NFT minting, staking, whitelist managing, tracking functionality.

---

## Additional sources

1. [NFT Tutorial](/tutorials/nfts/js/introduction) (NEAR examples, JavaScript SDK) - a set of tutorials that will cover every aspect of a non-fungible token (NFT) smart contract on JavaScript.
2. [NFT Tutorial](/tutorials/nfts/introduction) (NEAR examples, Rust SDK) - a set of tutorials that will cover every aspect of a non-fungible token (NFT) smart contract on Rust.
3. [NFT Tutorial by Keypom](https://github.com/keypom/nft-tutorial-series) (fork NEAR examples).