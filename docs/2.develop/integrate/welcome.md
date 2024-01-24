---
id: welcome
title: Build Web3 Applications
sidebar_label: Home
hide_table_of_contents: true
---

import {FeatureList, Column, Feature} from "@site/src/components/featurelist"
import ContactUs from '@site/src/components/ContactUs.mdx';

Welcome! Here you will find documentation on how to build Web3 applications using NEAR. What are you planning to build?

<div class="container">
  <div class="row">
    <div class="col col--3">
      <a href="/bos/overview">
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
      <a href="/develop/integrate/frontend">
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
  <Column title="Composable Apps">
    <Feature url="/bos/tutorial/quickstart" title="Overview" subtitle="Learn how components work" image="frontend-bos.png" />
    <Feature url="/bos/dev/intro" title="Dev Environment" subtitle="Setup your dev environment" image="near-logo.png" />
    <Feature url="/bos/api/state" title="Anatomy of a Component" subtitle="Learn how to build components" image="guest-book.png" />
    <Feature url="/bos/api/state" title="Integrate on your App" subtitle="Integrate components to your App" image="bos-lido.png" />
  </Column>
  <Column title="NEAR Integrations">
    <Feature url="/develop/integrate/quickstart-frontend" title="Quickstart" subtitle="Create your first dApp!" image="quickstart.png" />
    <Feature url="/develop/integrate/frontend" title="Frontend Integration" subtitle="Connect your app to NEAR" image="bos-contract.png" />
    <Feature url="/develop/integrate/backend-login" title="Login to a Backend" subtitle="Login users through NEAR Accounts" image="near-cli.png" />
  </Column>
  <Column title="Discover Gateways">
    <Feature url="https://near.org" title="near.org" subtitle="The main gateway to NEAR" image="near-logo.png" />
    <Feature url="https://near.social" title="NEAR Social" subtitle="A social gateway built on NEAR" image="near-social.png" />
    <Feature url="https://bos.gg" title="bos.gg" subtitle="Near Loves Ethereum" image="near-eth.png" />
    <Feature url="https://welldone-gateway.vercel.app/" title="WellDone Gateway" subtitle="A multichain gateway" image="welldone.png" />
  </Column>
</FeatureList>

<br/>

---

<ContactUs />
