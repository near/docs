---
sidebar_position: 3
sidebar_label: "기본 코드 추가, 하위 계정 생성 및 메서드 호출"
title: "스마트 컨트랙트 변경 및 개발 기초 학습"
---

import teachingDeployment from '/docs/assets/crosswords/teaching--jeheycell.near--artcultureac.jpeg';
import createAccount from '/docs/assets/crosswords/creating account with text--seanpineda.near--_seanpineda.png';
import chalkboardErase from '/docs/assets/crosswords/erasing-subaccount-chalkboard--iambon.near--JohnreyBona.mp4';

# 컨트랙트 수정

이 섹션에서는 이전 섹션의 스마트 컨트랙트 뼈대를 수정합니다. 이 튜토리얼은 기본을 학습하기 위해, 다소 쓸데없는 방식으로 컨트랙트를 작성하는 것부터 시작합니다. 이를 확실하게 이해하면, 십자말풀이가 나올 때까지 이를 반복할 것입니다.

## 상수, 필드, 함수 추가

컨트랙트를 다음과 같이 수정하겠습니다.

```rust reference
https://github.com/near-examples/crossword-snippets/blob/00223633f3e6b5b7137097e996b0aee90d632b0f/src/lib.rs#L1-L29
```

여기에서 몇 가지 작업을 수행했습니다.
1. 퍼즐 번호에 대한 상수를 설정합니다.
2. 메인 구조체에 `crossword_solution` 필드를 추가했습니다.
3. 세 가지 함수를 구현했습니다. 하나는 보기 전용이고, 두 개는 상태를 변경할 수 있는 함수입니다.
4. 로깅을 사용했습니다. 이는 `near_sdk` 크레이드에서 `env`를 가져오는 데에 필요합니다.

계속 진행하기 전에, 상수부터 시작하여 이러한 변경 사항과 이에 대해 생각하는 방법에 대해 이야기해 보겠습니다.

`const PUZZLE_NUMBER: u8 = 1;`

