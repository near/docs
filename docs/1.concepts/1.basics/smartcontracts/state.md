---
id: state
title: State
---

Contract function calls are stateless. Any state that you want to save to the blockchain needs to be explicitly saved by interacting with object saved in the smart contract state.

SDK collections provide an interface to the blockchain storage, a standard key-value store where keys are strings and the values can be multiple types including `string`, `bytes`, `u64`. Anything else needs to be first converted into these types. How these collections are loaded and saved from persistent storage on-chain have an effect on their gas usage by the smart contract. 


### Rust 

These differences in how data is loaded can be seen when looking at `HashMap`, that keeps all data in memory and requires loading the entire data structure from persistent storage every time a key-value pair is sought and `UnorderedMap` that prioritizes keeping the data structure on persistent storage, so only a single element is deserialized when fetched.

[Read more about Rust SDK collections](https://www.near-sdk.io/contract-structure/collections).