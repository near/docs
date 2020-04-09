---
id: quickstart
title: API Quickstart
sidebar_label: Orientation
---

## Overview

Development on the NEAR platform falls into 2 categories: 
- **Developing contracts** (we support Rust and AssemblyScript -- both are compiled to Wasm before deployment)
- **Developing applications** that interact with contracts (we provide a JSON RPC API and JavaScript library wrapper)

To develop smart contracts, you are welcome to use one of
- Rust (using `near-sdk-rs`)
- AssemblyScript (using `near-sdk-as`, not for use with financial applications)

To interact with the platform and execute methods on smart contracts, you are welcome to use one of
- JSON RPC interface (our primary API for interacting with the blockchain)
- JavaScript library (called `near-api-js`) which wraps the RPC interface and includes a few helpful abstractions

We welcome members of our community to **add other language bindings** and will be happy to provide support along the way.  

Just let us know if you need help with a note via [email](mailto:hello@nearprotocol.com), [Discord](http://near.chat/) or [StackOverflow](https://stackoverflow.com/questions/tagged/nearprotocol).


## Developing Contracts

*The best source of examples across the platform is currently unit and integration tests in our Github repos.  Some parts of the system are also documented with introductions and examples.  Everything is open source.*

### Rust (`near-sdk-rs`)
- documentation is [here](/docs/api/near-sdk-rs/index)
- examples with inlined unit tests are [here](https://github.com/near/near-sdk-rs/tree/master/examples)
- source code is [here](https://github.com/near/near-sdk-rs)

### AssemblyScript (`near-sdk-as`)
- documentation is [here](/docs/roles/developer/contracts/assemblyscript)
- examples are [here](https://github.com/nearprotocol/awesome-near)
- tests are [here](https://github.com/near/near-sdk-as/blob/master/assembly/__tests__/runtime/main.ts)

## Developing Applications

*The best source of examples across the platform is currently unit and integration tests in our Github repos.  Some parts of the system are also documented with introductions and examples.  Everything is open source.*

### JSON-RPC
- documentation is [here](/docs/interaction/rpc)
- examples are [here](/docs/roles/developer/examples/near-api-js/examples#jsonrpcprovider)
- source code is [here](https://github.com/near/near-api-js/blob/master/src/providers/json-rpc-provider.ts)

### JavaScript (`nearlib`)
- documentation is [here](/docs/roles/developer/examples/near-api-js/introduction)
- examples are [here](/docs/roles/developer/examples/near-api-js/examples)
- source code is [here](https://github.com/near/near-api-js/tree/master/src)
- tests are [here](https://github.com/nearprotocol/near-api-js/tree/master/test)


## Getting Help
- [Discord `#dev-channel`](http://near.chat/) is a good start
- StackOverflow [questions tagged with `#nearprotocol`](https://stackoverflow.com/questions/tagged/nearprotocol) land directly in a dedicated Slack channel to which we usually respond within a day
- If you find anything missing, please [submit an issue to these docs](https://github.com/nearprotocol/docs/issues).

## Going Deeper
- Lunch & Learn [series on YouTube](https://www.youtube.com/watch?v=mhJXsOKoSdg&list=PL9tzQn_TEuFW_t9QDzlQJZpEQnhcZte2y)
- Whiteboard [series on YouTube](http://near.ai/wbs)
