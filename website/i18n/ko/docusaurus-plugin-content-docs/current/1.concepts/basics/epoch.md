---
id: epoch
title: 에포크
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


**에포크**는 네트워크의 밸리데이터가 일정하게 유지하는 시간 단위입니다. 이는 블록 단위로 측정됩니다.

- `testnet`과 `mainnet` 둘 다 43,200 블록의 에포크 기간을 갖습니다. 이상적으로는 블록이 1초마다 생성되기 때문에, 에포크는 약 12시간 동안 지속됩니다(실제로 생성하는 데 약간 더 오래 걸림).
- **[`protocol_config`](/api/rpc/setup#protocol-config)** RPC 엔드포인트를 쿼리하고 `epoch_length`를 검색하여 이 설정을 볼 수 있습니다.

**참고:** [아카이브 노드](https://near-nodes.io/intro/node-types#archival-node)가 아닌 노드는 5 에포크(~2.5일) 후에 블록을 가비지 수집합니다.

**예시:**

<Tabs>

<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "EXPERIMENTAL_protocol_config",
  "params": {
    "finality": "final"
  }
}
```

</TabItem>

<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=EXPERIMENTAL_protocol_config \
  params:='{
    "finality": "final"
  }'
```

</TabItem>

</Tabs>

**응답 예시:**

```json
{
    "jsonrpc": "2.0",
    "result": {
        "protocol_version": 44,
        "genesis_time": "2020-07-21T16:55:51.591948Z",
        "chain_id": "mainnet",
        "genesis_height": 9820210,
        "num_block_producer_seats": 100,
        "num_block_producer_seats_per_shard": [
            100
        ],
        "avg_hidden_validator_seats_per_shard": [
            0
        ],
        "dynamic_resharding": false,
        "protocol_upgrade_stake_threshold": [
            4,
            5
        ],
        "epoch_length": 43200,
        "gas_limit": 1000000000000000,
        "min_gas_price": "1000000000",
        "max_gas_price": "10000000000000000000000",
        "block_producer_kickout_threshold": 90,
        "chunk_producer_kickout_threshold": 90,

// ---- snip ----
}
```

[밸리데이터 FAQ](https://github.com/near/wiki/blob/master/Archive/validators/faq.md#what-is-an-epoch)에서 에포크를 사용하여 네트워크 유효성 검사를 관리하는 방법에 대해 자세히 알아볼 수 있습니다.

:::tip Got a question?

<a href="https://stackoverflow.com/questions/tagged/nearprotocol"> Ask it on StackOverflow! </a>

:::
