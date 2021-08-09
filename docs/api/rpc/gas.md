---
id: gas
title: RPC Endpoints
sidebar_label: Gas
---

## Gas

---

### Gas Price

> Returns gas price for a specific `block_height` or `block_hash`.
>
> - Using `[null]` will return the most recent block's gas price.

- method: `gas_price`
- params: `[block_height]`, `["block_hash"]`, or `[null]`

`[block_height]`

<!--DOCUSAURUS_CODE_TABS-->

<!--JSON-->

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "gas_price",
  "params": [17824600]
}
```

<!--JavaScript-->

```js
const response = await near.connection.provider.gasPrice(17824600);
```

<!--HTTPie-->

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 method=gas_price params:='[17824600]' id=dontcare
```

<!--END_DOCUSAURUS_CODE_TABS-->

`["block_hash"]`

<!--DOCUSAURUS_CODE_TABS-->

<!--JSON-->

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "gas_price",
  "params": ["AXa8CHDQSA8RdFCt12rtpFraVq4fDUgJbLPxwbaZcZrj"]
}
```

<!--JavaScript-->

```js
const response = await near.connection.provider.gasPrice(
  "AXa8CHDQSA8RdFCt12rtpFraVq4fDUgJbLPxwbaZcZrj"
);
```

<!--HTTPie-->

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 method=gas_price params:='["AXa8CHDQSA8RdFCt12rtpFraVq4fDUgJbLPxwbaZcZrj"]' id=dontcare
```

<!--END_DOCUSAURUS_CODE_TABS-->

`[null]`

<!--DOCUSAURUS_CODE_TABS-->

<!--JSON-->

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "gas_price",
  "params": [null]
}
```

<!--JavaScript-->

```js
const response = await near.connection.provider.gasPrice(null);
```

<!--HTTPie-->

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 method=gas_price params:='[null]' id=dontcare
```

<!--END_DOCUSAURUS_CODE_TABS-->

<details>
<summary>Example response: </summary>
<p>

```json
{
  "jsonrpc": "2.0",
  "result": {
    "gas_price": "100000000"
  },
  "id": "dontcare"
}
```

</p>
</details>

---
