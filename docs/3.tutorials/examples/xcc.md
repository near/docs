---
id: xcc
title: Cross Contract Call
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

This example performs the simplest cross-contract call possible: it calls our [Hello NEAR](hello-near.md) example to set and retrieve a greeting.
It is one of the simplest examples on making a cross-contract call, and the perfect gateway to the world of interoperative contracts.

:::info Advanced Cross-Contract Calls
Check the tutorial on how to perform cross-contract calls [in batches and in parallel](./advanced-xcc)
:::

---

## Starting with the Project
You have two options to start using the project. The first and recommended is to use the app through Gitpod, which will open a web-based interactive environment. The second option is to clone the repository locally, for which you will need to install all the [Prerequisites](../../2.develop/prerequisites.md).


<Tabs className="language-tabs" groupId="code-tabs">

  <TabItem value="🌐 JavaScript"> 

  | Gitpod                                                                                                                                                                                           | Clone locally                                                                 |
  | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
  | <a href="https://gitpod.io/#https://github.com/near-examples/cross-contract-calls/tree/main/contract-simple-ts"><img src="https://gitpod.io/button/open-in-gitpod.svg" alt="Open in Gitpod" /></a> | 🌐 `https://github.com/near-examples/cross-contract-calls.git` |

  </TabItem>

  <TabItem value="🦀 Rust">

  | Gitpod                                                                                                                                                                                           | Clone locally                                                                 |
  | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
  | <a href="https://gitpod.io/#https://github.com/near-examples/cross-contract-calls/tree/main/contract-simple-rs"><img src="https://gitpod.io/button/open-in-gitpod.svg" alt="Open in Gitpod" /></a> | 🦀 `https://github.com/near-examples/cross-contract-calls.git` |

  </TabItem>
</Tabs>


---

### Interacting With the Contract
Since this example does not have a frontend, we will interact with it through the [NEAR CLI](../../4.tools/cli.md).

<!-- Expand on this explanation adding snippets  -->
Check the README.md. Briefly, you will need to:

#### 1. Create a new account

In order to deploy the contract you will need to [create a NEAR account](https://docs.near.org/develop/contracts/quickstart#create-a-testnet-account).

```bash
# Create an account
near create-account <accountId> --useFaucet
```

#### 2. Build and Deploy the Contract
You can automatically compile and deploy the contract in the NEAR testnet by running:

```bash
# Build the contract
cargo near build

# Deploy the contract
cargo near deploy <accountId>
```

#### 2. Get the Greeting

`query_greeting` performs a cross-contract call, calling the `get_greeting()` method from `hello-nearverse.testnet`.

`Call` methods can only be invoked using a NEAR account, since the account needs to pay GAS for the transaction.

```bash
# Use near-cli to ask the contract to query the greeting
near call <accountId> query_greeting --accountId <accountId>
```

---

### Contract
The contract exposes methods to query the greeting and change it. These methods do nothing but calling `get_greeting` and
`set_greeting` in the `hello-near` example.

<CodeTabs>
<Language value="🌐 JavaScript" language="ts">
    <Github fname="contract.ts" 
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-simple-ts/src/contract.ts"
            start="17" end="39" />
  </Language>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-simple-rs/src/lib.rs"
            start="24" end="49" />
  </Language>
</CodeTabs>

---

## Testing

When writing smart contracts it is very important to test all methods exhaustively. In this
project you have two types of tests: unit and integration. Before digging in them,
go ahead and perform the tests present in the dApp through the command `yarn test`.

### Unit test

Unit tests check individual functions in the smart contract. They are written in the
same language as the smart contract is. 

Since this example handles Cross-contract calls, in the unit tests we only test the `initialize`
method works. This is because unit tests are **cannot test** cross-contract calls.

### Integration test

In this project in particular, the integration tests first deploy the `hello-near` contract. Then,
they test that the cross-contract call correctly sets and retrieves the message. You will find the integration tests
in `sandbox-ts/` for the JavaScript version and in `tests/` for the Rust version.

<CodeTabs>
  <Language value="🌐 JavaScript" language="rust">
    <Github fname="main.ava.ts"
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-simple-ts/sandbox-ts/src/main.ava.ts"
            start="9" end="59" />
  </Language>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-simple-rs/tests/tests.rs"
            start="5" end="77" />
  </Language>
</CodeTabs>

---

## Moving Forward

A nice way to learn is by trying to expand a contract. Modify the cross contract example to use the [guest-book](guest-book.md)
contract!. In this way, you can try to make a cross-contract call that attaches money. Remember to correctly [handle the callback](../../2.develop/contracts/crosscontract.md#callback-method),
and to return the money to the user in case of error.

### Advanced Cross Contract Calls
Your contract can perform multiple cross-contract calls in simultaneous, creating promises that execute in parallel, or as a batch transaction. Check the [advanced cross contract calls
tutorial](./advanced-xcc) to learn more.
