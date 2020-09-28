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
     - `finality`: `optimistic` or `final`
     - `account_id`: `example.testnet`

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
   - `finality`: `optimistic` or `final`
   - `account_id`: `example.testnet`
   - `public_key`: `"public_key_you_would_like_to_check"`

Example:
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
   - `finality`: `optimistic` or `final`
   - `account_id`: `example.testnet`

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
Returns the state of a contract based on the key prefix (encoded to base64). Pass an empty string for this param if you would like to return the entire state.
- method: `query`
- params: 
   - `request_type`: `view_state`
   - `finality`: `optimistic` or `final`
   - `account_id`: `guest-book.testnet`,
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
   - `finality`: `optimistic` or `final`
   - `account_id`: `example.testnet`
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
### Block details
Queries network and returns block for given height or hash.  You can also use `finality` param to return latest block details. 

**Note**: You may choose to search by a specific block _or_ finality, you can not choose both.

- method: `block`
- params:
  - `[block_Id]`, `["block_hash"]`  
    (or)
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
      "params": [17821130]
}
```

`[block_hash]`
```json
{
     "jsonrpc": "2.0",
      "id": "dontcare",
      "method": "block",
      "params": ["7nsuuitwS7xcdGnD9JgrE22cRB2vf2VS4yh1N9S71F4d"]
}
```

HTTPie example:

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare \
    method=block \
    params:='{"finality": "final"}'
```

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
            "chunk_mask": [
                true
            ],
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

### Changes in Block
Queries network and returns changes in block for given height or hash.  You can also use `finality` param to return latest block details. 

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

HTTPie example: 

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare \
    method=EXPERIMENTAL_changes_in_block \
    'params:={
        "block_id": 17821135
    }'
```

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




## Chunk
### Chunk Details
Returns details of a specific chunk. You can run a [block details](/docs/api/rpc#block-details) query to get a valid chunk hash.

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

HTTPie example:
```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 method=chunk params:='["EBM2qg5cGr47EjMPtH88uvmXHDHqmWPzKaQadbWhdw22"]' id=dontcare
```
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


## Gas
### Gas Price
Returns gas price for a specific `block_height` or `block_hash`. Using `[null]` will return the most recent block's gas price.
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

HTTPie example:

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 method=gas_price params:='["AXa8CHDQSA8RdFCt12rtpFraVq4fDUgJbLPxwbaZcZrj"]' id=dontcare
```

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


## Genesis
### Genesis Config
Returns current genesis configuration.
- method: `EXPERIMENTAL_genesis_config`
- params: none

Example:
```json
{
     "jsonrpc": "2.0",
      "id": "dontcare",
      "method": "EXPERIMENTAL_genesis_config"
}
```

HTTPie example:
```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=EXPERIMENTAL_genesis_config
```

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
        "num_block_producer_seats_per_shard": [
            100
        ],
        "avg_hidden_validator_seats_per_shard": [
            0
        ],
        "dynamic_resharding": false,
        "protocol_upgrade_stake_threshold": [
            4,
            5
        ],
        "protocol_upgrade_num_epochs": 2,
        "epoch_length": 43200,
        "gas_limit": 1000000000000000,
        "min_gas_price": "5000",
        "max_gas_price": "10000000000000000000000",
        "block_producer_kickout_threshold": 80,
        "chunk_producer_kickout_threshold": 90,
        "online_min_threshold": [
            90,
            100
        ],
        "online_max_threshold": [
            99,
            100
        ],
        "gas_price_adjustment_rate": [
            1,
            100
        ],
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
                "burnt_gas_reward": [
                    3,
                    10
                ],
                "pessimistic_gas_price_inflation_ratio": [
                    103,
                    100
                ]
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
        "protocol_reward_rate": [
            1,
            10
        ],
        "max_inflation_rate": [
            1,
            20
        ],
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

