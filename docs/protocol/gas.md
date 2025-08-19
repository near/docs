---
id: gas
title: Gas (Execution Fees)
description: "Learn about NEAR's gas system - execution fees that prevent spam, incentivize developers with 30% of burned gas, and use deterministic gas units with dynamic pricing."
---

import { Gas } from '@site/src/components/widgets/gas';

This section explains how gas works in the NEAR Protocol, including how it is calculated, charged, and used to incentivize developers.

On every transaction the NEAR network charges a tiny fee known as **gas**. This fee is a simple mechanism that allows us to:

1. **Prevent** bad actors from **spamming** the network with useless transactions
2. **Burn** a minuscule fraction of the **token supply** on each transaction
3. **Incentivize developers** by giving contracts 30% of the gas they burn while executing
4. Implement a **wall time** by capping transactions to `300Tgas` (~`300ms` of compute time)

Gas in NEAR is computed on [**gas units**](/protocol/gas#gas-units) and charged using $NEAR tokens based on the network's [**gas price**](/protocol/gas#gas-price).

:::tip Did you know?
In NEAR, attaching extra gas to a transaction does **not** make it faster. Actions cost a fixed amount of gas, and any extra gas attached is simply sent back to the user
:::

---

## Understanding Gas Fees
For every transaction, users get charged a small $NEAR fee which has to be paid **upfront**. This fee is calculated using deterministic **gas units**, and transformed into a cost in $NEAR using the network's **gas price**.

<hr class="subsection" />

### Gas Units
Every action in NEAR costs a fixed amount of **gas units**, meaning that the same operation will always cost the **same amount of gas units**.

Gas units were engineered in such a way that they can be translated into compute resources, where `1Tgas` gets you approx. `1ms` of compute time.

Transactions can use a maximum of `300Tgas`, meaning they should be processed in less than `300ms`, allowing the network to produce a new block approximately **every second**.

:::tip
Gas units encapsulate not only compute/CPU time but also bandwidth/network time and storage/IO time
:::

<hr class="subsection" />

### Gas Price
To determine the actual $NEAR fee, the cost of all actions in the transaction is multiplied by a **gas price**.

The gas price is **recalculated each block** based on the network's demand and floor at `1Tgas = 0.0001Ⓝ`.

If the previous block is **more than half full** the price goes up by 1%, otherwise it goes down by 1% (until it reaches the floor).

<details>

<summary> What is the gas price now? </summary>

You can query how much a gas unit costs in `yoctoNEAR` (1Ⓝ = `1e24` yocto) through the [`RPC`](/api/rpc/gas#gas-price). To convert in `Tgas` per `NEAR`, you can use the following formula: `gas_price * 1e12 / 1e24`.

Right now, 1 Tgas costs: <Gas /> Ⓝ

</details>

<hr class="subsection" />

### Cost for Common Actions

Knowing that actions have a fixed cost in gas units, we can calculate the cost of common operations at the minimum gas price of `1Tgas = 0.0001Ⓝ`.

| Action                       | TGas           | Fee (Ⓝ)  |
|------------------------------|----------------|----------|
| Create Account               | 0.42           | 0.000042 |
| Transfer NEAR                | 0.45           | 0.000045 |
| Add Full Access Key          | 0.42           | 0.000042 |
| Delete Key                   | 0.41           | 0.000041 |
| Function Call*               | ≤ 300          | ≤ 0.03   |
| Deploying a `16`kb contract  | 2.65           | 0.000265 |
| Deploying a `X`kb contract** | 0.58 + 0.13`X` |          |


_Note that the fee is in $NEAR, to obtain the cost in dollars multiply by the current price of $NEAR_

:::tip Function Calls*
The cost of calling a function will depend on how complex the function is, but will be consistent across function calls. Learn more below.
:::

:::tip Deploying a Contract**
Note that this covers the gas cost of uploading and writing bytes to storage, but does **not** cover the cost of holding them in storage (which is `1Ⓝ ~ 100kb`).
:::

<details className="info">
<summary>Where do these numbers come from?</summary>

NEAR is [configured](https://github.com/near/nearcore/blob/master/core/primitives/res/runtime_configs/parameters.yaml) with base costs. An example:

```json
  transfer_cost: {
    send_sir:     115123062500,
    send_not_sir: 115123062500,
    execution:    115123062500
  },
  deploy_contract_cost: 184765750000,
  deploy_contract_cost_per_byte: 64572944
```

The "sir" here stands for "sender is receiver". Yes, these are all identical, but that could change in the future.

When you make a request to transfer funds, NEAR immediately deducts the appropriate `send` amount from your account. Then it creates a [_receipt_, an internal book-keeping mechanism](./transaction-execution.md). Creating a receipt has its own associated costs:

```json
  action_receipt_creation_config: {
    send_sir:     108059500000,
    send_not_sir: 108059500000,
    execution:    108059500000
  }
```

You can query this value by using the [`protocol_config`](/api/rpc/protocol#protocol-config) RPC endpoint and search for `action_receipt_creation_config`.

The appropriate amount for creating this receipt is also immediately deducted from your account.

The "transfer" action won't be finalized until the next block. At this point, the `execution` amount for each of these actions will be deducted from your account.

Although gas prices can change between the time of purchase and time of execution, the gas price per transaction is fixed since protocol version 78. 

```
    (
      transfer_cost.send_not_sir + action_receipt_creation_config.send_not_sir + transfer_cost.execution + action_receipt_creation_config.execution
    ) * gas_price
```

Prior to protocol version 78, the gas prices of each block was used for the work done at that height. 

```
    (
      transfer_cost.send_not_sir + action_receipt_creation_config.send_not_sir 
    ) * gas_price_at_block_1 +
    (
      transfer_cost.execution + action_receipt_creation_config.execution
    ) * gas_price_at_block_2
```
</details>

---

## How Do I Buy Gas?

You don't buy gas, instead, the gas fee is automatically removed from your account's balance when the transaction [is first processed](./transaction-execution.md#block-1-the-transaction-arrives) based on the action's gas cost and the network's gas price.

The only exception to this rule is when you make a function call to a contract. In this case, you need to define how many gas units to use, up to a maximum value of `300Tgas`. This amount will be converted to $NEAR using the network's gas price and deducted from your account's balance.

If the transaction ends up using less gas than the amount deducted, the difference will simply be **refunded to your account**. However, the network subtracts a **gas refund fee** of at leat 1 Tgas or up to 5% of the unspent gas.

<details>

<summary> Gas Refund Fee </summary>

Since protocol version 78, the unspent gas at the end of receipt execution is subject to a gas refund fee. The fee is still at 0 while we give projects time to adapt. The plan is to move to a fee calculated as `max(1 Tgas, 0.05 * unspent_gas) * gas_price`. The gas price is from the time of purchase.

_But why introducing such a fee instead of refunding all gas?_

The reason is that attaching too much gas to function calls makes the network less efficient.

Congestion control between shards gets tricky when transactions have much more gas attached than they actually use. The network limits how many cross contract calls can target a single shard per chunk, to avoid huge queues of incoming receipts on a shard. This limit sees the attached gas as an upper boundary for how much work the receipt causes on the receiving shard. Attaching too much gas can cause this limit to become too restrictive, which stalls shards unnecessarily.

The other inefficiency comes from the refund receipts that prior to version 78 have been created for essentially every function call. While each of them is relatively cheap to execute, in the sum they were a significant part of the global traffic on NEAR Protocol.

To read more about the deicsion to introduce this fee, please take a look at the [NEP-536](https://github.com/near/NEPs/pull/536)

</details>

:::tip
In other chains, paying a higher gas price gets your transaction processed faster. In NEAR, **gas costs are deterministic**, and you **can't pay to get priority**. Any extra gas attached to a transaction is refunded, minus some fee for attaching unnecessary gas.
:::

---

## Gas as a Developer Incentive

In NEAR, 30% of the gas fees burned while executing a contract go to the contract's account. This is a powerful incentive for developers to create and maintain useful contracts.

For example, in [this transaction](https://testnet.nearblocks.io/txns/JD8Bg4u8kaYeaSsGBqkvhSDCEPgXhtwJRBBPKicCEPMs) the user calls a function in the `guestbook.near-examples.testnet` contract.

Executing the function call burned a total of ~0.00032Ⓝ, from which 30% went to the contract's account. This means that the contract's account received 0.000096Ⓝ.

Notice that the fee comes from the gas burned during the function execution, and not from the total gas used.

---

## Estimating Costs for a Call

If you're developing a smart contract, you might want to estimate how much gas a function call will consume. This is useful to estimate limits for your function and avoid running into out-of-gas errors.

One of the most accurate ways to estimate gas costs is by running your function in `testnet`. To know exactly how much gas a specific part of your function uses, you can use the `used_gas` method from our SDK.

Another option is to use `Sandbox Testing` (available in [Rust](https://github.com/near/workspaces-rs/tree/main/examples/src) and [JavaScript](https://github.com/near/workspaces-js)), which simulates the NEAR network. There you can access the gas burnt after each function call.
