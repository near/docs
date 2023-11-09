---
id: bos
title: NEAR Component
hide_table_of_contents: false
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This section describes how to interact with FTs directly from a [NEAR Component](../../../bos/components.md)

## Get token metadata

<Tabs>

<TabItem value="Smart Contract" label="Smart Contract">

```js
const tokenContract = "token.v2.ref-finance.near";
const tokenMetadata = Near.view(tokenContract, "ft_metadata", {});
```

<details>
<summary>Example response</summary>
<p>

```json
{
  "spec": "ft-1.0.0",
  "name": "Ref Finance Token",
  "symbol": "REF",
  "icon": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='16 24 248 248' style='background: %23000'%3E%3Cpath d='M164,164v52h52Zm-45-45,20.4,20.4,20.6-20.6V81H119Zm0,18.39V216h41V137.19l-20.6,20.6ZM166.5,81H164v33.81l26.16-26.17A40.29,40.29,0,0,0,166.5,81ZM72,153.19V216h43V133.4l-11.6-11.61Zm0-18.38,31.4-31.4L115,115V81H72ZM207,121.5h0a40.29,40.29,0,0,0-7.64-23.66L164,133.19V162h2.5A40.5,40.5,0,0,0,207,121.5Z' fill='%23fff'/%3E%3Cpath d='M189 72l27 27V72h-27z' fill='%2300c08b'/%3E%3C/svg%3E%0A",
  "reference": null,
  "reference_hash": null,
  "decimals": 18
}
```

</p>
</details>

</TabItem>

<TabItem value="RPC Request" label="RPC Request">

```js
const tokenContract = "token.v2.ref-finance.near";
const args = Buffer.from('{}').toString("base64");
const tokenBalance = fetch("https://rpc.mainnet.near.org", {
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: "ft_metadata",
    method: "query",
    params: {
      request_type: "call_function",
      finality: "final",
      account_id: tokenContract,
      method_name: "ft_metadata",
      args_base64: args,
    },
  }),
  headers: {
    "Content-Type": "application/json",
  },
  method: "POST",
});
```

<details>
<summary>Example response</summary>
<p>

```json
{
  "ok": true,
  "status": 200,
  "contentType": "application/json",
  "body": {
    "jsonrpc": "2.0",
    "result": {
      "block_hash": "GSffMTnrhVsht6U6dwdHutJxd1YdDyvnvbdHeadgKx6p",
      "block_height": 104611783,
      "logs": [],
      "result": [123,34,115,112,101,99,34,58,34,102,116,45,49,46,48,46,48,34,44,34,110,97,109,101,34,58,34,82,101,102,32,70,105,110,97,110,99,101,32,84,111,107,101,110,34,44,34,115,121,109,98,111,108,34,58,34,82,69,70,34,44,34,105,99,111,110,34,58,34,100,97,116,97,58,105,109,97,103,101,47,115,118,103,43,120,109,108,44,37,51,67,115,118,103,32,120,109,108,110,115,61,39,104,116,116,112,58,47,47,119,119,119,46,119,51,46,111,114,103,47,50,48,48,48,47,115,118,103,39,32,118,105,101,119,66,111,120,61,39,49,54,32,50,52,32,50,52,56,32,50,52,56,39,32,115,116,121,108,101,61,39,98,97,99,107,103,114,111,117,110,100,58,32,37,50,51,48,48,48,39,37,51,69,37,51,67,112,97,116,104,32,100,61,39,77,49,54,52,44,49,54,52,118,53,50,104,53,50,90,109,45,52,53,45,52,53,44,50,48,46,52,44,50,48,46,52,44,50,48,46,54,45,50,48,46,54,86,56,49,72,49,49,57,90,109,48,44,49,56,46,51,57,86,50,49,54,104,52,49,86,49,51,55,46,49,57,108,45,50,48,46,54,44,50,48,46,54,90,77,49,54,54,46,53,44,56,49,72,49,54,52,118,51,51,46,56,49,108,50,54,46,49,54,45,50,54,46,49,55,65,52,48,46,50,57,44,52,48,46,50,57,44,48,44,48,44,48,44,49,54,54,46,53,44,56,49,90,77,55,50,44,49,53,51,46,49,57,86,50,49,54,104,52,51,86,49,51,51,46,52,108,45,49,49,46,54,45,49,49,46,54,49,90,109,48,45,49,56,46,51,56,44,51,49,46,52,45,51,49,46,52,76,49,49,53,44,49,49,53,86,56,49,72,55,50,90,77,50,48,55,44,49,50,49,46,53,104,48,97,52,48,46,50,57,44,52,48,46,50,57,44,48,44,48,44,48,45,55,46,54,52,45,50,51,46,54,54,76,49,54,52,44,49,51,51,46,49,57,86,49,54,50,104,50,46,53,65,52,48,46,53,44,52,48,46,53,44,48,44,48,44,48,44,50,48,55,44,49,50,49,46,53,90,39,32,102,105,108,108,61,39,37,50,51,102,102,102,39,47,37,51,69,37,51,67,112,97,116,104,32,100,61,39,77,49,56,57,32,55,50,108,50,55,32,50,55,86,55,50,104,45,50,55,122,39,32,102,105,108,108,61,39,37,50,51,48,48,99,48,56,98,39,47,37,51,69,37,51,67,47,115,118,103,37,51,69,37,48,65,34,44,34,114,101,102,101,114,101,110,99,101,34,58,110,117,108,108,44,34,114,101,102,101,114,101,110,99,101,95,104,97,115,104,34,58,110,117,108,108,44,34,100,101,99,105,109,97,108,115,34,58,49,56,125]
    },
    "id": "ft_metadata"
  }
}
```

