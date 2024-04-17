---
id: access-keys
title: Các RPC Endpoint
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Ví dụ:

---

## View access key {#view-access-key}

Trả về thông tin một single access key của một account được chỉ định.

Nếu `permission` của key là `FunctionCall`, nó sẽ trả về chi tiết hơn, ví dụ như `allowance`, `receiver_id`, và `method_names`.

- method: `query`
- các param:
  - `request_type`: `view_access_key`
  - [`finality`](/api/rpc/setup#using-finality-param) _HOẶC_ [`block_id`](/api/rpc/setup#using-block_id-param)
  - `account_id`: _`"example.testnet"`_
  - `public_key`: _`"example.testnet's public key"`_


<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "query",
  "params": {
    "request_type": "view_access_key",
    "finality": "final",
    "account_id": "client.chainlink.testnet",
    "public_key": "ed25519:H9k5eiU4xXS3M4z8HzKJSLaZdqGdGwBG49o7orNC4eZW"
  }
}
```

</TabItem>
<TabItem value="🌐 JavaScript" label="JavaScript">


```js
const response = await near.connection.provider.query({
  request_type: "view_access_key",
  finality: "final",
  account_id: "client.chainlink.testnet",
  public_key: "ed25519:H9k5eiU4xXS3M4z8HzKJSLaZdqGdGwBG49o7orNC4eZW",
});
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=query \
  params:='{
    "request_type": "view_access_key",
    "finality": "final",
    "account_id": "client.chainlink.testnet",
    "public_key": "ed25519:H9k5eiU4xXS3M4z8HzKJSLaZdqGdGwBG49o7orNC4eZW"
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
    "nonce": 85,
    "permission": {
      "FunctionCall": {
        "allowance": "18501534631167209000000000",
        "receiver_id": "client.chainlink.testnet",
        "method_names": ["get_token_price"]
      }
    },
    "block_height": 19884918,
    "block_hash": "GGJQ8yjmo7aEoj8ZpAhGehnq9BSWFx4xswHYzDwwAP2n"
  },
  "id": "dontcare"
}
```

</p>
</details>

#### Sự cố nào có thể xảy ra?

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

Dưới đây là danh sách đầy đủ các error variant có thể được trả về theo loại request `view_access_key`:

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
          <li>Nếu block đã được tạo ra hơn 5 epoch trước đó, hãy thử gởi request của bạn đến <a href="https://near-nodes.io/intro/node-types#archival-node">một archival node</a></li>
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
      <td>UNKNOWN_ACCESS_KEY</td>
      <td>Không tìm thấy <code>public_key</code>, do public key chưa được tạo hoặc đã bị xóa</td>
      <td>
        <ul>
          <li>Kiểm tra lại <code>public_key</code></li>
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
          <li>Kiểm tra <code>error.cause.info</code> để biết thêm các chi tiết</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

---

## View access key list {#view-access-key-list}

You can query <strong>all</strong> access keys for a given account.

- method: `query`
- các param:
  - `request_type`: `view_access_key_list`
  - [`finality`](/api/rpc/setup#using-finality-param) _HOẶC_ [`block_id`](/api/rpc/setup#using-block_id-param)
  - `account_id`: _`"example.testnet"`_

Dưới đây là danh sách đầy đủ các error variant có thể được trả về theo loại request `view_access_key_list`:

<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "query",
  "params": {
    "request_type": "view_access_key_list",
    "finality": "final",
    "account_id": "example.testnet"
  }
}
```

</TabItem>
<TabItem value="🌐 JavaScript" label="JavaScript">

