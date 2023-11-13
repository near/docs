---
id: web-app
title: Web Application
hide_table_of_contents: false
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This section describes how to interact with FTs directly from a web app.

:::info
All the examples are using a `Wallet` object, which comes from our [basic template](https://github.com/near-examples/hello-near-js/blob/master/frontend/near-wallet.js)
:::

---

## Get token metadata

This snippet will enable your users to query FT metadata.

```js
import { Wallet } from './near-wallet';

const TOKEN_CONTRACT_ADDRESS = "token.v2.ref-finance.near";
const wallet = new Wallet({ createAccessKeyFor: TOKEN_CONTRACT_ADDRESS });
 
await wallet.viewMethod({
  method: 'ft_metadata',
  args: {},
  contractId: TOKEN_CONTRACT_ADDRESS
});
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

---

## Check token balance

This snippet will enable your users to get their FT balance.

:::info
Remember about fungible token precision. You may need this value to show a response of balance requests in an understandable-to-user way in your app. How to get precision value (decimals) you may find [above](#get-token-metadata).
:::

```js
import { Wallet } from './near-wallet';

const TOKEN_CONTRACT_ADDRESS = "token.v2.ref-finance.near";
const wallet = new Wallet({ createAccessKeyFor: TOKEN_CONTRACT_ADDRESS });
 
await wallet.viewMethod({
  method: 'ft_balance_of',
  args: {
    account_id: 'bob.near'
  },
  contractId: TOKEN_CONTRACT_ADDRESS
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

---

## Send tokens

This snippet will enable your users to transfer their FT tokens.

```js
import { Wallet } from './near-wallet';

const TOKEN_CONTRACT_ADDRESS = "token.v2.ref-finance.near";
const wallet = new Wallet({ createAccessKeyFor: TOKEN_CONTRACT_ADDRESS });
 
await wallet.callMethod({
  method: 'ft_transfer',
  args: {
    receiver_id: 'alice.near',
    amount: '100000000000000000',
  },
  contractId: TOKEN_CONTRACT_ADDRESS,
  deposit: 1
});
```

:::info
In order to transfer FTs to another account receiver account have to be registered in the token contract and make storage deposit. User can register their account or another account can do it for them.

How to check storage balance:

```js
const balance = await wallet.viewMethod({
  method: 'storage_balance_of',
  args: {
    account_id: 'alice.near'
  },
  contractId: TOKEN_CONTRACT_ADDRESS
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
const newAliceStorageBalance = await wallet.callMethod({
  method: 'storage_deposit',
  args: {
    receiver_id: 'alice.near',
    amount: '100000000000000000',
  },
  contractId: TOKEN_CONTRACT_ADDRESS,
  deposit: 1250000000000000000000
});
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

---

## Swap tokens

This snippet will enable your users to swap FTs.

We will use [Ref Finance](https://app.ref.finance/) as an AMM contract in this section.

:::warning
Before initiating any actions related with swapping tokens you must have to check that a wallet has a sufficient storage deposit on a token's smart contract. Otherwise, tokens may be stucked in the contract's "owner" account and you will need to solve this issue via Ref Finance support.
:::

<Tabs>

<TabItem value="Smart Contract" label="Smart Contract">

```js
import { Wallet } from './near-wallet';

const AMM_CONTRACT_ADDRESS = "v2.ref-finance.near";
const wallet = new Wallet({ createAccessKeyFor: AMM_CONTRACT_ADDRESS });
 
await wallet.callMethod({
  method: 'swap',
  args: {
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
  contractId: AMM_CONTRACT_ADDRESS,
  gas: 300000000000000,
  deposit: 1
});
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
const AMM_CONTRACT_ADDRESS = "v2.ref-finance.near";
const wallet = new Wallet({ createAccessKeyFor: AMM_CONTRACT_ADDRESS });
 
await wallet.viewMethod({
  method: 'get_deposits',
  args: {
   account_id: "bob.near"
  },
  contractId: AMM_CONTRACT_ADDRESS,
});
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

This snippet will enable your users to attach FT to a call.

Natively, only NEAR tokens (Ⓝ) can be attached to a method calls. However, the FT standard enables to attach fungible tokens in a call by using the FT-contract as intermediary. This means that, instead of you attaching tokens directly to the call, you ask the FT-contract to do both a transfer and a method call in your name.

Let's assume that you need to deposit FTs on Ref Finance.

```js
import { Wallet } from './near-wallet';

const TOKEN_CONTRACT_ADDRESS = "token.v2.ref-finance.near";
const wallet = new Wallet({ createAccessKeyFor: TOKEN_CONTRACT_ADDRESS });
 
await wallet.callMethod({
  method: 'ft_transfer_call',
  args: {
    receiver_id: "v2.ref-finance.near",
    amount: "100000000000000000",
    msg: "",
  },
  contractId: TOKEN_CONTRACT_ADDRESS,
  gas: 300000000000000,
  deposit: 1
});
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

This snippet will enable your users to create their own FT.

For creating our own FT we will use [Token Farm](https://tkn.farm/). You can use it from GUI in your browser, but we will look at how to use its smart contracts to create a token.

First of all, you need to calculate how much creating a token will cost you.

```js
import { Wallet } from './near-wallet';

const CONTRACT_ADDRESS = "tkn.near";
const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS });

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

const requiredStorageDeposit = await wallet.viewMethod({
  method: 'get_required_deposit',
  args,
  contractId: CONTRACT_ADDRESS
});
```

<details>
<summary>Example response</summary>
<p>

```json
'2234830000000000000000000'
```

</p>
</details>

Then you can create a token.

```js
await wallet.callMethod({
  method: 'create_token',
  args,
  contractId: CONTRACT_ADDRESS,
  gas: 300000000000000,
  deposit: requiredStorageDeposit
});
```

Contract of your token will have an address which looks like `<your_token_ticker>.tkn.near`.

After creating a token you can [send it](#send-tokens) to anyone.