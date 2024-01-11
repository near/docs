---
id: welcome
title: NEAR - Your Gateway to an Open Web
hide_table_of_contents: true
---

import {FeatureList, Column, Feature} from "@site/src/components/featurelist"
import ContactUs from '@site/src/components/ContactUs.mdx';

Welcome, this is the starting point for all NEAR documentation. Learn to build and publish blockchain applications. Embrace the power of Web3.

<div class="container">
  <div class="row">
    <div class="col col--4">
      <a href="/concepts/welcome">
        <div class="card">
          <div class="card__image">
            <img src={require("@site/static/docs/assets/welcome-pages/protocol.png").default} alt="Learn" />
          </div>
          <div class="card__body">
            <h3>Understanding NEAR</h3>
            Learn what NEAR is and how it works.
          </div>
        </div>
      </a>
    </div>
    <div class="col col--4">
      <a href="/develop/contracts/welcome">
        <div class="card">
          <div class="card__image">
            <img src={require("@site/static/docs/assets/welcome-pages/contracts.png").default} alt="Contracts" />
          </div>
          <div class="card__body">
            <h3>Smart Contracts</h3>
              Learn to build smart contracts in NEAR.
          </div>
        </div>
      </a>
    </div>
    <div class="col col--4">
      <a href="/develop/integrate/welcome">
        <div class="card">
          <div class="card__image">
            <img src={require("@site/static/docs/assets/welcome-pages/bos-landing.png").default} alt="Web3 Apps" />
          </div>
          <div class="card__body">
            <h3>Web Applications</h3>
              Learn to build multi-chain web apps.
          </div>
        </div>
      </a>
    </div>
    <div class="col col--4">
      <a href="/primitives/welcome">
        <div class="card">
          <div class="card__image">
            <img src={require("@site/static/docs/assets/welcome-pages/examples.png").default} alt="Solutions" />
          </div>
          <div class="card__body">
            <h3>NEAR Primitives</h3>
              Reliable solutions powered by NEAR.
          </div>
        </div>
      </a>
    </div>
    <div class="col col--4">
      <a href="/tools/welcome">
        <div class="card">
          <div class="card__image">
            <img src={require("@site/static/docs/assets/welcome-pages/tools.png").default} alt="Tools" />
          </div>
          <div class="card__body">
            <h3>NEAR Tools</h3>
              Info on our SDK, API, CLI, and more.
          </div>
        </div>
      </a>
    </div>
    <div class="col col--4">
      <a href="/develop/monitor">
        <div class="card">
          <div class="card__image">
            <img src={require("@site/static/docs/assets/welcome-pages/data-lake.png").default} alt="Data Lake" />
          </div>
          <div class="card__body">
            <h3>Query On-Chain Information</h3>
              Learn about indexers and our data lake.
          </div>
        </div>
      </a>
    </div>
  </div>
</div>

<hr class="subsection" />

<h1 class="text-center big-title" > Browse the Docs By Topic </h1>

