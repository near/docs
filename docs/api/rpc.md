---
id: rpc
title: RPC Endpoints
sidebar_label: API / RPC Endpoints
---

## Setup

- `POST` for all methods
- `JSON RPC 2.0`
- `id: "dontcare"`
- endpoint URL varies by network:
  - MainNet `https://rpc.mainnet.near.org`
  - TestNet `https://rpc.testnet.near.org`
  - BetaNet `https://rpc.betanet.near.org` _(may be unstable)_

You can see this interface defined in `nearcore` [here](https://github.com/near/nearcore/blob/bf9ae4ce8c680d3408db1935ebd0ca24c4960884/chain/jsonrpc/client/src/lib.rs#L181).

### Postman Setup

> An easy way to test the examples below, would be to use an API request tool such as [Postman](https://www.postman.com/). You will only need to configure two things:

1. Make sure you add a header with a key of `Content-Type` and value of `application/json`.
   ![postman-setup-header](/docs/assets/postman-setup-headers.png)

2. Then select the `Body` tab and choose the `raw` radio button and ensure `JSON` is the selected format.
   ![postman-setup-header](/docs/assets/postman-setup-body.png)

After that is set up, just copy/paste the `JSON object` example snippets below into the `body` of your request, on Postman, and click `send`.

### HTTPie Setup

> If you prefer to use a command line interface, we have provided RPC examples you can use with [HTTPie](https://httpie.org/). Please note that params take either an object or array passed as a string.

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=query params:='{}'
```

### Using `block_id` param

> The block IDs of transactions shown in <a href="https://explorer.testnet.near.org">NEAR Explorer</a> are not necessarily the block ID of the executed transaction. Transactions may execute a block or two after its recorded, and in some cases, can take place over several blocks. Due to this, it is important to to check subsequent blocks to be sure all results related to the queried transaction are discovered.

---

## Access Keys

---

### View access key

> Returns information about a single access key for given account.
>
> If `permission` of the key is `FuncationCall`, it will return more details such as the `allowance`, `receiver_id`, and `method_names`.

- method: `query`
- params:
  - `request_type`: `view_access_key`
  - `finality`: `optimistic` or `final`
  - `account_id`: _`"example.testnet"`_
  - `public_key`: _`"example.testnet's public key"`_

Example:

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

<details>
<summary>HTTPie example: </summary>
<p>

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=query \
  params:='{
    "request_type": "view_access_key",
    "finality": "final",
    "account_id": "client.chainlink.testnet",
    "public_key": "ed25519:H9k5eiU4xXS3M4z8HzKJSLaZdqGdGwBG49o7orNC4eZW"
  }'
```

</p>
</details>

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
  - `finality`: `optimistic` or `final`
  - `account_id`: _`"example.testnet"`_

Example:

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

<details>
<summary>HTTPie example: </summary>
<p>

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=query \
  params:='{
    "request_type": "view_access_key_list",
    "finality": "final",
    "account_id": "example.testnet"
  }'
```

</p>
</details>

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
  - `block_id`: `block hash` or `block number` _([be sure to check subsequent blocks](/docs/api/rpc#using-block_id-param))_

Example:

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
    "block_id": "4kvqE1PsA6ic1LG7S5SqymSEhvjqGqumKjAxnVdNN3ZH"
  }
}
```

<details>
<summary>HTTPie example: </summary>
<p>

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
    "block_id": "4kvqE1PsA6ic1LG7S5SqymSEhvjqGqumKjAxnVdNN3ZH"
  }'
```

</p>
</details>

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
  - `account_ids `: `[ "example.testnet", "example2.testnet"]`
  - `block_id`: `block hash` or `block number` _([be sure to check subsequent blocks](/docs/api/rpc#using-block_id-param))_

Example:

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

<details>
<summary>HTTPie example: </summary>
<p>

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=EXPERIMENTAL_changes \
  params:='{
    "changes_type": "all_access_key_changes",
    "account_ids": ["example-acct.testnet"],
    "block_id": "4kvqE1PsA6ic1LG7S5SqymSEhvjqGqumKjAxnVdNN3ZH"
  }'
```

</p>
</details>

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

## Accounts / Contracts

---

### View account

> Returns basic account information.

- method: `query`
- params:
  - `request_type`: `view_account`
  - `finality`: `optimistic` or `final`
  - `account_id`: _`"example.testnet"`_

Example:

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

<details>
<summary>HTTPie example: </summary>
<p>

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=query \
  params:='{
    "request_type": "view_account",
    "finality": "final",
    "account_id": "nearkat.testnet"
  }'
```

</p>
</details>

<details>
<summary>Example response: </summary>
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

---

### View account changes

> Returns account changes from transactions in a given account.

- method: `EXPERIMENTAL_changes`
- params:
  - `changes_type`: `account_changes`
  - `account_ids`: [`"example.testnet"`]
  - `block_id`: `block hash` or `block number` _([be sure to check subsequent blocks](/docs/api/rpc#using-block_id-param))_

Example:

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

<details>
<summary>HTTPie example: </summary>
<p>

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=EXPERIMENTAL_changes \
  params:='{
    "changes_type": "account_changes",
    "account_ids": ["your_account.testnet"],
    "block_id": 19703467
  }'
```

</p>
</details>

<details>
<summary>Example response: </summary>
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

---

### View contract state

> Returns the state (key value pairs) of a contract based on the key prefix (base64 encoded). Pass an empty string for `prefix_base64` if you would like to return the entire state. Please note that the returned state will be base64 encoded as well.

- method: `query`
- params:
  - `request_type`: `view_state`
  - `finality`: `optimistic` or `final`
  - `account_id`: `"guest-book.testnet"`,
  - `prefix_base64`: `""`

Example:

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

<details>
<summary>HTTPie Example: </summary>
<p>

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=query \
  params:='{
    "request_type": "view_state",
    "finality": "final",
    "account_id": "guest-book.testnet",
    "prefix_base64": ""
  }'
```

</p>
</details>

<details>
<summary>Example response: </summary>
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
</details>

---

### View contract state changes

> Returns the state change details of a contract based on the key prefix (encoded to base64). Pass an empty string for this param if you would like to return all state changes.

- method: `EXPERIMENTAL_changes`
- params:
  - `changes_type`: `data_changes`
  - `account_ids`: `["example.testnet"]`,
  - `key_prefix_base64`: `"base64 encoded key value"`,
  - `block_id`: `block id` or `"block hash"` _([be sure to check subsequent blocks](/docs/api/rpc#using-block_id-param))_

Example:

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

<details>
<summary>HTTPie Example: </summary>
<p>

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=EXPERIMENTAL_changes \
  params:='{
    "changes_type": "data_changes",
    "account_ids": ["guest-book.testnet"],
    "key_prefix_base64": "",
    "block_id": 19450732
  }'
```

</p>
</details>

<details>
<summary>Example response: </summary>
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

---

### View contract code changes

> Returns code changes made when deploying a contract. Change is returned is a base64 encoded WASM file.

- method: `EXPERIMENTAL_changes`
- params:
  - `changes_type`: `contract_code_changes`
  - `account_ids`: `["example.testnet"]`,
  - `block_id`: `block id` or `"block hash"` _([be sure to check subsequent blocks](/docs/api/rpc#using-block_id-param))_

Example:

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

<details>
<summary>HTTPie Example: </summary>
<p>

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=EXPERIMENTAL_changes \
  params:='{
    "changes_type": "contract_code_changes",
    "account_ids": ["dev-1602714453032-7566969"],
    "block_id": 20046655
  }'
```

</p>
</details>

<details>
<summary>Example response: </summary>
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
          "code_base64": "AGFzbQEAAAABpAM3YAF/AGAAAX9gAn9+AGADf35+AGAEf35+fgF+YAZ/fn5+fn4BfmADf35+AX5gAn9+AX5gAn9/AX9gAn9/AGADf39/AX9gAX8BfmACfn4AYAF+AX5gAX4AYAABfmADfn5+AGAAAGAIfn5+fn5+fn4BfmAJfn5+fn5+fn5+AX5gAn5+AX5gA35+fgF+YAd+fn5+fn5+AGAEfn5+fgBgCX5+fn5+fn5+fgBgBX5+fn5+AX5gA39/fwBgAX8Bf2ACf3wAYAR/f39+AGAFf39/fn8AYAV/f39/fwBgBH9/f38AYAN/f38BfmADf39+AGACf38BfmAFf39/f38Bf2AEf39/fwF/YAZ/f39/f38AYAV/f35/fwBgBH9+f38Bf2ACf34Bf2AHf35+f39+fwBgBX9/f39+AGAEf35+fgBgCX9+fn5+fn5+fgF+YAp/fn5+fn5+fn5+AX5gCH9+fn5+fn5+AGAFf35+fn4AYAp/fn5+fn5+fn5+AGAHf39/f39/fwBgBH98f38Bf2AGf39/f39/AX9gB39/f39/f38Bf2ADfn9/AX8ClwkwA2Vudg1yZWFkX3JlZ2lzdGVyAAwDZW52DHJlZ2lzdGVyX2xlbgANA2VudhJjdXJyZW50X2FjY291bnRfaWQADgNlbnYRc2lnbmVyX2FjY291bnRfaWQADgNlbnYRc2lnbmVyX2FjY291bnRfcGsADgNlbnYWcHJlZGVjZXNzb3JfYWNjb3VudF9pZAAOA2VudgVpbnB1dAAOA2VudgtibG9ja19pbmRleAAPA2Vudg9ibG9ja190aW1lc3RhbXAADwNlbnYMZXBvY2hfaGVpZ2h0AA8DZW52DXN0b3JhZ2VfdXNhZ2UADwNlbnYPYWNjb3VudF9iYWxhbmNlAA4DZW52FmFjY291bnRfbG9ja2VkX2JhbGFuY2UADgNlbnYQYXR0YWNoZWRfZGVwb3NpdAAOA2VudgtwcmVwYWlkX2dhcwAPA2Vudgh1c2VkX2dhcwAPA2VudgtyYW5kb21fc2VlZAAOA2VudgZzaGEyNTYAEANlbnYJa2VjY2FrMjU2ABADZW52CWtlY2NhazUxMgAQA2Vudgx2YWx1ZV9yZXR1cm4ADANlbnYFcGFuaWMAEQNlbnYKcGFuaWNfdXRmOAAMA2Vudghsb2dfdXRmOAAMA2Vudglsb2dfdXRmMTYADANlbnYOcHJvbWlzZV9jcmVhdGUAEgNlbnYMcHJvbWlzZV90aGVuABMDZW52C3Byb21pc2VfYW5kABQDZW52FHByb21pc2VfYmF0Y2hfY3JlYXRlABQDZW52EnByb21pc2VfYmF0Y2hfdGhlbgAVA2VudiNwcm9taXNlX2JhdGNoX2FjdGlvbl9jcmVhdGVfYWNjb3VudAAOA2VudiRwcm9taXNlX2JhdGNoX2FjdGlvbl9kZXBsb3lfY29udHJhY3QAEANlbnYicHJvbWlzZV9iYXRjaF9hY3Rpb25fZnVuY3Rpb25fY2FsbAAWA2Vudh1wcm9taXNlX2JhdGNoX2FjdGlvbl90cmFuc2ZlcgAMA2Vudhpwcm9taXNlX2JhdGNoX2FjdGlvbl9zdGFrZQAXA2Vudi1wcm9taXNlX2JhdGNoX2FjdGlvbl9hZGRfa2V5X3dpdGhfZnVsbF9hY2Nlc3MAFwNlbnYvcHJvbWlzZV9iYXRjaF9hY3Rpb25fYWRkX2tleV93aXRoX2Z1bmN0aW9uX2NhbGwAGANlbnYfcHJvbWlzZV9iYXRjaF9hY3Rpb25fZGVsZXRlX2tleQAQA2VudiNwcm9taXNlX2JhdGNoX2FjdGlvbl9kZWxldGVfYWNjb3VudAAQA2VudhVwcm9taXNlX3Jlc3VsdHNfY291bnQADwNlbnYOcHJvbWlzZV9yZXN1bHQAFANlbnYOcHJvbWlzZV9yZXR1cm4ADgNlbnYNc3RvcmFnZV93cml0ZQAZA2VudgxzdG9yYWdlX3JlYWQAFQNlbnYOc3RvcmFnZV9yZW1vdmUAFQNlbnYPc3RvcmFnZV9oYXNfa2V5ABQDZW52D3ZhbGlkYXRvcl9zdGFrZQAQA2VudhV2YWxpZGF0b3JfdG90YWxfc3Rha2UADgPCB8AHGhoaGgkJCQAJGgkaCRoJGgkaCRoJGgkaCQkbCQkJCQkJCQkKHAkcCRwICgkICBsACRsaCR0eHh4eGh0bGwkfCgAJCQkbGxsAHx8AAAkJCAkgGgkJABoaGhoaGhoaCQkJCQkJCQkICgkhACAgCQkIAAkICAgICAgICAgICAgICAgICAgICCIjCwkAAAAAGgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIRoJAAkaCQkJCiQJCRol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CGoQt4aAgAAgACADKQMANwIADAELIAMgBDcDCCADIANBCGoQt4aAgAAgACADKQMANwIACyADQRBqJICAgIAAC7UBAgF/AX4jgICAgABBEGsiAySAgICAACADQQhqIAEgAhD5gYCAAAJAAkACQCADKQMIIgSnQf8BcUEDRw0AIANBCGogAUEIaiACELCAgIAAIAMpAwgiBKdB/wFxQQNHDQEgAEEDOgAADAILIAMgBDcDCCADIANBCGoQt4aAgAAgACADKQMANwIADAELIAMgBDcDCCADIANBCGoQt4aAgAAgACADKQMANwIACyADQRBqJICAgIAAC4sDBAF/AX4CfwF+I4CAgIAAQeAAayICJICAgIAAIAJBOGogARC1gICAACACKQI8IQMCQAJAAkAgAigCOEEBRg0AIAIgAkHEAGoiBCgCADYCGCACIAM3AxAgAkE4aiABELaAgIAAIAJBIGpBCGoiASACQThqQRRqKQIANwMAIAJBMGoiBSACQThqQRxqKAIANgIAIAIgBCkCADcDICACKQI8IQMgAigCOEEBRg0BIAJBCGogAkEQakEIaigCACIENgIAIAIgAikDECIGNwMAIABBCGogA0IgiD4CACAAQQxqIAIpAyA3AgAgAEEUaiABKQMANwIAIABBHGogBSgCADYCACAAQSBqIAY3AwAgAEEoaiAENgIAIABBADYCAAwCCyACIAM3AzggAkEgaiACQThqELeGgIAAIAAgAikDIDcCBCAAQQE2AgAMAQsgAiADNwM4IAJB2ABqIAJBOGoQt4aAgAAgACACKQNYNwIEIABBATYCACACQRBqELeAgIAACyACQeAAaiSAgICAAAvLBAEDfyOAgICAAEHgAGsiAiSAgICAAAJAAkACQAJAAkACQCABKAIEIgNBBEkNACACQShqIAEoAgAgA0EEQaiLwIAAEOuBgIAAIAJB0ABqIAIoAiggAigCLBC7hoCAACACLQBQQQFGDQQgAigAUSEDIAJBIGogASgCACABKAIEQQRByIvAgAAQ7YGAgAAgASACKQMgNwIAIANFDQEgAkEYaiADELqGgIAAIAIoAhgNAiABKAIEIgQgAigCHCIDSQ0DIAJBEGogASgCACAEIANB+IzAgAAQ64GAgAAgAkEwaiACKAIQIAIoAhQQhoKAgAAgAkEIaiABKAIAIAEoAgQgA0GIjcCAABDtgYCAACABIAIpAwg3AgAgAkHQAGpBCGoiASACQTBqQQhqKAIANgIAIAIgAikDMDcDUCACQcAAaiACQdAAahCHhoCAACABKAIAIAIoAlQQloaAgAAgAEEMaiACQcAAakEIaigCADYCACAAIAIpA0A3AgQgAEEANgIADAULIAJB0ABqQQtBqIrAgABBGhCDhYCAACACIAIpA1A3A1AgAkHAAGogAkHQAGoQt4aAgAAgACACKQNANwIEIABBATYCAAwECyAAQoCAgIAQNwIAIABBCGpCADcCAAwDCyAAQQE2AgAgAEKBFjcCBAwCCyACQdAAakELQaiKwIAAQRoQg4WAgAAgAEEBNgIAIAAgAikDUDcCBAwBC0HcicCAAEErIAJBwABqQZiKwIAAQbiLwIAAEKqHgIAAAAsgAkHgAGokgICAgAALhgICAn8CfiOAgICAAEEwayICJICAgIAAIAJBGGogARD7gYCAACACQRBqIAJBJGoiAygCADYCACACIAIpAhw3AwgCQAJAAkAgAigCGEEBRg0AIAIpAgwhBCACQRhqIAEQtYCAgAAgAikCHCEFIAIoAhhBAUYNASADKAIAIQEgAEEANgIAIABBGGogATYCACAAQRBqIAU3AwAgAEEIaiAENwMADAILIAIgAikDCDcDGCACQShqIAJBGGoQt4aAgAAgACACKQMoNwIEIABBATYCAAwBCyACIAU3AxggAkEoaiACQRhqELeGgIAAIAAgAikDKDcCBCAAQQE2AgALIAJBMGokgICAgAALEgAgABCZhoCAACAAEJuGgIAAC4YCAgJ/An4jgICAgABBMGsiAiSAgICAACACQRhqIAEQ+4GAgAAgAkEQaiACQSRqIgMoAgA2AgAgAiACKQIcNwMIAkACQAJAIAIoAhhBAUYNACACKQIMIQQgAkEYaiABELWAgIAAIAIpAhwhBSACKAIYQQFGDQEgAygCACEBIABBADYCACAAQRhqIAE2AgAgAEEQaiAFNwMAIABBCGogBDcDAAwCCyACIAIpAwg3AxggAkEoaiACQRhqELeGgIAAIAAgAikDKDcCBCAAQQE2AgAMAQsgAiAFNwMYIAJBKGogAkEYahC3hoCAACAAIAIpAyg3AgQgAEEBNgIACyACQTBqJICAgIAACzYBAX8jgICAgABBEGsiAySAgICAACADIAEgAhDLhYCAACAAIAMQuoCAgAAgA0EQaiSAgICAAAvMAQIBfwF+I4CAgIAAQTBrIgIkgICAgAAgAkEgakEIaiABQQhqKAIANgIAIAIgASkCADcDICACIAJBIGoQwYWAgAAgAkEgaiACEM2AgIAAAkACQAJAIAIoAiBBAUcNACAAIAIoAiQ2AgQgAEEBNgIADAELIAIpAyghAwJAIAIQyoCAgAAiAQ0AIABBADYCACAAQQhqIAM3AwAgAkEMahC3gICAAAwCCyAAQQE2AgAgACABNgIECyACQQxqELeAgIAACyACQTBqJICAgIAACzYBAX8jgICAgABBEGsiAySAgICAACADIAEgAhDLhYCAACAAIAMQvICAgAAgA0EQaiSAgICAAAvNAQECfyOAgICAAEEwayICJICAgIAAIAJBIGpBCGogAUEIaigCADYCACACIAEpAgA3AyAgAiACQSBqEMGFgIAAIAJBIGogAhDQgICAAAJAAkACQCACLQAgQQFHDQAgAEEBOgAAIABBBGogAigCJDYCAAwBCyACLQAhIQMCQCACEMqAgIAAIgENACAAQQA6AAAgACADOgABIAJBDGoQt4CAgAAMAgsgAEEBOgAAIABBBGogATYCAAsgAkEMahC3gICAAAsgAkEwaiSAgICAAAs2AQF/I4CAgIAAQRBrIgMkgICAgAAgAyABIAIQy4WAgAAgACADEL6AgIAAIANBEGokgICAgAALzAECAX8BfiOAgICAAEEwayICJICAgIAAIAJBIGpBCGogAUEIaigCADYCACACIAEpAgA3AyAgAiACQSBqEMGFgIAAIAJBIGogAhDRgICAAAJAAkACQCACKAIgQQFHDQAgACACKAIkNgIEIABBATYCAAwBCyACKQMoIQMCQCACEMqAgIAAIgENACAAQQA2AgAgAEEIaiADNwMAIAJBDGoQt4CAgAAMAgsgAEEBNgIAIAAgATYCBAsgAkEMahC3gICAAAsgAkEwaiSAgICAAAs2AQF/I4CAgIAAQRBrIgMkgICAgAAgAyABIAIQy4WAgAAgACADEMCAgIAAIANBEGokgICAgAALiAIBAX8jgICAgABBwABrIgIkgICAgAAgAkEwakEIaiABQQhqKAIANgIAIAIgASkCADcDMCACIAJBMGoQwYWAgAAgAkEwaiACEM+AgIAAAkACQAJAIAIoAjBBAUcNACAAIAIoAjQ2AgQgAEEBNgIADAELIAJBIGpBCGogAkEwakEMaigCADYCACACIAIpAjQ3AyACQCACEMqAgIAAIgENACAAQQRqIgEgAikDIDcCACAAQQA2AgAgAUEIaiACQSBqQQhqKAIANgIAIAJBDGoQt4CAgAAMAgsgAEEBNgIAIAAgATYCBCACQSBqELeAgIAACyACQQxqELeAgIAACyACQcAAaiSAgICAAAs2AQF/I4CAgIAAQRBrIgMkgICAgAAgAyABIAIQy4WAgAAgACADEMKAgIAAIANBEGokgICAgAALiAIBAX8jgICAgABBwABrIgIkgICAgAAgAkEwakEIaiABQQhqKAIANgIAIAIgASkCADcDMCACIAJBMGoQwYWAgAAgAkEwaiACEMuAgIAAAkACQAJAIAIoAjBBAUcNACAAIAIoAjQ2AgQgAEEBNgIADAELIAJBIGpBCGogAkEwakEMaigCADYCACACIAIpAjQ3AyACQCACEMqAgIAAIgENACAAQQRqIgEgAikDIDcCACAAQQA2AgAgAUEIaiACQSBqQQhqKAIANgIAIAJBDGoQt4CAgAAMAgsgAEEBNgIAIAAgATYCBCACQSBqELeAgIAACyACQQxqELeAgIAACyACQcAAaiSAgICAAAs2AQF/I4CAgIAAQRBrIgMkgICAgAAgAyABIAIQy4WAgAAgACADEMSAgIAAIANBEGokgICAgAALzAECAX8BfiOAgICAAEEwayICJICAgIAAIAJBIGpBCGogAUEIaigCADYCACACIAEpAgA3AyAgAiACQSBqEMGFgIAAIAJBIGogAhDOgICAAAJAAkACQCACKAIgQQFHDQAgACACKAIkNgIEIABBATYCAAwBCyACKQMoIQMCQCACEMqAgIAAIgENACAAQQA2AgAgAEEIaiADNwMAIAJBDGoQt4CAgAAMAgsgAEEBNgIAIAAgATYCBAsgAkEMahC3gICAAAsgAkEwaiSAgICAAAs2AQF/I4CAgIAAQRBrIgMkgICAgAAgAyABIAIQy4WAgAAgACADEMaAgIAAIANBEGokgICAgAALlAIBAX8jgICAgABB0ABrIgIkgICAgAAgAkE4akEIaiABQQhqKAIANgIAIAIgASkCADcDOCACQQhqIAJBOGoQwYWAgAAgAkE4aiACQQhqEMyAgIAAAkACQAJAIAIoAjhBAUcNACAAIAIoAjw2AgQgAEEBNgIADAELIAJBKGpBCGogAkE4akEMaikCADcDACACIAIpAjw3AygCQCACQQhqEMqAgIAAIgENACAAQQRqIgEgAikDKDcCACAAQQA2AgAgAUEIaiACQShqQQhqKQMANwIAIAJBCGpBDGoQt4CAgAAMAgsgAEEBNgIAIAAgATYCBCACQShqELeAgIAACyACQRRqELeAgIAACyACQdAAaiSAgICAAAs2AQF/I4CAgIAAQRBrIgMkgICAgAAgAyABIAIQy4WAgAAgACADEMiAgIAAIANBEGokgICAgAALqwIBAn8jgICAgABB0ABrIgIkgICAgAAgAkE4akEIaiABQQhqKAIANgIAIAIgASkCADcDOCACIAJBOGoQwYWAgAAgAkE4aiACEMmAgIAAAkACQAJAIAIoAjhBAUcNACAAIAIoAjw2AgQgAEEBNgIADAELIAJBIGpBEGoiAyACQcwAaigCADYCACACQSBqQQhqIAJBOGpBDGopAgA3AwAgAiACKQI8NwMgAkAgAhDKgICAACIBDQAgAEEEaiIBIAIpAyA3AgAgAEEANgIAIAFBEGogAygCADYCACABQQhqIAJBIGpBCGopAwA3AgAgAkEMahC3gICAAAwCCyAAQQE2AgAgACABNgIEIAJBIGoQt4CAgAALIAJBDGoQt4CAgAALIAJB0ABqJICAgIAACxQAIAAgASAAIAAgACAAEKCDgIAAC2wBAn8jgICAgABBIGsiASSAgICAACABQQhqIAAQ4ICAgAACQAJAIAEtAAhBAUcNACABKAIMIQIMAQtBACECIAEtAAlBAUcNACABQRM2AhAgACABQRBqENmAgIAAIQILIAFBIGokgICAgAAgAgsUACAAIAEgACAAIAAgABCag4CAAAsUACAAIAEgACAAIAAgABCZg4CAAAsUACAAIAEgACAAIAAgABCbg4CAAAsUACAAIAEgACAAIAAgABCcg4CAAAsUACAAIAEgACAAIAAgABCdg4CAAAsUACAAIAEgACAAIAAgABCfg4CAAAsUACAAIAEgACAAIAAgABCeg4CAAAu0AQIBfwF+I4CAgIAAQSBrIgIkgICAgAACQAJAAkACQCABKAIADgMBAgABCwJAAkAgASkDCCIDQn9VDQAgAkECOgAIIAIgAzcDECAAIAJBCGogAkEYakGogcCAABDTgICAADYCBEEBIQEMAQsgAEEIaiADNwMAQQAhAQsgACABNgIADAILIAAgASsDCBDUgICAAAwBCyAAQQA2AgAgAEEIaiABKQMINwMACyACQSBqJICAgIAAC6UBAgF/AX4jgICAgABBwABrIgMkgICAgAAgAyACNgIUIAMgATYCECADQQhqIABBgYCAgAAQk4WAgAAgAykDCCEEIAMgA0EQakGCgICAABCShYCAACADQSxqQQI2AgAgAyAENwMwIANCAjcCHCADQYSMwIAANgIYIAMgAykDADcDOCADIANBMGo2AiggA0EYahDJhYCAACEAIANBwABqJICAgIAAIAALVAECfyOAgICAAEEgayICJICAgIAAIAJBAzoACCACIAE5AxAgAkEIaiACQRhqQaiBwIAAEMOFgIAAIQMgAEEBNgIAIAAgAzYCBCACQSBqJICAgIAAC/gBAgF/AX4jgICAgABBIGsiAiSAgICAAAJAAkACQAJAIAEoAgAOAwECAAELAkACQCABKQMIIgNCgAJUDQAgAkECOgAIIAIgAzcDECAAQQRqIAJBCGogAkEYakGIgcCAABDTgICAADYCAEEBIQEMAQsgACADPAABQQAhAQsgACABOgAADAILIAAgASsDCBDWgICAAAwBCwJAAkAgASkDCCIDQoACVA0AQQEhASACQQE6AAggAiADNwMQIABBBGogAkEIaiACQRhqQYiBwIAAENOAgIAANgIADAELIAAgAzwAAUEAIQELIAAgAToAAAsgAkEgaiSAgICAAAtXAQJ/I4CAgIAAQSBrIgIkgICAgAAgAkEDOgAIIAIgATkDECACQQhqIAJBGGpBiIHAgAAQw4WAgAAhAyAAQQE6AAAgAEEEaiADNgIAIAJBIGokgICAgAAL+gECAX8BfiOAgICAAEEgayICJICAgIAAAkACQAJAAkAgASgCAA4DAQIAAQsCQAJAIAEpAwgiA0KAgARUDQAgAkECOgAIIAIgAzcDECAAQQRqIAJBCGogAkEYakGYgcCAABDTgICAADYCAEEBIQEMAQsgACADPQECQQAhAQsgACABOwEADAILIAAgASsDCBDYgICAAAwBCwJAAkAgASkDCCIDQoCABFQNAEEBIQEgAkEBOgAIIAIgAzcDECAAQQRqIAJBCGogAkEYakGYgcCAABDTgICAADYCAAwBCyAAIAM9AQJBACEBCyAAIAE7AQALIAJBIGokgICAgAALVwECfyOAgICAAEEgayICJICAgIAAIAJBAzoACCACIAE5AxAgAkEIaiACQRhqQZiBwIAAEMOFgIAAIQMgAEEBOwEAIABBBGogAzYCACACQSBqJICAgIAAC2sBAn8jgICAgABBIGsiAiSAgICAACACQQhqIAAQx4WAgAAgAigCDCEAIAIoAgghAyACQRBqQQhqIAFBCGooAgA2AgAgAiABKQIANwMQIAJBEGogAyAAEMaFgIAAIQEgAkEgaiSAgICAACABC8kBAQF/I4CAgIAAQSBrIgMkgICAgAAgAyABIAIQk4aAgAAgAygCBCECIAMoAgAhAQJAAkADQAJAIAIgAUcNAEEAIQEMAwsgA0EIaiAAENuAgIAAAkAgAy0ACEEBRw0AIAMoAgwhAQwDCyADLQAJQQFHDQECQCADLQAKIAEtAABHDQAgAUEBaiEBDAELCyADQQk2AhAgACADQRBqENyAgIAAIQEMAQsgA0EFNgIQIAAgA0EQahDcgICAACEBCyADQSBqJICAgIAAIAELTQEDf0EAIQICQCABKAIIIgMgASgCBE8NACABKAIAIANqLQAAIQRBASECIAEgA0EBajYCCAsgACACOgABIABBADoAACAAQQJqIAQ6AAALawECfyOAgICAAEEgayICJICAgIAAIAJBCGogABDFhYCAACACKAIMIQAgAigCCCEDIAJBEGpBCGogAUEIaigCADYCACACIAEpAgA3AxAgAkEQaiADIAAQxoWAgAAhASACQSBqJICAgIAAIAELZAEBfyOAgICAAEEQayICJICAgIAAAkACQCAAKAIMRQ0AIAAhAQwBCyACQQhqIABBCGooAgA2AgAgAiAAKQIANwMAIAEgAhDcgICAACEBIAAQhIGAgAALIAJBEGokgICAgAAgAQvdCAEGfyOAgICAAEEwayIBJICAgIAAIABBDGoiAhDfgICAAEEAIQMCQAJAAkACQAJAA0AgAUEYaiAAEOCAgIAAIAEtABhBAUYNBCABLQAZQQFHDQMCQAJAAkACQAJAIAEtABoiBEEiRg0AAkACQCAEQS1GDQAgBEHbAEYNAwJAIARB5gBGDQAgBEHuAEYNBQJAIARB9ABGDQAgBEH7AEYNBSAEQVBqQf8BcUEKSQ0DIAFBCjYCICAAIAFBIGoQ2YCAgAAhBAwOCyAAIAAoAghBAWo2AgggAEGEgMCAAEEDENqAgIAAIgQNDQwGCyAAIAAoAghBAWo2AgggAEGAgMCAAEEEENqAgIAAIgQNDAwFCyAAIAAoAghBAWo2AggLIAAQ4YCAgAAiBA0KDAMLIAAgACgCCEEBajYCCCAAENGFgIAAIgQNCQwCC0EAIQUgAiADQf//A3FBAEcgBhDigICAACAAIAAoAghBAWo2AgggBCEGDAILIAAgACgCCEEBajYCCCAAQYeAwIAAQQMQ2oCAgAAiBA0HC0EBIQUgA0H//wNxDQAgAUEQaiACEOOAgIAAIAEtABBBAXFFDQMgAS0AESEGCwJAA0AgAUEYaiAAEOCAgIAAIAEtABhBAUYNBgJAAkACQAJAAkACQAJAIAEtABlBAUYNACAGQf8BcSIGQdsARg0BIAZB+wBGDQJBioDAgABBKEH4gMCAABCKhoCAAAALIAEtABoiBEHdAEYNAwJAIARB/QBGDQAgBEEsRw0GIAVBAXFFDQggACAAKAIIQQFqNgIIDAgLIAZB/wFxQfsARg0EDAULIAFBAjYCIAwBCyABQQM2AiALIAAgAUEgahDZgICAACEEDAoLIAZB/wFxQdsARw0BCyAAIAAoAghBAWo2AgggAUEIaiACEOOAgIAAIAEtAAhBAXFFDQUgAS0ACSEGQQEhBQwBCwsgBUEBcUUNAAJAAkACQCAGQf8BcSIGQdsARg0AIAZB+wBGDQFBioDAgABBKEH4gMCAABCKhoCAAAALIAFBBzYCIAwBCyABQQg2AiALIAAgAUEgahDZgICAACEEDAYLQQEhAyAGQf8BcUH7AEcNACABQRhqIAAQ4ICAgAAgAS0AGEEBRg0EAkAgAS0AGUEBRg0AIAFBAzYCICAAIAFBIGoQ2YCAgAAhBAwGCyABLQAaQSJHDQEgACAAKAIIQQFqNgIIIAAQ0YWAgAAiBA0FIAFBGGogABDggICAACABLQAYQQFGDQQCQCABLQAZQQFGDQAgAUEDNgIgIAAgAUEgahDZgICAACEEDAYLAkAgAS0AGkE6Rw0AQQEhAyAAIAAoAghBAWo2AggMAQsLIAFBBjYCICAAIAFBIGoQ2YCAgAAhBAwECyABQRA2AiAgACABQSBqENmAgIAAIQQMAwtBACEEDAILIAFBBTYCICAAIAFBIGoQ2YCAgAAhBAwBCyABKAIcIQQLIAFBMGokgICAgAAgBAsMACAAQQAQt4WAgAALewEGfyABKAIIIQIgASgCACEDIAEoAgQhBAJAA0ACQCACIARJDQBBACEFDAILQQEhBSADIAJqLQAAIgZBd2oiB0EXSw0BQQEgB3RBk4CABHFFDQEgASACQQFqIgI2AggMAAsLIAAgBToAASAAQQA6AAAgAEECaiAGOgAAC8oCAQR/I4CAgIAAQSBrIgEkgICAgAAgAUEIaiAAEO2AgIAAAkACQCABLQAIQQFHDQAgASgCDCECDAELAkACQCABLQAJIgNBMEcNACAAKAIIIgMgACgCBCIETw0BIAAoAgAgA2otAABBUGpB/wFxQQlLDQEgAUEMNgIQIAAgAUEQahDZgICAACECDAILAkAgA0FPakH/AXFBCEsNACAAKAIIIQMgACgCACECIAAoAgQhBANAIAMgBE8NAiACIANqLQAAQVBqQf8BcUEJSw0CIAAgA0EBaiIDNgIIDAALCyABQQw2AhAgACABQRBqENyAgIAAIQIMAQtBACECIAMgBE8NAAJAIAAoAgAgA2otAAAiA0HlAEYNACADQcUARg0AIANBLkcNASAAEOuAgIAAIQIMAQsgABDsgICAACECCyABQSBqJICAgIAAIAILhAEBA38jgICAgABBEGsiAySAgICAACAAIAEQ94WAgAAgABCHhoCAACEEIAAoAgghBSADIAI6AAkgAyABOgAIAkADQCADIANBCGoQ/YGAgAAgAy0AAEEBcUUNASAEIAVqIAMtAAE6AAAgBUEBaiEFDAALCyAAIAU2AgggA0EQaiSAgICAAAtIAQF/AkACQCABKAIIIgINAEEAIQEMAQsgASACQX9qNgIIIAEQh4aAgAAgASgCCGotAAAhAkEBIQELIAAgAjoAASAAIAE6AAALpAICAn8CfiOAgICAAEEQayIEJICAgIAAAkACQAJAAkACQAJAAkAgASgCCCIFIAEoAgRPDQAgASgCACAFai0AACIFQS5GDQEgBUHFAEYNAiAFQeUARg0CC0IBIQYgAkUNAyADIQcMBAsgBCABIAIgA0EAEOWAgIAAIAQoAgBBAUcNASAAIAQoAgQ2AgQgAEEBNgIADAQLIAQgASACIANBABDm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AQsgACABOgAAIAJBEGokgICAgAALvAEBAn8jgICAgABBEGsiBSSAgICAAAJAAkACQCADDQAgBA0BCyABKAIIIQMgASgCACEGIAEoAgQhBANAAkACQCADIARPDQAgBiADai0AAEFQakH/AXFBCkkNAQsgAEEIakQAAAAAAAAAAEQAAAAAAAAAgCACGzkDAEEAIQMMAwsgASADQQFqIgM2AggMAAsLIAVBDTYCACAAIAEgBRDcgICAADYCBEEBIQMLIAAgAzYCACAFQRBqJICAgIAAC9sFAQN/I4CAgIAAQTBrIgMkgICAgAACQAJAAkACQAJAAkACQAJAAkACQAJAAkAgACgCCCIEIAAoAgRPDQAgACgCACAEai0AACIFQSJGDQYgBUEtRg0EIAVB5gBGDQMgBUHuAEYNASAFQfQARg0CIAVB2wBGDQcgBUH7AEYNCCAFQVBqQf8BcUEKSQ0FCyADQQo2AgggACADQQhqENmAgIAAIQUMCAsgACAEQQFqNgIIIAMgAEGHgMCAAEEDENqAgIAAIgU2AgggBQ0JIANBCGoQ8ICAgAAgA0EHOgAIIANBCGogASACEMOFgIAAIQUMBwsgACAEQQFqNgIIIAMgAEGEgMCAAEEDENqAgIAAIgU2AgggBQ0IIANBCGoQ8ICAgAAgA0GAAjsBCCADQQhqIAEgAhDDhYCAACEFDAYLIAAgBEEBajYCCCADIABBgIDAgABBBBDagICAACIFNgIIIAUNByADQQhqEPCAgIAAIANBADsBCCADQQhqIAEgAhDDhYCAACEFDAULIAAgBEEBajYCCCADQQhqIABBABDpgICAACADKAIIQQFGDQUgA0EoaiADQRhqKQMANwMAIAMgAykDEDcDICADQSBqIAEgAhDChYCAACEFDAQLIANBCGogAEEBEOmAgIAAIAMoAghBAUYNBCADQShqIANBGGopAwA3AwAgAyADKQMQNwMgIANBIGogASACEMKFgIAAIQUMAwsgACAEQQFqNgIIIABBDGoiBRDfgICAACADQSBqIAAgBRDNhYCAAAJAIAMoAiBBAUcNACADKAIkIQUMBQsgAyADQShqKQMANwIMIANBBToACCADQQhqIAEgAhDDhYCAACEFDAILIANBCjoACCADQQhqIAEgAhDDhYCAACEFDAELIANBCzoACCADQQhqIAEgAhDDhYCAACEFCyAFIAAQ3YCAgAAhBQwBCyADKAIMIQULIANBMGokgICAgAAgBQsVAAJAIAAoAgBFDQAgABD3gICAAAsL6AMBAn8jgICAgABBwABrIgIkgICAgAAgAkEQaiABEOCAgIAAAkACQAJAIAItABBBAUcNACAAQQRqIAIoAhQ2AgAMAQsCQCACLQARQQFHDQACQAJAAkACQAJAAkAgAi0AEiIDQf8BcUEtRg0AIANBUGpB/wFxQQpJDQEgASACQThqQYiBwIAAEO+AgIAAIQMgAkEBOgAIIAIgAzYCDAwDCyABIAEoAghBAWo2AgggAkEgaiABQQAQ6YCAgAACQCACKAIgQQFHDQAgAEEBOgAAIABBBGogAigCJDYCAAwICyACQRhqIAJBMGopAwA3AwAgAiACKQMoNwMQIAJBCGogAkEQahDVgICAAAwBCyACQSBqIAFBARDpgICAAAJAIAIoAiBBAUcNACAAQQE6AAAgAEEEaiACKAIkNgIADAcLIAJBGGogAkEwaikDADcDACACIAIpAyg3AxAgAkEIaiACQRBqENWAgIAACyACLQAIQQFHDQEgAigCDCEDCyAAQQRqIAMgARDdgICAADYCAEEBIQEMAQsgACACLQAJOgABQQAhAQsgACABOgAAIAJBwABqJICAgIAADwsgAkEFNgIgIABBBGogASACQSBqENmAgIAANgIACyAAQQE6AAALIAJBwABqJICAgIAAC+EDAQJ/I4CAgIAAQcAAayICJICAgIAAIAJBEGogARDggICAAAJAAkACQCACLQAQQQFHDQAgAEEEaiACKAIUNgIADAELAkAgAi0AEUEBRw0AAkACQAJAIAItABIiA0H/AXFBLUYNACADQVBqQf8BcUEKSQ0BIAEgAkE4akGYgcCAABDvgICAACEDIAJBATsBCCACIAM2AgwMAgsgASABKAIIQQFqNgIIIAJBIGogAUEAEOmAgIAAAkAgAigCIEEBRw0AIABBATsBACAAQQRqIAIoAiQ2AgAMBQsgAkEYaiACQTBqKQMANwMAIAIgAikDKDcDECACQQhqIAJBEGoQ14CAgAAMAQsgAkEgaiABQQEQ6YCAgAACQCACKAIgQQFHDQAgAEEBOwEAIABBBGogAigCJDYCAAwECyACQRhqIAJBMGopAwA3AwAgAiACKQMoNwMQIAJBCGog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gAAgAykDCCIEp0H/AXFBA0cNAiAAQQM6AAAMAwsgAyAENwMIIAMgA0EIahC3hoCAACAAIAMpAwA3AgAMAgsgAyAENwMIIAMgA0EIahC3hoCAACAAIAMpAwA3AgAMAQsgAyAENwMIIAMgA0EIahC3hoCAACAAIAMpAwA3AgALIANBEGokgICAgAALtQECAX8BfiOAgICAAEEQayIDJICAgIAAIANBCGogASACEPmBgIAAAkACQAJAIAMpAwgiBKdB/wFxQQNHDQAgA0EIaiABQQhqIAIQsICAgAAgAykDCCIEp0H/AXFBA0cNASAAQQM6AAAMAgsgAyAENwMIIAMgA0EIahC3hoCAACAAIAMpAwA3AgAMAQsgAyAENwMIIAMgA0EIahC3hoCAACAAIAMpAwA3AgALIANBEGokgICAgAAL+wECAX8BfiOAgICAAEEQayIDJICAgIAAIANBCGogAUEwaiACELCAgIAAAkACQAJAAkAgAykDCCIEp0H/AXFBA0cNACADQQhqIAEgAhCzgICAACADKQMIIgSnQf8BcUEDRw0BIANBCGogAUEYaiACEIqBgIAAIAMpAwgiBKdB/wFxQQNHDQIgAEEDOgAADAMLIAMgBDcDCCADIANBCGoQt4aAgAAgACADKQMANwIADAILIAMgBDcDCCADIANBCGoQt4aAgAAgACADKQMANwIADAELIAMgBDcDCCADIANBCGoQt4aAgAAgACADKQMANwIACyADQRBqJICAgIAAC7UBAgF/AX4jgICAgABBEGsiAySAgICAACADQQhqIAEgAhD5gYCAAAJAAkACQCADKQMIIgSnQf8BcUEDRw0AIANBCGogAUEIaiACELCAgIAAIAMpAwgiBKdB/wFxQQNHDQEgAEEDOgAADAILIAMgBDcDCCADIANBCGoQt4aAgAAgACADKQMANwIADAELIAMgBDcDCCADIANBCGoQt4aAgAAgACADKQMANwIACyADQRBqJICAgIAAC/sBAgF/AX4jgICAgABBEGsiAySAgICAACADQQhqIAFBMGogAhCwgICAAAJAAkACQAJAIAMpAwgiBKdB/wFxQQNHDQAgA0EIaiABIAIQhoGAgAAgAykDCCIEp0H/AXFBA0cNASADQQhqIAFBGGogAhCMgYCAACADKQMIIgSnQf8BcUEDRw0CIABBAzoAAAwDCyADIAQ3AwggAyADQQhqELeGgIAAIAAgAykDADcCAAwCCyADIAQ3AwggAyADQQhqELeGgIAAIAAgAykDADcCAAwBCyADIAQ3AwggAyADQQhqELeGgIAAIAAgAykDADcCAAsgA0EQaiSAgICAAAu1AQIBfwF+I4CAgIAAQRBrIgMkgICAgAAgA0EIaiABIAIQ+YGAgAACQAJAAkAgAykDCCIEp0H/AXFBA0cNACADQQhqIAFBCGogAhCwgICAACADKQMIIgSnQf8BcUEDRw0BIABBAzoAAAwCCyADIAQ3AwggAyADQQhqELeGgIAAIAAgAykDADcCAAwBCyADIAQ3AwggAyADQQhqELeGgIAAIAAgAykDADcCAAsgA0EQaiSAgICAAAviBQQBfwF+BX8DfiOAgICAAEGwAWsiAiSAgICAACACQYgBaiABELWAgIAAIAIpAowBIQMCQAJAAkACQCACKAKIAUEBRg0AIAIgAkGUAWoiBCgCADYCOCACIAM3AzAgAkGIAWogARC2gICAACACQdgAakEIaiIFIAJBiAFqQRRqIgYpAgA3AwAgAkHYAGpBEGoiByACQaQBaiIIKAIANgIAIAIgBCkCADcDWCACKQKMASEDIAIoAogBQQFGDQEgAkHAAGpBDGogBSkDADcCACACQcAAakEUaiAHKAIANgIAIAIgAikDWDcCRCACIANCIIg+AkAgAkGIAWogARCOgYCAACACQfAAakEIaiAGKQIANwMAIAJB8ABqQRBqIAgoAgA2AgAgAiACQYgBakEMaikCADcDcCACKQKMASEDIAIoAogBQQFGDQIgAkEIakEIaiIBIAJBMGpBCGooAgA2AgAgAkEYakEIaiACQcAAakEIaikDACIJNwMAIAJBGGpBEGogAkHAAGpBEGopAwAiCjcDACACIAIpAzA3AwggAiACKQNAIgs3AxggAEEYaiAKNwMAIABBEGogCTcDACAAQQhqIAs3AwAgAEEgaiADQiCIPgIAIABBJGogAikDcDcCACAAQSxqIAJB8ABqQQhqKQMANwIAIABBNGogAkHwAGpBEGooAgA2AgAgAEEANgIAIABBOGogAikDCDcDACAAQcAAaiABKAIANgIADAMLIAIgAzcDiAEgAkHAAGogAkGIAWoQt4aAgAAgACACKQNANwIEIABBATYCAAwCCyACIAM3A4gBIAJB8ABqIAJBiAFqELeGgIAAIAAgAikDcDcCBCAAQQE2AgAgAkEwahC3gICAAAwBCyACIAM3A4gBIAJBqAFqIAJBiAFqELeGgIAAIAAgAikDqAE3AgQgAEEBNgIAIAJByABqELeAgIAAIAJBMGoQt4CAgAALIAJBsAFqJICAgIAAC4YCAgJ/An4jgICAgABBMGsiAiSAgICAACACQRhqIAEQ+4GAgAAgAkEQaiACQSRqIgMoAgA2AgAgAiACKQIcNwMIAkACQAJAIAIoAhhBAUYNACACKQIMIQQgAkEYaiABELWAgIAAIAIpAhwhBSACKAIYQQFGDQEgAygCACEBIABBADYCACAAQRhqIAE2AgAgAEEQaiAFNwMAIABBCGogBDcDAAwCCyACIAIpAwg3AxggAkEoaiACQRhqELeGgIAAIAAgAikDKDcCBCAAQQE2AgAMAQsgAiAFNwMYIAJBKGogAkEYahC3hoCAACAAIAIpAyg3AgQgAEEBNgIACyACQTBqJICAgIAAC+IFBAF/AX4FfwN+I4CAgIAAQbABayICJICAgIAAIAJBiAFqIAEQtYCAgAAgAikCjAEhAwJAAkACQAJAIAIoAogBQQFGDQAgAiACQZQBaiIEKAIANgI4IAIgAzcDMCACQYgBaiABEI6BgIAAIAJB2ABqQQhqIgUgAkGIAWpBFGoiBikCADcDACACQdgAakEQaiIHIAJBpAFqIggoAgA2AgAgAiAEKQIANwNYIAIpAowBIQMgAigCiAFBAUYNASACQcAAakEMaiAFKQMANwIAIAJBwABqQRRqIAcoAgA2AgAgAiACKQNYNwJEIAIgA0IgiD4CQCACQYgBaiABEJCBgIAAIAJB8ABqQQhqIAYpAgA3AwAgAkHwAGpBEGogCCgCADYCACACIAJBiAFqQQxqKQIANwNwIAIpAowBIQMgAigCiAFBAUYNAiACQQhqQQhqIgEgAkEwakEIaigCADYCACACQRhqQQhqIAJBwABqQQhqKQMAIgk3AwAgAkEYakEQaiACQcAAakEQaikDACIKNwMAIAIgAikDMDcDCCACIAIpA0AiCzcDGCAAQRhqIAo3AwAgAEEQaiAJNwMAIABBCGogCzcDACAAQSBqIANCIIg+AgAgAEEkaiACKQNwNwIAIABBLGogAkHwAGpBCGopAwA3AgAgAEE0aiACQfAAakEQaigCADYCACAAQQA2AgAgAEE4aiACKQMINwMAIABBwABqIAEoAgA2AgAMAwsgAiADNwOIASACQcAAaiACQYgBahC3hoCAACAAIAIpA0A3AgQgAEEBNgIADAILIAIgAzcDiAEgAkHwAGogAkGIAWoQt4aAgAAgACACKQNwNwIEIABBATYCACACQTBqELeAgIAADAELIAIgAzcDiAEgAkGoAWogAkGIAWoQt4aAgAAgACACKQOoATcCBCAAQQE2AgAgAkHIAGoQt4CAgAAgAkEwahC3gICAAAsgAkGwAWokgICAgAALhgICAn8CfiOAgICAAEEwayICJICAgIAAIAJBGGogARD7gYCAACACQRBqIAJBJGoiAygCADYCACACIAIpAhw3AwgCQAJAAkAgAigCGEEBRg0AIAIpAgwhBCACQRhqIAEQtYCAgAAgAikCHCEFIAIoAhhBAUYNASADKAIAIQEgAEEANgIAIABBGGogATYCACAAQRBqIAU3AwAgAEEIaiAENwMADAILIAIgAikDCDcDGCACQShqIAJBGGoQt4aAgAAgACACKQMoNwIEIABBATYCAAwBCyACIAU3AxggAkEoaiACQRhqELeGgIAAIAAgAikDKDcCBCAAQQE2AgALIAJBMGokgICAgAAL4gUEAX8BfgV/A34jgICAgABBsAFrIgIkgICAgAAgAkGIAWogARC1gICAACACKQKMASEDAkACQAJAAkAgAigCiAFBAUYNACACIAJBlAFqIgQoAgA2AjggAiADNwMwIAJBiAFqIAEQuICAgAAgAkHYAGpBCGoiBSACQYgBakEUaiIGKQIANwMAIAJB2ABqQRBqIgcgAkGkAWoiCCgCADYCACACIAQpAgA3A1ggAikCjAEhAyACKAKIAUEBRg0BIAJBwABqQQxqIAUpAwA3AgAgAkHAAGpBFGogBygCADYCACACIAIpA1g3AkQgAiADQiCIPgJAIAJBiAFqIAEQkoGAgAAgAkHwAGpBCGogBikCADcDACACQfAAakEQaiAIKAIANgIAIAIgAkGIAWpBDGopAgA3A3AgAikCjAEhAyACKAKIAUEBRg0CIAJBCGpBCGoiASACQTBqQQhqKAIANgIAIAJBGGpBCGogAkHAAGpBCGopAwAiCTcDACACQRhqQRBqIAJBwABqQRBqKQMAIgo3AwAgAiACKQMwNwMIIAIgAikDQCILNwMYIABBGGogCjcDACAAQRBqIAk3AwAgAEEIaiALNwMAIABBIGogA0IgiD4CACAAQSRqIAIpA3A3AgAgAEEsaiACQfAAakEIaikDADcCACAAQTRqIAJB8ABqQRBqKAIANgIAIABBADYCACAAQThqIAIpAwg3AwAgAEHAAGogASgCADYCAAwDCyACIAM3A4gBIAJBwABqIAJBiAFqELeGgIAAIAAgAikDQDcCBCAAQQE2AgAMAgsgAiADNwOIASACQfAAaiACQYgBahC3hoCAACAAIAIpA3A3AgQgAEEBNgIAIAJBMGoQt4CAgAAMAQsgAiADNwOIASACQagBaiACQYgBahC3hoCAACAAIAIpA6gBNwIEIABBATYCACACQcgAahC3gICAACACQTBqELeAgIAACyACQbABaiSAgICAAAuGAgICfwJ+I4CAgIAAQTBrIgIkgICAgAAgAkEYaiABEPuBgIAAIAJBEGogAkEkaiIDKAIANgIAIAIgAikCHDcDCAJAAkACQCACKAIYQQFGDQAgAikCDCEEIAJBGGogARC1gICAACACKQIcIQUgAigCGEEBRg0BIAMoAgAhASAAQQA2AgAgAEEYaiABNgIAIABBEGogBTcDACAAQQhqIAQ3AwAMAgsgAiACKQMINwMYIAJBKGogAkEYahC3hoCAACAAIAIpAyg3AgQgAEEBNgIADAELIAIgBTcDGCACQShqIAJBGGoQt4aAgAAgACACKQMoNwIEIABBATYCAAsgAkEwaiSAgICAAAviBQQBfwF+BX8DfiOAgICAAEGwAWsiAiSAgICAACACQYgBaiABELWAgIAAIAIpAowBIQMCQAJAAkACQCACKAKIAUEBRg0AIAIgAkGUAWoiBCgCADYCOCACIAM3AzAgAkGIAWogARC2gICAACACQdgAakEIaiIFIAJBiAFqQRRqIgYpAgA3AwAgAkHYAGpBEGoiByACQaQBaiIIKAIANgIAIAIgBCkCADcDWCACKQKMASEDIAIoAogBQQFGDQEgAkHAAGpBDGogBSkDADcCACACQcAAakEUaiAHKAIANgIAIAIgAikDWDcCRCACIANCIIg+AkAgAkGIAWogARCUgYCAACACQfAAakEIaiAGKQIANwMAIAJB8ABqQRBqIAgoAgA2AgAgAiACQYgBakEMaikCADcDcCACKQKMASEDIAIoAogBQQFGDQIgAkEIakEIaiIBIAJBMGpBCGooAgA2AgAgAkEYakEIaiACQcAAakEIaikDACIJNwMAIAJBGGpBEGogAkHAAGpBEGopAwAiCjcDACACIAIpAzA3AwggAiACKQNAIgs3AxggAEEYaiAKNwMAIABBEGogCTcDACAAQQhqIAs3AwAgAEEgaiADQiCIPgIAIABBJGogAikDcDcCACAAQSxqIAJB8ABqQQhqKQMANwIAIABBNGogAkHwAGpBEGooAgA2AgAgAEEANgIAIABBOGogAikDCDcDACAAQcAAaiABKAIANgIADAMLIAIgAzcDiAEgAkHAAGogAkGIAWoQt4aAgAAgACACKQNANwIEIABBATYCAAwCCyACIAM3A4gBIAJB8ABqIAJBiAFqELeGgIAAIAAgAikDcDcCBCAAQQE2AgAgAkEwahC3gICAAAwBCyACIAM3A4gBIAJBqAFqIAJBiAFqELeGgIAAIAAgAikDqAE3AgQgAEEBNgIAIAJByABqELeAgIAAIAJBMGoQt4CAgAALIAJBsAFqJICAgIAAC4YCAgJ/An4jgICAgABBMGsiAiSAgICAACACQRhqIAEQ+4GAgAAgAkEQaiACQSRqIgMoAgA2AgAgAiACKQIcNwMIAkACQAJAIAIoAhhBAUYNACACKQIMIQQgAkEYaiABELWAgIAAIAIpAhwhBSACKAIYQQFGDQEgAygCACEBIABBADYCACAAQRhqIAE2AgAgAEEQaiAFNwMAIABBCGogBDcDAAwCCyACIAIpAwg3AxggAkEoaiACQRhqELeGgIAAIAAgAikDKDcCBCAAQQE2AgAMAQsgAiAFNwMYIAJBKGogAkEYahC3hoCAACAAIAIpAyg3AgQgAEEBNgIACyACQTBqJICAgIAAC4ABAQF/I4CAgIAAQTBrIgIkgICAgAAgAiABNgIMIAIgADYCCCACIAJBCGpBg4CAgAAQ/IWAgAAgAkEkakEBNgIAIAJCAjcCFCACQaSMwIAANgIQIAIgAikDADcDKCACIAJBKGo2AiAgAkEQahDJhYCAACEAIAJBMGokgICAgAAgAAvwAQQCfwF+AX8BfiOAgICAAEEQayIDJICAgIAAAkACQCABIABNDQAgASAAayIBIAFnQR9xdEF/aiEEIAGt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ahCVg4CAACAQIGEpAgA3AwAgAiAxKQIANwOQBSACQdgFaiACQZAFahCVg4CAACAQIGIpAgA3AwAgAiAvKQIANwOQBSACQZgEaiACQZAFahCVg4CAACAQIGMpAgA3AwAgAiAtKQIANwOQBSACQbAIaiACQZAFahCVg4CAACBfIAgpAwA3AgAgNiACKQPYBTcCACALIAIpA5gENwIAIF0gDykDADcCACARIAIpA7AINwIAIF4gBykDADcCACACQbAHaiACQeAGakHAABDsh4CAABogAkGQBWogKCACQbAHakHAABDsh4CAACJAQcAAEOyHgIAAGiADIAIpA6ACNwMAIAIgAikDmAI3A/AHIAcgGykCADcDACACIEApAgA3A7AIIAJBmAJqIAJB8AdqIAJBsAhqEJSEgIAAIAMgHCkCADcDACACICcpAgA3A/AHIAcgBSkCADcDACACICwpAgA3A7AIIAJBsAdqIAJB8AdqIAJBsAhqEJSEgIAAIBwgBCkDADcCACAnIAIpA7AHNwIAIAMgHSkCADcDACACICYpAgA3A/AHIAcgCikCADcDACACICspAgA3A7AIIAJBsAdqIAJB8AdqIAJBsAhqEJSEgIAAIB0gBCkDADcCACAmIAIpA7AHNwIAIAMgHikCADcDACACICUpAgA3A/AHIAcgGCkCADcDACACICopAgA3A7AIIAJBsAdqIAJB8AdqIAJBsAhqEJSEgIAAIB4gBCkDADcCACAlIAIpA7AHNwIAIAJBsAhqID9BwAAQ7IeAgAAaIAJBkAVqIAJBmAJqQcAAEOyHgIAAGiAIIB8pAgA3AwAgAiA/KQIANwPYBSAPIAIpA6ACNwMAIAIgAikDmAI3A5gEIAJB4AZqIAJB2AVqIAJBmARqEJWEgIAAIAggPCkCADcDACACIDUpAgA3A9gFIA8gBSkCADcDACACICwpAgA3A5gEIAJB8AhqIAJB2AVqIAJBmARqEJWEgIAAIAggPSkCADcDACACIDQpAgA3A9gFIA8gCikCADcDACACICspAgA3A5gEIAJBgAlqIAJB2AVqIAJBmARqEJWEgIAAIAggPikCADcDACACIDMpAgA3A9gFIA8gGCkCADcDACACICopAgA3A5gEIAJB+ARqIAJB2AVqIAJBmARqEJWEgIAAIF8gNykDADcCACA2IAIpA/AINwIAIAsgAikDgAk3AgAgXSA4KQMANwIAIBEgAikD+AQ3AgAgXiAaKQMANwIAIAJB8AdqIAJB4AZqQcAAEOyHgIAAGiAQIAMpAwA3AwAgAiACKQPwBzcDkAUgAkHgBmogAkGQBWoQloOAgAAgECBhKQIANwMAIAIgMSkCADcDkAUgAkHYBWogAkGQBWoQloOAgAAgECBiKQIANwMAIAIgLykCADcDkAUgAkGYBGogAkGQBWoQloOAgAAgECBjKQIANwMAIAIgLSkCADcDkAUgAkGwCGogAkGQBWoQloOAgAAgXyAIKQMANwIAIDYgAikD2AU3AgAgCyACKQOYBDcCACBdIA8pAwA3AgAgESACKQOwCDcCACBeIAcpAwA3AgAgAkGwB2ogAkHgBmpBwAAQ7IeAgAAaIAJBkAVqID8gAkGwB2pBwAAQ7IeAgAAiQUHAABDsh4CAABogAyAZKQIANwMAIAIgYCkCADcD8AcgByAfKQIANwMAIAIgQSkCADcDsAggAkGwB2ogAkHwB2ogAkGwCGoQlISAgAAgGSAEKQMANwIAIGAgAikDsAc3AgAgAyA5KQIANwMAIAIgIykCADcD8AcgByAFKQIANwMAIAIgLCkCADcDsAggAkGwB2ogAkHwB2ogAkGwCGoQlISAgAAgOSAEKQMANwIAICMgAikDsAc3AgAgAyA6KQIANwMAIAIgIikCADcD8AcgByAKKQIANwMAIAIgKykCADcDsAggAkGwB2ogAkHwB2ogAkGwCGoQlISAgAAgOiAEKQMANwIAICIgAikDsAc3AgAgAyA7KQIANwMAIAIgISkCADcD8AcgByAYKQIANwMAIAIgKikCADcDsAggAkGwB2ogAkHwB2ogAkGwCGoQlISAgAAgOyAEKQMANwIAICEgAikDsAc3AgAgAkGwB2ogQEHAABDsh4CAABogAkHwB2ogYEHAABDsh4CAABogCCAbKQIANwMAIAIgQCkCADcD2AUgDyAZKQIANwMAIAIgYCkCADcDmAQgAkHgBmogAkHYBWogAkGYBGoQlYSAgAAgCCAyQQhqIkIpAgA3AwAgAiAyKQIANwPYBSAPIGEpAgA3AwAgAiAxKQIANwOYBCACQfAIaiACQdgFaiACQZgEahCVhICAACAIIDBBCGoiRSkCADcDACACIDApAgA3A9gFIA8gYikCADcDACACIC8pAgA3A5gEIAJBgAlqIAJB2AVqIAJBmARqEJWEgIAAIAggLkEIaiJGKQIANwMAIAIgLikCADcD2AUgDyBjKQIANwMAIAIgLSkCADcDmAQgAkH4BGogAkHYBWogAkGYBGoQlYSAgAAgXyA3KQMANwIAIDYgAikD8Ag3AgAgCyACKQOACTcCACBdIDgpAwA3AgAgESACKQP4BDcCACBeIBopAwA3AgAgAkGQBWogAkHgBmpBwAAQ7IeAgAAaIAMgECkDADcDACACIAIpA5AFNwPwByACQeAGaiACQfAHahCXg4CAACADIAUpAgA3AwAgAiAsKQIANwPwByACQdgFaiACQfAHahCXg4CAACADIAopAgA3AwAgAiArKQIANwPwByACQZgEaiACQfAHahCXg4CAACADIBgpAgA3AwAgAiAqKQIANwPwByACQbAHaiACQfAHahCXg4CAACBfIAgpAwA3AgAgNiACKQPYBTcCACALIAIpA5gENwIAIF0gDykDADcCACARIAIpA7AHNwIAIF4gBCkDADcCACACQbAIaiACQeAGakHAABDsh4CAABogQCACQbAIakHAABDsh4CAACE/IAIoApgCIUAgAigCnAIhRyACKAKgAiFIIAIoAqQCIUkgAigCqAIhSiACKAKsAiFLIAIoArACIUwgAigCtAIhTSACKAK4AiFOIAIoArwCIU8gAigCwAIhUCACKALEAiFRIAIoAsgCIVIgAigCzAIhUyACKALQAiFUIAIoAtQCIVUgAigC3AIhViACKALgAiFXIAIoAuQCIVggAigC2AIhWSACKALsAiFaIAIoAvACIVsgAigC9AIhXCACKALoAiFkIAIoAvwCIWUgAigCgAMhZiACKAKEAyFnIAIoAvgCIWggAigCjAMhaSACKAKQAyFqIAIoApQDIWsgAigCiAMhbCACQdgBaiBgQcAAEOyHgIAAGiACKALkAyFtIAIoAtgDIW4gAigC3AMhbyACKALgAyFwIAIoAvQDIXEgAigC6AMhciACKALsAyFzIAIoAvADIXQgAigChAQhdSACKAL4AyF2IAIoAvwDIXcgAigCgAQheCACKAKUBCF5IAIoAogEIXogAigCjAQheyACKAKQBCF8IAJBkAVqIAJB2AFqQcAAEOyHgIAAGiACQfAHaiACQdgBakHAABDsh4CAABogByAQKQMANwMAIAIgAikDkAU3A7AIIAJB4AZqIAJBsAhqEJOEgIAAIAcgYSkCADcDACACIDEpAgA3A7AIIAJB+ARqIAJBsAhqEJOEgIAAIAcgYikCADcDACACIC8pAgA3A7AIIAJB2AVqIAJBsAhqEJOEgIAAIAcgYykCADcDACACIC0pAgA3A7AIIAJBmARqIAJBsAhqEJOEgIAAIF8gGikDADcCACA2IAIpA/gENwIAIAsgAikD2AU3AgAgXSAIKQMANwIAIBEgAikDmAQ3AgAgXiAPKQMANwIAIAJBsAdqIAJB4AZqQcAAEOyHgIAAGiACQZAFaiACQbAHakHAABDsh4CAABogAiBsNgKUAyACIGs2ApADIAIgajYCjAMgAiBpNgKIAyACIGg2AoQDIAIgZzYCgAMgAiBmNgL8AiACIGU2AvgCIAIgZDYC9AIgAiBcNgLwAiACIFs2AuwCIAIgWjYC6AIgAiBZNgLkAiACIFg2AuACIAIgVzYC3AIgAiBWNgLYAiACIFU2AtQCIAIgVDYC0AIgAiBTNgLMAiACIFI2AsgCIAIgUTYCxAIgAiBQNgLAAiACIE82ArwCIAIgTjYCuAIgAiBNNgK0AiACIEw2ArACIAIgSzYCrAIgAiBKNgKoAiACIEk2AqQCIAIgSDYCoAIgAiBHNgKcAiACIEA2ApgCIGAgAkGQBWpBwAAQ7IeAgAAhYCACIHw2ApQEIAIgezYCkAQgAiB6NgKMBCACIHk2AogEIAIgeDYChAQgAiB3NgKABCACIHY2AvwDIAIgdTYC+AMgAiB0NgL0AyACIHM2AvADIAIgcjYC7AMgAiBxNgLoAyACIHA2AuQDIAIgbzYC4AMgAiBuNgLcAyACIG02AtgDIAJBkAVqID9BwAAQ7IeAgAAaIAMgAikDoAI3AwAgAiACKQOYAjcD8AcgByAbKQIANwMAIAIgPykCADcDsAggAkGYAmogAkHwB2ogAkGwCGoQlISAgAAgAyAcKQIANwMAIAIgJykCADcD8AcgByAFKQIANwMAIAIgLCkCADcDsAggAkGwB2ogAkHwB2ogAkGwCGoQlISAgAAgHCAEKQMANwIAICcgAikDsAc3AgAgAyAdKQIANwMAIAIgJikCADcD8AcgByAKKQIANwMAIAIgKykCADcDsAggAkGwB2ogAkHwB2ogAkGwCGoQlISAgAAgHSAEKQMANwIAICYgAikDsAc3AgAgAyAeKQIANwMAIAIgJSkCADcD8AcgByAYKQIANwMAIAIgKikCADcDsAggAkGwB2ogAkHwB2ogAkGwCGoQlISAgAAgHiAEKQMANwIAICUgAikDsAc3AgAgAkGwCGogQUHAABDsh4CAABogAkGQBWogAkGYAmpBwAAQ7IeAgAAaIAggHykCADcDACACIEEpAgA3A9gFIA8gAikDoAI3AwAgAiACKQOYAjcDmAQgAkHgBmogAkHYBWogAkGYBGoQlYSAgAAgCCA8KQIANwMAIAIgNSkCADcD2AUgDyAFKQIANwMAIAIgLCkCADcDmAQgAkHwCGogAkHYBWogAkGYBGoQlYSAgAAgCCA9KQIANwMAIAIgNCkCADcD2AUgDyAKKQIANwMAIAIgKykCADcDmAQgAkGACWogAkHYBWogAkGYBGoQlYSAgAAgCCA+KQIANwMAIAIgMykCADcD2AUgDyAYKQIANwMAIAIgKikCADcDmAQgAkH4BGogAkHYBWogAkGYBGoQlYSAgAAgXyA3KQMANwIAIDYgAikD8Ag3AgAgCyACKQOACTcCACBdIDgpAwA3AgAgESACKQP4BDcCACBeIBopAwA3AgAgAkHwB2ogAkHgBmpBwAAQ7IeAgAAaIBAgAykDADcDACACIAIpA/AHNwOQBSACQeAGaiACQZAFahCUg4CAACAQIGEpAgA3AwAgAiAxKQIANwOQBSACQdgFaiACQZAFahCUg4CAACAQIGIpAgA3AwAgAiAvKQIANwOQBSACQZgEaiACQZAFahCUg4CAACAQIGMpAgA3AwAgAiAtKQIANwOQBSACQbAIaiACQZAFahCUg4CAACBfIAgpAwA3AgAgNiACKQPYBTcCACALIAIpA5gENwIAIF0gDykDADcCACARIAIpA7AINwIAIF4gBykDADcCACACQbAHaiACQeAGakHAABDsh4CAABogAkGQBWogQSACQbAHakHAABDsh4CAACJAQcAAEOyHgIAAGiADIBkpAgA3AwAgAiBgKQIANwPwByAHIB8pAgA3AwAgAiBAKQIANwOwCCACQbAHaiACQfAHaiACQbAIahCUhICAACAZIAQpAwA3AgAgYCACKQOwBzcCACADIDkpAgA3AwAgAiAjKQIANwPwByAHIAUpAgA3AwAgAiAsKQIANwOwCCACQbAHaiACQfAHaiACQbAIahCUhICAACA5IAQpAwA3AgAgIyACKQOwBzcCACADIDopAgA3AwAgAiAiKQIANwPwByAHIAopAgA3AwAgAiArKQIANwOwCCACQbAHaiACQfAHaiACQbAIahCUhICAACA6IAQpAwA3AgAgIiACKQOwBzcCACADIDspAgA3AwAgAiAhKQIANwPwByAHIBgpAgA3AwAgAiAqKQIANwOwCCACQbAHaiACQfAHaiACQbAIahCUhICAACA7IAQpAwA3AgAgISACKQOwBzcCACACQbAIaiA/QcAAEOyHgIAAGiACQZAFaiBgQcAAEOyHgIAAGiAIIBspAgA3AwAgAiA/KQIANwPYBSAPIBkpAgA3AwAgAiBgKQIANwOYBCACQeAGaiACQdgFaiACQZgEahCVhICAACAIIDwpAgA3AwAgAiA1KQIANwPYBSAPIAUpAgA3AwAgAiAsKQIANwOYBCACQfAIaiACQdgFaiACQZgEahCVhICAACAIID0pAgA3AwAgAiA0KQIANwPYBSAPIAopAgA3AwAgAiArKQIANwOYBCACQYAJaiACQdgFaiACQZgEahCVhICAACAIID4pAgA3AwAgAiAzKQIANwPYBSAPIBgpAgA3AwAgAiAqKQIANwOYBCACQfgEaiACQdgFaiACQZgEahCVhICAACBfIDcpAwA3AgAgNiACKQPwCDcCACALIAIpA4AJNwIAIF0gOCkDADcCACARIAIpA/gENwIAIF4gGikDADcCACACQfAHaiACQeAGakHAABDsh4CAABogECADKQMANwMAIAIgAikD8Ac3A5AFIAJB4AZqIAJBkAVqEJWDgIAAIBAgYSkCADcDACACIDEpAgA3A5AFIAJB2AVqIAJBkAVqEJWDgIAAIBAgYikCADcDACACIC8pAgA3A5AFIAJBmARqIAJBkAVqEJWDgIAAIBAgYykCADcDACACIC0pAgA3A5AFIAJBsAhqIAJBkAVqEJWDgIAAIF8gCCkDADcCACA2IAIpA9gFNwIAIAsgAikDmAQ3AgAgXSAPKQMANwIAIBEgAikDsAg3AgAgXiAHKQMANwIAIAJBsAdqIAJB4AZqQcAAEOyHgIAAGiACQZAFaiA/IAJBsAdqQcAAEOyHgIAAIj9BwAAQ7IeAgAAaIAMgAikDoAI3AwAgAiACKQOYAjcD8AcgByAbKQIANwMAIAIgPykCADcDsAggAkGYAmogAkHwB2ogAkGwCGoQlISAgAAgAyAcKQIANwMAIAIgJykCADcD8AcgByAFKQIANwMAIAIgLCkCADcDsAggAkGwB2ogAkHwB2ogAkGwCGoQlISAgAAgHCAEKQMANwIAICcgAikDsAc3AgAgAyAdKQIANwMAIAIgJikCADcD8AcgByAKKQIANwMAIAIgKykCADcDsAggAkGwB2ogAkHwB2ogAkGwCGoQlISAgAAgHSAEKQMANwIAICYgAikDsAc3AgAgAyAeKQIANwMAIAIgJSkCADcD8AcgByAYKQIANwMAIAIgKikCADcDsAggAkGwB2ogAkHwB2ogAkGwCGoQlISAgAAgHiAEKQMANwIAICUgAikDsAc3AgAgAkGwCGogQEHAABDsh4CAABogAkGQBWogAkGYAmpBwAAQ7IeAgAAaIAggHykCADcDACACIEApAgA3A9gFIA8gAikDoAI3AwAgAiACKQOYAjcDmAQgAkHgBmogAkHYBWogAkGYBGoQlYSAgAAgCCA8KQIANwMAIAIgNSkCADcD2AUgDyAFKQIANwMAIAIgLCkCADcDmAQgAkHwCGogAkHYBWogAkGYBGoQlYSAgAAgCCA9KQIANwMAIAIgNCkCADcD2AUgDyAKKQIANwMAIAIgKykCADcDmAQgAkGACWogAkHYBWogAkGYBGoQlYSAgAAgCCA+KQIANwMAIAIgMykCADcD2AUgDyAYKQIANwMAIAIgKikCADcDmAQgAkH4BGogAkHYBWogAkGYBGoQlYSAgAAgXyA3KQMANwIAIDYgAikD8Ag3AgAgCyACKQOACTcCACBdIDgpAwA3AgAgESACKQP4BDcCACBeIBopAwA3AgAgAkHwB2ogAkHgBmpBwAAQ7IeAgAAaIBAgAykDADcDACACIAIpA/AHNwOQBSACQeAGaiACQZAFahCWg4CAACAQIGEpAgA3AwAgAiAxKQIANwOQBSACQdgFaiACQZAFahCWg4CAACAQIGIpAgA3AwAgAiAvKQIANwOQBSACQZgEaiACQZAFahCWg4CAACAQIGMpAgA3AwAgAiAtKQIANwOQBSACQbAIaiACQZAFahCWg4CAACBfIAgpAwA3AgAgNiACKQPYBTcCACALIAIpA5gENwIAIF0gDykDADcCACARIAIpA7AINwIAIF4gBykDADcCACACQbAHaiACQeAGakHAABDsh4CAABogAkGQBWogQCACQbAHakHAABDsh4CAACIcQcAAEOyHgIAAGiADIBkpAgA3AwAgAiBgKQIANwPwByAHIB8pAgA3AwAgAiAcKQIANwOwCCACQbAHaiACQfAHaiACQbAIahCUhICAACAZIAQpAwA3AgAgYCACKQOwBzcCACADIDkpAgA3AwAgAiAjKQIANwPwByAHIAUpAgA3AwAgAiAsKQIANwOwCCACQbAHaiACQfAHaiACQbAIahCUhICAACA5IAQpAwA3AgAgIyACKQOwBzcCACADIDopAgA3AwAgAiAiKQIANwPwByAHIAopAgA3AwAgAiArKQIANwOwCCACQbAHaiACQfAHaiACQbAIahCUhICAACA6IAQpAwA3AgAgIiACKQOwBzcCACADIDspAgA3AwAgAiAhKQIANwPwByAHIBgpAgA3AwAgAiAqKQIANwOwCCACQbAHaiACQfAHaiACQbAIahCUhICAACA7IAQpAwA3AgAgISACKQOwBzcCACACQbAHaiA/QcAAEOyHgIAAGiACQfAHaiBgQcAAEOyHgIAAGiAIIBspAgA3AwAgAiA/KQIANwPYBSAPIBkpAgA3AwAgAiBgKQIANwOYBCACQeAGaiACQdgFaiACQZgEahCVhICAACAIIEIpAgA3AwAgAiAyKQIANwPYBSAPIGEpAgA3AwAgAiAxKQIANwOYBCACQfAIaiACQdgFaiACQZgEahCVhICAACAIIEUpAgA3AwAgAiAwKQIANwPYBSAPIGIpAgA3AwAgAiAvKQIANwOYBCACQYAJaiACQdgFaiACQZgEahCVhICAACAIIEYpAgA3AwAgAiAuKQIANwPYBSAPIGMpAgA3AwAgAiAtKQIANwOYBCACQfgEaiACQdgFaiACQZgEahCVhICAACBfIDcpAwA3AgAgNiACKQPwCDcCACALIAIpA4AJNwIAIF0gOCkDADcCACARIAIpA/gENwIAIF4gGikDADcCACACQZAFaiACQeAGakHAABDsh4CAABogAyAQKQMANwMAIAIgAikDkAU3A/AHIAJB4AZqIAJB8AdqEJeDgIAAIAMgBSkCADcDACACICwpAgA3A/AHIAJB2AVqIAJB8AdqEJeDgIAAIAMgCikCADcDACACICspAgA3A/AHIAJBmARqIAJB8AdqEJeDgIAAIAMgGCkCADcDACACICopAgA3A/AHIAJBsAdqIAJB8AdqEJeDgIAAIF8gCCkDADcCACA2IAIpA9gFNwIAIAsgAikDmAQ3AgAgXSAPKQMANwIAIBEgAikDsAc3AgAgXiAEKQMANwIAIAJBsAhqIAJB4AZqQcAAEOyHgIAAGiA/IAJBsAhqQcAAEOyHgIAAGiACKAKYAiFCIAIoApwCIUEgAigCoAIhQCACKAKkAiE/IAIoAqgCIUUgAigCrAIhRiACKAKwAiFHIAIoArQCIUggAigCuAIhSSACKAK8AiFKIAIoAsACIUsgAigCxAIhTCACKALIAiFNIAIoAswCIU4gAigC0AIhTyACKALUAiFQIAIoAtgCIQUgAigC3AIhBCACKALgAiEDIAIoAuQCIQogAigC6AIhUiACKALsAiFTIAIoAvACIVQgAigC9AIhUSACKAL4AiFWIAIoAvwCIVcgAigCgAMhWCACKAKEAyFVIAIoAogDIVogAigCjAMhWyACKAKQAyFcIAIoApQDIVkgAkGQBWogYEHAABDsh4CAABogAigClAQhNyACKAKQBCEcIAIoAowEITggAigCiAQhHSACKAKEBCE5IAIoAoAEIRogAigC/AMhOiACKAL4AyEbIAIoAvQDITsgAigC8AMhGCACKALsAyE8IAIoAugDIRkgAigC5AMhPSACKALgAyEeIAIoAtwDIT4gAigC2AMhHyACQfAHaiACQZAFakHAABDsh4CAABogEiAQKQMANwMAIAIgAikDkAU3A5gCIAJB4AZqIAJBmAJqEJOEgIAAIBIgYSkCADcDACACIDEpAgA3A5gCIAJB2AVqIAJBmAJqEJOEgIAAIBIgYikCADcDACACIC8pAgA3A5gCIAJBmARqIAJBmAJqEJOEgIAAIBIgYykCADcDACACIC0pAgA3A5gCIAJBsAhqIAJBmAJqEJOEgIAAIF8gCCkDADcCACA2IAIpA9gFNwIAIAsgAikDmAQ3AgAgXSAPKQMANwIAIBEgAikDsAg3AgAgXiAHKQMANwIAIAJBsAdqIAJB4AZqQcAAEOyHgIAAGiACQZAFaiACQbAHakHAABDsh4CAABogAkHYAWogAkGQBWpBwAAQ7IeAgAAaIERBAWohRAwACwsgAiACQaQHajYCqAcgAkGEkMCAADYCrAcgAkGAAWogAkGoB2pBhICAgAAQg4SAgAAgAikDgAEhCSACQfgAaiACQawHakGEgICAABCDhICAACACQewFakECNgIAIAIgCTcDgAkgAkIDNwLcBSACQYSHwIAANgLYBSACIAIpA3g3A4gJIAIgAkGACWo2AugFIAJB2AVqQeiHwIAAEJiHgIAAAAsgAiACQaQHajYCqAcgAkGEkMCAADYCrAcgAkHgAGogAkGoB2pBhICAgAAQg4SAgAAgAikDYCEJIAJB2ABqIAJBrAdqQYSAgIAAEIOEgIAAIAJB7AVqQQI2AgAgAiAJNwOACSACQgM3AtwFIAJBhIfAgAA2AtgFIAIgAikDWDcDiAkgAiACQYAJajYC6AUgAkHYBWpB6IfAgAAQmIeAgAAACyACIAJBpAdqNgKoByACQYSQwIAANgKsByACQcAAaiACQagHakGEgICAABCDhICAACACKQNAIQkgAkE4aiACQawHakGEgICAABCDhICAACACQewFakECNgIAIAIgCTcDgAkgAkIDNwLcBSACQYSHwIAANgLYBSACIAIpAzg3A4gJIAIgAkGACWo2AugFIAJB2AVqQeiHwIAAEJiHgIAAAAsgAiACQaQHajYCqAcgAkGEkMCAADYCrAcgAkEgaiACQagHakGEgICAABCDhICAACACKQMgIQkgAkEYaiACQawHakGEgICAABCDhICAACACQewFakECNgIAIAIgCTcDgAkgAkIDNwLcBSACQYSHwIAANgLYBSACIAIpAxg3A4gJIAIgAkGACWo2AugFIAJB2AVqQeiHwIAAEJiHgIAAAAtBpJbAgABBNUH4gMCAABCKhoCAAAALIAJBEGogABCkhICAACACQQhqIAIoAhAgAigCFBCUhoCAACACKAIMQQRqIQcgAigCCCEDA0AgByADQQRqIgNHDQALICogATYCACACQZAJaiSAgICAAAt5AgF/AX5BBCEDAkACQCACQQRPDQBCACEEQQAhAwwBCyAAIAFqNQAAIQQLAkAgA0EBciACTw0AIAAgAyABamozAAAgA0EDdK2GIASEIQQgA0ECciEDCwJAIAMgAk8NACAAIAMgAWpqMQAAIANBA3SthiAEhCEECyAEC3UCAX8CfiOAgICAAEEQayIBJICAgIAAIAFB2IPAgAAQi4WAgAAgASkDACECIAEpAwghAyAAQSBqQQA2AgAgAEEYakIENwMAIABBFGpB4PjAgAA2AgAgAEEANgIQIAAgAzcDCCAAIAI3AwAgAUEQaiSAgICAAAtIAQF/I4CAgIAAQRBrIgQkgICAgAAgBEEIaiADQQhqKAIANgIAIAQgAykCADcDACAAIAEgAiAEEJuBgIAAIARBEGokgICAgAALqwMDAX8Bfgx/I4CAgIAAQcAAayIEJICAgIAAIAQgAjoADyABIARBD2oQpYOAgAAhBSAEQQA2AiggBCABKAIQIgY2AiAgBCAGIAWnIgdxNgIkIAFBEGohCCAHQRl2IQkgBEEwaiAEQSBqEL+GgIAAIAFBGGooAgAhCiABQRRqKAIAIQsgBCgCOCEMIAQoAjQhByAEKAIwIQ0gAkH/AXEhDgJAA0AgBCALIAdqKAAAIg8gCRCmg4CAADYCICAMQQRqIgwgB2ogDXEhEANAIAQgBEEgahCig4CAAAJAIAQoAgANACAQIQcgDyAPQQF0cUGAgYKEeHFFDQIgBCABNgIwIARBLGogA0EIaigCADYCACAEIAI6ACAgBCADKQIANwIkIAggBSAEQSBqIARBMGoQp4OAgAAaIABBADYCAAwDCyAKIAQoAgQgB2ogBnEiEUEEdGotAAAgDkcNAAsLIAogEUEEdGoiASkCBCEFIAEgAykCADcCBCAAIAU3AgAgAUEMaiIBKAIAIQcgASADQQhqKAIANgIAIABBCGogBzYCAAsgBEHAAGokgICAgAALUwEBfyOAgICAAEEQayICJICAgIAAAkAgACgCAEEDRg0AIAIgATYCCCACIAJBCGo2AgwgAEEAIAJBDGpB3IPAgAAQ7YaAgAALIAJBEGokgICAgAALkgMBAn8jgICAgABB4ABrIgIkgICAgAAgACgCACIDKAIAIQAgA0EANgIAAkAgAA0AQYCJwIAAQStBuITAgAAQkYeAgAAACyAAKAIAIQMgAkEoahCZgYCAAEEQQQQQnoGAgAAiAEH0ADYCDCAAQYiZwIAANgIIIABB9AA2AgQgAEH8mcCAADYCACACIABBAhDnhYCAACACQdAAaiACQShqQQEgAhCagYCAACACQdAAahCfgYCAAEEQQQQQnoGAgAAiAEE/NgIMIABB5JvAgAA2AgggAEH0ADYCBCAAQfCawIAANgIAIAIgAEECEOeFgIAAIAJB0ABqIAJBKGpBAiACEJqBgIAAIAJB0ABqEJ+BgIAAQRBBBBCegYCAACIAQfQANgIMIABBl53AgAA2AgggAEH0ADYCBCAAQaOcwIAANgIAIAIgAEECEOeFgIAAIAJB0ABqIAJBKGpBAyACEJqBgIAAIAJB0ABqEJ+BgIAAIAMgAiACQShqQSgQ7IeAgAAiAhCggYCAACACQeAAaiSAgICAAAtKAQJ/I4CAgIAAQRBrIgIkgICAgAAgAkEIaiAAIAFBABCFgoCAAAJAIAIoAggiAw0AIAAgARCIh4CAAAALIAJBEGokgICAgAAgAwsVAAJAIAAoAgBFDQAgABDHgYCAAAsL0QEEAX8DfgF/An4jgICAgABBMGsiAiSAgICAACAAKQMQIQMgACABKQMQNwMQIAApAwghBCAAIAEpAwg3AwggACkDACEFIAAgASkDADcDACAAQRhqIgYpAwAhByAGIAFBGGopAwA3AwAgAEEgaiIAKQMAIQggACABQSBqKQMANwMAIAJBCGpBGGogBzcDACACQQhqQSBqIAg3AwAgAiADNwMYIAIgBDcDECACIAU3AwgCQCADQiCIp0UNACACQRhqENqBgIAACyACQTBqJICAgIAACwwAIAEgARCigYCAAAsSACABQYOiwIAAQQwQxoeAgAALDAAgASABEKSBgIAACxIAIAFBg6LAgABBDBDGh4CAAAsMACABIAEQpoGAgAALEgAgAUGDosCAAEEMEMaHgIAACwwAIAAgARCohoCAAAsMACAAIAEQpoaAgAALDAAgASABEKqBgIAACxIAIAFBg6LAgABBDBDGh4CAAAsMACABIAEQrIGAgAALEgAgAUGDosCAAEEMEMaHgIAACwwAIAEgARCugYCAAAsSACABQYOiwIAAQQwQxoeAgAALDAAgASABELCBgIAACxIAIAFBg6LAgABBDBDGh4CAAAsMACAAIAEQooaAgAALDAAgASABELOBgIAACxIAIAFBg6LAgABBDBDGh4CAAAsMACAAIAEQp4aAgAALmQEBAX8jgICAgABBMGsiAySAgICAACADQRBqIAEoAgAgAhCNg4CAACADQQhqIANBEGoQmoaAgAAgA0EgaiADKAIIIAMoAgwQ7ISAgAACQCADKAIgDQBBiJDAgABB5gAQ4oSAgAAACyAAIAMpAyA3AgAgAEEIaiADQSBqQQhqKAIANgIAIANBEGoQt4CAgAAgA0EwaiSAgICAAAtIAgF/AX4jgICAgABBEGsiAiSAgICAACACQQhqIAFBCGooAgA2AgAgAiABKQIANwMAIAIQt4GAgAAhAyACQRBqJICAgIAAIAMLSwIBfwF+I4CAgIAAQRBrIgEkgICAgAAgAUEIaiAAEJqGgIAAIAEoAgggASgCDBCPg4CAACECIAAQt4CAgAAgAUEQaiSAgICAACACCzcBAX8jgICAgABBEGsiAiSAgICAACACIAAoAgA2AgwgAkEMaiABEJ2BgIAAIAJBEGokgICAgAALIwAgAEEwahC3gICAACAAQQhqELeAgIAAIABBIGoQt4CAgAALEgAgABC7gYCAACAAELyBgIAACzsBAX8gACgCCEEobCEBIAAoAgAhAAJAA0AgAUUNASAAQRhqELeAgIAAIAFBWGohASAAQShqIQAMAAsLC0wBAX8jgICAgABBEGsiASSAgICAACABIAAQioKAgAACQCABKAIAIgBFDQAgACABKAIEIAFBCGooAgAQvYGAgAALIAFBEGokgICAgAALFgACQCABRQ0AIAAgASACEP+DgIAACwtsAQN/AkAgAC0AAEECSQ0AIABBBGoiASgCACIAKAIAIAAoAgQoAgARgICAgAAAIAAoAgQiAigCCCEDIAIoAgQhAiAAKAIAEP+FgIAAIAIgAxC9gYCAACABKAIAEP+FgIAAQQxBBBD/g4CAAAsLAgALFQACQCAAKAIARQ0AIAAQt4CAgAALCyMAIABBMGoQt4CAgAAgAEEIahC3gICAACAAQSBqELeAgIAACwIACxgAAkAgACgCGEUNACAAQRhqELeAgIAACwsCAAsCAAsCAAsSACAAEO+FgIAAIAAQ8YWAgAALEgAgABDuhYCAACAAEN2FgIAACxUAAkAgACgCCEUNACAAEMqBgIAACwsYACAAQRhqELeAgIAAIABBCGoQt4CAgAALAgALAgALAgALAgALAgALAgALAgALAgALAgALOgAgABDVgYCAACAAQYACahC3gICAACAAQfABahC3gICAACAAQcgBahC3gICAACAAQeABahC3gICAAAs6ACAAELmBgIAAIABBwABqEMGBgIAAIABBsAFqELeAgIAAIABBiAFqELeAgIAAIABBoAFqELeAgIAACwIACwIACwIACwIAC6cBAQF/I4CAgIAAQcAAayIBJICAgIAAAkAgACgCAEUNACABQRBqIAAQqoKAgAAgAUEoakEQaiABQRBqQRBqKAIANgIAIAFBKGpBCGogAUEQakEIaikDADcDACABIAEpAxA3AygDQCABQQhqIAFBKGoQq4KAgAACQCABKAIIDQAgABCsgoCAAAwCCyABKAIMQQRqEMeBgIAADAALCyABQcAAaiSAgICAAAt5AgF/AX5BBCEDAkACQCACQQRPDQBCACEEQQAhAwwBCyAAIAFqNQAAIQQLAkAgA0EBciACTw0AIAAgAyABamozAAAgA0EDdK2GIASEIQQgA0ECciEDCwJAIAMgAk8NACAAIAMgAWpqMQAAIANBA3SthiAEhCEECyAEC5sCAwJ/AX4BfyAAIAAoAjggAmo2AjgCQAJAAkACQCAAKAI8IgMNAEEAIQMMAQsgACABQQBBCCADayIDIAIgAyACSRsQmIGAgAAgACgCPCIEQQN0QThxrYYgACkDMIQiBTcDMCADIAJLDQEgAEEoaiIEIAQpAwAgBYU3AwAgAEEQahCpgoCAACAAQQA2AjwgACAAKQMQIAApAzCFNwMQCyAAQRBqIQQgAiADayIGQXhxIQIgBkEHcSEGA0ACQCADIAJJDQAgACABIAMgBhCYgYCAADcDMAwDCyAAIAApAyggASADaikAACIFhTcDKCAEEKmCgIAAIAAgBSAAKQMQhTcDECADQQhqIQMMAAsLIAQgAmohBgsgACAGNgI8C+8BAgJ/AX4jgICAgABBEGsiAiSAgICAACAALQAAIQAgASABKAI4QQFqNgI4IAIgADoADwJAAkACQAJAIAEoAjwiAA0AQQAhAAwBCyABIAJBD2pBAEEIIABrIgBBAEcQ24GAgAAgASgCPCIDQQN0QThxrYYgASkDMIQiBDcDMCAAQQFLDQEgAUEoaiIDIAMpAwAgBIU3AwAgAUEQahDegYCAACABQQA2AjwgASABKQMQIAEpAzCFNwMQCyABIAJBD2ogAEEBIABrIgMQ24GAgAA3AzAMAQsgA0EBaiEDCyABIAM2AjwgAkEQaiSAgICAAAtmAQV+IAAgACkDGCIBQhCJIAEgACkDCHwiAYUiAiAAKQMQIgMgACkDAHwiBEIgiXwiBTcDACAAIAJCFYkgBYU3AxggACABIANCDYkgBIUiAnwiASACQhGJhTcDECAAIAFCIIk3AwgLQwIBfwF+I4CAgIAAQRBrIgIkgICAgAAgADUCACEDIAJCADcDCCACIAM3AwAgASACQRAQ3IGAgAAgAkEQaiSAgICAAAtAAQF/I4CAgIAAQRBrIgMkgICAgAAgAyABNgIMIANBDGogAhDfgYCAACACIAAgARDcgYCAACADQRBqJICAgIAACzYBAn5CACECAkAgASkDACIDIAEpAwhaDQBCASECIAEgA0IBfDcDAAsgACADNwMIIAAgAjcDAAtdAQF/I4CAgIAAQSBrIgIkgICAgAAgAkEIakEQaiABQRBqKQMANwMAIAJBCGpBCGogAUEIaikDADcDACACIAEpAwA3AwggACACQQhqEOOBgIAAIAJBIGokgICAgAALawEBfyOAgICAAEEgayICJICAgIAAIABBADYCCCAAQgg3AgAgAkEIakEQaiABQRBqKQMANwMAIAJBCGpBCGogAUEIaikDADcDACACIAEpAwA3AwggACACQQhqEMaCgIAAIAJBIGokgICAgAALJQACQCAAIAEgAhD6hICAACIARQ0AIABBACABEO6HgIAAGgsgAAs9AQF/AkAgACAEIAMQ+oSAgAAiBUUNACAFIAEgBCACIAIgBEsbEOyHgIAAGiAAIAEgAiADEPuEgIAACyAFC3EBAn8jgICAgABBEGsiAiSAgICAAAJAIAEoAgQiA2lBAUYNAEHcicCAAEErIAJBCGpBiIrAgABB1IjAgAAQqoeAgAAACyABKAIAIQEgACADNgIEIAAgAyABakF/akEAIANrcTYCACACQRBqJICAgIAAC5gBAQJ/I4CAgIAAQSBrIgIkgICAgAAgAkKogICAgAE3AxggAkEIaiACQRhqIAEQ6IGAgAACQAJAIAIoAgwiAUUNACACKAIIIQMgAiABNgIMIAIgAzYCCCACIAJBCGoQ5oGAgAAgAigCBCEBIAIoAgAhAwwBCxD9hYCAAEEAIQELIAAgATYCBCAAIAM2AgAgAkEgaiSAgICAAAtTAgF/AX4CQAJAIAEoAgAgASgCBCIBakF/akEAIAFrcSIDrSACrX4iBEIgiKcNACAAIAM2AgggACAEpzYCAAwBCxD9hYCAAEEAIQELIAAgATYCBAsTACAAIAEgAiADEJGFgIAAQQFz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AEG4i8CAABCqh4CAAAALSQEBfyOAgICAAEEQayIEJICAgIAAIAQgAjYCDCADIARBDGpBBBCBhoCAACADIAEgAhCBhoCAACAAQQM6AAAgBEEQaiSAgICAAAtIAQF/I4CAgIAAQRBrIgIkgICAgAAgAkEIaiABEPCBgIAAIAItAAghASAAIAItAAk6AAEgACABQQFxOgAAIAJBEGokgICAgAALnwEDAX8BfgN/I4CAgIAAQSBrIgIkgICAgAACQANAIAIgARD/gYCAACACKAIAQQFHDQEgAikDCCEDAkAgACgCCCIEIAAoAgRHDQAgAkEQaiABEICCgIAAIABBfyACKAIQIgVBAWoiBiAGIAVJGxDchYCAAAsgABDshYCAACAEQQN0aiADNwMAIAAgBEEBajYCCAwACwsgAkEgaiSAgICAAAusAQIBfwJ+I4CAgIAAQTBrIgIkgICAgAAgAiABEOGBgIAAAkACQAJAAkAgAikDAKcNACACQQA2AhAMAQsgAkEQaiABQRBqIAIpAwgQtYGAgAAgAigCEA0BC0IAIQMMAQsgAkEgakEIaiACQRBqQQhqKAIANgIAIAIgAikDEDcDICACIAJBIGoQtoGAgAAhBEIBIQMLIAAgBDcDCCAAIAM3AwAgAkEwaiSAgICAAAtdAgJ+An8CQAJAIAEpAwgiAiABKQMAIgNWDQBBASEBQQAhBEEAIQUMAQsgAiADfSICpyIFQX8gAkKAgICAEFQiARshBAsgACABNgIEIAAgBDYCACAAQQhqIAU2AgALEQAgACAAKAIIIAEQhIKAgAALFAAgACABIAEgAkEobGoQg4KAgAALaQEDfyOAgICAAEEQayIDJICAgIAAIAAgAiABa0EobhCBgoCAACAAKAIAIQQgA0EIaiAAKAIIIgU2AgAgAyAAQQhqNgIEIAMgBCAFQShsajYCACABIAIgAxDIgoCAACADQRBqJICAgIAAC2EBAX8jgICAgABBEGsiAySAgICAACADIAAgASACEIiCgIAAAkACQCADKAIAQQFHDQAgA0EIaigCACIARQ0BIAMoAgQgABCIh4CAAAALIANBEGokgICAgAAPCxCJh4CAAAALVAACQAJAIAFFDQACQAJAIANFDQAgASACEIGEgIAAIQIMAQsgASACEP6DgIAAIQILIAINARCNhoCAAEEAIQIMAQtBACEBCyAAIAE2AgQgACACNgIACxgAIAAgAhD9gICAACAAIAEgAhCBhoCAAAuMAQECfyOAgICAAEEQayIDJICAgIAAIANBCGogARDngYCAAAJAAkAgAygCDCIBRQ0AIAMoAggiBEF/TA0AIAMgBCABIAIQhYKAgAAgAygCACICRQ0BIAMoAgQhASAAIAI2AgAgACABQShuNgIEIANBEGokgICAgAAPCxCJh4CAAAALIAQgARCIh4CAAAALKAACQCABKAIEIAJrIANJDQAgAEEANgIADwsgACABIAIgAxCJgoCAAAuEAgECfyOAgICAAEHAAGsiBCSAgICAAAJAAkAgAiADaiIDIAJJDQBBASECIARBGGogASgCBEEBdCIFIAMgBSADSxsiA0EEIANBBEsbEOeBgIAAIAQoAhwhAyAEKAIYIQUgBEEwaiABEIqCgIAAIARBIGogBSADIARBMGogARCDhoCAACAEQShqKAIAIQMgBCgCJCEFAkAgBCgCIEEBRg0AIAEgBTYCACABIANBKG42AgRBACECDAILIARBEGogBSADEP6FgIAAIAAgBCkDEDcCBAwBCyAEQQhqIANBABD+hYCAACAAIAQpAwg3AgRBASECCyAAIAI2AgAgBEHAAGokgICAgAALQQEBfwJAIAEoAgQiAkUNACABKAIAEP+FgIAAIQEgAEEIakEINgIAIAAgAkEobDYCBCAAIAE2AgAPCyAAQQA2AgALoAICAX8BfiOAgICAAEHQBmsiAySAgICAACADIAI2AgwgAyABNgIIIANBsARqIANBCGoQjIKAgAAgAykCtAQhBCADKAKwBCEBIANBpAJqIANBvARqQYwCEOyHgIAAGgJAAkACQCABQQFGDQAgAyAEQiCIPgIQIANBEGpBBHIgA0GkAmpBjAIQ7IeAgAAaIAMoAgwNASAAQQhqIANBEGpBkAIQ7IeAgAAaIABBADYCAAwCCyADIAQ3A7AEIANByAZqIANBsARqELeGgIAAIAAgAykDyAY3AgQgAEEBNgIADAELIANBsARqQQxB2IvAgABBEhCDhYCAACAAQQE2AgAgACADKQOwBDcCBCADQRBqENSBgIAACyADQdAGaiSAgICAAAu/BAMBfwF+An8jgICAgABB8AZrIgIkgICAgAAgAkHQBGogARC9g4CAACACKQLUBCEDIAIoAtAEIQQgAkGUA2ogAkHcBGoiBUG8ARDsh4CAABoCQAJAAkACQCAEQQFGDQAgAiADQiCIPgLQASACQdABakEEciACQZQDakG8ARDsh4CAABogAkHQBGogARCSgoCAACACKQLUBCEDIAIoAtAEQQFGDQEgAiAFKAIANgKgBiACIAM3A5gGIAJB0ARqIAEQk4GAgAAgAikC1AQhAyACKALQBCEBIAJBqAZqIAJB3ARqQTwQ7IeAgAAaIAFBAUYNAiACQRBqIAJB0AFqQcABEOyHgIAAGiACQQhqIgEgAkGYBmpBCGooAgA2AgAgAiACKQOYBjcDACAAQQhqIAJBEGpBwAEQ7IeAgAAaIABByAFqIANCIIg+AgAgAEHMAWogAkGoBmpBPBDsh4CAABogAEEANgIAIABBkAJqIAEoAgA2AgAgAEGIAmogAikDADcDAAwDCyACIAM3A9AEIAJBqAZqIAJB0ARqELeGgIAAIAAgAikDqAY3AgQgAEEBNgIADAILIAIgAzcD0AQgAkGoBmogAkHQBGoQt4aAgAAgACACKQOoBjcCBCAAQQE2AgAgAkHQAWoQ1YGAgAAMAQsgAiADNwPQBCACQegGaiACQdAEahC3hoCAACAAIAIpA+gGNwIEIABBATYCACACQZgGahC3gICAACACQdABahDVgYCAAAsgAkHwBmokgICAgAALlAICAX8BfiOAgICAAEGQAWsiAySAgICAACADIAI2AgQgAyABNgIAIANB2ABqIAMQtICAgAAgAykCXCEEIAMoAlghASADQTRqIANB5ABqQSQQ7IeAgAAaAkACQAJAIAFBAUYNACADIARCIIg+AgggA0EIakEEciADQTRqQSQQ7IeAgAAaIAMoAgQNASAAQQhqIANBCGpBKBDsh4CAABogAEEANgIADAILIAMgBDcDWCADQYgBaiADQdgAahC3hoCAACAAIAMpA4gBNwIEIABBATYCAAwBCyADQdgAakEMQdiLwIAAQRIQg4WAgAAgAEEBNgIAIAAgAykDWDcCBCADQQhqEMqBgIAACyADQZABaiSAgICAAAveAQIBfwF+I4CAgIAAQTBrIgMkgICAgAAgAyACNgIEIAMgATYCACADQRhqIAMQ+4GAgAAgA0EQaiADQSRqKAIANgIAIAMgAykCHDcDCAJAAkACQCADKAIYQQFGDQAgAygCBA0BIAMpAgwhBCAAQQA2AgAgAEEIaiAENwMADAILIAMgAykDCDcDGCADQShqIANBGGoQt4aAgAAgACADKQMoNwIEIABBATYCAAwBCyADQRhqQQxB2IvAgABBEhCDhYCAACAAQQE2AgAgACADKQMYNwIECyADQTBqJICAgIAAC5QCAgF/AX4jgICAgABBkAFrIgMkgICAgAAgAyACNgIEIAMgATYCACADQdgAaiADEJCCgIAAIAMpAlwhBCADKAJYIQEgA0E0aiADQeQAakEkEOyHgIAAGgJAAkACQCABQQFGDQAgAyAEQiCIPgIIIANBCGpBBHIgA0E0akEkEOyHgIAAGiADKAIEDQEgAEEIaiADQQhqQSgQ7IeAgAAaIABBADYCAAwCCyADIAQ3A1ggA0GIAWogA0HYAGoQt4aAgAAgACADKQOIATcCBCAAQQE2AgAMAQsgA0HYAGpBDEHYi8CAAEESEIOFgIAAIABBATYCACAAIAMpA1g3AgQgA0EgahC3gICAAAsgA0GQAWokgICAgAALqwUEAX8BfgN/A34jgICAgABB0ABrIgIkgICAgAAgAkE4aiABEPuBgIAAIAJBEGogAkHEAGooAgA2AgAgAiACKQI8NwMIAkACQAJAAkACQAJAAkAgAigCOEEBRg0AIAIpAgwhAyACQThqIAEQ+oGAgAAgAi0AOEEBRg0BIAItADkhBCACQThqIAEQ+oGAgAAgAi0AOEEBRg0CIAItADkhBSACQThqIAEQ+4GAgAAgAkEYakEIaiACQcQAaiIGKAIANgIAIAIgAikCPDcDGCACKAI4QQFGDQMgAikCHCEHIAJBOGogARD7gYCAACACQShqQQhqIAYoAgA2AgAgAiACKQI8NwMoIAIoAjhBAUYNBCACKQIsIQggAkE4aiABEJKCgIAAIAIpAjwhCSACKAI4QQFGDQUgAkHEAGooAgAhASAAQQA2AgAgAEEtaiAFOgAAIABBLGogBDoAACAAQShqIAE2AgAgAEEgaiAJNwMAIABBGGogCDcDACAAQRBqIAc3AwAgAEEIaiADNwMADAYLIAIgAikDCDcDOCACQShqIAJBOGoQt4aAgAAgACACKQMoNwIEIABBATYCAAwFCyACIAIpAjw3AzggAkEoaiACQThqELeGgIAAIAAgAikDKDcCBCAAQQE2AgAMBAsgAiACKQI8NwM4IAJBKGogAkE4ahC3hoCAACAAIAIpAyg3AgQgAEEBNgIADAMLIAIgAikDGDcDOCACQShqIAJBOGoQt4aAgAAgACACKQMoNwIEIABBATYCAAwCCyACIAIpAyg3AzggAkHIAGogAkE4ahC3hoCAACAAIAIpA0g3AgQgAEEBNgIADAELIAIgCTcDOCACQcgAaiACQThqELeGgIAAIAAgAikDSDcCBCAAQQE2AgALIAJB0ABqJICAgIAAC/ABAgF/AX4jgICAgABBMGsiAySAgICAACADIAI2AgQgAyABNgIAIANBGGogAxCSgoCAACADKQIcIQQCQAJAAkAgAygCGEEBRg0AIAMgA0EkaigCADYCECADIAQ3AwggAygCBA0BIAAgAykDCDcCBCAAQQA2AgAgAEEMaiADQRBqKAIANgIADAILIAMgBDcDGCADQShqIANBGGoQt4aAgAAgACADKQMoNwIEIABBATYCAAwBCyADQRhqQQxB2IvAgABBEhCDhYCAACAAQQE2AgAgACADKQMYNwIEIANBCGoQt4CAgAALIANBMGokgICAgAALlwQEAX8BfgF/AX4jgICAgABB8ABrIgIkgICAgAAgAkHQAGogARC1gICAACACKQJUIQMCQAJAAkAgAigCUEEBRg0AIAIgAkHcAGooAgA2AjAgAiADNwMoIAJBEGogAkEoahCahoCAACACQdAAaiACKAIQIAIoAhQQ2IeAgAACQCACKAJQQQFHDQAgAkEYakEIaiACQShqQQhqIgEoAgAiBDYCACACIAIpAygiAzcDGCACKQJUIQUgASAENgIAIAIgAzcDKCACIAU3AjQgAkEANgJIIAJCATcDQCACIAJBKGo2AkwgAkEIaiACQcwAakGFgICAABCzhoCAACACQeQAakEBNgIAIAJCATcCVCACQciEwIAANgJQIAIgAikDCDcDaCACIAJB6ABqNgJgIAJBwABqIAJB0ABqEJSFgIAADQMgAkHAAGoQs4WAgAAgAkHQAGpBDCACQcAAahCphoCAACACQShqELeAgIAAIAAgAikDUDcCBCAAQQE2AgAMAgsgAkEYakEIaiACQShqQQhqKAIAIgE2AgAgAiACKQMoIgM3AxggAEEMaiABNgIAIAAgAzcCBCAAQQA2AgAMAQsgAiADNwNQIAJBwABqIAJB0ABqELeGgIAAIAAgAikDQDcCBCAAQQE2AgALIAJB8ABqJICAgIAADwtB0ITAgABBNyACQdAAakHMicCAAEHQhcCAABCqh4CAAAALpwECAX8BfiOAgICAAEEgayICJICAgIAAIAJBgAgQ/YCAgAAgAkEYaiABIAIQ+YGAgAACQAJAIAIpAxgiA6dB/wFxQQNHDQAgACACKQMANwIEIABBDGogAkEIaigCADYCAEEAIQEMAQsgAiADNwMYIAJBEGogAkEYahC3hoCAACAAIAIpAxA3AgQgAhC3gICAAEEBIQELIAAgATYCACACQSBqJICAgIAAC6cBAgF/AX4jgICAgABBIGsiAiSAgICAACACQYAIEP2AgIAAIAJBGGogASACEJWCgIAAAkACQCACKQMYIgOnQf8BcUEDRw0AIAAgAikDADcCBCAAQQxqIAJBCGooAgA2AgBBACEBDAELIAIgAzcDGCACQRBqIAJBGGoQt4aAgAAgACACKQMQNwIEIAIQt4CAgABBASEBCyAAIAE2AgAgAkEgaiSAgICAAAv9AQIBfwF+I4CAgIAAQRBrIgMkgICAgAAgA0EIaiABIAIQvIOAgAACQAJAAkACQCADKQMIIgSnQf8BcUEDRw0AIANBCGogAUGAAmogAhCagoCAACADKQMIIgSnQf8BcUEDRw0BIANBCGogAUHAAWogAhCJgYCAACADKQMIIgSnQf8BcUEDRw0CIABBAzoAAAwDCyADIAQ3AwggAyADQQhqELeGgIAAIAAgAykDADcCAAwCCyADIAQ3AwggAyADQQhqELeGgIAAIAAgAykDADcCAAwBCyADIAQ3AwggAyADQQhqELeGgIAAIAAgAykDADcCAAsgA0EQaiSAgICAAAunAQIBfwF+I4CAgIAAQSBrIgIkgICAgAAgAkGACBD9gICAACACQRhqIAEgAhCXgoCAAAJAAkAgAikDGCIDp0H/AXFBA0cNACAAIAIpAwA3AgQgAEEMaiACQQhqKAIANgIAQQAhAQwBCyACIAM3AxggAkEQaiACQRhqELeGgIAAIAAgAikDEDcCBCACELeAgIAAQQEhAQsgACABNgIAIAJBIGokgICAgAAL3wICAX8BfiOAgICAAEEQayIDJICAgIAAIANBCGogASACEPmBgIAAAkACQCADKQMIIgSnQf8BcUEDRg0AIAMgBDcDCCADIANBCGoQt4aAgAAgACADKQMANwIADAELIAIgAUEkakEBEIGGgIAAIAIgAUElakEBEIGGgIAAIANBCGogAUEIaiACEPmBgIAAAkACQCADKQMIIgSnQf8BcUEDRw0AIANBCGogAUEQaiACEPmBgIAAIAMpAwgiBKdB/wFxQQNHDQEgA0EIaiABQRhqIAIQmoKAgAACQCADKQMIIgSnQf8BcUEDRw0AIABBAzoAAAwDCyADIAQ3AwggAyADQQhqELeGgIAAIAAgAykDADcCAAwCCyADIAQ3AwggAyADQQhqELeGgIAAIAAgAykDADcCAAwBCyADIAQ3AwggAyADQQhqELeGgIAAIAAgAykDADcCAAsgA0EQaiSAgICAAAunAQIBfwF+I4CAgIAAQSBrIgIkgICAgAAgAkGACBD9gICAACACQRhqIAEgAhCygICAAAJAAkAgAikDGCIDp0H/AXFBA0cNACAAIAIpAwA3AgQgAEEMaiACQQhqKAIANgIAQQAhAQwBCyACIAM3AxggAkEQaiACQRhqELeGgIAAIAAgAikDEDcCBCACELeAgIAAQQEhAQsgACABNgIAIAJBIGokgICAgAALpwECAX8BfiOAgICAAEEgayICJICAgIAAIAJBgAgQ/YCAgAAgAkEYaiABIAIQmoKAgAACQAJAIAIpAxgiA6dB/wFxQQNHDQAgACACKQMANwIEIABBDGogAkEIaigCADYCAEEAIQEMAQsgAiADNwMYIAJBEGogAkEYahC3hoCAACAAIAIpAxA3AgQgAhC3gICAAEEBIQELIAAgATYCACACQSBqJICAgIAAC0EBAX8jgICAgABBEGsiAySAgICAACADQQhqIAEQmoaAgAAgACADKAIIIAMoAgwgAhD8gYCAACADQRBqJICAgIAAC7MBAgF/AX4jgICAgABB0ABrIgMkgICAgAAgAyACNgIkIAMgATYCICADIAA2AhwgA0EQaiADQRxqQYaAgIAAEPuFgIAAIAMpAxAhBCADQQhqIANBIGpBgoCAgAAQkoWAgAAgA0E8akECNgIAIAMgBDcDQCADQgI3AiwgA0HEjMCAADYCKCADIAMpAwg3A0ggAyADQcAAajYCOCADQShqEMmFgIAAIQAgA0HQAGokgICAgAAgAAuAAQEBfyOAgICAAEEwayICJICAgIAAIAIgATYCDCACIAA2AgggAiACQQhqQYOAgIAAEPyFgIAAIAJBJGpBATYCACACQgI3AhQgAkHojMCAADYCECACIAIpAwA3AyggAiACQShqNgIgIAJBEGoQyYWAgAAhACACQTBqJICAgIAAIAALmQMBBH8jgICAgABBMGsiAiSAgICAACACQQhqIAEQ4ICAgAACQAJAAkAgAi0ACEEBRw0AIAAgAigCDDYCBAwBCwJAIAItAAlBAUcNAAJAAkACQAJAIAItAApBIkYNACABIAJBKGpBlJXAgAAQ74CAgAAhAyACQQE2AgggAiADNgIMDAELIAEgASgCCEEBajYCCCABQQxqIgMQ34CAgAAgAkEYaiABIAMQzYWAgAAgAigCHCEDAkAgAigCGEEBRw0AIABBATYCACAAIAM2AgQMBgsgAkEYakEMaigCACEEIAJBIGooAgAhBQJAAkAgA0UNACACQQhqIAUgBBDAhYCAAAwBCyACQQhqIAUgBBDAhYCAAAsgAigCCEEBRw0BCyAAIAIoAgwgARDdgICAADYCBEEBIQEMAQsgACACKQIMNwIEIABBDGogAkEIakEMaigCADYCAEEAIQELIAAgATYCACACQTBqJICAgIAADwsgAkEFNgIYIAAgASACQRhqENmAgIAANgIECyAAQQE2AgALIAJBMGokgICAgAALmgIBBH8jgICAgABBIGsiAiSAgICAACACQQhqIAEQ8oWAgAAgAkEQaiAAQQEgAigCDCIBIAIoAggiA2tBA3YQn4KAgAACQAJAIAIoAhBBAUcNACACKAIUEK+FgIAAIQAMAQsgAkEQakEIai0AACEEIAIoAhQhBSACIAMgARDthYCAACACKAIEIQMgAigCACEAA0ACQCADIABHDQAgBSAEEKCCgIAAIQAMAgsgAkEQaiAFIARB/wFxQQFGEIGBgIAAAkAgAkEQahD1gYCAACIBDQAgACAFEKGCgIAAIgENACAAQQhqIQAgAkEDOgAQQQIhBCACQRBqEPWBgIAAIgFFDQELCyABEK+FgIAAIQALIAJBIGokgICAgAAgAAvpAQEBfyOAgICAAEEQayIEJICAgIAAAkACQAJAAkACQAJAIAJBAUcNACADRQ0BCyAEQQhqIAEQ/4CAgAAgBEEIahD1gYCAACICRQ0BIAAgAjYCBAwDCyAEQQhqIAEQ/4CAgAACQCAEQQhqEPWB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AUcNACAAQQE6AAAgAEEEaiACKAIMNgIADAELAkAgAi0ACUEBRw0AAkACQAJAAkACQAJAIAItAAoiA0EsRg0AIANB/QBHDQEgAEGACjsBAAwHCyABLQAEDQEgASgCACIDIAMoAghBAWo2AgggAkEQaiABKAIAEOCAgIAAIAItABBBAUcNAiAAQQE6AAAgAEEEaiACKAIUNgIADAYLIAEtAAQNACABKAIAIQEgAkEINgIQIAEgAkEQahDZgICAACEBIABBAToAACAAQQRqIAE2AgAMBQsgAUEAOgAEDAELIAItABFFDQEgAi0AEiEDCwJAAkAgA0H/AXEiA0EiRg0AIANB/QBHDQEgASgCACEBIAJBEjYCECABIAJBEGoQ2YCAgAAhASAAQQE6AAAgAEEEaiABNgIADAQLIAEoAgAiASABKAIIQQFqNgIIIAFBDGoiAxDfgICAACACQRBqIAEgAxDNhYCAAAJAAkACQAJAIAIoAhBBAUcNACACIAIoAhQiATYCDCACQQE6AAgMAQsgAkEIaiACQRhqKAIAIAJBEGpBDGooAgAQroKAgAAgAi0ACEEBRw0BIAIoAgwhAQsgAEEEaiABNgIAQQEhAQwBCyAAIAItAAk6AAFBACEBCyAAIAE6AAAMAwsgASgCACEBIAJBEDYCECABIAJBEGoQ2YCAgAAhASAAQQE6AAAgAEEEaiABNgIADAILIAEoAgAhASACQQU2AhAgASACQRBqENmAgIAAIQEgAEEBOgAAIABBBGogATYCAAwBCyABKAIAIQEgAkEDNgIQIAEgAkEQahDZgICAACEBIABBAToAACAAQQRqIAE2AgALIAJBIGokgICAgAALkwEAAkACQAJAAkACQCABIAJB+6HAgABBCBCmhYCAAA0AIAEgAkGOnsCAAEEFEKaFgIAADQEgASACQeiiwIAAQQkQpoWAgAANAiABIAJB8aLAgABBBBCmhYCAAA0DIABBBDoAAQwECyAAQQA6AAEMAwsgAEEBOgABDAILIABBAjoAAQwBCyAAQQM6AAELIABBADoAAAuzBQECfyOAgICAAEEgayICJICAgIAAIAJBCGogASgCABDggICAAAJAAkAgAi0ACEEBRw0AIABBAToAACAAQQRqIAIoAgw2AgAMAQsCQCACLQAJQQFHDQACQAJAAkACQAJAAkAgAi0ACiIDQSxGDQAgA0H9AEcNASAAQYAEOwEADAcLIAEtAAQNASABKAIAIgMgAygCCEEBajYCCCACQRBqIAEoAgAQ4ICAgAAgAi0AEEEBRw0CIABBAToAACAAQQRqIAIoAhQ2AgAMBgsgAS0ABA0AIAEoAgAhASACQQg2AhAgASACQRBqENmAgIAAIQEgAEEBOgAAIABBBGogATYCAAwFCyABQQA6AAQMAQsgAi0AEUUNASACLQASIQMLAkACQCADQf8BcSIDQSJGDQAgA0H9AEcNASABKAIAIQEgAkESNgIQIAEgAkEQahDZgICAACEBIABBAToAACAAQQRqIAE2AgAMBAsgASgCACIBIAEoAghBAWo2AgggAUEMaiIDEN+AgIAAIAJBEGogASADEM2FgIAAAkACQAJAAkAgAigCEEEBRw0AIAIgAigCFCIBNgIMIAJBAToACAwBCyACQQhqIAJBGGooAgAgAkEQakEMaigCABCwgoCAACACLQAIQQFHDQEgAigCDCEBCyAAQQRqIAE2AgBBASEBDAELIAAgAi0ACToAAUEAIQELIAAgAToAAAwDCyABKAIAIQEgAkEQNgIQIAEgAkEQahDZgICAACEBIABBAToAACAAQQRqIAE2AgAMAgsgASgCACEBIAJBBTYCECABIAJBEGoQ2YCAgAAhASAAQQE6AAAgAEEEaiABNgIADAELIAEoAgAhASACQQM2AhAgASACQRBqENmAgIAAIQEgAEEBOgAAIABBBGogATYCAAsgAkEgaiSAgICAAAsnACABIAJBi57AgABBAxCmhYCAACEBIABBADoAACAAIAFBAXM6AAELswUBAn8jgICAgABBIGsiAiSAgICAACACQQhqIAEoAgAQ4ICAgAACQAJAIAItAAhBAUcNACAAQQE6AAAgAEEEaiACKAIMNgIADAELAkAgAi0ACUEBRw0AAkACQAJAAkACQAJAIAItAAoiA0EsRg0AIANB/QBHDQEgAEGABDsBAAwHCyABLQAEDQEgASgCACIDIAMoAghBAWo2AgggAkEQaiABKAIAEOCAgIAAIAItABBBAUcNAiAAQQE6AAAgAEEEaiACKAIUNgIADAYLIAEtAAQNACABKAIAIQEgAkEINgIQIAEgAkEQahDZgICAACEBIABBAToAACAAQQRqIAE2AgAMBQsgAUEAOgAEDAELIAItABFFDQEgAi0AEiEDCwJAAkAgA0H/AXEiA0EiRg0AIANB/QBHDQEgASgCACEBIAJBEjYCECABIAJBEGoQ2YCAgAAhASAAQQE6AAAgAEEEaiABNgIADAQLIAEoAgAiASABKAIIQQFqNgIIIAFBDGoiAxDfgICAACACQRBqIAEgAxDNhYCAAAJAAkACQAJAIAIoAhBBAUcNACACIAIoAhQiATYCDCACQQE6AAgMAQsgAkEIaiACQRhqKAIAIAJBEGpBDGooAgAQsoKAgAAgAi0ACEEBRw0BIAIoAgwhAQsgAEEEaiABNgIAQQEhAQwBCyAAIAItAAk6AAFBACEBCyAAIAE6AAAMAwsgASgCACEBIAJBEDYCECABIAJBEGoQ2YCAgAAhASAAQQE6AAAgAEEEaiABNgIADAILIAEoAgAhASACQQU2AhAgASACQRBqENmAgIAAIQEgAEEBOgAAIABBBGogATYCAAwBCyABKAIAIQEgAkEDNgIQIAEgAkEQahDZgICAACEBIABBAToAACAAQQRqIAE2AgALIAJBIGokgICAgAALJwAgASACQYuewIAAQQMQpoWAgAAhASAAQQA6AAAgACABQQFzOgABC7MFAQJ/I4CAgIAAQSBrIgIkgICAgAAgAkEIaiABKAIAEOCAgIAAAkACQCACLQAIQQFHDQAgAEEBOgAAIABBBGogAigCDDYCAAwBCwJAIAItAAlBAUcNAAJAAkACQAJAAkACQCACLQAKIgNBLEYNACADQf0ARw0BIABBgAY7AQAMBwsgAS0ABA0BIAEoAgAiAyADKAIIQQFqNgIIIAJBEGogASgCABDggICAACACLQAQQQFHDQIgAEEBOgAAIABBBGogAigCFDYCAAwGCyABLQAEDQAgASgCACEBIAJBCDYCECABIAJBEGoQ2YCAgAAhASAAQQE6AAAgAEEEaiABNgIADAULIAFBADoABAwBCyACLQARRQ0BIAItABIhAwsCQAJAIANB/wFxIgNBIkYNACADQf0ARw0BIAEoAgAhASACQRI2AhAgASACQRBqENmAgIAAIQEgAEEBOgAAIABBBGogATYCAAwECyABKAIAIgEgASgCCEEBajYCCCABQQxqIgMQ34CAgAAgAkEQaiABIAMQzYWAgAACQAJAAkACQCACKAIQQQFHDQAgAiACKAIUIgE2AgwgAkEBOgAIDAELIAJBCGogAkEYaigCACACQRBqQQxqKAIAELSCgIAAIAItAAhBAUcNASACKAIMIQELIABBBGogATYCAEEBIQEMAQsgACACLQAJOgABQQAhAQsgACABOgAADAMLIAEoAgAhASACQRA2AhAgASACQRBqENmAgIAAIQEgAEEBOgAAIABBBGogATYCAAwCCyABKAIAIQEgAkEFNgIQIAEgAkEQahDZgICAACEBIABBAToAACAAQQRqIAE2AgAMAQsgASgCACEBIAJBAzYCECABIAJBEGoQ2YCAgAAhASAAQQE6AAAgAEEEaiABNgIACyACQSBqJICAgIAAC1MAAkACQAJAIAEgAkH7ocCAAEEIEKaFgIAADQAgASACQY6ewIAAQQUQpoWAgAANASAAQQI6AAEMAgsgAEEAOgABDAELIABBAToAAQsgAEEAOgAAC7MFAQJ/I4CAgIAAQSBrIgIkgICAgAAgAkEIaiABKAIAEOCAgIAAAkACQCACLQAIQQFHDQAgAEEBOgAAIABBBGogAigCDDYCAAwBCwJAIAItAAlBAUcNAAJAAkACQAJAAkACQCACLQAKIgNBLEYNACADQf0ARw0BIABBgAQ7AQAMBwsgAS0ABA0BIAEoAgAiAyADKAIIQQFqNgIIIAJBEGogASgCABDggICAACACLQAQQQFHDQIgAEEBOgAAIABBBGogAigCFDYCAAwGCyABLQAEDQAgASgCACEBIAJBCDYCECABIAJBEGoQ2YCAgAAhASAAQQE6AAAgAEEEaiABNgIADAULIAFBADoABAwBCyACLQARRQ0BIAItABIhAwsCQAJAIANB/wFxIgNBIkYNACADQf0ARw0BIAEoAgAhASACQRI2AhAgASACQRBqENmAgIAAIQEgAEEBOgAAIABBBGogATYCAAwECyABKAIAIgEgASgCCEEBajYCCCABQQxqIgMQ34CAgAAgAkEQaiABIAMQzYWAgAACQAJAAkACQCACKAIQQQFHDQAgAiACKAIUIgE2AgwgAkEBOgAIDAELIAJBCGogAkEYaigCACACQRBqQQxqKAIAELaCgIAAIAItAAhBAUcNASACKAIMIQELIABBBGogATYCAEEBIQEMAQsgACACLQAJOgABQQAhAQsgACABOgAADAMLIAEoAgAhASACQRA2AhAgASACQRBqENmAgIAAIQEgAEEBOgAAIABBBGogATYCAAwCCyABKAIAIQEgAkEFNgIQIAEgAkEQahDZgICAACEBIABBAToAACAAQQRqIAE2AgAMAQsgASgCACEBIAJBAzYCECABIAJBEGoQ2YCAgAAhASAAQQE6AAAgAEEEaiABNgIACyACQSBqJICAgIAACycAIAEgAkGTnsCAAEEIEKaFgIAAIQEgAEEAOgAAIAAgAUEBczoAAQuzBQECfyOAgICAAEEgayICJICAgIAAIAJBCGogASgCABDggICAAAJAAkAgAi0ACEEBRw0AIABBAToAACAAQQRqIAIoAgw2AgAMAQsCQCACLQAJQQFHDQACQAJAAkACQAJAAkAgAi0ACiIDQSxGDQAgA0H9AEcNASAAQYAEOwEADAcLIAEtAAQNASABKAIAIgMgAygCCEEBajYCCCACQRBqIAEoAgAQ4ICAgAAgAi0AEEEBRw0CIABBAToAACAAQQRqIAIoAhQ2AgAMBgsgAS0ABA0AIAEoAgAhASACQQg2AhAgASACQRBqENmAgIAAIQEgAEEBOgAAIABBBGogATYCAAwFCyABQQA6AAQMAQsgAi0AEUUNASACLQASIQMLAkACQCADQf8BcSIDQSJGDQAgA0H9AEcNASABKAIAIQEgAkESNgIQIAEgAkEQahDZgICAACEBIABBAToAACAAQQRqIAE2AgAMBAsgASgCACIBIAEoAghBAWo2AgggAUEMaiIDEN+AgIAAIAJBEGogASADEM2FgIAAAkACQAJAAkAgAigCEEEBRw0AIAIgAigCFCIBNgIMIAJBAToACAwBCyACQQhqIAJBGGooAgAgAkEQakEMaigCABC4goCAACACLQAIQQFHDQEgAigCDCEBCyAAQQRqIAE2AgBBASEBDAELIAAgAi0ACToAAUEAIQELIAAgAToAAAwDCyABKAIAIQEgAkEQNgIQIAEgAkEQahDZgICAACEBIABBAToAACAAQQRqIAE2AgAMAgsgASgCACEBIAJBBTYCECABIAJBEGoQ2YCAgAAhASAAQQE6AAAgAEEEaiABNgIADAELIAEoAgAhASACQQM2AhAgASACQRBqENmAgIAAIQEgAEEBOgAAIABBBGogATYCAAsgAkEgaiSAgICAAAsnACABIAJB+6HAgABBCBCmhYCAACEBIABBADoAACAAIAFBAXM6AAELswUBAn8jgICAgABBIGsiAiSAgICAACACQQhqIAEoAgAQ4ICAgAACQAJAIAItAAhBAUcNACAAQQE6AAAgAEEEaiACKAIMNgIADAELAkAgAi0ACUEBRw0AAkACQAJAAkACQAJAIAItAAoiA0EsRg0AIANB/QBHDQEgAEGABDsBAAwHCyABLQAEDQEgASgCACIDIAMoAghBAWo2AgggAkEQaiABKAIAEOCAgIAAIAItABBBAUcNAiAAQQE6AAAgAEEEaiACKAIUNgIADAYLIAEtAAQNACABKAIAIQEgAkEINgIQIAEgAkEQahDZgICAACEBIABBAToAACAAQQRqIAE2AgAMBQsgAUEAOgAEDAELIAItABFFDQEgAi0AEiEDCwJAAkAgA0H/AXEiA0EiRg0AIANB/QBHDQEgASgCACEBIAJBEjYCECABIAJBEGoQ2YCAgAAhASAAQQE6AAAgAEEEaiABNgIADAQLIAEoAgAiASABKAIIQQFqNgIIIAFBDGoiAxDfgICAACACQRBqIAEgAxDNhYCAAAJAAkACQAJAIAIoAhBBAUcNACACIAIoAhQiATYCDCACQQE6AAgMAQsgAkEIaiACQRhqKAIAIAJBEGpBDGooAgAQuoKAgAAgAi0ACEEBRw0BIAIoAgwhAQsgAEEEaiABNgIAQQEhAQwBCyAAIAItAAk6AAFBACEBCyAAIAE6AAAMAwsgASgCACEBIAJBEDYCECABIAJBEGoQ2YCAgAAhASAAQQE6AAAgAEEEaiABNgIADAILIAEoAgAhASACQQU2AhAgASACQRBqENmAgIAAIQEgAEEBOgAAIABBBGogATYCAAwBCyABKAIAIQEgAkEDNgIQIAEgAkEQahDZgICAACEBIABBAToAACAAQQRqIAE2AgALIAJBIGokgICAgAALJwAgASACQfuhwIAAQQgQpoWAgAAhASAAQQA6AAAgACABQQFzOgABC7MFAQJ/I4CAgIAAQSBrIgIkgICAgAAgAkEIaiABKAIAEOCAgIAAAkACQCACLQAIQQFHDQAgAEEBOgAAIABBBGogAigCDDYCAAwBCwJAIAItAAlBAUcNAAJAAkACQAJAAkACQCACLQAKIgNBLEYNACADQf0ARw0BIABBgAQ7AQAMBwsgAS0ABA0BIAEoAgAiAyADKAIIQQFqNgIIIAJBEGogASgCABDggICAACACLQAQQQFHDQIgAEEBOgAAIABBBGogAigCFDYCAAwGCyABLQAEDQAgASgCACEBIAJBCDYCECABIAJBEGoQ2YCAgAAhASAAQQE6AAAgAEEEaiABNgIADAULIAFBADoABAwBCyACLQARRQ0BIAItABIhAwsCQAJAIANB/wFxIgNBIkYNACADQf0ARw0BIAEoAgAhASACQRI2AhAgASACQRBqENmAgIAAIQEgAEEBOgAAIABBBGogATYCAAwECyABKAIAIgEgASgCCEEBajYCCCABQQxqIgMQ34CAgAAgAkEQaiABIAMQzYWAgAACQAJAAkACQCACKAIQQQFHDQAgAiACKAIUIgE2AgwgAkEBOgAIDAELIAJBCGogAkEYaigCACACQRBqQQxqKAIAELyCgIAAIAItAAhBAUcNASACKAIMIQELIABBBGogATYCAEEBIQEMAQsgACACLQAJOgABQQAhAQsgACABOgAADAMLIAEoAgAhASACQRA2AhAgASACQRBqENmAgIAAIQEgAEEBOgAAIABBBGogATYCAAwCCyABKAIAIQEgAkEFNgIQIAEgAkEQahDZgICAACEBIABBAToAACAAQQRqIAE2AgAMAQsgASgCACEBIAJBAzYCECABIAJBEGoQ2YCAgAAhASAAQQE6AAAgAEEEaiABNgIACyACQSBqJICAgIAACycAIAEgAkGco8CAAEEJEKaFgIAAIQEgAEEAOgAAIAAgAUEBczoAAQslAQF/AkAgACgCABD0gICAACIBDQAgACgCABDegICAACEBCyABCzMBAX8CQCABKAIAEPSAgIAAIgJFDQAgAEEBNgIAIAAgAjYCBA8LIAAgASgCABDzgICAAAs2AQF/AkAgASgCABD0gICAACICRQ0AIABBAToAACAAQQRqIAI2AgAPCyAAIAEoAgAQ8YCAgAALNgEBfwJAIAEoAgAQ9ICAgAAiAkUNACAAQQE7AQAgAEEEaiACNgIADwsgACABKAIAEPKAgIAACzMBAX8CQCABKAIAEPSAgIAAIgJFDQAgAEEBNgIAIAAgAjYCBA8LIAAgASgCABCdgoCAAAuLBAECfyOAgICAAEEgayICJICAgIAAIAJBCGogASgCABDggICAAAJAAkAgAi0ACEEBRw0AIAAgAigCDDYCBCAAQQE2AgAMAQsCQCACLQAJQQFHDQACQAJAAkACQAJAAkAgAi0ACiIDQSxGDQAgA0HdAEcNASAAQgA3AgAMBwsgAS0ABA0BIAEoAgAiAyADKAIIQQFqNgIIIAJBEGogASgCABDggICAACACLQAQQQFHDQIgACACKAIUNgIEIABBATYCAAwGCyABLQAEDQAgASgCACEBIAJBBzYCECABIAJBEGoQ2YCAgAAhASAAQQE2AgAgACABNgIEDAULIAFBADoABAwBCyACLQARRQ0BIAItABIhAwsCQCADQf8BcUHdAEcNACABKAIAIQEgAkESNgIQIAEgAkEQahDZgICAACEBIABBATYCACAAIAE2AgQMAwsgAkEQaiABKAIAEJ2CgIAAAkAgAigCEEEBRw0AIAAgAigCFDYCBCAAQQE2AgAMAwsgACACKQIUNwIEIABBADYCACAAQQxqIAJBEGpBDGooAgA2AgAMAgsgASgCACEBIAJBBTYCECABIAJBEGoQ2YCAgAAhASAAQQE2AgAgACABNgIEDAELIAEoAgAhASACQQI2AhAgASACQRBqENmAgIAAIQEgAEEBNgIAIAAgATYCBAsgAkEgaiSAgICAAAuSBAECfyOAgICAAEEgayICJICAgIAAIAJBCGogASgCABDggICAAAJAAkAgAi0ACEEBRw0AIABBATsBACAAQQRqIAIoAgw2AgAMAQsCQCACLQAJQQFHDQACQAJAAkACQAJAAkAgAi0ACiIDQSxGDQAgA0HdAEcNASAAQQA2AgAMBwsgAS0ABA0BIAEoAgAiAyADKAIIQQFqNgIIIAJBEGogASgCABDggICAACACLQAQQQFHDQIgAEEBOwEAIABBBGogAigCFDYCAAwGCyABLQAEDQAgASgCACEBIAJBBzYCECABIAJBEGoQ2YCAgAAhASAAQQE7AQAgAEEEaiABNgIADAULIAFBADoABAwBCyACLQARRQ0BIAItABIhAwsCQCADQf8BcUHdAEcNACABKAIAIQEgAkESNgIQIAEgAkEQahDZgICAACEBIABBATsBACAAQQRqIAE2AgAMAwsgAkEQaiABKAIAEPKAgIAAAkAgAi8BEEEBRw0AIABBATsBACAAQQRqIAIoAhQ2AgAMAwsgAEGAgAQ2AgAgAEEEaiACLwESOwEADAILIAEoAgAhASACQQU2AhAgASACQRBqENmAgIAAIQEgAEEBOwEAIABBBGogATYCAAwBCyABKAIAIQEgAkECNgIQIAEgAkEQahDZgICAACEBIABBATsBACAAQQRqIAE2AgALIAJBIGokgICAgAALjwQBAn8jgICAgABBIGsiAiSAgICAACACQQhqIAEoAgAQ4ICAgAACQAJAIAItAAhBAUcNACAAIAIoAgw2AgQgAEEBNgIADAELAkAgAi0ACUEBRw0AAkACQAJAAkACQAJAIAItAAoiA0EsRg0AIANB3QBHDQEgAEEANgIAIABBCGpCADcDAAwHCyABLQAEDQEgASgCACIDIAMoAghBAWo2AgggAkEQaiABKAIAEOCAgIAAIAItABBBAUcNAiAAIAIoAhQ2AgQgAEEBNgIADAYLIAEtAAQNACABKAIAIQEgAkEHNgIQIAEgAkEQahDZgICAACEBIABBATYCACAAIAE2AgQMBQsgAUEAOgAEDAELIAItABFFDQEgAi0AEiEDCwJAIANB/wFxQd0ARw0AIAEoAgAhASACQRI2AhAgASACQRBqENmAgIAAIQEgAEEBNgIAIAAgATYCBAwDCyACQRBqIAEoAgAQ84CAgAACQCACKAIQQQFHDQAgACACKAIUNgIEIABBATYCAAwDCyAAQQA2AgAgAEEQaiACKQMYNwMAIABBCGpCATcDAAwCCyABKAIAIQEgAkEFNgIQIAEgAkEQahDZgICAACEBIABBATYCACAAIAE2AgQMAQsgASgCACEBIAJBAjYCECABIAJBEGoQ2YCAgAAhASAAQQE2AgAgACABNgIECyACQSBqJICAgIAAC5EEAQJ/I4CAgIAAQSBrIgIkgICAgAAgAkEIaiABKAIAEOCAgIAAAkACQCACLQAIQQFHDQAgAEEBOgAAIABBBGogAigCDDYCAAwBCwJAIAItAAlBAUcNAAJAAkACQAJAAkACQCACLQAKIgNBLEYNACADQd0ARw0BIABBADsBAAwHCyABLQAEDQEgASgCACIDIAMoAghBAWo2AgggAkEQaiABKAIAEOCAgIAAIAItABBBAUcNAiAAQQE6AAAgAEEEaiACKAIUNgIADAYLIAEtAAQNACABKAIAIQEgAkEHNgIQIAEgAkEQahDZgICAACEBIABBAToAACAAQQRqIAE2AgAMBQsgAUEAOgAEDAELIAItABFFDQEgAi0AEiEDCwJAIANB/wFxQd0ARw0AIAEoAgAhASACQRI2AhAgASACQRBqENmAgIAAIQEgAEEBOgAAIABBBGogATYCAAwDCyACQRBqIAEoAgAQ8YCAgAACQCACLQAQQQFHDQAgAEEBOgAAIABBBGogAigCFDYCAAwDCyAAQYACOwEAIABBAmogAi0AEToAAAwCCyABKAIAIQEgAkEFNgIQIAEgAkEQahDZgICAACEBIABBAToAACAAQQRqIAE2AgAMAQsgASgCACEBIAJBAjYCECABIAJBEGoQ2YCAgAAhASAAQQE6AAAgAEEEaiABNgIACyACQSBqJICAgIAAC/wBAQR/I4CAgIAAQTBrIgIkgICAgAAgAkEIaiABEICCgIAAIAJBCGpBCGohAwJAAkAgAigCDEEBRg0AIAJBCGpBEGogAUEQaikDADcDACADIAFBCGopAwA3AwAgAiABKQMANwMIIAAgAkEIahD+gYCAAAwBCyAAIAMoAgAQ3IWAgAAgABDshYCAACEEIAAoAgghBSACQQhqQRBqIAFBEGopAwA3AwAgAyABQQhqKQMANwMAIAIgASkDADcDCCACQSBqQQhqIAU2AgAgAiAAQQhqNgIkIAIgBCAFQQN0ajYCICACQQhqIAJBIGoQx4KAgAALIAJBMGokgICAgAALfQEBfyOAgICAAEEwayICJICAgIAAIAJBCGpBEGogAEEQaikDADcDACACQQhqQQhqIABBCGopAwA3AwAgAiAAKQMANwMIIAJBIGpBCGogAUEIaigCADYCACACIAEpAgA3AyAgAkEIaiACQSBqEKSDgIAAIAJBMGokgICAgAALRgEBfyOAgICAAEEQayIDJICAgIAAIANBCGogAkEIaigCADYCACADIAIpAgA3AwAgACABIAMQo4OAgAAgA0EQaiSAgICAAAtLAQF/I4CAgIAAQRBrIgIkgICAgAAgAkEIaiAAEJqGgIAAIAIoAgggAigCDCABKAIAIAEoAgQQ6YGAgAAhASACQRBqJICAgIAAIAELFQACQCAAKAIARQ0AIAAQrIKAgAALC6kCAQF/I4CAgIAAQdAAayIGJICAgIAAIAZBIGogASACIAMQzIKAgAAgBkEYaiAGQSBqEJqGgIAAIAZBMGogBigCGCAGKAIcEOyEgIAAAkACQCAGKAIwDQAgBiABEM2CgIAANwNAIAZBCGogBkEgahCahoCAACAGKAIIIAYoAgwgBkHAAGpBCBDrhICAABogASACIAMQzoKAgAAgAUEYaiAEIAUQz4KAgAAgAEEANgIADAELIAZBwABqQQhqIAZBMGpBCGooAgA2AgAgBiAGKQMwNwNAIAZBEGogBkHAAGoQmoaAgAAgACABQRhqIAYoAhAgBigCFBDQgoCAACAEIAUQ0YKAgAAgBkHAAGoQt4CAgAALIAZBIGoQt4CAgAAgBkHQAGokgICAgAALRgEBfyOAgICAAEEQayIEJICAgIAAIARBCGogAUEwahCahoCAACAAIAQoAgggBCgCDCACIAMQ4ISAgAAgBEEQaiSAgICAAAspAQF+AkAgACkDACIBIAApAxhSDQAgAQ8LQYiQwIAAQeYAEOKEgIAAAAtvAQF/I4CAgIAAQSBrIgMkgICAgAAgA0EQaiAAIAApAwAQjYOAgAAgACAAKQMAQgF8NwMAIANBCGogA0EQahCahoCAACADKAIIIAMoAgwgASACEOuEgIAAGiADQRBqELeAgIAAIANBIGokgICAgAALbwEBfyOAgICAAEEgayIDJICAgIAAIANBEGogACAAKQMAEImDgIAAIAAgACkDAEIBfDcDACADQQhqIANBEGoQmoaAgAAgAygCCCADKAIMIAEgAhDrhICAABogA0EQahC3gICAACADQSBqJICAgIAAC0MCAX8BfiOAgICAAEEQayICJICAgIAAIAJCADcDCCACQQhqQQggACABEIWEgIAAIAIpAwghAyACQRBqJICAgIAAIAML1AEBAX8jgICAgABBMGsiBSSAgICAAAJAAkACQCABKQMAIAJYDQAgBUEQaiABIAIQiYOAgAAgBUEIaiAFQRBqEJqGgIAAIAUoAgggBSgCDCADIAQQ64SAgABFDQEgBUEgahDuhICAACAFKAIgRQ0CIAAgBSkDIDcCACAAQQhqIAVBIGpBCGooAgA2AgAgBUEQahC3gICAACAFQTBqJICAgIAADwtB9JHAgABBExDihICAAAALQYiQwIAAQeYAEOKEgIAAAAtBiJDAgABB5gAQ4oSAgAAAC6kCAQF/I4CAgIAAQdAAayIGJICAgIAAIAZBIGogASACIAMQ04KAgAAgBkEYaiAGQSBqEJqGgIAAIAZBMGogBigCGCAGKAIcEOyEgIAAAkACQCAGKAIwDQAgBiABENSCgIAANwNAIAZBCGogBkEgahCahoCAACAGKAIIIAYoAgwgBkHAAGpBCBDrhICAABogASACIAMQ1YKAgAAgAUEYaiAEIAUQ1oKAgAAgAEEANgIADAELIAZBwABqQQhqIAZBMGpBCGooAgA2AgAgBiAGKQMwNwNAIAZBEGogBkHAAGoQmoaAgAAgACABQRhqIAYoAhAgBigCFBDXgoCAACAEIAUQ2IKAgAAgBkHAAGoQt4CAgAALIAZBIGoQt4CAgAAgBkHQAGokgICAgAALRgEBfyOAgICAAEEQayIEJICAgIAAIARBCGogAUEwahCahoCAACAAIAQoAgggBCgCDCACIAMQ4ISAgAAgBEEQaiSAgICAAAspAQF+AkAgACkDACIBIAApAxhSDQAgAQ8LQYiQwIAAQeYAEOKEgIAAAAtvAQF/I4CAgIAAQSBrIgMkgICAgAAgA0EQaiAAIAApAwAQiIOAgAAgACAAKQMAQgF8NwMAIANBCGogA0EQahCahoCAACADKAIIIAMoAgwgASACEOuEgIAAGiADQRBqELeAgIAAIANBIGokgICAgAALbwEBfyOAgICAAEEgayIDJICAgIAAIANBEGogACAAKQMAEIqDgIAAIAAgACkDAEIBfDcDACADQQhqIANBEGoQmoaAgAAgAygCCCADKAIMIAEgAhDrhICAABogA0EQahC3gICAACADQSBqJICAgIAAC0MCAX8BfiOAgICAAEEQayICJICAgIAAIAJCADcDCCACQQhqQQggACABEIWEgIAAIAIpAwghAyACQRBqJICAgIAAIAML1AEBAX8jgICAgABBMGsiBSSAgICAAAJAAkACQCABKQMAIAJYDQAgBUEQaiABIAIQioOAgAAgBUEIaiAFQRBqEJqGgIAAIAUoAgggBSgCDCADIAQQ64SAgABFDQEgBUEgahDuhICAACAFKAIgRQ0CIAAgBSkDIDcCACAAQQhqIAVBIGpBCGooAgA2AgAgBUEQahC3gICAACAFQTBqJICAgIAADwtB9JHAgABBExDihICAAAALQYiQwIAAQeYAEOKEgIAAAAtBiJDAgABB5gAQ4oSAgAAAC6kCAQF/I4CAgIAAQdAAayIGJICAgIAAIAZBIGogASACIAMQ2oKAgAAgBkEYaiAGQSBqEJqGgIAAIAZBMGogBigCGCAGKAIcEOyEgIAAAkACQCAGKAIwDQAgBiABENuCgIAANwNAIAZBCGogBkEgahCahoCAACAGKAIIIAYoAgwgBkHAAGpBCBDrhICAABogASACIAMQzoKAgAAgAUEYaiAEIAUQ1YKAgAAgAEEANgIADAELIAZBwABqQQhqIAZBMGpBCGooAgA2AgAgBiAGKQMwNwNAIAZBEGogBkHAAGoQmoaAgAAgACABQRhqIAYoAhAgBigCFBDcgoCAACAEIAUQ3YKAgAAgBkHAAGoQt4CAgAALIAZBIGoQt4CAgAAgBkHQAGokgICAgAALRgEBfyOAgICAAEEQayIEJICAgIAAIARBCGogAUEwahCahoCAACAAIAQoAgggBCgCDCACIAMQ4ISAgAAgBEEQaiSAgICAAAspAQF+AkAgACkDACIBIAApAxhSDQAgAQ8LQYiQwIAAQeYAEOKEgIAAAAtDAgF/AX4jgICAgABBEGsiAiSAgICAACACQgA3AwggAkEIakEIIAAgARCFhICAACACKQMIIQMgAkEQaiSAgICAACADC9QBAQF/I4CAgIAAQTBrIgUkgICAgAACQAJAAkAgASkDACACWA0AIAVBEGogASACEIiDgIAAIAVBCGogBUEQahCahoCAACAFKAIIIAUoAgwgAyAEEOuEgIAARQ0BIAVBIGoQ7oSAgAAgBSgCIEUNAiAAIAUpAyA3AgAgAEEIaiAFQSBqQQhqKAIANgIAIAVBEGoQt4CAgAAgBUEwaiSAgICAAA8LQfSRwIAAQRMQ4oSAgAAAC0GIkMCAAEHmABDihICAAAALQYiQwIAAQeYAEOKEgIAAAAvUBAIBfwF+I4CAgIAAQZABayIEJICAgIAAIAQgAzYCPCAEIAI2AjggBEHAAGogASACIAMQzIKAgAAgBEEwaiAEQcAAahCahoCAACAEQdAAaiAEKAIwIAQoAjQQ7ISAgAACQAJAIAQoAlANACAAQQA2AgAMAQsgBEHgAGpBCGogBEHQAGpBCGooAgA2AgAgBCAEKQNQNwNgAkACQAJAIAEQzYKAgABCAVENACAEQYABaiABIAEQzYKAgABCf3wQ34KAgAAgBCgCgAFFDQEgBEHwAGpBCGogBEGAAWpBCGooAgA2AgAgBCAEKQOAATcDcCAEQShqIARBwABqEJqGgIAAIAQoAiggBCgCLBDthICAABoCQCAEQfAAaiAEQThqEMmCgIAARQ0AIARBIGogBEHwAGoQmoaAgAAgBEGAAWogASAEKAIgIAQoAiQQzIKAgAAgBEEYaiAEQYABahCahoCAACAEKAIcIQIgBCgCGCEDIARBEGogBEHgAGoQmoaAgAAgAyACIAQoAhAgBCgCFBDrhICAABogBEGAAWoQt4CAgAALIARB8ABqELeAgIAADAILIARBCGogBEHAAGoQmoaAgAAgBCgCCCAEKAIMEO2EgIAAGgwBC0GIkMCAAEHmABDihICAAAALIAQgBEHgAGoQmoaAgAAgBEGAAWogASAEKAIAIAQoAgQQ0IKAgAAiBRDggoCAACAEQYABahC3gICAACAAIAFBGGogBRDhgoCAACAEQeAAahC3gICAAAsgBEHAAGoQt4CAgAAgBEGQAWokgICAgAALrwEBAX8jgICAgABBMGsiAySAgICAAAJAAkACQCABKQMAIAJYDQAgA0EQaiABIAIQjYOAgAAgA0EIaiADQRBqEJqGgIAAIANBIGogAygCCCADKAIMEOyEgIAAIAMoAiANAUGIkMCAAEHmABDihICAAAALIABBADYCAAwBCyAAIAMpAyA3AgAgAEEIaiADQSBqQQhqKAIANgIAIANBEGoQt4CAgAALIANBMGokgICAgAALgwMDAX8BfgF/I4CAgIAAQcAAayIDJICAgIAAAkACQAJAIAEpAwAiBCACWA0AAkACQAJAIAJCAXwgBFENACADQRBqIAEgAhCNg4CAACADQTBqIAEQjoOAgAAgA0EgaiADQTBqQYeSwIAAQSlBmJPAgAAQ8YGAgAAgA0EIaiADQRBqEJqGgIAAIAMoAgwhASADKAIIIQUgAyADQSBqEJqGgIAAIAUgASADKAIAIAMoAgQQ64SAgAANAUGIkMCAAEHmABDihICAAAALIANBMGogARCOg4CAACADKAIwRQ0DIAAgAykDMDcCACAAQQhqIANBMGpBCGooAgA2AgAMAQsgA0EwahDuhICAACADKAIwRQ0DIAAgAykDMDcCACAAQQhqIANBMGpBCGooAgA2AgAgA0EgahC3gICAACADQRBqELeAgIAACyADQcAAaiSAgICAAA8LQfSRwIAAQRMQ4oSAgAAAC0GIkMCAAEHmABDihICAAAALQYiQwIAAQeYAEOKEgIAAAAuDAwMBfwF+AX8jgICAgABBwABrIgMkgICAgAACQAJAAkAgASkDACIEIAJYDQACQAJAAkAgAkIBfCAEUQ0AIANBEGogASACEImDgIAAIANBMGogARCMg4CAACADQSBqIANBMGpBh5LAgABBKUGYk8CAABDxgYCAACADQQhqIANBEGoQmoaAgAAgAygCDCEBIAMoAgghBSADIANBIGoQmoaAgAAgBSABIAMoAgAgAygCBBDrhICAAA0BQYiQwIAAQeYAEOKEgIAAAAsgA0EwaiABEIyDgIAAIAMoAjBFDQMgACADKQMwNwIAIABBCGogA0EwakEIaigCADYCAAwBCyADQTBqEO6EgIAAIAMoAjBFDQMgACADKQMwNwIAIABBCGogA0EwakEIaigCADYCACADQSBqELeAgIAAIANBEGoQt4CAgAALIANBwABqJICAgIAADwtB9JHAgABBExDihICAAAALQYiQwIAAQeYAEOKEgIAAAAtBiJDAgABB5gAQ4oSAgAAAC9QEAgF/AX4jgICAgABBkAFrIgQkgICAgAAgBCADNgI8IAQgAjYCOCAEQcAAaiABIAIgAxDagoCAACAEQTBqIARBwABqEJqGgIAAIARB0ABqIAQoAjAgBCgCNBDshICAAAJAAkAgBCgCUA0AIABBADYCAAwBCyAEQeAAakEIaiAEQdAAakEIaigCADYCACAEIAQpA1A3A2ACQAJAAkAgARDbgoCAAEIBUQ0AIARBgAFqIAEgARDbgoCAAEJ/fBDfgoCAACAEKAKAAUUNASAEQfAAakEIaiAEQYABakEIaigCADYCACAEIAQpA4ABNwNwIARBKGogBEHAAGoQmoaAgAAgBCgCKCAEKAIsEO2EgIAAGgJAIARB8ABqIARBOGoQyYKAgABFDQAgBEEgaiAEQfAAahCahoCAACAEQYABaiABIAQoAiAgBCgCJBDagoCAACAEQRhqIARBgAFqEJqGgIAAIAQoAhwhAiAEKAIYIQMgBEEQaiAEQeAAahCahoCAACADIAIgBCgCECAEKAIUEOuEgIAAGiAEQYABahC3gICAAAsgBEHwAGoQt4CAgAAMAgsgBEEIaiAEQcAAahCahoCAACAEKAIIIAQoAgwQ7YSAgAAaDAELQYiQwIAAQeYAEOKEgIAAAAsgBCAEQeAAahCahoCAACAEQYABaiABIAQoAgAgBCgCBBDcgoCAACIFEOCCgIAAIARBgAFqELeAgIAAIAAgAUEYaiAFEOOCgIAAIARB4ABqELeAgIAACyAEQcAAahC3gICAACAEQZABaiSAgICAAAuDAwMBfwF+AX8jgICAgABBwABrIgMkgICAgAACQAJAAkAgASkDACIEIAJYDQACQAJAAkAgAkIBfCAEUQ0AIANBEGogASACEIiDgIAAIANBMGogARCLg4CAACADQSBqIANBMGpBh5LAgABBKUGYk8CAABDxgYCAACADQQhqIANBEGoQmoaAgAAgAygCDCEBIAMoAgghBSADIANBIGoQmoaAgAAgBSABIAMoAgAgAygCBBDrhICAAA0BQYiQwIAAQeYAEOKEgIAAAAsgA0EwaiABEIuDgIAAIAMoAjBFDQMgACADKQMwNwIAIABBCGogA0EwakEIaigCADYCAAwBCyADQTBqEO6EgIAAIAMoAjBFDQMgACADKQMwNwIAIABBCGogA0EwakEIaigCADYCACADQSBqELeAgIAAIANBEGoQt4CAgAALIANBwABqJICAgIAADwtB9JHAgABBExDihICAAAALQYiQwIAAQeYAEOKEgIAAAAtBiJDAgABB5gAQ4oSAgAAAC9QBAgF/An4jgICAgABBwABrIgQkgICAgAAgBEEQaiABIAIgAxDagoCAACAEQQhqIARBEGoQmoaAgAAgBEEgaiAEKAIIIAQoAgwQ7ISAgAACQAJAIAQoAiANAEIAIQUMAQsgBEEwakEIaiAEQSBqQQhqKAIANgIAIAQgBCkDIDcDMCAEIARBMGoQmoaAgAAgBCgCACAEKAIEENyCgIAAIQYgBEEwahC3gICAAEIBIQULIARBEGoQt4CAgAAgACAGNwMIIAAgBTcDACAEQcAAaiSAgICAAAvUAQIBfwJ+I4CAgIAAQcAAayIEJICAgIAAIARBEGogASACIAMQzIKAgAAgBEEIaiAEQRBqEJqGgIAAIARBIGogBCgCCCAEKAIMEOyEgIAAAkACQCAEKAIgDQBCACEFDAELIARBMGpBCGogBEEgakEIaigCADYCACAEIAQpAyA3AzAgBCAEQTBqEJqGgIAAIAQoAgAgBCgCBBDQgoCAACEGIARBMGoQt4CAgABCASEFCyAEQRBqELeAgIAAIAAgBjcDCCAAIAU3AwAgBEHAAGokgICAgAAL1AECAX8CfiOAgICAAEHAAGsiBCSAgICAACAEQRBqIAEgAiADENOCgIAAIARBCGogBEEQahCahoCAACAEQSBqIAQoAgggBCgCDBDshICAAAJAAkAgBCgCIA0AQgAhBQwBCyAEQTBqQQhqIARBIGpBCGooAgA2AgAgBCAEKQMgNwMwIAQgBEEwahCahoCAACAEKAIAIAQoAgQQ14KAgAAhBiAEQTBqELeAgIAAQgEhBQsgBEEQahC3gICAACAAIAY3AwggACAFNwMAIARBwABqJICAgIAAC2ABAX8jgICAgABBEGsiAiSAgICAACACIAEQk4KAgAACQCACKAIAQQFHDQBB7pDAgABBHxDihICAAAALIAAgAikCBDcCACAAQQhqIAJBDGooAgA2AgAgAkEQaiSAgICAAAtgAQF/I4CAgIAAQRBrIgIkgICAgAAgAiABEJmCgIAAAkAgAigCAEEBRw0AQe6QwIAAQR8Q4oSAgAAACyAAIAIpAgQ3AgAgAEEIaiACQQxqKAIANgIAIAJBEGokgICAgAALYAEBfyOAgICAAEEQayICJICAgIAAIAIgARCTgoCAAAJAIAIoAgBBAUcNAEHukMCAAEEfEOKEgIAAAAsgACACKQIENwIAIABBCGogAkEMaigCADYCACACQRBqJICAgIAAC2ABAX8jgICAgABBEGsiAiSAgICAACACIAEQmIKAgAACQCACKAIAQQFHDQBBjZHAgABBIRDihICAAAALIAAgAikCBDcCACAAQQhqIAJBDGooAgA2AgAgAkEQaiSAgICAAAtgAQF/I4CAgIAAQRBrIgIkgICAgAAgAiABEJmCgIAAAkAgAigCAEEBRw0AQY2RwIAAQSEQ4oSAgAAACyAAIAIpAgQ3AgAgAEEIaiACQQxqKAIANgIAIAJBEGokgICAgAALYAEBfyOAgICAAEEQayICJICAgIAAIAIgARCWgoCAAAJAIAIoAgBBAUcNAEGNkcCAAEEhEOKEgIAAAAsgACACKQIENwIAIABBCGogAkEMaigCADYCACACQRBqJICAgIAAC1gBAX8jgICAgABBMGsiAySAgICAACADIAEgAhCPgoCAAAJAIAMoAgBBAUcNAEGukcCAAEEjEOKEgIAAAAsgACADQQhqQSgQ7IeAgAAaIANBMGokgICAgAALYgEBfyOAgICAAEEQayIDJICAgIAAIAMgASACEJGCgIAAAkAgAygCAEEBRw0AQa6RwIAAQSMQ4oSAgAAACyAAIAMpAgQ3AgAgAEEIaiADQQxqKAIANgIAIANBEGokgICAgAALWAEBfyOAgICAAEEwayIDJICAgIAAIAMgASACEI2CgIAAAkAgAygCAEEBRw0AQa6RwIAAQSMQ4oSAgAAACyAAIANBCGpBKBDsh4CAABogA0EwaiSAgICAAAvBAQEBfyOAgICAAEHAAGsiAySAgICAACADQSBqIAIQ6YKAgAAgA0EIaiADQSBqEJqGgIAAIANBEGogASADKAIIIAMoAgwQ8YKAgAACQAJAIAMoAhANACAAQQA2AgAMAQsgA0EwakEIaiADQRBqQQhqKAIANgIAIAMgAykDEDcDMCADIANBMGoQmoaAgAAgACADKAIAIAMoAgQQ7oKAgAAgA0EwahC3gICAAAsgA0EgahC3gICAACADQcAAaiSAgICAAAuTAQEBfyOAgICAAEEgayIEJICAgIAAIAQgASACIAMQ5IKAgAACQAJAAkAgBCkDAKcNACAAQQA2AgAMAQsgBEEQaiABQRhqIAQpAwgQgYOAgAAgBCgCEEUNASAAIAQpAxA3AgAgAEEIaiAEQRBqQQhqKAIANgIACyAEQSBqJICAgIAADwtBiJDAgABB5gAQ4oSAgAAAC8EBAQF/I4CAgIAAQcAAayIDJICAgIAAIANBIGogAhDogoCAACADQQhqIANBIGoQmoaAgAAgA0EQaiABIAMoAgggAygCDBDzgoCAAAJAAkAgAygCEA0AIABBADYCCAwBCyADQTBqQQhqIANBEGpBCGooAgA2AgAgAyADKQMQNwMwIAMgA0EwahCahoCAACAAIAMoAgAgAygCBBDvgoCAACADQTBqELeAgIAACyADQSBqELeAgIAAIANBwABqJICAgIAAC5MBAQF/I4CAgIAAQSBrIgQkgICAgAAgBCABIAIgAxDmgoCAAAJAAkACQCAEKQMApw0AIABBADYCAAwBCyAEQRBqIAFBGGogBCkDCBCAg4CAACAEKAIQRQ0BIAAgBCkDEDcCACAAQQhqIARBEGpBCGooAgA2AgALIARBIGokgICAgAAPC0GIkMCAAEHmABDihICAAAALwQEBAX8jgICAgABBwABrIgMkgICAgAAgA0EgaiACEOeCgIAAIANBCGogA0EgahCahoCAACADQRBqIAEgAygCCCADKAIMEPWCgIAAAkACQCADKAIQDQAgAEEANgIYDAELIANBMGpBCGogA0EQakEIaigCADYCACADIAMpAxA3AzAgAyADQTBqEJqGgIAAIAAgAygCACADKAIEEO2CgIAAIANBMGoQt4CAgAALIANBIGoQt4CAgAAgA0HAAGokgICAgAALkwEBAX8jgICAgABBIGsiBCSAgICAACAEIAEgAiADEOWCgIAAAkACQAJAIAQpAwCnDQAgAEEANgIADAELIARBEGogAUEYaiAEKQMIEP+CgIAAIAQoAhBFDQEgACAEKQMQNwIAIABBCGogBEEQakEIaigCADYCAAsgBEEgaiSAgICAAA8LQYiQwIAAQeYAEOKEgIAAAAuDAgEBfyOAgICAAEHQAGsiAiSAgICAACACQRhqIAEQmoaAgAAgAkEgaiACKAIYIAIoAhxB6QAQ34SAgAAgAkEQaiABEJqGgIAAIAJBMGogAigCECACKAIUQesAEN+EgIAAIAJBCGogARCahoCAACACQcAAaiACKAIIIAIoAgxB9gAQ34SAgAAgAEIANwMAIABCADcDGCAAQThqIAJBIGpBCGooAgA2AgAgACACKQMgNwIwIAAgAikDMDcCCCAAQRBqIAJBMGpBCGooAgA2AgAgAEEgaiACKQNANwIAIABBKGogAkHAAGpBCGooAgA2AgAgARC3gICAACACQdAAaiSAgICAAAuDAgEBfyOAgICAAEHQAGsiAiSAgICAACACQRhqIAEQmoaAgAAgAkEgaiACKAIYIAIoAhxB6QAQ34SAgAAgAkEQaiABEJqGgIAAIAJBMGogAigCECACKAIUQesAEN+EgIAAIAJBCGogARCahoCAACACQcAAaiACKAIIIAIoAgxB9gAQ34SAgAAgAEIANwMAIABCADcDGCAAQThqIAJBIGpBCGooAgA2AgAgACACKQMgNwIwIAAgAikDMDcCCCAAQRBqIAJBMGpBCGooAgA2AgAgAEEgaiACKQNANwIAIABBKGogAkHAAGpBCGooAgA2AgAgARC3gICAACACQdAAaiSAgICAAAuDAgEBfyOAgICAAEHQAGsiAiSAgICAACACQRhqIAEQmoaAgAAgAkEgaiACKAIYIAIoAhxB6QAQ34SAgAAgAkEQaiABEJqGgIAAIAJBMGogAigCECACKAIUQesAEN+EgIAAIAJBCGogARCahoCAACACQcAAaiACKAIIIAIoAgxB9gAQ34SAgAAgAEIANwMAIABCADcDGCAAQThqIAJBIGpBCGooAgA2AgAgACACKQMgNwIwIAAgAikDMDcCCCAAQRBqIAJBMGpBCGooAgA2AgAgAEEgaiACKQNANwIAIABBKGogAkHAAGpBCGooAgA2AgAgARC3gICAACACQdAAaiSAgICAAAuDAgEBfyOAgICAAEHQAGsiAiSAgICAACACQRhqIAEQmoaAgAAgAkEgaiACKAIYIAIoAhxB6QAQ34SAgAAgAkEQaiABEJqGgIAAIAJBMGogAigCECACKAIUQesAEN+EgIAAIAJBCGogARCahoCAACACQcAAaiACKAIIIAIoAgxB9gAQ34SAgAAgAEIANwMAIABCADcDGCAAQThqIAJBIGpBCGooAgA2AgAgACACKQMgNwIwIAAgAikDMDcCCCAAQRBqIAJBMGpBCGooAgA2AgAgAEEgaiACKQNANwIAIABBKGogAkHAAGpBCGooAgA2AgAgARC3gICAACACQdAAaiSAgICAAAuEAgECfyOAgICAAEHgAGsiBCSAgICAACAEQTBqIAIQ54KAgAAgBEEYaiAEQTBqEJqGgIAAIAQoAhwhAiAEKAIYIQUgBEHAAGogAxDsgoCAACAEQRBqIARBwABqEJqGgIAAIARBIGogASAFIAIgBCgCECAEKAIUEMuCgIAAAkACQCAEKAIgDQAgAEEANgIYDAELIARB0ABqQQhqIARBIGpBCGooAgA2AgAgBCAEKQMgNwNQIARBCGogBEHQAGoQmoaAgAAgACAEKAIIIAQoAgwQ7YKAgAAgBEHQAGoQt4CAgAALIARBwABqELeAgIAAIARBMGoQt4CAgAAgBEHgAGokgICAgAALhAIBAn8jgICAgABB4ABrIgQkgICAgAAgBEEwaiACEOiCgIAAIARBGGogBEEwahCahoCAACAEKAIcIQIgBCgCGCEFIARBwABqIAMQ6oKAgAAgBEEQaiAEQcAAahCahoCAACAEQSBqIAEgBSACIAQoAhAgBCgCFBDSgoCAAAJAAkAgBCgCIA0AIABBADYCCAwBCyAEQdAAakEIaiAEQSBqQQhqKAIANgIAIAQgBCkDIDcDUCAEQQhqIARB0ABqEJqGgIAAIAAgBCgCCCAEKAIMEO+CgIAAIARB0ABqELeAgIAACyAEQcAAahC3gICAACAEQTBqELeAgIAAIARB4ABqJICAgIAAC4QCAQJ/I4CAgIAAQeAAayIEJICAgIAAIARBMGogAhDpgoCAACAEQRhqIARBMGoQmoaAgAAgBCgCHCECIAQoAhghBSAEQcAAaiADEOuCgIAAIARBEGogBEHAAGoQmoaAgAAgBEEgaiABIAUgAiAEKAIQIAQoAhQQ2YKAgAACQAJAIAQoAiANACAAQQA2AgAMAQsgBEHQAGpBCGogBEEgakEIaigCADYCACAEIAQpAyA3A1AgBEEIaiAEQdAAahCahoCAACAAIAQoAgggBCgCDBDugoCAACAEQdAAahC3gICAAAsgBEHAAGoQt4CAgAAgBEEwahC3gICAACAEQeAAaiSAgICAAAvBAQEBfyOAgICAAEHAAGsiAySAgICAACADQSBqIAIQ6YKAgAAgA0EIaiADQSBqEJqGgIAAIANBEGogASADKAIIIAMoAgwQ4oKAgAACQAJAIAMoAhANACAAQQA2AgAMAQsgA0EwakEIaiADQRBqQQhqKAIANgIAIAMgAykDEDcDMCADIANBMGoQmoaAgAAgACADKAIAIAMoAgQQ7oKAgAAgA0EwahC3gICAAAsgA0EgahC3gICAACADQcAAaiSAgICAAAvBAQEBfyOAgICAAEHAAGsiAySAgICAACADQSBqIAIQ54KAgAAgA0EIaiADQSBqEJqGgIAAIANBEGogASADKAIIIAMoAgwQ3oKAgAACQAJAIAMoAhANACAAQQA2AhgMAQsgA0EwakEIaiADQRBqQQhqKAIANgIAIAMgAykDEDcDMCADIANBMGoQmoaAgAAgACADKAIAIAMoAgQQ7YKAgAAgA0EwahC3gICAAAsgA0EgahC3gICAACADQcAAaiSAgICAAAuvAQEBfyOAgICAAEEwayIDJICAgIAAAkACQAJAIAEpAwAgAlgNACADQRBqIAEgAhCJg4CAACADQQhqIANBEGoQmoaAgAAgA0EgaiADKAIIIAMoAgwQ7ISAgAAgAygCIA0BQYiQwIAAQeYAEOKEgIAAAAsgAEEANgIADAELIAAgAykDIDcCACAAQQhqIANBIGpBCGooAgA2AgAgA0EQahC3gICAAAsgA0EwaiSAgICAAAuvAQEBfyOAgICAAEEwayIDJICAgIAAAkACQAJAIAEpAwAgAlgNACADQRBqIAEgAhCKg4CAACADQQhqIANBEGoQmoaAgAAgA0EgaiADKAIIIAMoAgwQ7ISAgAAgAygCIA0BQYiQwIAAQeYAEOKEgIAAAAsgAEEANgIADAELIAAgAykDIDcCACAAQQhqIANBIGpBCGooAgA2AgAgA0EQahC3gICAAAsgA0EwaiSAgICAAAuvAQEBfyOAgICAAEEwayIDJICAgIAAAkACQAJAIAEpAwAgAlgNACADQRBqIAEgAhCIg4CAACADQQhqIANBEGoQmoaAgAAgA0EgaiADKAIIIAMoAgwQ7ISAgAAgAygCIA0BQYiQwIAAQeYAEOKEgIAAAAsgAEEANgIADAELIAAgAykDIDcCACAAQQhqIANBIGpBCGooAgA2AgAgA0EQahC3gICAAAsgA0EwaiSAgICAAAviAQEBfyOAgICAAEHAAGsiAySAgICAACADQRBqIAAgASACEIODgIAAIANBCGogA0EQahCahoCAACADQSBqIAMoAgggAygCDBDshICAAAJAAkAgAygCIA0AIAMgACkDADcDMCADIANBEGoQmoaAgAAgAygCACADKAIEIANBMGpBCBDrhICAABogACABIAIQzoKAgABBASEADAELIANBMGpBCGogA0EgakEIaigCADYCACADIAMpAyA3AzAgA0EwahC3gICAAEEAIQALIANBEGoQt4CAgAAgA0HAAGokgICAgAAgAAtGAQF/I4CAgIAAQRBrIgQkgICAgAAgBEEIaiABQRhqEJqGgIAAIAAgBCgCCCAEKAIMIAIgAxDghICAACAEQRBqJICAgIAAC2ABAX8jgICAgABBEGsiAiSAgICAACACIAEQk4KAgAACQCACKAIAQQFHDQBB0ZHAgABBIxDihICAAAALIAAgAikCBDcCACAAQQhqIAJBDGooAgA2AgAgAkEQaiSAgICAAAuwAQEBfyOAgICAAEEwayICJICAgIAAIAJBCGogARCahoCAACACQRBqIAIoAgggAigCDEHpABDfhICAACACIAEQmoaAgAAgAkEgaiACKAIAIAIoAgRB5QAQ34SAgAAgAEIANwMAIABBIGogAkEQakEIaigCADYCACAAIAIpAxA3AhggACACKQMgNwIIIABBEGogAkEgakEIaigCADYCACABELeAgIAAIAJBMGokgICAgAALXgEBfyOAgICAAEEgayICJICAgIAAIAJBEGogARCEg4CAACACQQhqIAJBEGoQmoaAgAAgACACKAIIIAIoAgwQgoOAgAAhACACQRBqELeAgIAAIAJBIGokgICAgAAgAAtFAQF/I4CAgIAAQSBrIgIkgICAgAAgAkIANwMIIAIgATYCGCACIAEpAwA3AxAgACACQQhqEOKBgIAAIAJBIGokgICAgAALVQECfyOAgICAAEEQayIDJICAgIAAIAMgAUEIahCahoCAACADKAIEIQEgAygCACEEIAMgAjcDCCAAIAQgASADQQhqQQgQ4ISAgAAgA0EQaiSAgICAAAtVAQJ/I4CAgIAAQRBrIgMkgICAgAAgAyABQQhqEJqGgIAAIAMoAgQhASADKAIAIQQgAyACNwMIIAAgBCABIANBCGpBCBDghICAACADQRBqJICAgIAAC1UBAn8jgICAgABBEGsiAySAgICAACADIAFBCGoQmoaAgAAgAygCBCEBIAMoAgAhBCADIAI3AwggACAEIAEgA0EIakEIEOCEgIAAIANBEGokgICAgAAL4AECAX8BfiOAgICAAEEwayICJICAgIAAAkACQAJAAkAgASkDACIDUA0AIAJBEGogASADQn98EIiDgIAAIAEgASkDAEJ/fDcDACACQQhqIAJBEGoQmoaAgAAgAigCCCACKAIMEO2EgIAARQ0BIAJBIGoQ7oSAgAAgAigCIEUNAiAAIAIpAyA3AgAgAEEIaiACQSBqQQhqKAIANgIAIAJBEGoQt4CAgAAMAwsgAEEANgIADAILQYiQwIAAQeYAEOKEgIAAAAtBiJDAgABB5gAQ4oSAgAAACyACQTBqJICAgIAAC+ABAgF/AX4jgICAgABBMGsiAiSAgICAAAJAAkACQAJAIAEpAwAiA1ANACACQRBqIAEgA0J/fBCJg4CAACABIAEpAwBCf3w3AwAgAkEIaiACQRBqEJqGgIAAIAIoAgggAigCDBDthICAAEUNASACQSBqEO6EgIAAIAIoAiBFDQIgACACKQMgNwIAIABBCGogAkEgakEIaigCADYCACACQRBqELeAgIAADAMLIABBADYCAAwCC0GIkMCAAEHmABDihICAAAALQYiQwIAAQeYAEOKEgIAAAAsgAkEwaiSAgICAAAtVAQJ/I4CAgIAAQRBrIgMkgICAgAAgAyABQQhqEJqGgIAAIAMoAgQhASADKAIAIQQgAyACNwMIIAAgBCABIANBCGpBCBDghICAACADQRBqJICAgIAAC+ABAgF/AX4jgICAgABBMGsiAiSAgICAAAJAAkACQAJAIAEpAwAiA1ANACACQRBqIAEgA0J/fBCNg4CAACABIAEpAwBCf3w3AwAgAkEIaiACQRBqEJqGgIAAIAIoAgggAigCDBDthICAAEUNASACQSBqEO6EgIAAIAIoAiBFDQIgACACKQMgNwIAIABBCGogAkEgakEIaigCADYCACACQRBqELeAgIAADAMLIABBADYCAAwCC0GIkMCAAEHmABDihICAAAALQYiQwIAAQeYAEOKEgIAAAAsgAkEwaiSAgICAAAtTAgF/AX4jgICAgABBEGsiAiSAgICAACACIAAgARCOgoCAAAJAIAIoAgBBAUcNAEGok8CAAEEaEOKEgIAAAAsgAikDCCEDIAJBEGokgICAgAAgAwsEAEEACwQAQQAL6QEBAX8jgICAgABB0AJrIgEkgICAgAAgAUEQakHCk8CAAEEFEOyEgIAAAkACQAJAIAEoAhANACAAQQA2AggMAQsgAUEgakEIaiABQRBqQQhqKAIANgIAIAEgASkDEDcDICABQQhqIAFBIGoQmoaAgAAgAUEwaiABKAIIIAEoAgwQi4KAgAAgASgCMEEBRg0BIAAgAUEwakEIakGQAhDsh4CAABogAUEgahC3gICAAAsgAUHQAmokgICAgAAPCyABIAEpAjQ3A8gCQceTwIAAQSYgAUHIAmpBvInAgABB0JTAgAAQqoeAgAAAC7IBAQF/I4CAgIAAQTBrIgEkgICAgAAgAUEgaiAAEJSCgIAAAkAgASgCIEEBRw0AIAEgASkCJDcDEEHglMCAAEEkIAFBEGpBvInAgABBhJXAgAAQqoeAgAAACyABQRhqIAFBLGooAgA2AgAgASABKQIkNwMQIAFBCGogAUEQahCahoCAAEHCk8CAAEEFIAEoAgggASgCDBDrhICAABogAUEQahC3gICAACABQTBqJICAgIAAC0QBAX8jgICAgABBEGsiAiSAgICAACACQQhqIAFBCGopAgA3AwAgAiABKQIANwMAIAAgAhCQhICAACACQRBqJICAgIAAC0QBAX8jgICAgABBEGsiAiSAgICA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AUHAAGpB6ZbAgABBDBCGgoCAACABIAFBwABqEPiCgIAAIAFBgAFqQfWWwIAAQQwQhoKAgAAgAUHAAGogAUGAAWoQ94KAgAAgAEHAAGogAUHAABDsh4CAABogAEGAAWogAUHAAGpBwAAQ7IeAgAAaIAFBkAFqJICAgIAAC3QBAX8jgICAgABBwABrIgMkgICAgAAgA0EIaiABQcAAaiACEPKCgIAAAkACQCADKAIQDQAgA0EwakGBl8CAAEEQEIaCgIAAIAAgA0EwahCFg4CAAAwBCyAAIANBCGpBKBDsh4CAABoLIANBwABqJICAgIAAC9kBAQF/I4CAgIAAQfAAayIDJICAgIAAIAMgAjcDCCADQRBqIAAgA0EIahDwgoCAAAJAIAMoAhANACADQSBqIAAgARCyg4CAACADQSBqIANBCGoQhoOAgAAaIANByABqIABBwABqIAEgA0EgahD7goCAACADQcgAahDJgYCAACADQcgAaiAAIANBCGogARD8goCAACADQcgAahDAgYCAACADQSBqEMqBgIAAIANBEGoQwIGAgAAgARC3gICAACADQfAAaiSAgICAAA8LQZGXwIAAQRgQ4oSAgAAAC2cBAX8jgICAgABBEGsiBySAgICAACAHIAYQi4eAgAAgACAEOgAlIAAgAzoAJCAAIAE3AwAgACAFNwMQIAAgAjcDCCAAIAcpAwA3AhggAEEgaiAHQQhqKAIANgIAIAdBEGokgICAgAALHwACQCAAQf8BcUEDSQ0AQamXwIAAQRQQ4oSAgAAACwviDwMGfwJ+B38jgICAgABBgAdrIgUkgICAgAAgBSADOgBnIAVBmARqEOmEgIAAIAVBgAVqQQhqIgZCADcDACAFQagFakLzytHLp4zZsvQANwMAIAVBgAVqQSBqQu3ekfOWzNy35AA3AwAgBUGABWpBGGoiB0Lh5JXz1uzZvOwANwMAIAVBuAVqQgA3AwAgBUHoAGpBCGoiCCAFQZgEakEIaigCADYCACAFQgA3A4AFIAVCADcDsAUgBUL1ys2D16zbt/MANwOQBSAFIAUpA5gENwNoIAVB2ABqIAVB6ABqEJqGgIAAIAUoAlggBSgCXCAFQYAFahDggYCAACAFQegAahC3gICAACAFQegAaiAFQYAFakHAABDsh4CAABogBUGgA2ogBUHoAGoQioSAgAAg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gICAAEGwAWsiAySAgICAACACELWDgIAAIANBGGogACABELKDgIAAIAMpAxghBAJAAkACQCACQf8BcSIFRQ0AIAMgBDcDSEIAIQQgA0IANwNAIABBwAFqIQAgAyADQRhqNgJQIANB+ABqIQYMAQsgA0EYahDKgYCAAAwBCwNAIANBCGogA0HAAGoQ/4GAgAACQCADKQMIpw0AIANBGGoQyoGAgAAMAgsgAyADKQMQNwNYIANBiAFqIAAgA0HYAGoQ9IKAgAACQCADKAKgAUUNACADQeAAaiADQYgBakEoEOyHgIAAGiADLQCEASECIAYQt4CAgAAgBCACIAVGrXwhBAwBCwtBgInAgABBK0GsnsCAABCRh4CAAAALIAEQt4CAgAAgA0GwAWokgICAgAAgBAtjAQF/I4CAgIAAQTBrIgMkgICAgAAgAyACNwMAIANBCGogAUHAAWogAxD0goCAAAJAIAMoAiANAEG8nsCAAEEWEOKEgIAAAAsgACADQQhqQSgQ7IeAgAAaIANBMGokgICAgAAL/gICAn8BfiOAgICAAEGQAWsiAiSAgICAACACIAE3AxggAkHIAGoQ5oSAgAACQCACQcgAaiAAQYACaiIDEKiCgIAADQAgAiACQcgAajYCiAEgAiADNgKMASACQSBqQRRqQQA2AgAgAkHIhMCAADYCMCACQgE3AiQgAkGEmMCAADYCICACQRBqIAJBiAFqQYeAgIAAEJyGgIAAIAIpAxAhASACQQhqIAJBjAFqQYeAgIAAEJyGgIAAIAIpAwghBCACIAJBIGpBiICAgAAQhISAgAAgAkHYAGpBFGpBAzYCACACIAQ3A3ggAiABNwNwIAJCAzcCXCACQcCXwIAANgJYIAIgAikDADcDgAEgAiACQfAAajYCaCACQdgAakGYmMCAABDihoCAAAALIAJByABqELeAgIAAIAJBIGogAEHAAWogAkEYahD+goCAACACQSBqEMOBgIAAIAJBIGogACACQRhqEP2CgIAAIAJBIGoQwIGAgAAgAkGQAWokgICAgAALEgAgACABQQEgAkIAELaDgIAAC60EAgN/AX4jgICAgABBwAFrIgYkgICAgAAgAxC1g4CAACAGQSBqIAEgAhCyg4CAACAGQQA2AlAgBkIINwNIIAYgBikDIDcDYCAGQgA3A1ggBiAGQSBqNgJoIAZB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IABBwARqJICAgIAADwtB3qHAgABBHRDihICAAAALIAAgACgCrAI2ArwEQYihwIAAQSYgAEG8BGpBrInAgABB+KDAgAAQqoeAgAAAC4MDAQJ/I4CAgIAAQdAEayIAJICAgIAAEOOEgIAAQQBBARCegYCAAEH4nsCAABDhhICAACAAQaACahDnhICAACAAQRBqIABBoAJqQcygwIAAQSpB+KDAgAAQ8YGAgAAgAEEIaiAAQRBqEJqGgIAAIABBoAJqIAAoAgggACgCDBC7gICAAAJAIAAtAKACQQFHDQAgACAAKAKkAjYCwARBiKHAgABBJiAAQcAEakGsicCAAEH4oMCAABCqh4CAAAALIAAtAKECIQEgAEEQahC3gICAACAAQaACahCSg4CAACAAQRBqIABBoAJqEO6BgIAAIABBoAJqIABBEGogARDBg4CAACAAQcAEaiAAQaACahD8gICAACAAQbAEaiAAQcAEakH4oMCAABD0gYCAACAAIABBsARqEJqGgIAAIAAoAgAgACgCBBDqhICAACAAQRBqEJODgIAAIABBsARqELeAgIAAIABBuAJqELeAgIAAIABBEGoQ1IGAgAAgAEHQBGokgICAgAAL5gQDA38BfgR/I4CAgIAAQeAEayIAJICAgIAAEOOEgIAAQQBBARCegYCAAEH4nsCAABDhhICAACAAQbACahDnhICAACAAQSBqIABBsAJqQcygwIAAQSpB+KDAgAAQ8YGAgAAgAEEIaiAAQSBqEJqGgIAAIABBsAJqIAAoAgggACgCDBDHgICAAAJAIAAoArACQQFGDQAgAEHQBGpBCGoiASAAQbwCaigCACICNgIAIAAgACkCtAIiAzcD0AQgAEHEAmotAAAhBCAAQcICai8BACEFIABBwAJqLwEAIQYgAEEQakEIaiIHIAI2AgAgACADNwMQIABBIGoQt4CAgAAgAEGwAmoQkoOAgAAgAEEgaiAAQbACahDugYCAACAAQbACakEIaiAHKAIANgIAIAAgACkDEDcDsAIgAEHABGogAEEgaiAAQbACaiAEIAYgBRDCg4CAACAAQdAEakGAARD9gICAACAAIABB0ARqNgKwAgJAAkAgAEGwAmogAEHABGoQooKAgAAiAkUNACAAIAI2ArQCIABB0ARqELeAgIAAQQEhAgwBCyAAQbACakEEciICIAApA9AENwIAIAJBCGogASgCADYCAEEAIQILIAAgAjYCsAIgAEHQBGogAEGwAmpB+KDAgAAQ9IGAgAAgACAAQdAEahCahoCAACAAKAIAIAAoAgQQ6oSAgAAgAEHQBGoQt4CAgAAgAEHABGoQuoGAgAAgAEEgahDUgYCAACAAQeAEaiSAgICAAA8LIAAgACgCtAI2AtAEQYihwIAAQSYgAEHQBGpBrInAgABB+KDAgAAQqoeAgAAAC4gDAgF/AX4jgICAgABB0ARrIgAkgICAgAAQ44SAgABBAEEBEJ6BgIAAQfiewIAAEOGEgIAAIABBoAJqEOeEgIAAIABBEGogAEGgAmpBzKDAgABBKkH4oMCAABDxgYCAACAAQQhqIABBEGoQmoaAgAAgAEGgAmogACgCCCAAKAIMELmAgIAAAkAgACgCoAJBAUcNACAAIAAoAqQCNgLABEGIocCAAEEmIABBwARqQayJwIAAQfigwIAAEKqHgIAAAAsgAEGoAmopAwAhASAAQRBqELeAgIAAIABBoAJqEJKDgIAAIABBEGogAEGgAmoQ7oGAgAAgAEGgAmogAEEQaiABEMODgIAAIABBwARqIABBoAJqEPyAgIAAIABBsARqIABBwARqQfigwIAAEPSBgIAAIAAgAEGwBGoQmoaAgAAgACgCACAAKAIEEOqEgIAAIABBEGoQk4OAgAAgAEGwBGoQt4CAgAAgAEG4AmoQt4CAgAAgAEEQahDUgYCAACAAQdAEaiSAgICAAAsMACABIAIQgICAgAALCgAgARCBgICAAAsKACABEIKAgIAACwoAIAEQg4CAgAALCgAgARCEgICAAAsKACABEIWAgIAACwoAIAEQhoCAgAALCAAQh4CAgAALCAAQiICAgAALCAAQiYCAgAALCAAQioCAgAALCgAgARCLgICAAAsKACABEIyAgIAACwoAIAEQjYCAgAALCAAQjoCAgAALCAAQj4CAgAALCgAgARCQgICAAAsOACABIAIgAxCRgICAAAsOACABIAIgAxCSgICAAAsOACABIAIgAxCTgICAAAsMACABIAIQlICAgAALCAAQlYCAgAALDAAgASACEJaAgIAACwwAIAEgAhCXgICAAAsMACABIAIQmICAgAALGAAgASACIAMgBCAFIAYgByAIEJmAgIAACxoAIAEgAiADIAQgBSAGIAcgCCAJEJqAgIAACwwAIAEgAhCbgICAAAsMACABIAIQnICAgAALDgAgASACIAMQnYCAgAALCgAgARCegICAAAsOACABIAIgAxCfgICAAAsWACABIAIgAyAEIAUgBiAHEKCAgIAACwwAIAEgAhChgICAAAsQACABIAIgAyAEEKKAgIAACxAAIAEgAiADIAQQo4CAgAALGgAgASACIAMgBCAFIAYgByAIIAkQpICAgAALDgAgASACIAMQpYCAgAALDgAgASACIAMQpoCAgAALCAAQp4CAgAALDAAgASACEKiAgIAACwoAIAEQqYCAgAALEgAgASACIAMgBCAFEKqAgIAACw4AIAEgAiADEKuAgIAACw4AIAEgAiADEKyAgIAACwwAIAEgAhCtgICAAAsOACABIAIgAxCugICAAAsKACABEK+AgIAAC/UBAQJ/I4CAgIAAQfAAayICJICAgIAAIAJBCGogARCahoCAAAJAAkAgAigCCCACKAIMEPGEgIAARQ0AEPCEgIAARQ0BQdSjwIAAQRNB6KPAgAAQioaAgAAAC0Glo8CAAEEeQcSjwIAAEIqGgIAAAAsgABCxg4CAACACQRBqQQhqIgMgAUEIaigCADYCACACIAEpAgA3AxAgAkHgAGpB+KPAgABBBxCGgoCAACACQSBqIAJB4ABqEPmCgIAAIABBiAJqIAMoAgA2AgAgACACKQMQNwOAAiAAQcABaiACQSBqQcAAEOyHgIAAGiACQfAAaiSAgICAAAtHAQF/I4CAgIAAQTBrIgMkgICAgAAgA0EIaiABIAIQsoOAgAAgACADQQhqEIeDgIAAIANBCGoQyoGAgAAgA0EwaiSAgICAAAuHAwMCfwF+AX8jgICAgABB4AJrIgAkgICAgAAQ44SAgABBAEEBEJ6BgIAAQfiewIAAEOGEgIAAIABBEGoQ6ISAgAACQAJAIAApAxAgAEEYaikDAIRCAFINACAAQcAAahDnhICAACAAQdACaiAAQcAAakHMoMCAAEEqQYCkwIAAEPGBgIAAIABBCGogAEHQAmoQmoaAgAAgAEHAAGogACgCCCAAKAIMEL+AgIAAIAAoAkBBAUYNASAAQTBqQQhqIABBzABqKAIAIgE2AgAgACAAKQJEIgI3AzAgAEEgakEIaiIDIAE2AgAgACACNwMgIABB0AJqELeAgIAAIABB0AJqQQhqIAMoAgA2AgAgACAAKQMgNwPQAiAAQcAAaiAAQdACahD6g4CAACAAQcAAahCTg4CAACAAQcAAahDUgYCAACAAQeACaiSAgICAAA8LQd6hwIAAQR0Q4oSAgAAACyAAIAAoAkQ2AjBBiKHAgABBJiAAQTBqQayJwIAAQYCkwIAAEKqHgIAAAAupBAIDfwF+I4CAgIAAQeAEayIAJICAgIAAEOOEgIAAQQBBARCegYCAAEH4nsCAABDhhICAACAAQbACahDnhICAACAAQSBqIABBsAJqQcygwIAAQSpBgKTAgAAQ8YGAgAAgAEEIaiAAQSBqEJqGgIAAIABBsAJqIAAoAgggACgCDBDBgICAAAJAIAAoArACQQFGDQAgAEHQBGpBCGoiASAAQbwCaigCACICNgIAIAAgACkCtAIiAzcD0AQgAEEQakEIaiACNgIAIAAgAzcDECAAQSBqELeAgIAAIABBsAJqEJKDgIAAIABBIGogAEGwAmoQ7oGAgAAgAEHABGogAEEgaiAAQRBqEPuDgIAAIABB0ARqQYABEP2AgIAAIAAgAEHQBGo2ArACAkACQCAAQbACaiAAQcAEahCegoCAACICRQ0AIAAgAjYCtAIgAEHQBGoQt4CAgABBASECDAELIABBsAJqQQRyIgIgACkD0AQ3AgAgAkEIaiABKAIANgIAQQAhAgsgACACNgKwAiAAQdAEaiAAQbACakGApMCAABD0gYCAACAAIABB0ARqEJqGgIAAIAAoAgAgACgCBBDqhICAACAAQdAEahC3gICAACAAQcAEahDIgYCAACAAQSBqENSBgIAAIABBEGoQt4CAgAAgAEHgBGokgICAgAAPCyAAIAAoArQCNgLQBEGIocCAAEEmIABB0ARqQayJwIAAQYCkwIAAEKqHgIAAAAsTAQF/IAAgARC4g4CAACECIAIPCw8AIAAgASACELmDgIAADwsXAQF/IAAgASACIAMQuoOAgAAhBCAEDwsTAQF/IAAgARC7g4CAACECIAIPC0MAIAAoAgAhAAJAIAEQyIeAgAANAAJAIAEQyYeAgAANACAAIAEQoIeAgAAPCyAAIAEQ4oeAgAAPCyAAIAEQ3IeAgAALEAAgACACNgIEIAAgATYCAAsQACAAIAI2AgQgACABNgIAC40CAQF/I4CAgIAAQeAAayIEJICAgIAAIAQgATYCCCAEIAM2AgwCQCABIANHDQAgACACIAEQ7IeAgAAaIARB4ABqJICAgIAADwsgBEEoakEUakGIgICAADYCACAEQTRqQYSAgIAANgIAIARBEGpBFGpBAzYCACAEIARBCGo2AkAgBCAEQQxqNgJEIARByABqQRRqQQA2AgAgBEIDNwIUIARBmKXAgAA2AhAgBEGEgICAADYCLCAEQeylwIAANgJYIARCATcCTCAEQeSlwIAANgJIIAQgBEEoajYCICAEIARByABqNgI4IAQgBEHEAGo2AjAgBCAEQcAAajYCKCAEQRBqQeylwIAAEJiHgIAAAAsnAAJAIAIgA08NACADIAIgBBCTh4CAAAALIAAgAzYCBCAAIAE2AgAL5QEBAX8jgICAgABBIGsiAySAgICAAAJAAkADQAJAIAJBB0sNACACQQRLDQIgAkUNAyADIAAQiISAgAA2AhggA0EQaiADQRhqQQQgAkHopsCAABCGhICAACABIAIgAygCECADKAIUEIWEgIAADAMLIAMgABCJhICAADcDGCABQQggA0EYakEIEIWEgIAAIAFBCGohASACQXhqIQIMAAsLIAMgABCJhICAADcDGCADQQhqIANBGGpBCCACQdimwIAAEIaEgIAAIAEgAiADKAIIIAMoAgwQhYSAgAALIANBIGokgICAgAALCwAgABCJhICAAKcLPwEBfiAAIAApAyAiAUJvfDcDICAAIAEgACkDCIU3AwggABCLhICAACAAKQMQIAApAwCFIAApAwiFIAApAxiFC/EBAwF/An4CfyOAgICAAEHQAGsiAiSAgICAACACIAFBMBDsh4CAACECIAEpAzAhAyABNQI4IQQgAkEwakEQaiIBIAJBIGopAwA3AwAgAkEwakEIaiIFIAJBGGopAwA3AwAgAkEwakEYaiIGIAMgBEI4hoQiAyACQShqKQMAhTcDACACIAIpAxA3AzAgAkEwahCLhICAACACIAIpAzAgA4U3AzAgAkEwahCLhICAACAAQhM3AyAgAEEYaiAGKQMANwMAIABBEGogASkDADcDACAAQQhqIAUpAwA3AwAgACACKQMwNwMAIAJB0ABqJICAgIAAC6ABAQV+IAAgACkDGCIBQhCJIAEgACkDCHwiAYUiAkIViSACIAApAxAiAyAAKQMAfCIEQiCJfCIChSIFQhCJIAUgASADQg2JIASFIgN8IgFCIIl8IgSFIgUgASADQhGJhSIBIAJ8IgJCIIl8IgM3AwAgACAFQhWJIAOFNwMYIAAgAUINiSAChSIBQhGJIAEgBHwiAYU3AxAgACABQiCJNwMICw4AIAAgASACEIeEgIAACzYAIAAgASgCDEEIdzYCDCAAIAEoAghBCHc2AgggACABKAIEQQh3NgIEIAAgASgCAEEIdzYCAAs2ACAAIAEoAgxBB3c2AgwgACABKAIIQQd3NgIIIAAgASgCBEEHdzYCBCAAIAEoAgBBB3c2AgALFgAgACABKQIINwIIIAAgASkCADcCAAs2ACAAIAEoAgxBEHc2AgwgACABKAIIQRB3NgIIIAAgASgCBEEQdzYCBCAAIAEoAgBBEHc2AgALNgAgACABKAIMQQx3NgIMIAAgASgCCEEMdzYCCCAAIAEoAgRBDHc2AgQgACABKAIAQQx3NgIACxYAIAAgASkCCDcCCCAAIAEpAgA3AgALewECfyOAgICAAEEgayICJICAgIAAIAJBEGpBCGoiAyABQQhqKQIANwMAIAIgASkCADcDECACIAJBEGoQqoSAgAAgAkEQaiACQQhqKQMAIAIpAwAQq4SAgAAgAEEIaiADKQMANwIAIAAgAikDEDcCACACQSBqJICAgIAAC0IAIAAgAigCDCABKAIMajYCDCAAIAIoAgggASgCCGo2AgggACACKAIEIAEoAgRqNgIEIAAgAigCACABKAIAajYCAAu+AQICfwJ+I4CAgIAAQTBrIgMkgICAgAAgA0EgakEIaiIEIAFBCGopAgA3AwAgAyABKQIANwMgIANBEGogA0EgahCqhICAACADQRBqQQhqKQMAIQUgAykDECEGIAQgAkEIaikCADcDACADIAIpAgA3AyAgAyADQSBqEKqEgIAAIANBIGogBiADKQMAhSAFIANBCGopAwCFEKuEgIAAIABBCGogBCkDADcCACAAIAMpAyA3AgAgA0EwaiSAgICAAAs7ACAAIAEoAiggAkEEdCICajYCDCAAIAEoAhggAmo2AgggACABKAIIIAJqNgIEIAAgASgCACACajYCAAsEAEEAC0cAIABBADYCECAAIAM2AgggACACNgIEIAAgATYCACAAQQxqIAQ2AgAgACAEIANrQQR2IgQgAiABa0EEdiIBIAEgBEsbNgIUCxIAIAAgASACIAMgBBCYhICAAAtqAQJ/IABBADYCICAAIAI2AhggACABKQIANwIAIABBHGogAzYCACAAIAEoAhQiBDYCFCAAIAEoAhAiBTYCECAAQQhqIAFBCGopAgA3AgAgACADIAJrQQR2IgEgBCAFayIDIAMgAUsbNgIkC4oBAQJ/IABBADYCMCAAIAI2AiggACABKQIANwIAIABBLGogAzYCACAAIAEoAiQiBDYCJCAAIAEoAiAiBTYCICAAQQhqIAFBCGopAgA3AgAgAEEQaiABQRBqKQIANwIAIABBGGogAUEYaikCADcCACAAIAMgAmtBBHYiASAEIAVrIgMgAyABSxs2AjQLYAECfyABKAIwIQQgASgCNCEFIAAgAUEwEOyHgIAAIgFBADYCQCABQTxqIAM2AgAgASACNgI4IAEgBTYCNCABIAQ2AjAgASADIAJrQQR2IgIgBSAEayIDIAMgAksbNgJECycAIABCADcAACAAQRhqQgA3AAAgAEEQakIANwAAIABBCGpCADcAAAsUACAAIAFBwABqNgIEIAAgATYCAAscACAAIAEpAgA3AgAgAEEIaiABQQhqKQIANwIAC7kBAQF/I4CAgIAAQYABayICJICAgIAAIAIgAUHAABDsh4CAACICQcAAakEYaiACQRhqKQMANwMAIAJBwABqQShqIAJBKGopAwA3AwAgAkHAAGpBOGogAkE4aikDADcDACACQcAAakEIaiABQQhqKQIANwMAIAIgAikDEDcDUCACIAIpAyA3A2AgAiACKQMwNwNwIAIgASkCADcDQCAAIAJBwABqQcAAEOyHgIAAGiACQYABaiSAgICAAAscACAAIAEpAgA3AgAgAEEIaiABQQhqKQIANwIACxAAIAAgAUHIABDsh4CAABoLDQAgACgCACABQQR0agsRACAAQcAANgIEIAAgATYCAAsPACAAKAIAIAEQpoSAgAALPAACQCABEMiHgIAADQACQCABEMmHgIAADQAgACABEKCHgIAADwsgACABEOKHgIAADwsgACABENyHgIAACxEAIABBwAA2AgQgACABNgIAC7YBAQF/I4CAgIAAQcAAayICJICAgIAAIAIgATYCDAJAIAFBBEYNACACQTRqQeSAgIAANgIAIAJBJGpBAjYCACACQgM3AhQgAkG4p8CAADYCECACQeSAgIAANgIsIAIgAkEMajYCOCACQfimwIAANgI8IAIgAkEoajYCICACIAJBPGo2AjAgAiACQThqNgIoIAJBEGpBrKjAgAAQ4oaAgAAACyAAKAAAIQEgAkHAAGokgICAgAAgAQsQACAAQQBBgAIQ7oeAgAAaCxYAIAAgASkDCDcDCCAAIAEpAwA3AwALEAAgACACNwMIIAAgATcDAAtKAQJ/I4CAgIAAQRBrIgIkgICAgAAgAkEIaiAAIAFBABDbhICAAAJAIAIoAggiAw0AIAAgARCIh4CAAAALIAJBEGokgICAgAAgAwupAQECfyOAgICAAEEQayIBJICAgIAAAkACQCAAKAIAEYGAgIAAACIARQ0AIAEgABCuhICAACABIAEoAgQ2AgwgASABKAIAIgI2AghBACEAIAJBACACKAIAG0H8rsCAABCvhICAACICKAIAQgAgAigCBCgCIBGCgICAAAAgAUEIakEEchCwhICAAAwBCxCwhYCAAEEBIQALIAAQsYSAgAAgAUEQaiSAgICAAAtgAQJ/I4CAgIAAQRBrIgIkgICAgAACQCABENaEgIAAIgMNAEHYq8CAAEEYIAJBCGpBgKzAgABB8KvAgAAQqoeAgAAACyAAIAM2AgQgACABQQRqNgIAIAJBEGokgICAgAALHAACQCAADQBBmK3AgABBHSABEKiHgIAAAAsgAAsYACAAKAIAIgAgACgCAEF/ahDghYCAABoLSQEBfyOAgICAAEEQayIBJICAgIAAAkAgAEUNAEG8qMCAAEHGACABQQhqQZCswIAAQcypwIAAEKqHgIAAAAsgAUEQaiSAgICAAAuxAQECfyOAgICAAEEQayICJICAgIAAAkACQCAAKAIAEYGAgIAAACIARQ0AIAIgABCuhICAACACIAIoAgQ2AgwgAiACKAIAIgM2AghBACEAIANBACADKAIAG0GssMCAABCvhICAACIDKAIAIAE1AgQgATUCACADKAIEKAJkEYOAgIAAACACQQhqQQRyELCEgIAADAELELCFgIAAQQEhAAsgABCxhICAACACQRBqJICAgIAAC7EBAQJ/I4CAgIAAQRBrIgIkgICAgAACQAJAIAAoAgARgYCAgAAAIgBFDQAgAiAAEK6EgIAAIAIgAigCBDYCDCACIAIoAgAiAzYCCEEAIQAgA0EAIAMoAgAbQeSvwIAAEK+EgIAAIgMoAgAgATUCBCABNQIAIAMoAgQoAlwRg4CAgAAAIAJBCGpBBHIQsISAgAAMAQsQsIWAgABBASEACyAAELGEgIAAIAJBEGokgICAgAALvgECAX8CfiOAgICAAEEQayICJICAgIAAAkACQCAAKAIAEYGAgIAAACIARQ0AIAIgABCuhICAACACIAIoAgQ2AgwgAiACKAIAIgA2AghCACEDIABBACAAKAIAG0H8sMCAABCvhICAACIAKAIAIAE1AgQgATUCAEIAIAAoAgQoArgBEYSAgIAAACEEIAJBCGpBBHIQsISAgAAMAQsQsIWAgABCASEDCyADIAQQtYSAgAAhAyACQRBqJICAgIAAIAMLTAEBfyOAgICAAEEQayICJICAgIAAAkAgAKdFDQBBvKjAgABBxgAgAkEIakGQrMCAAEHMqcCAABCqh4CAAAALIAJBEGokgICAgAAgAQuqAQECfyOAgICAAEEQayICJICAgIAAAkACQCAAKAIAEYGAgIAAACIARQ0AIAIgABCuhICAACACIAIoAgQ2AgwgAiACKAIAIgM2AghBACEAIANBACADKAIAG0Gsr8CAABCvhICAACIDKAIAIAGtIAMoAgQoAkARgoCAgAAAIAJBCGpBBHIQsISAgAAMAQsQsIWAgABBASEACyAAELGEgIAAIAJBEGokgICAgAALrwEBAX8jgICAgABBIGsiAySAgICAACADIAI2AhQgAyABNgIQAkACQCAAKAIAEYGAgIAAACIARQ0AIANBCGogABC4hICAACADIAMoAgw2AhwgAyADKAIIIgA2AhggABC5hICAACAAIAI2AgQgACABNgIAIANBGGpBBHIQuoSAgABBACEBDAELELCFgIAAIANBEGoQu4SAgABBASEBCyABELGEgIAAIANBIGokgICAgAALYAECfyOAgICAAEEQayICJICAgIAAAkAgARDVhICAACIDDQBB9KrAgABBECACQQhqQbCswIAAQcirwIAAEKqHgIAAAAsgACADNgIEIAAgAUEEajYCACACQRBqJICAgIAACxUAAkAgACgCAEUNACAAELuEgIAACwsYACAAKAIAIgAgACgCAEEBahDghYCAABoLQAECfyAAKAIAIAAoAgQoAgARgICAgAAAIAAoAgQiASgCCCECIAEoAgQhASAAKAIAEP+FgIAAIAEgAhDPhICAAAu5AQEDfyOAgICAAEEQayIDJICAgIAAAkACQCAAKAIAEYGAgIAAACIARQ0AIAMgABCuhICAACADIAMoAgQ2AgwgAyADKAIAIgQ2AghBACEAIARBACAEKAIAG0GYrsCAABCvhICAACIEKAIEIQUgBCgCACABKQMAIAIQh4aAgACtIAUoAgwRg4CAgAAAIANBCGpBBHIQsISAgAAMAQsQsIWAgABBASEACyAAELGEgIAAIANBEGokgICAgAALyAECAX8CfiOAgICAAEEQayIDJICAgIAAAkACQCAAKAIAEYGAgIAAACIARQ0AIAMgABCuhICAACADIAMoAgQ2AgwgAyADKAIAIgA2AgggAEEAIAAoAgAbQcywwIAAEK+EgIAAIgAoAgAgATUCBCABNQIAIAI1AgQgAjUCAEJ+IAAoAgQoArQBEYWAgIAAACEEIANBCGpBBHIQsISAgABCACEFDAELELCFgIAAQgEhBQsgBSAEELWEgIAAIQQgA0EQaiSAgICAACAEC7wBAgF/An4jgICAgABBEGsiAiSAgICAAAJAAkAgACgCABGBgICAAAAiAEUNACACIAAQroSAgAAgAiACKAIENgIMIAIgAigCACIANgIIIABBACAAKAIAG0G8scCAABCvhICAACIAKAIAIAE1AgQgATUCACAAKAIEKALAARGGgICAAAAhAyACQQhqQQRyELCEgIAAQgAhBAwBCxCwhYCAAEIBIQQLIAQgAxC1hICAACEDIAJBEGokgICAgAAgAwupAQECfyOAgICAAEEQayIBJICAgIAAAkACQCAAKAIAEYGAgIAAACIARQ0AIAEgABCuhICAACABIAEoAgQ2AgwgASABKAIAIgI2AghBACEAIAJBACACKAIAG0G8r8CAABCvhICAACICKAIAQgAgAigCBCgCTBGCgICAAAAgAUEIakEEchCwhICAAAwBCxCwhYCAAEEBIQALIAAQsYSAgAAgAUEQaiSAgICAAAu2AQIBfwJ+I4CAgIAAQRBrIgIkgICAgAACQAJAIAAoAgARgYCAgAAAIgBFDQAgAiAAEK6EgIAAIAIgAigCBDYCDCACIAIoAgAiADYCCCAAQQAgACgCABtBqK7AgAAQr4SAgAAiACgCACABKQMAIAAoAgQoAhARh4CAgAAAIQMgAkEIakEEchCwhICAAEIAIQQMAQsQsIWAgABCASEECyAEIAMQtYSAgAAhAyACQRBqJICAgIAAIAMLqQEBAn8jgICAgABBEGsiASSAgICAAAJAAkAgACgCABGBgICAAAAiAEUNACABIAAQroSAgAAgASABKAIENgIMIAEgASgCACICNgIIQQAhACACQQAgAigCABtBnK/AgAAQr4SAgAAiAigCAEIAIAIoAgQoAiQRgoCAgAAAIAFBCGpBBHIQsISAgAAMAQsQsIWAgABBASEACyAAELGEgIAAIAFBEGokgICAgAALvgECAX8CfiOAgICAAEEQayICJICAgIAAAkACQCAAKAIAEYGAgIAAACIARQ0AIAIgABCuhICAACACIAIoAgQ2AgwgAiACKAIAIgA2AgggAEEAIAAoAgAbQZyxwIAAEK+EgIAAIgAoAgAgATUCBCABNQIAQn4gACgCBCgCvAERhICAgAAAIQMgAkEIakEEchCwhICAAEIAIQQMAQsQsIWAgABCASEECyAEIAMQtYSAgAAhAyACQRBqJICAgIAAIAMLoQEDAX8BfgF/I4CAgIAAQTBrIgIkgICAgAAgAiABEYCAgIAAACAAKQIEIQMgACACKQMANwIEIABBDGoiASgCACEEIAEgAkEIaigCADYCACAAKAIAIQEgAEEBNgIAIAJBEGpBDGogBDYCACACIAE2AhAgAiADNwIUIABBBGohAAJAIAFFDQAgAkEQakEIahC5hICAAAsgAkEwaiSAgICAACAACx8AAkAgACgCAEEBRg0AIAAgARDDhICAAA8LIABBBGoLDwAgACgCACABEK6HgIAAC4sBAQF/I4CAgIAAQTBrIgIkgICAgAAgAEEANgIIIABCATcCACACIAE2AgwgAkEkakEBNgIAIAJCATcCFCACQdypwIAANgIQIAJB5YCAgAA2AiwgAiACQShqNgIgIAIgAkEMajYCKCAAIAJBEGoQlIWAgAAQx4SAgAAgABCzhYCAACACQTBqJICAgIAAC0gBAX8jgICAgABBEGsiASSAgICAAAJAIABFDQBB5KnAgABBNyABQQhqQaCswIAAQeSqwIAAEKqHgIAAAAsgAUEQaiSAgICAAAsSACAAEJmGgIAAIAAQm4aAgAALCwAgARDKhICAAAALQwEBfyOAgICAAEEgayIBJICAgIAAIAFBEGogABDGhICAACABQQhqIAFBEGoQ3YSAgAAgASgCCCABKAIMEOKEgIAAAAsLACABEMqEgIAAAAsLACABEM2EgIAAAAsLACAAEMqEgIAAAAsCAAsWAAJAIAFFDQAgACABIAIQ/4OAgAALCwIACwoAIAAQyISAgAALAgALAgALAgALIwEBf0EAIQECQCAAKAIADQAgAEF/EOCFgIAAGiAAIQELIAELJgEBfwJAIAAoAgBBAWoiAUEBTg0AQQAPCyAAIAEQ4IWAgAAaIAALNgEBfyABIABrIQFBACECAkADQCABRQ0BIAFBeGohASAAKAIEIAJqIQIgAEEIaiEADAALCyACCzMAAkAgASgCAA0AIAIgAyAEEKiHgIAAAAsgACABKQIANwIAIABBCGogAUEIaigCADYCAAuNAQEBfyOAgICAAEEgayIDJICAgIAAAkAgASgCAEEBRw0AIANBGGogAUEUaigCADYCACADQRBqIAFBDGopAgA3AwAgAyABKQIENwMIQcCswIAAQSsgA0EIakHsrMCAACACEKqHgIAAAAsgACABKQIENwIAIABBCGogAUEMaigCADYCACADQSBqJICAgIAAC0YCAX8BfiOAgICAAEEQayICJICAgIAAIAJBCGogAUEAEJWGgIAAIAIpAwghAyAAQQA2AgggACADNwIAIAJBEGokgICAgAALVAACQAJAIAFFDQACQAJAIANFDQAgASACEIGEgIAAIQIMAQsgASACEP6DgIAAIQILIAINARCNhoCAAEEAIQIMAQtBACEBCyAAIAE2AgQgACACNgIAC0kAIAAgASABIAJBA3QiAmoQ14SAgAAQ2oSAgAADQAJAIAINAA8LIAAgASgCACABKAIEEIGGgIAAIAJBeGohAiABQQhqIQEMAAsLNwEBfyOAgICAAEEQayICJICAgIAAIAJBCGogARCahoCAACAAIAIpAwg3AgAgAkEQaiSAgICAAAukAQECfyOAgICAAEEgayICJICAgIAAIAJBCGogARCahoCAACACQRBqIAIoAgggAigCDBDYh4CAAEEBIQMCQAJAIAIoAhBBAUcNACAAIAEpAgA3AgQgAEEQaiACKQIUNwIAIABBDGogAUEIaigCADYCAAwBCyAAIAEpAgA3AgQgAEEMaiABQQhqKAIANgIAQQAhAwsgACADNgIAIAJBIGokgICAgAALOgEBfyOAgICA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BUECcRsiBUUNASAFLQAAQQFxDQEgASAFKAIIQXxxNgIAIAUgAkEBcjYCCAwCCyACEPWEgIAAIAItAABBAnFFDQEgBiAGKAIAQQJyNgIADAELIAEgBDYCAAwBCyAEIQILIAAgAjYCAAsLTQEBfyOAgICAAEEQayIEJICAgIAAIARBCGogARChhoCAACAEIAQoAgggBCgCDCACIAMQ/YSAgAAgACAEKQMANwIAIARBEGokgICAgAALygEBAX8jgICAgABBIGsiBSSAgICAACAFIAI2AgQgBSABNgIAIAUgAzYCCCAFIAQ2AgwCQCAEIANJDQACQCADRQ0AIAIgA0YNACACIANNDQEgASADaiwAAEG/f0wNAQsCQCAERQ0AIAIgBEYNACACIARNDQEgASAEaiwAAEG/f0wNAQsgACAEIANrNgIEIAAgASADajYCACAFQSBqJICAgIAADwsgBSAFQQxqNgIYIAUgBUEIajYCFCAFIAU2AhAgBUEQahCfhYCAAAALOQEBfyAAIAIgAWsiAhD/hICAACAAKAIIIgMgABCghoCAAGogAiABIAIQgIWAgAAgACADIAJqNgIICxEAIAAgACgCCCABELiFgIAAC40CAQF/I4CAgIAAQeAAayIEJICAgIAAIAQgATYCCCAEIAM2AgwCQCABIANHDQAgACACIAEQ7IeAgAAaIARB4ABqJICAgIAADwsgBEEoakEUakGIgICAADYCACAEQTRqQfmAgIAANgIAIARBEGpBFGpBAzYCACAEIARBCGo2AkAgBCAEQQxqNgJEIARByABqQRRqQQA2AgAgBEIDNwIUIARBxLnAgAA2AhAgBEH5gICAADYCLCAEQbSzwIAANgJYIARCATcCTCAEQZC6wIAANgJIIAQgBEEoajYCICAEIARByABqNgI4IAQgBEHEAGo2AjAgBCAEQcAAajYCKCAEQRBqQcS3wIAAEJiHgIAAAAtLAQF/I4CAgIAAQRBrIgMkgICAgAAgA0EIaiABEKGGgIAAIAMgAygCCCADKAIMIAIQgoWAgAAgACADKQMANwIAIANBEGokgICAgAALngEBAX8jgICAgABBIGsiBCSAgICAACAEIAI2AgQgBCABNgIAIAQgAzYCCCAEIAI2AgwCQCADRQ0AIAIgA0YNAAJAIAIgA00NACABIANqLAAAQb9/Sg0BCyAEIARBDGo2AhggBCAEQQhqNgIUIAQgBDYCECAEQRBqEKGFgIAAAAsgACACIANrNgIEIAAgASADajYCACAEQSBqJICAgIAAC0QBAX8jgICAgABBEGsiBCSAgICAACAEQQhqIAIgAxCFhYCAACAAIAEgBCgCCEHsscCAABDshoCAACAEQRBqJICAgIAAC0QAAkACQCACIAFJDQAgBCACTw0BIAIgBCAFEJOHgIAAAAsgASACIAUQlIeAgAAACyAAIAIgAWs2AgQgACADIAFqNgIAC2IBAX8jgICAgABBEGsiAySAgICAACADIAEgAhCxhYCAAEEMQQQQhoWAgAAiAUEIaiADQQhqKAIANgIAIAEgAykDADcCACAAQeyxwIAANgIEIAAgATYCACADQRBqJICAgIAAC0oBAn8jgICAgABBEGsiAiSAgICAACACQQhqIAAgAUEAELmFgIAAAkAgAigCCCIDDQAgACABEIiHgIAAAAsgAkEQaiSAgICAACADCwkAIABBADYCAAsJACAAQQA2AgALDABCh5z/spz3/7szCwQAQQALdgIBfwF+I4CAgIAAQRBrIgIkgICAgAACQCABKAIAEYGAgIAAACIBDQBBlLLAgABBxgAgAkEIakGYusCAAEGks8CAABCqh4CAAAALIAEgASkDACIDQgF8NwMAIAAgASkDCDcDCCAAIAM3AwAgAkEQaiSAgICAAAsPACAAKAIAIAEQwoeAgAALFAAgACgCACAAKAIEIAEQpYaAgAALDwAgACgCACABEI+FgIAAC9kDAAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAIAAoAgAOFgECAwQFBgcICQoLDA0ODxAREhMUFQABCyABQbjQwIAAQRgQxoeAgAAPCyABIAAoAgQgAEEIaigCABDGh4CAAA8LIABBBGogARDmhoCAAA8LIAFB6NPAgABBGBDGh4CAAA8LIAFBzdPAgABBGxDGh4CAAA8LIAFBs9PAgABBGhDGh4CAAA8LIAFBmtPAgABBGRDGh4CAAA8LIAFBjtPAgABBDBDGh4CAAA8LIAFB+9LAgABBExDGh4CAAA8LIAFB6NLAgABBExDGh4CAAA8LIAFB2tLAgABBDhDGh4CAAA8LIAFBzNLAgABBDhDGh4CAAA8LIAFBvtLAgABBDhDG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h4CAAAALIAFBEGokgICAgAALLAEBfiAAKQIAIQFBFEEEEIaFgIAAIgBCADcCDCAAIAE3AgQgAEEBNgIAIAALngIDAn8BfgJ/QRQhAwJAA0AgAkKQzgBUDQEgASADaiIEQXxqIAIgAkKQzgCAIgVCkM4Afn2nIgZB//8DcUHkAG4iB0EBdEHIu8CAAGovAAA7AAAgBEF+aiAGIAdB5ABsa0H//wNxQQF0Qci7wIAAai8AADsAACADQXxqIQMgBSECDAALCwJAIAKnIgRB5ABIDQAgASADakF+aiACpyIEIARB//8DcUHkAG4iBEHkAGxrQf//A3FBAXRByLvAgABqLwAAOwAAIANBfmohAwsCQAJAIARBCkgNACABIANBfmoiA2ogBEEBdEHIu8CAAGovAAA7AAAMAQsgASADQX9qIgNqIARBMGo6AAALIABBFCADazYCBCAAIAEgA2o2AgALawEBfyOAgICAAEEQayICJICAgIAAIAAoAgAhAAJAAkAgAUGAAUkNACACQQA2AgwgAiABIAJBDGoQnYWAgAAgACACKAIAIAIoAgQQq4WAgAAMAQsgACABEKyFgIAACyACQRBqJICAgIAAQQALEQAgACABIAEgAmoQ/oSAgAALPAACQCAAKAIIIAAoAgRHDQAgAEEBEP+EgIAACyAAEKCGgIAAIAAoAghqIAE6AAAgACAAKAIIQQFqNgIIC2gBAX8jgICAgABBIGsiAiSAgICAACAAKAIAIQAgAkEIakEQaiABQRBqKQIANwMAIAJBCGpBCGogAUEIaikCADcDACACIAEpAgA3AwggACACQQhqEJSFgIAAIQEgAkEgaiSAgICAACABCxMAIAAoAgAgASACEKuFgIAAQQALBAAgAAsCAAtSAgF/AX4jgICAgABBEGsiAySAgICAACADQQhqIAJBABC6hYCAACADKQMIIQQgAEEANgIIIAAgBDcCACAAIAEgAhCrhYCAACADQRBqJICAgIAAC0MBAX8jgICAgABBEGsiAiSAgICAACACQQhqIAAQoYaAgAAgAigCCCACKAIMIAEQzoeAgAAhASACQRBqJICAgIAAIAELIAEBfwJAIAAoAgQgACgCCCIBRg0AIAAgARC0hYCAAAsLYQEBfyOAgICAAEEQayICJICAgIAAIAIgACABQQAQvoWAgAACQAJAIAIoAgBBAUcNACACQQhqKAIAIgBFDQEgAigCBCAAEIiHgIAAAAsgAkEQaiSAgICAAA8LEImHgIAAAAtMAQF/I4CAgIAAQRBrIgIkgICAgAAgARCzhYCAACACQQhqIAEoAgAgASgCBCABKAIIELaFgIAAIAAgAikDCDcCACACQRBqJICAgIAAC0kBAX8jgICAgABBEGsiBCSAgICAACAEIAI2AgwgBCABNgIIIARBCGoQoIaAgAAhASAAIAM2AgQgACABNgIAIARBEGokgICAgAALHwACQCAAKAIIIAFJDQAgABCghoCAABogACABNgIICwthAQF/I4CAgIAAQRBrIgMkgICAgAAgAyAAIAEgAhC8hYCAAAJAAkAgAygCAEEBRw0AIANBCGooAgAiAEUNASADKAIEIAAQiIeAgAAACyADQRBqJICAgIAADwsQiYeAgAAAC1QAAkACQCABRQ0AAkACQCADRQ0AIAEgAhCBhICAACECDAELIAEgAhD+g4CAACECCyACDQEQn4aAgABBACECDAELQQAhAQsgACABNgIEIAAgAjYCAAuJAQECfyOAgICAAEEQayIDJICAgIAAIANBCGogARCkhYCAAAJAAkAgAygCDCIBRQ0AIAMoAggiBEF/TA0AIAMgBCABIAIQuYWAgAAgAygCACICRQ0BIAMoAgQhASAAIAI2AgAgACABNgIEIANBEGokgICAgAAPCxCJh4CAAAALIAQgARCIh4CAAAALlQIBBH8jgICAgABBEGsiBSSAgICAAAJAAkACQCACDQBBASEDQQAhBiABIQcMAQtBACEGAkAgAUEATg0AQQEhAwwCCwJAAkACQAJAAkAgAygCACIHDQAgBSABIAJBABC5hYCAACAFKAIEIQYgBSgCACEHDAELIAEhBiADKAIEIgggAUYNACADQQhqKAIAIQYgCA0BIAVBCGogASAGQQAQuYWAgAAgBSgCDCEGIAUoAgghBwsgB0UNAQwCCwJAIAcgCCAGIAEQgISAgAAiB0UNACABIQYMAgsQn4aAgAALQQEhAyABIQcgAiEGDAELQQAhAwsgACAHNgIECyAAIAM2AgAgAEEIaiAGNgIAIAVBEGokgICAgAALKAACQCABKAIEIAJrIANJDQAgAEEANgIADwsgACABIAIgAxC9hYCAAAucAgECfyOAgICAAEEwayIEJICAgIAAAkACQCACIANqIgMgAkkNACAEQQhqIAEoAgRBAXQiAiADIAIgA0sbIgJBCCACQQhLGxCkhYCAACAEKAIMIQIgBCgCCCEDAkACQCABKAIEIgVFDQAgBEEgakEIakEBNgIAIAQgBTYCJCAEIAEoAgA2AiAMAQsgBEEANgIgCyAEQRBqIAMgAiAEQSBqIAQQu4WAgABBASECIARBEGpBCGooAgAhAyAEKAIUIQUCQCAEKAIQQQFGDQAgASADNgIEIAEgBTYCAEEAIQIMAgsgACAFNgIEIABBCGogAzYCAAwBCyAAIAM2AgQgAEEIakEANgIAQQEhAgsgACACNgIAIARBMGokgICAgAALqgEBA38jgICAgABBEGsiBCSAgICAAAJAAkAgASgCBCIFIAJJDQBBACEGIAVFDQEgBEEIaiABKAIAIAVBASACIAMQv4WAgAACQCAEKAIIIgVFDQAgBCgCDCECIAEgBTYCACABIAI2AgQMAgsgACACNgIEIABBCGpBATYCAEEBIQYMAQtBpLvAgABBJEGwtcCAABCRh4CAAAALIAAgBjYCACAEQRBqJICAgIAAC3EBAn8gAUEAIAIgBEYiBhshBwJAAkACQCAGDQAgBUUNAQsgByEDIAIhBAwBCwJAIAQNACABIAIgAxCWhYCAAEEAIQQMAQsgASACIAMgBBCAhICAACIDDQAQn4aAgABBACEDCyAAIAQ2AgQgACADNgIAC00BAX8jgICAgABBEGsiAySAgICAACADIAEgAhCxhYCAACAAQQA2AgAgAEEMaiADQQhqKAIANgIAIAAgAykDADcCBCADQRBqJICAgIAACzUAIABBgAE6ABggAEIBNwIMIAAgASkCADcCACAAQRRqQQA2AgAgAEEIaiABQQhqKAIANgIAC4wBAgF/AX4jgICAgABBEGsiAySAgICAAAJAAkACQAJAIAAoAgAOAwECAAELIAApAwghBCADQQI6AAAgAyAENwMIDAILIAApAwghBCADQQM6AAAgAyAENwMIDAELIAApAwghBCADQQE6AAAgAyAENwMICyADIAEgAhDDhYCAACEAIANBEGokgICAgAAgAAvhAQEBfyOAgICAAEEwayIDJICAgIAAIAMgAjYCBCADIAE2AgACQAJAIAAtAABBB0YNACADQSxqQYKAgIAANgIAIANBHGpBAjYCACADQgI3AgwgA0Ho1MCAADYCCCADQYGAgIAANgIkIAMgADYCICADIANBIGo2AhggAyADNgIoIANBCGoQyYWAgAAhAAwBCyADQRxqQQE2AgAgA0IBNwIMIANBmNXAgAA2AgggA0GCgICAADYCJCADIANBIGo2AhggAyADNgIgIANBCGoQyYWAgAAhAAsgA0EwaiSAgICAACAAC00BA39BACECAkAgASgCCCIDIAEoAgRPDQAgASgCACADai0AACEEQQEhAiABIANBAWo2AggLIAAgAjoAASAAQQA6AAAgAEECaiAEOgAACzwBAX8jgICAgABBEGsiAiSAgICAACACQQhqIAEgASgCCBDMhYCAACAAIAIpAwg3AgAgAkEQaiSAgICAAAs4AQF/QRRBBBCGhYCAACIDIAI2AhAgAyABNgIMIANBCGogAEEIaigCADYCACADIAApAgA3AgAgAwtOAQN/I4CAgIAAQRBrIgIkgICAgAAgAkEIaiABIAEoAghBAWoiAyABKAIEIgQgBCADSxsQzIWAgAAgACACKQMINwIAIAJBEGokgICAgAALuAICAX8BfiOAgICAAEHQAGsiAiSAgICAACACQQA2AjAgAkIBNwMoIAIgACgCACIANgI0IAJBOGpBFGpBATYCACACQgE3AjwgAkG0s8CAADYCOCACQfqAgIAANgIUIAIgAkEQajYCSCACIAJBNGo2AhAgAkEoaiACQThqEJSFgIAAEKeFgIAAIAJBKGoQs4WAgAAgAkEIaiAAQQxqQYaAgIAAENuFgIAAIAIpAwghAyACIABBEGpBhoCAgAAQ24WAgAAgAkEQakEUakEDNgIAIAIgAzcDQCACQfuAgIAANgI8IAJCBDcCFCACQazUwIAANgIQIAIgAikDADcDSCACIAJBKGo2AjggAiACQThqNgIgIAEgAkEQahDHh4CAACEAIAJBKGoQlYWAgAAgAkHQAGokgICAgAAgAAuXAQEBfyOAgICAAEEwayIBJICAgIAAIAFBADYCCCABQgE3AwAgASAANgIMIAFBJGpBATYCACABQgE3AhQgAUG0s8CAADYCECABQfyAgIAANgIsIAEgAUEoajYCICABIAFBDGo2AiggASABQRBqEJSFgIAAEKeFgIAAIAEQs4WAgAAgARDKhYCAACEAIAFBMGokgICAgAAgAAvgDgMSfwF+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KQIANwNYIAFBCGogAUHYAGoQtYWAgAAgASkDCCETQRRBBBCGhYCAACIQIAM2AhAgECAMNgIMIBAgEzcCBCAQQQA2AgAgAUGgAWokgICAgAAgEAsXACAAQQA2AgggACACNgIEIAAgATYCAAuXAQEEfyOAgICAAEEQayIDJICAgIAAIANBCGogASgCACABKAIEIAJBjNjAgAAQpYWAgAAgAygCCCECIAMoAgwhAUEAIQRBASEFA0ACQCABDQAgACAENgIEIAAgBTYCACADQRBqJICAgIAADwtBACAEQQFqIAItAABBCkYiBhshBCABQX9qIQEgAkEBaiECIAUgBmohBQwACwuQBQEGfyOAgICAAEEwayIDJICAgIAAA0AgASgCACEEIAEoAgQhBSABKAIIIgYhBwNAAkACQAJAIAcgBUkNAEEAIQgMAQsgBCAHai0AAEH82MCAAGotAABFDQFBASEICwJAAkAgBSAHRg0AAkAgCEUNAAJAIAQgB2otAAAiCEHcAEYNAAJAIAhBIkYNACABIAdBAWo2AgggA0EPNgIgIAAgASADQSBqEM6FgIAADAQLAkAgAigCCEUNACADQRBqIAYgByAEIAVBzNjAgAAQhIWAgAAgAiADKAIQIAMoAhQQq4WAgABBASEFIAEgASgCCEEBajYCCCADQQhqIAIQoYaAgAAgA0EgaiABIAMoAgggAygCDBDPhYCAACADKAIkIQcCQCADKAIgQQFGDQAgAEEIaiAHNgIAIABBDGogA0EgakEIaigCADYCAEEAIQVBASEHCyAAIAU2AgAgACAHNgIEDAQLIAMgBiAHIAQgBUG82MCAABCEhYCAAEEBIQUgAygCBCEHIAMoAgAhBCABIAEoAghBAWo2AgggA0EgaiABIAQgBxDPhYCAACADKAIkIQcCQCADKAIgQQFGDQAgAEEIaiAHNgIAIABBDGogA0EgakEIaigCADYCAEEAIQdBACEFCyAAIAU2AgAgACAHNgIEDAMLIANBGGogBiAHIAQgBUGs2MCAABCEhYCAACACIAMoAhggAygCHBCrhYCAACABIAEoAghBAWo2AgggASACENCFgIAAIgdFDQUgAEEBNgIAIAAgBzYCBAwCCyAHIAVBnNjAgAAQkIeAgAAACyADQQQ2AiAgACABIANBIGoQzoWAgAALIANBMGokgICAgAAPCyABIAdBAWoiBzYCCAwACwsLdwECfyOAgICAAEEgayIDJICAgIAAIANBCGogARDFhYCAACADKAIMIQEgAygCCCEEIANBEGpBCGogAkEIaigCADYCACADIAIpAgA3AxAgA0EQaiAEIAEQxoWAgAAhAiAAQQE2AgAgACACNgIEIANBIGokgICAgAALZQEBfyOAgICAAEEgayIEJICAgIAAIAQgAiADENiHgIAAAkACQCAEKAIAQQFHDQAgBEEONgIQIAAgASAEQRBqENmFgIAADAELIAAgBCkCBDcCBCAAQQA2AgALIARBIGokgICAgAALrQYBA38jgICAgABBIGsiAiSAgICAACACQRBqIAAQ14WAgAACQAJAIAItABBBAUYNAAJAAkACQAJAAkACQAJAAkACQCACLQARIgNBkn9qIgRBB00NACADQZ5/aiIEQQRNDQECQAJAAkAgA0EiRg0AIANBL0YNAiADQdwARg0BDAsLIAFBIhCshYCAAEEAIQAMDAsgAUHcABCshYCAAEEAIQAMCwsgAUEvEKyFgIAAQQAhAAwKCyAEDggEBwcHAwcCAQQLIAQOBQUGBgYEBQsgAkEIaiAAENSFgIAAAkAgAi8BCEEBRw0AIAIoAgwhAAwICwJAAkACQAJAAkAgAi8BCiIEQYD4A3EiA0GAsANGDQACQCADQYC4A0YNACAEQYDwA3FBgLADRw0CIAJBDjYCECAAIAJBEGoQ04WAgAAhAAwNCyACQRE2AhAgACACQRBqENOFgIAAIQAMDAsgAkEQaiAAENeFgIAAIAItABBBAUYNCiACLQARQdwARw0BIAJBEGogABDXhYCAACACLQAQQQFGDQogAi0AEUH1AEcNAiACQRBqIAAQ1IWAgAAgAi8BEEEBRg0KIAIvARIiA0GA+ANxQYC4A0cNA0GAgMQAQYCAxAAgBEGA0ABqQf//A3FBCnQgA0GAyABqQf//A3FyIgNBgIAEaiIEIARBgPD/P3FBgLADRhsgA0H//z9LGyIEQYCAxABHDQAgAkEONgIQIAAgAkEQahDThYCAACEADAsLQQAhACACQQA2AhAgAiAEIAJBEGoQnYWAgAAgASACKAIAIAIoAgQQq4WAgAAMCgsgAkEUNgIQIAAgAkEQahDThYCAACEADAkLIAJBFDYCECAAIAJBEGoQ04WAgAAhAAwICyACQRE2AhAgACACQRBqENOFgIAAIQAMBwsgAUEJEKyFgIAAQQAhAAwGCyABQQ0QrIWAgABBACEADAULIAFBChCshYCAAEEAIQAMBAsgAUEMEKyFgIAAQQAhAAwDCyABQQgQrIWAgABBACEADAILIAJBCzYCECAAIAJBEGoQ04WAgAAhAAwBCyACKAIUIQALIAJBIGokgICAgAAgAAuGAgEFfyOAgICAAEEQayIBJICAgIAAAkADQCAAKAIIIQIgACgCACEDIAAoAgQhBAJAA0ACQAJAAkAgAiAESQ0AQQAhBQwBCyADIAJqLQAAQfzYwIAAai0AAEUNAUEBIQULAkACQCAEIAJGDQAgBQ0BIAIgBEHc2MCAABCQh4CAAAALIAFBBDYCAAwDCwJAIAMgAmotAAAiBEHcAEYNAAJAIARBIkYNACABQQ82AgAMBAsgACACQQFqNgIIQQAhAgwFCyAAIAJBAWo2AgggABDShYCAACICRQ0DDAQLIAAgAkEBaiICNgIIDAALCwsgACABENOFgIAAIQILIAFBEGokgICAgAAgAguxBAEEfyOAgICAAEEgayIBJICAgIAAIAFBEGogABDXhYCAAAJAAkAgAS0AEEEBRg0AQQAhAgJAAkACQAJAIAEtABEiA0GSf2oiBEEHTQ0AIANBnn9qIgRBBE0NASADQSJGDQUgA0HcAEYNBSADQS9GDQUMAwsgBA4IBAICAgQCBAEECyAEDgUDAQEBAwMLIAFBCGogABDUhYCAAAJAIAEvAQhBAUcNACABKAIMIQIMAwsCQAJAAkACQAJAIAEvAQoiBEGA+ANxIgNBgLADRg0AIANBgLgDRw0BIAFBETYCECAAIAFBEGoQ04WAgAAhAgwHCyABQRBqIAAQ14WAgAAgAS0AEEEBRg0FIAEtABFB3ABHDQIgAUEQaiAAENeFgIAAIAEtABBBAUYNBSABLQARQfUARw0DIAFBEGogABDUhYCAACABLwEQQQFGDQUgAS8BEiIDQYD4A3FBgLgDRw0BIARBgNAAakH//wNxQQp0IANBgMgAakH//wNxckGAgARqIQQLAkAgBEH//8MASw0AIARBgPD/P3FBgLADRw0GCyABQQ42AhAgACABQRBqENOFgIAAIQIMBQsgAUERNgIQIAAgAUEQahDThYCAACECDAQLIAFBFDYCECAAIAFBEGoQ04WAgAAhAgwDCyABQRQ2AhAgACABQRBqENOFgIAAIQIMAgsgAUELNgIQIAAgAUEQahDThYCAACECDAELIAEoAhQhAgsgAUEgaiSAgICAACACC2sBAn8jgICAgABBIGsiAiSAgICAACACQQhqIAAQxYWAgAAgAigCDCEAIAIoAgghAyACQRBqQQhqIAFBCGooAgA2AgAgAiABKQIANwMQIAJBEGogAyAAEMaFgIAAIQEgAkEgaiSAgICAACABC4QCAQl/I4CAgIAAQSBrIgIkgICAgAACQAJAIAEoAggiA0EEaiABKAIEIgRLDQAgASgCACADaiEFQQAhBkEAIQcCQANAAkAgBkEERw0AIABBADsBACAAIAc7AQIMBAsgAyAGaiIIIARPDQEgAkEIaiAFIAZqLQAAENWFgIAAIAIvAQohCSACLwEIIQogASAIQQFqNgIIAkAgCkUNACAGQQFqIQYgCSAHQQR0aiEHDAELCyACQQs2AhAgACABIAJBEGoQ1oWAgAAMAgsgCCAEQezYwIAAEJCHgIAAAAsgASAENgIIIAJBBDYCECAAIAEgAkEQahDWhYCAAAsgAkEgaiSAgICAAAskACAAIAFB/wFxQfzawIAAai0AACIBOwECIAAgAUH/AUc7AQALegECfyOAgICAAEEgayIDJICAgIAAIANBCGogARDFhYCAACADKAIMIQEgAygCCCEEIANBEGpBCGogAkEIaigCADYCACADIAIpAgA3AxAgA0EQaiAEIAEQxoWAgAAhAiAAQQE7AQAgAEEEaiACNgIAIANBIGokgICAgAALiQEBAX8jgICAgABBIGsiAiSAgICAACACQQhqIAEQxIWAgAACQAJAIAItAAhBAUcNACAAQQE6AAAgAEEEaiACKAIMNgIADAELAkAgAi0ACUEBRw0AIAAgAi0ACjoAASAAQQA6AAAMAQsgAkEENgIQIAAgASACQRBqENiFgIAACyACQSBqJICAgIAAC3oBAn8jgICAgABBIGsiAySAgICAACADQQhqIAEQxYWAgAAgAygCDCEBIAMoAgghBCADQRBqQQhqIAJBCGooAgA2AgAgAyACKQIANwMQIANBEGogBCABEMaFgIAAIQIgAEEBOgAAIABBBGogAjYCACADQSBqJICAgIAAC3cBAn8jgICAgABBIGsiAySAgICAACADQQhqIAEQxYWAgAAgAygCDCEBIAMoAgghBCADQRBqQQhqIAJBCGooAgA2AgAgAyACKQIANwMQIANBEGogBCABEMaFgIAAIQIgAEEBNgIAIAAgAjYCBCADQSBqJICAgIAAC0MAIAAoAgAhAAJAIAEQyIeAgAANAAJAIAEQyYeAgAANACAAIAEQoIeAgAAPCyAAIAEQ4oeAgAAPCyAAIAEQ3IeAgAALEAAgACACNgIEIAAgATYCAAsRACAAIAAoAgggARDlhYCAAAtMAQF/I4CAgIAAQRBrIgEkgICAgAAgASAAEOqFgIAAAkAgASgCACIARQ0AIAAgASgCBCABQQhqKAIAEN6FgIAACyABQRBqJICAgIAACxYAAkAgAUUNACAAIAEgAhD/g4CAAAsLAgALFAEBfyAAKAIAIQIgACABNgIAIAILcQECfyOAgICAAEEQayICJICAgIAAAkAgASgCBCIDaUEBRg0AQdjdwIAAQSsgAkEIakGE3sCAAEHI3cCAABCqh4CAAAALIAEoAgAhASAAIAM2AgQgACADIAFqQX9qQQAgA2txNgIAIAJBEGokgICAgAALUwIBfwF+AkACQCABKAIAIAEoAgQiAWpBf2pBACABa3EiA60gAq1+IgRCIIinDQAgACADNgIIIAAgBKc2AgAMAQsQ/YWAgABBACEBCyAAIAE2AgQLmAEBAn8jgICAgABBIGsiAiSAgICAACACQoiAgICAATcDGCACQQhqIAJBGGogARDihYCAAAJAAkAgAigCDCIBRQ0AIAIoAgghAyACIAE2AgwgAiADNgIIIAIgAkEIahDhhYCAACACKAIEIQEgAigCACEDDAELEP2FgIAAQQAhAQsgACABNgIEIAAgAzYCACACQSBqJICAgIAAC0YCAX8BfiOAgICAAEEQayICJICAgIAAIAJBCGogAUEAEJWGgIAAIAIpAwghAyAAQQA2AgggACADNwIAIAJBEGokgICAgAALYQEBfyOAgICAAEEQayIDJICAgIAAIAMgACABIAIQ6IWAgAACQAJAIAMoAgBBAUcNACADQQhqKAIAIgBFDQEgAygCBCAAEIiHgIAAAAsgA0EQaiSAgICAAA8LEImHgIAAAAuOAQIBfwF+I4CAgIAAQSBrIgMkgICAgAACQAJAIAFB/wFxRQ0AIANBEGogAhDkhYCAACADQRBqEIeGgIAAIAEgAhDuh4CAABogAEEIaiACNgIAIAAgAykDEDcCAAwBCyADQQhqIAJBARCVhoCAACADKQMIIQQgACACNgIIIAAgBDcCAAsgA0EgaiSAgICAAAsXACAAIAI2AgggACACNgIEIAAgATYCAAsoAAJAIAEoAgQgAmsgA0kNACAAQQA2AgAPCyAAIAEgAiADEOmFgIAAC4QCAQJ/I4CAgIAAQcAAayIEJICAgIAAAkACQCACIANqIgMgAkkNAEEBIQIgBEEYaiABKAIEQQF0IgUgAyAFIANLGyIDQQQgA0EESxsQ44WAgAAgBCgCHCEDIAQoAhghBSAEQTBqIAEQ6oWAgAAgBEEgaiAFIAMgBEEwaiABEIOGgIAAIARBKGooAgAhAyAEKAIkIQUCQCAEKAIgQQFGDQAgASAFNgIAIAEgA0EDdjYCBEEAIQIMAgsgBEEQaiAFIAMQ/oWAgAAgACAEKQMQNwIEDAELIARBCGogA0EAEP6FgIAAIAAgBCkDCDcCBEEBIQILIAAgAjYCACAEQcAAaiSAgICAAAtBAQF/AkAgASgCBCICRQ0AIAEoAgAQ/4WAgAAhASAAQQhqQQg2AgAgACACQQN0NgIEIAAgATYCAA8LIABBADYCAAtBAQF/AkAgASgCBCICRQ0AIAEoAgAQ/4WAgAAhASAAQQhqQQQ2AgAgACACQQN0NgIEIAAgATYCAA8LIABBADYCAAsHACAAKAIACxAAIAAgAjYCBCAAIAE2AgALAgALAgALFgAgACABKAIINgIEIAAgASgCADYCAAtMAQF/I4CAgIAAQRBrIgEkgICAgAAgASAAEOuFgIAAAkAgASgCACIARQ0AIAAgASgCBCABQQhqKAIAEN6FgIAACyABQRBqJICAgIAACyABAX8gACABKAIAIgI2AgAgACACIAEoAghBA3RqNgIECxcAIABBADYCCCAAIAI2AgQgACABNgIACwIACxwAIAAgASkCADcCACAAQQhqIAFBCGooAgA2AgALNgEBfyAAIAIgAWsiAhD3hYCAACAAKAIAIAAoAggiA2ogAiABIAIQ+IWAgAAgACADIAJqNgIICxEAIAAgACgCCCABEIKGgIAAC40CAQF/I4CAgIAAQeAAayIEJICAgIAAIAQgATYCCCAEIAM2AgwCQCABIANHDQAgACACIAEQ7IeAgAAaIARB4ABqJICAgIAADwsgBEEoakEUakGIgICAADYCACAEQTRqQY2BgIAANgIAIARBEGpBFGpBAzYCACAEIARBCGo2AkAgBCAEQQxqNgJEIARByABqQRRqQQA2AgAgBEIDNwIUIARB0N7AgAA2AhAgBEGNgYCAADYCLCAEQaTfwIAANgJYIARCATcCTCAEQZzfwIAANgJIIAQgBEEoajYCICAEIARByABqNgI4IAQgBEHEAGo2AjAgBCAEQcAAajYCKCAEQRBqQfDfwIAAEJiHgIAAAAtDACAAKAIAIQACQCABEMiHgIAADQACQCABEMmHgIAADQAgACABEKCHgIAADwsgACABEOKHgIAADwsgACABENyHgIAACxQAIAAoAgAgACgCBCABENKHgIAACxAAIAAgAjYCBCAAIAE2AgALEAAgACACNgIEIAAgATYCAAsCAAsQACAAIAI2AgQgACABNgIACwQAIAALJwEBf0EBIQMCQCACQQhHDQAgACABKQAANwABQQAhAwsgACADOgAACxEAIAAgASABIAJqEPaFgIAAC2EBAX8jgICAgABBEGsiAySAgICAACADIAAgASACEIWGgIAAAkACQCADKAIAQQFHDQAgA0EIaigCACIARQ0BIAMoAgQgABCIh4CAAAALIANBEGokgICAgAAPCxCJh4CAAAAL+QEBBH8jgICAgABBEGsiBSSAgICAAAJAAkACQCACDQBBASECQQAhBgwBC0EAIQYCQCABQQBODQBBASECDAILAkACQCADKAIAIgcNACAFIAEgAhCEhoCAACAFKAIEIQYgBSgCACEHDAELIAEhBiADKAIEIgggAUYNACADQQhqKAIAIQYCQCAIDQAgBUEIaiABIAYQhIaAgAAgBSgCDCEGIAUoAgghBwwBCyAHIAggBiABEICEgIAAIQcgASEGCyAGIAIgBxshBiAHIAEgBxshASAHRSECCyAAIAE2AgQLIAAgAjYCACAAQQhqIAY2AgAgBUEQaiSAgICAAAskAAJAIAFFDQAgASACEP6DgIAAIQILIAAgATYCBCAAIAI2AgALKAACQCABKAIEIAJrIANJDQAgAEEANgIADwsgACABIAIgAxCGhoCAAAv8AQECfyOAgICAAEEgayIEJICAgIAAAkACQCACIANqIgMgAkkNACABKAIEIgJBAXQiBSADIAUgA0sbIgNBCCADQQhLGyEDAkACQCACRQ0AIARBEGpBCGpBATYCACAEIAI2AhQgBCABKAIANgIQDAELIARBADYCEAtBASECIAQgA0EBIARBEGogBBCDhoCAACAEQQhqKAIAIQMgBCgCBCEFAkAgBCgCAEEBRg0AIAEgAzYCBCABIAU2AgBBACECDAILIAAgBTYCBCAAQQhqIAM2AgAMAQsgACADNgIEIABBCGpBADYCAEEBIQILIAAgAjYCACAEQSBqJICAgIAACwcAIAAoAgALEAAgACACNgIEIAAgATYCAAsNAEL0+Z7m7qOq+f4ACz8BAX8jgICAgABBEGsiAySAgICAACADIAE2AgwgAyAANgIIIANBCGpBgODAgABBACACELGHgIAAEPaGgIAAAAsCAAsCAAsCAAslAAJAIAEoAgANABDuhoCAAAALIABBlODAgAA2AgQgACABNgIAC2YBAn8gASgCACECIAFBADYCAAJAAkAgAkUNACABKAIEIQNBCEEEEP6DgIAAIgFFDQEgASADNgIEIAEgAjYCACAAQZTgwIAANgIEIAAgATYCAA8LEO6GgIAAAAtBCEEEEIiHgIAAAAsCAAtxAQJ/I4CAgIAAQRBrIgIkgICAgAACQCABKAIEIgNpQQFGDQBBgOHAgABBKyACQQhqQazhwIAAQfDgwIAAEKqHgIAAAAsgASgCACEBIAAgAzYCBCAAIAMgAWpBf2pBACADa3E2AgAgAkEQaiSAgICAAAtFAQF/I4CAgIAAQRBrIgIkgICAgAAgAkEBNgIMIAIgATYCCCACIAJBCGoQkYaAgAAgACACKQMANwIAIAJBEGokgICAgAALEwAgACABIAJqNgIEIAAgATYCAAsWACAAIAE2AgAgACABIAJBAnRqNgIEC4kBAQJ/I4CAgIAAQRBrIgMkgICAgAAgA0EIaiABEJKGgIAAAkACQCADKAIMIgFFDQAgAygCCCIEQX9MDQAgAyAEIAEgAhCXhoCAACADKAIAIgJFDQEgAygCBCEBIAAgAjYCACAAIAE2AgQgA0EQaiSAgICAAA8LEImHgIAAAAsgBCABEIiHgIAAAAsXACAAIAI2AgggACADNgIEIAAgATYCAAs6AAJAIAFFDQACQCADRQ0AIAEgAhCBhICAACECDAELIAEgAhD+g4CAACECCyAAIAE2AgQgACACNgIACxYAAkAgAUUNACAAIAEgAhD/g4CAAAsLAgALFgAgACABKAIINgIEIAAgASgCADYCAAsgAQF/AkAgACgCBCIBRQ0AIAAoAgAgAUEBEJiGgIAACwsQACAAIAI2AgQgACABNgIACxQAIAAoAgAgACgCBCABEM6HgIAACwIACwIACwcAIAAoAgALFgAgACABKAIINgIEIAAgASgCADYCAAsSACABQbzhwIAAQQgQxoeAgAALigoBAX8jgICAgABBMGsiAiSAgICAAAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAIAAtAAAOEgECAwQFBgcICQoLDA0ODxARAAELIAEgAEEEaigCACAAQQhqKAIAEMaHgIAAIQAMEQsgAiAALQABOgAIIAJBLGpBATYCACACQgI3AhwgAkGM5MCAADYCGCACQZSBgIAANgIUIAIgAkEQajYCKCACIAJBCGo2AhAgASACQRhqEMeHgIAAIQAMEAsgAiAAQQhqKQMANwMIIAJBLGpBATYCACACQgI3AhwgAkHw48CAADYCGCACQZWBgIAANgIUIAIgAkEQajYCKCACIAJBCGo2AhAgASACQRhqEMeHgIAAIQAMDwsgAiAAQQhqKQMANwMIIAJBLGpBATYCACACQgI3AhwgAkHw48CAADYCGCACQZaBgIAANgIUIAIgAkEQajYCKCACIAJBCGo2AhAgASACQRhqEMeHgIAAIQAMDgsgAiAAQQhqKQMANwMIIAJBLGpBATYCACACQgI3AhwgAkHU48CAADYCGCACQZeBgIAANgIUIAIgAkEQajYCKCACIAJBCGo2AhAgASACQRhqEMeHgIAAIQAMDQsgAiAAQQRqKAIANgIIIAJBLGpBATYCACACQgI3AhwgAkG048CAADYCGCACQZiBgIAANgIUIAIgAkEQajYCKCACIAJBCGo2AhAgASACQRhqEMeHgIAAIQAMDAsgAiAAQQRqKQIANwMIIAJBLGpBATYCACACQgE3AhwgAkGg48CAADYCGCACQZmBgIAANgIUIAIgAkEQajYCKCACIAJBCGo2AhAgASACQRhqEMeHgIAAIQAMCwsgAkEsakEANgIAIAJBvOHAgAA2AiggAkIBNwIcIAJBkOPAgAA2AhggASACQRhqEMeHgIAAIQAMCgsgAkEsakEANgIAIAJBvOHAgAA2AiggAkIBNwIcIAJBiOPAgAA2AhggASACQRhqEMeHgIAAIQAMCQsgAkEsakEANgIAIAJBvOHAgAA2AiggAkIBNwIcIAJB9OLAgAA2AhggASACQRhqEMeHgIAAIQAMCAsgAkEsakEANgIAIAJBvOHAgAA2AiggAkIBNwIcIAJB4OLAgAA2AhggASACQRhqEMeHgIAAIQAMBwsgAkEsakEANgIAIAJBvOHAgAA2AiggAkIBNwIcIAJByOLAgAA2AhggASACQRhqEMeHgIAAIQAMBgsgAkEsakEANgIAIAJBvOHAgAA2AiggAkIBNwIcIAJBuOLAgAA2AhggASACQRhqEMeHgIAAIQAMBQsgAkEsakEANgIAIAJBvOHAgAA2AiggAkIBNwIcIAJBrOLAgAA2AhggASACQRhqEMeHgIAAIQAMBAsgAkEsakEANgIAIAJBvOHAgAA2AiggAkIBNwIcIAJBoOLAgAA2AhggASACQRhqEMeHgIAAIQAMAwsgAkEsakEANgIAIAJBvOHAgAA2AiggAkIBNwIcIAJBjOLAgAA2AhggASACQRhqEMeHgIAAIQAMAgsgAkEsakEANgIAIAJBvOHAgAA2AiggAkIBNwIcIAJB9OHAgAA2AhggASACQRhqEMeHgIAAIQAMAQsgAkEsakEANgIAIAJBvOHAgAA2AiggAkIBNwIcIAJB3OHAgAA2AhggASACQRhqEMeHgIAAIQALIAJBMGokgICAgAAgAAsUACABIAAoAgAgACgCBBDGh4CAAAsSACAAIAIgASgCDBGIgICAAAALEgAgAUGc5MCAAEECEMaHgIAACxIAIAFBnuTAgABBAxDGh4CAAAsSACABQaHkwIAAQQMQxoeAgAALYgEBfyOAgICAAEEgayIDJICAgIAAIANBEGpBCGogAkEIaigCADYCACADIAIpAgA3AxAgA0EIaiADQRBqEKqGgIAAIAAgASADKAIIQaTkwIAAEOyGgIAAIANBIGokgICAgAALVwEBfyOAgICAAEEgayICJICAgIAAIAJBEGpBCGogAUEIaigCADYCACACIAEpAgA3AxAgAkEIaiACQRBqEKuGgIAAIAAgAikDCDcCACACQSBqJICAgIAACzgBAX9BDBCshoCAACICQQhqIAFBCGooAgA2AgAgAiABKQIANwIAIABBpOTAgAA2AgQgACACNgIAC0oBAn8jgICAgABBEGsiASSAgICAACABQQhqIABBBEEAELyGgIAAAkAgASgCCCICDQAgAEEEEIiHgIAAAAsgAUEQaiSAgICAACACCwkAIABBADYCAAsJACAAQQA2AgALDABCh5z/spz3/7szCwQAQQALGQAgACgCACIAKAIAIAAoAgggARDOh4CAAAsPACAAKAIAIAEQioeAgAALEAAgACACNgIEIAAgATYCAAsgAQF/AkAgACgCBCIBRQ0AIAAoAgAgAUEBEL2GgIAACwsKACAAELSGgIAACz8AAkAgA0UNACAAQQE6AAwgACACNgIEIAAgATYCACAAIANBf2o2AggPC0GV5cCAAEEbQbDlwIAAEJGHgIAAAAsMACAAIAEpAgA3AgALEAAgACACNgIEIAAgATYCAAsEACAACxAAIAAgATYCBCAAQQA2AgALJwEBf0EBIQMCQCACQQRHDQAgACABKAAANgABQQAhAwsgACADOgAACzoAAkAgAUUNAAJAIANFDQAgASACEIGEgIAAIQIMAQsgASACEP6DgIAAIQILIAAgATYCBCAAIAI2AgALFgACQCABRQ0AIAAgASACEP+DgIAACwsQACAAIAI2AgQgACABNgIACxwAIAAgASkCADcCACAAQQhqIAFBCGooAgA2AgALHAAgACABKQIANwIAIABBCGogAUEIaikCADcCAAsNAEL0+Z7m7qOq+f4ACw0AQq2p24z/mKai+AALDABC5ZCvkKnPoaRMCx0AIAAoAgAiACgCACABIAAoAgQoAiQRiICAgAAAC0MAIAAoAgAhAAJAIAEQyIeAgAANAAJAIAEQyYeAgAANACAAIAEQ2oeAgAAPCyAAIAEQ4YeAgAAPCyAAIAEQ14eAgAALfwECfyOAgICAAEEQayICJICAgIAAIAAoAgAiACgCCCEDIAAoAgAhACACIAEQzIeAgAACQCADRQ0AA0AgAiAANgIMIAIgAkEMakHY5cCAABC4h4CAABogAEEBaiEAIANBf2oiAw0ACwsgAhC5h4CAACEAIAJBEGokgICAgAAgAAsUACAAKAIAIAAoAgQgARDSh4CAAAsPACAAKAIAIAEQyYaAgAAL5QMBAX8jgICAgABBEGsiAiSAgICAAAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAIAAtAAAOEgECAwQFBgcICQoLDA0ODxARAAELIAIgAUHk9MCAAEENEMuHgIAADBELIAIgAUGw9sCAAEEIEMuHgIAADBALIAIgAUGg9sCAAEEQEMuHgIAADA8LIAIgAUGP9sCAAEEREMuHgIAADA4LIAIgAUGA9sCAAEEPEMuHgIAADA0LIAIgAUHv9cCAAEEREMuHgIAADAwLIAIgAUHj9cCAAEEMEMuHgIAADAsLIAIgAUHa9cCAAEEJEMuHgIAADAoLIAIgAUHK9cCAAEEQEMuHgIAADAkLIAIgAUHA9cCAAEEKEMuHgIAADAgLIAIgAUGz9cCAAEENEMuHgIAADAcLIAIgAUGp9cCAAEEKEMuHgIAADAYLIAIgAUGd9cCAAEEMEMuHgIAADAULIAIgAUGS9cCAAEELEMuHgIAADAQLIAIgAUGK9cCAAEEIEMuHgIAADAMLIAIgAUGB9cCAAEEJEMuHgIAADAILIAIgAUH29MCAAEELEMuHgIAADAELIAIgAUHx9MCAAEEFEMuHgIAACyACELaHgIAAIQEgAkEQaiSAgICAACABC0MAIAAoAgAhAAJAIAEQyIeAgAANAAJAIAEQyYeAgAANACAAIAEQoIeAgAAPCyAAIAEQ4oeAgAAPCyAAIAEQ3IeAgAALPAACQCABEMiHgIAADQACQCABEMmHgIAADQAgACABEOOHgIAADwsgACABEOKHgIAADwsgACABENyHgIAACz8BAX8jgICAgABBEGsiAySAgICAACADIAE2AgwgAyAANgIIIANBCGpB/PPAgABBACACELGHgIAAEPaGgIAAAAs9AQF/AkAgAC0ABA0AQQAoAqi0wYAARQ0AIAAoAgAhARDOhoCAAA0AIAFBAToABAsgACgCACgCAEEAOgAACysAAkBBACgC2LTBgABBAUcNAEEAKALctMGAAEUPC0EAQgE3A9i0wYAAQQELAgALKgEBfwJAIAAoAgAiAUUNACAAQQRqKAIAIgBFDQAgASAAQQEQ/4OAgAALCyoBAX8CQCAAKAIEIgFFDQAgAEEIaigCACIARQ0AIAEgAEEBEP+DgIAACwsqAQF/AkAgACgCBCIBRQ0AIABBCGooAgAiAEUNACABIABBARD/g4CAAAsLHAACQCAADQBB0OjAgABBKyABEJGHgIAAAAsgAAsgAAJAIAANAEHQ6MCAAEErQcjzwIAAEJGHgIAAAAsgAAvwAgEDfyOAgICAAEEQayICJICAgIAAIAAoAgAhAAJAAkACQAJAIAFBgAFJDQAgAkEANgIMIAFBgBBJDQEgAkEMaiEDAkAgAUGAgARPDQAgAiABQT9xQYABcjoADiACIAFBDHZB4AFyOgAMIAIgAUEGdkE/cUGAAXI6AA1BAyEBDAMLIAIgAUE/cUGAAXI6AA8gAiABQRJ2QfABcjoADCACIAFBBnZBP3FBgAFyOgAOIAIgAUEMdkE/cUGAAXI6AA1BBCEBDAILAkAgACgCCCIDIABBBGooAgBHDQAgAEEBENaGgIAAIAAoAgghAwsgACgCACADaiABOgAAIAAgACgCCEEBajYCCAwCCyACIAFBP3FBgAFyOgANIAIgAUEGdkHAAXI6AAwgAkEMaiEDQQIhAQsgACABENaGgIAAIAAoAgAgAEEIaiIAKAIAIgRqIAMgARDsh4CAABogACAEIAFqNgIACyACQRBqJICAgIAAQQALxwEBAn8CQAJAAkAgAEEEaigCACICIAAoAggiA2sgAU8NACADIAFqIgEgA0kNASACQQF0IgMgASADIAFLGyIBQQggAUEISxsiA0EASA0BAkACQCAAKAIAQQAgAhsiAQ0AIANBARD+g4CAACEBDAELIAIgA0YNAAJAIAINACADQQEQ/oOAgAAhAQwBCyABIAJBASADEICEgIAAIQELIAFFDQIgACABNgIAIABBBGogAzYCAAsPCxCJh4CAAAALIANBARCIh4CAAAALdAEBfyOAgICAAEEgayICJICAgIAAIAIgACgCADYCBCACQQhqQRBqIAFBEGopAgA3AwAgAkEIakEIaiABQQhqKQIANwMAIAIgASkCADcDCCACQQRqQcDlwIAAIAJBCGoQoYeAgAAhASACQSBqJICAgIAAIAELPAEBfyAAKAIAIgAgAhDWhoCAACAAKAIAIABBCGoiACgCACIDaiABIAIQ7IeAgAAaIAAgAyACajYCAEEACxQAIAAoAgAgACgCCCABEM6HgIAAC8sBAQJ/AkACQAJAIABBBGooAgAiAiAAKAIIIgNrIAFPDQAgAyABaiIBIANJDQEgAUEASA0BAkACQAJAIAAoAgBBACACGyIDDQACQCABDQBBASEDDAMLIAFBARD+g4CAACEDDAELIAIgAUYN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IQQMCgtBoe7AgAAhA0ELIQQMCQtBjO7AgAAhA0EVIQQMCAtB9+3AgAAhA0EVIQQMBwtB4O3AgAAhA0EXIQQMBgtB1O3AgAAhA0EMIQQMBQtBy+3AgAAhA0EJIQQMBAtBwe3AgAAhA0EKIQQMAwtBrO3AgAAhA0EVIQQMAgtBnu3AgAAhAwtBDiEECyACQTxqQQE2AgAgAiAENgIcIAIgAzYCGCACQaCBgIAANgIMIAJCATcCLCACQfzvwIAANgIoIAIgAkEYajYCCCACIAJBCGo2AjggASACQShqEMeHgIAAIQAMAgsgAiAAQQRqKAIANgIEQRRBARD+g4CAACIARQ0CIAJCFDcCLCACIAA2AiggAkEoakEUENaGgIAAIAIoAiggAigCMCIDaiIAQQApALj2wIAANwAAIABBCGpBACkAwPbAgAA3AAAgAEEQakEAKADI9sCAADYAACACQQhqQQhqIANBFGo2AgAgAiACKQMoNwMIIAJBKGpBFGpBAjYCACACQSRqQaGBgIAANgIAIAJCAzcCLCACQZDwwIAANgIoIAJBooGAgAA2AhwgAiACQRhqNgI4IAIgAkEEajYCICACIAJBCGo2AhggASACQShqEMeHgIAAIQAgAigCCCIBRQ0BIAIoAgwiA0UNASABIANBARD/g4CAAAwBCyAAQQRqKAIAIgAoAgAgASAAKAIEKAIgEYiAgIAAACEACyACQcAAaiSAgICAACAADwtBFEEBEIiHgIAAAAsWACAAIAEoAgg2AgQgACABKAIANgIACxQAIAAoAgAgACgCCCABENKHgIAACxQAIAAoAgAgACgCCCABEM6HgIAACwwAIAAgARDrhoCAAAuwBAECfyOAgICAAEHAAGsiAiSAgICAAAJAAkACQAJAAkAgAC0AAA4DAQACAQsgAiAALQABOgAgIAJBMGogAUGx78CAAEEEEMuHgIAAIAJBMGogAkEgakG478CAABC1h4CAABC2h4CAACEADAILIAIgAEEEaigCADYCDCACQRBqIAFByO/AgABBAhDKh4CAACACQRBqQcrvwIAAQQQgAkEMakHQ78CAABCnh4CAACEAIAJBEDoAHyAAQeDvwIAAQQQgAkEfakG478CAABCnh4CAACEBQRRBARD+g4CAACIARQ0CIAJCFDcCNCACIAA2AjAgAkEwakEUENaGgIAA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AAALIAAgCEHolsGAABCQh4CAAAALIAAgCEHolsGAABCQh4CAAAALIAIoAgAhBSACKAIEIgYgAkEUaigCACIEIAQgBksbIgdFDQAgAigCECEEIAAgBSgCACAFKAIEIAEoAgwRioCAgAAADQIgBUEMaiECQQAhAANAIAQoAgAgA0EIaiAEQQRqKAIAEYiAgIAAAA0DIABBAWoiACAHTw0CIARBCGohBCACQXxqIQEgAigCACEKIAJBCGohAiADKAIgIAEoAgAgCiADKAIkKAIMEYqAgIAAAEUNAAwDCwtBACEHCwJAIAYgB00NACADKAIgIAUgB0EDdGoiBCgCACAEKAIEIAMoAiQoAgwRioCAgAAADQELQQAhBAwBC0EBIQQLIANBMGokgICAgAAgBAubAQEDfyOAgICAAEEgayICJICAgIAAAkACQCAAIAEQo4eAgAANACABQRxqKAIAIQMgASgCGCEEIAJBHGpBADYCACACQej5wIAANgIYIAJCATcCDCACQfyRwYAANgIIIAQgAyACQQhqEKGHgIAARQ0BCyACQSBqJICAgIAAQQEPCyAAQQRqIAEQo4eAgAAhASACQSBqJICAgIAAIAEL3QIBA38jgICAgABBgAFrIgIkgICAgAACQAJAAkACQAJAIAEoAgAiA0EQcQ0AIAAoAgAhBCADQSBxDQEgBK1BASABEN+HgIAAIQAMAgsgACgCACEEQQAhAANAIAIgAGpB/wBqIARBD3EiA0EwciADQdcAaiADQQpJGzoAACAAQX9qIQAgBEEEdiIEDQALIABBgAFqIgRBgQFPDQIgAUEBQdyUwYAAQQIgAiAAakGAAWpBACAAaxDDh4CAACEADAELQQAhAANAIAIgAGpB/wBqIARBD3EiA0EwciADQTdqIANBCkkbOgAAIABBf2ohACAEQQR2IgQNAAsgAEGAAWoiBEGBAU8NAiABQQFB3JTBgABBAiACIABqQYABakEAIABrEMOHgIAAIQALIAJBgAFqJICAgIAAIAAPCyAEQYABQcyUwYAAEJSHgIAAAAsgBEGAAUHMlMGAABCUh4CAAAALDQBCranbjP+YpqL4AAshACABKAIYQYSSwYAAQQsgAUEcaigCACgCDBGKgICAAAALIQAgASgCGEGPksGAAEEOIAFBHGooAgAoAgwRioCAgAAAC/IDAgR/An4j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IAUNAEEBIQQgBigCGEGdlMGAAEECIAZBHGooAgAoAgwRioCAgAAADQEgACgCACEGC0EBIQQgA0EBOgAXIANBNGpB9JPBgAA2AgAgAyAGKQIYNwMIIAMgA0EXajYCECAGKQIIIQcgBikCECEIIAMgBi0AIDoAOCADIAg3AyggAyAHNwMgIAMgBikCADcDGCADIANBCGo2AjAgASADQRhqIAIoAgwRiICAgAAADQAgAygCMEGTlMGAAEECIAMoAjQoAgwRioCAgAAAIQQLIAAgBDoACCAAIAAoAgRBAWo2AgQgA0HAAGokgICAgAAgAAunAQEDfyAALQAIIQECQCAAKAIEIgJFDQAgAUH/AXEhA0EBIQECQCADDQACQCACQQFHDQAgAC0ACUUNACAAKAIAIgMtAABBBHENAEEBIQEgAygCGEGglMGAAEEBIANBHGooAgAoAgwRioCAgAAADQELIAAoAgAiASgCGEGhlMGAAEEBIAFBHGooAgAoAgwRioCAgAAAIQELIAAgAToACAsgAUH/AXFBAEcL9gICA38CfiOAgICAAEHAAGsiAySAgICAAEEBIQQCQCAALQAEDQAgAC0ABSEEAkAgACgCACIFLQAAQQRxDQACQCAEQf8BcUUNAEEBIQQgBSgCGEGVlMGAAEECIAVBHGooAgAoAgwRioCAgAAADQIgACgCACEFCyABIAUgAigCDBGIgICAAAAhBAwBCwJAIARB/wFxDQBBASEEIAUoAhhBopTBgABBASAFQRxqKAIAKAIMEYqAgIAAAA0BIAAoAgAhBQtBASEEIANBAToAFyADQTRqQfSTwYAANgIAIAMgBSkCGDcDCCADIANBF2o2AhAgBSkCCCEGIAUpAhAhByADIAUtACA6ADggAyAHNwMoIAMgBjcDICADIAUpAgA3AxggAyADQQhqNgIwIAEgA0EYaiACKAIMEYiAgIAAAA0AIAMoAjBBk5TBgABBAiADKAI0KAIMEYqAgIAAACEECyAAQQE6AAUgACAEOgAEIANBwABqJICAgIAACxAAIAAgASACELeHgIAAIAALOgEBf0EBIQECQCAALQAEDQAgACgCACIAKAIYQbSUwYAAQQEgAEEcaigCACgCDBGKgICAAAAhAQsgAQuPBQEJfyOAgICAAEEQayICJICAgIAAAkACQCAAKAIIQQFGDQAgACAB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IAEgACACQRhqEKGHgIAAIQAMAQsgAiAAQQVqLQAAOgAHIAJBFGpBhoCAgAA2AgAgAiAANgIQIAJByIGAgAA2AgwgAUEcaigCACEAIAIgAkEHajYCCCABKAIYIQEgAkEsakECNgIAIAJCAjcCHCACQYSbwYAANgIYIAIgAkEIajYCKCABIAAgAkEYahChh4CAACEACyACQTBqJICAgIAAIAALEQAgADEAAEEBIAEQ34eAgAALEQAgACkDAEEBIAEQ34eAgAALqQEBA38jgICAgABBgAFrIgIkgICAgAAgACgCACEDQQAhAANAIAIgAGpB/wBqIANBD3EiBEEwciAEQdcAaiAEQQpJGzoAACAAQX9qIQAgA0EEdiIDDQALAkAgAEGAAWoiA0GBAUkNACADQYABQcyUwYAAEJSHgIAAAAsgAUEBQdyUwYAAQQIgAiAAakGAAWpBACAAaxDDh4CAACEAIAJBgAFqJICAgIAAIAAL2wEDAn8BfgF/AkAgAg0AIABBADoAASAAQQE6AAAPCwJAAkAgAS0AAEErRw0AIAJBf2oiAkUNASABQQFqIQELQQAhAwJAAkACQANAIAJFDQMgAS0AAEFQaiIEQQlLDQEgA61CCn4iBUIgiKcNAiABQQFqIQEgAkF/aiECIAWnIgYgBGoiAyAGTw0ACyAAQQI6AAEgAEEBOgAADwsgAEEBOgABIABBAToAAA8LIABBAjoAASAAQQE6AAAPCyAAQQRqIAM2AgAgAEEAOgAADwsgAEEAOgABIABBAToAAAubAgECfyOAgICAAEEQayICJICAgIAAIAIgASgCGEG4rMGAAEERIAFBHGooAgAoAgwRioCAgAAAOgAIIAIgATYCACACQQA6AAkgAkEANgIEIAIgADYCDCACIAJBDGpBqKzBgAAQtYeAgAAaIAItAAghAQJAIAIoAgQiA0UNACABQf8BcSEAQQEhAQJAIAANAAJAIANBAUcNACACLQAJQf8BcUUNACACKAIAIgAtAABBBHENAEEBIQEgACgCGEGglMGAAEEBIABBHGooAgAoAgwRioCAgAAADQELIAIoAgAiASgCGEGhlMGAAEEBIAFBHGooAgAoAgwRioCAgAAAIQELIAIgAToACAsgAkEQaiSAgICAACABQf8BcUEARwvpAgMCfwF+A38jgICAgABBMGsiAySAgICAAEEnIQQCQAJAIABCkM4AWg0AIAAhBQwBC0EnIQQDQCADQQlqIARqIgZBfGogACAAQpDOAIAiBUKQzgB+faciB0H//wNxQeQAbiIIQQF0Qd6UwYAAai8AADsAACAGQX5qIAcgCEHkAGxrQf//A3FBAXRB3pTBgABqLwAAOwAAIARBfGohBCAAQv/B1y9WIQYgBSEAIAYNAAsLAkAgBaciBkHjAEwNACADQQlqIARBfmoiBGogBaciBiAGQf//A3FB5ABuIgZB5ABsa0H//wNxQQF0Qd6UwYAAai8AADsAAAsCQAJAIAZBCkgNACADQQlqIARBfmoiBGogBkEBdEHelMGAAGovAAA7AAAMAQsgA0EJaiAEQX9qIgRqIAZBMGo6AAALIAIgAUHo+cCAAEEAIANBCWogBGpBJyAEaxDDh4CAACEEIANBMGokgICAgAAgBAtKAgF/AXwgAS0AAEEBdEECcSECIAArAwAhAwJAIAEoAhBBAUYNACABIAMgAkEAELyHgIAADwsgASADIAIgAUEUaigCABC7h4CAAAurAQEDfyOAgICAAEGAAWsiAiSAgICAACAALQAAIQNBACEAA0AgAiAAakH/AGogA0EPcSIEQTByIARBN2ogBEEKSRs6AAAgAEF/aiEAIANBBHZBD3EiAw0ACwJAIABBgAFqIgNBgQFJDQAgA0GAAUHMlMGAABCUh4CAAAALIAFBAUHclMGAAEECIAIgAGpBgAFqQQAgAGsQw4eAgAAhACACQYABaiSAgICAACAAC6gBAQN/I4CAgIAAQYABayICJICAgIAAIAAoAgAhA0EAIQADQCACIABqQf8AaiADQQ9xIgRBMHIgBEE3aiAEQQpJGzoAACAAQX9qIQAgA0EEdiIDDQALAkAgAEGAAWoiA0GBAUkNACADQYABQcyUwYAAEJSHgIAAAAsgAUEBQdyUwYAAQQIgAiAAakGAAWpBACAAaxDDh4CAACEAIAJBgAFqJICAgIAAIAALKQEBfiAAKAIAIgCsIgIgAkI/hyICfCAChSAAQX9zQR92IAEQ34eAgAALIwECfiAAKQMAIgIgAkI/hyIDfCADhSACQn9VIAEQ34eAgAALIQAgASgCGEHRrMGAAEEFIAFBHGooAgAoAgwRioCAgAAAC+4CAQN/I4CAgIAAQYABayICJICAgIAAIAAoAgAhAAJAAkACQAJAAkAgASgCACIDQRBxDQAgAC0AACEEIANBIHENASAErUL/AYNBASABEN+HgIAAIQAMAgsgAC0AACEEQQAhAANAIAIgAGpB/wBqIARBD3EiA0EwciADQdcAaiADQQpJGzoAACAAQX9qIQAgBEEEdkEPcSIEDQALIABBgAFqIgRBgQFPDQIgAUEBQdyUwYAAQQIgAiAAakGAAWpBACAAaxDDh4CAACEADAELQQAhAANAIAIgAGpB/wBqIARBD3EiA0EwciADQTdqIANBCkkbOgAAIABBf2ohACAEQQR2QQ9xIgQNAAsgAEGAAWoiBEGBAU8NAiABQQFB3JTBgABBAiACIABqQYABakEAIABrEMOHgIAAIQALIAJBgAFqJICAgIAAIAAPCyAEQYABQcyUwYAAEJSHgIAAAAsgBEGAAUHMlMGAABCUh4CAAAAL2gIBAn8jgICAgABBEGsiAiSAgICAAAJAAkAgACgCACIALQAAQQFHDQAgAiABKAIYQcmswYAAQQQgAUEcaigCACgCDBGKgICAAAA6AAggAiABNgIAIAJBADoACSACQQA2AgQgAiAAQQFqNgIMIAIgAkEMakGklMGAABC1h4CAABogAi0ACCEBAkAgAigCBCIDRQ0AIAFB/wFxIQBBASEBAkAgAA0AAkAgA0EBRw0AIAItAAlB/wFxRQ0AIAIoAgAiAC0AAEEEcQ0AQQEhASAAKAIYQaCUwYAAQQEgAEEcaigCACgCDBGKgICAAAANAQsgAigCACIBKAIYQaGUwYAAQQEgAUEcaigCACgCDBGKgICAAAAhAQsgAiABOgAICyABQf8BcUEARyEBDAELIAEoAhhBzazBgABBBCABQRxqKAIAKAIMEYqAgIAAACEBCyACQRBqJICAgIAAIAELDwAgACgCACABEKOHgIAACxIAIAFB0ZfBgABBAhCVh4CAAAumAgECfyOAgICAAEEQayICJICAgIAAIAEoAhhB1qzBgABBCSABQRxqKAIAKAIMEYqAgIAAACEDIAJBADoABSACIAM6AAQgAiABNgIAIAIgADYCDCACQd+swYAAQQsgAkEMakGYrMGAABCnh4CAABogAiAAQQRqNgIMIAJB6qzBgABBCSACQQxqQfSswYAAEKeHgIAAGiACLQAEIQECQCACLQAFRQ0AIAFB/wFxIQBBASEBAkAgAA0AIAIoAgAiAUEcaigCACgCDCEAIAEoAhghAwJAIAEtAABBBHENACADQZuUwYAAQQIgABGKgICAAAAhAQwBCyADQZqUwYAAQQEgABGKgICAAAAhAQsgAiABOgAECyACQRBqJICAgIAAIAFB/wFxQQBHC4ACAQJ/I4CAgIAAQRBrIgIkgICAgAAgASgCGEGxs8GAAEEJIAFBHGooAgAoAgwRioCAgAAAIQMgAkEAOgAFIAIgAzoABCACIAE2AgAgAiAANgIMIAJBurPBgABBByACQQxqQaiswYAAEKeHgIAAGiACLQAEIQECQCACLQAFRQ0AIAFB/wFxIQBBASEBAkAgAA0AIAIoAgAiAUEcaigCACgCDCEAIAEoAhghAwJAIAEtAABBBHENACADQZuUwYAAQQIgABGKgICAAAAhAQwBCyADQZqUwYAAQQEgABGKgICAAAAhAQsgAiABOgAECyACQRBqJICAgIAAIAFB/wFxQQBHCzYBAX8CQCACRQ0AIAAhAwNAIAMgAS0AADoAACABQQFqIQEgA0EBaiEDIAJBf2oiAg0ACwsgAAtxAQF/AkACQCABIABJDQAgAkUNASAAIQMDQCADIAEtAAA6AAAgAUEBaiEBIANBAWohAyACQX9qIgINAAwCCwsgAkUNACABQX9qIQEgAEF/aiEDA0AgAyACaiABIAJqLQAAOgAAIAJBf2oiAg0ACwsgAAssAQF/AkAgAkUNACAAIQMDQCADIAE6AAAgA0EBaiEDIAJBf2oiAg0ACwsgAAtKAQN/QQAhAwJAIAJFDQACQANAIAAtAAAiBCABLQAAIgVHDQEgAEEBaiEAIAFBAWohASACQX9qIgJFDQIMAAsLIAQgBWshAwsgAwsL3LMBAgBBgIDAAAvBswFhbHNlcnVldWxsaW50ZXJuYWwgZXJyb3I6IGVudGVyZWQgdW5yZWFjaGFibGUgY29kZS9ydXN0Yy8wNDQ4OGFmZTM0NTEyYWE0YzMzNTY2ZWIxNmQ4YzkxMmEzYWUwNGY5L3NyYy9saWJzdGQvbWFjcm9zLnJzAAAyABAARAAAAA0AAAAXAAAACQAAAAAAAAABAAAACgAAAAsAAAAAAAAAAQAAAAwAAAANAAAAAAAAAAEAAAAOAAAAfSJbeyxcdFxyXG5cZlxiXFxcIjpdbm8gZW50cnkgZm91bmQgZm9yIGtleVVuaWZvcm1TYW1wbGVyOjpzYW1wbGVfc2luZ2xlOiBsb3cgPj0gaGlnaC9Vc2Vycy9teWtsZS8uY2FyZ28vcmVnaXN0cnkvc3JjL2dpdGh1Yi5jb20tMWVjYzYyOTlkYjllYzgyMy9yYW5kX2NoYWNoYS0wLjIuMi9zcmMvZ3V0cy5ycwANARAAWgAAANYAAAAZAAAADQEQAFoAAADYAAAALAAAAA0BEABaAAAA2QAAACwAAAANARAAWgAAAJEAAAAnAAAADQEQAFoAAACSAAAAKAAAAA0BEABaAAAAkwAAACgAAAANARAAWgAAAJQAAAAoAAAADwAAABAAAAAEAAAABAAAABEAAAASAAAAL3J1c3RjLzA0NDg4YWZlMzQ1MTJhYTRjMzM1NjZlYjE2ZDhjOTEyYTNhZTA0Zjkvc3JjL2xpYnN0ZC9zeW5jL29uY2UucnMA8AEQAEcAAAAIAQAAMgAAAEgCEAAAAAAAYSBEaXNwbGF5IGltcGxlbWVudGF0aW9uIHJldHVybmVkIGFuIGVycm9yIHVuZXhwZWN0ZWRseS9ydXN0Yy8wNDQ4OGFmZTM0NTEyYWE0YzMzNTY2ZWIxNmQ4YzkxMmEzYWUwNGY5L3NyYy9saWJhbGxvYy9zdHJpbmcucnMAAACHAhAARgAAAMMIAAAOAAAAL3J1c3RjLzA0NDg4YWZlMzQ1MTJhYTRjMzM1NjZlYjE2ZDhjOTEyYTNhZTA0Zjkvc3JjL2xpYmNvcmUvc3RyL21vZC5ycwAA4AIQAEYAAACWBwAALwAAAOACEABGAAAALwgAAC8AAABhc3NlcnRpb24gZmFpbGVkOiBgKGxlZnQgPT0gcmlnaHQpYAogIGxlZnQ6IGBgLAogcmlnaHQ6IGBgAABIAxAALQAAAHUDEAAMAAAAgQMQAAEAAAAvcnVzdGMvMDQ0ODhhZmUzNDUxMmFhNGMzMzU2NmViMTZkOGM5MTJhM2FlMDRmOS9zcmMvbGliY29yZS9tYWNyb3MvbW9kLnJzAAAAnAMQAEkAAAAQAAAACQAAAJwDEABJAAAACgAAAAkAAAAvcnVzdGMvMDQ0ODhhZmUzNDUxMmFhNGMzMzU2NmViMTZkOGM5MTJhM2FlMDRmOS9zcmMvbGliY29yZS9hbGxvYy9sYXlvdXQucnMACAQQAEsAAADoAAAAOQAAAGFzc2VydGlvbiBmYWlsZWQ6IG1pZCA8PSBsZW5jYWxsZWQgYE9wdGlvbjo6dW53cmFwKClgIG9uIGEgYE5vbmVgIHZhbHVlABMAAAAEAAAABAAAABQAAAAVAAAACAAAAAQAAAAWAAAAFwAAAAAAAAABAAAAGAAAAGNhbGxlZCBgUmVzdWx0Ojp1bndyYXAoKWAgb24gYW4gYEVycmAgdmFsdWUAGQAAAAAAAAABAAAAGgAAABsAAAAAAAAAAQAAABwAAABVbmV4cGVjdGVkIGxlbmd0aCBvZiBpbnB1dC9Vc2Vycy9teWtsZS8uY2FyZ28vcmVnaXN0cnkvc3JjL2dpdGh1Yi5jb20tMWVjYzYyOTlkYjllYzgyMy9ib3JzaC0wLjcuMS9zcmMvZGUvbW9kLnJzQgUQAFYAAAA0AAAAEQAAAEIFEABWAAAASQAAADAAAABCBRAAVgAAAEkAAABVAAAAQgUQAFYAAABKAAAAGQAAAE5vdCBhbGwgYnl0ZXMgcmVhZGludmFsaWQgdmFsdWU6ICwgZXhwZWN0ZWQg6gUQAA8AAAD5BRAACwAAAG1pc3NpbmcgZmllbGQgYAAUBhAADwAAAIEDEAABAAAAaW52YWxpZCBsZW5ndGggADQGEAAPAAAA+QUQAAsAAABkdXBsaWNhdGUgZmllbGQgYAAAAFQGEAARAAAAgQMQAAEAAABCBRAAVgAAAOoAAAAaAAAAQgUQAFYAAADrAAAAFQAAAC9Vc2Vycy9teWtsZS8uY2FyZ28vcmVnaXN0cnkvc3JjL2dpdGh1Yi5jb20tMWVjYzYyOTlkYjllYzgyMy9yYW5kX2NvcmUtMC41LjEvc3JjL2Jsb2NrLnJzAAAAmAYQAFkAAAC1AAAAFQAAAJgGEABZAAAA1AAAAB8AAACYBhAAWQAAANYAAAAfAAAAmAYQAFkAAADAAAAAJwAAADAwMDEwMjAzMDQwNTA2MDcwODA5MTAxMTEyMTMxNDE1MTYxNzE4MTkyMDIxMjIyMzI0MjUyNjI3MjgyOTMwMzEzMjMzMzQzNTM2MzczODM5NDA0MTQyNDM0NDQ1NDY0NzQ4NDk1MDUxNTI1MzU0NTU1NjU3NTg1OTYwNjE2MjYzNjQ2NTY2Njc2ODY5NzA3MTcyNzM3NDc1NzY3Nzc4Nzk4MDgxODI4Mzg0ODU4Njg3ODg4OTkwOTE5MjkzOTQ5NTk2OTc5ODk5AAAAAAAAAAAQAAAAVGhlIGNvbGxlY3Rpb24gaXMgYW4gaW5jb25zaXN0ZW50IHN0YXRlLiBEaWQgcHJldmlvdXMgc21hcnQgY29udHJhY3QgZXhlY3V0aW9uIHRlcm1pbmF0ZSB1bmV4cGVjdGVkbHk/Q2Fubm90IHNlcmlhbGl6ZSBrZXkgd2l0aCBCb3JzaENhbm5vdCBzZXJpYWxpemUgdmFsdWUgd2l0aCBCb3JzaENhbm5vdCBkZXNlcmlhbGl6ZSB2YWx1ZSB3aXRoIEJvcnNoQ2Fubm90IHNlcmlhbGl6ZSBlbGVtZW50IHdpdGggQm9yc2hJbmRleCBvdXQgb2YgYm91bmRzY2hlY2tlZCBgaW5kZXggPCBsZW5gIGFib3ZlLCBzbyBgbGVuID4gMGAvVXNlcnMvbXlrbGUvLmNhcmdvL3JlZ2lzdHJ5L3NyYy9naXRodWIuY29tLTFlY2M2Mjk5ZGI5ZWM4MjMvbmVhci1zZGstMi4wLjAvc3JjL2NvbGxlY3Rpb25zL3ZlY3Rvci5ycwAAADAJEABlAAAASwAAADEAAABDYW5ub3QgZGVzZXJpYWxpemUgZWxlbWVudFNUQVRFQ2Fubm90IGRlc2VyaWFsaXplIHRoZSBjb250cmFjdCBzdGF0ZS4vVXNlcnMvbXlrbGUvLmNhcmdvL3JlZ2lzdHJ5L3NyYy9naXRodWIuY29tLTFlY2M2Mjk5ZGI5ZWM4MjMvbmVhci1zZGstMi4wLjAvc3JjL2Vudmlyb25tZW50L2Vudi5ycwDtCRAAYgAAACEDAAAuAAAAQ2Fubm90IHNlcmlhbGl6ZSB0aGUgY29udHJhY3Qgc3RhdGUu7QkQAGIAAAAlAwAAIwAAAB0AAAAAAAAAAQAAAB4AAAAfAAAAAAAAAAEAAAAgAAAAIQAAAAAAAAABAAAAIgAAACMAAAAAAAAAAQAAACQAAAAlAAAAAAAAAAEAAAAmAAAAJwAAAAAAAAABAAAAKAAAACkAAAAAAAAAAQAAACoAAAArAAAAAAAAAAEAAAAsAAAALQAAAAAAAAABAAAALgAAAGFzc2VydGlvbiBmYWlsZWQ6IGluZGV4IDwgc2VsZi5yZXN1bHRzLmFzX3JlZigpLmxlbigpdG9rZW4tYmVsb25ncy10b2FjY291bnQtb3duc2dpdmVzLWFjY2Vzc293bmVyLXRva2Vucy1zZXRUb2tlbiBJRCBhbHJlYWR5IGV4aXN0cy5Vbmtub3duIHZlZ2dpZSB0eXBlLmA6IEgDEAAtAAAAdQMQAAwAAAC9CxAAAwAAAE9ubHkgY29udHJhY3Qgb3duZXIgY2FuIGNhbGwgdGhpcyBtZXRob2QuAAAA2AsQACkAAABzcmMvbGliLnJzAAAMDBAACgAAAMEAAAAJAAAADAwQAAoAAADbAAAAHQAAAAwMEAAKAAAA3AAAABgAAABUQkRwbGFudGFyeSBzaG91bGQgYmUgaW5pdGlhbGl6ZWQgYmVmb3JlIHVzYWdlAAAMDBAACgAAAPwAAAAJAAAAaHR0cHM6Ly92d2FucDdybjMycmlvcTZvZmN2Z2xvNTJzZ2RyY3RjZmtjNHY3dWl5N2JiaW10emlqejNxLmFyd2VhdmUubmV0L3JZRFhfaTNlb29kRHppaXFaYnU2a1ljUlRFVlF1Vl9SR1BoQ2hrOG9UbmNodHRwczovLzNidmRyeWZkbTNzc3dldm12cjNwb2thMnVjZGE1ZGZxYWczYno0dGQ3MmFmZmN0Ym1hZWEuYXJ3ZWF2ZS5uZXQvMkdvNDRLTm01U3NTckt4Mjl5Z2FvSVlPakxBQnRoenlZXzZBVW9waFlBZ2h0dHBzOi8vcnNpZ2ZwbnkzajN1d29oeGZlbzd0ZGtkdnc2eWhhZWZ4dDZkM3VxN2thanRwYXF0ZGZ3cS5hcndlYXZlLm5ldC9qSkJpdmJqYWQwczQ5eWtkLVkxRHJiMkRnSVc4X0QzU0gxQVRONElUR1cwaHR0cHM6Ly9hcndlYXZlLm5ldC9mby0tV2xoODNLYTgzelZRcWxpaXdGcV80emJjMUg3dnJaTmx2QV9Ha2VraHR0cHM6Ly9yajMydWtoY3E0aGRxN251eDNybnRwNWZmZGszZmYya3pqY2FscHkzbWM3YmF0anl0b3phLmFyd2VhdmUubmV0L2luZXFLT0tIRGpoOXRMN2kyYi1sS05XeWwwcktSQVdfRzJDLUVFMDRtN0lodHRwczovL2IyempsZjJ6cGxqNXdlMmJkYXI2cDZzbXUzbzZmZHU3bzdlZDIzdGFrdDYzbGNrNnBlb3EuYXJ3ZWF2ZS5uZXQvRHJLVmwxbDYwOXNUUVJnajVfcE1wdDNpanA5M3lEMXVZRlQ5dFlsZWVSMHZpZHZ0eXBldnN1YnR5cGVwYXJlbnRkbmFtZXRhX3VybAwMEAAKAAAAWgAAACUAAABWZWdnaWUgZG9lcyBub3QgZXhpc3QuAAAMDBAACgAAAJ0AAAAJAAAAbm9uLXBsYW50IGhhcnZlc3QAAAAvAAAAAAAAAAEAAAAwAAAAMQAAADIAAAAzAAAANAAAADUAAAA2AAAANwAAADgAAAA5AAAAOgAAADsAAAA8AAAAPQAAAD4AAAA/AAAAQAAAAEEAAABCAAAAQwAAAEQAAABFAAAARgAAAEcAAABIAAAASQAAAEoAAABLAAAATAAAAE0AAABOAAAATwAAAFAAAABRAAAAUgAAAFMAAABUAAAAVQAAAFYAAABXAAAAWAAAAFkAAABaAAAAWwAAAFwAAABdAAAAXgAAAF8AAABgAAAAYQAAAEV4cGVjdGVkIGlucHV0IHNpbmNlIG1ldGhvZCBoYXMgYXJndW1lbnRzLgAADAwQAAoAAABMAAAAAQAAAEZhaWxlZCB0byBkZXNlcmlhbGl6ZSBpbnB1dCBmcm9tIEpTT04uRmFpbGVkIHRvIHNlcmlhbGl6ZSB0aGUgcmV0dXJuIHZhbHVlIHVzaW5nIEpTT04uTWV0aG9kIGRvZXNuJ3QgYWNjZXB0IGRlcG9zaXRvd25lcl9pZHN0cnVjdCBJbnB1dHN0cnVjdCBJbnB1dCB3aXRoIDIgZWxlbWVudHMADxEQABwAAABiAAAACAAAAAQAAABjAAAAc3RydWN0IElucHV0IHdpdGggMSBlbGVtZW50AEQREAAbAAAAcGFnZV9zaXplcGFnZXN0cnVjdCBJbnB1dCB3aXRoIDQgZWxlbWVudHMAAAB1ERAAHAAAAHBhcmVudF9pZE93bmVyJ3MgYWNjb3VudCBJRCBpcyBpbnZhbGlkLgAMDBAACgAAAAUBAAAJAAAAQWxyZWFkeSBpbml0aWFsaXplZAAMDBAACgAAAAYBAAAJAAAAdmVnZ2llcwAMDBAACgAAAAEBAAABAAAAL3J1c3RjLzA0NDg4YWZlMzQ1MTJhYTRjMzM1NjZlYjE2ZDhjOTEyYTNhZTA0Zjkvc3JjL2xpYmNvcmUvbWFjcm9zL21vZC5yc2Fzc2VydGlvbiBmYWlsZWQ6IGAobGVmdCA9PSByaWdodClgCiAgbGVmdDogYGAsCiByaWdodDogYGA6IAAAAFkSEAAtAAAAhhIQAAwAAACSEhAAAwAAAGRlc3RpbmF0aW9uIGFuZCBzb3VyY2Ugc2xpY2VzIGhhdmUgZGlmZmVyZW50IGxlbmd0aHOwEhAANAAAABASEABJAAAAEAAAAAkAAAAvVXNlcnMvbXlrbGUvLmNhcmdvL3JlZ2lzdHJ5L3NyYy9naXRodWIuY29tLTFlY2M2Mjk5ZGI5ZWM4MjMvcmFuZF9jb3JlLTAuNS4xL3NyYy9pbXBscy5ycwAAAPwSEABZAAAANAAAAB8AAAD8EhAAWQAAADcAAAAfAAAABAAAAGFzc2VydGlvbiBmYWlsZWQ6IGAobGVmdCA9PSByaWdodClgCiAgbGVmdDogYGAsCiByaWdodDogYGAAAHwTEAAtAAAAqRMQAAwAAAC1ExAAAQAAAC9Vc2Vycy9teWtsZS8uY2FyZ28vcmVnaXN0cnkvc3JjL2dpdGh1Yi5jb20tMWVjYzYyOTlkYjllYzgyMy9yYW5kX2NoYWNoYS0wLjIuMi9zcmMvZ3V0cy5ycwAA0BMQAFoAAADIAAAABQAAAGNhbm5vdCBhY2Nlc3MgYSBUaHJlYWQgTG9jYWwgU3RvcmFnZSB2YWx1ZSBkdXJpbmcgb3IgYWZ0ZXIgZGVzdHJ1Y3Rpb24vcnVzdGMvMDQ0ODhhZmUzNDUxMmFhNGMzMzU2NmViMTZkOGM5MTJhM2FlMDRmOS9zcmMvbGlic3RkL3RocmVhZC9sb2NhbC5yc4IUEABKAAAA7wAAABoAAADcFBAAAAAAAGEgRGlzcGxheSBpbXBsZW1lbnRhdGlvbiByZXR1cm5lZCBhbiBlcnJvciB1bmV4cGVjdGVkbHkvcnVzdGMvMDQ0ODhhZmUzNDUxMmFhNGMzMzU2NmViMTZkOGM5MTJhM2FlMDRmOS9zcmMvbGliYWxsb2Mvc3RyaW5nLnJzAAAAGxUQAEYAAADDCAAADgAAAGFscmVhZHkgYm9ycm93ZWQvcnVzdGMvMDQ0ODhhZmUzNDUxMmFhNGMzMzU2NmViMTZkOGM5MTJhM2FlMDRmOS9zcmMvbGliY29yZS9jZWxsLnJzAIQVEABDAAAAYwMAAB8AAABhbHJlYWR5IG11dGFibHkgYm9ycm93ZWSEFRAAQwAAABgDAAAbAAAAZwAAAAAAAAABAAAAaAAAAGkAAAAAAAAAAQAAAGoAAABrAAAAAAAAAAEAAAAYAAAAbAAAAAAAAAABAAAAbQAAAGNhbGxlZCBgUmVzdWx0Ojp1bndyYXAoKWAgb24gYW4gYEVycmAgdmFsdWUAbgAAABQAAAAEAAAAbwAAAHAAAABxAAAAAAAAAAEAAAByAAAAcwAAAHQAAABCbG9ja2NoYWluIGludGVyZmFjZSBub3Qgc2V0Li9Vc2Vycy9teWtsZS8uY2FyZ28vcmVnaXN0cnkvc3JjL2dpdGh1Yi5jb20tMWVjYzYyOTlkYjllYzgyMy9uZWFyLXNkay0yLjAuMC9zcmMvZW52aXJvbm1lbnQvZW52LnJzALUWEABiAAAAhQAAAA4AAAC1FhAAYgAAAI4AAAAdAAAAUmVnaXN0ZXIgd2FzIGV4cGVjdGVkIHRvIGhhdmUgZGF0YSBiZWNhdXNlIHdlIGp1c3Qgd3JvdGUgaXQgaW50byBpdC61FhAAYgAAAK0AAAAXAAAAtRYQAGIAAACtAAAARgAAALUWEABiAAAAsgAAAAUAAAC1FhAAYgAAAP4AAAASAAAAtRYQAGIAAAAaAQAABQAAAFVuZXhwZWN0ZWQgcmV0dXJuIGNvZGUuALUWEABiAAAApwIAABIAAABpbnRlcm5hbCBlcnJvcjogZW50ZXJlZCB1bnJlYWNoYWJsZSBjb2RltRYQAGIAAAC2AgAABQAAALUWEABiAAAAsgIAABIAAAC1FhAAYgAAANcCAAAOAAAAtRYQAGIAAADMAgAAIQAAALUWEABiAAAA5wIAAA4AAAC1FhAAYgAAAOYCAAA1AAAAtRYQAGIAAADeAgAAIQAAALUWEABiAAAA+AIAAA4AAAC1FhAAYgAAAO8CAAAhAAAAtRYQAGIAAAALAwAADgAAALUWEABiAAAABQMAABIAAABTVEFURQAAAHUAAAAAAAAAAQAAAHYAAAB3AAAAeAAAAH0AAAAMAAAABAAAAH4AAAB/AAAAgAAAAIEAAACCAAAAgwAAAIQAAABjYW5ub3QgYWNjZXNzIGEgVGhyZWFkIExvY2FsIFN0b3JhZ2UgdmFsdWUgZHVyaW5nIG9yIGFmdGVyIGRlc3RydWN0aW9uL3J1c3RjLzA0NDg4YWZlMzQ1MTJhYTRjMzM1NjZlYjE2ZDhjOTEyYTNhZTA0Zjkvc3JjL2xpYnN0ZC90aHJlYWQvbG9jYWwucnNaGRAASgAAAO8AAAAaAAAAtBkQAAAAAABhIERpc3BsYXkgaW1wbGVtZW50YXRpb24gcmV0dXJuZWQgYW4gZXJyb3IgdW5leHBlY3RlZGx5L3J1c3RjLzA0NDg4YWZlMzQ1MTJhYTRjMzM1NjZlYjE2ZDhjOTEyYTNhZTA0Zjkvc3JjL2xpYmFsbG9jL3N0cmluZy5ycwAAAPMZEABGAAAAwwgAAA4AAACFAAAABAAAAAQAAACGAAAAhwAAAIgAAAAvcnVzdGMvMDQ0ODhhZmUzNDUxMmFhNGMzMzU2NmViMTZkOGM5MTJhM2FlMDRmOS9zcmMvbGliY29yZS9tYWNyb3MvbW9kLnJzAAAAZBoQAEkAAAAKAAAACQAAAC9ydXN0Yy8wNDQ4OGFmZTM0NTEyYWE0YzMzNTY2ZWIxNmQ4YzkxMmEzYWUwNGY5L3NyYy9saWJjb3JlL3N0ci9tb2QucnMAAMAaEABGAAAAlgcAAC8AAADAGhAARgAAAOIHAAAvAAAAwBoQAEYAAAAvCAAALwAAAC9ydXN0Yy8wNDQ4OGFmZTM0NTEyYWE0YzMzNTY2ZWIxNmQ4YzkxMmEzYWUwNGY5L3NyYy9saWJjb3JlL3N0ci9wYXR0ZXJuLnJzAAA4GxAASgAAAIsFAAAUAAAAOBsQAEoAAACLBQAAIQAAADgbEABKAAAAlwUAABQAAAA4GxAASgAAAJcFAAAhAAAAZBoQAEkAAAAQAAAACQAAAC9ydXN0Yy8wNDQ4OGFmZTM0NTEyYWE0YzMzNTY2ZWIxNmQ4YzkxMmEzYWUwNGY5L3NyYy9saWJjb3JlL2FsbG9jL2xheW91dC5ycwDUGxAASwAAAOgAAAA5AAAAL3J1c3RjLzA0NDg4YWZlMzQ1MTJhYTRjMzM1NjZlYjE2ZDhjOTEyYTNhZTA0Zjkvc3JjL2xpYmNvcmUvc2xpY2UvbW9kLnJzMBwQAEgAAACYBQAAJwAAAGFzc2VydGlvbiBmYWlsZWQ6IGAobGVmdCA9PSByaWdodClgCiAgbGVmdDogYGAsCiByaWdodDogYGA6IIgcEAAtAAAAtRwQAAwAAADBHBAAAwAAAGRlc3RpbmF0aW9uIGFuZCBzb3VyY2Ugc2xpY2VzIGhhdmUg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AuYDhXtGjSuD30S6e0w4+7ELa/B7XwZ6ns6FJHz2hxhGQqdZfPpUz2uJCJB8OCrDxqsKxHzH9HO4Vg35fPjxkGasUC99O5cawGuSY30KPSGwBneYfUyMKVzIlM59sPeZOf0cA36cdQCIPOQ3fgOTAKpL3W1+4ltASk+qon7actAc41TXfpCPBOQbKg1/utmCblE6Qn8pkCPK5ch2fzN0rDwfe6x/oMjrhfPM4X9yZWN1cnNpb24gbGltaXQgZXhjZWVkZWR1bmV4cGVjdGVkIGVuZCBvZiBoZXggZXNjYXBldHJhaWxpbmcgY2hhcmFjdGVyc3RyYWlsaW5nIGNvbW1hbG9uZSBsZWFkaW5nIHN1cnJvZ2F0ZSBpbiBoZXggZXNjYXBla2V5IG11c3QgYmUgYSBzdHJpbmdjb250cm9sIGNoYXJhY3RlciAoXHUwMDAwLVx1MDAxRikgZm91bmQgd2hpbGUgcGFyc2luZyBhIHN0cmluZ2ludmFsaWQgdW5pY29kZSBjb2RlIHBvaW50bnVtYmVyIG91dCBvZiByYW5nZWludmFsaWQgbnVtYmVyaW52YWxpZCBlc2NhcGVleHBlY3RlZCB2YWx1ZWV4cGVjdGVkIGlkZW50ZXhwZWN0ZWQgYCxgIG9yIGB9YGV4cGVjdGVkIGAsYCBvciBgXWBleHBlY3RlZCBgOmBFT0Ygd2hpbGUgcGFyc2luZyBhIHZhbHVlRU9GIHdoaWxlIHBhcnNpbmcgYSBzdHJpbmdFT0Ygd2hpbGUgcGFyc2luZyBhbiBvYmplY3RFT0Ygd2hpbGUgcGFyc2luZyBhIGxpc3QgYXQgbGluZSAgY29sdW1uIEVycm9yKCwgbGluZTogLCBjb2x1bW46ICkAABEqEAAGAAAAFyoQAAgAAAAfKhAACgAAACkqEAABAAAAaW52YWxpZCB0eXBlOiAsIGV4cGVjdGVkIAAAAEwqEAAOAAAAWioQAAsAAABpbnZhbGlkIHR5cGU6IG51bGwsIGV4cGVjdGVkIAAAAHgqEAAdAAAAMDEyMzQ1Njc4OWFiY2RlZnV1dXV1dXV1YnRudWZydXV1dXV1dXV1dXV1dXV1dXV1AAAiAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAXAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvVXNlcnMvbXlrbGUvLmNhcmdvL3JlZ2lzdHJ5L3NyYy9naXRodWIuY29tLTFlY2M2Mjk5ZGI5ZWM4MjMvc2VyZGVfanNvbi0xLjAuNTcvc3JjL3JlYWQucnMAALArEABaAAAAmgEAABQAAACwKxAAWgAAAL8BAAATAAAAsCsQAFoAAADOAQAAMAAAALArEABaAAAAxAEAACkAAACwKxAAWgAAAMgBAAA0AAAAsCsQAFoAAAAfAgAAEwAAALArEABaAAAANwIAACUAAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////////////////////////////////////////////////////////////////AAECAwQFBgcICf////////8KCwwNDg///////////////////////////////////woLDA0OD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////y9ydXN0Yy8wNDQ4OGFmZTM0NTEyYWE0YzMzNTY2ZWIxNmQ4YzkxMmEzYWUwNGY5L3NyYy9saWJjb3JlL2FsbG9jL2xheW91dC5ycwB8LhAASwAAAOgAAAA5AAAAY2FsbGVkIGBSZXN1bHQ6OnVud3JhcCgpYCBvbiBhbiBgRXJyYCB2YWx1ZQCMAAAAAAAAAAEAAAAaAAAAYXNzZXJ0aW9uIGZhaWxlZDogYChsZWZ0ID09IHJpZ2h0KWAKICBsZWZ0OiBgYCwKIHJpZ2h0OiBgYDogFC8QAC0AAABBLxAADAAAAE0vEAADAAAAZGVzdGluYXRpb24gYW5kIHNvdXJjZSBzbGljZXMgaGF2ZSBkaWZmZXJlbnQgbGVuZ3Roc2gvEAA0AAAAL3J1c3RjLzA0NDg4YWZlMzQ1MTJhYTRjMzM1NjZlYjE2ZDhjOTEyYTNhZTA0Zjkvc3JjL2xpYmNvcmUvbWFjcm9zL21vZC5ycwAAAKQvEABJAAAAEAAAAAkAAACOAAAACAAAAAQAAACPAAAAkAAAAJEAAAAIAAAABAAAAJIAAAAvcnVzdGMvMDQ0ODhhZmUzNDUxMmFhNGMzMzU2NmViMTZkOGM5MTJhM2FlMDRmOS9zcmMvbGliY29yZS9hbGxvYy9sYXlvdXQucnMAJDAQAEsAAADoAAAAOQAAAGNhbGxlZCBgUmVzdWx0Ojp1bndyYXAoKWAgb24gYW4gYEVycmAgdmFsdWUAkwAAAAAAAAABAAAAGgAAAGEgc3RyaW5nYnl0ZSBhcnJheXN0cnVjdCB2YXJpYW50zjAQAA4AAAB0dXBsZSB2YXJpYW50AAAA5DAQAA0AAABuZXd0eXBlIHZhcmlhbnQA/DAQAA8AAAB1bml0IHZhcmlhbnQUMRAADAAAAGVudW0oMRAABAAAAG1hcAA0MRAAAwAAAHNlcXVlbmNlQDEQAAgAAABuZXd0eXBlIHN0cnVjdAAAUDEQAA4AAABPcHRpb24gdmFsdWVoMRAADAAAAHVuaXQgdmFsdWUAAHwxEAAKAAAAxDAQAAoAAABzdHJpbmcgAJgxEAAHAAAAY2hhcmFjdGVyIGBgqDEQAAsAAACzMRAAAQAAAGZsb2F0aW5nIHBvaW50IGDEMRAAEAAAALMxEAABAAAAaW50ZWdlciBgAAAA5DEQAAkAAACzMRAAAQAAAGJvb2xlYW4gYAAAAAAyEAAJAAAAszEQAAEAAAB1OHUxNnU2NJoAAAAMAAAABAAAAJsAAACcAAAAnQAAAIEAAACeAAAAgwAAAIQAAAAvcnVzdGMvMDQ0ODhhZmUzNDUxMmFhNGMzMzU2NmViMTZkOGM5MTJhM2FlMDRmOS9zcmMvbGliY29yZS9tYWNyb3MvbW9kLnJzYXNzZXJ0aW9uIGZhaWxlZDogc3RlcCAhPSAwTDIQAEkAAAAKAAAACQAAAKQAAAAEAAAABAAAAKUAAACmAAAApwAAAKQAAAAEAAAABAAAAKgAAAAvcnVzdGMvMDQ0ODhhZmUzNDUxMmFhNGMzMzU2NmViMTZkOGM5MTJhM2FlMDRmOS9zcmMvbGliY29yZS9tYWNyb3MvbW9kLnJzAAAA6DIQAEkAAAAKAAAACQAAAGFscmVhZHkgYm9ycm93ZWQvcnVzdGMvMDQ0ODhhZmUzNDUxMmFhNGMzMzU2NmViMTZkOGM5MTJhM2FlMDRmOS9zcmMvbGliY29yZS9jZWxsLnJzAFQzEABDAAAAYwMAAB8AAABhbHJlYWR5IG11dGFibHkgYm9ycm93ZWRUMxAAQwAAABgDAAAbAAAAYXNzZXJ0aW9uIGZhaWxlZDogYChsZWZ0ID09IHJpZ2h0KWAKICBsZWZ0OiBgYCwKIHJpZ2h0OiBgYAAA0DMQAC0AAAD9MxAADAAAAAk0EAABAAAApAAAAAAAAAABAAAAqQAAAGA6IADQMxAALQAAAP0zEAAMAAAANDQQAAMAAABjYWxsZWQgYE9wdGlvbjo6dW53cmFwKClgIG9uIGEgYE5vbmVgIHZhbHVlAKoAAAAQAAAABAAAAKsAAACkAAAAAAAAAAEAAABtAAAApAAAAAAAAAABAAAAaAAAAGNhbGxlZCBgUmVzdWx0Ojp1bndyYXAoKWAgb24gYW4gYEVycmAgdmFsdWUArAAAAAgAAAAEAAAArQAAAFRyaWVkIHRvIHNocmluayB0byBhIGxhcmdlciBjYXBhY2l0eaQAAAAEAAAABAAAAJ8AAABBY2Nlc3NFcnJvcnNyYy9saWJzdGQvdGhyZWFkL21vZC5ycwAnNRAAGAAAAIoDAAAqAAAAaW5jb25zaXN0ZW50IHBhcmsgc3RhdGUAJzUQABgAAACYAwAAEwAAAAIAAABwYXJrIHN0YXRlIGNoYW5nZWQgdW5leHBlY3RlZGx5AHw1EAAfAAAAJzUQABgAAACVAwAADQAAAGZhaWxlZCB0byBnZW5lcmF0ZSB1bmlxdWUgdGhyZWFkIElEOiBiaXRzcGFjZSBleGhhdXN0ZWQAJzUQABgAAAAuBAAAEQAAACc1EAAYAAAANAQAACoAAAB0aHJlYWQgbmFtZSBtYXkgbm90IGNvbnRhaW4gaW50ZXJpb3IgbnVsbCBieXRlcwAnNRAAGAAAAHcEAAAqAAAAaW5jb25zaXN0ZW50IHN0YXRlIGluIHVucGFyayc1EAAYAAAArwQAABIAAAAnNRAAGAAAAL0EAAAlAAAAdW5leHBlY3RlZCBlbmQgb2YgZmlsZW90aGVyIG9zIGVycm9yb3BlcmF0aW9uIGludGVycnVwdGVkd3JpdGUgemVyb3RpbWVkIG91dGludmFsaWQgZGF0YWludmFsaWQgaW5wdXQgcGFyYW1ldGVyb3BlcmF0aW9uIHdvdWxkIGJsb2NrZW50aXR5IGFscmVhZHkgZXhpc3RzYnJva2VuIHBpcGVhZGRyZXNzIG5vdCBhdmFpbGFibGVhZGRyZXNzIGluIHVzZW5vdCBjb25uZWN0ZWRjb25uZWN0aW9uIGFib3J0ZWRjb25uZWN0aW9uIHJlc2V0Y29ubmVjdGlvbiByZWZ1c2VkcGVybWlzc2lvbiBkZW5pZWRlbnRpdHkgbm90IGZvdW5kS2luZAAAAKQAAAABAAAAAQAAAK4AAABPc2NvZGUAAKQAAAAEAAAABAAAAK8AAABraW5kbWVzc2FnZQCwAAAADAAAAAQAAACxAAAAJDQQAAAAAAAgKG9zIGVycm9yICkkNBAAAAAAAAQ4EAALAAAADzgQAAEAAABhdHRlbXB0ZWQgdG8gdXNlIGEgY29uZGl0aW9uIHZhcmlhYmxlIHdpdGggdHdvIG11dGV4ZXNzcmMvbGlic3RkL3N5bmMvY29uZHZhci5yc144EAAaAAAAPwIAABIAAABzcmMvbGlic3RkL3N5bmMvb25jZS5yc2Fzc2VydGlvbiBmYWlsZWQ6IHN0YXRlX2FuZF9xdWV1ZSAmIFNUQVRFX01BU0sgPT0gUlVOTklOR4g4EAAXAAAApwEAABUAAABPbmNlIGluc3RhbmNlIGhhcyBwcmV2aW91c2x5IGJlZW4gcG9pc29uZWQAAIg4EAAXAAAAiwEAABUAAACIOBAAFwAAAOgBAAAJAAAAiDgQABcAAAD0AQAANQAAAFBvaXNvbkVycm9yIHsgaW5uZXI6IC4uIH1jYW5ub3QgbW9kaWZ5IHRoZSBwYW5pYyBob29rIGZyb20gYSBwYW5pY2tpbmcgdGhyZWFkc3JjL2xpYnN0ZC9wYW5pY2tpbmcucnORORAAFwAAAGoAAAAJAAAAkTkQABcAAACzAQAAHwAAAJE5EAAXAAAAtAEAAB4AAACyAAAAEAAAAAQAAACzAAAAtAAAALAAAAAMAAAABAAAALUAAACkAAAACAAAAAQAAAC2AAAAtwAAAKQAAAAIAAAABAAAALgAAABOdWxFcnJvcqQAAAAEAAAABAAAALkAAABlcnJvckN1c3RvbQCkAAAABAAAAAQAAAC6AAAApAAAAAQAAAAEAAAAuwAAAFVuZXhwZWN0ZWRFb2ZPdGhlckludGVycnVwdGVkV3JpdGVaZXJvVGltZWRPdXRJbnZhbGlkRGF0YUludmFsaWRJbnB1dFdvdWxkQmxvY2tBbHJlYWR5RXhpc3RzQnJva2VuUGlwZUFkZHJOb3RBdmFpbGFibGVBZGRySW5Vc2VOb3RDb25uZWN0ZWRDb25uZWN0aW9uQWJvcnRlZENvbm5lY3Rpb25SZXNldENvbm5lY3Rpb25SZWZ1c2VkUGVybWlzc2lvbkRlbmllZE5vdEZvdW5kb3BlcmF0aW9uIHN1Y2Nlc3NmdWxjYW4ndCBibG9jayB3aXRoIHdlYiBhc3NlbWJseXNyYy9saWJzdGQvc3lzL3dhc20vY29uZHZhci5ycwBpOxAAHgAAABUAAAAJAAAAY2Fubm90IHJlY3Vyc2l2ZWx5IGFjcXVpcmUgbXV0ZXhzcmMvbGlic3RkL3N5cy93YXNtL211dGV4LnJzuDsQABwAAAAVAAAACQAAAEhhc2ggdGFibGUgY2FwYWNpdHkgb3ZlcmZsb3cvY2FyZ28vcmVnaXN0cnkvc3JjL2dpdGh1Yi5jb20tMWVjYzYyOTlkYjllYzgyMy9oYXNoYnJvd24tMC42LjIvc3JjL3Jhdy9tb2QucnMAAAA8EABOAAAAUAAAABsAAAD/////vAAAAAQAAAAEAAAAvQAAAHNyYy9saWJhbGxvYy9yYXdfdmVjLnJzY2FwYWNpdHkgb3ZlcmZsb3d0PBAAFwAA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JQqEBnNyYy9saWJjb3JlL3VuaWNvZGUvdW5pY29kZV9kYXRhLnJzAABDVRAAIwAAAEsAAAAoAAAAQ1UQACMAAABXAAAAFgAAAENVEAAjAAAAUgAAAD4AAABzcmMvbGliY29yZS9udW0vYmlnbnVtLnJzAAAAmFUQABkAAADjAQAAAQAAAGFzc2VydGlvbiBmYWlsZWQ6IG5vYm9ycm93YXNzZXJ0aW9uIGZhaWxlZDogZGlnaXRzIDwgNDBhc3NlcnRpb24gZmFpbGVkOiBvdGhlciA+IDAAAMkAAAAEAAAABAAAANIAAADJAAAABAAAAAQAAADTAAAAVHJ5RnJvbVNsaWNlRXJyb3JTb21lTm9uZUVycm9yVXRmOEVycm9ydmFsaWRfdXBfdG9lcnJvcl9sZW4AyQAAAAQAAAAEAAAA1AAAAAADAACDBCAAkQVgAF0ToAASF6AeDCDgHu8sICsqMKArb6ZgLAKo4Cwe++AtAP6gNZ7/4DX9AWE2AQqhNiQNYTerDuE4LxghOTAcYUbzHqFK8GphTk9voU6dvCFPZdHhTwDaIVAA4OFRMOFhU+zioVTQ6OFUIAAuVfABv1UAcAAHAC0BAQECAQIBAUgLMBUQAWUHAgYCAgEEIwEeG1sLOgkJARgEAQkBAwEFKwN3DwEgNwEBAQQIBAEDBwoCHQE6AQEBAgQIAQkBCgIaAQICOQEEAgQCAgMDAR4CAwELAjkBBAUBAgQBFAIWBgEBOgEBAgEECAEHAwoCHgE7AQEBDAEJASgBAwE5AwUDAQQHAgsCHQE6AQIBAgEDAQUCBwILAhwCOQIBAQIECAEJAQoCHQFIAQQBAgMBAQgBUQECBwwIYgECCQsGSgIbAQEBAQE3DgEFAQIFCwEkCQFmBAEGAQICAhkCBAMQBA0BAgIGAQ8BAAMAAx0DHQIeAkACAQcIAQILCQEtA3cCIgF2AwQCCQEGA9sCAgE6AQEHAQEBAQIIBgoCATARPwQwBwEBBQEoCQwCIAQCAgEDOAEBAgMBAQM6CAICmAMBDQEHBAEGAQMCxjoBBQABwyEAA40BYCAABmkCAAQBCiACUAIAAQMBBAEZAgUBlwIaEg0BJggZCy4DMAECBAICJwFDBgICAgIMAQgBLwEzAQEDAgIFAgEBKgIIAe4BAgEEAQABABAQEAACAAHiAZUFAAMBAgUEKAMEAaUCAAQAApkLsAE2DzgDMQQCAkUDJAUBCD4BDAI0CQoEAgFfAwIBAQIGAaABAwgVAjkCAQEBARYBDgcDBcMIAgMBARcBUQECBgEBAgEBAgEC6wECBAYCAQIbAlUIAgEBAmoBAQECBgEBZQMCBAEFAAkBAvUBCgIBAQQBkAQCAgQBIAooBgIECAEJBgIDLg0BAgAHAQYBAVIWAgcBAgECegYDAQECAQcBAUgCAwEBAQACAAU7BwABPwRRAQACAAEBAwQFCAgCBx4ElAMANwQyCAEOARYFAQ8ABwERAgcBAgEFAAcABAAHbQcAYIDwAExheW91dEVycnByaXZhdGUAQcizwQALCAEAAAAAAAAA"
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

### Call a contract function

> Allows you to call a contract method as a [view function](/docs/roles/developer/contracts/assemblyscript#view-and-change-functions).

- method: `query`
- params:
  - `request_type`: `call_function`
  - `finality`: `optimistic` or `final`
  - `account_id`: _`"example.testnet"`_
  - `method_name`: `name_of_a_example.testnet_method`
  - `args_base64`: `method_arguments_base_64_encoded`

Example:

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

<details>
<summary>HTTPie example:</summary>
<p>

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

</p>
</details>

<details>
<summary>Example response: </summary>
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

**Note**: `[48]` is an array of bytes, to be specific it is an ASCII code of `0`.`near-sdk-rs` and `near-sdk-as` return JSON-serialized results.

</p>
</details>

---

## Block

---

### Block details

> Queries network and returns block for given height or hash. You can also use `finality` param to return latest block details.

**Note**: You may choose to search by a specific block _or_ finality, you can not choose both.

- method: `block`
- params:
  - `[block_Id]`, `["block_hash"]`  
    _or_
  - `finality`: `optimistic` or `final`

`finality` example:

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

`[block_id]`

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

`[block_hash]`

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

<details>
<summary>HTTPie example:</summary>
<p>

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare \
    method=block \
    params:='{"finality": "final"}'
```

</p>
</details>

<details>
<summary>Example response:</summary>
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

---

### Changes in Block

> Returns changes in block for given block height or hash. You can also use `finality` param to return latest block details.

**Note**: You may choose to search by a specific block _or_ finality, you can not choose both.

- method: `EXPERIMENTAL_changes_in_block`
- params:
  - `[block_Id]`, `["block_hash"]`  
    (or)
  - `finality`: `optimistic` or `final`

`[block_id]`

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

`block_hash`

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

`finality`

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

<details>
<summary>HTTPie example: </summary>
<p>

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare \
    method=EXPERIMENTAL_changes_in_block \
    'params:={
        "block_id": 17821135
    }'
```

</p>
</details>

<details>
<summary>Example response: </summary>
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

---

## Chunk

---

### Chunk Details

> Returns details of a specific chunk. You can run a [block details](/docs/api/rpc#block-details) query to get a valid chunk hash.

- method: `chunk`
- params: `["insert_valid_chunk_hash"]`

Example:

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "chunk",
  "params": ["EBM2qg5cGr47EjMPtH88uvmXHDHqmWPzKaQadbWhdw22"]
}
```

<details>
<summary>HTTPie example: </summary>
<p>

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 method=chunk params:='["EBM2qg5cGr47EjMPtH88uvmXHDHqmWPzKaQadbWhdw22"]' id=dontcare
```

</p>
</details>

<details>
<summary>Example response: </summary>
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

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "gas_price",
  "params": [17824600]
}
```

`["block_hash"]`

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "gas_price",
  "params": ["AXa8CHDQSA8RdFCt12rtpFraVq4fDUgJbLPxwbaZcZrj"]
}
```

`[null]`

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "gas_price",
  "params": [null]
}
```

<details>
<summary>HTTPie example:</summary>
<p>

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 method=gas_price params:='["AXa8CHDQSA8RdFCt12rtpFraVq4fDUgJbLPxwbaZcZrj"]' id=dontcare
```

</p>
</details>

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

## Genesis

---

### Genesis Config

> Returns current genesis configuration.

- method: `EXPERIMENTAL_genesis_config`
- params: _none_

Example:

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "EXPERIMENTAL_genesis_config"
}
```

<details>
<summary>HTTPie example: </summary>
<p>

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=EXPERIMENTAL_genesis_config
```

</p>
</details>

<details>
<summary>Example response: </summary>
<p>

```json
{
  "jsonrpc": "2.0",
  "result": {
    "protocol_version": 29,
    "genesis_time": "2020-07-31T03:39:42.911378Z",
    "chain_id": "testnet",
    "genesis_height": 10885359,
    "num_block_producer_seats": 100,
    "num_block_producer_seats_per_shard": [100],
    "avg_hidden_validator_seats_per_shard": [0],
    "dynamic_resharding": false,
    "protocol_upgrade_stake_threshold": [4, 5],
    "protocol_upgrade_num_epochs": 2,
    "epoch_length": 43200,
    "gas_limit": 1000000000000000,
    "min_gas_price": "5000",
    "max_gas_price": "10000000000000000000000",
    "block_producer_kickout_threshold": 80,
    "chunk_producer_kickout_threshold": 90,
    "online_min_threshold": [90, 100],
    "online_max_threshold": [99, 100],
    "gas_price_adjustment_rate": [1, 100],
    "runtime_config": {
      "storage_amount_per_byte": "90949470177292823791",
      "transaction_costs": {
        "action_receipt_creation_config": {
          "send_sir": 108059500000,
          "send_not_sir": 108059500000,
          "execution": 108059500000
        },
        "data_receipt_creation_config": {
          "base_cost": {
            "send_sir": 4697339419375,
            "send_not_sir": 4697339419375,
            "execution": 4697339419375
          },
          "cost_per_byte": {
            "send_sir": 59357464,
            "send_not_sir": 59357464,
            "execution": 59357464
          }
        },
        "action_creation_config": {
          "create_account_cost": {
            "send_sir": 99607375000,
            "send_not_sir": 99607375000,
            "execution": 99607375000
          },
          "deploy_contract_cost": {
            "send_sir": 184765750000,
            "send_not_sir": 184765750000,
            "execution": 184765750000
          },
          "deploy_contract_cost_per_byte": {
            "send_sir": 6812999,
            "send_not_sir": 6812999,
            "execution": 6812999
          },
          "function_call_cost": {
            "send_sir": 2319861500000,
            "send_not_sir": 2319861500000,
            "execution": 2319861500000
          },
          "function_call_cost_per_byte": {
            "send_sir": 2235934,
            "send_not_sir": 2235934,
            "execution": 2235934
          },
          "transfer_cost": {
            "send_sir": 115123062500,
            "send_not_sir": 115123062500,
            "execution": 115123062500
          },
          "stake_cost": {
            "send_sir": 141715687500,
            "send_not_sir": 141715687500,
            "execution": 102217625000
          },
          "add_key_cost": {
            "full_access_cost": {
              "send_sir": 101765125000,
              "send_not_sir": 101765125000,
              "execution": 101765125000
            },
            "function_call_cost": {
              "send_sir": 102217625000,
              "send_not_sir": 102217625000,
              "execution": 102217625000
            },
            "function_call_cost_per_byte": {
              "send_sir": 1925331,
              "send_not_sir": 1925331,
              "execution": 1925331
            }
          },
          "delete_key_cost": {
            "send_sir": 94946625000,
            "send_not_sir": 94946625000,
            "execution": 94946625000
          },
          "delete_account_cost": {
            "send_sir": 147489000000,
            "send_not_sir": 147489000000,
            "execution": 147489000000
          }
        },
        "storage_usage_config": {
          "num_bytes_account": 100,
          "num_extra_bytes_record": 40
        },
        "burnt_gas_reward": [3, 10],
        "pessimistic_gas_price_inflation_ratio": [103, 100]
      },
      "wasm_config": {
        "ext_costs": {
          "base": 264768111,
          "contract_compile_base": 35445963,
          "contract_compile_bytes": 216750,
          "read_memory_base": 2609863200,
          "read_memory_byte": 3801333,
          "write_memory_base": 2803794861,
          "write_memory_byte": 2723772,
          "read_register_base": 2517165186,
          "read_register_byte": 98562,
          "write_register_base": 2865522486,
          "write_register_byte": 3801564,
          "utf8_decoding_base": 3111779061,
          "utf8_decoding_byte": 291580479,
          "utf16_decoding_base": 3543313050,
          "utf16_decoding_byte": 163577493,
          "sha256_base": 4540970250,
          "sha256_byte": 24117351,
          "keccak256_base": 5879491275,
          "keccak256_byte": 21471105,
          "keccak512_base": 5811388236,
          "keccak512_byte": 36649701,
          "log_base": 3543313050,
          "log_byte": 13198791,
          "storage_write_base": 64196736000,
          "storage_write_key_byte": 70482867,
          "storage_write_value_byte": 31018539,
          "storage_write_evicted_byte": 32117307,
          "storage_read_base": 56356845750,
          "storage_read_key_byte": 30952533,
          "storage_read_value_byte": 5611005,
          "storage_remove_base": 53473030500,
          "storage_remove_key_byte": 38220384,
          "storage_remove_ret_value_byte": 11531556,
          "storage_has_key_base": 54039896625,
          "storage_has_key_byte": 30790845,
          "storage_iter_create_prefix_base": 0,
          "storage_iter_create_prefix_byte": 0,
          "storage_iter_create_range_base": 0,
          "storage_iter_create_from_byte": 0,
          "storage_iter_create_to_byte": 0,
          "storage_iter_next_base": 0,
          "storage_iter_next_key_byte": 0,
          "storage_iter_next_value_byte": 0,
          "touching_trie_node": 16101955926,
          "promise_and_base": 1465013400,
          "promise_and_per_promise": 5452176,
          "promise_return": 560152386,
          "validator_stake_base": 911834726400,
          "validator_total_stake_base": 911834726400
        },
        "grow_mem_cost": 1,
        "regular_op_cost": 3856371,
        "limit_config": {
          "max_gas_burnt": 200000000000000,
          "max_gas_burnt_view": 200000000000000,
          "max_stack_height": 16384,
          "initial_memory_pages": 1024,
          "max_memory_pages": 2048,
          "registers_memory_limit": 1073741824,
          "max_register_size": 104857600,
          "max_number_registers": 100,
          "max_number_logs": 100,
          "max_total_log_length": 16384,
          "max_total_prepaid_gas": 300000000000000,
          "max_actions_per_receipt": 100,
          "max_number_bytes_method_names": 2000,
          "max_length_method_name": 256,
          "max_arguments_length": 4194304,
          "max_length_returned_data": 4194304,
          "max_contract_size": 4194304,
          "max_length_storage_key": 4194304,
          "max_length_storage_value": 4194304,
          "max_promises_per_function_call_action": 1024,
          "max_number_input_data_dependencies": 128
        }
      },
      "account_creation_config": {
        "min_allowed_top_level_account_length": 0,
        "registrar_account_id": "registrar"
      }
    },
    "validators": [
      {
        "account_id": "node0",
        "public_key": "ed25519:7PGseFbWxvYVgZ89K1uTJKYoKetWs7BJtbyXDzfbAcqX",
        "amount": "1000000000000000000000000000000"
      },
      {
        "account_id": "node1",
        "public_key": "ed25519:6DSjZ8mvsRZDvFqFxo8tCKePG96omXW7eVYVSySmDk8e",
        "amount": "1000000000000000000000000000000"
      },
      {
        "account_id": "node2",
        "public_key": "ed25519:GkDv7nSMS3xcqA45cpMvFmfV1o4fRF6zYo1JRR6mNqg5",
        "amount": "1000000000000000000000000000000"
      },
      {
        "account_id": "node3",
        "public_key": "ed25519:ydgzeXHJ5Xyt7M1gXLxqLBW1Ejx6scNV5Nx2pxFM8su",
        "amount": "1000000000000000000000000000000"
      }
    ],
    "transaction_validity_period": 86400,
    "protocol_reward_rate": [1, 10],
    "max_inflation_rate": [1, 20],
    "total_supply": "1031467299046044096035532756810080",
    "num_blocks_per_year": 31536000,
    "protocol_treasury_account": "near",
    "fishermen_threshold": "10000000000000000000",
    "minimum_stake_divisor": 10
  },
  "id": "dontcare"
}
```

</p>
</details>

---

## Network

---

### Network Info

> Returns the current state of node network connections (active peers, transmitted data, etc.)

- method: `network_info`
- params: _none_

Example:

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "network_info",
  "params": []
}
```

<details>
<summary>HTTPie example: </summary>
<p>

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 method=network_info params:='[]' id=dontcare
```

</p>
</details>

<details>
<summary>Example response:</summary>
<p>

```json
{
  "jsonrpc": "2.0",
  "result": {
    "active_peers": [
      {
        "id": "ed25519:GkDv7nSMS3xcqA45cpMvFmfV1o4fRF6zYo1JRR6mNqg5",
        "addr": "35.193.24.121:24567",
        "account_id": null
      },
      ...
    ],
    "num_active_peers": 34,
    "peer_max_count": 40,
    "sent_bytes_per_sec": 17754754,
    "received_bytes_per_sec": 492116,
    "known_producers": [
      {
        "account_id": "node0",
        "addr": null,
        "peer_id": "ed25519:7PGseFbWxvYVgZ89K1uTJKYoKetWs7BJtbyXDzfbAcqX"
      },
      ...
    ]
  },
  "id": "dontcare"
}
```

</p>
</details>

---

### General validator status

> Returns general status of current validator nodes.

- method: `status`
- params: `[]`

Example:

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "status",
  "params": []
}
```

<details>
<summary>HTTPie example: </summary>
<p>

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 method=status params:='[]' id=dontcare
```

</p>
</details>

<details>
<summary>Example response: </summary>
<p>

```json
{
  "jsonrpc": "2.0",
  "result": {
    "version": {
      "version": "1.14.0-rc.1",
      "build": "effa3b7a-modified"
    },
    "chain_id": "testnet",
    "protocol_version": 35,
    "latest_protocol_version": 35,
    "rpc_addr": "0.0.0.0:3030",
    "validators": [
      {
        "account_id": "node3",
        "is_slashed": false
      },
      {
        "account_id": "node0",
        "is_slashed": false
      },
      {
        "account_id": "staked.pool.f863973.m0",
        "is_slashed": false
      },
      {
        "account_id": "01node.pool.f863973.m0",
        "is_slashed": false
      },
      {
        "account_id": "node2",
        "is_slashed": false
      },
      {
        "account_id": "dokia.pool.f863973.m0",
        "is_slashed": false
      },
      {
        "account_id": "node1",
        "is_slashed": false
      },
      {
        "account_id": "lowfeevalidation.pool.f863973.m0",
        "is_slashed": false
      },
      {
        "account_id": "sl1sub.pool.f863973.m0",
        "is_slashed": false
      },
      {
        "account_id": "zainy.pool.f863973.m0",
        "is_slashed": false
      },
      {
        "account_id": "chorus-one.pool.f863973.m0",
        "is_slashed": false
      },
      {
        "account_id": "thepassivetrust.pool.f863973.m0",
        "is_slashed": false
      },
      {
        "account_id": "certusone.pool.f863973.m0",
        "is_slashed": false
      },
      {
        "account_id": "joe1.pool.f863973.m0",
        "is_slashed": false
      },
      {
        "account_id": "bisontrails.pool.f863973.m0",
        "is_slashed": false
      },
      {
        "account_id": "valeraverim.pool.f863973.m0",
        "is_slashed": false
      },
      {
        "account_id": "lunanova.pool.f863973.m0",
        "is_slashed": false
      },
      {
        "account_id": "bazilik.pool.f863973.m0",
        "is_slashed": false
      },
      {
        "account_id": "dsrvlabs.pool.f863973.m0",
        "is_slashed": false
      },
      {
        "account_id": "kronos.pool.f863973.m0",
        "is_slashed": false
      },
      {
        "account_id": "nodeasy.pool.f863973.m0",
        "is_slashed": false
      },
      {
        "account_id": "kytzu.pool.f863973.m0",
        "is_slashed": false
      },
      {
        "account_id": "bitcat.pool.f863973.m0",
        "is_slashed": false
      },
      {
        "account_id": "pool_easy2stake.pool.f863973.m0",
        "is_slashed": false
      },
      {
        "account_id": "fresh_lockup.pool.f863973.m0",
        "is_slashed": false
      },
      {
        "account_id": "staking-power.pool.f863973.m0",
        "is_slashed": false
      },
      {
        "account_id": "syncnode.pool.f863973.m0",
        "is_slashed": false
      },
      {
        "account_id": "inotel.pool.f863973.m0",
        "is_slashed": false
      },
      {
        "account_id": "zpool.pool.f863973.m0",
        "is_slashed": false
      },
      {
        "account_id": "aquarius.pool.f863973.m0",
        "is_slashed": false
      },
      {
        "account_id": "cloudpost.pool.f863973.m0",
        "is_slashed": false
      },
      {
        "account_id": "staked.pool.6fb1358",
        "is_slashed": false
      },
      {
        "account_id": "moonlet.pool.f863973.m0",
        "is_slashed": false
      },
      {
        "account_id": "jazza.pool.f863973.m0",
        "is_slashed": false
      },
      {
        "account_id": "orangeclub.pool.f863973.m0",
        "is_slashed": false
      },
      {
        "account_id": "blazenet.pool.f863973.m0",
        "is_slashed": false
      },
      {
        "account_id": "pathrock.pool.f863973.m0",
        "is_slashed": false
      },
      {
        "account_id": "stakin.pool.f863973.m0",
        "is_slashed": false
      },
      {
        "account_id": "northernlights.stakingpool",
        "is_slashed": false
      },
      {
        "account_id": "alexandruast.pool.f863973.m0",
        "is_slashed": false
      },
      {
        "account_id": "top.pool.f863973.m0",
        "is_slashed": false
      }
    ],
    "sync_info": {
      "latest_block_hash": "44kieHwr7Gg5r72V3DgU7cpgV2aySkk5qbBCdvwens8T",
      "latest_block_height": 17774278,
      "latest_state_root": "3MD3fQqnm3JYa9UQgenEJsR6UHoWuHV4Tpr4hZY7QwfY",
      "latest_block_time": "2020-09-27T23:59:38.008063088Z",
      "syncing": false
    },
    "validator_account_id": "nearup-node8"
  },
  "id": "dontcare"
}
```

</p>
</details>

---

### Detailed validator status

> Queries active validators on the network returning details and the current state of validation on the blockchain.

- method: `validators`
- params: `["block hash"]`, `[block number]`, or `[null]` for the latest block

**Note:** For `["block hash"]` & `[block number]` you will need to query recent blocks as they become garbage collected after five [epochs](/docs/concepts/epoch).

`[null]`

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "validators",
  "params": [null]
}
```

`["block hash"]`

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "validators",
  "params": ["FiG2nMjjue3YdgYAyM3ZqWXSaG6RJj5Gk7hvY8vrEoGw"]
}
```

`[block number]`

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "validators",
  "params": [17791098]
}
```

<details>
<summary>HTTPie example: </summary>
<p>

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 method=validators params:='[null]' id=dontcare
```

</p>
</details>

<details>
<summary>Example response: </summary>
<p>

```json
{
  "jsonrpc": "2.0",
  "result": {
    "current_validators": [
      {
        "account_id": "01node.pool.f863973.m0",
        "public_key": "ed25519:3iNqnvBgxJPXCxu6hNdvJso1PEAc1miAD35KQMBCA3aL",
        "is_slashed": false,
        "stake": "176429739989396285019500901780",
        "shards": [0],
        "num_produced_blocks": 213,
        "num_expected_blocks": 213
      },
      {
        "account_id": "alexandruast.pool.f863973.m0",
        "public_key": "ed25519:A3XJ3uVGxSi9o2gnG2r8Ra3fqqodRpL4iuLTc6fNdGUj",
        "is_slashed": false,
        "stake": "151430394143736014372434860532",
        "shards": [0],
        "num_produced_blocks": 213,
        "num_expected_blocks": 213
      },
      {
        "account_id": "aquarius.pool.f863973.m0",
        "public_key": "ed25519:8NfEarjStDYjJTwKUgQGy7Z7UTGsZaPhTUsExheQN3r1",
        "is_slashed": false,
        "stake": "130367563121508828296664196836",
        "shards": [0],
        "num_produced_blocks": 212,
        "num_expected_blocks": 212
      },
      {
        "account_id": "bazilik.pool.f863973.m0",
        "public_key": "ed25519:3pDJwDQ6Y5B9QeW1jz8KunhZH4D4GQG86reTmrRfdD7c",
        "is_slashed": false,
        "stake": "169013447850997135034919151338",
        "shards": [0],
        "num_produced_blocks": 211,
        "num_expected_blocks": 213
      },
      {
        "account_id": "bisontrails.pool.f863973.m0",
        "public_key": "ed25519:8g4P5EXyp2b2pfVMHY1QLfkRcY59hjPfWrFCKUWX3RmR",
        "is_slashed": false,
        "stake": "184162578269044826045352223479",
        "shards": [0],
        "num_produced_blocks": 213,
        "num_expected_blocks": 213
      },
      {
        "account_id": "bitcat.pool.f863973.m0",
        "public_key": "ed25519:9mtnwPQyyap1QNH9ag6r4the7Jkkpdyt9HUF5G1dWxKx",
        "is_slashed": false,
        "stake": "135215509376418353124295451543",
        "shards": [0],
        "num_produced_blocks": 212,
        "num_expected_blocks": 212
      },
      {
        "account_id": "blazenet.pool.f863973.m0",
        "public_key": "ed25519:DiogP36wBXKFpFeqirrxN8G2Mq9vnakgBvgnHdL9CcN3",
        "is_slashed": false,
        "stake": "137364229255641651855065314186",
        "shards": [0],
        "num_produced_blocks": 212,
        "num_expected_blocks": 212
      },
      {
        "account_id": "certusone.pool.f863973.m0",
        "public_key": "ed25519:CKW7f41Kn8YCDPzaGLs1MrPb9h3BjQmHhbei6Ff6nRRF",
        "is_slashed": false,
        "stake": "176644821310043228577017742667",
        "shards": [0],
        "num_produced_blocks": 213,
        "num_expected_blocks": 213
      },
      {
        "account_id": "chorus-one.pool.f863973.m0",
        "public_key": "ed25519:6LFwyEEsqhuDxorWfsKcPPs324zLWTaoqk4o6RDXN7Qc",
        "is_slashed": false,
        "stake": "110397600457815316527526651811",
        "shards": [0],
        "num_produced_blocks": 212,
        "num_expected_blocks": 213
      },
      {
        "account_id": "cloudpost.pool.f863973.m0",
        "public_key": "ed25519:AVVLmJDG8z6UgmW9fmJGVFTdYxxfnqXH6c7FVQmhE6dp",
        "is_slashed": false,
        "stake": "136597929514591130855076834167",
        "shards": [0],
        "num_produced_blocks": 212,
        "num_expected_blocks": 212
      },
      {
        "account_id": "dokia.pool.f863973.m0",
        "public_key": "ed25519:935JMz1vLcJxFApG3TY4MA4RHhvResvoGwCrQoJxHPn9",
        "is_slashed": false,
        "stake": "220445043066799898276306006919",
        "shards": [0],
        "num_produced_blocks": 426,
        "num_expected_blocks": 426
      },
      {
        "account_id": "dsrvlabs.pool.f863973.m0",
        "public_key": "ed25519:61ei2efmmLkeDR1CG6JDEC2U3oZCUuC2K1X16Vmxrud9",
        "is_slashed": false,
        "stake": "161508967845718247649113721019",
        "shards": [0],
        "num_produced_blocks": 213,
        "num_expected_blocks": 213
      },
      {
        "account_id": "fresh_lockup.pool.f863973.m0",
        "public_key": "ed25519:7CMFLtEohojtxBkmj9Jb6AGgbphb1zvxymHzpzuyCjfG",
        "is_slashed": false,
        "stake": "193574159400241036715020269158",
        "shards": [0],
        "num_produced_blocks": 212,
        "num_expected_blocks": 212
      },
      {
        "account_id": "inotel.pool.f863973.m0",
        "public_key": "ed25519:C55jH1MCHYGa3tzUyZZdGrJmmCLP22Aa4v88KYpn2xwZ",
        "is_slashed": false,
        "stake": "178598870951670469578754984993",
        "shards": [0],
        "num_produced_blocks": 212,
        "num_expected_blocks": 212
      },
      {
        "account_id": "jazza.pool.f863973.m0",
        "public_key": "ed25519:85cPMNVrqUz8N7oWbbvWbUuamHcJNe49uRbaSzftLCz9",
        "is_slashed": false,
        "stake": "155762349362951827286303475797",
        "shards": [0],
        "num_produced_blocks": 212,
        "num_expected_blocks": 212
      },
      {
        "account_id": "joe1.pool.f863973.m0",
        "public_key": "ed25519:G3SxwzmiEZSm3bHnTLtxJvm3NvT1TLQcWuV1iod6i6NJ",
        "is_slashed": false,
        "stake": "129230772267511696840933436174",
        "shards": [0],
        "num_produced_blocks": 213,
        "num_expected_blocks": 213
      },
      {
        "account_id": "kronos.pool.f863973.m0",
        "public_key": "ed25519:3i2pertqzF8xqkJ4BrE4t4r67YiYYrUKCktbqvDgjzuQ",
        "is_slashed": false,
        "stake": "144544279093485390569527924033",
        "shards": [0],
        "num_produced_blocks": 202,
        "num_expected_blocks": 213
      },
      {
        "account_id": "kytzu.pool.f863973.m0",
        "public_key": "ed25519:61tgPZpy8tqFeAwG4vtf2ZKCRoENiP2A1TJVWEwnbxZU",
        "is_slashed": false,
        "stake": "113758432843198726378418342568",
        "shards": [0],
        "num_produced_blocks": 212,
        "num_expected_blocks": 212
      },
      {
        "account_id": "lowfeevalidation.pool.f863973.m0",
        "public_key": "ed25519:EXyjSMGSnk5uGphF3gVV1jCudaAudbW8imoEccYEJg3V",
        "is_slashed": false,
        "stake": "113685537557977098595863252617",
        "shards": [0],
        "num_produced_blocks": 213,
        "num_expected_blocks": 213
      },
      {
        "account_id": "lunanova.pool.f863973.m0",
        "public_key": "ed25519:2fZ59qfo9QHNLijoht9cwUb9enSNcnRmXbQn1gKZxvkw",
        "is_slashed": false,
        "stake": "172903039219549397267702571804",
        "shards": [0],
        "num_produced_blocks": 213,
        "num_expected_blocks": 213
      },
      {
        "account_id": "moonlet.pool.f863973.m0",
        "public_key": "ed25519:3e1nVCVGNS3yr6CcUvpDAs3BhiWtyM9uTBWkyVR5Xn3K",
        "is_slashed": false,
        "stake": "140599784944681716744261599779",
        "shards": [0],
        "num_produced_blocks": 212,
        "num_expected_blocks": 212
      },
      {
        "account_id": "node0",
        "public_key": "ed25519:7PGseFbWxvYVgZ89K1uTJKYoKetWs7BJtbyXDzfbAcqX",
        "is_slashed": false,
        "stake": "1907234923845608896091985071588",
        "shards": [0],
        "num_produced_blocks": 3614,
        "num_expected_blocks": 3616
      },
      {
        "account_id": "node1",
        "public_key": "ed25519:6DSjZ8mvsRZDvFqFxo8tCKePG96omXW7eVYVSySmDk8e",
        "is_slashed": false,
        "stake": "1906065501889463342906704128820",
        "shards": [0],
        "num_produced_blocks": 3613,
        "num_expected_blocks": 3614
      },
      {
        "account_id": "node2",
        "public_key": "ed25519:GkDv7nSMS3xcqA45cpMvFmfV1o4fRF6zYo1JRR6mNqg5",
        "is_slashed": false,
        "stake": "1840271519773089248112279578450",
        "shards": [0],
        "num_produced_blocks": 3615,
        "num_expected_blocks": 3615
      },
      {
        "account_id": "node3",
        "public_key": "ed25519:ydgzeXHJ5Xyt7M1gXLxqLBW1Ejx6scNV5Nx2pxFM8su",
        "is_slashed": false,
        "stake": "1247270566437910246525604113433",
        "shards": [0],
        "num_produced_blocks": 2335,
        "num_expected_blocks": 2342
      },
      {
        "account_id": "nodeasy.pool.f863973.m0",
        "public_key": "ed25519:25Dhg8NBvQhsVTuugav3t1To1X1zKiomDmnh8yN9hHMb",
        "is_slashed": false,
        "stake": "131652957125263756523827257067",
        "shards": [0],
        "num_produced_blocks": 212,
        "num_expected_blocks": 212
      },
      {
        "account_id": "northernlights.stakingpool",
        "public_key": "ed25519:CsMecqKCfagnebMB3ha1uRubay5Z4V85req23bNAJSG3",
        "is_slashed": false,
        "stake": "159669819380982417675619400525",
        "shards": [0],
        "num_produced_blocks": 212,
        "num_expected_blocks": 212
      },
      {
        "account_id": "orangeclub.pool.f863973.m0",
        "public_key": "ed25519:HezFeSzcwuR5wvkqccgMCMnpf1eQkVCfk52tXZEdKZHz",
        "is_slashed": false,
        "stake": "143971234567521206686862639104",
        "shards": [0],
        "num_produced_blocks": 212,
        "num_expected_blocks": 212
      },
      {
        "account_id": "pathrock.pool.f863973.m0",
        "public_key": "ed25519:G138GdQsU7PdFLD6X88NmTLAEDR7agPcq9HLZqGpegkm",
        "is_slashed": false,
        "stake": "125204431569306697735287326827",
        "shards": [0],
        "num_produced_blocks": 212,
        "num_expected_blocks": 212
      },
      {
        "account_id": "pool_easy2stake.pool.f863973.m0",
        "public_key": "ed25519:8nzKxvmyeauQRehWkby8GfWNLgqPiF5FCRFSD75M1Rwh",
        "is_slashed": false,
        "stake": "176893731686620703671521068552",
        "shards": [0],
        "num_produced_blocks": 212,
        "num_expected_blocks": 212
      },
      {
        "account_id": "sl1sub.pool.f863973.m0",
        "public_key": "ed25519:3URBpNUjNAMzugQH1rdSKMtwFM8AwHaJgZk5Z6YtnfFL",
        "is_slashed": false,
        "stake": "155741680601335529540438949153",
        "shards": [0],
        "num_produced_blocks": 212,
        "num_expected_blocks": 213
      },
      {
        "account_id": "staked.pool.6fb1358",
        "public_key": "ed25519:684rMbuVYYgL2CkmYgC1weLh3erd2bwrmtQtJJhWzPwj",
        "is_slashed": false,
        "stake": "126911347639167461321544980789",
        "shards": [0],
        "num_produced_blocks": 212,
        "num_expected_blocks": 212
      },
      {
        "account_id": "staked.pool.f863973.m0",
        "public_key": "ed25519:D2afKYVaKQ1LGiWbMAZRfkKLgqimTR74wvtESvjx5Ft2",
        "is_slashed": false,
        "stake": "140558085958535444819294942478",
        "shards": [0],
        "num_produced_blocks": 213,
        "num_expected_blocks": 213
      },
      {
        "account_id": "stakin.pool.f863973.m0",
        "public_key": "ed25519:GvddxjaxBCqGGB4kMNWNFtvozU1EEZ2jrnggKZW8LaU4",
        "is_slashed": false,
        "stake": "122221693837484004905170552626",
        "shards": [0],
        "num_produced_blocks": 212,
        "num_expected_blocks": 212
      },
      {
        "account_id": "staking-power.pool.f863973.m0",
        "public_key": "ed25519:4s79F6Fdjgb3rHXPLwaXZG4Hq7Za8nogUu3vXEamRBQo",
        "is_slashed": false,
        "stake": "113293334165305165414435157738",
        "shards": [0],
        "num_produced_blocks": 212,
        "num_expected_blocks": 212
      },
      {
        "account_id": "syncnode.pool.f863973.m0",
        "public_key": "ed25519:FUAVDkmLhuTbKYv4GWuWv9ogjKzRatLd5ZBMKXRy7WqE",
        "is_slashed": false,
        "stake": "133414422809248011010747790387",
        "shards": [0],
        "num_produced_blocks": 212,
        "num_expected_blocks": 212
      },
      {
        "account_id": "thepassivetrust.pool.f863973.m0",
        "public_key": "ed25519:4NccD2DNJpBkDmWeJ2GbqPoivQ93qcKiR4PHALJKCTod",
        "is_slashed": false,
        "stake": "162714097201953456968339272308",
        "shards": [0],
        "num_produced_blocks": 213,
        "num_expected_blocks": 213
      },
      {
        "account_id": "top.pool.f863973.m0",
        "public_key": "ed25519:FR5qxAsP8GgXDN96pappLtWMywiqWsPVqT3HLE3YaUx",
        "is_slashed": false,
        "stake": "164760602493727447176131601464",
        "shards": [0],
        "num_produced_blocks": 213,
        "num_expected_blocks": 213
      },
      {
        "account_id": "valeraverim.pool.f863973.m0",
        "public_key": "ed25519:3686ABqNUZc1qhLWLHg5xZpBzrWPiUCMNZxcCNmg3e2s",
        "is_slashed": false,
        "stake": "191733144511459134091274432419",
        "shards": [0],
        "num_produced_blocks": 213,
        "num_expected_blocks": 213
      },
      {
        "account_id": "zainy.pool.f863973.m0",
        "public_key": "ed25519:37KfhBNYjqpaUVh3ft5kPcFn3xK1eVvtDZJCQQVCGnzQ",
        "is_slashed": false,
        "stake": "113441017844444454951489924484",
        "shards": [0],
        "num_produced_blocks": 213,
        "num_expected_blocks": 213
      },
      {
        "account_id": "zpool.pool.f863973.m0",
        "public_key": "ed25519:ETFRFNHfvd6fpj74MGYYQp3diY8WB4bFmWMxjTB2yY4V",
        "is_slashed": false,
        "stake": "140932616764414290525265048028",
        "shards": [0],
        "num_produced_blocks": 120,
        "num_expected_blocks": 212
      }
    ],
    "next_validators": [
      {
        "account_id": "01node.pool.f863973.m0",
        "public_key": "ed25519:3iNqnvBgxJPXCxu6hNdvJso1PEAc1miAD35KQMBCA3aL",
        "stake": "177341160716540400974121040893",
        "shards": [0]
      },
      {
        "account_id": "alexandruast.pool.f863973.m0",
        "public_key": "ed25519:A3XJ3uVGxSi9o2gnG2r8Ra3fqqodRpL4iuLTc6fNdGUj",
        "stake": "152212670433756011274558210225",
        "shards": [0]
      },
      {
        "account_id": "aquarius.pool.f863973.m0",
        "public_key": "ed25519:8NfEarjStDYjJTwKUgQGy7Z7UTGsZaPhTUsExheQN3r1",
        "stake": "131041030638338742265060835987",
        "shards": [0]
      },
      {
        "account_id": "bazilik.pool.f863973.m0",
        "public_key": "ed25519:3pDJwDQ6Y5B9QeW1jz8KunhZH4D4GQG86reTmrRfdD7c",
        "stake": "169886556654364796730036727847",
        "shards": [0]
      },
      {
        "account_id": "bisontrails.pool.f863973.m0",
        "public_key": "ed25519:8g4P5EXyp2b2pfVMHY1QLfkRcY59hjPfWrFCKUWX3RmR",
        "stake": "185113946165399113822995097304",
        "shards": [0]
      },
      {
        "account_id": "bitcat.pool.f863973.m0",
        "public_key": "ed25519:9mtnwPQyyap1QNH9ag6r4the7Jkkpdyt9HUF5G1dWxKx",
        "stake": "135914020962862866419944507506",
        "shards": [0]
      },
      {
        "account_id": "blazenet.pool.f863973.m0",
        "public_key": "ed25519:DiogP36wBXKFpFeqirrxN8G2Mq9vnakgBvgnHdL9CcN3",
        "stake": "138073840925159254185212483041",
        "shards": [0]
      },
      {
        "account_id": "certusone.pool.f863973.m0",
        "public_key": "ed25519:CKW7f41Kn8YCDPzaGLs1MrPb9h3BjQmHhbei6Ff6nRRF",
        "stake": "177557353126393581856047095474",
        "shards": [0]
      },
      {
        "account_id": "chorus-one.pool.f863973.m0",
        "public_key": "ed25519:6LFwyEEsqhuDxorWfsKcPPs324zLWTaoqk4o6RDXN7Qc",
        "stake": "110967904880664326100649881128",
        "shards": [0]
      },
      {
        "account_id": "cloudpost.pool.f863973.m0",
        "public_key": "ed25519:AVVLmJDG8z6UgmW9fmJGVFTdYxxfnqXH6c7FVQmhE6dp",
        "stake": "137303582563490110045159846741",
        "shards": [0]
      },
      {
        "account_id": "dokia.pool.f863973.m0",
        "public_key": "ed25519:935JMz1vLcJxFApG3TY4MA4RHhvResvoGwCrQoJxHPn9",
        "stake": "221583843027440134728813179120",
        "shards": [0]
      },
      {
        "account_id": "dsrvlabs.pool.f863973.m0",
        "public_key": "ed25519:61ei2efmmLkeDR1CG6JDEC2U3oZCUuC2K1X16Vmxrud9",
        "stake": "162343309156672629963246208215",
        "shards": [0]
      },
      {
        "account_id": "fresh_lockup.pool.f863973.m0",
        "public_key": "ed25519:7CMFLtEohojtxBkmj9Jb6AGgbphb1zvxymHzpzuyCjfG",
        "stake": "194574146707912827852030100603",
        "shards": [0]
      },
      {
        "account_id": "inotel.pool.f863973.m0",
        "public_key": "ed25519:C55jH1MCHYGa3tzUyZZdGrJmmCLP22Aa4v88KYpn2xwZ",
        "stake": "179521497218882663562358374377",
        "shards": [0]
      },
      {
        "account_id": "jazza.pool.f863973.m0",
        "public_key": "ed25519:85cPMNVrqUz8N7oWbbvWbUuamHcJNe49uRbaSzftLCz9",
        "stake": "156567004141558073310769195719",
        "shards": [0]
      },
      {
        "account_id": "joe1.pool.f863973.m0",
        "public_key": "ed25519:G3SxwzmiEZSm3bHnTLtxJvm3NvT1TLQcWuV1iod6i6NJ",
        "stake": "129898367221448376460128575495",
        "shards": [0]
      },
      {
        "account_id": "kronos.pool.f863973.m0",
        "public_key": "ed25519:3i2pertqzF8xqkJ4BrE4t4r67YiYYrUKCktbqvDgjzuQ",
        "stake": "145291600307308103830278523851",
        "shards": [0]
      },
      {
        "account_id": "kytzu.pool.f863973.m0",
        "public_key": "ed25519:61tgPZpy8tqFeAwG4vtf2ZKCRoENiP2A1TJVWEwnbxZU",
        "stake": "114346099616381729581424582943",
        "shards": [0]
      },
      {
        "account_id": "lowfeevalidation.pool.f863973.m0",
        "public_key": "ed25519:EXyjSMGSnk5uGphF3gVV1jCudaAudbW8imoEccYEJg3V",
        "stake": "114272827178534171015566175242",
        "shards": [0]
      },
      {
        "account_id": "lunanova.pool.f863973.m0",
        "public_key": "ed25519:2fZ59qfo9QHNLijoht9cwUb9enSNcnRmXbQn1gKZxvkw",
        "stake": "173796241314359640924313305613",
        "shards": [0]
      },
      {
        "account_id": "moonlet.pool.f863973.m0",
        "public_key": "ed25519:3e1nVCVGNS3yr6CcUvpDAs3BhiWtyM9uTBWkyVR5Xn3K",
        "stake": "141326111231422084384405939935",
        "shards": [0]
      },
      {
        "account_id": "node0",
        "public_key": "ed25519:7PGseFbWxvYVgZ89K1uTJKYoKetWs7BJtbyXDzfbAcqX",
        "stake": "1917087533938315356792420553580",
        "shards": [0]
      },
      {
        "account_id": "node1",
        "public_key": "ed25519:6DSjZ8mvsRZDvFqFxo8tCKePG96omXW7eVYVSySmDk8e",
        "stake": "1915912070849706566898523265362",
        "shards": [0]
      },
      {
        "account_id": "node2",
        "public_key": "ed25519:GkDv7nSMS3xcqA45cpMvFmfV1o4fRF6zYo1JRR6mNqg5",
        "stake": "1849778202731933988446605407109",
        "shards": [0]
      },
      {
        "account_id": "node3",
        "public_key": "ed25519:ydgzeXHJ5Xyt7M1gXLxqLBW1Ejx6scNV5Nx2pxFM8su",
        "stake": "1253713857932062021626652303305",
        "shards": [0]
      },
      {
        "account_id": "nodeasy.pool.f863973.m0",
        "public_key": "ed25519:25Dhg8NBvQhsVTuugav3t1To1X1zKiomDmnh8yN9hHMb",
        "stake": "132333065508677559475570461579",
        "shards": [0]
      },
      {
        "account_id": "northernlights.stakingpool",
        "public_key": "ed25519:CsMecqKCfagnebMB3ha1uRubay5Z4V85req23bNAJSG3",
        "stake": "160494659810582810750858869593",
        "shards": [0]
      },
      {
        "account_id": "orangeclub.pool.f863973.m0",
        "public_key": "ed25519:HezFeSzcwuR5wvkqccgMCMnpf1eQkVCfk52tXZEdKZHz",
        "stake": "144714977470413958038055754809",
        "shards": [0]
      },
      {
        "account_id": "pathrock.pool.f863973.m0",
        "public_key": "ed25519:G138GdQsU7PdFLD6X88NmTLAEDR7agPcq9HLZqGpegkm",
        "stake": "125851226796631921571804668732",
        "shards": [0]
      },
      {
        "account_id": "pool_easy2stake.pool.f863973.m0",
        "public_key": "ed25519:8nzKxvmyeauQRehWkby8GfWNLgqPiF5FCRFSD75M1Rwh",
        "stake": "177807549352374182247265978294",
        "shards": [0]
      },
      {
        "account_id": "sl1sub.pool.f863973.m0",
        "public_key": "ed25519:3URBpNUjNAMzugQH1rdSKMtwFM8AwHaJgZk5Z6YtnfFL",
        "stake": "156546228606913052982706314599",
        "shards": [0]
      },
      {
        "account_id": "staked.pool.6fb1358",
        "public_key": "ed25519:684rMbuVYYgL2CkmYgC1weLh3erd2bwrmtQtJJhWzPwj",
        "stake": "127566960646771620637977634520",
        "shards": [0]
      },
      {
        "account_id": "staked.pool.f863973.m0",
        "public_key": "ed25519:D2afKYVaKQ1LGiWbMAZRfkKLgqimTR74wvtESvjx5Ft2",
        "stake": "141284196855966747583242721111",
        "shards": [0]
      },
      {
        "account_id": "stakin.pool.f863973.m0",
        "public_key": "ed25519:GvddxjaxBCqGGB4kMNWNFtvozU1EEZ2jrnggKZW8LaU4",
        "stake": "122853080560791799567241762038",
        "shards": [0]
      },
      {
        "account_id": "staking-power.pool.f863973.m0",
        "public_key": "ed25519:4s79F6Fdjgb3rHXPLwaXZG4Hq7Za8nogUu3vXEamRBQo",
        "stake": "113878597697173990840757447344",
        "shards": [0]
      },
      {
        "account_id": "syncnode.pool.f863973.m0",
        "public_key": "ed25519:FUAVDkmLhuTbKYv4GWuWv9ogjKzRatLd5ZBMKXRy7WqE",
        "stake": "134103630138795323490241660174",
        "shards": [0]
      },
      {
        "account_id": "thepassivetrust.pool.f863973.m0",
        "public_key": "ed25519:4NccD2DNJpBkDmWeJ2GbqPoivQ93qcKiR4PHALJKCTod",
        "stake": "163554668234785516757420218799",
        "shards": [0]
      },
      {
        "account_id": "top.pool.f863973.m0",
        "public_key": "ed25519:FR5qxAsP8GgXDN96pappLtWMywiqWsPVqT3HLE3YaUx",
        "stake": "165611741467072665024638629174",
        "shards": [0]
      },
      {
        "account_id": "valeraverim.pool.f863973.m0",
        "public_key": "ed25519:3686ABqNUZc1qhLWLHg5xZpBzrWPiUCMNZxcCNmg3e2s",
        "stake": "192723621295992295990275575014",
        "shards": [0]
      },
      {
        "account_id": "zainy.pool.f863973.m0",
        "public_key": "ed25519:37KfhBNYjqpaUVh3ft5kPcFn3xK1eVvtDZJCQQVCGnzQ",
        "stake": "114027175849273464802110072969",
        "shards": [0]
      },
      {
        "account_id": "zpool.pool.f863973.m0",
        "public_key": "ed25519:ETFRFNHfvd6fpj74MGYYQp3diY8WB4bFmWMxjTB2yY4V",
        "stake": "141660662431449802378487016195",
        "shards": [0]
      }
    ],
    "current_fishermen": [
      {
        "account_id": "staked.stakingpool",
        "public_key": "ed25519:5VmCXxWepj22uFoKmrxk6DTiFa3fuTzDcwGxM8uUErpr",
        "stake": "5957256918881889179239884296"
      },
      {
        "account_id": "bisontrails.stakingpool",
        "public_key": "ed25519:ED2v5KtScbk6aNjGcTn1YMDUu3EXfD5HPt1x6RiYBypk",
        "stake": "7679439354334034871130713908"
      },
      {
        "account_id": "cryptium.stakingpool",
        "public_key": "ed25519:2usUkjmKWxQw7QUeFfELHCEqS2UxjwsRqnCkA5oQ6A2B",
        "stake": "6484546971716985483357166277"
      },
      {
        "account_id": "buildlinks3.pool.f863973.m0",
        "public_key": "ed25519:Cfy8xjSsvVquSqo7W4A2bRX1vkLPycLgyCvFNs3Rz6bb",
        "stake": "81221864655530313350540629757"
      },
      {
        "account_id": "mmm.pool.f863973.m0",
        "public_key": "ed25519:3jEqDDKaJEg1r8UGu2x2dC55BXE7i26yNFQzvfJkkHkf",
        "stake": "80030001196381772535600000000"
      }
    ],
    "next_fishermen": [
      {
        "account_id": "staked.stakingpool",
        "public_key": "ed25519:5VmCXxWepj22uFoKmrxk6DTiFa3fuTzDcwGxM8uUErpr",
        "stake": "5957256918881889179239884296"
      },
      {
        "account_id": "bisontrails.stakingpool",
        "public_key": "ed25519:ED2v5KtScbk6aNjGcTn1YMDUu3EXfD5HPt1x6RiYBypk",
        "stake": "7679439354334034871130713908"
      },
      {
        "account_id": "cryptium.stakingpool",
        "public_key": "ed25519:2usUkjmKWxQw7QUeFfELHCEqS2UxjwsRqnCkA5oQ6A2B",
        "stake": "6484546971716985483357166277"
      },
      {
        "account_id": "buildlinks3.pool.f863973.m0",
        "public_key": "ed25519:Cfy8xjSsvVquSqo7W4A2bRX1vkLPycLgyCvFNs3Rz6bb",
        "stake": "81221864655530313350540629757"
      },
      {
        "account_id": "mmm.pool.f863973.m0",
        "public_key": "ed25519:3jEqDDKaJEg1r8UGu2x2dC55BXE7i26yNFQzvfJkkHkf",
        "stake": "80030001196381772535600000000"
      }
    ],
    "current_proposals": [
      {
        "account_id": "kytzu.pool.f863973.m0",
        "public_key": "ed25519:61tgPZpy8tqFeAwG4vtf2ZKCRoENiP2A1TJVWEwnbxZU",
        "stake": "114346100195275968419224582943"
      },
      {
        "account_id": "nodeasy.pool.f863973.m0",
        "public_key": "ed25519:25Dhg8NBvQhsVTuugav3t1To1X1zKiomDmnh8yN9hHMb",
        "stake": "132333066144809013154670461579"
      },
      {
        "account_id": "thepassivetrust.pool.f863973.m0",
        "public_key": "ed25519:4NccD2DNJpBkDmWeJ2GbqPoivQ93qcKiR4PHALJKCTod",
        "stake": "163554672455685458970920218837"
      }
    ],
    "prev_epoch_kickout": [],
    "epoch_start_height": 17754191
  },
  "id": "dontcare"
}
```

</p>
</details>

---

## Transactions

---

### Send transaction (async)

> Sends a transaction and immediately returns transaction hash.

- method: `broadcast_tx_async`

Example:

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "broadcast_tx_async",
  "params": [
    "DgAAAHNlbmRlci50ZXN0bmV0AOrmAai64SZOv9e/naX4W15pJx0GAap35wTT1T/DwcbbDwAAAAAAAAAQAAAAcmVjZWl2ZXIudGVzdG5ldNMnL7URB1cxPOu3G8jTqlEwlcasagIbKlAJlF5ywVFLAQAAAAMAAACh7czOG8LTAAAAAAAAAGQcOG03xVSFQFjoagOb4NBBqWhERnnz45LY4+52JgZhm1iQKz7qAdPByrGFDQhQ2Mfga8RlbysuQ8D8LlA6bQE="
  ]
}
```

<details>
<summary>HTTPie example: </summary>
<p>

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=broadcast_tx_async \
    params:='[
        "DgAAAHNlbmRlci50ZXN0bmV0AOrmAai64SZOv9e/naX4W15pJx0GAap35wTT1T/DwcbbDwAAAAAAAAAQAAAAcmVjZWl2ZXIudGVzdG5ldNMnL7URB1cxPOu3G8jTqlEwlcasagIbKlAJlF5ywVFLAQAAAAMAAACh7czOG8LTAAAAAAAAAGQcOG03xVSFQFjoagOb4NBBqWhERnnz45LY4+52JgZhm1iQKz7qAdPByrGFDQhQ2Mfga8RlbysuQ8D8LlA6bQE="
    ]'
```

</p>
</details>
<br>

Example response:

```json
{
  "jsonrpc": "2.0",
  "result": "6zgh2u9DqHHiXzdy9ouTP7oGky2T4nugqzqt9wJZwNFm",
  "id": "dontcare"
}
```

Final transaction results can be queried using [Transaction Status](/docs/api/rpc#transaction-status)
or [NEAR Explorer](https://explorer.testnet.near.org/) using the above `result` hash returning a result similar to the example below.

![NEAR-Explorer-transactionHash](/docs/assets/NEAR-Explorer-transactionHash.png)

---

### Send transaction (await)

> Sends a transaction and waits until transaction is fully complete. _(Has a 10 second timeout)_

- method: `broadcast_tx_commit`
- params: `[SignedTransaction encoded in base64]`

Example:

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "broadcast_tx_commit",
  "params": [
    "DgAAAHNlbmRlci50ZXN0bmV0AOrmAai64SZOv9e/naX4W15pJx0GAap35wTT1T/DwcbbDQAAAAAAAAAQAAAAcmVjZWl2ZXIudGVzdG5ldIODI4YfV/QS++blXpQYT+bOsRblTRW4f547y/LkvMQ9AQAAAAMAAACh7czOG8LTAAAAAAAAAAXcaTJzu9GviPT7AD4mNJGY79jxTrjFLoyPBiLGHgBi8JK1AnhK8QknJ1ourxlvOYJA2xEZE8UR24THmSJcLQw="
  ]
}
```

<details>
<summary>HTTPie example: </summary>
<p>

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=broadcast_tx_commit \
    params:='[
        "DwAAAG5lYXJrYXQudGVzdG5ldABuTi5L1rwnlb35hc9tn5WELkxfiGfGh1Q5aeGNQDejo0QAAAAAAAAAEAAAAGpvc2hmb3JkLnRlc3RuZXSiWAc6W9KlqXS5fK+vjFRDV5pAxHRKU0srKX/cmdRTBgEAAAADAAAAoe3MzhvC0wAAAAAAAAB9rOE9zc5zQYLL1j6VTh3I4fQbERs6I07gJfrAC6jo8DB4HolR9Xps3v4qrZxkgZjwv6wB0QOROM4UEbeOaBoB"
    ]'
```

</p>
</details>

<details>
<summary>Example response: </summary>
<p>

```json
{
  "jsonrpc": "2.0",
  "result": {
    "status": {
      "SuccessValue": ""
    },
    "transaction": {
      "signer_id": "sender.testnet",
      "public_key": "ed25519:Gowpa4kXNyTMRKgt5W7147pmcc2PxiFic8UHW9rsNvJ6",
      "nonce": 13,
      "receiver_id": "receiver.testnet",
      "actions": [
        {
          "Transfer": {
            "deposit": "1000000000000000000000000"
          }
        }
      ],
      "signature": "ed25519:7oCBMfSHrZkT7tzPDBxxCd3tWFhTES38eks3MCZMpYPJRfPWKxJsvmwQiVBBxRLoxPTnXVaMU2jPV3MdFKZTobH",
      "hash": "ASS7oYwGiem9HaNwJe6vS2kznx2CxueKDvU9BAYJRjNR"
    },
    "transaction_outcome": {
      "proof": [],
      "block_hash": "9MzuZrRPW1BGpFnZJUJg6SzCrixPpJDfjsNeUobRXsLe",
      "id": "ASS7oYwGiem9HaNwJe6vS2kznx2CxueKDvU9BAYJRjNR",
      "outcome": {
        "logs": [],
        "receipt_ids": ["BLV2q6p8DX7pVgXRtGtBkyUNrnqkNyU7iSksXG7BjVZh"],
        "gas_burnt": 223182562500,
        "tokens_burnt": "22318256250000000000",
        "executor_id": "sender.testnet",
        "status": {
          "SuccessReceiptId": "BLV2q6p8DX7pVgXRtGtBkyUNrnqkNyU7iSksXG7BjVZh"
        }
      }
    },
    "receipts_outcome": [
      {
        "proof": [],
        "block_hash": "5Hpj1PeCi32ZkNXgiD1DrW4wvW4Xtic74DJKfyJ9XL3a",
        "id": "BLV2q6p8DX7pVgXRtGtBkyUNrnqkNyU7iSksXG7BjVZh",
        "outcome": {
          "logs": [],
          "receipt_ids": ["3sawynPNP8UkeCviGqJGwiwEacfPyxDKRxsEWPpaUqtR"],
          "gas_burnt": 223182562500,
          "tokens_burnt": "22318256250000000000",
          "executor_id": "receiver.testnet",
          "status": {
            "SuccessValue": ""
          }
        }
      },
      {
        "proof": [],
        "block_hash": "CbwEqMpPcu6KwqVpBM3Ry83k6M4H1FrJjES9kBXThcRd",
        "id": "3sawynPNP8UkeCviGqJGwiwEacfPyxDKRxsEWPpaUqtR",
        "outcome": {
          "logs": [],
          "receipt_ids": [],
          "gas_burnt": 0,
          "tokens_burnt": "0",
          "executor_id": "sender.testnet",
          "status": {
            "SuccessValue": ""
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

### Transaction Status

> Queries status of a transaction by hash and returns the final transaction result.

- method: `tx`
- params:
  - `transaction hash` _(see [NEAR Explorer](https://explorer.testnet.near.org) for a valid transaction hash)_
  - `sender account id`

Example:

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "tx",
  "params": ["6zgh2u9DqHHiXzdy9ouTP7oGky2T4nugqzqt9wJZwNFm", "sender.testnet"]
}
```

<details>
<summary>HTTPie example: </summary>
<p>

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=tx \
    params:='[ "6zgh2u9DqHHiXzdy9ouTP7oGky2T4nugqzqt9wJZwNFm", "sender.testnet"]'
```

</p>
</details>

<details>
<summary>Example Result:</summary>
<p>

```json
{
  "jsonrpc": "2.0",
  "result": {
    "status": {
      "SuccessValue": ""
    },
    "transaction": {
      "signer_id": "sender.testnet",
      "public_key": "ed25519:Gowpa4kXNyTMRKgt5W7147pmcc2PxiFic8UHW9rsNvJ6",
      "nonce": 15,
      "receiver_id": "receiver.testnet",
      "actions": [
        {
          "Transfer": {
            "deposit": "1000000000000000000000000"
          }
        }
      ],
      "signature": "ed25519:3168QMdTpcwHvM1dmMYBc8hg9J3Wn8n7MWBSE9WrEpns6P5CaY87RM6k4uzyBkQuML38CZhU18HzmQEevPG1zCvk",
      "hash": "6zgh2u9DqHHiXzdy9ouTP7oGky2T4nugqzqt9wJZwNFm"
    },
    "transaction_outcome": {
      "proof": [
        {
          "hash": "F7mL76CMdfbdZ3xCehVGNh1fCyaR37gr3MeGX3EZkiVf",
          "direction": "Right"
        }
      ],
      "block_hash": "ADTMLVtkhsvzUxuf6m87Pt1dnF5vi1yY7ftxmNpFx7y",
      "id": "6zgh2u9DqHHiXzdy9ouTP7oGky2T4nugqzqt9wJZwNFm",
      "outcome": {
        "logs": [],
        "receipt_ids": ["3dMfwczW5GQqXbD9GMTnmf8jy5uACxG6FC5dWxm3KcXT"],
        "gas_burnt": 223182562500,
        "tokens_burnt": "22318256250000000000",
        "executor_id": "sender.testnet",
        "status": {
          "SuccessReceiptId": "3dMfwczW5GQqXbD9GMTnmf8jy5uACxG6FC5dWxm3KcXT"
        }
      }
    },
    "receipts_outcome": [
      {
        "proof": [
          {
            "hash": "6h95oEd7ih62KXfyPT4zsZYont4qy9sWEXc5VQVDhqtG",
            "direction": "Right"
          },
          {
            "hash": "6DnibgZk1T669ZprcehUy1GpCSPw1kjzXRGu69nSaUNn",
            "direction": "Right"
          }
        ],
        "block_hash": "GgFTVr33r4MrpAiHc9mr8TZqLnpZAX1BaZTNvhBnciy2",
        "id": "3dMfwczW5GQqXbD9GMTnmf8jy5uACxG6FC5dWxm3KcXT",
        "outcome": {
          "logs": [],
          "receipt_ids": ["46KYgN8ddxs4Qy8C7BDQH49XUfcYZsaQmAvdU1nfcL9V"],
          "gas_burnt": 223182562500,
          "tokens_burnt": "22318256250000000000",
          "executor_id": "receiver.testnet",
          "status": {
            "SuccessValue": ""
          }
        }
      },
      {
        "proof": [
          {
            "hash": "CD9Y7Bw3MSFgaPZzpc1yP51ajhGDCAsR61qXcMNcRoHf",
            "direction": "Left"
          }
        ],
        "block_hash": "EGAgKuW6Bd6QKYSaxAkx2pPGmnjrjAcq4UpoUiqMXvPH",
        "id": "46KYgN8ddxs4Qy8C7BDQH49XUfcYZsaQmAvdU1nfcL9V",
        "outcome": {
          "logs": [],
          "receipt_ids": [],
          "gas_burnt": 0,
          "tokens_burnt": "0",
          "executor_id": "sender.testnet",
          "status": {
            "SuccessValue": ""
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

<blockquote class="warning">
<strong>heads up</strong><br><br>

In the case of function call transactions, this query will not wait for **all** receipts generated by this transaction to finish before returning a result. Rather, it will only wait for its return value to finish before returning; _which could be a promise_.

Let's say a transaction only contains a "function call" action that calls a `transfer()` method like the one below _(written in [Rust](https://www.rust-lang.org/))_. It will only wait for the "function call" receipt, not necessarily the receipt from the actual transfer of funds to finish before returning a result.

```rust
pub fn transfer(receiver_id: String) {
    Promise::new(receiver_id).transfer(10);
}
```

However, if we slightly modify the function to have the promise as a return value, then the `tx` status query will wait for this promise to finish _before_ returning results.

```rust
pub fn transfer_promise(receiver_id: String) -> Promise {
    Promise::new(receiver_id).transfer(10)
}
```

Despite such design, the `tx` endpoint can be used to check whether all receipts have finished.

Instead of looking at the main result `status`, we can check all of the receipts
returned `status` and see if any are `Unknown`. If none of the receipts statuses are unknown, we can be certain that all receipts generated have finished.

In addition, `tx` endpoint does not provide finality guarantees. To make sure that the entire execution is final, it suffices to ensure every `block_hash` in every outcome is `final`.

</blockquote>

---

### Transaction Status with Receipts

> Queries status of a transaction by hash, returning the final transaction result _and_ details of all receipts.

- method: `EXPERIMENTAL_tx_status`
- params:
  - `transaction hash` _(see [NEAR Explorer](https://explorer.testnet.near.org) for a valid transaction hash)_
  - `sender account id` _(used to determine which shard to query for transaction)_

Example:

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "EXPERIMENTAL_tx_status",
  "params": ["HEgnVQZfs9uJzrqTob4g2Xmebqodq9waZvApSkrbcAhd", "bowen"]
}
```

<details>
<summary>HTTPie example: </summary>
<p>

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 method=EXPERIMENTAL_tx_status params:='["HEgnVQZfs9uJzrqTob4g2Xmebqodq9waZvApSkrbcAhd", "bowen"]'' id=dontcare
```

</p>
</details>

<details><summary>Example response:</summary>
<p>

```json
{
  "id": "123",
  "jsonrpc": "2.0",
  "result": {
    "receipts": [
      {
        "predecessor_id": "bowen",
        "receipt": {
          "Action": {
            "actions": [
              {
                "FunctionCall": {
                  "args": "eyJhbW91bnQiOiIxMDAwIiwicmVjZWl2ZXJfaWQiOiJib3dlbiJ9",
                  "deposit": "0",
                  "gas": 100000000000000,
                  "method_name": "transfer"
                }
              }
            ],
            "gas_price": "186029458",
            "input_data_ids": [],
            "output_data_receivers": [],
            "signer_id": "bowen",
            "signer_public_key": "ed25519:2f9Zv5kuyuPM5DCyEP5pSqg58NQ8Ct9uSRerZXnCS9fK"
          }
        },
        "receipt_id": "FXMVxdhSUZaZftbmPJWaoqhEB9GrKB2oqg9Wgvuyvom8",
        "receiver_id": "evgeny.lockup.m0"
      },
      {
        "predecessor_id": "evgeny.lockup.m0",
        "receipt": {
          "Action": {
            "actions": [
              {
                "Transfer": {
                  "deposit": "1000"
                }
              }
            ],
            "gas_price": "186029458",
            "input_data_ids": [],
            "output_data_receivers": [],
            "signer_id": "bowen",
            "signer_public_key": "ed25519:2f9Zv5kuyuPM5DCyEP5pSqg58NQ8Ct9uSRerZXnCS9fK"
          }
        },
        "receipt_id": "3Ad7pUygUegMUWUb1rEazfjnTaHfptXCABqKQ6WNq6Wa",
        "receiver_id": "bowen"
      },
      {
        "predecessor_id": "system",
        "receipt": {
          "Action": {
            "actions": [
              {
                "Transfer": {
                  "deposit": "19200274886926125000"
                }
              }
            ],
            "gas_price": "0",
            "input_data_ids": [],
            "output_data_receivers": [],
            "signer_id": "bowen",
            "signer_public_key": "ed25519:2f9Zv5kuyuPM5DCyEP5pSqg58NQ8Ct9uSRerZXnCS9fK"
          }
        },
        "receipt_id": "5DdQg9pfoJMX1q6bvhsjyyRihzA3sb9Uq5K1J7vK43Ze",
        "receiver_id": "bowen"
      },
      {
        "predecessor_id": "system",
        "receipt": {
          "Action": {
            "actions": [
              {
                "Transfer": {
                  "deposit": "18663792669276228632284"
                }
              }
            ],
            "gas_price": "0",
            "input_data_ids": [],
            "output_data_receivers": [],
            "signer_id": "bowen",
            "signer_public_key": "ed25519:2f9Zv5kuyuPM5DCyEP5pSqg58NQ8Ct9uSRerZXnCS9fK"
          }
        },
        "receipt_id": "FDp8ovTf5uJYDFemW5op6ebjCT2n4CPExHYie3S1h4qp",
        "receiver_id": "bowen"
      }
    ],
    "receipts_outcome": [
      {
        "block_hash": "HuqYrYsC7h2VERFMgFkqaNqSiFuTH9CA3uJr3BkyNxhF",
        "id": "FXMVxdhSUZaZftbmPJWaoqhEB9GrKB2oqg9Wgvuyvom8",
        "outcome": {
          "executor_id": "evgeny.lockup.m0",
          "gas_burnt": 3493189769144,
          "logs": ["Transferring 1000 to account @bowen"],
          "receipt_ids": [
            "3Ad7pUygUegMUWUb1rEazfjnTaHfptXCABqKQ6WNq6Wa",
            "FDp8ovTf5uJYDFemW5op6ebjCT2n4CPExHYie3S1h4qp"
          ],
          "status": {
            "SuccessReceiptId": "3Ad7pUygUegMUWUb1rEazfjnTaHfptXCABqKQ6WNq6Wa"
          },
          "tokens_burnt": "349318976914400000000"
        },
        "proof": [
          {
            "direction": "Right",
            "hash": "5WwHEszBcpfrHnt2VTvVDVnEEACNq5EpQdjz1aW9gTAa"
          }
        ]
      },
      {
        "block_hash": "DJ6oK5FtPPSwksS6pKdEjFvHWAaSVocnVNLoyi8aYk1k",
        "id": "3Ad7pUygUegMUWUb1rEazfjnTaHfptXCABqKQ6WNq6Wa",
        "outcome": {
          "executor_id": "bowen",
          "gas_burnt": 223182562500,
          "logs": [],
          "receipt_ids": ["5DdQg9pfoJMX1q6bvhsjyyRihzA3sb9Uq5K1J7vK43Ze"],
          "status": {
            "SuccessValue": ""
          },
          "tokens_burnt": "22318256250000000000"
        },
        "proof": [
          {
            "direction": "Right",
            "hash": "CXSXmKpDU8R3UUrBAsffWMeGfKanKqEHCQrHeZkR3RKT"
          },
          {
            "direction": "Right",
            "hash": "2dNo7A1VHKBmMA86m1k3Z9DVXwWgQJGkKGRg8wUR3co9"
          }
        ]
      },
      {
        "block_hash": "9cjUoqAksMbs7ZJ4CXiuwm8vppz9QctTwGmgwZ5mDmUA",
        "id": "5DdQg9pfoJMX1q6bvhsjyyRihzA3sb9Uq5K1J7vK43Ze",
        "outcome": {
          "executor_id": "bowen",
          "gas_burnt": 0,
          "logs": [],
          "receipt_ids": [],
          "status": {
            "SuccessValue": ""
          },
          "tokens_burnt": "0"
        },
        "proof": []
      },
      {
        "block_hash": "DJ6oK5FtPPSwksS6pKdEjFvHWAaSVocnVNLoyi8aYk1k",
        "id": "FDp8ovTf5uJYDFemW5op6ebjCT2n4CPExHYie3S1h4qp",
        "outcome": {
          "executor_id": "bowen",
          "gas_burnt": 0,
          "logs": [],
          "receipt_ids": [],
          "status": {
            "SuccessValue": ""
          },
          "tokens_burnt": "0"
        },
        "proof": [
          {
            "direction": "Left",
            "hash": "A2Ry6NCeuK8WhRCWc41hy6uddadc5nLJ1NBX5wVYo3Yb"
          },
          {
            "direction": "Right",
            "hash": "2dNo7A1VHKBmMA86m1k3Z9DVXwWgQJGkKGRg8wUR3co9"
          }
        ]
      }
    ],
    "status": {
      "SuccessValue": ""
    },
    "transaction": {
      "actions": [
        {
          "FunctionCall": {
            "args": "eyJhbW91bnQiOiIxMDAwIiwicmVjZWl2ZXJfaWQiOiJib3dlbiJ9",
            "deposit": "0",
            "gas": 100000000000000,
            "method_name": "transfer"
          }
        }
      ],
      "hash": "HEgnVQZfs9uJzrqTob4g2Xmebqodq9waZvApSkrbcAhd",
      "nonce": 77,
      "public_key": "ed25519:2f9Zv5kuyuPM5DCyEP5pSqg58NQ8Ct9uSRerZXnCS9fK",
      "receiver_id": "evgeny.lockup.m0",
      "signature": "ed25519:5v1hJuw5RppKGezJHBFU6z3hwmmdferETud9rUbwxVf6xSBAWyiod93Lezaq4Zdcp4zbukDusQY9PjhV47JVCgBx",
      "signer_id": "bowen"
    },
    "transaction_outcome": {
      "block_hash": "9RX2pefXKw8M4EYjLznDF3AMvbkf9asAjN8ACK7gxKsa",
      "id": "HEgnVQZfs9uJzrqTob4g2Xmebqodq9waZvApSkrbcAhd",
      "outcome": {
        "executor_id": "bowen",
        "gas_burnt": 2428026088898,
        "logs": [],
        "receipt_ids": ["FXMVxdhSUZaZftbmPJWaoqhEB9GrKB2oqg9Wgvuyvom8"],
        "status": {
          "SuccessReceiptId": "FXMVxdhSUZaZftbmPJWaoqhEB9GrKB2oqg9Wgvuyvom8"
        },
        "tokens_burnt": "242802608889800000000"
      },
      "proof": [
        {
          "direction": "Right",
          "hash": "DXf4XVmAF5jnjZhcxi1CYxGPuuQrcAmayq9X5inSAYvJ"
        }
      ]
    }
  }
}
```

</p>
</details>
