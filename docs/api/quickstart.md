---
id: quickstart
title: API Quickstart
sidebar_label: Orientation
---

## Overview

Development on the NEAR platform falls into 2 categories: 
- **Developing contracts** (we support Rust and AssemblyScript -- both are compiled to Wasm before deployment)
- **Developing applications** that interact with contracts (we provide a JSON RPC API and JavaScript SDK wrapper)

To develop smart contracts, you are welcome to use one of
- Rust (using `near-bindgen`)
- AssemblyScript (using `near-runtime-ts`, not for use with financial applications)

To interact with the platform and execute methods on smart contracts, you are welcome to use one of
- JSON RPC interface (our primary API for interacting with the blockchain)
- JavaScript SDK (called `nearlib`) which wraps the RPC interface and includes a few helpful abstractions

We welcome members of our community to **add other language bindings** and will be happy to provide support along the way.  

Just let us know if you need help with a note via [email](mailto:hello@nearprotocol.com), [Discord](http://near.chat/) or [StackOverflow](https://stackoverflow.com/questions/tagged/nearprotocol).


## Developing Contracts

*The best source of examples across the platform is currently unit and integration tests in our Github repos.  Some parts of the system are also documented with introductions and examples.  Everything is open source.*

### Rust (`near-bindgen`)
- documentation is [here](/docs/near-bindgen/near-bindgen)
- examples with inlined unit tests are [here](https://github.com/nearprotocol/near-bindgen/tree/master/examples)
- source code is [here](https://github.com/nearprotocol/near-bindgen)

### AssemblyScript
- documentation is [here](https://docs.nearprotocol.com/docs/development/writing-smart-contracts)
- examples are [here](https://studio.nearprotocol.com/)
- tests are [here](https://github.com/nearprotocol/near-runtime-ts/blob/master/tests/assembly/main.ts)

## Developing Applications

*The best source of examples across the platform is currently unit and integration tests in our Github repos.  Some parts of the system are also documented with introductions and examples.  Everything is open source.*

### JSON-RPC
- documentation is [here](/docs/interaction/rpc)
- examples are [here](/docs/roles/developer/examples/nearlib/examples#jsonrpcprovider)
- source code is [here](https://github.com/nearprotocol/nearlib/blob/master/src.ts/providers/json-rpc-provider.ts)

### JavaScript (`nearlib`)
- documentation is [here](/docs/roles/developer/examples/nearlib/introduction)
- examples are [here](/docs/roles/developer/examples/nearlib/examples)
- source code is [here](https://github.com/nearprotocol/nearlib/tree/master/src.ts)
- tests are [here](https://github.com/nearprotocol/nearlib/tree/master/test)


## Getting Help
- [Discord `#dev-channel`](http://near.chat/) is a good start
- StackOverflow [questions tagged with `#nearprotocol`](https://stackoverflow.com/questions/tagged/nearprotocol) land directly in a dedicated Slack channel to which we usually respond within a day
- If you find anything missing, please [submit an issue to these docs](https://github.com/nearprotocol/docs/issues).

## Going Deeper
- Lunch & Learn [series on YouTube](https://www.youtube.com/watch?v=mhJXsOKoSdg&list=PL9tzQn_TEuFW_t9QDzlQJZpEQnhcZte2y)
- Whiteboard [series on YouTube](http://near.ai/wbs)
