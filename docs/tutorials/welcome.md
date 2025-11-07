---
id: welcome
hide_table_of_contents: true
title: Smart Contract Tutorials
description: "Learn about smart contracts."
---
import Card from '@site/src/components/UI/Card';

Here you will find information on how to keep your smart contract and decentralized applications secure.

---

<div className="landing">

  <div className="row">
    <div className="auto-col">
      <Card
        variant="icon"
        icon={<img src="/assets/menu/near.svg" alt="NEAR Protocol" />}
        title="Beginner"
        description="NEAR is a layer-1 blockchain built for scale and multichain compatibility. Battle-tested with 13M+ transaction peaks and 5 years of zero downtime"
      >
        <ul>
          <li><a href="/tutorials/examples/count-near">Count on NEAR</a></li>
          <li><a href="/tutorials/examples/guest-book">Guest Book</a></li>
          <li><a href="/tutorials/examples/coin-flip">Coin Flip</a></li>
        </ul>
      </Card>
    </div>
    <div className="auto-col">
      <Card
        variant="icon"
        icon={<img src="/assets/menu/ai.svg" alt="AI Native Infrastructure" />}
        title="Advanced"
        description="NEAR is the execution layer for AI-native apps—enabling agents to own assets, make decisions, and transact freely across networks"
      >
        <ul>
          <li><a href="/tutorials/examples/donation">Donation</a></li>
          <li><a href="/tutorials/examples/near-drop">Near Drop</a></li>
          <li><a href="/tutorials/examples/update-contract-migrate-state">Self Upgrade & State Migration</a></li>
        </ul>
      </Card>
    </div>
    <div className="auto-col">
      <Card
        variant="icon"
        icon={<img src="/assets/menu/multichain.svg" alt="Multi-Chain" />}
        title="Cross Contracts"
        description="Tap into any blockchain with NEAR's chain abstraction layer"
      >
        <ul>
          <li><a href="/tutorials/examples/xcc">Cross Contract Call</a></li>
          <li><a href="/tutorials/examples/advanced-xcc">Complex Cross Contract Call</a></li>
        </ul>
      </Card>
    </div>
    <div className="auto-col">
      <Card
        variant="icon"
        icon={<img src="/assets/menu/app.svg" alt="Web3 Applications" />}
        title="Factories"
        description="Create modern web applications that interact with the NEAR blockchain. Learn frontend integration and user experience best practices"
      >
        <ul>
          <li><a href="/tutorials/examples/factory">Factory</a></li>
          <li><a href="/tutorials/examples/global-contracts">Global Contracts</a></li>
        </ul>
      </Card>
    </div>
    <div className="auto-col">
      <Card
        variant="icon"
        icon={<img src="/assets/menu/contract.svg" alt="Smart Contracts" />}
        title="Zero to Hero"
        description="Deploy and interact with smart contracts on NEAR. From basic concepts to advanced patterns and security best practices"
      >
        <ul>
          <li><a href="/tutorials/fts">Fungible Token (FT) Contract from Scratch</a></li>
          <li><a href="/tutorials/nfts">Non-Fungible Tokens (NFT) Contract from Scratch</a></li>
          <li><a href="/tutorials/nfts-js">Non-Fungible Tokens (NFT) Contract from Scratch (JavaScript)</a></li>
        </ul>
      </Card>
    </div>
  </div>


</div>
