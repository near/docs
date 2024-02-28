---
id: access-keys
title: 액세스 키
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

RPC API를 사용하면 계정의 액세스 키에 대한 정보를 검색할 수 있습니다.

---

## 액세스 키 보기 {#view-access-key}

주어진 계정에 대한 단일 액세스 키에 대한 정보를 반환합니다.

키의 `permission`이 `FunctionCall`인 경우, `allowance`, `receiver_id`, 및 `method_names` 같은 자세한 정보를 반환합니다.

- 메서드: `query`
- 매개변수:
  - `request_type`: `view_access_key`
  - [`finality`](/api/rpc/setup#using-finality-param) _또는_ [`block_id`](/api/rpc/setup#using-block_id-param)
  - `account_id`: _`"example.testnet"`_
  - `public_key`: _`"example.testnet's public key"`_


<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "query",
  "params": {
    "request_type": "view_access_key",
    "finality": "final",
    "account_id": "client.chainlink.testnet",
    "public_key": "ed25519:H9k5eiU4xXS3M4z8HzKJSLaZdqGdGwBG49o7orNC4eZW"
  }
}
```

</TabItem>
<TabItem value="🌐 JavaScript" label="JavaScript">


```js
const response = await near.connection.provider.query({
  request_type: "view_access_key",
  finality: "final",
  account_id: "client.chainlink.testnet",
  public_key: "ed25519:H9k5eiU4xXS3M4z8HzKJSLaZdqGdGwBG49o7orNC4eZW",
});
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=query \
  params:='{
    "request_type": "view_access_key",
    "finality": "final",
    "account_id": "client.chainlink.testnet",
    "public_key": "ed25519:H9k5eiU4xXS3M4z8HzKJSLaZdqGdGwBG49o7orNC4eZW"
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
    "nonce": 85,
    "permission": {
      "FunctionCall": {
        "allowance": "18501534631167209000000000",
        "receiver_id": "client.chainlink.testnet",
        "method_names": ["get_token_price"]
      }
    },
    "block_height": 19884918,
    "block_hash": "GGJQ8yjmo7aEoj8ZpAhGehnq9BSWFx4xswHYzDwwAP2n"
  },
  "id": "dontcare"
}
```

</p>
</details>

#### 무엇이 잘못될 수 있을까요?

API 요청이 실패하면 RPC 서버는 제한된 수의 잘 정의된 오류 변형과 함께 구조화된 오류 응답을 반환하므로 클라이언트 코드는 가능한 모든 오류 사례를 철저하게 처리할 수 있습니다. JSON-RPC 오류는 오류 응답을 구조화하기 위해 [verror](https://github.com/joyent/node-verror) 규칙을 따릅니다.


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

다음은 `view_access_key` 요청 자료형에 의해 반환될 수 있는 오류 변형의 전체 목록입니다.

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
      <td rowspan="6">HANDLER_ERROR</td>
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
      <td>UNKNOWN_ACCESS_KEY</td>
      <td>공개 키가 생성되지 않았거나 이미 삭제되었기 때문에 요청된 <code>public_key</code>를 찾을 수 없습니다.</td>
      <td>
        <ul>
          <li><code>public_key</code>를 확인합니다.</li>
          <li>최신 상태를 요청하는 경우, 다른 블록을 지정하거나 다시 시도하세요.</li>
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
    <tr className="stripe">
      <td>REQUEST_VALIDATION_ERROR</td>
      <td>PARSE_ERROR</td>
      <td>전달된 인수는 JSON RPC 서버에서 파싱할 수 없습니다(인자 누락, 잘못된 형식 등).</td>
      <td>
        <ul>
          <li>전달된 인수를 확인하고 올바른 인수를 전달하세요.</li>
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

## 액세스 키 목록 보기 {#view-access-key-list}

지정된 계정에 대한 **모든** 액세스 키를 쿼리할 수 있습니다.

- 메서드: `query`
- 매개변수:
  - `request_type`: `view_access_key_list`
  - [`finality`](/api/rpc/setup#using-finality-param) _또는_ [`block_id`](/api/rpc/setup#using-block_id-param)
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
    "request_type": "view_access_key_list",
    "finality": "final",
    "account_id": "example.testnet"
  }
}
```

