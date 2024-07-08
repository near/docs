---
id: contracts
title: Các RPC Endpoint
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Ví dụ:

---

## View account {#view-account}

> Trả về thông tin cơ bản account.

- method: `query`
- các param:
  - `request_type`: `view_account`
  - [`finality`](/api/rpc/setup#using-finality-param) _HOẶC_ [`block_id`](/api/rpc/setup#using-block_id-param)
  - `account_id`: _`"example.testnet"`_

Ví dụ về response nhận được:

<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "query",
  "params": {
    "request_type": "view_account",
    "finality": "final",
    "account_id": "nearkat.testnet"
  }
}
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js
const response = await near.connection.provider.query({
  request_type: "view_account",
  finality: "final",
  account_id: "nearkat.testnet",
});
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=query \
  params:='{
    "request_type": "view_account",
    "finality": "final",
    "account_id": "nearkat.testnet"
  }'
```

</TabItem>
</Tabs>

<details>
<summary>Các kết quả cuối cùng của transaction có thể được query qua <a href="/api/rpc/transactions#transaction-status">Transaction Status</a> hoặc <a href="https://explorer.testnet.near.org/">NEAR Explorer</a> bằng cách sử dụng <code>kết quả</code> hash được trả về như ví dụ sau đây. </summary>
<p>

```json
{
  "jsonrpc": "2.0",
  "result": {
    "amount": "399992611103597728750000000",
    "locked": "0",
    "code_hash": "11111111111111111111111111111111",
    "storage_usage": 642,
    "storage_paid_at": 0,
    "block_height": 17795474,
    "block_hash": "9MjpcnwW3TSdzGweNfPbkx8M74q1XzUcT1PAN8G5bNDz"
  },
  "id": "dontcare"
}
```

</p>
</details>

#### Sự cố nào có thể xảy ra? {#what-could-go-wrong}

Khi API request không thành công, RPC server sẽ trả về một error response được cấu trúc sẵn, với một số lượng giới hạn các error variant đã được định nghĩa rõ ràng, từ đó client code có thể handle toàn bộ các error case có thể xảy ra. Các JSON-RPC error của chúng tôi tuân theo convention [verror](https://github.com/joyent/node-verror) để cấu trúc cho error response:


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

Ví dụ:

<table className="custom-stripe">
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
      <td rowspan="5">HANDLER_ERROR</td>
      <td>UNKNOWN_BLOCK</td>
      <td>Block đang được request chưa được tạo ra, hoặc nó đã được garbage-collect (dọn dẹp để tiết kiệm dung lượng trên node RPC)</td>
      <td>
        <ul>
          <li>Kiểm tra xem block được request có hợp lệ không</li>
          <li>If the block had been produced more than 5 epochs ago, try to send your request to <a href="https://near-nodes.io/intro/node-types#archival-node" target="_blank" rel="noopener noreferrer">an archival node</a></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>INVALID_ACCOUNT</td>
      <td><code>account_id</code> đã được request không hợp lệ</td>
      <td>
        <ul>
          <li>Cung cấp một <code>account_id</code> hợp lệ</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>UNKNOWN_ACCOUNT</td>
      <td>Không tìm thấy <code>account_id</code> được request, do account chưa được tạo hoặc đã bị xóa</td>
      <td>
        <ul>
          <li>Kiểm tra lại <code>account_id</code></li>
          <li>Chỉ định một block khác, hoặc thử lại nếu bạn request state mới nhất</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>UNAVAILABLE_SHARD</td>
      <td>Node không thể tìm thấy data được request, vì nó không track đến shard mà dữ liệu tồn tại</td>
      <td>
        <ul>
          <li>Gởi một request đến node khác, node mà có thể track đến shard</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>NO_SYNCED_BLOCKS</td>
      <td>Node vẫn còn đang sync và block được request chưa có trong database</td>
      <td>
        <ul>
          <li>Chờ đến khi node sync xong</li>
          <li>Gởi một request đến một node khác đã sync xong</li>
        </ul>
      </td>
    </tr>
    <tr className="stripe">
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

## Xem các thay đổi của account {#view-account-changes}

> Trả về các thay đổi của account từ những transaction trong một account được chỉ định.

- method: `EXPERIMENTAL_changes`
- các param:
  - `changes_type`: `account_changes`
  - `account_ids`: [`"example.testnet"`]
  - [`finality`](/api/rpc/setup#using-finality-param) _HOẶC_ [`block_id`](/api/rpc/setup#using-block_id-param)

Dưới đây là danh sách đầy đủ các error variant có thể được trả về theo loại request `view_access_key_list`:

<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "EXPERIMENTAL_changes",
  "params": {
    "changes_type": "account_changes",
    "account_ids": ["your_account.testnet"],
    "block_id": 19703467
  }
}
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js
const response = await near.connection.provider.experimental_changes({
  changes_type: "account_changes",
  account_ids: ["nearkat.testnet"],
  block_id: 19703467,
});
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=EXPERIMENTAL_changes \
  params:='{
    "changes_type": "account_changes",
    "account_ids": ["your_account.testnet"],
    "block_id": 19703467
  }'
```

</TabItem>
</Tabs>

<details>
<summary>Ví dụ response nhận được: </summary>
<p>

