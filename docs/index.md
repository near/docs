---
id: index
title: NEAR Protocol Documentation
sidebar_label: Home
hide_table_of_contents: true
hide_title: true
description: "NEAR Protocol documentation - Build decentralized applications and AI agents with seamless cross-chain capabilities on a layer-1 blockchain built for scale."
---

import Card from '@site/src/components/UI/Card';
import LandingHero from '@site/src/components/LandingHero';


<LandingHero />

<div className="row" style={{ marginTop: '3rem', gridGap: '3rem 0rem' }}>
  <div className="auto-col">
    <Card
      variant="icon"
      icon={<img src="/assets/menu/near.svg" alt="NEAR Protocol" />}
      title="New to NEAR?"
      description="NEAR is a layer-1 blockchain built for scale and multichain compatibility. Battle-tested with 13M+ transaction peaks and 5 years of zero downtime"
    >
      <ul>
        <li><a href="/protocol/basics">Learn All About our Protocol</a></li>
        <li><a href="/tutorials/protocol/create-account">Create a NEAR Account</a></li>
        <li><a href="/faucet">Get Testnet Tokens</a></li>
      </ul>
    </Card>
  </div>
  <div className="auto-col">
    <Card
      variant="icon"
      icon={<img src="/assets/menu/ai.svg" alt="AI Native Infrastructure" />}
      title="AI Native Infrastructure"
      description="NEAR is the execution layer for AI-native apps—enabling agents to own assets, make decisions, and transact freely across networks"
    >
      <ul>
        <li><a href="/ai/introduction">Understand AI & Blockchain</a></li>
        <li><a href="/ai/shade-agents/introduction">Build a Multi-chain Trustless Agent</a></li>
        <li><a href="https://docs.near.ai">Discover the NEAR AI Cloud</a></li>
      </ul>
    </Card>
  </div>
  <div className="auto-col">
    <Card
      variant="icon"
      icon={<img src="/assets/menu/multichain.svg" alt="Multi-Chain" />}
      title="Multi-Chain"
      description="Easily control assets on any chain, bridge them, swap them, and build cross-chain applications with NEAR's chain abstraction layer"
    >
      <ul>
        <li><a href="/chain-abstraction/what-is">Learn How Chain Abstraction Works</a></li>
        <li><a href="/chain-abstraction/intents/overview">Discover NEAR Intents</a></li>
        <li><a href="/chain-abstraction/chain-signatures">Read on Chain Signatures</a></li>
      </ul>
    </Card>
  </div>
  <div className="auto-col">
    <Card
      variant="icon"
      icon={<img src="/assets/menu/app.svg" alt="Web3 Applications" />}
      title="Web3 Applications"
      description="Create modern web applications that interact with the NEAR blockchain. Learn frontend integration and user experience best practices"
    >
      <ul>
        <li><a href="/web3-apps/what-is">Discover What are Web3 Apps</a></li>
        <li><a href="/web3-apps/quickstart">Create your First Web3 App ✨</a></li>
        <li><a href="/web3-apps/integrate-contracts">Use a Contract in Your Frontend</a></li>
      </ul>
    </Card>
  </div>
  <div className="auto-col">
    <Card
      variant="icon"
      icon={<img src="/assets/menu/contract.svg" alt="Smart Contracts" />}
      title="Smart Contracts"
      description="Deploy and interact with smart contracts on NEAR. From basic concepts to advanced patterns and security best practices"
    >
      <ul>
        <li><a href="/smart-contracts/what-is">What are Smart Contracts?</a></li>
        <li><a href="/smart-contracts/quickstart">Quickstart ✨</a></li>
        <li><a href="/smart-contracts/anatomy/">Contract's Anatomy</a></li>
      </ul>
    </Card>
  </div>
  <div className="auto-col">
    <Card
      variant="icon"
      icon={<img src="/assets/menu/token.svg" alt="Tokens and Primitives" />}
      title="Tokens and Primitives"
      description="Learn about FTs, NFTs, DAOs and everything you need to build an application on NEAR"
    >
      <ul>
        <li><a href="/primitives/ft">Fungible Tokens (FT)</a></li>
        <li><a href="/primitives/nft">Non-Fungible Tokens (NFT)</a></li>
        <li><a href="/primitives/dao">Autonomous Organizations</a></li>
      </ul>
    </Card>
  </div>
</div>
