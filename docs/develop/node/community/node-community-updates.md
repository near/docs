---
id: node-community-updates
title: Node Community Updates
sidebar_label: Node Community Updates
description: NEAR Node and Validator Community Updates
---

## NEAR Validator Community Channels

NEAR Protocol will communicate with validators using these channels:

1. Releases of `nearcore` are on Github repository of [`nearcore`](https://github.com/near/nearcore/issues).

2. Technical support and bug tracking are available on Github project tracker [`Node Experience`](https://github.com/orgs/near/projects/18). Node operators are welcome to create issues for new features and bugs, and add to this Github project tracker.
    - **New feature / Enhancement requests:**  
        - Please create a [`Github issue`](https://github.com/near/nearcore/issues)
        - Tag `nodeX`
        - Filter them through `Incoming Requests` column in the [`Node Experience`](https://github.com/orgs/near/projects/18) Github project tracker, where they will be groomed and moved into `Backlog` based on priority
    - **Bug reports:**
        - Please create a [`Github issue`](https://github.com/near/nearcore/issues)
        - Tag `nodeX` and `Bug`
        - Put it at the top of the `Incoming Requests` column for immediate attention. [`Node Experience`](https://github.com/orgs/near/projects/18) Github project tracker

3. Technical troubleshooting in the Validator Channel on [Discord](https://discord.gg/ZMPr3VB) and [Telegram](https://t.me/near_validators).

4. Discussions for upcoming changes and early ideation on [gov.near.org](https://gov.near.org/c/staking-delegation/5).



**Runtime Alerts:**

To keep our network healthy and minimize the damage of potential incidents, the NEAR team would like to establish a process with which we communicate updates and emergency situations with validators so that they can respond promptly to properly sustain the operations of the network. To this end, we propose that we use different tags in important messages to validators so that they can be easily picked up by automated systems on validators’ end.

The tags we propose are as follows:

`[CODE_RED_<network_id>]` where `<network_id>` is either `MAINNET` or `TESTNET`. This represents the most dire and urgent situation. Usually it means that the network has stalled or crashed and we need validators to take **immediate** actions to bring the network up. Alternatively it could mean that we discovered some highly critical security vulnerabilities and a patch is needed as soon as possible. If it is about mainnet, we expect that validators will react immediately to such alerts, ideally within 30 minutes.

`[CODE_YELLOW_<network_id>]` where `<network_id>` is either `MAINNET` or `TESTNET`. This represents a less urgent announcement. Usually it means the release of a protocol change or a fix of a moderate security issue. In such cases, validators are not expected to take immediate actions but are still expected to react within days.

`[CODE_GREEN_<network_id>]` where `<network_id>` is either `MAINNET` or `TESTNET`. This usually means some general announcement that is more informational or doesn’t require actions within a short period of time. It could be an announcement of a release that improves performance or a fix some minor issues.


Call-to-actions for technical teams if the network is stalling and there's the need to coordinate a manual node restart. Such messages begin with `[CODE_RED_BETANET]` or `[CODE_RED_TESTNET]`, and will be posted in the read-only Validator Announcement channel on [Discord](https://discord.gg/xsrHaCb). The same message may be repeated in other channels, to have higher outreach.
