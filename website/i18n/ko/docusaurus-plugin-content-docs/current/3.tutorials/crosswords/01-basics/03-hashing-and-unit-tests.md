---
sidebar_position: 4
sidebar_label: "정답 해시, 단위 테스트, 초기화 메서드"
title: "기본 해싱과 단위 테스트 추가에 대한 소개\""
---

import {Github} from "@site/src/components/codetabs"

import batchCookieTray from '/docs/assets/crosswords/batch-of-actions--dobulyo.near--w_artsu.jpg';

# 정답 해시 & 기본 단위 테스트 추가

이전 섹션에서는 십자말 풀이 정답을 스마트 컨트랙트의 `String` 자료형을 사용해 일반 텍스트로 저장했습니다. 사용자에게 정답을 숨기려는 경우, 이는 상태를 보는 모든 사람에게 공개되므로 좋은 접근 방식이 아닙니다. 대신 십자말 풀이 정답을 해시하고 저장해 보겠습니다. 데이터를 해시하는 방법은 여러 가지가 있지만 [Rust SDK](https://docs.rs/near-sdk/latest/near_sdk/env/fn.sha256.html)에서 사용할 수 있는 해시 알고리즘 중 하나인 `sha256`을 사용합시다.

:::info 해싱에 대한 알림 자세히 설명하진 않겠지만, 해싱은 주어진 입력에서 결과를 출력하는 "단방향" 함수입니다. 입력값이 있는 경우(이 경우 십자말 풀이 퍼즐 정답) 해시를 얻을 수 있지만, 해시가 있는 경우 입력값을 가져올 수 없습니다. 이 기본 아이디어는 정보 이론 및 보안의 기초입니다.

이 튜토리얼의 뒷부분에서 추가 NEAR 개념을 설명하기 위해 `sha256`를 사용하는 것에서, 암호화 키 쌍 사용으로 바꿀 것입니다.

해당 주제에 대한 [Evgeny Kapun](https://github.com/abacabadabacaba)의 프레젠테이션에서 해싱에 대해 자세히 알아보세요. 아래 스크린샷에 링크된 채널에서 다른 NEAR 관련 동영상을 찾을 수 있습니다.

[![Evgeny Kapun은 해시에 대한 세부 정보를 제공합니다](/docs/assets/crosswords/kapun-hashing.png)](https://youtu.be/PfabikgnD08) :::

## 빠른 반복 과정을 도와주는 단위 테스트(Unit Test)

이 **기초** 챕터의 첫 번째 섹션에서 언급했듯이, 스마트 컨트랙트는 기술적으로 매니페스트 파일에 정의된 라이브러리입니다. 우리의 목적을 위해, Rust로 라이브러리를 작성한 결과에는 "main" 함수가 없습니다. 개발 중에 `cargo run` 명령이 사용되는 많은 온라인 튜토리얼을 찾을 수 있겠지만, 우리에게는 이러한 사치가 없습니다. 그러나, 단위 테스트를 사용하여 스마트 컨트랙트와 상호 작용할 수 있습니다. 이는 컨트랙트를 작성하고 블록체인 네트워크에 배포하며 메서드를 호출하는 것보다 더 편리할 것입니다.

일을 더 쉽게 하기 위해 [hex 크레이트](https://crates.io/crates/hex)에 의존성(dependency)을 추가할 것입니다. 기억하시겠지만 의존성은 매니페스트 파일에 있습니다.

<Github language="rust" start="10" end="12" url="https://github.com/near-examples/crossword-tutorial-chapter-1/blob/master/contract/Cargo.toml" />

Let's write a unit test that acts as a helper during development. This unit test will sha256 hash the input **"near nomicon ref finance"** and print it in a human-readable, hex format. (We'll typically put unit tests at the bottom of the `lib.rs` file.)

<Github language="rust" start="43" end="60" url="https://github.com/near-examples/crossword-tutorial-chapter-1/blob/master/contract/src/lib.rs" />

:::info What is that `{:?}` thing? Take a look at different formatting traits that are covered in the [`std` Rust docs](https://doc.rust-lang.org/std/fmt/index.html#formatting-traits) regarding this. This is a `Debug` formatting trait and can prove to be useful during development. :::

Run the unit tests with the command:

```
cargo test -- --nocapture
```

You'll see this output:

```
…
running 1 test
Let's debug: "69c2feb084439956193f4c21936025f14a5a5a78979d67ae34762e18a7206a0f"
test tests::debug_get_hash ... ok

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s
```

This means when you sha256 the input **"near nomicon ref finance"** it produces the hash: `69c2feb084439956193f4c21936025f14a5a5a78979d67ae34762e18a7206a0f`

:::tip Note on the test flags You may also run tests using:

```
cargo test
```

Note that the test command we ran had additional flags. Those flags told Rust **not to hide the output** from the tests. You can read more about this in [the cargo docs](https://doc.rust-lang.org/cargo/commands/cargo-test.html#display-options). Go ahead and try running the tests using the command above, without the additional flags, and note that we won't see the debug message. :::

The unit test above is meant for debugging and quickly running snippets of code. Some may find this a useful technique when getting familiar with Rust and writing smart contracts. Next we'll write a real unit test that applies to this early version of our crossword puzzle contract.

## 일반 단위 테스트 작성

Let's add this unit test (inside the `mod tests {}` block, under our previous unit test) and analyze it:

<Github language="rust" start="62" end="92" url="https://github.com/near-examples/crossword-tutorial-chapter-1/blob/master/contract/src/lib.rs" />

처음 몇 줄의 코드는 단위 테스트를 작성할 때 일반적으로 사용됩니다. 이는 `VMContextBuilder`를 사용하여 트랜잭션에 대한 기본 컨텍스트를 생성한 다음, 테스트 환경을 설정합니다.

다음으로 컨트랙트를 나타내는 객체가 생성되고, `set_solution` 함수가 호출됩니다. 그 후, `guess_solution` 함수는 두 번 호출됩니다. 첫 번째는 잘못된 정답으로, 그 다음에는 올바른 정답으로 호출됩니다. 로그를 확인하여 함수가 예상대로 작동하는지 확인할 수 있습니다.

:::info Assertion에 대한 참고 사항 이 단위 테스트는 [`assert_eq!`](https://doc.rust-lang.org/std/macro.assert_eq.html) 매크로를 사용합니다. [`assert!`](https://doc.rust-lang.org/std/macro.assert.html) 및 [`assert_ne!`](https://doc.rust-lang.org/std/macro.assert_ne.html)와 같은 매크로들은 Rust에서 일반적으로 사용됩니다. 이들은 단위 테스트에 사용하기에 좋습니다. 그러나 이들은 컨트랙트 로직에 추가될 때 불필요한 오버헤드를 추가하므로, [`require!` macro](https://docs.rs/near-sdk/4.0.0-pre.2/near_sdk/macro.require.html) 매크로를 사용하는 것이 좋습니다. See more information on this and [other efficiency tips here](../../../2.build/2.smart-contracts/anatomy/reduce-size.md). :::

다시 말하지만, 다음을 사용하여 모든 단위 테스트를 실행할 수 있습니다.

```
cargo test -- --nocapture
```

:::tip 하나의 테스트만 실행 최신 테스트만 실행하려면 다음 명령을 사용하세요.

```
cargo test check_guess_solution -- --nocapture
```

:::

## `set_solution` 수정

이 챕터의 [[개요 섹션](00-overview.md)에서는 우리가 하나의 십자말풀이 퍼즐을 원하고, 퍼즐을 풀고 있는 사용자가 정답을 알 수 없어야 한다고 이야기하였습니다. 해시를 사용하여 이 문제를 해결하고, `crossword_solution`의 필드 자료형을 유지할 수 있으므로, `String`을 사용해도 잘 작동할 것입니다. 또한 개요에서, 십자말풀이 작성자만 정답을 설정할 수 있기를 원한다고 이야기하였습니다. 그러나, 우리의 함수 `set_solution`은 전체 액세스 키가 있는 모든 사람이 호출할 수 있습니다. 누군가가 NEAR 계정을 만들고 이 함수를 호출하여 정답을 변경하는 것은 사소한 일입니다. 문제를 해결해 보겠습니다.

스마트 컨트랙트를 배포한 직후에 정답을 한 번 설정해 봅시다.

Here we'll use the [`#[near]` macro](https://docs.rs/near-sdk/latest/near_sdk/attr.near.html) on a function called `new`, which is a common pattern.

<Github language="rust" start="9" end="17" url="https://github.com/near-examples/crossword-tutorial-chapter-1/blob/master/contract/src/lib.rs" />

새로운 컨트랙트에서 이 메서드를 호출해 봅시다.

```bash
# Go into the directory containing the Rust smart contract we've been working on
cd contract

# Build
cargo near build

# Create fresh account if you wish, which is good practice
near account delete-account crossword.friend.testnet beneficiary friend.testnet network-config testnet sign-with-legacy-keychain send

near account create-account fund-myself crossword.friend.testnet '1 NEAR' autogenerate-new-keypair save-to-legacy-keychain sign-as friend.testnet network-config testnet sign-with-legacy-keychain send

# Deploy
cargo near deploy crossword.friend.testnet without-init-call network-config testnet sign-with-legacy-keychain send

# Call the "new" method
near contract call-function as-transaction crossword.friend.testnet new json-args '{"solution": "69c2feb084439956193f4c21936025f14a5a5a78979d67ae34762e18a7206a0f"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' sign-as crossword.friend.testnet network-config testnet sign-with-legacy-keychain send
```

이제 십자말 풀이 정답이 대신 해시로 저장됩니다. 마지막 명령을 다시 호출하려고 하면 `#[init]` 매크로 덕분에 다음과 같은 오류 메시지가 표시됩니다. `The contract has already been initialized`

## 일괄 Action 사용

이것은 우리가 원하는 것에 가깝지만, 한 사람이 스마트 컨트랙트를 배포하였는데 **다른 사람**이 그들보다 먼저 `new` 함수를 빠르게 호출하면 어떻게 될까요? 컨트랙트를 배포한 동일한 사람이 정답을 설정하는지 확인하도록 하려면, 일괄 Action을 사용하면 됩니다. 게다가 한 번에 처리할 수 있는데 왜 두 개의 트랜잭션을 보내나요? ([여기](https://nomicon.io/RuntimeSpec/Transactions.html?highlight=batch#batched-transaction)에서 배치 트랜잭션에 대한 사양에서 다루는 기술 세부 정보입니다)

<figure>
    <img src={batchCookieTray} alt="트랜잭션을 나타내는 쿠키 시트입니다. 여기서 쿠키는 배포 및 함수 호출 작업입니다. dobulyo.near 그림."/>
    <figcaption className="full-width">Art by <a href="https://twitter.com/w_artsu" target="_blank" rel="noopener noreferrer">dobulyo.near</a></figcaption>
</figure><br/>

:::info 사용 중인 일괄 Action 일괄 Action은 초기화 함수를 배포하고 호출하려는 경우에 일반적으로 사용됩니다. 팩토리 패턴을 사용할 때도 마찬가지인데, 여기서 하위 계정(subaccount)이 생성되고 스마트 컨트랙트가 배포되며 키가 추가되고 함수가 호출되는 것은 일괄 Action을 통해 이루어집니다.

Here's a truncated snippet from a useful (though somewhat advanced) repository with a wealth of useful code:
<Github language="rust" start="172" end="177" url="https://github.com/near/core-contracts/blob/1720c0cfee238974ebeae8ad43076abeb951504f/staking-pool-factory/src/lib.rs" />

이 튜토리얼의 뒷부분에서 Action에 대해 살펴보겠지만, 그 동안 사양에 대한 편리한 [이 문서](https://nomicon.io/RuntimeSpec/Actions.html)를 읽어보셔도 좋습니다. :::

위의 정보 풍선에서 볼 수 있듯이 [배포](https://docs.rs/near-sdk/3.1.0/near_sdk/struct.Promise.html#method.deploy_contract) 및 [함수 호출](https://docs.rs/near-sdk/3.1.0/near_sdk/struct.Promise.html#method.function_call) Action을 일괄 처리할 수 있습니다 이것이 바로 우리가 십자말풀이 퍼즐을 위해 하고자 하는 것이며, 운 좋게도 NEAR CLI에는 특히 [이에 대한 플래그](https://docs.near.org/tools/near-cli#near-deploy)가 있습니다. 이것이 바로 우리가 십자말풀이 퍼즐을 위해 하고자 하는 것이며, 운 좋게도 NEAR CLI에는 특히 [이에 대한 플래그](https://docs.near.org/tools/near-cli#near-deploy)가 있습니다.

편리한 `--initFunction` 및 `--initArgs` 플래그를 사용하여 이를 다시 실행해 보겠습니다.

```bash
# Create fresh account if you wish, which is good practice
near account delete-account crossword.friend.testnet beneficiary friend.testnet network-config testnet sign-with-legacy-keychain send

near account create-account fund-myself crossword.friend.testnet '1 NEAR' autogenerate-new-keypair save-to-legacy-keychain sign-as friend.testnet network-config testnet sign-with-legacy-keychain send

# Deploy
cargo near deploy crossword.friend.testnet with-init-call new json-args '{"solution": "69c2feb084439956193f4c21936025f14a5a5a78979d67ae34762e18a7206a0f"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' network-config testnet sign-with-legacy-keychain send
```

일괄 Action을 사용하고 있으므로, 아무도 우리보다 먼저 이 `new` 메서드를 호출할 수 없습니다.

:::note 일괄 Action 실패
일련의 일괄 Action 중 하나의 Action이 실패하면 전체 트랜잭션이 되돌려집니다. 나의 호출이 실패하면 여러 교차 컨트랙트 호출(cross contract call)이 포함된 복잡한 트랜잭션이 되돌려지는 작업 증명과 달리, 샤딩 지분 증명 시스템은 그렇게 작동하지 않기 때문에 참고하는 것이 좋습니다. NEAR를 사용하면 교차 컨트랙트 호출이 콜백을 사용하여 예상되는 동작을 보장합니다.
:::

## 프론트엔드 준비

이전 섹션에서 우리는 상태에서 값을 반환하는 함수를 명시적으로 가지지 않고 `curl` 명령을 사용하여 컨트랙트의 상태를 볼 수 있음을 보여주었습니다. 이를 설명하고 정답을 해싱했으므로, 이제 짧은 보기 전용 함수 `get_solution`을 추가해 보겠습니다.

다음 섹션에서는 하드코딩된 십자말풀이 퍼즐을 위한 간단한 프론트엔드를 추가합니다. 우리는 최종 정답 해시를 얻을 때 함수를 쉽게 호출하기를 원할 것입니다. 이 기회를 사용하여 함수 `get_puzzle_number`와 함수가 반환하는 상수를 제거할 수 있습니다. 이는 정보 제공 목적으로 사용되었기 때문입니다.

또한 `guess_solution`이 Bool 값을 반환하도록 수정하여 프론트엔드 작업을 더 쉽게 할 것입니다.

<Github language="rust" start="19" end="34" url="https://github.com/near-examples/crossword-tutorial-chapter-1/blob/94f42e75cf70ed2aafb9c29a1faa1e21f079a49e/contract/src/lib.rs" />

`get_solution` 메서드는 다음과 같이 호출할 수 있습니다.

```bash
near contract call-function as-read-only crossword.friend.testnet get_solution json-args {} network-config testnet now
```

다음 섹션에서는 간단한 프론트엔드를 추가합니다. 다음 챕터에서는 이 아이디어 기반으로 구축된 더 많은 NEAR 개념을 설명합니다.
