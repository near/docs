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
      variant="icon"
      icon={<img src="/icons/near.svg" alt="Mastering NEAR" />}
      title="Mastering NEAR"
      description="New to NEAR development? Start with our comprehensive introduction to building Web3 applications"
      links={{
        "Master Applications": "/tutorials/auction/introduction",
        "What are Smart Contracts?": "/smart-contracts/what-is",
        "What are Web3 Apps?": "/web3-apps/what-is",
      }}
    />
  </div>
  <div className="col col--4">
    <Card
      variant="icon"
      icon={<img src="/icons/app.svg" alt="Frontend Examples" />}
      title="Frontend Examples"
      description="Build modern web interfaces that connect to NEAR contracts with these practical examples"
      links={{
        "Guest Book": "/tutorials/examples/guest-book",
        "Multi-Contract Frontend":
          "/tutorials/examples/frontend-multiple-contracts",
        "Marketplace Template": "/tutorials/templates/marketplace",
      }}
    />
  </div>
  <div className="col col--4">
    <Card
      variant="icon"
      icon={<img src="/icons/contract.svg" alt="Smart Contract Examples" />}
      title="Smart Contract Examples"
      description="Learn smart contract development with real-world examples from simple to advanced patterns"
      links={{
        "Count on NEAR": "/tutorials/examples/count-near",
        "Cross-Contract Calls": "/tutorials/examples/xcc",
        "Coin Flip Game": "/tutorials/examples/coin-flip",
      }}
    />
  </div>
</div>
<div className="row">
  <div className="col col--4">
    <Card
      variant="icon"
      icon={<img src="/icons/token.svg" alt="Tokens & NFTs" />}
      title="Tokens & NFTs"
      description="Master fungible and non-fungible tokens on NEAR with comprehensive step-by-step tutorials"
      links={{
        "Fungible Tokens (FT)": "/tutorials/fts/introduction",
        "Non-Fungible Tokens (NFT)": "/tutorials/nfts/introduction",
        "NFT Tutorial (JS)": "/tutorials/nfts/js/introduction",
      }}
    />
  </div>
  <div className="col col--4">
    <Card
      variant="icon"
      icon={<img src="/icons/multichain.svg" alt="Multichain Development" />}
      title="Multichain Development"
      description="Explore NEAR's multichain capabilities and learn to control accounts across different networks"
      links={{
        "Controlling NEAR Accounts":
          "/tutorials/controlling-near-accounts/introduction",
        "Multi-Chain DAO": "/tutorials/multichain-dao/introduction",
        "Chain Signatures": "/chain-abstraction/chain-signatures",
      }}
    />
  </div>
  <div className="col col--4">
    <Card
      variant="icon"
      icon={<img src="/icons/database.svg" alt="Data Infrastructure" />}
      title="Data Infrastructure"
      description="Build indexers and work with NEAR's data layer to create powerful data-driven applications"
      links={{
        "NEAR Lake Framework":
          "/data-infrastructure/lake-framework/building-indexers/primitives",
        "NFT Indexer":
          "/data-infrastructure/lake-framework/building-indexers/nft-indexer",
        "JavaScript Lake Indexer":
          "/data-infrastructure/lake-framework/building-indexers/js-lake-indexer",
      }}
    />
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
