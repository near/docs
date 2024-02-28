---
id: block-chunk
title: Block / Chunk
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

**Lưu ý**: Bạn có thể chọn search theo một block cụ thể _hoặc_ finality, chứ không thể chọn cả hai.

---

## Các chi tiết về block {#block-details}

> Query network và trả về block tương ứng với height hoặc hash được chỉ định. Bạn cũng có thể sử dụng param `finality` để trả về các chi tiết của block mới nhất.

ví dụ cho `finality`:

- method: `block`
- các param:
  - [`finality`](/docs/api/rpc#using-finality-param) _HOẶC_ [`block_id`](/docs/api/rpc#using-block_id-param)

ví dụ cho `finality`:


<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "block",
  "params": {
    "finality": "final"
  }
}
```

</TabItem>
<TabItem value="🌐 JavaScript" label="JavaScript">

```js
const response = await near.connection.provider.block({
  finality: "final",
});
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=block \
  params:='{
    "finality": "final"
  }'
```

</TabItem>
</Tabs>

`[block_id]`


<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "block",
  "params": {
    "block_id": 17821130
  }
}
```

</TabItem>
<TabItem value="🌐 JavaScript" label="JavaScript">

```js
const response = await near.connection.provider.block({blockId: 17821130});
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=block \
  params:='{
    "block_id": 17821130
  }'
```

</TabItem>
</Tabs>

`[block_hash]`


<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "block",
  "params": {
    "block_id": "7nsuuitwS7xcdGnD9JgrE22cRB2vf2VS4yh1N9S71F4d"
  }
}
```

</TabItem>
<TabItem value="🌐 JavaScript" label="JavaScript">

```js
const response = await near.connection.provider.block(
  {blockId: "7nsuuitwS7xcdGnD9JgrE22cRB2vf2VS4yh1N9S71F4d"}
);
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=block \
  params:='{
    "block_id": "7nsuuitwS7xcdGnD9JgrE22cRB2vf2VS4yh1N9S71F4d"
  }'
