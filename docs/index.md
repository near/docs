---
id: index
title: NEAR Protocol Documentation
sidebar_label: Home
hide_table_of_contents: true
hide_title: true
---

import {Container, Card} from "@site/src/components/cards";

<div className="landing">

  <div className="landing-intro">
    <h1>NEAR Protocol Documentation</h1>
    <p className="landing-subtitle">Build decentralized applications and AI agents with seamless cross-chain capabilities</p>
    <div className="landing-underline"></div>
  </div>

  <Container>
    <Card 
      img="/img/icons/near-light.svg"
      title="New to NEAR?"
      text="NEAR is a layer-1 blockchain built for scale and multichain compatibility. Battle-tested with 13M+ transaction peaks and 5 years of zero downtime"
      links={{
              "What is NEAR?": "/protocol/basics",
              "Account Model": "/protocol/account-id",
              "Transactions": "/protocol/transactions"    }}
    />
    <Card
      img="/img/icons/ai-light.svg"
      title="AI Native Infrastructure"
      text="NEAR is the execution layer for AI-native apps—enabling agents to own assets, make decisions, and transact freely across networks"
      links={{
        "Getting Started": "/ai/introduction",
        "Shade Agents": "/ai/shade-agents/introduction",
        "NEAR AI Docs": "https://docs.near.ai"
      }}
    />
    <Card 
      img="/img/icons/multichain-light.svg"
      title="Multi-Chain"
      text="Tap into any blockchain with NEAR's chain abstraction layer"
      links={{
        "What is Chain Abstraction?": "/chain-abstraction/what-is",
        "NEAR Intents": "/chain-abstraction/intents/overview",
        "Chain Signatures": "/chain-abstraction/chain-signatures"
       }}
    />
  </Container>
    
  <Container>
    <Card 
      img="/img/icons/app-light.svg"
      title="Web3 Applications"
      text="Create modern web applications that interact with the NEAR blockchain. Learn frontend integration and user experience best practices"
      links={{
        "What are Web3 Apps?": "/web3-apps/what-is",
        "Quickstart ✨": "/web3-apps/quickstart",
        "Use a Contract in Your Frontend": "/web3-apps/integrate-contracts",    }}
    />
    <Card 
      img="/img/icons/contract-light.svg"
      title="Smart Contracts"
      text="Deploy and interact with smart contracts on NEAR. From basic concepts to advanced patterns and security best practices"
      links={{
        "What are Smart Contracts?": "/smart-contracts/what-is",
        "Quickstart ✨": "/smart-contracts/quickstart",
        "Contract's Anatomy": "/smart-contracts/anatomy/",  }}
    />
    <Card 
      img="/img/icons/token-light.svg"
      title="Tokens and Primitives"
      text="Learn about FTs, NFTs, DAOs and everything you need to build an application on NEAR"
      links={{
        "Fungible Tokens (FT)": "/primitives/ft",
        "Non-Fungible Tokens (NFT)": "/primitives/nft",
        "Autonomous Organizations": "/primitives/dao"
        }}
    />
  </Container>

  <div className="landing-footer">
    <h2>Ready to start building?</h2>
    <p>Discover what makes NEAR the perfect platform for your next application</p>
    <div className="landing-cta">
      <a href="/protocol/basics" className="button button--primary button--lg">Explore NEAR</a>
    </div>
  </div>

</div>