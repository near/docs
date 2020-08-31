---
id: deploy-on-mainnet
title: Deploy a Validator Node on MainNet
sidebar_label: Deploy on MainNet
---
## Overview

NEAR MainNet will be deployed in three phases:
* POA: runs only from NEAR Foundation's validators (_Phase Zero_)
* MainNet: Restricted: runs from a restricted number of nodes, with token transfers disabled (_Phase One_)
* MainNet: Community Governed: runs in a fully permissionless environment (_Phase Two_)

This guide introduces basic guidelines to deploy your node on MainNet, based on the current phase of the network. You can find additional info about the roadmap in the blog post ["The Road to MainNet and Beyond"](https://near.org/blog/mainnet-roadmap/).

<blockquote class="warning">
<strong>Update August 25th 2020</strong><br><br>
NEAR is currently onboarding validators on MainNet Phase One. If you are part of them, see the instructions below to create your wallet and deploy your staking pool.
</blockquote>

## Step-by-Step guide

Overall, the process is similar to TestNet and BetaNet:
1. Create your MainNet wallet
2. Deploy your MainNet staking pool
3. Build and run your MainNet validator node

### 1. Create your MainNet Wallet
NEAR MainNet is currently in Phase One, with token transfers disabled and the wallet in _private beta_, so you can't manage the tokens needed to deploy your node. If you are part of Phase One Validators, you should already have the instructions to create your wallet.

If you are not part of the Phase One Validators group, join the [Stake Wars](https://github.com/nearprotocol/stakewars) and complete the challenges to become eligible and receive an invitation.

### 2. Deploy your MainNet staking pool
You can instantly deploy the staking pool with [near-cli](https://github.com/near/near-cli), using the command `near call`:

```
near call poolv1.near create_staking_pool '{"staking_pool_id":"<POOL_ID>", "owner_id":"<OWNER_ID>", "stake_public_key":"<VALIDATOR_KEY>", "reward_fee_fraction": {"numerator": <X>, "denominator": <Y>}}' --account_id <OWNER_ID> --amount 30 --gas 300000000000000
```

The command will invoke the `staking-pool-factory` from [NEAR Core Contracts](https://github.com/near/core-contracts), passing the following parameters:

- `poolv1.near` is the staking pool factory
- `POOL_ID` is the name of your validator (and the staking pool associated with it)
- `OWNER_ID` is the wallet that controls the pool, see the [owner-only methods](https://github.com/near/core-contracts/tree/master/staking-pool#owner-only-methods) for more information
- `VALIDATOR_KEY` is the validator node public key, from the file `~/.near/validator_key.json`
- `{"numerator": <X>, "denominator": <Y>}` set the validator fees. `x=10` and `y=100` equals to 10% 
- `--amount 30` attaches 30 $NEAR to the transaction to pay the contract storage
- `--gas 300000000000000` specifies the amount of gas for the transaction (optional)

<blockquote class="info">
<strong>Heads Up:</strong><br><br>
If your POOL_ID is "buildlinks", the staking pool factory will deploy a contract called "buildlinks.poolv1.near", and your node will appear in the Explorer as "buildlinks.poolv1.near"
</blockquote>

### 3. Build and run your MainNet validator node
You have to compile the version `1.11.1` of [nearcore](https://github.com/nearprotocol/nearcore/releases/tag/1.11.1). 

**Build the binary using the `--release` switch:**
```
cargo build -p neard --release
target/release/neard init --chain-id="mainnet"
```

After the build process is done, perform the following checks:
1. the configuration file located at `~/.near/config.json` is the same as [this one](https://s3-us-west-1.amazonaws.com/build.nearprotocol.com/nearcore-deploy/mainnet/config.json).
2. Generate your validator key and put it at `~/.near/validator_key.json`. Make sure that it contains the right account id (e.g., `buildlinks.poolv1.near`), and the keypair is corresponding to the staking pool configuration.

Then, you can start your node with the command
```
target/release/neard run
```

As soon as your node is up and running, NEAR Foundation (and any other token holder with a MainNet wallet) will be able to delegate funds to your staking pool, and you will become validator on NEAR MainNet: Restricted.
