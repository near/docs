---
id: advanced-xcc
title: Complex Cross Contract Call
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

This example presents 3 instances of complex cross-contract calls. Particularly, it shows:

1. How to batch multiple function calls to a same contract.
2. How to call multiple contracts in parallel, each returning a different type.
3. Different ways of handling the responses in the callback.

:::info Simple Cross-Contract Calls

Check the tutorial on how to use [simple cross-contract calls](xcc.md)

:::

---

## Obtaining the Cross Contract Call Example

You have two options to start the Donation Example:

1. You can use the app through `Github Codespaces`, which will open a web-based interactive environment.
2. Clone the repository locally and use it from your computer.

| Codespaces                                                                                                                      | Clone locally                                               |
| ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| [![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/near-examples/cross-contract-calls?quickstart=1) | 🌐 `https://github.com/near-examples/cross-contract-calls` |

---

## Structure of the Example

The smart contract is available in two flavors: Rust and JavaScript

<Tabs groupId="code-tabs">

  <TabItem value="js" label="🌐 JavaScript">

```bash
┌── sandbox-ts # sandbox testing
│    ├── external-contracts
│    │    ├── counter.wasm
│    │    ├── guest-book.wasm
│    │    └── hello-near.wasm
│    └── main.ava.ts
├── src # contract's code
│    ├── internal
│    │    ├── batch_actions.ts
│    │    ├── constants.ts
│    │    ├── multiple_contracts.ts
│    │    ├── similar_contracts.ts
│    │    └── utils.ts
│    └── contract.ts
├── package.json
├── README.md
└── tsconfig.json
```

  </TabItem>

  <TabItem value="rust" label="🦀 Rust">

```bash
┌── tests # sandbox testing
│    ├── external-contracts
│    │    ├── counter.wasm
│    │    ├── guest-book.wasm
│    │    └── hello-near.wasm
│    └── main.ava.ts
├── src # contract's code
│    ├── batch_actions.rs
│    ├── lib.rs
│    ├── multiple_contracts.rs
│    └── similar_contracts.rs
├── Cargo.toml # package manager
├── README.md
└── rust-toolchain.toml
```

  </TabItem>

</Tabs>

---

## Smart Contract

### Batch Actions

You can aggregate multiple actions directed towards one same contract into a batched transaction.
Methods called this way are executed sequentially, with the added benefit that, if one fails then
they **all get reverted**.

<CodeTabs>
  <Language value="js" language="js">
    <Github fname="contract.ts"
          url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/contract.ts"
          start="38" end="41" />
    <Github fname="batch_actions.ts"
          url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/internal/batch_actions.ts"
          start="5" end="17" />
  </Language>
  <Language value="rust" language="rust">
    <Github fname="batch_actions.rs"
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-rs/src/batch_actions.rs"
            start="8" end="20" />
  </Language>
</CodeTabs>

#### Getting the Last Response

In this case, the callback has access to the value returned by the **last
action** from the chain.

<CodeTabs>
  <Language value="js" language="js">
    <Github fname="contract.ts"
      url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/contract.ts"
      start="43" end="46" />
    <Github fname="batch_actions.ts"
      url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/internal/batch_actions.ts"
      start="19" end="29" />
    <Github fname="utils.ts"
      url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/internal/utils.ts"
      start="3" end="20" />
  </Language>
  <Language value="rust" language="rust">
    <Github fname="batch_actions.rs"
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-rs/src/batch_actions.rs"
            start="22" end="35" />
  </Language>
</CodeTabs>

---

### Calling Multiple Contracts

A contract can call multiple other contracts. This creates multiple transactions that execute
all in parallel. If one of them fails the rest **ARE NOT REVERTED**.

<CodeTabs>
  <Language value="js" language="js">
    <Github fname="contract.ts"
      url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/contract.ts"
      start="48" end="51" />
    <Github fname="multiple_contracts.ts"
      url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/internal/multiple_contracts.ts"
      start="6" end="21" />
  </Language>
  <Language value="rust" language="rust">
    <Github fname="multiple_contracts.rs"
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-rs/src/multiple_contracts.rs"
            start="16" end="55" />
  </Language>
</CodeTabs>

#### Getting All Responses

In this case, the callback has access to an **array of responses**, which have either the
value returned by each call, or an error message.

<CodeTabs>
  <Language value="js" language="js">
    <Github fname="contract.ts"
      url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/contract.ts"
      start="53" end="58" />
    <Github fname="multiple_contracts.ts"
      url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/internal/multiple_contracts.ts"
      start="24" end="41" />
    <Github fname="utils.ts"
      url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/internal/utils.ts"
      start="3" end="20" />
  </Language>
  <Language value="rust" language="rust">
    <Github fname="multiple_contracts.rs"
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-rs/src/multiple_contracts.rs"
            start="58" end="92" />
  </Language>
</CodeTabs>

---

### Multiple Calls - Same Result Type

This example is a particular case of the previous one ([Calling Multiple Contracts](#2-calling-multiple-contracts)).
It simply showcases a different way to check the results by directly accessing the `promise_result` array.

In this case, we call multiple contracts that will return the same type:

<CodeTabs>
  <Language value="js" language="js">
    <Github fname="contract.ts"
      url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/contract.ts"
      start="65" end="70" />
    <Github fname="similar_contracts.ts"
      url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/internal/similar_contracts.ts"
      start="6" end="35" />
  </Language>
  <Language value="rust" language="rust">
    <Github fname="similar_contracts.rs"
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-rs/src/similar_contracts.rs"
            start="8" end="31" />
  </Language>
</CodeTabs>

#### Getting All Responses

In this case, the callback again has access to an **array of responses**, which we can iterate checking the
results.

<CodeTabs>
  <Language value="js" language="js">
    <Github fname="contract.ts"
      url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/contract.ts"
      start="62" end="65" />
    <Github fname="similar_contracts.ts"
      url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/internal/similar_contracts.ts"
      start="37" end="54" />
    <Github fname="utils.ts"
      url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/internal/utils.ts"
      start="3" end="20" />
  </Language>
  <Language value="rust" language="rust">
    <Github fname="similar_contracts.rs"
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-rs/src/similar_contracts.rs"
            start="32" end="57" />
  </Language>
</CodeTabs>

---

### Testing the Contract

The contract readily includes a set of unit and sandbox testing to validate its functionality. To execute the tests, run the following commands:

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 JavaScript">

```bash
cd contract-advanced-ts
yarn
yarn test
```

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">
  
  ```bash
  cd contract-advanced-rs
  cargo test
  ```

  </TabItem>

</Tabs>

:::tip
The `integration tests` use a sandbox to create NEAR users and simulate interactions with the contract.
:::

<hr class="subsection" />

### Deploying the Contract to the NEAR network

In order to deploy the contract you will need to create a NEAR account.

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 JavaScript">

```bash
# Optional - create an account
near create-account <accountId> --useFaucet

# Deploy the contract
cd contract-advanced-ts
yarn build
near deploy <accountId> ./build/cross_contract.wasm --initFunction init --initArgs '{"hello_account":"hello.near-example.testnet","guestbook_account":"guestbook_account.near-example.testnet","counter_account":"counter_account.near-example.testnet"}'
```

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

```bash
# Optional - create an account
near create-account <accountId> --useFaucet

# Deploy the contract
cd contract-advanced-rs
cargo near build

# During deploying pass {"hello_account":"hello.near-example.testnet","guestbook_account":"guestbook_account.near-example.testnet","counter_account":"counter_account.near-example.testnet"} as init arguments
cargo near deploy <accountId>
```

  </TabItem>
</Tabs>

<hr class="subsection" />

### CLI: Interacting with the Contract

To interact with the contract through the console, you can use the following commands:

```bash
# Execute contracts sequentially
# Replace <accountId> with your account ID
near call <accountId> batch_actions --accountId <accountId> --gas 300000000000000   

# Execute contracts in parallel
# Replace <accountId> with your account ID
near call <accountId>  multiple_contracts --accountId <accountId> --gas 300000000000000   

# Execute multiple instances of the same contract in parallel
# Replace <accountId> with your account ID
near call <accountId> similar_contracts --accountId <accountId> --gas 300000000000000   
```

:::info
If at some point you get an "Exceeded the prepaid gas" error, try to increase the gas amount used within the functions when calling other contracts
:::

:::note Versioning for this article

At the time of this writing, this example works with the following versions:

- near-cli: `4.0.13`
- node: `18.19.1`
- rustc: `1.77.0`

:::
