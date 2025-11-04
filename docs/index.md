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

<div className="landing">

  <LandingHero />

  <div className="container margin-top--xl">
    <div className="row">
    <div className="col col--4">
      <Card
        variant="icon"
        icon={<img src="/assets/menu/near.svg" alt="NEAR Protocol" />}
        title="New to NEAR?"
        description="NEAR is a layer-1 blockchain built for scale and multichain compatibility. Battle-tested with 13M+ transaction peaks and 5 years of zero downtime"
        color="mint"
      >
        <ul>
          <li><a href="/protocol/basics">What is NEAR?</a></li>
          <li><a href="/protocol/account-id">Account Model</a></li>
          <li><a href="/protocol/transactions">Transactions</a></li>
        </ul>
      </Card>
    </div>
    <div className="auto-col">
      <Card
        variant="icon"
        icon={<img src="/assets/menu/ai.svg" alt="AI Native Infrastructure" />}
        title="AI Native Infrastructure"
        description="NEAR is the execution layer for AI-native apps—enabling agents to own assets, make decisions, and transact freely across networks"
        color="purple"
      >
        <ul>
          <li><a href="/ai/introduction">Getting Started</a></li>
          <li><a href="/ai/shade-agents/introduction">Shade Agents</a></li>
          <li><a href="https://docs.near.ai">NEAR AI Docs</a></li>
        </ul>
      </Card>
    </div>
    <div className="auto-col">
      <Card
        variant="icon"
        icon={<img src="/assets/menu/multichain.svg" alt="Multi-Chain" />}
        title="Multi-Chain"
        description="Tap into any blockchain with NEAR's chain abstraction layer"
        color="orange"
      >
        <ul>
          <li><a href="/chain-abstraction/what-is">What is Chain Abstraction?</a></li>
          <li><a href="/chain-abstraction/intents/overview">NEAR Intents</a></li>
          <li><a href="/chain-abstraction/chain-signatures">Chain Signatures</a></li>
        </ul>
      </Card>
    </div>
  </div>
  <div className="row">
    <div className="col col--4">
      <Card
        variant="icon"
        icon={<img src="/assets/menu/app.svg" alt="Web3 Applications" />}
        title="Web3 Applications"
        description="Create modern web applications that interact with the NEAR blockchain. Learn frontend integration and user experience best practices"
        color="mint"
      >
        <ul>
          <li><a href="/web3-apps/what-is">What are Web3 Apps?</a></li>
          <li><a href="/web3-apps/quickstart">Quickstart ✨</a></li>
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
        color="purple"
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
        color="orange"
      >
        <ul>
          <li><a href="/primitives/ft">Fungible Tokens (FT)</a></li>
          <li><a href="/primitives/nft">Non-Fungible Tokens (NFT)</a></li>
          <li><a href="/primitives/dao">Autonomous Organizations</a></li>
        </ul>
      </Card>
    </div>
  </div>
  </div>

</div>
