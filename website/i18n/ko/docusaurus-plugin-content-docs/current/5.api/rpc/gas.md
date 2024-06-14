---
id: gas
title: 가스
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

RPC API를 통해 특정 블록 또는 해시에 대한 가스 가격을 쿼리할 수 있습니다.

---

## 가스 가격 {#gas-price}

> 특정 `block_height` 또는 `block_hash`에 대한 가스 가격을 반환합니다.
> 
> - `[null]`을 사용하면 가장 최근 블록의 가스 가격이 반환됩니다.

- 메서드: `gas_price`
- 매개변수: `[block_height]`, `["block_hash"]`, 또는 `[null]`

`[block_height]`

<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "gas_price",
  "params": [17824600]
}
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js
const response = await near.connection.provider.gasPrice(17824600);
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 method=gas_price params:='[17824600]' id=dontcare
```

</TabItem>
</Tabs>

`["block_hash"]`

<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "gas_price",
  "params": ["AXa8CHDQSA8RdFCt12rtpFraVq4fDUgJbLPxwbaZcZrj"]
}
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js
const response = await near.connection.provider.gasPrice(
  "AXa8CHDQSA8RdFCt12rtpFraVq4fDUgJbLPxwbaZcZrj"
);
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 method=gas_price params:='["AXa8CHDQSA8RdFCt12rtpFraVq4fDUgJbLPxwbaZcZrj"]' id=dontcare
```

</TabItem>
</Tabs>

`[null]`

<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "gas_price",
  "params": [null]
}
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js
const response = await near.connection.provider.gasPrice(null);
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 method=gas_price params:='[null]' id=dontcare
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
    "gas_price": "100000000"
  },
  "id": "dontcare"
}
```

</p>
</details>

#### 무엇이 잘못될 수 있나요? {#what-could-go-wrong}

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

다음은 `gas_price` 메서드에 의해 반환될 수 있는 오류 변형의 전체 목록입니다.

<table>
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
      <td>HANDLER_ERROR</td>
      <td>UNKNOWN_BLOCK</td>
      <td>요청된 블록이 아직 생성되지 않았거나 가비지 수집되었습니다(RPC 노드의 공간을 절약하기 위해 정리됨).</td>
      <td>
        <ul>
          <li>요청한 블록이 올바른지 확인하세요.</li>
          <li>블록이 5 이상의 에포크 전에 생성된 경우 <a href="https://near-nodes.io/intro/node-types#archival-node">아카이브 노드</a>로 요청을 보내세요.</li>
        </ul>
      </td>
    </tr>
    <tr>
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
