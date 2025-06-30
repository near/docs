---
id: index
title: NEAR Protocol Documentation
sidebar_label: Home
hide_table_of_contents: true
hide_title: true
---

import {Container, Card} from "@site/src/components/cards";

<div style={{paddingRight: "1rem"}}>

  <div className="landing-intro">
    <h1>NEAR Protocol Documentation</h1>
    <p className="landing-subtitle">Build the decentralized web with NEAR Protocol - a scalable, developer-friendly blockchain platform with seamless cross-chain capabilities</p>
  </div>

  <Container>
    <Card 
      img="/img/Icons/near-light.svg"
      title="New to NEAR?"
      text="NEAR is a layer-1 blockchain built for scale and multichain compatibility. Battle-tested with 13M+ transaction peaks and 5 years of zero downtime"
      links={{
              "What is NEAR?": "/protocol/basics",
              "Named Accounts": "/protocol/account-id",
              "Access Keys": "/protocol/access-keys",
              "Transactions": "/protocol/transactions"    }}
    />
    <Card
      img="/img/Icons/ai-light.svg"
      title="AI Native Infrastructure"
      text="NEAR is the execution layer for AI-native apps—enabling agents to own assets, make decisions, and transact freely across networks"
      links={{
        "Getting Started": "/ai/introduction",
      }}
    />
    <Card 
      img="/img/Icons/multichain-light.svg"
      title="Chain Abstraction"
      text="Tap into any blockchain with NEAR's chain abstraction layer"
      links={{
        "What is Chain Abstraction?": "/chain-abstraction/what-is",
        "Chain Signatures ✨": "/chain-abstraction/chain-signatures",
        "Meta-transactions": "/chain-abstraction/meta-transactions",
        "NEAR Intents": "/chain-abstraction/intents/overview",    }}
    />

  </Container>
    
  <Container>
    <Card 
      img="/img/Icons/app-light.svg"
      title="Web3 Applications"
      text="Create modern web applications that interact with the NEAR blockchain. Learn frontend integration and user experience best practices"
      links={{
        "What are Web3 Applications?": "/web3-apps/what-is",
        "Quickstart ✨": "/web3-apps/quickstart",
        "Use a Contract in Your Frontend": "/web3-apps/integrate-contracts",    }}
    />
    <Card 
      img="/img/Icons/contract-light.svg"
      title="Smart Contracts"
      text="Deploy and interact with smart contracts on NEAR. From basic concepts to advanced patterns and security best practices"
      links={{
        "What are Smart Contracts?": "/smart-contracts/what-is",
        "Quickstart ✨": "/smart-contracts/quickstart",
        "Contract's Anatomy": "/smart-contracts/anatomy/",
        "Sandbox Testing": "/smart-contracts/testing/integration-test"    }}
    />
    <Card 
      img="/img/Icons/contract-light.svg"
      title="Tokens and Primitives"
      text="Learn about FTs, NFTs, DAOs and everything you need to build an application on NEAR"
      links={{
        "What are Primitives?": "/primitives/what-is",
        "Fungible Tokens (FT)": "/primitives/ft",
        "Non-Fungible Tokens (NFT)": "/primitives/nft",
        "Autonomous Organizations": "/primitives/dao",
        "Decentralized Exchanges": "/primitives/dex",
        "Linkdrops": "/primitives/linkdrop",    }}
    />
    <Card 
      img="/img/Icons/database-light.svg"
      title="Data Infrastructure"
      text="Build applications that work across multiple blockchains. Chain signatures, intents, and omnibridge solutions"
      links={{
        "What is Data Infrastructure?": "/data-infrastructure/what-is",
        "BigQuery": "/data-infrastructure/big-query",
        "Data APIs": "/data-infrastructure/data-apis",
        "Lake Framework": "/data-infrastructure/lake-framework/near-lake-framework",    }}
    />
  </Container>

  <div className="landing-footer">
    <h2>Don't know where to start?</h2>
    <p>Start by learning more about NEAR and what makes it unique!</p>
    <div className="landing-cta">
      <a href="/protocol/basics" className="button button--primary button--lg">Learn More</a>
    </div>
  </div>
</div>