---
id: contracts
title: 계정 / 컨트랙트
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

RPC API를 사용하면 계정 및 컨트랙트에 대한 세부 정보를 보고 컨트랙트 호출을 수행할 수 있습니다.

---

## 계정 보기 {#view-account}

> 기본 계정 정보를 반환합니다.

- 메서드: `query`
- 매개변수:
  - `request_type`: `view_account`
  - [`finality`](/api/rpc/setup#using-finality-param) _OR_ [`block_id`](/api/rpc/setup#using-block_id-param)
  - `account_id`: _`"example.testnet"`_

예시:

<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "query",
  "params": {
    "request_type": "view_account",
    "finality": "final",
    "account_id": "nearkat.testnet"
  }
}
```

</TabItem>
<TabItem value="🌐 JavaScript" label="JavaScript">

```js
const response = await near.connection.provider.query({
  request_type: "view_account",
  finality: "final",
  account_id: "nearkat.testnet",
});
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=query \
  params:='{
    "request_type": "view_account",
    "finality": "final",
    "account_id": "nearkat.testnet"
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
    "amount": "399992611103597728750000000",
    "locked": "0",
    "code_hash": "11111111111111111111111111111111",
    "storage_usage": 642,
    "storage_paid_at": 0,
    "block_height": 17795474,
    "block_hash": "9MjpcnwW3TSdzGweNfPbkx8M74q1XzUcT1PAN8G5bNDz"
  },
  "id": "dontcare"
}
```

</p>
</details>

#### 무엇이 잘못될 수 있나요? {#what-could-go-wrong}

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

다음은 `view_account` 요청 자료형에 의해 반환될 수 있는 오류 변형의 전체 목록입니다.

<table class="custom-stripe">
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
      <td rowspan="5">HANDLER_ERROR</td>
      <td>UNKNOWN_BLOCK</td>
      <td>요청된 블록이 아직 생성되지 않았거나 가비지 수집되었습니다(RPC 노드의 공간을 절약하기 위해 정리됨).</td>
      <td>
        <ul>
          <li>요청한 블록이 올바른지 확인</li>
          <li>블록이 5 이상의 에포크 전에 생성된 경우, <a href="https://near-nodes.io/intro/node-types#archival-node">아카이브 노드</a>로 요청을 보내세요.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>INVALID_ACCOUNT</td>
      <td>요청된 <code>account_id</code>가 잘못되었습니다.</td>
      <td>
        <ul>
          <li>유효한 <code>account_id</code>를 제공합니다.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>UNKNOWN_ACCOUNT</td>
      <td>계정이 생성되지 않았거나 이미 삭제되었기 때문에 요청된 <code>account_id</code>를 찾을 수 없습니다.</td>
      <td>
        <ul>
          <li><code>account_id</code>를 확인합니다.</li>
          <li>최신 상태를 요청하는 경우, 다른 블록을 지정하거나 다시 시도하세요.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>UNAVAILABLE_SHARD</td>
      <td>노드가 데이터가 있는 샤드를 추적하지 않기 때문에 요청된 데이터를 찾을 수 없습니다.</td>
      <td>
        <ul>
          <li>전달된 인자를 확인하고 올바른 인자를 전달하세요.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>NO_SYNCED_BLOCKS</td>
      <td>노드가 여전히 동기화 중이고 요청된 블록이 아직 데이터베이스에 없습니다.</td>
      <td>
        <ul>
          <li>노드가 동기화를 마칠 때까지 기다리세요.</li>
          <li>동기화된 다른 노드에 요청을 보내세요.</li>
        </ul>
      </td>
    </tr>
    <tr class="stripe">
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

## 계정 변경 보기 {#view-account-changes}

> 지정된 계정의 트랜잭션에서 계정 변경 사항을 반환합니다.

- 메서드: `EXPERIMENTAL_changes`
- 매개변수:
  - `changes_type`: `account_changes`
  - `account_ids`: [`"example.testnet"`]
  - [`finality`](/api/rpc/setup#using-finality-param) _OR_ [`block_id`](/api/rpc/setup#using-block_id-param)

예시:

<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "EXPERIMENTAL_changes",
  "params": {
    "changes_type": "account_changes",
    "account_ids": ["your_account.testnet"],
    "block_id": 19703467
  }
}
```

</TabItem>
<TabItem value="🌐 JavaScript" label="JavaScript">

