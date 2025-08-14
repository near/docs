---
id: block-chunk
title: Block / Chunk
description: "Query the network and get details about specific blocks or chunks using the NEAR RPC API, including block details, changes in blocks, and chunk information."
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { TryOutOnLantstool } from '@site/src/components/lantstool/TryOutOnLantstool';
import { LantstoolLabel } from '@site/src/components/lantstool/LantstoolLabel/LantstoolLabel';
import { SplitLayoutContainer, SplitLayoutLeft, SplitLayoutRight } from '@site/src/components/SplitLayout';

The RPC API enables you to query the network and get details about specific blocks or chunks.

---

## Block details {#block-details}

<SplitLayoutContainer>
  <SplitLayoutLeft title="Description">
    Queries network and returns block for given height or hash. You can also use
    `finality` param to return latest block details.

    **Note**: You may choose to search by a specific block _or_ finality, you can not choose both.

    - **method**: `block`
    - **params**:
      - [`finality`](/api/rpc/setup#using-finality-param) _OR_ [`block_id`](/api/rpc/setup#using-block_id-param)
  </SplitLayoutLeft>
  <SplitLayoutRight title="Example">

### `finality` example

<Tabs groupId="code-tabs">
  <TabItem value="json" label="JSON" default>
      ```json
      {
        "jsonrpc": "2.0",
        "id": "dontcare",
        "method": "block",
        "params": {
          "finality": "final"
        }
      }
      ```
  </TabItem>
  <TabItem value="js" label="JavaScript">
      ```js
      const response = await near.connection.provider.block({
        finality: 'final',
      });
      ```
  </TabItem>
  <TabItem value="http" label="HTTPie">
      ```bash
      http POST https://rpc.testnet.near.org \
        jsonrpc=2.0 \
        id=dontcare \
        method=block \
        params:='{
          "finality": "final"
        }'
      ```
  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/5.api/rpc/block-chunk/get-latest-block.json" />
  </TabItem>
</Tabs>

### `block_height` example

<Tabs groupId="code-tabs">
  <TabItem value="json" label="JSON" default>
      ```json
      {
        "jsonrpc": "2.0",
        "id": "dontcare",
        "method": "block",
        "params": {
          "block_id": 187310138
        }
      }
      ```
  </TabItem>
  <TabItem value="js" label="JavaScript">
      ```js
      const response = await near.connection.provider.block({
        blockId: 187310138,
      });
      ```
  </TabItem>
  <TabItem value="http" label="HTTPie">
      ```bash
      http POST https://archival-rpc.testnet.near.org \
        jsonrpc=2.0 \
        id=dontcare \
        method=block \
        params:='{
          "block_id": 187310138
        }'
      ```
  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/5.api/rpc/block-chunk/get-block-by-bloch-height.json" />
  </TabItem>
</Tabs>

### `block_hash` example

<Tabs groupId="code-tabs">
  <TabItem value="json" label="JSON" default>
      ```json
      {
        "jsonrpc": "2.0",
        "id": "dontcare",
        "method": "block",
        "params": {
          "block_id": "6RWmTYhXCzjMjoY3Mz1rfFcnBm8E6XeDDbFEPUA4sv1w"
        }
      }
      ```
  </TabItem>
  <TabItem value="js" label="JavaScript">
      ```js
      const response = await near.connection.provider.block({
        blockId: '6RWmTYhXCzjMjoY3Mz1rfFcnBm8E6XeDDbFEPUA4sv1w',
      });
      ```
  </TabItem>
  <TabItem value="http" label="HTTPie">
      ```bash
      http POST https://archival-rpc.testnet.near.org \
        jsonrpc=2.0 \
        id=dontcare \
        method=block \
        params:='{
          "block_id": "6RWmTYhXCzjMjoY3Mz1rfFcnBm8E6XeDDbFEPUA4sv1w"
        }'
      ```
  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/5.api/rpc/block-chunk/get-block-by-bloch-hash.json" />
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
        "author": "node2",
        "chunks": [
          {
            "balance_burnt": "0",
            "bandwidth_requests": null,
            "chunk_hash": "CzPafxtJmM1FnRoasKWAVhceJzZzkz9RKUBQQ4kY9V1v",
            "congestion_info": {
              "allowed_shard": 1,
              "buffered_receipts_gas": "0",
              "delayed_receipts_gas": "0",
              "receipt_bytes": 0
            },
            "encoded_length": 308,
            "encoded_merkle_root": "6z9JwwtVfS5nRKcKeJxgzThRRs2wCNvbH88T3cuARe6W",
            "gas_limit": 1000000000000000,
            "gas_used": 0,
            "height_created": 187310138,
            "height_included": 187310138,
            "outcome_root": "11111111111111111111111111111111",
            "outgoing_receipts_root": "AChfy3dXeJjgD2w5zXkUTFb6w8kg3AYGnyyjsvc7hXLv",
            "prev_block_hash": "Wj6B3RTv73EWDNbSammRDeA9315RaPyRrJYmiP4nG4X",
            "prev_state_root": "cRMk2zd2bWC1oBfGowgMTpqW9L5SNG2FeE72yT1wpQA",
            "rent_paid": "0",
            "shard_id": 0,
            "signature": "ed25519:L1iCopW8gY5rqwfuZT8Y3bHHXvuvWT87X9rwdY6LmFi8LGZdMhj2CkQCXLGrzdfYXD8B54wPTM9TqJAHcKfFDyW",
            "tx_root": "CMwUsP8q4DTBUYxXm12jVwC8xTD8L1T1n3jdKLQVh6bm",
            "validator_proposals": [],
            "validator_reward": "0"
          },
          // ...other chunks...
        ],
        "header": {
          // ...header fields...
        }
      },
      "id": "dontcare"
    }
    ```
</details>
---

## Changes in Block {#changes-in-block}

<SplitLayoutContainer>
  <SplitLayoutLeft title="Description">
    Returns changes in block for given block height or hash. You can also use
    `finality` param to return latest block details.

    **Note**: You may choose to search by a specific block _or_ finality, you can not choose both.

    - **method**: `EXPERIMENTAL_changes_in_block`
    - **params**:
      - [`finality`](/api/rpc/setup#using-finality-param) _OR_ [`block_id`](/api/rpc/setup#using-block_id-param)
  </SplitLayoutLeft>
  <SplitLayoutRight title="Example">

### `finality` example

<Tabs groupId="code-tabs">
  <TabItem value="json" label="JSON" default>
      ```json
      {
        "jsonrpc": "2.0",
        "id": "dontcare",
        "method": "EXPERIMENTAL_changes_in_block",
        "params": {
          "finality": "final"
        }
      }
      ```
  </TabItem>
  <TabItem value="js" label="JavaScript">
      ```js
      const response = await near.connection.provider.blockChanges({
        finality: 'final',
      });
      ```
  </TabItem>
  <TabItem value="http" label="HTTPie">
      ```bash
      http POST https://rpc.testnet.near.org \
        jsonrpc=2.0 \
        id=dontcare \
        method=EXPERIMENTAL_changes_in_block \
        params:='{
          "finality": "final"
        }'
      ```
  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/5.api/rpc/block-chunk/get-latest-block-changes.json" />
  </TabItem>
</Tabs>

### `block_height` example

<Tabs groupId="code-tabs">
  <TabItem value="json" label="JSON" default>
      ```json
      {
        "jsonrpc": "2.0",
        "id": "dontcare",
        "method": "EXPERIMENTAL_changes_in_block",
        "params": {
          "block_id": 187310138
        }
      }
      ```
  </TabItem>
  <TabItem value="js" label="JavaScript">
      ```js
      const response = await near.connection.provider.blockChanges({
        blockId: 187310138,
      });
      ```
  </TabItem>
  <TabItem value="http" label="HTTPie">
      ```bash
      http POST https://archival-rpc.testnet.near.org \
        jsonrpc=2.0 \
        id=dontcare \
        method=EXPERIMENTAL_changes_in_block \
        params:='{
          "block_id": 187310138
        }'
      ```
  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/5.api/rpc/block-chunk/get-block-changes-by-block-height.json" />
  </TabItem>
</Tabs>

### `block_hash` example

<Tabs groupId="code-tabs">
  <TabItem value="json" label="JSON" default>
      ```json
      {
        "jsonrpc": "2.0",
        "id": "dontcare",
        "method": "EXPERIMENTAL_changes_in_block",
        "params": {
          "block_id": "6RWmTYhXCzjMjoY3Mz1rfFcnBm8E6XeDDbFEPUA4sv1w"
        }
      }
      ```
  </TabItem>
  <TabItem value="js" label="JavaScript">
      ```js
      const response = await near.connection.provider.blockChanges({
        blockId: '6RWmTYhXCzjMjoY3Mz1rfFcnBm8E6XeDDbFEPUA4sv1w',
      });
      ```
  </TabItem>
  <TabItem value="http" label="HTTPie">
      ```bash
      http POST https://archival-rpc.testnet.near.org \
        jsonrpc=2.0 \
        id=dontcare \
        method=EXPERIMENTAL_changes_in_block \
        params:='{
          "block_id": "6RWmTYhXCzjMjoY3Mz1rfFcnBm8E6XeDDbFEPUA4sv1w"
        }'
      ```
  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/5.api/rpc/block-chunk/get-block-changes-by-block-hash.json" />
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
        "block_hash": "6RWmTYhXCzjMjoY3Mz1rfFcnBm8E6XeDDbFEPUA4sv1w",
        "changes": [
          {
            "account_id": "account.rpc-examples.testnet",
            "type": "account_touched"
          },
          {
            "account_id": "dev2-nsp.testnet",
            "type": "account_touched"
          },
          {
            "account_id": "ping-account.testnet",
            "type": "account_touched"
          },
          {
            "account_id": "v1.signer-dev.testnet",
            "type": "account_touched"
          },
          {
            "account_id": "account.rpc-examples.testnet",
            "type": "access_key_touched"
          },
          {
            "account_id": "ping-account.testnet",
            "type": "access_key_touched"
          },
          {
            "account_id": "dev2-nsp.testnet",
            "type": "data_touched"
          },
          {
            "account_id": "dev2-nsp.testnet",
            "type": "data_touched"
          },
          {
            "account_id": "v1.signer-dev.testnet",
            "type": "data_touched"
          }
        ]
      },
      "id": "dontcare"
    }
    ```
