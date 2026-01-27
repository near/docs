---
id: introduction
title: Introduction
description: "Learn what is localnet on NEAR."
---

Every blockchain is essentially a peer-to-peer network made up of many computers, called nodes, that communicate with each other, share data and verify that transactions follow the protocol rules. In the case of NEAR Protocol each node runs the [NEAR runtime software](https://github.com/near/nearcore) which handles transaction processing, block production and state validation.

Localnet is usually referred to as your own private NEAR network that runs entirely on your machine, though, in some setups, it can also be launched across several machines that can see each other on the same network. However, is most cases, a localnet means a single-machine network. That's because developers typically use it for testing contracts, running integration tests or automating CI/CD pipelines, where you don't really care about consensus and having one node is completely fine since it's verifying a contract/dApp logic rather than simulating mainnet decentralization.

### Node Types

Within the NEAR ecosystem you have two primary kinds of nodes you can run locally.

#### Production node `neard`

The `neard` binary is the standard node implementation used in production environments. It is suited for simulating a realistic NEAR network with consensus, full block production and state persistence. If you run `neard` locally you are essentially running the same kind of node a validator would run, making it a good choice for integration testing under realistic conditions.

#### Developer node `near-sandbox`

Both `neard` and `near-sandbox` come from the same repository and share the same codebase. They are built using the exact same build process, with the only difference being that `near-sandbox` is compiled with a few extra features enabled that expose extra RPC methods to improve the developer experience. Aside from that, the two binaries are identical - they behave the same way, use the same configuration files, and follow the same command-line interface.

One of the most useful features is the state patching RPC method `sandbox_patch_state`. It lets you modify the blockchain state directly without sending transactions. This means you can quickly prepare a specific testing scenario by setting accounts, balances, or contract storage to the desired state with just a few RPC requests instead of going through multiple signed transactions.

Another key feature is the fast-forwarding RPC method `sandbox_fast_forward`. It allows you to move the blockchain forward in time by increasing the block height. This is especially useful when your contract logic depends on time or block-based conditions. For example, if your contract locks funds for a certain number of blocks, you can simply fast-forward to that future height and verify the expected behavior immediately, without waiting minutes, hours, or days.