```

</TabItem>
</Tabs>

<details>
<summary>Ví dụ về response nhận được:</summary>
<p>

```json
{
  "jsonrpc": "2.0",
  "result": {
    "author": "bitcat.pool.f863973.m0",
    "header": {
      "height": 17821130,
      "epoch_id": "7Wr3GFJkYeCxjVGz3gDaxvAMUzXuzG8MjFXTFoAXB6ZZ",
      "next_epoch_id": "A5AdnxEn7mfHieQ5fRxx9AagCkHNJz6wr61ppEXiWvvh",
      "hash": "CLo31YCUhzz8ZPtS5vXLFskyZgHV5qWgXinBQHgu9Pyd",
      "prev_hash": "2yUTTubrv1gJhTUVnHXh66JG3qxStBqySoN6wzRzgdVD",
      "prev_state_root": "5rSz37fySS8XkVgEy3FAZwUncX4X1thcSpuvCgA6xmec",
      "chunk_receipts_root": "9ETNjrt6MkwTgSVMMbpukfxRshSD1avBUUa4R4NuqwHv",
      "chunk_headers_root": "HMpEoBhPvThWZvppLwrXQSSfumVdaDW7WfZoCAPtjPfo",
      "chunk_tx_root": "7tkzFg8RHBmMw1ncRJZCCZAizgq4rwCftTKYLce8RU8t",
      "outcome_root": "7tkzFg8RHBmMw1ncRJZCCZAizgq4rwCftTKYLce8RU8t",
      "chunks_included": 1,
      "challenges_root": "11111111111111111111111111111111",
      "timestamp": 1601280114229875635,
      "timestamp_nanosec": "1601280114229875635",
      "random_value": "ACdUSF3nehbMTwT7qjUB6Mm4Ynck5TVAWbNH3DR1cjQ7",
      "validator_proposals": [],
      "chunk_mask": [true],
      "gas_price": "100000000",
      "rent_paid": "0",
      "validator_reward": "0",
      "total_supply": "1042339182040791154864822502764857",
      "challenges_result": [],
      "last_final_block": "AaxTqjYND5WAKbV2UZaFed6DH1DShN9fEemtnpTsv3eR",
      "last_ds_final_block": "2yUTTubrv1gJhTUVnHXh66JG3qxStBqySoN6wzRzgdVD",
      "next_bp_hash": "3ZNEoFYh2CQeJ9dc1pLBeUd1HWG8657j2c1v72ENE45Q",
      "block_merkle_root": "H3912Nkw6rtamfjsjmafe2uV2p1XmUKDou5ywgxb1gJr",
      "approvals": [
        "ed25519:4hNtc9vLhn2PQhktWtLKJV9g8SBfpm6NBT1w4syNFqoKE7ZMts2WwKA9x1ZUSBGVKYCuDGEqogLvwCF25G7e1UR3",
        "ed25519:2UNmbTqysMMevVPqJEKSq57hkcxVFcAMdGq7CFhpW65yBKFxYwpoziiWsAtARusLn9Sy1eXM7DkGTXwAqFiSooS6",
        "ed25519:4sumGoW9dnQCsJRpzkd4FQ5NSJypGQRCppWp7eQ9tpsEcJXjHZN8GVTCyeEk19WmbbMEJ5KBNypryyHzaH2gBxd4",
        "ed25519:3fP2dri6GjYkmHgEqQWWP9GcoQEgakbaUtfr3391tXtYBgxmiJUEymRe54m7D8bQrSJ3LhKD8gTFT7qqdemRnizR",
        "ed25519:3mwdqSWNm6RiuZAoZhD6pqsirC2cL48nEZAGoKixpqbrsBpAzqV3W2paH4KtQQ4JPLvk5pnzojaint2kNBCcUyq1",
        "ed25519:D4hMnxqLyQW4Wo29MRNMej887GH46yJXDKNN4es8UDSi9shJ9Y4FcGqkxdV4AZhn1yUjwN5LwfgAgY6fyczk5L3",
        null,
        "ed25519:4WCVm4dn88VJxTkUgcvdS7vs34diBqtQY4XWMRctSN1NpbgdkwwVyxg7d2SbGC22SuED7w4nrToMhcpJXrkhkDmF",
        "ed25519:JqtC7TFP7U14s7YhRKQEqwbc2RUxoctq75mrBdX91f7DuCWsPpe6ZTTnfHPmuJPjTzFHVZTsaQJWzwfSrrgNpnc",
        "ed25519:ngGUpWc2SyHmMCkWGTNNNfvZAJQ5z7P92JCmDqB7JW3j8fNH6LobvFFXb2zVdssibJKgnjwBj8CRe6qiZtuYQZM",
        "ed25519:5kzW6RbjukyJZiw9NTzTPPsQdoqN6EecafjVFEoWmTxQ4uSv1uSXhQYcHK2eq4m84oMmPABQDz2mm73Qx8mDdCQX",
        "ed25519:5wHnuuxwJJiZ4bXNq5cESnr4YovFU2yaUcuHRDUw3DnLoxkqc15CsegoyUSQKEwtCZ4yETv8Z9QcD6Wr9zHV4AUk",
        "ed25519:3F9XzWBxto31e8RAcBShAJBzJPgSJQsWbPXR38AfQnJn6AiveGz3JjebQm9Ye63BrnNA57QrPshwknxpzSrcNEZW",
        "ed25519:2g5s4SKsHt9PMdekkDqVtwwtz14v4edhqdBX1MYA8tB6nDpj3vDCDCTy9pEU8dX31PoQe5ygnf88aTZukMBMK1Yt",
        "ed25519:3Xz4jqhdyS3qs6xTmWdgjwt5gJraU5czMA89hPhmvbAN4aA7SUKL1HkevpmutRQqqxe7c7uCFeGiDHvDcxhhmD8W",
        null,
        "ed25519:55xs3vwPEys39egf9Z8SNyn1JsHPRMgj9HCX1GE7GJsVTcAuutQUCo91E12ZdXkuToYRXb9KzoT8n9XQRCNuLpwY",
        null,
        "ed25519:28JrFw7KnhnQPN89qZnnw17KDBjS6CDN7zB1hTg7KGg8qQPoCzakz9DNnaSnx39ji7e2fQSpZt4cNJaD7K7Yu7yo",
        "ed25519:41hAr5qhtvUYpdD2NK9qqTVnpG325ZoAiwrcmk1MJH7fdpxm7oSKXvXZqh7bTmPhv61hH2RpHnhcGuN4QqLzK2zt",
        "ed25519:4QacMsQ5FJgvecAYDFq8QBh19BBjh4qU8oeD5bV7p6Zhhu3e6r2iSHTvDBU2Q62RZAaWQQkkEwDUC9rsXdkGVhAt",
        "ed25519:27smtCZ3WobEvBuD5DggY6kkGxjB9qRVY6kPixgwqvBT1eKbRVoV8cLj1z51S8RTcp7YzAr1vhHJUHgksatR9Udz",
        "ed25519:4wspCWoAbhYxb3th2eX6ZXvKep1Fsco7mFP5zBodXBR8Wr344ANXSUCri3gUgNCCSoQ2CKSdqDEsvE6Y2jQ9hmbB",
        "ed25519:46XpYf9ZB9gjDfdnJLHqqhYJpQCuvCgB9tzKWS88GANMCb2j9BM3KXyjaEzynSsaPK8VrKFXQuTsTzgQSeo9cWGW",
        null,
        "ed25519:Y5ehsrhEpTRGjG6fHJHsEXj2NYPGMmKguiJHXP7TqsCWHBvNzaJbieR7UDp78hJ1ib7C18J5MB2kCzTXBCF9c3b",
        "ed25519:3P9363Dc8Kqvgjt3TsNRncUrncCHid7aSRnuySjF4JYmQbApkAxomyMu8xm9Rgo3mj9rqXb16PM7Xjn7hKP6TyVr",
        null,
        null,
        "ed25519:65ATjGsigZ3vMp7sGcp1c4ptxoqhHPkBeAaZ5GWJguVDLyrRLPJrtXhLGjH9DpXd7CZswjyMYq5aRtorLnmmJ7GW",
        null,
        "ed25519:5SvqSViXbtsLoFMdtCufyyDgZnrEK7LheFi38X5M2ic17gfV5cz37r85RyixjUv98MbAmgVdmkxVFDGfSbeoHW7X",
        null,
        null,
        "ed25519:2n3fQiBEiDKkB84biXWyQmvnupKX7B8faugY37jVi8hVXuWLggJmaEjqub511RCYwFnwW1RBxYpuJQ455KaniCd4",
        "ed25519:2K9xKFLJ2fW74tddXtghFGFurKWomAqaJmkKYVZKHQT6zHe5wNSYT3vzMotLQcez5JD1Ta57N9zQ4H1RysB2s5DZ",
        null,
        null,
        "ed25519:3qeCRtcLAqLtQ2YSQLcHDa26ykKX1BvAhP9jshLLYapxSEGGgZJY8sU72p9E78AkXwHP3X2Eq74jvts7gTRzNgMg",
        null,
        "ed25519:2czSQCF8wBDomEeSdDRH4gFoyJrp2ppZqR6JDaDGoYpaFkpWxZf2oGDkKfQLZMbfvU6LXkQjJssVHcLCJRMzG8co"
      ],
      "signature": "ed25519:58sdWd6kxzhQdCGvHzxqvdtDLJzqspe74f3gytnqdxDLHf4eesXi7B3nYq2YaosCHZJYmcR4HPHKSoFm3WE4MbxT",
      "latest_protocol_version": 35
    },
    "chunks": [
      {
        "chunk_hash": "EBM2qg5cGr47EjMPtH88uvmXHDHqmWPzKaQadbWhdw22",
        "prev_block_hash": "2yUTTubrv1gJhTUVnHXh66JG3qxStBqySoN6wzRzgdVD",
        "outcome_root": "11111111111111111111111111111111",
        "prev_state_root": "HqWDq3f5HJuWnsTfwZS6jdAUqDjGFSTvjhb846vV27dx",
        "encoded_merkle_root": "9zYue7drR1rhfzEEoc4WUXzaYRnRNihvRoGt1BgK7Lkk",
        "encoded_length": 8,
        "height_created": 17821130,
        "height_included": 17821130,
        "shard_id": 0,
        "gas_used": 0,
        "gas_limit": 1000000000000000,
        "rent_paid": "0",
        "validator_reward": "0",
        "balance_burnt": "0",
        "outgoing_receipts_root": "H4Rd6SGeEBTbxkitsCdzfu9xL9HtZ2eHoPCQXUeZ6bW4",
        "tx_root": "11111111111111111111111111111111",
        "validator_proposals": [],
        "signature": "ed25519:4iPgpYAcPztAvnRHjfpegN37Rd8dTJKCjSd1gKAPLDaLcHUySJHjexMSSfC5iJVy28vqF9VB4psz13x2nt92cbR7"
      }
    ]
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

**Lưu ý**: Bạn có thể chọn search theo một block cụ thể _hoặc_ finality, chứ không thể chọn cả hai.

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

## Các thay đổi trong Block {#changes-in-block}

> Trả về các thay đổi trong block với height hoặc hash của block được chỉ định. Bạn cũng có thể sử dụng param `finality` để trả về các chi tiết của block mới nhất.

ví dụ cho `finality`:

- method: `EXPERIMENTAL_changes_in_block`
- các param:
  - [`finality`](/docs/api/rpc#using-finality-param) _HOẶC_ [`block_id`](/docs/api/rpc#using-block_id-param)

`finality`


<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "EXPERIMENTAL_changes_in_block",
  "params": {
    "finality": "final"
  }
}
```

</TabItem>
<TabItem value="🌐 JavaScript" label="JavaScript">

```js
const response = await near.connection.provider.experimental_changes_in_block({
  finality: "final",
});
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=EXPERIMENTAL_changes_in_block \
  params:='{
    "finality": "final"
  }'
```

</TabItem>
</Tabs>

`[block_id]`


<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "EXPERIMENTAL_changes_in_block",
  "params": {
    "block_id": 17821135
  }
}
```

</TabItem>
<TabItem value="🌐 JavaScript" label="JavaScript">

```js
const response = await near.connection.provider.experimental_changes_in_block(
  17821135
);
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=EXPERIMENTAL_changes_in_block \
  params:='{
    "block_id": 17821135
  }'
```

</TabItem>
</Tabs>

`block_hash`


<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "EXPERIMENTAL_changes_in_block",
  "params": {
    "block_id": "81k9ked5s34zh13EjJt26mxw5npa485SY4UNoPi6yYLo"
  }
}
```

</TabItem>
<TabItem value="🌐 JavaScript" label="JavaScript">

```js
const response = await near.connection.provider.experimental_changes_in_block(
  "81k9ked5s34zh13EjJt26mxw5npa485SY4UNoPi6yYLo"
);
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=EXPERIMENTAL_changes_in_block \
  params:='{
    "block_id": "81k9ked5s34zh13EjJt26mxw5npa485SY4UNoPi6yYLo"
  }'
