---
id: wallet
title: 지갑과 상호 작용
sidebar_label: 지갑
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

NEAR의 지갑은 웹 기반이기 때문에, 브라우저에서만 지갑 상호 작용이 가능합니다.

가장 자주 하는 작업은 로그인입니다. 애플리케이션을 인증하기 위해, 사용자는 지갑 페이지로 리디렉션됩니다. 사용자가 로그인하면 액세스 키가 브라우저의 로컬 스토리지에 저장됩니다. 액세스 키가 필요한 모든 다음 작업이 허용됩니다. In case a user needs to authorize a transaction that has a deposit attached, your user will be automatically redirected to the Wallet again.

### 지갑 연결 생성 {#wallet-connection}

지갑 연결에는 LocalStorage [`KeyStore`](/tools/near-api-js/quick-reference#key-store)를 사용합니다.

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
  explorerUrl: "https://nearblocks.io",
};

// connect to NEAR
const nearConnection = await connect(connectionConfig);

// create wallet connection
const walletConnection = new WalletConnection(nearConnection);
```

</TabItem>

</Tabs>

[<span class="typedoc-icon typedoc-icon-module"></span> Module `browserConnect`](https://near.github.io/near-api-js/modules/near_api_js.browserConnect.html) &nbsp;&nbsp;&nbsp; [<span class="typedoc-icon typedoc-icon-class"></span> Class `WalletConnection`](https://near.github.io/near-api-js/classes/_near_js_wallet_account.walletAccount.WalletConnection.html)

### 사용자에게 로그인 요청 {#sign-in}

먼저 [WalletConnection](#wallet-connection)을 생성한 다음, `requestSignIn`를 호출합니다. 그러면 현재 페이지가 지갑 인증 페이지로 리디렉션됩니다. 성공 및 실패 리디렉션 URL을 구성할 수 있습니다.

이 작업은 브라우저의 로컬 스토리지에 저장될 액세스 키를 생성합니다. 선택적으로 액세스 키에 대해 허용할 `methodNames`를 나열할 수도 있습니다. `methodNames`를 지정하지 않거나 빈 배열을 전달하면, 모든 메서드를 호출할 수 있습니다(액세스 키는 모든 메서드를 호출할 수 있는 권한으로 생성됨).

```js
// const walletConnection = new WalletConnection(nearConnection);
walletConnection.requestSignIn({
  contractId: "example-contract.testnet.REPLACE_ME",
  methodNames: [], // optional
  successUrl: "REPLACE_ME://.com/success", // optional redirect URL on success
  failureUrl: "REPLACE_ME://.com/failure", // optional redirect URL on failure
});
```

[<span class="typedoc-icon typedoc-icon-method"></span> `WalletConnection.requestSignIn` 메서드](https://near.github.io/near-api-js/classes/_near_js_wallet_account.walletAccount.WalletConnection.html#requestSignIn)

:::tip 로컬 스토리지에 대한 대체 키 저장소(Key Store)를 사용하거나 트랜잭션에 서명하지 않는 경우, 로그인이 필요하지 않습니다 (즉, 컨트랙트에서 읽기 전용 _view_ 메서드 만 호출함). :::

### 사용자 로그아웃 {#sign-out}

```js
// const walletConnection = new WalletConnection(nearConnection);
walletConnection.signOut();
```

[<span class="typedoc-icon typedoc-icon-method"></span> `WalletConnection.signOut` 메서드](https://near.github.io/near-api-js/classes/_near_js_wallet_account.walletAccount.WalletConnection.html#signOut)

### 로그인 여부 확인 {#check-if-signed-in}

```js
// const walletConnection = new WalletConnection(nearConnection);
if (walletConnection.isSignedIn()) {
  // user is signed in
}
```

[<span class="typedoc-icon typedoc-icon-method"></span> `WalletConnection.isSignedId` 메서드](https://near.github.io/near-api-js/classes/_near_js_wallet_account.walletAccount.WalletConnection.html#isSignedIn)

### 지갑 계정 가져오기 {#get-authorized-account}

사용자가 지갑에서 로그인한 [계정](naj-account.md)을 가져옵니다.

#### 계정 ID 가져오기(문자열) {#get-authorized-account-id}

```js
// const walletConnection = new WalletConnection(nearConnection);
const walletAccountId = walletConnection.getAccountId();
```

[<span class="typedoc-icon typedoc-icon-method"></span> `WalletConnection.getAccountId` 메서드](https://near.github.io/near-api-js/classes/_near_js_wallet_account.walletAccount.WalletConnection.html#getAccountId)

#### 계정 객체 가져오기 {#get-authorized-account-object}

```js
// const walletConnection = new WalletConnection(nearConnection);
const walletAccountObj = walletConnection.account();
```

[<span class="typedoc-icon typedoc-icon-method"></span> Method `WalletConnection.account`](https://near.github.io/near-api-js/classes/_near_js_wallet_account.walletAccount.WalletConnection.html#account) &nbsp;&nbsp;&nbsp; [<span class="typedoc-icon typedoc-icon-class"></span> Class `ConnectedWalletAccount`](https://near.github.io/near-api-js/classes/_near_js_wallet_account.walletAccount.ConnectedWalletAccount.html)
