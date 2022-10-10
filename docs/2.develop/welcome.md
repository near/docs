---
id: welcome
title: Developer Documentation
sidebar_label: Home
hide_table_of_contents: true
---
import {FeatureList, Column, Feature} from "@site/components/featurelist"


Welcome! Here you will find documentation on how to develop decentralized apps using NEAR.

Do not worry if you are new to smart contract technology, we will get you up to speed in no time.

<FeatureList>
  <Column title="Build dApps">
    <Feature url="/develop/quickstart-guide" title="Quickstart" subtitle="Spin-up your first dApp" image="quickstart.png" />
    <Feature url="/tutorials/welcome" title="Tutorials & Examples" subtitle="Check-out a vast library of examples" image="tutorials.png" />
    <Feature url="/develop/contracts/introduction" title="Build a Contract" subtitle="Learn how to write smart contracts" image="smartcontract.png" />
    <Feature url="/develop/testing/introduction" title="Test the Contract" subtitle="Write unit & integration tests" image="test.png" />
    <Feature url="/develop/integrate/frontend" title="Build a Web Frontend" subtitle="Learn how to make a web dApp" image="frontend.png" />
    <Feature url="/tools/realtime" title="Track Your Users Activity" subtitle="Learn how to use Indexers" image="monitor.png" />
  </Column>
  <Column title="Developer Tools">
    <Feature url="/tools/near-sdk-js" title="Javascript SDK" subtitle="Write Contracts in Javascript" image="smartcontract-js.png" />
    <Feature url="/tools/near-sdk-rs" title="Rust SDK" subtitle="Write Contracts in Rust" image="smartcontract-rust.png" />
    <Feature url="/tools/near-cli" title="NEAR CLI" subtitle="Use NEAR from the Terminal" image="near-cli.png" />
    <Feature url="/tools/near-api-js/quick-reference" title="NEAR API JS" subtitle="Interact with NEAR from JS" image="near-api-js.png" />
    <Feature url="/api/rpc/introduction" title="RPC API" subtitle="Interact with the NEAR RPC API" image="rpc.png" />
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

## Contact us

If you have any questions, or simply would want to chat with us, please do through one of our official channels. Also, jump into our Discord server and join our office hours every week-day!.

<br/>

<div class="container">
  <div class="row">
    <div class="col col--2">
      <div class="avatar">
        <img
          class="avatar__photo"
          src={require("@site/static/docs/assets/home/twitter.png").default} />
        <div class="avatar__intro">
          <div class="avatar__name">Twitter</div>
          <small class="avatar__subtitle"><a href="https://twitter.com/@nearprotocol">@nearprotocol</a></small>
        </div>
      </div>
    </div>
    <div class="col col--2">
      <div class="avatar">
        <img
          class="avatar__photo"
          src={require("@site/static/docs/assets/home/discord.png").default} />
        <div class="avatar__intro">
          <div class="avatar__name">Discord</div>
          <small class="avatar__subtitle"><a href="https://discord.gg/kwYjDn4yka">NEAR Protocol</a></small>
        </div>
      </div>
    </div>
    <div class="col col--2">
      <div class="avatar">
        <img
          class="avatar__photo"
          src={require("@site/static/docs/assets/home/zulip.png").default} />
        <div class="avatar__intro">
          <div class="avatar__name">Zulip</div>
          <small class="avatar__subtitle"><a href="https://near.zulipchat.com/">Near Chat</a></small>
        </div>
      </div>
    </div>
  </div>
</div>