```json
{
  "jsonrpc": "2.0",
  "result": {
    "block_hash": "6xsfPSG89s6fCMShxxxQTP6D4ZHM9xkGCgubayTDRzAP",
    "changes": [
      {
        "cause": {
          "type": "transaction_processing",
          "tx_hash": "HLvxLKFM7gohFSqXPp5SpyydNEVpAno352qJJbnddsz3"
        },
        "type": "account_update",
        "change": {
          "account_id": "your_account.testnet",
          "amount": "499999959035075000000000000",
          "locked": "0",
          "code_hash": "11111111111111111111111111111111",
          "storage_usage": 182,
          "storage_paid_at": 0
        }
      },
      {
        "cause": {
          "type": "receipt_processing",
          "receipt_hash": "CPenN1dp4DNKnb9LiL5hkPmu1WiKLMuM7msDjEZwDmwa"
        },
        "type": "account_update",
        "change": {
          "account_id": "your_account.testnet",
          "amount": "499999959035075000000000000",
          "locked": "0",
          "code_hash": "11111111111111111111111111111111",
          "storage_usage": 264,
          "storage_paid_at": 0
        }
      }
    ]
  },
  "id": "dontcare"
}
```

</p>
</details>

#### Sự cố nào có thể xảy ra? {#what-could-go-wrong-1}

Khi API request không thành công, RPC server sẽ trả về một error response được cấu trúc sẵn, với một số lượng giới hạn các error variant đã được định nghĩa rõ ràng, từ đó client code có thể handle toàn bộ các error case có thể xảy ra. Các JSON-RPC error của chúng tôi tuân theo convention [verror](https://github.com/joyent/node-verror) để cấu trúc cho error response:


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

Ví dụ:

<table className="custom-stripe">
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
      <td rowspan="2">HANDLER_ERROR</td>
      <td>UNKNOWN_BLOCK</td>
      <td>Block đang được request chưa được tạo ra, hoặc nó đã được garbage-collect (dọn dẹp để tiết kiệm dung lượng trên node RPC)</td>
      <td>
        <ul>
          <li>Kiểm tra xem block được request có hợp lệ không</li>
          <li>If the block had been produced more than 5 epochs ago, try to send your request to <a href="https://near-nodes.io/intro/node-types#archival-node" target="_blank" rel="noopener noreferrer">an archival node</a></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>NOT_SYNCED_YET</td>
      <td>Node vẫn còn đang sync và block được request chưa có trong database</td>
      <td>
        <ul>
          <li>Chờ đến khi node sync xong</li>
          <li>Gởi một request đến một node khác đã sync xong</li>
        </ul>
      </td>
    </tr>
    <tr className="stripe">
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

## Xem contract code {#view-contract-code}

> Trả về contract code (Wasm binary) đã được deploy trên account. Hãy lưu ý rằng code được trả về sẽ được encode bằng base64.

- method: `query`
- các param:
  - `request_type`: `view_code`
  - [`finality`](/api/rpc/setup#using-finality-param) _HOẶC_ [`block_id`](/api/rpc/setup#using-block_id-param)
  - `account_id`: `"guest-book.testnet"`,

Dưới đây là danh sách đầy đủ các error variant có thể được trả về theo loại request `view_access_key_list`:

<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "query",
  "params": {
    "request_type": "view_code",
    "finality": "final",
    "account_id": "guest-book.testnet"
  }
}
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js
const response = await near.connection.provider.query({
  request_type: "view_code",
  finality: "final",
  account_id: "guest-book.testnet",
});
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=query \
  params:='{
    "request_type": "view_code",
    "finality": "final",
    "account_id": "guest-book.testnet"
  }'
