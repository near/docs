---
title: Solver Relayer API
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# API

Solver Bus is an additional system component that optimizes frontends←→solvers quoting, and intent discovery process. Any frontend app may use a generic foundation-hosted Solver Bus or launch its own instance to customize preferred solver accounts.

Defuse protocol may operate without a Solver Relay component:

* frontends may use any other quoting mechanisms to compose an intent for the end user
* solvers may index Near the blockchain to find intents to fill.

However, using Solver Relay is recommended for speed optimization goals.


## **OpenAPI Specification**

[OpenAPI JSON](../.gitbook/assets/solver-relay.openapi.json)


## Frontend JSON-RPC Endpoint

**POST:** `https://solver-relay-v2.chaindefuser.com/rpc`


### 1. Quote asset prices from solvers

Allow the front end to estimate potential output for a given exact input or the required input for a given exact output based on user intent. The solver relay will forward a quote request to all connected solvers, wait for up to 1200 ms, and return all available quote options to the user. Only one of `exact_amount_in` or `exact_amount_out` should be provided in the request, not both.


<Tabs>
<TabItem value="Parameters" label="Parameters" default>

* `defuse_asset_identifier_in` -  asset to trade from
* `defuse_asset_identifier_out`- asset to trade to
* `exact_amount_in`- amount of _token\_in_ for exchange
* `exact_amount_out`- amount of _token\_out_ for exchange
* `quote_id`_(optional)  -_ An additional identifier for the quote. This is particularly useful when also listening for quotes
* `min_deadline_ms`_(optional)_ - minimum validity time for an offer from solvers. The shorter the time, the better the price solvers can offer.

</TabItem>
<TabItem value="Response" label="Response">

* `quotes[]`
  * `quote_hash`- quote identifier
  * `defuse_asset_identifier_in` - asset to trade from
  * `defuse_asset_identifier_out` - asset to trade to
  * `amount_in`:
    * If `exact_amount_in` is defined: Specifies _token\_in_ amount for the exchange.
    * If `exact_amount_in` is **not** defined: Represents a proposed amount of _token\_in_.
  * `amount_out`:
    * If `exact_amount_out` is defined: Specifies _token\_out_ amount for the exchange.
    * If `exact_amount_out` is **not** defined: Represents a proposed amount of _token\_out_.
  * `expiration_time` - expiration date of the offer from the solver

</TabItem>
</Tabs>


<details>

<summary>Example</summary>

**Request**

```javascript
{
    "id": 1,
    "jsonrpc": "2.0",
    "method": "quote",
    "params":  [
        {
            "defuse_asset_identifier_in": "nep141:ft1.near",
            "defuse_asset_identifier_out": "nep141:ft2.near",
            "exact_amount_in": "1000",
            "quote_id": "00000000-0000-0000-0000-000000000000", // OPTIONAL. default will be generated randomly
            "min_deadline_ms": "60000" // OPTIONAL. default 60_000ms / 1min
        }
    ]
}
```

**Response**

```js
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "quotes":[
            {
                "quote_hash": "00000000000000000000000000000000",
                "defuse_asset_identifier_in": "nep141:ft1.near",
                "defuse_asset_identifier_out": "nep141:ft2.near",
                "amount_in": "1000",
                "amount_out": "2000"
                "expiration_time": "1727784627" //UNIX TIMESTAMP
            },
            // ...
        ]
    }
}
```

</details>



### 2. Publish intent

If the user is satisfied with the offer provided by the solver, they can sign the intent and send it to the solver relay for execution. Relay supports this types of signatures for publicsh intent: `nep413`, `erc191`, `raw_ed25519`


<Tabs>
<TabItem value="(NEP413)" label="Parameters (NEP413)">

* `quote_hashes` - quote hashes to execute all merged intents
* `signed_data` - intent content with signature
  * `standard` - content signature standard
  * `payload`- content of the intent
    * `message`
      * `signer_id` - Defuse account id
      * `intents[]` - Intent data
        * `intent` - Intent type
      * `deadline` - valid until
        * `timestamp` - in seconds
        * `block_number` - near block number
    * `nonce` - unique nonce for operation
    * `recipient` - Defuse contract address
    * `callbackUrl`_(optional)_ - needed for some wallets
  * `signature` - signed content
  * `public_key` - signer's public key

</TabItem>
<TabItem value="(ERC191)" label="Parameters (ERC191)">

* `quote_hashes` - quote hashes to execute all merged intents
* `signed_data` - intent content with signature
  * `standard` -  content signature standard
  * payload - **STRINGIFIED** payload
    * `signer_id` - Defuse account id
    * `intents[]` - Intent data
      * `intent` - Intent type
    * `deadline` - valid until
      * `timestamp` - in seconds
      * `block_number` - near block number
    * `nonce` - unique nonce for operation
    * `veryfying_contract` - use "intents.near"
  * `signature` - signed content

