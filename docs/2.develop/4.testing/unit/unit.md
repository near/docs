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

Unit tests are written in the same language as your contract, and are executed localy through [AS-pect](https://tenner-joshua.gitbook.io/as-pect/) in 🚀-AS, and natively in 🦀-RUST.


## Snippet: Testing a Counter
<Tabs className="language-tabs">
  <TabItem value="as" label="🚀 - Assemblyscript">
    <Tabs className="file-tabs">
      <TabItem value="as-main" label="__tests__/main.spec.ts">
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

## Interacting with the Environment
When testing a method it is usually helpfull to manipulate the [Environment](../../3.contracts/environment/environment.md). In this way, you can test a method using different users (`predecessor`s), attached amounts (`attached_amount`), balances,etc.



In both AS and RUST, the Environment is manipulated throught an object from the SDK (`🚀-VMContext`, `🦀-VMContextBuilder`)


## Limitations
While usefull on testing single methods, unit tests are not great for testing [Gas](../../3.contracts/environment/environment.md) and [Storage](../../3.contracts/storage.md) usage or [Transfers](../../3.contracts/actions.md). Furthermore, they are not fully suitable for testing [cross-contract calls](../../3.contracts/crosscontract/crosscontract.md). For these we recommend using integration tests.