```js
const response = await near.connection.provider.query({
  request_type: "view_access_key_list",
  finality: "final",
  account_id: "example.testnet",
});
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=query \
  params:='{
    "request_type": "view_access_key_list",
    "finality": "final",
    "account_id": "example.testnet"
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
    "keys": [
      {
        "public_key": "ed25519:2j6qujbkPFuTstQLLTxKZUw63D5Wu3SG79Gop5JQrNJY",
        "access_key": {
          "nonce": 17,
          "permission": {
            "FunctionCall": {
              "allowance": "9999203942481156415000",
              "receiver_id": "place.meta",
              "method_names": []
            }
          }
        }
      },
      {
        "public_key": "ed25519:46etzhzZHN4NSQ8JEQtbHCX7sT8WByS3vmSEb3fbmSgf",
        "access_key": {
          "nonce": 2,
          "permission": {
            "FunctionCall": {
              "allowance": "9999930655034196535000",
              "receiver_id": "dev-1596616186817-8588944",
              "method_names": []
            }
          }
        }
      },
      {
        "public_key": "ed25519:4F9TwuSqWwvoyu7JVZDsupPhC7oYbYNsisBV2yQvyXFn",
        "access_key": {
          "nonce": 0,
          "permission": "FullAccess"
        }
      },
      {
        "public_key": "ed25519:4bZqp6nm1btr92UfKbyADDzJ4oPK9JetHXqEYqbYZmkD",
        "access_key": {
          "nonce": 2,
          "permission": "FullAccess"
        }
      },
      {
        "public_key": "ed25519:6ZPzX7hS37jiU9dRxbV1Waf8HSyKKFypJbrnZXzNhqjs",
        "access_key": {
          "nonce": 2,
          "permission": {
            "FunctionCall": {
              "allowance": "9999922083697042955000",
              "receiver_id": "example.testnet",
              "method_names": []
            }
          }
        }
      },
      {
        "public_key": "ed25519:81RKfuo7mBbsaviTmBsq18t6Eq4YLnSi3ye2CBLcKFUX",
        "access_key": {
          "nonce": 8,
          "permission": "FullAccess"
        }
      },
      {
        "public_key": "ed25519:B4W1oAYTcG8GxwKev8jQtsYWkGwGdqP24W7eZ6Fmpyzc",
        "access_key": {
          "nonce": 0,
          "permission": {
            "FunctionCall": {
              "allowance": "10000000000000000000000",
              "receiver_id": "dev-1594144238344",
              "method_names": []
            }
          }
        }
      },
      {
        "public_key": "ed25519:BA3AZbACoEzAsxKeToFd36AVpPXFSNhSMW2R6UYeGRwM",
        "access_key": {
          "nonce": 0,
          "permission": {
            "FunctionCall": {
              "allowance": "10000000000000000000000",
              "receiver_id": "new-corgis",
              "method_names": []
            }
          }
        }
      },
      {
        "public_key": "ed25519:BRyHUGAJjRKVTc9ZqXTTSJnFmSca8WLj8TuVe1wXK3LZ",
        "access_key": {
          "nonce": 17,
          "permission": "FullAccess"
        }
      },
      {
        "public_key": "ed25519:DjytaZ1HZ5ZFmH3YeJeMCiC886K1XPYeGsbz2E1AZj2J",
        "access_key": {
          "nonce": 31,
          "permission": "FullAccess"
        }
      },
      {
        "public_key": "ed25519:DqJn5UCq6vdNAvfhnbpdAeuui9a6Hv9DKYDxeRACPUDP",
        "access_key": {
          "nonce": 0,
          "permission": "FullAccess"
        }
      },
      {
        "public_key": "ed25519:FFxG8x6cDDyiErFtRsdw4dBNtCmCtap4tMTjuq3umvSq",
        "access_key": {
          "nonce": 0,
          "permission": "FullAccess"
        }
      }
    ],
    "block_height": 17798231,
    "block_hash": "Gm7YSdx22wPuciW1jTTeRGP9mFqmon69ErFQvgcFyEEB"
  },
  "id": "dontcare"
}
```

</p>
</details>

#### Sự cố nào có thể xảy ra?

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

Dưới đây là danh sách đầy đủ các error variant có thể được trả về theo loại request `view_access_key_list`:

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
          <li>Nếu block đã được tạo ra hơn 5 epoch trước đó, hãy thử gởi request của bạn đến <a href="https://near-nodes.io/intro/node-types#archival-node">một archival node</a></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>INVALID_ACCOUNT</td>
      <td>Node vẫn còn đang sync và block được request chưa có trong database</td>
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

## Các thay đổi View access key (đơn) {#view-access-key-changes-single}

Trả về các thay đổi riêng lẻ của access key trong một block cụ thể. Bạn có thể query nhiều key bằng cách pass một array các object có chứa `account_id` và `public_key`.

