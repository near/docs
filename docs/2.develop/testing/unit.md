---
id: unit-test
title: Unit Testing
#sidebar_label: 🧫 Unit Testing
---
import {CodeTabs, Language, Github} from "@site/components/codetabs"


Unit tests allow you to test the contract methods individually. They are suitable to check the storage is updated correctly, and that methods return their expected values. They are written in the contract's language and execute locally.

If you used one of our [examples](https://github.com/near-examples/docs-examples) as template, then you simply need to navigate to the contract's folder, and use `yarn test`. In case you didn't, then we recommend you copy the necessary node files (e.g. `package.json`) from one of our templates.

<!--  Move this to AS sdk: In the case of AssemblyScript, [AS-pect](https://tenner-joshua.gitbook.io/as-pect/) is already configured to start, look for `*.spec*` files and execute them. Please refer to the [AS-pect documentation](https://tenner-joshua.gitbook.io/as-pect/as-api/expectations) to see the methods available for testing. For Rust, the language has a built-in unit test system, please refer to [their documentation](https://doc.rust-lang.org/book/ch11-01-writing-tests.html) to understand its fully potential. -->

:::tip
You can run `yarn test` from the root folder of each project to run both unit and [integration](integration.md) tests.
:::

---

## Snippet I: Testing a Counter
The tests in the [Counter Example](../quickstart.md) rely on basic functions to check that the `increment`, `decrement`, and `reset` methods work properly.

<CodeTabs>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/rust-counter/blob/master/contract/src/lib.rs"
            start="52" end="87" />
  </Language>
  <Language value="🚀 AssemblyScript" language="ts">
    <Github fname="main.spec.ts"
            url="https://github.com/near-examples/counter/blob/master/contract/assembly/__tests__/main.spec.ts"
            start="5" end="44" />
  </Language>
</CodeTabs>

---

## Snippet II: Modifying the Context
While doing unit testing you can modify the [Environment variables](../contracts/environment/environment.md) through the `VMContextBuilder`. This will enable you to, for example, simulate calls from different users, with specific attached deposit and GAS. Here we present a snippet on how we test the `donate` method from our [Donation Example](../contracts/anatomy.md) by manipulating the `predecessor` and `attached_deposit`.

<CodeTabs>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/docs-examples/blob/main/donation-rs/contract/src/lib.rs"
            start="72" end="106" />
  </Language>
  <Language value="🚀 AssemblyScript" language="ts">
    <Github fname="main.spec.ts"
            url="https://github.com/near-examples/docs-examples/blob/main/donation-as/contract/assembly/__tests__/donation.spec.ts"
            start="23" end="56" />
  </Language>
</CodeTabs>


---

## ⚠️ Limitations
Unit tests are useful to check for code integrity, and detect basic errors on isolated methods. However, since unit tests do not run on a blockchain, there are many things which they cannot detect. Unit tests are not suitable for:

- Testing [gas](../contracts/environment/environment.md) and [storage](../contracts/storage.md) usage
- Testing [transfers](../contracts/actions.md)
- Testing [cross-contract calls](../contracts/crosscontract.md)
- Testing complex interactions, i.e. multiple users depositing money on the contract

For all these cases it is necessary to **complement** unit tests with [integration tests](integration.md).