```js
const response = await near.connection.provider.experimental_changes({
  changes_type: "account_changes",
  account_ids: ["nearkat.testnet"],
  block_id: 19703467,
});
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=EXPERIMENTAL_changes \
  params:='{
    "changes_type": "account_changes",
    "account_ids": ["your_account.testnet"],
    "block_id": 19703467
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
    "block_hash": "6xsfPSG89s6fCMShxxxQTP6D4ZHM9xkGCgubayTDRzAP",
    "changes": [
      {
        "cause": {
          "type": "transaction_processing",
          "tx_hash": "HLvxLKFM7gohFSqXPp5SpyydNEVpAno352qJJbnddsz3"
        },
        "type": "account_update",
        "change": {
          "account_id": "your_account.testnet",
          "amount": "499999959035075000000000000",
          "locked": "0",
          "code_hash": "11111111111111111111111111111111",
          "storage_usage": 182,
          "storage_paid_at": 0
        }
      },
      {
        "cause": {
          "type": "receipt_processing",
          "receipt_hash": "CPenN1dp4DNKnb9LiL5hkPmu1WiKLMuM7msDjEZwDmwa"
        },
        "type": "account_update",
        "change": {
          "account_id": "your_account.testnet",
          "amount": "499999959035075000000000000",
          "locked": "0",
          "code_hash": "11111111111111111111111111111111",
          "storage_usage": 264,
          "storage_paid_at": 0
        }
      }
    ]
  },
  "id": "dontcare"
}
```

</p>
</details>

#### 무엇이 잘못될 수 있나요? {#what-could-go-wrong-1}

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

다음은 `EXPERIMENTAL_changes` 메서드에 의해 반환될 수 있는 오류 변형의 전체 목록입니다.

<table class="custom-stripe">
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
          <li>블록이 5 이상의 에포크 전에 생성된 경우, <a href="https://near-nodes.io/intro/node-types#archival-node">아카이브 노드</a>로 요청을 보내세요.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>NOT_SYNCED_YET</td>
      <td>노드가 여전히 동기화 중이고 요청된 블록이 아직 데이터베이스에 없습니다.</td>
      <td>
        <ul>
          <li>노드가 동기화를 마칠 때까지 기다리세요.</li>
          <li>동기화된 다른 노드에 요청을 보냅니다.</li>
        </ul>
      </td>
    </tr>
    <tr class="stripe">
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

## 컨트랙트 코드 보기 {#view-contract-code}

> 계정에 배포된 컨트랙트 코드(Wasm 바이너리)를 반환합니다. 반환된 코드는 base64로 인코딩됩니다.

- 메서드: `query`
- 매개변수:
  - `request_type`: `view_code`
  - [`finality`](/api/rpc/setup#using-finality-param) _OR_ [`block_id`](/api/rpc/setup#using-block_id-param)
  - `account_id`: `"guest-book.testnet"`,

예시:

<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "query",
  "params": {
    "request_type": "view_code",
    "finality": "final",
    "account_id": "guest-book.testnet"
  }
}
```

</TabItem>
<TabItem value="🌐 JavaScript" label="JavaScript">

```js
const response = await near.connection.provider.query({
  request_type: "view_code",
  finality: "final",
  account_id: "guest-book.testnet",
});
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=query \
  params:='{
    "request_type": "view_code",
    "finality": "final",
    "account_id": "guest-book.testnet"
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
    "code_base64": "47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=",
    "hash": "7KoFshMQkdyo5iTx8P2LbLu9jQpxRn24d27FrKShNVXs",
    "block_height": 17814234,
    "block_hash": "GT1D8nweVQU1zyCUv399x8vDv2ogVq71w17MyR66hXBB"
  },
  "id": "dontcare"
}
```

</p>
</details>

#### 무엇이 잘못될 수 있나요? {#what-could-go-wrong-2}

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

다음은 `view_code` 요청 자료형에 의해 반환될 수 있는 오류 변형의 전체 목록입니다.

<table class="custom-stripe">
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
      <td rowspan="6">HANDLER_ERROR</td>
      <td>UNKNOWN_BLOCK</td>
      <td>요청된 블록이 아직 생성되지 않았거나 가비지 수집되었습니다(RPC 노드의 공간을 절약하기 위해 정리됨).</td>
      <td>
        <ul>
          <li>요청한 블록이 올바른지 확인</li>
          <li>블록이 5 이상의 에포크 전에 생성된 경우, <a href="https://near-nodes.io/intro/node-types#archival-node">아카이브</a>로 요청을 보내세요. <a href="https://near-nodes.io/intro/node-types#archival-node">an archival node</a></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>INVALID_ACCOUNT</td>
      <td>요청된 <code>account_id</code>가 잘못되었습니다.</td>
      <td>
        <ul>
          <li>유효한 <code>account_id</code>를 제공합니다.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>UNKNOWN_ACCOUNT</td>
      <td>계정이 생성되지 않았거나 이미 삭제되었기 때문에 요청된 <code>account_id</code>를 찾을 수 없습니다.</td>
      <td>
        <ul>
          <li><code>account_id</code>를 확인합니다.</li>
          <li>최신 상태를 요청하는 경우, 다른 블록을 지정하거나 다시 시도하세요.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>NO_CONTRACT_CODE</td>
      <td><code>contract</code> 계정에 배포된 항목이 없습니다.</td>
      <td>
        <ul>
          <li>다른 계정을 사용하세요.</li>
          <li>최신 상태를 요청하는 경우 다른 블록을 지정하거나 다시 시도하세요.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>UNAVAILABLE_SHARD</td>
      <td>공개 키가 생성되지 않았거나 이미 삭제되었기 때문에 요청된 <code>public_key</code>를 찾을 수 없습니다.</td>
      <td>
        <ul>
          <li>샤드를 추적할 수 있는 다른 노드에 요청을 보냅니다.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>NO_SYNCED_BLOCKS</td>
      <td>노드가 여전히 동기화 중이고 요청된 블록이 아직 데이터베이스에 없습니다.</td>
      <td>
        <ul>
          <li>노드가 동기화를 마칠 때까지 기다리세요.</li>
          <li>동기화된 다른 노드에 요청을 보내세요.</li>
        </ul>
      </td>
    </tr>
    <tr class="stripe">
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

## 컨트랙트 상태 보기 {#view-contract-state}

> 키 접두사(base64 인코딩)를 기반으로 컨트랙트의 상태(키-값 쌍)를 반환합니다. 전체 상태를 반환하려면 `prefix_base64`에 대해 빈 문자열을 전달하세요. 반환된 상태도 base64로 인코딩됩니다.

- 메서드: `query`
- 매개변수:
  - `request_type`: `view_state`
  - [`finality`](/api/rpc/setup#using-finality-param) _OR_ [`block_id`](/api/rpc/setup#using-block_id-param)
  - `account_id`: `"guest-book.testnet"`,
  - `prefix_base64`: `""`

예시:

<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "query",
  "params": {
    "request_type": "view_state",
    "finality": "final",
    "account_id": "guest-book.testnet",
    "prefix_base64": ""
  }
}
```

