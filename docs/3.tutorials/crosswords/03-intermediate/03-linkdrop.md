---
sidebar_position: 4
sidebar_label: "Linkdrop contract"
title: "Introducing the linkdrop contract we can use"
---
import {Github} from "@site/src/components/codetabs"

import createMainnetAccount from '/docs/assets/crosswords/create-mainnet-account.png';
import createTestnetAccount from '/docs/assets/crosswords/create-testnet-wallet-account.png';

# The linkdrop contract

We're going to take a small detour to talk about the linkdrop smart contract.  It's best that we first understand this contract and its purpose, then discuss calling a method on this contract.

[The linkdrop contract](https://github.com/near/near-linkdrop) is deployed to the accounts `testnet` and `near`, which are known as the top-level accounts of the testnet and mainnet network, respectively. (Anyone can create a linkdrop-style contract elsewhere, but the one shown here is the main one that others are patterned off of.)

## Testnet

There’s nothing special about testnet accounts; there is no real-world cost to you as a developer when creating testnet accounts, so feel free to create or delete at your convenience.

When a user signs up for a testnet account on NEAR Wallet, they'll see this:

<img src={createTestnetAccount} width="400" />

Let's discuss how this testnet account gets created.

Notice the new account will end in `.testnet`. This is because the account `testnet` will create a subaccount (like we learned about [earlier in this tutorial](../01-basics/02-add-functions-call.md#create-a-subaccount)) called `vacant-name.testnet`.

There are two ways to create this subaccount:

1. Use a full-access key for the account `testnet` to sign a transaction with the `CreateAccount` Action.
2. In a smart contract deployed to the `testnet` account, call the `CreateAccount` Action, which is an async method that returns a Promise. (More info about writing a [`CreateAccount` Promise](../../../2.build/2.smart-contracts/anatomy/actions.md#create-a-sub-account))

(In the example below that uses NEAR CLI to create a new account, it's calling `CreateAccount` on the linkdrop contract that is deployed to the top level "near" account on mainnet.)


## Mainnet

On mainnet, the account `near` also has the linkdrop contract deployed to it.

Using NEAR CLI, a person can create a `mainnet` account by calling the linkdrop contract, like shown below:

```bash
near contract call-function as-transaction near create_account json-args '{"new_account_id": "aloha.near", "new_public_key": "3cQ...tAT"}' prepaid-gas '300.0 Tgas' attached-deposit '15 NEAR' sign-as mike.near network-config mainnet sign-with-legacy-keychain
```

The above command calls the `create_account` method on the account `near`, and would create `aloha.near` **if it's available**, funding it with 15 Ⓝ.

We'll want to write a smart contract that calls that same method. However, things get interesting because it's possible `aloha.near` is already taken, so we'll need to learn how to handle that.

## A simple callback

### The `create_account` method

Here, we'll show the implementation of the `create_account` method. Note the `#[payable]` macro, which allows this function to accept an attached deposit. (Remember in the CLI command we were attaching 15 Ⓝ.)

<Github language="rust" start="128" end="152" url="https://github.com/near/near-linkdrop/blob/master/src/lib.rs" />

The most important part of the snippet above is around the middle where there's:

```rust
Promise::new(...)
    ...
    .then(
        Self::ext(env::current_account_id())
            .on_account_created(...)
    )
```

This translates to, "we're going to attempt to perform an Action, and when we're done, please call myself at the method `on_account_created` so we can see how that went."

:::caution This doesn't work

Not infrequently, developers will attempt to do this in a smart contract:

```rust
let creation_result = Promise::new("aloha.mike.near")
  .create_account();

// Check creation_result variable (can't do it!)
if creation_result {...}

```

In other programming languages promises might work like this, but we must use callbacks instead.
:::

### The callback

Now let's look at the callback:

<Github language="rust" start="199" end="212" url="https://github.com/near/near-linkdrop/blob/master/src/lib.rs" />

This calls the private helper method `is_promise_success`, which basically checks to see that there was only one promise result, because we only attempted one Promise:

<Github language="rust" start="35" end="45" url="https://github.com/near/near-linkdrop/blob/master/src/lib.rs" />

Note that the callback returns a boolean. This means when we modify our crossword puzzle to call the linkdrop contract on `testnet`, we'll be able to determine if the account creation succeeded or failed.

And that's it! Now we've seen a method and a callback in action for a simple contract.

:::tip This is important
Understanding cross-contract calls and callbacks is quite important in smart contract development.

Since NEAR's transactions are asynchronous, the use of callbacks may be a new paradigm shift for smart contract developers from other ecosystems.

Feel free to dig into the linkdrop contract and play with the ideas presented in this section.

There are two additional examples that are helpful to look at:
1. [High-level cross-contract calls](https://github.com/near/near-sdk-rs/blob/master/examples/cross-contract-calls/high-level/src/lib.rs) — this is similar what we've seen in the linkdrop contract.
2. [Low-level cross-contract calls](https://github.com/near/near-sdk-rs/blob/master/examples/cross-contract-calls/low-level/src/lib.rs) — a different approach where you don't use the traits we mentioned.
:::

---

Next we'll modify the crossword puzzle contract to check for the signer's public key, which is how we now determine if they solved the puzzle correctly.
