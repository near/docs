---
id: validator-faq
title: Validator FAQ
sidebar_label: Validator FAQ
---

### What is a validator?

We use validator as the name for nodes that are engaged in building and maintaining the network. There are three different roles validators are automatically selected to. Block producer, Chunk-Block producer, and fishermen or validators. The block producer is responsible for creating and broadcasting the block that contains all the current chunks (shard blocks). In comparison, the chunk producer collects transactions for the given shard. The collection of transactions for the shard is called a chunk. Once a chunk and a block is created, the information has to be communicated to other chunk producers, fisherman and other validator nodes on the network. Fisherman and other validator nodes provide security by verifying the validity of state transitions in different blocks.

### How do I become a validator?

You need an account with sufficient amount of funds.
Follow the docs [here](/docs/validator/staking) to understand how to become a validator, and [here](/docs/local-setup/running-testnet) to run a node.

More specific steps:
1. Create a new key pair that will be used for staking for given account, and load it with the funds you want to put at stake
2. Start a node with the new key pair stored in `validator_key.json`
3. Send a staking transaction using your wallet / CLI with your account including amount and public key from newly generated key pair.
4. Wait until the node becomes a validator

### What is 'staking'?

We call staking a process of sending `StakeTransaction` that informs the network that a given account wants to become a validator in upcoming epochs. This particular type of transaction must provide a public key and staking amount. After the transaction is sent, a node that has a private key associated with the public key in the staking transaction must wait until two epochs to become a validator. 
**important**: a node can become a validator only if the amount in the staking transaction is above the seat price defined by the protocol.

### What is an Epoch?

An epoch is the interval of time that consists of a fixed number of consensus rounds. Currently, one epoch lasts for about the duration of half a day and is used to
- Measure the performance and uptime of validators
- Collect the bids from new validators

For one epoch, validators are randomly assigned into shards. After the epoch is over, validators are reshuffled and assigned to different shards.
Validators participate in several validation rounds within the epoch. For each round, one of the validators in each shard is chosen to be the chunk producer and one validator is chosen of the entire set of validators to be the block producer.

### What is a minimum amount to stake as a validator?

On the MainNet, the minimum amount is dynamic, and is defined by the amount of NEAR tokens put at stake by other validators.

### What is a slashing behavior?

In order to secure its Proof-of-Stake network, NEAR protocol punish the validators that commit invalid state transitions. An example is signing two blocks with the same height (this is also defined as 'equivocation'). When this happens, the validator's stake is progressively destroyed, or 'slashed', based on the entity of the attack.

### Is NEAR enforcing liveness fault slashing?

No. However, the protocol measures the uptime of each validator, and if the generated blocks are less than 90% of expected, the node will be kicked-out and lose its seat. In this case, a validator can re-stake after two epochs, and begin to sign blocks again after three epochs.

### What are the responsibilities of a validator?

High level, validators must run node and be mostly online. However, it's very important to keep private keys safe, otherwise adversaries might use them to sign malicious blocks, and trigger the protocol slashing.

### Is NEAR enforcing liveness fault slashing?

No. However, the protocol measures the uptime of each validator, and if the generated blocks are less than 90% of expected, the node will be kicked out and lose its seat. In this case, a validator can re-stake after two epochs, and begin to sign blocks again after three epochs.

### Can I stake on a different shard?

There's no way for a validator to decide the shard. The protocol randomically assigns validators to shards at the beginning of each epoch, and the node has one epoch to download its state. NEAR nodes have an automatic 'garbage collection' routine that deletes the state of previous shards after five epochs, to free up unused storage.
Large validators will have to generate blocks signing across multiple shards, therefore it's important to size server and networking accordingly.

### How do I run a node?

Follow [this tutorial.](local-setup/running-testnet.md)

### Do validators receive incentives for testing the protocol?

We don’t offer rewards to validators at this point in time. However, we may offer bounties for reporting critical bugs or valuable contributions to the codebase on [GitHub](https://github.com/nearprotocol/stakex). Just keep an eye for all the “good first issue” posts. In the meantime, join the [Telegram Validator Channel](https://t.me/near_validators) to be constantly updated, and be the first to know if we plan to offer incentives in the future. 

### How does delegating staking works?

NEAR doesn’t implement delegation on the protocol level.
Instead NEAR allows smart contracts to stake, because in NEAR contracts and accounts are the same.

Thus, if validators want to accept delegated stake, they must deploy a contract with specific rules of how delegation and reward splitting works and advertise that contract as destination to delegate.

### Where can I find the neardev/ folder?

Once you run 'near login', a folder, called 'neardev', will be created in the directory in which you ran 'near login'.

### Why did my node get kicked-out of the validation process on TestNet?

Considering that you are running testnet, you might be kicked out because your node is not producing enough blocks. Please try again or open an issue on [GitHub](https://github.com/nearprotocol/stakex) if you are experiencing reoccurring issues. 

Please note that sometimes we had to reset the TestNet, and nodes might need to be reinstalled to work properly. We normally announce these updates in our official [Telegram Validator channel](https://t.me/near_validators) and [Github](https://github.com/nearprotocol/stakex).

### After logging into the shell with 'near login', I always receive an error message “Exceeded 10 status check attempts.” How should I solve this?

This means that something is broken in the wallet, please reach out to us on Discord for troubleshooting.
