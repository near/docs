---
id: near-api-js
title: near-api-js
sidebar_label: API Library
---


### Docs:
https://near.github.io/near-api-js/
### Repo:
https://github.com/near/near-api-js/

### Boilerplate with near-api-js examples for React, Jest and Node
https://github.com/near-apps/nearbp

### Quickstart Snippets for Node / Browser

**Node**
```js
const nearAPI = require('near-api-js');
```

**Browser / Babel**
```js
import * as nearAPI from 'near-api-js';
```

**Destructuring (recommended)**
```js
const {
    Near, Account, Contract, KeyPair,
    keyStores: { InMemoryKeyStore },
} = nearAPI;
```

**Sample Testnet Config**
```js
const contractName = [YOUR DEV ACCOUNT ID]
let config = {
    networkId: 'default',
    nodeUrl: 'https://rpc.testnet.near.org',
    walletUrl: 'https://wallet.testnet.near.org',
    helperUrl: 'https://helper.testnet.near.org',
    contractName,
};
```

**Make a Connection with Dev Credentials for Contract (Node)**
```js
const credentials = JSON.parse(fs.readFileSync(process.env.HOME + '/.near-credentials/default/' + contractName + '.json'));
const keyStore = new InMemoryKeyStore()
keyStore.setKey(networkId, contractName, KeyPair.fromString(credentials.private_key));
const near = new Near({
	networkId, nodeUrl,
	deps: { keyStore },
});

```
**Make a Connection (Browser)**
```js
const { networkdId, nodeUrl, }
const near = new Near({
    networkId, nodeUrl, walletUrl, deps: { keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore() }
});
```

**Ask the User to Sign In using Wallet instance (Browser)**
```js
const wallet = new nearAPI.WalletAccount(near);
wallet.requestSignIn(contractName);
```

**Check if Wallet is Signed In (Browser)**
```js
const wallet = new nearAPI.WalletAccount(near);
wallet.signedIn = wallet.isSignedIn();
let account;
if (wallet.signedIn) {
    account = wallet.account();
}
```

**Get an Instance of a Contract**
```js
const contractMethods = {
    viewMethods: ['get_balance'],
    changeMethods: ['transfer']
}
const contract = new Contract(Account, contractName, contractMethods);
```
