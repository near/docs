---
id: hackathon-startup-guide
title: Hackathon Startup Guide
sidebar_label: Hackathon Guide
---

1) First things first... lets get you a cool [`testnet` account](https://wallet.testnet.near.org). If you have any issues, we've created [this easy guide](/docs/develop/basics/create-account) to help you out.

2) Now that you have an account, test out a simple `testnet` app and interact with the blockchain. [Berry Club](https://test.berryclub.io/) or [Guest Book](https://near-examples.github.io/guest-book/)

3) Poke around in [NEAR Explorer](https://testnet.explorer.org). Here you can search for all transactions and blocks produced on NEAR. Try searching for the account you just created and see the transactions you've created with Berry Club or Guest Book. :)

3) Now install [`near-cli`](/docs/tools/near-cli#setup). This is a command line interface that allows you to instantly interact with NEAR. [This page](/docs/tools/near-cli) has all of the `near-cli` commands with examples.

4) Try running your first command: [`near login`](/docs/tools/near-cli#near-login). This will redirect you to NEAR Wallet and save your `testnet` account keys locally. _Look for them in a hidden file under your HOME folder (~/.near-credentials)_

5) Try `create-near-app`! run `npx create-near-app your-awesome-project` in your terminal. _(Requires [Node.js](https://nodejs.org/en/))_ This is the easiest way to launch a fullstack app on the blockchain in under 5 min.

6) After that head to [NEAR Examples](https://near.dev) and test out some example applications. You can clone and play around with the code or simply click on the Gitpod button to launch an online instance!

## Understanding Smart Contracts

Smart Contracts are the backend of your application which lives on the blockchain. The application still needs the same frontend stuff (HTML/CSS/JS) but all of your data/state will be stored "on chain". 

- The Smart Contract runs code and stores data on the blockchain network.
- The frontend talks to the Smart Contract using an API (JSON RPC Interface).
- `near-api-js` is a JavaScript library we've created to interact with NEAR.
  
- We currently support developing smart contracts in
  - [AssemblyScript](https://assemblyscript.org/introduction.html)
  - [Rust](https://www.rust-lang.org/).

## Common questions and issues

### 1. Sending data to your contract from the frontend

Say you've got an AssemblyScript function defined in your contract that takes data:

```ts
export function someMethod(myData:string):void {
    [...]
}
```

When you call it in the frontend, you're having issues sending data similar to the error below:

```ts
"ABORT: unexpected string field null : 'YOUR DATA'".
```

In the frontend you can fix this issue when you call contract. Because NEAR uses a JSON RPC API all methods are called using objects. 

Instead of calling:

```javascript
contract.someMethod("YOUR DATA"); // WRONG WAY TO CALL METHOD!
```

You need to send the **object** with the variable name that's going to be used in the backend, just like when calling a REST API.

```javascript
// RIGHT WAY TO CALL METHOD!
contract.someMethod({
    myData: "YOUR DATA"
})
```

### 2. Where are my functions when I try to call them?!

You need to do two things in order to access your smart contract calls on the frontend.

1. Defining the methods you intend to call in your contract, and making sure they are public. \(You're probably good on this one\)
2. Declaring the methods that you want to call during the initialization of the contract on the frontend. \(You probably forgot this one.\)

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

The call to `loadContract` is actually making an object with your functions that gets assigned to the `window.contract` variable so later on you can call `window.contract.myFunction`. Note that `window` is always in scope so you can just call `contract.myFunction`.

### 3. How do I save data to the blockchain?

Please see our [Data Storage / Collections](/docs/concepts/data-storage) for an in-depth look at ways you can store data onchain.

The link above illustrates ways to store data using one of our two software development kits:

* [`near-sdk-as`](https://github.com/near/near-sdk-as) for [AssemblyScript](https://www.assemblyscript.org/)
* [`near-sdk-rs`](https://github.com/near/near-sdk-as) for [Rust](https://www.rust-lang.org/)

> Have any issues? Checkout our [Discord channel](https://near.chat) :)
