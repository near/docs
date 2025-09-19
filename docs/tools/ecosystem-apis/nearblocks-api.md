---
id: nearblocks
title: NearBlocks
description: "Learn how NearBlocks API lets you query NEAR accounts, transactions, blocks, and function calls efficiently."
---

[NearBlocks](https://api.nearblocks.io/api-docs/) provides a comprehensive API for accessing on-chain data from the NEAR Protocol. It offers a wide range of endpoints to query various aspects of the blockchain, including accounts, transactions, blocks, functions calls and more.

:::tip Documentation 

You can find the complete endpoint list in [this page](https://api.nearblocks.io/api-docs/)

:::

---

## Endpoints

- Mainnet: `https://api.nearblocks.io`
- Testnet: `https://api-testnet.nearblocks.io`

:::note
NearBlocks API supports `GET` requests only.
:::

If you have a Pro subscription, you can pass the API key into a REST API call as `Authorization` header with the following format. Replace `API_KEY` with the key string of your API key. For example, to pass an API key for an Account API:

```sh
 curl -X GET -H "Authorization: Bearer API_KEY" "https://api.nearblocks.io/v1/account/wrap.near"
 ```
---

## Examples

All the transactions where somebody called `create_drop` on Keypom

```bash
curl -X GET "https://api.nearblocks.io/v1/account/v2.keypom.near/txns?method=create_drop"
```

<details>
  <summary> Response </summary>

```json
{"cursor":"10055367839","txns":[{"id":"10830753377","receipt_id":"5F79mMVCnRrHRbdYmrSPjRwnAgUBc3H2okMHo69cZcJV","predecessor_account_id":"dragov.near","receiver_account_id":"v2.keypom.near","receipt_kind":"ACTION","receipt_block":{"block_hash":"E3KaP9w1y8CzWFajYBjx9oJFuhjjXuM8vaNPdnAXJeHp","block_height":134346961,"block_timestamp":1733475275522260000},"receipt_outcome":{"gas_burnt":5361098685764,"tokens_burnt":536109868576400000000,"executor_account_id":"v2.keypom.near","status":true},"transaction_hash":"9Y6WvywzX23YLCEuoXDqcaYJMRYihpXWwb4gsBwuXJFX","included_in_block_hash":"yfiq5z1JK6xUzdJk71W1N8yiK65Xt7xFXs6aiKLDtSH","block_timestamp":"1733475274374657534","block":{"block_height":134346960},"receipt_conversion_tokens_burnt":"31845454987000000000","actions":[{"action":"FUNCTION_CALL","method":"create_drop","deposit":1.0426e+24,"fee":536109868576400000000,"args":"{\"drop_id\": \"1733475264350\", \"metadata\": \"{\\\\\\\\\\\\\\\"dropName\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"Vrscert NEAR account creation \\\\\\\\\\\\\\\"}\", \"public_keys\": [\"ed25519:DJrjp8VpUKn3dnfV7Yyt2BHCC3wujjjjynUHhkrJWpVQ\"], \"deposit_per_use\": \"1000000000000000000000000\"}"}],"actions_agg":{"deposit":1.0426e+24},"outcomes":{"status":true},"outcomes_agg":{"transaction_fee":588989004589500000000}}, ...
```

</details>

<hr className="subsection" />

All the times that `gagdiez.near` called `create_drop` on Keypom

```sh
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
