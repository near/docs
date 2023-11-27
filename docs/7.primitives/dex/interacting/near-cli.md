---
id: near-cli
title: NEAR CLI
hide_table_of_contents: false
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This section shows how to interact with FTs from your shell using [`near-cli`](../../../4.tools/cli.md).

---

## Swap tokens

This snippet will enable your users to swap FTs.

We will use [Ref Finance](https://app.ref.finance/) as an AMM contract in this section.

:::warning
Before initiating any actions related with swapping tokens you must have to check that a wallet has a sufficient storage deposit on a token's smart contract. Otherwise, tokens may be stuck in the contract's "owner" account and you will need to solve this issue via Ref Finance support.
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
