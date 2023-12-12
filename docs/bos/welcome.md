---
id: welcome
title: Build Composable Applications
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

---

<ContactUs />
