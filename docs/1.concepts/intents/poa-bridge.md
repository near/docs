---
title: PoA Bridge
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# PoA Bridge

The PoA Bridge is a solution for transferring asset tokens between blockchain network and NEAR Intents. This service is designed as an alternative to the OmniBridge. It will help users take full advantage of the NEAR Intents protocol's capabilities for interacting with multi-chain financial products.

![bridge diagram](/docs/assets/intents/poa-bridge-user-docs.jpg)

***

## How to use

1. _Get supported assets_. The bridge only works with a specific list of tokens that are available for transfer to NEAR Intents. The list of supported tokens and networks can be obtained using this request.
2. _Get deposit address._ Once you have verified that your token is supported by the bridge, you can use the request to obtain a deposit address. After receiving the address, transfer the tokens to it, and they will soon be available in NEAR Intents.
3. _Get recent deposit._ The API service allows you to get the status of the most recent deposits. Simply send a request to retrieve this information.
4. _Get withdrawal status_. The bridge supports token withdrawals from NEAR Intents to the supported network. To do this, call the 'withdrawal' contract method or use the frontend. The status of the withdrawal can be obtained upon request.

***

## JSON-RPC Endpoint

**POST: `https://bridge.chaindefuser.com/rpc`**

***

## Requests

### 1. Get supported assets

Returns a list of tokens that are supported by the PoA bridge in each network.

<Tabs>
<TabItem value="Parameters" label="Parameters">

* `[]chains` - chain filter.

</TabItem>
<TabItem value="Response" label="Response">

* `[].tokens.defuse_asset_identifier` — unique id of trading asset
* `[].tokens.near_token_id` — unique id of the token in the NEAR blockchain
* `[].tokens.decimals` — trading asset precision. should be used for amount setup during intent creation
* `[].tokens.asset_name` — trading asset name
* `[].tokens.min_deposit_amount` — minimum amount of tokens to trigger transfer process&#x20;
* `[].tokens.min_withdrawal_amount` — minimum amount of tokens to initiate a withdrawal
* `[].tokens.withdrawal_fee` — the fee charged for withdrawing the specified token&#x20;

</TabItem>
</Tabs>

<details>

<summary>Example</summary>

**Request**

```javascript
{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "supported_tokens",
  "params": [
    {
      "chains": ["CHAIN_TYPE:CHAIN_ID", "..."], //optional
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
   "tokens": [
     {
       "defuse_asset_identifier" : "eth:8453:0x123", //CHAIN_TYPE:CHAIN_ID:ADDRESS
       "near_token_id": "...",
       "decimals" : 18,
       "asset_name" : "PEPE",
       "min_deposit_amount": "100000"
       "min_withdrawal_amount": "10000"
       "withdrawal_fee": "1000"
     },
     // ...
     ]
   }
}
```

</details>



### 2. Get deposit address

Returns the address for depositing supported tokens or native currency.

<Tabs>
<TabItem value="Parameters" label="Parameters">

* `account_id` - Defuse user account
* `chain` - network type and chain id.

</TabItem>
<TabItem value="Response" label="Response">

* `address` - deposit address
* `chain` - network type and chain id.

</TabItem>
</Tabs>

<details>

<summary>Example</summary>

**Request**

```js
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "deposit_address",
  "params": [
    {
      "account_id": "user.near",
      "chain": "CHAIN_TYPE:CHAIN_ID"
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
    "address": "0x....",
    "chain": "CHAIN_TYPE:CHAIN_ID"
  }
}
```

</details>



### 3. Get recent deposits

Returns information on recent deposits

<Tabs>
<TabItem value="Parameters" label="Parameters">

* `account_id` - Defuse user account
* `chain` - network type and chain id.

</TabItem>
<TabItem value="Response" label="Response">

* `[].tx_hash` - Transaction hash \[EVM networks only]
* `[].chain` - network type and chain id.
* `[].defuse_asset_identifier` - token identifier
* `[].decimals` - token decimals
* `[].amount` - asset amount
* `[].account_id` - Defuse user account
* `[].address` - deposit address
* `[].status` - deposit status

</TabItem>
</Tabs>

<details>

<summary>Example</summary>

**Request**

```js
{
<strong>  "jsonrpc": "2.0",
</strong>  "id": 1,
  "method": "recent_deposits",
  "params": [
    {
      "account_id": "user.near",
      "chain": "CHAIN_TYPE:CHAIN_ID"
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
    "deposits": [
      {
        "tx_hash": "",
        "chain": "CHAIN_TYPE:CHAIN_ID",
        "defuse_asset_identifier": "eth:8543:0x123",
        "decimals": 18,
        "amount": 10000000000,
        "account_id": "user.near",
        "address": "0x123",
        "status": "COMPLETED" // PENDING, FAILED
      },
    ]
  }
}
```

</details>



### 4. Get withdrawal status

Returns withdrawal status.

<Tabs>
<TabItem value="Parameters" label="Parameters">

* `withdrawal_hash` - Hash

</TabItem>
<TabItem value="Response" label="Response">

* `status` - withdrawal status
* `data.tx_hash` - NEAR transaction hash
* `data.transfer_tx_hash` - Transfer transaction hash
* `data.chain` - network type and chain id.
* `data.defuse_asset_identifier` - token identifier
* `data.decimals` - token decimals
* `data.amount` - asset amount
* `data.account_id` - Defuse user account
* `data.address` - withdrawal address

</TabItem>
</Tabs>

<details>

<summary>Example</summary>

**Request**

```js
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "withdrawal_status",
  "params": [
    {
      "withdrawal_hash": "some_hash",
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
    "status": "COMPLETED" // NOT_FOUND, PENDING, FAILED
    "data": {
      "tx_hash": "some_hash",
      "transfer_tx_hash": "", // if exists
      "chain": "CHAIN_TYPE:CHAIN_ID",
      "defuse_asset_identifier": "eth:8543:0x123",
      "decimals": 18,
      "amount": 10000000000,
      "account_id": "user.near",
      "address": "0x123"
    }
  }
}
```

</details>



