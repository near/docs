---
id: dex
title: Decentralized Exchanges (DEX)
hide_table_of_contents: false
---

import {FeatureList, Column, Feature} from "@site/src/components/featurelist"

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import BOSGetPrice from "./dex/bos/get-price.md"
import BOSSwap from "./dex/bos/swap.md"
import BOSGetPools from "./dex/bos/get-pools.md"
import BOSGetDepositBalances from "./dex/bos/get-deposit-balances.md"

import WebAppGetPrice from "./dex/web-app/get-price.md"
import WebAppSwap from "./dex/web-app/swap.md"
import WebAppGetPools from "./dex/web-app/get-pools.md"
import WebAppGetDepositBalances from "./dex/web-app/get-deposit-balances.md"

import CLISwap from "./dex/near-cli/swap.md"
import CLIGetPools from "./dex/near-cli/get-pools.md"
import CLIGetDepositBalances from "./dex/near-cli/get-deposit-balances.md"

import SmartContractSwap from "./dex/smart-contract/swap.md"
import SmartContractGetPools from "./dex/smart-contract/get-pools.md"
import SmartContractGetDepositBalances from "./dex/smart-contract/get-deposit-balances.md"

A Decentralized Exchange (DEX) is an application that allows users to trade tokens (native & fungible tokens) through smart contracts.

![dex](/docs/primitives/dex.png)

In brief, DEXs work by having [pools of token pairs](https://guide.ref.finance/products/overview/pooling) (e.g. NEAR-USDC) that users can deposit tokens into.

The ratio of the tokens in the pool determines the exchange rate for a swap. Indeed, swapping is adding tokens to one side of the pool while removing tokens from the other side of the pool.

:::info

This docs refer to [Ref Finance](https://www.ref.finance/), a community built DEX in NEAR.

Please check their [docs](https://guide.ref.finance/developers-1/cli-trading) for more information.

:::

---

## Query Token Exchange Rate
One can query the exchange rate of a token pair by calling the `get-token-price` method on the DEX contract.

<Tabs groupId="code-tabs">
  <TabItem value="⚛️ Component" label="⚛️ Component" default>
    <BOSGetPrice />
  </TabItem>
  <TabItem value="🌐 WebApp" label="🌐 WebApp">
    <WebAppGetPrice />
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

</TabItem>

</Tabs>

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

---

## Register in the DEX
In order to use the contract, make sure to register your account in the DEX by paying for the storage you will use in order to keep track of your balances.

<Tabs groupId="code-tabs">
  <TabItem value="🖥️ CLI" label="🖥️ CLI">
    
```bash
near call v2.ref-finance.near storage_deposit '' --accountId <account> --amount 0.1
```

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

</Tabs>

:::danger

Do **NOT** transfer **NEAR** tokens to Ref Finance. Instead, call `near_deposit` in the [`wrap.near`](https://nearblocks.io/address/wrap.near) contract, attaching the amount of NEAR you want to swap.

This will mint `wrap.near` for you, which you can then transfer to Ref Finance.

:::

---

## Get Deposit Balances

Query your deposit balances by calling the `get_deposits` method:

<Tabs groupId="code-tabs">
  <TabItem value="⚛️ Component" label="⚛️ Component" default>
    <BOSGetDepositBalances />
  </TabItem>
  <TabItem value="🌐 WebApp" label="🌐 WebApp">
    <WebAppGetDepositBalances />
  </TabItem>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">
    <CLIGetDepositBalances />
  </TabItem>
  <TabItem value="📄 Contract" label="📄 Contract">
    <SmartContractGetDepositBalances />
  </TabItem>
</Tabs>

---

### Query Pools

DEXs work by having multiple pools of token pairs (e.g. NEAR-USDC) that users can deposit tokens into.

<Tabs groupId="code-tabs">
  <TabItem value="⚛️ Component" label="⚛️ Component" default>
    <BOSGetPools />
  </TabItem>
  <TabItem value="🌐 WebApp" label="🌐 WebApp">
    <WebAppGetPools />
  </TabItem>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">
    <CLIGetPools />
  </TabItem>
  <TabItem value="📄 Contract" label="📄 Contract">
    <SmartContractGetPools />
  </TabItem>
</Tabs>

---

## Swap tokens
In order to swap a token for another, you need to [have funds](#deposit-funds), and there needs to [**exist a pool**](#query-pools) that has **both tokens** on it.

<Tabs groupId="code-tabs">
  <TabItem value="⚛️ Component" label="⚛️ Component" default>
    <BOSSwap />
  </TabItem>
  <TabItem value="🌐 WebApp" label="🌐 WebApp">
    <WebAppSwap />
  </TabItem>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">
    <CLISwap />
  </TabItem>
  <TabItem value="📄 Contract" label="📄 Contract">
    <SmartContractSwap />
  </TabItem>
</Tabs>

---

## Additional Resources

1. [Claim Fungible Tokens from Lockup](https://near.org/near/widget/ComponentDetailsPage?src=whtt.near/widget/Draft-0) - the example how to claim locked tokens from the `lockup.burrow.near` contract.
2. [BSC Dex Collection](https://near.org/near/widget/ComponentDetailsPage?src=bluebiu.near/widget/Bsc.Swap.Dex) - the example of how to build simple swap page for a DEX.
