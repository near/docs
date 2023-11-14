---
id: bos
title: NEAR Component
hide_table_of_contents: false
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This section describes how to interact with DEX directly from a [NEAR Component](../../../bos/components.md)

---

## Get token price

Here is how to obtain the price for different tokens in US dollars from different exchanges.

<Tabs>

<TabItem value="Ref Finance API" label="Ref Finance API">

```js
const tokenContract = "token.v2.ref-finance.near";
const tokenPrice = fetch(
  "https://indexer.ref.finance/get-token-price?token_id=token.v2.ref-finance.near"
).body;
```

<details>
<summary>Example response</summary>
<p>

```json
{
  "token_contract_id": "token.v2.ref-finance.near",
  "price": "0.05732698"
}
```

</p>
</details>

:::tip
Ref Finance has a method to [get all token prices at once](https://indexer.ref.finance/list-token-price).
:::

</TabItem>

</Tabs>

---

## Swap tokens

This snippet will enable your users to swap FTs.

<Tabs>

<TabItem value="Ref Finance" label="Ref Finance">

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

:::warning
Before initiating any actions related with swapping tokens you must have to check that a wallet has a sufficient storage deposit on a token's smart contract. Otherwise, tokens may be stucked in the contract's "owner" account and you will need to solve this issue via Ref Finance support. [link to ref docs](missing-link).
:::



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

## Ref SDK

[Ref Finance](https://www.ref.finance/) provides a SDK with the main functions: swapping tokens, getting tokens metadata, fetching pools details, getting swap estimates.

:::info
[Detailed Ref SDK documentation](https://guide.ref.finance/developers-1/ref-sdk)
:::


---

## BOS Component

Ref finance offers a widget [ready to be forked](https://near.org/near/widget/ComponentDetailsPage?src=weige.near/widget/ref-swap).

<iframe src="https://near.social/embed/weige.near/widget/ref-swap" width="600" height="800" />
