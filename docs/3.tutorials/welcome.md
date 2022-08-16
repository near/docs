---
id: welcome
title: Examples & Tutorials
hide_table_of_contents: true

---

import {FeatureList, Column, Feature} from "@site/components/featurelist"

Explore our collection of Examples and Tutorials

<FeatureList>
  <Column title="Examples">
    <Feature url="/tutorials/examples/hello-near" title="Hello NEAR" subtitle="A friendly app that stores a greeting" image="hello-near.png" />
    <Feature url="/tutorials/examples/count-near" title="Count on NEAR" subtitle="A counter in the blockchain" image="count-near.png" />
    <Feature url="/tutorials/examples/guest-book" title="Guest Book" subtitle="Create a simple guest book" image="guest-book.png" />
    <Feature url="/tutorials/examples/donation" title="Donation" subtitle="How to receive and send tokens" image="donation.png" />
    <Feature url="/tutorials/examples/xcc" title="Cross-Contract Call" subtitle="Learn how to call other contracts" image="cross-call.png" />
  </Column>
  <Column title="How to: DeFi & Governance">
    <Feature url="/develop/relevant-contracts/ft" title="Fungible Tokens" subtitle="Learn how to use and make FT" image="ft.png" />
    <Feature url="/develop/relevant-contracts/nft" title="Non-Fungible Tokens" subtitle="Enter the NFT space" image="nft.png" />
    <Feature url="/develop/relevant-contracts/dao" title="Autonomous Organizations" subtitle="Understand autonomous organizations" image="dao.png" />
  </Column>
  <Column title="From Zero to Hero">
    <Feature url="/tutorials/nfts/js/introduction" title="Master NFT in NEAR (JS)" subtitle="Learn everything about NFT in JS" image="nft-marketplace-js.png" />
    <Feature url="/tutorials/nfts/introduction" title="Master NFT in NEAR (RS)" subtitle="Learn everything about NFT in Rust" image="nft-marketplace-rs.png" />
    <Feature url="/tutorials/crosswords/basics/overview" title="Crossword Game" subtitle="Build a Crossword Game from zero" image="crossword.png" />
  </Column>
</FeatureList>

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