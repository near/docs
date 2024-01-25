---
id: using-nfts
title: Using NFTs
hide_table_of_contents: false
---

import {FeatureList, Column, Feature} from "@site/src/components/featurelist"
import ContactUs from '@site/src/components/ContactUs.mdx';

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import BOSMintNFT from "./interacting/bos/mint.md"
import BOSBuyNFT from "./interacting/bos/buy.md"
import BOSQueryNFT from "./interacting/bos/query.md"
import BOSTransferNFT from "./interacting/bos/transfer.md"
import BOSListNFTForSale from "./interacting/bos/list-for-sale.md"

import WebAppMintNFT from "./interacting/web-app/mint.md"
import WebAppBuyNFT from "./interacting/web-app/buy.md"
import WebAppQueryNFT from "./interacting/web-app/query.md"
import WebAppTransferNFT from "./interacting/web-app/transfer.md"
import WebAppListNFTForSale from "./interacting/web-app/list-for-sale.md"

import CLIMintNFT from "./interacting/near-cli/mint.md"
import CLIBuyNFT from "./interacting/near-cli/buy.md"
import CLIQueryNFT from "./interacting/near-cli/query.md"
import CLITransferNFT from "./interacting/near-cli/transfer.md"
import CLIListNFTForSale from "./interacting/near-cli/list-for-sale.md"

import SmartContractMintNFT from "./interacting/smart-contract/mint.md"
import SmartContractBuyNFT from "./interacting/smart-contract/buy.md"
import SmartContractQueryNFT from "./interacting/smart-contract/query.md"
import SmartContractTransferNFT from "./interacting/smart-contract/transfer.md"

In contrast with fungible tokens, non-fungible tokens (NFT) are unitary and therefore unique. This makes NFTs ideal to represent ownership of assets such as a piece of digital content, or a ticket for an event.

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

## Mint a NFT

<Tabs groupId="code-tabs">
  <TabItem value="NEAR Component" label="NEAR Component" default>
    <BOSMintNFT />
  </TabItem>
  <TabItem value="Web App" label="Web App">
    <WebAppMintNFT />
  </TabItem>
  <TabItem value="Near CLI" label="Near CLI">
    <CLIMintNFT />
  </TabItem>
  <TabItem value="Smart Contract" label="Smart Contract" default>
    <SmartContractMintNFT />
  </TabItem>
</Tabs>

---

## Buy a NFT

<Tabs groupId="code-tabs">
  <TabItem value="NEAR Component" label="NEAR Component" default>
    <BOSBuyNFT />
  </TabItem>
  <TabItem value="Web App" label="Web App">
    <WebAppBuyNFT />
  </TabItem>
  <TabItem value="Near CLI" label="Near CLI">
    <CLIBuyNFT />
  </TabItem>
  <TabItem value="Smart Contract" label="Smart Contract" default>
    <SmartContractBuyNFT />
  </TabItem>
</Tabs>

---

## Query NFT data

<Tabs groupId="code-tabs">
  <TabItem value="NEAR Component" label="NEAR Component" default>
    <BOSQueryNFT />
  </TabItem>
  <TabItem value="Web App" label="Web App">
    <WebAppQueryNFT />
  </TabItem>
  <TabItem value="Near CLI" label="Near CLI">
    <CLIQueryNFT />
  </TabItem>
  <TabItem value="Smart Contract" label="Smart Contract">
    <SmartContractQueryNFT />
  </TabItem>
</Tabs>

---

## Transfer a NFT

<Tabs groupId="code-tabs">
  <TabItem value="NEAR Component" label="NEAR Component" default>
    <BOSTransferNFT />
  </TabItem>
  <TabItem value="Web App" label="Web App">
    <WebAppTransferNFT />
  </TabItem>
  <TabItem value="Near CLI" label="Near CLI">
    <CLITransferNFT />
  </TabItem>
  <TabItem value="Smart Contract" label="Smart Contract">
    <SmartContractTransferNFT />  
  </TabItem>
</Tabs>

---

## List a NFT for sale

Basic NFT contracts following [the NEP-171 and NEP-177 standards](https://nomicon.io/Standards/Tokens/NonFungibleToken) do not implement marketplace functionality.

For this purpose, there are ecosystem apps such as [Paras](https://paras.id/) or [Mintbase](https://www.mintbase.xyz/), that use dedicated marketplace contracts.

In order to put a NFT for a sale on a marketplace you need to do two actions: 

1. Cover data storage costs in the marketplace contract. 
2. Approve the marketplace to sell the NFT in your NFT contract.

<Tabs groupId="code-tabs">
  <TabItem value="NEAR Component" label="NEAR Component" default>
    <BOSListNFTForSale />
  </TabItem>
  <TabItem value="Web App" label="Web App">
    <WebAppListNFTForSale />
  </TabItem>
  <TabItem value="Near CLI" label="Near CLI">
    <CLIListNFTForSale />
  </TabItem>
</Tabs>

---

## Additional Resources

1. [NFT Tutorial](/tutorials/nfts/js/introduction) (NEAR examples, JavaScript SDK) - a set of tutorials that cover how to create a NFT contract using JavaScript.
2. [NFT Tutorial](/tutorials/nfts/introduction) (NEAR examples, Rust SDK) - a set of tutorials that cover how to create a NFT contract using Rust.
3. [NFT Tutorial by Keypom](https://github.com/keypom/nft-tutorial-series) (a fork of the NEAR example tutorial).
4. [Paras API documentation](https://parashq.github.io/).
5. [Mintbase API documentation](https://docs.mintbase.xyz/dev/mintbase-graph).
6. [Mintbase JS SDK](https://docs.mintbase.xyz/dev/mintbase-sdk-ref) - a set of methods to get data from blockchain, interact with Mintbase contracts, etc.
7. [Examples](/develop/relevant-contracts/nft) on how to mint NFT, query metadata, attach NFTs to a contract call using `near-cli`.