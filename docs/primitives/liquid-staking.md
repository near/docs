---
id: liquid-staking
title: Liquid Staking
description: "Learn about Liquid Staking on NEAR — a smart contract that issues a fungible token representing staked NEAR, enabling instant liquidity and validator diversification."
---

Liquid staking is a modern alternative to regular staking on NEAR that solves the problem of delayed withdrawing. In regular staking, you can't immediately withdraw funds from a staking pool - first, you need to request an unstake and then wait for 4 epochs (roughly 24-28 hours) before your funds become available for withdrawal.

And the liquid staking contract addresses this limitation by giving a flexible approach that keeps your assets liquid.

---

## Core Concepts

### Fungible Token (NEP-141)

At its core, the Liquid Staking Contract issues a token that follows the [Fungible Token (NEP-141)](https://github.com/near/NEPs/blob/master/neps/nep-0141.md) standard.

When you stake `NEAR`, you don’t just lock it away — you receive a liquid token (for example, `rNEAR`) that behaves like any other fungible token on the network. You can transfer it, swap it, or use it inside DeFi protocols exactly the same way you would with any other token.

And, because it’s fully NEP-141 compatible, this token integrates seamlessly with wallets, DEXs, and other smart contracts. That compatibility is what enables the early-exit mechanism — you can instantly convert your liquid token back to `NEAR` by swapping it on an exchange. The swap rate is determined by market supply and demand and usually sits slightly below the on-chain rate (roughly 0.5% lower), which represents the small cost of immediate liquidity.

Behind the scenes, the exchange rate of the liquid token is continuously adjusted based on rewards earned by validators.
It’s calculated as `exchange_rate = total_staked_near / total_liquid_token_supply`​ and as staking rewards accumulate each epoch, the total amount of staked `NEAR` grows, while the token supply changes only when users deposit or withdraw. That’s why the exchange rate, and therefore the token’s value, steadily increases over time, even if you hold the same balance.

#### Storage Deposit (NEP-145)

Because the liquid staking contract issues a [NEP-141 token](https://github.com/near/NEPs/blob/master/neps/nep-0141.md), it also implements the [Storage Management (NEP-145)](https://github.com/near/NEPs/blob/master/neps/nep-0145.md) standard.

Whenever you interact with the contract for the first time, for example, when you deposit `NEAR` and get liquid tokens in return, you need to attach a tiny storage deposit. This deposit covers the space your account information takes up in the contract’s storage. The good thing is that this money isn’t spent, it just stays reserved while you’re using the contract. And if you ever stop using it, you can get your deposit back by unregistering your account.

In short, it’s a way to make sure the contract doesn’t pay for users’ data out of its own balance, while still letting everyone safely recover their deposit whenever they leave.

### Staking Pool

The liquid staking contract also implements the staking pool interface, which defines a standard set of methods for staking, unstaking, and withdrawing. This means that from a developer’s perspective, interacting with a liquid staking contract feels almost identical to working with a regular staking pool. You can call familiar methods like `deposit_and_stake`, `unstake`, and `withdraw`, and they follow the same lifecycle — the only difference is that your stake is represented by a liquid token instead of being locked inside a single pool.

Behind the scenes, the contract delegates tokens across multiple validators, usually selected from the top-performing ones on the network. These validators are actively maintained and closely monitored, which makes them far less likely to experience downtime or performance issues. And because your stake is distributed among many of them, the risk of losing rewards due to a single validator going offline becomes extremely low.

It’s also worth noting that, since your stake is spread across several validators, the average reward rate will typically be slightly lower than if you delegated directly to a single, high-performing validator. But in return, you gain better security against validator outages and the ability to exchange your liquid token back to `NEAR` at any time without waiting through the unstaking delay. It’s a balanced trade-off between maximum yield and maximum flexibility.

---

## Deploying a Liquid Staking Contract

The Liquid Staking Contract can be deployed directly from the [repository](https://github.com/ref-finance/rnear-contract), which contains the implementation maintained by the Rhea.finance team. This contract follows the same principles described above and is already optimized for production use.

Before deployment, make sure the target account has at least 20.5 `NEAR` available on its balance. This amount covers the initial storage costs, the minimum staking liquidity required for initialization, and a small gas buffer.

```bash
# Clone the repository
git clone https://github.com/ref-finance/rnear-contract.git
cd rnear-contract/contracts/lst

## Create and fund the liquid staking account
near create-account <account-id> --useAccount <funding-account> --initialBalance <amount in yoctoNEAR>

# Build and deploy the liquid staking contract
cargo near deploy build-non-reproducible-wasm <account-id> with-init-call new json-args '{
    "metadata": {
        "decimals": 24,
        "name": "Test Liquid Near Staking Token",
        "spec": "ft-1.0.0",
        "symbol": "tNEAR"
    },
    "owner_id": "owner.near"
}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR'
```

### Setting Validator Whitelist Account

Before you can add validators, you first need to set the validator whitelist account. This account acts as a single source of truth for which validators are allowed to be used by the contract.

The validator whitelist account must implement the following interface that allows the contract to verify if a given validator is approved.

```rust
#[ext_contract(ext_whitelist)]
pub trait ExtWhitelist {
    fn is_whitelisted(&self, staking_pool_account_id: AccountId) -> bool;
}
```

To update the validator whitelist account, please run the following command:

```bash
near contract call-function as-transaction <account-id> set_whitelist_contract_id json-args '{
    "account_id": "whitelist_source.near"
}' prepaid-gas '30.0 Tgas' attached-deposit '1 yoctoNEAR'
```

### Adding Validators

After the whitelist account is in place, you can register a list of validators that the contract will delegate tokens to, along with their weights. Each weight defines a proportion of how much of the total stake should go to a particular validator compared to the others.

To add validators, please run the following comand:

```bash
near contract call-function as-transaction <account-id> add_validators json-args '{
    "validator_ids": ["validator1.pool.near", "validator2.pool.near", "validator3.pool.near"],
    "weights": [40, 35, 25]
}' prepaid-gas '30.0 Tgas' attached-deposit '1 yoctoNEAR'
```

---

## Token

In this section, we’ll go through a few of the most commonly used methods. To explore all available methods, please refer to the full definition of [NEP-141](https://github.com/near/NEPs/blob/master/neps/nep-0141.md).

### Storage Deposit

Before you can hold or receive any liquid tokens, your account needs to be registered in the contract’s storage. You only need to do this once, and the amount is fully refundable if you ever unregister your account.

To register the account, run the following command:

```bash
near contract call-function as-transaction <account-id> storage_deposit json-args '{
    "account_id":"<your-account-id>",
    "registration_only": true
}' prepaid-gas '30.0 Tgas' attached-deposit '0.00125 NEAR'
```

### Check Balance

To check how many liquid tokens (e.g., `tNEAR`) you own, run the following command:

```bash
near contract call-function as-read-only <account-id> ft_balance_of json-args '{"account_id": "<your-account-id>"}'
```

### Check Total Supply

To check the total supply of the liquid token (e.g., `tNEAR`), run the following command:

```bash
near contract call-function as-read-only <account-id> ft_total_supply json-args '{}'
```

### Transfer Tokens

To transfer tokens to another account directly, run the following command:

```bash
near contract call-function as-transaction <account-id> ft_transfer json-args '{
    "amount": "10000000000000000000000000",
    "receiver_id":"<another-account-id>"
}' prepaid-gas '30.0 Tgas' attached-deposit '1 yoctoNEAR'
```

### Check Token Price

While most methods follow the NEP-141 standard, the liquid staking contract also provides an additional helper method called `ft_price`. This method isn’t part of the standard itself — it’s implemented specifically for this contract to make it easier to check the current exchange rate between the liquid token and `NEAR`, since the price of the token is determined by the formula we discussed [here](#fungible-token-nep-141).

To query the current price, run the following command:

```bash
near contract call-function as-read-only <account-id> ft_price json-args '{}'
```

The returned number shows how much `yoctoNEAR` one unit of the liquid token is currently worth.

---

## Staking

Below are the most common commands you’ll use to interact with the staking flow.

### Deposit and Stake Tokens

To stake your `NEAR` and receive the liquid token, run the command:

```bash
near contract call-function as-transaction <account-id> deposit_and_stake json-args '{}' prepaid-gas '30.0 Tgas' attached-deposit '10 NEAR'
```

From that point, your tokens begin generating rewards through the underlying validators.

### Unstake

When you feel ready, simply request unstake with the following command. You will need to wait standard delay of 4 epochs (24-28 hours) for funds to become available for withdrawal.

```bash
near contract call-function as-transaction <account-id> unstake_all json-args '{}' prepaid-gas '30.0 Tgas' attached-deposit '0 NEAR'
```

:::tip
If you need your `NEAR` immediately, you don’t have to wait 4 epochs — you can simply swap your liquid tokens for `NEAR` on DEX like Rhea.finance.
:::

### Withdraw

As soon as 4 epochs have gone by, run the following command to withdraw `NEAR` tokens back.

```bash
near contract call-function as-transaction <account-id> withdraw_all json-args '{}' prepaid-gas '30.0 Tgas' attached-deposit '0 NEAR'
```

At this point, your liquid tokens will be burned, and you’ll receive the equivalent amount of `NEAR` based on the current exchange rate.

---

## Additional Resources

For more information, explore the official resources below:

- [Liquid Staking Contract Repository](https://github.com/ref-finance/rnear-contract)
- [NEAR CLI](https://github.com/near/near-cli-rs)
