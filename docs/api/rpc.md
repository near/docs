---
id: rpc
title: RPC
sidebar_label: RPC
---

## Setup

- `POST` for all methods
- `JSON RPC 2.0`
- `id: "dontcare"`
- endpoint URL varies by network:
  - MainNet `https://rpc.mainnet.near.org`
  - TestNet `https://rpc.testnet.near.org`
  - BetaNet `https://rpc.betanet.near.org` _(may be unstable)_

You can see this interface defined in `nearcore` [here](https://github.com/nearprotocol/nearcore/blob/master/chain/jsonrpc/client/src/lib.rs#L185).

An easy way to test the examples below, would be to use an API request tool such as [Postman](https://www.postman.com/). You will only need to configure two things:

  1) Make sure you add a header with a key of `Content-Type` and value of `application/json`.
  ![postman-setup-header](/docs/assets/postman-setup-headers.png)

  2) Then select the `Body` tab and choose the `raw` radio button and ensure `JSON` is the selected format.
   ![postman-setup-header](/docs/assets/postman-setup-body.png)

After that is setup, just copy/paste the `JSON object` example snippets below into the `body` of your request, on Postman, and click `send`.

If you prefer to use a command line interface, such as [HTTPie](https://httpie.org/) the format is as follows:

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=query params:='{}' 
```
Note: For HTTPie, params use either an object or array as a string.

## Accounts / Contracts

### View account
 Returns view of account information.
  - method: `query`
  - params 
     - `request_type`: `view_account`
     - `finality`: `optimistic`, `near-final`, or `final`
     - `account_id`: `example.testnet`

JSON example:
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
HTTPie example:
```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=query \
  params:='{
    "request_type": "view_account",
    "finality": "final",
    "account_id": "nearkat.testnet"
  }'
```

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

### View access key

Returns details about access key for given account with this public key. If there is no such access key, returns "access key ... does not exist while viewing"

- method: `query`
- params: 
   - `request_type`: `view_access_key`
   - `finality`: `optimistic`, `near-final`, or `final`
   - `account_id`: `example.testnet`
   - `public_key`: `"public_key_you_would_like_to_check"`

JSON example:
```json
{
     "jsonrpc": "2.0",
      "id": "dontcare",
      "method": "query",
      "params": {
            "request_type": "view_access_key",
            "finality": "final",
            "account_id": "near.test",
            "public_key": "ed25519:9UfaMwBArFmccTYtzq43Kk3Kdon4kd8rx7cWk57oasL"
      }
}
```
HTTPie example:

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=query \
  params:='{
    "request_type": "view_access_key",
    "finality": "final",
    "account_id": "near.test",
    "public_key": "ed25519:9UfaMwBArFmccTYtzq43K3Kdoncp4kd8rx7cWk57oasL"
  }'
```

<details>
<summary>Example response: </summary>
<p>

```json
{
    "jsonrpc": "2.0",
    "result": {
        "nonce": 0,
        "permission": {
            "FunctionCall": {
                "allowance": "100000000",
                "receiver_id": "studio-d4zxn4xdu",
                "method_names": []
            }
        },
        "block_height": 17797713,
        "block_hash": "jJhNQm42itYcXfFhXB5TkJdJdWSfXqZ2ger3LVHXRc1"
    },
    "id": "dontcare"
}
```

</p>
</details>


### View access key list

Returns <strong>all</strong> access keys for a given account.

- method: `query`
- params: 
   - `request_type`: `view_access_key_list`
   - `finality`: `optimistic`, `near-final`, or `final`
   - `account_id`: `example.testnet`

JSON example:
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

HTTPie example:
```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=query \
  params:='{
    "request_type": "view_access_key_list",
    "finality": "final",
    "account_id": "example.testnet"
  }'
```

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

### View contract state
Returns full state of the contract (might be expensive if contract has large state)
- method: `query`
- params: 
   - `request_type`: `view_state`
   - `finality`: `optimistic`, `near-final`, or `final`
   - `account_id`: `guest-book.testnet`,
   - `prefix_base64`: `""`

JSON Example:

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

HTTPie Example:

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=query \
  params:='{
    "request_type": "view_state",
    "finality": "final",
    "account_id": "guest-book.testnet",
    "prefix_base64": ""
  }'
