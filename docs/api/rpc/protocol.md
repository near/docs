---
id: protocol
title: Protocol
description: "Retrieve current genesis and protocol configuration using the NEAR RPC API, including network parameters and protocol versions."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { TryOutOnLantstool } from '@site/src/components/lantstool/TryOutOnLantstool';
import { LantstoolLabel } from '@site/src/components/lantstool/LantstoolLabel/LantstoolLabel';

The RPC API enables you to retrieve the current genesis and protocol configuration.

---
## Genesis Config {#genesis-config}

> Returns current genesis configuration.

- method: `EXPERIMENTAL_genesis_config`
- params: _none_

Example:

<Tabs groupId="code-tabs">
  <TabItem value="json" label="JSON" default>
    ```json
    {
      "jsonrpc": "2.0",
      "id": "dontcare",
      "method": "EXPERIMENTAL_genesis_config",
      "params": {}
    }
    ```
  </TabItem>
  <TabItem value="js" label="JavaScript">
    ```js
    const response = await near.connection.provider.experimental_genesisConfig();
    ```
  </TabItem>
  <TabItem value="http" label="HTTPie">
    ```bash
    http POST https://rpc.testnet.near.org \
      jsonrpc=2.0 \
      id=dontcare \
      method=EXPERIMENTAL_genesis_config \
      params:='{}'
    ```
  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/5.api/rpc/protocol/get-genesis-config.json" />
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
## Protocol Config {#protocol-config}

> Returns most recent protocol configuration or a specific queried block.
> Useful for finding current storage and transaction costs.

- method: `EXPERIMENTAL_protocol_config`
- params:
  - [`finality`](/api/rpc/setup#using-finality-param) _OR_ [`block_id`](/api/rpc/setup#using-block_id-param)

Example:

<Tabs groupId="code-tabs">
  <TabItem value="json" label="JSON" default>
    ```json
    {
      "jsonrpc": "2.0",
      "id": "dontcare",
      "method": "EXPERIMENTAL_genesis_config",
      "params": {}
    }
    ```
  </TabItem>
  <TabItem value="js" label="JavaScript">
    ```js
    const response = await near.connection.provider.experimental_genesisConfig();
    ```
  </TabItem>
  <TabItem value="http" label="HTTPie">
    ```bash
    http POST https://rpc.testnet.near.org \
      jsonrpc=2.0 \
      id=dontcare \
      method=EXPERIMENTAL_genesis_config \
      params:='{}'
    ```
  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/5.api/rpc/protocol/get-protocol-config.json" />
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
