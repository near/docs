---
id: index
title: NEAR Protocol Documentation
sidebar_label: Home
hide_table_of_contents: true
hide_title: true
---

import {FeatureList, Column, Feature} from "@site/src/components/featurelist";
import {Container, Card} from "@site/src/components/cards";

<div style={{paddingRight: "1rem"}}>
  <div className="landing-intro">
    <h1>NEAR Documentation</h1>
    <p className="landing-subtitle"> Build with NEAR - the developer-friendly blockchain designed for usability and scale </p>
  </div>

  <Container>
    <Card 
      img="/img/Icons/near-light.svg"
      title="What is NEAR?"
      text="Get to know what NEAR is and learn whats possible!"
      links={{
        "Learn more ": "/protocol/basics",
      }}
    />
    <Card
      img="/img/Icons/ai-light.svg"
      title="AI & Agents"
      text="Build intelligent applications with AI agents and leverage NEAR's AI infrastructure for next-generation decentralized applications."
      links={{
        "Getting Started": "/ai/introduction",
      }}
    />
    <Card 
      img="/img/Icons/multichain-light.svg"
      title="Chain Abstraction"
      text="Build applications that work across multiple blockchains. Chain signatures, intents, and omnibridge solutions."
      links={{
        "Overview": "/chain-abstraction/chain-signatures",
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
</div>