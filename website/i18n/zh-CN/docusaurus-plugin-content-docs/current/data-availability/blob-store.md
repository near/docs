---
id: blob-contract
title: Blob Store Contract
---

This contract provides the store for arbitrary DA blobs. In practice, these "blobs" are sequencing data from rollups, but they can be any data.

***

NEAR blockchain state storage is pretty cheap. At the time of writing, 100KiB is a flat fee of 1NEAR.

To limit the costs of NEAR storage even more, we don't store the blob data in the blockchain state.

It works by taking advantage of NEAR consensus around receipts.
When a chunk producer processes a receipt, there is consensus around the receipt.
However, once the chunk has been processed and included in the block, the receipt is no longer required for consensus and can be pruned. The pruning time is at least 3 NEAR epochs, where each epoch is 12 hours; in practice, this is around five epochs.
Once the receipt has been pruned, it is the responsibility of archival nodes to retain the transaction data, and we can even get the data from indexers.

We can validate that the blob was retrieved from ecosystem actors in the format submitted by checking the blob commitment.
The blob commitment currently needs to be more efficient and will be improved, but it benefits us because anybody can build this with limited expertise and tooling.
It is created by taking a blob, chunking it into 256-byte pieces, and creating a Merkle tree, where each leaf is a Sha-256 hash of the shard.
The root of the Merkle tree is the blob commitment, which is provided as `[transaction_id ++ commitment]` to the L1 contract, which is 64 bytes.

What this means:

- consensus is provided around the submission of a blob by NEAR validators
- the function input data is stored by full nodes for at least three days
- archival nodes can store the data for longer
- we don't occupy consensus with more data than needs to be
- indexers can also be used, and this Data is currently indexed by all significant explorers in NEAR
- the commitment is available for a long time, and the commitment is straightforward to create
