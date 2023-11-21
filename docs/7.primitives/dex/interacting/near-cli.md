---
id: near-cli
title: NEAR CLI
hide_table_of_contents: false
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This section shows how to interact with DEXs from your shell using [`near-cli`](../../../4.tools/cli.md).

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

<hr class="subsection" />

### Get pools

In order to make swap you need to know `pool_id`. The pool index is its id.

Query available pools:

```bash
near view v2.ref-finance.near get_pools '{"from_index": 0, "limit": 1000}'
```

<details>
<summary>Example response</summary>
<p>

```bash
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

### Check deposit balances

In order to make swap you need to have enough tokens in deposit on Ref Finance.

Query your deposit balances:

```rust
// Validator interface, for cross-contract calls
#[ext_contract(ext_amm_contract)]
trait ExternalAmmContract {
  fn get_deposits(&self, account_id: AccountId) -> Promise;
}

// Implement the contract structure
#[near_bindgen]
impl Contract {
  #[private] // Public - but only callable by env::current_account_id()
  pub fn external_get_deposits_callback(&self, #[callback_result] call_result: Result<HashMap<AccountId, U128>, PromiseError>) -> Option<HashMap<AccountId, U128>> {
    // Check if the promise succeeded
    if call_result.is_err() {
      log!("There was an error contacting external contract");
      return None;
    }

    // Return the pools data
    let deposits_data = call_result.unwrap();
    return Some(deposits_data);
  }

  pub fn get_contract_deposits(&self) -> Promise {
    let promise = ext_amm_contract::ext(self.amm_contract.clone())
      .get_deposits(env::current_account_id());

    return promise.then( // Create a promise to callback query_greeting_callback
      Self::ext(env::current_account_id())
      .external_get_deposits_callback()
    )
  }
}
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