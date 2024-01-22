---
sidebar_position: 4
sidebar_label: "Action 및 NEAR 전송"
title: "전송 Action을 통해 십자말 풀이 퍼즐의 우승자에게 NEAR를 보내는 등, 계정이 할 수 있는 여러 Action이 존재함"
---

import {Github} from "@site/src/components/codetabs"

import allActions from '/docs/assets/crosswords/crossword-actions.png';
import transferNEAR from '/docs/assets/crosswords/transfer-brand-blue--qiqi04.near--blankworl.png';
import yoctoNEAR from '/docs/assets/crosswords/yoctoNEAR-magnifying--jrbemint.near--JrbeMad.jpg';
import signerPredecessorCurrent from '/docs/assets/crosswords/predecessor-signer-current--yasuoarts.near--YasuoArt69.png';

# Actions (NEAR 전송 포함)

우리는 새로운 Action인 `Transfer`를 소개할 것입니다. 이 챕터에서 우리는 십자말풀이를 가장 먼저 푸는 사람이 NEAR로 약간의 상금을 받길 원합니다.

<figure>
    <img src={transferNEAR} alt="두 손이 NEAR Protocol 로고가 새겨진 동전을 교환하고 있습니다. qiqi04.near 그림" width="400"/>
    <figcaption class="small">Art by <a href="https://twitter.com/blankworl" target="_blank">qiqi04.near</a></figcaption>
</figure>

<br/>

