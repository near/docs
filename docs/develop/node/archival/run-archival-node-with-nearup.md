---
id: run-archival-node-with-nearup
title: Run an Archival Node with nearup
sidebar_label: Run a Node with nearup
description:  How to run an Archival Node with nearup
---


<blockquote class="info">
<strong>Heads up</strong><br><br>

Running an archival node is very similar to running a [validator node](/docs/develop/node/validator/running-a-node) as both types of node use the same `nearcore` release. The main difference for running an archival node is a modification to the `config.json` by changing `archive` to `true`. See below for more details.

</blockquote>


## Prerequisites

- [Git](https://git-scm.com/)
- [Nearup](https://github.com/near/nearup): Make sure [`nearup`](https://github.com/near/nearup) is installed. You can install `nearup` by following the instructions at https://github.com/near/nearup.

---

### Steps to Run an Archival Node using `nearup`



First, retrieve a copy of the latest archival snapshot from S3:
```bash
  $ wget -b https://near-protocol-public.s3.ca-central-1.amazonaws.com/backups/{testnet|mainnet}/archive/data.tar
```


### Configuration Update

Running an archival node is the same as a [validator node](/docs/develop/node/validator/running-a-node) as both types of node use the same `nearcore` release. The main difference for running an archival node is a modification to the `config.json` by changing `archive` to `true`.

The `config.json` should contain the following fields. Currently, NEAR testnet and mainnet have only 1 (indexed [0]) shard and that shard is tracked. In the future, there will be the possibility to track different or multiple shards.

```
{
  ...
  "archive": true,
  "tracked_shards": [0],
  ...
}
```

Please make sure that the node is stopped while changing the `config.json`.

Once the config has been changed, you can restart the node and the node will start syncing new archival data. In the case where you want the full archival history, you can delete the data dir and start the node from scratch syncing full history or use one of the latest backups containing the data directory snapshot which can be copied under the near home dir (default: ~/.near/data).



Then run:
```bash
  $ nearup run testnet
```
Wait until initialization finishes, use the following command to follow logs:
```bash
  $ nearup logs --follow
```
Then run:
```bash
  $ nearup stop
```
```bash
  $ tar -xvf data.tar -C ~/.near/testnet/data
```
Finally, run the following command and the node should start syncing headers at ~97%:
```bash
  $ nearup run testnet
```

>Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol">
  <h8>Ask it on StackOverflow!</h8></a>