```

</TabItem>
</Tabs>

<details>
<summary>Các kết quả cuối cùng của transaction có thể được query qua <a href="/api/rpc/transactions#transaction-status">Transaction Status</a> hoặc <a href="https://explorer.testnet.near.org/">NEAR Explorer</a> bằng cách sử dụng <code>kết quả</code> hash được trả về như ví dụ sau đây. </summary>
<p>

```json
{
  "jsonrpc": "2.0",
  "result": {
    "code_base64": "47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=",
    "hash": "7KoFshMQkdyo5iTx8P2LbLu9jQpxRn24d27FrKShNVXs",
    "block_height": 17814234,
    "block_hash": "GT1D8nweVQU1zyCUv399x8vDv2ogVq71w17MyR66hXBB"
  },
  "id": "dontcare"
}
```

</p>
</details>

#### Sự cố nào có thể xảy ra? {#what-could-go-wrong-2}

Khi API request không thành công, RPC server sẽ trả về một error response được cấu trúc sẵn, với một số lượng giới hạn các error variant đã được định nghĩa rõ ràng, từ đó client code có thể handle toàn bộ các error case có thể xảy ra. Các JSON-RPC error của chúng tôi tuân theo convention [verror](https://github.com/joyent/node-verror) để cấu trúc cho error response:


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

Ví dụ:

<table className="custom-stripe">
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
      <td rowspan="6">HANDLER_ERROR</td>
      <td>UNKNOWN_BLOCK</td>
      <td>Block đang được request chưa được tạo ra, hoặc nó đã được garbage-collect (dọn dẹp để tiết kiệm dung lượng trên node RPC)</td>
      <td>
        <ul>
          <li>Kiểm tra xem block được request có hợp lệ không</li>
          <li>If the block had been produced more than 5 epochs ago, try to send your request to <a href="https://near-nodes.io/intro/node-types#archival-node" target="_blank" rel="noopener noreferrer">an archival node</a></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>INVALID_ACCOUNT</td>
      <td><code>account_id</code> đã được request không hợp lệ</td>
      <td>
        <ul>
          <li>Cung cấp một <code>account_id</code> hợp lệ</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>UNKNOWN_ACCOUNT</td>
      <td>Không tìm thấy <code>account_id</code> được request, do account chưa được tạo hoặc đã bị xóa</td>
      <td>
        <ul>
          <li>Kiểm tra lại <code>account_id</code></li>
          <li>Chỉ định một block khác, hoặc thử lại nếu bạn request state mới nhất</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>NO_CONTRACT_CODE</td>
      <td>Account không có <code>contract</code> nào được deploy trên nó</td>
      <td>
        <ul>
          <li>Dùng account khác</li>
          <li>Chỉ định một block khác hoặc thử lại nếu bạn đang request state cuối cùng</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>UNAVAILABLE_SHARD</td>
      <td>Node không thể tìm thấy data được request, vì nó không track đến shard mà dữ liệu tồn tại</td>
      <td>
        <ul>
          <li>Gởi một request đến node khác, node mà có thể track đến shard</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>NO_SYNCED_BLOCKS</td>
      <td>Node vẫn còn đang sync và block được request chưa có trong database</td>
      <td>
        <ul>
          <li>Chờ đến khi node sync xong</li>
          <li>Gởi một request đến một node khác đã sync xong</li>
        </ul>
      </td>
    </tr>
    <tr className="stripe">
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

## Xem contract state {#view-contract-state}

> Trả về state (các cặp key value) của một contract dựa trên key prefix (được encode theo base64). Truyền một string rỗng cho `prefix_base64` nếu bạn muốn trả về toàn bộ state. Hãy lưu ý rằng state được trả về sẽ cũng được encode bằng base64.

- method: `query`
- các param:
  - `request_type`: `view_state`
  - [`finality`](/api/rpc/setup#using-finality-param) _HOẶC_ [`block_id`](/api/rpc/setup#using-block_id-param)
  - `account_id`: `"guest-book.testnet"`,
  - `prefix_base64`: `""`

Dưới đây là danh sách đầy đủ các error variant có thể được trả về theo loại request `view_access_key_list`:

<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "query",
  "params": {
    "request_type": "view_state",
    "finality": "final",
    "account_id": "guest-book.testnet",
    "prefix_base64": ""
  }
}
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js
const response = await near.connection.provider.query({
  request_type: "view_state",
  finality: "final",
  account_id: "guest-book.testnet",
  prefix_base64: "",
});
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=query \
  params:='{
    "request_type": "view_state",
    "finality": "final",
    "account_id": "guest-book.testnet",
    "prefix_base64": ""
  }'
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
    "values": [
      {
        "key": "bTo6MA==",
        "value": "eyJwcmVtaXVtIjp0cnVlLCJzZW5kZXIiOiJqb3NoZm9yZC50ZXN0bmV0IiwidGV4dCI6ImhlbGxvIn0=",
        "proof": []
      },
      {
        "key": "bTo6MQ==",
        "value": "eyJwcmVtaXVtIjpmYWxzZSwic2VuZGVyIjoiY2hhZG9oIiwidGV4dCI6ImhlbGxvIGVyeWJvZHkifQ==",
        "proof": []
      },
      {
        "key": "bTo6MTA=",
        "value": "eyJwcmVtaXVtIjpmYWxzZSwic2VuZGVyIjoic2F0b3NoaWYudGVzdG5ldCIsInRleHQiOiJIaWxsbyEifQ==",
        "proof": []
      },
      {
        "key": "bTo6MTE=",
        "value": "eyJwcmVtaXVtIjpmYWxzZSwic2VuZGVyIjoidmFsZW50aW5lc29rb2wudGVzdG5ldCIsInRleHQiOiJIaSEifQ==",
        "proof": []
      },
      {
        "key": "bTo6MTI=",
        "value": "eyJwcmVtaXVtIjp0cnVlLCJzZW5kZXIiOiJobngudGVzdG5ldCIsInRleHQiOiJoZWxsbyJ9",
        "proof": []
      },
      {
        "key": "bTo6MTM=",
        "value": "eyJwcmVtaXVtIjp0cnVlLCJzZW5kZXIiOiJobngudGVzdG5ldCIsInRleHQiOiJzZCJ9",
        "proof": []
      },
      {
        "key": "bTo6MTQ=",
        "value": "eyJwcmVtaXVtIjpmYWxzZSwic2VuZGVyIjoiamdoZy50ZXN0bmV0IiwidGV4dCI6IktoZyJ9",
        "proof": []
      },
      {
        "key": "bTo6MTU=",
        "value": "eyJwcmVtaXVtIjpmYWxzZSwic2VuZGVyIjoiYWNjb3VudC50ZXN0bmV0IiwidGV4dCI6IldoZW4gSUNPPyJ9",
        "proof": []
      },
      {
        "key": "bTo6MTY=",
        "value": "eyJwcmVtaXVtIjpmYWxzZSwic2VuZGVyIjoiYWNjb3VudC50ZXN0bmV0IiwidGV4dCI6IlRlc3QgMiJ9",
        "proof": []
      },
      {
        "key": "bTo6MTc=",
        "value": "eyJwcmVtaXVtIjpmYWxzZSwic2VuZGVyIjoidGVzdC1kcm9wLTEwLnRlc3RuZXQiLCJ0ZXh0IjoiRnJlZSBtZXNzYWdlcyBhcmUgdGhlIGJlc3QifQ==",
        "proof": []
      },
      {
        "key": "bTo6MTg=",
        "value": "eyJwcmVtaXVtIjpmYWxzZSwic2VuZGVyIjoidGVzdC1kcm9wLTEwLnRlc3RuZXQiLCJ0ZXh0IjoiV2hlbiBJQ08/In0=",
        "proof": []
      },
      {
        "key": "bTo6MTk=",
        "value": "eyJwcmVtaXVtIjpmYWxzZSwic2VuZGVyIjoidGVzdC1kcm9wLTEwLnRlc3RuZXQiLCJ0ZXh0IjoiV2hlbiBJQ08/In0=",
        "proof": []
      },
      {
        "key": "bTo6Mg==",
        "value": "eyJwcmVtaXVtIjpmYWxzZSwic2VuZGVyIjoibnVsbCIsInRleHQiOiJ1bmRlZmluZWQifQ==",
        "proof": []
      },
      {
        "key": "bTo6MjA=",
        "value": "eyJwcmVtaXVtIjpmYWxzZSwic2VuZGVyIjoidGVzdC04NDEudGVzdG5ldCIsInRleHQiOiJXaGVuIElDTz8ifQ==",
        "proof": []
      },
      {
        "key": "bTo6MjE=",
        "value": "eyJwcmVtaXVtIjpmYWxzZSwic2VuZGVyIjoidGVzdC04NDEudGVzdG5ldCIsInRleHQiOiJoZXkgaGV5IGhleSJ9",
        "proof": []
      },
      {
        "key": "bTo6MjI=",
        "value": "eyJwcmVtaXVtIjpmYWxzZSwic2VuZGVyIjoiam9zaGZvcmQudGVzdG5ldCIsInRleHQiOiJoaSJ9",
        "proof": []
      },
      {
        "key": "bTo6MjM=",
        "value": "eyJwcmVtaXVtIjpmYWxzZSwic2VuZGVyIjoiam9zaGZvcmQudGVzdG5ldCIsInRleHQiOiJoaSB4MiJ9",
        "proof": []
      },
      {
        "key": "bTo6MjQ=",
        "value": "eyJwcmVtaXVtIjpmYWxzZSwic2VuZGVyIjoibWFzdGVydGh5c2VsZi50ZXN0bmV0IiwidGV4dCI6ImhhbmRzaGFrZS5oYWNrbWVkb21haW4vICJ9",
        "proof": []
      },
      {
        "key": "bTo6MjU=",
        "value": "eyJwcmVtaXVtIjp0cnVlLCJzZW5kZXIiOiJtYXN0ZXJ0aHlzZWxmLnRlc3RuZXQiLCJ0ZXh0IjoiSGVsbG8gQ29zbW9zLCBob21lLmNvc21hdHJpeGNvbm5lY3Rpb25zLyJ9",
        "proof": []
      },
      {
        "key": "bTo6MjY=",
        "value": "eyJwcmVtaXVtIjp0cnVlLCJzZW5kZXIiOiJtYXN0ZXJ0aHlzZWxmLnRlc3RuZXQiLCJ0ZXh0IjoiYnVpbGQsIGJ1aWxkLCBidWlsZCBpIGNhbWUgdG8gYnVpbGQgYSBicmlkZ2UgaW4gUEVBQ0UsIHNvIGNvbWUgbGV0cyBidWlsZC4uLnNvbmcgYnkgXCJOYWhrbyBCZWFyXCIgIn0=",
        "proof": []
      },
      {
        "key": "bTo6Mjc=",
        "value": "eyJwcmVtaXVtIjp0cnVlLCJzZW5kZXIiOiJtYXN0ZXJ0aHlzZWxmLnRlc3RuZXQiLCJ0ZXh0IjoiYnVpbGQgYSBicmlkZ2UgKGh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vdXJsP3NhPXQmcmN0PWomcT0mZXNyYz1zJnNvdXJjZT13ZWImY2Q9JmNhZD1yamEmdWFjdD04JnZlZD0yYWhVS0V3ajA0ZGlnMTlqckFoV05tbGtLSGR5X0FnUVEzeXd3QUhvRUNBVVFBZyZ1cmw9aHR0cHMlM0ElMkYlMkZ3d3cueW91dHViZS5jb20lMkZ3YXRjaCUzRnYlM0Rlb1RYNWZmOVplMCZ1c2c9QU92VmF3MFoxZzFIMkZzeF85d3FJSmg5RTk2UCkifQ==",
        "proof": []
      },
      {
        "key": "bTo6Mjg=",
        "value": "eyJwcmVtaXVtIjp0cnVlLCJzZW5kZXIiOiJtYXN0ZXJ0aHlzZWxmLnRlc3RuZXQiLCJ0ZXh0IjoiaHR0cDovL3RyaXBweS7wn42EbWFnaWMvIn0=",
        "proof": []
      },
      {
        "key": "bTo6Mjk=",
        "value": "eyJwcmVtaXVtIjp0cnVlLCJzZW5kZXIiOiJtYXN0ZXJ0aHlzZWxmLnRlc3RuZXQiLCJ0ZXh0IjoiaHR0cDovL3VuaXRlLnJhaW5ib3d0cmliZXMvIn0=",
        "proof": []
      },
      {
        "key": "bTo6Mw==",
        "value": "eyJwcmVtaXVtIjpmYWxzZSwic2VuZGVyIjoiam9zaGZvcmQudGVzdG5ldCIsInRleHQiOiJobW1tbW1tIn0=",
        "proof": []
      },
      {
        "key": "bTo6MzA=",
        "value": "eyJwcmVtaXVtIjpmYWxzZSwic2VuZGVyIjoiZXhlbXBsYXJ5LnRlc3RuZXQiLCJ0ZXh0IjoiaGVsbG8ifQ==",
        "proof": []
      },
      {
        "key": "bTo6MzE=",
        "value": "eyJwcmVtaXVtIjpmYWxzZSwic2VuZGVyIjoiYWRpMjMudGVzdG5ldCIsInRleHQiOiJobW0ifQ==",
        "proof": []
      },
      {
        "key": "bTo6MzI=",
        "value": "eyJwcmVtaXVtIjpmYWxzZSwic2VuZGVyIjoiYWRpMjMudGVzdG5ldCIsInRleHQiOiJ3aGF0In0=",
        "proof": []
      },
      {
        "key": "bTo6MzM=",
        "value": "eyJwcmVtaXVtIjpmYWxzZSwic2VuZGVyIjoidmxhZGJhc2gudGVzdG5ldCIsInRleHQiOiJIaSJ9",
        "proof": []
      },
      {
        "key": "bTo6NA==",
        "value": "eyJwcmVtaXVtIjpmYWxzZSwic2VuZGVyIjoibnVsbCIsInRleHQiOiIgIn0=",
        "proof": []
      },
      {
        "key": "bTo6NQ==",
        "value": "eyJwcmVtaXVtIjp0cnVlLCJzZW5kZXIiOiJ0ZXN0YWNjb3VudDEudGVzdG5ldCIsInRleHQiOiJ0ZXN0In0=",
        "proof": []
      },
      {
        "key": "bTo6Ng==",
        "value": "eyJwcmVtaXVtIjpmYWxzZSwic2VuZGVyIjoiZXVnZW5ldGhlZHJlYW0iLCJ0ZXh0IjoibnVsbCJ9",
        "proof": []
      },
      {
        "key": "bTo6Nw==",
        "value": "eyJwcmVtaXVtIjpmYWxzZSwic2VuZGVyIjoiZGVtby50ZXN0bmV0IiwidGV4dCI6Ikkgb25seSB3cml0ZSBmcmVlIG1lc3NhZ2VzLiJ9",
        "proof": []
      },
      {
        "key": "bTo6OA==",
        "value": "eyJwcmVtaXVtIjp0cnVlLCJzZW5kZXIiOiJqb3NoZm9yZC50ZXN0bmV0IiwidGV4dCI6IkkgcHJlZmVyIHByZW1pdW0gbWVzc2FnZXMifQ==",
        "proof": []
      },
      {
        "key": "bTo6OQ==",
        "value": "eyJwcmVtaXVtIjp0cnVlLCJzZW5kZXIiOiJuZXdsZWRnZXIzLnRlc3RuZXQiLCJ0ZXh0IjoiTGVkZ2VyIn0=",
        "proof": []
      },
      {
        "key": "bTpsZW4=",
        "value": "MzQ=",
        "proof": []
      }
    ],
    "proof": [],
    "block_height": 17814234,
    "block_hash": "GT1D8nweVQU1zyCUv399x8vDv2ogVq71w17MyR66hXBB"
  },
  "id": "dontcare"
}
```
</p>

