---
id: welcome
title: Build Web3 Applications
sidebar_label: Home
hide_table_of_contents: true
---
import {FeatureList, Column, Feature} from "@site/components/featurelist"
import ContactUs from '@site/components/ContactUs.mdx';


Welcome! Here you will find documentation on how to build Web3 applications using NEAR. What are you planning to build?

<div class="container">
  <div class="row">
    <div class="col col--3">
      <a href="/bos">
        <div class="card">
          <div class="card__image">
            <img src={require("@site/static/docs/assets/welcome-pages/bos-big.png").default} alt="Multichain" />
          </div>
          <div class="card__body">
            <h3>Composable Apps</h3>
              Simple multi-chain apps.
          </div>
        </div>
      </a>
    </div>
    <div class="col col--3">
      <a href="/develop/contracts/welcome">
        <div class="card">
          <div class="card__image">
            <img src={require("@site/static/docs/assets/welcome-pages/web-app.png").default} alt="Contracts" />
          </div>
          <div class="card__body">
            <h3>WebApp Integration</h3>
              Add NEAR to a WebApp.
          </div>
        </div>
      </a>
    </div>
    <div class="col col--3">
      <a href="/develop/relayers/build-relayer">
        <div class="card">
          <div class="card__image">
            <img src={require("@site/static/docs/assets/welcome-pages/relayer.png").default} alt="Relayers" />
          </div>
          <div class="card__body">
            <h3>Relayers</h3>
              Cover GAS for your users.
          </div>
        </div>
      </a>
    </div>
        <div class="col col--3">
      <a href="/develop/integrate/backend-login">
        <div class="card">
          <div class="card__image">
            <img src={require("@site/static/docs/assets/welcome-pages/backend.png").default} alt="Learn" />
          </div>
          <div class="card__body">
            <h3>Backend Integration</h3>
            Use NEAR in your server.
          </div>
        </div>
      </a>
    </div>
  </div>
</div>


<FeatureList>
  <Column title="Build dApps">
    <Feature url="/develop/quickstart-guide" title="Quickstart" subtitle="Spin-up your first dApp" image="quickstart.png" highlight="true" />
    <Feature url="/tutorials/welcome" title="Tutorials & Examples" subtitle="Check-out a vast library of examples" image="tutorials.png" />
    <Feature url="/develop/contracts/introduction" title="Build a Contract" subtitle="Learn how to write smart contracts" image="smartcontract.png" />
    <Feature url="/develop/testing/introduction" title="Test the Contract" subtitle="Write unit & integration tests" image="test.png" />
    <Feature url="/develop/integrate/frontend" title="Build a Web Frontend" subtitle="Learn how to make a web dApp" image="frontend.png" />
    <Feature url="/tools/realtime" title="Track Your Users Activity" subtitle="Learn how to use Indexers" image="monitor.png" />
  </Column>
  <Column title="Developer Tools">
    <Feature url="/sdk/js/introduction" title="Javascript SDK" subtitle="Write Contracts in Javascript" image="smartcontract-js.png" />
    <Feature url="/sdk/rust/introduction" title="Rust SDK" subtitle="Write Contracts in Rust" image="smartcontract-rust.png" />
    <Feature url="/tools/near-cli" title="NEAR CLI" subtitle="Use NEAR from the Terminal" image="near-cli.png" />
    <Feature url="/tools/near-api-js/quick-reference" title="NEAR API JS" subtitle="Interact with NEAR from JS" image="near-api-js.png" />
    <Feature url="/api/rpc/introduction" title="RPC API" subtitle="Interact with the NEAR RPC API" image="rpc.png" />
    <Feature url="/tools/indexer-for-explorer" title="Indexer for Explorer" subtitle="Query usage information for a contract" image="blocks.png" />
  </Column>
  <Column title="Unleash the Web3">
    <Feature url="/develop/relevant-contracts/ft" title="Fungible Tokens" subtitle="Learn how to use and make FT" image="ft.png" />
    <Feature url="/develop/relevant-contracts/nft" title="Non-Fungible Tokens" subtitle="Enter the NFT space" image="nft.png" />
    <Feature url="/develop/relevant-contracts/dao" title="Autonomous Organizations" subtitle="Understand DAOs" image="dao.png" />
    <Feature url="/develop/relevant-contracts/oracles" title="Oracles" subtitle="Supercharge your app with on-chain oracles" image="oracle.png" />
    <Feature url="https://rainbowbridge.app/transfer" title="Rainbow Bridge" subtitle="Bridge assets with other chains" image="rainbow.png" />
    <Feature url="https://aurora.dev" title="Aurora EVM" subtitle="Run Ethereum apps natively" image="aurora.png" />
  </Column>
</FeatureList>

<br/>

---

<ContactUs />
