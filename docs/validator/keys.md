---
id: keys
title: Keys on the NEAR Platform
sidebar_label: Understanding Keys
---

## what are keys?

In public key cryptography we need a key pair, one public and one private, to sign and send verifiable transactions across the network.  NEAR takes the common approach of using public keys for identity and private keys for signatures. Internally the NEAR platform uses ed25519, one of several "elliptic curves" that produce secure cryptographic results quicky. Specifically, we use `tweetnacl` in JavaScript and `libsodium` in Rust.

## are there different kinds of keys?

There are 3 types of key pairs on the NEAR platform

- signer keys (aka. account keys, access keys, etc)
- validator keys
- node keys

**Signer keys** are the ones we all know and love.  They're used by all accounts on the network to sign transactions like `sendMoney` and `stake` before sending them to the network.  Signer keys are not related to running a node in any way.  End users who sign up through the [NEAR Wallet](https://wallet.nearprotocol.com/) get their own signer keys, for example. These are the keys that humans think about and keep safe.

There are two flavors of signer keys currently available, `FullAccess` keys and `FunctionCall` keys.  The first has unrestricted control to "act on behalf of an account" (as used by NEAR Shell and NEAR Wallet to get things done for you).  The second is limited to contract storage and compute.  Both flavors of keys can be revoked by the account holder.  There is no limit to the flavors of keys that the NEAR platform can handle so we can easily imagine keys for voting, shopping, conducting official business, etc. each with their own access controls on our data, programmable time limits, etc. But keep in mind that you do have to pay rent on keys issued to your account.

**Validator keys** are used by validators (people and companies who are committed to maintaining the integrity of the system) to support their work of validating blocks and chunks on the network, nothing more. The human validators don't think about these keys beyond creating them and resetting them. Once added to a validator's node, validator keys are used by the node to do their thing of validating blocks and chunks.  As a convenience to validators, validator keys are currently produced by a script at node startup if they don't already exist (in the case of NEAR Stake Wars, the `start_stakewars.py` script) but this may change.

**Node keys** are something no humans on the network think about except core contributors to the platform.  These keys are used internally by a node to sign low-level communications with other nodes in the network like sending block headers or making other verifiable requests.  Node keys are currently provided to a node at startup by a script.  In the case of NEAR Stake Wars it's the `start_stakewars.py` script that produces these keys for now, but this may change.

## can keys be changed?

Yes, but only in that keys can be *reset* (ie. regenerated as a new key pair). If a private key is lost or compromised somehow then a new key pair must be generated.  This is just the nature of secure keys.

**Signers** can create new keys and revoke existing keys at will. NEAR Wallet also supports key recovery via SMS or seed phrase which makes it convenient to move signer keys from one computer to another, for example.

**Validators** have the option to reset their validator keys at any time but it makes sense to avoid resetting validator keys while staking.  To reset their keys, a human validator stops their node, changes their validator key and restarts the node.  All new validator output will be signed by these new keys.

**Nodes** should not need to reset their node keys keys

<blockquote class="info">
<strong>did you know?</strong><br><br>

As a brief word on the NEAR runtime, the subsystem that manages state transitions on the blockchain (ie. keeping things moving from one block to the next), it's worth understanding that the movement of the system happens in stages, called epochs, during which the group of validators does not change. The [Nightshade whitepaper](http://near.ai/nightshade) introduces epochs this way: "the maintenance of the network is done in epochs, where an epoch is a period of time on the order of days."  and there's much more detail in the paper.

At the beginning of each epoch, some computation produces a list of validators for the very next epoch (not the one that just started).  The input to this computation includes all validators that have "raised their hand" to be a validator by staking some amount over the system's staking threshold. The output of this computation is a list of the validators for the very next epoch.

When a validator is elected during an epoch, they have the opportunity to stake (ie. put some skin in the game in the form of tokens) in support of their intent to "behave" while keeping their node running so others can rent storage and compute on it.  Any foul play on the part of the validator that is detected by the system may result is a slashing event where the validator is marked as out of integrity and forfeit their stake to be redistributed among other validators.

</blockquote>

<blockquote class="warning">
<strong>heads up</strong><br><br>

If validator keys are changed _during an epoch in which the validator is staking_, the validator's output will be rejected since their signature will not match (new keys).  This means the validator will, by the end of the epoch, not be able to meet the minimum validator output threshold and lose their position as a recognized validator.  Their stake will be returned to them.

</blockquote>

For concrete examples of keys being used as identifiers, you can see a list of validators and active nodes on various NEAR networks here:

- NEAR TestNet
  - https://rpc.nearprotocol.com/status
  - https://rpc.nearprotocol.com/network_info

- NEAR Stake Wars
  - https://rpc.tatooine.nearprotocol.com/status
  - https://rpc.tatooine.nearprotocol.com/network_info
