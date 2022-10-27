---
id: maintenance-window
title: Maintenance Window
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The RPC API enables you to query a future maintenance window for a specific validator in current epoch

---

## Maintenance window {#maintenance-window}

> The maintenance window for a specific validator is a future block height range in current epoch, in which the validator do not need produce block or chunk


- method: `maintenance_window`
- params:
  - `account_id`


example:


<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "maintenance_window",
  "params": {
    "account_id": "node0"
  }
}
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=maintenance_window \
  params:='{
    "account_id": "node0"
  }'
```

<details>
<summary>Example response:</summary>
<p>

```json
{
    "jsonrpc": "2.0",
    "result": [
        1028,
        1031
    ],
    "id": "dontcare"
}
```

</p>
</details>

#### What Could Go Wrong?? {#what-could-go-wrong}

If the maintenance window is non-exist the result will be `null`, and it is not possible happen with a sigle point in the blockchain.  When API request fails, RPC server returns a structured error response with a limited number of well-defined error variants, so client code can exhaustively handle all the possible error cases. Our JSON-RPC errors follow [verror](https://github.com/joyent/node-verror) convention for structuring the error response:


```json
{
    "error": {
        "name": <ERROR_TYPE>,
        "cause": {
            "info": {..},
            "name": <ERROR_CAUSE>
        },
        "code": -32000,
        "data": String,
        "message": "Server error",
    },
    "id": "dontcare",
    "jsonrpc": "2.0"
}
```

Here is the exhaustive list of the error variants that can be returned by `maintenance_window` method:

<table class="custom-stripe">
  <thead>
    <tr>
      <th>
        ERROR_TYPE<br />
        <code>error.name</code>
      </th>
      <th>ERROR_CAUSE<br /><code>error.cause.name</code></th>
      <th>Reason</th>
      <th>Solution</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>INTERNAL_ERROR</td>
      <td>INTERNAL_ERROR</td>
      <td>Something went wrong with the node itself or overloaded</td>
      <td>
        <ul>
          <li>Try again later</li>
          <li>Send a request to a different node</li>
          <li>Check <code>error.cause.info</code> for more details</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>
