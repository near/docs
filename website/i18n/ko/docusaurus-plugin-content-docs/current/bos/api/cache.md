---
id: cache
title: Cache
---

import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

VM은 대부분의 네트워크 요청에 대해 캐싱 레이어를 구현합니다. `useCache` 훅을 사용하여 수동으로 활용할 수 있습니다.

## useCache

이 메서드는 constructor 함수를 통해 Promise를 받아 데이터를 가져오고 캐시하는 후크와 같은 역할을 합니다. 캐시는 VM에 대해 글로벌하지만 주어진 `dataKey`에 대해 지정된 구성 요소(src 기준)로 식별됩니다. 이를 비동기 데이터 소스로부터 데이터를 쉽게 사용하고 캐싱하는 데 사용할 수 있습니다.

캐시가 콜드(Cold) 상태이고 데이터를 가져오는 중이면 `null`을 반환하고, 데이터를 가져오는 동안에는 이전 캐시 값을 반환하고, 새 Promise 데이터가 이전 데이터와 다른 경우에는 새 데이터를 **반환합니다**.

:::note
데이터는 캐시되고 JSON 직렬화된 객체의 형태로 비교됩니다.
:::

 | 매개변수               | 필수 여부  | 자료형 | 설명                               |
 | ------------------ | ------ | --- | -------------------------------- |
 | `promiseGenerator` | **필수** | 객체  | Promise를 반환하고 데이터를 생성하는 함수       |
 | `dataKey`          | **필수** | 객체  | 데이터를 식별하기 위한 (현재 구성 요소 내) 고유한 이름 |
 | `options`          | _선택사항_ | 객체  | 선택 사항                            |

:::info options 객체

- `subscribe` _(선택 사항)_: `true`면 캐시를 비활성화하여 데이터를 주기적으로 새로 고칩니다.

:::

:::note
- `promiseGenerator`: Promise는 한 번만 실행되어야 하므로 직접 반환하지 않습니다.
:::

### 예시

<Tabs>
<TabItem value="request" label="Request" default>

```js
const status = useCache(
  () =>
    asyncFetch("https://rpc.mainnet.near.org/status").then((res) => res.body),
  "mainnetRpcStatus",
  { subscribe: true }
);

return status;
```

</TabItem>
<TabItem value="response" label="Response">

```json
{
  "version": {
    "version": "1.31.1",
    "build": "1.31.1",
    "rustc_version": "1.65.0"
  },
  "chain_id": "mainnet",
  "protocol_version": 58,
  "latest_protocol_version": 58,
  "rpc_addr": "127.0.0.1:4040",
  "validators": [
    {
      "account_id": "figment.poolv1.near",
      "is_slashed": false
    },
    {
      "account_id": "staked.poolv1.near",
      "is_slashed": false
    },
    {
      "account_id": "galaxydigital.poolv1.near",
      "is_slashed": false
    }
  ],
  "sync_info": {
    "latest_block_hash": "ArPXejJYcFEDtU8Ma7tXFPM1pRDDzDSkj1KVBjphVwnw",
    "latest_block_height": 85795851,
    "latest_state_root": "EXhYFzPLdno6ZNHFr7DSGFWqUSZLSVZj6oP15xUdrmMm",
    "latest_block_time": "2023-02-22T13:48:47.342467480Z",
    "syncing": false,
    "earliest_block_hash": "HTrKnWapTNuZwoAeeepeV3deyQcJNg1CeKg4PPR8n9Ah",
    "earliest_block_height": 85593094,
    "earliest_block_time": "2023-02-19T18:54:15.505365092Z",
    "epoch_id": "H99thh9tGD8kBwJC5fac83TYGs6W2TTq1Xv3Jqw2VWYv",
    "epoch_start_height": 85765895
  },
  "validator_account_id": null,
  "validator_public_key": null,
  "node_public_key": "ed25519:BhqHCszVngV2MqJrTVjtcbWNGuLUyqXcXyBuCUt8DK9k",
  "node_key": null,
  "uptime_sec": 505796
}
```

</TabItem>
</Tabs>
