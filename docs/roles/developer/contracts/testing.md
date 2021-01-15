---
id: test-contracts
title: Testing contracts
sidebar_label: Testing contracts
---

There are a couple of ways to test Rust smart contracts in NEAR.
- [Unit tests](#unit-tests)
- [Simulation tests](#simulation-tests)
- [End-to-end tests](#end-to-end-tests)

This document will cover the first two in detail, and link to various code examples to refer to. Keep in mind that there are some simple examples located at <a href="https://near.dev" target="_blank">our examples page</a> that implement these tests.

## Unit tests

<a href="https://en.wikipedia.org/wiki/Unit_testing" target="_blank">Unit tests</a> in Rust are quite an important part of the development lifecycle of smart contracts. Yes, they test individual parts of the source code to verify expected behavior, but they're also part of the iteration process.

Let's take a step back for a moment. Perhaps a developer has gone through the (amazing) <a href="https://doc.rust-lang.org/stable/book/" target="_blank">online Rust book</a> already. In the first chapter it introduces the command:

    cargo run
    
In the context of the Hello World app of that chapter, this makes sense. `cargo run` will hit the entry point `fn main()` and print "Hello, world!"

However, when writing smart contracts there is no entry point like this. In this sense, writing a smart contract in Rust is more similar to <a href="https://wasmbyexample.dev/examples/hello-world/hello-world.rust.en-us.html" target="_blank">writing a Javascript WebAssembly app</a>, where the primary Rust file is considered a library and is stored in `src/lib.rs` instead of `src/main.rs` like the book's Hello World example.

In the absence of `cargo run` and the entry point, unit tests may become the primary way to quickly check that your code is behaving properly. And while there is no `println!()` on the blockchain, the tests can freely use it for debugging purposes if desired.

This slide demonstrates a possible approach to a newcomer to Rust and smart contracts:

![Take an example, modify it, write tests, fix errors, iterate](/docs/assets/rust-testing-iterate.png)

Let's take a look at a sample of code that may appear in a simple Rust smart contract. (This code is taken from the <a href="https://github.com/near-examples/NFT/blob/4c55057523b2c5370fa3f23101e89927c35e0c18/contracts/rust/src/lib.rs#L179-L243" target="_blank">non-fungible token contract</a>.)

If all the code to the contract is contained in one file (`src/lib.rs`) this is typically found at the bottom of the file.
Below is somewhat boilerplate code that sets up the `VMContext` for a mock blockchain:

```rust
#[cfg(test)]
mod tests {
    use super::*;
    use near_sdk::MockedBlockchain;
    use near_sdk::{testing_env, VMContext};
    …
    fn get_context(predecessor_account_id: String, storage_usage: u64) -> VMContext {
        VMContext {
            current_account_id: "alice.testnet".to_string(),
            signer_account_id: "jane.testnet".to_string(),
            signer_account_pk: vec![0, 1, 2],
            predecessor_account_id,
            input: vec![],
            block_index: 0,
            block_timestamp: 0,
            account_balance: 0,
            account_locked_balance: 0,
            storage_usage,
            attached_deposit: 0,
            prepaid_gas: 10u64.pow(18),
            random_seed: vec![0, 1, 2],
            is_view: false,
            output_data_receivers: vec![],
            epoch_height: 19,
        }
    }

    // Tests
}
```

The important thing to remember is `VMContext` will be sending mock transactions with the context specified above. So if a unit test needs to send a test transaction coming from Alice, and then another from Bob, the `get_context` method may be called to change the `signer_account_id` or `predecessor_account_id`, or whatever the contract needs.

Following the `get_context` function are any number of tests. These use the `#[test]` macro above test functions. Unlike other testing frameworks, the function name can be anything and doesn't have to fit a pattern or naming convention.
In the above code block, there is a comment `// Tests` that will contain test code like this:

```rust
#[test]
fn grant_access() {
    let context = get_context(robert(), 0);                     ⟵ get our VMContext from earlier
    testing_env!(context);                                      ⟵ set the testing environment
    let mut contract = NonFungibleTokenBasic::new(robert());    ⟵ instantiate custom struct for this contract
    let length_before = contract.account_gives_access.len();    ⟵ use dot notation to access (public) member variables
    assert_eq!(0, length_before, "Expected empty access.");     ⟵ make an assertion, if it fails, provide custom message
    contract.grant_access(mike());                              ⟵ use dot notation to call (public) methods
    contract.grant_access(joe());
    let length_after = contract.account_gives_access.len();
    assert_eq!(1, length_after, "Expected an entry in the account's access Map.");
    let predecessor_hash = env::sha256(robert().as_bytes());
    let num_grantees = contract.account_gives_access.get(&predecessor_hash).unwrap();
    assert_eq!(2, num_grantees.len(), "Expected two accounts to have access to predecessor.");
}
```

Look for the `⟵` in the above code snippet to understand a typical pattern of writing unit tests. This will be quite different in simulation tests, which will be covered later in this document. In summary the pattern could be boiled down to:

1. Set up VMContext and testing environment
2. Instantiate the primary struct of the smart contract
3. Use dot notation to call methods and access member variables
4. Use assertions to ensure proper behavior

Let's add another test, but this time one that's expected to fail.

```rust
#[test]
#[should_panic(
    expected = r#"Access does not exist."#
)]
fn revoke_access_and_panic() {
    let context = get_context(robert(), 0);
    testing_env!(context);
    let mut contract = NonFungibleTokenBasic::new(robert());
    contract.revoke_access(joe());
}
```

**Note**: each unit test is indepedent of the test before it. If the previous tested added values to a Map, they will not persist on subsequent tests.

To run unit tests, simply run this command in the proper directory, typically containing your `Cargo.toml` file.

    cargo test -- --nocapture
    
The `--nocapture` flag will make sure that output from assertions and macros like `println!()` will be show in your terminal / command prompt. If you'd like to customize or limit which tests run, please see <a href="https://doc.rust-lang.org/cargo/commands/cargo-test.html" target="_blank">the documentation here</a>.

In summary, unit tests are a great way to make sure that the methods and data structures in your smart contract are working as intended.

## Simulation tests

Simulation tests are a great approach **in addition** to unit tests. A typical use case is testing cross-contract calls, as unit tests are unable to accomplish this.

Unlike unit tests, simulation tests do not use the Rust contract code when running. They will effectively deploy and send transactions using the compiled WebAssembly file. One common mistake when writing simulation tests is forgetting to build the contract(s) first. For this reason, a typical testing script will include a step to build before running.

**Note**: The <a href="https://github.com/near-examples/simulation-testing" target="_blank">simulation test example repository</a> has a lengthy README contain detail that will not be repeated in this document. Please follow the instructions there as it's evolving and a better source of truth.

Key points to keep in mind:

  - These tests should only utilize the compiled .wasm file(s) of the contract(s). We don't want to instantiate the `struct` or use dot notation like we did in unit tests.
  - There are some limitations to be aware of, but they're fairly obscure. Please see the README in the repo for more information.
  - It's possible to produce blocks and move forward in epochs. Please see the <a href="https://github.com/near/nearcore/blob/master/runtime/near-vm-runner-standalone" target="_blank">`near-vm-runner-standalone` code</a> as well as advanced usages of simulation tests in the <a href="https://github.com/near/core-contracts" target="_blank">core contracts repository</a>.

  ## End-to-end tests

This is where the rubber meets the road. End-to-end tests will help determine if the application is behaving as expected allowing us to see the entire flow of an app from start to finish. Unlike the previously mentioned tests, here we will use a live network (i.e. "testnet") (with actual tokens) to view (in real time) how our code behaves and any problems we may encounter. There many are testing applications that can accomplish this, but for our purposes we will focus on the [Jest testing suite](https://jestjs.io/).

Jest is a JavaScript testing framework that allows us to write and execute tests by writing simple JS functions. These tests have the following basic structure:

```js
import { add } from './utils'

    it('should add 1 & 5', () => {
        const addResult = add(1, 5)
        expect(addResult).toEqual(6);
    })
```
As you can see there are two main components.

  - import resources that we want to test or will need to compose a test
  - compose a test and define what we expect the results to be

**Note**: For more information on getting started, be sure to check out the [Jest Docs](https://jestjs.io/docs/en/getting-started).

If you are starting a new project using [create-near-app](https://github.com/near/create-near-app) Jest will be automatically installed as a development dependency and will be configured to run end-to-end tests. If you explore the `package.json` file you will see that the `"testEnvironment"` for Jest is set to `"near-cli/test_environment"`. In addition to this, there is a file `test.near.json` in the `neardev/shared-test` directory. This file contains an `account_id` as well as a `private_key` that is required for performing these tests.

Lets take a look at an example of end-to-end tests from the [NEAR Guest-Book](https://examples.near.org/guest-book) example. Here we have included two additional features to our tests.
  1) declaring mutable variables before a test that all subsequent tests have access to
  2) integrating the `beforeAll` function that will perform a series of routines before each and every test 
   
```js
import 'regenerator-runtime/runtime'

let near
let contract
let accountId

beforeAll(async function () {
  near = await nearlib.connect(nearConfig)
  accountId = nearConfig.contractName
  contract = await near.loadContract(nearConfig.contractName, {
    viewMethods: ['getMessages'],
    changeMethods: ['addMessage'],
    sender: accountId
  })
})

it('send one message and retrieve it', async () => {
  await contract.addMessage({ text: 'aloha' })
  const msgs = await contract.getMessages()
  const expectedMessagesResult = [{
    premium: false,
    sender: accountId,
    text: 'aloha'
  }]
  expect(msgs).toEqual(expectedMessagesResult)
})

it('send two more messages and expect three total', async () => {
  await contract.addMessage({ text: 'foo' })
  await contract.addMessage({ text: 'bar' })
  const msgs = await contract.getMessages()
  expect(msgs.length).toEqual(3)
})
```

These are two examples of complete end-to-end tests that:
  1) connect to a live NEAR blockchain network 
```js
near = await nearlib.connect(nearConfig)
``` 
  2) load a specific contract with the associated view and change methods
```js
contract = await near.loadContract(nearConfig.contractName, {
  viewMethods: ['getMessages'],
  changeMethods: ['addMessage'],
  sender: accountId
})
```
  3) call a method / function written in said contract
```js
 await contract.addMessage({ text: 'aloha' })
 ```
  4) request the results of our action 
```js
const msgs = await contract.getMessages()
```

These Jest integration tests can be run on both AssemblyScript and Rust contracts.

>Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol">
  <h8>Ask it on StackOverflow!</h8></a>
