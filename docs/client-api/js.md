---
name: NEARLib.js
menu: Client API
---

# NEARlib.js

## KeyPair

This class provides key pair functionality \(generating key pairs, encoding key pairs\).

### Parameters

* `publicKey` [**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)
* `secretKey` [**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### getPublicKey

Get the public key.

### getSecretKey

Get the secret key.

#### Examples

```javascript
  // Passing existing key into a function to store in local storage

  async setKey(accountId, key) {
      window.localStorage.setItem(
          BrowserLocalStorageKeystore.storageKeyForPublicKey(accountId), key.getPublicKey());
      window.localStorage.setItem(
          BrowserLocalStorageKeystore.storageKeyForSecretKey(accountId), key.getSecretKey());
  }
```

### fromRandomSeed

Generate a new keypair from a random seed \(static method\)

#### Examples

```javascript
  const keyWithRandomSeed = await KeyPair.fromRandomSeed();

  keyWithRandomSeed.getPublicKey()
  // returns [PUBLIC_KEY]

  keyWithRandomSeed.getSecretKey()
  // returns [SECRET_KEY]
```

### encodeBufferInBs58

Encode a buffer as string using bs58 \(static method\)

#### Parameters

* `buffer` [**Buffer**](https://nodejs.org/api/buffer.html)

#### Examples

```javascript
  KeyPair.encodeBufferInBs58(key.publicKey)
```

## Account

Near account and account related operations.

### Parameters

* `nearClient`

#### Examples

```javascript
  const account = new Account(nearjs.nearClient);
```

### createAccount

Creates a new account with a given name and key,

#### Parameters

* `newAccountId` [**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) id of the new account.
* `publicKey` [**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) public key to associate with the new account
* `amount` [**number**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) amount of tokens to transfer from originator account id to the new account as part of the creation.
* `originator`
* `originatorAccountId` [**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) existing account on the blockchain to use for transferring tokens into the new account

#### Examples

```javascript
  const createAccountResponse = await account.createAccount(
      mainTestAccountName,
      keyWithRandomSeed.getPublicKey(),
      1000,
      aliceAccountName);
```

### createAccountWithRandomKey

Creates a new account with a new random key pair. Returns the key pair to the caller. It's the caller's responsibility to manage this key pair.

#### Parameters

* `newAccountId` [**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) id of the new account
* `amount` [**number**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) amount of tokens to transfer from originator account id to the new account as part of the creation.
* `originatorAccountId` [**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) existing account on the blockchain to use for transferring tokens into the new account

#### Examples

```javascript
  const createAccountResponse = await account.createAccountWithRandomKey(
      newAccountName,
      amount,
      aliceAccountName);
```

### viewAccount

Returns an existing account with a given `accountId`

#### Parameters

* `accountId` [**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) id of the account to look up

#### Examples

```javascript
  const viewAccountResponse = await account.viewAccount(existingAccountId);
```

## WalletAccount

Wallet based account and signer that uses external wallet through the iframe to sign transactions.

### Parameters

* `appKeyPrefix` [**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) an application prefix to use distinguish between multiple apps under the same origin.
* `walletBaseUrl` [**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) base URL to the wallet \(optional, default `'https://wallet.nearprotocol.com'`\)

#### Examples

```javascript
  const walletAccount = new WalletAccount(contractName, walletBaseUrl)

  [...]

  const walletAccount = new nearlib.WalletAccount(contractName, walletBaseUrl)

  [...]

  // To access wallet globally use:
  window.walletAccount = new nearlib.WalletAccount(config.contractName, walletBaseUrl);
```

### isSignedIn

Returns true, if this WalletAccount is authorized with the wallet.

#### Examples

```javascript
  walletAccount.isSignedIn();
```

### getAccountId

Returns authorized Account ID.

#### Examples

```javascript
  walletAccount.getAccountId();
```

### requestSignIn

Redirects current page to the wallet authentication page.

#### Parameters

* `contract_id` [**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) contract ID of the application
* `title` [**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) name of the application
* `success_url` [**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) url to redirect on success
* `failure_url` [**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) url to redirect on failure

#### Examples

```javascript
  walletAccount.requestSignIn(
    myContractId, 
    title, 
    onSuccessHref,
    onFailureHref);
```

### signOut

Sign out from the current account.

#### Examples

```javascript
  walletAccount.signOut();
```

### signTransactionBody

Sign a transaction. If the key for senderAccountId is not present, this operation will fail. Sends a sign request to the wallet through the iframe.

#### Parameters

* `body` [**object**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) transaction details object. Should contain body and hash
* `senderAccountId` [**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) account ID of the sender

#### Examples

```javascript
  const signature = await walletAccount.signTransactionBody(body, senderAccountId);
```

## Near

Javascript library for interacting with near.

### Parameters

* `nearClient` **NearClient**

#### Examples

```javascript
  const nearClient = new nearlib.NearClient(
    walletAccount, 
    new nearlib.LocalNodeConnection(config.nodeUrl));
  const near = new nearlib.Near(nearClient);
```

### callViewFunction

Calls a view function. Returns the same value that the function returns.

#### Parameters

* `sender` [**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) account id of the sender
* `contractAccountId` [**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) account id of the contract
* `methodName` [**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) method to call
* `args` [**object**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) arguments to pass to the method

#### Examples

```javascript
  const viewFunctionResponse = await near.callViewFunction(
    contractAccountId, 
    methodName, 
    args);
```

### scheduleFunctionCall

Schedules an asynchronous function call. Returns a hash which can be used to check the status of the transaction later.

#### Parameters

* `amount` [**number**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) amount of tokens to transfer as part of the operation
* `originator`
* `contractId`
* `methodName` [**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) method to call
* `args` [**object**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) arguments to pass to the method
* `sender` [**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) account id of the sender
* `contractAccountId` [**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) account id of the contract

#### Examples

```javascript
  const scheduleResult = await near.scheduleFunctionCall(
      0,
      aliceAccountName,
      contractName,
      'setValue', // this is the function defined in a wasm file that we are calling
      setArgs);
```

### deployContract

Deploys a smart contract to the block chain

#### Parameters

* `contractId`
* `wasmByteArray`
* `sender` [**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) account id of the sender
* `contractAccountId` [**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) account id of the contract
* `wasmArray` [**Uint8Array**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) wasm binary

#### Examples

```javascript
  const response =  await nearjs.deployContract(contractName, data);
```

### getTransactionStatus

Get a status of a single transaction identified by the transaction hash.

#### Parameters

* `transactionHash` [**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) unique identifier of the transaction

#### Examples

```javascript
  // get the result of a transaction status call
  const result = (await this.getTransactionStatus(transactionHash)).result
```

### loadContract

Load given contract and expose it's methods.

Every method is taking named arguments as JS object, e.g.: `{ paramName1: "val1", paramName2: 123 }`

View method returns promise which is resolved to result when it's available. State change method returns promise which is resolved when state change is succesful and rejected otherwise.

Note that `options` param is only needed temporary while contract introspection capabilities are missing.

#### Parameters

* `contractAccountId` [**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) contract account name
* `options` [**object**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) object used to pass named parameters
  * `options.sender` [**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) account name of user which is sending transactions
  * `options.viewMethods` [**Array**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)**&lt;**[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**&gt;** list of view methods to load \(which don't change state\)
  * `options.changeMethods` [**Array**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)**&lt;**[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**&gt;** list of methods to load that change state

Returns [**object**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) object with methods corresponding to given contract methods.

#### Examples

```javascript
    // this example would be a counter app with a contract that contains the incrementCounter and decrementCounter methods
    window.contract = await near.loadContract(config.contractName, {
      viewMethods: ["getCounter"],
      changeMethods: ["incrementCounter", "decrementCounter"],
      sender: nearlib.dev.myAccountId
    });
```

### createDefaultConfig

Generate a default configuration for nearlib \(static method\)

#### Parameters

* `nodeUrl` [**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) url of the near node to connect to \(optional, default `'http://localhost:3030'`\)

#### Examples

```javascript
  Near.createDefaultConfig();
```

## Init a new contract in NEAR Studio

This is an example of how you might initialize a contract based on the [NEAR Guest Book example](https://studio.nearprotocol.com/?f=b89ipg84v&quickstart) found in [NEAR Studio](https://studio.nearprotocol.com/?utm_source=docs&utm_term=nearlib_client_api_docs)

```javascript
  // Initializing contract
  async function doInitContract() {
    // Getting config from cookies that are provided by the NEAR Studio.
    const config = await nearlib.dev.getConfig();
    window.config = config;
    console.log("nearConfig", config);

    // Initializing Wallet based Account. It can work with NEAR DevNet wallet that
    // is hosted at https://wallet.nearprotocol.com
    // The wallet is managing the accounts and keys for the user using localStorage.
    // It never exposes the keys to the application, so in order to send transactions
    // on behalf of the user we need to talk to the wallet page.
    // To talk to the wallet we use the in-browser iframe messaging system and auth tokens.
    // Then wallet uses keys from the local storage under wallet.nearprotocol.com
    // and signs the transaction and returns it back to our app.
    const walletBaseUrl = 'https://wallet.nearprotocol.com';
    window.walletAccount = new nearlib.WalletAccount(config.contractName, walletBaseUrl);

    // Getting the Account ID. If unauthorized yet, it's just empty string.
    window.accountId = window.walletAccount.getAccountId();

    // Initializing near and near client from the nearlib.
    near = new nearlib.Near(new nearlib.NearClient(
        window.walletAccount,
        // We need to provide a connection to the blockchain node which we're going to use
        new nearlib.LocalNodeConnection(config.nodeUrl),
    ));

    // Initializing our contract APIs by contract name and configuration.
    window.contract = await near.loadContract(config.contractName, {
      // NOTE: This configuration only needed while NEAR is still in development
      // View methods are read only. They don't modify the state, but usually return some value. 
      viewMethods: ["whoSaidHi"],
      // Change methods can modify the state. But you don't receive the returned value when called.
      changeMethods: ["sayHi"],
      // Sender is the account ID to initialize transactions.
      sender: window.accountId,
    });

    // Once everything is ready, we can start using contract
    return doWork();
  }

  // Using initialized contract
  async function doWork() {
    // Call your own functions that act on the contract here
    // e.g. signInAUser() or doSomeTransaction()
  }
```

## Load nearlib and contract into window

This is one way to make the contract and nearlib available in the window scope to be used in the view. This builds on th previous example.

```javascript
// COMMON CODE BELOW:
// Loads nearlib and this contract into window scope.

let initPromise;
window.initContract = function () {
  if (window.contract) {
    return Promise.resolve();
  }
  if (!initPromise) {
    initPromise = doInitContract();
  }
  return initPromise;
}

initContract().catch(console.error);
`
```

