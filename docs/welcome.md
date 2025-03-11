---
id: welcome
title: Welcome to NEAR
sidebar_label: Home
hide_table_of_contents: true
---

import {FeatureList, Column, Feature} from "@site/src/components/featurelist";
import {Container, Card} from "@site/src/components/cards";

Imagine a place where you can build Web3 apps with the simplicity of Web2. Imagine a place where you can empower communities, supercharge AI, and easily integrate your app with other chains. Welcome to NEAR; you're going to like it here.

<Container>
    <Card img={require("@site/static/docs/assets/welcome-pages/protocol.png").default}
          title="NEAR Protocol"
          text="Learn what NEAR is and how it works"
          links={{
            "What is NEAR?": "/concepts/basics/protocol",
            "Named Accounts": "/protocol/account-id",
            "Access Keys": "/protocol/access-keys",
            "Transactions": "/protocol/transactions"
          }}
    />
    <Card img={require("@site/static/docs/assets/welcome-pages/chain-abstraction-landing.png").default}
          title="Chain Abstraction"
          text="Forget about the chain, focus on usability"
          links={{
            "What is Chain Abstraction?": "/chain-abstraction/what-is",
            "Chain Signatures ✨": "/chain-abstraction/chain-signatures",
            "Meta-transactions": "/chain-abstraction/meta-transactions",
            "NEAR Intents": "/chain-abstraction/intents/overview",
          }}
    />
    <Card img={require("@site/static/docs/assets/welcome-pages/examples-landing.png").default}
          title="Web3 Applications"
          text="Supercharge your App using NEAR"
          links={{
            "What are Web3 Applications?": "/build/web3-apps/what-is",
            "Quickstart ✨": "/build/web3-apps/quickstart",
            "Create an AI Assistant 🤖✨": "/build/web3-apps/ai/ai-assistant",
            "Use a Contract in Your Frontend": "/build/web3-apps/integrate-contracts",
          }}
    />
    <Card img={require("@site/static/docs/assets/welcome-pages/contracts.png").default}
          title="Smart Contracts"
          text="NEAR accounts can host small programs"
          links={{
            "What is a Contract?": "/build/smart-contracts/what-is",
            "Quickstart ✨": "/build/smart-contracts/quickstart",
            "Contract's Anatomy": "/build/smart-contracts/anatomy/",
            "Sandbox Testing": "/build/smart-contracts/testing/integration-test"
          }}
    />
    <Card img={require("@site/static/docs/assets/welcome-pages/primitives-landing.png").default}
          title="Primitives"
          text="FTs, NFTs, and everything your app needs"
          links={{
            "What are Primitives?": "/build/primitives/what-is",
            "Fungible Tokens (FT)": "/build/primitives/ft",
            "Non-Fungible Tokens (NFT)": "/build/primitives/nft",
            "Autonomous Organizations": "/build/primitives/dao",
            "Decentralized Exchanges": "/build/primitives/dex",
            "Linkdrops": "/build/primitives/linkdrop",
          }}
    />
    <Card img={require("@site/static/docs/assets/welcome-pages/data-lake-landing.png").default}
          title="Data Infrastructure"
          text="Easily extract and analyze on-chain data"
          links={{
            "What is Data Infrastructure?": "/data-infrastructure/what-is",
            "BigQuery": "/data-infrastructure/big-query",
            "Data APIs": "/data-infrastructure/data-apis",
            "Lake Framework": "/data-infrastructure/lake-framework/near-lake-framework",
          }}
    />
</Container>

---

## External Resources

Here are more sources from our ecosystem that can help you to learn more about NEAR.

<div className="row cards">
  <div className="col col--6">
    <a href="https://dev.near.org/applications" target="_blank" rel="noopener noreferrer">
      <div className="card">
        <div className="card__image">
          <img src={require("@site/static/docs/assets/welcome-pages/awesomenear.jpg").default} alt="Discover" />
        </div>
        <div className="card__body">
          <h3>
          Discover
          </h3>
          Discover awesome apps in the Near ecosystem
        </div>
      </div>
    </a>
  </div>
  <div className="col col--6">
    <a href="https://near.github.io/nearcore/" target="_blank" rel="noopener noreferrer">
      <div className="card">
        <div className="card__image">
          <img src={require("@site/static/docs/assets/welcome-pages/nomicon.png").default} alt="NEAR Core" />
        </div>
        <div className="card__body">
          <h3>
          NEAR Core
          </h3>
          Learn the official protocol documentation
        </div>
      </div>
    </a>
  </div>
  <div className="col col--6">
    <a href="https://near-nodes.io" target="_blank" rel="noopener noreferrer">
      <div className="card">
        <div className="card__image">
          <img src={require("@site/static/docs/assets/welcome-pages/validate.png").default} alt="Validate" />
        </div>
        <div className="card__body">
          <h3>
          Running a Node
          </h3>
          Become a validator, help keeping the blockchain safe
        </div>
      </div>
    </a>
  </div>
  <div className="col col--6">
    <a href="https://templates.mintbase.xyz/" target="_blank" rel="noopener noreferrer">
      <div className="card">
        <div className="card__image">
          <img src={require("@site/static/docs/assets/welcome-pages/mintbase-templates.png").default} alt="Templates" />
        </div>
        <div className="card__body">
          <h3>
          Templates
          </h3>
          Templates for creating web3 applications
        </div>
      </div>
    </a>
  </div>
</div>
