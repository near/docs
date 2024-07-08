---
sidebar_position: 5
sidebar_label: "교차 컨트랙트 호출 등"
title: "교차 컨트랙트 호출, 액세스 키 셔플링 등"
---

import {Github} from "@site/src/components/codetabs"

# 컨트랙트 업데이트

import shuffleKeys from '/docs/assets/crosswords/shuffle-keys.gif';
import clionSuggestion from '/docs/assets/crosswords/clion-suggestion.gif';
import carpenterAddingKey from '/docs/assets/crosswords/create-key-carpenter-near--carlcarlkarl.near--CarlCarlKarl.jpg';
import recycleKey from '/docs/assets/crosswords/remove-key-recycle--eerie_ram.near--eerie_ram.png';

다시 한 번 말하지만, 우리는 NEAR 계정이 없는 사람을 포함하여 누구나 십자말풀이 퍼즐에 참여할 수 있기를 바랍니다.

첫 번째로 우승한 사람은 "자신의 자리를 예약"하고 자신이 소유한 계정 또는 만들고 싶은 계정 중 상금을 보낼 곳을 선택합니다.

## 자리 예약

### 계획

사용자가 십자말풀이를 처음 방문하면 십자말풀이만 표시됩니다. 로그인 버튼이나 채울 필드(예: `memo` 필드)가 없습니다.

