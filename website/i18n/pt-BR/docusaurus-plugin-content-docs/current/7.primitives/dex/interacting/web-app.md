---
id: web-app
title: Web Application
hide_table_of_contents: false
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This section describes how to interact with DEXs directly from a web app.

:::info
All the examples are using a `Wallet` object, which comes from our [basic template](https://github.com/near-examples/hello-near-js/blob/master/frontend/near-wallet.js)
:::

***

## Get token price

Here is how to obtain the price for different tokens in US dollars from different exchanges.

<Tabs>

<TabItem value="Ref Finance API" label="Ref Finance API">

```js
const tokenContract = "token.v2.ref-finance.near";
const tokenPriceResult = await fetch(
  `https://indexer.ref.finance/get-token-price?token_id=${tokenContract}`
);
const tokenPriceValue = await tokenPriceResult.json();
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

<hr class="subsection" />

### Get pools

In order to make swap you need to know `pool_id`. The pool index is its id.

Query available pools:

```js
const AMM_CONTRACT_ADDRESS = "v2.ref-finance.near";
const wallet = new Wallet({ createAccessKeyFor: AMM_CONTRACT_ADDRESS });
 
await wallet.viewMethod({
  method: 'get_pools',
  args: {
    from_index: 0,
    limit: 1000
  },
  contractId: AMM_CONTRACT_ADDRESS,
});
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

<hr class="subsection" />

### Deposit funds

See how to deposit funds on Ref Finance [here](../../ft/interacting/web-app.md#attaching-fts-to-a-call).

</TabItem>

</Tabs>

***

## Additional Resources

- [Ref SDK](https://guide.ref.finance/developers-1/ref-sdk): provides functions for: swapping tokens, getting tokens metadata, fetching pools details, getting swap estimates.
- [Ref Swap Widget](https://github.com/ref-finance/ref-sdk#ref-swap-widget): allows any service to access Ref's liquidity.
