---
id: nightshade
title: Nightshade Paper (Consensus)
sidebar_label: Nightshade Paper (Consensus)
---

## [Here is the full paper.](https://nearprotocol.com/downloads/Nightshade.pdf)

Nightshade has been published by Alex Skidanov and Illia Polosukhin in July 2019. The paper outlines the consens mechanism and security considerations. We recommend you to take the time and read the full paper. 

Alternatively, you can get a glimpse of the information provided through the summary below.

## TLDR Background Information 

### Security overview in blockchain architecture
A blockchain consists of several datablocks, appended in a sequential order. Each data block records several transactions between nodes in the network. Validators are required to verify the validity of transactions and to produce blocks. In early blockchain designs, all validators in the network had to verify all transactions. This results in high confirmation times and high gas costs; the transaction fees payable by nodes to miners/verifiers.  

Two main proposals have been made to solve the blockchain scalability issue:
* Instead of requiring all nodes to verify all transactions, the processing is delegated to a small set of power nodes. This increases centralisation and nodes are still bounded to the processing power of a single machine. Designs have been proposed by Algorand, SpaceMesh and Thunder.
* Let every node in the network process a subsection of transactions. The allocation of tasks, such as proposing blocks, verifying transactions, or providing storage, may be split up across the network in a process called sharding. The ETH foundation and several other projects plan to scale their network via sharding.

### What is sharding
In its simplest form, sharding results in splitting up the processing load of one blockchain across many. Several blockchains could run in parallel and be considered shards. However, this results in various challenges, such as fostering reliable communication between separate chains. In simplistic designs, each blockchain would have no way of verifying the security of the other chains, and the security of one chain would become diluted across many through an uneven distribution of validators. 

Additional challenges in sharded blockchain:
* Process of distributing validators across shards. This usually requires verifiable randomness;
* Secure communication between shards;
* Receiving updates between shards and snapshots of their current state.

Many protocols implement a Beacon chain to support these processes. In that case, the network will have one main chain. Such chain is called a Beacon chain in Ethereum, a Relay chain in PolkaDot, and the Cosmos Hub in Cosmos. Each will have several shards attached as sidechains. 

Validating transactions, relaying blocks to other nodes and storing the growing state and history of the entire ledger results in a constantly growing need for more compute power, bandwidth, and storage space. For a detailed outline of the challenges in decentralised sharded ledgers, in particular cross-shard communication, please refer to the full paper.

### State validity and data availability
A sharded ledger does not allow for all network participants to download the history of every shard. Instead, nodes may rotate across shards and sign blocks. A BFT based consensus mechanism would require an honest majority of  ⅔  of validator nodes. If the majority of validators signed the current block; the naive solution would be to assume that this block is valid. However, this ignores the likelihood of validators becoming bribed, compromised, or behaving maliciously. In cross-shard communication, other shards will not be able to tell the difference between a valid block built on invalid blocks vs. built on valid blocks. A promising idea, outlining how to resolve this issue, is provided in section 2.2 to 2.4. in the paper. 

Lastly, nodes have to be able to verify whether a block is available once it is published. A block might have been published but cannot be downloaded by other nodes. In that case, the block cannot be validated. One proposed idea is to have so-called Notaries that rotate between shards more often than validators whose only job is to download a block and attest to the fact that they were able to download it. They can be rotated more frequently because they don’t need to download the entire state of the shard, unlike the validators who cannot be rotated frequently since they must download the state of the shard each time they rotate. 

Proofs on whether a block is available are especially important for light clients, which, unlike full nodes, do not download the entire state of the blockchain. Polkadot, Ethereum Serenity, and NEAR have designs around this idea that provide a way for light nodes to be reasonably confident the blocks are available. The latter design is outlined below.

## TLDR Nightshade
Nightshade models the system as a single blockchain, in which each block logically contains all the transactions for all the shards. The current design will have n = 1000 shards. However, none of the nodes will download the full state of the full logical block. Instead, each participant of the network only maintains the state that corresponds to the shards that they validate transactions for, and the list of all the transactions in the block is split into physical chunks, one chunk per shard. All chunks accumulate to one block. Note that chunks can only be validated by nodes that maintain the state of that shard.

The consensus is based on the heaviest chain consensus. Meaning, once a block producer publishes a block, they collect the signatures of validator nodes. The weight of a block is then the cumulative stake of all the signers whose signatures are included in the block. The weight of a chain is the sum of the block weights. Additionally, the consensus utilises a finality gadget that introduces additional slashing conditions for higher chain security. Read more on this in section 3.2.

#### Nodes are divided into the following roles:
* Chunk producers: Participants with the largest stakes; download state of the shard they are assigned to before an epoch (set time) and collects transactions throughout that epoch and apply them to the state. The list of transactions per shard accumulate into one chunk. 
* Block producer - produces a single block that contains all the current chunks (shard blocks).
* Fishermen: Able to challenge the state of any shard for a certain window of time. Read more on the state validity challenge in section 3.7.1.
Block producers and validators only process blocks, once they have the one part message for each chunk.

To ensure data availability, Nightshade utilises erasure coding in a similar approach as implemented by Polkadot. Once a block producer produces the next chunk, they send an erasure coded version of it to all other block producers. All the parts are represented in a Merkle tree, whereby the merkle root of the tree is the header of the chunk. Read more on this in section 3.4.

To communicate between shards, the shard that generated the transaction will share it with the next shard. Once the transaction is included in the next chunk, it will generate a receipt. The receipt is routed to the shard and included into the next chunk. If it requires more shards to process the transaction, a new receipt is generated from the previously included receipt, sent to the next shard and appended to the chunk. This process may continue. To read more on receipt transactions, please refer to section 3.6 in the paper. Receipts are directly included into the destination shard after the transaction has been included into the source shard. The destination shard will not wait until a challenge period is over. Instead, the destination will be rolled back together with the source shard if later the originating chunk or block was found to be invalid.

To corrupt a shard, an adversary would have to compromise all shards associated to the transactions in the target shard. Considering the amount of value at stake in a decentralised network, this may still be possible. Thus, for additional security measures, validator nodes are assigned anonymously to shards via a VRF (verifiable random function). Read more on this in section 3.7.3 to 3.7.5 of the paper.  An adversary would have to broadcast their intent to compromise a shard to the entire network, allowing honest validators to jump in and flag its invalid state.

To communicate between other chains, namely the Ethereum blockchain, blocks may periodically include a Schnorr multisignature. To sync with the Near chain one only needs to download all the snapshot blocks and confirm that the Schnorr signatures are correct (optionally also verifying the individual BLS signatures of the validators), and then only syncing main chain blocks from the last snapshot block.
