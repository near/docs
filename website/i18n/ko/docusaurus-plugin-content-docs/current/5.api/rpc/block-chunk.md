---
id: block-chunk
title: 블록 / 청크
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

RPC API를 사용하면, 네트워크를 쿼리하고 특정 블록 또는 청크에 대한 세부 정보를 얻을 수 있습니다.

---

## 블록 세부사항 {#block-details}

> 네트워크를 쿼리하고 주어진 높이 또는 해시에 대해 블록을 반환합니다. `finality` 매개변수를 사용하여 최신 블록 세부 정보를 반환할 수도 있습니다.

**참고**: 특정 블록 _또는_ 완결성으로 검색하도록 선택할 수 있으며, 둘 다 선택할 수는 없습니다.

- 메서드: `block`
- 매개변수:
  - [`finality`](/api/rpc/setup#using-finality-param) _또는_ [`block_id`](/api/rpc/setup#using-block_id-param)

`finality` 예시:


<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "block",
  "params": {
    "finality": "final"
  }
}
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js
const response = await near.connection.provider.block({
  finality: "final",
});
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=block \
  params:='{
    "finality": "final"
  }'
```

</TabItem>
</Tabs>

`[block_id]`


<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "block",
  "params": {
    "block_id": 17821130
  }
}
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js
const response = await near.connection.provider.block({blockId: 17821130});
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=block \
  params:='{
    "block_id": 17821130
  }'
```

</TabItem>
</Tabs>

`[block_hash]`


<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "block",
  "params": {
    "block_id": "7nsuuitwS7xcdGnD9JgrE22cRB2vf2VS4yh1N9S71F4d"
  }
}
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js
const response = await near.connection.provider.block(
  {blockId: "7nsuuitwS7xcdGnD9JgrE22cRB2vf2VS4yh1N9S71F4d"}
);
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=block \
  params:='{
    "block_id": "7nsuuitwS7xcdGnD9JgrE22cRB2vf2VS4yh1N9S71F4d"
  }'
