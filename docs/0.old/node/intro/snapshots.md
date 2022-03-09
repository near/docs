---
id: node-data-snapshots
title: Node Data Snapshots
sidebar_label: Node Data Snapshots
description: Node Data Snapshots
---


Before you start running a node, you must first sync with the network. This means your node needs to download all the headers and blocks that other nodes in the network already have. You can speed up this process by downloading the latest data snapshots from a public S3 bucket.

Here are the available snapshots directories based on node type and network. Please note that the snapshots are updated every 12 hours.


| Node Type and Network| S3 URL                                                                                         |
| -------------------- | ----------------------------------------------------------------------------------------       |
| RPC testnet          | https://near-protocol-public.s3-accelerate.amazonaws.com/backups/testnet/rpc/          |
| RPC mainnet          | https://near-protocol-public.s3-accelerate.amazonaws.com/backups/mainnet/rpc/          |
| Archival testnet     | https://near-protocol-public.s3-accelerate.amazonaws.com/backups/testnet/archive/      |
| Archival mainnet     | https://near-protocol-public.s3-accelerate.amazonaws.com/backups/mainnet/archive/      |


----

If you've [initialized the working directory for your node](/docs/develop/node/validator/compile-and-run-a-node#3-initialize-working-directory-1) without passing in a preferred location, the default working directory for your node is `~/.near`. It is recommended that you wget and untar into a `data` folder under `~/.near/`. The new `~/.near/data` is where your node will store historical states and write its state. To use the default location, run the following commands.

First, please install AWS CLI:
```bash
$ sudo apt-get install awscli -y
```

Then, download the snapshot using the AWS CLI:
```bash
$ aws s3 --no-sign-request cp s3://near-protocol-public/backups/{mainnet|testnet}/{rpc|archive}/latest .
$ LATEST=$(cat latest)
$ aws s3 --no-sign-request cp --no-sign-request --recursive s3://near-protocol-public/backups/{mainnet|testnet}/{rpc|archive}/$LATEST ~/.near/data
```

For a faster snapshot download speed, use s5cmd, the download accelerator for S3 written in Go. For download instruction, please see https://github.com/peak/s5cmd.

>Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol">
  <h8>Ask it on StackOverflow!</h8></a>