</TabItem>
<TabItem value="🌐 JavaScript" label="JavaScript">

```js
const response = await near.connection.provider.query({
  request_type: "view_access_key_list",
  finality: "final",
  account_id: "example.testnet",
});
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=query \
  params:='{
    "request_type": "view_access_key_list",
    "finality": "final",
    "account_id": "example.testnet"
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
    "keys": [
      {
        "public_key": "ed25519:2j6qujbkPFuTstQLLTxKZUw63D5Wu3SG79Gop5JQrNJY",
        "access_key": {
          "nonce": 17,
          "permission": {
            "FunctionCall": {
              "allowance": "9999203942481156415000",
              "receiver_id": "place.meta",
              "method_names": []
            }
          }
        }
      },
      {
        "public_key": "ed25519:46etzhzZHN4NSQ8JEQtbHCX7sT8WByS3vmSEb3fbmSgf",
        "access_key": {
          "nonce": 2,
          "permission": {
            "FunctionCall": {
              "allowance": "9999930655034196535000",
              "receiver_id": "dev-1596616186817-8588944",
              "method_names": []
            }
          }
        }
      },
      {
        "public_key": "ed25519:4F9TwuSqWwvoyu7JVZDsupPhC7oYbYNsisBV2yQvyXFn",
        "access_key": {
          "nonce": 0,
          "permission": "FullAccess"
        }
      },
      {
        "public_key": "ed25519:4bZqp6nm1btr92UfKbyADDzJ4oPK9JetHXqEYqbYZmkD",
        "access_key": {
          "nonce": 2,
          "permission": "FullAccess"
        }
      },
      {
        "public_key": "ed25519:6ZPzX7hS37jiU9dRxbV1Waf8HSyKKFypJbrnZXzNhqjs",
        "access_key": {
          "nonce": 2,
          "permission": {
            "FunctionCall": {
              "allowance": "9999922083697042955000",
              "receiver_id": "example.testnet",
              "method_names": []
            }
          }
        }
      },
      {
        "public_key": "ed25519:81RKfuo7mBbsaviTmBsq18t6Eq4YLnSi3ye2CBLcKFUX",
        "access_key": {
          "nonce": 8,
          "permission": "FullAccess"
        }
      },
      {
        "public_key": "ed25519:B4W1oAYTcG8GxwKev8jQtsYWkGwGdqP24W7eZ6Fmpyzc",
        "access_key": {
          "nonce": 0,
          "permission": {
            "FunctionCall": {
              "allowance": "10000000000000000000000",
              "receiver_id": "dev-1594144238344",
              "method_names": []
            }
          }
        }
      },
      {
        "public_key": "ed25519:BA3AZbACoEzAsxKeToFd36AVpPXFSNhSMW2R6UYeGRwM",
        "access_key": {
          "nonce": 0,
          "permission": {
            "FunctionCall": {
              "allowance": "10000000000000000000000",
              "receiver_id": "new-corgis",
              "method_names": []
            }
          }
        }
      },
      {
        "public_key": "ed25519:BRyHUGAJjRKVTc9ZqXTTSJnFmSca8WLj8TuVe1wXK3LZ",
        "access_key": {
          "nonce": 17,
          "permission": "FullAccess"
        }
      },
      {
        "public_key": "ed25519:DjytaZ1HZ5ZFmH3YeJeMCiC886K1XPYeGsbz2E1AZj2J",
        "access_key": {
          "nonce": 31,
          "permission": "FullAccess"
        }
      },
      {
        "public_key": "ed25519:DqJn5UCq6vdNAvfhnbpdAeuui9a6Hv9DKYDxeRACPUDP",
        "access_key": {
          "nonce": 0,
          "permission": "FullAccess"
        }
      },
      {
        "public_key": "ed25519:FFxG8x6cDDyiErFtRsdw4dBNtCmCtap4tMTjuq3umvSq",
        "access_key": {
          "nonce": 0,
          "permission": "FullAccess"
        }
      }
    ],
    "block_height": 17798231,
    "block_hash": "Gm7YSdx22wPuciW1jTTeRGP9mFqmon69ErFQvgcFyEEB"
  },
  "id": "dontcare"
}
```