### Genesis Records
Returns genesis records with default pagination (offset 0 / limit 100). You can pass an optional parameter what will allow you to configure the offset and limit.
- method: `EXPERIMENTAL_genesis_records`
- params: `{}` for default or  `pagination:` `{"offset": 1, "limit": 10}`

Default example:
```json
{
     "jsonrpc": "2.0",
      "id": "dontcare",
      "method": "EXPERIMENTAL_genesis_records",
      "params":{}
}
```
`pagination` example:
```json
{
     "jsonrpc": "2.0",
      "id": "dontcare",
      "method": "EXPERIMENTAL_genesis_records",
      "params":{
            "pagination": {"offset": 1, "limit": 10}
      }
}
```

HTTPie example:
```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare \
          method=EXPERIMENTAL_genesis_records \
          'params:={"pagination": {"offset": 1, "limit": 10}}'
```

<details>
<summary>Example response: </summary>
<p>

```json
{
    "jsonrpc": "2.0",
    "result": {
        "pagination": {
            "offset": 1,
            "limit": 10
        },
        "records": [
            {
                "Account": {
                    "account_id": "0.mike.testnet",
                    "account": {
                        "amount": "299999999983017797500000000",
                        "locked": "0",
                        "code_hash": "11111111111111111111111111111111",
                        "storage_usage": 182
                    }
                }
            },
            {
                "Account": {
                    "account_id": "0.testnet",
                    "account": {
                        "amount": "500000000997901753750000000",
                        "locked": "0",
                        "code_hash": "11111111111111111111111111111111",
                        "storage_usage": 264
                    }
                }
            },
            {
                "Account": {
                    "account_id": "0.tracker_factory1.testnet",
                    "account": {
                        "amount": "50000000060376086696018000",
                        "locked": "0",
                        "code_hash": "7NfZda8GRY43x6ypyy6i7wE9R2Uevw1kQGQZGLrkea5X",
                        "storage_usage": 139642
                    }
                }
            },
            {
                "Account": {
                    "account_id": "0000",
                    "account": {
                        "amount": "10000001000000000000000000",
                        "locked": "0",
                        "code_hash": "11111111111111111111111111111111",
                        "storage_usage": 182
                    }
                }
            },
            {
                "Account": {
                    "account_id": "00000.near",
                    "account": {
                        "amount": "18200000000000000000000",
                        "locked": "0",
                        "code_hash": "11111111111111111111111111111111",
                        "storage_usage": 182
                    }
                }
            },
            {
                "Account": {
                    "account_id": "0055.testnet",
                    "account": {
                        "amount": "500000001000000000000000000",
                        "locked": "0",
                        "code_hash": "11111111111111111111111111111111",
                        "storage_usage": 182
                    }
                }
            },
            {
                "Account": {
                    "account_id": "006.testnet",
                    "account": {
                        "amount": "491000000881318305964235000",
                        "locked": "0",
                        "code_hash": "11111111111111111111111111111111",
                        "storage_usage": 2479
                    }
                }
            },
            {
                "Account": {
                    "account_id": "007.testnet",
                    "account": {
                        "amount": "500000000990758805000000000",
                        "locked": "0",
                        "code_hash": "11111111111111111111111111111111",
                        "storage_usage": 264
                    }
                }
            },
            {
                "Account": {
                    "account_id": "007797997hjhjhjhjhjhj.testnet",
                    "account": {
                        "amount": "500000000991738494187110000",
                        "locked": "0",
                        "code_hash": "11111111111111111111111111111111",
                        "storage_usage": 256
                    }
                }
            },
            {
                "Account": {
                    "account_id": "01.tracker_factory1.testnet",
                    "account": {
                        "amount": "50000000086958412626016000",
                        "locked": "0",
                        "code_hash": "7NfZda8GRY43x6ypyy6i7wE9R2Uevw1kQGQZGLrkea5X",
                        "storage_usage": 139645
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

## State changes
Please see our [experimental methods](/docs/api/rpc-experimenta) for more information on querying state changes.

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
