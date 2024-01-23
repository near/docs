---
id: using-dex
title: Using DEX
hide_table_of_contents: false
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import BOSGetPrice from "./interacting/bos/get-price.md"
import BOSSwap from "./interacting/bos/swap.md"
import BOSGetPools from "./interacting/bos/get-pools.md"
import BOSGetDepositBalances from "./interacting/bos/get-deposit-balances.md"

import WebAppGetPrice from "./interacting/web-app/get-price.md"
import WebAppSwap from "./interacting/web-app/swap.md"
import WebAppGetPools from "./interacting/web-app/get-pools.md"
import WebAppGetDepositBalances from "./interacting/web-app/get-deposit-balances.md"

import CLISwap from "./interacting/near-cli/swap.md"
import CLIGetPools from "./interacting/near-cli/get-pools.md"
import CLIGetDepositBalances from "./interacting/near-cli/get-deposit-balances.md"

import SmartContractSwap from "./interacting/smart-contract/swap.md"
import SmartContractGetPools from "./interacting/smart-contract/get-pools.md"
import SmartContractGetDepositBalances from "./interacting/smart-contract/get-deposit-balances.md"

---

## Get token price

Here is how to obtain the price for different tokens in US dollars from different exchanges.

<Tabs groupId="code-tabs">
  <TabItem value="NEAR Component" label="NEAR Component" default>
    <BOSGetPrice />
  </TabItem>
  <TabItem value="Web App" label="Web App">
    <WebAppGetPrice />
  </TabItem>
</Tabs>

---

## Swap tokens

These snippets will enable your users to swap FTs.

<Tabs groupId="code-tabs">
  <TabItem value="NEAR Component" label="NEAR Component" default>
    <BOSSwap />
  </TabItem>
  <TabItem value="Web App" label="Web App">
    <WebAppSwap />
  </TabItem>
  <TabItem value="Near CLI" label="Near CLI">
    <CLISwap />
  </TabItem>
  <TabItem value="Smart Contract" label="Smart Contract">
    <SmartContractSwap />
  </TabItem>
</Tabs>

<hr class="subsection" />

### Get pools

In order to make swap you need to know `pool_id`. The pool index is its id.

Query available pools:

<Tabs groupId="code-tabs">
  <TabItem value="NEAR Component" label="NEAR Component" default>
    <BOSGetPools />
  </TabItem>
  <TabItem value="Web App" label="Web App">
    <WebAppGetPools />
  </TabItem>
  <TabItem value="Near CLI" label="Near CLI">
    <CLIGetPools />
  </TabItem>
  <TabItem value="Smart Contract" label="Smart Contract">
    <SmartContractGetPools />
  </TabItem>
</Tabs>

<hr class="subsection" />

### Get deposit balances

In order to make swap you need to have enough tokens in deposit on Ref Finance.

Query your deposit balances:

<Tabs groupId="code-tabs">
  <TabItem value="NEAR Component" label="NEAR Component" default>
    <BOSGetDepositBalances />
  </TabItem>
  <TabItem value="Web App" label="Web App">
    <WebAppGetDepositBalances />
  </TabItem>
  <TabItem value="Near CLI" label="Near CLI">
    <CLIGetDepositBalances />
  </TabItem>
  <TabItem value="Smart Contract" label="Smart Contract">
    <SmartContractGetDepositBalances />
  </TabItem>
</Tabs>

<hr class="subsection" />

### Deposit funds

See how to deposit funds on Ref Finance [here](../ft/using-fts#attaching-fts-to-a-call).

---

