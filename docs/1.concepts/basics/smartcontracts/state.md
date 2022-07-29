---
id: state
title: State
---

Any state that you want to save to the blockchain needs to be explicitly saved by the smart contract by interacting with a data container object (data collection).

SDK collections provide an interface to the blockchain storage, a standard key-value store where keys are strings and the values can be multiple types including `string`, `bytes`, `u64`. Anything else needs to be first converted into these types. How these collections are loaded and saved from persistent storage on-chain have an effect on their gas usage by the smart contract. 

### Data Collections' Storage and Gas Usage  

These differences in how data is loaded from differing collections lead to different gas expenses for the same smart contract logic. In Rust, this can be seen when looking at `HashMap`, that keeps all data in memory and requires loading the entire data structure from persistent storage every time a key-value pair is sought, and `UnorderedMap` that prioritizes keeping the data structure on persistent storage so only a single element is deserialized when fetched.

It is important to take these differences into account when developing your contract code.
[Read more about Rust SDK collections](https://www.near-sdk.io/contract-structure/collections).
