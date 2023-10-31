---
id: bos
title: NEAR Component
hide_table_of_contents: false
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This section shows how to interact with FTs directly from a [NEAR Component](../../../bos/components.md)

---

## Check token balance

<Tabs>

<TabItem value="RPC" label="RPC">

```js
```

</TabItem>

<TabItem value="Ref Finance API" label="Ref Finance API">

```js
const tokenContract = "token.v2.ref-finance.near";
const tokenPrice = fetch(
  "https://indexer.ref.finance/get-token-price?token_id=token.v2.ref-finance.near"
).body;

console.log("refPrice: ", JSON.parse(tokenPrice));
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

</TabItem>

<TabItem value="Smart Contract" label="Smart Contract">

```js

```

</TabItem>

</Tabs>

## Send tokens
## Get prices (?)

Ref Finance API

List of prices
https://indexer.ref.finance/list-token-price

Get token price
https://indexer.ref.finance/get-token-price?token_id=token.v2.ref-finance.near

## Swap tokens (?)
## Attaching FTs to a Call (? already exist [here](https://docs.near.org/develop/relevant-contracts/ft))
## Minting FTs (? already exist [here](https://docs.near.org/tutorials/fts/simple-fts))