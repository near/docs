---
id: index
title: NEAR Protocol Documentation
sidebar_label: Home
hide_table_of_contents: true
hide_title: true
---

import {FeatureList, Column, Feature} from "@site/src/components/featurelist";
import {Container, Card} from "@site/src/components/cards";

<div className="landing-intro">
  <h1>NEAR Protocol Documentation</h1>
  <p className="landing-subtitle">Build the decentralized web with NEAR Protocol - a scalable, developer-friendly blockchain platform with seamless cross-chain capabilities.</p>
</div>

<Container>
  <Card 
    img="/img/Icons/near-light.svg"
    title="New to NEAR?"
    text="NEAR is a layer-1 blockchain built for scale and multichain compatibility. Battle-tested with 13M+ transaction peaks and 5 years of zero downtime."
    links={{
      "Learn more about whats possible →": "/protocol/basics",
    }}
  />
  <Card
    img="/img/Icons/ai-light.svg"
    title="AI Native Infrastructure"
    text="NEAR is the execution layer for AI-native apps—enabling agents to own assets, make decisions, and transact freely across networks."
    links={{
      "Getting Started": "/ai/introduction",
    }}
  />
  <Card 
    img="/img/Icons/multichain-light.svg"
    title="Multichain"
    text="On NEAR, one account can seamlessly manage assets across multiple blockchain platforms."
    links={{
      "One account multiple chains": "/chain-abstraction/chain-signatures",
    }}
  />

</Container>
  
<Container>
  <Card 
    img="/img/Icons/app-light.svg"
    title="Web3 Applications"
    text="Create modern web applications that interact with the NEAR blockchain. Learn frontend integration and user experience best practices."
    links={{
      "Quick Start": "/web3-apps/quickstart",
    }}
  />

  <Card 
    img="/img/Icons/contract-light.svg"
    title="Smart Contracts"
    text="Deploy and interact with smart contracts on NEAR. From basic concepts to advanced patterns and security best practices."
    links={{
      "What are Smart Contracts": "/smart-contracts/what-is",
    }}
  />

    <Card 
      img="/img/Icons/contract-light.svg"
      title="Smart Contracts"
      text="Deploy and interact with smart contracts on NEAR. From basic concepts to advanced patterns and security best practices."
      links={{
        "What are Smart Contracts": "/smart-contracts/what-is",
      }}
    />

    <Card 
      img="/img/Icons/database-light.svg"
      title="Data Infrastructure"
      text="Build applications that work across multiple blockchains. Chain signatures, intents, and omnibridge solutions."
      links={{
        "Overview": "/chain-abstraction/chain-signatures",
      }}
    />
  </Container>


  <div className="landing-footer">
    <h2>Ready to build on NEAR?</h2>
    <p>Join thousands of developers building the future of the decentralized web.</p>
    <div className="landing-cta">
      <a href="/smart-contracts/quickstart" className="button button--primary button--lg">Start Building</a>
      <a href="/tutorials/welcome" className="button button--secondary button--lg">View Tutorials</a>
    </div>
  </div>