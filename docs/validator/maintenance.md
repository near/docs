---
id: maintenance
title: Validator Node Maintenance
sidebar_label: Node Maintenance
---

## Updating a Validator Node

As a decentralized network, every update to NEAR Protocol needs some coordination between end-users, platforms, developers and validators. [Nearup](https://github.com/near/nearup) provides scripts to launch NEAR Protocol devnet, betanet and testnet nodes. Unless it is executed with the switch `--binary-path`, nearup will automatically update the local binaries and perform a node reset if NEAR's boot nodes hard-fork the network and the genesis checksum is changed.

For security-critical applications and for validators, nearup can run a locally compiled binary of [nearcore](https://github.com/nearprotocol/nearcore) and such updates have to be done manually. Since validators are responsible to create new blocks, their coordination is necessary to avoid any partitioning or stall of the network.

## NEAR Validator Channels

NEAR Protocol will communicate with validators using these channels:

1. **Runtime Alerts:** call-to-actions for technical teams if the network is stalling and there's the need to coordinate a manual node restart. Such messages begin with [CODE_RED], and will be posted in the read-only channel on [Discord](https://discord.gg/xsrHaCb). The same message may be repeated in other channels, to have the highest possible outreach.
2. Technical troubleshooting on [Discord](https://discord.gg/ZMPr3VB).
3. New releases, technical support and bug tracking in the Github repos of [Stake Wars](https://github.com/nearprotocol/stakewars/issues) and [Nearcore](https://github.com/nearprotocol/nearcore/issues).

NEAR's team will be mostly active on Github, and with limited participation on Discord and Telegram.


## Planned Updates

NEAR merges node updates for [nearcore](https://github.com/nearprotocol/nearcore) as follows:
- DevNet on a daily basis, to `master` branch
- BetaNet every Wednesday at 00:00 UTC, merging selected `master` features to `beta` branch
- TestNet is not yet subject to planned releases
- MainNet is not yet subject to planned releases

Once MainNet: Restricted is live, planned updates to TestNet and MainNet will come via coordination with validators.

<blockquote class="warning">
<strong>heads up</strong><br><br>

BetaNet provides cutting-edge testing grounds for valudators, with weekly updates and frequent hard-forks. BetaNet is using the `beta` branch of nearcore, which is merged every Wednesday at 00:00 UTC and deployed on NEAR boot nodes shortly after. BetaNet is also the network used for Stake Wars.

</blockquote>


## Emergency Updates

NEAR Protocol team will use the tag `[CODE_RED]` on [Discord](https://discord.gg/xsrHaCb), followed by email instructions for coordination. Some updates may follow a confidential path, as explained on [nearcore/SECURITY.md](https://github.com/nearprotocol/nearcore/blob/master/SECURITY.md) docs.
Follow the [Stake Wars](https://near.org/stakewars) if you want to participate in fire-drills and test your playbook for emergency updates.

