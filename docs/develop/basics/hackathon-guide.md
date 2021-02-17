---
id: hackathon-startup-guide
title: Hackathon Startup Guide
sidebar_label: Hackathon Guide
---

Welcome to hacking on NEAR! We're glad you're here. Let's jump right in:

1) First things first... let's get you a NEAR [`testnet` account](https://wallet.testnet.near.org). If you have any issues, we've created [this easy guide](/docs/develop/basics/create-account) to help you out.

2) Now that you have an account, test out a simple `testnet` app and interact with the blockchain. Try [Berry Club](https://test.berryclub.io/) or [Guest Book](https://near-examples.github.io/guest-book/).

3) Look around in [NEAR Explorer](https://explorer.testnet.near.org). Here you can search for all transactions and blocks produced on NEAR. Try searching for the account you just created and see the transactions you've created with Berry Club or Guest Book. 

3) Now install [`near-cli`](/docs/tools/near-cli#setup). This is a command line interface that allows you to interact seamlessly with NEAR. [This page](/docs/tools/near-cli) has all of the `near-cli` commands with examples.

4) Try running your first command: [`near login`](/docs/tools/near-cli#near-login). This will redirect you to your NEAR Wallet and save your `testnet` account keys locally. _Look for them in a hidden file under your HOME folder (~/.near-credentials)_

5) Try `create-near-app`! Run `npx create-near-app your-awesome-project` in your terminal. _(Note: this requires [Node.js](https://nodejs.org/en/).)_ This is the easiest way to launch a fullstack app on the NEAR blockchain in under 5 minutes.

6) Head to [NEAR Examples](https://near.dev) and test out some example applications. You can clone and play around with the code or simply click on the Gitpod button to launch an online instance!

7) Ready to dive in?? Checkout some more boilerplate apps with accompanying video walkthroughs [ [here](https://github.com/near-apps/ ) ].

## Understanding Smart Contracts

Smart Contracts are the back-end of your application, which lives on the blockchain. The application still needs the same front-end stuff (HTML/CSS/JS) you're used to, but all of your data, or "state," will be stored _on-chain_.

- The Smart Contract runs code and stores data on the blockchain network.
- The front-end talks to the Smart Contract using an API (JSON RPC Interface).
- `near-api-js` is a JavaScript library we've created to interact with NEAR.
  
- We currently support developing smart contracts in
  - [Rust](https://www.rust-lang.org/)
  - [AssemblyScript](https://assemblyscript.org/introduction.html)


## Common questions and issues

### 1. Sending data to your contract from the front-end

Say you've got an Rust function defined in your contract that takes data:

```ts
pub fn some_method(&mut self, my_data: String) {
    [...]
}
```

When you call it in the front-end, you'd have trouble sending data, much like in the error below:

```ts
"ABORT: unexpected string field null : 'YOUR DATA'".
```

You can fix this issue in the front-end when you call contract. Because NEAR uses a JSON-RPC-API, all methods are called using _objects_. 

Instead of calling:

```javascript
contract.someMethod("BAD"); // WRONG WAY TO CALL METHOD!
```

You need to send the **object** with the variable name that's going to be used in the back-end, just like when you call a REST API.

```javascript
// RIGHT WAY TO CALL METHOD!
contract.someMethod({
    myData: "GOOD"
})
```

### 2. Where are my functions when I try to call them?!

You need to do two things in order to access your smart contract calls on the front-end.

1. Define the methods you intend to call in your contract, and make sure they are public. \(You're probably good on this one!\)
2. Declare the methods that you want to call during the initialization of the contract on the front-end. \(You probably forgot this one.\)

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

The call to `loadContract` is actually making an object with your functions that gets assigned to the `window.contract` variable, so that later, on you can call `window.contract.myFunction`. Note that `window` is always in scope, so you can just call `contract.myFunction`.

### 3. How do I save data to the blockchain?

Please see our [Data Storage / Collections](/docs/concepts/data-storage) for an in-depth look at ways you can store data on-chain.

The link above illustrates ways to store data using one of our two software development kits (SDKs):

* [`near-sdk-rs`](https://github.com/near/near-sdk-as) for [Rust](https://www.rust-lang.org/)
* [`near-sdk-as`](https://github.com/near/near-sdk-as) for [AssemblyScript](https://www.assemblyscript.org/)

> Running into trouble? Reach out on our [Discord channel](https://near.chat) and we'll help!
