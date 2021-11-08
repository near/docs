---
id: rust-tutorial
title: Rust Tutorial
sidebar_label: Rust Tutorial
---

What follows is a brief overview of how to invoke contracts from a client-side JavaScript context. `near-api-js` supports both client and server-side JavaScript.

**Wiring smart contract functions to the window**

You need to do two things in order to access your smart contract calls on the front-end.

1. Defining the methods you intend to call in your contract, and making sure they are public. \(You're probably good on this one\)
2. Declaring the methods that you want to call during the initialization of the contract on the front-end. \(You probably forgot this one.\)

```javascript
// Initializing our contract APIs by contract name and configuration.
window.contract = await near.loadContract(config.contractName, {
...
  // View methods are read only. They don't modify the state, but usually return some value.
  viewMethods: ["hello"],
  // Change methods can modify the state. But you don't receive the returned value when called.
  changeMethods: [],
...
});
```

**Calling smart contract functions**

When calling your functions on the front end, instead of calling:

```javascript
contract.someMethod("YOUR DATA");
```

You need to send the **object** with the variable name that's going to be used in the back-end, just like when calling a REST API.

```javascript
contract.someMethod({
  myData: "YOUR DATA",
});
```

If you're not passing the params as a JSON, you'll often see an error in the encoder that looks similar to this:

```ts
"ABORT: unexpected string field null : 'YOUR DATA'".
```

## Using near-api-js in Node.js

Here is some sample `Node.js` code you can try that interacts with the [simple counter](https://examples.near.org/rust-counter) contract.

In this example we will:

1. Import `near-api-js` into your project
2. Define the `signerAccountId` as an account that you own
3. Setup your `keyStore` by pointing to your `.near-credentials` directory usually found under `/home/username`
4. Connect to NEAR and interact with a smart contract by calling the `increment` method
5. Get the result of your interaction and send it to the console

```javascript
const nearAPI = require("near-api-js");

const signerAccountId = "YOUR_ACCOUNT.testnet";
const contractName = "dev-1598612260611-8955814";

const keyStore = new nearAPI.keyStores.UnencryptedFileSystemKeyStore(
  "/home/username/.near-credentials/"
);

async function main() {
  // Initializing connection to the NEAR node.
  const near = await nearAPI.connect({
    deps: {
      keyStore,
    },
    nodeUrl: "https://rpc.testnet.near.org",
    networkId: "default",
  });

  const account = await near.account(signerAccountId);

  const functionCallResponse = await account.functionCall(
    contractName,
    "increment",
    {}
  );

  const result =
    nearAPI.providers.getTransactionLastResult(functionCallResponse);
  console.log(result);
}

main();
```

For demonstration purposes you can also setup the `keyStore` in-memory. Note that this is an insecure way to pass private keys, so it is not recommended for your final development.

```javascript
const nearAPI = require("near-api-js");

const signerAccountId = "YOUR_ACCOUNT.testnet";
const signerPrivateKey = "enter-your-private-key-here";
const contractName = "dev-1598612260611-8955814";

const signerKeyPair = nearAPI.utils.KeyPair.fromString(signerPrivateKey);
const keyStore = new nearAPI.keyStores.InMemoryKeyStore();

keyStore.setKey("default", signerAccountId, signerKeyPair);

async function main() {
  // ... insert same code from previous snippet
}

main();
```

We can also call contract methods by using the `Contract` helper. To use this feature we will need to define what `viewMethods` as well as `changeMethods` we can call when we first create the `contract` variable.

You can try this out by amending the `main()` function above with the following code below. Note that this will replace the `functionCallResponse` and `result` variables we defined earlier.

```javascript
const contract = new nearAPI.Contract(account, contractName, {
  viewMethods: ["get_num"],
  changeMethods: ["increment", "decrement", "reset"],
});
const result = await contract.increment();
console.log(result);
```

<blockquote class="warning">
<strong>heads up</strong><br /><br />

If you are having issues signing your transactions / accessing your account, make sure you are signed into your account using [`near-cli`](/docs/tools/near-cli). Unless you created your account using `near-cli` you will need to login by typing the following in your terminal:

```bash
near login
```

This will re-direct you to the [NEAR Wallet](https://wallet.testnet.near.org/) and ask for access. When you grant access here, your account key pair will automatically be stored in to your `.near-credentials` directory.

If you do not have `near-cli` installed, please do so by following the steps in [this guide](/docs/tools/near-cli).

**Note:** The default network for `near-cli` is `testnet`. If you would like to change this to `mainnet` or `betanet`, please see [`near-cli` network selection](/docs/tools/near-cli#network-selection) for instructions.

</blockquote>

> Got a question?
> <a href="https://stackoverflow.com/questions/tagged/nearprotocol">
> <h8>Ask it on StackOverflow!</h8></a>