</details>


---

## Chunk Details {#chunk-details}

<SplitLayoutContainer>
  <SplitLayoutLeft title="Description">
    Returns details of a specific chunk. You can run a [block details](/api/rpc/block-chunk#block-details)
    query to get a valid chunk hash.

    - **method**: `chunk`
    - **params**:
      - `chunk_id` _OR_ [`block_id`, `shard_id`](/api/rpc/setup#using-block_id-param)
  </SplitLayoutLeft>
  <SplitLayoutRight title="Example">

### `chunk_id` example

<Tabs groupId="code-tabs">
  <TabItem value="json" label="JSON" default>
    ```json
    {
      "jsonrpc": "2.0",
      "id": "dontcare",
      "method": "chunk",
      "params": {
        "chunk_id": "CzPafxtJmM1FnRoasKWAVhceJzZzkz9RKUBQQ4kY9V1v"
      }
    }
    ```
  </TabItem>
  <TabItem value="js" label="JavaScript">
    ```js
    const response = await near.connection.provider.chunk(
      'CzPafxtJmM1FnRoasKWAVhceJzZzkz9RKUBQQ4kY9V1v',
    );
    ```
  </TabItem>
  <TabItem value="http" label="HTTPie">
    ```bash
    http POST https://archival-rpc.testnet.near.org \
      jsonrpc=2.0 \
      id=dontcare \
      method=chunk \
      params:='{
        "chunk_id": "CzPafxtJmM1FnRoasKWAVhceJzZzkz9RKUBQQ4kY9V1v"
      }'
    ```
  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/5.api/rpc/block-chunk/get-chunk-by-chunk-id.json" />
  </TabItem>
</Tabs>

### `[block_id, shard_id]` example

<Tabs groupId="code-tabs">
  <TabItem value="json" label="JSON" default>
    ```json
    {
      "jsonrpc": "2.0",
      "id": "dontcare",
      "method": "chunk",
      "params": {
        "block_id": 187310138,
        "shard_id": 0
      }
    }
    ```
  </TabItem>
  <TabItem value="js" label="JavaScript">
    ```js
    const response = await near.connection.provider.chunk([187310138, 0]);
    ```
  </TabItem>
  <TabItem value="http" label="HTTPie">
    ```bash
    http POST https://archival-rpc.testnet.near.org \
      jsonrpc=2.0 \
      id=dontcare \
      method=chunk \
      params:='{
        "block_id": 187310138,
        "shard_id": 0
      }'
    ```
  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/5.api/rpc/block-chunk/get-chunk-by-block-shard.json" />
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
      "author": "kiln.pool.f863973.m0",
      "header": {
        "balance_burnt": "0",
        "bandwidth_requests": null,
        "chunk_hash": "CzPafxtJmM1FnRoasKWAVhceJzZzkz9RKUBQQ4kY9V1v",
        "congestion_info": {
          "allowed_shard": 1,
          "buffered_receipts_gas": "0",
          "delayed_receipts_gas": "0",
          "receipt_bytes": 0
        },
        "encoded_length": 308,
        "encoded_merkle_root": "6z9JwwtVfS5nRKcKeJxgzThRRs2wCNvbH88T3cuARe6W",
        "gas_limit": 1000000000000000,
        "gas_used": 0,
        "height_created": 187310138,
        "height_included": 187310138,
        "outcome_root": "11111111111111111111111111111111",
        "outgoing_receipts_root": "AChfy3dXeJjgD2w5zXkUTFb6w8kg3AYGnyyjsvc7hXLv",
        "prev_block_hash": "Wj6B3RTv73EWDNbSammRDeA9315RaPyRrJYmiP4nG4X",
        "prev_state_root": "cRMk2zd2bWC1oBfGowgMTpqW9L5SNG2FeE72yT1wpQA",
        "rent_paid": "0",
        "shard_id": 0,
        "signature": "ed25519:L1iCopW8gY5rqwfuZT8Y3bHHXvuvWT87X9rwdY6LmFi8LGZdMhj2CkQCXLGrzdfYXD8B54wPTM9TqJAHcKfFDyW",
        "tx_root": "CMwUsP8q4DTBUYxXm12jVwC8xTD8L1T1n3jdKLQVh6bm",
        "validator_proposals": [],
        "validator_reward": "0"
      },
      "receipts": [],
      "transactions": [
        {
          "actions": [
            {
              "FunctionCall": {
                "args": "eyJyZWNvcmRfaWQiOjEsInJlY29yZCI6IkhlbGxvLCBOZWFyIFByb3RvY29sISJ9",
                "deposit": "0",
                "gas": 50000000000000,
                "method_name": "write_record"
              }
            }
          ],
          "hash": "J3KbUXF9YPu2eGnbDCACxGvmMDZMdP7acGYhVLHGu9y2",
          "nonce": 187309654000001,
          "priority_fee": 0,
          "public_key": "ed25519:EddTahJwZpJjYPPmat7DBm1m2vdrFBzVv7e3T4hzkENd",
          "receiver_id": "contract.rpc-examples.testnet",
          "signature": "ed25519:3opUQgg5eNQmE2LJ8zJiitBAVLDFR3svk8LC5VtVGorQuq8jWLocKAt7B4xb6n7DhH8zSVCWcRRrmVL9f1wHiVXa",
          "signer_id": "account.rpc-examples.testnet"
        }
      ]
    },
    "id": "dontcare"
  }
  ```
</details>

---
