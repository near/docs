---
id: intro
title: Building a Smart Contract in Rust
sidebar_label: Quick-start Guide
---

This tutorial will guide you in setting up a Smart Contract development environment from the
ground up and show you how to compile, test, and run your first Rust smart contract on NEAR.

The example presented in this article is a simple smart contract that serves as a Counter, 
incrementing, decrementing, and returning the counter value. There is no previous Rust
development required for this tutorial. Users familiar with the language may choose to jump
straight into the samples available at [near.dev](https://near.dev).


## Introduction

Writing smart contracts is a paradigm shift. There are only a few new concepts (state,
transfer, account and balance information, etc.) used, but they go a long way toward building
full-fledged applications on the blockchain. This way of thinking has its own learning
curve. Currently, the preferred programming language for writing smart contracts on NEAR
is [Rust](https://www.rust-lang.org/). On top of learning smart contracts, developers
unfamiliar with the Rust programming language may have an additional barrier to entry.
This tutorial is meant to provide an easy onboarding to Rust and smart contract development.


## Prerequisites

To complete this tutorial successfully, you'll need:

- [Rust toolchain](#installing-the-rust-toolchain)
- [A NEAR account](#creating-a-near-account)
- [NEAR command-line interface](#installing-the-near-cli) (`near-cli`)


## Setting up the requirements

In this section, you'll learn how to install and set up the basic tools to create smart
contracts in Rust. Along with the Rust environment, you'll create a NEAR account and
install the `near-cli`.

### Installing the Rust toolchain

The following instructions are taken from the official [Rust installation
guide](https://www.rust-lang.org/tools/install). If you already have the Rust toolchain,
you can [skip](#creating-a-near-account) these steps.

> **Tip:** If you're new to the Rust programming language,
[the online book](https://doc.rust-lang.org/1.30.0/book/2018-edition/ch00-00-introduction.html)
from the official Rust site is a great resource to start with.


#### 1. Install Rustup

Run `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`

#### 2. Configure your current shell

Run `source $HOME/.cargo/env`

> **Note:** alternatively you can simply relaunch your terminal window

#### 3. Add `wasm` target to your toolchain

Run `rustup target add wasm32-unknown-unknown`


<blockquote class="info">
  <a href="https://doc.rust-lang.org/edition-guide/rust-2018/platform-and-target-support/webassembly-support.html" target="_blank">Why <code>unknown-unknown</code>?</a>
</blockquote>


### Creating a NEAR account

The easiest way to create an account on NEAR is using the [NEAR Wallet](https://wallet.near.org/).
NEAR has several [development networks](/docs/concepts/networks) operating independently of
each other with their own accountIDs. For this example, you'll create a new
[`testnet`](/docs/develop/basics/create-account#creating-a-testnet-account) account.

If you already have a NEAR `testnet` account, you can [skip](#installing-the-near-cli) these steps.

#### 1. Reserve an Account ID

* Navigate to https://wallet.testnet.near.org and click on "Create Account".
* Next, enter your desired account name.
  
#### 2. Secure your account

* Choose your account recovery method. For simplicity, in this tutorial you can select
  "E-mail Account Recovery", although "Recovery Phrase" and [Ledger](https://www.ledger.com/)
  are the most secure methods.

#### 3. E-mail / Phone Number Account Recovery

* Enter the account activation code that you received.

#### 4. Success!

* You just created a `testnet` account and received 200 Ⓝ! Upon recovery method confirmation
  you should be directed to your account dashboard.


### Installing the `near-cli`

The following instructions are taken from the `near-cli` [installation
guide](https://docs.near.org/docs/tools/near-cli#setup). If you already have the command line
interface, you can [skip](#creating-the-repository) these steps.

> **Note:** Make sure you have a current version of `npm` and `NodeJS` installed.

#### Linux and macOS

1. Install `npm` and `node` using a package manager such as `nvm`. Sometimes there are issues
   using Ledger due to how macOS handles node packages related to USB devices.
   [[click here]](https://nodejs.org/en/download/package-manager/)
2. Ensure you have installed Node version 12 or above.
3. Install `near-cli` globally by running:

```bash
npm install -g near-cli
```

#### Windows

> **Note:** For Windows users, we recommend using Windows Subsystem for Linux (`WSL`).

1. Install `WSL` [[click here]](https://docs.microsoft.com/en-us/windows/wsl/install-manual#downloading-distros)
2. Install ` Node.js` [[click here]](https://nodejs.org/en/download/package-manager/)
3. Change `npm` default directory [[click here]](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally#manually-change-npms-default-directory)
   - This is to avoid any permission issues with `WSL`
4. Open `WSL` and install `near-cli` globally by running:

```bash
npm install -g near-cli
```


## Creating the repository

Now that you have all the tools in place, you can create a new project repository for the smart
contract using `cargo`. To create the repository, navigate back to your projects directory, and run
the following commands:

```bash
$ cargo new rust-counter-tutorial
$ cd rust-counter-tutorial
```

The first command creates a new directory called `rust-counter-tutorial`. We’ve named the project
 `rust-counter-tutorial`, and Cargo creates its files in a directory of the same name.

If you check the `rust-counter-tutorial` directory, you’ll see that Cargo has generated two 
files and one directory for us: a `Cargo.toml` file and a `src` directory with a `main.rs` file 
inside. 

```bash
.
├── Cargo.toml
└── src
   └── main.rs
```

> **Note:** The `main.rs` is not needed for this example, so feel free to delete it.

## Creating the files

This smart contract project starts out with a simple layout:

```bash
.
├── Cargo.toml
└── src
   └── lib.rs
```

Smart contracts from NEAR usually have a primary file that holds the code: `./src/lib.rs`.
This is the conventional filename for a Rust library. Libraries will work great for compiling 
into [WebAssembly](https://webassembly.org/) and deployed the blockchain.

> **Note:** Once you test, build, and get ready to deploy, a few more files and folders will be added here.

### Editing `Cargo.toml`

Open `Cargo.toml` in your text editor of choice. This file is in the TOML (Tom’s Obvious,
Minimal Language) format, which is Cargo’s configuration format.
Next, replace the content with the following [`Cargo.toml`](https://raw.githubusercontent.com/near-examples/rust-counter/master/contract/Cargo.toml) file.


<details>
  <summary>Full `Cargo.toml` file</summary>

```toml
[package]
name = "rust-counter-tutorial"
version = "0.1.0"
authors = ["Near Inc <hello@near.org>"]
edition = "2018"

[lib]
crate-type = ["cdylib", "rlib"]

[dependencies]
near-sdk = "3.1.0"

[profile.release]
codegen-units = 1
# Tell `rustc` to optimize for small code size.
opt-level = "z"
lto = true
debug = false
panic = "abort"
# Opt into extra safety checks on arithmetic operations https://stackoverflow.com/a/64136471/249801
overflow-checks = true
```

</details>

### Creating `lib.rs`

Create a `./src/lib.rs` file in your text editor, and paste the content of the following
[`lib.rs`](https://raw.githubusercontent.com/near-examples/rust-counter/master/contract/src/lib.rs) file.
This example uses a `lib.rs` file with the smart contract logic using a `struct`,
the `struct`'s functions, and unit tests. This will all be in one file for this simple example.

> **Note:** As developers build more complex smart contracts, it's a good idea to [organize code the 
Rust way](https://doc.rust-lang.org/1.30.0/book/2018-edition/ch12-03-improving-error-handling-and-modularity.html#separation-of-concerns-for-binary-projects).


<details>
  <summary>Full `src/lib.rs` file</summary>

```rust
//! This contract implements simple counter backed by storage on blockchain.
//!
//! The contract provides methods to [increment] / [decrement] counter and
//! [get it's current value][get_num] or [reset].
//!
//! [increment]: struct.Counter.html#method.increment
//! [decrement]: struct.Counter.html#method.decrement
//! [get_num]: struct.Counter.html#method.get_num
//! [reset]: struct.Counter.html#method.reset

use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{env, near_bindgen};

near_sdk::setup_alloc!();

// add the following attributes to prepare your code for serialization and invocation on the blockchain
// More built-in Rust attributes here: https://doc.rust-lang.org/reference/attributes.html#built-in-attributes-index
#[near_bindgen]
#[derive(Default, BorshDeserialize, BorshSerialize)]
pub struct Counter {
    // See more data types at https://doc.rust-lang.org/book/ch03-02-data-types.html
    val: i8, // i8 is signed. unsigned integers are also available: u8, u16, u32, u64, u128
}

#[near_bindgen]
impl Counter {
    /// Returns 8-bit signed integer of the counter value.
    ///
    /// This must match the type from our struct's 'val' defined above.
    ///
    /// Note, the parameter is `&self` (without being mutable) meaning it doesn't modify state.
    /// In the frontend (/src/main.js) this is added to the "viewMethods" array
    /// using near-cli we can call this by:
    ///
    /// ```bash
    /// near view counter.YOU.testnet get_num
    /// ```
    pub fn get_num(&self) -> i8 {
        return self.val;
    }

    /// Increment the counter.
    ///
    /// Note, the parameter is "&mut self" as this function modifies state.
    /// In the frontend (/src/main.js) this is added to the "changeMethods" array
    /// using near-cli we can call this by:
    ///
    /// ```bash
    /// near call counter.YOU.testnet increment --accountId donation.YOU.testnet
    /// ```
    pub fn increment(&mut self) {
        // note: adding one like this is an easy way to accidentally overflow
        // real smart contracts will want to have safety checks
        // e.g. self.val = i8::wrapping_add(self.val, 1);
        // https://doc.rust-lang.org/std/primitive.i8.html#method.wrapping_add
        self.val += 1;
        let log_message = format!("Increased number to {}", self.val);
        env::log(log_message.as_bytes());
        after_counter_change();
    }

    /// Decrement (subtract from) the counter.
    ///
    /// In (/src/main.js) this is also added to the "changeMethods" array
    /// using near-cli we can call this by:
    ///
    /// ```bash
    /// near call counter.YOU.testnet decrement --accountId donation.YOU.testnet
    /// ```
    pub fn decrement(&mut self) {
        // note: subtracting one like this is an easy way to accidentally overflow
        // real smart contracts will want to have safety checks
        // e.g. self.val = i8::wrapping_sub(self.val, 1);
        // https://doc.rust-lang.org/std/primitive.i8.html#method.wrapping_sub
        self.val -= 1;
        let log_message = format!("Decreased number to {}", self.val);
        env::log(log_message.as_bytes());
        after_counter_change();
    }

    /// Reset to zero.
    pub fn reset(&mut self) {
        self.val = 0;
        // Another way to log is to cast a string into bytes, hence "b" below:
        env::log(b"Reset counter to zero");
    }
}

// unlike the struct's functions above, this function cannot use attributes #[derive(…)] or #[near_bindgen]
// any attempts will throw helpful warnings upon 'cargo build'
// while this function cannot be invoked directly on the blockchain, it can be called from an invoked function
fn after_counter_change() {
    // show helpful warning that i8 (8-bit signed integer) will overflow above 127 or below -128
    env::log("Make sure you don't overflow, my friend.".as_bytes());
}

/*
 * the rest of this file sets up unit tests
 * to run these, the command will be:
 * cargo test --package rust-counter-tutorial -- --nocapture
 * Note: 'rust-counter-tutorial' comes from cargo.toml's 'name' key
 */

// use the attribute below for unit tests
#[cfg(test)]
mod tests {
    use super::*;
    use near_sdk::MockedBlockchain;
    use near_sdk::{testing_env, VMContext};

    // part of writing unit tests is setting up a mock context
    // in this example, this is only needed for env::log in the contract
    // this is also a useful list to peek at when wondering what's available in env::*
    fn get_context(input: Vec<u8>, is_view: bool) -> VMContext {
        VMContext {
            current_account_id: "alice.testnet".to_string(),
            signer_account_id: "robert.testnet".to_string(),
            signer_account_pk: vec![0, 1, 2],
            predecessor_account_id: "jane.testnet".to_string(),
            input,
            block_index: 0,
            block_timestamp: 0,
            account_balance: 0,
            account_locked_balance: 0,
            storage_usage: 0,
            attached_deposit: 0,
            prepaid_gas: 10u64.pow(18),
            random_seed: vec![0, 1, 2],
            is_view,
            output_data_receivers: vec![],
            epoch_height: 19,
        }
    }

    // mark individual unit tests with #[test] for them to be registered and fired
    #[test]
    fn increment() {
        // set up the mock context into the testing environment
        let context = get_context(vec![], false);
        testing_env!(context);
        // instantiate a contract variable with the counter at zero
        let mut contract = Counter { val: 0 };
        contract.increment();
        println!("Value after increment: {}", contract.get_num());
        // confirm that we received 1 when calling get_num
        assert_eq!(1, contract.get_num());
    }

    #[test]
    fn decrement() {
        let context = get_context(vec![], false);
        testing_env!(context);
        let mut contract = Counter { val: 0 };
        contract.decrement();
        println!("Value after decrement: {}", contract.get_num());
        // confirm that we received -1 when calling get_num
        assert_eq!(-1, contract.get_num());
    }

    #[test]
    fn increment_and_reset() {
        let context = get_context(vec![], false);
        testing_env!(context);
        let mut contract = Counter { val: 0 };
        contract.increment();
        contract.reset();
        println!("Value after reset: {}", contract.get_num());
        // confirm that we received -1 when calling get_num
        assert_eq!(0, contract.get_num());
    }
}
```

</details>


## Breaking it down

Before we continue, let's review some parts of the smart contract's source code.
We'll break down the code in pieces in the next section.

### Imports and initial code

```rust
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{env, near_bindgen};
```

At the top of this file you have the standard imports. The packages that follow the `use` 
statement can be found as dependencies in `Cargo.toml`. All the imports involving 
serialization are used to bundle the code/storage so that it's ready for the blockchain.

> **Note:** The code takes `env` from `near-sdk-rs`. This will provide a similar concept to
**context** as seen in other blockchains. (Example: the sender of a transaction,
tokens sent, logging, etc.)

Below are some snippets from the `lib.rs` file:

```rust
#[near_bindgen]
#[derive(Default, BorshDeserialize, BorshSerialize)]
pub struct Counter {
    val: i8, // i8 is signed. unsigned integers are also available: u8, u16, u32, u64, u128
}

#[near_bindgen]
impl Counter {    
  … 
```

When writing smart contracts, the pattern is to have a `struct` with an associated `impl`
where you write the core logic into functions. It's actually common in Rust to have this
pattern elsewhere.

<blockquote class="info">
  "…most functions will end up being inside impl blocks…"
  <a href="https://doc.rust-lang.org/std/keyword.fn.html" target="_blank">- Rust docs</a>
</blockquote>

### The core logic: the `struct`

We declare our `Counter` and `impl`, defining the functions we'll be invoking on the blockchain.

Above the definitions we see [attributes](https://doc.rust-lang.org/reference/attributes.html)
specific to NEAR:

```rust
#[near_bindgen]
#[derive(Default, BorshDeserialize, BorshSerialize)]
```

These essentially allow the compilation into WebAssembly to be compatible and optimized for
the NEAR blockchain.

You can use the context `env` to write logs, as mentioned earlier.

<blockquote class="lesson">
<code>env</code> can return very useful information including:
<ul>
  <li><strong>signer_account_id</strong> - the account id of that signed the original transaction that led to this execution</li>
  <li><strong>attached_deposit</strong> - if someone sent tokens along with the call</li>
  <li><strong>account balance</strong> - the balance attached to the given account</li>
  <li><em>and more…</em></li>
</ul>
<p>More info <a href="https://nomicon.io/index.html" target="_blank">available here</a>.</p>
</blockquote>

### Unit tests

The unit tests begin at:

```rust
mod tests {
  …
}
```

and continue until the end of the `lib.rs` file. The code here is fairly boilerplate.

### Writing a test

The custom unit test code comes into play here:

```rust
let mut contract = Counter{ val: 0 };
contract.increment();
// confirm that we received 1 when calling get_num
println!("Value after increment: {}", contract.get_num());
assert_eq!(1, contract.get_num());
```

<blockquote class="lesson">
<p>Notice the naming convention of variables here. There's a lot of <code>snake_case</code>
and variables prefixed with an underscore. Upon building a project, Rust informs you if naming
conventions are off. It's actually quite easy to write proper Rust code using the compiler's suggestions.</p>
</blockquote>

You may add as many tests as you need following the pattern in this file. Similar to unit
tests in other languages and frameworks, just add the attribute:

`#[test]`

above the block of code to have it executed in the test suite.

## Test & compile

In this section, you'll test the smart contract, compile it, and generate a `wasm` release binary.

### Test the code

You can easily test the smart contract code using `cargo`:

```bash
cargo test -- --nocapture
```

You should get an output like:

```
running 3 tests
Value after decrement: -1
Value after increment: 1
Value after reset: 0
test tests::decrement ... ok
test tests::increment ... ok
test tests::increment_and_reset ... ok

test result: ok. 3 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s
```

### Compile the code

Assuming that all the tests passed **ok**, you can go ahead and compile the smart contract:

```bash
cargo build --target wasm32-unknown-unknown --release
```

> **Note:** The above `build` command is setting a `target` flag to create a WebAssembly `.wasm` file.

Notice that your project directory now has a few additional items:

```bash
.
├── Cargo.lock  ⟵ created during build to lock dependencies
├── Cargo.toml
├── src
│  └── lib.rs
└── target      ⟵ created during build, holds the compiled wasm
```


## Deploying the smart contract 🚀

With the compiled `.wasm` file ready, you can go ahead and deploy the smart contract.
To deploy it, you'll use [`near-cli`](#installing-the-near-cli) and your `testnet` NEAR account.

### Login with `near-cli`

First, use `near-cli` to login to the account you created earlier at the Wallet site.
In your command prompt, navigate to the directory containing the `Cargo.toml` file.
(It also contains the `src` directory.)

```bash
near login
```

A link will be shown after you execute this command. Open the link into your web browser.
(on macOS, hold Command and click the link if your Terminal application allows it.)

Follow the instructions in NEAR Wallet to authenticate your account, then head back to your
Terminal to complete the final step confirming the account name.

> **Note:** The default network for `near-cli` is `testnet`. If you would like to change this
to `mainnet` or `betanet`, please see [`near-cli` network
selection](/docs/tools/near-cli#network-selection) for instructions.


Now that your login keys have been saved to the home directory, you can use `near-cli`
to deploy the compiled contract to NEAR.

> **Note:** In Linux and macOS this folder will be `~/.near-credentials`.


### Deploying the contract

Finally, use `near-cli` to deploy the smart contract to NEAR test network:

> **Note:** In the following steps, please replace `YOUR_ACCOUNT_HERE` with the name of the account
you created in the NEAR Wallet. For example: `my-username.testnet`.

```bash
near deploy --wasmFile target/wasm32-unknown-unknown/release/rust_counter_tutorial.wasm --accountId YOUR_ACCOUNT_HERE
```

Congratulations! Your smart contract is alive on the blockchain!

### Invoking the methods

After the deployment, you are ready to invoke methods on the smart contract.

#### Increment

Call the `increment` method using `near-cli`:

```bash
near call YOUR_ACCOUNT_HERE increment --accountId YOUR_ACCOUNT_HERE
```

You should see an output like:

```
Scheduling a call: YOUR_ACCOUNT.testnet.increment()
Receipt: 3r9VBxypkdMVJNzbmfUd1GYz4iHjdDM7VZX7DijZ9jg3
	Log [YOUR_ACCOUNT.testnet]: Increased number to 1
	Log [YOUR_ACCOUNT.testnet]: Make sure you don't overflow, my friend.
Transaction Id 4Cc8BAj3NiMB2Z5XBPmozKJy2dGtpJSoSaA1m7hHxRGQ
```

Note that in the above command, you are using the account name twice. A simple translation
into a sentence would be:

> Please call the contract deployed to NEAR account X. On that contract there's a method called
`increment` that takes no additional arguments. Oh, and we happen to be calling this contract 
using keys from account X, too.

Contract methods can be called from other NEAR accounts easily. Please see
[the examples page](https://near.dev) for more information.


#### Decrement

Next, call the `decrement` method in the same way:

```bash
near call YOUR_ACCOUNT_HERE decrement --accountId YOUR_ACCOUNT_HERE
```

You should see a response on your terminal:

```
Scheduling a call: YOUR_ACCOUNT.testnet.decrement()
Receipt: 3HiRrL4fg9Q62VV9aVfAdRk8bQ5nYEYTni9482qjPJ71
	Log [YOUR_ACCOUNT.testnet]: Decreased number to 0
	Log [YOUR_ACCOUNT.testnet]: Make sure you don't overflow, my friend.
Transaction Id 7jVgp677evM7srG697bVWErErzieBWExLvkSiBfvZ8YC
```

#### Check counter value

To check the current counter value, call the `get_num` method:

```bash
near view YOUR_ACCOUNT_HERE get_num --accountId YOUR_ACCOUNT_HERE
```

The method should provide a response:

```
View call: YOUR_ACCOUNT.testnet.get_num()
0
```

## Next steps

This example is as bare bones as it gets, but illustrates all the moving parts associated
with writing a smart contract with Rust. Admittedly, it's a poor example when it comes to
creating anything user-facing.

Now that you're familiar with the build process, a natural next step is to check out
`create-near-app`. This project includes another Rust smart contract but has an interface.
With `create-near-app` many of the steps we performed on the command line are wrapped
neatly into build scripts.

[Read more](https://github.com/near/create-near-app/) about `create-near-app` or try it
out now by running:

```bash
npx create-near-app --contract=rust new-awesome-app
```

Follow the instructions to set up a simple Rust smart contract with a React front-end.
Happy coding!

## Versioning for this article

At the time of this writing, this example works with the following versions:

- cargo: `cargo 1.53.0 (4369396ce 2021-04-27)`
- rustc: `rustc 1.53.0 (53cb7b09b 2021-06-17)`
- near-cli: `2.1.0`