```

</TabItem>
</Tabs>

<details>
<summary>응답 예시:</summary>
<p>

```json
{
  "jsonrpc": "2.0",
  "result": {
    "author": "bitcat.pool.f863973.m0",
    "header": {
      "height": 17821130,
      "epoch_id": "7Wr3GFJkYeCxjVGz3gDaxvAMUzXuzG8MjFXTFoAXB6ZZ",
      "next_epoch_id": "A5AdnxEn7mfHieQ5fRxx9AagCkHNJz6wr61ppEXiWvvh",
      "hash": "CLo31YCUhzz8ZPtS5vXLFskyZgHV5qWgXinBQHgu9Pyd",
      "prev_hash": "2yUTTubrv1gJhTUVnHXh66JG3qxStBqySoN6wzRzgdVD",
      "prev_state_root": "5rSz37fySS8XkVgEy3FAZwUncX4X1thcSpuvCgA6xmec",
      "chunk_receipts_root": "9ETNjrt6MkwTgSVMMbpukfxRshSD1avBUUa4R4NuqwHv",
      "chunk_headers_root": "HMpEoBhPvThWZvppLwrXQSSfumVdaDW7WfZoCAPtjPfo",
      "chunk_tx_root": "7tkzFg8RHBmMw1ncRJZCCZAizgq4rwCftTKYLce8RU8t",
      "outcome_root": "7tkzFg8RHBmMw1ncRJZCCZAizgq4rwCftTKYLce8RU8t",
      "chunks_included": 1,
      "challenges_root": "11111111111111111111111111111111",
      "timestamp": 1601280114229875635,
      "timestamp_nanosec": "1601280114229875635",
      "random_value": "ACdUSF3nehbMTwT7qjUB6Mm4Ynck5TVAWbNH3DR1cjQ7",
      "validator_proposals": [],
      "chunk_mask": [true],
      "gas_price": "100000000",
      "rent_paid": "0",
      "validator_reward": "0",
      "total_supply": "1042339182040791154864822502764857",
      "challenges_result": [],
      "last_final_block": "AaxTqjYND5WAKbV2UZaFed6DH1DShN9fEemtnpTsv3eR",
      "last_ds_final_block": "2yUTTubrv1gJhTUVnHXh66JG3qxStBqySoN6wzRzgdVD",
      "next_bp_hash": "3ZNEoFYh2CQeJ9dc1pLBeUd1HWG8657j2c1v72ENE45Q",
      "block_merkle_root": "H3912Nkw6rtamfjsjmafe2uV2p1XmUKDou5ywgxb1gJr",
      "approvals": [
        "ed25519:4hNtc9vLhn2PQhktWtLKJV9g8SBfpm6NBT1w4syNFqoKE7ZMts2WwKA9x1ZUSBGVKYCuDGEqogLvwCF25G7e1UR3",
        "ed25519:2UNmbTqysMMevVPqJEKSq57hkcxVFcAMdGq7CFhpW65yBKFxYwpoziiWsAtARusLn9Sy1eXM7DkGTXwAqFiSooS6",
        "ed25519:4sumGoW9dnQCsJRpzkd4FQ5NSJypGQRCppWp7eQ9tpsEcJXjHZN8GVTCyeEk19WmbbMEJ5KBNypryyHzaH2gBxd4",
        "ed25519:3fP2dri6GjYkmHgEqQWWP9GcoQEgakbaUtfr3391tXtYBgxmiJUEymRe54m7D8bQrSJ3LhKD8gTFT7qqdemRnizR",
        "ed25519:3mwdqSWNm6RiuZAoZhD6pqsirC2cL48nEZAGoKixpqbrsBpAzqV3W2paH4KtQQ4JPLvk5pnzojaint2kNBCcUyq1",
        "ed25519:D4hMnxqLyQW4Wo29MRNMej887GH46yJXDKNN4es8UDSi9shJ9Y4FcGqkxdV4AZhn1yUjwN5LwfgAgY6fyczk5L3",
        null,
        "ed25519:4WCVm4dn88VJxTkUgcvdS7vs34diBqtQY4XWMRctSN1NpbgdkwwVyxg7d2SbGC22SuED7w4nrToMhcpJXrkhkDmF",
        "ed25519:JqtC7TFP7U14s7YhRKQEqwbc2RUxoctq75mrBdX91f7DuCWsPpe6ZTTnfHPmuJPjTzFHVZTsaQJWzwfSrrgNpnc",
        "ed25519:ngGUpWc2SyHmMCkWGTNNNfvZAJQ5z7P92JCmDqB7JW3j8fNH6LobvFFXb2zVdssibJKgnjwBj8CRe6qiZtuYQZM",
        "ed25519:5kzW6RbjukyJZiw9NTzTPPsQdoqN6EecafjVFEoWmTxQ4uSv1uSXhQYcHK2eq4m84oMmPABQDz2mm73Qx8mDdCQX",
        "ed25519:5wHnuuxwJJiZ4bXNq5cESnr4YovFU2yaUcuHRDUw3DnLoxkqc15CsegoyUSQKEwtCZ4yETv8Z9QcD6Wr9zHV4AUk",
        "ed25519:3F9XzWBxto31e8RAcBShAJBzJPgSJQsWbPXR38AfQnJn6AiveGz3JjebQm9Ye63BrnNA57QrPshwknxpzSrcNEZW",
        "ed25519:2g5s4SKsHt9PMdekkDqVtwwtz14v4edhqdBX1MYA8tB6nDpj3vDCDCTy9pEU8dX31PoQe5ygnf88aTZukMBMK1Yt",
        "ed25519:3Xz4jqhdyS3qs6xTmWdgjwt5gJraU5czMA89hPhmvbAN4aA7SUKL1HkevpmutRQqqxe7c7uCFeGiDHvDcxhhmD8W",
        null,
        "ed25519:55xs3vwPEys39egf9Z8SNyn1JsHPRMgj9HCX1GE7GJsVTcAuutQUCo91E12ZdXkuToYRXb9KzoT8n9XQRCNuLpwY",
        null,
        "ed25519:28JrFw7KnhnQPN89qZnnw17KDBjS6CDN7zB1hTg7KGg8qQPoCzakz9DNnaSnx39ji7e2fQSpZt4cNJaD7K7Yu7yo",
        "ed25519:41hAr5qhtvUYpdD2NK9qqTVnpG325ZoAiwrcmk1MJH7fdpxm7oSKXvXZqh7bTmPhv61hH2RpHnhcGuN4QqLzK2zt",
        "ed25519:4QacMsQ5FJgvecAYDFq8QBh19BBjh4qU8oeD5bV7p6Zhhu3e6r2iSHTvDBU2Q62RZAaWQQkkEwDUC9rsXdkGVhAt",
        "ed25519:27smtCZ3WobEvBuD5DggY6kkGxjB9qRVY6kPixgwqvBT1eKbRVoV8cLj1z51S8RTcp7YzAr1vhHJUHgksatR9Udz",
        "ed25519:4wspCWoAbhYxb3th2eX6ZXvKep1Fsco7mFP5zBodXBR8Wr344ANXSUCri3gUgNCCSoQ2CKSdqDEsvE6Y2jQ9hmbB",
        "ed25519:46XpYf9ZB9gjDfdnJLHqqhYJpQCuvCgB9tzKWS88GANMCb2j9BM3KXyjaEzynSsaPK8VrKFXQuTsTzgQSeo9cWGW",
        null,
        "ed25519:Y5ehsrhEpTRGjG6fHJHsEXj2NYPGMmKguiJHXP7TqsCWHBvNzaJbieR7UDp78hJ1ib7C18J5MB2kCzTXBCF9c3b",
        "ed25519:3P9363Dc8Kqvgjt3TsNRncUrncCHid7aSRnuySjF4JYmQbApkAxomyMu8xm9Rgo3mj9rqXb16PM7Xjn7hKP6TyVr",
        null,
        null,
        "ed25519:65ATjGsigZ3vMp7sGcp1c4ptxoqhHPkBeAaZ5GWJguVDLyrRLPJrtXhLGjH9DpXd7CZswjyMYq5aRtorLnmmJ7GW",
        null,
        "ed25519:5SvqSViXbtsLoFMdtCufyyDgZnrEK7LheFi38X5M2ic17gfV5cz37r85RyixjUv98MbAmgVdmkxVFDGfSbeoHW7X",
        null,
        null,
        "ed25519:2n3fQiBEiDKkB84biXWyQmvnupKX7B8faugY37jVi8hVXuWLggJmaEjqub511RCYwFnwW1RBxYpuJQ455KaniCd4",
        "ed25519:2K9xKFLJ2fW74tddXtghFGFurKWomAqaJmkKYVZKHQT6zHe5wNSYT3vzMotLQcez5JD1Ta57N9zQ4H1RysB2s5DZ",
        null,
        null,
        "ed25519:3qeCRtcLAqLtQ2YSQLcHDa26ykKX1BvAhP9jshLLYapxSEGGgZJY8sU72p9E78AkXwHP3X2Eq74jvts7gTRzNgMg",
        null,
        "ed25519:2czSQCF8wBDomEeSdDRH4gFoyJrp2ppZqR6JDaDGoYpaFkpWxZf2oGDkKfQLZMbfvU6LXkQjJssVHcLCJRMzG8co"
      ],
      "signature": "ed25519:58sdWd6kxzhQdCGvHzxqvdtDLJzqspe74f3gytnqdxDLHf4eesXi7B3nYq2YaosCHZJYmcR4HPHKSoFm3WE4MbxT",
      "latest_protocol_version": 35
    },
    "chunks": [
      {
        "chunk_hash": "EBM2qg5cGr47EjMPtH88uvmXHDHqmWPzKaQadbWhdw22",
        "prev_block_hash": "2yUTTubrv1gJhTUVnHXh66JG3qxStBqySoN6wzRzgdVD",
        "outcome_root": "11111111111111111111111111111111",
        "prev_state_root": "HqWDq3f5HJuWnsTfwZS6jdAUqDjGFSTvjhb846vV27dx",
        "encoded_merkle_root": "9zYue7drR1rhfzEEoc4WUXzaYRnRNihvRoGt1BgK7Lkk",
        "encoded_length": 8,
        "height_created": 17821130,
        "height_included": 17821130,
        "shard_id": 0,
        "gas_used": 0,
        "gas_limit": 1000000000000000,
        "rent_paid": "0",
        "validator_reward": "0",
        "balance_burnt": "0",
        "outgoing_receipts_root": "H4Rd6SGeEBTbxkitsCdzfu9xL9HtZ2eHoPCQXUeZ6bW4",
        "tx_root": "11111111111111111111111111111111",
        "validator_proposals": [],
        "signature": "ed25519:4iPgpYAcPztAvnRHjfpegN37Rd8dTJKCjSd1gKAPLDaLcHUySJHjexMSSfC5iJVy28vqF9VB4psz13x2nt92cbR7"
      }
    ]
  },
  "id": "dontcare"
}
```

</p>
</details>

#### 무엇이 잘못될 수 있나요?? {#what-could-go-wrong}

API 요청이 실패하면, RPC 서버는 제한된 수의 잘 정의된 오류 변형과 함께 구조화된 오류 응답을 반환하므로 클라이언트 코드는 가능한 모든 오류 사례를 철저하게 처리할 수 있습니다. JSON-RPC 오류는 오류 응답을 구조화하기 위해 [verror](https://github.com/joyent/node-verror) 규칙을 따릅니다.


```json
{
    "error": {
        "name": <ERROR_TYPE>,
        "cause": {
            "info": {..},
            "name": <ERROR_CAUSE>
        },
        "code": -32000,
        "data": String,
        "message": "Server error",
    },
    "id": "dontcare",
    "jsonrpc": "2.0"
}
```

> **주의**
> 
> 위 구조의 `code`, `data`, 및 `message` 필드는 레거시 항목으로 간주되며, 향후 사용되지 않을 수 있습니다. 이에 의존하지 마세요.

다음은 `block` 메서드에 의해 반환될 수 있는 오류 변형의 전체 목록입니다.

<table className="custom-stripe">
  <thead>
    <tr>
      <th>
        ERROR_TYPE<br />
        <code>error.name</code>
      </th>
      <th>ERROR_CAUSE<br /><code>error.cause.name</code></th>
      <th>이유</th>
      <th>해결책</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="2">HANDLER_ERROR</td>
      <td>UNKNOWN_BLOCK</td>
      <td>요청된 블록이 아직 생성되지 않았거나 가비지 수집되었습니다(RPC 노드의 공간을 절약하기 위해 정리됨).</td>
      <td>
        <ul>
          <li>요청한 블록이 올바른지 확인하세요.</li>
          <li>If the block had been produced more than 5 epochs ago, try to send your request to <a href="https://near-nodes.io/intro/node-types#archival-node" target="_blank" rel="noopener noreferrer">an archival node</a></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>NOT_SYNCED_YET</td>
      <td>노드가 여전히 동기화 중이고 요청된 블록이 아직 데이터베이스에 없습니다.</td>
      <td>
        <ul>
          <li>노드가 동기화를 마칠 때까지 기다리세요.</li>
          <li>동기화된 다른 노드에 요청을 보내세요.</li>
        </ul>
      </td>
    </tr>
    <tr className="stripe">
      <td>REQUEST_VALIDATION_ERROR</td>
      <td>PARSE_ERROR</td>
      <td>전달된 인자는 JSON RPC 서버에서 파싱할 수 없습니다(인자 누락, 잘못된 형식 등).</td>
      <td>
        <ul>
          <li>전달된 인자를 확인하고 올바른 인수를 전달하세요.</li>
          <li><code>error.cause.info</code>에서 자세한 내용을 확인하세요.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>INTERNAL_ERROR</td>
      <td>INTERNAL_ERROR</td>
      <td>노드 자체에 문제가 있거나 과부하가 걸렸습니다.</td>
      <td>
        <ul>
          <li>나중에 다시 시도하세요.</li>
          <li>다른 노드에 요청을 보내세요.</li>
          <li><code>error.cause.info</code>에서 자세한 내용을 확인하세요.</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

---

## 블록의 변경 사항 {#changes-in-block}

> 주어진 블록 높이 또는 해시에 대한 블록의 변경 사항을 반환합니다. `finality` 매개변수를 사용하여 최신 블록 세부 정보를 반환할 수도 있습니다.

**참고**: 특정 블록 _또는_ 완결성으로 검색하도록 선택할 수 있으며, 둘 다 선택할 수는 없습니다.

- 메서드: `EXPERIMENTAL_changes_in_block`
- 매개변수:
  - [`finality`](/api/rpc/setup#using-finality-param) _또는_ [`block_id`](/api/rpc/setup#using-block_id-param)

`finality`


<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "EXPERIMENTAL_changes_in_block",
  "params": {
    "finality": "final"
  }
}
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js
const response = await near.connection.provider.experimental_changes_in_block({
  finality: "final",
});
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=EXPERIMENTAL_changes_in_block \
  params:='{
    "finality": "final"
  }'
```

