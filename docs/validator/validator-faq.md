---
id: validator-faq
title: FAQ
sidebar_label: FAQ
---

## What is a validator?

We use validator as the name for nodes that are engaged in building and maintaining the network. There are three different roles validators are automatically selected to do:
Block Producers - single blocks + chunks
Block producer - produces a single block that contains all the current chunks (shard blocks).
Chunk producer - collect transactions for given shard and produces shard blocks, communicating it to other chunk producer, fisherman and other nodes on the network.
Fisherman (or validator) - nodes that provide security by verifying the validity of state transitions in different blocks.
 
## How do I become a validator?

If you already have an account with sufficient amount of funds.
You can follow docs [here](local-setup/running-testnet.md) how to become validators

Specific steps:
Create new key pair that will be used for staking for given account
Start a node with this key pair in validator_key.json
Send a staking transaction using your wallet / CLI with your account including amount and public key from newly generated key pair.
Wait until node becomes a validator
 
## What is 'staking'?

We call staking a process of sending StakeTransaction that inform the network that given account wants to become a validator in upcoming epochs. This transaction must provide a public key and staking amount.
After this, a node that has a private key associated with the public key in the staking transaction must wait until epoch change to become validator if the staking amount is above the seat price.

## What are the responsibilities of a validator?

High level, validator must run node and be mostly online. If node is offline more than 10%, they will be removed from validator pool.
As described above, in different roles of validators - the node running will be automatically selected to be one of the roles and perform it.

## How do I run a node?

Follow [this tutorial.](local-setup/running-testnet.md)

## Do validators receive varying incentives?

At this stage the benefits for validators will be the same for everybody, to give everyone a chance to participate. But you can DM someone from the Near team on Telegram or on Discord and they will let you know when the project is looking for validators.

## How does delegating staking works?

NEAR doesn’t implement delegation on the protocol level.
Instead NEAR allows smart contracts to stake, because in NEAR contracts and accounts are the same.

Thus, if validators want to accept delegated stake, they must deploy a contract with specific rules of how delegation and reward splitting works and advertise that contract as destination to delegate.
 
## What are the slashing conditions?

The only slashing conditions is signing two blocks at the same height.
