---
sidebar_position: 3
sidebar_label: "구조체 및 열거형 사용"
title: "NEAR 내 Rust 스마트 컨트랙트를 작성할 때 구조체와 열거형(Enums)에 대해 생각하는 방법"
---

import basicCrossword from '/docs/assets/crosswords/basics-crossword.jpg';
import enumBox from '/docs/assets/crosswords/enum-a-d-block--eizaconiendo.near--eiza_coniendo.png';

# 구조체 및 열거형(Enums)

## 개요

### 구조체

Rust에 익숙하지 않다면, 다른 프로그래밍 언어와 같은 클래스나 상속이 없다는 것이 혼란스러울 수 있습니다. 우리는 클래스와 비슷하지만 아마도 더 [간단한 구조체](https://doc.rust-lang.org/book/ch05-01-defining-structs.html)를 사용하는 방법을 탐구할 것입니다.

Remember that there will be only one struct that gets the [`#[near]` macro](../../../2.build/2.smart-contracts/anatomy/anatomy.md) placed on it; our primary struct or singleton if you wish. 종종 기본 구조체에는 추가 구조체가 포함되며, 이 구조체는 깔끔하고 정돈된 방식으로 더 많은 구조체를 포함할 수 있습니다. 프론트엔드와 같이 최종 사용자에게 데이터를 반환하는 데 사용되는 구조체가 있을 수도 있습니다. 이 챕터에서는 이 두 경우를 모두 다룰 것입니다.

### 열거형

열거형은 스마트 컨트랙트에 다른 상태로 전환되는 엔터티가 있는 경우 특히 유용할 수 있습니다. 예를 들어, 플레이어가 참여하고 전투를 벌이고 승리할 수 있는 일련의 블록체인 게임이 있다고 가정해 보겠습니다. 여기에는 `AcceptingPlayers`, `GameInProgress`, 그리고 `GameCompleted`와 같은 열거형이 있을 수 있습니다. 또한 열거형은 1년 내 몇 달과 같은 개념의 개별적인 자료형을 정의하는 데에도 사용합니다.

지금 십자말풀이 퍼즐의 경우, 열거형의 한 가지 예는 단서의 방향입니다. 아래 그림과 같이 가로(A) 또는 아래(D)입니다. 이것이 유일한 두 가지 옵션입니다.

<figure>
    <img src={enumBox} alt="A와 D라는 글자를 닮은 특정 모양에만 맞는 블록이 있는 상자의 어린이 장난감. eizaconien do.near 그림" width="600"/>
    <figcaption><a href="https://twitter.com/eiza_coniendo" target="_blank">eizaconiendo.near</a> 그림</figcaption>
</figure>

<br/>

Rust에는 열거형이 추가 데이터를 포함할 수 있는 흥미로운 기능이 있습니다. [여기](https://doc.rust-lang.org/rust-by-example/custom_types/enum.html)에서 그 예를 볼 수 있습니다.

## 구조체 사용

### 컨트랙트 상태 저장

우리는 한 번에 여러 구조체를 소개할 것입니다. 이러한 구조체는 퍼즐 자체가 하드코딩되고 다음과 같이 이전 챕터의 요구 사항을 해결합니다.

<img src={basicCrossword} alt="1장의 기본 십자말풀이 퍼즐" width="600" />

이 챕터에서는 여러 개의 사용자 정의 십자말풀이 퍼즐을 추가하는 기능을 원합니다. 이는 우리가 컨트랙트 상태의 단서에 대한 정보를 저장한다는 것을 의미합니다. 단서가 시작되는 x 및 y 좌표가 있는 격자를 생각해 보세요 또한 다음과 같은 것들을 지정하려고 합니다. 또한 다음과 같은 것들을 지정하려고 합니다.

1. 단서 번호
2. **가로**인지 **세로**인지
3. 답의 길이 또는 문자 수

기본 구조체부터 시작해 보겠습니다.

```rust
#[near(contract_state)]
#[derive(PanicOnDefault)]
pub struct Crossword {
    puzzles: LookupMap<String, Puzzle>,  // ⟵ Puzzle is a struct we're defining
    unsolved_puzzles: UnorderedSet<String>,
}
```

:::note 몇 가지를 무시합시다… For now, let's ignore the macros about the structs that begin with `derive` and `near`. :::

위 `Crossword` 구조체 내부의 필드를 보면 몇 가지 유형이 표시됩니다. `String`은 Rust의 표준 라이브러리의 일부이지만, `Puzzle`은 우리가 만든 것입니다.

```rust
#[near(serializers = [borsh])]
#[derive(Debug)]
pub struct Puzzle {
    status: PuzzleStatus,  // ⟵ An enum we'll get to soon
    /// Use the CoordinatePair assuming the origin is (0, 0) in the top left side of the puzzle.
    answer: Vec<Answer>,  // ⟵ Another struct we've defined
}
```

여기서 `Answer`들의 벡터인 `answer` 필드에 초점을 맞추겠습니다. (벡터는 특별한 것이 아닙니다. [표준 Rust 문서](https://doc.rust-lang.org/std/vec/struct.Vec.html)에 설명된 대로 항목의 묶음 또는 "확장 가능한 배열"일 뿐입니다.)

```rust
#[near(serializers = [json, borsh])]
#[derive(Debug)]
pub struct Answer {
    num: u8,
    start: CoordinatePair,  // ⟵ Another struct we've defined
    direction: AnswerDirection,  // ⟵ An enum we'll get to soon
    length: u8,
    clue: String,
}
```

이제 우리가 정의한 마지막 구조체를 살펴보겠습니다. 이 `CoordinatePair` 구조체는 기본 구조체의 필드에서 계단식으로 내려옵니다.

```rust
#[near(serializers = [json, borsh])]
#[derive(Debug)]
pub struct CoordinatePair {
    x: u8,
    y: u8,
}
```

:::info 표시된 구조체 요약 여기에는 여러 가지 구조체가 있으며, 아래는 구조체를 사용하여 컨트랙트 상태를 저장하는 일반적인 패턴입니다.

```
Crossword ⟵ primary struct with #[near(contract_state)]
└── Puzzle
   └── Answer
      └── CoordinatePair
```
:::

### 데이터 반환

격자에 고유한 단서와 위치가 있는 여러 십자말풀이가 있으므로, 퍼즐 객체를 프론트엔드로 반환해야 합니다.

:::tip 반환 값에 대한 빠른 참고 사항 기본적으로 반환 값은 바이너리 직렬화에 Borsh를 사용하도록 명시적으로 지시되지 않는 한 JSON으로 직렬화됩니다.

예를 들어 다음과 같은 함수를 호출하면:

```rust
pub fn return_some_words() -> Vec<String> {
    vec!["crossword".to_string(), "puzzle".to_string()]
}
```

반환 값은 다음과 같은 JSON 배열이 됩니다.

`["crossword", "puzzle"]`

While somewhat advanced, you can learn more about [changing the serialization here](../../../2.build/2.smart-contracts/anatomy/serialization-interface.md). :::

우리는 우리가 보여준 `Puzzle` 구조체와 다른 구조체 `JsonPuzzle`을 호출했습니다. 여기에는 한 가지 차이점이 있습니다: `solution_hash` 필드가 추가되었다는 것입니다.

```rust
#[near(serializers = [json])]
pub struct JsonPuzzle {
    /// The human-readable (not in bytes) hash of the solution
    solution_hash: String,  // ⟵ this field is not contained in the Puzzle struct
    status: PuzzleStatus,
    answer: Vec<Answer>,
}
```

기본 구조체에는 키가 정답 해시(`String` 형태)이고 값이 `Puzzle` 구조체인 키-값 쌍이 있기 때문에, 굉장히 편리합니다.

```rust
pub struct Crossword {
    puzzles: LookupMap<String, Puzzle>,
    //               key ↗        ↖ value
    …
```

`JsonPuzzle` 구조체는 키와 값 모두에서 정보를 반환합니다.

우리는 이 주제에서 넘어갈 수 있지만, 간단히 말해, 구조체가 컨트랙트 데이터를 저장하는 데 사용되는 것보다, 의미 있는 방식으로 데이터를 반환하는 데에 사용되는 것이 더 유용한 경우가 있다고 할 수 있습니다.

### 콜백에서 반환된 객체 사용

이 섹션이 이 시점에서 혼란스러워도 놀라지 마시기 바랍니다. 하지만 Promise와 콜백은 나중에 다룰 것입니다.

자세히 알아보지 않은 상태로 컨트랙트에서 교차 컨트랙트 호출(cross-contract call)을 수행하고 반환 값으로 "무언가"를 수행할 수 있습니다. 때때로 이 반환 값은 우리가 기대하는 객체이므로, 값을 저장하기 위해 예상 필드가 있는 구조체를 정의할 수 있습니다. 다른 프로그래밍 언어에서는 이를 값 "캐스팅" 또는 "마샬링"이라고 합니다.

이에 대한 실제 예시는 [대체 가능한 토큰](https://nomicon.io/Standards/StorageManagement.html)에 사용되는 [스토리지 관리 표준](https://github.com/near-examples/FT)일 수 있습니다.

스마트 컨트랙트에서 `alice.near`가 `nDAI` 토큰에 "등록"되었는지 확인하려고 한다고 가정해 보겠습니다. 보다 기술적으로, `alice.near` 는 FT 컨트랙트에 자신을 위한 키-값 쌍을 가지고 있습니다.

```rust
#[near(serializers = [json])]
pub struct StorageBalance {
    pub total: U128,
    pub available: U128,
}

// …
// Logic that calls the nDAI token contract, asking for alice.near's storage balance.
// …

#[private]
pub fn my_callback(&mut self, #[callback] storage_balance: StorageBalance) {
    // …
}
```

십자말풀이 퍼즐은 결국 교차 컨트랙트 호출 및 콜백을 사용하므로, 이에 대해 기대할 수 있습니다. 지금 컨트랙트는 프리미티브(부호 없는 정수, 문자열 등)가 아닌 더 복잡한 반환 값을 받을 것으로 예상되기 때문에, 적절한 자료형을 제공하기 위해 구조체를 사용할 수 있습니다.

## 열거형 사용

위 섹션에서, 다음과 같이 열거형 유형이 있는 구조체의 두 필드를 보았습니다.

1.`AnswerDirection` — 이는 가장 간단한 유형의 열거형이며, 다른 프로그래밍 언어에서도 친숙하게 보입니다. 십자말 풀이 퍼즐에서 단서가 방향을 잡는 방법에 대한 유일한 두 가지 옵션인 '가로'와 '세로'를 제공합니다.

```rust
#[near(serializers = [json, borsh])]
#[derive(Debug)]
pub enum AnswerDirection {
    Across,
    Down,
}
```

2. `PuzzleStatus` — 이 열거형은 실제로 `Solved` 구조 내부에 문자열을 저장할 수 있습니다. (구조 대신 단순히 문자열을 저장할 수도 있지만, 구조를 사용하면 더 쉽게 읽을 수 있습니다.)

이 십자말풀이 게임을 개선하면서, 십자말풀이의 승자(첫 번째로 푼 사람)에게 메모를 작성할 수 있는 기능을 제공하는 것도 하나의 아이디어입니다. (예: "6번째 단서를 얻는 데 너무 오래 걸렸어요!", "Alice 잘한다!" 등)

```rust
#[near(serializers = [json, borsh])]
#[derive(Debug)]
pub enum PuzzleStatus {
    Unsolved,
    Solved { memo: String },
}
```
