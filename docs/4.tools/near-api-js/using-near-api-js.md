---
id: using-near-api-js
title: Using JavaScript API to interact with NEAR
sidebar_label: Using JavaScript API
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## What is `near-api-js`

`near-api-js` is a complete library to interact with the NEAR blockchain. You can use it in the browser, or in Node.js runtime.

You'll typically first create a connection to NEAR with [`connect`](#connect). If you need to sign transaction, you also create a [`KeyStore`](#key-store).
With the connection object you now can:
- Interact with the [Wallet](#wallet) in a browser.
- Instantiate an [Account](#account) object to inspect, create or delete accounts, and also send tokens, deploy contracts and manage keys for accounts.
- Instantiate an [Contract](#contract) object to call smart contract methods.

The library also contains some [utils](#utils) functions.

:::tip
To quickly get started with integrating NEAR in a web browser, read our [Web Frontend integration](/develop/integrate/frontend) article.
:::

:::info
Note the difference between `near-api-js` and `near-sdk-js`:

The JavaScript _SDK_ is a library for developing smart contracts. It contains classes and functions you use to write your smart contract code.

The JavaScript _API_ is a complete library for all possible commands to interact with NEAR. It’s a wrapper for the RPC endpoints, a library to interact with NEAR Wallet in the browser, and a tool for keys management.
:::

## Install {#install}

Include `near-api-js` as a dependency in your package.

```bash
npm i --save near-api-js
```

## Import {#import}

You can use the API library in the browser, or in Node.js runtime. Some features are available only in one of the environments.
For example, the `WalletConnection` is only for the browser, and there are different `KeyStore` providers for each environment.

<Tabs>
<TabItem value="Browser" label="Browser" default>

```js
import * as nearAPI from "near-api-js";
```

</TabItem>
<TabItem value="Node" label="Node">

```js
const nearAPI = require("near-api-js");
```

</TabItem>
</Tabs>

## Key Store {#key-store}

If you sign transactions you need to create a _Key Store_. In the browser, the LocalStorage KeyStore will be used once you ask your user to Sign In with the Wallet.

<Tabs>
<TabItem value="browser" label="Using Browser" default>

```js
// creates keyStore using private key in local storage

const { keyStores } = nearAPI;
const myKeyStore = new keyStores.BrowserLocalStorageKeyStore();
```


[<span class="typedoc-icon typedoc-icon-class"></span> Class `BrowserLocalStorageKeyStore`](https://near.github.io/near-api-js/classes/key_stores_browser_local_storage_key_store.browserlocalstoragekeystore.html)

</TabItem>
<TabItem value="dir" label="Using Credentials Directory">

```js
// creates a keyStore that searches for keys in .near-credentials
// requires credentials stored locally by using a NEAR-CLI command: `near login` 
// https://docs.near.org/tools/cli#near-login

const { keyStores } = nearAPI;
const homedir = require("os").homedir();
const CREDENTIALS_DIR = ".near-credentials";
const credentialsPath = require("path").join(homedir, CREDENTIALS_DIR);
const myKeyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);
```

[<span class="typedoc-icon typedoc-icon-class"></span> Class `UnencryptedFileSystemKeyStore`](https://near.github.io/near-api-js/classes/key_stores_unencrypted_file_system_keystore.unencryptedfilesystemkeystore.html)

</TabItem>
<TabItem value="file" label="Using a File">

```js
// creates keyStore from a provided file
// you will need to pass the location of the .json key pair

const { KeyPair, keyStores } = require("near-api-js");
const fs = require("fs");
const homedir = require("os").homedir();

const ACCOUNT_ID = "near-example.testnet";  // NEAR account tied to the keyPair
const NETWORK_ID = "testnet";
// path to your custom keyPair location (ex. function access key for example account)
const KEY_PATH = '/.near-credentials/near-example-testnet/get_token_price.json';

const credentials = JSON.parse(fs.readFileSync(homedir + KEY_PATH));
const myKeyStore = new keyStores.InMemoryKeyStore();
myKeyStore.setKey(NETWORK_ID, ACCOUNT_ID, KeyPair.fromString(credentials.private_key));
```

[<span class="typedoc-icon typedoc-icon-class"></span> Class `InMemoryKeyStore`](https://near.github.io/near-api-js/classes/key_stores_in_memory_key_store.inmemorykeystore.html)
&nbsp;&nbsp;&nbsp;
[<span class="typedoc-icon typedoc-icon-class"></span> Class `KeyPair`](https://near.github.io/near-api-js/classes/utils_key_pair.keypair.html)

</TabItem>
<TabItem value="key" label="Using a private key string">

```js
// creates keyStore from a private key string
// you can define your key here or use an environment variable

const { keyStores, KeyPair } = nearAPI;
const myKeyStore = new keyStores.InMemoryKeyStore();
const PRIVATE_KEY =
  "by8kdJoJHu7uUkKfoaLd2J2Dp1q1TigeWMG123pHdu9UREqPcshCM223kWadm";
// creates a public / private key pair using the provided private key
const keyPair = KeyPair.fromString(PRIVATE_KEY);
// adds the keyPair you created to keyStore
await myKeyStore.setKey("testnet", "example-account.testnet", keyPair);
```

[<span class="typedoc-icon typedoc-icon-class"></span> Class `InMemoryKeyStore`](https://near.github.io/near-api-js/classes/key_stores_in_memory_key_store.inmemorykeystore.html)
&nbsp;&nbsp;&nbsp;
[<span class="typedoc-icon typedoc-icon-class"></span> Class `KeyPair`](https://near.github.io/near-api-js/classes/utils_key_pair.keypair.html)

</TabItem>
</Tabs>

:::tip
Key store is **_not required_** if you are not signing transactions (meaning - you are only calling read-only _view_ methods on a contract)
:::

## Connecting to NEAR {#connect}

The object returned from `connect` is your entry-point for all commands in the API.
If you need to sign transaction, you'll need a [`KeyStore`](#key-store) to create a connection.

<Tabs>
<TabItem value="testnet" label="TestNet" default>

```js
const { connect } = nearAPI;

const connectionConfig = {
  networkId: "testnet",
  keyStore: myKeyStore, // first create a key store 
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
};
const nearConnection = await connect(connectionConfig);
```

</TabItem>
<TabItem value="mainnet" label="MainNet">

```js
const { connect } = nearAPI;

const connectionConfig = {
  networkId: "mainnet",
  keyStore: myKeyStore, // first create a key store
  nodeUrl: "https://rpc.mainnet.near.org",
  walletUrl: "https://wallet.mainnet.near.org",
  helperUrl: "https://helper.mainnet.near.org",
  explorerUrl: "https://explorer.mainnet.near.org",
};
const nearConnection = await connect(connectionConfig);
```

</TabItem>
<TabItem value="betanet" label="BetaNet">

```js
const { connect } = nearAPI;

const connectionConfig = {
  networkId: "betanet",
  keyStore: myKeyStore, // first create a key store
  nodeUrl: "https://rpc.betanet.near.org",
  walletUrl: "https://wallet.betanet.near.org",
  helperUrl: "https://helper.betanet.near.org",
  explorerUrl: "https://explorer.betanet.near.org",
};
const nearConnection = await connect(connectionConfig);
```

</TabItem>
<TabItem value="localnet" label="LocalNet">

```js
const { connect } = nearAPI;
const connectionConfig = {
  networkId: "local",
  nodeUrl: "http://localhost:3030",
  walletUrl: "http://localhost:4000/wallet",
};
const nearConnection = await connect(connectionConfig);
```

</TabItem>
</Tabs>

[<span class="typedoc-icon typedoc-icon-module"></span> Module `connect`](https://near.github.io/near-api-js/modules/connect.html)

## Interacting with the Wallet {#wallet}

Wallet interaction is possible only in the browser, because NEAR's Wallet is web-based.

Most frequent action is Sign In. Your user is redirected to the Wallet page to authorize your application.
Once the user has Signed In, an access key is saved in browser's LocalStorage.
All following actions that require the access key will be allowed.
In case a user needs to authorize a transaction that has a deposit attached, your user will be automatically    redirected to the Wallet again.

### Creating Wallet Connection {#wallet-connection}

In Wallet connection you use a LocalStorage [`KeyStore`](#key-store).

<Tabs>
<TabItem value="testnet" label="TestNet" default>

```js
const { connect, keyStores, WalletConnection } = nearAPI;

const connectionConfig = {
  networkId: "testnet",
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
};

// connect to NEAR
const nearConnection = await connect(connectionConfig);

// create wallet connection
const walletConnection = new WalletConnection(nearConnection);
```

</TabItem>
<TabItem value="mainnet" label="MainNet">

```js
const { connect, keyStores, WalletConnection } = nearAPI;

const connectionConfig = {
  networkId: "mainnet",
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: "https://rpc.mainnet.near.org",
  walletUrl: "https://wallet.mainnet.near.org",
  helperUrl: "https://helper.mainnet.near.org",
  explorerUrl: "https://explorer.mainnet.near.org",
};

// connect to NEAR
const nearConnection = await connect(connectionConfig);

// create wallet connection
const walletConnection = new WalletConnection(nearConnection);
```

</TabItem>
<TabItem value="betanet" label="BetaNet">

```js
const { connect, keyStores, WalletConnection } = nearAPI;

const connectionConfig = {
  networkId: "betanet",
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: "https://rpc.betanet.near.org",
  walletUrl: "https://wallet.betanet.near.org",
  helperUrl: "https://helper.betanet.near.org",
  explorerUrl: "https://explorer.betanet.near.org",
};

// connect to NEAR
const nearConnection = await connect(connectionConfig);

// create wallet connection
const walletConnection = new WalletConnection(nearConnection);
```

</TabItem>
</Tabs>

[<span class="typedoc-icon typedoc-icon-module"></span> Module `browserConnect`](https://near.github.io/near-api-js/modules/browserconnect.html)
&nbsp;&nbsp;&nbsp;
[<span class="typedoc-icon typedoc-icon-class"></span> Class `WalletConnection`](https://near.github.io/near-api-js/classes/walletaccount.walletconnection.html)

### Ask your user to Sign In {#sign-in}

You first create a [WalletConnection](#wallet-connection), and then call `requestSignIn`.
This will redirect the current page to the Wallet authentication page.
You can configure success and failure redirect URLs.

This action creates an access key that will be stored in the browser's local storage.
You can optionally list `methodNames` you want to allow for the access key.
If you don't specify `methodNames` or pass an empty array, then all methods are allowed to be called (the access key will be created with permissions to call all methods).

```js
// const walletConnection = new WalletConnection(nearConnection);
walletConnection.requestSignIn({
  contractId: "example-contract.testnet.REPLACE_ME",
  methodNames: [], // optional
  successUrl: "REPLACE_ME://.com/success", // optional redirect URL on success
  failureUrl: "REPLACE_ME://.com/failure" // optional redirect URL on failure
});
```

[<span class="typedoc-icon typedoc-icon-method"></span> Method `WalletConnection.requestSignIn`](https://near.github.io/near-api-js/classes/walletaccount.walletconnection.html#requestsignin)

:::tip
Sign In is **_not required_** if you are using an alternative key store to local storage, or you are not signing transactions (meaning - you are only calling read-only _view_ methods on a contract)
:::

### Sign Out your user {#sign-out}

```js
// const walletConnection = new WalletConnection(nearConnection);
walletConnection.signOut();
```

[<span class="typedoc-icon typedoc-icon-method"></span> Method `WalletConnection.signOut`](https://near.github.io/near-api-js/classes/walletaccount.walletconnection.html#signout)

### Check if Signed In {#check-if-signed-in}

```js
// const walletConnection = new WalletConnection(nearConnection);
if (walletConnection.isSignedIn()) {
	// user is signed in
}
```

[<span class="typedoc-icon typedoc-icon-method"></span> Method `WalletConnection.isSignedId`](https://near.github.io/near-api-js/classes/walletaccount.walletconnection.html#issignedin)

### Get Wallet Account {#get-authorized-account}

Get the [Account](#account) your user has signed in with in the Wallet.

#### Get Account ID (as string) {#get-authorized-account-id}

```js
// const walletConnection = new WalletConnection(nearConnection);
const walletAccountId = walletConnection.getAccountId();
```
[<span class="typedoc-icon typedoc-icon-method"></span> Method `WalletConnection.getAccountId`](https://near.github.io/near-api-js/classes/walletaccount.walletconnection.html#getaccountid)

#### Get Account Object {#get-authorized-account-object}

```js
// const walletConnection = new WalletConnection(nearConnection);
const walletAccountObj = walletConnection.account();
```

[<span class="typedoc-icon typedoc-icon-method"></span> Method `WalletConnection.account`](https://near.github.io/near-api-js/classes/walletaccount.walletconnection.html#account)
&nbsp;&nbsp;&nbsp;
[<span class="typedoc-icon typedoc-icon-class"></span> Class `ConnectedWalletAccount`](https://near.github.io/near-api-js/classes/walletaccount.connectedwalletaccount.html)

## Account {#account}

You can interact with, create or delete NEAR accounts.

### Load Account {#load-account}

This will return an Account object for you to interact with.

```js
const account = await nearConnection.account("example-account.testnet");
```

[<span class="typedoc-icon typedoc-icon-class"></span> Class `Account`](https://near.github.io/near-api-js/classes/account.account-1.html)

### Create Account {#create-account}

```js
// create a new account using funds from the account used to create it.
const account = await nearConnection.account("example-account.testnet");
await account.createAccount(
  "example-account2.testnet", // new account name
  "8hSHprDq2StXwMtNd43wDTXQYsjXcD4MJTXQYsjXcc", // public key for new account
  "10000000000000000000" // initial balance for new account in yoctoNEAR
);
```

[<span class="typedoc-icon typedoc-icon-method"></span> Method `Account.createAccount`](https://near.github.io/near-api-js/classes/account.account-1.html#createaccount)

### Delete Account {#delete-account}

```js
// deletes account found in the `account` object
// transfers remaining account balance to the accountId passed as an argument
const account = await nearConnection.account("example-account.testnet");
await account.deleteAccount("beneficiary-account.testnet");
```

[<span class="typedoc-icon typedoc-icon-method"></span> Method `Account.deleteAccount`](https://near.github.io/near-api-js/classes/account.account-1.html#deleteaccount)

### Get Account Balance {#get-account-balance}

```js
// gets account balance
const account = await nearConnection.account("example-account.testnet");
await account.getAccountBalance();
```

[<span class="typedoc-icon typedoc-icon-method"></span> Method `Account.getAccountBalance`](https://near.github.io/near-api-js/classes/account.account-1.html#getaccountbalance)

### Get Account details {#get-account-details}

Returns information about an account, such as authorized apps.

```js
// gets account details in terms of authorized apps and transactions
const account = await nearConnection.account("example-account.testnet");
await account.getAccountDetails();
```

[<span class="typedoc-icon typedoc-icon-method"></span> Method `Account.getAccountDetails`](https://near.github.io/near-api-js/classes/account.account-1.html#getaccountdetails)

### Deploy a Contract {#deploy-a-contract}

You can deploy a contract from a compiled WASM file. This returns an object with transaction and receipts outcomes and status.

```js
const account = await nearConnection.account("example-account.testnet");
const transactionOutcome = await account.deployContract(fs.readFileSync('example-file.wasm'));
```

[<span class="typedoc-icon typedoc-icon-method"></span> Method `Account.deployContract`](https://near.github.io/near-api-js/classes/account.account-1.html#deploycontract)
&nbsp;&nbsp;&nbsp;
[<span class="typedoc-icon typedoc-icon-interface"></span> Interface `FinalExecutionOutcome`](https://near.github.io/near-api-js/interfaces/providers_provider.finalexecutionoutcome.html)


### Send Tokens {#send-tokens}

Transfer NEAR tokens between accounts. This returns an object with transaction and receipts outcomes and status.

```js
const account = await nearConnection.account("sender-account.testnet");
await account.sendMoney(
  "receiver-account.testnet", // receiver account
  "1000000000000000000000000" // amount in yoctoNEAR
);
```

[<span class="typedoc-icon typedoc-icon-method"></span> Method `Account.sendMoney`](https://near.github.io/near-api-js/classes/account.account-1.html#sendmoney)
&nbsp;&nbsp;&nbsp;
[<span class="typedoc-icon typedoc-icon-interface"></span> Interface `FinalExecutionOutcome`](https://near.github.io/near-api-js/interfaces/providers_provider.finalexecutionoutcome.html)


### State {#state}

Get basic account information, such as amount of tokens the account has or the amount of storage it uses.

```js
const account = await nearConnection.account("example-account.testnet");
const accountState = await account.state();
```

[<span class="typedoc-icon typedoc-icon-method"></span> Method `Account.state`](https://near.github.io/near-api-js/classes/account.account-1.html#state)
&nbsp;&nbsp;&nbsp;
[<span class="typedoc-icon typedoc-icon-interface"></span> Interface `AccountView`](https://near.github.io/near-api-js/interfaces/providers_provider.accountview.html)

### Access Keys {#access-keys}

You can get and manage keys for an account.

#### Add Full Access Key {#add-full-access-key}

```js
// takes public key as string for argument
const account = await nearConnection.account("example-account.testnet");
await account.addKey("8hSHprDq2StXwMtNd43wDTXQYsjXcD4MJTXQYsjXcc");
```

[<span class="typedoc-icon typedoc-icon-method"></span> Method `Account.addKey`](https://near.github.io/near-api-js/classes/account.account-1.html#addkey)

#### Add Function Access Key {#add-function-access-key}

```js
const account = await nearConnection.account("example-account.testnet");
await account.addKey(
  "8hSHprDq2StXwMtNd43wDTXQYsjXcD4MJTXQYsjXcc", // public key for new account
  "example-account.testnet", // contract this key is allowed to call (optional)
  "example_method", // methods this key is allowed to call (optional)
  "2500000000000" // allowance key can use to call methods (optional)
);
```

[<span class="typedoc-icon typedoc-icon-method"></span> Method `Account.addKey`](https://near.github.io/near-api-js/classes/account.account-1.html#addkey)

#### Get All Access Keys {#get-all-access-keys}

```js
const account = await nearConnection.account("example-account.testnet");
await account.getAccessKeys();
```

[<span class="typedoc-icon typedoc-icon-method"></span> Method `Account.getAccessKeys`](https://near.github.io/near-api-js/classes/account.account-1.html#getaccesskeys)
&nbsp;&nbsp;&nbsp;
[<span class="typedoc-icon typedoc-icon-interface"></span> Interface `AccessKeyInfoView`](https://near.github.io/near-api-js/interfaces/providers_provider.accesskeyinfoview.html)

#### Delete Access Key {#delete-access-key}

```js
const account = await nearConnection.account("example-account.testnet");
await account.deleteKey("8hSHprDq2StXwMtNd43wDTXQYsjXcD4MJTXQYsjXcc");
```

[<span class="typedoc-icon typedoc-icon-method"></span> Method `Account.deleteKey`](https://near.github.io/near-api-js/classes/account.account-1.html#deletekey)

## Contract {#contract}

When you instantiate an instance of `Contract` you need to specify the names of the functions you have on your smart contract.
Then the new instance of `Contract` will have methods with the same names as your smart contract functions.
For example if you deployed a contract with `my_smart_contract_function` function on it, then this will work:
```js
const contract = new Contract(account, {
  changeMethods: ["my_smart_contract_function"], // your smart-contract has a function `my_smart_contract_function`
  sender: account
});
// `contract` object has `my_smart_contract_function` function on it: 
contract.my_smart_contract_function()
```

### Load Contract {#load-contract}

<Tabs>
<TabItem value="Standard" label="Standard" default>

```js
const { Contract } = nearAPI;

const contract = new Contract(
  account, // the account object that is connecting
  "example-contract.testnet",
  {
    // name of contract you're connecting to
    viewMethods: ["getMessages"], // view methods do not change state but usually return a value
    changeMethods: ["addMessage"], // change methods modify state
  }
);
```

[<span class="typedoc-icon typedoc-icon-class"></span> Class `Contract`](https://near.github.io/near-api-js/classes/contract.contract-1.html)

</TabItem>
<TabItem value="wallet" label="Using Wallet">

```js
const { Contract } = nearAPI;

const contract = new Contract(
  wallet.account(), // the account object that is connecting
  "example-contract.testnet",
  {
    // name of contract you're connecting to
    viewMethods: ["getMessages"], // view methods do not change state but usually return a value
    changeMethods: ["addMessage"], // change methods modify state
  }
);
```

[<span class="typedoc-icon typedoc-icon-class"></span> Class `Contract`](https://near.github.io/near-api-js/classes/contract.contract-1.html)

</TabItem>
</Tabs>

### Call Contract {#call-contract}

<Tabs>
<TabItem value="method" label="Change Method" default>

```js
const contract = new Contract(account, {
  changeMethods: ["method_name"],
  sender: account
});
await contract.method_name(
  {
    arg_name: "value", // argument name and value - pass empty object if no args required
  },
  "300000000000000", // attached GAS (optional)
  "1000000000000000000000000" // attached deposit in yoctoNEAR (optional)
);
```

</TabItem>
<TabItem value="callback" label="Change Method w/ callbackUrl and meta">

```js
const contract = new Contract(account, {
  changeMethods: ["method_name"],
  sender: account
});
await contract.method_name(
  {
    callbackUrl: 'https://example.com/callback', // callbackUrl after the transaction approved (optional)
    meta: 'some info', // meta information NEAR Wallet will send back to the application. `meta` will be attached to the `callbackUrl` as a url param
    args: {
        arg_name: "value" // argument name and value - pass empty object if no args required
    },
    gas: 300000000000000, // attached GAS (optional)
    amount: 1000000000000000000000000 // attached deposit in yoctoNEAR (optional)
  }
);
```

</TabItem>
<TabItem value="view" label="View Method">

```js
const contract = new Contract(account, {
  viewMethods: ["view_method_name"],
  sender: account
});
const response = await contract.view_method_name();
```

</TabItem>
<TabItem value="args" label="View Method w/ args">

```js
const contract = new Contract(account, {
  viewMethods: ["view_method_name"],
  sender: account
});
const response = await contract.view_method_name({ arg_name: "arg_value" });
```

</TabItem>
</Tabs>

[<span class="typedoc-icon typedoc-icon-class"></span> Class `Contract`](https://near.github.io/near-api-js/classes/contract.contract-1.html)

## Transactions {#transactions}

As described in the [Concepts](/concepts/basics/transactions/overview) section, a Transaction is a collection of Actions, and there are few types of Actions.
For every type of Action there is a function on Account that you can use to invoke the Action, but Account also exposes `signAndSendTransaction` function which you can use to build and invoke a batch transaction.  
The table below describes the API you can use for every type of action.



## Utils {#utils}

### NEAR => yoctoNEAR {#near--yoctonear}

```js
// converts NEAR amount into yoctoNEAR (10^-24)

const { utils } = nearAPI;
const amountInYocto = utils.format.parseNearAmount("1");
```

[<span class="typedoc-icon typedoc-icon-function"></span> Function `parseNearAmount`](https://near.github.io/near-api-js/modules/utils_format.html#parsenearamount)

### YoctoNEAR => NEAR {#yoctonear--near}

```js
// converts yoctoNEAR (10^-24) amount into NEAR

const { utils } = nearAPI;
const amountInNEAR = utils.format.formatNearAmount("1000000000000000000000000");
```

[<span class="typedoc-icon typedoc-icon-function"></span> Function `formatNearAmount`](https://near.github.io/near-api-js/modules/utils_format.html#formatnearamount)
