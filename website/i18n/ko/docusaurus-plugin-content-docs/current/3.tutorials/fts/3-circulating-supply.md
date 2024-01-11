---
id: circulating-supply
title: 순환 공급(Circulating Supply) 생성
sidebar_label: 순환 공급
---


이전 튜토리얼에서는 대체 가능한 토큰(FT)이 무엇이며, 스마트 컨트랙트에서 토큰을 정의하는 방법을 살펴보았습니다. 이 튜토리얼에서는 컨트랙트 소유자에게 속한 순환 공급을 생성하고, NEAR 지갑에서 메타데이터와 함께 모든 토큰을 보는 방법에 대해 배웁니다.

시작하려면 이전 튜토리얼에서 작성한 코드를 사용하거나, 레퍼지토리의 `2.define-a-token` 폴더로 이동하세요. 레퍼지토리를 복제하지 않은 경우 [컨트랙트 아키텍처](1-skeleton.md)를 참조하여 시작하세요.

이 튜토리얼의 완성된 코드를 보려면 `3.initial-supply` 폴더에서 찾을 수 있습니다.

## 소개

NEAR의 모든 대체 가능한 토큰 컨트랙트에는 순환 공급(Circulating Supply)으로 알려진 것이 있습니다. 이것은 컨트랙트에 존재하고 트랜잭션에 사용 가능한 토큰의 수입니다.

컨트랙트를 작성할 때 이를 구현할 수 있는 다양한 방법이 있습니다. 몇 가지 예는 다음과 같습니다.
- 시작 총 공급량을 지정하고 일련의 매개변수에 따라 분배합니다(Benji는 20%, Josh는 2.5%, 나머지는 Mike에게 할당).
- 모든 사람이 최대 X 개의 토큰을 청구할 수 있는 선착순 서비스 풀을 만드세요.
- 주문형 토큰을 생성하여 지정된 상한선까지 순환 공급이 꾸준히 증가하도록 합니다.

그러나 가장 간단한 방법은 컨트랙트를 초기화할 때 총 공급량을 지정하는 것입니다. 그런 다음, 전체 순환 공급이 생성되어 컨트랙트 소유자에게 전송됩니다. 그러면 소유자는 원하는 대로 토큰을 양도하거나 판매할 수 있습니다. 초기 공급이 생성되면 더 이상 FT를 발행할 수 없습니다. 이것은 순환 공급이 항상 총 공급과 동일하다는 것을 의미합니다.

## 컨트랙트 수정

이 로직을 구현하려면 스마트 컨트랙트에서 두 가지 사항을 추적해야 합니다.
- 소유한 토큰 수와 계정의 매핑
- 토큰의 총 공급량

매핑은 컨트랙트 내에서 언제든지 주어진 계정이 소유한 토큰을 쉽게 확인하거나 수정할 수 있도록 합니다. 또한 표준에 따라 컨트랙트에서 토큰 공급을 쿼리하는 기능이 필요하므로, 총 공급량을 추적해야 합니다.

### 공급 설정

`src/lib.rs` 파일로 이동하여 `Contract` 구조체에 다음을 추가합니다.

```rust reference
https://github.com/near-examples/ft-tutorial/blob/main/3.initial-supply/src/lib.rs#L21-L32
```

이제 토큰을 소유자의 계정에 입금하는 기능을 추가하고 싶을 것입니다. 금액과 계정 ID를 받아 입금 로직을 수행하는 헬퍼 함수를 ​​생성하면 됩니다. 먼저 파일 구조가 다음과 같이 보이도록 새 파일 `src/internal.rs`을 만듭니다.

```
src
  ├── ft_core.rs
  ├── internal.rs
  ├── lib.rs
  ├── metadata.rs
  └── storage.rs
```

`internal.rs` 파일 내에서, 다음 코드를 추가하여, `AccountId`와 `Balance`를 가져와 계정의 현재 FT 공급량에 금액을 추가하는 `internal_deposit`라는 메서드를 만듭니다

```rust reference
https://github.com/near-examples/ft-tutorial/blob/main/3.initial-supply/src/internal.rs#L1-L18
```

이제 FT 입금 기능이 준비되었으므로, `src/lib.rs` 파일로 다시 이동하여 `internal` 모듈을 추가합니다.

```rust reference
https://github.com/near-examples/ft-tutorial/blob/main/3.initial-supply/src/lib.rs#L8-L10
```

또한 `new` 초기화 함수에 다음 코드를 추가합니다.

