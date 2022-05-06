---
id: integration-test
title: Integration Test
sidebar_label: 🥼 Integration Test
---
import {CodeTabs, Language, Github} from "@site/components/codetabs"

:::caution
We are migrating our integration tests from using `jest` to `workspaces-rs` and `workspaces-ts`. This section will be updated very soon.
:::

Integration tests enable to automatically deploy your contract in the NEAR `testnet`, and create test-users to interact with it. These kind of tests are suitable for checking how your contract behaves in a realistic environment. Integration tests are written in javascript and executed using [jest](https://jestjs.io/).

If you used one of our [examples](https://github.com/near-examples/docs-examples) as template, then you simply need to run `yarn test` from the project's root folder. Then, the testing will get in motion:

1. Your contract will be compiled into wasm
2. A random testnet account will be created and your contract deployed to it
3. [Jest](https://jestjs.io/) will start, setup the necessary environment variables, and run the tests. 

:::tip
Each time you execute `yarn test` a **new account** will be created and your contract **re-deployed**. This ensures that your tests are reproducible and always run on a clean slate.
:::

---

## Snippet I: Testing Hello NEAR
Lets take a look at the integration test of our [Quickstart Project](../quickstart/hello-near.md) [👋 Hello NEAR](https://github.com/near-examples/hello-near-rs): 

<CodeTabs>
  <Language value="🌐 - Javascript" language="js">
    <Github fname="main.test.js"
            url="https://github.com/near-examples/hello-near-rs/blob/main/tests/main.test.js" />
  </Language>
</CodeTabs>

### Who is Calling the Contract?
In the code above we are executing methods in the contract, but, which user is calling them? The answer is in this piece of code:

<CodeTabs>
  <Language value="🌐 - Javascript" language="js">
    <Github fname="main.test.js"
            url="https://github.com/near-examples/hello-near-rs/blob/main/tests/main.test.js"
            start="9" end="14" />
  </Language>
</CodeTabs>

We are first creating the `Account` object using `nearConfig.contractName`, and then using that object to talk with the `Contract`. This means that, actually, we are using the contract's account to interact with itself!.


:::tip
You will notice in the code that the variables `nearlib` and `nearConfig` are never declared. This is because they are environmental variables set by jest.
- `nearlib` refers to the `near-api-js` library, which enables to interact with the NEAR network.
- `nearConfig` is an object with information such as the contract's address, and its keys
:::

---
## Snippet II: Testing Donations
In the previous snippet we showcased a counter contract with simple methods. However, in most cases we will want to test complex methods, which involve money transfers and multiple users. Lets take a look at how we test the `donation` method of our [Donation Example](../contracts/anatomy.md). In this method, we expect people to deposit money, and the money to be forwarded to the `beneficiary`.


<CodeTabs>
  <Language value="🌐 - Javascript" language="js">
    <Github fname="main.test.js"
            url="https://github.com/near-examples/docs-examples/blob/main/donation-rs/test/donation.test.js"
            start="18" end="48" />
    <Github fname="methods.js"
            url="https://github.com/near-examples/docs-examples/blob/main/donation-rs/test/methods.js"
            start="4" end="49" />
    <Github fname="near_wrapper.js"
            url="https://github.com/near-examples/docs-examples/blob/main/donation-rs/test/near_wrapper.js"
            start="1" end="78" />
  </Language>
</CodeTabs>

<hr class="subsection" />

### Anatomy of Donation Testing
The integration test from above is divided in three different files to simplify understanding it.

#### main.test.js
This is the main test file, were we create 3 users (`alice`, `bob`, and `cloud`), and make them interact with the contract. You might notice that all accounts are created as sub-accounts of our contract. We do this to simplify the code, since we can leverage that `nearConfig` already has the keys of our contract.
#### methods.js
When handling calls to smart contract you will find yourself translating NEARs to yoctoNEARs often, as well as parsing the results. To not overload the testing file with such boilerplate, we put them in a separated file.
#### near_wrapper.js
The file `near_wrapper.js` contains code to simplify using `near-api-js` to create users, connect to the contract, etc. Do not worry much about this file.

---

## ⚠️ Limitations
Integration tests are useful to check your contract in a realistic environment. However, they are not great to test edge cases, for example, a cross-contract call failing, or the price of gas changing over time. For such these cases it is necessary to **complement** unit and integration tests with sandbox testing (coming soon).