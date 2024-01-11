---
id: bos
title: NEAR Component
hide_table_of_contents: false
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This section describes how to interact with DEXs directly from a [NEAR Component](../../../bos/components.md).

***

## Get token price

Here is how to obtain the price for different tokens in US dollars from different exchanges.

<Tabs>

<TabItem value="Ref Finance API" label="Ref Finance API">

```js
const tokenContract = "token.v2.ref-finance.near";
const tokenPriceResult = fetch(
  `https://indexer.ref.finance/get-token-price?token_id=${tokenContract}`
).body;
const tokenPriceValue = JSON.parse(tokenPriceResult);
```

<details>
<summary>Example response</summary>
<p>

```json
{
  "token_contract_id": "token.v2.ref-finance.near",
  "price": "0.08153090"
}
```

</p>

</details>

:::tip
Ref Finance has a method to [get all token prices at once](https://indexer.ref.finance/list-token-price).
:::

</TabItem>

</Tabs>

***

## Swap tokens

This snippet will enable your users to swap FTs.

<Tabs>

<TabItem value="Ref Finance" label="Ref Finance">

:::note
Please, be careful using third-party contracts. Make sure that your account meets all the requirements of the smart contract if they exist. [Ref Finance docs](https://guide.ref.finance/).
:::

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

<hr class="subsection" />

### Get pools

In order to make swap you need to know `pool_id`. The pool index is its id.

Query available pools:

```js
const ammContract = "v2.ref-finance.near";
const result = Near.view(
  ammContract,
  "get_pools",
  {
    from_index: 0,
    limit: 1000
  }
);
```

<details>
<summary>Example response</summary>
<p>

```js
[
  {
    pool_kind: 'SIMPLE_POOL',
    token_account_ids: [ 'token.skyward.near', 'wrap.near' ],
    amounts: [ '51865812079751349630100', '6254162663147994789053210138' ],
    total_fee: 30,
    shares_total_supply: '1305338644973934698612124055',
    amp: 0
  },
  {
    pool_kind: 'SIMPLE_POOL',
    token_account_ids: [
      'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.factory.bridge.near',
      'wrap.near'
    ],
    amounts: [ '783621938569399817', '1100232280852443291118200599' ],
    total_fee: 30,
    shares_total_supply: '33923015415693335344747628',
    amp: 0
  }
]
```

</p>

</details>

<hr class="subsection" />

### Check deposit balances

In order to make swap you need to have enough tokens in deposit on Ref Finance.

Query your deposit balances:

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

<hr class="subsection" />

### Deposit funds

See how to deposit funds on Ref Finance [here](../../ft/interacting/bos.md#attaching-fts-to-a-call).

</TabItem>

</Tabs>

***

## Additional Resources

- [Ref Finance Component](https://near.org/near/widget/ComponentDetailsPage?src=weige.near/widget/ref-swap): A widget ready to be forked that enables to swap tokens in ref finance.
