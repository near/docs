---
id: calling-smart-contracts
title: JavaScript
sidebar_label: JavaScript
---

For guided walkthroughs and details of `near-api-js` see
- [JavaScript library Guides](/docs/roles/developer/examples/near-api-js/guides)
- [JavaScript library Examples](/docs/roles/developer/examples/near-api-js/examples)

What follows is a brief overview of how to invoke contracts from a client-side JavaScript context.  `near-api-js` supports both client and server-side JavaScript.

**Wiring smart contract functions to the window**

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

**Calling smart contract functions**

When calling your functions on the front end, instead of calling:

```javascript
contract.someMethod("YOUR DATA");
```

You need to send the **object** with the variable name that's going to be used in the backend, just like when calling a REST API.

```javascript
contract.someMethod({
    myData: "YOUR DATA"
})
```

If you're not passing the params as a JSON, you'll often see an error in the encoder that looks similar to this:

```ts
"ABORT: unexpected string field null : 'YOUR DATA'".
```
