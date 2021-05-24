---
id: epoch
title: Epoch
sidebar_label: Epoch
---

> An **epoch** is a unit of time when validators of the network remain constant.
>
> - Both `testnet` and `mainnet` have an epoch duration of ~12 hours or 43,200 seconds to be exact.
> - You can view this setting by querying the **[`genesis_config`](/docs/api/rpc#genesis-config)** RPC endpoint and searching for `epoch_length`.
> - Nodes garbage collect blocks after 5 epochs unless they are [archival nodes](/docs/roles/integrator/exchange-integration#running-an-archival-node).

**HTTPie Query:**

```text
http post https://rpc.mainnet.near.org jsonrpc=2.0 id=dontcare method=EXPERIMENTAL_genesis_config
```

**Example Response:**

```json
{
    "id": "dontcare",
    "jsonrpc": "2.0",
    "result": {
        "avg_hidden_validator_seats_per_shard": [
            0
        ],
        "block_producer_kickout_threshold": 90,
        "chain_id": "mainnet",
        "chunk_producer_kickout_threshold": 90,
        "dynamic_resharding": false,
        "epoch_length": 43200, //  <---------- EPOCH duration in seconds
        "fishermen_threshold": "340282366920938463463374607431768211455",
        "gas_limit": 1000000000000000,
        "gas_price_adjustment_rate": [
            1,
            100
        ],
        "genesis_height": 9820210,
        "genesis_time": "2020-07-21T16:55:51.591948Z",
        "max_gas_price": "10000000000000000000000",
        "max_inflation_rate": [
            0,
            1
        ],
        // ---- snip ----
}
```

You can learn more about how epoch's are used to manage network validation in the [Validator FAQ](/docs/validator/staking-faq#what-is-an-epoch).

> Got a question?
> <a href="https://stackoverflow.com/questions/tagged/nearprotocol">
> <h8>Ask it on StackOverflow!</h8></a>
