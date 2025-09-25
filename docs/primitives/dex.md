---
id: dex
title: Decentralized Exchanges (DEX)
hide_table_of_contents: false
description: "Learn how to interact with decentralized exchanges on NEAR Protocol, including token swapping, liquidity pools, and integration with Ref Finance DEX."
---

import {FeatureList, Column, Feature} from "@site/src/components/featurelist"

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import { LantstoolLabel } from "@site/src/components/lantstool/LantstoolLabel/LantstoolLabel";
import { TryOutOnLantstool } from "@site/src/components/lantstool/TryOutOnLantstool";

A Decentralized Exchange (DEX) is an application that allows users to trade tokens (native & fungible tokens) through smart contracts.

![dex](/docs/primitives/dex.png)

In brief, DEXs work by having [pools of token pairs](https://guide.rhea.finance/products/overview/pooling) (e.g. NEAR-USDC) that users can deposit tokens into.

The ratio of the tokens in the pool determines the exchange rate for a swap. Indeed, swapping is adding tokens to one side of the pool while removing tokens from the other side of the pool.

:::info

This docs refer to [Ref Finance](https://www.ref.finance/), a community built DEX in NEAR.

Please check their [docs](https://guide.rhea.finance/) for more information.

:::

---

## Query Token Exchange Rate
One can query the exchange rate of a token pair by calling the `get-token-price` method on the DEX contract.

<Tabs groupId="code-tabs">
  <TabItem value="🌐 WebApp" label="🌐 WebApp">

    ```js
    const tokenContract = 'token.v2.ref-finance.near';
    const tokenPriceResult = await fetch(
      `https://indexer.ref.finance/get-token-price?token_id=${tokenContract}`,
    );
    const tokenPriceValue = await tokenPriceResult.json();
    ```

    _The `Wallet` object comes from our [quickstart template](https://github.com/near-examples/hello-near-examples/blob/main/frontend/near-wallet.js)_

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

---

## Query Whitelisted Tokens
Anyone list tokens for sale in the DEX. This is why, in order to protect users, the DEX contract has a list of whitelisted tokens that can be traded.

<Tabs groupId="code-tabs">
  <TabItem value="🖥️ CLI" label="🖥️ CLI">

```bash
near view v2.ref-finance.near get_whitelisted_tokens
```
<details>
<summary> Examples Response </summary>

```bash
  'wrap.near',
  'usdt.tether-token.near',
  'berryclub.ek.near',
  'farm.berryclub.ek.near',
  'token.v2.ref-finance.near',
  'token.paras.near',
  'marmaj.tkn.near',
  'meta-pool.near',
  ...
```

</details>

  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}> 
   <TryOutOnLantstool path="docs/2.build/5.primitives/dex/whitelist-tokens.json" />
  <details>
  <summary> Examples Response </summary>

    ```bash
      'wrap.near',
      'usdt.tether-token.near',
      'berryclub.ek.near',
      'farm.berryclub.ek.near',
      'token.v2.ref-finance.near',
      'token.paras.near',
      'marmaj.tkn.near',
      'meta-pool.near',
      ...
    ```

  </details>
  </TabItem>
</Tabs>



---

## Register in the DEX
In order to use the contract, make sure to register your account in the DEX by paying for the storage you will use in order to keep track of your balances.

<Tabs groupId="code-tabs">
  <TabItem value="🖥️ CLI" label="🖥️ CLI">

```bash
near call v2.ref-finance.near storage_deposit '' --accountId <account> --amount 0.1
```

</TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/2.build/5.primitives/dex/register-dex.json" />
  </TabItem>


</Tabs>

---

## Deposit funds

In order to swap tokens, one must first deposit tokens into the DEX. For this, you will need to transfer the FT you want to swap to the DEX contract.

<Tabs groupId="code-tabs">
  <TabItem value="🖥️ CLI" label="🖥️ CLI">

```bash
near call token.v2.ref-finance.near ft_transfer_call {"receiver_id": "v2.ref-finance.near", "amount": "1000000000000", "msg": ""} --gas 300000000000000 --depositYocto 1 --accountId <account>
```

</TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/2.build/5.primitives/dex/deposit-funds.json" />
  </TabItem>
</Tabs>

:::danger

Do **NOT** transfer **NEAR** tokens to Ref Finance. Instead, call `near_deposit` in the [`wrap.near`](https://nearblocks.io/address/wrap.near) contract, attaching the amount of NEAR you want to swap.

This will mint `wrap.near` for you, which you can then transfer to Ref Finance.

:::

---

## Get Deposit Balances

Query your deposit balances by calling the `get_deposits` method:

<Tabs groupId="code-tabs">
  <TabItem value="🌐 WebApp" label="🌐 WebApp">
    
  ```js
  const AMM_CONTRACT_ADDRESS = 'v2.ref-finance.near';
  const wallet = new Wallet({ createAccessKeyFor: AMM_CONTRACT_ADDRESS });

  await wallet.viewMethod({
    method: 'get_deposits',
    args: {
      account_id: 'bob.near',
    },
    contractId: AMM_CONTRACT_ADDRESS,
  });
  ```

  _The `Wallet` object comes from our [quickstart template](https://github.com/near-examples/hello-near-examples/blob/main/frontend/near-wallet.js)_

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

  </TabItem>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">

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
  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>

  <TryOutOnLantstool path="docs/2.build/5.primitives/dex/deposit-balance.json" />

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
  </TabItem>
  <TabItem value="📄 Contract" label="📄 Contract">
 
      ```rust
  // Validator interface, for cross-contract calls
  #[ext_contract(ext_amm_contract)]
  trait ExternalAmmContract {
    fn get_deposits(&self, account_id: AccountId) -> Promise;
  }

  // Implement the contract structure
  #[near]
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
  </TabItem>
</Tabs>

---

### Query Pools

DEXs work by having multiple pools of token pairs (e.g. NEAR-USDC) that users can deposit tokens into.

<Tabs groupId="code-tabs">
  <TabItem value="🌐 WebApp" label="🌐 WebApp">

  ```js
  const AMM_CONTRACT_ADDRESS = 'v2.ref-finance.near';
  const wallet = new Wallet({ createAccessKeyFor: AMM_CONTRACT_ADDRESS });

  await wallet.viewMethod({
    method: 'get_pools',
    args: {
      from_index: 0,
      limit: 1000,
    },
    contractId: AMM_CONTRACT_ADDRESS,
  });
  ```

  _The `Wallet` object comes from our [quickstart template](https://github.com/near-examples/hello-near-examples/blob/main/frontend/near-wallet.js)_

  <details>
  <summary>Example response</summary>
  <p>

  ```js
  [
    {
      pool_kind: 'SIMPLE_POOL',
      token_account_ids: ['token.skyward.near', 'wrap.near'],
      amounts: ['51865812079751349630100', '6254162663147994789053210138'],
      total_fee: 30,
      shares_total_supply: '1305338644973934698612124055',
      amp: 0,
    },
    {
      pool_kind: 'SIMPLE_POOL',
      token_account_ids: [
        'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.factory.bridge.near',
        'wrap.near',
      ],
      amounts: ['783621938569399817', '1100232280852443291118200599'],
      total_fee: 30,
      shares_total_supply: '33923015415693335344747628',
      amp: 0,
    },
  ];
  ```
  </p>
  </details>  

  </TabItem>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">
  
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

  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>

  <TryOutOnLantstool path="docs/2.build/5.primitives/dex/query-pools.json" />

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

  </TabItem>
  <TabItem value="📄 Contract" label="📄 Contract">

  ```rust
  #[near(serializers = [json])]
  pub struct PoolInfo {
    /// Pool kind.
    pub pool_kind: String,
    /// List of tokens in the pool.
    pub token_account_ids: Vec<AccountId>,
    /// How much NEAR this contract has.
    pub amounts: Vec<U128>,
    /// Fee charged for swap.
    pub total_fee: u32,
    /// Total number of shares.
    pub shares_total_supply: U128,
    pub amp: u64,
  }

  // Validator interface, for cross-contract calls
  #[ext_contract(ext_amm_contract)]
  trait ExternalAmmContract {
    fn get_pools(&self, from_index: u64, limit: u64) -> Promise;
  }

  // Implement the contract structure
  #[near]
  impl Contract {
    #[private] // Public - but only callable by env::current_account_id()
    pub fn external_get_pools_callback(&self, #[callback_result] call_result: Result<Vec<PoolInfo>, PromiseError>) -> Option<Vec<PoolInfo>> {
      // Check if the promise succeeded
      if call_result.is_err() {
        log!("There was an error contacting external contract");
        return None;
      }

      // Return the pools data
      let pools_data = call_result.unwrap();
      return Some(pools_data);
    }

    pub fn get_amm_pools(&self, from_index: u64, limit: u64) -> Promise {
      let promise = ext_amm_contract::ext(self.amm_contract.clone())
        .get_pools(from_index, limit);

      return promise.then( // Create a promise to callback query_greeting_callback
        Self::ext(env::current_account_id())
        .external_get_pools_callback()
      )
    }
  }
  ```
  </TabItem>
</Tabs>

---

## Swap tokens
In order to swap a token for another, you need to [have funds](#deposit-funds), and there needs to [**exist a pool**](#query-pools) that has **both tokens** on it.

<Tabs groupId="code-tabs">
  <TabItem value="🌐 WebApp" label="🌐 WebApp">

    ```js
    import { Wallet } from './near-wallet';

    const AMM_CONTRACT_ADDRESS = 'v2.ref-finance.near';
    const wallet = new Wallet({ createAccessKeyFor: AMM_CONTRACT_ADDRESS });

    await wallet.callMethod({
      method: 'swap',
      args: {
        actions: [
          {
            pool_id: 79,
            token_in: 'token.v2.ref-finance.near',
            token_out: 'wrap.near',
            amount_in: '100000000000000000',
            min_amount_out: '1',
          },
        ],
      },
      contractId: AMM_CONTRACT_ADDRESS,
      gas: 300000000000000,
      deposit: 1,
    });
    ```

    _The `Wallet` object comes from our [quickstart template](https://github.com/near-examples/hello-near-examples/blob/main/frontend/near-wallet.js)_

  <details>
  <summary>Example response</summary>

    ```json
    "5019606679394603179450"
    ```
  </details>

  </TabItem>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">
   
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

  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
  <TryOutOnLantstool path="docs/2.build/5.primitives/dex/swap-tokens.json" />
  <details>
  <summary>Example response</summary>
  <p>

  ```bash
  '5019606679394603179450'
  ```
  </p>
  </details>
  </TabItem>
  <TabItem value="📄 Contract" label="📄 Contract">

  ```rust
  #[near(serializers = [json])]
  pub struct SwapAction {
      /// Pool which should be used for swapping.
      pub pool_id: u64,
      /// Token to swap from.
      pub token_in: AccountId,
      /// Amount to exchange.
      /// If amount_in is None, it will take amount_out from previous step.
      /// Will fail if amount_in is None on the first step.
      pub amount_in: Option<U128>,
      /// Token to swap into.
      pub token_out: AccountId,
      /// Required minimum amount of token_out.
      pub min_amount_out: U128,
  }

  // Validator interface, for cross-contract calls
  #[ext_contract(ext_amm_contract)]
  trait ExternalAmmContract {
    fn swap(&self, actions: Vec<SwapAction>) -> Promise;
  }

  // Implement the contract structure
  #[near]
  impl Contract {
    #[private] // Public - but only callable by env::current_account_id()
    pub fn external_call_callback(&self, #[callback_result] call_result: Result<String, PromiseError>) {
      // Check if the promise succeeded
      if call_result.is_err() {
        log!("There was an error contacting external contract");
      }
    }

    #[payable]
    pub fn swap_tokens(&mut self, pool_id: u64, token_in: AccountId, token_out: AccountId, amount_in: U128, min_amount_out: U128) -> Promise {
      assert_eq!(env::attached_deposit(), 1, "Requires attached deposit of exactly 1 yoctoNEAR");

      let swap_action = SwapAction {
        pool_id,
        token_in,
        token_out,
        amount_in: Some(amount_in),
        min_amount_out
      };

      let mut actions = Vec::new();
      actions.push(swap_action);

      let promise = ext_amm_contract::ext(self.amm_contract.clone())
        .with_static_gas(Gas(150*TGAS))
        .with_attached_deposit(YOCTO_NEAR)
        .swap(actions);

      return promise.then( // Create a promise to callback query_greeting_callback
        Self::ext(env::current_account_id())
        .with_static_gas(Gas(100*TGAS))
        .external_call_callback()
      )
    }
  }
  ```
  </TabItem>
</Tabs>

---

## Additional Resources

1. [Claim Fungible Tokens from Lockup](https://near.org/near/widget/ComponentDetailsPage?src=whtt.near/widget/Draft-0) - the example how to claim locked tokens from the `lockup.burrow.near` contract.
2. [BSC Dex Collection](https://near.org/near/widget/ComponentDetailsPage?src=bluebiu.near/widget/Bsc.Swap.Dex) - the example of how to build simple swap page for a DEX.
