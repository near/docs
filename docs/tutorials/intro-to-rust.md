---
id: intro-to-rust
title: An Introduction to Rust Smart Contracts
sidebar_label: Simple Rust smart contract
---

Writing smart contracts is a paradigm shift. There are only a few new concepts (state, transfer, account/balance information…) used, but they go a long way toward building full-fledged applications on the blockchain. This way of thinking has its own learning curve. Currently, the preferred programming language for writing smart contracts on NEAR is [Rust](https://www.rust-lang.org/). On top of learning smart contracts, developers unfamiliar with the Rust programming language may have an additional barrier to entry. This page is meant to provide an easy onboarding to Rust and smart contract development.

The example shown here will be a simple smart contract that serves as a counter, incrementing, decrementing, and returning the counter value. There is no previous Rust development required for this example. Folks familiar with the language may choose to jump straight into the examples below. 

**Note**: these examples are meant to be run by cloning the parent repository and following the directions in their corresponding `README.md` in the example's directory.

- [Cross-contract functions, like promises, or money transfers](https://github.com/nearprotocol/near-bindgen/tree/master/examples/cross-contract-high-level)
- [Cross-contract calls using more low-level promise calls](https://github.com/nearprotocol/near-bindgen/tree/master/examples/cross-contract-low-level)
- [Fungible token like ERC-20 but designed for the async runtime like NEAR](https://github.com/nearprotocol/near-bindgen/tree/master/examples/fun-token)
- [Implements simulation of a distributed network of drones interacting with the mission control system](https://github.com/nearprotocol/near-bindgen/tree/master/examples/mission-control)
- [Records the status messages of the accounts that call this contract](https://github.com/nearprotocol/near-bindgen/tree/master/examples/status-message-collections)
- [Records the status messages of the accounts that call this contract](https://github.com/nearprotocol/near-bindgen/tree/master/examples/status-message)

For those who won't wish to dive into the deep end, consider this page a safe "wading pool" with no diving signs posted.

## 2-Step Rust Installation

### 1. Install Rustup

`curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`

([Taken from official installation guide](https://www.rust-lang.org/tools/install))

### 2. Add wasm target to your toolchain

`rustup target add wasm32-unknown-unknown`

<blockquote class="info">
  <a href="https://doc.rust-lang.org/edition-guide/rust-2018/platform-and-target-support/webassembly-support.html" target="_blank">Why <code>unknown-unknown</code>?</a>
</blockquote>

## Resources

The online book [from the official Rust site](https://doc.rust-lang.org/1.30.0/book/2018-edition/ch00-00-introduction.html) is a great resource to start with. It's recommended to read Chapter 1 before continuing, especially the `cargo` section.

This book is also available with [Dash](https://kapeli.com/dash) for offline usage in an easy-to-read interface. Once Dash is installed, it can be found within the app or at the [docset Github page](https://github.com/indirect/dash-rust). 

## Getting started

Some smart contract examples from NEAR have a primary file that holds the code: `/src/lib.rs`. This is the conventional filename for a Rust library. Libraries will work great for compiling into WebAssembly and deployed the blockchain. They typically **don't**, however, provide an entry point. Most online guides lead a new Rust developer through the process of creating a `main.rs` file and adding code to the default entry point:

```rust
fn main() {
  …
}
```

The example shown here will use a `main.rs`, with a `main()` function, smart contract logic using `struct` and the `struct`'s functions, and unit tests. This will all be in one file to keep things simple. Read more about how to organize code with binaries and libraries [at this link](https://doc.rust-lang.org/1.30.0/book/2018-edition/ch12-03-improving-error-handling-and-modularity.html#separation-of-concerns-for-binary-projects).

**Note**: in this example our `main.rs` file is technically a library (see the `Cargo.toml`'s `[lib]` section) but can be called similar to a binary which is typically located in the manifest under `[[bin]]`.

We'll break down the code in pieces below. If you wish to preview the complete code, please expand the bullets below.

## Full example files

<details>
  <summary>Full `Cargo.toml` file</summary>

```rust
[package]
name = "rust-counter"
version = "0.1.0"
authors = ["Mike Purvis <mike@nearprotocol.com>", "NEAR Protocol <hello@nearprotocol.com>"]
edition = "2018"

[lib]
crate-type = ["cdylib", "rlib"]
path = "src/main.rs"

[dependencies]
serde = { version = "1.0", features = ["derive"] }
serde_json = { git = "https://github.com/nearprotocol/json", rev = "1f5779f3b0bd3d2a4b0b975abc46f3d3fe873331", features = ["no_floats"] }
near-bindgen = "0.4.1"
borsh = "0.2.10"
wee_alloc = "0.4.5"

[profile.release]
codegen-units = 1
# Tell `rustc` to optimize for small code size.
opt-level = "z"
lto = true
debug = false
panic = "abort"

[workspace]
members = []

```

</details>

<details>
  <summary>Full `src/main.rs` file</summary>
  
```rust
use borsh::{BorshDeserialize, BorshSerialize};
use serde::{Deserialize, Serialize};
use near_bindgen::{env, near_bindgen};
use std::io;

#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

/*
 * This main function is for local development, so that 'cargo run' can be used to test smart contract functions.
 * It can be safely be removed before building and deploying if desired.
 */

// The #[allow(dead_code) attribute below silences a benign warning.
// More built-in Rust attributes here: https://doc.rust-lang.org/reference/attributes.html#built-in-attributes-index
#[allow(dead_code)]
fn main() {
    // initialize a mock counter that starts at zero
    let mut _mock_counter = Counter{ val: 0 };
    // we'll pass in a variable letting our struct's functions know we're calling it locally

    println!("Welcome to NEAR. This main function can call the functions of our smart contract's struct(s).");
    // initialize variable for standard input (what the user enters in the command line)
    let mut input = String::new();
    
    // keep gathering user input until an invalid entry, then quit
    let mut quit = false;
    while !quit {
        println!("Please type 'increment' (i), 'decrement' (d), or 'get_num' (get) to call those functions.");
        // clear old value and read the standard input from user
        input.clear();
        io::stdin().read_line(&mut input).expect("Failed to read input.");
        // trim the response as it includes a newline character
        match input.trim() {
            "increment" | "i" => {
                // increment counter, specifying local development
                _mock_counter.increment(Some("local".to_string()));
            },
            "decrement" | "d" => {
                // decrement counter, specifying local development
                _mock_counter.decrement(Some("local".to_string()));
            },
            "get_num" | "get" => {
                // get the current value of the counter
                // we don't specify local development because there's no env::log call, it simply returns an int
                let current_val = _mock_counter.get_num();
                println!("Counter value is {}", current_val);
            },
            // catch-all input for when the user enters anything else
            _ => {
                quit = true;
                println!("Quitting");
            }
        }
    }
}

// add the following attributes to prepare your code for serialization and invocation on the blockchain
#[near_bindgen]
#[derive(Default, BorshDeserialize, BorshSerialize)]
#[derive(Serialize, Deserialize)]
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
    pub fn increment(&mut self, debug_print: Option<String>) {
        // note: adding one like this is an easy way to accidentally overflow
        // real smart contracts will want to have safety checks
        self.val = self.val + 1;
        let _log_message = format!("Increased number to {}", self.val);
        // invocations on the blockchain will return None
        // local development passes a string "local" here
        // other options might be "logfile" to output using io, etc.
        // locally, we cannot use env::log, so print to standard output
        match debug_print {
            Some(env_type) => {
                if env_type == "local" {
                    println!("{}", _log_message);
                }
            },
            None => {
                env::log(_log_message.as_bytes());
                after_counter_change();
            }
        }        
    }

    // decrement (subtract from) the counter
    pub fn decrement(&mut self, debug_print: Option<String>) {
        // note: subtracting one like this is an easy way to accidentally overflow
        // real smart contracts will want to have safety checks
        self.val = self.val - 1;
        let _log_message = format!("Decreased number to {}", self.val);
        match debug_print {
            Some(env_type) => {
                if env_type == "local" {
                    println!("{}", _log_message);
                }
            },
            None => {
                env::log(_log_message.as_bytes());
                after_counter_change();
            } 
        }
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
 * cargo test --package rust-counter -- --nocapture
 * Note: 'rust-counter' comes from cargo.toml's 'name' key
 */

// always use the attributes below for unit tests
#[cfg(not(target_arch = "wasm32"))]
#[cfg(test)]
mod tests {
    use super::*;
    use near_bindgen::MockedBlockchain;
    use near_bindgen::{testing_env, VMContext};

    // part of writing unit tests is setting up a mock context
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
        contract.increment(None);
        // confirm that we received 1 when calling get_num
        assert_eq!(1, contract.get_num());
    }

    #[test]
    fn decrement() {
        let context = get_context(vec![], false);
        testing_env!(context);
        let mut contract = Counter{ val: 0 };
        contract.decrement(None);
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
   └── main.rs
```

Once we test, build, and get ready to deploy, a few more files and folders will be added here.

## Versioning for this example

At the time of this writing, this example works with the following versions:
- cargo: `cargo 1.41.0 (626f0f40e 2019-12-03)`
- rustc: `rustc 1.41.0 (5e1a79984 2020-01-27)`
- near-shell: `0.20.1` (we'll explain [near-shell](/docs/development/near-clitool) later)

## Breaking it down

### Imports and initial code near the top

```rust
use borsh::{BorshDeserialize, BorshSerialize};
use serde::{Deserialize, Serialize};
use near_bindgen::{env, near_bindgen};
use std::io;

#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;
```

At the top of this file we have the standard imports. The packages that follow the `use` statement can be found as dependencies in `Cargo.toml`. All the imports involving serialization will be used to bundle our code/storage so that it's ready for the blockchain.

Note that we're taking `env` from `near-bindgen`. This will provide a similar concept to **context** as seen in other blockchains. (Example: the sender of a transaction, tokens sent, logging, etc…) 

Last, the reference to `wee_alloc` is a way to optimize memory management. This section is rather boilerplate, but worth briefly mentioning.

### The `main()` function

**Note**: the `fn main()` in this example will only be called locally during development. It cannot be invoked on the blockchain. If you've [completed Chapter 1](https://doc.rust-lang.org/1.30.0/book/2018-edition/ch01-00-getting-started.html) of the Rust book mentioned earlier, you've noticed many references to running a Rust project with:

```bash
cargo run
```

We'll use that very simple command to run the code in our `main()` function. Other examples found in the NEAR codebase may not have a `main()` function. Instead, those smart contracts utilize unit tests to ensure everything is functioning as expected. We'll go over unit tests later in this tutorial, as they appear at the end of the `main.rs` file.

Go ahead and run `cargo run` in your Terminal application. The output will look something like this:

![Command line running a smart contract that counts](/docs/assets/entry-point.gif)

Below are some snippets from the `main.rs` file:

```rust
fn main() {
    // initialize a mock counter that starts at zero
    let mut _mock_counter = Counter{ val: 0 };
    …
}

#[near_bindgen]
#[derive(Default, BorshDeserialize, BorshSerialize)]
#[derive(Serialize, Deserialize)]
pub struct Counter {
    val: i8, // i8 is signed. unsigned integers are also available: u8, u16, u32, u64, u128
}

#[near_bindgen]
impl Counter {    
  … 
```

The first line in `main()` sets a mutable variable to an instance of our `Counter` struct. When writing smart contracts, the pattern is to have a `struct` with an associated `impl` where we write the core logic into functions. It's actually common in Rust to have this pattern elsewhere.

<blockquote class="info">
  "…most functions will end up being inside impl blocks…"
  <a href="https://doc.rust-lang.org/std/keyword.fn.html" target="_blank">- Rust docs</a>
</blockquote>

```rust
let mut quit = false;
    while !quit {
        println!("Please type 'increment' (i), 'decrement' (d), or 'get_num' (get) to call those functions.");
        // clear old value and read the standard input from user
        input.clear();
        io::stdin().read_line(&mut input).expect("Failed to read input.");
        // trim the response as it includes a newline character
        match input.trim() {
            "increment" | "i" => {
                // increment counter, specifying local development
                _mock_counter.increment(Some("local".to_string()));
            },
            …
    }
    …
```

The rest of the `main()` function sets up a simple loop asking for user input. This allows us to call the functions that will be used in the blockchain without having to compile, deploy, and then invoke them.

The comments explain most of the functionality, but one particular line stands out:

```rust
_mock_counter.increment(Some("local".to_string()));
```

At first glance, `Some` can be confusing. Let's look at the implementation of `increment`, the function it's calling:

```rust
pub fn increment(&mut self, debug_print: Option<String>) {
  …
}
```

The function `increment` takes a parameter of type `Option`. One of the explicit uses of `Option` in their docs is for ["Optional function arguments"](https://doc.rust-lang.org/std/option/) which we're doing here. 

From the linked documentation, *"…every Option is either Some and contains a value, or None, and does not."* So we're calling a function that has an argument of type `Option` and giving it an explicit value of the string "local".

When we eventually compile and deploy this smart contract to NEAR, the `increment()` function will get called with no arguments. While we're developing locally, we specify this argument so that it prints debugging information to our command line.

<blockquote class="lesson">
<p>Notice the naming convention of variables here. There's a lot of <code>snake_case</code> and variables prefixed with an underscore. Upon building a project, Rust informs you if naming conventions are off. It's actually quite easy to write proper Rust code using the compiler's suggestions.</p>
</blockquote>

### Our core logic: the `struct`

We declare our `Counter` and `impl`, defining the functions we'll be invoking on the blockchain.

Above the definitions we see attributes specific to NEAR:

```rust
#[near_bindgen]
#[derive(Default, BorshDeserialize, BorshSerialize)]
#[derive(Serialize, Deserialize)]
```

These essentially allow the compilation into WebAssembly to be compatible and optimized for the NEAR blockchain.

```rust
pub fn increment(&mut self, debug_print: Option<String>) {
  …
  match debug_print {
      Some(env_type) => {
          if env_type == "local" {
              println!("{}", _log_message);
          }
      },
      None => {
          env::log(_log_message.as_bytes());
          after_counter_change();
      }
  }
  …
}      
```

The `increment` function uses a `match`, similar to a `switch` statement. This type of pattern matching is a common control flow mechanism, and mentioned as early as [Chapter 2](https://doc.rust-lang.org/1.30.0/book/2018-edition/ch02-00-guessing-game-tutorial.html) on in the official Rust online book.

Under the `None` block we use the context `env` to write logs, as mentioned earlier.

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

and continue until the end of the `main.rs` file. The code here is fairly boilerplate, especially the `VMContext` object that's instantiated. The custom unit test code comes into play here:

```rust
let mut contract = Counter{ val: 0 };
contract.increment(None);
// confirm that we received 1 when calling get_num
assert_eq!(1, contract.get_num());
```

**Note**: for testing purposes, we need to explicitly call our functions with `None` but that is not necessary when we invoke it from the blockchain.

You may add as many tests as you need following the pattern in this file. Similar to unit tests in other languages and frameworks, just add the attribute:

`#[test]`

above the block of code to have it run in the suite of tests.

</hr>

## Finally: test, compile, and deploy 🚀

We're going to need two things to deploy this contract.

1. a NEAR account, [created with Wallet](https://wallet.nearprotocol.com/create)
2. `near-shell` installed [according to these instructions](/docs/development/near-clitool)

Please use the links above if you haven't already, as we'll need those for deploying the smart contract.

### Test the code

```rust
cargo test --package rust-counter -- --nocapture
```

### Compile the code

```rust
RUSTFLAGS='-C link-arg=-s' cargo build --target wasm32-unknown-unknown --release
```

The above command is essentially setting special flags and optimizing the resulting `.wasm` file. At the end of the day it's simply a customized `cargo build --release` command that should look familiar [from Chapter 1](https://doc.rust-lang.org/1.30.0/book/2018-edition/ch01-03-hello-cargo.html).

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
│  └── main.rs
└── target      ⟵ created during build, holds the compiled wasm
```

Now that we have the `neardev` folder with our keys, we can deploy the compiled contract to NEAR.

In the following steps, please replace `YOUR_ACCOUNT_HERE` with the name of the account created in the NEAR Wallet.

### Deploying

```rust
near deploy --wasmFile target/wasm32-unknown-unknown/release/rust_counter.wasm --accountId YOUR_ACCOUNT_HERE
```

### Invoking

We'll use `near-shell` to invoke methods on our smart contract.

Increment:
```bash
near call YOUR_ACCOUNT_HERE increment --accountId YOUR_ACCOUNT_HERE
```

Decrement:
```bash
near call YOUR_ACCOUNT_HERE decrement --accountId YOUR_ACCOUNT_HERE
```

Check counter:
```bash
near view YOUR_ACCOUNT_HERE get_num --accountId YOUR_ACCOUNT_HERE
```

The smart contract is alive in the blockchain!

This example is as bare bones as it gets, but illustrates all the moving parts associated with writing a smart contract with Rust. Admittedly, it's a poor example when it comes to creating anything user-facing.

Now that we're familiar with the build process, a natural next step might be to check out `create-near-app`. This project includes another Rust smart contract but has an interface. With `create-near-app` many of the steps we performed on the command line are wrapped neatly into build scripts.

[Read more](https://github.com/nearprotocol/create-near-app/) about `create-near-app` or try it out now by running:

```bash
npx create-near-app --rust new-awesome-app
``` 