---
id: maintenance
title: Validator Node Maintenance
sidebar_label: Node Maintenance
---

## Updating a Validator Node

NEAR is an evolving protocol, with the software running on its nodes that will change over time. As a decentralized network, NEAR needs coordination between end-users, platforms, developers and validators. More specifically, the role of a validator is to create new blocks, so every update needs coordination with other validators to avoid any stall of the network.

Consider this document a constant work in progress, and use it for a better coordination with other validators and the network in general.


## Official Communication Channels

Every validator must follow the conversation on NEAR Protocol community channels. These channels are divided into four classes:

1. **Fire Alerts in the channel `#community-validator-announcement` on [Slack](https://near.chat)**
2. Technical Troubleshooting on `#community-validator-troubleshooting` on [Slack](https://near.chat), [Telegram](https://t.me/near_validators), and [Discord](https://discord.gg/ZMPr3VB)
3. Community Discussion on [Telegram](https://t.me/near_validators) and [Discord](https://discord.gg/ZMPr3VB)
4. Technical Support and Bug Tracking in the Nearcore repo on [GitHub](https://github.com/nearprotocol/nearcore/issues)

The team will be mostly available on Slack and Github, with limited participation on Telegram and Discord.


## Planned Updates

NEAR merges node updates for [nearcore](https://github.com/nearprotocol/nearcore) as follows:
- DevNet as needed, from `main` branch, with a features freeze on (Tuesday at 00:00 UTC)
- BetaNet every Wednesday at 00:00 UTC (merging some or all DevNet new features) from `beta` branch
- TestNet every first Monday of the month at 00:00 UTC (merging BetaNet new features) from `stable` branch
- MainNet via voting (merging TestNet new features) from the previous `stable` branch

<blockquote class="warning">
<strong>heads up</strong><br><br>

Your best testing grounds are BetaNet, where we update and hard fork the network every week. Technically, we merge the new release of nearcore into beta branch every Tuesday at 00:00 UTC, we run it for 24 hours on DevNet, and then we deploy it on BetaNet, on Wednesday at 00:00 UTC.
In case critical issues emerge during DevNet testing, the Core team will rollback the release, but will hard fork BetaNet anyway.

</blockquote>


## Emergency Updates

In case of critical issues, MainNet may need an emergency update via hard fork, with an accelerated schedule to merge from DevNet to MainNet. At the current stage, with MainNet under PoA, the process is handled entirely by NEAR core team, with a rotation of developers on duty 24/7.
The network will not transition to MainNet Restricted until an emergency update process has been defined together with validators, and tested multiple times.

