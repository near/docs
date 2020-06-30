---
id: how-to-upgrade
title: How to upgrade your node
sidebar_label: Node Upgrades
---

## Overview

There are in general two types of node upgrades: ones that change the protocol and ones that do not. From the perspective of a validator, these two types of upgrades don't follow different patterns, as NEAR is committed to avoid hard forks for protocol upgrades.

[Nearup](https://github.com/near/nearup) provides scripts to launch NEAR nodes on `TestNet`, `BetaNet` and `DevNet`. Unless it is executed with the switch `--binary-path`, nearup will automatically update the local binaries as soon as NEAR's boot nodes fork the network and change the genesis checksum.

For security-critical applications and for validators, `nearup` can run a locally compiled binary of [`nearcore`](https://github.com/nearprotocol/nearcore) by using the `--binary-path` switch. This modality requires to manually provide the binary path of every new release.

## Planned Maintenance

NEAR merges node updates for [`nearcore`](https://github.com/nearprotocol/nearcore) as follows:
- `DevNet` on a daily basis, to `master` branch
- `BetaNet` every Monday at 00:00 UTC, merging selected `master` features to `beta` branch
- `TestNet` is not yet subject to planned releases. The official branch is `stable`
- `MainNet` is not yet subject to planned releases

Once `MainNet: Restricted` is live, planned updates to `TestNet` and `MainNet` will come via coordination with validators.

<blockquote class="warning">
<strong>heads up</strong><br><br>

`BetaNet` provides cutting-edge testing grounds for validators, with weekly updates and frequent hard-forks. `BetaNet` is using the `beta` branch of `nearcore`, which is merged every Wednesday at 00:00 UTC and deployed on NEAR boot nodes shortly after. `BetaNet` is also the network used for Stake Wars.

</blockquote>

## Zero-downtime Upgrade

To upgrade the node to a new binary (whether it changes the protocol or not), validators can use the following process:
* Spin up a new node that runs the new binary, using the same account id but a new validator key.
* After the node has synced, stake with the new validator key. For validator who run the staking pool, it suffices to
update the staking public key of the staking pool.
* After two epochs, the new node will become a validator and the old node can be safely shutdown.

## Why does it work?

Zero-downtime upgrade hinges on the following properties that NEAR has:
* Protocol upgrade is backward compatible. More specifically, Protocol version `X` and Protocol version `X-1` must be
fully compatible with each other. 
* Protocol upgrade is asynchronous. Validators vote for protocol changes by running the binary that implements the new
protocol. For more details, check out [this page](https://github.com/nearprotocol/NEPs/blob/master/specs/ChainSpec/Upgradability.md).
* Validator is identified by the `(account_id, validator_key)` pair. It means that there can be multiple nodes associated
with the same account running in the network at the same time, even though only one of them is a validating node. This
allows validators to seamlessly switch nodes without having to suffer any downtime.

## Alternatives to Zero-downtime Upgrade

Due to security concerns, some validators may not want to rotate validator keys. There are two alternative approaches in
this case with different tradeoffs.

### Sync and Swap

This approach requires syncing a new node and then swapping the data folder. More specifically,

* Spin up a new node that runs the new binary. Wait until it is synced.
* Shutdown the old node. Mount the data folder from the new node.
* Start the old node with the new binary.

The downtime in this approach, while nonzero, should be tolerably small.

### Stop and Restart

A simpler approach would be to stop the node and restart with the new binary. While seemingly straightforward, this approach can incur more downtime than desired due to the potential need for data migration. If the new binary has a different database version than the current storage, it will run data migration after opening the database and depending on the amount of data in storage as well as the scope of the format change, this process can take a while. However, if the new binary has the same database version, this approach is better as it does not require spinning up any new node. 


## Critical Upgrades

NEAR will alert the community of validators of imminient critical upgrades by using the tag `[CODE_RED_BETANET]` or `[CODE_RED_TESTNET]` in the Validator Announcement channel on [Discord](https://discord.gg/xsrHaCb), followed by email instructions for coordination. Some updates may follow a confidential process, as explained on [nearcore/SECURITY.md](https://github.com/nearprotocol/nearcore/blob/master/SECURITY.md) docs.
Follow [Stake Wars](https://near.org/stakewars) and its challenges if you want to participate in testing emergency updates.

## Validator Channels

NEAR Protocol communicates with validators using these channels:

1. **Runtime Alerts:** call-to-actions for technical teams if the network is stalling and there's the need to coordinate a manual node restart. Such messages begin with `[CODE_RED_BETANET]` or `[CODE_RED_TESTNET]`, and will be posted in the read-only Validator Announcement channel on [Discord](https://discord.gg/xsrHaCb). The same message may be repeated in other channels, to have higher outreach.
2. Technical troubleshooting in the Validator Channel on [Discord](https://discord.gg/ZMPr3VB).
3. New releases, technical support and bug tracking in the Github repos of [Stake Wars](https://github.com/nearprotocol/stakewars/issues) and [`nearcore`](https://github.com/nearprotocol/nearcore/issues).

NEAR may issue a `[CODE_YELLOW_BETANET]` or `[CODE_YELLOW_TESTNET]` if the network is suffering minor issues, or a new software release introduces incompatibilities and requires additional testing.

NEAR's team will be mostly active on Github, with limited participation on Discord and Telegram.


 
