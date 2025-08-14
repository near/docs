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
          params:='{}'
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
  </SplitLayoutRight>
</SplitLayoutContainer>

<details>
  <summary>Example response:</summary>
  
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
  </SplitLayoutRight>
</SplitLayoutContainer>

<details>
  <summary>Example response: </summary>
  
</details>
---
