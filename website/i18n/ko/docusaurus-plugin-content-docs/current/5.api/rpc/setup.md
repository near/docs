---
id: setup
title: 설정
---

RPC API를 사용하려면 올바른 RPC 엔드포인트를 설정해야 합니다.

<hr class="subsection" />

## RPC 엔드포인트 설정
- `POST` (모든 메서드에 대해)
- `JSON RPC 2.0`
- `id: "dontcare"`
- 엔드포인트 URL은 네트워크에 따라 다릅니다.
  - mainnet `https://rpc.mainnet.near.org`
  - testnet `https://rpc.testnet.near.org`
  - betanet `https://rpc.betanet.near.org` _(불안정할 수 있음)_
  - localnet `http://localhost:3030`

### 한도
- IP당 최대 요청 수: 600 req/min

<hr class="subsection" />

## 과거 데이터 쿼리
이전 데이터(5 [에포크](../../1.concepts/basics/epoch.md) 또는 ~2.5일보다 오래된)를 쿼리하면 데이터를 더 이상 사용할 수 없다는 응답을 받을 수 있습니다. 이 경우 아카이브 RPC 노드가 해결책이 될 수 있습니다.

- mainnet `https://archival-rpc.mainnet.near.org`
- testnet `https://archival-rpc.testnet.near.org`

[여기](https://github.com/near/nearcore/blob/bf9ae4ce8c680d3408db1935ebd0ca24c4960884/chain/jsonrpc/client/src/lib.rs#L181)에서, `nearcore`에 정의된 이 인터페이스를 볼 수 있습니다.

### 한도
- IP당 최대 요청 수: 600 req/min

---

## Postman 설정 {#postman-setup}

이 문서 페이지에서 쿼리를 테스트하는 쉬운 방법은 [Postman](https://www.postman.com/)과 같은 API 요청 도구를 사용하는 것입니다. 다음 두 가지만 구성하면 됩니다.

1. 키로는 `Content-Type`, 값으로는 `application/json` 가진 헤더를 추가해야 합니다. ![postman-setup-header](/docs/assets/postman-setup-headers.png)

2. 그런 다음 `Body` 탭을 선택하고, `raw` 라디오 버튼을 선택합니다. `JSON`이 선택한 형식인지 확인합니다. ![postman-setup-header](/docs/assets/postman-setup-body.png)

설정한 후, Postman 요청의 `body` 아래 `JSON object` 예제 스니펫을 복사/붙여넣기하고, `send`을 클릭하세요.

---
## JavaScript 설정 {#javascript-setup}

이 문서 페이지에 나열된 모든 쿼리는 [`near-api-js`](https://github.com/near/near-api-js)를 사용하여 호출할 수 있습니다.

- `near-api-js` 설치 및 설정에 대해서는 [빠른 참조 문서](/tools/near-api-js/quick-reference)를 참조하세요.
- 모든 JavaScript 코드 스니펫에는 `near` 객체가 필요합니다. 인스턴스화 방법에 대한 예를 보려면 [여기](/tools/near-api-js/quick-reference#connect)를 클릭하세요.

---
## HTTPie 설정 {#httpie-setup}

명령줄 인터페이스 사용을 선호하는 경우, [HTTPie](https://httpie.org/)와 함께 사용할 수 있는 RPC 예제를 제공했습니다. 매개변수로는 객체 또는 문자열로 전달된 배열을 사용합니다.

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=network_info params:='[]'
```

---

## 매개변수 `block_id` 사용 {#using-block_id-param}

`block_id` 매개변수는 블록 번호(예: `27912554`) 또는 블록 해시(예: `'3Xz2wM9rigMXzA2c5vgCP8wTgFBaePucgUmVYPkMqhRL'`)를 인자로 사용할 수 있습니다.

:::caution
<a href="https://explorer.testnet.near.org">NEAR 익스플로러</a>에 표시되는 트랜잭션의 블록 ID가 반드시 실행된 트랜잭션의 블록 ID는 아닙니다. 트랜잭션은 기록된 후 한두 블록을 실행할 수 있으며, 경우에 따라 여러 블록에 걸쳐 발생할 수 있습니다. 이로 인해 쿼리된 트랜잭션과 관련된 모든 결과가 발견되었는지 확인하기 위해 후속 블록을 확인하는 것이 중요합니다.
:::

---

## `finality` 매개변수 사용 {#using-finality-param}

`finality` 매개변수에는 두 가지 옵션이 있습니다: `optimistic`과 `final`.
1. `optimistic` uses the latest block recorded on the node that responded to your query _(< 1 second delay after the transaction is submitted)_
2. `final`는 네트워크 노드의 최소 66%에서 검증된 블록용입니다 _(보통 2블록 소요/약 2초 지연)_.
