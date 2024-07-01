---
id: events
title: 이벤트
---

import {Github} from "@site/src/components/codetabs"

이 튜토리얼에서는 [이벤트 표준](https://nomicon.io/Standards/Tokens/NonFungibleToken/Event)과 이를 스마트 컨트랙트에서 구현하는 방법에 대해 알아봅니다.

---

## 사용 사례 이해하기 {#understanding-the-use-case}

Have you ever wondered how the wallet knows which NFTs you own and how it can display them in the [collectibles tab](https://testnet.mynearwallet.com/?tab=collectibles)? Originally, an indexer used to listen for any functions calls starting with `nft_` on your account. Have you ever wondered how the wallet knows which NFTs you own and how it can display them in the [collectibles tab](https://testnet.mynearwallet.com//?tab=collectibles)?

When you navigated to your collectibles tab, the wallet would then query all those contracts for the list of NFTs you owned using the `nft_tokens_for_owner` function you saw in the [enumeration tutorial](3-enumeration.md).

<hr class="subsection" />

### 문제 {#the-problem}

컨트랙트에 플래그를 지정하는 이 방법은 각각의 NFT 기반 애플리케이션이 NFT를 발행하거나 전송하는 고유한 방법을 가질 수 있기 때문에, 신뢰할 수 없었습니다. 또한 앱에서 배치 함수를 사용하여 한 번에 많은 토큰을 전송하거나 발행하는 일도 자주 발생합니다.

<hr class="subsection" />

### 해결책 {#the-solution}

NFT가 전송, 발행 또는 소각될 때마다 스마트 컨트랙트가 이벤트를 생성할 수 있도록 하는 표준이 도입되었습니다. 이 이벤트는 로그 형식이었습니다. 컨트랙트가 이 기능을 구현하는 방법에 관계없이, 이제 인덱서는 이러한 표준화된 로그를 수신할 수 있습니다.

표준에 따라, NFT가 전송되거나 발행될 때 실행되는 로깅 기능을 구현해야 합니다. 이 경우 컨트랙트는 소각을 지원하지 않으므로, 지금은 이에 대해선 걱정할 필요가 없습니다.

표준은 로그가 `"EVENT_JSON:"`으로 시작해야 함을 정의하고 있다는 점이 중요합니다. 한편, 로그 구조에는 항상 다음 3가지가 포함되어야 합니다.

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

<hr class="subsection" />

### 예시 {#examples}

표준에 대한 이해를 돕기 위해 세 가지 시나리오를 살펴보고 로그가 어떻게 표시되는지 살펴보겠습니다.

#### 시나리오 A - 단순한 발행

이 시나리오에서 Benji는 토큰 ID `"team-token"`을 사용하여 Mike에게 NFT를 발행하려고 하고, 메시지를 포함하지 않습니다. 로그는 다음과 같아야 합니다.

```rust
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


```rust
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

```rust
EVENT_JSON:{
  "standard": "nep171",
  "version": "1.0.0",
  "event": "nft_transfer",
  "data": [
    {"old_owner_id": "mike.testnet", "new_owner_id": "josh.testnet", "token_ids": ["team-token", "team-token0"], "memo": "Go Team!"}
  ]
}
```

---

## 컨트랙트 수정 {#modifications-to-the-contract}

이 시점에서 최종 목표가 무엇인지 잘 이해하고 있어야 합니다. Open the repository and create a new file in the `nft-contract-basic/src` directory called `events.rs`. 이는 로그 구조체가 존재하는 위치입니다.

If you wish to see the finished code of the events implementation, that can be found on the `nft-contract-events` folder.

### 이벤트 파일 생성 {#events-rs}

다음을 파일에 복사합니다. 이는 `EventLog`, `NftMintLog`, 및 `NftTransferLog`에 대한 구조체의 개요를 설명합니다. 또한, `EVENT_JSON:`에 대해 `EventLog`를 로그할 때마다 접두사가 붙도록 하는 방법도 추가했습니다.

<Github language="rust" start="1" end="79" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-events/src/events.rs" />

This requires the `serde_json` package which you can easily add to your `nft-contract-skeleton/Cargo.toml` file:

<Github language="rust" start="10" end="12" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-events/Cargo.toml" />

<hr class="subsection" />

### 모듈 및 상수 추가 {#lib-rs}

이제 새 파일을 만들었으므로 `lib.rs` 파일에 모듈을 추가해야 합니다. 또한 컨트랙트 전체에서 사용될 표준 및 버전에 대해 두 개의 상수를 정의할 수 있습니다.

<Github language="rust" start="10" end="30" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-events/src/lib.rs" />

<hr class="subsection" />

### 발행된 토큰 로깅 {#logging-minted-tokens}

이제 모든 도구가 제자리에 설정되었으므로 이제 실제 로깅 기능을 구현할 수 있습니다. Since the contract will only be minting tokens in one place, open the `nft-contract-basic/src/mint.rs` file and navigate to the bottom of the file. 여기에서 발행을 위한 로그를 구성할 수 있습니다. 누군가 성공적으로 NFT를 생성할 때마다 이제 올바르게 로그를 내보낼 것입니다.

<Github language="rust" start="5" end="58" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-events/src/mint.rs" />

<hr class="subsection" />

### 전송 로깅 {#logging-transfers}

Let's open the `nft-contract-basic/src/internal.rs` file and navigate to the `internal_transfer` function. 여기가 전송 로그를 작성할 위치입니다. NFT가 전송될 때마다 이 함수가 호출되므로, 이제 전송을 올바르게 기록하게 됩니다.

<Github language="rust" start="96" end="159" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-events/src/internal.rs" />

불행하게도 이 솔루션에는 문제를 일으킬 수 있는 극단적인 경우가 있습니다. NFT가 `nft_transfer_call` 함수를 통해 전송되는 경우, `nft_on_transfer` 함수가 `true`를 반환하면 전송이 취소될 가능성이 있습니다. `nft_transfer_call`에 대한 로직을 살펴보면, 이것이 왜 문제인지 알 수 있습니다.

`nft_transfer_call`가 호출되면 다음을 수행합니다.
- 실제 전송 로직을 수행하기 위해 `internalTransfer`를 호출합니다.
- 교차 컨트랙트 호출(cross-contract call)을 시작하고 `nft_on_transfer` 함수를 호출합니다.
- `nft_resolve_transfer`에서 Promise를 해결하고 로직을 수행합니다
    - 이는 전송이 잘 되었음을 의미하는 true를 반환하거나 전송을 되돌리고 false를 반환합니다.

만약 `internal_transfer` 함수에 로그만 넣으면, 로그가 내보내지고 인덱서는 NFT가 전송된 것으로 간주할 것입니다. 그러나 `nft_resolve_transfer` 도중에 전송이 되돌려지면 해당 이벤트도 **역시** 내보내야 합니다. NFT가 전송**될 수 있는** 모든 위치에 로그를 추가해야 합니다. `nft_resolve_transfer`를 다음 코드로 바꿉니다.

<Github language="rust" start="157" end="241" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-events/src/nft_core.rs" />

또한 다음과 같이 `nft_resolve_transfer`에 대해 매개변수에 `authorized_id`와 `memo`를 추가해야 합니다.

:::tip

We will talk more about this [`authorized_id`](./5-approval.md) in the following chapter.

:::

<Github language="rust" start="43" end="60" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-events/src/nft_core.rs" />


마지막 단계는 다음 새 매개변수를 포함하도록 `nft_transfer_call` 로직을 수정하는 것입니다.

<Github language="rust" start="86" end="135" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-events/src/nft_core.rs" />

완료되면 이벤트 표준을 성공적으로 구현한 것이며, 이제 테스트를 시작할 시간입니다.

---

## 컨트랙트 배포 {#redeploying-contract}

For the purpose of readability and ease of development, instead of redeploying the contract to the same account, let's create an account and deploy to that instead. 이 튜토리얼에서 구현한 변경 사항으로 인해 오류가 발생하지 않았으므로, 동일한 계정에 배포했을 수 있습니다.

### Deployment

Next, you'll deploy this contract to the network.

```bash
export EVENTS_NFT_CONTRACT_ID=<accountId>
near account create-account sponsor-by-faucet-service $EVENTS_NFT_CONTRACT_ID autogenerate-new-keypair save-to-legacy-keychain network-config testnet create
```

Using the cargo-near, deploy and initialize the contract as you did in the previous tutorials:

```bash
cargo near deploy $EVENTS_NFT_CONTRACT_ID with-init-call new_default_meta json-args '{"owner_id": "'$EVENTS_NFT_CONTRACT_ID'"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' network-config testnet sign-with-keychain send
```

<hr class="subsection" />

### Minting {#minting}

다음으로 토큰을 발행해야 합니다. 이 명령을 실행하면 토큰 ID `"events-token"`로 토큰을 발행하고, 수신자가 새 계정이 됩니다. 또한 토큰이 판매될 때마다 영구 로열티를 받는 두 개의 계정을 포함한 맵을 전달합니다.

```bash
near contract call-function as-transaction $EVENTS_NFT_CONTRACT_ID nft_mint json-args '{"token_id": "events-token", "metadata": {"title": "Events Token", "description": "testing out the new events extension of the standard", "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"}, "receiver_id": "'$EVENTS_NFT_CONTRACT_ID'"}' prepaid-gas '100.0 Tgas' attached-deposit '0.1 NEAR' sign-as $EVENTS_NFT_CONTRACT_ID network-config testnet sign-with-legacy-keychain send
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

<hr class="subsection" />

### 전송 {#transferring}

이제 `benjiman.testnet`에 대해 NFT를 전송하여 전송 로그가 예상대로 작동하는지 테스트할 수 있습니다.

```bash
near contract call-function as-transaction $EVENTS_NFT_CONTRACT_ID nft_transfer json-args '{"receiver_id": "benjiman.testnet", "token_id": "events-token", "memo": "Go Team :)", "approval_id": 0}' prepaid-gas '100.0 Tgas' attached-deposit '1 yoctoNEAR' sign-as $EVENTS_NFT_CONTRACT_ID network-config testnet sign-with-legacy-keychain send
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

---

## 결론

오늘 당신은 [이벤트 표준](https://nomicon.io/Standards/NonFungibleToken/Event.html)을 살펴보고, 스마트 컨트랙트에서 필요한 로직을 구현했습니다. NFT [발행](#logging-minted-tokens) 및 [전송](#logging-transfers)을 위한 이벤트를 만들었습니다. 그런 다음 NFT를 만들고 전송하여 변경 사항을 배포하고 [테스트](#initialization-and-minting)했습니다.

In the [next tutorial](8-marketplace.md), you'll look at the basics of a marketplace contract and how it was built.

:::note 문서 버전 관리

글을 작성하는 시점에서, 해당 예제는 다음 버전에서 작동합니다.

- rustc: `1.77.1`
- near-cli-rs: `0.11.0`
- cargo-near `0.6.1`
- NFT standard: [NEP171](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core), version `1.0.0`
- Events standard: [NEP297 extension](https://nomicon.io/Standards/Tokens/NonFungibleToken/Event), version `1.1.0`

:::
