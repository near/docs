---
id: deploy-on-mainnet
title: Deploy Node on Mainnet
sidebar_label: Deploy Node on Mainnet
---


Deploying a node on `mainnet` is similar to deploying on `testnet`:
1. Create your `mainnet` wallet
2. Deploy your `mainnet` staking pool
3. Build and run your `mainnet` validator node

### 1. Create your `mainnet` Wallet
- Go to [wallet.near.org](https://wallet.near.org/) and create an account.

### 2. Deploy your `mainnet` Staking Pool
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

### 3. Build and run your mainnet validator node

- Clone the [`nearcore`](https://github.com/near/nearcore) repository:

```bash
git clone https://github.com/near/nearcore.git
```  

- Create an environment variable that finds the [most recent stable release](https://github.com/near/nearcore/releases):

```bash
export NEAR_RELEASE_VERSION=$(curl -s https://github.com/near/nearcore/releases/latest | tr '/" ' '\n' | grep "[0-9]\.[0-9]*\.[0-9]" | head -n 1)
```

- Go to the root directory and checkout the branch:

```bash
cd nearcore
git checkout $NEAR_RELEASE_VERSION
```

- Build the binary using Makefile target (note that building with
  a `cargo build --release` is not sufficient to create fully
  optimised executable):

```bash
make neard
```

- configure the `chain-id` and `account-id`:

```bash
target/release/neard init --chain-id="mainnet" --account-id=<YOUR_STAKING_POOL_ID>
```
  - After the build process is done, check that the configuration file located at `/HOME_DIR/.near/config.json` is the same as [this mainnet config.json](https://s3-us-west-1.amazonaws.com/build.nearprotocol.com/nearcore-deploy/mainnet/config.json).

  - Now, start your node with the following command:
```
target/release/neard run
```
 - Or you can start your node without the JSON RPC endpoint by running the above command with an additional flag `--disable-rpc`. With the `--disable-rpc` flag present, node won’t start the HTTP server offering the JSON RPC endpoint. This reduces resource use and attack vector by closing a listening port.


>Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol">
  <h8>Ask it on StackOverflow!</h8></a>
