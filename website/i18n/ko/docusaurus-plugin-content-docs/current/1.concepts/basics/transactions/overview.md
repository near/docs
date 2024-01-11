---
id: overview
title: 트랜잭션
sidebar_label: 개요
---

NEAR는 설계상 비동기식입니다. 이는 스마트 컨트랙트 구현을 위한 광범위한 가능성을 열어주지만, 다른 블록체인 플랫폼을 사용하던 사람들에게는 혼란을 가중할 수도 있습니다. NEAR의 트랜잭션에는 비동기 작업을 수행하는 작업이 포함될 수 있습니다. 이러한 경우 트랜잭션의 가능한 결과(성공 or 실패)를 염두에 두시기 바랍니다. 예를 들어 트랜잭션에 교차 컨트랙트 호출이 포함된 경우, 해당 호출 자체는 성공으로 표시될 수 있지만 다른 컨트랙트 실행은 실패할 수 있습니다. 이 문서에서는 이에 대한 가능한 시나리오를 다룹니다.

트랜잭션은 네트워크에 할당할 수 있는 가장 작은 작업 단위입니다. 여기서 "작업"은 컴퓨팅(함수 실행) 또는 저장(데이터 읽기/쓰기)을 의미합니다. 트랜잭션은 하나 이상의 `Actions`로 구성됩니다. 둘 이상의 Action이 있는 트랜잭션을 "배치 트랜잭션"이라고 합니다. 트랜잭션은 가장 작은 작업 단위이므로 원자성을 가지고 있지만, 비동기 작업이 반드시 전체 트랜잭션의 성공 또는 실패를 계단식으로 나열하는 것은 아닙니다.

`Receipt`라는 개념도 있습니다. 이는 "`Action`을 적용하기 위한 요청"이거나, "`Action`의 결과"입니다. 모든 교차 컨트랙트 커뮤니케이션은 Receipt를 통해 이루어집니다. Action으로 인해 하나 이상의 Receipt가 생성될 수 있습니다. 블록체인은 일련의 트랜잭션으로 보일 수 있지만, 일련의 Receipt이기도 합니다.

:::tip
You can use <a href="https://nearblocks.io/">NEAR Blockchain Explorer</a> to inspect and see all actions and receipts related to a transaction.
:::


