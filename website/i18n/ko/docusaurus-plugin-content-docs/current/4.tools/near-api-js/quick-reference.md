---
id: quick-reference
title: JavaScript API를 사용하여 NEAR와 상호 작용
sidebar_label: JavaScript API 사용
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 빠른 참고

- [설치](#install)
- [지갑과의 상호작용](naj-wallet.md)
- [계정](naj-account.md)
- [컨트랙트](naj-contract.md)
- [유틸리티](naj-utils.md)

## `near-api-js`란 무엇인가요?

`near-api-js`는 NEAR 블록체인과 상호 작용하는 완전한 라이브러리입니다. 이는 브라우저 또는 Node.js 런타임에서 사용될 수 있습니다.

일반적으로 [`KeyStore`](#key-store)를 사용한 [`connect`](#connect)로 연결을 생성할 수 있습니다. 연결 객체를 통해, 다음과 같은 것들을 할 수 있습니다.

- 브라우저에서 [지갑](naj-wallet.md)과 상호 작용.
- 다음과 같은 것들을 위해 [계정](naj-account.md) 객체 인스턴스화:
  - 토큰 전송
  - 컨트랙트 배포
  - 계정 검사, 생성 또는 삭제
  - 계정 키 관리
- [컨트랙트](naj-contract.md) 객체를 인스턴스화하여 스마트 컨트랙트 메서드 호출

라이브러리에는 일부 [utils](naj-utils.md) 함수도 포함되어 있습니다.

:::tip To quickly get started with integrating NEAR in a web browser, read our [Web Frontend integration](/build/web3-apps/integrate-contracts) article. :::

:::info `near-api-js`와 `near-sdk-js`의 차이점에 유의하세요:

JavaScript _SDK_ 는 스마트 컨트랙트 개발을 위한 라이브러리입니다. 여기에는 스마트 컨트랙트 코드를 작성하는 데 사용하는 클래스와 함수가 포함되어 있습니다.

JavaScript _API_ 는 NEAR와 상호 작용할 수 있는 모든 가능한 명령을 위한 완전한 라이브러리입니다. 이는 RPC 엔드포인트 래퍼, 브라우저에서 NEAR 지갑과 상호 작용하는 라이브러리, 키 관리 도구입니다. :::

---

## 설치 {#install}

패키지에 `near-api-js`를 의존성(dependency)으로 포함합니다.

```bash
npm i --save near-api-js
```

## Import {#import}

브라우저 또는 Node.js 런타임에서 API 라이브러리를 사용할 수 있습니다. 일부 기능은 여러 환경 중 하나에서만 사용할 수 있습니다. 예를 들어 `WalletConnection`는 브라우저 전용이며, 각 환경마다 서로 다른 `KeyStore` 공급자가 존재합니다.

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

## 키 저장소(Key Store) {#key-store}

트랜잭션에 서명하는 경우 _키 저장소_ 를 생성해야 합니다. 브라우저에서 사용자에게 지갑으로 로그인하도록 요청하면, LocalStorage KeyStore가 사용됩니다.

<Tabs>
<TabItem value="browser" label="Using Browser" default>

```js
// creates keyStore using private key in local storage

const { keyStores } = nearAPI;
const myKeyStore = new keyStores.BrowserLocalStorageKeyStore();
```

[<span className="typedoc-icon typedoc-icon-class"></span> Class `BrowserLocalStorageKeyStore`](https://near.github.io/near-api-js/classes/_near_js_keystores_browser.browser_local_storage_key_store.BrowserLocalStorageKeyStore.html)

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

[<span className="typedoc-icon typedoc-icon-class"></span> Class `UnencryptedFileSystemKeyStore`](https://near.github.io/near-api-js/classes/_near_js_keystores_node.unencrypted_file_system_keystore.UnencryptedFileSystemKeyStore.html)

</TabItem>
<TabItem value="file" label="Using a File">

```js
// creates keyStore from a provided file
// you will need to pass the location of the .json key pair

const { KeyPair, keyStores } = require("near-api-js");
const fs = require("fs");
const homedir = require("os").homedir();

const ACCOUNT_ID = "near-example.testnet"; // NEAR account tied to the keyPair
const NETWORK_ID = "testnet";
// path to your custom keyPair location (ex. function access key for example account)
const KEY_PATH = "/.near-credentials/near-example-testnet/get_token_price.json";

const credentials = JSON.parse(fs.readFileSync(homedir + KEY_PATH));
const myKeyStore = new keyStores.InMemoryKeyStore();
myKeyStore.setKey(
  NETWORK_ID,
  ACCOUNT_ID,
  KeyPair.fromString(credentials.private_key)
);
```

[<span className="typedoc-icon typedoc-icon-class"></span> Class `InMemoryKeyStore`](https://near.github.io/near-api-js/classes/_near_js_keystores.in_memory_key_store.InMemoryKeyStore.html)
&nbsp;&nbsp;&nbsp;
[<span className="typedoc-icon typedoc-icon-class"></span> Class `KeyPair`](https://near.github.io/near-api-js/classes/_near_js_crypto.key_pair.KeyPair.html)

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

[<span className="typedoc-icon typedoc-icon-class"></span> Class `InMemoryKeyStore`](https://near.github.io/near-api-js/classes/_near_js_keystores.in_memory_key_store.InMemoryKeyStore.html)
&nbsp;&nbsp;&nbsp;
[<span className="typedoc-icon typedoc-icon-class"></span> Class `KeyPair`](https://near.github.io/near-api-js/classes/_near_js_crypto.key_pair.KeyPair.html)

</TabItem>
</Tabs>

## NEAR에 연결 {#connect}

`connect`에서 반환된 객체는 API의 모든 명령에 대한 진입점입니다. 트랜잭션에 서명하려면 연결을 만들기 위한 [`KeyStore`](#key-store)가 필요합니다.

<Tabs>
<TabItem value="testnet" label="TestNet" default>

```js
const { connect } = nearAPI;

const connectionConfig = {
  networkId: "testnet",
  keyStore: myKeyStore, // first create a key store
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://testnet.mynearwallet.com/",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://testnet.nearblocks.io",
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
  explorerUrl: "https://nearblocks.io",
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

[<span className="typedoc-icon typedoc-icon-module"></span> `connect` 모듈](https://near.github.io/near-api-js/modules/near_api_js.connect.html)

## RPC Failover

RPC providers can experience intermittent downtime, connectivity issues, or rate limits that cause client transactions to fail. This can be prevented by using the `FailoverRpcProvider` that supports multiple RPC providers.

<Tabs>
<TabItem value="mainnet" label="MainNet">

```js
const jsonProviders = [
  new JsonRpcProvider({
    url: 'https://rpc.mainnet.near.org',
  }),
  new JsonRpcProvider(
    {
      url: 'https://another-rpc.cloud.com',
      headers: { 'X-Api-Key': 'some string' },
    },
    { retries: 3, backoff: 2, wait: 500 }
  ),
];
const provider = new FailoverRpcProvider(jsonProviders);

await connect({
  networkId: 'mainnet',
  provider: provider,
  // this isn't used if `provider` is specified, but is still required for backward compativility
  nodeUrl: 'https://rpc.mainnet.near.org',
});
```

</TabItem>

</Tabs>

[<span className="typedoc-icon typedoc-icon-class"></span> Class `FailoverRpcProvider`](https://near.github.io/near-api-js/classes/near_api_js.providers_failover_rpc_provider.FailoverRpcProvider.html)
