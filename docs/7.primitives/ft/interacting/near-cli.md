---
id: near-cli
title: NEAR CLI
hide_table_of_contents: false
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This section shows how to interact with FTs from your shell using [`near-cli`](../../../4.tools/cli.md).

---

## Get token metadata

This snippet will enable your users to query FT metadata from smart contract directly or via RPC.

<Tabs>

<TabItem value="Smart Contract" label="Smart Contract">

```bash
near view token.v2.ref-finance.near ft_metadata
```

<details>
<summary>Example response</summary>
<p>

```bash
{
  spec: "ft-1.0.0",
  name: "Ref Finance Token",
  symbol: "REF",
  icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='16 24 248 248' style='background: %23000'%3E%3Cpath d='M164,164v52h52Zm-45-45,20.4,20.4,20.6-20.6V81H119Zm0,18.39V216h41V137.19l-20.6,20.6ZM166.5,81H164v33.81l26.16-26.17A40.29,40.29,0,0,0,166.5,81ZM72,153.19V216h43V133.4l-11.6-11.61Zm0-18.38,31.4-31.4L115,115V81H72ZM207,121.5h0a40.29,40.29,0,0,0-7.64-23.66L164,133.19V162h2.5A40.5,40.5,0,0,0,207,121.5Z' fill='%23fff'/%3E%3Cpath d='M189 72l27 27V72h-27z' fill='%2300c08b'/%3E%3C/svg%3E%0A",
  reference: null,
  reference_hash: null,
  decimals: 18
}
```

</p>
</details>

</TabItem>

</Tabs>

---

## Check token balance

This snippet will enable your users to get their FT balance from smart contract or via RPC.

<Tabs>

<TabItem value="Smart Contract" label="Smart Contract">

```bash
near view token.v2.ref-finance.near ft_balance_of '{"account_id": "bob.near"}'
```

<details>
<summary>Example response</summary>
<p>

```bash
'376224322825327177426'
```

</p>
</details>

</TabItem>

</Tabs>

---

## Send tokens

This snippet will enable your users to transfer their FT tokens.

<Tabs>

<TabItem value="Smart Contract" label="Smart Contract">

```bash
near call token.v2.ref-finance.near ft_transfer '{"receiver_id": "alice.near", "amount": "100000000000000000"}' --depositYocto 1 --accountId bob.near
```

:::info
In order to transfer FTs to another account receiver account have to be registered in the token contract and make storage deposit. User can register their account or another account can do it for them.

How to check storage balance in contract (you can make requests to RPC in order to call view methods of smart contract as well):

```bash
near view token.v2.ref-finance.near storage_balance_of '{"account_id": "alice.near"}'
```

<details>
<summary>Example response</summary>
<p>

It returns `null` if account is not registered.

```bash
{
  available: '0',
  total: '1250000000000000000000'
}
```

</p>
</details>

How to register another account:

```bash
near call token.v2.ref-finance.near storage_deposit '{"account_id": "alice.near"}' --depositYocto 1250000000000000000000 --accountId bob.near
```

If you need to register your own account just pass `{}` as arguments to call.

<details>
<summary>Example response</summary>
<p>

```bash
{
  available: '0',
  total: '1250000000000000000000'
}
```

</p>
</details>
:::

</TabItem>

</Tabs>

---

## Swap tokens

This snippet will enable your users to swap FTs.

We will use [Ref Finance](https://app.ref.finance/) as an AMM contract in this section.

:::warning
Before initiating any actions related with swapping tokens you must have to check that a wallet has a sufficient storage deposit on a token's smart contract. Otherwise, tokens may be stucked in the contract's "owner" account and you will need to solve this issue via Ref Finance support.
:::

<Tabs>

<TabItem value="Smart Contract" label="Smart Contract">

```bash
near call v2.ref-finance.near swap "{\"actions\": [{\"pool_id\": 79, \"token_in\": \"token.v2.ref-finance.near\", \"amount_in\": \"100000000000000000\", \"token_out\": \"wrap.near\", \"min_amount_out\": \"1\"}]}" --gas 300000000000000 --depositYocto 1
 --accountId bob.near
```

<details>
<summary>Example response</summary>
<p>

```bash
'5019606679394603179450'
```

</p>
</details>

:::info
In order to make swap you need to have enough tokens in deposit on Ref Finance.

Query your deposit balances on Ref Finance

```bash
near view v2.ref-finance.near get_deposits '{"account_id": "bob.near"}'
```

<details>
<summary>Example response</summary>
<p>

```bash
{
  'token.v2.ref-finance.near': '0',
  'wrap.near': "0"
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

```bash
near call token.v2.ref-finance.near ft_transfer_call '{"receiver_id": "v2.ref-finance.near", "amount": "100000000000000000", "msg": ""}' --gas 300000000000000 --depositYocto 1 --accountId bob.near
```

<details>
<summary>Example response</summary>
<p>

```bash
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

```bash
near view tkn.near get_required_deposit '{"args":{"owner_id": "bob.near","total_supply": "1000000000","metadata":{"spec": "ft-1.0.0","name": "Test Token","symbol": "TTTEST","icon": "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7","decimals": 18}},"account_id": "bob.near"}' 
```

<details>
<summary>Example response</summary>
<p>

```bash
'2234830000000000000000000'
```

</p>
</details>

And then you can create a token.

```bash
near call tkn.near create_token '{"args":{"owner_id": "bob.near","total_supply": "1000000000","metadata":{"spec": "ft-1.0.0","name": "Test Token","symbol": "TTTEST","icon": "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7","decimals": 18}},"account_id": "bob.near"}' --gas 300000000000000 --depositYocto 2234830000000000000000000 --accountId bob.near
```

Contract of your token will have an address which looks like `<your_token_ticker>.tkn.near`.

After creating a token you can [send it](#send-tokens) to anyone.