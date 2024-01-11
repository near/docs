---
sidebar_position: 3
title: "지불 메서드"
---

# 지불 메서드

메서드가 함수 호출과 함께 NEAR 토큰 전송을 수락하도록 허용할 수 있습니다. 이것은 컨트랙트가 사용될 때 지불해야 하는 토큰의 수수료를 정의할 수 있도록 수행됩니다. 기본적으로 메서드는 지불할 수 없으며, 호출 중에 누군가가 토큰을 전송하려고 시도하면 패닉 상태가 됩니다. 이는 누군가가 함수 호출 중에 실수로 토큰을 전송하는 경우를 대비하여 안전상의 이유로 수행됩니다.

메서드를 지불 가능으로 선언하려면, [`NearBindgen` 데코레이트된 컨트랙트 클래스](../contract-structure/near-bindgen.md) 내에서 다음과 같이 `({ payableFunction: true })` 데코레이터 매개 변수를 사용합니다.

```js
@call({ payableFunction: true })
my_method({}) {
    // ...
}
```

이렇게 하면 `my_method` 함수를 호출하고, 잔액을 컨트랙트로 이전할 수 있습니다.

예시:

```js
@NearBindgen({})
export class Contract {
    @call({ payableFunction: true })
    take_my_money({}) {
        near.log("Thanks!");
    }

    @call({})
    do_not_take_my_money({}) {
        near.log("No thanks!");
    }
}
```

이는 다음과 동일합니다.

```js
@NearBindgen({})
export class Contract {
    @call({})
    take_my_money({}) {
        near.log("Thanks!");
    }

    @call({})
    do_not_take_my_money({}) {
        if (near.attachedDeposit() > BigInt(0)) {
            throw new Error("Method do_not_take_my_money doesn't accept deposit");
        }
        near.log("No thanks!");
    }
}
```
