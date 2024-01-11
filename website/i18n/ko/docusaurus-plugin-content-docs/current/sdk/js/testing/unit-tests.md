---
sidebar_position: 1
---

# 단위 테스트(Unit Test)

원하는 테스트 라이브러리를 사용하여 일반 JavaScript 함수와 같은 스마트 컨트랙트 함수로 구현된 추상화된 로직을 단위 테스트할 수 있습니다. 간단한 예는 다음과 같습니다.

#### 컨트랙트
```js   
@NearBindgen({})
export class Contract {
  ...
  doSomething(): string {
    return callSomeFunction();
  }
}
```

#### 단위 테스트 파일
```js
describe('Contract', () => {
  it('callSomeFunction should work', () => {
    ...
    results = callSomeFunction();
    // then assert results are what you expect
    ....
  });
});
```

스마트 컨트랙트 함수 자체를 테스트하는 경우에는, [통합 테스트(Integration Test)](./integration-tests.md)를 대신 사용하는 것이 좋습니다. 통합 테스트는 해당 로직이 실행될 환경을 완전히 복제하기 때문입니다.  