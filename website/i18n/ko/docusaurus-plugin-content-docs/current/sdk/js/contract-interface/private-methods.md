---
sidebar_position: 2
title: "프라이빗 메서드"
---

# 프라이빗 메서드

## 콜백을 사용할 때

일반적으로 컨트랙트에 원격 교차 컨트랙트 호출(cross-contract call)에 대한 콜백이 있어야 하는 경우, 이 콜백 메서드는 컨트랙트 자체에서만 호출되어야 합니다. 이는 다른 사람이 이를 호출하고 상태를 엉망으로 만드는 것을 피하기 위한 것입니다. 매우 일반적인 패턴은 직접 호출자(전임자(predecessor) 계정 ID)가 컨트랙트의 계정(현재 계정 ID)과 일치하는지 확인하는 assertion을 갖는 것입니다. `({ privateFunction: true })` 데코레이터는 이를 한 줄의 매크로로 만들어 단순화하고 가독성을 향상시킵니다.

다음과 같이 [`NearBindgen({})` 데코레이터](../contract-structure/near-bindgen.md) 내에서 아래 주석을 사용합니다.

```js
@call({ privateFunction: true })
my_method({}) {
    // ...
}
```

이는 다음과 같습니다.

```js
@call({})
my_method({}) {
    if near.currentAccountId() != near.predecessorAccountId() {
        throw new Error("Method method is private");
    }
    // ...
}
```

이제 이 주석을 사용하면 컨트랙트 자체의 계정만 직접 또는 Promise를 통해 이 메서드를 호출할 수 있습니다.

## 내부 메서드 작성

모든 함수를 공개적으로 노출할 필요는 없습니다. 예를 들어 헬퍼 또는 유틸리티 함수에 대한 전용 메서드를 작성하는 것이 도움이 될 수 있습니다. 내부 메서드를 작성하는 방법에는 세 가지가 있습니다.

1. `call` 또는 `view` 데코레이터를 사용하지 않고 메서드를 정의합니다.

```js
helperMethod(a, b) {
  // ...
}
```

2. 모듈 범위에서 내부 헬퍼 함수를 사용합니다.

```javascript
// Function that can be called in another JS file
function getFirstName(account) {
  // ...
}
```

3. 다른 모듈에서 헬퍼 함수 또는 클래스를 가져옵니다.

메서드를 내보내지 않는 또 다른 방법은 `NearBindgen({})`으로 표시되지 않은 별도의 클래스를 만드는 것입니다.

```js
import { getFirstName } from "./helpers.js";

@NearBindgen({})
export class Contract {
  // ...
}

class Helpers {
  // ...
}
```
