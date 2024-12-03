---
id: xcc
title: Cross Contract Call
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from '@site/src/components/codetabs'
import MovingForwardSupportSection from '@site/src/components/MovingForwardSupportSection';

This example performs the simplest cross-contract call possible: it calls our [Hello NEAR](https://github.com/near-examples/hello-near-examples) example to set and retrieve a greeting.
It is one of the simplest examples on making a cross-contract call, and the perfect gateway to the world of interoperative contracts.

:::info Advanced Cross-Contract Calls
Check the tutorial on how to perform cross-contract calls [in batches and in parallel](./advanced-xcc)
:::

---

## Obtaining the Cross Contract Call Example

You have two options to start the project:

1. You can use the app through `Github Codespaces`, which will open a web-based interactive environment.
2. Clone the repository locally and use it from your computer.

| Codespaces                                                                                                                                      | Clone locally                                              |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| [![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/near-examples/cross-contract-calls?quickstart=1) | 🌐 `https://github.com/near-examples/cross-contract-calls` |

---

## Structure of the Example

The smart contract is available in two flavors: Rust and JavaScript

<Tabs groupId="code-tabs">

  <TabItem value="js" label="🌐 JavaScript">

```bash
┌── sandbox-ts # sandbox testing
│    ├── hello-near
│    │    └── hello-near.wasm
│    └── main.ava.ts
├── src # contract's code
│    └── contract.ts
├── package.json
├── README.md
└── tsconfig.json
```

  </TabItem>

  <TabItem value="rust" label="🦀 Rust">

```bash
┌── tests # sandbox testing
│    ├── hello-near
│    │    └── hello-near.wasm
│    └── tests.rs
├── src # contract's code
│    ├── external.rs
│    └── lib.rs
├── Cargo.toml # package manager
├── README.md
└── rust-toolchain.toml
```

  </TabItem>

</Tabs>

---

## Smart Contract

### Contract
The contract exposes methods to query the greeting and change it. These methods do nothing but calling `get_greeting` and
`set_greeting` in the `hello-near` example.

<CodeTabs>
<Language value="js" language="ts">
    <Github fname="contract.ts"
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-simple-ts/src/contract.ts"
            start="17" end="39" />
  </Language>
  <Language value="rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-simple-rs/src/lib.rs"
            start="22" end="51" />
            <Github fname="external.rs"
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-simple-rs/src/external.rs"
            start="2" end="12" />
  </Language>
</CodeTabs>

### Testing the Contract

The contract readily includes a set of unit and sandbox testing to validate its functionality. To execute the tests, run the following commands:

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 JavaScript">

  ```bash
  cd contract-simple-ts
  yarn
  yarn test
  ```

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

  ```bash
  cd contract-simple-rs
  cargo test
  ```
  </TabItem>

</Tabs>

:::tip
The `integration tests` use a sandbox to create NEAR users and simulate interactions with the contract.
:::

In this project in particular, the integration tests first deploy the `hello-near` contract. Then,
they test that the cross-contract call correctly sets and retrieves the message. You will find the integration tests
in `sandbox-ts/` for the JavaScript version and in `tests/` for the Rust version.

<CodeTabs>
  <Language value="js" language="js">
    <Github fname="main.ava.ts"
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-simple-ts/sandbox-ts/main.ava.ts"
            start="8" end="52" />
  </Language>
  <Language value="rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-simple-rs/tests/tests.rs"
            start="4" end="77" />
  </Language>
</CodeTabs>


<hr class="subsection" />

### Deploying the Contract to the NEAR network

In order to deploy the contract you will need to create a NEAR account.

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  # Create a new account pre-funded by a faucet
  near create-account <accountId> --useFaucet
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  # Create a new account pre-funded by a faucet
  near account create-account sponsor-by-faucet-service <my-new-dev-account>.testnet autogenerate-new-keypair save-to-keychain network-config testnet create
  ```
  </TabItem>
</Tabs>

Go into the directory containing the smart contract (`cd contract-advanced-ts` or `cd contract-advanced-rs`), build and deploy it:

```bash
cargo near build

cargo near deploy <accountId> with-init-call new json-args '{"hello_account":"hello.near-example.testnet"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' network-config testnet sign-with-keychain send
```

<hr class="subsection" />

### CLI: Interacting with the Contract

To interact with the contract through the console, you can use the following commands:

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  # Get message from the hello-near contract
  # Replace <accountId> with your account ID
  near call <accountId> query_greeting --accountId <accountId>

  # Set a new message for the hello-near contract
  # Replace <accountId> with your account ID
  near call <accountId> change_greeting '{"new_greeting":"XCC Hi"}' --accountId <accountId>
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  # Get message from the hello-near contract
  # Replace <accountId> with your account ID
  near contract call-function as-transaction <accountId> query_greeting json-args '{}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' sign-as <accountId> network-config testnet sign-with-keychain send

  # Set a new message for the hello-near contract
  # Replace <accountId> with your account ID
  near contract call-function as-transaction <accountId> change_greeting json-args '{"new_greeting":"XCC Hi"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' sign-as <accountId> network-config testnet sign-with-keychain send
  ```
  </TabItem>
</Tabs>

---

## Moving Forward

A nice way to learn is by trying to expand a contract. Modify the cross contract example to use the [guest-book](guest-book.md)
contract!. In this way, you can try to make a cross-contract call that attaches money. Remember to correctly [handle the callback](/build/smart-contracts/anatomy/crosscontract#callback-function),
and to return the money to the user in case of error.

### Advanced Cross Contract Calls

Your contract can perform multiple cross-contract calls in simultaneous, creating promises that execute in parallel, or as a batch transaction. Check the [advanced cross contract calls
tutorial](./advanced-xcc) to learn more.

<MovingForwardSupportSection />

:::note Versioning for this article

At the time of this writing, this example works with the following versions:

- near-cli: `4.0.13`
- node: `18.19.1`
- rustc: `1.77.0`

:::
