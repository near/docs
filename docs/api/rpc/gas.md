---
id: gas
title: Gas
description: "Query gas prices for specific blocks or hashes using the NEAR RPC API."
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { TryOutOnLantstool } from '@site/src/components/lantstool/TryOutOnLantstool';
import { LantstoolLabel } from '@site/src/components/lantstool/LantstoolLabel/LantstoolLabel';
import { SplitLayoutContainer, SplitLayoutLeft, SplitLayoutRight } from '@site/src/components/SplitLayout';

The RPC API enables you to query the gas price for a specific block or hash.

---

## Gas Price {#gas-price}

<SplitLayoutContainer>
  <SplitLayoutLeft title="Description">
    Returns gas price for a specific `block_height` or `block_hash`.

    - Using `[null]` will return the most recent block's gas price.

    - **method**: `gas_price`
    - **params**: `[block_height]`, `["block_hash"]`, or `[null]`
  </SplitLayoutLeft>
  <SplitLayoutRight title="Example">
    **`null` example:**

    <Tabs groupId="code-tabs">
      <TabItem value="json" label="JSON" default>
        ```json
        {
          "jsonrpc": "2.0",
          "id": "dontcare",
          "method": "gas_price",
          "params": [null]
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

    **`block_height` example:**

    <Tabs groupId="code-tabs">
      <TabItem value="json" label="JSON" default>
        ```json
        {
          "jsonrpc": "2.0",
          "id": "dontcare",
          "method": "gas_price",
          "params": [17121755]
        }
        ```
      </TabItem>
      <TabItem value="js" label="JavaScript">
        ```js
        const response = await near.connection.provider.gasPrice(17121755);
        ```
      </TabItem>
      <TabItem value="http" label="HTTPie">
        ```bash
        http POST https://rpc.testnet.near.org \
          jsonrpc=2.0 \
          id=dontcare \
          method=gas_price \
          params:="[17121755]"
        ```
      </TabItem>
      <TabItem value="Lantstool" label={<LantstoolLabel />}>
        <TryOutOnLantstool path="docs/5.api/rpc/gas/get-gas-price-by-block-height.json" />
      </TabItem>
    </Tabs>

    **`block_hash` example:**

    <Tabs groupId="code-tabs">
      <TabItem value="json" label="JSON" default>
        ```json
        {
          "jsonrpc": "2.0",
          "id": "dontcare",
          "method": "gas_price",
          "params": ["AXa8CHDQSA8RdFCt12rtpFraVq4fDUgJbLPxwbaZcZrj"]
        }
        ```
      </TabItem>
      <TabItem value="js" label="JavaScript">
        ```js
        const response = await near.connection.provider.gasPrice("AXa8CHDQSA8RdFCt12rtpFraVq4fDUgJbLPxwbaZcZrj");
        ```
      </TabItem>
      <TabItem value="http" label="HTTPie">
        ```bash
        http POST https://rpc.testnet.near.org \
          jsonrpc=2.0 \
          id=dontcare \
          method=gas_price \
          params:="[\"AXa8CHDQSA8RdFCt12rtpFraVq4fDUgJbLPxwbaZcZrj\"]"
        ```
      </TabItem>
      <TabItem value="Lantstool" label={<LantstoolLabel />}>
        <TryOutOnLantstool path="docs/5.api/rpc/gas/get-gas-price-by-block-hash.json" />
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
      "gas_price": "100000000"
    },
    "id": "dontcare"
  }
  ```
</details>

---
