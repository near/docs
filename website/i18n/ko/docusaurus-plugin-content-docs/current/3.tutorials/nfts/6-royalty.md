---
id: royalty
title: 로열티
sidebar_label: 로열티
---

import {Github} from "@site/src/components/codetabs"

이 튜토리얼에서는 NFT(Non-Fungible Token) 스마트 컨트랙트를 계속 구축하고, NFT에 영구 로열티를 구현하는 방법을 배웁니다. 이를 통해 사람들은 NFT가 판매될 때 구매 가격의 일정 비율을 얻을 수 있습니다.

## 소개

지금쯤이면 로열티 지원을 제외하고는 완전한 NFT 컨트랙트가 있어야 합니다. 시작하려면 [GitHub 레퍼지토리](https://github.com/near-examples/nft-tutorial-js/)에서 `5.approval` 브랜치로 전환하거나 이전 튜토리얼에서 작업을 계속하세요.

```bash
git checkout 5.approval
```

:::tip 이 _로열티_ 튜토리얼의 완성된 코드를 보려면, `6.royalty` 브랜치를 확인해 보세요. :::

## 문제에 대한 생각

로열티 기능을 구현하려면, 먼저 NFT 판매 방식을 이해해야 합니다. 이전 튜토리얼에서는, NFT를 가진 사람이 적절하게 디코딩할 수 있는 메시지를 전달하여 `nft_approve` 함수를 통해 마켓플레이스에 NFT를 리스팅하는 것을 보았습니다. 사용자가 마켓플레이스에서 NFT를 구매하면 어떤 일이 일어나나요?

지금 가지고 있는 지식을 사용했을 때의 합리적인 결론은, 마켓플레이스가 교차 컨트랙트 호출을 수행하여 NFT를 구매자에게 전송하고, NFT 컨트랙트의 `nft_transfer` 메서드를 호출하는 것입니다. 해당 함수가, 완료되면 마켓플레이스는 구매자가 지불한 정확한 금액을 판매자에게 지불합니다.

이제 판매자가 아닌 다른 계정으로 가는 금액을 삭감할 수 있도록 확장할 수 있는 방법에 대해 생각해 보겠습니다.

### 현재 솔루션 확장

영구 로열티는 토큰 기준이므로,  `Token` 및 `JsonToken` 구조체를 변경해야 한다고 가정하는 것이 안전합니다. 즉, 로열티가 있는 각 계정이 가져가는 비율을 추적할 수 있는 방법이 필요합니다. 정수에 계정을 연결하는 맵을 도입하면, 효과가 있을 것입니다.

이제 해당 정보를 마켓플레이스에 전달할 메서드가 필요합니다. 이 메서드는 이전 솔루션과 똑같이 NFT를 전송할 수 있어야 하지만, 마켓플레이스가 정확히 어떤 계정에 어떤 금액을 지불해야 하는지 알려주는 데에서 추가적인 이점이 있습니다. NFT를 전송하는 메서드를 구현한 다음, 전달된 잔액을 기준으로 정확히 어떤 계정이 지불되고 얼마의 금액을 지불하는지 계산하면 됩니다.

이는 [로열티 표준](https://nomicon.io/Standards/NonFungibleToken/Payout)이 설명하는 것입니다. 이제 이 동작을 도입하기 위해 스마트 컨트랙트로 이동하여 수정하겠습니다.

## 컨트랙트 수정

가장 먼저 해야 할 일은 로열티 정보를 구조체에 추가하는 것입니다. `nft-contract/src/metadata.rs` 파일을 열고, `Token` 및 `JsonToken` 구조체에 `royalty`를 추가합니다.

```rust
pub royalty: HashMap<AccountId, u32>,
```

두 번째로, `JsonToken` 구조체에도 `royalty`를 추가합니다.

```rust
pub royalty: HashMap<AccountId, u32>,
```

### 내부 헬퍼 함수

**royalty_to_payout**

지급액 계산을 단순화하기 위해, 헬퍼 함수 `royalty_to_payout`을 `src/internal.rs`에 추가해 보겠습니다. 이는 백분율로 표현된 수치를 지불해야 하는 실제 금액으로 변환될 것입니다. 1% 미만의 백분율을 허용하려면 100% 값을 `10,000`으로 설정할 수 있습니다. 이는 당신이 제공할 수 있는 최소 비율이 0.01% 또는 `1`임을 의미합니다. 예를 들어, 계정이 20%의 영구 로열티를 가지도록 하려면 지급 맵에 `"benji.testnet": 2000`이라는 페어를 삽입하면 됩니다.

<Github language="rust" start="5" end="8" url="https://github.com/near-examples/nft-tutorial/tree/6.royalty/nft-contract/src/internal.rs" />

If you were to use the `royalty_to_payout` function and pass in `2000` as the `royalty_percentage` and an `amount_to_pay` of 1 NEAR, it would return a value of 0.2 NEAR.

### 로열티

**nft_payout**

Let's now implement a method to check what accounts will be paid out for an NFT given an amount, or balance. Open the `nft-contract/src/royalty.rs` file, and modify the `nft_payout` function as shown.

<Github language="rust" start="22" end="60" url="https://github.com/near-examples/nft-tutorial/blob/6.royalty/nft-contract/src/royalty.rs" />

이 함수는 토큰의 로열티 맵을 반복하여 잔액을 가져와, 이전에 생성한 `royalty_to_payout` 함수를 통해 잔액을 지불금으로 변환합니다. 이는 총 로열티에서 남은 금액을 토큰 소유자에게 제공할 것입니다. 그 예시로,

다음과 같이 로열티 필드가 있는 토큰이 있습니다.

```rust
Token {
    owner_id: "damian",
    royalty: {
        "benji": 1000,
        "josh": 500,
        "mike": 2000
    }
}
```

사용자가 `nft_payout` 토큰을 호출하고 1 NEAR의 금액을 전달하는 경우, 토큰의 로열티 필드를 반복하고 지불 객체에 다음을 삽입합니다.

```rust
Payout {
    payout: {
        "benji": 0.1 NEAR,
        "josh": 0.05 NEAR,
        "mike": 0.2 NEAR
    }
}
```

맨 마지막에, 이는 `damian`을 지불 객체에 삽입하고, 그에게 `1 NEAR - 0.1 - 0.05 - 0.2 = 0.65 NEAR`를 전달할 것입니다.

**nft_transfer_payout**

지불금 계산 방법을 알았으므로, 이제 NFT를 전송하고 지불금을 마켓플레이스에 반환하는 함수를 만들 차례입니다.

<Github language="rust" start="64" end="125" url="https://github.com/near-examples/nft-tutorial/tree/6.royalty/nft-contract/src/royalty.rs" />

### 영구 로열티

영구 로열티에 대한 지원을 추가하기 위해, `src/mint.rs` 파일을 편집해 보겠습니다. 먼저 영구 로열티에 대한 선택적인 매개변수를 추가합니다. 이는 NFT를 구매할 때 어떤 계정으로 가는 비율을 결정하는 것입니다. 또한 `Token` 객체에 넣을 로열티를 생성하고 삽입해야 합니다.

<Github language="rust" start="6" end="60" url="https://github.com/near-examples/nft-tutorial/blob/6.royalty/nft-contract/src/mint.rs" />

그런 다음 CLI를 사용하여 새 `nft_payout` 함수를 쿼리하고 제대로 작동하는지 확인할 수 있습니다.

### 구조체 구현에 로열티 객체 추가

`Token` 및 `JsonToken` 구조체에 새 필드를 추가했으므로, 이에 따라 구현을 편집해야 합니다. `nft-contract/src/internal.rs` 파일로 이동해서, 새 `Token` 객체를 만드는 `internal_transfer` 함수 부분을 편집합니다.

<Github language="rust" start="189" end="197" url="https://github.com/near-examples/nft-tutorial/blob/6.royalty/nft-contract/src/internal.rs" />

완료되면 `nft-contract/src/nft_core.rs` 파일로 이동합니다. 거기서 `nft_token`의 구현을 수정해서, `JsonToken`가 새 로열티 정보를 다시 보내도록 해야 합니다.

<Github language="rust" start="147" end="164" url="https://github.com/near-examples/nft-tutorial/blob/6.royalty/nft-contract/src/nft_core.rs" />

## 컨트랙트 배포 {#redeploying-contract}

이전 튜토리얼에서 본 것처럼, 이와 같은 변경 사항을 추가하면 재배포할 때 문제가 발생합니다. 이러한 변경 사항은 다른 모든 토큰에 영향을 미치고, 상태는 새 코드에 의해 자동으로 상속될 수 없기 때문에 단순히 컨트랙트를 재배포하면 오류가 발생합니다. For this reason, you'll create a new account again.

### Deployment

Next, you'll deploy this contract to the network.

```bash
export ROYALTY_NFT_CONTRACT_ID=<accountId>
near create-account $ROYALTY_NFT_CONTRACT_ID --useFaucet
```

빌드 스크립트를 사용하여 이전 튜토리얼에서와 같이 컨트랙트 배포를 빌드합니다.

```bash
yarn build && near deploy $ROYALTY_NFT_CONTRACT_ID out/main.wasm
```

### 초기화 및 발행 {#initialization-and-minting}

이는 새로운 컨트랙트이므로 토큰을 초기화하고 발행해야 합니다. 다음 명령을 사용하여 컨트랙트를 초기화합니다.

```bash
near call $ROYALTY_NFT_CONTRACT_ID new_default_meta '{"owner_id": "'$ROYALTY_NFT_CONTRACT_ID'"}' --accountId $ROYALTY_NFT_CONTRACT_ID
```

다음으로 토큰을 발행해야 합니다. 이 명령을 실행하면 토큰 ID `"royalty-token"`로 토큰이 발행되고, 수신자가 새 계정이 됩니다. 또한 토큰이 판매될 때마다 영구 로열티를 받는 두 개의 계정을 포함한 맵을 전달합니다.

```bash
near call $ROYALTY_NFT_CONTRACT_ID nft_mint '{"token_id": "royalty-token", "metadata": {"title": "Royalty Token", "description": "testing out the new royalty extension of the standard", "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"}, "receiver_id": "'$ROYALTY_NFT_CONTRACT_ID'", "perpetual_royalties": {"benjiman.testnet": 2000, "mike.testnet": 1000, "josh.testnet": 500}}' --accountId $ROYALTY_NFT_CONTRACT_ID --amount 0.1
```

열거(Enumeration) 함수 중 하나를 호출하여 모든 것이 제대로 진행되었는지 확인할 수 있습니다.

```bash
near view $ROYALTY_NFT_CONTRACT_ID nft_tokens_for_owner '{"account_id": "'$ROYALTY_NFT_CONTRACT_ID'", "limit": 10}'
```

그러면 다음과 유사한 출력이 반환됩니다.

```json
[
  {
    "token_id": "royalty-token",
    "owner_id": "royalty.goteam.examples.testnet",
    "metadata": {
      "title": "Royalty Token",
      "description": "testing out the new royalty extension of the standard",
      "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif",
      "media_hash": null,
      "copies": null,
      "issued_at": null,
      "expires_at": null,
      "starts_at": null,
      "updated_at": null,
      "extra": null,
      "reference": null,
      "reference_hash": null
    },
    "approved_account_ids": {},
    "royalty": {
      "josh.testnet": 500,
      "benjiman.testnet": 2000,
      "mike.testnet": 1000
    }
  }
]
```

이제 이 NFT의 전체 매출의 35%를 합산한 3개의 계정을 포함하는 로열티 필드가 어떻게 생겼는지 확인해 보실까요? 작동하는 것 같습니다! 화이팅 :)

### NFT 지급

Let's calculate the payout for the `"royalty-token"` NFT, given a balance of 100 yoctoNEAR. `nft_payout` 함수로 전달되는 금액이 yoctoNEAR 단위로 표시될 것으로 예상된다는 점에 유의하는 것이 중요합니다.

```bash
near view $ROYALTY_NFT_CONTRACT_ID nft_payout '{"token_id": "royalty-token", "balance": "100", "max_len_payout": 100}'
```

이 명령은 다음과 유사한 출력을 반환해야 합니다.

```bash
{
  payout: {
    'josh.testnet': '5',
    'royalty.goteam.examples.testnet': '65',
    'mike.testnet': '10',
    'benjiman.testnet': '20'
  }
}
```

NFT가 100 yoctoNEAR에 판매된 경우, josh는 5, benji는 20, mike는 10, 소유자(이 경우 `royalty.goteam.examples.testnet`)는 나머지 65를 받습니다.

## 결론

이 시점에서 마켓플레이스와 상호 작용하기 위해 완벽하게 작동하는 NFT 컨트랙트에 필요한 모든 것이 존재합니다. 구현할 수 있는 마지막 남은 표준은 이벤트 표준입니다. 이렇게 하면 인덱서는 호출되는 함수에 대해 알 수 있기에, 지갑의 수집품 탭을 채우는 데 사용할 수 있는 정보 등에 대해 추적하는 것을 더 쉽고 안정적으로 할 수 있게 됩니다.

:::info 기억하세요 이 튜토리얼의 완성된 코드를 보려면, `6.royalty` 브랜치를 확인하세요. :::

:::note 문서 버전 관리

글을 작성하는 시점에서, 해당 예제는 다음 버전에서 작동합니다.

- near-cli: `4.0.4`
- NFT standard: [NEP171](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core), version `1.1.0`
- 열거 표준: [NEP181](https://nomicon.io/Standards/Tokens/NonFungibleToken/Enumeration), `1.0.0` 버전
- 로열티 표준: [NEP199](https://nomicon.io/Standards/Tokens/NonFungibleToken/Payout), `2.0.0` 버전

:::