</p>
</details>

#### 무엇이 잘못될 수 있나요?

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

다음은 `view_access_key_list` 요청 자료형에 의해 반환될 수 있는 오류 변형의 전체 목록입니다.

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
      <td rowspan="5">HANDLER_ERROR</td>
      <td>UNKNOWN_BLOCK</td>
      <td>요청된 블록이 아직 생성되지 않았거나 가비지 수집되었습니다(RPC 노드의 공간을 절약하기 위해 정리됨).</td>
      <td>
        <ul>
          <li>요청한 블록이 올바른지 확인합니다.</li>
          <li>블록이 5이상의 에포크 전에 생성된 경우, <a href="https://near-nodes.io/intro/node-types#archival-node">아카이브 노드</a>로 요청을 보내세요.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>INVALID_ACCOUNT</td>
      <td>요청한 <code>account_id</code>가 잘못되었습니다.</td>
      <td>
        <ul>
          <li>유효한 <code>account_id</code>룰 제공하세요.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>UNKNOWN_ACCOUNT</td>
      <td>계정이 생성되지 않았거나 이미 삭제되었기 때문에, 요청한 <code>account_id</code>를 찾을 수 없습니다.</td>
      <td>
        <ul>
          <li><code>account_id</code>를 확인해보세요.</li>
          <li>최신 상태를 요청하는 경우 다른 블록을 지정하거나 다시 시도하세요.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>UNAVAILABLE_SHARD</td>
      <td>노드가 데이터가 있는 샤드를 추적하지 않기 때문에 요청된 데이터를 찾을 수 없습니다.</td>
      <td>
        <ul>
          <li>샤드를 추적할 수 있는 다른 노드에 요청을 보내세요.</li>
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
    <tr className="stripe">
      <td>REQUEST_VALIDATION_ERROR</td>
      <td>PARSE_ERROR</td>
      <td>전달된 인수는 JSON RPC 서버에서 파싱할 수 없습니다(인자 누락, 잘못된 형식 등).</td>
      <td>
        <ul>
          <li>전달된 인수를 확인하고 올바른 인수를 전달하세요.</li>
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

## 액세스 키 변경 사항 보기 (단일) {#view-access-key-changes-single}

특정 블록의 개별 액세스 키 변경 사항을 반환합니다. `account_id`와 `public_key`를 포함하는 객체 배열을 전달하여 여러 키를 쿼리할 수 있습니다.

- 메서드: `EXPERIMENTAL_changes`
- 매개변수:
  - `changes_type`: `single_access_key_changes`
  - `keys`: `[{ account_id, public_key }]`
  - [`finality`](/api/rpc/setup#using-finality-param) _또는_ [`block_id`](/api/rpc/setup#using-block_id-param)

예시:

<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "EXPERIMENTAL_changes",
  "params": {
    "changes_type": "single_access_key_changes",
    "keys": [
      {
        "account_id": "example-acct.testnet",
        "public_key": "ed25519:25KEc7t7MQohAJ4EDThd2vkksKkwangnuJFzcoiXj9oM"
      }
    ],
    "finality": "final"
  }
}
```

</TabItem>
<TabItem value="🌐 JavaScript" label="JavaScript">

```js
const response = await near.connection.provider.experimental_changes({
  changes_type: "single_access_key_changes",
  keys: [
    {
      account_id: "example-acct.testnet",
      public_key: "ed25519:25KEc7t7MQohAJ4EDThd2vkksKkwangnuJFzcoiXj9oM",
    },
  ],
  finality: "final",
});
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=EXPERIMENTAL_changes \
  params:='{
    "changes_type": "single_access_key_changes",
    "keys": [
      {
        "account_id": "example-acct.testnet",
        "public_key": "ed25519:25KEc7t7MQohAJ4EDThd2vkksKkwangnuJFzcoiXj9oM"
      }
    ],
    "finality": "final"
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
    "block_hash": "4kvqE1PsA6ic1LG7S5SqymSEhvjqGqumKjAxnVdNN3ZH",
    "changes": [
      {
        "cause": {
          "type": "transaction_processing",
          "tx_hash": "HshPyqddLxsganFxHHeH9LtkGekXDCuAt6axVgJLboXV"
        },
        "type": "access_key_update",
        "change": {
          "account_id": "example-acct.testnet",
          "public_key": "ed25519:25KEc7t7MQohAJ4EDThd2vkksKkwangnuJFzcoiXj9oM",
          "access_key": {
            "nonce": 1,
            "permission": "FullAccess"
          }
        }
      }
    ]
  },
  "id": "dontcare"
}
```

</p>
</details>

#### 무엇이 잘못될 수 있나요?{#what-could-go-wrong-2}

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
          <li>블록이 5이상의 에포크 전에 생성된 경우, <a href="https://near-nodes.io/intro/node-types#archival-node">아카이브 노드</a>로 요청을 보내십시오.</li>
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

## 액세스 키 변경 사항 보기 (모두) {#view-access-key-changes-all}

특정 블록의 **모든** 액세스 키 에 대한 변경 사항을 반환합니다. `account_ids`의 배열을 전달하여 여러 계정을 쿼리할 수 있습니다.

- 메서드: `EXPERIMENTAL_changes`
- 매개변수:
  - `changes_type`: `all_access_key_changes`
  - `account_ids`: `[ "example.testnet", "example2.testnet"]`
  - [`finality`](/api/rpc/setup#using-finality-param) _또는_ [`block_id`](/api/rpc/setup#using-block_id-param)

예시:

<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "EXPERIMENTAL_changes",
  "params": {
    "changes_type": "all_access_key_changes",
    "account_ids": ["example-acct.testnet"],
    "block_id": "4kvqE1PsA6ic1LG7S5SqymSEhvjqGqumKjAxnVdNN3ZH"
  }
}
```

