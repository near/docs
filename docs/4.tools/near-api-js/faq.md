---
id: faq
title: FAQ for NEAR JavaScript API
sidebar_label: FAQ
---

A collection of Frequently Asked Questions by the community.


## General {#general}

### Can I use `near-api-js` on a static html page? {#can-i-use-near-api-js-on-a-static-html-page}

You can load the script from a CDN.

```html
<script src="https://cdn.jsdelivr.net/npm/near-api-js@0.45.1/dist/near-api-js.min.js"></script>
```

:::note
Make sure you load the latest version.

Versions list is on [npmjs.com](https://www.npmjs.com/package/near-api-js)
:::

<details>
<summary>Example Implementation</summary>
<p>

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <ul id="messages"></ul>
  <textarea id="text" placeholder="Add Message"></textarea>
  <button id="add-text">Add Text</button>
  <script src="https://cdn.jsdelivr.net/npm/near-api-js@0.45.1/dist/near-api-js.min.js"></script>
  <script>
    // connect to NEAR
    const near = new nearApi.Near({
      keyStore: new nearApi.keyStores.BrowserLocalStorageKeyStore(),
      networkId: 'testnet',
      nodeUrl: 'https://rpc.testnet.near.org',
      walletUrl: 'https://wallet.testnet.near.org'
    });
    
    // connect to the NEAR Wallet
    const wallet = new nearApi.WalletConnection(near, 'my-app');

    // connect to a NEAR smart contract
    const contract = new nearApi.Contract(wallet.account(), 'guest-book.testnet', {
      viewMethods: ['getMessages'],
      changeMethods: ['addMessage']
    });

    const button = document.getElementById('add-text');
    if (!wallet.isSignedIn()) {
      button.textContent = 'SignIn with NEAR'
    }

    // call the getMessages view method
    contract.getMessages()
      .then(messages => {
        const ul = document.getElementById('messages');
        messages.forEach(message => {
          const li = document.createElement('li');
          li.textContent = `${message.sender} - ${message.text}`;
          ul.appendChild(li);
        })
      });

    // Either sign in or call the addMessage change method on button click
    document.getElementById('add-text').addEventListener('click', () => {
      if (wallet.isSignedIn()) {
        contract.addMessage({
          args: { text: document.getElementById('text').value },
          amount: nearApi.utils.format.parseNearAmount('1')
        })
      } else {
        wallet.requestSignIn({
          contractId: 'guest-book.testnet',
          methodNames: ['getMessages', 'addMessage']
        });
      }
    });
  </script>
</body>

</html>
```

</p>
</details>

---

### What front-end frameworks can I use the JavaScript API with?

The JavaScript API is framework-agnostic. You can include it in any front-end framework, such as React, Vue, Angular, and others.

You can use [`create-near-app`](https://github.com/near/create-near-app) to quickly bootstrap projects with different templates:

    npx create-near-app

### Can I use the JavaScript API with mobile JavaScript frameworks such as React Native?

The JavaScript API can be used in most JavaScript runtimes, and under the hood, it’s an abstraction over NEAR’s [RPC API](/api/rpc/introduction). However, notice that the Wallet can’t be used everywhere. For example, in React Native apps you’ll be able to use the Wallet in web versions of the apps, but it won’t work in the native app deployments.

You can use the Wallet in `WebView` components in iOS or Android, however be aware that it uses `LocalStorage` for `KeyStore`, and it’s your responsibility to persist the storage when you manage loading of `WebView` components.

---

## Transactions {#transactions}

### How to check the status of transaction
Please refer to examples about transactions in the [Cookbook](/tools/near-api-js/cookbook).

### How to send batch transactions
Please refer to examples about transactions in the [Cookbook](/tools/near-api-js/cookbook).

---

## Accounts {#accounts}

### What’s the difference between `Account` and `ConnectedWalletAccount`?

Interaction with the wallet is only possible in a web-browser environment because NEAR’s Wallet is web-based.
The difference between `Account` and `ConnectedWalletAccount` is mostly about the way it signs transactions. The `ConnectedWalletAccount` uses the wallet to approve transactions.
Under the hood the `ConnectedWalletAccount` inherits and overrides some methods of `Account`.

### How to create implicit accounts?

You can read about it in the article about [Implicit Accounts](https://docs.near.org/integrator/implicit-accounts).

---

## Contracts {#contracts}

### How do I attach gas / a deposit? {#how-do-i-attach-gas--a-deposit}

After [contract is instantiated](/tools/near-api-js/quick-reference#load-contract) you can then call the contract and specify the amount of attached gas.

```js
await contract.method_name(
  {
    arg_name: "value", // argument name and value - pass empty object if no args required
  },
  "300000000000000", // attached GAS (optional)
  "1000000000000000000000000" // attached deposit in yoctoNEAR (optional)
);
```

---

## Common Errors {#common-errors}

### RPC Errors

Refer to the exhaustive [list of error messages](https://github.com/near/near-api-js/blob/16ba17251ff7d9c8454261001cd6b87e9a994789/packages/near-api-js/src/res/error_messages.json)
that RPC endpoints throws and JavaScript API propagates.

### Missing contract methods {#missing-contract-method}

When constructing a `Contract` instance on the client-side, you need to specify
the contract's methods. If you misspell, mismatch, or miss method names - you'll
receive errors about missing methods.

There are a few cases of missing or wrong methods:
- When you call a method you didn't specify in the constructor.
- When you call a method that doesn't exist on the blockchain's contract (but you did specify it in the client-side constructor).
- When you mismatch between `viewMethods` and `changeMethods`.

For example, let's look at the following contract code.
It contains one `view` and one `call` method:

```js
@NearBindgen
class MyContract extends NearContract {
  constructor() { super(); }

  @view
  method_A_view(): string {
    return 'Hi';
  }

  @call
  method_B_call(): void {}
}
```

#### Client-side errors for missing methods

##### `TypeError: contract.METHOD_NAME is not a function`

The following contract constructor declares only `method_A_view`, it doesn't declare `method_B_call`
```js
const contract = await new nearAPI.Contract(
  walletConnection.account(), 'guest-book.testnet',
  {
    viewMethods: ['method_A_view'], // <=== Notice this
    changeMethods: [], // <=== Notice this
    sender: walletConnection.getAccountId(),
  }
);

// This will work because we declared `method_A_view` in constructor
await contract.method_A_view();

// This will throw `TypeError: contract.method_B_call is not a function` 
// because we didn't declare `method_B_call` in constructor, 
// even if it exists in the real contract.
await contract.method_B_call();

// This will also throw `TypeError: contract.method_C is not a function`,
// not because `method_C` doesn't exist on the contract, but because we didn't declare it
// in the client-side constructor.
await contract.method_C();
```

#### RPC errors for missing methods

##### `wasm execution failed with error: FunctionCallError(MethodResolveError(MethodNotFound))`

In this example we specify and call a method, but this method doesn't exist on the blockchain:
```js
const contract = await new nearAPI.Contract(
  // ...
  {
    viewMethods: ["method_C"], // <=== method_C doesn't exist on the contract above
    changeMethods: [],
    // ...
  }
);
// We did specify `method_C` name in constructor, so this function exists on client-side `contract` instance,
// but a method with this name does not exist on the actual contract on the blockchain.
// This will return an error from RPC call `FunctionCallError(MethodResolveError(MethodNotFound))`
// and will throw it on the client-side
await contract.method_C();

// Notice: if we call `method_A_view` we get `TypeError: contract.method_A_view is not a function`.
// Even though the method exists on the actual blockchain contract,
// we didn't specify `method_A_view` in the contract's client-side constructor.
await contract.method_A_view();
```

##### `wasm execution failed with error: FunctionCallError(HostError(ProhibitedInView { method_name: "storage_write" }))`

Last case is when you mismatch `viewMethods` and `changeMethods`.

In the contract above we declared:
- A `@view` method, named: `method_A_view`
- A `@call` method, named: `method_B_call`

In client-side constructor contract's, `@view` method names must be specified under `viewMethods`,
and contract's `@call` method names must be specified under `changeMethods`.
If we mismatch between the types we will receive errors.

For example:
```js
const contract = await new nearAPI.Contract(
  // ...
  {
    viewMethods: ['method_B_call'], // <=== here should be `method_A_view`
    changeMethods: ['method_A_view'], // <=== and here should be `method_B_call`
    // ...
  }
);

// This will return an error from RPC call and throw:
// `wasm execution failed with error: FunctionCallError(HostError(ProhibitedInView { method_name: "storage_write" }))`
// This error indicates that we are trying to call a state-changing method but declare it as a read-only method in client-side.
await contract.method_B_call();

// The following behavior is undefined and might not work as expected.
// `method_A_veiw` should be declared under `viewMethods` and in our example here we declare it under `changeMethods`.
await contract.method_A_view();
```

### Class {X} is missing in schema: publicKey

There is currently a known issue with the JavaScript API library, when you `import` it more than once
it might sometimes cause namespaces collision.

A temporary workaround: make sure you don't re-import it, for example when running tests.

---

### `regeneratorRuntime` is not defined {#regeneratorruntime-is-not-defined}

You are probably using [Parcel](https://parceljs.org/) like we do in [other examples](https://near.dev). Please make sure you have this line at the top of your main JS file. (Most likely `index.js`):

```js
import "regenerator-runtime/runtime";
```

- Also, ensure the dependencies for this are added to the project by checking the dev dependencies in your `package.json`. If not found you can install this by running the following in your terminal:

```bash
npm install regenerator-runtime --save-dev
```

---

### Window error using `Node.js` {#window-error-using-nodejs}

You're maybe using a KeyStore that's for the browser. Instead, use a [filesystem key](/tools/near-api-js/quick-reference#key-store) or private key string.

**Browser KeyStore:**

```js
const { keyStores } = require("near-api-js");
const keyStore = new keyStores.BrowserLocalStorageKeyStore();
```

**FileSystem KeyStore:**

```js
const { keyStores } = require("near-api-js");
const KEY_PATH = "~./near-credentials/testnet/example-account.json";
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(KEY_PATH);
```