이는 인메모리 값으로, 가상 머신에서 스마트 컨트랙트가 가동되고 실행될 때 해당 값 `1`이 컨트랙트 코드에 포함된다는 의미입니다. 이것은 다음에 올 변경과 `#[near_bindgen]` 매크로를 포함하는 구조체에 필드가 추가된다는 점에서 다릅니다. `crossword_solution`필드는 `String` 자료형을 가지고 있고, 이 구조체에 추가된 다른 필드와 마찬가지로 값이 **영구 스토리지**에 저장됩니다. NEAR를 사용하면 스토리지 비용은 기본 NEAR 토큰(Ⓝ)을 통해 "지불"됩니다. 이는 "상태 임대료"가 아니라 스토리지 스테이킹이고, 한번 지불하고 스토리지 삭제시 반환됩니다. 이는 사용자가 자신의 상태를 깨끗하게 유지하도록 장려하여 보다 건강한 체인을 만드는 데 도움이 됩니다. 스토리지 스테이킹에 대한 자세한 내용은 [여기](https://docs.near.org/concepts/storage/storage-staking)를 참조하세요.

이제 세 가지 새로운 함수를 살펴보겠습니다.

```rust
pub fn get_puzzle_number(&self) -> u8 {
    PUZZLE_NUMBER
}
```

[이 문서의 가변성(mutability) 섹션](/sdk/rust/contract-interface/contract-mutability)에서 다룬 것처럼, "보기 전용" 함수는 `&self` 양옆에 여는 괄호가 있고 "변경 메서드" 또는 가변 함수는 `&mut self`가 있습니다. 위의 함수에서, `PUZZLE_NUMBER`가 반환됩니다. 는 읽기 전용이므로 사용자는 트랜잭션에 서명하지 않아도 적절한 RPC 엔드포인트를 사용하여 이 메서드를 호출할 수 있습니다. GET 요청처럼 생각하되, RPC 엔드포인트([해당 문서](https://docs.near.org/api/rpc/contracts#call-a-contract-function) 참조)를 사용한다고 보면 됩니다.

반면, 변경 가능 함수에는 서명된 트랜잭션이 필요합니다. 첫 번째 예는 일반적인 접근 방식으로, 여기선 사용자가 필드에 할당된 매개 변수를 제공하게 됩니다.

```rust
pub fn set_solution(&mut self, solution: String) {
    self.crossword_solution = solution;
}
```

다음에 스마트 컨트랙트가 호출되면, 컨트랙트의 `crossword_solution` 필드가 변경됩니다.

두 번째 예는 데모 목적으로 제공됩니다.

```rust
pub fn guess_solution(&mut self, solution: String) {
    if solution == self.crossword_solution {
        env::log_str("You guessed right!")
    } else {
        env::log_str("Try again.")
    }
}
```

상태에 아무 것도 저장하지 않고 로깅만 하는 방법에 주목하십시오. 이것이 왜 가변적이어야 할까요?

깅은 궁극적으로 블록체인에 추가된 블록 내에서 캡처됩니다. (더 정확하게는, 트랜잭션은 청크 내에 포함되고 청크가 블록에 포함됩니다.) [Nomicon 사양](https://nomicon.io/Architecture.html?highlight=chunk#blockchain-layer-concepts)에 대한 자세한 내용을 참조하세요.) 따라서 이는 구조체 필드의 데이터를 변경하지 않지만, 로그에 일정량의 가스가 필요하고, 이에 따라 가스를 지불하는 계정에 의해 서명된 트랜잭션을 요구합니다.

---

## 구축 및 배포

우리가 하고자 하는 것은 다음과 같습니다.

<figure>
    <img src={teachingDeployment} alt="선생님은 스마트 컨트랙트를 적절하게 배포하는 방법에 대한 지침이 있는 칠판을 보여줍니다. 1. 컨트랙트 구축. 2. 하위 계정 만들기(또는 계정이 있는 경우 삭제하고 다시 만들기) 3. 하위 계정에 배포 4. 상호작용 jeheycell.near 그림"/>
    <figcaption className="full-width"><a href="https://twitter.com/artcultureac" target="_blank">jeheycell.near</a> 그림</figcaption>
</figure>

### 컨트랙트 구축

이전 섹션에서 복사한 Rust 컨트랙트의 뼈대에는 각각 OS X/Linux 및 Windows용 `build.sh` 및 `build.bat` 파일이 있습니다. 컨트랙트 구축에 대한 자세한 내용은 [이 섹션](/sdk/rust/building/basics)을 참조하세요.


빌드 스크립트를 실행하면, 컴파일된 Wasm 파일이 Rust가 설정한 기본 폴더 구조에 묻히지 않고 `res` 폴더 에 복사되는 것을 볼 수 있습니다.

    ./build.sh

### 하위 계정(subaccount) 생성

이전 섹션을 따라했다면, NEAR CLI가 설치되어 있고 컴퓨터에 전체 액세스 키가 있을 것입니다. 개발하는 동안 하위 계정을 만들고, 거기에 컨트랙트를 배포하는 것이 가장 좋습니다. 이렇게 하면 하위 계정을 쉽고 빠르게 삭제하고 다시 만들어, 상태를 신속하게 지우고 처음부터 시작할 수 있습니다. NEAR CLI를 사용하여 NEAR 1개로 하위 계정 및 자금을 생성해 보겠습니다.

    near create-account crossword.friend.testnet --masterAccount friend.testnet --initialBalance 1

홈 디렉토리의 `.near-credentials`를 다시 보면, 자체 키 쌍이 있는 하위 계정의 새 키가 표시됩니다. 이 새 계정은 이를 생성한 계정과 의도 및 목적 차원에서 완전히 다릅니다. 기본적으로 이는 상위 계정과 특별한 관계가 없기 때문에, `alice.testnet`가 될 수도 있습니다. 명확하게 말하면 나중에 다룰 일괄 Action을 사용하여 단일 트랜잭션에서 수행되지 않는 한, `friend.testnet`는 삭제하거나 `.crossword.friend.testnet`에 배포될 수 없습니다.

:::info 하위 계정 중첩 `another.crossword.friend.testnet` 계정을 가질 수도 있지만, 이 계정은 `crossword.friend.testnet`에 의해 생성되어야 합니다.

계정은 "한 단계 더 깊은" 하위 계정만 만들 수 있기 때문에, `friend.testnet`은 `another.crossword.friend.testnet`을 만들 수 **없습니다**.

`mike.near`에 속하는 두 개의 키는 다음 그림과 같이 `new.mike.near`를 생성할 수 있습니다. 나중에 액세스 키에 대한 개념을 더 자세히 살펴보겠습니다.

<figure>
    <img src={createAccount} alt="두 그림이 하위 계정을 결합하는 계정 만들기를 묘사합니다. seanpineda.near 그림"/>
    <figcaption className="full-width"><a href="https://twitter.com/_seanpineda" target="_blank">seanpineda.near</a> 그림</figcaption>
</figure>

:::

최상위 계정이나 암시적 계정(Implicit Account)에 대해서는 다루지 않지만, [여기에서](https://docs.near.org/docs/concepts/account) 자세한 내용을 읽을 수 있습니다.

이제 하위 계정에 대한 키 쌍이 있으므로, 컨트랙트를 테스트넷에 배포하고 상호 작용할 수 있습니다!

#### 코드해시란 무엇인가요?

계정에 스마트 컨트랙트를 배포할 준비가 거의 다 되었지만, 먼저 배포할 계정을 살펴보겠습니다. 이것은 이전에 생성한 하위 계정임을 기억하세요. NEAR CLI로 상태를 쉽게 보고 싶다면, 다음 명령을 실행할 수 있습니다.

    near state crossword.friend.testnet

다음과 같은 내용이 표시됩니다.

```js
{
  amount: '6273260568737488799170194446',
  block_hash: 'CMFVLYy6UP6c6vrWiSf1atWviayfZF2fgPoqKeUVtLhi',
  block_height: 61764892,
  code_hash: '11111111111111111111111111111111',
  locked: '0',
  storage_paid_at: 0,
  storage_usage: 4236,
  formattedAmount: '6,273.260568737488799170194446'
}
```

여기 `code_hash`에 있는 것이 다입니다. 이는 이 계정에 배포된 컨트랙트가 없음을 의미합니다.

컨트랙트를 (생성한 하위 계정으로) 배포하고 다시 확인해 봅시다.

### 컨트랙트 배포

명령줄 애플리케이션에서 `res` 디렉토리가 포함된 디렉터리에 위치한지 확인한 후, 다음을 실행합니다.

```bash
    near deploy crossword.friend.testnet --wasmFile res/my_crossword.wasm
```

축하합니다. 스마트 컨트랙트를 배포했습니다! Note that NEAR CLI will output a link to [NEAR Explorer](https://nearblocks.io/) where you can inspect details of the transaction.

마지막으로 다음 명령을 다시 실행하면 `code_hash`가 더 이상 모두 1이 아님을 알 수 있습니다. 이는 이제 계정에 배포된 스마트 컨트랙트의 해시입니다.

```bash
    near state crossword.friend.testnet
```

**참고**: 컨트랙트 배포는 종종 명령줄(command line)에서 수행됩니다. 프론트엔드를 통해 배포하는 것이 _기술적으로_ 가능할 수 있지만, CLI가 가장 좋은 접근 방식일 것입니다. 팩토리 모델을 사용하려는 경우(스마트 컨트랙트가 코드를 하위 계정에 배포하는 경우) 이는 튜토리얼에서 다루지 않지만 [SputnikDAO에서 컨트랙트](https://github.com/near-daos/sputnik-dao-contract)를 참조할 수 있습니다.

### 컨트랙트 메서드 호출 (interact!)

먼저 보기 전용 메서드를 호출해 보겠습니다.

```bash
    near view crossword.friend.testnet get_puzzle_number
```

명령 프롬프트에 `1`이라는 결과가 표시됩니다. 이 메서드는 인수를 사용하지 않으므로 아무 것도 전달하지 않습니다. `'{}'`를 명령 끝에 추가할 수도 있습니다.

다음으로 십자말풀이 답을 문자열 인자로 추가합니다(나중에 더 나은 방법으로 수행할 것입니다):

```bash
    near call crossword.friend.testnet set_solution '{"solution": "near nomicon ref finance"}' --accountId friend.testnet
```

:::info Windows 사용자 명령 프롬프트는 위와 같이 작은 따옴표를 좋아하지 않으므로, Windows 사용자는 이러한 명령을 약간 수정해야 합니다. 명령은 다음과 같이 이스케이프 처리된 따옴표를 사용해야 합니다.

```bash
    near call crossword.friend.testnet set_solution "{\"solution\": \"near nomicon ref finance\"}" --accountId friend.testnet
```

:::

NEAR CLI의 [`view` 명령](https://docs.near.org/docs/tools/near-cli#near-view)을 사용했으며, `--accountId` 플래그를 포함하지 않았습니다. 앞서 언급했듯이 트랜잭션에 서명하지 않기 때문입니다. 이 두 번째 메서드는 트랜잭션에 서명하는 NEAR CLI의 [`call` 명령]](https://docs.near.org/docs/tools/near-cli#near-call)을 사용하며, 사용자로 하여금 자격 증명 파일을 사용하여 트랜잭션에 서명할 NEAR 계정을 지정하도록 요구합니다.

마지막 메서드는 상태에 저장된 것에 대해 인자를 확인하고, 십자말풀이가 올바른지 여부에 대한 로그를 작성합니다.

맞았을 때:

```bash
    near call crossword.friend.testnet guess_solution '{"solution": "near nomicon ref finance"}' --accountId friend.testnet
```

다음과 같은 내용이 표시됩니다.

![성공적인 솔루션 추측을 위한 로그가 명령줄에 표시됩니다](/docs/assets/crosswords/cli-guess-solution.png)

우리가 작성한 로그가 출력되고 NEAR 익스플로러에 대한 링크가 표시됩니다.

틀렸을 때:

```bash
    near call crossword.friend.testnet guess_solution '{"solution": "wrong answers here"}' --accountId friend.testnet
```

상상할 수 있듯이 위의 명령은 비슷한 것을 표시하지만 로그는 잘못된 답을 제공했음을 나타냅니다.

## 계정 컨트랙트 및 상태 리셋

이 튜토리얼에서는 이 스마트 컨트랙트를 반복할 것이며, 경우에 따라 생성한 NEAR 하위 계정으로 새로 시작하는 것이 가장 좋습니다 따라야 할 패턴은 계정을 **삭제**(남은 모든 테스트넷 Ⓝ을 수신자에게 전송)한 다음 계정을 **다시 만드는** 것입니다.

<video autoPlay controls loop>
    <source src={chalkboardErase} type="video/mp4" />
    Sorry, your browser doesn't support embedded videos.
</video>

<figure>
    <figcaption>다시 만든 하위 계정을 삭제하면 상태를 지우고 새로 시작할 수 있습니다.<br/><a href="https://twitter.com/JohnreyBona" target="_blank">iambon.near</a>의 애니메이션</figcaption>
</figure>

NEAR CLI를 사용하면 명령이 다음과 같이 표시됩니다.

```bash
    near delete crossword.friend.testnet friend.testnet
    near create-account crossword.friend.testnet --masterAccount friend.testnet
```

첫 번째 명령은 `crossword.friend.testnet`를 삭제하고, 남은 NEAR를 `friend.testnet`에게 보냅니다.

## 마무리

지금까지 우리는 스마트 컨트랙트의 단순화된 버전을 작성하고 초보자 방식으로 십자말풀이에 접근하고 있습니다. 블록체인은 개방형 원장이므로 모든 사람이 스마트 컨트랙트 및 트랜잭션의 상태를 볼 수 있습니다.

:::info 어떻게 할 수 있나요? `view_state`에 해당하는 RPC 엔드포인트를 치고 직접 확인할 수 있습니다. 참고: 이 간단한 예제는 데모 목적으로 제공되지만, 반환되는 문자열은 Borsh로 직렬화되고 문자보다 더 많은 정보를 포함합니다.

```bash
    curl -d '{"jsonrpc": "2.0", "method": "query", "id": "see-state", "params": {"request_type": "view_state", "finality": "final", "account_id": "crossword.friend.testnet", "prefix_base64": ""}}' -H 'Content-Type: application/json' https://rpc.testnet.near.org
```

![스마트 컨트랙트 상태를 반환하는 RPC 엔드포인트에 대한 curl 요청을 보여주는 터미널 화면의 스크린샷](/docs/assets/crosswords/rpc-api-view-state.png)

[NEAR 문서](https://docs.near.org/docs/api/rpc/contracts#view-contract-state)에서 이 RPC 엔드포인트에 대해 자세히 알아보세요. :::

이 섹션에서는 십자말풀이 답을 일반 텍스트로 저장했는데, 이 퍼즐의 플레이어에게 정답을 숨기려는 경우 이는 좋은 생각이 아닐 수 있습니다. 구조체의 `show_solution` 필드를 반환하는 호출된 `show_solution` 함수가 없더라도, 값은 상태에 투명하게 저장됩니다. 지금은 컨트랙트 상태를 볼 수 없지만, [여기에서 문서화](https://docs.near.org/docs/api/rpc/contracts#view-contract-state)되어 쉽게 볼 수 있습니다.

다음 섹션에서는 십자말풀이 퍼즐을 플레이하는 최종 사용자에게 답을 숨기는 방법을 알아봅니다.
