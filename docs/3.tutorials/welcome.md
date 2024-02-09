---
id: welcome
title: Examples & Tutorials
sidebar_label: Home
hide_table_of_contents: true
---

import {FeatureList, Column, Feature} from "@site/src/components/featurelist"
import ContactUs from '@site/src/components/ContactUs.mdx';

Explore our collection of Examples and Tutorials

<FeatureList>
  <Column title="Popular Examples">
    <Feature url="/tutorials/examples/guest-book" title="Guest Book" subtitle="Create a simple guest book" image="guest-book.png" />
    <Feature url="/tutorials/examples/donation" title="Donation" subtitle="Receive and send tokens" image="donation.png" />
    <Feature url="/tutorials/examples/xcc" title="Basic Cross-Contract Call" subtitle="Learn how to call other contracts" image="cross-call.png" />
    <Feature url="/tutorials/examples/coin-flip" title="Coin Flip Game" subtitle="Learn to create basic random numbers" image="random.png" />
    <Feature url="/tutorials/examples/factory" title="Factory Contract" subtitle="Build a contract that deploys contracts" image="factory.png" />
    <Feature url="/tutorials/examples/update-contract-migrate-state" title="Update & Migrate" subtitle="Programmatically update contracts" image="update.png" />
    <Feature url="/tutorials/examples/frontend-multiple-contracts" title="Multi-Contract Frontend" subtitle="Interact with multiple contracts" image="multiple.png" />

  </Column>
  <Column title="Popular Tutorials">
    <Feature url="/bos/tutorial/interaction" title="Components & Contracts" subtitle="Use a contract from your component" image="bos-contract.png" />
    <Feature url="/bos/tutorial/lido" title="ETH Component" subtitle="Build an Ethereum Component" image="bos-lido.png" />
    <Feature url="/tutorials/nfts/minting-nfts" title="NFT Mint" subtitle="Mint an NFT without using code" image="frontend-bos.png" />
    <Feature url="/tutorials/indexer/nft-indexer" title="Events (NEAR Lake)"
             subtitle="Use our Data Lake to listen for events" image="monitor.png" />
  </Column>
  <Column title="From Zero to Hero">
    <Feature url="/tutorials/nfts/js/introduction" title="Master NFTs on NEAR (JS)" subtitle="Learn everything about NFT in JS" image="nft-marketplace-js.png" />
    <Feature url="/tutorials/nfts/introduction" title="Master NFTs on NEAR (RS)" subtitle="Learn everything about NFT in Rust" image="nft-marketplace-rs.png" />
    <Feature url="/tutorials/fts/introduction" title="Fungible Tokens 101"
             subtitle="Learn everything about fungible tokens" image="ft.png" />
    <Feature url="/tutorials/crosswords/basics/overview" title="Crossword Game" 
             subtitle="Build a Crossword Game from zero" image="crossword.png" />
  </Column>
</FeatureList>

---

<ContactUs />
