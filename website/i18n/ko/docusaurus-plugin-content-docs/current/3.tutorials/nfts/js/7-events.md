---
id: events
title: 이벤트
sidebar_label: 이벤트
---

import {Github} from "@site/src/components/codetabs"

이 튜토리얼에서는 [이벤트 표준](https://nomicon.io/Standards/Tokens/NonFungibleToken/Event)과 이를 스마트 컨트랙트에서 구현하는 방법에 대해 알아봅니다.

:::caution

JS-SDK는 현재 **[`Alpha`](https://github.com/near/near-sdk-js/releases/)** 버전입니다.

:::

## 소개

시작하려면 [GitHub 레퍼지토리](https://github.com/near-examples/nft-tutorial-js/)에서 `6.royalty` 브랜치로 전환하거나 이전 튜토리얼에서 작업을 계속하십시오.

```bash
git checkout 6.royalty
```

:::tip 이 _이벤트_ 튜토리얼의 완성된 코드를 보려면 `7.events` 브랜치에서 찾을 수 있습니다. :::

## 사용 사례 이해하기 {#understanding-the-use-case}

Have you ever wondered how the wallet knows which NFTs you own and how it can display them in the [collectibles tab](https://testnet.mynearwallet.com//?tab=collectibles)? 원래는 [인덱서](/tools/indexer-for-explorer)가 사용되었으며, 계정에서 `nft_`로 시작하는 모든 함수를 수신했습니다. 그런 다음 이러한 컨트랙트는 당신의 계정에서 NFT 컨트랙트일 가능성이 있는 것으로 표시되었습니다.

수집품 탭으로 이동하면, 지갑은 [열거(Enumeration) 튜토리얼](/tutorials/nfts/js/enumeration)에서 본 `nft_tokens_for_owner` 함수를 사용하여 소유한 NFT 목록에 대한 모든 컨트랙트를 조회합니다.

### 문제 {#the-problem}

컨트랙트에 플래그를 지정하는 이 방법은 각각의 NFT 기반 애플리케이션이 NFT를 발행하거나 전송하는 고유한 방법을 가질 수 있기 때문에, 신뢰할 수 없었습니다. 또한 앱에서 배치 함수를 사용하여 한 번에 많은 토큰을 전송하거나 발행하는 일도 자주 발생합니다.

### 해결책 {#the-solution}

NFT가 전송, 발행 또는 소각될 때마다 스마트 컨트랙트가 이벤트를 생성할 수 있도록 하는 표준이 도입되었습니다. 이 이벤트는 로그 형식이었습니다. 컨트랙트가 함수를 구현하는 방법에 관계없이, 이제 인덱서는 이러한 표준화된 로그를 수신할 수 있습니다.

표준에 따라, NFT가 전송되거나 발행될 때 실행되는 로깅 기능을 구현해야 합니다. 이 경우 컨트랙트는 소각을 지원하지 않으므로, 지금은 이에 대해선 걱정할 필요가 없습니다.

표준에서 로그가 `"EVENT_JSON:"`으로 시작해야 함을 정의하고 있다는 점이 중요합니다. 한편, 로그 구조에는 항상 다음 3가지가 포함되어야 합니다.

- **standard**: 표준의 현재 이름(예: nep171)
- **version**: 사용 중인 표준 버전(예: 1.0.0)
- **event**: 내보내는 이벤트 목록

이벤트 인터페이스는 전송을 기록하는지 발행을 기록하는지에 따라 다릅니다. 두 이벤트에 대한 인터페이스는 아래에 설명되어 있습니다.

**전송 이벤트**:
- *선택 사항* - **authorized_id**: 소유자를 대신하여 전송하도록 승인된 계정입니다.
- **old_owner_id**: NFT의 이전 소유자입니다.
- **new_owner_id**: NFT가 전송되는 새 소유자입니다.
- **token_ids**: 전송 중인 NFT 목록입니다.
- *선택 사항* - **memo**: 이벤트에 포함할 선택적 메시지입니다.

**발행 이벤트**:
- **owner_id**: NFT를 발행받은 소유자입니다.
- **token_ids**: 전송 중인 NFT 목록입니다.
- *선택 사항* - **memo**: 이벤트에 포함할 선택적 메시지입니다.

### 예시 {#examples}

표준에 대한 이해를 돕기 위해 세 가지 시나리오를 살펴보고 로그가 어떻게 표시되는지 살펴보겠습니다.

#### 시나리오 A - 단순한 발행

이 시나리오에서 Benji는 토큰 ID `"team-token"`을 사용하여 Mike에게 NFT를 발행하려고 하고, 메시지를 포함하지 않습니다. 로그는 다음과 같아야 합니다.

```js
EVENT_JSON:{
  "standard": "nep171",
  "version": "1.0.0",
  "event": "nft_mint",
  "data": [
    {"owner_id": "mike.testnet", "token_ids": ["team-token"]}
  ]
}
```

#### 시나리오 B - 일괄 발행

이 시나리오에서 Benji는 일괄 발행을 수행하려고 합니다. 그는 Mike, Damian, Josh 및 Dorian에게 NFT를 발행할 것입니다. Dorian은 두 개의 NFT를 받게 됩니다. 각 토큰 ID `"team-token"`에는 증가하는 숫자가 따라옵니다. 로그는 다음과 같습니다.


```js
EVENT_JSON:{
  "standard": "nep171",
  "version": "1.0.0",
  "event": "nft_mint",
  "data": [
    {"owner_id": "mike.testnet", "token_ids": ["team-token0"]},
    {"owner_id": "damian.testnet", "token_ids": ["team-token1"]},
    {"owner_id": "josh.testnet", "token_ids": ["team-token2"]}
    {"owner_id": "dorian.testnet", "token_ids": ["team-token3", "team-token4"]},
  ]
}
```

#### 시나리오 C - NFT 전송

이 시나리오에서 Mike는 두 팀 토큰을 모두 Josh에게 전송합니다. 로그는 다음과 같아야 합니다.

```js
EVENT_JSON:{
  "standard": "nep171",
  "version": "1.0.0",
  "event": "nft_transfer",
  "data": [
    {"old_owner_id": "mike.testnet", "new_owner_id": "josh.testnet", "token_ids": ["team-token", "team-token0"], "memo": "Go Team!"}
  ]
}
```

## 컨트랙트 수정 {#modifications-to-the-contract}

이 시점에서 최종 목표가 무엇인지 잘 이해하고 있어야 합니다.

### 발행된 토큰 로깅 {#logging-minted-tokens}

컨트랙트는 한 곳에서만 토큰을 발행하기 때문에, 로그를 어디에 두어야 하는지는 간단합니다. `nft-contract/src/mint.ts` 파일을 열고 파일 맨 아래로 이동합니다. 여기에서 발행을 위한 로그를 구성할 수 있습니다. 이제 누군가 성공적으로 NFT를 생성할 때마다 올바르게 로그를 내보낼 것입니다.

```js
// Construct the mint log as per the events standard.
let nftMintLog = {
    // Standard name ("nep171").
    standard: NFT_STANDARD_NAME,
    // Version of the standard ("nft-1.0.0").
    version: NFT_METADATA_SPEC,
    // The data related with the event stored in a vector.
    event: "nft_mint",
    data: [
        {
            // Owner of the token.
            owner_id: token.owner_id,
            // Vector of token IDs that were minted.
            token_ids: [tokenId],
        }
    ]
}

// Log the json.
near.log(`EVENT_JSON:${JSON.stringify(nftMintLog)}`);
```

<Github language="js" start="7" end="85" url="https://github.com/near-examples/nft-tutorial-js/blob/7.events/src/nft-contract/mint.ts" />

### 전송 로깅 {#logging-transfers}

Let's open the `nft-contract/src/internal.ts` file and navigate to the `internalTransfer` function. This is the location where you'll build your transfer logs. Whenever an NFT is transferred, this function is called and so you'll correctly be logging the transfers.

```js
// Construct the transfer log as per the events standard.
let nftTransferLog = {
    // Standard name ("nep171").
    standard: NFT_STANDARD_NAME,
    // Version of the standard ("nft-1.0.0").
    version: NFT_METADATA_SPEC,
    // The data related with the event stored in a vector.
    event: "nft_transfer",
    data: [
        {
            // The optional authorized account ID to transfer the token on behalf of the old owner.
            authorized_id: authorizedId,
            // The old owner's account ID.
            old_owner_id: token.owner_id,
            // The account ID of the new owner of the token.
            new_owner_id: receiverId,
            // A vector containing the token IDs as strings.
            token_ids: [tokenId],
            // An optional memo to include.
            memo,
        }
    ]
}

// Log the serialized json.
near.log(`EVENT_JSON:${JSON.stringify(nftTransferLog)}`);
```
<Github language="js" start="113" end="205" url="https://github.com/near-examples/nft-tutorial-js/blob/7.events/src/nft-contract/internal.ts" />

불행하게도 이 솔루션에는 문제를 일으킬 수 있는 극단적인 케이스가 존재합니다. NFT가 `nft_transfer_call` 함수를 통해 전송되는 경우, `nft_on_transfer` 함수가 `true`를 반환하면 전송이 취소될 가능성이 있습니다. `nft_transfer_call`에 대한 로직을 살펴보면, 이것이 왜 문제인지 알 수 있습니다.

`nft_transfer_call`가 호출되면 다음을 수행합니다.
- 실제 전송 로직을 수행하기 위해 `internalTransfer`를 호출합니다.
- 교차 컨트랙트 호출을 시작하고 `nft_on_transfer` 함수를 호출합니다.
- `internalResolveTransfer`에서 Promise를 해결하고 로직을 수행합니다.
    - 이는 전송이 잘 되었음을 의미하는 true를 반환하거나 전송을 되돌리고 false를 반환합니다.

만약 `internalTransfer` 함수에 로그만 넣으면, 로그가 내보내지고 인덱서는 NFT가 전송된 것으로 간주할 것입니다. 그러나 `internalResolveTransfer` 도중에 전송이 되돌려지면 해당 이벤트도 **역시** 내보내야 합니다. NFT가 전송**될 수 있는** 모든 위치에 로그를 추가해야 합니다. `internalResolveTransfer`를 다음 코드로 바꿉니다.

<Github language="js" start="138" end="242" url="https://github.com/near-examples/nft-tutorial-js/blob/7.events/src/nft-contract/nft_core.ts" />

완료되면 이벤트 표준을 성공적으로 구현한 것이며, 이제 테스트를 시작할 시간입니다.

## 컨트랙트 배포 {#redeploying-contract}

가독성과 개발 용이성을 위해 컨트랙트를 동일한 계정에 재배포하는 대신, 하위 계정을 만들어 배포해 보겠습니다. 이 튜토리얼에서 구현한 변경 사항으로 인해 오류가 발생하지 않았으므로, 동일한 계정에 배포할 수 있습니다.

### 하위 계정(sub-account) 생성

다음 명령을 실행하여 초기 잔액이 25 NEAR인 하위 계정 `events`를 만듭니다.

```bash
near create-account events.$NFT_CONTRACT_ID --masterAccount $NFT_CONTRACT_ID --initialBalance 25
```

다음으로 개발을 쉽게 하기 위해 환경 변수를 내보낼 수 있습니다.

```bash
export EVENTS_NFT_CONTRACT_ID=events.$NFT_CONTRACT_ID
```

빌드 스크립트를 사용하여 이전 튜토리얼에서와 같이 컨트랙트 배포를 빌드합니다.

```bash
yarn build && near deploy --wasmFile build/nft.wasm --accountId $EVENTS_NFT_CONTRACT_ID
```

### 초기화 및 발행 {#initialization-and-minting}

이것은 새로운 컨트랙트이므로, 토큰을 초기화하고 발행해야 합니다. 다음 명령을 사용하여 컨트랙트를 초기화합니다.

```bash
near call $EVENTS_NFT_CONTRACT_ID init '{"owner_id": "'$EVENTS_NFT_CONTRACT_ID'"}' --accountId $EVENTS_NFT_CONTRACT_ID
```

다음으로 토큰을 발행해야 합니다. 이 명령을 실행하면 토큰 ID `"events-token"`로 토큰을 발행하고, 수신자가 새 계정이 됩니다. 또한 토큰이 판매될 때마다 영구 로열티를 받는 두 개의 계정을 포함한 맵을 전달합니다.

```bash
near call $EVENTS_NFT_CONTRACT_ID nft_mint '{"token_id": "events-token", "metadata": {"title": "Events Token", "description": "testing out the new events extension of the standard", "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"}, "receiver_id": "'$EVENTS_NFT_CONTRACT_ID'"}' --accountId $EVENTS_NFT_CONTRACT_ID --amount 0.1
```

CLI에서 출력을 확인하여 모든 것이 제대로 진행되었는지 확인할 수 있습니다.

```bash
Doing account.functionCall()
Receipts: F4oxNfv54cqwUwLUJ7h74H1iE66Y3H7QDfZMmGENwSxd, BJxKNFRuLDdbhbGeLA3UBSbL8UicU7oqHsWGink5WX7S
    Log [events.goteam.examples.testnet]: EVENT_JSON:{"standard":"nep171","version":"1.0.0","event":"nft_mint","data":[{"owner_id":"events.goteam.examples.testnet","token_ids":["events-token"]}]}
Transaction Id 4Wy2KQVTuAWQHw5jXcRAbrz7bNyZBoiPEvLcGougciyk
To see the transaction in the transaction explorer, please open this url in your browser
https://testnet.nearblocks.io/txns/4Wy2KQVTuAWQHw5jXcRAbrz7bNyZBoiPEvLcGougciyk
''
```

이벤트가 제대로 기록된 것을 확인할 수 있습니다!

### 전송 {#transferring}

이제 `benjiman.testnet`에 대해 NFT를 전송하여 전송 로그가 예상대로 작동하는지 테스트할 수 있습니다.

```bash
near call $EVENTS_NFT_CONTRACT_ID nft_transfer '{"receiver_id": "benjiman.testnet", "token_id": "events-token", "memo": "Go Team :)", "approval_id": 0}' --accountId $EVENTS_NFT_CONTRACT_ID --depositYocto 1
```

그러면 다음과 유사한 출력이 반환됩니다.

```bash
Doing account.functionCall()
Receipts: EoqBxrpv9Dgb8KqK4FdeREawVVLWepEUR15KPNuZ4fGD, HZ4xQpbgc8EfU3PiV72LvfXb2f3dVC1n9aVTbQds9zfR
    Log [events.goteam.examples.testnet]: Memo: Go Team :)
    Log [events.goteam.examples.testnet]: EVENT_JSON:{"standard":"nep171","version":"1.0.0","event":"nft_transfer","data":[{"authorized_id":"events.goteam.examples.testnet","old_owner_id":"events.goteam.examples.testnet","new_owner_id":"benjiman.testnet","token_ids":["events-token"],"memo":"Go Team :)"}]}
Transaction Id 4S1VrepKzA6HxvPj3cK12vaT7Dt4vxJRWESA1ym1xdvH
To see the transaction in the transaction explorer, please open this url in your browser
https://testnet.nearblocks.io/txns/4S1VrepKzA6HxvPj3cK12vaT7Dt4vxJRWESA1ym1xdvH
''
```

만세! 이 시점에서 NFT 컨트랙트가 완전히 완료되고 이벤트 표준이 구현되었습니다.

## 결론

오늘 당신은 [이벤트 표준](https://nomicon.io/Standards/Tokens/NonFungibleToken/Event)을 살펴보고, 스마트 컨트랙트에서 필요한 로직을 구현했습니다. NFT [발행](#logging-minted-tokens) 및 [전송](#logging-transfers)을 위한 이벤트를 만들었습니다. 그런 다음 NFT를 만들고 전송하여 변경 사항을 배포하고 [테스트](#initialization-and-minting)했습니다.

다음 튜토리얼에서는 마켓플레이스 컨트랙트의 기본 사항과 컨트랙트 작성 방법을 살펴봅니다.

:::note 문서 버전 관리

이 글을 쓰는 시점에서, 이 예제는 다음 버전에서 작동합니다.

- near-cli: `3.0.0`
- NFT 표준: [NEP171](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core), `1.0.0` 버전
- 이벤트 표준: [NEP297 확장](https://nomicon.io/Standards/Tokens/NonFungibleToken/Event), `1.0.0` 버전

:::
