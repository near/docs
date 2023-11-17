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

<Tabs>

<TabItem value="Ref Finance" label="Ref Finance">

:::note
Please, be careful using third-party contracts. Make sure that your account meets all the requirements of the smart contract if they exist. [Ref Finance docs](https://guide.ref.finance/).
:::

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

### Check deposit balances

In order to make swap you need to have enough tokens in deposit on Ref Finance.

Query your deposit balances:

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

### Deposit funds

See how to deposit funds on Ref Finance [here](../../ft/interacting/near-cli.md#attaching-fts-to-a-call).

</TabItem>

</Tabs>