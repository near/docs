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
        description="Take your first steps and learn the basics of NEAR smart contracts."
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
        icon={<img src="/assets/menu/ai.svg" alt="Advanced" />}
        title="Advanced"
        description="Learn more about NEAR smart contracts with advanced tutorials."
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
        icon={<img src="/assets/menu/multichain.svg" alt="Cross-Contracts" />}
        title="Cross Contracts"
        description="Learn how to perform cross-contract calls on NEAR."
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
        icon={<img src="/assets/menu/app.svg" alt="Factories" />}
        title="Factories"
        description="Learn how to deploy multiple contracts using a factory contract."
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
        description="Learn how to build a full FT or NFT contract from scratch, one step at a time."
      >
        <ul>
          <li><a href="/tutorials/fts">Fungible Token (FT) Contract</a></li>
          <li><a href="/tutorials/nfts">Non-Fungible Tokens (NFT) Contract</a></li>
          <li><a href="/tutorials/nfts-js">Non-Fungible Tokens (NFT) Contract (JavaScript)</a></li>
        </ul>
      </Card>
    </div>
  </div>


</div>
