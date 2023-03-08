---
id: cache
title: Cache API
sidebar_label: Cache
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The VM implements caching layer for most network requests. You can leverage it manually by using `useCache` hook.

## useCache

The method acts like a hook that takes a promise through a generator function, fetches the data and caches it. The cache is global for the VM, but it's identified by for given component (by src) for a given `dataKey`.
It can be used to easily use and cache data from async data sources.

**Returns** `null` if the cache is cold and data is fetching, or the previous cached value while the data is being fetched an d, or the new data if the new promise data is different from the old data.

:::note
The data is being cached and compared as JSON serialized objects.
:::

 | param      |  required     | type               | description                                                           |
 |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
 | `promiseGenerator`      |  **required** | object   | a function that returns a promise, which generates data.  |
 | `dataKey`      |  **required** | object   | the unique name (within the current component) to identify the data.  |
 | `options`      |  _optional_ | object   | optional argument:<br/>- `subscribe` _(optional)_: if `true`, the data refreshes periodically by invalidating cache.  |

:::info
- `promiseGenerator`: you don't return the promise directly, because it should only be fired once.
:::

### Examples

<Tabs>
<TabItem value="request" label="Request" default>

```jsx
const status = useCache(
  () =>
    asyncFetch("https://rpc.mainnet.near.org/status").then((res) => res.body),
  "mainnetRpcStatus",
  { subscribe: true }
);

return status;
```

</TabItem>
<TabItem value="response" label="Response">

```json
{
  "version": {
    "version": "1.31.1",
    "build": "1.31.1",
    "rustc_version": "1.65.0"
  },
  "chain_id": "mainnet",
  "protocol_version": 58,
  "latest_protocol_version": 58,
  "rpc_addr": "127.0.0.1:4040",
  "validators": [
    {
      "account_id": "figment.poolv1.near",
      "is_slashed": false
    },
    {
      "account_id": "staked.poolv1.near",
      "is_slashed": false
    },
    {
      "account_id": "galaxydigital.poolv1.near",
      "is_slashed": false
    }
  ],
  "sync_info": {
    "latest_block_hash": "ArPXejJYcFEDtU8Ma7tXFPM1pRDDzDSkj1KVBjphVwnw",
    "latest_block_height": 85795851,
    "latest_state_root": "EXhYFzPLdno6ZNHFr7DSGFWqUSZLSVZj6oP15xUdrmMm",
    "latest_block_time": "2023-02-22T13:48:47.342467480Z",
    "syncing": false,
    "earliest_block_hash": "HTrKnWapTNuZwoAeeepeV3deyQcJNg1CeKg4PPR8n9Ah",
    "earliest_block_height": 85593094,
    "earliest_block_time": "2023-02-19T18:54:15.505365092Z",
    "epoch_id": "H99thh9tGD8kBwJC5fac83TYGs6W2TTq1Xv3Jqw2VWYv",
    "epoch_start_height": 85765895
  },
  "validator_account_id": null,
  "validator_public_key": null,
  "node_public_key": "ed25519:BhqHCszVngV2MqJrTVjtcbWNGuLUyqXcXyBuCUt8DK9k",
  "node_key": null,
  "uptime_sec": 505796
}
```

</TabItem>
</Tabs>
