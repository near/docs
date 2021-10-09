---
id: collections-u128-etc
title: Miscellaneous video concept
sidebar_label: Misc
---

This page contains videos that explore miscellaneous concepts of smart contract development on NEAR.

## Cross-contract calls in Rust {#cross-contract-calls-in-rust}

<iframe
  width="560"
  height="315"
  src="https://www.youtube-nocookie.com/embed/971dTz6nM2g"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen>
</iframe>

## StackOverflow question on NEAR Collections, and dealing with large numbers {#stackoverflow-question-on-near-collections-and-dealing-with-large-numbers}

<iframe
  width="560"
  height="315"
  src="https://www.youtube-nocookie.com/embed/wC6CS7js-tc"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen>
</iframe>

Here we address [this question](https://stackoverflow.com/questions/64378144/why-cant-i-read-this-hashmap-in-a-near-contract/64438703#64438703) on StackOverflow and specifically, we'll talk about why you'll likely want to use NEAR Collections instead of `HashMap` when using Rust. See a list of the available collections [here](https://docs.rs/near-sdk/2.0.0/near_sdk/collections/index.html). In this video we discuss:

- [`U128`](https://docs.rs/near-sdk/2.0.0/near_sdk/json_types/struct.U128.html) and the difference between the (lowercase) `u128`
- why JSON cannot handle very large numbers
- how to interact with a Rust smart contract using NEAR CLI
- demonstrate logging, `view` and `call` methods, and unit tests 
- benefits of creating subaccounts

We will also walk through the process of writing, building, and deploying a Rust smart contract and then we'll discover why NEAR subaccounts are useful when you may need to make breaking changes to state.

>Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol">
  <h8>Ask it on StackOverflow!</h8>
</a>
