---
id: welcome
title: NEAR - Your gateway to an Open Web
hide_table_of_contents: true
---
import {FeatureList, Column, Feature} from "@site/components/featurelist"
import ContactUs from '@site/components/ContactUs.mdx';

Welcome, this is the starting point for all NEAR documentation. Build and publish open web applications. Embrace the power of Web3.

<div class="container">
  <div class="row">
    <div class="col col--4">
      <a href="/concepts/welcome">
        <div class="card">
          <div class="card__image">
            <img src={require("@site/static/docs/assets/welcome-pages/protocol.png").default} alt="Learn" />
          </div>
          <div class="card__body">
            <h3>Understand NEAR</h3>
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
              Learn to build NEAR smart contracts.
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
            <h3>Discover our Toolkit</h3>
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

<h1 class="text-center big-title mt-2" > Browse the Docs By Topic </h1>

<FeatureList>
  <Column title="Understanding NEAR" size="3">
    <Feature url="/concepts/basics/protocol" title="What is NEAR?" subtitle="Learn the Basics about NEAR" image="near-logo.png" />
    <Feature url="/concepts/basics/accounts/account-id" title="Named Accounts" subtitle="NEAR uses human-readable accounts" image="user.png" />
    <Feature url="/concepts/basics/accounts/access-keys" title="Multiple Access Keys" subtitle="More keys means more security" image="key.png" />
    <Feature url="/concepts/basics/transactions/overview" title="Transactions" subtitle="Fast and Inexpensive" image="transaction.png" />
    <Feature url="/concepts/basics/validators" title="Validators" subtitle="Learn how the network stays safe" image="validation.png" />
  </Column>
  <Column title="Smart Contracts" size="3">
    <Feature url="/develop/contracts/quickstart" title="Contract Quickstart" subtitle="Create your first contract in minutes" image="smartcontract.png" />
    <Feature url="/tutorials/welcome" title="Tutorials & Examples" subtitle="Check out a vast library of examples" image="tutorials.png" />
    <Feature url="/develop/testing/introduction" title="Sandbox Testing" subtitle="Write unit & integration tests" image="test.png" />
  </Column>
    <Column title="Web Apps" size="3">
    <Feature url="/bos/quickstart" title="WebApp Quickstart" subtitle="Spin-up your first dApp in minutes" image="quickstart.png" />
    <Feature url="/tutorials/welcome" title="Tutorials & Examples" subtitle="Check out a vast library of examples" image="tutorials.png" />
    <Feature url="/develop/integrate/frontend" title="Build a Web Frontend" subtitle="Learn how to make a web dApp" image="frontend.png" />
    <Feature url="/tools/realtime" title="Monitor your App" subtitle="Learn how to track the Blockchain" image="monitor.png" />
  </Column>

  <Column title="Query the Chain" size="3">
    <Feature url="/tutorials/indexer/nft-indexer" title="Events (NEAR Lake)" subtitle="Use our Data Lake to listen for events" image="multiple.png" />
    <Feature url="/bos/queryapi/big-query" title="Google BigQuery" subtitle="Query network data in a cost efficient way" image="experiment.png" />
    <Feature url="/tools/near-lake" title="Overview" subtitle="Learn about our Data Lake" image="near-logo.png" />
    <Feature url="/tutorials/indexer/js-lake-indexer" title="JS Tutorial" subtitle="Learn how to consume data from our Lake using JS" image="near-api-js.png" />
  </Column>

</FeatureList>

---

## Other Documentation Sites

Here are more sources from our ecosystem that can help you to learn more about NEAR.

<div class="container">
  <div class="row cards">
    <div class="col col--4">
      <a href="https://www.discoverbos.org/">
        <div class="card">
          <div class="card__image">
            <img src={require("@site/static/docs/assets/welcome-pages/awesomenear.png").default} alt="Discover" />
          </div>
          <div class="card__body">
            <h3>
            Discover
            <svg width="0.8rem" height="0.8rem" aria-hidden="true" viewBox="0 0 24 24" class="iconExternalLink_node_modules-@docusaurus-theme-classic-lib-theme-Icon-ExternalLink-styles-module"><path fill="currentColor" d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"></path></svg>
            </h3>
            Discover apps in Near.
          </div>
        </div>
      </a>
    </div>
    <div class="col col--4">
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
              Read the protocol specification.
          </div>
        </div>
      </a>
    </div>
    <div class="col col--4">
      <a href="https://near-nodes.io">
        <div class="card">
          <div class="card__image">
            <img src={require("@site/static/docs/assets/welcome-pages/validate.png").default} alt="Validate" />
          </div>
          <div class="card__body">
            <h3>
            Become a Validator
            <svg width="0.8rem" height="0.8rem" aria-hidden="true" viewBox="0 0 24 24" class="iconExternalLink_node_modules-@docusaurus-theme-classic-lib-theme-Icon-ExternalLink-styles-module"><path fill="currentColor" d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"></path></svg>
            </h3>
            Help keeping NEAR safe.
          </div>
        </div>
      </a>
    </div>
  </div>
</div>

<hr class="subsection" />

<ContactUs />