</TabItem>
<TabItem value="🌐 JavaScript" label="JavaScript">

```js
const response = await near.connection.provider.query({
  request_type: "view_state",
  finality: "final",
  account_id: "guest-book.testnet",
  prefix_base64: "",
});
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=query \
  params:='{
    "request_type": "view_state",
    "finality": "final",
    "account_id": "guest-book.testnet",
    "prefix_base64": ""
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
    "values": [
      {
        "key": "bTo6MA==",
        "value": "eyJwcmVtaXVtIjp0cnVlLCJzZW5kZXIiOiJqb3NoZm9yZC50ZXN0bmV0IiwidGV4dCI6ImhlbGxvIn0=",
        "proof": []
      },
      {
        "key": "bTo6MQ==",
        "value": "eyJwcmVtaXVtIjpmYWxzZSwic2VuZGVyIjoiY2hhZG9oIiwidGV4dCI6ImhlbGxvIGVyeWJvZHkifQ==",
        "proof": []
      },
      {
        "key": "bTo6MTA=",
        "value": "eyJwcmVtaXVtIjpmYWxzZSwic2VuZGVyIjoic2F0b3NoaWYudGVzdG5ldCIsInRleHQiOiJIaWxsbyEifQ==",
        "proof": []
      },
      {
        "key": "bTo6MTE=",
        "value": "eyJwcmVtaXVtIjpmYWxzZSwic2VuZGVyIjoidmFsZW50aW5lc29rb2wudGVzdG5ldCIsInRleHQiOiJIaSEifQ==",
        "proof": []
      },
      {
        "key": "bTo6MTI=",
        "value": "eyJwcmVtaXVtIjp0cnVlLCJzZW5kZXIiOiJobngudGVzdG5ldCIsInRleHQiOiJoZWxsbyJ9",
        "proof": []
      },
      {
        "key": "bTo6MTM=",
        "value": "eyJwcmVtaXVtIjp0cnVlLCJzZW5kZXIiOiJobngudGVzdG5ldCIsInRleHQiOiJzZCJ9",
        "proof": []
      },
      {
        "key": "bTo6MTQ=",
        "value": "eyJwcmVtaXVtIjpmYWxzZSwic2VuZGVyIjoiamdoZy50ZXN0bmV0IiwidGV4dCI6IktoZyJ9",
        "proof": []
      },
      {
        "key": "bTo6MTU=",
        "value": "eyJwcmVtaXVtIjpmYWxzZSwic2VuZGVyIjoiYWNjb3VudC50ZXN0bmV0IiwidGV4dCI6IldoZW4gSUNPPyJ9",
        "proof": []
      },
      {
        "key": "bTo6MTY=",
        "value": "eyJwcmVtaXVtIjpmYWxzZSwic2VuZGVyIjoiYWNjb3VudC50ZXN0bmV0IiwidGV4dCI6IlRlc3QgMiJ9",
        "proof": []
      },
      {
        "key": "bTo6MTc=",
        "value": "eyJwcmVtaXVtIjpmYWxzZSwic2VuZGVyIjoidGVzdC1kcm9wLTEwLnRlc3RuZXQiLCJ0ZXh0IjoiRnJlZSBtZXNzYWdlcyBhcmUgdGhlIGJlc3QifQ==",
        "proof": []
      },
      {
        "key": "bTo6MTg=",
        "value": "eyJwcmVtaXVtIjpmYWxzZSwic2VuZGVyIjoidGVzdC1kcm9wLTEwLnRlc3RuZXQiLCJ0ZXh0IjoiV2hlbiBJQ08/In0=",
        "proof": []
      },
      {
        "key": "bTo6MTk=",
        "value": "eyJwcmVtaXVtIjpmYWxzZSwic2VuZGVyIjoidGVzdC1kcm9wLTEwLnRlc3RuZXQiLCJ0ZXh0IjoiV2hlbiBJQ08/In0=",
        "proof": []
      },
      {
        "key": "bTo6Mg==",
        "value": "eyJwcmVtaXVtIjpmYWxzZSwic2VuZGVyIjoibnVsbCIsInRleHQiOiJ1bmRlZmluZWQifQ==",
        "proof": []
      },
      {
        "key": "bTo6MjA=",
        "value": "eyJwcmVtaXVtIjpmYWxzZSwic2VuZGVyIjoidGVzdC04NDEudGVzdG5ldCIsInRleHQiOiJXaGVuIElDTz8ifQ==",
        "proof": []
      },
      {
        "key": "bTo6MjE=",
        "value": "eyJwcmVtaXVtIjpmYWxzZSwic2VuZGVyIjoidGVzdC04NDEudGVzdG5ldCIsInRleHQiOiJoZXkgaGV5IGhleSJ9",
        "proof": []
      },
      {
        "key": "bTo6MjI=",
        "value": "eyJwcmVtaXVtIjpmYWxzZSwic2VuZGVyIjoiam9zaGZvcmQudGVzdG5ldCIsInRleHQiOiJoaSJ9",
        "proof": []
      },
      {
        "key": "bTo6MjM=",
        "value": "eyJwcmVtaXVtIjpmYWxzZSwic2VuZGVyIjoiam9zaGZvcmQudGVzdG5ldCIsInRleHQiOiJoaSB4MiJ9",
        "proof": []
      },
      {
        "key": "bTo6MjQ=",
        "value": "eyJwcmVtaXVtIjpmYWxzZSwic2VuZGVyIjoibWFzdGVydGh5c2VsZi50ZXN0bmV0IiwidGV4dCI6ImhhbmRzaGFrZS5oYWNrbWVkb21haW4vICJ9",
        "proof": []
      },
      {
        "key": "bTo6MjU=",
        "value": "eyJwcmVtaXVtIjp0cnVlLCJzZW5kZXIiOiJtYXN0ZXJ0aHlzZWxmLnRlc3RuZXQiLCJ0ZXh0IjoiSGVsbG8gQ29zbW9zLCBob21lLmNvc21hdHJpeGNvbm5lY3Rpb25zLyJ9",
        "proof": []
      },
      {
        "key": "bTo6MjY=",
        "value": "eyJwcmVtaXVtIjp0cnVlLCJzZW5kZXIiOiJtYXN0ZXJ0aHlzZWxmLnRlc3RuZXQiLCJ0ZXh0IjoiYnVpbGQsIGJ1aWxkLCBidWlsZCBpIGNhbWUgdG8gYnVpbGQgYSBicmlkZ2UgaW4gUEVBQ0UsIHNvIGNvbWUgbGV0cyBidWlsZC4uLnNvbmcgYnkgXCJOYWhrbyBCZWFyXCIgIn0=",
        "proof": []
      },
      {
        "key": "bTo6Mjc=",
        "value": "eyJwcmVtaXVtIjp0cnVlLCJzZW5kZXIiOiJtYXN0ZXJ0aHlzZWxmLnRlc3RuZXQiLCJ0ZXh0IjoiYnVpbGQgYSBicmlkZ2UgKGh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vdXJsP3NhPXQmcmN0PWomcT0mZXNyYz1zJnNvdXJjZT13ZWImY2Q9JmNhZD1yamEmdWFjdD04JnZlZD0yYWhVS0V3ajA0ZGlnMTlqckFoV05tbGtLSGR5X0FnUVEzeXd3QUhvRUNBVVFBZyZ1cmw9aHR0cHMlM0ElMkYlMkZ3d3cueW91dHViZS5jb20lMkZ3YXRjaCUzRnYlM0Rlb1RYNWZmOVplMCZ1c2c9QU92VmF3MFoxZzFIMkZzeF85d3FJSmg5RTk2UCkifQ==",
        "proof": []
      },
      {
        "key": "bTo6Mjg=",
        "value": "eyJwcmVtaXVtIjp0cnVlLCJzZW5kZXIiOiJtYXN0ZXJ0aHlzZWxmLnRlc3RuZXQiLCJ0ZXh0IjoiaHR0cDovL3RyaXBweS7wn42EbWFnaWMvIn0=",
        "proof": []
      },
      {
        "key": "bTo6Mjk=",
        "value": "eyJwcmVtaXVtIjp0cnVlLCJzZW5kZXIiOiJtYXN0ZXJ0aHlzZWxmLnRlc3RuZXQiLCJ0ZXh0IjoiaHR0cDovL3VuaXRlLnJhaW5ib3d0cmliZXMvIn0=",
        "proof": []
      },
      {
        "key": "bTo6Mw==",
        "value": "eyJwcmVtaXVtIjpmYWxzZSwic2VuZGVyIjoiam9zaGZvcmQudGVzdG5ldCIsInRleHQiOiJobW1tbW1tIn0=",
        "proof": []
      },
      {
        "key": "bTo6MzA=",
        "value": "eyJwcmVtaXVtIjpmYWxzZSwic2VuZGVyIjoiZXhlbXBsYXJ5LnRlc3RuZXQiLCJ0ZXh0IjoiaGVsbG8ifQ==",
        "proof": []
      },
      {
        "key": "bTo6MzE=",
        "value": "eyJwcmVtaXVtIjpmYWxzZSwic2VuZGVyIjoiYWRpMjMudGVzdG5ldCIsInRleHQiOiJobW0ifQ==",
        "proof": []
      },
      {
        "key": "bTo6MzI=",
        "value": "eyJwcmVtaXVtIjpmYWxzZSwic2VuZGVyIjoiYWRpMjMudGVzdG5ldCIsInRleHQiOiJ3aGF0In0=",
        "proof": []
      },
      {
        "key": "bTo6MzM=",
        "value": "eyJwcmVtaXVtIjpmYWxzZSwic2VuZGVyIjoidmxhZGJhc2gudGVzdG5ldCIsInRleHQiOiJIaSJ9",
        "proof": []
      },
      {
        "key": "bTo6NA==",
        "value": "eyJwcmVtaXVtIjpmYWxzZSwic2VuZGVyIjoibnVsbCIsInRleHQiOiIgIn0=",
        "proof": []
      },
      {
        "key": "bTo6NQ==",
        "value": "eyJwcmVtaXVtIjp0cnVlLCJzZW5kZXIiOiJ0ZXN0YWNjb3VudDEudGVzdG5ldCIsInRleHQiOiJ0ZXN0In0=",
        "proof": []
      },
      {
        "key": "bTo6Ng==",
        "value": "eyJwcmVtaXVtIjpmYWxzZSwic2VuZGVyIjoiZXVnZW5ldGhlZHJlYW0iLCJ0ZXh0IjoibnVsbCJ9",
        "proof": []
      },
      {
        "key": "bTo6Nw==",
        "value": "eyJwcmVtaXVtIjpmYWxzZSwic2VuZGVyIjoiZGVtby50ZXN0bmV0IiwidGV4dCI6Ikkgb25seSB3cml0ZSBmcmVlIG1lc3NhZ2VzLiJ9",
        "proof": []
      },
      {
        "key": "bTo6OA==",
        "value": "eyJwcmVtaXVtIjp0cnVlLCJzZW5kZXIiOiJqb3NoZm9yZC50ZXN0bmV0IiwidGV4dCI6IkkgcHJlZmVyIHByZW1pdW0gbWVzc2FnZXMifQ==",
        "proof": []
      },
      {
        "key": "bTo6OQ==",
        "value": "eyJwcmVtaXVtIjp0cnVlLCJzZW5kZXIiOiJuZXdsZWRnZXIzLnRlc3RuZXQiLCJ0ZXh0IjoiTGVkZ2VyIn0=",
        "proof": []
      },
      {
        "key": "bTpsZW4=",
        "value": "MzQ=",
        "proof": []
      }
    ],
    "proof": [],
    "block_height": 17814234,
    "block_hash": "GT1D8nweVQU1zyCUv399x8vDv2ogVq71w17MyR66hXBB"
  },
  "id": "dontcare"
}
```
</p>

