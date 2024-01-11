---
id: implicit-accounts
title: 암시적 계정(Implicit Account)
sidebar_label: 암시적 계정
---

## 배경 {#background}

암시적 계정은 Bitcoin/Ethereum 계정과 유사하게 작동합니다.
 - 로컬에서 ED25519 키 쌍을 생성하여 계정을 생성하기 전에 계정 ID를 예약할 수 있습니다.
 - 이 키 쌍에는 계정 ID에 매핑되는 공개 키가 있습니다.
 - 계정 ID는 공개 키의 소문자 16진수 표현입니다.
 - ED25519 공개 키에는 64자의 계정 ID에 매핑되는 32바이트가 포함되어 있습니다.
 - 이에 해당하는 비밀 키를 사용하면 체인에 생성된 계정을 대신하여 트랜잭션에 서명할 수 있습니다.

## [사양](https://nomicon.io/DataStructures/Account.html#implicit-account-ids) {#specifications}

## 로컬에서 계정 만들기 {#creating-an-account-locally}

For the purpose of this demo, we'll use the `betanet` network.

### `betanet` 네트워크 설정 {#set-betanet-network}

```bash
export NEAR_ENV=betanet
```

### 키 쌍 생성 {#generating-a-key-pair-first}

```bash
near generate-key tmp1
```

출력 예시
```
Generated key pair with ed25519:BGCCDDHfysuuVnaNVtEhhqeT4k9Muyem3Kpgq2U1m9HX public key
```

계정 ID `tmp1`에 대한 키 쌍을 생성합니다. 새 공개 키는 `ed25519:BGCCDDHfysuuVnaNVtEhhqeT4k9Muyem3Kpgq2U1m9HX`입니다.

NEAR 공개 키를 문자열로 표현하면 `<curve>:<data>`와 같습니다.
- 타원 곡선은 `ed25519` 아니면 `secp256k1`입니다. 암시적 계정의 경우, `ed25519`만 지원됩니다.
- Data는 공개 키의 base58 인코딩입니다. `ed25519`에서 이는 32바이트의 크기를 가집니다.

이 명령을 통해, 로컬에서 키 쌍을 생성하고 아래 위치에 로컬로 저장했습니다.
```
~/.near-credentials/betanet/tmp1.json
```

### 키 쌍 보기 {#viewing-the-key-pair}

다음 명령을 실행하여 키 쌍 파일의 내용을 출력합니다.
```bash
cat ~/.near-credentials/betanet/tmp1.json
```

내용은 다음과 같습니다.
```json
{"account_id":"tmp1","public_key":"ed25519:BGCCDDHfysuuVnaNVtEhhqeT4k9Muyem3Kpgq2U1m9HX","private_key":"ed25519:4qAABW9HfVW4UNQjuQAaAWpB21jqoP58kGqDia18FZDRat6Lg6TLWdAD9FyvAd3PPQLYF4hhx2mZAotJudVjoqfs"}
```

보시다시피, 이는 유효한 json 파일이고, 공개 키는 우리가 생성한 것과 일치합니다. 해당 `private_key`는 키 쌍의 비밀/개인 키로, 이에 대응되는 공개 키로 트랜잭션에 서명하는 데 사용할 수 있습니다.

### 공개 키를 계정 ID로 변환 {#converting-a-public-key-to-an-account-id}

NEAR 문자열 표현 `ed25519:BGCCDDHfysuuVnaNVtEhhqeT4k9Muyem3Kpgq2U1m9HX`을 공개 키로 변환해 보겠습니다.

가장 쉬운 방법은 대화형 콘솔 `repl`과 함꼐 `near-cli`를 사용하는 것입니다.

1) `near repl`을 시작합니다.
```bash
near repl
```

2) base58 공개 키를 로컬 상수에 저장합니다.
```javascript
const pk58 = 'ed25519:BGCCDDHfysuuVnaNVtEhhqeT4k9Muyem3Kpgq2U1m9HX'
```

3) 이제 공개 키를 구문 분석하고, 다음과 같은 한 줄을 통해 이를 16진수로 변환해 보겠습니다.
```javascript
nearAPI.utils.PublicKey.fromString(pk58).data.toString('hex')
```

출력되는 문자열은 16진수(`'` 없이)의 계정 ID입니다.
```javascript
'98793cd91a3f870fb126f66285808c7e094afcfc4eda8a970f6648cdf0dbd6de'
```

이제 새 계정 ID는 `98793cd91a3f870fb126f66285808c7e094afcfc4eda8a970f6648cdf0dbd6de`입니다.

4) 이제 이 계정 ID를 누군가에게 주고 토큰 전송을 요청할 수 있습니다.

### 임시 키 쌍 이동 {#moving-the-temporary-key-pair}

마지막으로 실제 계정 ID로 `tmp1.json` 키 쌍을 옮겨서, `near-cli`가 트랜잭션 서명에 키 쌍을 사용할 수 있도록 해야 합니다.

먼저 계정 ID를 bash 환경 변수로 내보내겠습니다.
```bash
export ACCOUNT="98793cd91a3f870fb126f66285808c7e094afcfc4eda8a970f6648cdf0dbd6de"
```

이제 `tmp1.json` 파일을 이동할 수 있습니다.
```bash
mv ~/.near-credentials/betanet/tmp1.json ~/.near-credentials/betanet/$ACCOUNT.json
```

*참고: `.json` 키 쌍 파일은 아직 `"account_id":"tmp1"`를 가지고 있지만, 괜찮습니다. `near-cli`는 이를 신경쓰지 않을 것입니다.*

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

:::tip 질문이 있으신가요?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol"> Ask it on StackOverflow! </a>
:::
