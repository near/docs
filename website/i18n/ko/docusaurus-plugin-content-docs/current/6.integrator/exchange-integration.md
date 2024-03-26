---
id: exchange-integration
title: 거래 통합
sidebar_label: 거래 통합
---

## 통합 레퍼런스 {#integration-reference}

- [잔고 변경](/integrator/balance-changes)
- [계정](/integrator/accounts)
- [대체 가능한 토큰 (Fungible Token)](/integrator/fungible-tokens)
- [암시적 계정(Implicit Account)](/integrator/implicit-accounts)

### 트랜잭션 레퍼런스 링크 {#transaction-reference-links}

 - [기초](/concepts/protocol/transactions)
 - [사양](https://nomicon.io/RuntimeSpec/Transactions)
 - [트랜잭션 구성](/integrator/create-transactions)

## 블록 및 완결성 {#blocks-and-finality}

블록 및 완결성에 관한 몇 가지 중요한 정보는 다음과 같습니다.

- 예상 블록 생성 시간은 약 1초이고, 예상 완결 시간은 약 2초입니다. 블록 쿼리에서 `{"finality": "final"}`를 지정하여 마지막 최종 블록을 쿼리할 수 있습니다. 예를 들어, 메인넷에서 최신 최종 블록을 얻으려면 다음을 실행할 수 있습니다.

```bash
http post https://rpc.mainnet.near.org method=block params:='{"finality":"final"}' id=123 jsonrpc=2.0
```

- 블록 높이는 반드시 연속적인 것은 아니며, 예를 들어 해당 높이의 블록 생산자가 오프라인인 경우 특정 높이를 건너뛸 수 있습니다. 예를 들어 높이 100의 블록이 생성된 후 높이 101의 블록을 건너뛸 수 있습니다. 높이 102의 블록이 생성되면, 이전 블록은 높이 100의 블록입니다.

- 예를 들어 이전 청크 생성자가 오프라인인 경우 일부 블록에는 새 청크가 포함되지 않을 수 있습니다. RPC 반환 결과에서 모든 블록에는 비어 있지 않은 `chunks` 필드가 있지만, 이는 항상 블록에 포함된 새 청크가 있음을 의미하지는 않습니다. 청크가 블록에 포함되어 있는지 여부를 확인하는 방법은 청크 내 `height_included`가 블록의 높이와 동일한지 확인하는 것입니다.

## 아카이브 노드 구동 {#running-an-archival-node}
`config.json` 내 [아카이브 노드 실행](https://near-nodes.io/archival/run-archival-node-with-nearup) 문서를 참조하여, 아카이브 노드에 필요한 구성 변경 사항을 참고하세요.

## 스테이킹 및 위임 {#staking-and-delegation}

- [https://github.com/nearprotocol/stakewars](https://github.com/nearprotocol/stakewars)
- [https://github.com/near/core-contracts](https://github.com/near/core-contracts)

:::tip 질문이 있으신가요?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol"> Ask it on StackOverflow! </a>
:::