**참고**:  현재 응답에는 `result`에 직접 `proof` 필드와 `values` 목록의 각 요소 내 `proof` 필드가 포함됩니다.  앞으로 `result.proof`는 결과가 **비어 있지 않은** 경우에만 포함될 것이며, `proof` 필드는 모든 `values`에서 제거됩니다. 결과를 구문 분석할 때 이러한 필드가 설정되거나 설정되지 않은 객체를 수락해야 합니다.

</details>

> **주의**
> 
> 기본 RPC 노드에는 제한이 있습니다. 컨트랙트 상태가 너무 크면 컨트랙트 상태를 가져올 수 없습니다. 컨트랙트 상태의 기본 제한은 상태 크기의 50kb입니다. `config.json` 내 `trie_viewer_state_size_limit` 조정된 값으로 [자체 RPC 노드를 실행](https://near-nodes.io/validator/compile-and-run-a-node)하는 경우, 제한을 변경할 수 있습니다.

#### 무엇이 잘못될 수 있나요? {#what-could-go-wrong-3}

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

다음은 `view_state` 요청 자료형에 의해 반환될 수 있는 오류 변형의 전체 목록입니다.

<table class="custom-stripe">
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
      <td rowspan="7">HANDLER_ERROR</td>
      <td>UNKNOWN_BLOCK</td>
      <td>요청된 블록이 아직 생성되지 않았거나 가비지 수집되었습니다(RPC 노드의 공간을 절약하기 위해 정리됨).</td>
      <td>
        <ul>
          <li>요청한 블록이 올바른지 확인</li>
          <li>블록이 5 이상의 에포크 전에 생성된 경우, <a href="https://near-nodes.io/intro/node-types#archival-node">아카이브 노드</a>로 요청을 보내세요.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>INVALID_ACCOUNT</td>
      <td>요청된 <code>account_id</code>가 잘못되었습니다.</td>
      <td>
        <ul>
          <li>유효한 <code>account_id</code>를 제공합니다.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>UNKNOWN_ACCOUNT</td>
      <td>계정이 생성되지 않았거나 이미 삭제되었기 때문에 요청된 <code>account_id</code>를 찾을 수 없습니다.</td>
      <td>
        <ul>
          <li><code>account_id</code>를 확인합니다.</li>
          <li>최신 상태를 요청하는 경우, 다른 블록을 지정하거나 다시 시도하세요.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>NO_CONTRACT_CODE</td>
      <td><code>contract</code> 계정에 배포된 항목이 없습니다.</td>
      <td>
        <ul>
          <li>배포된 컨트랙트로 계정을 쿼리하세요.</li>
          <li>최신 상태를 요청하는 경우 다른 블록을 지정하거나 다시 시도하세요.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>TOO_LARGE_CONTRACT_STATE</td>
      <td>요청한 컨트랙트 상태가 너무 커서 이 노드에서 반환할 수 없습니다(기본 제한은 상태 크기의 50kb입니다).</td>
      <td>
        <ul>
          <li>요청된 상태를 보려면 더 큰 제한이 있는 노드에 요청을 보냅니다.</li>
          <li>보기 상태에 대한 제한을 늘릴 수 있는 자체 노드를 가동합니다.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>UNAVAILABLE_SHARD</td>
      <td>노드가 데이터가 있는 샤드를 추적하지 않기 때문에 요청된 데이터를 찾을 수 없습니다.</td>
      <td>
        <ul>
          <li>샤드를 추적할 수 있는 다른 노드에 요청을 보냅니다.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>NO_SYNCED_BLOCKS</td>
      <td>노드가 여전히 동기화 중이고 요청된 블록이 아직 데이터베이스에 없습니다.</td>
      <td>
        <ul>
          <li>노드가 동기화를 마칠 때까지 기다리세요.</li>
          <li>동기화된 다른 노드에 요청을 보내세요.</li>
        </ul>
      </td>
    </tr>
    <tr class="stripe">
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

## 컨트랙트 상태 변경 보기 {#view-contract-state-changes}

> 키 접두사(base64로 인코딩됨)를 기반으로 컨트랙트의 상태 변경 세부 정보를 반환합니다. 모든 상태 변경 사항을 반환하려면 이 매개변수에 빈 문자열을 전달하세요.

- 메서드: `EXPERIMENTAL_changes`
- 매개변수:
  - `changes_type`: `data_changes`
  - `account_ids`: `["example.testnet"]`,
  - `key_prefix_base64`: `"base64 encoded key value"`,
  - [`finality`](/api/rpc/setup#using-finality-param) _OR_ [`block_id`](/api/rpc/setup#using-block_id-param)

예시:

<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "EXPERIMENTAL_changes",
  "params": {
    "changes_type": "data_changes",
    "account_ids": ["guest-book.testnet"],
    "key_prefix_base64": "",
    "block_id": 19450732
  }
}
```

</TabItem>
<TabItem value="🌐 JavaScript" label="JavaScript">

```js
const response = await near.connection.provider.experimental_changes({
  changes_type: "data_changes",
  account_ids: ["guest-book.testnet"],
  key_prefix_base64: "",
  block_id: 19450732,
});
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=EXPERIMENTAL_changes \
  params:='{
    "changes_type": "data_changes",
    "account_ids": ["guest-book.testnet"],
    "key_prefix_base64": "",
    "block_id": 19450732
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
    "block_hash": "6U8Yd4JFZwJUNfqkD4KaKgTKmpNSmVRTSggpjmsRWdKY",
    "changes": [
      {
        "cause": {
          "type": "receipt_processing",
          "receipt_hash": "9ewznXgs2t7vRCssxW4thgaiwggnMagKybZ7ryLNTT2z"
        },
        "type": "data_update",
        "change": {
          "account_id": "guest-book.testnet",
          "key_base64": "bTo6Mzk=",
          "value_base64": "eyJwcmVtaXVtIjpmYWxzZSwic2VuZGVyIjoiZmhyLnRlc3RuZXQiLCJ0ZXh0IjoiSGkifQ=="
        }
      },
      {
        "cause": {
          "type": "receipt_processing",
          "receipt_hash": "9ewznXgs2t7vRCssxW4thgaiwggnMagKybZ7ryLNTT2z"
        },
        "type": "data_update",
        "change": {
          "account_id": "guest-book.testnet",
          "key_base64": "bTpsZW4=",
          "value_base64": "NDA="
        }
      }
    ]
  },
  "id": "dontcare"
}
```

</p>
</details>

#### 무엇이 잘못될 수 있나요? {#what-could-go-wrong-4}

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

다음은 `EXPERIMENTAL_changes` 메서드에 의해 반환될 수 있는 오류 변형의 전체 목록입니다.

<table class="custom-stripe">
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
          <li>요청한 블록이 올바른지 확인합니다.</li>
          <li>블록이 5이상의 에포크 전에 생성된 경우, <a href="https://near-nodes.io/intro/node-types#archival-node">아카이브 노드로</a> 요청을 보내세요.</li>
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
    <tr class="stripe">
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

## 컨트랙트 코드 변화 보기 {#view-contract-code-changes}

> 컨트랙트를 배포할 때 변경된 코드를 반환합니다. 반환되는 변경 사항은 base64로 인코딩된 WASM 파일입니다.

- 메서드: `EXPERIMENTAL_changes`
- 매개변수:
  - `changes_type`: `contract_code_changes`
  - `account_ids`: `["example.testnet"]`,
  - [`finality`](/api/rpc/setup#using-finality-param) _OR_ [`block_id`](/api/rpc/setup#using-block_id-param)

예시:

<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "EXPERIMENTAL_changes",
  "params": {
    "changes_type": "contract_code_changes",
    "account_ids": ["dev-1602714453032-7566969"],
    "block_id": 20046655
  }
}
```

