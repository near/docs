---
id: faq
title: FAQ for NEAR JavaScript API
sidebar_label: FAQ
---

A collection of Frequently Asked Questions by the community.

---

## General {#general}


### Can I use `near-api-js` on a static html page? {#can-i-use-near-api-js-on-a-static-html-page}

You can load the script form a CDN.

```html
<script src="https://cdn.jsdelivr.net/npm/near-api-js@0.45.1/dist/near-api-js.min.js"></script>
```

:::note
Make sure you load the latest version.

Versions list is on npmjs.com https://www.npmjs.com/package/near-api-js
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

### Missing contract methods {#missing-contract-method}

When you construct a `Contract` instance on client-side, you need to specify
the methods the contract has. If you misspell, mismatch or miss method names - you
receive errors about missing methods.

There are few cases for missing or wrong methods:
- When you call a method that you didn't specify in constructor.
- When you call that doesn't exist on the contract on the blockchain (but you did specify it in the client-side constructor).
- When you mismatch between `viewMethods` and `changeMethods`.

For example lets look at the following contract code.
It contains one `view` and one `call` methods:
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

#### Client-side error: `TypeError: contract.METHOD_NAME is not a function`

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

#### RPC error: `wasm execution failed with error: FunctionCallError(MethodResolveError(MethodNotFound))`

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
// We did specify `method_C` name in constructor, so this function exists on `contract` instance,
// but a method with this name does not exist on the real contract on the blockchain.
// This will return an error from RPC call `FunctionCallError(MethodResolveError(MethodNotFound))`
// and will throw it on the client-side
await contract.method_C();

// Notice: if we call `method_A_view` we get `TypeError: contract.method_A_view is not a function`.
// Even though the method exists on the real contract, we didn't specify `method_A_view` in contract constructor.
await contract.method_A_view();
```

#### RPC error: `wasm execution failed with error: FunctionCallError(HostError(ProhibitedInView { method_name: "storage_write" }))`

Last case is when you mismatch `viewMethods` and `changeMethods`.

In the contract above we declared:
- `@view` method `method_A_view`
- `@call` method `method_B_call`

In client-side constructor contract's `@view` must be specified under `viewMethods`,
and contract's `@call` must be specified under `changeMethods`.
If we mismatch between the types we will receive errors.

For example:
```js
const contract = await new nearAPI.Contract(
  // ...
  {
    viewMethods: ['method_B_call'], // <=== this should be `method_A_view`
    changeMethods: ['method_A_view'], // <=== and this should be `method_B_call`
    // ...
  }
);

// This will return an error from RPC call and throw:
// `wasm execution failed with error: FunctionCallError(HostError(ProhibitedInView { method_name: "storage_write" }))`
// This error indicates that we are trying to call a state-changing method but declare it as a read-only method in client-side.
await contract.method_B_call();

// This behavior is undefined and might not work as expected.
// `method_A_veiw` should be declared under `viewMethods` and in our example here we declare it under `changeMethods`.
await contract.method_A_view();
```

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