</TabItem>
<TabItem value="🌐 JavaScript" label="JavaScript">

```js
const response = await near.connection.provider.experimental_changes({
  changes_type: "all_access_key_changes",
  account_ids: "example-acct.testnet",
  finality: "final",
});
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=EXPERIMENTAL_changes \
  params:='{
    "changes_type": "all_access_key_changes",
    "account_ids": ["example-acct.testnet"],
    "block_id": "4kvqE1PsA6ic1LG7S5SqymSEhvjqGqumKjAxnVdNN3ZH"
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
    "block_hash": "4kvqE1PsA6ic1LG7S5SqymSEhvjqGqumKjAxnVdNN3ZH",
    "changes": [
      {
        "cause": {
          "type": "transaction_processing",
          "tx_hash": "HshPyqddLxsganFxHHeH9LtkGekXDCuAt6axVgJLboXV"
        },
        "type": "access_key_update",
        "change": {
          "account_id": "example-acct.testnet",
          "public_key": "ed25519:25KEc7t7MQohAJ4EDThd2vkksKkwangnuJFzcoiXj9oM",
          "access_key": {
            "nonce": 1,
            "permission": "FullAccess"
          }
        }
      },
      {
        "cause": {
          "type": "receipt_processing",
          "receipt_hash": "CetXstu7bdqyUyweRqpY9op5U1Kqzd8pq8T1kqfcgBv2"
        },
        "type": "access_key_update",
        "change": {
          "account_id": "example-acct.testnet",
          "public_key": "ed25519:96pj2aVJH9njmAxakjvUMnNvdB3YUeSAMjbz9aRNU6XY",
          "access_key": {
            "nonce": 0,
            "permission": "FullAccess"
          }
        }
      }
    ]
  },
  "id": "dontcare"
}
```

</p>
</details>

#### 무엇이 잘못될 수 있나요?{#what-could-go-wrong-3}

API 요청이 실패하면, RPC 서버는 제한된 수의 잘 정의된 오류 변형과 함께 구조화된 오류 응답을 반환하므로, 클라이언트 코드는 가능한 모든 오류 사례를 철저하게 처리할 수 있습니다. JSON-RPC 오류는 오류 응답을 구조화하기 위해 [verror](https://github.com/joyent/node-verror) 규칙을 따릅니다.


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
          <li>블록이 5 이상의 에포크 전에 생성된 경우 <a href="https://near-nodes.io/intro/node-types#archival-node">아카이브 노드</a>로 요청을 보내십시오.</li>
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
