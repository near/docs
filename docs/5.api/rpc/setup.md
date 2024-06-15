---
id: setup
title: Setup 
---

In order to use the RPC API you will need to setup the correct RPC endpoints.

<hr className="subsection" />

## RPC Endpoint Setup
- `POST` for all methods
- `JSON RPC 2.0`
- `id: "dontcare"`
- endpoint URL varies by network:
  - mainnet `https://rpc.mainnet.near.org`
  - testnet `https://rpc.testnet.near.org`
  - betanet `https://rpc.betanet.near.org` _(may be unstable)_
  - localnet `http://localhost:3030`

### Limits
- Maximum number of requests per IP: 600 req/min

<hr className="subsection" />

## Querying Historical Data
Querying historical data (older than 5 [epochs](../../1.concepts/basics/epoch.md) or ~2.5 days), you may get responses that the data is not available anymore. In that case, archival RPC nodes will come to your rescue:

- mainnet `https://archival-rpc.mainnet.near.org`
- testnet `https://archival-rpc.testnet.near.org`

You can see this interface defined in `nearcore` [here](https://github.com/near/nearcore/blob/bf9ae4ce8c680d3408db1935ebd0ca24c4960884/chain/jsonrpc/client/src/lib.rs#L181).

### Limits
- Maximum number of requests per IP: 600 req/min

---

## Postman Setup {#postman-setup}

An easy way to test the queries in this documentation page is to use an API request tool such as [Postman](https://www.postman.com/).
You only need to configure two things:

1. Make sure you add a header with a key of `Content-Type` and value of `application/json`.
   ![postman-setup-header](/docs/assets/postman-setup-headers.png)

2. Then select the `Body` tab and choose the `raw` radio button and ensure `JSON` is the selected format.
   ![postman-setup-header](/docs/assets/postman-setup-body.png)

After that is set up, just copy/paste the `JSON object` example snippets below into the `body` of your request, on Postman, and click `send`.

---
## JavaScript Setup {#javascript-setup}

All of the queries listed in this documentation page can be called using [`near-api-js`](https://github.com/near/near-api-js).

- For `near-api-js` installation and setup please refer to `near-api-js` [quick reference documentation](/tools/near-api-js/quick-reference).
- All JavaScript code snippets require a `near` object. For examples of how to instantiate, [**click here**](/tools/near-api-js/quick-reference#connect).

---
## HTTPie Setup {#httpie-setup}

If you prefer to use a command line interface, we have provided RPC examples you can use with [HTTPie](https://httpie.org/). Please note that params take
either an object or array passed as a string.

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=network_info params:='[]'
```

---

## Using `block_id` param {#using-block_id-param}

The `block_id` param can take either the block number (e.g. `27912554`) or the block hash (e.g. `'3Xz2wM9rigMXzA2c5vgCP8wTgFBaePucgUmVYPkMqhRL'` ) as an argument.

:::caution

The block IDs of transactions shown in [NearBlocks Explorer](https://testnet.nearblocks.io) are not necessarily the block ID of the executed transaction. Transactions may execute a block or two after its recorded, and in some cases, can take place over several blocks. Due to this, it is important to check subsequent blocks to be sure all results related to the queried transaction are discovered.

:::

---

## Using `finality` param {#using-finality-param}

The `finality` param has two options: `optimistic` and `final`.
1. `optimistic` uses the latest block recorded on the node that responded to your query _(< 1 second delay after the transaction is submitted)_
2. `final` is for a block that has been validated on at least 66% of the nodes in the network _(usually takes 2 blocks / approx. 2 second delay)_
