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

The RPC API enables you to query future maintenance windows for a specific validator in the current epoch. These maintenance windows are block height ranges where the validator does not need to produce blocks or chunks.

## Quick Reference

| Method | Purpose | Parameters |
|--------|---------|------------|
| [`maintenance_windows`](#maintenance-windows) | Get validator maintenance windows | `account_id` |

---

## Maintenance windows {#maintenance-windows}

<SplitLayoutContainer>
  <SplitLayoutLeft title="Description">
    The maintenance windows for a specific validator are future block height
    ranges in current epoch, in which the validator does not need produce block or chunk.
    If the provided account is not a validator, then it will return the range
    from now to the end of the epoch.

    - **method**: `maintenance_windows`
    - **params**:
      - `account_id`: The validator account ID to query
  </SplitLayoutLeft>
  <SplitLayoutRight title="Example">
    <Tabs groupId="code-tabs">
      <TabItem value="json" label="JSON" default>
        ```json
        {
          "jsonrpc": "2.0",
          "id": "dontcare",
          "method": "maintenance_windows",
          "params": {
            "account_id": "node0"
          }
        }
        ```
      </TabItem>
      <TabItem value="http" label="HTTPie">
        ```bash
        http POST https://rpc.testnet.near.org \
          jsonrpc=2.0 \
          id=dontcare \
          method=maintenance_windows \
          params:='{
            "account_id": "node0"
          }'
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
  ```json
  {
    "jsonrpc": "2.0",
    "id": "dontcare",
    "result": [
      [1028, 1031],
      [1034, 1038]
    ]
  }
  ```
  <p>
    The result will be a list of future maintenance windows in current epoch. For example a window
    `[1028, 1031]` includes block heights 1028, 1029 and 1030.
  </p>
</details>
<details>
<summary>Error handling:</summary>

When making RPC API requests, you may encounter various errors related to network configuration, rate limiting, or request formatting. For comprehensive information about error types, causes, and solutions, see the [RPC Errors](/api/rpc/errors) documentation.

</details>
---

## Error Handling

### Common Error Types

| Error Code | Description | Solution |
|------------|-------------|----------|
| `UnknownAccount` | Account does not exist | Verify the account ID is correct and exists |
| `InvalidAccount` | Invalid account format | Use valid account ID format (e.g., `account.near`) |
| `InternalError` | Server internal error | Retry the request or try a different RPC endpoint |
| `RequestTimedOut` | Request timed out | Reduce request complexity or retry with timeout |

### Response Format

Successful responses return an array of maintenance window ranges:

- Each window is represented as `[start_height, end_height]`
- Ranges are inclusive of start height, exclusive of end height
- Empty array indicates no maintenance windows for the validator

---

## Best Practices

- **Cache results**: Maintenance windows don't change frequently during an epoch
- **Monitor epoch changes**: Query again when a new epoch starts
