---
id: maintenance
title: Node Maintenance
sidebar_label: Node Maintenance
description: NEAR Node Maintenance and Network Updates
---

## Updating a Node

As a decentralized network, every update to NEAR Protocol needs some coordination between end users, platforms, developers, and validators. [`nearup`](https://github.com/near/nearup) provides scripts to launch NEAR Protocol `testnet` and `betanet` nodes. Unless it is executed with the switch `--binary-path`, `nearup` will automatically update the local binaries if NEAR's boot nodes fork the network and change the genesis checksum.

For security-critical applications and for validators, `nearup` can run a locally compiled binary of [`nearcore`](https://github.com/near/nearcore), but such updates have to be done manually. Since validators are responsible for creating new blocks, coordination in this process is necessary to avoid any network stall.


## Planned Updates

NEAR merges node updates from [nearcore releases](https://github.com/near/nearcore/releases) as follows:
- `betanet` every Monday at 00:00 UTC. The release tag is mapped with `x.y.z-beta`
- `testnet` every Monday at 00:00 UTC. The release tag is mapped with `x.y.z-rc`
- `mainnet` is not yet subject to planned releases

Once `mainnet: Restricted` is live, planned updates to `testnet` and `mainnet` will come via coordination with validators.

<blockquote class="warning">
<strong>Heads up</strong><br><br>

`betanet` provides cutting-edge testing grounds for validators, with weekly updates and frequent hard-forks. `betanet` is using the `beta` branch of `nearcore`, which is merged every Wednesday at 00:00 UTC and deployed on NEAR boot nodes shortly after.
</blockquote>


## Emergency Updates

We may issue a `[CODE_YELLOW_TESTNET]` or `[CODE_YELLOW_MAINNET]` if the network is suffering minor issues, or a new software release introduces incompatibilities and requires additional testing.

NEAR Protocol team will use the tag `[CODE_RED_TESTNET]` or `[CODE_RED_MAINNET]` in the Validator Announcement channel on [Discord](https://discord.gg/xsrHaCb), followed by email instructions for coordination. Some updates may follow a confidential process, as explained on [nearcore/SECURITY.md](https://github.com/near/nearcore/blob/master/SECURITY.md) docs.

NEAR's team will be mostly active on [Github](https://github.com/near/nearcore), and with limited participation on Discord and Telegram.
