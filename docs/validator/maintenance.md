---
id: maintenance
title: Validator Node Maintenance
sidebar_label: Node Maintenance
---

## Updating a Validator Node

As a decentralized network, every update to NEAR Protocol needs some coordination between end users, platforms, developers and validators. [`nearup`](https://github.com/near/nearup) provides scripts to launch NEAR Protocol `TestNet` and `BetaNet` nodes. Unless it is executed with the switch `--binary-path`, `nearup` will automatically update the local binaries if NEAR's boot nodes fork the network and change the genesis checksum.

For security-critical applications and for validators, `nearup` can run a locally compiled binary of [`nearcore`](https://github.com/nearprotocol/nearcore), but such updates have to be done manually. Since validators are responsible for creating new blocks, coordination in this process is necessary to avoid any network stall.

## NEAR Validator Channels

NEAR Protocol will communicate with validators using these channels:

1. **Runtime Alerts:** call-to-actions for technical teams if the network is stalling and there's the need to coordinate a manual node restart. Such messages begin with `[CODE_RED_BETANET]` or `[CODE_RED_TESTNET]`, and will be posted in the read-only Validator Announcement channel on [Discord](https://discord.gg/xsrHaCb). The same message may be repeated in other channels, to have higher outreach.
2. Technical troubleshooting in the Validator Channel on [Discord](https://discord.gg/ZMPr3VB).
3. New releases, technical support and bug tracking in the Github repos of [Stake Wars](https://github.com/nearprotocol/stakewars/issues) and [`nearcore`](https://github.com/nearprotocol/nearcore/issues).

We may issue a `[CODE_YELLOW_BETANET]` or `[CODE_YELLOW_TESTNET]` if the network is suffering minor issues, or a new software release introduces incompatibilities and requires additional testing.

NEAR's team will be mostly active on Github, and with limited participation on Discord and Telegram.


## Planned Updates

NEAR merges node updates from [nearcore releases](https://github.com/nearprotocol/nearcore/releases) as follows:
- `BetaNet` every Monday at 00:00 UTC. The release tag is mapped with `x.y.z-beta`
- `TestNet` every Monday at 00:00 UTC. The release tag is mapped with `x.y.z-rc`
- `MainNet` is not yet subject to planned releases

Once `MainNet: Restricted` is live, planned updates to `TestNet` and `MainNet` will come via coordination with validators.

<blockquote class="warning">
<strong>heads up</strong><br><br>

`BetaNet` provides cutting-edge testing grounds for validators, with weekly updates and frequent hard-forks. `BetaNet` is using the `beta` branch of `nearcore`, which is merged every Wednesday at 00:00 UTC and deployed on NEAR boot nodes shortly after. `BetaNet` is also the network used for Stake Wars.

</blockquote>


## Emergency Updates

NEAR Protocol team will use the tag `[CODE_RED_BETANET]` or `[CODE_RED_TESTNET]` in the Validator Announcement channel on [Discord](https://discord.gg/xsrHaCb), followed by email instructions for coordination. Some updates may follow a confidential process, as explained on [nearcore/SECURITY.md](https://github.com/nearprotocol/nearcore/blob/master/SECURITY.md) docs.
Follow the [Stake Wars](https://near.org/stakewars) if you want to participate in fire-drills and test your playbook for emergency updates.

