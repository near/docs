---
id: gas
title: Gas
description: "Query gas prices for specific blocks or hashes using the NEAR RPC API."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { TryOutOnLantstool } from '@site/src/components/lantstool/TryOutOnLantstool';
import { LantstoolLabel } from '@site/src/components/lantstool/LantstoolLabel/LantstoolLabel';

The RPC API enables you to query the gas price for a specific block or hash.

---
## Gas Price {#gas-price}

> Returns gas price for a specific `block_height` or `block_hash`.
>
> - Using `[null]` will return the most recent block's gas price.

- method: `gas_price`
- params: `[block_height]`, `["block_hash"]`, or `[null]`

`null` example:

<Tabs groupId="code-tabs">
  <TabItem value="json" label="JSON" default>
    ```json
    {
      "jsonrpc": "2.0",
      "id": "dontcare",
      "method": "gas_price",
      "params": {}
    }
    ```
  </TabItem>
  <TabItem value="js" label="JavaScript">
    ```js
    const response = await near.connection.provider.gasPrice(null);
    ```
  </TabItem>
  <TabItem value="http" label="HTTPie">
    ```bash
    http POST https://rpc.testnet.near.org \
      jsonrpc=2.0 \
      id=dontcare \
      method=gas_price \
      params:="[null]"
    ```
  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/5.api/rpc/gas/get-latest-gas-price.json" />
  </TabItem>
</Tabs>

`block_height` example:

<Tabs groupId="code-tabs">
  <TabItem value="json" label="JSON" default>
    ```json
    {
      "jsonrpc": "2.0",
      "id": "dontcare",
      "method": "gas_price",
      "params": {}
    }
    ```
  </TabItem>
  <TabItem value="js" label="JavaScript">
    ```js
    const response = await near.connection.provider.gasPrice(null);
    ```
  </TabItem>
  <TabItem value="http" label="HTTPie">
    ```bash
    http POST https://rpc.testnet.near.org \
      jsonrpc=2.0 \
      id=dontcare \
      method=gas_price \
      params:="[null]"
    ```
  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/5.api/rpc/gas/get-gas-price-by-block-height.json" />
  </TabItem>
</Tabs>

`block_hash` example:

<Tabs groupId="code-tabs">
  <TabItem value="json" label="JSON" default>
    ```json
    {
      "jsonrpc": "2.0",
      "id": "dontcare",
      "method": "gas_price",
      "params": {}
    }
    ```
  </TabItem>
  <TabItem value="js" label="JavaScript">
    ```js
    const response = await near.connection.provider.gasPrice(null);
    ```
  </TabItem>
  <TabItem value="http" label="HTTPie">
    ```bash
    http POST https://rpc.testnet.near.org \
      jsonrpc=2.0 \
      id=dontcare \
      method=gas_price \
      params:="[null]"
    ```
  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/5.api/rpc/gas/get-gas-price-by-block-hash.json" />
  </TabItem>
</Tabs>

<details>
  <summary>Example response:</summary>
  
</details>

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
