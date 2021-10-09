---
id: node-community-updates
title: Node Community Requests and Community Updates
sidebar_label: Node Community Requests and Updates
description: NEAR Node and Validator Feature Request Process and Community Updates
---


<blockquote class="info">
<strong>Did You Know?</strong><br /><br />

As a node operator, you are welcome to create feature requests and submit bug reports on [Github](https://github.com/near/nearcore/issues) to improve the experience of running a node. Head to [`nearcore`](https://github.com/near/nearcore/issues) repository on Github to open an issue, and don't forget to tag the issue with the `nodeX` tag to indicate that this issue is related to `Node Experience`.

</blockquote>


## Feature Request and Bug Report {#feature-request-and-bug-report}

The NEAR team is actively solicitating feedback from the Node and Validator Community, and offers a process for the community to engage in feature / enhancement requests and to submit bug reports. Besides the existing NEAR Validator channels, the NEAR team is introducing a formal process for feature requests and bug reports.

With respect to the experience of operating a NEAR node, all bugs and feature enhancements are publicly tracked in the Github project tracker [`Node Experience`](https://github.com/orgs/near/projects/18). Node operators are welcome to create new issues for features and bugs, and to add these issues into the [Github project tracker](https://github.com/orgs/near/projects/18).

- **New feature / Enhancement request:**
  - Please create a [`Github issue`](https://github.com/near/nearcore/issues)
  - Tag `T-nodeX`
  - The issue will be reviewed and filtered through `Incoming Requests` column in the Github project [`Node Experience`](https://github.com/orgs/near/projects/18), where they will be groomed and slated for development based on priority

- **Bug report:**
  - Please create a [`Github issue`](https://github.com/near/nearcore/issues)
  - Tag `T-nodeX` and `C-bug`
  - The issue will be reviewed and filtered through `Incoming Requests` column for more immediate attention in the Github project tracker [`Node Experience`](https://github.com/orgs/near/projects/18)


---

## NEAR Node Community Channels {#near-node-community-channels}

NEAR Protocol will communicate with validators using these channels:

1. Releases of `nearcore` are on Github repository of [`nearcore`](https://github.com/near/nearcore/issues). Releases are announced on [Discord](https://discord.gg/ZMPr3VB), [Telegram](https://t.me/near_validators), [Twitter](https://twitter.com/NEARChainStatus), and by email.

2. Technical support and troubleshooting by the NEAR team are available in the Validator Channels on [Discord](https://discord.gg/ZMPr3VB) and on [Telegram](https://t.me/near_validators).

3. Discussions on upcoming changes and early ideation are on [gov.near.org](https://gov.near.org/c/staking-delegation/5).

---

## Runtime Alerts: {#runtime-alerts}

To keep our network healthy and minimize the damage of potential incidents, the NEAR team would like to establish a process with which we communicate updates and emergency situations with validators so that they can respond promptly to properly sustain the operations of the network. To this end, we propose that we use different tags in important messages to validators so that they can be easily picked up by automated systems on validators’ end.

The tags we propose are as follows:

`[CODE_RED_<network_id>]` where `<network_id>` is either `MAINNET` or `TESTNET`. This represents the most dire and urgent situation. Usually it means that the network has stalled or crashed and we need validators to take **immediate** actions to bring the network up. Alternatively it could mean that we discovered some highly critical security vulnerabilities and a patch is needed as soon as possible. If it is about mainnet, we expect that validators will react immediately to such alerts, ideally within 30 minutes.

`[CODE_YELLOW_<network_id>]` where `<network_id>` is either `MAINNET` or `TESTNET`. This represents a less urgent announcement. Usually it means the release of a protocol change or a fix of a moderate security issue. In such cases, validators are not expected to take immediate actions but are still expected to react within days.

`[CODE_GREEN_<network_id>]` where `<network_id>` is either `MAINNET` or `TESTNET`. This usually means some general announcement that is more informational or doesn’t require actions within a short period of time. It could be an announcement of a release that improves performance or a fix some minor issues.

Call-to-actions for technical teams if the network is stalling and there's the need to coordinate a manual node restart. Such messages begin with `[CODE_RED_BETANET]` or `[CODE_RED_TESTNET]`, and will be posted in the read-only Validator Announcement channel on [Discord](https://discord.gg/xsrHaCb). The same message may be repeated in other channels, to have higher outreach.

>Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol">
  <h8>Ask it on StackOverflow!</h8></a>
