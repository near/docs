---
id: quickstart
title: API Quickstart
sidebar_label: Orientation
---

## Overview

Development on the NEAR platform falls into 2 categories: 
- **Developing contracts** (we support Rust and AssemblyScript -- both are compiled to Wasm before deployment)
- **Developing applications** that interact with contracts (we provide a JSON RPC API and JavaScript library wrapper)

To develop smart contracts, you are welcome to use one of the following:
- Rust (using `near-sdk-rs`)
- AssemblyScript (using `near-sdk-as` -- not for use with financial applications)

To interact with the platform and execute methods on smart contracts, you are welcome to use one of the following:
- JavaScript library (`near-api-js`) which wraps the RPC interface and includes a few helpful abstractions
- JSON RPC interface (our primary API for interacting with the blockchain)
- We welcome members of our community to add other language bindings and will be happy to provide support along the way.  

Just let us know if you need help with a note via [email](mailto:hello@near.org) <img src="../assets/icon-link.png" alt="^" style="display: inline; width: 0.8rem;"/> , [Telegram](https://t.me/cryptonear) <img src="../assets/icon-link.png" alt="^" style="display: inline; width: 0.8rem;"/> , [Discord](http://near.chat/) <img src="../assets/icon-link.png" alt="^" style="display: inline; width: 0.8rem;"/> or [StackOverflow](https://stackoverflow.com/questions/tagged/nearprotocol) <img src="../assets/icon-link.png" alt="^" style="display: inline; width: 0.8rem;"/> .


## Developing Contracts

*The best source of examples across the platform is currently unit and integration tests in our Github repos.  Some parts of the system are also documented with introductions and examples.  Everything is open source.*

### Rust (`near-sdk-rs`)
- API documentation is [here](https://docs.rs/near-sdk)
- examples with inlined unit tests are [here](https://github.com/near/near-sdk-rs/tree/master/examples)
- source code is [here](https://github.com/near/near-sdk-rs) <img src="../assets/icon-link.png" alt="^" style="display: inline; width: 0.8rem;"/>

### AssemblyScript (`near-sdk-as`)
- API documentation is [here](https://near.github.io/near-sdk-as)<img src="../assets/icon-link.png" alt="^" style="display: inline; width: 0.8rem;"/>
- examples are [here](https://github.com/near-examples) <img src="../assets/icon-link.png" alt="^" style="display: inline; width: 0.8rem;"/>
- tests are [here](https://github.com/near/near-sdk-as/tree/master/assembly/__tests__) <img src="../assets/icon-link.png" alt="^" style="display: inline; width: 0.8rem;"/>

## Developing Applications

*The best source of examples across the platform is currently unit and integration tests in our Github repos.  Some parts of the system are also documented with introductions and examples.  Everything is open source.*

### JavaScript (`near-api-js`)
- documentation is [here](/docs/roles/developer/examples/near-api-js/introduction)
- examples are [here](/docs/roles/developer/examples/near-api-js/examples)
- source code is [here](https://github.com/near/near-api-js/tree/master/src) <img src="../assets/icon-link.png" alt="^" style="display: inline; width: 0.8rem;"/>
- tests are [here](https://github.com/near/near-api-js/tree/master/test) <img src="../assets/icon-link.png" alt="^" style="display: inline; width: 0.8rem;"/>

### JSON-RPC
- documentation is [here](/docs/interaction/rpc)
- examples are [here](/docs/roles/developer/examples/near-api-js/examples#jsonrpcprovider)
- source code is [show here as a wrapper](https://github.com/near/near-api-js/blob/master/src/providers/json-rpc-provider.ts) <img src="../assets/icon-link.png" alt="^" style="display: inline; width: 0.8rem;"/>  for this [chain interface](https://github.com/nearprotocol/nearcore/blob/master/chain/jsonrpc/src/lib.rs#L209) <img src="../assets/icon-link.png" alt="^" style="display: inline; width: 0.8rem;"/>


## Getting Help
- [Telegram](https://t.me/cryptonear) <img src="../assets/icon-link.png" alt="^" style="display: inline; width: 0.8rem;"/> ,
- [Discord `#dev-channel`](http://near.chat/) <img src="../assets/icon-link.png" alt="^" style="display: inline; width: 0.8rem;"/> is a good start
- StackOverflow [questions tagged with `#nearprotocol`](https://stackoverflow.com/questions/tagged/nearprotocol) <img src="../assets/icon-link.png" alt="^" style="display: inline; width: 0.8rem;"/> land directly in a dedicated Slack channel to which we usually respond within a day
- If you find anything missing, please [submit an issue to these docs](https://github.com/nearprotocol/docs/issues) <img src="../assets/icon-link.png" alt="^" style="display: inline; width: 0.8rem;"/> .

## Going Deeper
- Lunch & Learn [series on YouTube](https://www.youtube.com/watch?v=mhJXsOKoSdg&list=PL9tzQn_TEuFW_t9QDzlQJZpEQnhcZte2y) <img src="../assets/icon-link.png" alt="^" style="display: inline; width: 0.8rem;"/>
- Whiteboard [series on YouTube](http://near.ai/wbs) <img src="../assets/icon-link.png" alt="^" style="display: inline; width: 0.8rem;"/>
