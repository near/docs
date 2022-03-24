---
id: epoch
title: Epoch
sidebar_label: Epoch
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


> An **epoch** is a unit of time when validators of the network remain constant.

- Both `testnet` and `mainnet` have an epoch duration of ~12 hours or 43,200 seconds to be exact.
- You can view this setting by querying the **[`protocol_config`](/docs/api/rpc#protocol-config)** RPC endpoint and searching for `epoch_length`.

**Note:** Nodes garbage collect blocks after 5 epochs (~2.5 days) unless they are [archival nodes](/docs/roles/integrator/exchange-integration#running-an-archival-node).

**Example:**

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

**Example Response:**

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

You can learn more about how epoch's are used to manage network validation in the [Validator FAQ](https://wiki.near.org/validators/faq#what-is-an-epoch).

> Got a question?
> <a href="https://stackoverflow.com/questions/tagged/nearprotocol">
> <h8>Ask it on StackOverflow!</h8></a>
