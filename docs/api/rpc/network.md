---
id: network
title: Network
description: "Query status information for nodes and validators in the NEAR network, including node status, network info, and validation status."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { TryOutOnLantstool } from '@site/src/components/lantstool/TryOutOnLantstool';
import { LantstoolLabel } from '@site/src/components/lantstool/LantstoolLabel/LantstoolLabel';

The RPC API enables you to query status information for nodes and validators.

---
## Node Status {#node-status}

> Returns general status of a given node (sync status, nearcore node version,
> protocol version, etc.), and the current set of validators.

- method: `status`
- params: `[]`

Example:

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
      params:='{}'
    ```
  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/5.api/rpc/network/get-node-status.json" />
  </TabItem>
</Tabs>

<details>
  <summary>Example response: </summary>
  
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
## Network Info {#network-info}

> Returns the current state of node network connections (active peers, transmitted data, etc.)

- method: `network_info`
- params: _none_

Example:

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
  <TabItem value="http" label="HTTPie">
    ```bash
    http POST https://rpc.testnet.near.org \
      jsonrpc=2.0 \
      id=dontcare \
      method=status \
      params:='{}'
    ```
  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/5.api/rpc/network/get-network-info.json" />
  </TabItem>
</Tabs>

<details>
  <summary>Example response:</summary>
  
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
## Validation Status {#validation-status}

> Queries active validators on the network returning details and the state of
> validation on the blockchain.

- method: `validators`
- params:
  - `epoch_id` _OR_ `[null]`

**Note:**
You can obtain the `epoch_id` from a block that belongs to a specific epoch. <br />
If you want to retrieve the current list of validators, pass `null` as the parameter. <br />
Additionally, you can query validators for past epochs by providing the `epoch_id`
of the desired past epoch.

`null` example:

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
  <TabItem value="http" label="HTTPie">
    ```bash
    http POST https://rpc.testnet.near.org \
      jsonrpc=2.0 \
      id=dontcare \
      method=status \
      params:='{}'
    ```
  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/5.api/rpc/network/get-latest-validators.json" />
  </TabItem>
</Tabs>

`epoch_id` example:

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
  <TabItem value="http" label="HTTPie">
    ```bash
    http POST https://rpc.testnet.near.org \
      jsonrpc=2.0 \
      id=dontcare \
      method=status \
      params:='{}'
    ```
  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/5.api/rpc/network/get-validators-by-epoch-id.json" />
  </TabItem>
</Tabs>

<details>
  <summary>Example response: </summary>
  
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