```

**NOTE**: Values will be returned base64 encoded.

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




### Call a contract function
Allows you to call a contract method as a [view function](/docs/roles/developer/contracts/assemblyscript#view-and-change-functions).
- method: `query`
- params: 
   - `request_type`: `call_function`
   - `finality`: `optimistic`, `near-final`, or `final`
   - `account_id`: `example.testnet`
   - `method_name`: `name_of_a_example.testnet_method`
   - `args_base64`: `method_arguments_base_64_encoded`

JSON example:
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

HTTPie example:

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

<details>
<summary>Example response: </summary>
<p>

```json
{
    "jsonrpc": "2.0",
    "result": {
        "result": [
            48
        ],
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

## Block
 ### Changes in Block
 ### 
## Chunk
## Gas
## Genesis
  ### Genesis Config
  ### Genesis Records
## Transactions
### Send transaction (async)
### Send transaction (wait)
### Transaction Status

## Validators

### Validator status
- Returns general status of the current validator nodes.
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
HTTPie example:
```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 method=status params:='[]' id=dontcare
```
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

### Detailed validator status

- Queries for active validators on the network returning details and the current state of validation on the blockchain
  - method: `validators`
  - params: `["block hash"]`, `[block number]`, or `[null]` for the latest block

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

HTTPie example:
```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 method=validators params:='[null]' id=dontcare
```

**NOTE**: For `["block hash"]` & `[block number]` you will need to query recent blocks as they become garbage collected after five [epochs](/docs/concepts/epoch).

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
                "shards": [
                    0
                ],
                "num_produced_blocks": 213,
                "num_expected_blocks": 213
            },
            {
                "account_id": "alexandruast.pool.f863973.m0",
                "public_key": "ed25519:A3XJ3uVGxSi9o2gnG2r8Ra3fqqodRpL4iuLTc6fNdGUj",
                "is_slashed": false,
                "stake": "151430394143736014372434860532",
                "shards": [
                    0
                ],
                "num_produced_blocks": 213,
                "num_expected_blocks": 213
            },
            {
                "account_id": "aquarius.pool.f863973.m0",
                "public_key": "ed25519:8NfEarjStDYjJTwKUgQGy7Z7UTGsZaPhTUsExheQN3r1",
                "is_slashed": false,
                "stake": "130367563121508828296664196836",
                "shards": [
                    0
                ],
                "num_produced_blocks": 212,
                "num_expected_blocks": 212
            },
            {
                "account_id": "bazilik.pool.f863973.m0",
                "public_key": "ed25519:3pDJwDQ6Y5B9QeW1jz8KunhZH4D4GQG86reTmrRfdD7c",
                "is_slashed": false,
                "stake": "169013447850997135034919151338",
                "shards": [
                    0
                ],
                "num_produced_blocks": 211,
                "num_expected_blocks": 213
            },
            {
                "account_id": "bisontrails.pool.f863973.m0",
                "public_key": "ed25519:8g4P5EXyp2b2pfVMHY1QLfkRcY59hjPfWrFCKUWX3RmR",
                "is_slashed": false,
                "stake": "184162578269044826045352223479",
                "shards": [
                    0
                ],
                "num_produced_blocks": 213,
                "num_expected_blocks": 213
            },
            {
                "account_id": "bitcat.pool.f863973.m0",
                "public_key": "ed25519:9mtnwPQyyap1QNH9ag6r4the7Jkkpdyt9HUF5G1dWxKx",
                "is_slashed": false,
                "stake": "135215509376418353124295451543",
                "shards": [
                    0
                ],
                "num_produced_blocks": 212,
                "num_expected_blocks": 212
            },
            {
                "account_id": "blazenet.pool.f863973.m0",
                "public_key": "ed25519:DiogP36wBXKFpFeqirrxN8G2Mq9vnakgBvgnHdL9CcN3",
                "is_slashed": false,
                "stake": "137364229255641651855065314186",
                "shards": [
                    0
                ],
                "num_produced_blocks": 212,
                "num_expected_blocks": 212
            },
            {
                "account_id": "certusone.pool.f863973.m0",
                "public_key": "ed25519:CKW7f41Kn8YCDPzaGLs1MrPb9h3BjQmHhbei6Ff6nRRF",
                "is_slashed": false,
                "stake": "176644821310043228577017742667",
                "shards": [
                    0
                ],
                "num_produced_blocks": 213,
                "num_expected_blocks": 213
            },
            {
                "account_id": "chorus-one.pool.f863973.m0",
                "public_key": "ed25519:6LFwyEEsqhuDxorWfsKcPPs324zLWTaoqk4o6RDXN7Qc",
                "is_slashed": false,
                "stake": "110397600457815316527526651811",
                "shards": [
                    0
                ],
                "num_produced_blocks": 212,
                "num_expected_blocks": 213
            },
            {
                "account_id": "cloudpost.pool.f863973.m0",
                "public_key": "ed25519:AVVLmJDG8z6UgmW9fmJGVFTdYxxfnqXH6c7FVQmhE6dp",
                "is_slashed": false,
                "stake": "136597929514591130855076834167",
                "shards": [
                    0
                ],
                "num_produced_blocks": 212,
                "num_expected_blocks": 212
            },
            {
                "account_id": "dokia.pool.f863973.m0",
                "public_key": "ed25519:935JMz1vLcJxFApG3TY4MA4RHhvResvoGwCrQoJxHPn9",
                "is_slashed": false,
                "stake": "220445043066799898276306006919",
                "shards": [
                    0
                ],
                "num_produced_blocks": 426,
                "num_expected_blocks": 426
            },
            {
                "account_id": "dsrvlabs.pool.f863973.m0",
                "public_key": "ed25519:61ei2efmmLkeDR1CG6JDEC2U3oZCUuC2K1X16Vmxrud9",
                "is_slashed": false,
                "stake": "161508967845718247649113721019",
                "shards": [
                    0
                ],
                "num_produced_blocks": 213,
                "num_expected_blocks": 213
            },
            {
                "account_id": "fresh_lockup.pool.f863973.m0",
                "public_key": "ed25519:7CMFLtEohojtxBkmj9Jb6AGgbphb1zvxymHzpzuyCjfG",
                "is_slashed": false,
                "stake": "193574159400241036715020269158",
                "shards": [
                    0
                ],
                "num_produced_blocks": 212,
                "num_expected_blocks": 212
            },
            {
                "account_id": "inotel.pool.f863973.m0",
                "public_key": "ed25519:C55jH1MCHYGa3tzUyZZdGrJmmCLP22Aa4v88KYpn2xwZ",
                "is_slashed": false,
                "stake": "178598870951670469578754984993",
                "shards": [
                    0
                ],
                "num_produced_blocks": 212,
                "num_expected_blocks": 212
            },
            {
                "account_id": "jazza.pool.f863973.m0",
                "public_key": "ed25519:85cPMNVrqUz8N7oWbbvWbUuamHcJNe49uRbaSzftLCz9",
                "is_slashed": false,
                "stake": "155762349362951827286303475797",
                "shards": [
                    0
                ],
                "num_produced_blocks": 212,
                "num_expected_blocks": 212
            },
            {
                "account_id": "joe1.pool.f863973.m0",
                "public_key": "ed25519:G3SxwzmiEZSm3bHnTLtxJvm3NvT1TLQcWuV1iod6i6NJ",
                "is_slashed": false,
                "stake": "129230772267511696840933436174",
                "shards": [
                    0
                ],
                "num_produced_blocks": 213,
                "num_expected_blocks": 213
            },
            {
                "account_id": "kronos.pool.f863973.m0",
                "public_key": "ed25519:3i2pertqzF8xqkJ4BrE4t4r67YiYYrUKCktbqvDgjzuQ",
                "is_slashed": false,
                "stake": "144544279093485390569527924033",
                "shards": [
                    0
                ],
                "num_produced_blocks": 202,
                "num_expected_blocks": 213
            },
            {
                "account_id": "kytzu.pool.f863973.m0",
                "public_key": "ed25519:61tgPZpy8tqFeAwG4vtf2ZKCRoENiP2A1TJVWEwnbxZU",
                "is_slashed": false,
                "stake": "113758432843198726378418342568",
                "shards": [
                    0
                ],
                "num_produced_blocks": 212,
                "num_expected_blocks": 212
            },
            {
                "account_id": "lowfeevalidation.pool.f863973.m0",
                "public_key": "ed25519:EXyjSMGSnk5uGphF3gVV1jCudaAudbW8imoEccYEJg3V",
                "is_slashed": false,
                "stake": "113685537557977098595863252617",
                "shards": [
                    0
                ],
                "num_produced_blocks": 213,
                "num_expected_blocks": 213
            },
            {
                "account_id": "lunanova.pool.f863973.m0",
                "public_key": "ed25519:2fZ59qfo9QHNLijoht9cwUb9enSNcnRmXbQn1gKZxvkw",
                "is_slashed": false,
                "stake": "172903039219549397267702571804",
                "shards": [
                    0
                ],
                "num_produced_blocks": 213,
                "num_expected_blocks": 213
            },
            {
                "account_id": "moonlet.pool.f863973.m0",
                "public_key": "ed25519:3e1nVCVGNS3yr6CcUvpDAs3BhiWtyM9uTBWkyVR5Xn3K",
                "is_slashed": false,
                "stake": "140599784944681716744261599779",
                "shards": [
                    0
                ],
                "num_produced_blocks": 212,
                "num_expected_blocks": 212
            },
            {
                "account_id": "node0",
                "public_key": "ed25519:7PGseFbWxvYVgZ89K1uTJKYoKetWs7BJtbyXDzfbAcqX",
                "is_slashed": false,
                "stake": "1907234923845608896091985071588",
                "shards": [
                    0
                ],
                "num_produced_blocks": 3614,
                "num_expected_blocks": 3616
            },
            {
                "account_id": "node1",
                "public_key": "ed25519:6DSjZ8mvsRZDvFqFxo8tCKePG96omXW7eVYVSySmDk8e",
                "is_slashed": false,
                "stake": "1906065501889463342906704128820",
                "shards": [
                    0
                ],
                "num_produced_blocks": 3613,
                "num_expected_blocks": 3614
            },
            {
                "account_id": "node2",
                "public_key": "ed25519:GkDv7nSMS3xcqA45cpMvFmfV1o4fRF6zYo1JRR6mNqg5",
                "is_slashed": false,
                "stake": "1840271519773089248112279578450",
                "shards": [
                    0
                ],
                "num_produced_blocks": 3615,
                "num_expected_blocks": 3615
            },
            {
                "account_id": "node3",
                "public_key": "ed25519:ydgzeXHJ5Xyt7M1gXLxqLBW1Ejx6scNV5Nx2pxFM8su",
                "is_slashed": false,
                "stake": "1247270566437910246525604113433",
                "shards": [
                    0
                ],
                "num_produced_blocks": 2335,
                "num_expected_blocks": 2342
            },
            {
                "account_id": "nodeasy.pool.f863973.m0",
                "public_key": "ed25519:25Dhg8NBvQhsVTuugav3t1To1X1zKiomDmnh8yN9hHMb",
                "is_slashed": false,
                "stake": "131652957125263756523827257067",
                "shards": [
                    0
                ],
                "num_produced_blocks": 212,
                "num_expected_blocks": 212
            },
            {
                "account_id": "northernlights.stakingpool",
                "public_key": "ed25519:CsMecqKCfagnebMB3ha1uRubay5Z4V85req23bNAJSG3",
                "is_slashed": false,
                "stake": "159669819380982417675619400525",
                "shards": [
                    0
                ],
                "num_produced_blocks": 212,
                "num_expected_blocks": 212
            },
            {
                "account_id": "orangeclub.pool.f863973.m0",
                "public_key": "ed25519:HezFeSzcwuR5wvkqccgMCMnpf1eQkVCfk52tXZEdKZHz",
                "is_slashed": false,
                "stake": "143971234567521206686862639104",
                "shards": [
                    0
                ],
                "num_produced_blocks": 212,
                "num_expected_blocks": 212
            },
            {
                "account_id": "pathrock.pool.f863973.m0",
                "public_key": "ed25519:G138GdQsU7PdFLD6X88NmTLAEDR7agPcq9HLZqGpegkm",
                "is_slashed": false,
                "stake": "125204431569306697735287326827",
                "shards": [
                    0
                ],
                "num_produced_blocks": 212,
                "num_expected_blocks": 212
            },
            {
                "account_id": "pool_easy2stake.pool.f863973.m0",
                "public_key": "ed25519:8nzKxvmyeauQRehWkby8GfWNLgqPiF5FCRFSD75M1Rwh",
                "is_slashed": false,
                "stake": "176893731686620703671521068552",
                "shards": [
                    0
                ],
                "num_produced_blocks": 212,
                "num_expected_blocks": 212
            },
            {
                "account_id": "sl1sub.pool.f863973.m0",
                "public_key": "ed25519:3URBpNUjNAMzugQH1rdSKMtwFM8AwHaJgZk5Z6YtnfFL",
                "is_slashed": false,
                "stake": "155741680601335529540438949153",
                "shards": [
                    0
                ],
                "num_produced_blocks": 212,
                "num_expected_blocks": 213
            },
            {
                "account_id": "staked.pool.6fb1358",
                "public_key": "ed25519:684rMbuVYYgL2CkmYgC1weLh3erd2bwrmtQtJJhWzPwj",
                "is_slashed": false,
                "stake": "126911347639167461321544980789",
                "shards": [
                    0
                ],
                "num_produced_blocks": 212,
                "num_expected_blocks": 212
            },
            {
                "account_id": "staked.pool.f863973.m0",
                "public_key": "ed25519:D2afKYVaKQ1LGiWbMAZRfkKLgqimTR74wvtESvjx5Ft2",
                "is_slashed": false,
                "stake": "140558085958535444819294942478",
                "shards": [
                    0
                ],
                "num_produced_blocks": 213,
                "num_expected_blocks": 213
            },
            {
                "account_id": "stakin.pool.f863973.m0",
                "public_key": "ed25519:GvddxjaxBCqGGB4kMNWNFtvozU1EEZ2jrnggKZW8LaU4",
                "is_slashed": false,
                "stake": "122221693837484004905170552626",
                "shards": [
                    0
                ],
                "num_produced_blocks": 212,
                "num_expected_blocks": 212
            },
            {
                "account_id": "staking-power.pool.f863973.m0",
                "public_key": "ed25519:4s79F6Fdjgb3rHXPLwaXZG4Hq7Za8nogUu3vXEamRBQo",
                "is_slashed": false,
                "stake": "113293334165305165414435157738",
                "shards": [
                    0
                ],
                "num_produced_blocks": 212,
                "num_expected_blocks": 212
            },
            {
                "account_id": "syncnode.pool.f863973.m0",
                "public_key": "ed25519:FUAVDkmLhuTbKYv4GWuWv9ogjKzRatLd5ZBMKXRy7WqE",
                "is_slashed": false,
                "stake": "133414422809248011010747790387",
                "shards": [
                    0
                ],
                "num_produced_blocks": 212,
                "num_expected_blocks": 212
            },
            {
                "account_id": "thepassivetrust.pool.f863973.m0",
                "public_key": "ed25519:4NccD2DNJpBkDmWeJ2GbqPoivQ93qcKiR4PHALJKCTod",
                "is_slashed": false,
                "stake": "162714097201953456968339272308",
                "shards": [
                    0
                ],
                "num_produced_blocks": 213,
                "num_expected_blocks": 213
            },
            {
                "account_id": "top.pool.f863973.m0",
                "public_key": "ed25519:FR5qxAsP8GgXDN96pappLtWMywiqWsPVqT3HLE3YaUx",
                "is_slashed": false,
                "stake": "164760602493727447176131601464",
                "shards": [
                    0
                ],
                "num_produced_blocks": 213,
                "num_expected_blocks": 213
            },
            {
                "account_id": "valeraverim.pool.f863973.m0",
                "public_key": "ed25519:3686ABqNUZc1qhLWLHg5xZpBzrWPiUCMNZxcCNmg3e2s",
                "is_slashed": false,
                "stake": "191733144511459134091274432419",
                "shards": [
                    0
                ],
                "num_produced_blocks": 213,
                "num_expected_blocks": 213
            },
            {
                "account_id": "zainy.pool.f863973.m0",
                "public_key": "ed25519:37KfhBNYjqpaUVh3ft5kPcFn3xK1eVvtDZJCQQVCGnzQ",
                "is_slashed": false,
                "stake": "113441017844444454951489924484",
                "shards": [
                    0
                ],
                "num_produced_blocks": 213,
                "num_expected_blocks": 213
            },
            {
                "account_id": "zpool.pool.f863973.m0",
                "public_key": "ed25519:ETFRFNHfvd6fpj74MGYYQp3diY8WB4bFmWMxjTB2yY4V",
                "is_slashed": false,
                "stake": "140932616764414290525265048028",
                "shards": [
                    0
                ],
                "num_produced_blocks": 120,
                "num_expected_blocks": 212
            }
        ],
        "next_validators": [
            {
                "account_id": "01node.pool.f863973.m0",
                "public_key": "ed25519:3iNqnvBgxJPXCxu6hNdvJso1PEAc1miAD35KQMBCA3aL",
                "stake": "177341160716540400974121040893",
                "shards": [
                    0
                ]
            },
            {
                "account_id": "alexandruast.pool.f863973.m0",
                "public_key": "ed25519:A3XJ3uVGxSi9o2gnG2r8Ra3fqqodRpL4iuLTc6fNdGUj",
                "stake": "152212670433756011274558210225",
                "shards": [
                    0
                ]
            },
            {
                "account_id": "aquarius.pool.f863973.m0",
                "public_key": "ed25519:8NfEarjStDYjJTwKUgQGy7Z7UTGsZaPhTUsExheQN3r1",
                "stake": "131041030638338742265060835987",
                "shards": [
                    0
                ]
            },
            {
                "account_id": "bazilik.pool.f863973.m0",
                "public_key": "ed25519:3pDJwDQ6Y5B9QeW1jz8KunhZH4D4GQG86reTmrRfdD7c",
                "stake": "169886556654364796730036727847",
                "shards": [
                    0
                ]
            },
            {
                "account_id": "bisontrails.pool.f863973.m0",
                "public_key": "ed25519:8g4P5EXyp2b2pfVMHY1QLfkRcY59hjPfWrFCKUWX3RmR",
                "stake": "185113946165399113822995097304",
                "shards": [
                    0
                ]
            },
            {
                "account_id": "bitcat.pool.f863973.m0",
                "public_key": "ed25519:9mtnwPQyyap1QNH9ag6r4the7Jkkpdyt9HUF5G1dWxKx",
                "stake": "135914020962862866419944507506",
                "shards": [
                    0
                ]
            },
            {
                "account_id": "blazenet.pool.f863973.m0",
                "public_key": "ed25519:DiogP36wBXKFpFeqirrxN8G2Mq9vnakgBvgnHdL9CcN3",
                "stake": "138073840925159254185212483041",
                "shards": [
                    0
                ]
            },
            {
                "account_id": "certusone.pool.f863973.m0",
                "public_key": "ed25519:CKW7f41Kn8YCDPzaGLs1MrPb9h3BjQmHhbei6Ff6nRRF",
                "stake": "177557353126393581856047095474",
                "shards": [
                    0
                ]
            },
            {
                "account_id": "chorus-one.pool.f863973.m0",
                "public_key": "ed25519:6LFwyEEsqhuDxorWfsKcPPs324zLWTaoqk4o6RDXN7Qc",
                "stake": "110967904880664326100649881128",
                "shards": [
                    0
                ]
            },
            {
                "account_id": "cloudpost.pool.f863973.m0",
                "public_key": "ed25519:AVVLmJDG8z6UgmW9fmJGVFTdYxxfnqXH6c7FVQmhE6dp",
                "stake": "137303582563490110045159846741",
                "shards": [
                    0
                ]
            },
            {
                "account_id": "dokia.pool.f863973.m0",
                "public_key": "ed25519:935JMz1vLcJxFApG3TY4MA4RHhvResvoGwCrQoJxHPn9",
                "stake": "221583843027440134728813179120",
                "shards": [
                    0
                ]
            },
            {
                "account_id": "dsrvlabs.pool.f863973.m0",
                "public_key": "ed25519:61ei2efmmLkeDR1CG6JDEC2U3oZCUuC2K1X16Vmxrud9",
                "stake": "162343309156672629963246208215",
                "shards": [
                    0
                ]
            },
            {
                "account_id": "fresh_lockup.pool.f863973.m0",
                "public_key": "ed25519:7CMFLtEohojtxBkmj9Jb6AGgbphb1zvxymHzpzuyCjfG",
                "stake": "194574146707912827852030100603",
                "shards": [
                    0
                ]
            },
            {
                "account_id": "inotel.pool.f863973.m0",
                "public_key": "ed25519:C55jH1MCHYGa3tzUyZZdGrJmmCLP22Aa4v88KYpn2xwZ",
                "stake": "179521497218882663562358374377",
                "shards": [
                    0
                ]
            },
            {
                "account_id": "jazza.pool.f863973.m0",
                "public_key": "ed25519:85cPMNVrqUz8N7oWbbvWbUuamHcJNe49uRbaSzftLCz9",
                "stake": "156567004141558073310769195719",
                "shards": [
                    0
                ]
            },
            {
                "account_id": "joe1.pool.f863973.m0",
                "public_key": "ed25519:G3SxwzmiEZSm3bHnTLtxJvm3NvT1TLQcWuV1iod6i6NJ",
                "stake": "129898367221448376460128575495",
                "shards": [
                    0
                ]
            },
            {
                "account_id": "kronos.pool.f863973.m0",
                "public_key": "ed25519:3i2pertqzF8xqkJ4BrE4t4r67YiYYrUKCktbqvDgjzuQ",
                "stake": "145291600307308103830278523851",
                "shards": [
                    0
                ]
            },
            {
                "account_id": "kytzu.pool.f863973.m0",
                "public_key": "ed25519:61tgPZpy8tqFeAwG4vtf2ZKCRoENiP2A1TJVWEwnbxZU",
                "stake": "114346099616381729581424582943",
                "shards": [
                    0
                ]
            },
            {
                "account_id": "lowfeevalidation.pool.f863973.m0",
                "public_key": "ed25519:EXyjSMGSnk5uGphF3gVV1jCudaAudbW8imoEccYEJg3V",
                "stake": "114272827178534171015566175242",
                "shards": [
                    0
                ]
            },
            {
                "account_id": "lunanova.pool.f863973.m0",
                "public_key": "ed25519:2fZ59qfo9QHNLijoht9cwUb9enSNcnRmXbQn1gKZxvkw",
                "stake": "173796241314359640924313305613",
                "shards": [
                    0
                ]
            },
            {
                "account_id": "moonlet.pool.f863973.m0",
                "public_key": "ed25519:3e1nVCVGNS3yr6CcUvpDAs3BhiWtyM9uTBWkyVR5Xn3K",
                "stake": "141326111231422084384405939935",
                "shards": [
                    0
                ]
            },
            {
                "account_id": "node0",
                "public_key": "ed25519:7PGseFbWxvYVgZ89K1uTJKYoKetWs7BJtbyXDzfbAcqX",
                "stake": "1917087533938315356792420553580",
                "shards": [
                    0
                ]
            },
            {
                "account_id": "node1",
                "public_key": "ed25519:6DSjZ8mvsRZDvFqFxo8tCKePG96omXW7eVYVSySmDk8e",
                "stake": "1915912070849706566898523265362",
                "shards": [
                    0
                ]
            },
            {
                "account_id": "node2",
                "public_key": "ed25519:GkDv7nSMS3xcqA45cpMvFmfV1o4fRF6zYo1JRR6mNqg5",
                "stake": "1849778202731933988446605407109",
                "shards": [
                    0
                ]
            },
            {
                "account_id": "node3",
                "public_key": "ed25519:ydgzeXHJ5Xyt7M1gXLxqLBW1Ejx6scNV5Nx2pxFM8su",
                "stake": "1253713857932062021626652303305",
                "shards": [
                    0
                ]
            },
            {
                "account_id": "nodeasy.pool.f863973.m0",
                "public_key": "ed25519:25Dhg8NBvQhsVTuugav3t1To1X1zKiomDmnh8yN9hHMb",
                "stake": "132333065508677559475570461579",
                "shards": [
                    0
                ]
            },
            {
                "account_id": "northernlights.stakingpool",
                "public_key": "ed25519:CsMecqKCfagnebMB3ha1uRubay5Z4V85req23bNAJSG3",
                "stake": "160494659810582810750858869593",
                "shards": [
                    0
                ]
            },
            {
                "account_id": "orangeclub.pool.f863973.m0",
                "public_key": "ed25519:HezFeSzcwuR5wvkqccgMCMnpf1eQkVCfk52tXZEdKZHz",
                "stake": "144714977470413958038055754809",
                "shards": [
                    0
                ]
            },
            {
                "account_id": "pathrock.pool.f863973.m0",
                "public_key": "ed25519:G138GdQsU7PdFLD6X88NmTLAEDR7agPcq9HLZqGpegkm",
                "stake": "125851226796631921571804668732",
                "shards": [
                    0
                ]
            },
            {
                "account_id": "pool_easy2stake.pool.f863973.m0",
                "public_key": "ed25519:8nzKxvmyeauQRehWkby8GfWNLgqPiF5FCRFSD75M1Rwh",
                "stake": "177807549352374182247265978294",
                "shards": [
                    0
                ]
            },
            {
                "account_id": "sl1sub.pool.f863973.m0",
                "public_key": "ed25519:3URBpNUjNAMzugQH1rdSKMtwFM8AwHaJgZk5Z6YtnfFL",
                "stake": "156546228606913052982706314599",
                "shards": [
                    0
                ]
            },
            {
                "account_id": "staked.pool.6fb1358",
                "public_key": "ed25519:684rMbuVYYgL2CkmYgC1weLh3erd2bwrmtQtJJhWzPwj",
                "stake": "127566960646771620637977634520",
                "shards": [
                    0
                ]
            },
            {
                "account_id": "staked.pool.f863973.m0",
                "public_key": "ed25519:D2afKYVaKQ1LGiWbMAZRfkKLgqimTR74wvtESvjx5Ft2",
                "stake": "141284196855966747583242721111",
                "shards": [
                    0
                ]
            },
            {
                "account_id": "stakin.pool.f863973.m0",
                "public_key": "ed25519:GvddxjaxBCqGGB4kMNWNFtvozU1EEZ2jrnggKZW8LaU4",
                "stake": "122853080560791799567241762038",
                "shards": [
                    0
                ]
            },
            {
                "account_id": "staking-power.pool.f863973.m0",
                "public_key": "ed25519:4s79F6Fdjgb3rHXPLwaXZG4Hq7Za8nogUu3vXEamRBQo",
                "stake": "113878597697173990840757447344",
                "shards": [
                    0
                ]
            },
            {
                "account_id": "syncnode.pool.f863973.m0",
                "public_key": "ed25519:FUAVDkmLhuTbKYv4GWuWv9ogjKzRatLd5ZBMKXRy7WqE",
                "stake": "134103630138795323490241660174",
                "shards": [
                    0
                ]
            },
            {
                "account_id": "thepassivetrust.pool.f863973.m0",
                "public_key": "ed25519:4NccD2DNJpBkDmWeJ2GbqPoivQ93qcKiR4PHALJKCTod",
                "stake": "163554668234785516757420218799",
                "shards": [
                    0
                ]
            },
            {
                "account_id": "top.pool.f863973.m0",
                "public_key": "ed25519:FR5qxAsP8GgXDN96pappLtWMywiqWsPVqT3HLE3YaUx",
                "stake": "165611741467072665024638629174",
                "shards": [
                    0
                ]
            },
            {
                "account_id": "valeraverim.pool.f863973.m0",
                "public_key": "ed25519:3686ABqNUZc1qhLWLHg5xZpBzrWPiUCMNZxcCNmg3e2s",
                "stake": "192723621295992295990275575014",
                "shards": [
                    0
                ]
            },
            {
                "account_id": "zainy.pool.f863973.m0",
                "public_key": "ed25519:37KfhBNYjqpaUVh3ft5kPcFn3xK1eVvtDZJCQQVCGnzQ",
                "stake": "114027175849273464802110072969",
                "shards": [
                    0
                ]
            },
            {
                "account_id": "zpool.pool.f863973.m0",
                "public_key": "ed25519:ETFRFNHfvd6fpj74MGYYQp3diY8WB4bFmWMxjTB2yY4V",
                "stake": "141660662431449802378487016195",
                "shards": [
                    0
                ]
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
