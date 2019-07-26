---
description: How to build a very simple smart contract
---

# Hello World from scratch

## Description

The contract implements a single function to return "Hello, World!":

```typescript
export function hello(): string {
  return "Hello, World!";
}
```

## To Explore

* `assembly/main.ts` for the contract code
* `src/index.html` for the front-end HTML
* `src/main.js` for the JavaScript front-end code and how to integrate contracts

Check out our more [in-depth walkthrough of our file structure.](../quick-start/file-structure.md) 

## How to build from scratch

This is the simplest way to get started with writing code on blockchain with NEAR. The "hello world" template is created when you create a new project [locally](../quick-start/local-development.md). 

If you want to build this smart contract on Near Studio, follow the below instructions. You can use the Counter Smart Contract as the template to start with.

Our backend code will reside in `assembly/main.ts`

We will create and export a function:

```typescript
import { context, storage, near } from "./near";
// --- contract code goes below

// To be able to call this function in the contract we need to export it
// using `export` keyword.

export function hello(): string {
  return "Hello, World!";
}
```

We'll put some frontend code together now. This resides in `main.js`. Most of this is just to initialize the integration with the contract on the frontend.

```javascript
async function initContract() {
  // Initializing connection to the NEAR DevNet.

  window.near = await nearlib.connect(Object.assign({ deps: { keyStore: new nearlib.keyStores.BrowserLocalStorageKeyStore() } }, nearConfig));

  // Initializing our contract APIs by contract name and configuration.
  window.contract = await near.loadContract(nearConfig.contractName, {
    // NOTE: This configuration only needed while NEAR is still in development
    // View methods are read only. They don't modify the state, but usually return some value.
    viewMethods: ["hello"],
    // Change methods can modify the state. But you don't receive the returned value when called.
    changeMethods: [],
    // Sender is the account ID to initialize transactions.
    // For devnet we create accounts on demand. See other examples on how to authorize accounts.
    sender: nearConfig.contractName
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
  <script src="https://cdn.jsdelivr.net/npm/nearlib@0.10/dist/nearlib.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>
  <script src="./config.js"></script>
  <script src="./main.js"></script>
</body>
</html>
```

Now we can run the project and see the simple hello world!