첫 번째 방문 시, 프론트엔드는 브라우저에 완전히 새로운 무작위 시드 문구를 생성합니다. 이 시드 문구를 사용하여 사용자 고유의 키 쌍을 생성합니다. 임의의 시드 문구가 이미 있는 경우 이 부분을 건너뜁니다. ([이전 섹션](02-use-seed-phrase.md#generate-random-seed-phrase)에서 이에 대한 코드를 다뤘습니다.)

사용자가 가장 먼저 퍼즐을 풀면, 함수 호출(function-call) 액세스 키를 발견하고 해당 키로 `submit_solution`을 호출합니다. 이 키는 십자말풀이 계정에 있기 때문에, 기본적으로 다른 사람의 키를 사용하고 있습니다.

사용자가 브라우저에 방금 저장한 임의의 공개 키를 포함할 수 있도록 `submit_solution`에 **새 매개변수를 추가할 것입니다**.

`submit_solution`을 실행하는 동안, 컨트랙트는 Promise를 사용하여 작업을 수행할 수 있으므로, 정답 공개 키를 제거하고 사용자의 공개 키를 추가합니다.

이렇게 하면 십자말풀이 퍼즐을 풀려는 다른 시도가 차단되고 승자가 한 명만 남게 됩니다.

<img src={shuffleKeys} width="600" /><br/><br/>

이것은 퍼즐이 세 가지 상태를 가질 수 있음을 의미합니다.

1. 풀리지 않음
2. 풀렸지만 아직 청구되지 않음(지급되지 않음)
3. 청구 및 확정됨

이전 챕터에서 [열거형(enum)에 대해 논의](../02-beginner/02-structs-enums.md#using-enums)했으므로, 이는 단순히 열거형 변형을 수정하는 것입니다.

### 구현

먼저 `submit_solution`가 올바른 정답을 확인하는 방법에 대해 살펴보겠습니다.

<Github language="rust" start="136" end="142" url="https://github.com/near-examples/crossword-tutorial-chapter-3/blob/master/contract/src/lib.rs" />

Instead of hashing the plaintext, we simply check that the public key matches what we know the answer is. (The answer being the series of words representing the solution to the crossword puzzle, used as a seed phrase to create a key pair, including a public key.)

Further down in the `submit_solution` method we'll follow our plan by **adding a function-call access key** (that only the winner has) and removing the access key that was discovered by the winner, so no one else can use it.

<figure>
    <img src={carpenterAddingKey} alt="키를 만든 목수에 대한 묘사 carlcarlkarl.near 그림" width="400"/>
    <figcaption className="small">Our smart contract is like this carpenter adding a key to itself.<br/>Art by <a href="https://twitter.com/CarlCarlKarl" target="_blank" rel="noopener noreferrer">carlcarlkarl.near</a></figcaption>
</figure>

<br/>

<Github language="rust" start="166" end="172" url="https://github.com/near-examples/crossword-tutorial-chapter-3/blob/master/contract/src/lib.rs" />

위의 첫 번째 Promise는 액세스 키를 추가하고 두 번째 Promise는 정답에서 파생된 계정의 액세스 키를 시드 문구로 삭제합니다.

<figure>
    <img src={recycleKey} alt="해시의 페이지화를 보여주는 책. eerie_ram.near 그림" width="600"/>
    <figcaption>We delete the function-call access key so there is only one winner.<br/>Art by <a href="https://twitter.com/eerie_ram" target="_blank" rel="noopener noreferrer">eerie_ram.near</a></figcaption>
</figure>

<br/>

새 함수 호출 액세스 키는 추가할 두 가지 메서드를 호출할 수 있습니다.

1. `claim_reward` — 사용자가 기존 계정을 가지고 있고 경품을 보내고자 하는 경우
2. `claim_reward_new_account` — 사용자가 계정이 없는 경우 계정을 생성하고 경품을 보내고자 하는 경우

두 함수 모두 교차 컨트랙트 호출을 수행하고 콜백을 사용하여 결과를 확인합니다. 드디어 이 챕터의 내용에 도달했습니다. 시작하겠습니다!

## 교차 컨트랙트 호출(Cross-contract call)

### 특성

우리는 `testnet` 계정에 배포된 linkdrop 계정에 대해 교차 컨트랙트 호출을 할 것입니다. 우리는 또한 이에 대한 콜백과 (잠재적으로 존재하는) 계정으로의 간단한 전송을 할 것입니다. 또한, 두 메서드를 모두 정의하는 특성을 만들 것입니다.

<Github language="rust" start="17" end="43" url="https://github.com/near-examples/crossword-tutorial-chapter-3/blob/master/contract/src/lib.rs" />

:::tip `Crossword` 구조체 구현에서 `callback_after_transfer`와 `callback_after_create_account` 함수를 구현했을 수 있으므로, 콜백에 대한 특성을 만들 필요가 없습니다. 코드를 좀 더 읽기 쉽게 만들기 위해 특성을 정의하고 구현하기로 했습니다 ::: :::

### `claim_reward`

다시 말하지만, 이 함수는 사용자가 십자말풀이를 풀고 기존 계정으로 상금을 보내고자 할 때 호출됩니다.

간단해 보이는데 콜백이 필요한 이유는 무엇인가요? 사용자가 로그인할 때 이전 장에서 콜백을 사용하지 않았습니다. 이를 사용하면 무엇이 제공되나요?

상금을 청구하는 동안 사용자가 실수로 사용자 이름을 잘못 누르거나 고양이가 키보드에서 점프할 가능성이 있습니다. `mike.testnet`를 입력하는 대신, `mike.testnzzz`를 입력하고 보내기를 누를 수 있습니다. 요약하면, 존재하지 않는 계정으로 상품을 보내려고 하면 그것을 잡아내고자 합니다.

간결함을 위해, Promise 및 콜백에 초점을 맞추고 이 함수의 일부 코드를 건너뛰겠습니다.

```rust
pub fn claim_reward(
    &mut self,
    crossword_pk: PublicKey,
    receiver_acc_id: String,
    memo: String,
    ) -> Promise {
        let signer_pk = env::signer_account_pk();
        ...
        Promise::new(receiver_acc_id.parse().unwrap())
            .transfer(reward_amount)
            .then(
                Self::ext(env::current_account_id())
                    .with_static_gas(GAS_FOR_ACCOUNT_CALLBACK)
                    .callback_after_transfer(
                        crossword_pk,
                        receiver_acc_id,
                        memo,
                        env::signer_account_pk(),
                    ),
            )
    }
```

:::tip 당신의 IDE는 당신의 친구입니다

종종 IDE가 도움이 될 수 있습니다.

예를 들어, 위의 스니펫에는 혼란스러워 보일 수 있는 `receiver_acc_id.parse().unwrap()`가 있습니다. 코드 예제나 문서를 참조하여 이것이 어떻게 수행되는지 확인하거나, IDE의 제안을 활용할 수 있습니다.

:::

이 `claim_reward` 메서드는 `Transfer` Action을 사용하여 지정된 계정으로 NEAR를 보내려고 시도합니다. 프로토콜 수준에서 실패할 수 있습니다(스마트 컨트랙트 실패와 반대). 이는 계정이 존재하지 않음을 나타냅니다.

콜백에서 이를 확인하는 방법을 살펴보겠습니다.

<Github language="rust" start="372" end="400" url="https://github.com/near-examples/crossword-tutorial-chapter-3/blob/master/contract/src/lib.rs" />

:::info `#[private]` 매크로 위에서 함수를 비공개로 선언했습니다.

이는 predecessor가 현재 계정 ID인지 확인하는 헬퍼입니다.

우리는 실제로 [이전 섹션](03-linkdrop.md#the-callback)의 linkdrop 컨트랙트에 대한 콜백에서 이것이 "장기적으로" 수행되는 것을 보았습니다.

모든 콜백은 이 `#[private]` 매크로를 그 위에 두기를 원할 것입니다. :::

위의 스니펫은 기본적으로 정확히 하나의 Promise에 대해 Promise 결과가 있을 것으로 예상하고 성공 여부를 확인한다고 말합니다. 이 콜백에서 성공 또는 실패 여부에 관계없이 실제로 *값* 을 얻지는 않는다는 점에 유의하세요.

성공하면 상태를 소유권 청구 및 완료로 설정하고 `unsolved_puzzles` 컬렉션에서 제거하는 등 퍼즐을 마무리합니다.

### `claim_reward_new_account`

이제 우리는 좀 더 흥미로운 사례를 다루고자 합니다. `testnet`에 있는 스마트 컨트랙트에 대한 교차 컨트랙트 호출을 수행하고 계정을 생성하도록 요청할 것입니다. 이 이름은 사용할 수 없으며 이번에는 *값을 가져오는* 콜백을 작성하게 됩니다.

다시 한 번, 간결함을 위해 `claim_reward_new_account` 메서드의 핵심만 보여드리겠습니다.

```rust
pub fn claim_reward_new_account(
    &mut self,
    crossword_pk: PublicKey,
    new_acc_id: String,
    new_pk: PublicKey,
    memo: String,
) -> Promise {
    ...
    ext_linkdrop::ext(AccountId::from(self.creator_account.clone()))
        .with_attached_deposit(reward_amount)
        .with_static_gas(GAS_FOR_ACCOUNT_CREATION) // This amount of gas will be split
        .create_account(new_acc_id.parse().unwrap(), new_pk)
        .then(
            // Chain a promise callback to ourselves
            Self::ext(env::current_account_id())
                .with_static_gas(GAS_FOR_ACCOUNT_CALLBACK)
                .callback_after_create_account(
                    crossword_pk,
                    new_acc_id,
                    memo,
                    env::signer_account_pk(),
                ),
        )
}
```

그런 다음 콜백은 다음과 같습니다.

<Github language="rust" start="401" end="433" url="https://github.com/near-examples/crossword-tutorial-chapter-3/blob/master/contract/src/lib.rs" />

위 스니펫에는 우리가 `claim_reward`에서 본 콜백과 한 가지 차이점이 있습니다. 방금 호출한 스마트 컨트랙트에서 반환된 값을 캡처합니다. linkdrop 컨트랙트는 bool을 반환하므로, 해당 자료형을 기대할 수 있습니다. (위의 "참고:" 주석을 참조하세요.)

## 콜백

콜백이 작동하는 방식은 `Self::ext()`로 시작하여, `env::current_account_id()`를 사용하여 현재 계정 ID를 전달하는 것입니다. 이는 본질적으로 현재 계정 ID에 있는 함수를 호출하고 싶다는 것을 의미합니다.

그런 다음 각각 `.with_*`으로 시작하는 몇 가지 구성 옵션이 있습니다.

1. `.with_attached_deposit()` 메서드를 지정하여 yoctoⓃ로 된 Ⓝ 금액을 호출에 첨부할 수 있습니다. 기본값은 0입니다(1 Ⓝ = 1000000000000000000000000 yoctoⓃ 또는 1^24 yoctoⓃ).
2. `.with_static_gas()` 메서드를 지정하여, 고정된 양의 GAS를 첨부할 수 있지만 기본값은 0입니다.
3. `.with_unused_gas_weight()` 메서드를 지정하여 미사용 가스 가중치를 첨부할 수 있지만, 기본값은 1입니다. 미사용 가스는 해당 가중치에 따라 현재 실행 중인 모든 함수 간에 분할됩니다. 함수가 1개만 있는 경우, 가중치가 1보다 크면 사용하지 않은 모든 가스가 해당 함수에 연결됩니다. 러나 가중치를 0으로 지정하면 사용하지 않는 가스는 해당 함수에 첨부되지 않습니다. 가중치가 3인 함수와 가중치가 1인 함수가 두 개 있는 경우, 첫 번째 함수는 사용하지 않은 가스의 3/4을 얻고 다른 함수는 사용하지 않은 가스의 1/4을 얻습니다.

호출에 원하는 구성을 추가한 후 함수를 실행하고 매개변수를 전달합니다. 이 경우 `callback_after_create_account` 함수를 호출하고 십자말풀이 공개 키, 새 계정 ID, 메모 및 서명자의 공개 키를 전달합니다.

이 함수는 `GAS_FOR_ACCOUNT_CALLBACK`와 같은 정적인 가스로 호출되며, 자금은 첨부되지 않습니다. 또한 `with_unused_gas_weight()` 메서드가 호출되지 않았기 때문에, 기본적으로 가중치 1이 지정되어 사용하지 않는 모든 가스를 `. create_account` 함수로 나누어 `GAS_FOR_ACCOUNT_CALLBACK` 위에 추가할 것입니다.

```rust
.then(
    // Chain a promise callback to ourselves
    Self::ext(env::current_account_id())
        .with_static_gas(GAS_FOR_ACCOUNT_CALLBACK)
        .callback_after_create_account(
            crossword_pk,
            new_acc_id,
            memo,
            env::signer_account_pk(),
        ),
)
```

:::tip 콜백에서 컨트랙트 상태 변경 고려 항상 그런 것은 아니지만 종종 콜백에서 컨트랙트 상태를 변경하고 싶을 것입니다.

콜백은 교차 컨트랙트 호출 또는 작업 후에 발생한 일을 알 수 있는 안전한 장소입니다. 교차 컨트랙트 호출을 수행하기 *전에* 스마트 컨트랙트가 상태를 변경하는 경우, 이에 대한 합당한 이유가 있는지 확인하세요. 이 로직을 콜백으로 옮기는 것이 가장 좋습니다. :::

콜백에 어떤 매개변수를 전달해야 합니까?

만능 솔루션은 없지만, 도움이 될 수 있는 몇 가지 조언이 있을 수 있습니다.

다른 소스에서 오는 것을 신뢰하는 것이 현명하지 못한 매개변수를 전달하려고 해보세요. 예를 들어 계정이 일부 디지털 자산을 전송하는 메서드를 호출하고, 교차 컨트랙트 호출을 수행해야 하는 경우, 컨트랙트 호출 결과에 의존하여 소유권을 결정하지 마세요. 원래 함수 호출이 디지털 자산의 소유자를 결정하는 경우 이를 콜백에 전달합니다.

콜백에 매개변수를 전달하는 것은 영구 컬렉션에서 가져오는 데이터를 두 번(초기 메서드에서 한 번, 콜백에서 다시) 저장하는 편리한 방법이기도 합니다. 대신, 그냥 전달하고 일부 CPU 사이클을 저장하세요.

## 공개 키 확인

이 섹션의 마지막 간단한 변경 사항은 사용자가 십자말풀이 정답을 찾았는지 확인하는 방식을 수정하는 것입니다.

이전 챕터에서 일반 텍스트 정답을 해시하고, 알려진 정답의 해시와 비교했습니다.

여기에서 우리는 서명자의 공개 키를 간단히 확인할 수 있습니다. 이 키는 [`signer_account_pk`](https://docs.rs/near-sdk/latest/near_sdk/env/fn.signer_account_pk.html)아래 `env` 객체 에서 사용할 수 있습니다.

정답이 제출될 때와 상품이 청구될 때 모두 이 확인을 수행합니다.

### 십자말풀이가 풀렸을 때

```rust
// The solver_pk parameter is the public key generated and stored in their browser
pub fn submit_solution(&mut self, solver_pk: PublicKey) {
    let answer_pk = env::signer_account_pk();
    // check to see if the answer_pk from signer is in the puzzles
    let mut puzzle = self
        .puzzles
        .get(&answer_pk)
        .expect("ERR_NOT_CORRECT_ANSWER");
```

### 상품 수령

```rust
pub fn claim_reward(
    &mut self,
    crossword_pk: PublicKey,
    receiver_acc_id: String,
    memo: String,
) -> Promise {
    let signer_pk = env::signer_account_pk();
    ...
    // Check that puzzle is solved and the signer has the right public key
    match puzzle.status {
        PuzzleStatus::Solved {
            solver_pk: puzzle_pk,
        } => {
            // Check to see if signer_pk matches
            assert_eq!(signer_pk, puzzle_pk, "You're not the person who can claim this, or else you need to use your function-call access key, friend.");
        }
        _ => {
            env::panic_str("puzzle should have `Solved` status to be claimed");
        }
    };
    ...
}
```