[이전 챕터](../01-basics/03-hashing-and-unit-tests.md#using-batch-actions)에서 컨트랙트를 배포하고 초기화할 때 Action을 이미 사용하였습니다. 각각 `DeployContract` 및 `FunctionCall` Action을 사용했습니다.

Action의 전체 목록은 [NEAR 사양 사이트](https://nomicon.io/RuntimeSpec/Actions.html)에서 확인할 수 있습니다.

이 전체 튜토리얼이 끝나면 아래에 강조 표시된 모든 Action들을 사용하게 될 것입니다.

<img src={allActions} alt="전체 십자말풀이 퍼즐 튜토리얼이 완료될 때 사용되는 모든 Action" width="600" />

## 컨트랙트 내에서의 Action

컨트랙트를 배포하고 초기화할 때, 터미널 또는 명령 프롬프트 앱에서 NEAR CLI를 사용했습니다. 높은 수준에서 보면, 이는 트랜잭션을 블록체인에 투입하여 몇 가지 작업을 수행하도록 지시하는 것처럼 느껴질 수 있습니다.

우리가 할 일인 스마트 컨트랙트 내에서 Action을 실행할 수도 있다는 점에 유의하는 것이 중요합니다. 왼쪽 사이드바에 이에 대한 예제를 제공하는 [**Promise**](/sdk/rust/promises/intro) 섹션이 있습니다. 아마도 Rust SDK의 경우, Promise와 Action이 비슷한 말이라는 점을 언급할 가치가 있을 것입니다.

:::note Action은 현재 컨트랙트에만 영향을 미칩니다. 컨트랙트는 방금 호출한 계정을 포함하여 다른 계정에서 `AddKey` Action을 사용할 수 없습니다. 자신 *에게만* 키를 추가할 수 있습니다.

다른 Action에도 동일한 아이디어가 적용됩니다. 다른 사람의 계정에 컨트랙트를 배포하거나, 다른 계정을 삭제할 수 없습니다. (다행히 😅)

마찬가지로 `Transfer` Action을 사용하여 십자말풀이 퍼즐 당첨자에게 상금을 보낼 때, 십자말풀이 컨트랙트가 배포된 계정의 잔고에서 금액이 차감됩니다.

유일하게 흥미로운 점(예외 처럼 *보일 수 있음*)은 `CreateAccount` Action을 사용하여 하위 계정을 생성할 때입니다. 해당 트랜잭션 중에 일괄 Action을 사용하여 컨트랙트 배포, NEAR 전송, 키 추가, 함수 호출 등과 같은 여러 Action을 수행할 수 있습니다. 이는 팩토리 패턴을 사용하는 스마트 컨트랙트에서 일반적이며, 이 튜토리얼의 다음 챕터에서 이에 대해 알아보겠습니다. :::

## 상금 규모 정의

간단하게 상금을 하드코딩해 봅시다. 이것은 십자말 풀이를 가장 먼저 맞추는 사람에게 얼마만큼의 NEAR가 주어질 것인지를 정의하며, 우리가 추가하는 모든 십자말 풀이에 적용될 것입니다. 향후 챕터에서 이 금액을 조정할 수 있습니다.

`lib.rs` 파일 맨 위에 다음 상수를 추가합니다.

<Github language="rust" start="10" end="11" url="https://github.com/near-examples/crossword-tutorial-chapter-2/blob/1909630a10291081cb00b2780c1ae8889d98f620/contract/src/lib.rs" />

As the code comment mentions, this is 5 NEAR, but look at all those zeroes in the code!

That's the value in yoctoNEAR. This concept is similar to other blockchains. Bitcoin's smallest unit is a satoshi and Ethereum's is a wei.

<figure>
    <img src={yoctoNEAR} alt="NEAR의 지폐, NEAR 일부에 대한 코인, 그리고 개미 옆에 있는 작은 yoctoNEAR를 보여주는 돋보기. jrbemint.near 그림"/>
    <figcaption class="full-width">Art by <a href="https://twitter.com/JrbeMad" target="_blank">jrbemint.near</a></figcaption>
</figure>

## `Transfer` 추가

In the last chapter we had a simple function called `guess_solution` that returned `true` if the solution was correct, and `false` otherwise. We'll be replacing that function with `submit_solution` as shown below:

<Github language="rust" start="92" end="124" url="https://github.com/near-examples/crossword-tutorial-chapter-2/blob/83d4d8925e6d30e04e8e4cb5e9a0a6d3763fce40/contract/src/lib.rs" />

이 함수의 마지막 줄을 확인하면, 전임자(predecessor)에 NEAR를 보내고 있다는 것을 알 수 있습니다.

:::info 약속 반환 위 함수의 마지막 줄은 세미콜론으로 끝납니다. 세미콜론이 제거되면, Rust에게 이 Promise 객체를 반환하고 싶다고 알리는 것입니다.

다음과 같이 함수를 작성하는 것이 좋습니다.

```rust
pub fn submit_solution(&mut self, solution: String, memo: String) -> Promise {
    // …
    // Transfer the prize money to the winner
    Promise::new(env::predecessor_account_id()).transfer(PRIZE_AMOUNT)
}
```
:::

## 전임자(Predecessor), 서명자 및 현재 계정

스마트 컨트랙트를 작성할 때, 일반적으로 `env`와 그것이 제공하는 세부 사항을 원할 것입니다. 지난 챕터에서 다음을 위해 이것을 사용했습니다.

- 로깅 (예: `env::log_str("hello friend")`)
- sha256을 통한 해싱 (예: `env::sha256(solution.as_bytes())`)

[SDK 참조 문서](https://docs.rs/near-sdk/latest/near_sdk/env/index.html)에 더 많은 함수가 자세히 설명되어 있습니다.

계정과 관련하여 일반적으로 사용되는 세 가지 함수인 전임자, 서명자 및 현재 계정을 살펴보겠습니다.

<figure>
    <img src={signerPredecessorCurrent} alt="앨리스가 바나나라는 이름의 스마트 컨트랙트에 트랜잭션을 보내는 그림으로, 스마트 컨트랙트 Cucumber에 교차 컨트랙트 호출을 합니다. yasuoarts.near 그림"/>
    <figcaption class="full-width">앨리스는 banana.near의 컨트랙트에 트랜잭션을 보내, cucumber.near에 대해 교차 컨트랙트 호출을 진행합니다.<br/>cucumber.near에 대한 컨트랙트의 관점에서 봤을 때, predecessor, 서명자 및 현재 계정 목록을 볼 수 있습니다.<br/>Art by <a href="https://twitter.com/YasuoArt69" target="_blank">yasuoarts.near</a></figcaption>
</figure><br/><br/>

1. [전임자 계정](https://docs.rs/near-sdk/latest/near_sdk/env/fn.predecessor_account_id.html) — `env::predecessor_account_id()`

    이것은 스마트 컨트랙트에 대한 즉각적인 호출자였던 계정입니다. 이것이 **alice.near**에서 **banana.near**로의 단순 트랜잭션(교차 컨트랙트 호출 없음)인 경우, **banana.near**의 스마트 컨트랙트는 Alice를 전임자로 간주합니다. 이 경우 Alice *도* 서명자입니다.

    :::tip 확실하지 않은 경우 전임자를 사용하세요. 전임자와 서명자 간의 차이점을 살펴보았을 때, **전임자를 선택하는 것이 더 일반적인 모범 사례**임을 알 수 있습니다.

    전임자를 사용하면, 서명자만 확인하는 다른 컨트랙트들을 "속이는", 잠재적으로 악의적인 컨트랙트를 방지할 수 있습니다. :::

2. [서명자 계정](https://docs.rs/near-sdk/latest/near_sdk/env/fn.signer_account_id.html) — `env::signer_account_id()`

    서명자는 블록체인 활동을 시작한 트랜잭션에 원래 *서명한* 계정이며, 여기에는 교차 컨트랙트 호출이 포함될 수도 있고 포함되지 않을 수도 있습니다. 함수 호출로 인해 여러 교차 컨트랙트 호출이 발생하는 경우, 서명자를 해당 연쇄 반응을 시작한 계정으로 생각할 수 있습니다.

    :::caution 중개자를 조심하세요 스마트 컨트랙트가 일부 자산(대체 가능 토큰, NFT 등)에 대한 소유권을 확인하는 경우, 서명자 계정을 사용하는 것은 나쁜 생각일 수 있습니다.

    혼란스럽거나 악의적인 컨트랙트는 중개자 역할을 하여 예기치 않은 동작을 유발할 수 있습니다. 만약 **alice.near**가 실수로 **evil.near**를 호출하는 경우, 해당 계정의 컨트랙트는 **vulnerable-nft.near**에 대한 교차 컨트랙트 호출을 수행하여 NFT를 전송하도록 지시할 수 있습니다.

    **vulnerable-nft.near**가 NFT의 소유권을 결정하기 위해 서명자 계정만 확인하는 경우, 해당 계정은 자신도 모르게 Alice의 자산을 양도할 수 있습니다. 전임자를 확인하면 이 문제가 해결됩니다. :::

3. [현재 계정](https://docs.rs/near-sdk/latest/near_sdk/env/fn.current_account_id.html) — `env::current_account_id()`

    현재 계정은 스마트 컨트랙트의 관점에서 "나"입니다.

    :::tip 왜 이를 사용할까요? 현재 계정을 사용하는 이유는 다양할 수 있지만, 가장 일반적인 사용 사례는 소유권을 확인하거나 교차 컨트랙트 호출에 대한 콜백을 처리하는 것입니다.

    많은 스마트 컨트랙트는 일종의 권한 시스템을 구현하기를 원할 것입니다. 일반적이고 기초적인 권한을 통해 특정 함수는 컨트랙트 소유자, 즉 이 컨트랙트 계정에 대한 개인 키를 소유한 사람만 호출할 수 있습니다.

    컨트랙트는 전임자와 현재 계정이 동일한지 확인할 수 있으며, 이렇게 형성된 신뢰를 바탕으로 컨트랙트 설정 변경, 컨트랙트 업그레이드 또는 기타 특권 수정과 같은 더 많은 권한을 제공합니다. :::