---
sidebar_position: 4
sidebar_label: "Hash the solution, unit tests, and an init method"
title: "Introduction to basic hashing and adding unit tests"
---
import {Github} from "@site/src/components/codetabs"

import batchCookieTray from '/docs/assets/crosswords/batch-of-actions--dobulyo.near--w_artsu.jpg';

# Hash the solution, add basic unit tests

In the previous section, we stored the crossword solution as plain text as a `String` type on the smart contract. If we're trying to hide the solution from the users, this isn't a great approach as it'll be public to anyone looking at the state. Let's instead hash our crossword solution and store that instead. There are different ways to hash data, but let's use `sha256` which is one of the hashing algorithms available in [the Rust SDK](https://docs.rs/near-sdk/latest/near_sdk/env/fn.sha256.html).

:::info Remind me about hashing
Without getting into much detail, hashing is a "one-way" function that will output a result from a given input. If you have input (in our case, the crossword puzzle solution) you can get a hash, but if you have a hash you cannot get the input. This basic idea is foundational to information theory and security.

Later on in this tutorial, we'll switch from using `sha256` to using cryptographic key pairs to illustrate additional NEAR concepts.

Learn more about hashing from [Evgeny Kapun](https://github.com/abacabadabacaba)'s presentation on the subject. You may find other NEAR-related videos from the channel linked in the screenshot below.

[![Evgeny Kapun presents details on hashing](/docs/assets/crosswords/kapun-hashing.png)](https://youtu.be/PfabikgnD08)
:::

## Helper unit test during rapid iteration

As mentioned in the first section of this **Basics** chapter, our smart contract is technically a library as defined in the manifest file. For our purposes, a consequence of writing a library in Rust is not having a "main" function that runs. You may find many online tutorials where the command `cargo run` is used during development. We don't have this luxury, but we can use unit tests to interact with our smart contract. This is likely more convenient than building the contract, deploying to a blockchain network, and calling a method.

We'll add a dependency to the [hex crate](https://crates.io/crates/hex) to make things easier. As you may remember, dependencies live in the manifest file.

<Github language="rust" start="10" end="12" url="https://github.com/near-examples/crossword-tutorial-chapter-1/blob/master/contract/Cargo.toml" />

Let's write a unit test that acts as a helper during development. This unit test will sha256 hash the input **"near nomicon ref finance"** and print it in a human-readable, hex format. (We'll typically put unit tests at the bottom of the `lib.rs` file.)

<Github language="rust" start="43" end="60" url="https://github.com/near-examples/crossword-tutorial-chapter-1/blob/master/contract/src/lib.rs" />

:::info What is that `{:?}` thing?
Take a look at different formatting traits that are covered in the [`std` Rust docs](https://doc.rust-lang.org/std/fmt/index.html#formatting-traits) regarding this. This is a `Debug` formatting trait and can prove to be useful during development.
:::

Run the unit tests with the command:

```
cargo test -- --nocapture
```

You'll see this output:

```
…
running 1 test
Let's debug: "69c2feb084439956193f4c21936025f14a5a5a78979d67ae34762e18a7206a0f"
test tests::debug_get_hash ... ok

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s
```

This means when you sha256 the input **"near nomicon ref finance"** it produces the hash:
`69c2feb084439956193f4c21936025f14a5a5a78979d67ae34762e18a7206a0f`

:::tip Note on the test flags
You may also run tests using:

```
cargo test
```

Note that the test command we ran had additional flags. Those flags told Rust **not to hide the output** from the tests. You can read more about this in [the cargo docs](https://doc.rust-lang.org/cargo/commands/cargo-test.html#display-options). Go ahead and try running the tests using the command above, without the additional flags, and note that we won't see the debug message.
:::

The unit test above is meant for debugging and quickly running snippets of code. Some may find this a useful technique when getting familiar with Rust and writing smart contracts. Next we'll write a real unit test that applies to this early version of our crossword puzzle contract.

## Write a regular unit test

Let's add this unit test (inside the `mod tests {}` block, under our previous unit test) and analyze it:

<Github language="rust" start="62" end="92" url="https://github.com/near-examples/crossword-tutorial-chapter-1/blob/master/contract/src/lib.rs" />

The first few lines of code will be used commonly when writing unit tests. It uses the `VMContextBuilder` to create some basic context for a transaction, then sets up the testing environment.

Next, an object is created representing the contract and the `set_solution` function is called. After that, the `guess_solution` function is called twice: first with the incorrect solution and then the correct one. We can check the logs to determine that the function is acting as expected.

:::info Note on assertions
This unit test uses the [`assert_eq!`](https://doc.rust-lang.org/std/macro.assert_eq.html) macro. Similar macros like [`assert!`](https://doc.rust-lang.org/std/macro.assert.html) and [`assert_ne!`](https://doc.rust-lang.org/std/macro.assert_ne.html) are commonly used in Rust. These are great to use in unit tests. However, these will add unnecessary overhead when added to contract logic, and it's recommended to use the [`require!` macro](https://docs.rs/near-sdk/4.0.0-pre.2/near_sdk/macro.require.html). See more information on this and [other efficiency tips here](../../../2.build/2.smart-contracts/anatomy/reduce-size.md).
:::

Again, we can run all the unit tests with:

```
cargo test -- --nocapture
```

:::tip Run only one test
To only run this latest test, use the command:

```
cargo test check_guess_solution -- --nocapture
```

:::

## Modifying `set_solution`

The [overview section](00-overview.md) of this chapter tells us we want to have a single crossword puzzle and the user solving the puzzle should not be able to know the solution. Using a hash addresses this, and we can keep `crossword_solution`'s field type, as `String` will work just fine. The overview also indicates we only want the author of the crossword puzzle to be able to set the solution. As it stands, our function `set_solution` can be called by anyone with a full-access key. It's trivial for someone to create a NEAR account and call this function, changing the solution. Let's fix that.

Let's have the solution be set once, right after deploying the smart contract.

Here we'll use the [`#[near]` macro](https://docs.rs/near-sdk/latest/near_sdk/attr.near.html) on a function called `new`, which is a common pattern.

<Github language="rust" start="9" end="17" url="https://github.com/near-examples/crossword-tutorial-chapter-1/blob/master/contract/src/lib.rs" />

Let's call this method on a fresh contract.

```bash
# Go into the directory containing the Rust smart contract we've been working on
cd contract

# Build
cargo near build

# Create fresh account if you wish, which is good practice
near account delete-account crossword.friend.testnet beneficiary friend.testnet network-config testnet sign-with-legacy-keychain send

near account create-account fund-myself crossword.friend.testnet '1 NEAR' autogenerate-new-keypair save-to-legacy-keychain sign-as friend.testnet network-config testnet sign-with-legacy-keychain send

# Deploy
cargo near deploy crossword.friend.testnet without-init-call network-config testnet sign-with-legacy-keychain send

# Call the "new" method
near contract call-function as-transaction crossword.friend.testnet new json-args '{"solution": "69c2feb084439956193f4c21936025f14a5a5a78979d67ae34762e18a7206a0f"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' sign-as crossword.friend.testnet network-config testnet sign-with-legacy-keychain send
```

Now the crossword solution, as a hash, is stored instead. If you try calling the last command again, you'll get the error message, thanks to the `#[init]` macro:
`The contract has already been initialized`

## First use of Batch Actions

This is close to what we want, but what if a person deploys their smart contract and **someone else** quickly calls the `new` function before them? We want to make sure the same person who deployed the contract sets the solution, and we can do this using Batch Actions. Besides, why send two transactions when we can do it in one? (Technical details covered in the spec for a [batch transaction here](https://nomicon.io/RuntimeSpec/Transactions.html?highlight=batch#batched-transaction).)

<figure>
    <img src={batchCookieTray} alt="Cookie sheet representing a transaction, where cookies are Deploy and FunctionCall Actions. Art created by dobulyo.near."/>
    <figcaption className="full-width">Art by <a href="https://twitter.com/w_artsu" target="_blank" rel="noopener noreferrer">dobulyo.near</a></figcaption>
</figure><br/>

:::info Batch Actions in use
Batch Actions are common in this instance, where we want to deploy and call an initialization function. They're also common when using a factory pattern, where a subaccount is created, a smart contract is deployed to it, a key is added, and a function is called.

Here's a truncated snippet from a useful (though somewhat advanced) repository with a wealth of useful code:
<Github language="rust" start="172" end="177" url="https://github.com/near/core-contracts/blob/1720c0cfee238974ebeae8ad43076abeb951504f/staking-pool-factory/src/lib.rs" />

We'll get into Actions later in this tutorial, but in the meantime here's a handy [reference from the spec](https://nomicon.io/RuntimeSpec/Actions.html).
:::

As you can from the info bubble above, we can batch [Deploy](https://docs.rs/near-sdk/3.1.0/near_sdk/struct.Promise.html#method.deploy_contract) and [FunctionCall](https://docs.rs/near-sdk/3.1.0/near_sdk/struct.Promise.html#method.function_call) Actions. This is exactly what we want to do for our crossword puzzle, and luckily, NEAR CLI has a [flag especially for this](https://docs.near.org/tools/near-cli#near-deploy).

Let's run this again with the handy `--initFunction` and `--initArgs` flags:

```bash
# Create fresh account if you wish, which is good practice
near account delete-account crossword.friend.testnet beneficiary friend.testnet network-config testnet sign-with-legacy-keychain send

near account create-account fund-myself crossword.friend.testnet '1 NEAR' autogenerate-new-keypair save-to-legacy-keychain sign-as friend.testnet network-config testnet sign-with-legacy-keychain send

# Deploy
cargo near deploy crossword.friend.testnet with-init-call new json-args '{"solution": "69c2feb084439956193f4c21936025f14a5a5a78979d67ae34762e18a7206a0f"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' network-config testnet sign-with-legacy-keychain send
```

Now that we're using Batch Actions, no one can call this `new` method before us.

:::note Batch action failures
If one Action in a set of Batch Actions fails, the entire transaction is reverted. This is good to note because sharded, proof-of-stake systems do not work like proof-of-work where a complex transaction with multiple cross-contract calls reverts if one call fails. With NEAR, cross-contract calls use callbacks to ensure expected behavior, but we'll get to that later.
:::

## Get ready for our frontend

In the previous section we showed that we could use a `curl` command to view the state of the contract without explicitly having a function that returns a value from state. Now that we've demonstrated that and hashed the solution, let's add a short view-only function `get_solution`.

In the next section we'll add a simple frontend for our single, hardcoded crossword puzzle. We'll want to easily call a function to get the final solution hash. We can use this opportunity to remove the function `get_puzzle_number` and the constant it returns, as these were use for informative purposes.

We'll also modify our `guess_solution` to return a boolean value, which will also make things easier for our frontend.

<Github language="rust" start="19" end="34" url="https://github.com/near-examples/crossword-tutorial-chapter-1/blob/94f42e75cf70ed2aafb9c29a1faa1e21f079a49e/contract/src/lib.rs" />

The `get_solution` method can be called with:

```bash
near contract call-function as-read-only crossword.friend.testnet get_solution json-args {} network-config testnet now
```

In the next section we'll add a simple frontend. Following chapters will illustrate more NEAR concepts built on top of this idea.
