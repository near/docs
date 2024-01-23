---
id: using-nfts
title: Using NFTs
hide_table_of_contents: false
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs";

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

This section shows how to interact with an NFT smart contract.

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
