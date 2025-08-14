---
id: transactions
title: RPC Endpoints
sidebar_label: Transactions
description: "Send transactions and query their status using the NEAR RPC API, including transaction status, receipts, and deprecated methods."
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { TryOutOnLantstool } from '@site/src/components/lantstool/TryOutOnLantstool';
import { LantstoolLabel } from '@site/src/components/lantstool/LantstoolLabel/LantstoolLabel';
import { SplitLayoutContainer, SplitLayoutLeft, SplitLayoutRight } from '@site/src/components/SplitLayout';

The RPC API enables you to send transactions and query their status.

---
## Send transaction {#send-tx}

<SplitLayoutContainer>
  <SplitLayoutLeft title="Description">
    Sends transaction.
    Returns the guaranteed execution status and the results the blockchain can provide at the moment.

    - **method**: `send_tx`
    - **params**:
      - `signed_tx_base64`: SignedTransaction encoded in base64
      - [Optional] `wait_until`: the required minimal execution level.
        The default value is `EXECUTED_OPTIMISTIC`.
        [Read more here](#tx-status-result).

    Using `send_tx` with `wait_until = NONE` is equal to legacy `broadcast_tx_async` method. <br />
    Using `send_tx` with finality `wait_until = EXECUTED_OPTIMISTIC` is equal to legacy `broadcast_tx_commit` method.
  </SplitLayoutLeft>
  <SplitLayoutRight title="Example">
    <Tabs groupId="code-tabs">
      <TabItem value="json" label="JSON" default>
        ```json
        {
          "jsonrpc": "2.0",
          "id": "dontcare",
          "method": "send_tx",
          "params": {
        "signed_tx_base64": "SIGNED_TRANSACTION_BASE64_ENCODED"
      }
        }
        ```
      </TabItem>
      <TabItem value="http" label="HTTPie">
        ```bash
        http POST https://rpc.testnet.near.org \
          jsonrpc=2.0 \
          id=dontcare \
          method=send_tx \
          params:='{"signed_tx_base64": "SIGNED_TRANSACTION_BASE64_ENCODED"}'
        ```
      </TabItem>
    </Tabs>

    <details>
      <summary>Example response: </summary>
      
    </details>
  </SplitLayoutRight>
</SplitLayoutContainer>
---
## Transaction Status {#transaction-status}

<SplitLayoutContainer>
  <SplitLayoutLeft title="Description">
    Queries status of a transaction by hash and returns the final transaction result.

    - **method**: `tx`
    - **params**:
      - `tx_hash` _(see [NearBlocks Explorer](https://testnet.nearblocks.io) for a valid transaction hash)_
      - `sender_account_id` _(used to determine which shard to query for transaction)_
      - [Optional] `wait_until`: the required minimal execution level.
        The default value is `EXECUTED_OPTIMISTIC`.
        Read more [here](/api/rpc/transactions#tx-status-result).

    A Transaction status request with `wait_until != NONE` will wait until the
    transaction appears on the blockchain. If the transaction does not exist,
    the method will wait until the timeout is reached. If you only need to check
    whether the transaction exists, use `wait_until = NONE`, it will return
    the response immediately.
  </SplitLayoutLeft>
  <SplitLayoutRight title="Example">
    <Tabs groupId="code-tabs">
      <TabItem value="json" label="JSON" default>
        ```json
        {
          "jsonrpc": "2.0",
          "id": "dontcare",
          "method": "send_tx",
          "params": {
        "signed_tx_base64": "SIGNED_TRANSACTION_BASE64_ENCODED"
      }
        }
        ```
      </TabItem>
      <TabItem value="js" label="JavaScript">
        ```js
        const response = await near.connection.provider.sendTransaction(signedTransaction);
        ```
      </TabItem>
      <TabItem value="http" label="HTTPie">
        ```bash
        http POST https://rpc.testnet.near.org \
          jsonrpc=2.0 \
          id=dontcare \
          method=send_tx \
          params:='{"signed_tx_base64": "SIGNED_TRANSACTION_BASE64_ENCODED"}'
        ```
      </TabItem>
      <TabItem value="Lantstool" label={<LantstoolLabel />}>
        <TryOutOnLantstool path="docs/5.api/rpc/transactions/get-transaction.json" />
      </TabItem>
    </Tabs>

    <details>
      <summary>Example Result:</summary>
      
    </details>
  </SplitLayoutRight>
</SplitLayoutContainer>
---
## Transaction Status with Receipts {#transaction-status-with-receipts}

<SplitLayoutContainer>
  <SplitLayoutLeft title="Description">
    Queries status of a transaction by hash, returning the final transaction
    result _and_ details of all receipts.

    - **method**: `EXPERIMENTAL_tx_status`
    - **params**:
      - `tx_hash` _(see [NearBlocks Explorer](https://testnet.nearblocks.io) for a valid transaction hash)_
      - `sender_account_id` _(used to determine which shard to query for transaction)_
      - [Optional] `wait_until`: the required minimal execution level.
        The default value is `EXECUTED_OPTIMISTIC`.
        Read more [here](/api/rpc/transactions#tx-status-result).

    A Transaction status request with `wait_until != NONE` will wait until the
    transaction appears on the blockchain. If the transaction does not exist,
    the method will wait until the timeout is reached. If you only need to check
    whether the transaction exists, use `wait_until = NONE`, it will return the response immediately.
  </SplitLayoutLeft>
  <SplitLayoutRight title="Example">
    <Tabs groupId="code-tabs">
      <TabItem value="json" label="JSON" default>
        ```json
        {
          "jsonrpc": "2.0",
          "id": "dontcare",
          "method": "send_tx",
          "params": {
        "signed_tx_base64": "SIGNED_TRANSACTION_BASE64_ENCODED"
      }
        }
        ```
      </TabItem>
      <TabItem value="js" label="JavaScript">
        ```js
        const response = await near.connection.provider.sendTransaction(signedTransaction);
        ```
      </TabItem>
      <TabItem value="http" label="HTTPie">
        ```bash
        http POST https://rpc.testnet.near.org \
          jsonrpc=2.0 \
          id=dontcare \
          method=send_tx \
          params:='{"signed_tx_base64": "SIGNED_TRANSACTION_BASE64_ENCODED"}'
        ```
      </TabItem>
      <TabItem value="Lantstool" label={<LantstoolLabel />}>
        <TryOutOnLantstool path="docs/5.api/rpc/transactions/get-detailed-transaction.json" />
      </TabItem>
    </Tabs>

    <details>
      <summary>Example response:</summary>
      
    </details>
  </SplitLayoutRight>
</SplitLayoutContainer>
---
## Receipt by ID {#receipt-by-id}

<SplitLayoutContainer>
  <SplitLayoutLeft title="Description">
    Fetches a receipt by its ID (as is, without a status or execution outcome)

    - **method**: `EXPERIMENTAL_receipt`
    - **params**:
      - `receipt_id` _(see [NearBlocks Explorer](https://testnet.nearblocks.io) for a valid receipt id)_
  </SplitLayoutLeft>
  <SplitLayoutRight title="Example">
    <Tabs groupId="code-tabs">
      <TabItem value="json" label="JSON" default>
        ```json
        {
          "jsonrpc": "2.0",
          "id": "dontcare",
          "method": "send_tx",
          "params": {
        "signed_tx_base64": "SIGNED_TRANSACTION_BASE64_ENCODED"
      }
        }
        ```
      </TabItem>
      <TabItem value="http" label="HTTPie">
        ```bash
        http POST https://rpc.testnet.near.org \
          jsonrpc=2.0 \
          id=dontcare \
          method=send_tx \
          params:='{"signed_tx_base64": "SIGNED_TRANSACTION_BASE64_ENCODED"}'
        ```
      </TabItem>
      <TabItem value="Lantstool" label={<LantstoolLabel />}>
        <TryOutOnLantstool path="docs/5.api/rpc/transactions/get-receipt.json" />
      </TabItem>
    </Tabs>

    <details>
      <summary>Example response:</summary>
      
    </details>
  </SplitLayoutRight>
</SplitLayoutContainer>

---
## Transaction Execution Levels {#tx-status-result}

All the methods listed above have `wait_until` request parameter, and
`final_execution_status` response value. They correspond to the same enum
`TxExecutionStatus`. See the detailed explanation for all the options:

```rust
#[serde(rename_all = "SCREAMING_SNAKE_CASE")]
pub enum TxExecutionStatus {
  /// Transaction is waiting to be included into the block
  None,
  /// Transaction is included into the block. The block may be not finalized yet
  Included,
  /// Transaction is included into the block +
  /// All non-refund transaction receipts finished their execution.
  /// The corresponding blocks for tx and each receipt may be not finalized yet
  #[default]
  ExecutedOptimistic,
  /// Transaction is included into finalized block
  IncludedFinal,
  /// Transaction is included into finalized block +
  /// All non-refund transaction receipts finished their execution.
  /// The corresponding blocks for each receipt may be not finalized yet
  Executed,
  /// Transaction is included into finalized block +
  /// Execution of all transaction receipts is finalized, including refund receipts
  Final,
}
```

---

# Deprecated methods {#deprecated}

## [deprecated] Send transaction (async) {#send-transaction-async}

<SplitLayoutContainer>
  <SplitLayoutLeft title="Description">
    Consider using [`send_tx`](/api/rpc/transactions#send-tx) instead

    Sends a transaction and immediately returns transaction hash.

    - **method**: `broadcast_tx_async`
    - **params**: [SignedTransaction encoded in base64]
  </SplitLayoutLeft>
  <SplitLayoutRight title="Example">
    <Tabs groupId="code-tabs">
      <TabItem value="json" label="JSON" default>
        ```json
        {
          "jsonrpc": "2.0",
          "id": "dontcare",
          "method": "send_tx",
          "params": {
        "signed_tx_base64": "SIGNED_TRANSACTION_BASE64_ENCODED"
      }
        }
        ```
      </TabItem>
      <TabItem value="http" label="HTTPie">
        ```bash
        http POST https://rpc.testnet.near.org \
          jsonrpc=2.0 \
          id=dontcare \
          method=send_tx \
          params:='{"signed_tx_base64": "SIGNED_TRANSACTION_BASE64_ENCODED"}'
        ```
      </TabItem>
    </Tabs>

    <details>
      <summary>Example response:</summary>
      
    </details>

    Final transaction results can be queried using [Transaction Status](#transaction-status)
    or [NearBlocks Explorer](https://testnet.nearblocks.io/) using the above
    `result` hash returning a result similar to the example below.

    ![NEAR-Explorer-transactionHash](/docs/assets/api/NEAR-Explorer-transactionHash.png)
  </SplitLayoutRight>
</SplitLayoutContainer>
---
## [deprecated] Send transaction (await) {#send-transaction-await}

<SplitLayoutContainer>
  <SplitLayoutLeft title="Description">
    Consider using [`send_tx`](/api/rpc/transactions#send-tx) instead

    Sends a transaction and waits until transaction is fully complete. _(Has a 10 second timeout)_

    - **method**: `broadcast_tx_commit`
    - **params**: `[SignedTransaction encoded in base64]`
  </SplitLayoutLeft>
  <SplitLayoutRight title="Example">
    <Tabs groupId="code-tabs">
      <TabItem value="json" label="JSON" default>
        ```json
        {
          "jsonrpc": "2.0",
          "id": "dontcare",
          "method": "send_tx",
          "params": {
        "signed_tx_base64": "SIGNED_TRANSACTION_BASE64_ENCODED"
      }
        }
        ```
      </TabItem>
      <TabItem value="http" label="HTTPie">
        ```bash
        http POST https://rpc.testnet.near.org \
          jsonrpc=2.0 \
          id=dontcare \
          method=send_tx \
          params:='{"signed_tx_base64": "SIGNED_TRANSACTION_BASE64_ENCODED"}'
        ```
      </TabItem>
    </Tabs>

    <details>
      <summary>Example response: </summary>
      
    </details>
  </SplitLayoutRight>
</SplitLayoutContainer>
---
