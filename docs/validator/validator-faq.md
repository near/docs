---
id: validator-faq
title: Validator FAQ
sidebar_label: Validator FAQ
---

## What is a validator?

We use validator as the name for nodes that are engaged in building and maintaining the network. There are three different roles validators are automatically selected to do:
Block Producers - single blocks + chunks
Block producer - produces a single block that contains all the current chunks (shard blocks).
Chunk producer - collect transactions for given shard and produces shard blocks, communicating it to other chunk producer, fisherman and other nodes on the network.
Fisherman (or validator) - nodes that provide security by verifying the validity of state transitions in different blocks.

## How do I become a validator?

You need an account with sufficient amount of funds in the wallet.
You can follow docs [here](local-setup/running-testnet.md) how to become validators

Specific steps:
Create new key pair that will be used for staking for given account, and load it with the funds you want to put at stake
Start a node with the new key pair stored in validator_key.json
Send a staking transaction using your wallet / CLI with your account including amount and public key from newly generated key pair.
Wait until node becomes a validator

## What is 'staking'?

We call staking a process of sending StakeTransaction that inform the network that given account wants to become a validator in upcoming epochs. This particular type of transaction must provide a public key and staking amount.
After the transaction is sent, a node that has a private key associated with the public key in the staking transaction must wait until the next epoch to become validator. **important**: a node can become a validator only if the amount in the staking transaction is above the seat price defined by the protocol.

## What is a minimum amount to stake as a validator?

Near, Inc. has staked 20 NEAR, so staking 10 NEAR should be enough to become a validator on the TestNet. On the MainNet, the minimum amount is dynamic, and is defined by the amount of NEAR tokens put at stake by other validators.

## What is 'slashing'?

In order to secure its Proof-of-Stake network, NEAR protocol punish the validators that sign two blocks with the same height (this is also defined as 'equivocation'). When this happens, the validator's funds at stake are destroyed, or 'slashed'.

## Is NEAR enforcing liveness fault slashing?

No. However, the protocol measures the uptime of each validator, and if the generated blocks are less than 90% of expected, the node will be kicked-out and lose its seat. In this case, a validator can re-stake after two epochs, and begin to sign blocks again after three epochs.

## What is an Epoch?

Epochs represent the interval of time (on the MainNet 12 hours) used by the protocol to:
- Measure the performance and uptime of validators
- Collect the bids from new validators

## What are the responsibilities of a validator?

High level, validators must run node and be mostly online. However, it's very important to keep private keys safe, otherwise adversaries might use them to sign malicious blocks, and trigger the protocol slashing.

## Can I stake on a different shard?

There's no way for a validator to decide the shard. The protocol randomically assigns validators to shards at the beginning of each epoch, and the node has one epoch to download its state. NEAR nodes have an automatic 'garbage collection' routine that deletes the state of previous shards after three epochs, to free up unused storage.
Large validators will have to generate blocks signing across multiple shards, therefore it's important to size server and networking accordingly.

## How do I run a node?

Follow [this tutorial.](local-setup/running-testnet.md)

## Do validators receive incentives for testing the protocol?

During this TestNet phase, validators will all be treated the same, to give everyone a chance to participate. Please DM the community managers from the Near team, and they will alert you when NEAR is ready to enroll validators for the MainNet launch.
Alternatively, you can fill [this form](https://forms.gle/51DTmjQpacArnk2x7) and you will be contacted by the team for an interview.

## How does delegating staking works?

NEAR doesn’t implement delegation on the protocol level.
Instead NEAR allows smart contracts to stake, because in NEAR contracts and accounts are the same.

Thus, if validators want to accept delegated stake, they must deploy a contract with specific rules of how delegation and reward splitting works and advertise that contract as destination to delegate.

## Where can I find the neardev/ folder?

Once you run 'near login', a folder, called 'neardev', will be created in the directory in which you ran 'near login'.

## Why did my node got kicked-out of the validation process on TestNet?

You might be kicked out because your node is not producing enough blocks. Please try again or open an issue on GitHub if you are experiencing reoccurring issues. Please note that sometimes we had to reset the TestNet, and nodes might need to be reinstalled to work properly.

## After logging into the shell with 'near login', I always receive an error message “Exceeded 10 status check attempts.” How should I solve this?

This means that something is broken in the wallet, please reach out to us on Discord for troubleshooting.
