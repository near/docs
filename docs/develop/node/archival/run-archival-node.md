---
id: run-archival-node
title: Run an Archival Node
sidebar_label: Run an Archival Node
description: Run an Archival Node
---

Running an archival node is the same as a [validator node](/docs/develop/node/validator/running-a-node) as both types of node use the same `nearcore` release. The key difference for running an archival node is a modification to the `config.json` by changing `archive` to `true`.

The `config.json` should contain the following fields. Currently, NEAR testnet and mainnet have only 1 (indexed [0]) shard and that shard is tracked. In the future, there will be the possibility to track different or multiple shards.

```
{
  ...
  "archive": true,
  ...
}
```

Please make sure that the node is stopped while changing the `config.json`.

Once the config has been changed, you can restart the node and the node will start syncing new archival data. In the case where you want the full archival history, you can delete the data dir and start the node from scratch syncing full history or use one of the latest backups containing the data directory snapshot which can be copied under the near home dir (default: ~/.near/data).

All archival data backups can be downloaded from the public S3 bucket, which contains latest daily snapshots:

| Network | URL                                                                                         |
| ------- | ------------------------------------------------------------------------------------------- |
| Mainnet | https://near-protocol-public.s3.ca-central-1.amazonaws.com/backups/mainnet/archive/data.tar |
| Testnet | https://near-protocol-public.s3.ca-central-1.amazonaws.com/backups/testnet/archive/data.tar |

---

## Steps to Run an Archival Node

Make sure [`nearup`](https://github.com/near/nearup) is installed. You can install `nearup` by following the instructions at https://github.com/near/nearup.

First, retrieve a copy of the latest archival snapshot from S3:
```bash
  $ wget -b https://near-protocol-public.s3.ca-central-1.amazonaws.com/backups/{testnet|mainnet}/archive/data.tar
```
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