</TabItem>
<TabItem value="🌐 JavaScript" label="JavaScript">

```js
const response = await near.connection.provider.experimental_changes({
  changes_type: "contract_code_changes",
  account_ids: ["dev-1602714453032-7566969"],
  block_id: 20046655,
});
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=EXPERIMENTAL_changes \
  params:='{
    "changes_type": "contract_code_changes",
    "account_ids": ["dev-1602714453032-7566969"],
    "block_id": 20046655
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
    "block_hash": "3yLNV5zdpzRJ8HP5xTXcF7jdFxuHnmKNUwWcok4616WZ",
    "changes": [
      {
        "cause": {
          "type": "receipt_processing",
          "receipt_hash": "CEm3NNaNdu9cijh9NvZMM1srbtEYSsBVwGbZxFQYKt5B"
        },
        "type": "contract_code_update",
        "change": {
          "account_id": "dev-1602714453032-7566969",
          "code_base64": "AGFzbQEAAAABpAM3YAF/AGAAAX9gAn9+AGADf35+AGAEf35+fgF+YAZ/fn5+fn4BfmADf35+AX5gAn9+AX5gAn9/AX9gAn9/AGADf39/AX9gAX8BfmACfn4AYAF+AX5gAX4AYAABfmADfn5+AGAAAGAIfn5+fn5+fn4BfmAJfn5+fn5+fn5+AX5gAn5+AX5gA35+fgF+YAd+fn5+fn5+AGAEfn5+fgBgCX5+fn5+fn5+fgBgBX5+fn5+AX5gA39/fwBgAX8Bf2ACf3wAYAR/f39+AGAFf39/fn8AYAV/f39/fwBgBH9/f38AYAN/f38BfmADf39+AGACf38BfmAFf39/f38Bf2AEf39/fwF/YAZ/f39/f38AYAV/f35/fwBgBH9+f38Bf2ACf34Bf2AHf35+f39+fwBgBX9/f39+AGAEf35+fgBgCX9+fn5+fn5+fgF+YAp/fn5+fn5+fn5+AX5gCH9+fn5+fn5+AGAFf35+fn4AYAp/fn5+fn5+fn5+AGAHf39/f39/fwBgBH98f38Bf2AGf39/f39..."
        }
      }
    ]
  },
  "id": "dontcare"
}
```