**Note**: Currently, the response includes a `proof` field directly in the `result`, and a `proof` fields on each element of the `values` list.  In the future, the `result.proof` will be included only if the result is **not empty**, and the `proof` field will be removed from all `values`. When parsing the result, you should accept objects with or without these fields set.

</details>

> **Chú ý**
> 
> Có một giới hạn đối với các node RPC mặc định. Bạn sẽ không thể get được contract state nếu nó quá lớn. Giới hạn mặc định cho contract state là state size tối đa chỉ được 50kb. Bạn có thể thay đổi các giới hạn nếu bạn [tự chạy RPC node cho mình](https://near-nodes.io/validator/compile-and-run-a-node) với giá trị `trie_viewer_state_size_limit` đã được điều chỉnh trong `config.json`

#### Sự cố nào có thể xảy ra? {#what-could-go-wrong-3}

Khi API request không thành công, RPC server sẽ trả về một error response được cấu trúc sẵn, với một số lượng giới hạn các error variant đã được định nghĩa rõ ràng, từ đó client code có thể handle toàn bộ các error case có thể xảy ra. Các JSON-RPC error của chúng tôi tuân theo convention [verror](https://github.com/joyent/node-verror) để cấu trúc cho error response:


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

Here is the exhaustive list of the error variants that can be returned by `view_state` request type:

<table className="custom-stripe">
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
      <td rowspan="7">HANDLER_ERROR</td>
      <td>UNKNOWN_BLOCK</td>
      <td>Block đang được request chưa được tạo ra, hoặc nó đã được garbage-collect (dọn dẹp để tiết kiệm dung lượng trên node RPC)</td>
      <td>
        <ul>
          <li>Kiểm tra xem block được request có hợp lệ không</li>
          <li>If the block had been produced more than 5 epochs ago, try to send your request to <a href="https://near-nodes.io/intro/node-types#archival-node" target="_blank" rel="noopener noreferrer">an archival node</a></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>INVALID_ACCOUNT</td>
      <td><code>account_id</code> đã được request không hợp lệ</td>
      <td>
        <ul>
          <li>Cung cấp một <code>account_id</code> hợp lệ</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>UNKNOWN_ACCOUNT</td>
      <td>Không tìm thấy <code>account_id</code> được request, do account chưa được tạo hoặc đã bị xóa</td>
      <td>
        <ul>
          <li>Kiểm tra lại <code>account_id</code></li>
          <li>Chỉ định một block khác, hoặc thử lại nếu bạn đang request state mới nhất</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>NO_CONTRACT_CODE</td>
      <td>Account không có <code>contract</code> nào được deploy trên nó</td>
      <td>
        <ul>
          <li>Hãy query một account đã được deploy contract</li>
          <li>Chỉ định một block khác, hoặc thử lại nếu bạn đang request state mới nhất</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>TOO_LARGE_CONTRACT_STATE</td>
      <td>Contract state được request quá lớn để trả về từ node này (giới hạn default là 50kb cho state size)</td>
      <td>
        <ul>
          <li>Gởi request đến một node có giới hạn lớn hơn, để có thể xem được state đó</li>
          <li>Tự chạy một node của riêng bạn, để bạn có thể tăng giới hạn cho việc view state</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>UNAVAILABLE_SHARD</td>
      <td>Node không thể tìm thấy data được request, vì nó không track đến shard mà dữ liệu tồn tại</td>
      <td>
        <ul>
          <li>Gởi một request đến node khác, node mà có thể track đến shard</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>NO_SYNCED_BLOCKS</td>
      <td>Node vẫn còn đang sync và block được request chưa có trong database</td>
      <td>
        <ul>
          <li>Chờ đến khi node sync xong</li>
          <li>Gởi một request đến một node khác đã sync xong</li>
        </ul>
      </td>
    </tr>
    <tr className="stripe">
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

## Xem các thay đổi của contract state {#view-contract-state-changes}

> Trả về các chi tiết thay đổi cho state của một contract, dựa vào key prefix (được encode bằng base64). Truyền một string rỗng cho param này nếu bạn muốn trả về toàn bộ các thay đổi của state.

- method: `EXPERIMENTAL_changes`
- các param:
  - `changes_type`: `data_changes`
  - `account_ids`: `["example.testnet"]`,
  - `key_prefix_base64`: `"base64 encoded key value"`,
  - [`finality`](/api/rpc/setup#using-finality-param) _HOẶC_ [`block_id`](/api/rpc/setup#using-block_id-param)

Dưới đây là danh sách đầy đủ các error variant có thể được trả về theo loại request `view_access_key_list`:

<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "EXPERIMENTAL_changes",
  "params": {
    "changes_type": "data_changes",
    "account_ids": ["guest-book.testnet"],
    "key_prefix_base64": "",
    "block_id": 19450732
  }
}
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js
const response = await near.connection.provider.experimental_changes({
  changes_type: "data_changes",
  account_ids: ["guest-book.testnet"],
  key_prefix_base64: "",
  block_id: 19450732,
});
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=EXPERIMENTAL_changes \
  params:='{
    "changes_type": "data_changes",
    "account_ids": ["guest-book.testnet"],
    "key_prefix_base64": "",
    "block_id": 19450732
  }'
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
    "block_hash": "6U8Yd4JFZwJUNfqkD4KaKgTKmpNSmVRTSggpjmsRWdKY",
    "changes": [
      {
        "cause": {
          "type": "receipt_processing",
          "receipt_hash": "9ewznXgs2t7vRCssxW4thgaiwggnMagKybZ7ryLNTT2z"
        },
        "type": "data_update",
        "change": {
          "account_id": "guest-book.testnet",
          "key_base64": "bTo6Mzk=",
          "value_base64": "eyJwcmVtaXVtIjpmYWxzZSwic2VuZGVyIjoiZmhyLnRlc3RuZXQiLCJ0ZXh0IjoiSGkifQ=="
        }
      },
      {
        "cause": {
          "type": "receipt_processing",
          "receipt_hash": "9ewznXgs2t7vRCssxW4thgaiwggnMagKybZ7ryLNTT2z"
        },
        "type": "data_update",
        "change": {
          "account_id": "guest-book.testnet",
          "key_base64": "bTpsZW4=",
          "value_base64": "NDA="
        }
      }
    ]
  },
  "id": "dontcare"
}
```

</p>
</details>

#### Sự cố nào có thể xảy ra? {#what-could-go-wrong-4}

Khi API request không thành công, RPC server sẽ trả về một error response được cấu trúc sẵn, với một số lượng giới hạn các error variant đã được định nghĩa rõ ràng, từ đó client code có thể handle toàn bộ các error case có thể xảy ra. Các JSON-RPC error của chúng tôi tuân theo convention [verror](https://github.com/joyent/node-verror) để cấu trúc cho error response:


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

Here is the exhaustive list of the error variants that can be returned by `EXPERIMENTAL_changes` method:

<table className="custom-stripe">
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
      <td rowspan="2">HANDLER_ERROR</td>
      <td>UNKNOWN_BLOCK</td>
      <td>Block đang được request chưa được tạo ra, hoặc nó đã được garbage-collect (dọn dẹp để tiết kiệm dung lượng trên node RPC)</td>
      <td>
        <ul>
          <li>Kiểm tra xem block được request có hợp lệ không</li>
          <li>If the block had been produced more than 5 epochs ago, try to send your request to <a href="https://near-nodes.io/intro/node-types#archival-node" target="_blank" rel="noopener noreferrer">an archival node</a></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>NOT_SYNCED_YET</td>
      <td>Node vẫn còn đang sync và block được request chưa có trong database</td>
      <td>
        <ul>
          <li>Chờ đến khi node sync xong</li>
          <li>Gởi một request đến một node khác đã sync xong</li>
        </ul>
      </td>
    </tr>
    <tr className="stripe">
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

## Xem các thay đổi của contract code {#view-contract-code-changes}

> Trả về các thay đổi của code được tạo ra khi deploy một contract. Thay đổi được trả về dưới dạng WASM file được encode bằng base64.

- method: `EXPERIMENTAL_changes`
- các param:
  - `changes_type`: `contract_code_changes`
  - `account_ids`: `["example.testnet"]`,
  - [`finality`](/api/rpc/setup#using-finality-param) _HOẶC_ [`block_id`](/api/rpc/setup#using-block_id-param)

Dưới đây là danh sách đầy đủ các error variant có thể được trả về theo loại request `view_access_key_list`:

<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "EXPERIMENTAL_changes",
  "params": {
    "changes_type": "contract_code_changes",
    "account_ids": ["dev-1602714453032-7566969"],
    "block_id": 20046655
  }
}
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js
const response = await near.connection.provider.experimental_changes({
  changes_type: "contract_code_changes",
  account_ids: ["dev-1602714453032-7566969"],
  block_id: 20046655,
});
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=EXPERIMENTAL_changes \
  params:='{
    "changes_type": "contract_code_changes",
    "account_ids": ["dev-1602714453032-7566969"],
    "block_id": 20046655
  }'
```

