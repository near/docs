---
id: welcome
title: Interacting With Contracts
sidebar_label: 🏠 Home
---

Welcome! If you want to integrate a deployed smart contract into your app you have come to the right place. This page will cover the different tools NEAR offers to interact with contracts. Do not worry if you have no previous knowledge in blockchain technology, we will get you up to speed in no time.

## Resources

<div class="container">
  <div class="row">
    <div class="col col--6">
      <a href="/integrate/web/introduction">
        <div class="card">
          <div class="card__image">
            <img 
              src={require("@site/static/docs/assets/integrate/website.png").default} alt="Website" />
          </div>
          <div class="card__body">
            <h4>Website</h4>
            <small>
              Use a contract from your web app
            </small>
          </div>
        </div>
      </a>
    </div>
    <div class="col col--6">
      <a href="/integrate/cli">
        <div class="card">
          <div class="card__image">
            <img
              src={require("@site/static/docs/assets/integrate/cli.png").default} alt="Command Line Interface" />
          </div>
          <div class="card__body">
            <h4>NEAR CLI</h4>
            <small>
              Automatize with the Command Line Interface
            </small>
          </div>
        </div>
      </a>
    </div>
    <div class="col col--6">
      <a href="/integrate/realtime">
        <div class="card">
          <div class="card__image">
            <img
              src={require("@site/static/docs/assets/integrate/events.png").default} alt="Events" />
          </div>
          <div class="card__body">
            <h4>Events</h4>
            <small>
              Track your contract in real time
            </small>
          </div>
        </div>
      </a>
    </div>
    <div class="col col--6">
      <a href="/integrate/indexer">
        <div class="card">
          <div class="card__image">
            <img 
              src={require("@site/static/docs/assets/integrate/indexer.png").default} alt="Indexer" />
          </div>
          <div class="card__body">
            <h4>Query Usage Information</h4>
            <small>
              Get usage information from your contract
            </small>
          </div>
        </div>
      </a>
    </div>
  </div>
</div>

## What's the timeline/plan for supporting general widely used programming languages so devs can just code in whatever they're comfortable working with?

While theoretically any language that can be compiled to Wasm can be supported, in reality we often need a smart contract library to wrap around low-level runtime APIs as well as providing some other high-level functionalities.

Right now, we support Rust and AssemblyScript. To support the functionality needed while ensuring the best user experience requires time, testing, and iteration. We envision that in the future, more languages will be supported and the support will be done through the effort from the wider community, not just NEAR alone.

If you have a language you love, take a look a our [JSON RPC API](/docs/api/rpc), the primary interface for interacting with the blockchain. You can refer to [`near-api-js`, our JavaScript library.](https://github.com/near/near-api-js/tree/master/src) for inspiration and reference on the abstractions we use for JavaScript developers.

## Searching for Something Else?

Are you searching for a different type of documentation?. Information on how to integrate a smart contract can be [found here](broken). An overview of the NEAR platform and how it works [be found here](broken).

If while reading this page you have any questions, please feel free to join our community on [Discord](http://near.chat/) and reach out! We are here to help.

## NEAR APIs

- [near-api-js](https://github.com/near/near-api-js): The JavaScript API
- [near-rpc](/integrate/rpc/introduction): The RPC API
- [near-cli](/integrate/cli): The NEAR Command Line Interface
