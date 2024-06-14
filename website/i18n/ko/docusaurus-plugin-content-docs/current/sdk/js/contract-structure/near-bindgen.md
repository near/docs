---
sidebar_position: 1
title: "NearBindgen"
---

# NearBindgen

`@NearBindgen({})` 데코레이터는는 유효한 NEAR 컨트랙트가 되기 위해 필요한 코드를 생성하고, 외부에서 호출할 수 있도록 하는 함수를 공개하기 위해 컨트랙트 클래스에서 사용됩니다.

예를 들어 간단한 counter 컨트랙트에서 데코레이터는 다음과 같이 적용됩니다.

```javascript
import { NearBindgen, near, call, view } from 'near-sdk-js'

@NearBindgen({})
class Counter {
  val: number = 0;

  @view({}) // Public read-only method: Returns the counter value.
  get_num(): number {
    return this.val
  }

  @call({}) // Public method: Increment the counter.
  increment() {
    this.val += 1;
    near.log(`Increased number to ${this.val}`)
  }

  @call({}) // Public method: Decrement the counter.
  decrement() {
    this.val -= 1;
    near.log(`Decreased number to ${this.val}`)
  }

  @call({}) // Public method - Reset to zero.
  reset() {
    this.val = 0;
    near.log(`Reset counter to zero`)
  }
}
```

이 예에서 `Counter` 클래스는 스마트 컨트랙트 상태와 `collections`과 같은 (역)직렬화 메서드를 구현하는 모든 것을 나타냅니다. 함수가 호출될 때마다, 상태가 로드되고 역직렬화되므로, 로드되는 데이터 양을 가능한 한 최소화하는 것이 중요합니다.

명심해야 할 중요한 핵심 상호 작용은 다음과 같습니다:
- Any `call` or `view` or `initialize` functions will be callable externally from any account/contract.
  - 자세한 내용은 [퍼블릭 메서드](../contract-interface/public-methods.md)를 참고하세요.
- `view` 또는 `call` 데코레이터는 컨트랙트의 가변성(mutability)을 제어하기 위해 여러 가지 방법으로 사용할 수 있습니다.
  - `view`로 데코레이팅된 함수는 읽기 전용이며, 업데이트된 상태를 레퍼지토리에 쓰지 않습니다.
  - `call`로 데코레이팅된 함수는 상태 변경을 허용하며, 상태는 항상 함수 호출이 끝날 때 다시 기록됩니다.
- 노출된 함수는 함수에서 클래스 변수에 액세스하지 않는 경우 상태에 대한 읽기 및 쓰기를 생략할 수 있습니다.
  - 이는 일부 정적 기능 또는 컨트랙트 코드에 포함된 데이터 반환에 유용할 수 있습니다.


## 초기화 메서드

기본적으로 컨트랙트의 `default()` 구현은 컨트랙트를 초기화하는 데 사용됩니다. There can be a custom initialization function which takes parameters or performs custom logic with the following `@initialize({})` decorator:

```javascript
@NearBindgen({})
class Counter {
    @initialize({})
    init(val): void {
        this.val = val;
    }
}
```

## 지불 메서드

호출과 함께 토큰을 전송할 수 있도록 `call` 메서드 데코레이터에 `{ payableFunction: true }` 주석을 달 수 있습니다. 자세한 내용은 [지불 메서드](../contract-interface/payable-methods.md)를 참조하세요.

함수를 지불 가능한 것으로 선언하려면 다음과 같이 주석을 사용하세요.

```javascript
@NearBindgen({})
class Counter {
    @call({ payableFunction: true })
    increment(): void {
        this.val += 1;
    }
}
```

## 프라이빗 메서드

컨트랙트는 Promise를 통해 자체적으로 메서드를 호출할 수 있도록 일부 메서드를 노출해야 하지만, 다른 컨트랙트에서 호출하는 것은 허용하지 않으려고 합니다. 이를 위해 `{ privateFunction: true }` 주석을 사용하여 이 메소드가 외부에서 호출될 때 오류를 발생시킵니다. 자세한 내용은 [프라이빗 메서드](../contract-interface/private-methods.md)를 참고하세요.

이 주석은 다음을 통해 모든 메서드에 적용될 수 있습니다.

```javascript
@NearBindgen({})
class Counter {
    @call({ privateFunction: true })
    private_increment(): void {
        this.val += 1;
    }
}
```
