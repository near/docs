---
id: wallet
title: Interacting with the Wallet
sidebar_label: Wallet
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Wallet interaction is possible only in the browser, because NEAR's Wallet is web-based.

Most frequent action is Sign In. Your user is redirected to the Wallet page to authorize your application.
Once the user has Signed In, an access key is saved in browser's LocalStorage.
All following actions that require the access key will be allowed.
In case a user needs to authorize a transaction that has a deposit attached, your user will be automatically redirected to the Wallet again.

### Creating Wallet Connection {#wallet-connection}

In Wallet connection you use a LocalStorage [`KeyStore`](/tools/near-api-js/quick-reference#key-store).

<Tabs>
<TabItem value="testnet" label="TestNet" default>

```js
const { connect, keyStores, WalletConnection } = nearAPI;

const connectionConfig = {
  networkId: "testnet",
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://testnet.mynearwallet.com/",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://testnet.nearblocks.io",
};

// connect to NEAR
const nearConnection = await connect(connectionConfig);

// create wallet connection
// provide a prefix for the key
const walletConnection = new WalletConnection(nearConnection, "example-prefix");
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
  explorerUrl: "https://nearblocks.io",
};

// connect to NEAR
const nearConnection = await connect(connectionConfig);

// create wallet connection
const walletConnection = new WalletConnection(nearConnection);
```

</TabItem>

</Tabs>

[<span className="typedoc-icon typedoc-icon-module"></span> Module `browserConnect`](https://near.github.io/near-api-js/modules/near_api_js.browserConnect.html)
&nbsp;&nbsp;&nbsp;
[<span className="typedoc-icon typedoc-icon-class"></span> Class `WalletConnection`](https://near.github.io/near-api-js/classes/_near_js_wallet_account.walletAccount.WalletConnection.html)

### Ask your user to Sign In {#sign-in}

You first create a [WalletConnection](#wallet-connection), and then call `requestSignIn`.
This will redirect the current page to the Wallet authentication page. You can optionally configure success and failure redirect URLs.

When you create a wallet connection you have the option to create a [function call access key](/concepts/protocol/access-keys#function-call-keys) for a specific contract to be used by your application. This allows the app to automatically sign `non-payable methods` for the user without having to sign each transaction manually in the wallet. You can also decide to specify a list of `methodNames` that will restrict the key to sign only certain methods on the specified contract. Passing an empty array will allow all methods to be signed.

```js
// const walletConnection = new WalletConnection(nearConnection);
// all parameters are optional
walletConnection.requestSignIn({
  contractId: "example-contract.testnet.REPLACE_ME", // optional
  methodNames: [], // optional
  successUrl: "REPLACE_ME://.com/success", // optional redirect URL on success
  failureUrl: "REPLACE_ME://.com/failure", // optional redirect URL on failure
});
```

[<span className="typedoc-icon typedoc-icon-method"></span> Method `WalletConnection.requestSignIn`](https://near.github.io/near-api-js/classes/_near_js_wallet_account.walletAccount.WalletConnection.html#requestSignIn)

:::tip
Sign In is **_not required_** if you are using an alternative key store to local storage, or you are not signing transactions (meaning - you are only calling read-only _view_ methods on a contract)
:::

### Sign Out your user {#sign-out}

```js
// const walletConnection = new WalletConnection(nearConnection);
walletConnection.signOut();
```

[<span className="typedoc-icon typedoc-icon-method"></span> Method `WalletConnection.signOut`](https://near.github.io/near-api-js/classes/_near_js_wallet_account.walletAccount.WalletConnection.html#signOut)

### Check if Signed In {#check-if-signed-in}

```js
// const walletConnection = new WalletConnection(nearConnection);
if (walletConnection.isSignedIn()) {
  // user is signed in
}
```

[<span className="typedoc-icon typedoc-icon-method"></span> Method `WalletConnection.isSignedId`](https://near.github.io/near-api-js/classes/_near_js_wallet_account.walletAccount.WalletConnection.html#isSignedIn)

### Get Wallet Account {#get-authorized-account}

Get the [Account](naj-account.md) your user has signed in with in the Wallet.

#### Get Account ID (as string) {#get-authorized-account-id}

```js
// const walletConnection = new WalletConnection(nearConnection);
const walletAccountId = walletConnection.getAccountId();
```

[<span className="typedoc-icon typedoc-icon-method"></span> Method `WalletConnection.getAccountId`](https://near.github.io/near-api-js/classes/_near_js_wallet_account.walletAccount.WalletConnection.html#getAccountId)

#### Get Account Object {#get-authorized-account-object}

```js
// const walletConnection = new WalletConnection(nearConnection);
const walletAccountObj = walletConnection.account();
```

[<span className="typedoc-icon typedoc-icon-method"></span> Method `WalletConnection.account`](https://near.github.io/near-api-js/classes/_near_js_wallet_account.walletAccount.WalletConnection.html#account)
&nbsp;&nbsp;&nbsp;
[<span className="typedoc-icon typedoc-icon-class"></span> Class `ConnectedWalletAccount`](https://near.github.io/near-api-js/classes/_near_js_wallet_account.walletAccount.ConnectedWalletAccount.html)