::: 트랜잭션에 대한 자세한 문서는 [NEAR 프로토콜 사양 (nomicon.io)](https://nomicon.io/RuntimeSpec/Transactions)에서 찾을 수 있습니다. 이 페이지에서는 NEAR 트랜잭션의 중요한 측면에 대한 개요를 제공합니다.

## 트랜잭션 {#transaction}

`Transaction`은 목적지(`receiver` 계정)에서 수행되어야 하는 것들을 묘사하는 `Actions`의 집합입니다.

각 `Transaction`은 다음과 같은 중요한 정보들을 담고 있습니다:

- **출처** (`signer`에 의해 암호화 서명됨)
- **목적지** 또는 의도 (`receiver`에게 전달되어 적용됨)
- **최신성** (허용가능한 한도 - [1 에포크](../epoch.md) 내 최신 블록으로부터의 `block_hash`)
- **고유성** (주어진 `signer`와 `AccessKey`에 대해 고유한 `nonce`를 가짐)

## Action {#action}

`Action`은 0개 이상의 다른 `Action`과 함께 `Transaction`을 정의하는 구성 가능한 작업 단위입니다. 현재는 8 종류의 `Action`이 존재합니다.

- `FunctionCall` 은 컨트랙트에서 메서드를 호출하고 선택적으로 컴퓨팅 및 스토리지에 필요한 수수료를 포함합니다.
- `Transfer` 는 계정 간 토큰을 이동시킵니다.
- `DeployContract` 는 컨트랙트를 배포할 때 사용됩니다.
- `CreateAccount` 는 새로운 계정을 만들 때 사용됩니다.
- `DeleteAccount` 는 계정을 삭제하고 수혜자 계정으로 잔고를 이동합니다.
- `AddKey` 는 계정에 키(`FullAccess` 또는 `FunctionCall` 접근권)를 추가합니다.
- `DeleteKey` 는 계정에서 기존 키를 삭제합니다.
- `Stake` 는 다음 기회에 밸리데이터가 되는 것에 대한 관심을 표명할 때 사용됩니다.

[NEAR nomicon](https://nomicon.io/RuntimeSpec/Actions)에서 `Action`들의 기술적 세부 사항에 대해 자세히 알아볼 수 있습니다 .

## Receipt {#receipt}

`Receipt`는  시스템에서 실행 가능한 유일한 객체입니다. 따라서 NEAR 플랫폼에서 "트랜잭션 처리"에 대해 이야기하는 것은, 결국 어느 시점에서 "Receipt를 적용"하는 것을 의미합니다.

간단하게 `Receipt`를 목적지(`receiver`)에서 실행되는 유료 메세지로 생각할 수 있습니다. 그렇다면 `Transaction`은 `Receipt`를 생성하기 위해 외부에서 발행된 요청 정도로 생각할 수 있습니다(1대1 관계).

`Receipts`를 만드는 방법에는 여러 가지가 있습니다:

- `Transaction` 발행
- Promise 반환 (교차 컨트랙트 호출 관련)
- 환불

[NEAR nomicon](https://nomicon.io/RuntimeSpec/Actions)에서 `Receipt`들의 기술적 세부 사항에 대해 자세히 알아볼 수 있습니다.

## 트랜잭션 원자성 {#atomicity}

트랜잭션은 적용되기 전에 Receipt로 변환되기 때문에, Receipt 원자성에 대해 이야기하는 것으로도 충분할 것입니다. Receipt 실행은 원자적입니다. 즉, 이는 모든 작업이 성공적으로 실행되거나 아무 작업도 실행되지 않음을 의미합니다. 그러나 한 가지 주의할 점은 함수 호출 트랜잭션은 다른 트랜잭션과 달리 무한한 양의 Receipt를 생성할 수 있으며, 각 Receipt는 원자적이지만 하나의 Receipt의 성공 또는 실패가 동일한 트랜잭션에 의해 생성된 다른 Receipt의 상태에 반드시 영향을 미치지는 않는다는 것입니다.

:::info
스마트 컨트랙트를 설계할 때 NEAR 프로토콜의 비동기적인 특성을 항상 고려해야 합니다.
:::

## 트랜잭션 상태 {#transaction-status}

You can query the status of a transaction through [RPC API](/api/rpc/setup) or [NEAR CLI](https://docs.near.org/tools/near-cli#near-tx-status). 쿼리 결과의 예는 다음과 같습니다.

```js
{
  status: { SuccessValue: '' },
  transaction: {
    actions: [ { Transfer: { deposit: '50000000000000000000000' } } ],
    hash: '54sZqhqvwynMmMEcN7LcNLxUjx2o5xyFn2FC4zkpNUas',
    nonce: 64986174290372,
    public_key: 'ed25519:EDPw6PkPetebJvrp1jtcvknCGeFguf7LrSGFCRqLrXks',
    receiver_id: '1167fc268181c9ee30e914016d2148b4b7fdc0dc2d70e2a29df9c65756b52116',
    signature: 'ed25519:52mSUmSBCXe1fF2m6cWbhQPUFuKz965aWCP6Aa4Jaaf1Kr93wDfJ8DKwkCUhEdahqJuDNNcMqDP2qjX5Xb1XRvsf',
    signer_id: 'sweat_welcome.near'
  },
  transaction_outcome: {
    block_hash: 'BS5ongkXQgcqFuH8xbJBfLVjF8fGhVip3wogi5f1SxpN',
    id: '54sZqhqvwynMmMEcN7LcNLxUjx2o5xyFn2FC4zkpNUas',
    outcome: {
      executor_id: 'sweat_welcome.near',
      gas_burnt: 4174947687500,
      logs: [],
      metadata: { gas_profile: null, version: 1 },
      receipt_ids: [ '6WGRhQyaxzKyMW1YaMiPpbH5u2QYM7hMFrkbW38guY9D' ],
      status: {
        SuccessReceiptId: '6WGRhQyaxzKyMW1YaMiPpbH5u2QYM7hMFrkbW38guY9D'
      },
      tokens_burnt: '417494768750000000000'
    },
    "proof": []
  },
  receipts_outcome: [
    {
      block_hash: 'GGeKQ2GZoQffwef5oA4bRjYes7Cwp8fn3qiwo5ZpVKiN',
      id: '6WGRhQyaxzKyMW1YaMiPpbH5u2QYM7hMFrkbW38guY9D',
      outcome: {
        executor_id: '1167fc268181c9ee30e914016d2148b4b7fdc0dc2d70e2a29df9c65756b52116',
        gas_burnt: 4174947687500,
        logs: [],
        metadata: { gas_profile: [], version: 3 },
        receipt_ids: [ '5m6D2DxLX3A59cAMZJmd6iTkYqL3QEE3Cr2FnXwzzvSr' ],
        status: { SuccessValue: '' },
        tokens_burnt: '417494768750000000000'
      },
      "proof": []
    },
    {
      block_hash: 'A9vaFWg9Dv9tSvtQxf8j2mna4hV3UUG6wzNqjVferp57',
      id: '5m6D2DxLX3A59cAMZJmd6iTkYqL3QEE3Cr2FnXwzzvSr',
      outcome: {
        executor_id: 'sweat_welcome.near',
        gas_burnt: 223182562500,
        logs: [],
        metadata: { gas_profile: [], version: 3 },
        receipt_ids: [],
        status: { SuccessValue: '' },
        tokens_burnt: '0'
      },
      "proof": []
    }
  ]
}
```

쿼리 결과는 다음을 표시합니다.
- 트랜잭션의 전반적인 상태
- 트랜잭션의 결과
- 이 트랜잭션에 의해 생성된 Receipt의 결과.

`status` 필드는 다음에 나타납니다:
- 최상위 레벨: 트랜잭션의 모든 Action이 성공적으로 실행되었는지 여부를 나타냅니다.
- 완결성
- 각 Receipt에 대한 `receipts_outcome`: Receipt가 성공적으로 실행되었는지 여부를 나타냅니다.

`status`는 다음 4개 중 하나의 키가 있는 객체입니다.

- `status: { SuccessValue: 'val or empty'}` - Receipt 또는 트랜잭션이 성공적으로 실행되었음을 나타냅니다. 함수 호출 Receipt의 결과인 경우 값은 함수의 반환 값이고, 그렇지 않은 경우 값은 비어 있습니다.
- `status: { SuccessReceiptId: 'id_of_generated_receipt' }` - 트랜잭션이 성공적으로 Receipt로 변환되었거나 Receipt가 성공적으로 처리되어 다른 Receipt가 생성되었음을 나타냅니다. 이 키의 값은 새로 생성된 Receipt의 ID입니다.
- `status: { Failure: {} }'` - 실행 중인 트랜잭션 또는 Receipt가 실패했음을 나타냅니다. 값에는 오류 이유가 포함됩니다.
- `status: { Unknown: '' }'` - 트랜잭션 또는 Receipt가 아직 처리되지 않았음을 나타냅니다.

:::note Receipt의 경우, `SuccessValue`와 `SuccessReceiptId`는 마지막 Action 실행에서 가져옵니다. 동일한 Receipt의 다른 Action 실행 결과는 반환되지 않습니다. 그러나 Action이 실패하면, Receipt 실행이 중지되고 `status`에 `Failure`가 반환됩니다. 마지막 Action이 함수 호출이 아니고 성공적으로 실행되면, 결과는 빈 `SuccessValue`일 것입니다.

:::note For receipts, The last receipt in the list is the `refund` receipt. Refund receipts do not actually cost any `gas`, but they still count the gas towards the block gas. In this case, the refund receipt is `5m6D2DxLX3A59cAMZJmd6iTkYqL3QEE3Cr2FnXwzzvSr`. :::

::: 최상위 레벨 `status`는 트랜잭션의 모든 Action이 성공적으로 실행되었는지 여부를 나타냅니다. 그러나 한 가지 주의할 점은, 함수 호출을 성공적으로 실행했다고 해서 반드시 함수 호출에서 생성된 Receipt가 모두 성공적으로 실행되는 것은 아니라는 점입니다.

예를 들어:

```rust
pub fn transfer(receiver_id: String) {
    Promise::new(receiver_id).transfer(10);
}
```

이 함수는 Promise를 예약하지만, 반환 값은 해당 약속과 관련이 없습니다. 따라서 Promise가 실패하더라도 잠재적으로 `receiver_id`가 존재하지 않기 때문에, 이 함수를 호출하는 트랜잭션은 여전히 전체 `status`에 `SuccessValue​`​를 가지고 있을 것입니다. 동일한 조회 결과를 통해 생성된 각 Receipt의 상태를 확인할 수 있습니다.

## 완결성 {#finality}

트랜잭션 완결성은 트랜잭션이 포함된 블록의 완결성과 밀접하게 연결되어 있습니다. 그러나 대부분의 Action이 Receipt 실행에서 이루어지기 때문에, 트랜잭션 자체가 아닌 Receipt가 완결되었는지 여부에 관심이 있는 경우가 많습니다. 즉, 모든 경우에 이것이 동일하지는 않습니다. 따라서 트랜잭션의 완결성을 검증하기 위해 트랜잭션을 조회해서 트랜잭션의 모든 블록해시와 트랜잭션에서 생성된 Receipt가 완결되었는지 확인할 수 있습니다.

:::tip 질문이 있으신가요?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol"> Ask it on StackOverflow! </a>
:::
