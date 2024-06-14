---
id: gas
title: Gas
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The RPC API enables you to query the gas price for a specific block or hash.

---

## Gas Price {#gas-price}

> Trả về giá gas cho một `block_height` hoặc `block_hash` cụ thể.
> 
> - Dùng tham số `[null]` sẽ trả về giá gas của block mới nhất.

- method: `gas_price`
- các param: `[block_height]`, `["block_hash"]`, hoặc `[null]`

`[block_height]`

<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "gas_price",
  "params": [17824600]
}
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js
const response = await near.connection.provider.gasPrice(17824600);
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 method=gas_price params:='[17824600]' id=dontcare
```

</TabItem>
</Tabs>

`["block_hash"]`

<Tabs>
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
const response = await near.connection.provider.gasPrice(
  "AXa8CHDQSA8RdFCt12rtpFraVq4fDUgJbLPxwbaZcZrj"
);
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 method=gas_price params:='["AXa8CHDQSA8RdFCt12rtpFraVq4fDUgJbLPxwbaZcZrj"]' id=dontcare
```

</TabItem>
</Tabs>

`[null]`

<Tabs>
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
http post https://rpc.testnet.near.org jsonrpc=2.0 method=gas_price params:='[null]' id=dontcare
```

</TabItem>
</Tabs>

<details>
<summary>Ví dụ về response nhận được: </summary>
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

#### Sự cố nào có thể xảy ra? {#what-could-go-wrong}

Khi API request không thành công, RPC server sẽ trả về một error response được cấu trúc sẵn, với một số lượng giới hạn các error variant đã được định nghĩa rõ ràng, từ đó client code có thể handle toàn bộ các error case có thể xảy ra. Các JSON-RPC error của chúng tôi tuân theo quy ước [verror](https://github.com/joyent/node-verror) để cấu trúc cho error response:


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

> **Chú ý**
> 
> Các field `code`, `data`, và `message` trong structure trên là những field kế thừa từ Verror và có thể không được dùng nữa trong tương lai. Do đó vui lòng không sử dụng chúng.

Dưới đây là danh sách đầy đủ các error variant có thể được trả về bởi method `gas_price`:

<table>
  <thead>
    <tr>
      <th>
        ERROR_TYPE<br />
        <code>error.name</code>
      </th>
      <th>ERROR_CAUSE<br /><code>error.cause.name</code></th>
      <th>Nguyên nhân</th>
      <th>Giải pháp</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>HANDLER_ERROR</td>
      <td>UNKNOWN_BLOCK</td>
      <td>Block đang được request chưa được tạo ra, hoặc nó đã được garbage-collect (dọn dẹp để tiết kiệm dung lượng trên node RPC)</td>
      <td>
        <ul>
          <li>Kiểm tra xem block được request có hợp lệ không</li>
          <li>Nếu block đã được produce hơn 5 epoch trước đó, hãy thử send request của bạn đến một archival node</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>REQUEST_VALIDATION_ERROR</td>
      <td>PARSE_ERROR</td>
      <td>Đã pass các argument mà JSON RPC server không thể parse được (thiếu các argument, sai format, v.v...)</td>
      <td>
        <ul>
          <li>Kiểm tra lại các argument đã pass và pass lại cho đúng</li>
          <li>Kiểm tra <code>error.cause.info</code> để biết thêm chi tiết</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>INTERNAL_ERROR</td>
      <td>INTERNAL_ERROR</td>
      <td>Đã xảy ra lỗi với chính node đó, hoặc bị overload</td>
      <td>
        <ul>
          <li>Hãy thử lại sau</li>
          <li>Gởi một request đến một node khác</li>
          <li>Kiểm tra <code>error.cause.info</code> để biết thêm chi tiết</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

---
