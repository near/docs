---
id: faq
title: Integrator FAQ
sidebar_label: Integrator FAQ
---

## Orientation

### What is a good project summary for NEAR?

NEAR is a sharded, public, proof-of-stake blockchain and smart contract platform. It is built in Rust and contracts compile to WASM. It is conceptually similar to Ethereum 2.0.

### What's special about NEAR?

NEAR is the blockchain for builders.

If you understand the basics of web development, you can write, test and deploy scalable decentralized applications in minutes on the most developer-friendly blockchain without having to learn new tools or languages.

### Is NEAR open source?

Yes. Have a look at our [GitHub organization](https://github.com/near).

### How are cryptographic functions used?

We support both `secp256k1` and `ed25519` for account keys and `ed25519` for signing transactions. We currently use the `ed25519_dalek` and `sha2` libraries for crypto.

### Do you have any on-chain governance mechanisms?

NEAR does not have any on-chain governance at the moment. Any changes to state or state transition function must be done through a hard fork.

### Do you have a bug-bounty program?

Our plan is to have a transparent Bug Bounty program with clear guidelines for paying out to those reporting issues. Payments will likely be based on publicly available rankings provided by protocol developers based on issue severity.

### What contracts should we be aware of right now?

We have developed a number of [initial contracts](https://github.com/near/core-contracts) with **ones in bold** being most mature at time of writing

- **Staking Pool / Delegation contract**
- **Lockup / Vesting contract**
- Whitelist Contract
- Staking Pool Factory
- Multisig contract

### Do you have a cold wallet implementation (ie. Ledger)?

https://github.com/near/near-ledger-app

## Validators

### What is the process for becoming a validator?

Validation is permissionless and determined via auction. Parties who want to become a validator submit a special transaction to the chain one day ahead which indicates how many tokens they want to stake. An auction is run which determines the minimum necessary stake to get a validation seat during the next epoch and, if the amount submitted is greater than the minimum threshold, the submitter will validate at least one shard during the next epoch.

### How long does a validator remain a validator?

A validator will stop being a validator for the following reasons:

- Not producing enough blocks or chunks.
- Not getting elected in the auction for next epoch because their stake is not large enough.
- Getting slashed.
  Otherwise a validator will remain a validator indefinitely.

Validator election happens in epochs. The [Nightshade whitepaper](/docs/Nightshade.pdf) introduces epochs this way: "the maintenance of the network is done in epochs" where an epoch is a period of time on the order of half a day.

At the beginning of each epoch, some computation produces a list of validators for the _very next epoch_.
The input to this computation includes all accounts that have "raised their hand to be a validator"
by submitting a special transaction ([`StakeAction`](https://nomicon.io/RuntimeSpec/Actions.html#stakeaction))
expressing the commitment of some amount of tokens over the system's staking threshold,
as well as validators from the previous epoch.
The output of this computation is a list of the validators for the very next epoch.

### What is the penalty for misbehaving validators?

Validators are not slashed for being offline but they do miss out on the rewards of validating. Validators who miss too many blocks or chunks will be removed from the validation set in the next auction and not get any reward (but, again, without slashing).

Any foul play on the part of the validator that is detected by the system may result in a "slashing event" where the validator is marked as out of integrity and forfeit their stake (according to some formula of progressive severity). The slashed stake is burnt.

### What is the mechanism for delegating stake to validators?

NEAR supports separate validation keys that can be used in smart contracts to delegate stake. Delegation is done via smart contract which allows for a validator to define a custom way to collect stake, manage it and split rewards. This also allows validators to provide leverage or derivatives on stake. Delegated stake will be slashed like any other stake if the node misbehaves.

If a validator misbehaves the funds of the delegators are also slashed. There is no waiting period for delegators to withdraw their stake.

### Does a validator control funds that have been delegated to them? 

Delegation is custodial (you are transferring funds to a different account, the smart contract that implements staking pool). We provide a reference implementation being security reviewed and tested by 100 validators at time of writing.

We allow validators to write and deploy new contracts but it is up to users to decide if they want to delegate. Validators can compete for delegation by choosing different logic and conditions around tax optimization, etc.

Currently no slashing but will be added as we add shards into the system. At some point validators will be able to add an option to shield delegators from slashing (similar to Tezos model).

### How do we get the balance of an account after it has delegated funds?

One would need to query the staking pool contract to get balance.

## Nodes

### Can a node be configured to archive all blockchain data since genesis? 

v
Yes. Start the node using the following command:

```sh
./target/release/near run --archive
```

### Can a node be configured to expose an RPC (ex: HTTP) interface? 

Yes. All nodes expose this interface by default which can be configured by setting the value of `listen_addr:port` in the node's `config.json` file.

### Can a node be gracefully terminated and restarted (using archived data on disk to continue syncing)? 

Yes.

### Does a node expose an interface for retrieving health telemetry in a structured format (ex: JSON) over RPC?

Yes. `GET /status` and `GET /health` provide this interface.

- `/status`: block height, syncing status, peer count, etc
- `/health`: success/failure if node is up running & progressing

### Can a node be started using a Dockerfile without human supervision? 

Yes.

```sh
docker run <port mapping> <mount data folder> <ENV vars> nearprotocol/nearcore:latest
```

See `nearcore/scripts/nodelib.py` for different examples of configuration.

### What is the source of truth for current block height exposed via API? 

- MainNet
  - https://nearblocks.io
  - `https://rpc.mainnet.near.org/status`
- TestNet
  - https://testnet.nearblocks.io
  - `https://rpc.testnet.near.org/status`

### How old can the referenced block hash be before it's invalid?

There is a genesis parameter which can be discovered for any network using:

```sh
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=EXPERIMENTAL_genesis_config
# in the line above, testnet may be replaced with mainnet or betanet
```

It's `43200` seconds or `~12` hours. You can view the live configuration for `epoch_length` using the [`protocol_config` RPC endpoint](/api/rpc/setup#protocol-config).

In the response we find `transaction_validity_period": 86400` (and since it takes about 1 second to produce a block, this period is about 24 hrs)

## Blockchain

### How will the network will be bootstrapped?

Distribution at genesis will be spread among the NEAR team, our contributors, project partners (ie. contributor, beta applications, infrastructure developers, etc.) and the NEAR foundation (with many portions of that segregated for post-MainNet distribution activity and unavailable to stake so the foundation isn’t able to control the network).

There will be auctions occurring on the platform after launch which will allocate large amounts of tokens over the next 2 years. Additionally we are planning to run TestNet where any validator who participates will receive rewards in real tokens. We are planning to onboard at least 50 separate entities to be validators at launch.

### What is the network upgrade process? 

We are currently upgrading via restarting with a new genesis block.

### Which consensus algorithm does NEAR use?

NEAR is a sharded **proof-of-stake** blockchain.

_You can read more in our [Nightshade whitepaper](/docs/Nightshade.pdf)._

> _A few relevant details have been extracted here for convenience:_
>
> [Since NEAR is a sharded blockchain, there are challenges that need to be overcome] including state validity and data
> availability problems. _Nightshade_ is the solution NEAR Protocol is built upon that addresses these issues.
>
> Nightshade uses the heaviest chain consensus. Specifically when a block producer produces a block (see section 3.3), they can collect signatures from other block producers and validators attesting to the previous block. The weight of a block is then the cumulative stake of all the signers whose signatures are included in the block. The weight of a chain is the sum of the block weights.
>
> On top of the heaviest chain consensus we use a finality gadget that uses the attestations to finalize the blocks. To reduce the complexity of the system, we use a finality gadget that doesn’t influence the fork choice rule in any way, and instead only introduces extra slashing conditions, such that once a block is finalized by the finality gadget, a fork is impossible unless a very large percentage of the total stake is slashed.

### How does on-chain transaction finality work?

Finality is deterministic, and requires at least 3 blocks as well as (2/3 +1) signatures of the current validator set.

In a normal operation, we expect this to happen right at 3 blocks but it is not guaranteed.

Finality will be exposed via RPC when querying block or transaction.

Our definition of finality is BOTH:

- Block has quorum pre-commit from the finality gadget. See details of the finality gadget [[here]](/docs/PoST.pdf)
- At least 120 blocks (2-3 minutes) built on top of the block of interest. This is relevant in case of invalid state transition in some shard and provides enough time for state change challenges. In case all shards are tracked and some mechanics to pause across nodes is employed, this is not needed. We recommend exchanges track all shards.

## Accounts

### How are addresses generated?

Please check out the spec here on accounts https://nomicon.io/DataStructures/Account.html.

### What is the balance record-keeping model on the NEAR platform?

NEAR uses an `Account`-based model. All users and contracts are associated with at least 1 account. Each account lives on a single shard. Each account can have multiple keys for signing transactions.

_You can read [more about NEAR accounts here](https://nomicon.io/DataStructures/Account.html)_

### How are user accounts represented on-chain?

Users create accounts with human-readable names (eg `alice`) which can contain multiple keypairs with individual permissions. Accounts can be atomically and securely transferred between parties as a native transaction on the network. Permissions are programmable with smart contracts as well. For example, a lock up contract is just an account with permission on the key that does not allow to transfer funds greater than those unlocked.

### Is there a minimum account balance?

To limit on-chain "dust", accounts (and contracts) are charged a refundable deposit for storing data on the chain. This means that if the balance of the account does not have enough balance to cover an increased deposit for additional storage of data, storing additional data will fail. Also, any user can remove their own account and transfer left over balance to another (beneficiary) account.

There will be a restoration mechanism for accounts removed (or slept) in this way implemented in the future.

### How many keys are used?

An account can have arbitrarily many keys, as long as it has enough tokens for their storage.

### Which balance look-ups exists? What is required?

We have an [RPC method for viewing account](/api/rpc/setup#view_account).

The [JS implementation is here](https://github.com/near/near-api-js/blob/d7f0cb87ec320b723734045a4ee9d17d94574a19/src/providers/json-rpc-provider.ts#L73). Note that in this RPC interface you can specify the finality requirement (whether to query the latest state or finalized state).

For custody purposes, it is recommended not to rely on latest state but only what is finalized.

## Fees

### What is the fee structure for on-chain transactions? 

NEAR uses a gas-based model where prices are generally deterministically adjusted based on congestion of the network.

We avoid making changes that are too large through re-sharding by changing number of available shards (and thus throughput).

Accounts don’t have associated resources. Gas amount is predetermined for all transactions except function calls. For function call transactions the user (or more likely the developer) attaches the required amount of gas. If some gas is left over after the function call, it is converted back to NEAR and refunded to the original funding account.

### How do we know how much gas to add to a transaction?

- See reference documentation here: https://nomicon.io/Economics/
- See API documentation for [discovering gas price via RPC here](/api/rpc/setup#gas-price).

The issuer of a transaction should attach some amount of gas by taking a guess at budget which will get the transaction processed. The contract knows how much to fund different cross contract calls. Gas price is calculated and fixed per block, but may change from block to block depending on how full / busy the block is. If blocks become more than half full then gas price increases.

We're also considering adding a max gas price limit.

## Transactions

### How do we follow Tx status?

See related [RPC interface for fetching transaction status here](/api/rpc/setup#transaction-status).

### How are transactions constructed and signed?

Transactions are a collection of related data that is composed and cryptographically signed by the sender using their private key. The related public key is part of the transaction and used for signature verification. Only signed transactions may be sent to the network for processing.

Transactions can be constructed and signed offline. Nodes are not required for signing. We are planning to add optional recent block hash to help prevent various replay attacks.

See [transactions](/concepts/protocol/transactions) in the concepts section of our documentation.

### How is the hash preimage generated? Which fields does the raw transaction consist of? 

For a transaction, we sign the hash of the transaction. More specifically, what is signed is the `sha256` of the transaction object serialized in borsh (https://github.com/near/borsh).

### How do transactions work on the NEAR platform?

A `Transaction` is made up of one or more `Action`s. An action can (currently) be one of 8 types: `CreateAccount`,
`DeployContract`, `FunctionCall`, `Transfer`, `Stake`, `AddKey`, `DeleteKey` and `DeleteAccount`. Transactions are composed by a sender and then signed using the private keys of a valid NEAR account to create a `SignedTransaction`. This signed transaction is considered ready to send to the network for processing.

Transactions are received via our JSON-RPC endpoint and routed to the shared where the `sender` account lives. This "home shard" for the sender account is then responsible for processing the transaction and generating related receipts to be applied across the network.

Once received by the network, signed transactions are verified (using the embedded public key of the signer) and transformed into a collection of `Receipt`s, one per action. Receipts are of two types: `Action Receipt` is the most common and represents almost all actions on the network while `Data Receipt` handles the very special case of "a `FunctionCallAction` which includes a Promise". These receipts are then propagated and applied across the network according to the "home shard" rule for all affected receiver accounts.

These receipts are then propagated around the network using the receiver account's "home shard" since each account lives on one and only one shard. Once located on the correct shard, receipts are pulled from a nonce-based [queue](https://nomicon.io/ChainSpec/Transactions#pool-iterator).

Receipts may generate other, new receipts which in turn are propagated around the network until all receipts have been applied. If any action within a transaction fails, the entire transaction is rolled back and any unburnt fees are refunded to the proper accounts.

For more detail, see specs on [`Transactions`](https://nomicon.io/RuntimeSpec/Transactions), [`Actions`](https://nomicon.io/RuntimeSpec/Actions.html), [`Receipts`](https://nomicon.io/RuntimeSpec/Receipts)

### How does NEAR serialize transactions?

We use a simple binary serialization format that's deterministic: https://borsh.io

## Additional Resources

- Whitepaper

  - General overview at [The Beginner's Guide to the NEAR Blockchain](https://near.org/blog/the-beginners-guide-to-the-near-blockchain)
  - [NEAR Whitepaper](https://near.org/papers/the-official-near-white-paper/)

- Github
  - https://www.github.com/near

:::tip Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol" target="_blank" rel="noopener noreferrer"> Ask it on StackOverflow! </a>
:::
