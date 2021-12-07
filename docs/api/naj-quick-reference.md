---
id: naj-quick-reference
title: NEAR-API-JS Quick Reference
sidebar_label: Quick Reference
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


> Here is a collection of the most commonly used methods within [`near-api-js`](https://github.com/near/near-api-js/). For more in-depth look into this library, please reference the [TypeDocs](https://near.github.io/near-api-js/).

## Setup {#setup}

### Install {#install}

```bash
npm i near-api-js
```

### Import {#import}

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

### Key Store {#key-store}

<Tabs>
<TabItem value="browser" label="Using Browser" default>

```js
// creates keyStore using private key in local storage
// *** REQUIRES SignIn using walletConnection.requestSignIn() ***

const { keyStores } = nearAPI;
const keyStore = new keyStores.BrowserLocalStorageKeyStore();
```

</TabItem>
<TabItem value="dir" label="Using Credentials Directory">

```js
// creates a keyStore that searches for keys in .near-credentials
// requires credentials stored locally by using a NEAR-CLI command: `near login` 
// https://docs.near.org/docs/tools/near-cli#near-login

const { keyStores } = nearAPI;
const homedir = require("os").homedir();
const CREDENTIALS_DIR = ".near-credentials";
const credentialsPath = path.join(homedir, CREDENTIALS_DIR);
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);
```

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
const keyStore = new keyStores.InMemoryKeyStore();
keyStore.setKey(NETWORK_ID, ACCOUNT_ID, KeyPair.fromString(credentials.private_key));
```

</TabItem>
<TabItem value="key" label="Using a private key string">

```js
// creates keyStore from a private key string
// you can define your key here or use an environment variable

const { keyStores, KeyPair } = nearAPI;
const keyStore = new keyStores.InMemoryKeyStore();
const PRIVATE_KEY =
  "by8kdJoJHu7uUkKfoaLd2J2Dp1q1TigeWMG123pHdu9UREqPcshCM223kWadm";
// creates a public / private key pair using the provided private key
const keyPair = KeyPair.fromString(PRIVATE_KEY);
// adds the keyPair you created to keyStore
await keyStore.setKey("testnet", "example-account.testnet", keyPair);
```

</TabItem>
</Tabs>

**Note:** Key store is **_not required_** if you are not signing transactions _(using view call methods on a contract)_

### Connect {#connect}

<Tabs>
<TabItem value="testnet" label="TestNet" default>

```js
const { connect } = nearAPI;

const config = {
  networkId: "testnet",
  keyStore, // optional if not signing transactions
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
};
const near = await connect(config);
```

</TabItem>
<TabItem value="mainnet" label="MainNet">

```js
const { connect } = nearAPI;

const config = {
  networkId: "mainnet",
  keyStore, // optional if not signing transactions
  nodeUrl: "https://rpc.mainnet.near.org",
  walletUrl: "https://wallet.mainnet.near.org",
  helperUrl: "https://helper.mainnet.near.org",
  explorerUrl: "https://explorer.mainnet.near.org",
};
const near = await connect(config);
```

</TabItem>
<TabItem value="betanet" label="BetaNet">

```js
const { connect } = nearAPI;

const config = {
  networkId: "betanet",
  keyStore, // optional if not signing transactions
  nodeUrl: "https://rpc.betanet.near.org",
  walletUrl: "https://wallet.betanet.near.org",
  helperUrl: "https://helper.betanet.near.org",
  explorerUrl: "https://explorer.betanet.near.org",
};
const near = await connect(config);
```

</TabItem>
<TabItem value="localnet" label="LocalNet">

```js
const { connect } = nearAPI;
const config = {
  networkId: "local",
  nodeUrl: "http://localhost:3030",
  walletUrl: "http://localhost:4000/wallet",
};
const near = await connect(config);
```

</TabItem>
</Tabs>

## Wallet {#wallet}

### Connection {#connection}

<Tabs>
<TabItem value="testnet" label="TestNet" default>

```js
const { connect, keyStores, WalletConnection } = nearAPI;

const config = {
  networkId: "testnet",
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
};

// connect to NEAR
const near = await connect(config);

// create wallet connection
const wallet = new WalletConnection(near);
```

</TabItem>
<TabItem value="mainnet" label="MainNet">

```js
const { connect, keyStores, WalletConnection } = nearAPI;

const config = {
  networkId: "mainnet",
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: "https://rpc.mainnet.near.org",
  walletUrl: "https://wallet.mainnet.near.org",
  helperUrl: "https://helper.mainnet.near.org",
  explorerUrl: "https://explorer.mainnet.near.org",
};

// connect to NEAR
const near = await connect(config);

// create wallet connection
const wallet = new WalletConnection(near);
```

</TabItem>
<TabItem value="betanet" label="BetaNet">

```js
const { connect, keyStores, WalletConnection } = nearAPI;

const config = {
  networkId: "betanet",
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: "https://rpc.betanet.near.org",
  walletUrl: "https://wallet.betanet.near.org",
  helperUrl: "https://helper.betanet.near.org",
  explorerUrl: "https://explorer.betanet.near.org",
};

// connect to NEAR
const near = await connect(config);

// create wallet connection
const wallet = new WalletConnection(near);
```

</TabItem>
</Tabs>

### Sign In {#sign-in}

```js
// redirects user to wallet to authorize your dApp
// this creates an access key that will be stored in the browser's local storage
// access key can then be used to connect to NEAR and sign transactions via keyStore

const signIn = () => {
  wallet.requestSignIn(
    "example-contract.testnet", // contract requesting access
    "Example App", // optional
    "http://YOUR-URL.com/success", // optional
    "http://YOUR-URL.com/failure" // optional
  );
};
```

**Note:** Sign In is **_not required_** if you are using an alternative key store to local storage **_or_** you are not signing transactions _(using view call methods on a contract)_

### Sign Out {#sign-out}

```js
const signOut = () => {
  wallet.signOut();
};
```

### Check if Signed In {#check-if-signed-in}

```js
if(wallet.isSignedIn()) {
	doSomething();
}
```

### Get Authorized Account Id {#get-authorized-account-id}

```js
// returns account Id as string
const walletAccountId = wallet.getAccountId();
```

### Get Authorized Account Object {#get-authorized-account-object}

```js
// returns account object for transaction signing
const walletAccountObj = wallet.account();
```

## Account {#account}

### Load Account {#load-account}

```js
const near = await connect(config);
const account = await near.account("example-account.testnet");
```

[`config setup`](/docs/api/naj-quick-reference#connect)

### Create Account {#create-account}

```js
// creates a new account using funds from the account used to create it
const near = await connect(config);
const account = await near.account("example-account.testnet");
await account.createAccount(
  "example-account2.testnet", // new account name
  "8hSHprDq2StXwMtNd43wDTXQYsjXcD4MJTXQYsjXcc", // public key for new account
  "10000000000000000000" // initial balance for new account in yoctoNEAR
);
```

[`config setup`](/docs/api/naj-quick-reference#connect)

### Delete Account {#delete-account}

```js
// deletes account found in the `account` object
// transfers remaining account balance to the accountId passed as an argument
const near = await connect(config);
const account = await near.account("example-account.testnet");
await account.deleteAccount("beneficiary-account.testnet");
```

[`config setup`](/docs/api/naj-quick-reference#connect)

### Get Account Balance {#get-account-balance}

```js
// gets account balance
const near = await connect(config);
const account = await near.account("example-account.testnet");
await account.getAccountBalance();
```

[`config setup`](/docs/api/naj-quick-reference#connect)

### Get Account details {#get-account-details}

```js
// gets account details in terms of authorized apps and transactions
const near = await connect(config);
const account = await near.account("example-account.testnet");
await account.getAccountDetails();
```
[`config setup`](/docs/api/naj-quick-reference#connect)

### Deploy a Contract {#deploy-a-contract}

```js
const near = await connect(config);
const account = await near.account("example-account.testnet");
const response = await account.deployContract(fs.readFileSync('./wasm_files/status_message.wasm'));
console.log(response);
```

[`config setup`](#connect)

### Send Tokens {#send-tokens}

```js
// sends NEAR tokens
const near = await connect(config);
const account = await near.account("sender-account.testnet");
await account.sendMoney(
  "receiver-account.testnet", // receiver account
  "1000000000000000000000000" // amount in yoctoNEAR
);
```

[`config setup`](/docs/api/naj-quick-reference#connect)

### State {#state}

```js
// gets the state of the account
const near = await connect(config);
const account = await near.account("example-account.testnet");
const response = await account.state();
console.log(response);
```

[`config setup`](/docs/api/naj-quick-reference#connect)

## Contract {#contract}

### Load Contract {#load-contract}

<Tabs>
<TabItem value="Standard" label="Standard" default>

```js
const contract = new nearAPI.Contract(
  account, // the account object that is connecting
  "example-contract.testnet",
  {
    // name of contract you're connecting to
    viewMethods: ["getMessages"], // view methods do not change state but usually return a value
    changeMethods: ["addMessage"], // change methods modify state
    sender: account, // account object to initialize and sign transactions.
  }
);
```

[`config setup`](/docs/api/naj-quick-reference#connect)

</TabItem>
<TabItem value="wallet" label="Using Wallet">

```js
const contract = new nearAPI.Contract(
  wallet.account(), // the account object that is connecting
  "example-contract.testnet",
  {
    // name of contract you're connecting to
    viewMethods: ["getMessages"], // view methods do not change state but usually return a value
    changeMethods: ["addMessage"], // change methods modify state
    sender: wallet.Account(), // account object to initialize and sign transactions.
  }
);
```

[`config setup`](/docs/api/naj-quick-reference#connect)

</TabItem>
</Tabs>

### Call Contract {#call-contract}

<Tabs>
<TabItem value="method" label="Change Method" default>

```js
await contract.method_name(
  {
    arg_name: "value", // argument name and value - pass empty object if no args required
  },
  300000000000000, // attached GAS (optional)
  1000000000000000000000000 // attached deposit in yoctoNEAR (optional)
);
```

</TabItem>
<TabItem value="view" label="View Method">

```js
const response = await contract.view_method_name();
console.log(response);
```

</TabItem>
<TabItem value="args" label="View Method w/ args">

```js
const response = await contract.view_method_name({ arg_name: "arg_value" });
console.log(response);
```

</TabItem>
</Tabs>

## Access Keys {#access-keys}

### Add Full Access Key {#add-full-access-key}

```js
// takes public key as string for argument
const near = await connect(config);
const account = await near.account("example-account.testnet");
await account.addKey("8hSHprDq2StXwMtNd43wDTXQYsjXcD4MJTXQYsjXcc");
```

[`config setup`](/docs/api/naj-quick-reference#connect)

### Add Function Access Key {#add-function-access-key}

```js
// adds function access key
const near = await connect(config);
const account = await near.account("example-account.testnet");
await account.addKey(
  "8hSHprDq2StXwMtNd43wDTXQYsjXcD4MJTXQYsjXcc", // public key for new account
  "example-account.testnet", // contract this key is allowed to call (optional)
  "example_method", // methods this key is allowed to call (optional)
  "2500000000000" // allowance key can use to call methods (optional)
);
```

[`config setup`](/docs/api/naj-quick-reference#connect)

### Get All Access Keys {#get-all-access-keys}

```js
// returns all access keys associated with an account
const near = await connect(config);
const account = await near.account("example-account.testnet");
await account.getAccessKeys();
```

[`config setup`](/docs/api/naj-quick-reference#connect)

### Delete Access Key {#delete-access-key}

```js
// takes public key as string for argument
const near = await connect(config);
const account = await near.account("example-account.testnet");
await account.deleteKey("8hSHprDq2StXwMtNd43wDTXQYsjXcD4MJTXQYsjXcc");
```

[`config setup`](/docs/api/naj-quick-reference#connect)

## Utils {#utils}

### NEAR => yoctoNEAR {#near--yoctonear}

```js
// converts NEAR amount into yoctoNEAR (10^-24)

const { utils } = nearAPI;
const amountInYocto = utils.format.parseNearAmount("1");
```

### YoctoNEAR => NEAR {#yoctonear--near}

```js
// converts yoctoNEAR (10^-24) amount into NEAR

const { utils } = nearAPI;
const amountInNEAR = utils.format.formatNearAmount("1000000000000000000000000");
```
