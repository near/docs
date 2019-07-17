---
description: How to build a very simple smart contract
---

# Hello World

## Intro

Let's get started with a simple "Hello World" on the blockchain! This covers the most basic contract that you can write which is generated as a template when you select "Hello World Example" [here](https://studio.nearprotocol.com/). 

There is a deep dive of the file structure that covers this same code that you can see in the Quick Start [here](https://docs.nearprotocol.com/quick-start/file-structure).

## To Explore

* `assembly/main.ts` for the contract code
* `assembly/model.ts` for a simple model we'll import into the contract
* `src/index.html` for the front-end HTML
* `src/main.js` for the JavaScript front-end code and how to integrate contracts
* `src/test.js` for the JS tests for the contract

## Walkthrough

This is the simplest way to get started with writing code on blockchain with NEAR.

Our backend code will reside in `assembly/main.ts`

We will create and export a function:

```typescript
import "allocator/arena";
export { memory };
import { context, storage, near } from "./near";

// This is not necessary but demonstrates how you can import models
import { Greeter } from "./model.near";

// To be able to call this function in the contract we need to export it
// using `export` keyword.
export function hello(): string {
  let greeter = new Greeter("Hello");
  return greeter.greet("world");
}
```

To demonstrate. Checkout `src/tests.js`. These run on the frontend, but test our backend.

```javascript
describe("Greeter", function() {
    let near;
    let contract;
    let accountId;

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

    // Common setup below
    beforeAll(async function() {
      if (window.testSettings === undefined) {
        window.testSettings = {};
      }
      near = await nearlib.dev.connect(testSettings);
      accountId = testSettings.accountId ? testSettings.accountId : nearlib.dev.myAccountId;
      const contractName = testSettings.contractName ?
        testSettings.contractName :
        (new URL(window.location.href)).searchParams.get("contractName");
      contract = await near.loadContract(contractName, {
        // NOTE: This configuration only needed while NEAR is still in development
        // View methods are read only. They don't modify the state, but usually return some value.
        viewMethods: ["hello"],
        // Change methods can modify the state. But you don't receive the returned value when called.
        changeMethods: [],
        sender: accountId
      });
    });

    // Multiple tests can be described below. Search Jasmine JS for documentation.
    describe("simple", function() {
      beforeAll(async function() {
        // There can be some common setup for each test.
      });

      it("get hello message", async function() {
        const result = await contract.hello();
        expect(result).toBe("Hello, world");
      });
  });
});
```

We'll put some frontend code together now. This resides in `main.js`. Most of this is just to initialize the integration with the contract on the frontend.

```javascript
// Initializing contract
async function initContract() {
  // Initializing connection to the NEAR DevNet.
  window.near = await nearlib.dev.connect(nearConfig);

  // Initializing our contract APIs by contract name and configuration.
  window.contract = await near.loadContract(nearConfig.contractName, {
    // NOTE: This configuration only needed while NEAR is still in development
    // View methods are read only. They don't modify the state, but usually return some value.
    viewMethods: ["hello"],
    // Change methods can modify the state. But you don't receive the returned value when called.
    changeMethods: [],
    // Sender is the account ID to initialize transactions.
    // For devnet we create accounts on demand. See other examples on how to authorize accounts.
    sender: nearlib.dev.myAccountId
  });
}

// Using initialized contract
async function doWork() {
  // Calling method hello on the blockchain for our contract.
  // .hello() returns a promise which we awaiting.
  const message = await contract.hello();
  // Displaying the message once we have it.
  document.getElementById('contract-message').innerText = message;
}

// COMMON CODE BELOW:
// Loads nearlib and this contract into window scope.

window.nearInitPromise = initContract()
  .then(doWork)
  .catch(console.error);
```

Finally, we'll tie these together with a little html. You'll notice that we're pulling in the script tag for `nearlib.js` from a CDN and the code that we wrote from `main.js` at the bottom of the page.

```markup
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
</head>
<body style="background: #fff">
  <div class="container">
    Contract says:
    <h1 id="contract-message"></h1>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/nearlib@0.7.1/dist/nearlib.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>
  <script src="./config.js"></script>
  <script src="./main.js"></script>
</body>
</html>
```

Now we can run the project and see the `Hello, world` printed 

