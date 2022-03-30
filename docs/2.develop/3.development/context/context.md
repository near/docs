---
id: context
title: Context
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import MainAs from "./example/main.as.md";
import MainRs from "./example/main.rs.md";

Every method execution has a context associated. This is, when someone executes your method, you can have access to information such as:

1. Who called the method
2. How much money is attached to the call
3. How many computational resources are available
4. The current timestamp

---

## Snippet: All the Contextual Information

<Tabs className="language-tabs">
  <TabItem value="as" label="🚀 - Assemblyscript">
    <MainAs></MainAs>
  </TabItem>
  <TabItem value="rs" label="🦀 - Rust">
    <MainRs></MainRs>
  </TabItem>
</Tabs>

---

## Who is interacting with the contract?

The context has information on which user is calling your method, as well as your contract's account. This information is available to you through the `current_account`, `predecessor`, and `signer` parameters.

### Current Account
The `current_account` contains the address of your smart contract. This is very usefull to allow certain functions to only be called only by the contract itself such as [private callbacks](broken).

### Predecessor and Signer
The `predecessor` is the account that called the method in the contract. Meanwhile, the `signer` is the account that *signed* the first transaction that derived in such method call.

During a simple transaction (no [cross-contract calls](broken)) the `predecessor` is the same as the `signer`. For example, if **alice.near** calls **contract.near**, from the contract's perspective **alice.near** is both the `signer` and the `predecessor`. However, if **contract.near** creates a [cross-contract call](broken), then the `predecessor` changes down the line. In the example bellow, when **pool.near** executes it would see  **contract.near** as the `predecessor` and **alice.near** as the `signer`.

![img](https://miro.medium.com/max/1400/1*LquSNOoRyXpITQF9ugsDpQ.png)
*You can access information about the users interacting with your smart contract*

:::tip
In most scenarios you will **only need the predecessor**. However, there are situations in which the signer is very useful. For example, when adding [NFTs](broken) to [this marketplace](https://github.com/near-examples/nft-market/blob/main/contracts/market-simple/src/nft_callbacks.rs#L37) the contract checks that:
1. The `predecessor` is the `current_account`, i.e. the function is a [private callback](broken)
2. The `signer` is the NFT owner, i.e. the execution chain was originated by the owner of the NFT
:::

---

## Balances and Attached Money

---

## Telling the Time

---
## Computational Resources (Gas)

