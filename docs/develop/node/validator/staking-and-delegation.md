---
id: staking-and-delegation
title: Staking and Delegation
sidebar_label: Staking and Delegation
---

#  Staking on NEAR

Staking is a process of sending `StakeTransaction` that informs the network that a given node intends to become a validator in upcoming epochs. This particular type of transaction must provide a public key and staking amount. After the transaction is sent, a node that has a private key associated with the public key in the staking transaction must wait until two epochs to become a validator.

## What is a minimum amount to stake as a validator?
A node can become a NEAR validator only if the amount in the staking transaction is above [the seat price defined by the protocol](https://near.org/papers/economics-in-sharded-blockchain/#validators). The seat price is dynamically calculated and is a function of the amount of NEAR tokens staked by other validators.

The current seat price for validator is available here on the Explorer page: https://explorer.near.org/nodes/validators

## Smart Contract Based Staking

Delegation on NEAR is not implemented on the protocol level, which allows each validator to create or customize their own contract that they use to attract delegators. If validators want to accept delegated stake, they must deploy a staking pool contract, which defines commission fees and reward distribution split, and advertise that contract as the destination to delegate.

Unlike other PoS networks, NEAR uses a staking pool factory with a whitelisted staking smart contract to ensure delegators’ funds are safe. Therefore, in order to run a validator node on NEAR, a staking pool must be deployed to a NEAR account and integrated into a NEAR validator node.

Each validator may decide their own commission fees and how reward distribution works.

## Stake with the NEAR CLI

For validators, there is an option to staking without deploying a staking pool smart contract. However, in choosing this option to stake directly without deploying a staking pool, you will prevent other delegators from delegating to you and will reduce your potential commission. If this is the approach you'd like to take:
- Please install the [near-cli](https://github.com/near/near-cli)
- The following commands may help you stake and unstake your NEAR.

### To Stake NEAR Directly Without a Staking Pool
```
near stake <accountId> <publicKey> --amount <amount>
```

### To Unstake NEAR Directly Without a Staking Pool
The unstaking command is simply changing the staking command to have a staking amount of 0.
```
near stake <accountId> <publicKey> --amount 0
```

---


# Delegation on NEAR

## How does delegating staking works?
NEAR token holders are encouraged to earn reward by delegate their tokens. By staking your NEAR tokens, you help to secure the network and earn rewards. When you delegate your tokens, you are depositing and staking your token with a specific staking pool that has been deployed by a validator.

## How to choose your validator(s)?
A list of available pools for delegation (one per validator) is available on the [Explorer Validator](https://explorer.near.org/nodes/validators) page. Delegators should review validators' performance and commission charged to decide how best to delegate.

Delegators may use the [NEAR wallet](https://wallet.near.org/) or the [NEAR CLI](https://github.com/near/near-cli) to delegate to existing staking pools.

## Delegate with the NEAR Wallet

For delegators, who would like to delegate using the NEAR wallet, please create your `mainnet` wallet:
- Go to [wallet.near.org](https://wallet.near.org/) and create an account.
- Navigate to the [staking](https://wallet.near.org/staking) tab to select an available staking pool to delegate your tokens.


## Delegate with the NEAR CLI

For delegators, who would like to delegate using the command line:
- Please install the [near-cli](https://github.com/near/near-cli)
- The following commands may help you stake, unstake, and withdraw your NEAR.

### To Deposit and Stake NEAR

```
near call <stakingPoolId> deposit_and_stake --amount <amount> --accountId <accountId> --gas=300000000000000
```

### Unstake All
Unstaking takes 2-3 epochs to complete. After the unstaking period, you may withdraw your NEAR from staking pool.
```
near call <stakingPoolId> unstake_all --accountId <accountId> --gas=300000000000000
```

### Unstake a Specified Amount
Please note the amount in yoctoNEAR. NB: Unstaking takes 2-3 epochs to complete. After the unstaking period, you may withdraw your NEAR from staking pool.

```
near call <stakingPoolId> unstake '{"amount": "<amount yoctoNEAR>"}' --accountId <accountId> --gas=300000000000000
```

### Withdraw All
```
near call <stakingPoolId> withdraw_all --accountId <accountId> --gas=300000000000000
```

### Withdraw a Specified Amount
Please note the amount in yoctoNEAR.
```
near call <stakingPoolId> withdraw '{"amount": "<amount yoctoNEAR>"}' --accountId <accountId> --gas=300000000000000
```

### See Updated Balance
If a staking pool hasn't had an action applied to it recently, it may show an old balance on all staked accounts. To see an updated balance, you can ping the pool.
```
near call <stakingPoolId> ping '{}' --accountId <accountId> --gas=300000000000000
```


>Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol">
  <h8>Ask it on StackOverflow!</h8></a>
