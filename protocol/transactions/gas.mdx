---
title: Gas (Execution Fees)
description: "Learn about NEAR's gas system - execution fees that prevent spam, incentivize developers with 30% of burned gas, and use deterministic gas units with dynamic pricing."
---

import { GasPrice } from '/snippets/gas-price.jsx';

This section explains how gas works in the NEAR Protocol, including how it is calculated, charged, and used to incentivize developers.

On every transaction the NEAR network charges a tiny fee known as **gas**. This fee is a simple mechanism that allows us to:

1. **Prevent** bad actors from **spamming** the network with useless transactions
2. **Burn** a minuscule fraction of the **token supply** on each transaction
3. **Incentivize developers** by giving contracts 30% of the gas they burn while executing
4. Implement a **wall time** by capping how much gas each chunk can burn to `1000Tgas` (~`1000ms` of compute time)

Gas in NEAR is computed on [**gas units**](/protocol/transactions/gas#gas-units) and charged using `$NEAR` tokens based on the network's [**gas price**](/protocol/transactions/gas#gas-price).

<Tip>
**Did you know?**
In NEAR, attaching extra gas to a transaction does **not** make it faster. Actions cost a fixed amount of gas, and any extra gas attached is simply sent back to the user
</Tip>

---

## Understanding Gas Fees

For every transaction, users get charged a small NEAR fee which has to be paid **upfront**. This fee is calculated using deterministic **gas units**, and transformed into a cost in NEAR using the network's **gas price**.

### Gas Units

Every action in NEAR costs a fixed amount of **gas units**, meaning that the same operation will always cost the **same amount of gas units**.

Gas units were engineered in such a way that they can be translated into compute resources, where `1Tgas` gets you approx. `1ms` of compute time.

Each chunk can burn at most `1000Tgas`, i.e. about `1000ms` of compute, which is what allows the network to produce a new block approximately **every second**.

A single transaction can also attach at most `1000Tgas`. It may spend that gas in one receipt or spread it over the receipts it spawns across several blocks.

<Tip>
Gas units encapsulate not only compute/CPU time but also bandwidth/network time and storage/IO time
</Tip>

### Gas Price

To determine the actual NEAR fee, the cost of all actions in the transaction is multiplied by a **gas price**.

The gas price is **recalculated each block** based on the network's demand and floor at `1Tgas = 0.0001Ⓝ`.

If the previous block is **more than half full** the price goes up by 1%, otherwise it goes down by 1% (until it reaches the floor).

<Accordion title="What is the gas price now?">

You can query how much a gas unit costs in `yoctoNEAR` (1Ⓝ = `1e24` yocto) through the [`RPC`](/api/rpc/gas#gas-price). To convert in `Tgas` per `NEAR`, you can use the following formula: `gas_price * 1e12 / 1e24`.

Right now, 1 Tgas costs: <GasPrice /> Ⓝ

</Accordion>

### Buying vs. Burning Gas

Gas is **bought** at one price and **burned** at another. There's `min_gas_purchase_price = 0.001Ⓝ per Tgas`.

- **Buy price**: `max(current_gas_price, min_gas_purchase_price)`. This is what is deducted from your account upfront for the gas attached to the transaction
- **Burn price**: `min(buy_price, current_gas_price)` - This is what the gas actually costs while executing. The gas price at the moment of execution, but never higher than the buy price.

You buy gas at a price that can be higher than the price it burns at, and **the difference is always refunded to you**. The cost of a transaction is therefore the same as if there were a single price - you just need the larger amount in your account at the moment you send it.

<Tip>
At the minimum gas price (`0.0001Ⓝ` per `Tgas`), buying `100Tgas` deducts `0.1Ⓝ` from your balance. If the transaction burns `50Tgas`, you get `0.095Ⓝ` back: `0.05Ⓝ` for the gas you didn't use, and `0.045Ⓝ` for the price difference on the gas you did. You paid `0.005Ⓝ`, exactly what those `50Tgas` are worth at the gas price.
</Tip>

The point of buying above the burn price is that it leaves the protocol a refund it can charge from **after** it has seen what a transaction actually did. That is how [creating an account](#creating-an-account) is priced.

### Cost for Common Actions

Knowing that actions have a fixed cost in gas units, we can calculate the cost of common operations at the minimum gas price of `1Tgas = 0.0001Ⓝ`.

| Action                       | TGas           | Fee (Ⓝ)  |
|------------------------------|----------------|----------|
| Create Account***            | 7.92           | 0.00707  |
| Transfer NEAR                | 0.45           | 0.000045 |
| Add Full Access Key          | 0.42           | 0.000042 |
| Delete Key                   | 0.41           | 0.000041 |
| Function Call*               | ≤ 1000         | ≤ 0.1    |
| Deploying a `16`kb contract  | 2.65           | 0.000265 |
| Deploying a `X`kb contract** | 0.58 + 0.13`X` |          |

_Note that the fee is in NEAR, to obtain the cost in dollars multiply by the current price of `$NEAR`_

<Tip>
**Function Calls\***
The cost of calling a function will depend on how complex the function is, but will be consistent across function calls. Learn more below.
</Tip>

<Tip>
**Deploying a Contract\*\***
Note that this covers the gas cost of uploading and writing bytes to storage, but does **not** cover the cost of holding them in storage (which is `1Ⓝ ~ 100kb`).
</Tip>

<Tip>
**Creating an Account\*\*\***
Most of this fee is not gas: creating an account costs a fixed `0.007Ⓝ` that pays for the state the account permanently occupies. See [below](#creating-an-account).
</Tip>

<Accordion title="Where do these numbers come from?">

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

When you make a request to transfer funds, NEAR immediately deducts the appropriate `send` amount from your account. Then it creates a [_receipt_, an internal book-keeping mechanism](./transaction-execution). Creating a receipt has its own associated costs:

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

Gas prices can change between the time of purchase and the time of execution, but a transaction is not affected by that. The `execution` part is bought at the [buy price](#buying-vs-burning-gas) and burned at `gas_price`, with the difference refunded, so what you end up paying is:

```text
    (
      transfer_cost.send_not_sir + action_receipt_creation_config.send_not_sir + transfer_cost.execution + action_receipt_creation_config.execution
    ) * gas_price
```

</Accordion>

### Creating an Account

Creating an account costs a **fixed `0.007Ⓝ`**, which is burned.

This is not a gas fee. The protocol charges it by **making the refund smaller**: when a receipt creates an account, it keeps back enough of the [price difference refund](#buying-vs-burning-gas) to bring the total cost of the creation up to `0.007Ⓝ`. You don't pay an extra fee, you simply get less back.

If the gas burned while creating the account is already worth more than `0.007Ⓝ` - which happens when the network's gas price is high - nothing is kept back and you just pay the gas.

The charge applies however the account is created: a `CreateAccount` action, a transfer to a [not-yet-existing implicit account](/protocol/accounts-contracts/account-id#implicit-address), a `DeterministicStateInit` action, or a contract creating a sub-account.

<Note>
**Why does creating an account cost extra?**

Every account occupies state that the nodes running its shard have to keep forever. An account can occupy up to `770` bytes without a [storage deposit](/protocol/storage/storage-staking), and at the storage price of `1Ⓝ` per `100kb` that space is worth about `0.0077Ⓝ`. The charge makes sure that space is paid for. It lands slightly below `0.0077Ⓝ` because the protocol can only hold back as much as the price difference on the gas burned while creating the account.
</Note>

---

## How Do I Buy Gas?

You don't buy gas, instead, the gas fee is automatically removed from your account's balance when the transaction [is first processed](./transaction-execution#block-1-the-transaction-arrives) based on the action's gas cost and the [buy price](#buying-vs-burning-gas).

<Note>
Transactions signed with a [gas key](/protocol/accounts-contracts/access-keys#gas-keys) instead pay their gas fee from the key's own prepaid balance, and gas refunds return to the key.
</Note>

The only exception to this rule is when you make a function call to a contract. In this case, you need to define how many gas units to use, up to a maximum value of `1000Tgas`. This amount will be converted to NEAR using the [buy price](#buying-vs-burning-gas) and deducted from your account's balance.

Anything you overpaid is **refunded to your account** one block later. This covers both the gas you attached but did not use, and the difference between the buy price and the burn price. Because of that second part, **almost every transaction gets a refund**, even one that attached exactly the right amount of gas.

<Accordion title="Gas Refund Fee">

Since protocol version 78, the unspent gas at the end of receipt execution is subject to a gas refund fee. The fee is still at 0 while we give projects time to adapt. The plan is to move to a fee calculated as `max(1 Tgas, 0.05 * unspent_gas) * gas_price`. The gas price used is the burn price.

_But why introducing such a fee instead of refunding all gas?_

The reason is that attaching too much gas to function calls makes the network less efficient.

Congestion control between shards gets tricky when transactions have much more gas attached than they actually use. The network limits how many cross contract calls can target a single shard per chunk, to avoid huge queues of incoming receipts on a shard. This limit sees the attached gas as an upper boundary for how much work the receipt causes on the receiving shard. Attaching too much gas can cause this limit to become too restrictive, which stalls shards unnecessarily.

The other inefficiency comes from the refund receipts that are created for essentially every function call. While each of them is relatively cheap to execute, in the sum they are a significant part of the global traffic on NEAR Protocol. Note that a refund receipt is needed for essentially every function call anyway, to return the price difference, so the fee only helps with congestion control.

</Accordion>

<Tip>
In other chains, paying a higher gas price gets your transaction processed faster. In NEAR, **gas costs are deterministic**, and you **can't pay to get priority**. Any extra gas attached to a transaction is refunded, minus some fee for attaching unnecessary gas.
</Tip>

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
