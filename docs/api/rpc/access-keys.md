---
id: access-keys
title: RPC Endpoints
sidebar_label: Access Keys
---

## Access Keys

---

### View access key

> Returns information about a single access key for given account.
>
> If `permission` of the key is `FunctionCall`, it will return more details such as the `allowance`, `receiver_id`, and `method_names`.

- method: `query`
- params:
  - `request_type`: `view_access_key`
  - [`finality`](/docs/api/rpc/setup#using-finality-param) _OR_ [`block_id`](/docs/api/rpc/setup#using-block_id-param)
  - `account_id`: _`"example.testnet"`_
  - `public_key`: _`"example.testnet's public key"`_

Example:

<!--DOCUSAURUS_CODE_TABS-->

<!--JSON-->

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

<!--JavaScript-->

```js
const response = await near.connection.provider.query({
  request_type: "view_access_key",
  finality: "final",
  account_id: "client.chainlink.testnet",
  public_key: "ed25519:H9k5eiU4xXS3M4z8HzKJSLaZdqGdGwBG49o7orNC4eZW",
});
```

<!--HTTPie-->

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=query \
  params:='{
    "request_type": "view_access_key",
    "finality": "final",
    "account_id": "client.chainlink.testnet",
    "public_key": "ed25519:H9k5eiU4xXS3M4z8HzKJSLaZdqGdGwBG49o7orNC4eZW"
  }'
```

<!--END_DOCUSAURUS_CODE_TABS-->

<details>
<summary>Example response: </summary>
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

---

### View access key list

> Returns <strong>all</strong> access keys for a given account.

- method: `query`
- params:
  - `request_type`: `view_access_key_list`
  - [`finality`](/docs/api/rpc/setup#using-finality-param) _OR_ [`block_id`](/docs/api/rpc/setup#using-block_id-param)
  - `account_id`: _`"example.testnet"`_

Example:

<!--DOCUSAURUS_CODE_TABS-->

<!--JSON-->

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

<!--JavaScript-->

```js
const response = await near.connection.provider.query({
  request_type: "view_access_key_list",
  finality: "final",
  account_id: "example.testnet",
});
```

<!--HTTPie-->

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=query \
  params:='{
    "request_type": "view_access_key_list",
    "finality": "final",
    "account_id": "example.testnet"
  }'
```

<!--END_DOCUSAURUS_CODE_TABS-->

<details>
<summary>Example response: </summary>
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

---

### View access key changes (single)

> Returns individual access key changes in a specific block. You can query multiple keys by passing an array of objects containing the `account_id` and `public_key`.

- method: `EXPERIMENTAL_changes`
- params:
  - `changes_type`: `single_access_key_changes`
  - `keys`: `[{ account_id, public_key }]`
  - [`finality`](/docs/api/rpc/setup#using-finality-param) _OR_ [`block_id`](/docs/api/rpc/setup#using-block_id-param)

Example:

<!--DOCUSAURUS_CODE_TABS-->

<!--JSON-->

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

<!--JavaScript-->

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

<!--HTTPie-->

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

<!--END_DOCUSAURUS_CODE_TABS-->

<details>
<summary>Example response: </summary>
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

---

### View access key changes (all)

> Returns changes to <strong>all</strong> access keys of a specific block. Multiple accounts can be quereied by passing an array of `account_ids`.

- method: `EXPERIMENTAL_changes`
- params:
  - `changes_type`: `all_access_key_changes`
  - `account_ids`: `[ "example.testnet", "example2.testnet"]`
  - [`finality`](/docs/api/rpc/setup#using-finality-param) _OR_ [`block_id`](/docs/api/rpc/setup#using-block_id-param)

Example:

<!--DOCUSAURUS_CODE_TABS-->

<!--JSON-->

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

<!--JavaScript-->

```js
const response = await near.connection.provider.experimental_changes({
  changes_type: "all_access_key_changes",
  account_ids: "example-acct.testnet",
  finality: "final",
});
```

<!--HTTPie-->

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=EXPERIMENTAL_changes \
  params:='{
    "changes_type": "all_access_key_changes",
    "account_ids": ["example-acct.testnet"],
    "block_id": "4kvqE1PsA6ic1LG7S5SqymSEhvjqGqumKjAxnVdNN3ZH"
  }'
```

<!--END_DOCUSAURUS_CODE_TABS-->

<details>
<summary>Example response: </summary>
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

---