</p>
</details>

#### 무엇이 잘못될 수 있나요? {#what-could-go-wrong-5}

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

다음은 `EXPERIMENTAL_changes` 메서드에 의해 반환될 수 있는 오류 변형의 전체 목록입니다.

<table class="custom-stripe">
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
          <li>요청한 블록이 올바른지 확인합니다.</li>
          <li>블록이 5이상의 에포크 전에 생성된 경우, <a href="https://near-nodes.io/intro/node-types#archival-node">아카이브 노드로</a> 요청을 보내세요.</li>
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
    <tr class="stripe">
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

## 컨트랙트 함수 호출 {#call-a-contract-function}
> 컨트랙트 메서드를 [view 함수](../../4.tools/cli.md#near-view-near-view)로 호출할 수 있습니다.

- 메서드: `query`
- 매개변수:
  - `request_type`: `call_function`
  - [`finality`](/api/rpc/setup#using-finality-param) _OR_ [`block_id`](/api/rpc/setup#using-block_id-param)
  - `account_id`: _`"example.testnet"`_
  - `method_name`: `name_of_a_example.testnet_method` (예시: [`view` methods](https://github.com/near/core-contracts/blob/master/staking-pool/src/lib.rs#L317))
  - `args_base64`: `method_arguments_base_64_encoded`

예시 (`get_num`):

<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "query",
  "params": {
    "request_type": "call_function",
    "finality": "final",
    "account_id": "dev-1588039999690",
    "method_name": "get_num",
    "args_base64": "e30="
  }
}
```

</TabItem>
<TabItem value="🌐 JavaScript" label="JavaScript">

```js
const response = await near.connection.provider.query({
  request_type: "call_function",
  finality: "final",
  account_id: "dev-1588039999690",
  method_name: "get_num",
  args_base64: "e30=",
});
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=query \
  params:='{
    "request_type": "call_function",
    "finality": "final",
    "account_id": "dev-1588039999690",
    "method_name": "get_num",
    "args_base64": "e30="
  }'
```

</TabItem>
</Tabs>

예시 (`get_account_staked_balance`):

이 예에서 `args_base64`는 `{"account_id":"dev-1588039999690"}`로 디코딩됩니다.  이 특정 view 함수에 대해 `account_id`는 동일한 계정이 아니라 밸리데이터일 가능성이 높습니다.

<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "query",
  "params": {
    "request_type": "call_function",
    "finality": "final",
    "account_id": "dev-1588039999690",
    "method_name": "get_account_staked_balance",
    "args_base64": "eyJhY2NvdW50X2lkIjoiZGV2LTE1ODgwMzk5OTk2OTAifQ=="
  }
}
```

</TabItem>
<TabItem value="🌐 JavaScript" label="JavaScript">

```js
const response = await near.connection.provider.query({
  request_type: "call_function",
  finality: "final",
  account_id: "dev-1588039999690",
  method_name: "get_account_staked_balance",
  args_base64: "eyJhY2NvdW50X2lkIjoiZGV2LTE1ODgwMzk5OTk2OTAifQ==",
});
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=query \
  params:='{
    "request_type": "call_function",
    "finality": "final",
    "account_id": "dev-1588039999690",
    "method_name": "get_account_staked_balance",
    "args_base64": "eyJhY2NvdW50X2lkIjoiZGV2LTE1ODgwMzk5OTk2OTAifQ=="
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
    "result": [48],
    "logs": [],
    "block_height": 17817336,
    "block_hash": "4qkA4sUUG8opjH5Q9bL5mWJTnfR4ech879Db1BZXbx6P"
  },
  "id": "dontcare"
}
```

**참고**: `[48]`은 바이트 배열이며, 구체적으로는 ASCII 코드 `0`입니다. `near-sdk-rs`와 `near-sdk-js`는 JSON 직렬화된 결과를 반환합니다.

</p>
</details>

#### 무엇이 잘못될 수 있나요? {#what-could-go-wrong-6}

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

다음은 `call_function` 요청 자료형에 의해 반환될 수 있는 오류 변형의 전체 목록입니다.

<table class="custom-stripe">
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
      <td rowspan="7">HANDLER_ERROR</td>
      <td>UNKNOWN_BLOCK</td>
      <td>요청된 블록이 아직 생성되지 않았거나 가비지 수집되었습니다(RPC 노드의 공간을 절약하기 위해 정리됨).</td>
      <td>
        <ul>
          <li>요청한 블록이 올바른지 확인</li>
          <li>블록이 5 이상의 에포크 전에 생성된 경우, <a href="https://near-nodes.io/intro/node-types#archival-node">아카이브 노드</a>로 요청을 보내세요.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>INVALID_ACCOUNT</td>
      <td>요청된 <code>account_id</code>가 잘못되었습니다.</td>
      <td>
        <ul>
          <li>유효한 <code>account_id</code>를 제공합니다.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>UNKNOWN_ACCOUNT</td>
      <td>계정이 생성되지 않았거나 이미 삭제되었기 때문에 요청된 <code>account_id</code>를 찾을 수 없습니다.</td>
      <td>
        <ul>
          <li><code>account_id</code>를 확인합니다.</li>
          <li>최신 상태를 요청하는 경우, 다른 블록을 지정하거나 다시 시도하세요.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>NO_CONTRACT_CODE</td>
      <td><code>contract</code> 계정에 배포된 항목이 없습니다.</td>
      <td>
        <ul>
          <li><code>public_key</code>를 확인합니다.</li>
          <li>최신 상태를 요청하는 경우 다른 블록을 지정하거나 다시 시도하세요.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>CONTRACT_EXECUTION_ERROR</td>
      <td>View 메서드 호출 실행을 실패했습니다(충돌, 기본 200 TGas 제한 초과 등).</td>
      <td>
        <ul>
          <li><code>error.cause.info</code>에서 자세한 내용을 확인하세요.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>UNAVAILABLE_SHARD</td>
      <td>노드가 데이터가 있는 샤드를 추적하지 않기 때문에 요청된 데이터를 찾을 수 없습니다.</td>
      <td>
        <ul>
          <li>샤드를 추적할 수 있는 다른 노드에 요청을 보냅니다.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>NO_SYNCED_BLOCKS</td>
      <td>노드가 여전히 동기화 중이고 요청된 블록이 아직 데이터베이스에 없습니다.</td>
      <td>
        <ul>
          <li>노드가 동기화를 마칠 때까지 기다리세요.</li>
          <li>동기화된 다른 노드에 요청을 보내세요.</li>
        </ul>
      </td>
    </tr>
    <tr class="stripe">
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
