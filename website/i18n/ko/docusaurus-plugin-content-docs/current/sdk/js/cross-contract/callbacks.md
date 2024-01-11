---
sidebar_position: 2
title: Callbacks
---

# Callbacks

NEAR 프로토콜은 작업 증명(Proof-of-Work) 블록체인과 다르게 작동하는 샤딩된 지분 증명(Proof-of-Stake) 블록체인입니다. 기본 Rust(Wasm으로 컴파일됨) 스마트 컨트랙트 상호 작용할 때, 교차 컨트랙트 호출(cross-contract call)은 비동기식입니다. 콜백은 교차 컨트랙트 호출의 결과를 가져오거나, 교차 컨트랙트 호출이 성공했는지 실패했는지 알려주는 데 사용됩니다.

## 계산기 예시

콜백 메서드는 `call({})` 데코레이터로 데코레이트된 일반 메서드로, 컨트랙트 클래스에서 선언할 수 있습니다. 데코레이터에 `privateFunction: true` 옵션을 전달해야 합니다. 이렇게 하면 컨트랙트 자체에서만 메서드를 호출할 수 있습니다.

예를 들어 계산기가 `calc.near`에 배포되었다고 가정하면, 다음을 사용할 수 있습니다.

```js
@NearBindgen({})
export class CalculatorCallerContract {
  @call({})
  sum_a_b({ a, b }) {
    let calculatorAccountId = "calc.near";
    // Call the method `sum` on the calculator contract.
    // Any unused GAS will be attached since the default GAS weight is 1.
    // Attached deposit is defaulted to 0.
    return NearPromise
            .new(calculatorAccountId)
            .functionCall("sum", { a, b }, BigInt(0), BigInt(100000000000000));
  }

  @call({ privateFunction: true })
  sum({ a, b })  {
    return a + b;
  }
}
```

## 허용 목록 예시

다음으로 계정이 목록에 있는지 여부를 반환하는 허용 목록 스마트 컨트랙트에 대해, 교차 컨트랙트 호출을 하는 간단한 예시를 살펴보겠습니다.

교차 컨트랙트 호출의 일반적인 패턴은, 외부 스마트 컨트랙트에서 메서드를 호출하고, `.then` 구문을 사용하여 콜백을 지정한 다음 Promise의 결과 또는 상태를 검색하는 것입니다. 콜백은 일반적으로 호출하는 스마트 컨트랙트 내부에 있습니다. 콜백 함수에 사용되는 특수 데코레이터 매개변수는 [`privateFunction: true`](https://docs.rs/near-sdk-core/latest/near_sdk_core/struct.AttrSigInfo.html#structfield.is_private)입니다. 아래 예에서 이 패턴을 볼 수 있습니다.

다음 예제에서는 `NearPromise`를 사용하는 높은 수준의 교차 컨트랙트 접근 방식을 통해, 콜백에 대한 두 가지 일반적인 접근 방식을 보여줍니다.

```js
@NearBindgen({})
export class ExtAllowlist {
    // ...

    @call({})
    is_allowlisted({ staking_pool_account_id }) {
        return this.allowlist.get(staking_pool_account_id) != null;
    };
}
```

특성을 생성한 후, 계정 `idea404.testnet`이 허용 목록에 있는지 묻는 허용 목록 스마트 컨트랙트에 대해 교차 컨트랙트 호출을 하는 간단한 흐름을 보여줍니다.

```js
@NearBindgen({})
export class Contract {
    @call({})
    xcc_query_allowlist() {
        // Call the method `is_allowlisted` on the allowlisted contract. Static GAS is only attached to the callback.
        // Any unused GAS will be split between the function call and the callback since both have a default unused GAS weight of 1
        // Attached deposit is defaulted to 0 for both the function call and the callback.
        return NearPromise
            .new("allowlist.near")
            .functionCall("is_allowlisted", { staking_pool_account_id: "idea404.testnet" }, BigInt(0), BigInt(100000000000000))
            .then("internalCallbackMethod", {}, BigInt(0), BigInt(100000000000000));
    }

    @call({ privateFunction: true })
    internalCallbackMethod() {
        assert(near.promiseResultsCount() === BigInt(1), "Error: expected 1 promise result");
        let result = JSON.parse(near.promiseResult(0));
        return result;
    }
```

그런 다음 호출에 첨부할 가스의 기본 양을 지정하는 데에 `with_static_gas()`를 사용합니다. 이 계정에서 이 프로그램에 대한 후속 호출은 `.functionCall()`을 사용하여 호출됩니다. `.functionCall()` 메서드는 다음 매개 변수를 사용합니다.

  - `functionName`: 컨트랙트를 호출할 메서드의 이름
  - `args`: 메서드에 전달할 인수
  - `amount`: 통화에 첨부할 Ⓝ의 양
  - `gas`: 호출에 첨부할 가스의 양

이러한 함수 호출을 수행할 때 주의해야 할 몇 가지 사항이 있습니다.

1. `amount` 매개변수를 지정하여 호출에 yoctoⓃ 단위로 보증금 Ⓝ를 첨부할 수 있습니다. 이에 대한 기본값은 0입니다(1 Ⓝ = 1000000000000000000000000 yoctoⓃ 또는 1^24 yoctoⓃ).
2. `gas` 메서드를 지정하여 일정량의 가스 단위를 첨부할 수 있습니다. 이에 대한 기본값은 0입니다.
