---
id: actions
title: Actions
sidebar_label: ♟️ Actions
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Smart contracts can trigger a variety of actions on the blockchain such as:

1. Transfer NEAR tokens to another account
2. Deploy smart contracts on other accounts

## Transferring NEAR Ⓝ

You can send NEAR tokens from the Balance of your contract. Assuming your method finished correctly, transfers will always succeed.

<Tabs className="language-tabs">
  <TabItem value="as" label="🚀 - AssemblyScript">

  ```ts
    import { ContractPromiseBatch, u128 } from "near-sdk-as"

    function transfer(to: string, amount: u128){
      ContractPromiseBatch.create(to).transfer(amount)
    }
  ```

  </TabItem>
  <TabItem value="rs" label="🦀 - Rust">

  ```rust
    use near-sdk::{ContractPromiseBatch, AccountId}

    fn transfer(to: AccountId, amount: u128){
      ContractPromiseBatch::create(to)::transfer(amount)
    }
  ```

  </TabItem>
</Tabs>

:::caution
Make sure you don't drain your balance to cover for storage
:::

---

:::warning
We have not finished migrating the [Actions Page](https://nomicon.io/RuntimeSpec/Actions)
:::