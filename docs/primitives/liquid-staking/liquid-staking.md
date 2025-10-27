---
id: liquid-staking
title: Using Liquid Staking
description: "Learn about Liquid Staking on NEAR — a smart contract that issues a fungible token representing staked NEAR, enabling instant liquidity and validator diversification."
---

Liquid staking is a modern alternative to regular staking on NEAR that solves the problem of delayed withdrawing. In regular staking, you can't immediately withdraw funds from a staking pool - first, you need to request an unstake and then wait for 4 epochs (roughly 24-28 hours) before your funds become available for withdrawal.

And the liquid staking contract addresses this limitation by giving a flexible approach that keeps your assets liquid.

:::tip

Are you looking to delegate NEAR Tokens to a  **liquid staking provider**? Check out the [Metapool](https://www.metapool.app/es/stake?token=near), [Rhea Finance](https://app.rhea.finance/stake)

:::

---

## Staking Pool

The liquid staking contract implements a staking pool interface. From a developer’s perspective, interacting with a liquid staking contract feels almost identical to working with a regular staking pool.

You can call familiar methods like `deposit_and_stake`, `unstake`, and `withdraw`, and they follow the same lifecycle - the only difference is that your stake is represented by a liquid token instead of being locked inside a single pool.

Behind the scenes, the contract delegates tokens across multiple validators, usually selected from the top-performing ones on the network. These validators are actively maintained and closely monitored, which makes them far less likely to experience downtime or performance issues. And because your stake is distributed among many of them, the risk of losing rewards due to a single validator going offline becomes extremely low.

It’s also worth noting that, since your stake is spread across several validators, the average reward rate will typically be slightly lower than if you delegated directly to a single, high-performing validator. But in return, you gain better security against validator outages and the ability to exchange your liquid token back to `NEAR` at any time without waiting through the unstaking delay. It’s a balanced trade-off between maximum yield and maximum flexibility.

---

## Using Liquid Staking

Below are the most common commands you’ll use to interact with the staking flow, alongside with the contracts for major liquid staking providers on NEAR.

| Provider     | Testnet Account           | Mainnet Account        |
|--------------|---------------------------|------------------------|
| Metapool     | `meta-v2.pool.testnet`    | `meta-pool.near`       |
| Rhea Finance |                           | `lst.rhealab.near`     |
| Linear       | `linear-protocol.testnet` | `linear-protocol.near` |

<hr class="subsection" />

### Deposit and Stake Tokens

To stake your `NEAR` and receive the liquid token, run the command:

```bash
near contract call-function as-transaction <account-id> deposit_and_stake json-args '{}' prepaid-gas '30.0 Tgas' attached-deposit '10 NEAR'
```

From that point, your tokens begin generating rewards through the underlying validators.

<hr class="subsection" />

### Unstake

When you feel ready, simply request unstake with the following command. You will need to wait standard delay of 4 epochs (24-28 hours) for funds to become available for withdrawal.

```bash
near contract call-function as-transaction <account-id> unstake_all json-args '{}' prepaid-gas '30.0 Tgas' attached-deposit '0 NEAR'
```

:::tip
If you need your `NEAR` immediately, you don’t have to wait 4 epochs — you can simply swap your liquid tokens for `NEAR` on DEX like Rhea.finance.
:::

<hr class="subsection" />

### Withdraw

As soon as 4 epochs have gone by, run the following command to withdraw `NEAR` tokens back.

```bash
near contract call-function as-transaction <account-id> withdraw_all json-args '{}' prepaid-gas '30.0 Tgas' attached-deposit '0 NEAR'
```

At this point, your liquid tokens will be burned, and you’ll receive the equivalent amount of `NEAR` based on the current exchange rate.
