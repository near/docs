---
id: common-errors
title: Common Node Errors and Solutions
sidebar_label: Common Node Errors and Solutions
description: Common Node Errors and Solutions
---


***My node is looking for peers on guildnet, testnet, and mainnet. Why?***

This is a known logging issue. The node should find peers from the same chain. This prints as a warning message as the node checks for peers from the same chain.

***I don’t have the normal number of peers, and see missing blocks?***

Normally, a node should find 12 to 15 peers. If your node’s peer count is low and you see missing blocks, you may try restarting the node to reset your peers.

***My node does not have enough peers and some peers are down.***

Cause: My node has the average number of peers (12-15) and x number of peers are down (such during protocol upgrade when these nodes upgrade late and are kicked), the blocks can be missed.

Solution:
Restart your node and try to find new peers. A bad performing peer that is close to your node may cause your node to miss blocks. If a peer is malicious, you can consider using `“blacklist": [“KEY@IP:24567”]` in the `config.json` to ban the peer.


***My node cannot find any peers or has one peer.***

Cause 1: Depending on who the first peer is and if there are other peers close to them, the node is not able to find more peers.

Solution: This can be fixed by a restart of the node.

Cause 2: The bootnodes, defined in the `config.json` can be full and are not accept more connections.

Solution: You can potentially add any node into the `config.json` and use that node as a bootnode to find more peers.

Cause 3: Connected to a node that has just connected to the network and doesn’t have up-to-date peers.

Solution: Restart your node to find a different peer. You can potentially add any node into the config and use that node to find more peers.


***My node can't sync state or stuck in a sync state loop.***

Cause: Potentially use a wrong nearcore release.

Solution: Fix the nearcore release: https://github.com/near/nearcore/releases, and please also check the details on the node setup.

***My node is stuck on a block.***

Cause: This usually occurs in the beginning of an epoch, where the block processing time may increase.

Solution: Restarting the node usually improves the situation.

***My node shows "Mailbox closed" when the node crashes.***

Cause 1: Corrupt State

Solution: There is an issue with the DB. Download the latest snapshot and resync the node, or sync from your backup node if you have a backup node.

Cause 2: Block Height Mismatch

Solution: There is an issue with peers. The node has banned all the peers for a period of time, and is related to the peers not being properly terminated: https://github.com/near/nearcore/issues/5340. For the node operator, search in the log to see there is a thread panic.  If there’s panic, then store your DB from a snapshot. If there is no panic, restart your node.

Please report all mailbox related issues using Zendesk and add your log: https://near-node.zendesk.com/hc/en-us/requests/new.


***My node shows "Mailbox closed" when the node is running.***

Cause: Unclear

Solution: Restart the node.

***My node is banning peers for block height fraud.***

Cause: It’s possible that your peer network connection is slow or unstable or that the data center has an issue. The peers don’t send you block headers faster enough.

Solution: If your node is running fine, do nothing. Unless your peers are all banned, and go to the next issue.


***All your peers are banned because of block height fraud.***

Cause: It’s possible that your peer network connection is slow or unstable or that your datacenter has an issue. If you have 0 bps frequently, this usually indicates a connectivity issue.
The peers are not sending your node block headers faster enough. Your node can start banning your peers due to your node falling behind (not being synced).

Solution: Fix your network connection. In the `config.json`, you can change the `ban_window` to 1 second to avoid banning peers.

***If your node is yet not synced, and you’ve proposed and the node shows many different errors (DB not found, Mailbox closed etc).***

Cause: Your node is not synced. Please wait for the node to fully synced before proposing.

Solution: Be fully synced, Wait 2 epochs and then ping again.


***When the main node failsover to the backup node, the back node is having issues and is falling behind and missing all blocks.***

Cause: This issue happens frequently due to the config.json in the backup node isn’t set up properly.

Solution: The backup node should track all shards. The default config.json during initialization has `"tracked_shards": []`. Please update the `config.json` to include `"tracked_shards": [0]` in both the primary and backup node. You must make this update to both the primary node and backup node.


***My node sends many request and has memory usage spike.***

Cause: This is infrequently observed but sometimes happens. A node starts to send too many requests and causes memory usage spikes, then it is stuck after 10 minutes and runs out of memory.

Solution: Restart the node.

***What are the causes of a node’s corrupt state?***

- Late upgrade due to a different protocol version transition
- Incorrectly stopping the node. The node needs to write the latest updates to disk to keep DB in a consistent state.
- Bad snapshots: Please raise the issue on [Zendesk](https://near-node.zendesk.com/hc/en-us/requests/new) to alert us.
- DB migration known issue: If you stop the DB migration, the node will end up in a corrupt state.

***My node shows inconsistent DB State or DB Not Found.***

Cause: Inconsistent DB state, DB not found are usually related to corrupt state (see above).

Solution: Depending on the severity of issue, the node can be restarted to solve for an inconsistent state. If more severe, the node may have to download the latest snapshot and restart.


***My node is missed blocks in the beginning of epochs.***

Cause: Usually blocks can be missed in the beginning of epochs due to garbage collection. However, the node usually catches up during the epoch and is not kicked.

Solution: Waiting for the node to try to catch up. If you are kicked, then try to rejoin.

***What’s a typical incident recovery plan on mainnet with a primary validator node and a secondary node***

1. Copy over node_key.json to secondary node
2. Copy over validator_key.json to secondary node
3. Stop the primary node
4. Stop the secondary node
5. Restart the secondary node


***What happens in a typical validator / RPC node upgrade process?***

1. DB Migration (optional if the release contains a DB migration)
2. Finding Peers
3. Download Headers to 100%
4. State Sync
5. Download Blocks

***What happens in a typical archival node upgrade process?***

Since archival node needs all blocks, it will download blocks directly after downloading headers.

1. DB Migration (optional if the release contains a DB migration)
2. Finding Peers
3. Download Headers to 100%
4. Download Blocks


## Still seeing an issue with your node?
Please find a Bug Report on Zendesk, https://near-node.zendesk.com/hc/en-us/requests/new, to the NEAR team, and attach your logs.
