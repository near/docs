---
sidebar_position: 2
sidebar_label: "여러 퍼즐 저장"
title: "LookupMap이라는 NEAR 특화 컬렉션을 사용하여 여러 십자말풀이 퍼즐 저장"
---

import bookPagination from '/docs/assets/crosswords/paging-through-hashes-swing--pierced_staggg.near--pierced_stag.jpg';
import guardsAroundContract from '/docs/assets/crosswords/guards-contract-permissions--connoisseur_dane.near--connoisseurdane.png';

# 컬렉션 사용

이전 챕터에서 언급했듯이, [온라인 Rust Book](https://doc.rust-lang.org/stable/book)은 Rust를 시작하는 사람들에게 훌륭한 참고 자료이지만, 블록체인을 다룰 때는 다른 개념이 필요합니다. 이러한 것들 중 하나는, 컬렉션을 사용하는 것입니다.

Rust SDK의 문서에 이 개념이 잘 설명되어 있습니다.

:::note 특수 컬렉션에 대한 동기
> 이는** 기본 블록체인 trie 스토리지를 보다 효율적으로 활용**하여 [Rust의] std::collections::* 내 표준 컨테이너에 대한 대안을 제공하는 컬렉션입니다.<br/> 예를 들어, 다음 스마트 컨트랙트는 **호출 시작 시 전체 HashMap을 로드하고** 상태 수정이 있는 경우 마지막에 전체 HashMap을 저장하기 때문에, 상태와 효율적으로 작동하지 않습니다. **이는 적은 수의 요소에는 적합하지만 많은 수의 요소가 있을 경우 매우 비효율적입니다**.

— [NEAR SDK 참조 문서](https://docs.rs/near-sdk/latest/near_sdk/collections/index.html) :::

챕터 1에서는 처음 컨트랙트를 배포할 때 십자말풀이 퍼즐 정답 해시를 설정하고, 초기화 메서드 `new`를 호출하여 전달했습니다. 이는 우리가 단 하나의 퍼즐만 설정할 수 있도록 하지만, 이외에 많은 것을 허용합시다.

여러 십자말풀이를 저장하는 컨트랙트인 경우, 추가하고 싶은 항목을 높은 수준에서 논의해 봅시다. 먼저, 우리는 퍼즐 중 일부가 서로 다른 상태(미완성 및 완료됨)를 갖는 많은 퍼즐의 개념을 갖게 될 것이며, 어떤 퍼즐이 빨리 풀리지 않았는지 알고 싶을 것입니다. 스마트 컨트랙트를 작성할 때 일반적인 경험 법칙 중 하나인 또 다른 사항은, 사용량이 많을 경우 발생할 수 있는 일을 예상하는 것입니다. 자말 풀이가 10,000개가 되면 어떻게 될까요? 그것이 우리가 사용하는 자료 구조의 수와 형태에 어떤 영향을 미칠 수 있을까요?

## LookupMap 및 UnorderedSet

두 가지 특수 NEAR 컬렉션을 사용해 봅시다.

1. [LookupMap](https://docs.rs/near-sdk/latest/near_sdk/collections/struct.LookupMap.html): 키-값 쌍을 저장 (정답 해시 » 퍼즐 객체)
2. [UnorderedSet](https://docs.rs/near-sdk/latest/near_sdk/collections/struct.UnorderedSet.html): 아직 풀리지지 않은 퍼즐에 대한 정답 해시 집합(중복이 없는 목록)을 포함

Rust SDK의 특수 컬렉션 목록을 보면 일부는 `Lookup`로 시작하고, 다른 일부는 `Unordered`를 가지고 있다는 것을 알 수 있습니다. 참조 문서에 기록된 대로, `Lookup`은 반복할 수 없지만 `Unordered` 컬렉션은 반복할 수 있습니다. 즉, 이 자료 구조의 내용 목록을 반복해야 하는 경우, 반복 가능한 자료 구조를 사용할 수 있습니다. 키로만 데이터를 추가 및 검색하고 키가 항상 알려진 경우, 반복 불가능한 컬렉션을 사용하는 것이 더 효율적입니다.

그렇다면 여기에 두 개의 자료 구조가 있는 이유는 무엇일까요? 다시 말하지만, 많은 수의 퍼즐이 존재한다면, 모든 퍼즐을 반복하여 해결되지 않은 퍼즐을 찾을 수 없을 수도 있습니다. 트랜잭션 당 가스 실행의 한계 때문에, 우리는 결국 이 한계를 초과하게 될 작업이 있을 수 있음을 인식해야 합니다. 해결되지 않은 퍼즐의 `UnorderedSet`에 수만 개의 퍼즐이 포함되어 있지 않을 것이라고 생각할 수도 있습니다. 이는 한계에 부딪히는 것을 피하는 한 가지 방법이지만, 나중에 다룰 `UnorderedSet`과 같은 반복 가능한 컬렉션을 통해 **페이지 매김**을 활용하는 방법을 배울 수도 있습니다.

<figure>
    <img src={bookPagination} alt="해시의 페이지화를 보여주는 책. peered_stagg.near 그림" width="600"/>
    <figcaption>컬렉션에 여러 페이지의 퍼즐 해시가 있다고 생각하세요.<br/>Art by <a href="https://twitter.com/pierced_stag" target="_blank">pierced_staggg.near</a></figcaption>
</figure>

<br/>

이전 챕터에서 기억했듯이, 모든 스마트 컨트랙트에는 `#[near_bindgen]` 매크로를 포함하는 기본 구조체가 있습니다.

:::note 기본 구조체 이름 지정 [이전 챕터](../01-basics/01-set-up-skeleton.md#start-writing-rust)에서 기본 구조체 이름을 `Contract`라고 지정했지만, 이 챕터에서는 `Crossword`라고 지정합니다.

NEAR의 스마트 컨트랙트들에서 사용되는 여러 규칙을 볼 수 있지만, 구조체의 이름은 중요하지 않으며, 이를 `Contract`라고 지정하는 데에 특별한 이유는 없습니다. 특별한 것이 없다는 것을 설명하기 위해, 다른 이름을 붙였을 뿐입니다. 그러나, 우리의 `impl` 블록이 `Crossword`라고 이름 붙여진 것은 의미가 *있습니다*. :::

반복 가능/불가능한 NEAR 컬렉션에서 구조체가 구성된 방식은 다음과 같습니다.

```rust reference
https://github.com/near-examples/crossword-tutorial-chapter-2/blob/276217ad82c64c610148e998ec926942ba910a12/contract/src/lib.rs#L73-L79
```

위에, 컬렉션인 `puzzles` 및 `unsolved_puzzles` 필드가 있습니다.

또한 우리는 `owner_id`를 통해 스마트 컨트랙트 개발에서 일반적인 패턴을 실행할 수 있도록 합니다. 이는 특정 함수에 대한 액세스를 제한할 수 있는 기본 권한 시스템을 구현합니다. 우리는 잠시 후에 이를 확장할 것입니다. 우리는 잠시 후에 이를 확장할 것입니다.

아래 스니펫은 `Crossword` 구조체 구현의 첫 번째 메서드를 보여줍니다. 여기서 `new` 함수는 이 두 가지 특수 컬렉션을 설정합니다.

```rust reference
https://github.com/near-examples/crossword-tutorial-chapter-2/blob/276217ad82c64c610148e998ec926942ba910a12/contract/src/lib.rs#L81-L90
```

따라서 초기화 함수(`new`) 실행 중에 `owner_id`를 설정합니다. 우리의 목적을 위해, 소유자는 컨트랙트 자체일 가능성이 높지만, 이는 DAO 또는 다른 사용자가 될 수도 있습니다. 다음으로 컬렉션 필드의 `b"c"`및 `b"u"` 비트를 살펴보겠습니다.

## 컬렉션의 접두사

위에서 `new` 함수는 고유한 접두사를 지정하여 구조체의 필드를 초기화합니다. [여기](/sdk/rust/contract-structure/nesting#traditional-approach-for-unique-prefixes)에서 접두사에 대해 자세히 알아볼 수 있지만, 이러한 접두사(`c` 및 `u`)는 짧고 달라야 한다는 것을 알아두세요.

새로운 십자말풀이 퍼즐을 추가하는 방법을 살펴보겠습니다. 여기에는 아직 정의하지 않은 새 구조체 `Answer`가 있습니다. 우리는 또한 `PuzzleStatus::Solved` 및 `PuzzleStatus::Unsolved` 와 같은 열거형(Enums)의 개념을 소개할 것입니다. 다음 섹션에서 이에 대해 다룰 것입니다.

십자말풀이 퍼즐이 하나만 있었던 이전 챕터와 달리, 새 컬렉션에 퍼즐을 삽입할 것이므로, `new_puzzle` 메서드를 만들어 보겠습니다.

```rust reference
https://github.com/near-examples/crossword-tutorial-chapter-2/blob/8ec941c82539e6eafa4971444e1da9e4819330d3/contract/src/lib.rs#L147-L163
```

이제 여러 퍼즐을 저장하도록 설정했습니다!

## 허가? 무허가?

<figure>
    <img src={guardsAroundContract} alt="스마트 컨트랙트에 가까운 라벨이 있는 미래형 클럽 앞의 가드 또는 바운서. connoisseur_dane.near 그림" width="600"/>
    <figcaption>어떤 계정이 스마트 컨트랙트 로직에 들어갈 수 있는지 보호합니다.<br/>Art by <a href="https://twitter.com/connoisseurdane" target="_blank">connoisseur_dane.near</a></figcaption>
</figure>

<br/>

**NEAR는 무허가인가요?**

그렇습니다.

**이전에 권한 시스템이란 무엇을 의미했으며 권한을 제어할 수 있는 방법은 무엇인가요?**

권한을 제어할 수 있는 두 가지 방법이 있습니다.

1. 스마트 컨트랙트 코드 자체에서
2. 함수 호출 액세스 키를 사용하는 경우

이 챕터의 뒷부분에서 두 번째 주제에 대해 다루겠지만, 우선은 첫 번째 항목에 중점을 둘 것입니다.

이전 스니펫에서 볼 수 있듯이 `new_puzzle` 메서드에서 가장 먼저 발생하는 일은 확인입니다. predecessor(가장 최근에 이 메서드를 호출한 사람, 때로는 서명자와 동일)가 컨트랙트 초기화 중에 설정한 `owner_id`와 동일한지 확인합니다.

다른 사람이 `new_puzzle`을 호출하려고 하면, 이 확인은 실패하고 스마트 컨트랙트가 패닉 상태가 되어 더 이상 진행되지 않습니다. 이 예제는 가장 간단한 형식의 권한을 설명하고 있습니다. 즉, 훨씬 더 복잡한 시스템이 존재할 수 있습니다. 예를 들어 SputnikDAO 스마트 컨트랙트는 맞춤형 정책을 구현합니다. 여기서 역할/정책을 작성하고 사용자에게 적용하는 것은 스마트 컨트랙트 개발자의 몫입니다. 경우에 따라 허용 목록(또는 화이트리스트)이 사용됩니다.

간단히 말해서, **전체 액세스 키가 있는 모든 계정은 스마트 컨트랙트의 모든 메서드를 호출할 수 있지만**, 이는 이들이 스마트 컨트랙트 실행을 계속할 수 있다는 의미는 아닙니다. 이는 개발자의 몫이고, `new_puzzle_`에 있는 것과 같은 가드를 통해 함수를 지킬 수 있습니다.

---

다음으로 구조체와 열거형에 대해 살펴보겠습니다.