</TabItem>
<TabItem value="(RAW_ED25519)" label="Parameters (RAW_ED25519)">

* `quote_hashes` - quote hashes to execute all merged intents
* `signed_data` - intent content with signature
  * `standard` -  content signature standard
  * payload - **STRINGIFIED** payload
    * `signer_id` - Defuse account id
    * `intents[]` - Intent data
      * `intent` - Intent type
    * `deadline` - valid until
      * `timestamp` - in seconds
      * `block_number` - near block number
    * `nonce` - unique nonce for operation
    * `veryfying_contract`- use "intents.near"
  * `signature` - signed content
  * `public_key` - signer's public key

</TabItem>
<TabItem value="TokenDiff" label="TokenDiff Intent">

* `intent` - Intent type(equals `token_diff`)
* `diff` -  map where:
  * **Keys**: Represent `defuse_asset_identifiers` of tokens.
  * **Values**: Represent amounts for the tokens as strings.
    * Positive values indicate tokens to be received by the account.
    * Negative values (prefixed with "-") indicate tokens to be transferred from the account.

</TabItem>
<TabItem value="Response" label="Response">

* `status` - intent receiving status
* `reason` - error reason (if the status is FAILED)
* `intent_hash` - intent identifier

</TabItem>
</Tabs>

<details>

<summary>Example</summary>

**Request**

```javascript
{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "publish_intent",
  "params": [
    {
      "quote_hashes": ["00000000000000000000000000000000", ...],
      "signed_data": {
        "standard": "nep413",
        "message": {
          "signer_id": "user.near",
          "deadline": {
            "timestamp": 1728910420,
            "block_number": 18446744073709551615
          },
          "intents": [
            {
              "intent": "token_diff",
              "diff": {
                "nep141:ft1.near": "300",
                "nep141:ft2.near": "-500"
              }
            },
            {
              "intent": "mt_batch_transfer",
              "receiver_id": "referral.near",
              "token_id_amounts": {
                "nep141:ft1.near": "1"
              }
            },
            {
              "intent": "ft_withdraw",
              "token": "ft1.near",
              "receiver_id": "omni-bridge.near",
              "amount": "299",
              "msg": "{\"chain_id\": 1, \"withdraw_to\": \"0x123\"}" // omni-bridge args
            }
          ]
        },
        "nonce": "87878609949187467518642340675777309892619814715982488116035839611029208327842",
        "recipient": "defuse.near",
        "signature": "ZuVBFXIGfndYn7pNyz+dhfNgsVoUqnGiNSBL6knztPsAc5REjbr5PrrDKdGlA7akg97U8RNtg0nDparXxI9+Dg==",
        "public_key": "7RuVD5I4g/cYwpGQt5zb2FEPaiGBU3WfZZkgvbcRN5M="
      }
    }
  ]
}
```

**Response**

```js
{
    "jsonrpc": "2.0",
    "id": 1,
    "result":
    {
        "status": "OK", // OR FAILED
        "reason": "expired", // expired | internal | etc
        "intent_hash": "00000000000000000000000000000000"
    }
}
```

</details>



### 3. Get intent status

Check the status of the intent execution.

<Tabs>
<TabItem value="Parameters" label="Parameters">

* `intent_hash` - Intent identifier

</TabItem>
<TabItem value="Response" label="Response">

* `intent_hash` - Intent identifier
* `status` - Intent status
* `data` - intent additional data
  * `hash` - transaction hash (if exists)

</TabItem>
<TabItem value="Statuses" label="Statuses">

* `PENDING` - the relay successfully received a signed intent
* `TX_BROADCASTED` - transactions have been successfully sent to be added to the block
* `SETTLED` - Intent executed successfully
* `NOT_FOUND_OR_NOT_VALID_ANYMORE` -  Intent not found or no valid anymore

</TabItem>
</Tabs>

<details>

<summary>Example</summary>

**Request**

```javascript
{
    "id": 1,
    "jsonrpc": "2.0",
    "method": "get_status",
    "params":  [
        {
            "intent_hash": "00000000000000000000000000000000"
        }
    ]
}
```

**Response**

```js
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "intent_hash": "00000000000000000000000000000000"
        "status": "SETTLED",
        "data": {
            "hash": "0x..." // if exists
        }
    }
}
```

</details>



***

## Solver WS Endpoint

`wss://solver-relay-v2.chaindefuser.com/ws`



### 1. Subscribe to quote/quote\_status requests

<Tabs>
<TabItem value="Parameters" label="Parameters">

* `method` - subscribe
* `params[0]` - subscription name (**"quote","quote_status"**)

</TabItem>
<TabItem value="Response" label="Response">

* `result` - subscription identifier which can be used to track following events

