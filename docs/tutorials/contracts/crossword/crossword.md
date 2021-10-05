---
id: tutorial
sidebar_label: "Overview"
title: "Basics overview laying out what will be accomplished in this first section."
---



# Basics overview

This first chapter of the crossword puzzle tutorial will introduce fundamental concepts to smart contract development in a beginner-friendly way. By the end of this chapter you'll have a proof-of-concept contract that can be interacted with via [NEAR CLI](https://docs.near.org/docs/tools/near-cli) and a simple frontend that uses the [`near-api-js` library](https://www.npmjs.com/package/near-api-js).

## Assumptions on what we're building

- There will be only one crossword puzzle with one solution.
- The user solving the crossword puzzle will not be able to know the solution.
- Only the author of the crossword puzzle smart contract can set the solution.

## How it works

![Example banner](./basics-crossword.jpg)


We'll have a rule about how to get the words in the proper order. We collect words in ascending order by number, and if there's and across and a down for a number, the across goes first.

So in the image above, the solution will be **near nomicon ref finance**. 

Let's begin!

---

# Getting started

In this tutorial we'll get a testnet account, use NEAR CLI to add a key to our computer's file system, and set up the basic skeleton of a Rust smart contract.

## Getting a testnet account

Visit [NEAR Wallet for testnet](https://wallet.testnet.near.org) and register for a free account. For the purposes of this tutorial, you may skip the option to add two-factor authentication if you wish.

:::note What just happened?
When you created your NEAR testnet account, a private key was created and placed into your browser's local storage. You may inspect this using developer tools and see it. 
:::

## Creating a new key on your computer

We'll want to use a command-line interface (CLI) tool to deploy a contract, but at the moment the private key only exists in the browser. Next we'll _add a new key_ to the testnet account and have this stored locally on our computer as a JSON file. (Yes, you can have multiple keys on your NEAR account, which is quite powerful!)

Let's install NEAR CLI. (Please ensure you [have NodeJS](https://nodejs.org/en/download/package-manager) > 12.)

    npm install -g near-cli

You may now run:

    near

to see various commands, which are covered [in detail here](https://docs.near.org/docs/tools/near-cli).

We'll start by "logging in" with this command:

    near login

This will bring you to NEAR Wallet again where you can confirm the creation of a **full-access** key. We'll get to full-access and function-call access keys later, just know that for powerful actions like "deploy" we'll need a full-access key. Follow the instructions from the login command to create a key on your hard drive. This will be located in your operating system's home directory in a folder called `.near-credentials`.

:::note How was a key added?
When you typed `near login`, NEAR CLI generated a key pair: a private and public key. It kept the private key tucked away in a JSON file and sent the public key as a URL parameter to NEAR Wallet. The URL is long and contains other info instructing NEAR Wallet to "add a full access key" to the account. Our browser's local storage had a key (created when the account was made) that is able to do several things, including adding another key. It took the public key from the URL parameter, used it as an argument, and voilà: the testnet account has an additional key!
:::

You can see the keys associated with your account by running following command, replacing `friend.testnet` with your account name:

    near keys friend.testnet

## Setting up Rust

You may have found the [online Rust Book](https://doc.rust-lang.org/stable/book), which is a great resource for getting started with Rust. However, there are a key items that are different when it comes to blockchain development. Namely, that smart contracts are [technically libraries and not binaries](https://learning-rust.github.io/docs/a4.cargo,crates_and_basic_project_structure.html#Crate), but for now just know that we won't be using some commands commonly found in the Rust Book.

:::caution We won't be using
    cargo run
during smart contract development.
:::

Instead, we'll be iterating on our smart contract by building it and running tests.

### Install Rust using `rustup`

Please see the directions from the [Rustup site](https://rustup.rs/#). For OS X or Unix, you may use:

    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

(Taken from the [Rust installation guide](https://www.rust-lang.org/tools/install))

### Add Wasm toolchain

Smart contracts compile to WebAssembly (Wasm) so we'll add the toolchain for Rust.

    rustup target add wasm32-unknown-unknown

(More info on [targets and this toolchain here](https://doc.rust-lang.org/edition-guide/rust-2018/platform-and-target-support/webassembly-support.html).)

## Start writing Rust! 

There's a basic repository that's helpful to clone or download [located here](https://github.com/near-examples/rust-template). 

The first thing we'll do is modify the manifest file at `Cargo.toml`:

```diff
[package]
-  name = "rust-template"
+  name = "my-crossword"
version = "0.1.0"
- authors = ["Near Inc <hello@near.org>"]
+ authors = ["NEAR Friend <friend@example.com>"]
edition = "2018"
```

By changing the `name` here, we'll be changing the compiled Wasm file's name after running the build script. (`build.sh` for OS X and Linux, `build.bat` for Windows.) After running the build script, we can expect to find out compiled Wasm smart contract in `res/my_crossword.wasm`.

Now let's look at our main file, in `src/lib.rs`:

```rust reference
https://github.com/near-examples/rust-template/blob/3f3a8cfa19eb4bd15ae1c410fed136c6c7ac97a0/src/lib.rs#L1-L38
```

As you can see, this is a stub that's ready to be filled in. Let's pause and point out a few items:

- Note the [**near_bindgen** macro](/contract-structure/near-bindgen) is above the struct and the impl
- Here the main struct is called `Contract`, while in other examples it might be `Counter` or something else. This is purely stylistic, but you may learn more from the link in the previous bullet.
- You may notice the word "Borsh" and wonder what that means. This is a binary serializer. Eventually we'll want to save data as ones and zeroes to validators' hard drives, and do it efficiently. We use Borsh for this, as is explained [at this website](https://borsh.io).

Next let's modify this contract little by little…

---


# Modifying the contract

This section will modify the smart contract skeleton from the previous section. This tutorial will start by writing a contract in a somewhat useless way in order to learn the basics. Once we've got a solid understanding, we'll iterate until we have a crossword puzzle.

## Add a const, a field, and functions

Let's modify the contract to be:

```rust reference
https://github.com/mikedotexe/crossword-snippets/blob/64ce2f80c1dcf9a6107f64dfa4a831ccb2f370ea/src/lib.rs#L2-L29
```

We've done a few things here:
1. Set a constant for the puzzle number.
2. Added the field `crossword_solution` to our main struct.
3. Implemented three functions: one that's view-only and two that are mutable, meaning they have the ability to change state.
4. Used logging, which required the import of `env` from our `near_sdk` crate.

Before moving on, let's talk about these changes and how to think about them, beginning with the constant:

`const PUZZLE_NUMBER: u8 = 1;`

This is an in-memory value, meaning that when the smart contract is spun up and executed in the virtual machine, the value `1` is contained in the contract code. This differs from the next change, where a field is added to the struct containing the `#[near_bindgen]` macro. The field `crossword_solution` has the type of `String` and, like any other fields added to this struct, the value will live in **persistent storage**. With NEAR, storage is "paid for" via the native NEAR token (Ⓝ). It is not "state rent" but storage staking, paid once, and returned when storage is deleted. This helps incentivize users to keep their state clean, allowing for a more healthy chain. Read more about [storage staking here](https://docs.near.org/docs/concepts/storage-staking).

Let's now look at the three new functions:

```rust
pub fn get_puzzle_number(&self) -> u8 {
    PUZZLE_NUMBER
}
```

As is covered in the [mutability section of these docs](/contract-interface/contract-mutability), a "view-only" function will have open parenthesis around `&self` while "change methods" or mutable functions will have `&mut self`. In the function above, the `PUZZLE_NUMBER` is returned. A user may call this method using the proper RPC endpoint without signing any transaction, since it's read-only. Think of it like a GET request, but using RPC endpoints that are [documented here](https://docs.near.org/docs/api/rpc/contracts#call-a-contract-function).

Mutable functions, on the other hand, require a signed transaction. The first example is a typical approach where the user supplies a parameter that's assigned to a field:

```rust
pub fn set_solution(&mut self, solution: String) {
    self.crossword_solution = solution;
}
```

The next time the smart contract is called, the contract's field `crossword_solution` will have changed.

The second example is provided for demonstration purposes:

```rust
pub fn guess_solution(&mut self, solution: String) {
    if solution == self.crossword_solution {
        env::log_str("You guessed right!")
    } else {
        env::log_str("Try again.")
    }
}
```

Notice how we're not saving anything to state and only logging? Why does this need to be mutable?

Well, logging is ultimately captured inside blocks added to the blockchain. (More accurately, transactions are contained in chunks and chunks are contained in blocks. More info in the [Nomicon spec](https://nomicon.io/Architecture.html?highlight=chunk#blockchain-layer-concepts).) So while it is not changing the data in the fields of the struct, it does cost some amount of gas to log, requiring a signed transaction by an account that pays for this gas.

## Create a subaccount

If you've followed from the previous section, you have NEAR CLI installed and a full-access key on your machine. While developing, it's a best practice to create a subaccount and deploy the contract to it. This makes it easy to quickly delete and recreate the subaccount, which wipes the state swiftly and starts from scratch. Let's use NEAR CLI to create a subaccount:

    near create-account crossword.friend.testnet --masterAccount friend.testnet

If you look again in your home directory's `.near-credentials`, you'll see a new key for the subaccount with its own key pair. This new account is, for all intents and purposes, completely distinct from the account that created it. It might as well be `alice.testnet`, as it has, by default, no special relationship with the parent account. To be clear, `friend.testnet` cannot delete or deploy to `crossword.friend.testnet` unless it's done in a single transaction using Batch Actions, which we'll cover later.

:::info Subaccount nesting
It's possible to have the account `another.crossword.friend.testnet`, but this account must be created by `crossword.friend.testnet`. 

`friend.testnet` **cannot** create `another.crossword.friend.testnet` because accounts may only create a subaccount that's "one level deeper." 
:::

We won't get into top-level accounts or implicit accounts, but you may read more [about that here](https://docs.near.org/docs/concepts/account).

Now that we have a key pair for our subaccount, we can deploy the contract to testnet and interact with it!

## Build the contract

The skeleton of the Rust contract we copied from the previous section has a `build.sh` and `build.bat` file for OS X / Linux and Windows, respectively. For more details on building contracts, please see [this section](/building/basic-build).

Run the build script and expect to see the compiled Wasm file copied to the `res` folder, instead of buried  in the default folder structure Rust sets up.

We're almost ready to deploy the smart contract to the account, but first let's take a look at the account we're going to deploy to. Remember, this is the subaccount we created earlier. To view the state easily with NEAR CLI, you may run this command:

    near state crossword.friend.testnet

What you'll see is something like this:

```js
{
  amount: '6273260568737488799170194446',
  block_hash: 'CMFVLYy6UP6c6vrWiSf1atWviayfZF2fgPoqKeUVtLhi',
  block_height: 61764892,
  code_hash: '11111111111111111111111111111111',
  locked: '0',
  storage_paid_at: 0,
  storage_usage: 4236,
  formattedAmount: '6,273.260568737488799170194446'
}
```

Note the `code_hash` here is all ones. This indicates that there is no contract deployed to this account.

Let's deploy the contact and then check this again.

## Deploy the contract

Ensure that in your command line application, you're in the directory that contains the `res` directory, then run:

    near deploy crossword.friend.testnet --wasmFile res/my_crossword.wasm

Congratulations, you've deployed the smart contract! Note that NEAR CLI will output a link to [NEAR Explorer](https://docs.near.org/docs/tools/near-explorer) where you can inspect details of the transaction.

Lastly, let's run this command again and notice that the `code_hash` is no longer all ones. This is the hash of the smart contract deployed to the account.

    near state crossword.friend.testnet

**Note**: deploying a contract is often done on the command line. While it may be _technically_ possible to deploy via a frontend, the CLI is likely the best approach. If you're aiming to use a factory model, (where a smart contract deploys contract code to a subaccount) this isn't covered in the tutorial, but you may reference the [contracts in SputnikDAO](https://github.com/near-daos/sputnik-dao-contract). 

## Call the contract methods

Let's first call the method that's view-only:

    near view crossword.friend.testnet get_puzzle_number

Your command prompt will show the result is `1`. Since this method doesn't take any arguments, we don't pass any. We could have added `'{}'` to the end of the command as well.

Next, we'll add a crossword solution as a string (later we'll do this in a better way) argument:

    near call crossword.friend.testnet set_solution '{"solution": "near nomicon ref finance"}' --accountId friend.testnet

:::info Windows users
Windows users will have to modify these commands a bit as the Command Prompt doesn't like single quotes as we have above. The command must use escaped quotes like so:

    near call crossword.friend.testnet set_solution "{\"solution\": \"near nomicon ref finance\"}" --accountId friend.testnet
:::

Note that we used NEAR CLI's [`view` command](https://docs.near.org/docs/tools/near-cli#near-view), and didn't include an `--accountId` flag. As mentioned earlier, this is because we are not signing a transaction. This second method uses the NEAR CLI [`call` command](https://docs.near.org/docs/tools/near-cli#near-call) which does sign a transaction and requires the user to specify a NEAR account that will sign it, using the credentials files we looked at.

The last method we have will check the argument against what is stored in state and write a log about whether the crossword solution is correct or incorrect.

Correct:

    near call crossword.friend.testnet guess_solution '{"solution": "near nomicon ref finance"}' --accountId friend.testnet

You'll see something like this:

![Command line shows log for successful solution guess](./cli-guess-solution.png)

Notice the log we wrote is output as well as a link to NEAR Explorer.

Incorrect:

    near call crossword.friend.testnet guess_solution '{"solution": "wrong answers here"}' --accountId friend.testnet

As you can imagine, the above command will show something similar, except the logs will indicate that you've given the wrong solution.

## Reset the account's contract and state

We'll be iterating on this smart contract during this tutorial, and in some cases it's best to start fresh with the NEAR subaccount we created. The pattern to follow is to **delete** the account (sending all remaining testnet Ⓝ to a recipient) and the **create the account** again.

Using NEAR CLI, the commands will look like this:

    near delete crossword.friend.testnet friend.testnet
    near create-account crossword.friend.testnet --masterAccount friend.testnet

The first command deletes `crossword.friend.testnet` and sends the rest of its NEAR to `friend.testnet`.

## Wrapping up

So far, we're writing a simplified version of smart contract and approaching the crossword puzzle in a novice way. Remember that blockchain is an open ledger, meaning everyone can see the state of smart contracts and transactions taking place. 

:::info How would you do that?
You may hit an RPC endpoint corresponding to `view_state` and see for yourself. Note: this quick example serves as demonstration purposes, but note that the string being returned is Borsh-serialized and contains more info than just the letters.

    curl -d '{"jsonrpc": "2.0", "method": "query", "id": "see-state", "params": {"request_type": "view_state", "finality": "final", "account_id": "crossword.friend.testnet", "prefix_base64": ""}}' -H 'Content-Type: application/json' https://rpc.testnet.near.org

![Screenshot of a terminal screen showing a curl request to an RPC endpoint that returns state of a smart contract](./rpc-api-view-state.png)

More on this RPC endpoint in the [NEAR docs](https://docs.near.org/docs/api/rpc/contracts#view-contract-state).
:::

In this section, we saved the crossword solution as plain text, which is likely not a great idea if we want to hide the solution to players of this crossword puzzle. Even though we don't have a function called `show_solution` that returns the struct's `crossword_solution` field, the value is stored transparently in state. We won't get into viewing contract state at this moment, but know it's rather easy [and documented here](https://docs.near.org/docs/api/rpc/contracts#view-contract-state).

The next section will explore hiding the answer from end users playing the crossword puzzle.

---


# Hash the solution, add basic unit tests

In the previous section, we stored the crossword solution as plain text as a `String` type on the smart contract. If we're trying to hide the solution from the users, this isn't a great approach as it'll be public to anyone looking at the state. Let's instead hash our crossword solution and store that instead. There are different ways to hash data, but let's use `sha256` which is one of the hashing algorithms available in [the Rust SDK](https://docs.rs/near-sdk/latest/near_sdk/env/fn.sha256.html).

:::info Remind me about hashing
Without getting into much detail, hashing is a "one-way" function that will output a result from a given input. If you have input (in our case, the crossword puzzle solution) you can get a hash, but if you have a hash you cannot get the input. This basic idea is foundational to information theory and security.

Later on in this tutorial, we'll switch from using `sha256` to using cryptographic key pairs to illustrate additional NEAR concepts.

Learn more about hashing from [Evgeny Kapun](https://github.com/abacabadabacaba)'s presentation on the subject. You may find other NEAR-related videos from the channel linked in the screenshot below.

[![Evgeny Kapun presents details on hashing](./kapun-hashing.png)](https://youtu.be/PfabikgnD08)
:::

## Helper unit test during rapid iteration

As mentioned in the first section of this **Basics** chapter, our smart contract is technically a library as defined in the manifest file. For our purposes, a consequence of writing a library in Rust is not having a "main" function that runs. You may find many online tutorials where the command `cargo run` is used during development. We don't have this luxury, but we can use unit tests to interact with our smart contract. This is likely more convenient than building the contract, deploying to a blockchain network, and calling a method.

Let's write a unit test that acts as a helper during development. This unit test will sha256 hash the input **"near nomicon ref finance"** and print it in a human-readable, hex format.

```rust reference
https://github.com/mikedotexe/crossword-snippets/blob/4212e4e3d2e9343d9ddbc4e7834c7200daac3c96/src/lib.rs#L59-L69
```

:::info What is that {:?} thing?
Take a look at different formatting traits that are covered in the [`std` Rust docs](https://doc.rust-lang.org/std/fmt/index.html#formatting-traits) regarding this. This is a `Debug` formatting trait and can prove to be useful during development.
:::

Run the unit tests with the command:

    cargo test -- --nocapture

You'll see this output:

```
…
running 1 test
Let's debug: "69c2feb084439956193f4c21936025f14a5a5a78979d67ae34762e18a7206a0f"
test tests::debug_get_hash ... ok

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s
```

This means when you sha256 the input "near nomicon ref finance" it produces the hash:
`69c2feb084439956193f4c21936025f14a5a5a78979d67ae34762e18a7206a0f`

:::tip Note on the test flags
You may also run tests using:

    cargo test

Note that the test command we ran had additional flags. Those flags told Rust *not to hide the output* from the tests. You can read more about this in [the cargo docs](https://doc.rust-lang.org/cargo/commands/cargo-test.html#display-options). Go ahead and try running the tests using the command above, without the additional flags, and note that we won't see the debug message.
:::

The unit test above is meant for debugging and quickly running snippets of code. Some may find this a useful technique when getting familiar with Rust and writing smart contracts. Next we'll write a real unit test that applies to this early version of our crossword puzzle contract.

## Write a regular unit test

Let's add this unit test and analyze it:

```rust reference
https://github.com/mikedotexe/crossword-snippets/blob/f77c6c026c3c7d06ffedb5d96ba083e47d4fd144/src/lib.rs#L69-L93
```

The first few lines of code will be used commonly when writing unit tests. It uses the `VMContextBuilder` to create some basic context for a transaction, then sets up the testing environment.

Next, an object is created representing the contract and the `set_solution` function is called. After that, the `guess_solution` function is called twice: first with the incorrect solution and then the correct one. We can check the logs to determine that the function is acting as expected.

:::info Note on assertions
This unit test uses the [`assert_eq!`](https://doc.rust-lang.org/std/macro.assert_eq.html) macro. Similar macros like [`assert!`](https://doc.rust-lang.org/std/macro.assert.html) and [`assert_ne!`](https://doc.rust-lang.org/std/macro.assert_ne.html) are commonly used in Rust. These are great to use in unit tests. However, these will add unnecessary overhead when added to contract logic, and it's recommended to use the [`require!` macro](https://docs.rs/near-sdk/4.0.0-pre.2/near_sdk/macro.require.html). See more information on this and [other efficiency tips here](/reducing-contract-size/examples).
:::

Again, we can run all the unit tests with:

    cargo test -- --nocapture

:::tip Run only one test
To only run this latest test, use the command:

    cargo test check_guess_solution -- --nocapture
:::

## Modifying `set_solution`

The [overview section](/zero-to-hero/basics/overview) of this chapter tells us we want to have a single crossword puzzle and the user solving the puzzle should not be able to know the solution. Using a hash addresses this, and we can keep `crossword_solution`'s field type, as `String` will work just fine. The overview also indicates we only want the author of the crossword puzzle to be able to set the solution. As it stands, our function `set_solution` can be called by anyone with a full-access key. It's trivial for someone to create a NEAR account and call this function, changing the solution. Let's fix that.

Let's have the solution be set once, right after deploying the smart contract.

Here we'll use the [`#[init]` macro](https://docs.rs/near-sdk/latest/near_sdk/attr.init.html) on a function called `new`, which is a common pattern.

```rust reference
https://github.com/mikedotexe/crossword-snippets/blob/8b60d463dddbb6b4993cdd73ce6ef7d3f6c1a38e/src/lib.rs#L14-L19
```

Let's call this method on a fresh contract.

```bash
# Build (for Windows it's build.bat)
./build.sh

# Create fresh account if you wish, which is good practice
near delete crossword.friend.testnet friend.testnet
near create-account crossword.friend.testnet --masterAccount friend.testnet

# Deploy
near deploy crossword.friend.testnet --wasmFile res/my_crossword.wasm

# Call the "new" method
near call crossword.friend.testnet new '{"solution": "69c2feb084439956193f4c21936025f14a5a5a78979d67ae34762e18a7206a0f"}' --accountId crossword.friend.testnet
```

Now the crossword solution, as a hash, is stored instead. If you try calling the last command again, you'll get the error message, thanks to the `#[init]` macro:
`The contract has already been initialized`

This is close to what we want, but what if a person deploys their smart contract and **someone else** quickly calls the `new` function before them? We want to make sure the same person who deployed the contract sets the solution, and we can do this using Batch Actions. (Technical details covered in the spec for a [batch transaction here](https://nomicon.io/RuntimeSpec/Transactions.html?highlight=batch#batched-transaction).)

:::info Batch Actions in use
Batch Actions are common in this instance, where we want to deploy and call an initialization function. They're also common when using a factory pattern, where a subaccount is created, a smart contract is deployed to it, a key is added, and a function is called.

Here's a truncated snippet from a useful (though somewhat advanced) repository with a wealth of useful code:
```rust reference
https://github.com/near/core-contracts/blob/1720c0cfee238974ebeae8ad43076abeb951504f/staking-pool-factory/src/lib.rs#L172-L177
```

We'll get into Actions later in this tutorial, but in the meantime here's a handy [reference from the spec](https://nomicon.io/RuntimeSpec/Actions.html).
:::

As you can from the info bubble above, we can batch [Deploy](https://docs.rs/near-sdk/3.1.0/near_sdk/struct.Promise.html#method.deploy_contract) and [FunctionCall](https://docs.rs/near-sdk/3.1.0/near_sdk/struct.Promise.html#method.function_call) Actions. This is exactly what we want to do for our crossword puzzle, and luckily, NEAR CLI has a [flag especially for this](https://docs.near.org/docs/tools/near-cli#near-deploy).

Let's run this again with the handy `--initFunction` and `--initArgs` flags:

```bash
# Create fresh account if you wish, which is good practice
near delete crossword.friend.testnet friend.testnet
near create-account crossword.friend.testnet --masterAccount friend.testnet

# Deploy
near deploy crossword.friend.testnet --wasmFile res/my_crossword.wasm \
  --initFunction 'new' \
  --initArgs '{"solution": "69c2feb084439956193f4c21936025f14a5a5a78979d67ae34762e18a7206a0f"}'
```

Now that we're using Batch Actions, no one can call this `new` method before us.

:::note Batch action failures
If one Action in a set of Batch Actions fails, the entire transaction is reverted. This is good to note because sharded, proof-of-stake systems do not work like proof-of-work where a complex transaction with multiple cross-contract calls reverts if one call fails. With NEAR, cross-contract calls use callbacks to ensure expected behavior, but we'll get to that later.
:::

## Get ready for our frontend

In the previous section we showed that we could use a `curl` command to view the state of the contract without explicitly having a function that returns a value from state. Now that we've demonstrated that and hashed the solution, let's add a short view-only function `get_solution`.

In the next section we'll add a simple frontend for our single, hardcoded crossword puzzle. We'll want to easily call a function to get the final solution hash. We can use this opportunity to remove the function `get_puzzle_number` and the constant it returns, as these were use for informative purposes.

We'll also modify our `guess_solution` to return a boolean value, which will also make things easier for our frontend.

```rust reference
https://github.com/mikedotexe/crossword-snippets/blob/dddacfae738cb8974fd8e9da79758362f5403472/src/lib.rs#L19-L31
```

The `get_solution` method can be called with:

    near view crossword.friend.testnet get_solution

In the next section we'll add a simple frontend. Following chapters will illustrate more NEAR concepts built on top of this idea.

---


# Add a simple frontend

This will be the final section in this chapter, where we'll add a simple frontend using React and [`near-api-js`](https://docs.near.org/docs/api/javascript-library) to communicate with the smart contract.

There will be three main files we'll be working with:
1. `src/index.js` will be the entry point, where NEAR network configuration will be set up, and the view-only call to `get_solution` will happen.
2. `src/App.js` is then called and sets up the crossword table and checks to see if a solution has been found.
3. `src/utils.js` is used to make a view-only call to the blockchain to get the solution, and other helper functions.

## Entry point

We'll go over a pattern that may look familiar to folks who have surveyed the [NEAR examples site](https://near.dev). We'll start with an asynchronous JavaScript function that sets up desired logic, then pass that to the React app.

```js reference
https://github.com/near-examples/crossword-tutorial-chapter-1/blob/3e497b4815600b8382614f76c7812520710f704d/src/index.js#L3-L22
```

Let's talk through the code above, starting with the imports.

We import from:

- `config.js` which, at the moment, is a common pattern. This file contains details on the different networks. (Which RPC endpoint to hit, which NEAR Wallet site to redirect to, which NEAR Explorer as well…)
- `utils.js` for that view-only function call that will call `get_solution` to retrieve the correct solution hash when a person has completed the crossword puzzle correctly.
- `hardcoded-data.js` is a file containing info on the crossword puzzle clues. This chapter has covered the crossword puzzle where the solution is **near nomicon ref finance**, and according to the chapter overview we've committed to serving *one* puzzle. We'll improve our smart contract later, allowing for multiple crossword puzzles, but for now it's hardcoded here.

Next, we define an asynchronous function called `initCrossword` that will be called before passing data to the React app. It's often useful to set up a connection with the blockchain here, but in our case all we need to do is retrieve the crossword puzzle solution as a hash. Note that we're attempting to pass this environment variable `NEAR_ENV` into our configuration file. `NEAR_ENV` is used to designate the blockchain network (testnet, betanet, mainnet) and is also [used in NEAR CLI](https://docs.near.org/docs/tutorials/contracts/general/deploy-to-mainnet). 

Lastly, we'll call `initCrossword` and, when everything is complete, pass data to the React app contained in `App.js`.

## React app

Here's a large portion of the `App.js` file, which will make use of a fork of a React crossword library by Jared Reisinger.

```js reference
https://github.com/near-examples/crossword-tutorial-chapter-1/blob/3e497b4815600b8382614f76c7812520710f704d/src/App.js#L3-L54
```

We'll discuss a few key points in the code above, but seeing as we're here to focus on a frontend connection to the blockchain, will brush over other parts that are library-specific.

The two imports worth highlighting are:

- `parseSolutionSeedPhrase` from the utility file we'll cover shortly. This will take the solution entered by the user and put it in the correct order according to the rules discussed in [the chapter overview](/zero-to-hero/basics/overview#how-it-works).
- `sha256` will take the ordered solution from above and hash it. Then we'll compare that hash with the one retrieved from the smart contract.

```js
const [solutionFound, setSolutionFound] = useState(false);
```

We're using [React Hooks](https://reactjs.org/docs/hooks-state.html) here, setting up the variable `solutionFound` that will be changed when the player of the crossword puzzle enters the final letter of the crossword puzzle, having entries for all the letters on the board.

The `onCrosswordComplete` and `checkSolution` blocks of code fire events to check the final solution entered by the user, hash it, and compare it to the `solutionHash` that was passed in from the view-only call in `index.js` earlier.

Finally, we return the [JSX](https://reactjs.org/docs/introducing-jsx.html) for our app and render the crossword puzzle! In this basic case we'll change this heading to indicate when the user has completed the puzzle successfully:

```html
<h3>Status: { solutionFound }</h3>
```

## Utility functions

We'll be using two utility functions here:

- `parseSolutionSeedPhrase` which will take a completed crossword puzzle and place the answers in the proper order. (Ascending by number, across answers come before down ones.)
- `viewMethodOnContract` makes the view-only call to the smart contract to retrieve the solution hash.

We'll only focus on the second method:

```js reference
https://github.com/near-examples/crossword-tutorial-chapter-1/blob/3e497b4815600b8382614f76c7812520710f704d/src/utils.js#L8-L12
```

This API doesn't look warm and friendly yet. You caught us! We'd love some help to improve our API as [detailed in this issue](https://github.com/near/near-api-js/issues/612), but for now, this is a concise way to get data from a view-only method.

We haven't had the frontend call a mutable method for our project yet. We'll get into that in the coming chapters when we'll want to have a prize sent to the first person to solve the puzzle.

## Run the React app

Let's run our frontend on testnet! We won't add any new concepts at this point in the chapter, but note that the [near examples](https://near.dev) typically create an account for you automatically with a NodeJS command. We covered the important pattern of creating a subaccount and deploying the smart contract to it, so let's stick with that pattern as we start up our frontend.

```bash
# Go into the directory containing the Rust smart contract we've been working on
cd contract

# Build (for Windows it's build.bat)
./build.sh

# Create fresh account if you wish, which is good practice
near delete crossword.friend.testnet friend.testnet
near create-account crossword.friend.testnet --masterAccount friend.testnet

# Deploy
near deploy crossword.friend.testnet --wasmFile res/my_crossword.wasm \
  --initFunction 'new' \
  --initArgs '{"solution": "69c2feb084439956193f4c21936025f14a5a5a78979d67ae34762e18a7206a0f"}'
  
# Return to the project root and start the React app
cd ..
env CONTRACT_NAME=crossword.friend.testnet npm run start
```

The last line sends the environment variable `CONTRACT_NAME` into the NodeJS script. This is picked up in the `config.js` file that's used to set up the contract account and network configuration:

```js reference
https://github.com/near-examples/crossword-tutorial-chapter-1/blob/3e497b4815600b8382614f76c7812520710f704d/src/config.js#L1
```

After running the last command to start the React app, you'll be given a link to a local website, like `https://localhost:1234`. When you visit the site you'll see the simple frontend that interacts with our smart contract:

![Crossword puzzle frontend showing a filled out puzzle with clues on the right sidebar](./basics-final-frontend.png)

## Completed project

Here's the final code for this chapter:

https://github.com/near-examples/crossword-tutorial-chapter-1
