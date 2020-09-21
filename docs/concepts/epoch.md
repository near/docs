---
id: epoch
title: Epoch
sidebar_label: Epoch
---

An epoch is a unit of time during which validators of the network remain constant.

Epoch length is set at network genesis and can be discovered by calling the `genesis_config` RPC method as follows:

```text
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=EXPERIMENTAL_genesis_config
```

Testnet has the duration of an epoch (`epoch_length`) set to `43200` seconds or about ~12 hours.


```json
{
  "avg_hidden_validator_seats_per_shard": [
    0
  ],
  "block_producer_kickout_threshold": 80,
  "chain_id": "testnet",
  "chunk_producer_kickout_threshold": 90,
  "config_version": 1,
  "dynamic_resharding": false,
  "epoch_length": 43200,
  "fishermen_threshold": "10000000000000000000",
  "gas_limit": 1000000000000000,
  "gas_price_adjustment_rate": [
    1,
    100
  ],
  "genesis_height": 4072833,
  "genesis_time": "2019-06-04T06:13:25Z",
  "max_inflation_rate": [
    1,
    20
  ],
  // ... snip ...
}
```

You can learn more about how epoch's are used to manage network validation in the [Validator FAQ](/docs/validator/staking-faq#what-is-an-epoch).