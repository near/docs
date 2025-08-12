---
id: transactions
title: RPC Endpoints
sidebar_label: Transactions
description: "Send transactions and query their status using the NEAR RPC API, including transaction status, receipts, and deprecated methods."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { TryOutOnLantstool } from '@site/src/components/lantstool/TryOutOnLantstool';
import { LantstoolLabel } from '@site/src/components/lantstool/LantstoolLabel/LantstoolLabel';

The RPC API enables you to send transactions and query their status.

---
## Send transaction {#send-tx}

> Sends transaction.
> Returns the guaranteed execution status and the results the blockchain can provide at the moment.

- method: `send_tx`
- params:
  - `signed_tx_base64`: SignedTransaction encoded in base64
  - [Optional] `wait_until`: the required minimal execution level.
    The default value is `EXECUTED_OPTIMISTIC`.
    [Read more here](#tx-status-result).

Using `send_tx` with `wait_until = NONE` is equal to legacy `broadcast_tx_async` method. <br />
Using `send_tx` with finality `wait_until = EXECUTED_OPTIMISTIC` is equal to legacy `broadcast_tx_commit` method.

Example:

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

#### What could go wrong? {#what-could-go-wrong-send-tx}

Here is the exhaustive list of the error variants that can be returned:

<table className="custom-stripe">
  <thead>
    <tr>
      <th>ERROR_TYPE<br /><code>error.name</code></th>
      <th>ERROR_CAUSE<br /><code>error.cause.name</code></th>
      <th>Status Code</th>
      <th>Reason</th>
      <th>Solution</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>INTERNAL_ERROR</td>
      <td>INTERNAL_ERROR</td>
      <td>500</td>
      <td>Something went wrong with the node itself or overloaded</td>
      <td>
        <ul>
          <li>Try again later</li>
          <li>Send a request to a different node</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>
<table className="custom-stripe">
  <thead>
    <tr>
      <th>ERROR_TYPE<br /><code>error.name</code></th>
      <th>ERROR_CAUSE<br /><code>error.cause.name</code></th>
      <th>Status Code</th>
      <th>Reason</th>
      <th>Solution</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>INTERNAL_ERROR</td>
      <td>INTERNAL_ERROR</td>
      <td>500</td>
      <td>Something went wrong with the node itself or overloaded</td>
      <td>
        <ul>
          <li>Try again later</li>
          <li>Send a request to a different node</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>
---
## Transaction Status {#transaction-status}

> Queries status of a transaction by hash and returns the final transaction result.

- method: `tx`
- params:
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

Example:

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

#### What could go wrong? {#what-could-go-wrong-2}

Here is the exhaustive list of the error variants that can be returned:

<table className="custom-stripe">
  <thead>
    <tr>
      <th>ERROR_TYPE<br /><code>error.name</code></th>
      <th>ERROR_CAUSE<br /><code>error.cause.name</code></th>
      <th>Status Code</th>
      <th>Reason</th>
      <th>Solution</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>INTERNAL_ERROR</td>
      <td>INTERNAL_ERROR</td>
      <td>500</td>
      <td>Something went wrong with the node itself or overloaded</td>
      <td>
        <ul>
          <li>Try again later</li>
          <li>Send a request to a different node</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>
<table className="custom-stripe">
  <thead>
    <tr>
      <th>ERROR_TYPE<br /><code>error.name</code></th>
      <th>ERROR_CAUSE<br /><code>error.cause.name</code></th>
      <th>Status Code</th>
      <th>Reason</th>
      <th>Solution</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>INTERNAL_ERROR</td>
      <td>INTERNAL_ERROR</td>
      <td>500</td>
      <td>Something went wrong with the node itself or overloaded</td>
      <td>
        <ul>
          <li>Try again later</li>
          <li>Send a request to a different node</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>
---
## Transaction Status with Receipts {#transaction-status-with-receipts}

> Queries status of a transaction by hash, returning the final transaction
> result _and_ details of all receipts.

- method: `EXPERIMENTAL_tx_status`
- params:
  - `tx_hash` _(see [NearBlocks Explorer](https://testnet.nearblocks.io) for a valid transaction hash)_
  - `sender_account_id` _(used to determine which shard to query for transaction)_
  - [Optional] `wait_until`: the required minimal execution level.
    The default value is `EXECUTED_OPTIMISTIC`.
    Read more [here](/api/rpc/transactions#tx-status-result).

A Transaction status request with `wait_until != NONE` will wait until the
transaction appears on the blockchain. If the transaction does not exist,
the method will wait until the timeout is reached. If you only need to check
whether the transaction exists, use `wait_until = NONE`, it will return the response immediately.

Example:

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

#### What could go wrong? {#what-could-go-wrong-3}

Here is the exhaustive list of the error variants that can be returned:

<table className="custom-stripe">
  <thead>
    <tr>
      <th>ERROR_TYPE<br /><code>error.name</code></th>
      <th>ERROR_CAUSE<br /><code>error.cause.name</code></th>
      <th>Status Code</th>
      <th>Reason</th>
      <th>Solution</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>INTERNAL_ERROR</td>
      <td>INTERNAL_ERROR</td>
      <td>500</td>
      <td>Something went wrong with the node itself or overloaded</td>
      <td>
        <ul>
          <li>Try again later</li>
          <li>Send a request to a different node</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>
<table className="custom-stripe">
  <thead>
    <tr>
      <th>ERROR_TYPE<br /><code>error.name</code></th>
      <th>ERROR_CAUSE<br /><code>error.cause.name</code></th>
      <th>Status Code</th>
      <th>Reason</th>
      <th>Solution</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>INTERNAL_ERROR</td>
      <td>INTERNAL_ERROR</td>
      <td>500</td>
      <td>Something went wrong with the node itself or overloaded</td>
      <td>
        <ul>
          <li>Try again later</li>
          <li>Send a request to a different node</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>
---
## Receipt by ID {#receipt-by-id}

> Fetches a receipt by its ID (as is, without a status or execution outcome)

- method: `EXPERIMENTAL_receipt`
- params:
  - `receipt_id` _(see [NearBlocks Explorer](https://testnet.nearblocks.io) for a valid receipt id)_

Example:

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

#### What could go wrong? {#what-could-go-wrong-4}

Here is the exhaustive list of the error variants that can be returned:

<table className="custom-stripe">
  <thead>
    <tr>
      <th>ERROR_TYPE<br /><code>error.name</code></th>
      <th>ERROR_CAUSE<br /><code>error.cause.name</code></th>
      <th>Status Code</th>
      <th>Reason</th>
      <th>Solution</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>INTERNAL_ERROR</td>
      <td>INTERNAL_ERROR</td>
      <td>500</td>
      <td>Something went wrong with the node itself or overloaded</td>
      <td>
        <ul>
          <li>Try again later</li>
          <li>Send a request to a different node</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>
<table className="custom-stripe">
  <thead>
    <tr>
      <th>ERROR_TYPE<br /><code>error.name</code></th>
      <th>ERROR_CAUSE<br /><code>error.cause.name</code></th>
      <th>Status Code</th>
      <th>Reason</th>
      <th>Solution</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>INTERNAL_ERROR</td>
      <td>INTERNAL_ERROR</td>
      <td>500</td>
      <td>Something went wrong with the node itself or overloaded</td>
      <td>
        <ul>
          <li>Try again later</li>
          <li>Send a request to a different node</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>
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

> Consider using [`send_tx`](/api/rpc/transactions#send-tx) instead

> Sends a transaction and immediately returns transaction hash.

- method: `broadcast_tx_async`
- params: [SignedTransaction encoded in base64]

Example:

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

#### What could go wrong? {#what-could-go-wrong}

Here is the exhaustive list of the error variants that can be returned:

<table className="custom-stripe">
  <thead>
    <tr>
      <th>ERROR_TYPE<br /><code>error.name</code></th>
      <th>ERROR_CAUSE<br /><code>error.cause.name</code></th>
      <th>Status Code</th>
      <th>Reason</th>
      <th>Solution</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>INTERNAL_ERROR</td>
      <td>INTERNAL_ERROR</td>
      <td>500</td>
      <td>Something went wrong with the node itself or overloaded</td>
      <td>
        <ul>
          <li>Try again later</li>
          <li>Send a request to a different node</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>
<table className="custom-stripe">
  <thead>
    <tr>
      <th>ERROR_TYPE<br /><code>error.name</code></th>
      <th>ERROR_CAUSE<br /><code>error.cause.name</code></th>
      <th>Status Code</th>
      <th>Reason</th>
      <th>Solution</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>INTERNAL_ERROR</td>
      <td>INTERNAL_ERROR</td>
      <td>500</td>
      <td>Something went wrong with the node itself or overloaded</td>
      <td>
        <ul>
          <li>Try again later</li>
          <li>Send a request to a different node</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>
---
## [deprecated] Send transaction (await) {#send-transaction-await}

> Consider using [`send_tx`](/api/rpc/transactions#send-tx) instead

> Sends a transaction and waits until transaction is fully complete. _(Has a 10 second timeout)_

- method: `broadcast_tx_commit`
- params: `[SignedTransaction encoded in base64]`

Example:

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

#### What could go wrong? {#what-could-go-wrong-1}

Here is the exhaustive list of the error variants that can be returned:

<table className="custom-stripe">
  <thead>
    <tr>
      <th>ERROR_TYPE<br /><code>error.name</code></th>
      <th>ERROR_CAUSE<br /><code>error.cause.name</code></th>
      <th>Status Code</th>
      <th>Reason</th>
      <th>Solution</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>INTERNAL_ERROR</td>
      <td>INTERNAL_ERROR</td>
      <td>500</td>
      <td>Something went wrong with the node itself or overloaded</td>
      <td>
        <ul>
          <li>Try again later</li>
          <li>Send a request to a different node</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>
<table className="custom-stripe">
  <thead>
    <tr>
      <th>ERROR_TYPE<br /><code>error.name</code></th>
      <th>ERROR_CAUSE<br /><code>error.cause.name</code></th>
      <th>Status Code</th>
      <th>Reason</th>
      <th>Solution</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>INTERNAL_ERROR</td>
      <td>INTERNAL_ERROR</td>
      <td>500</td>
      <td>Something went wrong with the node itself or overloaded</td>
      <td>
        <ul>
          <li>Try again later</li>
          <li>Send a request to a different node</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>
---
