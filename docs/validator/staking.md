---
id: staking
title: Running a Validator Node
sidebar_label: Running the Node
---

## Staking on NEAR

### Translations

- [Korean](/docs/validator/staking-kr)
- Add your language too via [Github pull request](https://github.com/near/docs/pull/385)

### _READ THIS QUICKSTART GUIDE BEFORE YOU START_

Wait until your node is fully synced before you send a staking transaction. An out of sync node cannot produce or validate blocks, so if you're chosen as a validator, you're at risk of being kicked out of the validator pool and losing your rewards if your node doesn't maintain the appropriate uptime \(i.e. validate / produce the number of assigned blocks for that epoch\).

You can test your validator infrastructure on NEAR _TestNet_. You can generate an account with a few tokens from the [NEAR wallet](https://wallet.testnet.near.org), and use it to deploy your staking pool. Then, contact NEAR Core-dev on [Discord](https://near.chat) to request sufficient stake to become validator on TestNet.

1. For this current session: run the command `export NODE_ENV=testnet`
2. Add this same line (`export NODE_ENV=testnet`) to the end of the file `~/.bashrc` if you want to ensure this environment variable persists at machine restarts.

TestNet is running on separate URLs for the explorer, the wallet and the Json RPC:

|        ⛔️ MainNet        |            ✅ TestNet             |
| :-----------------------: | :-------------------------------: |
| https://explorer.near.org | https://explorer.testnet.near.org |
|  https://wallet.near.org  |  https://wallet.testnet.near.org  |
|   https://rpc.near.org    |   https://rpc.testnet.near.org    |

Every new TestNet account receives automatically a few hundred tokens to deploy smart contracts and test your APIs.

You can use [nearup](https://github.com/near/nearup) to easily deploy your TestNet node on a VPS. If you plan to deploy on MainNet, **you can't use nearup**, and we suggest to follow the guidelines [here](/docs/develop/node/validator/deploy-on-mainnet).
Join NEAR validator channels [on Discord](https://near.chat) to receive technical support by NEAR team and the rest of the community.

NEAR Validators should:

- Know how to compile, deploy and configure NEAR Validator nodes
- Understand the difference between `account_key`, `node_key`and `validator_key` (see the [keys on NEAR Platform](/docs/develop/node/intro/keys) doc)
- Understand how to deploy a NEAR contract, and the difference betweek `view` and `call` methods. Know how to leverage them via `near-cli` and `near RPC`
- Have a monitoring platform in place, to measure the generated and missed blocks, peers and connectivity, current node version, along with the typical cpu, memory, storage and networking performance
- Understand the state of a validator: `proposals`, `next` and `current`
- Use the information above to control if the validator is falling outside of the active set, and what needs to be done to fix the issue
- Know where to find information about upcoming [nearcore releases](https://github.com/near/nearcore/releases) and other tooling upgrades

## Node hardware requirements

The minimum requirements to run a validator node on NEAR are:

```bash
At least 4 CPU cores
At least 16GB RAM
At least 100GB SSD (Note: HDD will not work)
```

More information is on the [Hardware Requirements](/docs/develop/node/validator/hardware) docs.

## Setting up your environment

**IMPORTANT: Make sure you have the latest version of [NEAR CLI](https://github.com/near/near-cli) and Node Version 12.x**

You can install and upgrade NEAR CLI by using npm:

```bash
# Download NEAR CLI with npm:
npm i -g near-cli
```

**Note:** The default network for `near-cli` is `testnet`. If you would like to change this to `mainnet` or `betanet`, please see [`near-cli` network selection](/docs/tools/near-cli#network-selection) for instructions.

Once NEAR CLI is installed, go ahead and run your node.

<blockquote class="info">
    <strong>Pro Tip</strong><br /><br />
    You don't have to run near-cli on your validator node: all staking commands are issued to the staking pool, which is a normal smart contract.
</blockquote>

## Run the Node

Please follow [Nearup documentation](https://github.com/near/nearup) to start your TestNet node. Remember that `nearup` doesn't support MainNet, so you will have to build your startup scripts and follow the [mainnet deployment guide](/docs/develop/node/validator/deploy-on-mainnet).

At the first start, nearup will ask your validator account ID. Put a placeholder, like `coming_soon`, to let the node sync with the network while you deploy the staking pool:

```
$ nearup run testnet --account-id coming_soon
2020-10-16 14:02:29.190 INFO nearup - run: Home directory is /home/nearkat/.near/testnet...
2020-10-16 14:02:29.191 INFO nodelib - setup_and_run: Using officially compiled binary
2020-10-16 14:02:30.027 INFO util - download_binaries: Downloading latest deployed version for testnet
2020-10-16 14:02:30.028 INFO util - download_binaries: Downloading near to /home/nearkat/.nearup/near/testnet/near from nearcore/Linux/1.16.0/974d93dc657f620d98de6589a2b5bc97be1db816/near...
2020-10-16 14:02:33.755 INFO util - download_binaries: Downloaded near to /home/nearkat/.nearup/near/testnet/near...
2020-10-16 14:02:33.758 INFO util - download_binaries: Making the near executable...
2020-10-16 14:02:33.758 INFO util - download_binaries: Downloading genesis-csv-to-json to /home/nearkat/.nearup/near/testnet/genesis-csv-to-json from nearcore/Linux/1.16.0/974d93dc657f620d98de6589a2b5bc97be1db816/genesis-csv-to-json...
2020-10-16 14:02:34.710 INFO util - download_binaries: Downloaded genesis-csv-to-json to /home/nearkat/.nearup/near/testnet/genesis-csv-to-json...
2020-10-16 14:02:34.710 INFO util - download_binaries: Making the genesis-csv-to-json executable...
2020-10-16 14:02:34.712 INFO nodelib - check_and_setup: Setting up network configuration.
2020-10-16 14:02:34.712 INFO nodelib - init_near: Initializing the node configuration using near binary...
Oct 16 14:02:34.726  INFO near: Version: 1.16.0-rc.1, Build: 974d93dc-modified, Latest Protocol: 39
Oct 16 14:02:34.727  INFO near: Use key ed25519:4msyQstQ3Z7Gq1qrwE78HPTRYdLFtCmJ9dydrrbUtrer for coming_soon to stake.
Oct 16 14:02:34.727  INFO near: Downloading config file from: https://s3-us-west-1.amazonaws.com/build.nearprotocol.com/nearcore-deploy/testnet/genesis.json ...
```

While the sync is in progres, you **have to retrieve your validator key from** `~/.near/testnet/validator_key.json`:

```
{
  "account_id": "coming_soon",
  "public_key": "ed25519:4msyQstQ3Z7Gq1qrwE78HPTRYdLFtCmJ9dydrrbUtrer",
  "secret_key": "ed25519:<PRIVATE_KEY>"
}
```

This key will be needed to do the _pairing_ between your validator node and its staking pool.

## Authorize `near-cli` to your TestNet account

1. Configure `near-cli` to use TestNet, issuing the command `export NODE_ENV=testnet`
2. Authenticate `near-cli` with your NEAR Wallet account, by running the command `near login`

You will be asked to navigate to a url to authenticate your staking account. You can expect a resul similar to the one below:

```bash
$ near login

Please authorize NEAR CLI on at least one of your accounts.

If your browser doesn't automatically open, please visit this URL
https://wallet.testnet.near.org/login/?title=NEAR+CLI&public_key=ed25519%3A7xuBXjTabXM1yZ8WQB1Ezj95BjDnqX63cKj6RBgYa3it&success_url=http%3A%2F%2F127.0.0.1%3A5000
Please authorize at least one account at the URL above.

Which account did you authorize for use with NEAR CLI?
Enter it here (if not redirected automatically):

```

Be careful to specify the same TestNet account ID in the browser and `near-cli`:

```bash
Which account did you authorize for use with NEAR CLI?
Enter it here (if not redirected automatically):

```

Once you completed the login in the browser and put the account id in the input field above, you should expect a message like the one below:

```
nearkat.testnet
Logged in as [ nearkat.testnet ] with public key [ ed25519:7xuBXj... ] successfully
```

<blockquote class="warning">
    <strong>Heads Up!</strong><br /><br />
    If you get an <i>ERR_CONNECTION_REFUSED</i> error, double-check that your browser is not trying to open the address http://127.0.0.1:5000. This is a wrong redirect of near-cli running on a remote instance, and can be ignored.
</blockquote>

To test if your `near-cli` is capable to control your `testnet` account, issue the command:
`$ near send nearkat.testnet testnet 0.1`, where `nearkat.testnet` is the sender, and `testnet` the recipient of `0.1` NEAR tokens. You can expect a result similar to this one:

```
$ near send quato.testnet testnet 0.1
Sending 0.1 NEAR to testnet from quato.testnet
Transaction Id Hm6hRz8NS9sXV6yPzeyYJZwqTSUTYcifws3iu3VcbkyW
To see the transaction in the transaction explorer, please open this url in your browser
https://explorer.testnet.near.org/transactions/Hm6hRz8NS9sXV6yPzeyYJZwqTSUTYcifws3iu3VcbkyW
```

## Deploy the staking pool

NEAR Protocol provides a staking pool smart contract from the [initial contracts](https://github.com/near/initial-contracts) Github repository.

Deploy your staking pool by sending the call method below to the [staking pool factory](https://github.com/near/core-contracts/tree/master/staking-pool-factory):

```
near call pool.f863973.m0 create_staking_pool '{"staking_pool_id":"<POOL_ID>", "owner_id":"<OWNER_ID>", "stake_public_key":"<VALIDATOR_KEY>", "reward_fee_fraction": {"numerator": <X>, "denominator": <Y>}}' --account_id <OWNER_ID> --amount 50 --gas 300000000000000
```

Where:

- `pool.f863973.m0` is the staking pool factory mentioned above
- `<POOL_ID>` is the name of the staking pool contract. If you pass the parameter `heyheyhey` the result will be `heyheyhey.pool.f863973.m0`
- `<OWNER_ID>` is the account authorized to send the _owner methods_ to the pool, such as the validator key or the fees
- `<VALIDATOR_KEY>` is the public key stored at `~/.near/testnet/validator_key.json` on your validator node (see [staking#run-the-node](/docs/validator/staking#run-the-node) step above)
- `{"numerator": <X>, "denominator": <Y>}` set the validator fees. 10% of fees requires `x=10` and `y=100`
- `--amount 50` attaches 50 \$NEAR to the transaction, as a reserve to pay the contract storage
- `--gas 300000000000000` specifies the gas for the transaction (optional)

You can expect a result similar to this one:

```bash
$ near call pool.f863973.m0 create_staking_pool '{"staking_pool_id":"quato", "owner_id":"quato.testnet", "stake_public_key":"ed25519:4msyQstQ3Z7Gq1qrwE78HPTRYdLFtCmJ9dydrrbUtrer", "reward_fee_fraction": {"numerator": 5, "denominator": 100}}' --account_id quato.testnet --amount 50 --gas 300000000000000
Scheduling a call: pool.f863973.m0.create_staking_pool({"staking_pool_id":"quato", "owner_id":"quato.testnet", "stake_public_key":"ed25519:4msyQstQ3Z7Gq1qrwE78HPTRYdLFtCmJ9dydrrbUtrer", "reward_fee_fraction": {"numerator": 5, "denominator": 100}}) with attached 50 NEAR
Receipt: ByuKqFBuQY4oBu7GypRWEwUjAvxHacTJLGLfwUNjRunV
  Failure [pool.f863973.m0]: Error: {"index":0}
Receipts: 3Y8yjPkd894WSTaapyURe1moMtY8Yvbrjwmz3Pv3N2RZ, EeCy4HyRs8cuxsraxcaiW53gmvWL55xzTqDjfUaPcoXM
  Log [pool.f863973.m0]: The staking pool @quato.pool.f863973.m0 was successfully created. Whitelisting...
Transaction Id BYAffkmrssiErMDbmDrF2AoHKDLCQrcCe1Vk1CGEnBZB
To see the transaction in the transaction explorer, please open this url in your browser
https://explorer.testnet.near.org/transactions/BYAffkmrssiErMDbmDrF2AoHKDLCQrcCe1Vk1CGEnBZB
true

```

The `true` statement in the last line and the explorer link provide proof that the staking pool is deployed and ready to receive the stake

## Configure your node's `validator_key.json` and restart nearup

Once the staking pool is deployed, manually edit the file `~/.near/testnet/validator_key.json` on your validator node and replace `coming_soon` with your staking pool account name:

```
{
  "account_id": "quato.pool.f863973.m0",
  "public_key": "ed25519:4msyQstQ3Z7Gq1qrwE78HPTRYdLFtCmJ9dydrrbUtrer",
  "secret_key": "ed25519:<PRIVATE_KEY>"
}
```

Once done, you can stop and restart nearup, with the command:
`nearup stop`

followed by:
`nearup run testnet`

<blockquote class="warning">
    <strong>Heads Up!</strong><br /><br />
    Be sure that your node downloaded entirely the genesis.json file before giving the stop command to nearup.
</blockquote>

## Becoming a Validator in the _active set_

Once the staking pool is deployed, you can _stake_ tokens using any of the methods offered in the [delegation docs](/docs/validator/delegation). Make sure that you are using a tool that supports TestNet and not only MainNet.

NEAR TestNet and MainNet require at least 24 hours bonding period to accept your staking pool bid. You can verify if you are a validator when in the logs of the node you see "V/" - where V means this node is currently a validator:

![](/docs/assets/validators.png)

Legend: # 7153 | BlockHeight V/1 | 'V' (validator) or '—' (regular node)

The 0/0/40 shows the total validators: connected peers / up to date peers / my peers. This number may change over time.

To learn more about how validators are chosen, take a look at the [Staking FAQ](/docs/validator/staking-faq).

## See the list of current and future validators

You can use `near-cli` to review the validator set in the next three epochs:

| Command                   | Meaning                                                                                               |
| ------------------------- | ----------------------------------------------------------------------------------------------------- |
| `near proposals`          | All validators that sent a staking transaction (`Proposal(Accepted)`), or are re-elected (`Rollover`) |
| `near validators next`    | All validators that will produce blocks in the next epoch. Can be `New`, `Rewarded` or `Kicked out`   |
| `near validators current` | All Validators that are producing blocks in the current epoch, and the number of block they produced  |

<blockquote class="warning">
    <strong>Heads Up!</strong><br /><br />
    You have to wait at least 2 epochs (43,200 blocks each) before a node becomes a validator.
</blockquote>

**Note:** The default network for `near-cli` is `testnet`. If you would like to change this to `mainnet` or `betanet`, please see [`near-cli` network selection](/docs/tools/near-cli#network-selection) for instructions.

## Automatically re-staking

NEAR Protocol automatically re-stake all inflationary rewards, unless you decide to manually unstake some of the funds.

## Additional links

- [Lockup contracts explained](/docs/tokens/lockup)
- [NEAR Core Contracts on Github](https://github.com/near/core-contracts)
- [NEAR Stake Wars](https://github.com/nearprotocol/stakewars)

>Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol">
  <h8>Ask it on StackOverflow!</h8></a>
