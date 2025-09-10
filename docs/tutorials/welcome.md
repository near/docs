---
id: welcome
title: Examples & Tutorials
sidebar_label: Home
description: This page is a landing page for the examples and tutorials section of the NEAR documentation. It provides an overview of the available resources to help developers learn how to build on the NEAR platform, from beginner to advanced levels.
hide_table_of_contents: true
hide_title: true
---

import {Container, Card} from "@site/src/components/cards";

<div style={{paddingRight: "1rem"}}>

  <div className="landing-intro">
    <h1>Examples & Tutorials</h1>
    <p className="landing-subtitle">Learn to build on NEAR with hands-on examples, comprehensive tutorials, and step-by-step guides from beginner to advanced</p>
    <div className="landing-underline"></div>
  </div>

  <Container>
    <Card 
      img="/icons/near.svg"
      title="NEAR Quest"
      text="Interactive learning journey through gamified quests and challenges designed to build your NEAR development skills step by step"
      links={{
              "Start Your Quest": "/tutorials/near-quest"    }}
    />
    <Card 
      img="/icons/near.svg"
      title="Mastering NEAR"
      text="New to NEAR development? Start with our comprehensive introduction to building Web3 applications"
      links={{
              "Master Applications": "/tutorials/auction/introduction",
              "What are Smart Contracts?": "/smart-contracts/what-is",
              "What are Web3 Apps?": "/web3-apps/what-is"    }}
    />
    <Card
      img="/icons/app.svg"
      title="Frontend Examples"
      text="Build modern web interfaces that connect to NEAR contracts with these practical examples"
      links={{
        "Guest Book": "/tutorials/examples/guest-book",
        "Multi-Contract Frontend": "/tutorials/examples/frontend-multiple-contracts",
        "Marketplace Template": "/tutorials/templates/marketplace"
      }}
    />
    <Card 
      img="/icons/contract.svg"
      title="Smart Contract Examples"
      text="Learn smart contract development with real-world examples from simple to advanced patterns"
      links={{
        "Count on NEAR": "/tutorials/examples/count-near",
        "Cross-Contract Calls": "/tutorials/examples/xcc",
        "Coin Flip Game": "/tutorials/examples/coin-flip"
       }}
    />

  </Container>
    
  <Container>
    <Card 
      img="/icons/token.svg"
      title="Tokens & NFTs"
      text="Master fungible and non-fungible tokens on NEAR with comprehensive step-by-step tutorials"
      links={{
        "Fungible Tokens (FT)": "/tutorials/fts/introduction",
        "Non-Fungible Tokens (NFT)": "/tutorials/nfts/introduction",
        "NFT Tutorial (JS)": "/tutorials/nfts/js/introduction",    }}
    />
    <Card 
      img="/icons/multichain.svg"
      title="Multichain Development"
      text="Explore NEAR's multichain capabilities and learn to control accounts across different networks"
      links={{
        "Controlling NEAR Accounts": "/tutorials/controlling-near-accounts/introduction",
        "Multi-Chain DAO": "/tutorials/multichain-dao/introduction",
        "Chain Signatures": "/chain-abstraction/chain-signatures"  }}
    />
    <Card 
      img="/icons/database.svg"
      title="Data Infrastructure"
      text="Build indexers and work with NEAR's data layer to create powerful data-driven applications"
      links={{
        "NEAR Lake Framework": "/data-infrastructure/lake-framework/building-indexers/primitives",
        "NFT Indexer": "/data-infrastructure/lake-framework/building-indexers/nft-indexer",
        "JavaScript Lake Indexer": "/data-infrastructure/lake-framework/building-indexers/js-lake-indexer"
        }}
    />
  </Container>

  <div className="landing-footer">
    <h2>Ready to build something amazing?</h2>
    <p>Start with our hands-on tutorials and learn by doing!</p>
    <div className="landing-cta">
      <a href="/tutorials/auction/introduction" className="button button--primary button--lg">Start Building</a>
    </div>
  </div>
</div>
