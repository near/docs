---
id: maintenance-windows
title: 유지 관리 기간(Maintenance Window)
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

RPC API를 사용하면 현재 에포크의 특정 밸리데이터에 대한 향후 유지 관리 기간을 쿼리할 수 있습니다.

---

## 유지 관리 기간(Maintenance Window) {#maintenance-windows}

> 특정 밸리데이터의 유지 관리 기간은 현재 에포크의 미래 블록 높이 범위이며, 이 기간 동안 밸리데이터는 블록 또는 청크를 생성할 필요가 없습니다. 제공된 계정이 밸리데이터가 아닌 경우, 지금부터 에포크 끝까지의 범위를 반환합니다.


- 메서드: `EXPERIMENTAL_maintenance_windows`
- 매개변수:
  - `account_id`


예시:


<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "EXPERIMENTAL_maintenance_windows",
  "params": {
    "account_id": "node0"
  }
}
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=EXPERIMENTAL_maintenance_windows \
  params:='{
    "account_id": "node0"
  }'
```

</TabItem>
</Tabs>

<details>
<summary>응답 예시:</summary>
<p>
결과는 현재 에포크의 향후 유지 관리 기간 목록입니다.
예를 들어 기간 `[1028, 1031]`에는 1028, 1029 및 1030이 포함됩니다.

```json
{
    "jsonrpc": "2.0",
    "result": [
        [
            1028,
            1031
        ],
        [
            1034,
            1038
        ],
    ],
    "id": "dontcare"
}
```

</p>
</details>

#### 무엇이 잘못될 수 있나요?? {#what-could-go-wrong}

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

다음은 `maintenance_windows` 메서드에서 반환할 수 있는 오류 변형의 전체 목록입니다.

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
      <td>INTERNAL_ERROR</td>
      <td>INTERNAL_ERROR</td>
      <td>노드 자체에 문제가 있거나 과부하가 걸렸습니다.</td>
      <td>
        <ul>
          <li>나중에 다시 시도하세요</li>
          <li>다른 노드에 요청을 보내세요</li>
          <li>자세한 내용은 <code>error.cause.info</code>를 확인하세요</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>