</TabItem>
</Tabs>

`[block_id]`


<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "EXPERIMENTAL_changes_in_block",
  "params": {
    "block_id": 17821135
  }
}
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js
const response = await near.connection.provider.experimental_changes_in_block(
  17821135
);
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=EXPERIMENTAL_changes_in_block \
  params:='{
    "block_id": 17821135
  }'
```

</TabItem>
</Tabs>

`block_hash`


<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "EXPERIMENTAL_changes_in_block",
  "params": {
    "block_id": "81k9ked5s34zh13EjJt26mxw5npa485SY4UNoPi6yYLo"
  }
}
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js
const response = await near.connection.provider.experimental_changes_in_block(
  "81k9ked5s34zh13EjJt26mxw5npa485SY4UNoPi6yYLo"
);
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=EXPERIMENTAL_changes_in_block \
  params:='{
    "block_id": "81k9ked5s34zh13EjJt26mxw5npa485SY4UNoPi6yYLo"
  }'
```

</TabItem>
</Tabs>

<details>
<summary>응답 예시: </summary>
<p>

```json
{
  "jsonrpc": "2.0",
  "result": {
    "block_hash": "81k9ked5s34zh13EjJt26mxw5npa485SY4UNoPi6yYLo",
    "changes": [
      {
        "type": "account_touched",
        "account_id": "lee.testnet"
      },
      {
        "type": "contract_code_touched",
        "account_id": "lee.testnet"
      },
      {
        "type": "access_key_touched",
        "account_id": "lee.testnet"
      }
    ]
  },
  "id": "dontcare"
}
```

