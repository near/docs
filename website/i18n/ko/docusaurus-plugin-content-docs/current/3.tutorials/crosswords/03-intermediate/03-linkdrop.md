---
sidebar_position: 4
sidebar_label: "Linkdrop 컨트랙트"
title: "사용 중인 Linkdrop 컨트랙트 소개"
---

import {Github} from "@site/src/components/codetabs"

import createMainnetAccount from '/docs/assets/crosswords/create-mainnet-account.png';
import createTestnetAccount from '/docs/assets/crosswords/create-testnet-wallet-account.png';

# Linkdrop 컨트랙트

우리는 linkdrop 스마트 컨트랙트에 대해 이야기하기 위해, 약간 다른 이야기를 할 것입니다.  먼저 이 컨트랙트와 그 목적을 이해한 다음 이 컨트랙트에서 메서드 호출에 대해 논의하는 것이 가장 좋습니다.

[linkdrop 컨트랙트](https://github.com/near/near-linkdrop)는 테스트넷과 메인넷 네트워크의 최상위 계정으로 각각 알려진 계정 `testnet`과 `near`에 배포됩니다. (누구나 linkdrop 스타일의 컨트랙트를 다른 곳에서 만들 수 있지만, 여기에 표시된 컨트랙트는 다른 사람들이 패턴화한 주요 컨트랙트입니다.)

## 테스트넷

테스트넷 계정에는 특별한 것이 없습니다. 테스트넷 계정을 생성할 때 개발자로서 실제 비용은 없으므로 편의에 따라 자유롭게 생성하거나 삭제할 수 있습니다.

사용자가 NEAR Wallet에서 테스트넷 계정에 가입하면 다음과 같이 표시됩니다.

<img src={createTestnetAccount} width="400" />

이 테스트넷 계정이 어떻게 생성되는지 논의해 봅시다.

새 계정은 `.testnet`로 끝납니다. 이는 ([이 튜토리얼의 앞부분](../01-basics/02-add-functions-call.md#create-a-subaccount)에서 배운 것처럼) `testnet<code> 계정이 <code>.vacant-name.testnet`이라는 하위 계정(sub-account)을 생성하기 때문입니다.

이 하위 계정을 만드는 방법에는 두 가지가 있습니다.

1. `testnet` 계정에 대한 전체 액세스 키를 사용하여 `CreateAccount` Action으로 트랜잭션에 서명합니다.
2. `testnet` 계정에 배포된 스마트 컨트랙트에서, Promise를 반환하는 비동기 메서드인 `CreateAccount` Action을 호출합니다. ([`CreateAccount` Promise](/sdk/rust/promises/create-account) 작성에 대한 추가 정보)

(NEAR CLI를 사용하여 새 계정을 생성하는 아래 예에서는, 메인넷의 최상위 "near" 계정에 배포되는 linkdrop 컨트랙트 내 `CreateAccount`를 호출합니다.)


## 메인넷

메인넷에서 `near` 계정에는 linkdrop 컨트랙트도 배포되어 있습니다.

NEAR CLI를 사용하면 아래와 같이 linkdrop 컨트랙트를 호출하여 메인넷 계정을 생성할 수 있습니다.

<img src={createMainnetAccount} />

위의 명령은 `near` 계정에서 `create_account` 메서드를 호출하고, **사용 가능한 경우** `aloha.near`를 생성하여 15 Ⓝ 만큼의 자금을 조달합니다.

동일한 메서드를 호출하는 스마트 컨트랙트를 작성하려고 합니다. 그러나 누군가 이미 `aloha.near`를 가져갔을 가능성이 있기 때문에, 이를 처리하는 방법을 배워야 합니다.

## 간단한 콜백

### `create_account` 메서드

여기에서는 메서드의 `create_account` 구현을 보여줍니다. 이 함수가 첨부된 금액을 수락할 수 있도록 하는 `#[payable]` 매크로에 주의하세요. (CLI 명령에서 15 Ⓝ를 첨부했음을 기억하세요.)

<Github language="rust" start="125" end="149" url="https://github.com/near/near-linkdrop/blob/ba94a9c7292d3b48a0a8ba380fb0e7ff6b24efc6/src/lib.rs" />

The most important part of the snippet above is around the middle where there's:

```rs
Promise::new(...)
    ...
    ...
    )
```

This translates to, "we're going to attempt to perform an Action, and when we're done, please call myself at the method `on_account_created` so we can see how that went."

:::caution This doesn't work

Not infrequently, developers will attempt to do this in a smart contract:

```rust
let creation_result = Promise::new("aloha.mike.near")
  .create_account();

// Check creation_result variable (can't do it!)
if creation_result {...}

```

In other programming languages promises might work like this, but we must use callbacks instead. :::

### 콜백

Now let's look at the callback:

<Github language="rust" start="151" end="164" url="https://github.com/near/near-linkdrop/blob/ba94a9c7292d3b48a0a8ba380fb0e7ff6b24efc6/src/lib.rs" />

이것은 개인 헬퍼 메서드 `is_promise_success`를 호출합니다. 이 메서드는 기본적으로 Promise를 하나만 시도했기 때문에, Promise 결과가 하나만 있는지 확인합니다.

<Github language="rust" start="32" end="42" url="https://github.com/near/near-linkdrop/blob/ba94a9c7292d3b48a0a8ba380fb0e7ff6b24efc6/src/lib.rs" />

콜백은 bool을 반환합니다. 즉, `testnet`에서 linkdrop 컨트랙트를 호출하기 위해 십자말풀이 퍼즐을 수정할 때, 계정 생성이 성공했는지 실패했는지 확인할 수 있습니다.

그리고 그게 끝입니다! 이제 우리는 간단한 컨트랙트에 대한 메서드와 콜백을 보았습니다.

:::tip 이는 중요합니다 교차 컨트랙트 호출(cross-contract call) 및 콜백을 이해하는 것은 스마트 컨트랙트 개발에서 매우 중요합니다.

NEAR의 트랜잭션은 비동기식이므로 콜백 사용은 다른 생태계의 스마트 컨트랙트 개발자에게 새로운 패러다임 전환이 될 수 있습니다.

자유롭게 linkdrop 컨트랙트를 파헤치고, 이 섹션에 제시된 아이디어를 가지고 놀아 보시기 바랍니다.

살펴보면 도움이 되는 두 가지 추가 예가 있습니다.
1. [높은 수준의 교차 컨트랙트 호출](https://github.com/near/near-sdk-rs/blob/master/examples/cross-contract-calls/high-level/src/lib.rs) — 이는 linkdrop 컨트랙트에서 본 것과 유사합니다.
2. [낮은 수준의 교차 컨트랙트 호출](https://github.com/near/near-sdk-rs/blob/master/examples/cross-contract-calls/low-level/src/lib.rs)— 우리가 언급한 특성을 사용하지 않는 다른 접근 방식입니다. :::

---

다음으로 십자말풀이 컨트랙트를 수정하여 서명자의 공개 키를 확인합니다. 이는 서명자가 퍼즐을 올바르게 풀었는지 확인하는 방법입니다.
