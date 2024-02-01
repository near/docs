---
id: welcome
title: NEAR Smart Contracts
sidebar_label: Home
hide_table_of_contents: true
hide_breadcrumb: true
---

import {FeatureList, Column, Feature} from "@site/src/components/featurelist"
import ContactUs from '@site/src/components/ContactUs.mdx';

Welcome! Smart contracts are pieces of **executable code** that live in a NEAR account. They can **store data**, **perform transactions** in the account’s name, and **expose methods** so other accounts can interact with them.

<FeatureList>
  <Column title="Development Cycle">
    <Feature url="/develop/contracts/whatisacontract" title="What is a Contract?"
             subtitle="Learn what a smart contract is" image="contract.png" highlight />
    <Feature url="/develop/contracts/quickstart" title="Build a Contract"
             subtitle="Spin-up your first smart contract" image="smartcontract.png" />
    <Feature url="/develop/testing/introduction" title="Test a Contract" subtitle="Write unit & integration tests" image="test.png" />
    <Feature url="/develop/contracts/security/checklist" title="Security Checklist"
             subtitle="Make sure your contract is safe" image="validation.png" />
    <Feature url="/develop/deploy" title="Deploy a Contract" subtitle="Deploy the contract to the network" image="blocks.png" />
  </Column>
  <Column title="Examples & Tutorials">
      <Feature url="/tutorials/examples/guest-book" title="Guest-Book Example" 
               subtitle="Store multiple messages on-chain" image="guest-book.png" />
      <Feature url="/tutorials/examples/xcc" title="Cross-Calls Example"
               subtitle="Query and execute methods in other contracts" image="cross-call.png" />
      <Feature url="/tutorials/examples/coin-flip" title="Coin Flip Example"
               subtitle="Generate random numbers in a contract" image="random.png" />
      <Feature url="/tutorials/nfts/introduction" title="Zero-to-Hero NFT"
               subtitle="Build a NFT contract from scratch" image="nft-marketplace-rs.png" />
      <Feature url="/tutorials/fts/introduction" title="Zero-to-Hero FT"
               subtitle="Build a FT contract from scratch" image="ft.png" />
  </Column>

  <Column title="Related Resources">
    <Feature url="/develop/integrate/frontend" title="Build a Web Frontend"
             subtitle="Use the contract in a frontend" image="frontend.png" />
    <Feature url="/develop/monitor" title="Track Your Users Activity" subtitle="Learn how to use Indexers" image="monitor.png" />
    <Feature url="/primitives/ft" title="Fungible Tokens" subtitle="Learn how to use and make FT" image="ft.png" />
    <Feature url="/primitives/nft" title="Non-Fungible Tokens" subtitle="Enter the NFT space" image="nft.png" />
    <Feature url="/primitives/dao" title="Autonomous Organizations" subtitle="Understand DAOs" image="dao.png" />
  </Column>
</FeatureList>

<br/>

---

<ContactUs />
