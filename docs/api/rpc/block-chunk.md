---
id: block-chunk
title: Block / Chunk
description: Learn how to retrieve details about blocks and chunks from the RPC
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { TryOutOnLantstool } from '@site/src/components/lantstool/TryOutOnLantstool';
import { LantstoolLabel } from '@site/src/components/lantstool/LantstoolLabel/LantstoolLabel';
import { SplitLayoutContainer, SplitLayoutLeft, SplitLayoutRight } from '@site/src/components/SplitLayout';

The RPC API enables you to query the network and get details about specific blocks or chunks.

## Quick Reference {#quick-reference}

Here's a quick reference table for all the methods in this section:

| Method | Description | Parameters |
|--------|-------------|------------|
| [`block`](#block-details) | Get block details by height, hash, or finality | `finality` OR `block_id` |
| [`block effects`](#block-effects) | Get changes in a specific block | `finality` OR `block_id` |
| [`chunk`](#chunk-details) | Get chunk details by chunk_id or block_id + shard_id | `chunk_id` OR [`block_id`, `shard_id`] |


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

### finality

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

### block height

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

### block hash

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
      {
        "balance_burnt": "0",
        "bandwidth_requests": null,
        "chunk_hash": "44MZBWmPgXszAyojsffzozvNEdRsJcsq7RrdAV4Y7CLm",
        "congestion_info": {
          "allowed_shard": 2,
          "buffered_receipts_gas": "0",
          "delayed_receipts_gas": "0",
          "receipt_bytes": 0
        },
        "encoded_length": 8,
        "encoded_merkle_root": "5TxYudsfZd2FZoMyJEZAP19ASov2ZD43N8ZWv8mKzWgx",
        "gas_limit": 1000000000000000,
        "gas_used": 0,
        "height_created": 187310138,
        "height_included": 187310138,
        "outcome_root": "11111111111111111111111111111111",
        "outgoing_receipts_root": "AChfy3dXeJjgD2w5zXkUTFb6w8kg3AYGnyyjsvc7hXLv",
        "prev_block_hash": "Wj6B3RTv73EWDNbSammRDeA9315RaPyRrJYmiP4nG4X",
        "prev_state_root": "EQ5mcUAzJA4du33f9g9YzKvdte2ukyRHMMHbbqdazZvU",
        "rent_paid": "0",
        "shard_id": 1,
        "signature": "ed25519:4ktZTtEfxXSXPVj6Kii52d2T684HKKtEMzrd3dNc7UyxmgkKcLtxD1fawtbj8KsmjbZPGj8YMzanDeViEhxRJtDX",
        "tx_root": "11111111111111111111111111111111",
        "validator_proposals": [],
        "validator_reward": "0"
      },
      {
        "balance_burnt": "38449649514500000000",
        "bandwidth_requests": null,
        "chunk_hash": "7eB8V8zMmNp9GxfRt3oHA3DS7YTgPvZ761pBzoziLay8",
        "congestion_info": {
          "allowed_shard": 3,
          "buffered_receipts_gas": "0",
          "delayed_receipts_gas": "0",
          "receipt_bytes": 0
        },
        "encoded_length": 1804,
        "encoded_merkle_root": "6aZKpB3jZbhAq3kDtXaM6s1hYRLYEM624yiKkKvd957m",
        "gas_limit": 1000000000000000,
        "gas_used": 384496495145,
        "height_created": 187310138,
        "height_included": 187310138,
        "outcome_root": "D7ojhJ8UAgWf8A51Ekcundn3Kzdc577p5LFxqxcZurdB",
        "outgoing_receipts_root": "3CK2q73iJmWa36EbaceqGcTz7pD7pia8BsUDE3gixwnF",
        "prev_block_hash": "Wj6B3RTv73EWDNbSammRDeA9315RaPyRrJYmiP4nG4X",
        "prev_state_root": "7bSk4ev8EhZFSjb8Zb6ftkEZAUYQdbyPPz2ZkrvjLPuK",
        "rent_paid": "0",
        "shard_id": 2,
        "signature": "ed25519:2sQ4JfYSMFcwpjbmonk67mMCMvuQyCNzvvk3iqCLMR7mnHauy3i7aTbySXwoqnrDjdmNjQ3gJMaA53LSRxYmoyAD",
        "tx_root": "11111111111111111111111111111111",
        "validator_proposals": [],
        "validator_reward": "0"
      },
      {
        "balance_burnt": "0",
        "bandwidth_requests": null,
        "chunk_hash": "9pTjB74BgVSoP4Wb68BjkgnyABvZQUzAvv54YiVgse1B",
        "congestion_info": {
          "allowed_shard": 4,
          "buffered_receipts_gas": "0",
          "delayed_receipts_gas": "0",
          "receipt_bytes": 0
        },
        "encoded_length": 8,
        "encoded_merkle_root": "5TxYudsfZd2FZoMyJEZAP19ASov2ZD43N8ZWv8mKzWgx",
        "gas_limit": 1000000000000000,
        "gas_used": 0,
        "height_created": 187310138,
        "height_included": 187310138,
        "outcome_root": "11111111111111111111111111111111",
        "outgoing_receipts_root": "AChfy3dXeJjgD2w5zXkUTFb6w8kg3AYGnyyjsvc7hXLv",
        "prev_block_hash": "Wj6B3RTv73EWDNbSammRDeA9315RaPyRrJYmiP4nG4X",
        "prev_state_root": "JDHeuYmX4kvsTPKyJYtJTrm7UK3JHTf4rw7hcHXYEfCn",
        "rent_paid": "0",
        "shard_id": 3,
        "signature": "ed25519:5AejTPwZGWqdZjGCUbhLCcgasNDtsYKRJhS33uYR5Psu6NcCiaeLZnV8Q7dtWK4hLJ1iA48DA2WeqEeUyGhqWAGT",
        "tx_root": "11111111111111111111111111111111",
        "validator_proposals": [],
        "validator_reward": "0"
      },
      {
        "balance_burnt": "32741908829000000000",
        "bandwidth_requests": null,
        "chunk_hash": "2xQwSvBiCb1mkoPxBJhSRg7pjmnrmKMEffatDz73Y8Jj",
        "congestion_info": {
          "allowed_shard": 5,
          "buffered_receipts_gas": "0",
          "delayed_receipts_gas": "0",
          "receipt_bytes": 0
        },
        "encoded_length": 1042,
        "encoded_merkle_root": "5XpktxfgMp6thB2nH3PxdSg3K84p2wmpihHxUCqeQA6c",
        "gas_limit": 1000000000000000,
        "gas_used": 327419088290,
        "height_created": 187310138,
        "height_included": 187310138,
        "outcome_root": "69ZXwcYi41NY6cx1rZog8YavBPQvN75pmkNHZsFjWfUW",
        "outgoing_receipts_root": "FqGVK8H8x2P3BbvuFMo7VCTy8cCNTzT1jd5JoLXfYRNG",
        "prev_block_hash": "Wj6B3RTv73EWDNbSammRDeA9315RaPyRrJYmiP4nG4X",
        "prev_state_root": "BJePbZUt8VzJBwKf1j1sRUJJJEx4D2fUu4SCHiWs331o",
        "rent_paid": "0",
        "shard_id": 4,
        "signature": "ed25519:2QSda4eMn25hmmTY31wN6RnBpBLjamSLrQRoVZ1yEoWyhtMhtg8rUv9Ko1tEdSftwhNEhL1ETixaAz4qcmvHUvD1",
        "tx_root": "6qbqA8B9oyeVG33JXH25xbA2DiqvHRnxipurYUBJ9D8B",
        "validator_proposals": [],
        "validator_reward": "0"
      },
      {
        "balance_burnt": "0",
        "bandwidth_requests": null,
        "chunk_hash": "EVkgySRKpB9HrEJz8f18p9pWmJzhtL9WeYMwDSeY1827",
        "congestion_info": {
          "allowed_shard": 0,
          "buffered_receipts_gas": "0",
          "delayed_receipts_gas": "0",
          "receipt_bytes": 0
        },
        "encoded_length": 8,
        "encoded_merkle_root": "5TxYudsfZd2FZoMyJEZAP19ASov2ZD43N8ZWv8mKzWgx",
        "gas_limit": 1000000000000000,
        "gas_used": 0,
        "height_created": 187310138,
        "height_included": 187310138,
        "outcome_root": "11111111111111111111111111111111",
        "outgoing_receipts_root": "AChfy3dXeJjgD2w5zXkUTFb6w8kg3AYGnyyjsvc7hXLv",
        "prev_block_hash": "Wj6B3RTv73EWDNbSammRDeA9315RaPyRrJYmiP4nG4X",
        "prev_state_root": "GkcYxyvnet4nvL7LFdbKxiscFBpe5WSzy5g2pW58LSRs",
        "rent_paid": "0",
        "shard_id": 5,
        "signature": "ed25519:573WUDx8Sm4Fi16PFQkELXYq2SYezcbQP4CuhseqNizDtSTf2c2TKMWf2ZuACiWCSa8ARw8eWB2ZKWaY1uy7xd14",
        "tx_root": "11111111111111111111111111111111",
        "validator_proposals": [],
        "validator_reward": "0"
      }
    ],
    "header": {
      "approvals": [
        null,
        "ed25519:5GhoQTPXsWpgGPq2ZHZCfP9iY9GSmHMNsnydzxBxnibGvC43PFUAD58aUSNyfepRY4dAMbjbf8CduMyQU83HBxAt",
        "ed25519:3Vc7sgrrgvpFXRr94mx3CD32Std1MRprR7igChZUisJvUm6f2yJmUGaXk38CYbh2wT1gfsKJ2UHf9icRome3jFYw",
        "ed25519:3DZqMDGrk3eNUcZ8FiTtdw2piMXVcmVDDs89kHdRdDDgTr88GnQPEym4kfX9FUE81MnbytmotPry2sXD6MvbVprp",
        "ed25519:5qtN8dU2iCtZxqPNszhPJ2Rgio88QL2wseLPhLH5Ev56WuxcNsmFZbNREvA6cKAKz4aDwQFFmmj888h6EEZuS2TV",
        "ed25519:3gKUWzXU7Am5xdZqgMN3TC5wGVrf1kp6WQoqqtLFaF9JtBQKqqpZ67CKBm6KfejHPhiRkp1PbDJbppiNCpN3spr6",
        "ed25519:3wgeF9tcjx1vX2bLpXfm8fYUQnai524XjTNb3Wt2LHMZnNoXzW4D2XBynj8sK41H5wtSbeVYpN3vGY1r23y56BaY",
        "ed25519:ek5uvofwn5ZJidjYwiqS8Xpd1Y521FAUWrPyU9w3F8UT9yhviWuzPBCJUyMFVKnYUW6k6tZSZxT3NZibGfrGWA4",
        "ed25519:4UcHZyKNzGDsMSNfQjLA9EE8yXiq3aroLUz4WJATzkKkUfMNVRkWxGc5tih2jDwzKfY3Ni5YiPoBbPzPCxNrusLf",
        "ed25519:2hXaGXtAxngCjEWvnUUEgnnPCsXYzPzDadGHdw9sz6ng5oDQDPhnTm1MCG37xvv7xgCVhj3tqRZy8v74uap7WFC5",
        "ed25519:kLuyqcTUynL1P77uMaaRs2MzxiaE1uyVGPjAVxpufK9A19G6LDUfK2GcbFXkqCgvKBJEGZKFPUbBqs7EmDdLPD7",
        "ed25519:5ebABgQGk7idMAQgiEgc9a78v6fsD1nKXfevdBRJPFCn8bRuuFpthzzCp3NQXcr2XgSpNo6HJp8EZzzZHkSLfTDc",
        "ed25519:4hTb2qFydXaiMKfv1pCxU4S9TQYQTHhqUPuGy8dejqxt2FFHD2sdFsYCv8Mf8qWRSob77QMuQbj37aQfEuJR2hH4",
        null,
        "ed25519:65jkXVzQ8pGsRDApBvVFx4xR7j4gruJaL2wumRHEHWib61M5Ztvtt7TTkz2DMN1nrRy6C7Pfhe3U3KpdSVEKKYAN",
        null,
        "ed25519:3kNRvMnpP8t4D9Dgs1YDAXyPNg7V3fpNa3GEWyCNNq5EvXxnyEoXRyPtbrZQM2FbapKsL2DnaNGvewHwBRQz5DbD",
        "ed25519:5JQugH24LahiK7sn85akbprCtpAWfnZ2ffazxQ61kt9f6pe8b8s2LrHVKV3Wf4Sg3xHuP7fuUZJRyA4MWz3EQ83i",
        "ed25519:2zXba2vAyGEq1fWauB3Kj6HbExTZG1S9KXKe6xcLxEpJHP9JHE6P3mJzpc765WpNsP21evNGj6mffJAwRHtwRny4",
        null
      ],
      "block_body_hash": "6oSbpNUWcAUuaKWx79qTwyRPDLukg9hZ1RCa2PS5rcGt",
      "block_merkle_root": "DWK6gpunDXHgxU1KJi3Dx8o2HcKqQmUQJEaisK4M3ovD",
      "block_ordinal": 139413603,
      "challenges_result": [],
      "challenges_root": "11111111111111111111111111111111",
      "chunk_endorsements": [
        [255, 255],
        [251, 127],
        [255, 31],
        [255, 247],
        [255, 239, 1],
        [255, 63]
      ],
      "chunk_headers_root": "4MjChqi5JChDhaiU4zkhN1jeygZiMd66KeHe3Gz9Vs7s",
      "chunk_mask": [true, true, true, true, true, true],
      "chunk_receipts_root": "7nEtD9XsDbRJy7MwvUg4QX5zDUktiEVRP9nM6hHpsHmX",
      "chunk_tx_root": "44YKYmcG1JTocmPSMGpriLwN8CTi29sD8z5FcocMZAKo",
      "chunks_included": 6,
      "epoch_id": "HkFsp3sn9K3KDWVoWPCfUSQocgf5bH4icgjHijePc2aX",
      "epoch_sync_data_hash": null,
      "gas_price": "100000000",
      "hash": "6RWmTYhXCzjMjoY3Mz1rfFcnBm8E6XeDDbFEPUA4sv1w",
      "height": 187310138,
      "last_ds_final_block": "Wj6B3RTv73EWDNbSammRDeA9315RaPyRrJYmiP4nG4X",
      "last_final_block": "71qgTQCVFfjQkimSdnhxR8iWSP6o9jqumLcZ9k5g25mT",
      "latest_protocol_version": 73,
      "next_bp_hash": "AWcwcDPWUjcW9zGiAt7UEUZzZ5Ue77537turbvBLbsiB",
      "next_epoch_id": "FQBXgdi9oWKanYBXPP1sNUD93KMquocjT5mVrjQ4PH7E",
      "outcome_root": "7Qkowo41AoiMdNfyiT83DwvwyReMeqhrkpqTzGm4Z19T",
      "prev_hash": "Wj6B3RTv73EWDNbSammRDeA9315RaPyRrJYmiP4nG4X",
      "prev_height": 187310137,
      "prev_state_root": "AiApSbMNq9kPPEiLLWhFpSrX5HoPToaBXztM9fePX2ap",
      "random_value": "Br6a6tgEhNBZm9iPtxCLhwqwCr2eoEAGGMeVYZnU6fVF",
      "rent_paid": "0",
      "signature": "ed25519:YSuWifP5B3VBPuEVJppWt13AShXsWZ64Qus8uHmtddE2mY6u4jnZVv6Gz4tFvWXfBAkZDk5xtd95rUterEdQm5t",
      "timestamp": 1739254177539033760,
      "timestamp_nanosec": "1739254177539033760",
      "total_supply": "2515615267787707740507051994761921",
      "validator_proposals": [],
      "validator_reward": "0"
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

## Block Effects {#block-effects}

<SplitLayoutContainer>
  <SplitLayoutLeft title="Description">
    Returns changes in block for given block height or hash over all transactions for all the types. Includes changes like `account_touched`, `access_key_touched`, `data_touched`, `contract_code_touched`. You can also use `finality` param to return latest block details.

    **Note**: You may choose to search by a specific block _or_ finality, you can not choose both.

    - **method**: `block_effects`
    - **params**:
      - [`finality`](/api/rpc/setup#using-finality-param) _OR_ [`block_id`](/api/rpc/setup#using-block_id-param)
  </SplitLayoutLeft>
  <SplitLayoutRight title="Example">

### block_effects by finality

<Tabs groupId="code-tabs">
  <TabItem value="json" label="JSON" default>
      ```json
      {
        "jsonrpc": "2.0",
        "id": "dontcare",
        "method": "block_effects",
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
        method=block_effects \
        params:='{
          "finality": "final"
        }'
      ```
  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/5.api/rpc/block-chunk/get-latest-block-changes.json" />
  </TabItem>
</Tabs>

### using block height

<Tabs groupId="code-tabs">
  <TabItem value="json" label="JSON" default>
      ```json
      {
        "jsonrpc": "2.0",
        "id": "dontcare",
        "method": "block_effects",
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
        method=block_effects \
        params:='{
          "block_id": 187310138
        }'
      ```
  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/5.api/rpc/block-chunk/get-block-changes-by-block-height.json" />
  </TabItem>
</Tabs>

### using block hash

<Tabs groupId="code-tabs">
  <TabItem value="json" label="JSON" default>
      ```json
      {
        "jsonrpc": "2.0",
        "id": "dontcare",
        "method": "block_effects",
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
        method=block_effects \
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
        "block_effects": [
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
<details>
<summary>Error handling:</summary>

When making RPC API requests, you may encounter various errors related to network configuration, rate limiting, or request formatting. For comprehensive information about error types, causes, and solutions, see the [RPC Errors](/api/rpc/errors) documentation.

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

### chunk_id example

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

### block_id and shard_id example

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
<details>
<summary>Error handling:</summary>

When making RPC API requests, you may encounter various errors related to network configuration, rate limiting, or request formatting. For comprehensive information about error types, causes, and solutions, see the [RPC Errors](/api/rpc/errors) documentation.

</details>

---

## Error Handling {#error-handling}

### Common Error Types

| Error Code | Description | Solution |
|------------|-------------|----------|
| `UNKNOWN_BLOCK` | Block not found or garbage-collected | Check block validity; use archival node for old blocks |
| `UNKNOWN_CHUNK` | Chunk not found in database | Verify chunk ID; use archival node for old chunks |
| `INVALID_SHARD_ID` | Shard ID does not exist | Provide valid shard ID for existing shard |
| `NOT_SYNCED_YET` | Node still syncing | Wait for sync completion or use different node |
| `PARSE_ERROR` | Invalid request parameters | Check parameter format and completeness |
| `INTERNAL_ERROR` | Server-side issue | Retry request or try different RPC endpoint |

### Response Validation

- **Block responses**: Always include `block_hash`, `block_height`, and `header` fields
- **Chunk responses**: Contain `author`, `header`, `receipts`, and `transactions` arrays
- **Changes responses**: Include `block_hash` and `block_effects` array with change details

---

## Best Practices

- **Cache block data**: Block information is immutable once finalized, ideal for caching
