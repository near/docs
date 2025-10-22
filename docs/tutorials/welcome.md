---
id: welcome
title: Examples & Tutorials
sidebar_label: Home
description: Explore practical examples and step-by-step tutorials on NEAR to grow your skills from beginner to advanced.
hide_table_of_contents: true
hide_title: true
---

import Card from "@site/src/components/UI/Card";
import Button from "@site/src/components/UI/Button";

<div className="landing">

<div className="landing-intro">
  <h1>Examples & Tutorials</h1>
  <p className="landing-subtitle">
    Learn to build on NEAR with hands-on examples, comprehensive tutorials, and
    step-by-step guides from beginner to advanced
  </p>
  <div className="landing-underline"></div>
</div>
<div className="row">
  <div className="col col--4">
     <Card 
      img="/icons/near.svg"
      title="NEAR Quest"
      text="Interactive learning journey through gamified quests and challenges designed to build your NEAR development skills step by step"
    >
      <ul>
        <li><a href="/tutorials/near-quest">Start Your Quest</a></li>
      </ul>
    </Card>
    <Card
      variant="icon"
      icon={<img src="/assets/menu/near.svg" alt="Mastering NEAR" />}
      title="Mastering NEAR"
      description="New to NEAR development? Start with our comprehensive introduction to building Web3 applications"
    >
      <ul>
        <li><a href="/tutorials/auction/introduction">Master Applications</a></li>
        <li><a href="/smart-contracts/what-is">What are Smart Contracts?</a></li>
        <li><a href="/web3-apps/what-is">What are Web3 Apps?</a></li>
      </ul>
    </Card>
  </div>
  <div className="col col--4">
    <Card
      variant="icon"
      icon={<img src="/assets/menu/app.svg" alt="Frontend Examples" />}
      title="Frontend Examples"
      description="Build modern web interfaces that connect to NEAR contracts with these practical examples"
    >
      <ul>
        <li><a href="/tutorials/examples/guest-book">Guest Book</a></li>
        <li><a href="/tutorials/examples/frontend-multiple-contracts">Multi-Contract Frontend</a></li>
        <li><a href="/tutorials/templates/marketplace">Marketplace Template</a></li>
      </ul>
    </Card>
  </div>
  <div className="col col--4">
    <Card
      variant="icon"
      icon={<img src="/assets/menu/contract.svg" alt="Smart Contract Examples" />}
      title="Smart Contract Examples"
      description="Learn smart contract development with real-world examples from simple to advanced patterns"
    >
      <ul>
        <li><a href="/tutorials/examples/count-near">Count on NEAR</a></li>
        <li><a href="/tutorials/examples/xcc">Cross-Contract Calls</a></li>
        <li><a href="/tutorials/examples/coin-flip">Coin Flip Game</a></li>
      </ul>
    </Card>
  </div>
</div>
<div className="row">
  <div className="col col--4">
    <Card
      variant="icon"
      icon={<img src="/assets/menu/token.svg" alt="Tokens & NFTs" />}
      title="Tokens & NFTs"
      description="Master fungible and non-fungible tokens on NEAR with comprehensive step-by-step tutorials"
    >
      <ul>
        <li><a href="/tutorials/fts/introduction">Fungible Tokens (FT)</a></li>
        <li><a href="/tutorials/nfts/introduction">Non-Fungible Tokens (NFT)</a></li>
        <li><a href="/tutorials/nfts/js/introduction">NFT Tutorial (JS)</a></li>
      </ul>
    </Card>
  </div>
  <div className="col col--4">
    <Card
      variant="icon"
      icon={<img src="/assets/menu/multichain.svg" alt="Multichain Development" />}
      title="Multichain Development"
      description="Explore NEAR's multichain capabilities and learn to control accounts across different networks"
    >
      <ul>
        <li><a href="/tutorials/controlling-near-accounts/introduction">Controlling NEAR Accounts</a></li>
        <li><a href="/tutorials/multichain-dao/introduction">Multi-Chain DAO</a></li>
        <li><a href="/chain-abstraction/chain-signatures">Chain Signatures</a></li>
      </ul>
    </Card>
  </div>
  <div className="col col--4">
    <Card
      variant="icon"
      icon={<img src="/assets/menu/database.svg" alt="Data Infrastructure" />}
      title="Data Infrastructure"
      description="Build indexers and work with NEAR's data layer to create powerful data-driven applications"
    >
      <ul>
        <li><a href="/data-infrastructure/lake-framework/building-indexers/primitives">NEAR Lake Framework</a></li>
        <li><a href="/data-infrastructure/lake-framework/building-indexers/nft-indexer">NFT Indexer</a></li>
        <li><a href="/data-infrastructure/lake-framework/building-indexers/js-lake-indexer">JavaScript Lake Indexer</a></li>
      </ul>
    </Card>
  </div>
</div>
<div className="landing-footer">
  <h2>Ready to build something amazing?</h2>
  <p>Start with our hands-on tutorials and learn by doing!</p>
  <div className="landing-cta">
    <Button
      href="/tutorials/auction/introduction"
      variant="primary"
      size="large"
    >
      Start Building
    </Button>
  </div>
</div>

</div>
