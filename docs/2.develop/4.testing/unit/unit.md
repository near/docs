---
id: unit_test
title: Unit Testing
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import MainAs from "./example/main.as.md";
import TestAs from "./example/test.as.md";
import MainRs from "./example/main.rs.md";

While developing your smart contract you will want to test that it works as it is supposed to, and moreover, it does in a safe way.
Unit tests allow you to test the contract methods individually. They are suitable to check if, given a specific input, a method
returns the expected value and changes the state accordingly.

Unit tests are written in the same language as your contract, and are executed localy through [AS-pect](https://tenner-joshua.gitbook.io/as-pect/) in Assemblyscript, and natively in RUST. To fast-forward the setting up of unit testing, we recommend you to simply use one of our [Examples](https://near.dev) as template, or to copy their configuration.

---

## Snippet: Testing a Counter
<Tabs className="language-tabs">
  <TabItem value="as" label="🚀 - Assemblyscript">
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

## Limitations
Unit tests are usefull to check for code integrity, and detect basic errors on isolated methods. However, since unit tests do not run on a blockchain, there are many things which they cannot detect. Unit tests are not suitable for:

- Testing [gas](../../3.contracts/environment/environment.md) and [storage](../../3.contracts/storage.md) usage
- Testing [transfers](../../3.contracts/actions.md)
- Testing [cross-contract calls](../../3.contracts/crosscontract/crosscontract.md)
- Testing complex interactions, i.e. multiple users depositing money on the contract

For all these cases it is necessary to **complement** unit tests with [integration tests](../integration/integration.md).

### &nbsp;
---
## 🎞️📚 Aditional Resources
These educational resources could help you to better understand the subject
### Videos

### Blog Posts

### Code