<FeatureList>
  <Column title="Understanding NEAR" size="3">
    <Feature url="/concepts/basics/protocol" title="What is NEAR?" subtitle="Learn the Basics about NEAR" image="near-logo.png" />
    <Feature url="/concepts/basics/accounts/account-id" title="Named Accounts" subtitle="NEAR uses human-readable accounts" image="user.png" />
    <Feature url="/concepts/basics/accounts/access-keys" title="Multiple Access Keys" subtitle="More keys means more security" image="key.png" />
    <Feature url="/concepts/basics/accounts/smartcontract" title="Smart Contracts" subtitle="Learn about our contract technology" image="contract.png" />
    <Feature url="/concepts/basics/tokens" title="Token" subtitle="Learn about the NEAR token" image="ft.png" />
    <Feature url="/concepts/basics/transactions/overview" title="Transactions" subtitle="Fast and Inexpensive" image="transaction.png" />
    <Feature url="/concepts/basics/validators" title="Validators" subtitle="Learn how the network stays safe" image="validation.png" />
  </Column>
  <Column title="Developer Docs" size="3">
    <Feature url="/develop/integrate/quickstart-frontend" title="Quickstart: WebApp" subtitle="Spin-up your first dApp" image="quickstart.png" />
    <Feature url="/develop/contracts/quickstart" title="Quickstart: Contract" subtitle="Learn how to write smart contracts" image="smartcontract.png" />
    <Feature url="/develop/monitor" title="Monitor your App" subtitle="Learn how to track the Blockchain" image="monitor.png" />
    <Feature url="/tutorials/welcome" title="Tutorials & Examples" subtitle="Check out a vast library of examples" image="tutorials.png" />
  </Column>
  <Column title="Developer Tools" size="3">
    <Feature url="/sdk/js/introduction" title="JavaScript SDK" subtitle="Write contracts in JavaScript" image="smartcontract-js.png" />
    <Feature url="/sdk/rust/introduction" title="Rust SDK" subtitle="Write contracts in Rust" image="smartcontract-rust.png" />
    <Feature url="/tools/near-cli" title="NEAR CLI" subtitle="Use NEAR from the Terminal" image="near-cli.png" />
    <Feature url="/tools/near-api-js/quick-reference" title="NEAR API JS" subtitle="Interact with NEAR from JS" image="near-api-js.png" />
    <Feature url="/api/rpc/introduction" title="RPC API" subtitle="Interact with the NEAR RPC API" image="rpc.png" />
    <Feature url="/concepts/advanced/indexers" title="Indexing blockchain data" subtitle="Query usage information for a contract" image="blocks.png" />
  </Column>
  <Column title="Examples & Tutorials" size="3">
    <Feature url="/develop/relevant-contracts/ft" title="Fungible Tokens" subtitle="Learn how to use and make FT" image="ft.png" />
    <Feature url="/develop/relevant-contracts/nft" title="Non-Fungible Tokens" subtitle="Enter the NFT space" image="nft.png" />
    <Feature url="/develop/relevant-contracts/dao" title="Autonomous Organizations" subtitle="Understand DAOs" image="dao.png" />
    <Feature url="/tutorials/indexer/near-lake-state-changes-indexer" title="Lake Indexer" subtitle="Watch the network and access all the events" image="experiment.png" />
  </Column>
</FeatureList>

---

## Other Documentation Sites

Here are more sources from our ecosystem that can help you to learn more about NEAR.

<div class="container">
  <div class="row cards">
    <div class="col col--6">
      <a href="https://awesomenear.com">
        <div class="card">
          <div class="card__image">
            <img src={require("@site/static/docs/assets/welcome-pages/awesomenear.jpg").default} alt="Discover" />
          </div>
          <div class="card__body">
            <h3>
            Discover
            <svg width="0.8rem" height="0.8rem" aria-hidden="true" viewBox="0 0 24 24" class="iconExternalLink_node_modules-@docusaurus-theme-classic-lib-theme-Icon-ExternalLink-styles-module"><path fill="currentColor" d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"></path></svg>
            </h3>
            Discover awesome apps in the Near ecosystem.
          </div>
        </div>
      </a>
    </div>
    <div class="col col--6">
      <a href="https://nomicon.io">
        <div class="card">
          <div class="card__image">
            <img src={require("@site/static/docs/assets/welcome-pages/nomicon.png").default} alt="Nomicon" />
          </div>
          <div class="card__body">
            <h3>
            Nomicon
            <svg width="0.8rem" height="0.8rem" aria-hidden="true" viewBox="0 0 24 24" class="iconExternalLink_node_modules-@docusaurus-theme-classic-lib-theme-Icon-ExternalLink-styles-module"><path fill="currentColor" d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"></path></svg>
            </h3>
              See how NEAR is implemented in the official protocol specification.
          </div>
        </div>
      </a>
    </div>
    <div class="col col--6">
      <a href="https://near-nodes.io">
        <div class="card">
          <div class="card__image">
            <img src={require("@site/static/docs/assets/welcome-pages/validate.png").default} alt="Validate" />
          </div>
          <div class="card__body">
            <h3>
            Running a Node
            <svg width="0.8rem" height="0.8rem" aria-hidden="true" viewBox="0 0 24 24" class="iconExternalLink_node_modules-@docusaurus-theme-classic-lib-theme-Icon-ExternalLink-styles-module"><path fill="currentColor" d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"></path></svg>
            </h3>
            Documentation on becoming a validator to help keeping the blockchain safe
          </div>
        </div>
      </a>
    </div>
    <div class="col col--6">
      <a href="/concepts/advanced/indexers">
        <div class="card">
          <div class="card__image">
            <img src={require("@site/static/docs/assets/welcome-pages/indexers.png").default} alt="Indexers" />
          </div>
          <div class="card__body">
            <h3>NEAR Indexers</h3>
              Indexers help you mine information from the blockchain
          </div>
        </div>
      </a>
    </div>
  </div>
</div>

<hr class="subsection" />

<ContactUs />
