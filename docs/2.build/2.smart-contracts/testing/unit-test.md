---
id: unit-test
title: Unit Testing
#sidebar_label: 🧫 Unit Testing
---
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

Unit tests allow you to test the contract methods individually. They are suitable to check the storage is updated correctly, and that methods return their expected values. They are written in the contract's language and execute locally.

If you used one of our [examples](https://github.com/near-examples/docs-examples) as template, then you simply need to navigate to the contract's folder, and use `yarn test`. In case you didn't, then we recommend you copy the necessary node files (e.g. `package.json`) from one of our templates.

:::tip
You can run `yarn test` from the root folder of each project to run both unit and [integration](integration-test.md) tests.
:::

---

## Snippet I: Testing a Counter

The tests in the [Counter Example](https://github.com/near-examples/counters) rely on basic functions to check that the `increment`, `decrement`, and `reset` methods work properly.

<CodeTabs>
  <Language value="rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/counters/blob/main/contract-rs/src/lib.rs"
            start="47" end="68" />
    <Github fname="Cargo.toml"
            url="https://github.com/near-examples/counters/blob/main/contract-rs/Cargo.toml"
            start="18" end="19" />
  </Language>
</CodeTabs>

---

## Snippet II: Modifying the Context

While doing unit testing you can modify the [Environment variables](../anatomy/environment.md) through the `VMContextBuilder`. This will enable you to, for example, simulate calls from different users, with specific attached deposit and GAS. Here we present a snippet on how we test the `donate` method from our [Donation Example](https://github.com/near-examples/donation-examples) by manipulating the `predecessor` and `attached_deposit`.

<CodeTabs>
  <Language value="rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/donation-examples/blob/main/contract-rs/src/lib.rs"
            start="58" end="105" />
    <Github fname="Cargo.toml"
            url="https://github.com/near-examples/donation-examples/blob/main/contract-rs/Cargo.toml"
            start="18" end="19" />
  </Language>
</CodeTabs>

---

## ⚠️ Limitations

Unit tests are useful to check for code integrity, and detect basic errors on isolated methods. However, since unit tests do not run on a blockchain, there are many things which they cannot detect. Unit tests are not suitable for:

- Testing [gas](../anatomy/environment.md) and [storage](../anatomy/storage.md) usage
- Testing [transfers](../anatomy/actions.md)
- Testing [cross-contract calls](../anatomy/crosscontract.md)
- Testing complex interactions, i.e. multiple users depositing money on the contract

For all these cases it is necessary to **complement** unit tests with [integration tests](integration-test.md).