</TabItem>
</Tabs>

<details>
<summary>Các kết quả cuối cùng của transaction có thể được query qua <a href="/api/rpc/transactions#transaction-status">Transaction Status</a> hoặc <a href="https://explorer.testnet.near.org/">NEAR Explorer</a> bằng cách sử dụng <code>kết quả</code> hash được trả về như ví dụ sau đây. </summary>
<p>

```json
{
  "jsonrpc": "2.0",
  "result": {
    "block_hash": "3yLNV5zdpzRJ8HP5xTXcF7jdFxuHnmKNUwWcok4616WZ",
    "changes": [
      {
        "cause": {
          "type": "receipt_processing",
          "receipt_hash": "CEm3NNaNdu9cijh9NvZMM1srbtEYSsBVwGbZxFQYKt5B"
        },
        "type": "contract_code_update",
        "change": {
          "account_id": "dev-1602714453032-7566969",
          "code_base64": "AGFzbQEAAAABpAM3YAF/AGAAAX9gAn9+AGADf35+AGAEf35+fgF+YAZ/fn5+fn4BfmADf35+AX5gAn9+AX5gAn9/AX9gAn9/AGADf39/AX9gAX8BfmACfn4AYAF+AX5gAX4AYAABfmADfn5+AGAAAGAIfn5+fn5+fn4BfmAJfn5+fn5+fn5+AX5gAn5+AX5gA35+fgF+YAd+fn5+fn5+AGAEfn5+fgBgCX5+fn5+fn5+fgBgBX5+fn5+AX5gA39/fwBgAX8Bf2ACf3wAYAR/f39+AGAFf39/fn8AYAV/f39/fwBgBH9/f38AYAN/f38BfmADf39+AGACf38BfmAFf39/f38Bf2AEf39/fwF/YAZ/f39/f38AYAV/f35/fwBgBH9+f38Bf2ACf34Bf2AHf35+f39+fwBgBX9/f39+AGAEf35+fgBgCX9+fn5+fn5+fgF+YAp/fn5+fn5+fn5+AX5gCH9+fn5+fn5+AGAFf35+fn4AYAp/fn5+fn5+fn5+AGAHf39/f39/fwBgBH98f38Bf2AGf39/f39..."
        }
      }
    ]
  },
  "id": "dontcare"
}
```