```rust
#[init]
pub fn new(
    owner_id: AccountId,
    total_supply: U128,
    metadata: FungibleTokenMetadata,
) -> Self {
    // Create a variable of type Self with all the fields initialized. 
    let mut this = Self {
        // Set the total supply
        total_supply: total_supply.0,
        // Storage keys are simply the prefixes used for the collections. This helps avoid data collision
        accounts: LookupMap::new(StorageKey::Accounts.try_to_vec().unwrap()),
        metadata: LazyOption::new(
            StorageKey::Metadata.try_to_vec().unwrap(),
            Some(&metadata),
        ),
    };

    // Set the owner's balance to the total supply.
    this.internal_deposit(&owner_id, total_supply.into());

    // Return the Contract object
    this
}
```

이렇게 하면 전달한 총 공급량을 초기화하고, 소유자 계정에 총 공급량을 추가하는 `internal_deposit` 함수를 호출합니다.

### 공급량 가져오기

이제 총 공급량을 설정하는 방법을 만들었으므로, 특정 사용자에 대한 잔고뿐만 아니라 총 공급량을 쿼리하는 방법도 있어야 할 것입니다. [표준](https://nomicon.io/Standards/Tokens/FungibleToken/Core)에서는 이러한 작업을 수행하기 위해 스마트 컨트랙트에 두 가지 메서드가 있어야 한다고 명시합니다.
- **`ft_total_supply`**
- **`ft_balance_of`**

`src/ft_core.rs` 파일로 이동하여, 이러한 함수에 다음 코드를 추가합니다.

```rust reference
https://github.com/near-examples/ft-tutorial/blob/main/3.initial-supply/src/ft_core.rs#L83-L91
```

이 시점에서 초기 토큰 공급을 생성하고 주어진 계정의 잔고를 쿼리하는 데 필요한 모든 것이 있습니다. 그러나, 우리가 해결해야 할 문제가 있습니다. 총 공급량이 생성되었고 컨트랙트 소유자가 이를 소유한다는 것을 지갑은 어떻게 알 수 있나요? 우리 컨트랙트가 대체 가능한 토큰 컨트랙트라는 것을 어떻게 알 수 있나요? 컨트랙트를 배포하고 설정 프로세스를 실행하는 경우, 컨트랙트 정보를 쿼리할 수 있지만 소유자의 NEAR 지갑에는 FT가 표시되지 않습니다.

## 이벤트

Have you ever wondered how the wallet knows which FTs you own and how it can display them in the [balances tab](https://testnet.mynearwallet.com/)? 원래는 인덱서가 사용되었으며, 계정에서 `ft_`로 시작하는 모든 함수를 수신했습니다. 그런 다음 이러한 컨트랙트는 당신의 계정에서 FT 컨트랙트일 가능성이 있는 것으로 표시되었습니다.

잔고 탭으로 이동하면 지갑은 방금 작성한 `ft_balance_of` 함수를 사용하여 소유한 FT 수에 대한 모든 컨트랙트를 쿼리합니다.

### 문제점 {#the-problem}

컨트랙트에 플래그를 지정하는 이 방법은 각각의 FT 기반 애플리케이션이 FT를 생성하거나 전송하는 고유한 방법을 가질 수 있기 때문에 신뢰할 수 없었습니다. 또한 앱에서는 배치 함수를 사용하여 한 번에 많은 토큰을 전송하거나 발행하는 것이 일반적입니다.

### 해결책 {#the-solution}

FT가 전송, 발행 또는 소각될 때마다 스마트 컨트랙트가 이벤트를 발생시킬 수 있도록 표준이 도입되었습니다. 이 이벤트는 로그 형식이었습니다. 컨트랙트가 함수를 구현하는 방법에 관계없이 인덱서는 이제 이러한 표준화된 로그를 수신할 수 있습니다.

표준에 따라, FT가 전송되거나 발행될 때 실행되는 로깅 기능을 구현해야 합니다. 이 경우 컨트랙트는 소각을 지원하지 않으므로, 지금은 그것에 대해 걱정할 필요는 없습니다.

로그가 `"EVENT_JSON:"`으로 시작되어야 한다고 표준에서 정의하고 있음을 기억하는 것이 중요합니다. 그러나 로그 구조에는 항상 다음 3가지가 포함되어야 합니다.

- **standard**: 표준의 현재 이름(예: nep141)
- **version**: 사용 중인 표준 버전(예: 1.0.0)
- **event**: 내보내는 이벤트 목록

이벤트 인터페이스는 전송을 기록하는지 발행을 기록하는지에 따라 다릅니다. 두 이벤트에 대한 인터페이스는 아래에 설명되어 있습니다.

**전송 이벤트**:
- **old_owner_id**: FT의 이전 소유자
- **new_owner_id**: FT를 전송받은 새 소유자
- **amount**: 전송된 토큰의 수
- *선택 사항* - **memo**: 이벤트에 포함할 선택적 메시지

**발행 이벤트**:
- **owner_id**: FT가 발행되는 소유자
- **amount**: 발행되는 FT의 양
- *선택 사항* - **memo**: 이벤트에 포함할 선택적 메시지

### 예시 {#examples}

표준에 대한 이해를 돕기 위해 두 가지 시나리오를 살펴보고 로그가 어떻게 표시되는지 살펴보겠습니다.

#### 시나리오 A - 간단한 발행

이 시나리오에서 Benji는 메시지를 포함하지 않고 자신에게 50 FT를 발행합니다. 로그는 다음과 같아야 합니다.

```json
EVENT_JSON:{
  "standard": "nep141",
  "version": "1.0.0",
  "event": "ft_mint",
  "data": [
    {"owner_id": "benji.testnet", "amount": "50"}
  ]
}
```

#### 시나리오 B - 배치(Batch) 전송

이 시나리오에서 Benji는 배치 전송을 수행하려고 합니다. 그는 Jada, Mike, Josh 및 Maria에게 FT를 보낼 것입니다. 로그는 다음과 같습니다.

```json
EVENT_JSON:{
    "standard": "nep141",
    "version": "1.0.0",
    "event": "ft_transfer",
    "data": [
        {"old_owner_id": "benji.near", "new_owner_id": "josh.near", "amount": "1", "memo": "go team"},
        {"old_owner_id": "benji.near", "new_owner_id": "mike.near", "amount": "9000"},
        {"old_owner_id": "benji.near", "new_owner_id": "jada.near", "amount": "500"},
        {"old_owner_id": "benji.near", "new_owner_id": "maria.near", "amount": "500"}
    ]
}
```

## 컨트랙트 수정 {#modifications-to-the-contract}

이 시점에서 최종 목표가 무엇인지 잘 이해하고 있어야 하므로 작업을 시작하겠습니다! `src` 디렉토리를 열고 `events.rs`라는 새 파일을 만듭니다. 이는 로그 구조체가 존재하는 위치입니다.

### 이벤트 파일 생성 {#events-rs}

다음을 파일에 복사합니다. 이것은 `EventLog`, `FtMintLog`, 및 `FtTransferLog`에 대한 구조체의 개요를 설명합니다. 또한 `EventLog`를 로깅할 때마다 `EVENT_JSON:`가 앞에 붙는 방식을 추가했습니다.

```rust reference
https://github.com/near-examples/ft-tutorial/blob/main/3.initial-supply/src/events.rs#L1-L121
```

### 모듈 및 상수 추가 {#lib-rs}

이제 새 파일을 만들었으므로 `lib.rs` 파일에 모듈을 추가해야 합니다.

```rust reference
https://github.com/near-examples/ft-tutorial/blob/main/3.initial-supply/src/lib.rs#L1-L13
```

### 발행된 총 공급량 로깅

이제 모든 도구가 설정되었으므로 실제 로깅 기능을 구현할 수 있습니다. 컨트랙트가 초기화될 때 맨 처음에 토큰을 발행하기 때문에, 로그를 어디에 두어야 하는지는 간단합니다. `src/lib.rs` 파일을 열고 초기화 함수 `new`의 하단으로 이동합니다. 여기에서 발행을 위한 로그를 구성합니다.

```rust reference
https://github.com/near-examples/ft-tutorial/blob/main/3.initial-supply/src/lib.rs#L63-L97
```

완료되면 이벤트 표준의 기반을 성공적으로 구현했으며, 이제 테스트를 시작할 때입니다.

## 컨트랙트 배포 {#redeploying-contract}

기존 컨트랙트가 이미 초기화되었으니 하위 계정을 생성하여 배포해 봅시다.

### 하위 계정(sub-account) 생성

다음 명령을 실행하여 초기 잔고가 25 NEAR인 하위 계정 `events`을 만듭니다.

```bash
near create-account events.$FT_CONTRACT_ID --masterAccount $FT_CONTRACT_ID --initialBalance 25
```

다음으로 개발을 쉽게 하기 위해 환경 변수를 내보낼 수 있습니다.

```bash
export EVENTS_FT_CONTRACT_ID=events.$FT_CONTRACT_ID
```

빌드 스크립트를 사용하여 이전 튜토리얼에서와 같이 컨트랙트 배포를 빌드합니다.

```bash
cd 1.skeleton && ./build.sh && cd .. && near deploy --wasmFile out/contract.wasm --accountId $EVENTS_FT_CONTRACT_ID
```

### 초기화 {#initialization}

이제 컨트랙트가 배포되었으므로, 이를 초기화하고 총 공급량을 생성할 차례입니다. 초기 공급량을 1000 `gtNEAR`로 만들어 봅시다. 소수점 이하 24자리가 존재하므로, 총 공급 필드에서 `1000` 뒤에 24개의 0을 입력해야 합니다.

```bash
near call $EVENTS_FT_CONTRACT_ID new_default_meta '{"owner_id": "'$EVENTS_FT_CONTRACT_ID'", "total_supply": "1000000000000000000000000000"}' --accountId $EVENTS_FT_CONTRACT_ID
```

CLI에서 출력을 확인하여 모든 것이 제대로 진행되었는지 확인할 수 있습니다.

```bash
Scheduling a call: events.goteam.testnet.new_default_meta({"owner_id": "events.goteam.testnet", "total_supply": "1000000000000000000000000000"})
Doing account.functionCall()
Receipt: BmD2hQJCUEMmvaUd45qrt7S55cewUXQSTPWT21Um3gXd
    Log [events.goteam.testnet]: EVENT_JSON:{"standard":"nep141","version":"1.0.0","event":"ft_mint","data":[{"owner_id":"events.goteam.testnet","amount":"1000000000000000000000000000","memo":"Initial token supply is minted"}]}
Transaction Id BrEBqE9S3tTBcgDUU6ZyszjAbaR4wkPyEN1viYKaXpgh
To see the transaction in the transaction explorer, please open this url in your browser
https://explorer.testnet.near.org/transactions/BrEBqE9S3tTBcgDUU6ZyszjAbaR4wkPyEN1viYKaXpgh
''
```

이벤트가 제대로 기록된 것을 확인할 수 있습니다!

### 공급량 정보 쿼리 {#testing}

이제 view 함수가 제대로 작동하는지 테스트할 수 있습니다. 먼저 총 공급량을 쿼리해 봅니다.

```bash
near view $EVENTS_FT_CONTRACT_ID ft_total_supply
```

그러면 다음과 유사한 출력이 반환됩니다.

```bash
'1000000000000000000000000000'
```

만세! 이제 소유자 계정의 잔고가 제대로 작동하는지 확인할 수 있습니다. 다음 함수를 호출하면 총 공급량과 동일한 숫자를 반환해야 합니다.

```bash
near view $EVENTS_FT_CONTRACT_ID ft_balance_of '{"account_id": "'$EVENTS_FT_CONTRACT_ID'"}'
```
다음을 반환합니다.

```bash
'1000000000000000000000000000'
```

다른 계정의 잔고를 쿼리하면 `0`을 반환해야 합니다.

```bash
near view $EVENTS_FT_CONTRACT_ID ft_balance_of '{"account_id": "benjiman.testnet"}'
```

## 지갑에서 FT 보기 {#viewing-fts-in-wallet}

Now that your contract implements the necessary functions that the wallet uses to pickup your contract and display the FTs, you should be able to see your tokens on display in the [balances tab](https://testnet.mynearwallet.com/).

<img width="65%" src="/docs/assets/fts/filled-fts-in-wallet.png" />

🎉🎉🎉 **이는 굉장합니다! 화이팅!** 🎉🎉🎉이제 지갑에서 첫 번째 대체 가능한 토큰을 볼 수 있습니다.


## 결론

오늘 당신은 전체 공급량을 발행하기 위한 로직을 살펴보고 만들었습니다. 그런 다음 일부 핵심 표준 로직과 [이벤트 표준](https://nomicon.io/Standards/Tokens/FungibleToken/Event)을 구현했습니다. 또한, 초기화 시 FT를 [발행](#modifications-to-the-contract)하기 위한 이벤트를 생성했습니다. 그런 다음 변경 사항을 배포 및 [테스트](#testing)하고 지갑에서 첫 번째 FT를 확인했습니다!

다음 튜토리얼에서는 FT를 전송하고 받을 수 있도록 계정을 등록하는 기본 사항을 살펴보겠습니다.