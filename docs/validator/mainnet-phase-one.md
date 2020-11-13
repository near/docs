---
id: deploy-on-mainnet
title: Deploy a Validator Node on MainNet
sidebar_label: Deploy on MainNet
---

## Step-by-Step guide

Overall, the process is similar to TestNet and BetaNet:
1. Create your MainNet wallet
2. Deploy your MainNet staking pool
3. Build and run your MainNet validator node

### 1. Create your MainNet Wallet
- Go to [wallet.near.org](https://wallet.near.org/) and create an account.

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

- Build the binary using the `--release` switch:

```bash
cargo build -p neard --release
```

- configure the `chain-id` and `account-id`:
  
```bash
target/release/neard init --chain-id="mainnet" --account-id=<YOUR_STAKING_POOL_ID>
```
  - After the build process is done, check that the configuration file located at `/HOME_DIR/.near/config.json` is the same as [this one](https://s3-us-west-1.amazonaws.com/build.nearprotocol.com/nearcore-deploy/mainnet/config.json).
 
  - Now, start your node with the following command:

```bash
target/release/neard run
```

### 4. Create, launch and monitor the neard service.

1. With your favorite editor create a neard.service in /etc/systemd/system/neard.service, please make sure you provide the full path and correct user into the config, it needs to have the following contents:
```
[Unit]
Description=NEARD service
After=network.target

[Service]
User=<USERNAME>
ExecStart=/<FULLPATH_TO>/nearcore/target/release/neard run

[Install]
WantedBy=default.target
```
2. After creating the service enable it:
```
sudo systemctl enable neard.service
```
3. Run the service:
```
sudo systemctl start neard.service
```
4. Monitor the service:
```
sudo journalctl -u neard.service -f
```
5. If you see **Waiting for peers** message in your logs for a while you might have no viable bootnodes and need to configure them: 
- stop neard service 
```
sudo systemctl stop neard.service
```
- using the active peers from https://rpc.mainnet.near.org/network_info edit .near/config.json bootnodes so they resemble the following config:
```
"boot_nodes": "ed25519:CgmgHJCJL6ydtSptWkLMGjk1YMVFrjJDPozszvbr7tYe@34.94.132.112:24567,ed25519:CDQFcD9bHUWdc31rDfRi4ZrJczxg8derCzybcac142tK@35.196.209.192:24567,ed25519:EDzprW4tkn4zdGMAj7C7x7FDtTW72HfT4bqZeikiP87c@35.202.194.133:24567,ed25519:FA14a2NYzEtw9mP2i3i8mo58EVZtBTxbkuz9shxr71hu@35.223.230.68:24567",
```
- start neard service once again
```
sudo systemctl start neard.service
```
>Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol">
  <h8> Ask it on stack overflow! </h8>
</a>