- method: `EXPERIMENTAL_changes`
- các param:
  - `changes_type`: `single_access_key_changes`
  - `keys`: `[{ account_id, public_key }]`
  - [`finality`](/api/rpc/setup#using-finality-param) _HOẶC_ [`block_id`](/api/rpc/setup#using-block_id-param)

Ví dụ:

<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "EXPERIMENTAL_changes",
  "params": {
    "changes_type": "single_access_key_changes",
    "keys": [
      {
        "account_id": "example-acct.testnet",
        "public_key": "ed25519:25KEc7t7MQohAJ4EDThd2vkksKkwangnuJFzcoiXj9oM"
      }
    ],
    "finality": "final"
  }
}
```

</TabItem>
<TabItem value="🌐 JavaScript" label="JavaScript">

```js
const response = await near.connection.provider.experimental_changes({
  changes_type: "single_access_key_changes",
  keys: [
    {
      account_id: "example-acct.testnet",
      public_key: "ed25519:25KEc7t7MQohAJ4EDThd2vkksKkwangnuJFzcoiXj9oM",
    },
  ],
  finality: "final",
});
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=EXPERIMENTAL_changes \
  params:='{
    "changes_type": "single_access_key_changes",
    "keys": [
      {
        "account_id": "example-acct.testnet",
        "public_key": "ed25519:25KEc7t7MQohAJ4EDThd2vkksKkwangnuJFzcoiXj9oM"
      }
    ],
    "finality": "final"
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
    "block_hash": "4kvqE1PsA6ic1LG7S5SqymSEhvjqGqumKjAxnVdNN3ZH",
    "changes": [
      {
        "cause": {
          "type": "transaction_processing",
          "tx_hash": "HshPyqddLxsganFxHHeH9LtkGekXDCuAt6axVgJLboXV"
        },
        "type": "access_key_update",
        "change": {
          "account_id": "example-acct.testnet",
          "public_key": "ed25519:25KEc7t7MQohAJ4EDThd2vkksKkwangnuJFzcoiXj9oM",
          "access_key": {
            "nonce": 1,
            "permission": "FullAccess"
          }
        }
      }
    ]
  },
  "id": "dontcare"
}
```

</p>
</details>

#### What Could Go Wrong?{#what-could-go-wrong-2}

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

Dưới đây là danh sách đầy đủ các error variant có thể được trả về bởi method `EXPERIMENTAL_changes`:

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
          <li>Nếu block đã được tạo ra hơn 5 epoch trước đó, hãy thử gởi request của bạn đến <a href="https://near-nodes.io/intro/node-types#archival-node">một archival node</a></li>
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

## Các thay đổi View access key (tất cả) {#view-access-key-changes-all}

Trả về các thay đổi đến <strong>tất cả</strong> các access key của một block được chỉ định. Có thể query nhiều tài khoản bằng cách pass một array của `account_ids`.

- method: `EXPERIMENTAL_changes`
- các param:
  - `changes_type`: `all_access_key_changes`
  - `account_ids`: `[ "example.testnet", "example2.testnet"]`
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
    "changes_type": "all_access_key_changes",
    "account_ids": ["example-acct.testnet"],
    "block_id": "4kvqE1PsA6ic1LG7S5SqymSEhvjqGqumKjAxnVdNN3ZH"
  }
}
```

</TabItem>
<TabItem value="🌐 JavaScript" label="JavaScript">

```js
const response = await near.connection.provider.experimental_changes({
  changes_type: "all_access_key_changes",
  account_ids: "example-acct.testnet",
  finality: "final",
});
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=EXPERIMENTAL_changes \
  params:='{
    "changes_type": "all_access_key_changes",
    "account_ids": ["example-acct.testnet"],
    "block_id": "4kvqE1PsA6ic1LG7S5SqymSEhvjqGqumKjAxnVdNN3ZH"
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
    "block_hash": "4kvqE1PsA6ic1LG7S5SqymSEhvjqGqumKjAxnVdNN3ZH",
    "changes": [
      {
        "cause": {
          "type": "transaction_processing",
          "tx_hash": "HshPyqddLxsganFxHHeH9LtkGekXDCuAt6axVgJLboXV"
        },
        "type": "access_key_update",
        "change": {
          "account_id": "example-acct.testnet",
          "public_key": "ed25519:25KEc7t7MQohAJ4EDThd2vkksKkwangnuJFzcoiXj9oM",
          "access_key": {
            "nonce": 1,
            "permission": "FullAccess"
          }
        }
      },
      {
        "cause": {
          "type": "receipt_processing",
          "receipt_hash": "CetXstu7bdqyUyweRqpY9op5U1Kqzd8pq8T1kqfcgBv2"
        },
        "type": "access_key_update",
        "change": {
          "account_id": "example-acct.testnet",
          "public_key": "ed25519:96pj2aVJH9njmAxakjvUMnNvdB3YUeSAMjbz9aRNU6XY",
          "access_key": {
            "nonce": 0,
            "permission": "FullAccess"
          }
        }
      }
    ]
  },
  "id": "dontcare"
}
```

</p>
</details>

#### What Could Go Wrong?{#what-could-go-wrong-3}

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
          <li>If the block had been produced more than 5 epochs ago, try to send your request to <a href="https://near-nodes.io/intro/node-types#archival-node">an archival node</a></li>
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
