---
id: node-data-snapshots
title: Node Data Snapshots
sidebar_label: Node Data Snapshots
description: Node Data Snapshots
---


Before you start running a node, you must first sync with the network. This means your node needs to download all the headers and blocks that other nodes in the network already have. You can speed up this process by downloading the latest data snapshots from a public S3 bucket.

Here are the available snapshots based on node type and network.

| Node Type and Network| S3 URL                                                                                         |
| -------------------- | ----------------------------------------------------------------------------------------       |
| RPC testnet          | https://near-protocol-public.s3-accelerate.amazonaws.com/backups/testnet/rpc/data.tar          |
| RPC mainnet          | https://near-protocol-public.s3-accelerate.amazonaws.com/backups/mainnet/rpc/data.tar          |
| Archival testnet     | https://near-protocol-public.s3-accelerate.amazonaws.com/backups/testnet/archive/data.tar      |
| Archival mainnet     | https://near-protocol-public.s3-accelerate.amazonaws.com/backups/mainnet/archive/data.tar      |


----

If you've [initialized the working directory for your node](/docs/develop/node/validator/compile-and-run-a-node#3-initialize-working-directory-1) without passing in a preferred location, the default working directory for your node is `~/.near`. It is recommended that you wget and untar into a `data` folder under `~/.near/`. The new `~/.near/data` is where your node will store historical states and write its state. To use the default location, run the following commands:

```bash
$ wget ~/.near/data.tar https://near-protocol-public.s3.ca-central-1.amazonaws.com/backups/{mainnet|testnet}/{rpc|archive}/data.tar
$ tar -xf ~/.near/data.tar
$ rm ~/.near/data.tar
```





>Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol">
  <h8>Ask it on StackOverflow!</h8></a>
