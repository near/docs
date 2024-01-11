---
sidebar_position: 3
sidebar_label: "시드 문구 로직"
title: "필수 라이브러리부터 시드 문구 로직 구현"
---

# 시드 문구 및 키 파생

우리가 하고자 하는 두 가지 별도의 작업이 있습니다.

1. 사용자가 십자말풀이 퍼즐을 방문할 때 사용자를 위한 임의의 **시드 문구를 생성**합니다. 이것은 그들이 게임에서 이겼을 때 NEAR 계정이 없고, 계정을 만들고자 하는 경우에 사용됩니다. They can then paste this seed phrase into NEAR Wallet afterward to import their account (which is basically like "logging in" and is currently possible at https://testnet.mynearwallet.com/recover-seed-phrase).
2. 십자말풀이 정답을 해싱하는 대신 **키 쌍으로 전환**합니다.

## near-seed-phrase 라이브러리

다음을 사용하여 `near-seed-phrase` 패키지를 프로젝트에 추가할 수 있습니다.

    npm install near-seed-phrase --save

:::note 이 챕터의 코드 스니펫 튜토리얼의 이 시점에서는 의미 있는 동시에 프로젝트에 복사/붙여넣기할 코드 스니펫을 공유하기가 더 어렵습니다.

제공된 스니펫은 작동하는 코드를 찾기에 가장 좋은 위치인 [3장의 완성된 코드](https://github.com/near-examples/crossword-tutorial-chapter-3)구현과 약간 다를 수 있습니다. :::

## 새 계정 생성을 위한 임의의 시드 문구 생성(승자가 아직 계정이 없는 경우)

```js
import { generateSeedPhrase } from 'near-seed-phrase';

// Create a random key in here
let seedPhrase = generateSeedPhrase(); // generateSeedPhrase() returns an object {seedPhrase, publicKey, secretKey}
localStorage.setItem('playerKeyPair', JSON.stringify(seedPhrase));
```

## 정답을 시드 구문으로 파싱

(이 보안 조치는 프론트러닝을 방지합니다.)

```js
import { parseSeedPhrase } from 'near-seed-phrase';
// Get the seed phrase from the completed puzzle. 
// The original puzzle creator would have already called this same function with the same inputs and would have 
// already called `AddKey` on this contract to add the key related to this seed phrase. Here, using this deterministic 
// function, the front-end will automatically generate that same key based on the inputs from the winner.
const seedPhrase = parseSolutionSeedPhrase(data, gridData); // returns a string of space-separated words
// Get the public and private key derived from the seed phrase
const {secretKey, publicKey} = parseSeedPhrase(seedPhrase);

// Set up the account and connection, acting on behalf of the crossword account
const keyStore = new nearAPI.keyStores.InMemoryKeyStore(); // Another type of key
const keyPair = nearAPI.utils.key_pair.KeyPair.fromString(secretKey);
await keyStore.setKey(nearConfig.networkId, nearConfig.contractName, keyPair);
nearConfig.keyStore = keyStore;
const near = await nearAPI.connect(nearConfig);
const crosswordAccount = await near.account(nearConfig.contractName);

// Call the submit_solution method using the discovered function-call access key
let transaction = await crosswordAccount.functionCall(…);
```

마지막 줄은 익숙해 보일 것입니다. 우리는 함수 호출을 하기 위해 `WalletConnection`의 계정을 사용한 것을 제외하고는 지난 장에서 비슷한 일을 했습니다.

이번에는 스니펫의 중간 부분에서 볼 수 있듯이, 브라우저 대신 `InMemoryKeyStore`를 사용합니다.

### 키 저장소(Key Store)

이제 `near-api-js`에서 사용할 수 있는 거의 모든 키 저장소를 사용했습니다.

1. `UnencryptedFileSystemKeyStore` — 초기에 NEAR CLI 명령 `near login`을 사용했을 때, 이는 운영 체제의 홈 디렉토리에 계정에 대한 개인 전체 액세스 키가 포함된 파일을 생성했습니다.
2. `BrowserLocalStorageKeyStore` — 마지막 챕터에서 사용자가 처음 로그인하면, 함수 호출 액세스 키가 브라우저의 로컬 스토리지에 저장됩니다.
3. `InMemoryKeyStore` — 이 챕터에서는 단순히 컴퓨터의 메모리를 사용하여 십자말풀이 정답에서 파생된 개인 키를 저장합니다.

:::tip 여러 개의 키 저장소를 가질 수 있습니다 기술적으로는, `MergeKeyStore`라고 부르는 키 저장소가 또 하나 있습니다.

다양한 디렉토리에서 개인 키를 찾고 싶다고 가정해 보겠습니다. 기본적으로 다른 위치에서 보이는 `UnencryptedFileSystemKeyStore` 키 저장소 목록을 가질 수 있습니다.

둘 이상의 위치에서 개인 키를 찾고 싶다면, `MergeKeyStore`를 사용하세요. :::
