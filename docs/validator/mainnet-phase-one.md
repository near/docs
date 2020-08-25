---
id: deploy-on-mainnet
title: Deploy a Validator Node on MainNet
sidebar_label: Deploy on MainNet
---
## Overview

NEAR MainNet will be deployed in three phases:
* POA: runs only from NEAR Foundation's validators (_Phase Zero_)
* MainNet: Restricted: runs from a restricted number of nodes, with token transfers disabled (_Phase One_)
* MainNet: Community Governed: runs in a fully unpermissioned environment (_Phase Two_)

This guide introduces basic guidelines to deploy your node on MainNet, based on the current phase of the network. You can find additional information in the blog post ["The Road to MainNet and Beyond"](https://near.org/blog/mainnet-roadmap/).

<blockquote class="warning">
<strong>Update August 25th 2020</strong><br><br>
NEAR is currently onboarding validators on MainNet Phase One. If you are part of them, see the instructions below to create your wallet and deploy your staking pool.
</blockquote>

## Step-by-Step guide

Overall, the process is similar to TestNet and BetaNet:
1. Create your MainNet wallet
2. Deploy your MainNet staking pool, using the staking pool factory smart contract
3. Build and run your MainNet node

### 1. Create your MainNet Wallet
NEAR MainNet is currently in Phase One, with token transfers disabled and the wallet in _private beta_, so you can't manage the tokens needed to deploy your node. If you are part of Phase One Validators, you should already have the instructions to create your wallet.

If you are not part of the Phase One Validators group, join the [Stake Wars](https://github.com/nearprotocol/stakewars) and complete the challenges to become eligible and receive an invitation.

### 2. Deploy your MainNet staking pool
You can instantly deploy the staking pool factory using [near-cli](https://github.com/near/near-cli):

```
near call poolv1.near create_staking_pool '{"staking_pool_id":"<POOL_ID>", "owner_id":"<OWNER_ID>", "stake_public_key":"<VALIDATOR_KEY>", "reward_fee_fraction": {"numerator": <X>, "denominator": <Y>}}' --account_id <OWNER_ID> --amount 30 --gas 300000000000000
```

This `near call` command will invoke the `staking-pool-factory` from [NEAR Core Contracts](https://github.com/near/core-contracts), passing the following parameters:

- `poolv1.near` is the staking pool factory name
- `POOL_ID` is the name of your validator (and the staking pool associated to it)
- `OWNER_ID` is the wallet that controls the pool, see the [owner-only methods](https://github.com/near/core-contracts/tree/master/staking-pool#owner-only-methods) for more information
- `VALIDATOR_KEY` is the public key from `~/.near/testnet/validator_key.json` on your validator node
- `{"numerator": <X>, "denominator": <Y>}` set the validator fees. 10% is configured with `x=10` and `y=100`
- `--amount 30` attaches 30 $NEAR to the transaction, as a reserve to pay the contract storage
- `--gas 300000000000000` specifies the amount of gas for the transaction (optional)

<blockquote class="info">
<strong>Heads Up:</strong><br><br>
If your POOL_ID is "buildlinks", the staking pool factory will deploy a contract called "buildlinks.poolv1.near", and your node will appear in the Explorer as "buildlinks.poolv1.near"
</blockquote>

### 3. Build and run your MainNet node
You have to compile the version `1.10.0` of [nearcore](https://github.com/nearprotocol/nearcore/releases/tag/1.10.0). 

**Build the binary using the `--release` switch.**

Once your node is up and running, NEAR Foundation will delegate funds to your staking pool, and you will be officially a validator on NEAR MainNet: Restricted.
