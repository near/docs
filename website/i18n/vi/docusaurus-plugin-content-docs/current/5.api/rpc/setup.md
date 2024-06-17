---
id: setup
title: Cài đặt
---

In order to use the RPC API you will need to setup the correct RPC endpoints.

<hr className="subsection" />

## RPC Endpoint Setup
- `POST` cho tất cả các method
- `JSON RPC 2.0`
- `id: "dontcare"`
- endpoint URL thay đổi bởi network:
  - mainnet `https://rpc.mainnet.near.org`
  - testnet `https://rpc.testnet.near.org`
  - betanet `https://rpc.betanet.near.org` _(có thể không ổn định)_
  - localnet `http://localhost:3030`

### Limits
- Maximum number of requests per IP: 600 req/min

<hr className="subsection" />

## Querying Historical Data
Truy vấn lịch sử data (nhiều hơn 5 [epoch](../../1.concepts/basics/epoch.md) hoặc ~2.5 day), bạn có thể nhận được những phản hồi là data không tồn tại nữa. Trong trường hợp đó, các archival RPC node sẽ giúp bạn:

- mainnet `https://archival-rpc.mainnet.near.org`
- testnet `https://archival-rpc.testnet.near.org`

Bạn có thể nhìn thấy interface này đã được định nghĩa trong `nearcore` [ở đây](https://github.com/near/nearcore/blob/bf9ae4ce8c680d3408db1935ebd0ca24c4960884/chain/jsonrpc/client/src/lib.rs#L181).

### Limits
- Maximum number of requests per IP: 600 req/min

---

## Cài đặt Postman {#postman-setup}

An easy way to test the queries in this documentation page is to use an API request tool such as [Postman](https://www.postman.com/). You only need to configure two things:

1. Đảm bảo bạn thêm vào header với một key là `Content-Type` có giá trị là `application/json`. ![postman-setup-header](/docs/assets/postman-setup-headers.png)

2. Sau đó chuyển sang `Body` và chọn `raw` radio button và đảm bảo `JSON` là format đã được chọn. ![postman-setup-header](/docs/assets/postman-setup-body.png)

Sau quá trình cài đặt đó, chỉ cần copy/paste các đoạn mã ví dụ `JSON object` dưới đây vào `body` của request trên Postman, và click `send`.

---
## Cài đặt JavaScript {#javascript-setup}

All of the queries listed in this documentation page can be called using [`near-api-js`](https://github.com/near/near-api-js).

- Để thiết lập và cài đặt `near-api-js`, vui lòng xem `near-api-js` [tài liệu tham khảo nhanh](/tools/near-api-js/quick-reference).
- All JavaScript code snippets require a `near` object. For examples of how to instantiate, [**click here**](/tools/near-api-js/quick-reference#connect).

---
## Cài đặt HTTPie {#httpie-setup}

Nếu bạn ưa thích sử dụng command line interface, chúng tôi đã cung cấp các ví dụ RPC mà bạn có thể sử dụng với [HTTPie](https://httpie.org/). Please note that params take either an object or array passed as a string.

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=network_info params:='[]'
```

---

## Sử dụng tham số `block_id` {#using-block_id-param}

The `block_id` param can take either the block number (e.g. `27912554`) or the block hash (e.g. `'3Xz2wM9rigMXzA2c5vgCP8wTgFBaePucgUmVYPkMqhRL'` ) as an argument.

:::caution

The block IDs of transactions shown in [NearBlocks Explorer](https://testnet.nearblocks.io) are not necessarily the block ID of the executed transaction. Các transaction có thể thực hiện một hoặc hai block sau khi nó được ghi lại, và trong một số trường hợp có thể diễn ra trên nhiều block. Due to this, it is important to check subsequent blocks to be sure all results related to the queried transaction are discovered.

:::

---

## Sử dụng tham số `finality` {#using-finality-param}

Tham số `finality` có hai tùy chọn: `optimistic` và `final`.
1. `optimistic` uses the latest block recorded on the node that responded to your query _(< 1 second delay after the transaction is submitted)_
2. `final` cho một block đã được validate trên ít nhất 66% các node trong network _(thường mất 2 block / khoảng 2 giây delay)_