</TabItem>
</Tabs>

<details>

<summary>Example</summary>

**Request**

```js
{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "subscribe",
    "params": ["quote"]
}
```

**Response**

```js
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "00000000-0000-0000-0000-000000000000", // subscriptionId
}
```

* `defuse_asset_identifier_out` - asset to trade to

</details>



### 2. Receive quote requests

<Tabs>
<TabItem value="Event data" label="Event data">

* `subscription` - subscription identifier
* `quote_id` - quote identifier
* `defuse_asset_identifier_in` - asset to trade from
* `exact_amount_in`- amount of _token\_in_ for exchange
* `exact_amount_out`- amount of _token\_out_ for exchange
  * **Condition**: Only one of `exact_amount_in` or`exact_amount_out` can will be specified in a request.
* `min_deadline_ms` - minimum validity time for an offer from solvers. The shorter the time, the better the price solvers can offer.

</TabItem>
</Tabs>

<details>

<summary>Example</summary>

```js
// Event
{
    "jsonrpc": "2.0"
    "method": "subscribe",
    "params": {
        "subscription": "00000000-0000-0000-0000-000000000000",
        "quote_id":"00000000-0000-0000-0000-000000000000",
        "defuse_asset_identifier_in": "nep141:ft1.near",
        "defuse_asset_identifier_out": "nep141:ft2.near",
        "exact_amount_in": "1000",
        "min_deadline_ms": "60000" // OPTIONAL. default 120_000ms / 2min
    }
}
```

</details>



### 3. Respond to quote requests

<Tabs>
<TabItem value="Parameters" label="Parameters">

* `quote_id` - user's quote identifier
* `quote_output` - quote result
  * amount\_out - proposed `amount`for `exact_amount_in` requests
  * amount\_in - proposed `amount`for `exact_amount_out` requests
* `signed_data` - intent content with signature
  * `standard` - content signature standard
  * `payload`- content of the intent
    * `message`
      * `signer_id` - Defuse account id
      * `intents[]` - Intent data
        * `intent` - Intent type
      * `deadline` - valid until
        * `timestamp` - in seconds
        * `block_number` - near block number
    * `nonce` - unique nonce for operation
    * `recipient` - Defuse contract address
  * `signature` - signed content
  * `public_key` - signer's public key
* `other_quote_hashes` - hashes of other quote results to fulfill the current intent

</TabItem>
<TabItem value="Response" label="Response">

* `result` - proposal receipt status

</TabItem>
</Tabs>

<details>

<summary>Example</summary>

**Request**

```javascript
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "quote_response",
  "params": [
    {
      "quote_id":"00000000-0000-0000-0000-000000000000",
      "quote_output": {
        "amount_out": "300",
      },
      "signed_data": {
        "standard": "nep413",
        "message": {
          "signer_id": "solver.near",
          "deadline": {
            "timestamp": 1728910420,
            "block_number": 18446744073709551615
          },
          "intents": [
            {
              "intent": "token_diff",
              "diff": {
                "nep141:ft2.near": "-300",
                "nep141:ft1.near": "500"
              }
            },
          ]
        },
        "nonce": "87878609949187467518642340675777309892619814715982488116035839611029208327842",
        "recipient": "defuse.near",
        "signature": "ZuVBFXIGfndYn7pNyz+dhfNgsVoUqnGiNSBL6knztPsAc5REjbr5PrrDKdGlA7akg97U8RNtg0nDparXxI9+Dg==",
        "public_key": "7RuVD5I4g/cYwpGQt5zb2FEPaiGBU3WfZZkgvbcRN5M="
      }
    },
    "other_quote_hashes": ["00000000000000000000000000000000", ...] //optional
  ]
}
```

**Response**

```js
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "OK",
}
```

</details>



### 4.Receive `quote_status` event

<Tabs>
<TabItem value="Event data" label="Event data">

* `quote_hash` - solver intent hash used to identify quote
* `intent_hash` - user intent hash(identifier)
* `tx_hash` - hash of mined intent

</TabItem>
</Tabs>

<details>

<summary>Example</summary>

**Event**

```js
{
    "jsonrpc": "2.0"
    "method": "subscribe",
    "params": {
        "quote_hash": "00000000000000000000000000000000",
        "intent_hash":"00000000000000000000000000000000",
        "tx_hash": "00000..."
    }
}
```

</details>



### 5. Unsubscribe

<Tabs>
<TabItem value="Parameters" label="Parameters">

* `method` - unsubscribe
* `params[0]` - subscription identifier

</TabItem>
</Tabs>

<details>

<summary>Example</summary>

**Request**

```js
{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "unsubscribe",
    "params": ["00000000-0000-0000-0000-000000000000"] //subscriptionId
}
```

**Response**

```js
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "OK"
}
```

</details>

