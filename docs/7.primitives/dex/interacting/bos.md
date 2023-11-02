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

