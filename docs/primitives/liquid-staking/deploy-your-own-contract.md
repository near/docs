---
id: deploy-your-own-contract
title: Deploying Your Own Contract
description: "Learn how to deploy your own Liquid Staking Contract on NEAR"
---

At its core, the Liquid Staking Contract issues a token that follows the [Fungible Token (NEP-141)](https://github.com/near/NEPs/blob/master/neps/nep-0141.md) standard.

When you stake `NEAR`, you don’t just lock it away — you receive a liquid token (for example, `rNEAR`) that behaves like any other fungible token on the network. You can transfer it, swap it, or use it inside DeFi protocols exactly the same way you would with any other token.

And, because it’s fully NEP-141 compatible, this token integrates seamlessly with wallets, DEXs, and other smart contracts. That compatibility is what enables the early-exit mechanism — you can instantly convert your liquid token back to `NEAR` by swapping it on an exchange. The swap rate is determined by market supply and demand and usually sits slightly below the on-chain rate (roughly 0.5% lower), which represents the small cost of immediate liquidity.

Behind the scenes, the exchange rate of the liquid token is continuously adjusted based on rewards earned by validators.
It’s calculated as `exchange_rate = total_staked_near / total_liquid_token_supply`​ and as staking rewards accumulate each epoch, the total amount of staked `NEAR` grows, while the token supply changes only when users deposit or withdraw. That’s why the exchange rate, and therefore the token’s value, steadily increases over time, even if you hold the same balance.

---

## Storage Deposit (NEP-145)

Because the liquid staking contract issues a [NEP-141 token](https://github.com/near/NEPs/blob/master/neps/nep-0141.md), it also implements the [Storage Management (NEP-145)](https://github.com/near/NEPs/blob/master/neps/nep-0145.md) standard.

Whenever you interact with the contract for the first time, for example, when you deposit `NEAR` and get liquid tokens in return, you need to attach a tiny storage deposit. This deposit covers the space your account information takes up in the contract’s storage. The good thing is that this money isn’t spent, it just stays reserved while you’re using the contract. And if you ever stop using it, you can get your deposit back by unregistering your account.

In short, it’s a way to make sure the contract doesn’t pay for users’ data out of its own balance, while still letting everyone safely recover their deposit whenever they leave.

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

<hr class="subsection" />

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

<hr class="subsection" />

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

<hr class="subsection" />

### Storage Deposit

Before you can hold or receive any liquid tokens, your account needs to be registered in the contract’s storage. You only need to do this once, and the amount is fully refundable if you ever unregister your account.

To register the account, run the following command:

```bash
near contract call-function as-transaction <account-id> storage_deposit json-args '{
    "account_id":"<your-account-id>",
    "registration_only": true
}' prepaid-gas '30.0 Tgas' attached-deposit '0.00125 NEAR'
```

<hr class="subsection" />

### Check Balance

To check how many liquid tokens (e.g., `tNEAR`) you own, run the following command:

```bash
near contract call-function as-read-only <account-id> ft_balance_of json-args '{"account_id": "<your-account-id>"}'
```

<hr class="subsection" />

### Check Total Supply

To check the total supply of the liquid token (e.g., `tNEAR`), run the following command:

```bash
near contract call-function as-read-only <account-id> ft_total_supply json-args '{}'
```

<hr class="subsection" />

### Transfer Tokens

To transfer tokens to another account directly, run the following command:

```bash
near contract call-function as-transaction <account-id> ft_transfer json-args '{
    "amount": "10000000000000000000000000",
    "receiver_id":"<another-account-id>"
}' prepaid-gas '30.0 Tgas' attached-deposit '1 yoctoNEAR'
```

<hr class="subsection" />

### Check Token Price

While most methods follow the NEP-141 standard, the liquid staking contract also provides an additional helper method called `ft_price`. This method isn’t part of the standard itself — it’s implemented specifically for this contract to make it easier to check the current exchange rate between the liquid token and `NEAR`, since the price of the token is determined by the formula: `exchange_rate = total_staked_near / total_liquid_token_supply`

To query the current price, run the following command:

```bash
near contract call-function as-read-only <account-id> ft_price json-args '{}'
```

The returned number shows how much `yoctoNEAR` one unit of the liquid token is currently worth.

---

## Additional Resources

For more information, explore the official resources below:

- [Liquid Staking Contract Repository](https://github.com/ref-finance/rnear-contract)
- [NEAR CLI](https://github.com/near/near-cli-rs)
