---
id: staking
title: Validator Staking
sidebar_label: Staking
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

The NEAR blockchain uses a Proof-of-Stake (PoS) consensus mechanism, where participants (validators) secure the network by staking NEAR tokens. Users who don't want to run a validator node can still participate by delegating their tokens to a staking pool.

In this article you'll find a detailed explanation of the staking process, including delegating, viewing balances, and withdrawing using the [NEAR CLI](../../4.tools/cli.md).

:::note Contract source code
You can review the Staking pool smart contract source code in [this GitHub repository](https://github.com/near/core-contracts/tree/master/staking-pool).
:::

## Staking overview

When you stake your NEAR tokens, you help secure the network and participate in the consensus process.
Delegating your tokens means you are entrusting them to a validator, who will stake them on your behalf. You earn rewards based on the performance of the validator.

:::info Staking concepts

- **Staking**: Locking up NEAR tokens to support the network's security and operations.
- **Validators**: Nodes that validate transactions and produce blocks. They must stake a minimum amount of NEAR to participate.
- **Delegators**: Users who delegate their NEAR tokens to validators to earn rewards without running a node themselves.
- **Staking Pool**: A smart contract that aggregates delegated tokens and distributes rewards.

:::


## How delegating works

When you delegate NEAR tokens to a staking pool:
- Your tokens are locked in the pool and used to support a validator.
- You earn staking rewards proportional to your stake.
- The validator takes a commission (a percentage of the rewards) for their services.

:::tip Key Considerations

- **Rewards**: Staking rewards are distributed at the end of each epoch and depend on the total stake in the network and the validator's performance.
- **Commission**: Validators charge a commission on rewards, so choose one with a fair rate.
- **Liquidity**: Staked tokens are locked and cannot be transferred until unstaked and withdrawn.
- **Validator Performance**: If a validator underperforms (e.g., goes offline), they may be slashed, reducing your rewards.

:::

## Delegating NEAR tokens

Before delegating, you need to choose a validator (a node that participates in staking). You can find a list of validators on [NearBlocks](https://nearblocks.io/node-explorer) Node explorer or through various blockchain explorers like [Pikespeak](https://pikespeak.ai/validators/overview) and [Near Staking](https://near-staking.com/).

Once you select a validator and the stake transaction is confirmed, your tokens are delegated to the staking pool.
You will start earning staking rewards after the next epoch (approximately 12 hours).

### Selecting a Staking Pool

Use [NearBlocks](https://nearblocks.io/node-explorer), [Pikespeak](https://pikespeak.ai/validators/overview) or [Near Staking](https://near-staking.com/) to find a validator and their staking pool.
Look for validators with a good track record, uptime, and reasonable commission rates.

:::tip Validator selection tips

- **Validator Selection**: It's wise to research validators based on their performance, fees, and community reputation before making a selection.
- **Regular Monitoring**: Keep an eye on the validator’s performance; continuously delegating to a poorly performing validator can affect your staking rewards.
- **Fees**: Be aware that validators may charge fees from the rewards earned.

:::

### Staking using CLI

Once you have chosen a validator you want to delegate your tokens to, follow these steps to stake them using the NEAR CLI:

1. Connect your wallet to the CLI and ensure you have NEAR tokens to delegate.

```sh
near login
```

2. Deposit tokens to the `<my_validator>` staking pool:

```sh
near call <my_validator> deposit '{}' --accountId <user-account.near> --amount 100
```

3. Stake the deposited tokens by calling the `stake` method:

```sh
near call <my_validator> stake '{"amount": "100000000000000000000000000"}' --accountId <user-account.near>
```

4. Confirm Delegation:

Once the transaction is confirmed, your tokens are delegated to the staking pool.

```sh
near view <my_validator> get_account_staked_balance '{"account_id": "<user-account.near>"}'
```

:::info Using a wallet to check your staked tokens

You can see your staked balance, rewards earned, and the validator you delegated to using a web3 wallet. For example, you can try `https://app.mynearwallet.com/profile/<user-account.near>`.

:::

## Viewing staked balances and rewards

After delegating, you can view your staked tokens and accrued rewards.
The rewards are typically distributed periodically, and you will be able to see how many rewards you have earned based on your validator's performance.

#### User total balance

To check your total balance on the `<my_validator>` pool:

```sh
near view <my_validator> get_account_total_balance '{"account_id": "<user-account.near>"}'
```

#### User staked balance

To check your staked balance on the `<my_validator>` pool:

```sh
near view <my_validator> get_account_staked_balance '{"account_id": "<user-account.near>"}'
```

<details>
<summary>Staking pool balances</summary>

You can view additional information and balances from the staking pool using the following CLI commands:

#### Total staked balance of the entire pool

```sh
near view <my_validator> get_total_staked_balance '{}'
```

#### Owner of the staking pool

```sh
near view <my_validator> get_owner_id '{}'
```

#### Current reward fee

```sh
near view <my_validator> get_reward_fee_fraction '{}'
```

#### Owner's balance

```sh
near view <my_validator> get_account_total_balance '{"account_id": "owner"}'
```

#### Staking key

```sh
near view <my_validator> get_staking_key '{}'
```

</details>

## Withdrawing staked tokens

To withdraw your staked tokens, first you need to "un-delegate" them from your validator. Your tokens will enter a 2-3 epoch (approximately 48 hours) unbonding period before they can be withdrawn.
Once they're unlocked, you can execute the withdrawal, and once the transaction is processed, your funds will be available in your account.

### Unstaking using CLI

To un-delegate the tokens:

1. First execute the `unstake` method on the `<my_validator>` contract:

```sh
near call <my_validator> unstake '{"amount": "100000000000000000000000000"}' --accountId <user-account.near>
```

2. Check the unstaked balance for your `<user-account.near>` account:

```sh
near view <my_validator> get_account_unstaked_balance '{"account_id": "<user-account.near>"}'
```

3. After 3 epochs, check if you can withdraw:

```sh
near view <my_validator> is_account_unstaked_balance_available '{"account_id": "<user-account.near>"}'
```

If the Validator's response is `true`, then your tokens are ready for the last step.

4. Finally, withdraw the unstaked tokens:

```sh
near call <my_validator> withdraw '{"amount": "100000000000000000000000000"}' --accountId <user-account.near>
```

---

## Tools and Resources

- Supported wallets for staking and managing your tokens:
  - [Ecosystem Wallets](https://wallet.near.org/)
- To explore validators and staking pools:
  - [NearBlocks](https://nearblocks.io/)
  - [Pikespeak](https://pikespeak.ai/)
  - [NEAR Staking](https://near-staking.com/)