</p>
</details>

#### 무엇이 잘못될 수 있나요?? {#what-could-go-wrong-1}

API 요청이 실패하면 RPC 서버는 제한된 수의 잘 정의된 오류 변형과 함께 구조화된 오류 응답을 반환하므로, 클라이언트 코드는 가능한 모든 오류 사례를 철저하게 처리할 수 있습니다. JSON-RPC 오류는 오류 응답을 구조화하기 위해 [verror](https://github.com/joyent/node-verror) 규칙을 따릅니다.


```json
{
    "error": {
        "name": <ERROR_TYPE>,
        "cause": {
            "info": {..},
            "name": <ERROR_CAUSE>
        },
        "code": -32000,
        "data": String,
        "message": "Server error",
    },
    "id": "dontcare",
    "jsonrpc": "2.0"
}
```

> **주의**
> 
> 위 구조의 `code`, `data`, 및 `message` 필드는 레거시 항목으로 간주되며, 향후 사용되지 않을 수 있습니다. 이에 의존하지 마세요.

다음은 `EXPERIMENTAL_changes_in_block` 메서드에 의해 반환될 수 있는 오류 변형의 전체 목록입니다.

<table className="custom-stripe">
  <thead>
    <tr>
      <th>
        ERROR_TYPE<br />
        <code>error.name</code>
      </th>
      <th>ERROR_CAUSE<br /><code>error.cause.name</code></th>
      <th>이유</th>
      <th>해결책</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="2">HANDLER_ERROR</td>
      <td>UNKNOWN_BLOCK</td>
      <td>요청된 블록이 아직 생성되지 않았거나 가비지 수집되었습니다(RPC 노드의 공간을 절약하기 위해 정리됨).</td>
      <td>
        <ul>
          <li>요청한 블록이 올바른지 확인하세요.</li>
          <li>If the block had been produced more than 5 epochs ago, try to send your request to <a href="https://near-nodes.io/intro/node-types#archival-node" target="_blank" rel="noopener noreferrer">an archival node</a></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>NOT_SYNCED_YET</td>
      <td>노드가 여전히 동기화 중이고 요청된 블록이 아직 데이터베이스에 없습니다.</td>
      <td>
        <ul>
          <li>노드가 동기화를 마칠 때까지 기다리세요.</li>
          <li>동기화된 다른 노드에 요청을 보내세요.</li>
        </ul>
      </td>
    </tr>
    <tr className="stripe">
      <td>REQUEST_VALIDATION_ERROR</td>
      <td>PARSE_ERROR</td>
      <td>전달된 인자는 JSON RPC 서버에서 파싱할 수 없습니다(인자 누락, 잘못된 형식 등).</td>
      <td>
        <ul>
          <li>전달된 인자를 확인하고 올바른 인수를 전달하세요.</li>
          <li><code>error.cause.info</code>에서 자세한 내용을 확인하세요.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>INTERNAL_ERROR</td>
      <td>INTERNAL_ERROR</td>
      <td>노드 자체에 문제가 있거나 과부하가 걸렸습니다.</td>
      <td>
        <ul>
          <li>나중에 다시 시도하세요.</li>
          <li>다른 노드에 요청을 보내세요.</li>
          <li><code>error.cause.info</code>에서 자세한 내용을 확인하세요.</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

---

## 청크 세부 사항 {#chunk-details}

> 특정 청크의 세부 정보를 반환합니다. [블록 세부 정보](/api/rpc/setup#block-details) 쿼리를 실행하여 유효한 청크 해시를 얻을 수 있습니다.

- 메서드: `chunk`
- 매개변수:
  - `chunk_id` _또는_ [`block_id`, `shard_id`](/api/rpc/setup#using-block_id-param)

`chunk_id` 예시:


<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "chunk",
  "params": {"chunk_id": "EBM2qg5cGr47EjMPtH88uvmXHDHqmWPzKaQadbWhdw22"}
}
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js
const response = await near.connection.provider.chunk({
  chunk_id: "EBM2qg5cGr47EjMPtH88uvmXHDHqmWPzKaQadbWhdw22"
});
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 method=chunk params:='{"chunk_id": "EBM2qg5cGr47EjMPtH88uvmXHDHqmWPzKaQadbWhdw22"}' id=dontcare
```

</TabItem>
</Tabs>

`block_id`, `shard_id` 예시:


<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "chunk",
  "params": {"block_id": 58934027, "shard_id": 0}
}
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js
const response = await near.connection.provider.chunk({
  block_id: 58934027, shard_id: 0
});
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 method=chunk params:='{"block_id": 58934027, "shard_id": 0}' id=dontcare
```

</TabItem>
</Tabs>

<details>
<summary>응답 예시: </summary>
<p>

```json
{
  "jsonrpc": "2.0",
  "result": {
    "author": "bitcat.pool.f863973.m0",
    "header": {
      "chunk_hash": "EBM2qg5cGr47EjMPtH88uvmXHDHqmWPzKaQadbWhdw22",
      "prev_block_hash": "2yUTTubrv1gJhTUVnHXh66JG3qxStBqySoN6wzRzgdVD",
      "outcome_root": "11111111111111111111111111111111",
      "prev_state_root": "HqWDq3f5HJuWnsTfwZS6jdAUqDjGFSTvjhb846vV27dx",
      "encoded_merkle_root": "9zYue7drR1rhfzEEoc4WUXzaYRnRNihvRoGt1BgK7Lkk",
      "encoded_length": 8,
      "height_created": 17821130,
      "height_included": 17821130,
      "shard_id": 0,
      "gas_used": 0,
      "gas_limit": 1000000000000000,
      "rent_paid": "0",
      "validator_reward": "0",
      "balance_burnt": "0",
      "outgoing_receipts_root": "H4Rd6SGeEBTbxkitsCdzfu9xL9HtZ2eHoPCQXUeZ6bW4",
      "tx_root": "11111111111111111111111111111111",
      "validator_proposals": [],
      "signature": "ed25519:4iPgpYAcPztAvnRHjfpegN37Rd8dTJKCjSd1gKAPLDaLcHUySJHjexMSSfC5iJVy28vqF9VB4psz13x2nt92cbR7"
    },
    "transactions": [],
    "receipts": []
  },
  "id": "dontcare"
}
```

</p>
</details>

#### 무엇이 잘못될 수 있나요?? {#what-could-go-wrong-2}

API 요청이 실패하면 RPC 서버는 제한된 수의 잘 정의된 오류 변형과 함께 구조화된 오류 응답을 반환하므로, 클라이언트 코드는 가능한 모든 오류 사례를 철저하게 처리할 수 있습니다. JSON-RPC 오류는 오류 응답을 구조화하기 위해 [verror](https://github.com/joyent/node-verror) 규칙을 따릅니다.


```json
{
    "error": {
        "name": <ERROR_TYPE>,
        "cause": {
            "info": {..},
            "name": <ERROR_CAUSE>
        },
        "code": -32000,
        "data": String,
        "message": "Server error",
    },
    "id": "dontcare",
    "jsonrpc": "2.0"
}
```

> **주의**
> 
> 위 구조의 `code`, `data`, 및 `message` 필드는 레거시 항목으로 간주되며, 향후 사용되지 않을 수 있습니다. 이에 의존하지 마세요.

다음은 `chunk` 메서드에 의해 반환될 수 있는 오류 변형의 전체 목록입니다.

<table className="custom-stripe">
  <thead>
    <tr>
      <th>
        ERROR_TYPE<br />
        <code>error.name</code>
      </th>
      <th>ERROR_CAUSE<br /><code>error.cause.name</code></th>
      <th>이유</th>
      <th>해결책</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="4">HANDLER_ERROR</td>
      <td>UNKNOWN_BLOCK</td>
      <td>요청된 블록이 아직 생성되지 않았거나 가비지 수집되었습니다(RPC 노드의 공간을 절약하기 위해 정리됨).</td>
      <td>
        <ul>
          <li>요청한 블록이 올바른지 확인하세요.</li>
          <li>If the block had been produced more than 5 epochs ago, try to send your request to <a href="https://near-nodes.io/intro/node-types#archival-node" target="_blank" rel="noopener noreferrer">an archival node</a></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>UNKNOWN_CHUNK</td>
      <td>요청한 청크를 데이터베이스에서 찾을 수 없습니다.</td>
      <td>
        <ul>
          <li>요청한 청크가 올바른지 확인하세요.</li>
          <li>청크가 5 이상 에포크 전에 생성된 경우, 아카이브 노드로 요청을 보내세요.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>INVALID_SHARD_ID</td>
      <td>제공된 <code>shard_id</code>가 존재하지 않습니다.</td>
      <td>
        <ul>
          <li>기존 샤드에 <code>shard_id</code>를 제공합니다.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>NOT_SYNCED_YET</td>
      <td>노드가 여전히 동기화 중이고 요청된 블록이 아직 데이터베이스에 없습니다.</td>
      <td>
        <ul>
          <li>노드가 동기화를 마칠 때까지 기다리세요.</li>
          <li>동기화된 다른 노드에 요청을 보내세요.</li>
        </ul>
      </td>
    </tr>
    <tr className="stripe">
      <td>REQUEST_VALIDATION_ERROR</td>
      <td>PARSE_ERROR</td>
      <td>전달된 인자는 JSON RPC 서버에서 파싱할 수 없습니다(인자 누락, 잘못된 형식 등).</td>
      <td>
        <ul>
          <li>전달된 인자를 확인하고 올바른 인수를 전달하세요.</li>
          <li><code>error.cause.info</code>에서 자세한 내용을 확인하세요.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>INTERNAL_ERROR</td>
      <td>INTERNAL_ERROR</td>
      <td>노드 자체에 문제가 있거나 과부하가 걸렸습니다.</td>
      <td>
        <ul>
          <li>나중에 다시 시도하세요.</li>
          <li>다른 노드에 요청을 보내세요.</li>
          <li><code>error.cause.info</code>에서 자세한 내용을 확인하세요.</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

---
