---
sidebar_position: 1
title: "퍼블릭 메서드"
---

# 퍼블릭 메서드 자료형

Methods can be called externally by using the `view({})` or `call({})` decorators within the contract class which will expose the method in the compiled WASM bytecode to be called by any other NEAR Account. 이러한 데코레이터 없이 컨트랙트 클래스에서 메서드가 선언되고 다른 NEAR 계정에서 호출될 때마다 `MethodNotFound` 오류가 발생합니다.

:::tip

자신을 호출하는 컨트랙트가 필요한 경우 이러한 데코레이터로 함수를 표시할 수 있지만, 데코레이터 매개변수에 [`({  privateFunction: true })` 주석](https://docs.near.org/sdk/js/contract-interface/private-methods)을 추가하세요.

:::

기본 사용법은 다음과 같습니다.

```js
@NearBindgen({})
export class MyContractStructure {
    @call({}) // or @view({})
    some_method({ parameter_a, parameter_b }) {
        // .. method logic here
    }
}
```

JavaScript의 `camelCase` 규칙과 달리, 메서드 이름에 `snake_case`를 사용하는 것이 좋습니다. 이는 NEAR 생태계에서 대부분의 컨트랙트에 대한 메서드 이름이 `snake_case`를 사용하기 때문이며, 컨트랙트에 대해 동일한 규칙을 사용하는 것이 더 쉽습니다.
:::

이는 WASM 바이너리에서 `some_method`를 공개하고, 이를 외부에서 호출할 수 있도록 허용합니다.

<!-- TODO: insert detail overview -->
