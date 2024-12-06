---
id: nearblocks-api
title: NearBlocks API
sidebar_label: NearBlocks API
---

The [NearBlocks API](https://api.nearblocks.io/api-docs/) provides a simple way to query actions that happened on a NEAR account, such as function calls, token transfers, etc.

## Overview

The [NearBlocks](https://nearblocks.io/) Developer [REST APIs](https://nearblocks.io/apis) are provided as a community service and without warranty, so please use what you need and no more.

NearBlocks also provides an API Pro plan which is a monthly subscription-based API service that provides higher rate limits for power users and commercial solutions. To upgrade to a paid API Plan, head over to the APIs page and select a plan that suits your needs. Once payment has been made, you can create API keys to make requests to our end points.

## Endpoints

You can find the complete API endpoint list in [this page](https://api.nearblocks.io/api-docs/).
You can access the REST APIs using [cURL](http://curl.se), or any HTTP client.

- Mainnet: `https://api.nearblocks.io`
- Testnet: `https://api-testnet.nearblocks.io`

:::note
NearBlocks API supports `GET` requests only.
:::

If you have a Pro subscription, you can pass the API key into a REST API call as `Authorization` header with the following format. Replace `API_KEY` with the key string of your API key. For example, to pass an API key for an Account API:

```sh
 curl -X GET -H "Authorization: Bearer API_KEY" "https://api.nearblocks.io/v1/account/wrap.near"
 ```

:::tip More info

Check the [API documentation](https://api.nearblocks.io/api-docs/) for more information about the NearBlocks API.
:::

## Examples

- All the times **anyone** called `create_drop` on Keypom

```bash
# All the times **anyone** called "create_drop" on Keypom
curl -X GET "https://api.nearblocks.io/v1/account/v2.keypom.near/txns?method=create_drop"
```

<details>
  <summary> Response </summary>

```json
{"cursor":"10055367839","txns":[{"id":"10830753377","receipt_id":"5F79mMVCnRrHRbdYmrSPjRwnAgUBc3H2okMHo69cZcJV","predecessor_account_id":"dragov.near","receiver_account_id":"v2.keypom.near","receipt_kind":"ACTION","receipt_block":{"block_hash":"E3KaP9w1y8CzWFajYBjx9oJFuhjjXuM8vaNPdnAXJeHp","block_height":134346961,"block_timestamp":1733475275522260000},"receipt_outcome":{"gas_burnt":5361098685764,"tokens_burnt":536109868576400000000,"executor_account_id":"v2.keypom.near","status":true},"transaction_hash":"9Y6WvywzX23YLCEuoXDqcaYJMRYihpXWwb4gsBwuXJFX","included_in_block_hash":"yfiq5z1JK6xUzdJk71W1N8yiK65Xt7xFXs6aiKLDtSH","block_timestamp":"1733475274374657534","block":{"block_height":134346960},"receipt_conversion_tokens_burnt":"31845454987000000000","actions":[{"action":"FUNCTION_CALL","method":"create_drop","deposit":1.0426e+24,"fee":536109868576400000000,"args":"{\"drop_id\": \"1733475264350\", \"metadata\": \"{\\\\\\\\\\\\\\\"dropName\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"Vrscert NEAR account creation \\\\\\\\\\\\\\\"}\", \"public_keys\": [\"ed25519:DJrjp8VpUKn3dnfV7Yyt2BHCC3wujjjjynUHhkrJWpVQ\"], \"deposit_per_use\": \"1000000000000000000000000\"}"}],"actions_agg":{"deposit":1.0426e+24},"outcomes":{"status":true},"outcomes_agg":{"transaction_fee":588989004589500000000}}, ...
```

</details>

---

- All the times that `gagdiez.near` called `create_drop` on Keypom

```sh
# All the times that gagdiez.near called "create_drop" on Keypom
curl -X GET "https://api.nearblocks.io/v1/account/v2.keypom.near/txns?method=create_drop&from=gagdiez.near"
```


<details>
  <summary> Response </summary>

```json
{
  "txns": [
    {
      "predecessor_account_id": "gagdiez.near",
      "receiver_account_id": "v2.keypom.near",
      "receipt_kind": "ACTION",
      "receipt_outcome": {
        "status": true,
        ...
      },
      ...
    }
  ]
}
```

</details>
