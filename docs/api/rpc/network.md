---
id: network
title: Network
description: "Query status information for nodes and validators in the NEAR network, including node status, network info, and validation status."
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { TryOutOnLantstool } from '@site/src/components/lantstool/TryOutOnLantstool';
import { LantstoolLabel } from '@site/src/components/lantstool/LantstoolLabel/LantstoolLabel';
import { SplitLayoutContainer, SplitLayoutLeft, SplitLayoutRight } from '@site/src/components/SplitLayout';

The RPC API enables you to query status information for nodes and validators.

---

## Quick Reference

| Method | Parameters | Description |
| --- | --- | --- |
| [`status`](#node-status) | _none_ | Returns general status of a given node and validator set |
| [`network_info`](#network-info) | _none_ | Returns current state of node network connections |
| [`validators`](#validation-status) | `epoch_id` OR `[null]` | Returns active validators on the network |

---

## Node Status {#node-status}

<SplitLayoutContainer>
  <SplitLayoutLeft title="Description">
    Returns general status of a given node (sync status, nearcore node version,
    protocol version, etc.), and the current set of validators.

    - **method**: `status`
    - **params**: `[]`
  </SplitLayoutLeft>
  <SplitLayoutRight title="Example">
    <Tabs groupId="code-tabs">
      <TabItem value="json" label="JSON" default>
        ```json
        {
          "jsonrpc": "2.0",
          "id": "dontcare",
          "method": "status",
          "params": []
        }
        ```
      </TabItem>
      <TabItem value="js" label="JavaScript">
        ```js
        const response = await near.connection.provider.status();
        ```
      </TabItem>
      <TabItem value="http" label="HTTPie">
        ```bash
        http POST https://rpc.testnet.near.org \
          jsonrpc=2.0 \
          id=dontcare \
          method=status \
          params:='[]'
        ```
      </TabItem>
      <TabItem value="Lantstool" label={<LantstoolLabel />}>
        <TryOutOnLantstool path="docs/5.api/rpc/network/get-node-status.json" />
      </TabItem>
    </Tabs>
  </SplitLayoutRight>
</SplitLayoutContainer>

<details>
  <summary>Example response: </summary>
  
  ```json
  {
    "jsonrpc": "2.0",
    "result": {
      "chain_id": "testnet",
      "genesis_hash": "FWJ9kR6KFWoyMoNjpLXXGHeuiy7tEY6GmoFeCA5yuc6b",
      "latest_protocol_version": 73,
      "node_key": null,
      "node_public_key": "ed25519:DC7DbfZq4dkPqUKaKpWNimgtRBxnD9rja2KcZRs4e3DL",
      "protocol_version": 73,
      "rpc_addr": "0.0.0.0:3030",
      "sync_info": {
        "earliest_block_hash": "uz2gwgYxpx8dHsjgiPQefbwAhWk41CCvEmHU7ktYE2C",
        "earliest_block_height": 187251995,
        "earliest_block_time": "2025-02-10T13:54:22.616904144Z",
        "epoch_id": "94jeudySZcxGBSVgKXn3xPT3P5iFF6YcnxC43F15QtkQ",
        "epoch_start_height": 187443633,
        "latest_block_hash": "EfL8Rc1EH13UxgbJB4skt8xSF8vojNQPcAX1opf6RFab",
        "latest_block_height": 187456272,
        "latest_block_time": "2025-02-12T22:10:10.530341781Z",
        "latest_state_root": "3Vpebx4DuKAYmMjL96XMmLqWYUfuS2raZWoAbxFxeqBm",
        "syncing": false
      },
      "uptime_sec": 6020117,
      "validator_account_id": null,
      "validator_public_key": null,
      "validators": [
        {
          "account_id": "kiln.pool.f863973.m0",
          "is_slashed": false
        },
        {
          "account_id": "node2",
          "is_slashed": false
        },
        {
          "account_id": "legends.pool.f863973.m0",
          "is_slashed": false
        }
      ],
      "version": {
        "build": "2.4.0-rc.1",
        "rustc_version": "1.82.0",
        "version": "2.4.0-rc.1"
      }
    },
    "id": "dontcare"
  }
  ```
</details>
<details>
<summary>Error handling:</summary>

When making RPC API requests, you may encounter various errors related to network configuration, rate limiting, or request formatting. For comprehensive information about error types, causes, and solutions, see the [RPC Errors](/api/rpc/errors) documentation.

</details>
---

## Network Info {#network-info}

<SplitLayoutContainer>
  <SplitLayoutLeft title="Description">
    Returns the current state of node network connections (active peers, transmitted data, etc.)

    - **method**: `network_info`
    - **params**: _none_
  </SplitLayoutLeft>
  <SplitLayoutRight title="Example">
    <Tabs groupId="code-tabs">
      <TabItem value="json" label="JSON" default>
        ```json
        {
          "jsonrpc": "2.0",
          "id": "dontcare",
          "method": "network_info",
          "params": []
        }
        ```
      </TabItem>
      <TabItem value="http" label="HTTPie">
        ```bash
        http POST https://rpc.testnet.near.org \
          jsonrpc=2.0 \
          id=dontcare \
          method=network_info \
          params:='[]'
        ```
      </TabItem>
      <TabItem value="Lantstool" label={<LantstoolLabel />}>
        <TryOutOnLantstool path="docs/5.api/rpc/network/get-network-info.json" />
      </TabItem>
    </Tabs>
  </SplitLayoutRight>
</SplitLayoutContainer>

<details>
  <summary>Example response:</summary>
  
  ```json
  {
    "jsonrpc": "2.0",
    "result": {
      "active_peers": [
        {
          "id": "ed25519:GkDv7nSMS3xcqA45cpMvFmfV1o4fRF6zYo1JRR6mNqg5",
          "addr": "35.193.24.121:24567",
          "account_id": null
        }
      ],
      "num_active_peers": 34,
      "peer_max_count": 40,
      "sent_bytes_per_sec": 17754754,
      "received_bytes_per_sec": 492116,
      "known_producers": [
        {
          "account_id": "node0",
          "addr": null,
          "peer_id": "ed25519:7PGseFbWxvYVgZ89K1uTJKYoKetWs7BJtbyXDzfbAcqX"
        }
      ]
    },
    "id": "dontcare"
  }
  ```
</details>
<details>
<summary>Error handling:</summary>

When making RPC API requests, you may encounter various errors related to network configuration, rate limiting, or request formatting. For comprehensive information about error types, causes, and solutions, see the [RPC Errors](/api/rpc/errors) documentation.

</details>

---

## Validation Status {#validation-status}

<SplitLayoutContainer>
  <SplitLayoutLeft title="Description">
    Queries active validators on the network returning details and the state of
    validation on the blockchain.

    - **method**: `validators`
    - **params**:
      - `epoch_id` _OR_ `[null]`

    **Note:**
    You can obtain the `epoch_id` from a block that belongs to a specific epoch.
    If you want to retrieve the current list of validators, pass `null` as the parameter.
    Additionally, you can query validators for past epochs by providing the `epoch_id`
    of the desired past epoch.
  </SplitLayoutLeft>
  <SplitLayoutRight title="Example with null">
    <Tabs groupId="code-tabs">
      <TabItem value="json" label="JSON" default>
        ```json
        {
          "jsonrpc": "2.0",
          "id": "dontcare",
          "method": "validators",
          "params": [null]
        }
        ```
      </TabItem>
      <TabItem value="http" label="HTTPie">
        ```bash
        http POST https://rpc.testnet.near.org \
          jsonrpc=2.0 \
          id=dontcare \
          method=validators \
          params:='[null]'
        ```
      </TabItem>
      <TabItem value="Lantstool" label={<LantstoolLabel />}>
        <TryOutOnLantstool path="docs/5.api/rpc/network/get-latest-validators.json" />
      </TabItem>
    </Tabs>
  </SplitLayoutRight>
</SplitLayoutContainer>

### Example with epoch_id

<SplitLayoutContainer>
  <SplitLayoutLeft title="Description">
    Query validators for a specific past epoch by providing the `epoch_id`.
  </SplitLayoutLeft>
  <SplitLayoutRight title="Example">
    <Tabs groupId="code-tabs">
      <TabItem value="json" label="JSON" default>
        ```json
        {
          "jsonrpc": "2.0",
          "id": "dontcare",
          "method": "validators",
          "params": {
            "epoch_id": "94jeudySZcxGBSVgKXn3xPT3P5iFF6YcnxC43F15QtkQ"
          }
        }
        ```
      </TabItem>
      <TabItem value="http" label="HTTPie">
        ```bash
        http POST https://rpc.testnet.near.org \
          jsonrpc=2.0 \
          id=dontcare \
          method=validators \
          params:='{"epoch_id": "94jeudySZcxGBSVgKXn3xPT3P5iFF6YcnxC43F15QtkQ"}'
        ```
      </TabItem>
      <TabItem value="Lantstool" label={<LantstoolLabel />}>
        <TryOutOnLantstool path="docs/5.api/rpc/network/get-validators-by-epoch-id.json" />
      </TabItem>
    </Tabs>
  </SplitLayoutRight>
</SplitLayoutContainer>

<details>
  <summary>Example response: </summary>
  
  ```json
  {
    "jsonrpc": "2.0",
    "result": {
      "current_fishermen": [],
      "current_proposals": [
        {
          "account_id": "01node.pool.f863973.m0",
          "public_key": "ed25519:3iNqnvBgxJPXCxu6hNdvJso1PEAc1miAD35KQMBCA3aL",
          "stake": "14508308808748255650142126217547",
          "validator_stake_struct_version": "V1"
        }
      ],
      "current_validators": [
        {
          "account_id": "kiln.pool.f863973.m0",
          "is_slashed": false,
          "num_expected_blocks": 2622,
          "num_expected_chunks": 9298,
          "num_produced_blocks": 2622,
          "num_produced_chunks": 9288,
          "public_key": "ed25519:Bq8fe1eUgDRexX2CYDMhMMQBiN13j8vTAVFyTNhEfh1W",
          "shards": [0],
          "stake": "92891729926051855086331836750992"
        }
      ],
      "epoch_height": 3358,
      "epoch_start_height": 187443633,
      "next_fishermen": [],
      "next_validators": [
        {
          "account_id": "kiln.pool.f863973.m0",
          "public_key": "ed25519:Bq8fe1eUgDRexX2CYDMhMMQBiN13j8vTAVFyTNhEfh1W",
          "shards": [0],
          "stake": "92921980033422214461941381687070"
        }
      ],
      "prev_epoch_kickout": []
    },
    "id": "dontcare"
  }
  ```
</details>
<details>
<summary>Error handling:</summary>

When making RPC API requests, you may encounter various errors related to network configuration, rate limiting, or request formatting. For comprehensive information about error types, causes, and solutions, see the [RPC Errors](/api/rpc/errors) documentation.

</details>

---

## Error Handling

### Common Error Types

| Error Code | Description | Solution |
|------------|-------------|----------|
| `UnknownEpoch` | Epoch ID not found | Use a valid epoch ID from existing blocks |
| `InvalidAccount` | Invalid account format | Use valid account ID format (e.g., `account.near`) |
| `RequestTimeout` | Request timed out | Retry the request or use a different RPC endpoint |
| `InternalError` | Server-side error | Retry the request after a short delay |
| `MethodNotFound` | Invalid method name | Check method spelling and API version |


---

## Best Practices

- **Cache validator data**: Validator information changes infrequently, consider caching for several minutes
- **Use specific queries**: Request only the data you need to minimize response size