```

</TabItem>
</Tabs>

<details>
<summary>Ví dụ trả về: </summary>
<p>

```json
{
  "jsonrpc": "2.0",
  "result": {
    "block_hash": "81k9ked5s34zh13EjJt26mxw5npa485SY4UNoPi6yYLo",
    "changes": [
      {
        "type": "account_touched",
        "account_id": "lee.testnet"
      },
      {
        "type": "contract_code_touched",
        "account_id": "lee.testnet"
      },
      {
        "type": "access_key_touched",
        "account_id": "lee.testnet"
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

ví dụ cho `chunk_id`:

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

## Các chi tiết Chunk {#chunk-details}

> Trả về các chi tiết cho một chunk cụ thể. You can run a [block details](/api/rpc/setup#block-details) query to get a valid chunk hash.

- method: `chunk`
- các param:
  - `chunk_id` _HOẶC_ [`block_id`, `shard_id`](/docs/api/rpc#using-block_id-param)

Ví dụ cho `block_id`, `shard_id`:


<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "chunk",
  "params": {"chunk_id": "EBM2qg5cGr47EjMPtH88uvmXHDHqmWPzKaQadbWhdw22"}
}
```

</TabItem>
<TabItem value="🌐 JavaScript" label="JavaScript">

```js
const response = await near.connection.provider.chunk({
  chunk_id: "EBM2qg5cGr47EjMPtH88uvmXHDHqmWPzKaQadbWhdw22"
});
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 method=chunk params:='{"chunk_id": "EBM2qg5cGr47EjMPtH88uvmXHDHqmWPzKaQadbWhdw22"}' id=dontcare
```

</TabItem>
</Tabs>

Ví dụ cho `block_id`, `shard_id`:


<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "chunk",
  "params": {"block_id": 58934027, "shard_id": 0}
}
```

</TabItem>
<TabItem value="🌐 JavaScript" label="JavaScript">

```js
const response = await near.connection.provider.chunk({
  block_id: 58934027, shard_id: 0
});
```

</TabItem>
<TabItem value="http" label="HTTPie">

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 method=chunk params:='{"block_id": 58934027, "shard_id": 0}' id=dontcare
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
    "author": "bitcat.pool.f863973.m0",
    "header": {
      "chunk_hash": "EBM2qg5cGr47EjMPtH88uvmXHDHqmWPzKaQadbWhdw22",
      "prev_block_hash": "2yUTTubrv1gJhTUVnHXh66JG3qxStBqySoN6wzRzgdVD",
      "outcome_root": "11111111111111111111111111111111",
      "prev_state_root": "HqWDq3f5HJuWnsTfwZS6jdAUqDjGFSTvjhb846vV27dx",
      "encoded_merkle_root": "9zYue7drR1rhfzEEoc4WUXzaYRnRNihvRoGt1BgK7Lkk",
      "encoded_length": 8,
      "height_created": 17821130,
      "height_included": 17821130,
      "shard_id": 0,
      "gas_used": 0,
      "gas_limit": 1000000000000000,
      "rent_paid": "0",
      "validator_reward": "0",
      "balance_burnt": "0",
      "outgoing_receipts_root": "H4Rd6SGeEBTbxkitsCdzfu9xL9HtZ2eHoPCQXUeZ6bW4",
      "tx_root": "11111111111111111111111111111111",
      "validator_proposals": [],
      "signature": "ed25519:4iPgpYAcPztAvnRHjfpegN37Rd8dTJKCjSd1gKAPLDaLcHUySJHjexMSSfC5iJVy28vqF9VB4psz13x2nt92cbR7"
    },
    "transactions": [],
    "receipts": []
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

Dưới đây là danh sách đầy đủ các error variant có thể được trả về bởi method `chunk`:

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
      <td rowspan="4">HANDLER_ERROR</td>
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
      <td>UNKNOWN_CHUNK</td>
      <td>Chunk đã request không được tìm thấy trong một database</td>
      <td>
        <ul>
          <li>Kiểm tra xem chunk được request có hợp lệ không</li>
          <li>Nếu chunk đã được produce hơn 5 epoch trước đó, hãy thử send request của bạn đến một archival node</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>INVALID_SHARD_ID</td>
      <td><code>shard_id</code> đã cung cấp không tồn tại</td>
      <td>
        <ul>
          <li>Hãy cung cấp <code>shard_id</code> của một shard đang có sẵn</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>NOT_SYNCED_YET</td>
      <td>Node vẫn còn đang sync và chunk được request chưa có trong database</td>
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
