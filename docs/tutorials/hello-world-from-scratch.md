---
description: How to build a very simple smart contract
---

# HelloWorld example in AssemblyScript 

## Description

The contract implements a single function to return "Hello, World!":
```
export function hello(): string {
  return "Hello, World!";
}
```

## To Explore

- `assembly/main.ts` for the contract code
- `src/index.html` for the front-end HTML
- `src/main.js` for the JavaScript front-end code and how to integrate contracts
- `src/test.js` for the JS tests for the contract


## How to build from scratch

This is the simplest way to get started with writing code on blockchain with NEAR. 

Our backend code will reside in `assembly/main.ts`

We will create and export a function: 

<snippet id='hello-snippet'>
```TypeScript
// To be able to call this function in the contract we need to export it
// using `export` keyword. 

export function hello(): string {
  return "Hello, World!";
}
```
</snippet>

We need to write some tests. Checkout `src/tests.js`. These run on the frontend, but test our backend.

<snippet id='tests-snippet'>

```JavaScript
describe("Greeter", function() {
    let near;
    let contract;
    let alice;
    let bob = "bob.near";
    let eve = "eve.near";
  
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

    // Common setup below
    beforeAll(async function() {
      const config = await nearlib.dev.getConfig();
      near = await nearlib.dev.connect();
      alice = nearlib.dev.myAccountId;
      const url = new URL(window.location.href);
      config.contractName = url.searchParams.get("contractName");
      console.log("nearConfig", config);
      contract = await near.loadContract(config.contractName, {
        // NOTE: This configuration only needed while NEAR is still in development
        // View methods are read only. They don't modify the state, but usually return some value. 
        viewMethods: ["hello"],
        // Change methods can modify the state. But you don't receive the returned value when called.
        changeMethods: [],
        sender: alice
      });
    });

    // Multiple tests can be described below. Search Jasmine JS for documentation.
    describe("simple", function() {
      beforeAll(async function() {
        // There can be some common setup for each test.
      });
  
      it("get hello message", async function() {
        const result = await contract.hello();
        expect(result).toBe("Hello, World!");
      });
  });
});
```
</snippet>

We'll put some frontend code together now. This resides in `main.js`. Most of this is just to initialize the integration with the contract on the frontend.

<snippet id='frontend-snippet'>
```JavaScript
async function doInitContract() {
  // Getting config from cookies that are provided by the NEAR Studio.
  const config = await nearlib.dev.getConfig();
  console.log("nearConfig", config);
  
  // Initializing connection to the NEAR DevNet.
  window.near = await nearlib.dev.connect();
  
  // Initializing our contract APIs by contract name and configuration.
  window.contract = await near.loadContract(config.contractName, {
    // NOTE: This configuration only needed while NEAR is still in development
    // View methods are read only. They don't modify the state, but usually return some value. 
    viewMethods: ["hello"],
    // Change methods can modify the state. But you don't receive the returned value when called.
    changeMethods: [],
    // Sender is the account ID to initialize transactions.
    // For devnet we create accounts on demand. See other examples on how to authorize accounts.
    sender: nearlib.dev.myAccountId
  });

  // Once everything is ready, we can start using contract
  return doWork();
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

window.nearInitPromise = doInitContract().catch(console.error);
```
</snippet>

Finally, we'll tie these together with a little html. You'll notice that we're pulling in the script tag for `nearlib.js` from a CDN and the code that we wrote from `main.js` at the bottom of the page.

<snippet id='markup-snippet'>
```html
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
  <script src="https://cdn.jsdelivr.net/npm/nearlib@0.4.2/dist/nearlib.js"></script>
  <script src="./main.js"></script>
</body>
</html>
```
</snippet>

Now we can run the project and see the simple hello world!