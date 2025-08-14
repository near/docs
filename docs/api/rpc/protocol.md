---
id: protocol
title: Protocol
description: "Retrieve current genesis and protocol configuration using the NEAR RPC API, including network parameters and protocol versions."
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { TryOutOnLantstool } from '@site/src/components/lantstool/TryOutOnLantstool';
import { LantstoolLabel } from '@site/src/components/lantstool/LantstoolLabel/LantstoolLabel';
import { SplitLayoutContainer, SplitLayoutLeft, SplitLayoutRight } from '@site/src/components/SplitLayout';

The RPC API enables you to retrieve the current genesis and protocol configuration.

---

## Genesis Config {#genesis-config}

<SplitLayoutContainer>
  <SplitLayoutLeft title="Description">
    Returns current genesis configuration.

    - **method**: `EXPERIMENTAL_genesis_config`
    - **params**: _none_
  </SplitLayoutLeft>
  <SplitLayoutRight title="Example">
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
  </SplitLayoutRight>
</SplitLayoutContainer>
---

## Protocol Config {#protocol-config}

<SplitLayoutContainer>
  <SplitLayoutLeft title="Description">
    Returns most recent protocol configuration or a specific queried block.
    Useful for finding current storage and transaction costs.

    - **method**: `EXPERIMENTAL_protocol_config`
    - **params**:
      - [`finality`](/api/rpc/setup#using-finality-param) _OR_ [`block_id`](/api/rpc/setup#using-block_id-param)
  </SplitLayoutLeft>
  <SplitLayoutRight title="Example">
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
  </SplitLayoutRight>
</SplitLayoutContainer>

---
