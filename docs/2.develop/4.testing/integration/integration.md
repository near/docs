---
id: integration_test
title: Integration Test
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Main from "./example/main.test.md";
import Methods from "./example/methods.md";
import Blockchain from "./example/blockchain.md";

## Integration Testing
Once you finished testing units of code, you will want to test the smart contract as a whole. Integration tests consist of deploying your contract in the NEAR `testnet`, and creating test-users to interact with it. These kind of tests are suitable for checking your contract in a realistic environment, during the common usage users will make.

Integration tests are written in javascript, and are executed using [jest](https://jestjs.io/). To fast-forward the setting up of unit testing, we recommend you to simply use one of our [Examples](https://near.dev) as template, or to copy their configuration.

---

## WIP! Snippet: Testing a Deployed Counter WIP!
The code bellows connect to a deployed version of the [counter](broken) contract, and start executing functions.

<Tabs className="file-tabs">
  <TabItem value="main" label="main.test.js">
    <Main></Main>
  </TabItem>
  <TabItem value="methods" label="methods.js">
    <Methods></Methods>
  </TabItem>
  <TabItem value="blockchain" label="blockchain.js">
    <Blockchain></Blockchain>
  </TabItem>
</Tabs>

---

## Anatomy of Integration Testing

The example above is divided in three important parts:

1. Code related to communicating with the blockchain
2. Code related to communicating with the smart contract
3. Tests, in which users are created and interact with the contract

### Blockchain.js 
Here we talk about `getConfig` and `nearInit`.

### Methods.js
Here we talk about the `Contract` object, and the front-end method's implementation.

### Main.test.js
Here we talk about the test themselves.

---

## Limitations
Integration tests are usefull to check your contract in a realistic environment. However, they are not great to test edge cases, for example, a cross-contract call failing, or the price of gas changing over time. For such these cases it is necessary to **complement** unit and integration tests with [sandbox testing](../simulation/simulation.md).

### &nbsp;
---
## 🎞️📚 Aditional Resources
These educational resources could help you to better understand the subject
### Videos

### Blog Posts

### Code