</p>
</details>

#### Sự cố nào có thể xảy ra? {#what-could-go-wrong-5}

Khi API request không thành công, RPC server sẽ trả về một error response được cấu trúc sẵn, với một số lượng giới hạn các error variant đã được định nghĩa rõ ràng, từ đó client code có thể handle toàn bộ các error case có thể xảy ra. Các JSON-RPC error của chúng tôi tuân theo convention [verror](https://github.com/joyent/node-verror) để cấu trúc cho error response:


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

Here is the exhaustive list of the error variants that can be returned by `EXPERIMENTAL_changes` method:

<table className="custom-stripe">
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
      <td rowspan="2">HANDLER_ERROR</td>
      <td>UNKNOWN_BLOCK</td>
      <td>Block đang được request chưa được tạo ra, hoặc nó đã được garbage-collect (dọn dẹp để tiết kiệm dung lượng trên node RPC)</td>
      <td>
        <ul>
          <li>Kiểm tra xem block được request có hợp lệ không</li>
          <li>If the block had been produced more than 5 epochs ago, try to send your request to <a href="https://near-nodes.io/intro/node-types#archival-node" target="_blank" rel="noopener noreferrer">an archival node</a></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>NOT_SYNCED_YET</td>
      <td>Node vẫn còn đang sync và block được request chưa có trong database</td>
      <td>
        <ul>
          <li>Chờ đến khi node sync xong</li>
          <li>Gởi một request đến một node khác đã sync xong</li>
        </ul>
      </td>
    </tr>
    <tr className="stripe">
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

## Call một contract function {#call-a-contract-function}
> Allows you to call a contract method as a [view function](../../4.tools/cli.md#near-view-near-view).

- method: `query`
- các param:
  - `request_type`: `call_function`
  - [`finality`](/api/rpc/setup#using-finality-param) _HOẶC_ [`block_id`](/api/rpc/setup#using-block_id-param)
  - `account_id`: _`"example.testnet"`_
  - `method_name`: `name_of_a_example.testnet_method` (example [`view` methods](https://github.com/near/core-contracts/blob/master/staking-pool/src/lib.rs#L317)
  - `args_base64`: `method_arguments_base_64_encoded`

Example (`get_num`):

<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "query",
  "params": {
    "request_type": "call_function",
    "finality": "final",
    "account_id": "dev-1588039999690",
    "method_name": "get_num",
    "args_base64": "e30="
  }
}
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js
const response = await near.connection.provider.query({
  request_type: "call_function",
  finality: "final",
  account_id: "dev-1588039999690",
  method_name: "get_num",
  args_base64: "e30=",
});
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=query \
  params:='{
    "request_type": "call_function",
    "finality": "final",
    "account_id": "dev-1588039999690",
    "method_name": "get_num",
    "args_base64": "e30="
  }'
```

</TabItem>
</Tabs>

Example (`get_account_staked_balance`):

The `args_base64` in this example is decoded as `{"account_id":"dev-1588039999690"}`.  The `account_id` would likely be the validator and not the same account for this particular view function.

<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "query",
  "params": {
    "request_type": "call_function",
    "finality": "final",
    "account_id": "dev-1588039999690",
    "method_name": "get_account_staked_balance",
    "args_base64": "eyJhY2NvdW50X2lkIjoiZGV2LTE1ODgwMzk5OTk2OTAifQ=="
  }
}
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js
const response = await near.connection.provider.query({
  request_type: "call_function",
  finality: "final",
  account_id: "dev-1588039999690",
  method_name: "get_account_staked_balance",
  args_base64: "eyJhY2NvdW50X2lkIjoiZGV2LTE1ODgwMzk5OTk2OTAifQ==",
});
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=query \
  params:='{
    "request_type": "call_function",
    "finality": "final",
    "account_id": "dev-1588039999690",
    "method_name": "get_account_staked_balance",
    "args_base64": "eyJhY2NvdW50X2lkIjoiZGV2LTE1ODgwMzk5OTk2OTAifQ=="
  }'
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
    "result": [48],
    "logs": [],
    "block_height": 17817336,
    "block_hash": "4qkA4sUUG8opjH5Q9bL5mWJTnfR4ech879Db1BZXbx6P"
  },
  "id": "dontcare"
}
```

**Note**: `[48]` is an array of bytes, to be specific it is an ASCII code of `0`.`near-sdk-rs` and `near-sdk-js` return JSON-serialized results.

</p>
</details>

#### Sự cố nào có thể xảy ra? {#what-could-go-wrong-6}

Khi API request không thành công, RPC server sẽ trả về một error response được cấu trúc sẵn, với một số lượng giới hạn các error variant đã được định nghĩa rõ ràng, từ đó client code có thể handle toàn bộ các error case có thể xảy ra. Các JSON-RPC error của chúng tôi tuân theo convention [verror](https://github.com/joyent/node-verror) để cấu trúc cho error response:


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

Dưới đây là danh sách đầy đủ các error variant có thể được trả về theo loại request `call_function`:

<table className="custom-stripe">
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
      <td rowspan="7">HANDLER_ERROR</td>
      <td>UNKNOWN_BLOCK</td>
      <td>Block đang được request chưa được tạo ra, hoặc nó đã được garbage-collect (dọn dẹp để tiết kiệm dung lượng trên node RPC)</td>
      <td>
        <ul>
          <li>Kiểm tra xem block được request có hợp lệ không</li>
          <li>If the block had been produced more than 5 epochs ago, try to send your request to <a href="https://near-nodes.io/intro/node-types#archival-node" target="_blank" rel="noopener noreferrer">an archival node</a></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>INVALID_ACCOUNT</td>
      <td><code>account_id</code> đã được request không hợp lệ</td>
      <td>
        <ul>
          <li>Cung cấp một <code>account_id</code> hợp lệ</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>UNKNOWN_ACCOUNT</td>
      <td>Không tìm thấy <code>account_id</code> được request, do account chưa được tạo hoặc đã bị xóa</td>
      <td>
        <ul>
          <li>Kiểm tra lại <code>account_id</code></li>
          <li>Chỉ định một block khác, hoặc thử lại nếu bạn đang request state mới nhất</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>NO_CONTRACT_CODE</td>
      <td>Không tìm thấy <code>contract_code</code> đã được request khi đang view</td>
      <td>
        <ul>
          <li>Hãy kiểm tra <code>public_key</code></li>
          <li>Chỉ định một block khác, hoặc thử lại nếu bạn đang request state mới nhất</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>CONTRACT_EXECUTION_ERROR</td>
      <td>The execution of the view function call failed (crashed, run out of the default 200 TGas limit, etc)</td>
      <td>
        <ul>
          <li>Kiểm tra <code>error.cause.info</code> để biết thêm chi tiết</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>UNAVAILABLE_SHARD</td>
      <td>Node không thể tìm thấy data được request, vì nó không track đến shard mà dữ liệu tồn tại</td>
      <td>
        <ul>
          <li>Gởi một request đến node khác, node mà có thể track đến shard</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>NO_SYNCED_BLOCKS</td>
      <td>Node vẫn còn đang sync và block được request chưa có trong database</td>
      <td>
        <ul>
          <li>Chờ đến khi node sync xong</li>
          <li>Gởi một request đến một node khác đã sync xong</li>
        </ul>
      </td>
    </tr>
    <tr className="stripe">
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
