---
id: integration_test
title: Integration Test
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Main from "./simple-example/main.test.md";
import MainRs from "./complex-example/main.rs.md"
import MainCplx from "./complex-example/main.test.md";
import Methods from "./complex-example/methods.md";
import Blockchain from "./complex-example/blockchain.md";

Integration tests consist of deploying your contract in the NEAR `testnet`, and creating test-users to interact with it. These kind of tests are suitable for checking how your contract behaves in a realistic environment.

Integration tests are written in javascript and executed using [jest](https://jestjs.io/). Jest is readily configured in our [Examples](https://near.dev), for which we recommend you to use them as templates for testing.

---

## Snippet: Testing a Counter
Lets look at the integration test of our [counter](broken) example.

<Tabs className="file-tabs">
  <TabItem value="main" label="main.test.js">
    <Main></Main>
  </TabItem>
</Tabs>

*Find the code at this [link](broken)*


### Environmental Variables
You will notice in the code that the variables `nearlib` and `nearConfig` are never declared. This is because they are environmental variables setted up by jest.
- `nearlib` refers to the `near-api-js` library, which enables to interact with the NEAR network.
- `nearConfig` is an object with information such as the contract's address, and its keys


### Who is Calling the Contract?
In the code above we are executing methods in the contract, but, which user is calling them? The answer is in this piece of code:

```ts
const accountId = nearConfig.contractName
near.loadContract(nearConfig.contractName, { ..., sender: accountId });
```

So what is actually happening, is that we are asking the contract to interact with itself.

---
## Snippet II: Testing Donations
In the previous snippet we showcased a counter contract with simple methods. However, in most cases we will want to test complex methods, which involve money transfers and multiple users. Here we show a more complete scenario, in which we test a contract that handles donations.

<Tabs className="file-tabs">
  <TabItem value="main" label="🚀test/main.test.js">
    <MainCplx></MainCplx>
  </TabItem>
  <TabItem value="methods" label="🚀test/methods.js">
    <Methods></Methods>
  </TabItem>
  <TabItem value="blockchain" label="🚀test/blockchain.js">
    <Blockchain></Blockchain>
  </TabItem>
  <TabItem value="lib.rs" label="🦀contract/lib.rs">
    <MainRs></MainRs>
  </TabItem>
</Tabs>

*Find the code at this [link](broken)*

<hr class="subsection" />

### Anatomy of Donation Testing
The integration test from above is divided in three different files to simplify understanding it:

1. `methods.js`: functions to simplify talking with the smart contract
2. `main.test.js`: Tests, in which users are created and interact with the contract

#### blockchain.js
The file `blockchain.js` contains code to simplify using `near-api-js` to create users, connect to the contract, etc. Do not worry much about this file.

#### methods.js
When handling calls to smart contract you will find yourself translating NEARs to yoctoNEARs often, as well as parsing the results. To not overload the testing file with such boilerplates, we put them in a separated file.

#### main.test.js
This is the main test file, were we create 3 users (`alice`, `bob`, and `cloud`), and make them interact with the contract. You might notice that all accounts are created as sub-accounts of our contract. We do this to simplify the code, since we can leverage that `nearConfig` already has the keys of our contract.

---
## Executing Tests
If you used one of our examples as template, then you simply need to navigate to the project's root folder, and run `yarn jest`. Then, the testing will get in motion:

1. Your contract will be compiled into wasm
2. A random testnet account will be created and your contract deployed to it
3. [Jest](https://jestjs.io/) will start, setup the necessary environment variables, and run the tests. 

:::tip
Each time you execute `yarn test` a **new account** will be created and your contract **re-deployed**. This ensures that your tests are reproducible and always run on a clean slate.
:::

---

## ⚠️ Limitations
Integration tests are usefull to check your contract in a realistic environment. However, they are not great to test edge cases, for example, a cross-contract call failing, or the price of gas changing over time. For such these cases it is necessary to **complement** unit and integration tests with [sandbox testing](../simulation/simulation.md).

### &nbsp;
---
## 🎞️📚 Aditional Resources
These educational resources could help you to better understand the subject
### Videos

### Blog Posts

### Code