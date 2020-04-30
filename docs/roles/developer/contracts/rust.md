---
id: rust
title: Rust
sidebar_label: Rust
---

If you're thinking of invoking a smart contract from Rust then you're likely doing one of two things:

1. writing the contract (and interest in unit testing)
2. invoking the contract from a Rust application outside of the NEAR Platform
3. [let us know](http://near.chat) if we missed something!

### Unit testing smart contracts

`near-sdk-rs` supports unit testing smart contracts out of the box

- [several examples](https://github.com/near/near-sdk-rs/tree/master/examples) are included in the `near-sdk-rs` repo

- In 2019 we held a workshop called [MapReduce with Asynchronous Smart Contracts](https://github.com/nearprotocol/workshop) that included 3 exercises of increasing difficulty and a challenge.  Solutions to the 3 exercises include unit tests.

### Invoking smart contracts from a Rust application outside of NEAR

We currently don't have Rust language bindings for our RPC interface.  You would need to use our [JSON RPC interface directly](/docs/interaction/rpc) to either `query` the network for a `view` method or send a `FunctionCall` transaction to the network for a `change` method.
