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
Ref Finance API has a method to [get list of prices](https://indexer.ref.finance/list-token-price).
:::

</TabItem>

</Tabs>

---

## List of token prices from Ref Finance

```bash
curl -k -L -s --compressed \
  https://indexer.ref.finance/list-token-price
```

<details>
<summary>Example response: </summary>
<p>

```json
{
  "wrap.near": {
    "price": "1.011",
    "decimal": 24,
    "symbol": "near"
  },
  "a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.factory.bridge.near": {
    "price": "1.0",
    "decimal": 6,
    "symbol": "nUSDC"
  },
  ...
}
```

</p>
</details>

## Swap tokens

This snippet will enable your users to swap FTs.

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

## Ref Swap Widget
[Ref Finance](https://www.ref.finance/) provides the Ref Swap Widget in order to allow any service to access Ref's liquidity. For example, you can allow user swap other tokens (including stablecoins) for your project's token just using the Ref Swap Widget.

:::info
[Detailed Ref Swap Widget documentation](https://github.com/ref-finance/ref-sdk#ref-swap-widget)
:::

---

## Ref SDK

[Ref Finance](https://www.ref.finance/) provides a SDK with the main functions: swapping tokens, getting tokens metadata, fetching pools details, getting swap estimates.

:::info
[Detailed Ref SDK documentation](https://guide.ref.finance/developers-1/ref-sdk)
:::

---

## Bridge Tokens

If a project already has a token on Ethereum, there is an opportunity to bridge such token to NEAR using [Rainbow Bridge](https://rainbowbridge.app/).

:::note
Before the bridging a token it needs to deploy that token on NEAR. You can do it by [Rainbow Bridge a tool](https://rainbowbridge.app/deploy).
:::

---