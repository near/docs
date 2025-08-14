---
id: maintenance-windows
title: Maintenance Windows
description: "Query future maintenance windows for validators in the current epoch using the NEAR RPC API."
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { TryOutOnLantstool } from '@site/src/components/lantstool/TryOutOnLantstool';
import { LantstoolLabel } from '@site/src/components/lantstool/LantstoolLabel/LantstoolLabel';
import { SplitLayoutContainer, SplitLayoutLeft, SplitLayoutRight } from '@site/src/components/SplitLayout';

The RPC API enables you to query future maintenance windows for a specific validator 
in current epoch

---

## Maintenance windows {#maintenance-windows}

<SplitLayoutContainer>
  <SplitLayoutLeft title="Description">
    The maintenance windows for a specific validator are future block height
    ranges in current epoch, in which the validator does not need produce block or chunk
    If the provided account is not a validator, then it will return the range
    from now to the end of the epoch.

    - **method**: `EXPERIMENTAL_maintenance_windows`
    - **params**:
      - `account_id`
  </SplitLayoutLeft>
  <SplitLayoutRight title="Example">
    <Tabs groupId="code-tabs">
      <TabItem value="json" label="JSON" default>
        ```json
        {
          "jsonrpc": "2.0",
          "id": "dontcare",
          "method": "EXPERIMENTAL_maintenance_windows",
          "params": {
            "account_id": "validator.pool.testnet"
          }
        }
        ```
      </TabItem>
      <TabItem value="http" label="HTTPie">
        ```bash
        http POST https://rpc.testnet.near.org \
          jsonrpc=2.0 \
          id=dontcare \
          method=EXPERIMENTAL_maintenance_windows \
          params:='{"account_id": "validator.pool.testnet"}'
        ```
      </TabItem>
      <TabItem value="Lantstool" label={<LantstoolLabel />}>
        <TryOutOnLantstool path="docs/5.api/rpc/maintenance-windows/get-maintenance-windows.json" />
      </TabItem>
    </Tabs>
  </SplitLayoutRight>
</SplitLayoutContainer>

<details>
  <summary>Example response:</summary>
  <p>
    The result will be a list of future maintenance windows in current epoch. For example a window
    `[1028, 1031]` includes 1028, 1029 and 1030.
    
  </p>
</details>

---
