---
id: intro-to-rust
title: An Introduction to Rust Smart Contracts
sidebar_label: Simple Rust smart contract
---

Writing smart contracts is a paradigm shift. There are only a few new concepts (state, transfer, account/balance information…) used, but they go a long way toward building full-fledged applications on the blockchain. This way of thinking has its own learning curve. Currently, the preferred programming language for writing smart contracts on NEAR is [Rust](https://www.rust-lang.org/). On top of learning smart contracts, developers unfamiliar with the Rust programming language may have an additional barrier to entry. This page is meant to provide an easy onboarding to Rust and smart contract development.

The example shown here will be a simple smart contract that serves as a counter, incrementing, decrementing, and returning the counter value. There is no previous Rust development required for this example. Folks familiar with the language may choose to jump straight into the examples located at [NEAR Example](https://near.dev) <img src="../assets/icon-link.png" alt="^" style="display: inline; width: 0.8rem;"/> .

For those who won't wish to dive into the deep end, consider this page a safe "wading pool" with no diving signs posted.

## 2-Step Rust Installation

### 1. Install Rustup

`curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`

([Taken from official installation guide](https://www.rust-lang.org/tools/install) <img src="../assets/icon-link.png" alt="^" style="display: inline; width: 0.8rem;"/>)

### 2. Add wasm target to your toolchain

`rustup target add wasm32-unknown-unknown`

<blockquote class="info">
  <a href="https://doc.rust-lang.org/edition-guide/rust-2018/platform-and-target-support/webassembly-support.html" target="_blank">Why <code>unknown-unknown</code> <img src="../assets/icon-link.png" alt="^" style="display: inline; width: 0.8rem;"/> ?</a> 
</blockquote>

## Resources

The online book [from the official Rust site](https://doc.rust-lang.org/1.30.0/book/2018-edition/ch00-00-introduction.html) <img src="../assets/icon-link.png" alt="^" style="display: inline; width: 0.8rem;"/> is a great resource to start with. It's recommended to read Chapter 1 before continuing, especially the `cargo` section.

## Getting started

Some smart contract examples from NEAR have a primary file that holds the code: `/src/lib.rs`. This is the conventional filename for a Rust library. Libraries will work great for compiling into WebAssembly and deployed the blockchain.

The example shown here will use a `lib.rs` file with smart contract logic using a `struct`, the `struct`'s functions, and unit tests. This will all be in one file for this simple example. As developers build more complex smart contracts, it's a good idea to [organize code the Rust way](https://doc.rust-lang.org/1.30.0/book/2018-edition/ch12-03-improving-error-handling-and-modularity.html#separation-of-concerns-for-binary-projects) <img src="../assets/icon-link.png" alt="^" style="display: inline; width: 0.8rem;"/> .

We'll break down the code in pieces below. If you wish to preview the complete code, please expand the bullets below.

## Full example files

<details>
  <summary>Full `Cargo.toml` file</summary>

```rust
[package]
name = "rust-counter-tutorial"
version = "0.1.0"
authors = ["Alice Bob <alice@example.com>"]
edition = "2018"

[lib]
crate-type = ["cdylib", "rlib"]

[dependencies]
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0.45"
near-sdk = "0.6.0"
borsh = "0.6.1"
wee_alloc = "0.4.5"

[profile.release]
codegen-units = 1
# Tell `rustc` to optimize for small code size.
opt-level = "z"
lto = true
debug = false
panic = "abort"
```

</details>

<details>
  <summary>Full `src/lib.rs` file</summary>
  
```rust
use borsh::{BorshDeserialize, BorshSerialize};
use near_sdk::{env, near_bindgen};

#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

// add the following attributes to prepare your code for serialization and invocation on the blockchain
// More built-in Rust attributes here: https://doc.rust-lang.org/reference/attributes.html#built-in-attributes-index
#[near_bindgen]
#[derive(Default, BorshDeserialize, BorshSerialize)]
pub struct Counter {
    val: i8, // i8 is signed. unsigned integers are also available: u8, u16, u32, u64, u128
}

#[near_bindgen]
impl Counter {
    // returns 8-bit signed integer, must match the type from our struct's 'val' defined above
    pub fn get_num(&self) -> i8 {
        return self.val;
    }

    // increment the counter
    pub fn increment(&mut self) {
        // note: adding one like this is an easy way to accidentally overflow
        // real smart contracts will want to have safety checks
        self.val = self.val + 1;
        let log_message = format!("Increased number to {}", self.val);
        env::log(log_message.as_bytes());
        after_counter_change();
    }

    // decrement (subtract from) the counter
    pub fn decrement(&mut self) {
        // note: subtracting one like this is an easy way to accidentally overflow
        // real smart contracts will want to have safety checks
        self.val = self.val - 1;
        let log_message = format!("Decreased number to {}", self.val);
        env::log(log_message.as_bytes());
        after_counter_change();
    }
}

// unlike the struct's functions above, this function cannot use attributes #[derive(…)] or #[near_bindgen]
// any attempts will throw helpful warnings upon 'cargo build'
// while this function cannot be invoked directly on the blockchain, it can be called from an invoked function
pub fn after_counter_change() {
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
    fn get_context(input: Vec<u8>, is_view: bool) -> VMContext {
        VMContext {
            current_account_id: "alice_near".to_string(),
            signer_account_id: "robert_near".to_string(),
            signer_account_pk: vec![0, 1, 2],
            predecessor_account_id: "jane_near".to_string(),
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
        }
    }

    // mark individual unit tests with #[test] for them to be registered and fired
    #[test]
    fn increment() {
        // set up the mock context into the testing environment
        let context = get_context(vec![], false);
        testing_env!(context);
        // instantiate a contract variable with the counter at zero
        let mut contract = Counter{ val: 0 };
        contract.increment();
        println!("Value after increment: {}", contract.get_num());
        // confirm that we received 1 when calling get_num
        assert_eq!(1, contract.get_num());
    }

    #[test]
    fn decrement() {
        let context = get_context(vec![], false);
        testing_env!(context);
        let mut contract = Counter{ val: 0 };
        contract.decrement();
        println!("Value after decrement: {}", contract.get_num());
        // confirm that we received -1 when calling get_num
        assert_eq!(-1, contract.get_num());
    }
}
```

</details>

This example project starts out very simple:

```bash
.
├── Cargo.toml
└── src
   └── lib.rs
```

Once we test, build, and get ready to deploy, a few more files and folders will be added here.

## Versioning for this example

At the time of this writing, this example works with the following versions:
- cargo: `cargo 1.42.0`
- rustc: `rustc 1.42.0`
- near-shell: `0.20.6` (we'll explain [near-shell](/docs/development/near-shell) later)

## Breaking it down

### Imports and initial code near the top

```rust
use borsh::{BorshDeserialize, BorshSerialize};
use near_bindgen::{env, near_bindgen};

#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;
```

At the top of this file we have the standard imports. The packages that follow the `use` statement can be found as dependencies in `Cargo.toml`. All the imports involving serialization will be used to bundle our code/storage so that it's ready for the blockchain.

Note that we're taking `env` from `near-sdk-rs`. This will provide a similar concept to **context** as seen in other blockchains. (Example: the sender of a transaction, tokens sent, logging, etc…) 

Last, the reference to `wee_alloc` is a way to optimize memory management. This section is rather boilerplate, but worth briefly mentioning.

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

When writing smart contracts, the pattern is to have a `struct` with an associated `impl` where we write the core logic into functions. It's actually common in Rust to have this pattern elsewhere.

<blockquote class="info">
  "…most functions will end up being inside impl blocks…"
  <a href="https://doc.rust-lang.org/std/keyword.fn.html" target="_blank">- Rust docs <img src="../assets/icon-link.png" alt="^" style="display: inline; width: 0.8rem;"/> </a>
</blockquote>

### Our core logic: the `struct`

We declare our `Counter` and `impl`, defining the functions we'll be invoking on the blockchain.

Above the definitions we see [attributes](https://doc.rust-lang.org/reference/attributes.html) <img src="../assets/icon-link.png" alt="^" style="display: inline; width: 0.8rem;"/>  specific to NEAR:

```rust
#[near_bindgen]
#[derive(Default, BorshDeserialize, BorshSerialize)]
```

These essentially allow the compilation into WebAssembly to be compatible and optimized for the NEAR blockchain.

We use the context `env` to write logs, as mentioned earlier.

<blockquote class="lesson">
<code>env</code> can return very useful information including:
<ul>
  <li><strong>signer_account_id</strong> - the account id of that signed the original transaction that led to this execution</li>
  <li><strong>attached_deposit</strong> - if someone sent tokens along with the call</li>
  <li><strong>account balance</strong> - the balance attached to the given account</li>
  <li><em>and more…</em></li>
</ul>
<p>More info <a href="https://nomicon.io/index.html" target="_blank">available here <img src="../assets/icon-link.png" alt="^" style="display: inline; width: 0.8rem;"/> </a>.</p>
</blockquote>

### Unit tests

The unit tests begin at:

```rust
mod tests {
  …
}
```

and continue until the end of the `lib.rs` file. The code here is fairly boilerplate. The custom unit test code comes into play here:

```rust
let mut contract = Counter{ val: 0 };
contract.increment();
// confirm that we received 1 when calling get_num
println!("Value after increment: {}", contract.get_num());
assert_eq!(1, contract.get_num());
```

<blockquote class="lesson">
<p>Notice the naming convention of variables here. There's a lot of <code>snake_case</code> and variables prefixed with an underscore. Upon building a project, Rust informs you if naming conventions are off. It's actually quite easy to write proper Rust code using the compiler's suggestions.</p>
</blockquote>

You may add as many tests as you need following the pattern in this file. Similar to unit tests in other languages and frameworks, just add the attribute:

`#[test]`

above the block of code to have it run in the suite of tests.

<hr />

## Finally: test, compile, and deploy 🚀

We're going to need two things to deploy this contract.

1. a NEAR account, [created with Wallet](https://wallet.testnet.near.org/create) <img src="../assets/icon-link.png" alt="^" style="display: inline; width: 0.8rem;"/>
2. `near-shell` installed [according to these instructions](/docs/development/near-shell)

Please use the links above if you haven't already, as we'll need those for deploying the smart contract.

### Test the code

```rust
cargo test --package rust-counter-tutorial -- --nocapture
```

### Compile the code

```bash
env 'RUSTFLAGS=-C link-arg=-s' cargo build --target wasm32-unknown-unknown --release
```

**Windows users**: please modify the above command as:
```bash
set RUSTFLAGS=-C link-arg=-s
cargo build --target wasm32-unknown-unknown --release
```

The above command is essentially setting special flags and optimizing the resulting `.wasm` file. At the end of the day it's simply a customized `cargo build --release` command that should look familiar [from Chapter 1](https://doc.rust-lang.org/1.30.0/book/2018-edition/ch01-03-hello-cargo.html) <img src="../assets/icon-link.png" alt="^" style="display: inline; width: 0.8rem;"/> .

### Login with near-shell

We're going to use `near-shell` to login to our account created earlier at the Wallet site. In your command prompt, navigate to the directory containing the `Cargo.toml` file. (It also contains the `src` directory.)

```bash
near login
```

A link will be output after this command is run. Copy/paste the link into a browser. (Or on OS X, hold Command and click the link if your Terminal application allows it.)

Follow the instructions in Wallet to authenticate your account, then head back to Terminal to complete the final step confirming the account name.

Notice that our project directory now has a few new items:

```bash
.
├── Cargo.lock  ⟵ created during build to lock dependencies
├── Cargo.toml
├── neardev     ⟵ created by "near login" containing keys
├── src
│  └── lib.rs
└── target      ⟵ created during build, holds the compiled wasm
```

Now that we have the `neardev` folder with our keys, we can deploy the compiled contract to NEAR.

In the following steps, please replace `YOUR_ACCOUNT_HERE` with the name of the account created in the NEAR Wallet.

### Deploying

```rust
near deploy --wasmFile target/wasm32-unknown-unknown/release/rust_counter_tutorial.wasm --accountId YOUR_ACCOUNT_HERE
```

### Invoking

We'll use `near-shell` to invoke methods on our smart contract.

Increment:
```bash
near call YOUR_ACCOUNT_HERE increment --accountId YOUR_ACCOUNT_HERE
```

Note that in the above command, we use the account name twice. If we were to translate this into a sentence it would be:

>Please call the contract deployed to NEAR account X. On that contract is a method called "increment" that takes no additional arguments. Oh, and we happen to be calling this contract using keys from account X, too.

Contract methods can be called from other NEAR accounts quite easily. Please see [the examples](https://near.dev) <img src="../assets/icon-link.png" alt="^" style="display: inline; width: 0.8rem;"/> for more information.

Next, call the "decrement" method in the same fashion:

Decrement:
```bash
near call YOUR_ACCOUNT_HERE decrement --accountId YOUR_ACCOUNT_HERE
```

Check counter:
```bash
near view YOUR_ACCOUNT_HERE get_num --accountId YOUR_ACCOUNT_HERE
```

The smart contract is alive on the blockchain!

This example is as bare bones as it gets, but illustrates all the moving parts associated with writing a smart contract with Rust. Admittedly, it's a poor example when it comes to creating anything user-facing.

Now that we're familiar with the build process, a natural next step might be to check out `create-near-app`. This project includes another Rust smart contract but has an interface. With `create-near-app` many of the steps we performed on the command line are wrapped neatly into build scripts.

Read more about [`create-near-app`](https://github.com/nearprotocol/create-near-app/) <img src="../assets/icon-link.png" alt="^" style="display: inline; width: 0.8rem;"/> or try it out now by running:

```bash
npx create-near-app --rust new-awesome-app
```

Follow the instructions to set up a simple Rust smart contract with a React frontend. Happy coding! 

## Troubleshooting

If `near` commands return an error containing:

>Cannot deserialize the contract state.

Please see this [StackOverflow post](https://stackoverflow.com/questions/60767120/getting-cannot-deserialize-the-contract-state-when-calling-rust-init-function) <img src="../assets/icon-link.png" alt="^" style="display: inline; width: 0.8rem;"/>.