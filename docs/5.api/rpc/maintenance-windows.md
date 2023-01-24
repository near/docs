---
id: maintenance-windows
title: Maintenance Windows
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The RPC API enables you to query future maintenance windows for a specific validator in current epoch

---

## Maintenance windows {#maintenance-windows}

> The maintenance windows for a specific validator are future block height ranges in current epoch, in which the validator does not need produce block or chunk
> If the provided account is not a validator, then it will return the range from now to the end of the epoch.


- method: `EXPERIMENTAL_maintenance_windows`
- params:
  - `account_id`


example:


<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "EXPERIMENTAL_maintenance_windows",
  "params": {
    "account_id": "node0"
  }
}
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=EXPERIMENTAL_maintenance_windows \
  params:='{
    "account_id": "node0"
  }'
```

</TabItem>
</Tabs>

<details>
<summary>Example response:</summary>
<p>
The result will be a list of future maintenance windows in current epoch.
For example a window `[1028, 1031]` includes 1028, 1029 and 1030.

```json
{
    "jsonrpc": "2.0",
    "result": [
        [
            1028,
            1031
        ],
        [
            1034,
            1038
        ],
    ],
    "id": "dontcare"
}
```

</p>
</details>

#### What Could Go Wrong?? {#what-could-go-wrong}

When API request fails, RPC server returns a structured error response with a limited number of well-defined error variants, so client code can exhaustively handle all the possible error cases. Our JSON-RPC errors follow [verror](https://github.com/joyent/node-verror) convention for structuring the error response:


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

Here is the exhaustive list of the error variants that can be returned by `maintenance_windows` method:

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
