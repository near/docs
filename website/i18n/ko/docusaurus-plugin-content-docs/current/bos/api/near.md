---
id: near
title: Near
---

import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

VM은 NEAR 블록체인과 상호작용하기 위한 편리한 API를 제공합니다. 세 가지 메서드가 존재합니다.

- [`Near.block`](#nearblock)
- [`Near.call`](#nearcall)
- [`Near.view`](#nearview)

## Near.block

| 매개변수                    | 필수 여부  | 자료형 | 설명                                                                            |
| ----------------------- | ------ | --- | ----------------------------------------------------------------------------- |
| `blockHeightOrFinality` | _선택사항_ | 모두  | 블록체인 쿼리에 사용할 블록 높이 또는 완결성 수준(원하는 블록 높이 또는 다음 문자열 중 하나: `optimistic`, `final`) |

:::info

- 원하는 블록 높이: 양의 정수로 표현되는 쿼리할 특정 블록의 높이
- `optimistic`: Uses the latest block recorded on the node that responded to your query (< 1 second delay)
- `final`: 네트워크 내 노드의 66% 이상에서 검증된 블록(약 2초)

:::

### 예제

<Tabs>
<TabItem value="request" label="Request" default>

```js
return Near.block("optimistic");
```

</TabItem>
<TabItem value="response" label="Response">

```json
{
  "author": "cryptium.poolv1.near",
  "chunks": [
    {
      "balance_burnt": "1401758302520100000000",
      "chunk_hash": "2a43V7ovicNbSsLEDL3yp1WJWa3bUWvHv5xz52vWqaSL",
      "encoded_length": 1898,
      "encoded_merkle_root": "8i97jVjroXatbDq12CXw8dfkQaX49cWgitD7Pdj61AFR",
      "gas_limit": 1000000000000000,
      "gas_used": 15913198926319,
      "height_created": 85885463,
      "height_included": 85885463,
      "outcome_root": "3M7Tx68bNtHvPLaavGEP7FovdULhppHFBavPCNjkgD5r",
      "outgoing_receipts_root": "FnKFqjSFfcFZ45k1ftG6tmnGD3uoV5VTmkAUYHbaBRRK",
      "prev_block_hash": "5YSsd2iwtwTLETkJvPVef5XbpER8NzJ6JUCuXLTnfPcm",
      "prev_state_root": "3UwJpoQKhuCAqbNFdNRQuNLPBNT5kQxwVy5CHNjLdcQi",
      "rent_paid": "0",
      "shard_id": 0,
      "signature": "ed25519:3MJhP6r3pyX1TaUWyW6KrWNdSWrzrR5VctP3MqLphzUFWTiNux9kXXnUAqmjLiYbDZ9w3QqVXPTUZDYiynGPTfab",
      "tx_root": "DHZ2oaett6NBGWoPb5SrB7gdQFaXEBapFXA2FAdHHi5r",
      "validator_proposals": [],
      "validator_reward": "0"
    },
    {
      "balance_burnt": "0",
      "chunk_hash": "4XHDgq6LL9TzYXDcK4vfnVyFM186RVzjgebZH5gbuzkK",
      "encoded_length": 8,
      "encoded_merkle_root": "9zYue7drR1rhfzEEoc4WUXzaYRnRNihvRoGt1BgK7Lkk",
      "gas_limit": 1000000000000000,
      "gas_used": 0,
      "height_created": 85885463,
      "height_included": 85885463,
      "outcome_root": "11111111111111111111111111111111",
      "outgoing_receipts_root": "8s41rye686T2ronWmFE38ji19vgeb6uPxjYMPt8y8pSV",
      "prev_block_hash": "5YSsd2iwtwTLETkJvPVef5XbpER8NzJ6JUCuXLTnfPcm",
      "prev_state_root": "2rXZaz7jwGb4ro6XhsQ7a1ZZnXqbx3QMjuKsViQUvJBV",
      "rent_paid": "0",
      "shard_id": 1,
      "signature": "ed25519:Sz7m5JsWR29EP7V1GBzYgkYah3Tw5Zitrq81WpLibrJWiD6RQFWc6BDh3Z2fWwz9FtFqpSy85nvSmZ4UDPZciMC",
      "tx_root": "11111111111111111111111111111111",
      "validator_proposals": [],
      "validator_reward": "0"
    }
  ],
}
```

</TabItem>
</Tabs>

---

## Near.call

| 매개변수           | 필수 여부  | 자료형      | 설명                                       |
| -------------- | ------ | -------- | ---------------------------------------- |
| `contractName` | **필수** | 문자열      | 호출할 스마트 컨트랙트의 이름                         |
| `methodName`   | **필수** | 문자열      | 스마트 컨트랙트에서 호출할 메서드 이름                    |
| `args`         | _선택사항_ | 객체 인스턴스  | 스마트 컨트랙트 메서드에 객체 인스턴스의 형태로 전달할 인자        |
| `gas`          | _선택사항_ | 문자열 / 숫자 | 트랜잭션에 사용되는 가스의 최대 양 (기본 300Tg)           |
| `deposit`      | _선택사항_ | 문자열 / 숫자 | 호출에 보증금으로 첨부되는 NEAR 토큰의 양 (yoctoNEAR 단위) |

이는 메시지를 체인에 저장할 스마트 컨트랙트에 대한 호출을 수행합니다.

### 예제

<Tabs>
<TabItem value="request" label="Request" default>

```js
return Near.call("nearsocialexamples.near", "set_greeting", {
  message: "Hi Near Social",
});
```

</TabItem>
<TabItem value="response" label="Response">

Upon hitting the `Render` button in `Widget Editor` you should see this:

![result](https://i.imgur.com/Lft2rtR.png)

Please take a look at [this Explorer link](https://nearblocks.io/txns/8PyDVdbizhNj81LxfwdZ1WidKZyS8HVZp8udPKgzFiNi) to see the details related to this `Near.call` method.

</TabItem>
</Tabs>

---

## Near.view

| 매개변수               | 필수 여부  | 자료형     | 설명                                                                  |
| ------------------ | ------ | ------- | ------------------------------------------------------------------- |
| `contractName`     | **필수** | 문자열     | 스마트 컨트랙트의 이름                                                        |
| `methodName`       | **필수** | 문자열     | 호출할 메서드 이름                                                          |
| `args`             | _선택사항_ | 객체 인스턴스 | 메서드에 전달할 인수                                                         |
| `blockId/finality` | _선택사항_ | 문자열     | 블록 ID 또는 트랜잭션의 완결성                                                  |
| `subscribe`        | _선택사항_ | 부울      | 이 기능을 통해 사용자는 쿼리에 가입할 수 있으며, 이를 통해 5초마다 모든 가입자의 데이터가 자동으로 새로 고쳐집니다. |

<Tabs>
<TabItem value="request" label="Request" default>

```js
return Near.view("nearsocialexamples.near", "get_greeting", `{}`);
```

</TabItem>
<TabItem value="response" label="Response">

Upon hitting the `Render` button in `Widget Editor` you should see this:

```js
"Hi Near Social";
```

</TabItem>
</Tabs>

### 호출 및 View 예제

아래는 `near.social`에서 호출 및 View 메서드를 실행하는 방법에 대한 예제입니다.

```js
State.init({
  value: "value to update",
});

console.log(Near.view("nearsocialexamples.near", "get_greeting"));

const testCall = () => {
  return Near.call("nearsocialexamples.near", "set_greeting", {
    message: "Hi Near Social",
  });
};

const testView = () => {
  State.update({
    value: Near.view("nearsocialexamples.near", "get_greeting"),
  });
};

return (
  <div>
    <button onClick={testCall}>test call</button>
    <button onClick={testView}>test view</button>

    <div>{state.value}</div>
  </div>
);
```
