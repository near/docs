---
id: deploy-on-mainnet
title: Deploy Mainnet Staking Pool
sidebar_label: Deploy Mainnet Staking Pool
---

Deploying a node on `mainnet` is similar to deploying one on `testnet`
and requires the following steps:

1. Create `mainnet` wallet.
2. Build `mainnet` validator node daemon.
3. Initialize the node.
4. Deploy `mainnet` staking pool.
5. Run the validator node.


### 1. Create `mainnet` wallet {#create-wallet}

If you don’t have a NEAR account, first go to [NEAR
Wallet](https://wallet.near.org/) and create one.


### 2. Build `mainnet` validator node daemon {#build-node}

To build the validator first clone the [`nearcore`
repository](https://github.com/near/nearcore):

```bash
git clone https://github.com/near/nearcore.git
```

Once that’s done, figure out [the most recent stable
release](https://github.com/near/nearcore/releases).  Stable releases
are ones without `-rc.<number>` suffix (‘rc’ stands for ‘release
candidate’).  This can be done automatically as follows:

```bash
NEAR_RELEASE_VERSION=$(curl -s https://github.com/near/nearcore/releases/latest |
                       tr '/" ' '\n' | grep "[0-9]\.[0-9]*\.[0-9]" | head -n 1)
```

Now, go to the cloned repository’s root directory and checkout the
code corresponding to the latest stable release:

```bash
cd nearcore
git checkout "refs/heads/${NEAR_RELEASE_VERSION:?}"
```

Finally, build the executable using `make`.  Note that building with
`cargo build --release` command *is not* sufficient to create fully
optimized executable:

```bash
make neard
```


### 3. Initialize the node {#init-node}

Once the daemon executable is built it’s time to initialize the node.

```bash
./target/release/neard init --chain-id=mainnet \
                            --account-id="<POOL_ID>.poolv1.near"
```

`<POOL_ID>` is the name you want to use for your staking pool.  Note
that at this point the `<POOL_ID>.poolv1.near` account doesn’t yet
exist.  We’re going to create it in the next step.

This command will create a `~/.near/validator_key.json` file which
will contain validator’s private key.  It’s a good idea to back this
file up in a secure location.  For now, read the validator’s public
key from this file:

```bash
grep public_key ~/.near/validator_key.json
```


### 4. Deploy `mainnet` Staking Pool {#deploy-staking-pool}

You can deploy the staking pool with [near-cli](https://github.com/near/near-cli),
using the `near call` command:

```bash
near call poolv1.near create_staking_pool '{
    "staking_pool_id": "<POOL_ID>",
    "owner_id": "<OWNER_ID>",
    "stake_public_key": "<VALIDATOR_KEY>",
    "reward_fee_fraction": {"numerator": <X>, "denominator": <Y>}
}' --account_id <OWNER_ID> --amount 30 --gas 300000000000000
```

It will invoke the `staking-pool-factory` method from [NEAR Core
Contracts](https://github.com/near/core-contracts), passing the
following parameters:

- `poolv1.near` is the staking pool factory,
- `<POOL_ID>` is the name of your validator (and the staking pool
  associated with it),
- `<OWNER_ID>` is the wallet that controls the pool (see [owner-only
  methods](https://github.com/near/core-contracts/tree/master/staking-pool#owner-only-methods)
  for more information),
- `<VALIDATOR_KEY>` is the validator node public key read in the
  previous step from the `~/.near/validator_key.json` file,
- `{"numerator": <X>, "denominator": <Y>}` sets the validator fees
  (for example`X=10` and `Y=100` means 10%),
- `--amount 30` attaches 30 $NEAR to the transaction to pay the
  contract storage,
- `--gas 300000000000000` specifies the amount of gas for the
  transaction (optional).

Note that if your `<POOL_ID>` is ‘buildlinks’, the staking pool
factory will deploy a contract called ‘buildlinks.poolv1.near’, and
your node will appear in the Explorer as ‘buildlinks.poolv1.near’.
This corresponds to the account identifier used in the previous step.


### 5. Run the validator node {#run-the-node}

Once the daemon is built, node is initialized and staking pool
created, the validator can be started.  To make sure the node has been
set up correctly, check that the configuration file located at
`~/.near/config.json` is the same as [this mainnet
config.json](https://s3-us-west-1.amazonaws.com/build.nearprotocol.com/nearcore-deploy/mainnet/config.json):

```bash
sha1sum <~/.near/config.json
curl -s https://s3-us-west-1.amazonaws.com/build.nearprotocol.com/nearcore-deploy/mainnet/config.json | sha1sum
```

If everything is in order, start your node with the following command:

```
./target/release/neard run
```

You can start your node without the JSON RPC endpoint by running the
above command with an additional `--disable-rpc` flag.  This reduces
resource use and attack vector by closing a listening port.


>Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol">
  <h8>Ask it on StackOverflow!</h8></a>