**Note**: `result` is an array of bytes, you need to serialize the result by yourself.

</p>
</details>

</TabItem>

</Tabs>

---

## Check token balance

:::info
Remember about fungible token precision. You may need this value to show a response of balance requests in an understandable-to-user way in your app. How to get precision value (decimals) you may find [above](#get-token-metadata).
:::

<Tabs>

<TabItem value="Smart Contract" label="Smart Contract">

```js
const tokenContract = "token.v2.ref-finance.near";
const userTokenBalance = Near.view(tokenContract, "ft_balance_of", {
  account_id: "bob.near",
});
```

<details>
<summary>Example response</summary>
<p>

```json
"3479615037675962643842"
```

</p>
</details>

</TabItem>

<TabItem value="RPC Request" label="RPC Request">

```js
const tokenContract = "token.v2.ref-finance.near";
const args = Buffer.from('{"account_id":"bob.near"}').toString("base64");
const tokenBalance = fetch("https://rpc.mainnet.near.org", {
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: "ftbalance",
    method: "query",
    params: {
      request_type: "call_function",
      finality: "final",
      account_id: tokenContract,
      method_name: "ft_balance_of",
      args_base64: args,
    },
  }),
  headers: {
    "Content-Type": "application/json",
  },
  method: "POST",
});
```

<details>
<summary>Example response</summary>
<p>

```json
{
  "ok": true,
  "status": 200,
  "contentType": "application/json",
  "body": {
    "jsonrpc": "2.0",
    "result": {
      "block_hash": "BRk4P9psignJsQhEThYw54carctUfnwFuPkHV2ProiXa",
      "block_height": 104562819,
      "logs": [],
      "result": [34, 51, 52, 55, 57, 54, 49, 53, 48, 51, 55, 54, 55, 53, 57, 54, 50, 54, 52, 51, 56, 52, 50, 34]
    },
    "id": "ftbalance"
  }
}
```

**Note**: `result` is an array of bytes, you need to serialize the result by yourself.

</p>
</details>

</TabItem>

</Tabs>

---

## Send tokens

<Tabs>

<TabItem value="Smart Contract" label="Smart Contract">

```js
const tokenContract = "token.v2.ref-finance.near";
Near.call(
  tokenContract,
  "ft_transfer",
  {
    receiver_id: "alice.near",
    amount: "100000000000000000",
  },
  undefined,
  1
);
```

:::info
In order to transfer FTs to another account receiver account have to be registered in the token contract and make storage deposit. User can register their account or another account can do it for them.

How to check storage balance in contract (you can make requests to RPC in order to call view methods of smart contract as well):

```js
const aliceStorageBalance = Near.view(tokenContract, "storage_balance_of", {
  account_id: "alice.near",
});
```

<details>
<summary>Example response</summary>
<p>

It returns `null` if account is not registered.

```json
{
  "available": "0",
  "total": "1250000000000000000000"
}
```

</p>
</details>

How to register another account:

```js
const newAliceStorageBalance = Near.call(
  tokenContract,
  "storage_deposit",
  { account_id: "alice.near" },
  undefined,
  1250000000000000000000
);
```

If you need to register your own account just pass `{}` as arguments to call.

<details>
<summary>Example response</summary>
<p>

```json
{
  "available": "0",
  "total": "1250000000000000000000"
}
```

</p>
</details>
:::

</TabItem>

</Tabs>

---

## Swap tokens

We will use [Ref Finance](https://app.ref.finance/) as an AMM contract in this section.

:::warning
Before initiating any actions related with swapping tokens you must have to check that a wallet has a sufficient storage deposit on a token's smart contract. Otherwise, tokens may be stucked in the contract's "owner" account and you will need to solve this issue via Ref Finance support.
:::

<Tabs>

<TabItem value="Smart Contract" label="Smart Contract">

```js
const ammContract = "v2.ref-finance.near";
const result = Near.call(
  ammContract,
  "swap",
  {
    actions: [
      {
        pool_id: 79,
        token_in: "token.v2.ref-finance.near",
        token_out: "wrap.near",
        amount_in: "100000000000000000",
        min_amount_out: "1",
      },
    ],
  },
  300000000000000,
  1
);
```

<details>
<summary>Example response</summary>
<p>

```json
"5019606679394603179450"
```

</p>
</details>

:::info
In order to make swap you need to have enough tokens in deposit on Ref Finance.

Query your deposit balances on Ref Finance

```js
const ammContract = "v2.ref-finance.near";
const depositBalances = Near.view(
  ammContract,
  "get_deposits",
  {
    account_id: "bob.near"
  }
);
```

<details>
<summary>Example response</summary>
<p>

```json
{
  "token.v2.ref-finance.near": "0",
  "wrap.near": "0"
}
```

</p>
</details>

How to [deposit funds](#attaching-fts-to-a-call--already-exist-here)

:::

</TabItem>

</Tabs>

---

## Attaching FTs to a Call

Natively, only NEAR tokens (Ⓝ) can be attached to a method calls. However, the FT standard enables to attach fungible tokens in a call by using the FT-contract as intermediary. This means that, instead of you attaching tokens directly to the call, you ask the FT-contract to do both a transfer and a method call in your name.

Let's assume that you need to deposit FTs on Ref Finance.

```js
const tokenContract = "token.v2.ref-finance.near";
const result = Near.call(
  tokenContract,
  "ft_transfer_call",
  {
    receiver_id: "v2.ref-finance.near",
    amount: "100000000000000000",
    msg: "",
  },
  300000000000000,
  1
);
```

<details>
<summary>Example response</summary>
<p>

```json
'100000000000000000'
```

</p>
</details>

How it works:

1. You call ft_transfer_call in the FT contract passing: the receiver, a message, and the amount.
2. The FT contract transfers the amount to the receiver.
3. The FT contract calls receiver.ft_on_transfer(sender, msg, amount)
4. The FT contract handles errors in the ft_resolve_transfer callback.
5. The FT contract returns you how much of the attached amount was actually used.

## Creating FT

For creating our own FT we will use [Token Farm](https://tkn.farm/). You can use it from GUI in your browser, but we will look at how to use its smart contracts to create a token.

First of all, you need to calculate how much creating a token will cost you.

<Tabs>

<TabItem value="Smart Contract" label="Smart Contract">

```js
const contract = "tkn.near";
const args = {
  args: {
    owner_id: "bob.near",
    total_supply: "1000000000",
    metadata: {
      spec: "ft-1.0.0",
      name: "Test Token",
      symbol: "TTTEST",
      icon: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
      decimals: 18,
    },
  },
  account_id: "bob.near",
};
const requiredStorageDeposit = Near.view(
  contract,
  "get_required_deposit",
  args
);
```

<details>
<summary>Example response</summary>
<p>

```json
'2234830000000000000000000'
```

</p>
</details>

</TabItem>

<TabItem value="RPC Request" label="RPC Request">

```js
const contract = "tkn.near";
const args = Buffer.from(
  '{"args":{"owner_id": "bob.near","total_supply": "1000000000","metadata":{"spec": "ft-1.0.0","name": "Test Token","symbol": "TTTEST","icon": "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7","decimals": 18}},"account_id": "bob.near"}'
).toString("base64");
const requiredStorageDeposit = fetch("https://rpc.mainnet.near.org", {
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: "get_required_deposit",
    method: "query",
    params: {
      request_type: "call_function",
      finality: "final",
      account_id: contract,
      method_name: "get_required_deposit",
      args_base64: args,
    },
  }),
  headers: {
    "Content-Type": "application/json",
  },
  method: "POST",
});
```

<details>
<summary>Example response</summary>
<p>

```json
{
  "ok": true,
  "status": 200,
  "contentType": "application/json",
  "body": {
    "jsonrpc": "2.0",
    "result": {
      "block_hash": "6We5sybVQpf1pswyVsf32cGJfsFH8oHUNiB8RDJdVMpT",
      "block_height": 105246927,
      "logs": [],
      "result": [34, 50, 50, 51, 52, 56, 51, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 34]
    },
    "id": "get_required_deposit"
  }
}
```

**Note**: `result` is an array of bytes, you need to serialize the result by yourself.

</p>
</details>

</TabItem>

</Tabs>

And then you can create a token.

<Tabs>

<TabItem value="Smart Contract" label="Smart Contract">

```js
Near.call(contract, "create_token", args, 300000000000000, requiredStorageDeposit);
```

</TabItem>

</Tabs>

Contract of your token will have an address which looks like `<your_token_ticker>.tkn.near`.

After creating a token you can [send it](#send-tokens) to anyone.