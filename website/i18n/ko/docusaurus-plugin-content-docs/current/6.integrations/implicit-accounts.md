---
id: implicit-accounts
title: 암시적 계정
sidebar_label: 암시적 계정(Implicit Account)
---

## 배경 {#background}

암시적 계정은 Bitcoin/Ethereum 계정과 유사하게 작동합니다.

- They allow you to reserve an account ID before it's created by generating a ED25519 key-pair locally.
- This key-pair has a public key that maps to the account ID.
- The account ID is a lowercase hex representation of the public key.
- An ED25519 Public key contains 32 bytes that maps to 64 characters account ID.
- The corresponding secret key allows you to sign transactions on behalf of this account once it's created on chain.

## [사양](https://nomicon.io/DataStructures/Account.html#implicit-account-ids) {#specifications}

## 로컬에서 계정 만들기 {#creating-an-account-locally}

For the purpose of this demo, we'll use the `betanet` network.

### `betanet` 네트워크 설정 {#set-betanet-network}

```bash
export NEAR_ENV=betanet
```

### 키 쌍 생성 {#generating-a-key-pair-first}

```bash
near generate-key --saveImplicit
```

출력 예시

```
Seed phrase: lumber habit sausage used zebra brain border exist meat muscle river hidden
Key pair: {"publicKey":"ed25519:AQgnQSR1Mp3v7xrw7egJtu3ibNzoCGwUwnEehypip9od","secretKey":"ed25519:51qTiqybe8ycXwPznA8hz7GJJQ5hyZ45wh2rm5MBBjgZ5XqFjbjta1m41pq9zbRZfWGUGWYJqH4yVhSWoW6pYFkT"}
Implicit account: 8bca86065be487de45e795b2c3154fe834d53ffa07e0a44f29e76a2a5f075df8
Storing credentials for account: 8bca86065be487de45e795b2c3154fe834d53ffa07e0a44f29e76a2a5f075df8 (network: testnet)
Saving key to '~/.near-credentials/testnet/8bca86065be487de45e795b2c3154fe834d53ffa07e0a44f29e76a2a5f075df8.json'
```

#### Using the Implicit Account

We can export our account ID to a bash env variable:

```bash
export ACCOUNT="8bca86065be487de45e795b2c3154fe834d53ffa07e0a44f29e76a2a5f075df8"
```

새 계정에서 토큰을 받았다고 가정하면, 다음 명령을 사용하여 이를 전송할 수 있습니다.

```bash
near $ACCOUNT <receiver> <amount>
```

예를 들어, 다음과 같이 `$ACCOUNT`를 실제 계정 ID로 바꿀 수도 있습니다.

```bash
near send 98793cd91a3f870fb126f66285808c7e094afcfc4eda8a970f6648cdf0dbd6de <receiver> <amount>
```

## 암시적 계정으로의 전송 {#transferring-to-the-implicit-account}

Let's say someone gives you their account ID `0861ea8ddd696525696ccf3148dd706c4fda981c64d8a597490472594400c223`. You can just transfer to it by running:

```bash
near send <your_account_id> 0861ea8ddd696525696ccf3148dd706c4fda981c64d8a597490472594400c223 <amount>
```

## 보너스: Python을 사용한 공개 키 변환 (학습용) {#bonus-converting-public-key-using-python-for-learning-purposes}

여기서는 `python3`(`3.5+` 버전)과 `base58` 라이브러리를 사용할 것입니다.

`pip3`을 사용하여 이 라이브러리를 설치할 수 있습니다.

```bash
pip3 install --user base58
```

python3 인터프리터를 시작합니다.

```bash
python3
```

첫 번째는 공개 키에서 데이터 부분을 가져오는 것입니다(`ed25519:` 접두사 없음). 이를 `pk58` 변수에 저장해 보겠습니다.

```python
pk58 = 'BGCCDDHfysuuVnaNVtEhhqeT4k9Muyem3Kpgq2U1m9HX'
```

이제 base58을 가져오겠습니다.

```python
import base58
```

마지막으로 공개 키의 base58 표현을 바이트로 변환한 다음, 16진수로 변환해 보겠습니다.

```python
base58.b58decode(pk58).hex()
```

출력은 다음과 같습니다.

```
'98793cd91a3f870fb126f66285808c7e094afcfc4eda8a970f6648cdf0dbd6de'
```

이는 `near-cli`와 동일한 계정 ID를 제공합니다.

**참고:** `near-cli`에 대한 기본 네트워크는 `testnet`입니다. 이를 `mainnet` 또는 `betanet`으로 바꾸고 싶다면, [`near-cli` 네트워크 선택](/tools/near-cli#network-selection)을 참고하세요.

:::tip 질문이 있으신가요? <a href="https://stackoverflow.com/questions/tagged/nearprotocol"> Ask it on StackOverflow! </a>
:::
