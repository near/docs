---
id: unit_test
title: Unit Testing
sidebar_label: 🧫 Unit Testing
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import MainAs from "./example/main.as.md";
import TestAs from "./example/test.as.md";
import MainRs from "./example/main.rs.md";

Unit tests allow you to test the contract methods individually. They are suitable to check the storage is updated correctly, and that methods return their expected values.

Unit tests are written in the contract's language and execute locally. To fast-forward the setting up of unit testing, we recommend you to simply use one of our [Examples](https://near.dev) as template, or to copy their configuration.

---

## Snippet: Testing a Counter
<Tabs className="language-tabs">
  <TabItem value="as" label="🚀 - AssemblyScript">
    <Tabs className="file-tabs">
      <TabItem value="as-main" label="tests/main.test.js">
        <TestAs></TestAs>
      </TabItem>
      <TabItem value="as-external" label="main.ts">
        <MainAs></MainAs>
      </TabItem>
    </Tabs>
  </TabItem>
  <TabItem value="rs" label="🦀 - Rust">
    <Tabs className="file-tabs">
      <TabItem value="as-external" label="tests/main.ts">
        <ExternalRs></ExternalRs>
      </TabItem>
      <TabItem value="as-main" label="lib.rs">
        <MainRs></MainRs>
      </TabItem>
    </Tabs>
  </TabItem>
</Tabs>

---

## Executing Tests
If you used one of our examples as template, then you simply need to navigate to the contract's folder, and run `yarn test`. In case you didn't, then we recommend you copy the necessary node files (e.g. `package.json`) from one of our templates.

In the case of AssemblyScript, [AS-pect](https://tenner-joshua.gitbook.io/as-pect/) is already configured to start, look for `*.spec*` files and execute them. Please refer to the [AS-pect documentation](https://tenner-joshua.gitbook.io/as-pect/as-api/expectations) to see the methods available for testing. For RUST, the language has a built-in unit test system, please refer to [their documentation](https://doc.rust-lang.org/book/ch11-01-writing-tests.html) to understand its fully potential.

---

## ⚠️ Limitations
Unit tests are useful to check for code integrity, and detect basic errors on isolated methods. However, since unit tests do not run on a blockchain, there are many things which they cannot detect. Unit tests are not suitable for:

- Testing [gas](../../3.contracts/environment/environment.md) and [storage](../../3.contracts/storage.md) usage
- Testing [transfers](../../3.contracts/actions.md)
- Testing [cross-contract calls](../../3.contracts/crosscontract/crosscontract.md)
- Testing complex interactions, i.e. multiple users depositing money on the contract

For all these cases it is necessary to **complement** unit tests with [integration tests](../integration/integration.md).

### &nbsp;
---
## 🎞️📚 Additional Resources
These educational resources could help you to better understand the subject
### Videos

### Blog Posts

### Code