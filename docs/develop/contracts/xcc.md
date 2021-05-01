---
id: xcc
title: Cross Contract Calls and Composability
sidebar_label: Cross Contract Calls
---

As we begin to make advanced smart contracts, we'll want to start interacting with other contracts. This composability allows us to make complex systems, while following modern development best practices. In order to make this composability easier for developers, NEAR introduces promises. Promises allow developers to synchronize cross contract calls using familiar `.then` syntax.

Since NEAR is a sharded blockchain, much of this is accomplished by something akin to the **Actor Model**. While making cross contract calls, we are sending messages (`ActionReceipt`) to other contracts. When the other contract finishes, they send back a message (`DataReceipt`) containing returned data. This returned data can be processed by registering a callback using the `.then` syntax.

## Prerequisites

- [Smart Contract Overview](./overview)
- [Rust Introduction](./rust/intro)
- [AssemblyScript Introduction](./as/intro)

## Terminology

- **`Runtime`** - the layer responsible for running smart contracts. It converts transactions into receipts and processes receipts. [More info here](https://nomicon.io/RuntimeSpec/Runtime.html)
- **`Receipt`** - messages passed between shards. [More info here](https://nomicon.io/RuntimeSpec/Receipts.html#receipt)
- **`ActionReceipt`** - a `Receipt` used to apply some actions to a receiver (such as apply a smart contract method). [More info here](https://nomicon.io/RuntimeSpec/Receipts.html#actionreceipt)
- **`DataReceipt`** - a `Receipt` used to return. [More info here](https://nomicon.io/RuntimeSpec/Receipts.html#datareceipt)

## Calling Smart Contract Methods

Since NEAR is a sharded blockchain, the runtime packages the call from `A` to `B` into an `ActionReceipt`. At the same time, the shard containing `A` registers a callback by creating a pending `ActionReceipt`. On the next block, the shard containing `B` will process the `ActionReceipt` from `A` invoking the method on `B`. It will then take the returned value from `B` and package it into a `DataReceipt`. Then, on the next block, the shard containing `A` will process the `DataReceipt` from `B` and trigger the pending `ActionReceipt` from earlier, invoking the registered callback.

1. contract `A` calls contract `B`
2. the runtime prepares the cross contract call by:
   - creating an `ActionReceipt` to send to the shard containing `B`
   - creating a pending `ActionReceipt` that it stores locally
3. on the next block, the shard containing `B`:
   - processes the `ActionReceipt` invoking the method on `B`
   - takes the return value from `B` and packages it into a `DataReceipt`
4. on the next block, the shard containing `A` triggers the pending `ActionReceipt` with the data from `B`

<!--DOCUSAURUS_CODE_TABS-->

<!--Rust-->

```rust
ext_ft::ft_balance_of(
    account_id.into(),
    &"banana.ft-fin.testnet", // contract account id
    0, // yocto NEAR to attach
    5_000_000_000_000 // gas to attach
)
```

<!--AssemblyScript-->

```ts
ContractPromise.create<FTBalanceOf>(
  "banana.ft-fin.testnet", // contract account id
  "ft_balance_of", // // contract method name
  {
    account_id: accountId,
  },
  5_000_000_000_000, // gas to attach
  u128.Zero // yocto NEAR to attach
);
```

<!--END_DOCUSAURUS_CODE_TABS-->

## Common Patterns

### Callback Pattern

The callback pattern is used when contract `A` calls contract `B` and wants to do something with the data returned from `B`.

<!--DOCUSAURUS_CODE_TABS-->

<!--Rust-->

```rust
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::json_types::{U128, ValidAccountId};
use near_sdk::{env, ext_contract, near_bindgen, Promise, PromiseResult};

near_sdk::setup_alloc!();

// define the methods we'll use on the other contract
#[ext_contract(ext_ft)]
pub trait FungibleToken {
    fn ft_balance_of(&mut self, account_id: AccountId) -> U128;
}

// define methods we'll use as callbacks on our contract
#[ext_contract(ext_self)]
pub trait MyContract {
    fn my_callback(self) -> String;
}

#[near_bindgen]
#[derive(Default, BorshDeserialize, BorshSerialize)]
pub struct Contract {}

#[near_bindgen]
impl Contract {
    pub fn my_first_cross_contract_call(self, account_id: ValidAccountId) -> Promise {
        // Invoke a method on another contract
        // This will send an ActionReceipt to the shard where the contract lives.
        ext_ft::ft_balance_of(
            account_id.into(),
            &"banana.ft-fin.testnet", // contract account id
            0, // yocto NEAR to attach
            5_000_000_000_000 // gas to attach
        )
        // After the smart contract method finishes a DataReceipt will be sent back
        // .then registers a method to handle that incoming DataReceipt
        .then(ext_self::my_callback(
            &env::current_account_id(), // this contract's account id
            0, // yocto NEAR to attach to the callback
            5_000_000_000_000 // gas to attach to the callback
        ))
    }

    pub fn my_callback(self) -> String {
        assert_eq!(
            env::promise_results_count(),
            1,
            "This is a callback method"
        );

        // handle the result from the cross contract call this method is a callback for
        match env::promise_result(0) {
            PromiseResult::NotReady => unreachable!(),
            PromiseResult::Successful(result) => {
                let balance = near_sdk::serde_json::from_slice::<U128>(&result).unwrap();
                if balance.0 > 100000 {
                    "Wow!".to_string()
                } else {
                    "Hmmmm".to_string()
                }
            },
            PromiseResult::Failed => "oops!".to_string(),
        }
    }
}
```

<!--AssemblyScript-->

```ts
import { Context, ContractPromise, u128 } from "near-sdk-core";

// parameters taken by cross contract method
@nearBindgen
class FTBalanceOf {
  account_id: string;
}

@nearBindgen
class Nothing {}

export function myFirstCrossContractCall(accountId: string): void {
  // Invoke a method on another contract
  // This will send an ActionReceipt to the shard where the contract lives.
  ContractPromise.create<FTBalanceOf>(
    "banana.ft-fin.testnet", // contract account id
    "ft_balance_of", // // contract method name
    {
      account_id: accountId,
    },
    5_000_000_000_000, // gas to attach
    u128.Zero // yocto NEAR to attach
  )
    // After the smart contract method finishes a DataReceipt will be sent back
    // .then registers a method to handle that incoming DataReceipt
    .then<Nothing>(
      Context.contractName, // this contract's account id
      "myCallback", // the method to call after the previous cross contract call finishes
      {},
      5_000_000_000_000, // gas to attach to the callback
      u128.Zero // yocto NEAR to attach to the callback
    )
    .returnAsResult(); // return the result of myCallback
}

export function myCallback(): string {
  // an array of results from the previous cross contract calls
  // this array will have a length of 1, unless the previous
  // promises was created using ContractPromise.all
  const results = ContractPromise.getResults();
  assert(results.length == 1, "This is a callback method");

  // the result of the cross contract call
  const result = results[0];

  if (result.succeeded) {
    // the cross contract call succeeded
    const balance = result.decode<u128>();

    return balance > u128.from(1000000000) ? "Wow!" : "Hmmmm";
  } else {
    // the cross contract call failed
    return "oops!";
  }
}
```

<!--END_DOCUSAURUS_CODE_TABS-->

### Event Pattern

The event pattern is use when a contract `EventPublisher` defines a method with an `event_subscriber_id` parameter. When that method is called, the `EventPublisher` makes a cross contract call to the `event_subscriber_id` smart contract invoking an event handler on that contract. For example, a `VotingContract` (EventPublisher) allows people to `candidate_vote_call` on a candidate. When a candidate is voted for the candidates smart contract `candidate_on_vote` method (event handler) will be invoked.

<!--DOCUSAURUS_CODE_TABS-->

<!--Rust-->

```rust
use near_sdk::collections::LookupMap;
use near_sdk::json_types::{ValidAccountId, U128};
use near_sdk::{
    assert_one_yocto,
    borsh::{self, BorshDeserialize, BorshSerialize},
};
use near_sdk::{env, ext_contract, near_bindgen, AccountId, PanicOnDefault, Promise};

near_sdk::setup_alloc!();

// define the methods we'll use on the other contract
#[ext_contract(ext_candidate)]
pub trait CandidateContract {
    fn candidate_on_vote(self, voter_id: AccountId, total_votes: U128) -> String;
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Contract {
    votes: LookupMap<AccountId, u128>,
}

#[near_bindgen]
impl Contract {
    // Event Pattern Method
    // usually methods following the Event Pattern are named *_call.
    // this indicates that they will make a cross contract **call** to
    // a smart contract specified by the arguments passed to this method.
    // In this case, the candidate_id is an address to a smart contract.
    #[payable]
    pub fn candidate_vote_call(&mut self, candidate_id: ValidAccountId) -> Promise {
        assert_one_yocto();

        let candidate_id = candidate_id.as_ref();
        assert!(
            self.votes.contains_key(candidate_id),
            "Candidate has not been nominated"
        );

        // update total votes for a candidate
        let total_votes = self.votes.get(candidate_id).unwrap() + 1;
        self.votes.insert(candidate_id, &total_votes);

        // after votes have been updated make a cross contract call to the candidate_id contract
        ext_candidate::candidate_on_vote(
            env::predecessor_account_id(), // voter AccountId
            total_votes.into(),            // total votes for candidate
            candidate_id,                  // contract AccountId for candidate
            0,                             // attached yocto NEAR
            5_000_000_000_000,             // attached gas
        )
    }

    #[init]
    pub fn new() -> Self {
        Self {
            votes: LookupMap::new(b"p".to_vec()),
        }
    }

    pub fn nominate(&mut self, candidate_id: ValidAccountId) {
        let candidate_id = candidate_id.as_ref();
        assert!(
            !self.votes.contains_key(candidate_id),
            "Candidate has already been nominated"
        );

        self.votes.insert(candidate_id, &0);
    }
}
```

<!--AssemblyScript-->

```ts
import { Context, ContractPromise, u128, PersistentMap } from "near-sdk-core";

const votes = new PersistentMap<string, u128>("p");

// parameters taken by cross contract method
@nearBindgen
class OnVote {
  voter_id: string;
  total_votes: u128;
}

// Event Pattern Method
// usually methods following the Event Pattern are named *_call.
// this indicates that they will make a cross contract **call** to
// a smart contract specified by the arguments passed to this method.
// In this case, the candidate_id is an address to a smart contract.
export function candidate_vote_call(candidate_id: string): void {
  assert(
    Context.attachedDeposit == u128.from(1),
    "Requires attached deposit of exactly 1 yoctoNEAR"
  );
  assert(votes.contains(candidate_id), "Candidate has not been nominated");

  // update total votes for a candidate
  const total_votes = votes.getSome(candidate_id) + u128.One;
  votes.set(candidate_id, total_votes);

  // after votes have been updated make a cross contract call to the candidate_id contract
  ContractPromise.create<OnVote>(
    candidate_id, // contract AccountId for candidate
    "candidate_on_vote", // contract method to invoke
    {
      voter_id: Context.predecessor,
      total_votes,
    },
    5_000_000_000_000, // attached gas
    u128.Zero // attached yocto NEAR
  ).returnAsResult();
}

export function nominate(candidate_id: string): void {
  assert(!votes.contains(candidate_id), "Candidate has already been nominated");
  votes.set(candidate_id, u128.Zero);
}
```

<!--END_DOCUSAURUS_CODE_TABS-->

When using the event pattern, there are some conventions to follow. On the `EventPublisher` method:

- prefixed with a contract identifier (e.g. `candidate_`, `ft_`, `nft_`)
- suffixed with `_call` (e.g. `candidate_vote_call`, `ft_transfer_call`, `nft_transfer_call`)

On the other side of the `EventPublisher` is an `EventSubscriber` contract. This contract has to define a predetermined method that will be invoked by a cross contract call from the `EventPublisher` contract. In the above code you'll notice that the `candidate_vote_call` method makes a cross contract call to a `candidate_on_vote` method. This `candidate_on_vote` method has to be defined by the `EventSubscriber` contract.

<!--DOCUSAURUS_CODE_TABS-->

<!--Rust-->

```rust
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::json_types::{ValidAccountId, U128};
use near_sdk::{env, near_bindgen};

near_sdk::setup_alloc!();

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, Default)]
pub struct CandidateContract {}

#[near_bindgen]
impl CandidateContract {
    pub fn candidate_on_vote(voter_id: ValidAccountId, total_votes: U128) -> String {
        assert_eq!(
            env::predecessor_account_id(),
            "VotingContract_ID",
            "Only the candidate voting contract can call this method"
        );

        "Thanks for voting for me! I look forward to serving".to_string()
    }
}
```

<!--AssemblyScript-->

```ts
import { Context, u128 } from "near-sdk-core";

export function candidate_on_vote(voter: string, total_votes: u128): String {
  assert(
    Context.predecessor == "VotingContract_ID",
    "Only the candidate voting contract can call this method"
  );

  return "Thanks for voting for me! I look forward to serving";
}
```

<!--END_DOCUSAURUS_CODE_TABS-->

On the `EventSubscriber` method:

- prefixed with a contract identifier (e.g. `candidate_`, `ft_`, `nft_`)
- followed by `on` and then the name of the event it handles (e.g. `candidate_on_vote`, `ft_on_transfer`, `nft_on_transfer`)

## Common Use Cases

Both the [Fungible Token Standard (NEP-141)](https://nomicon.io/Standards/FungibleToken/Core.html) and the [Non-Fungible Token Standard (NEP-171)](https://nomicon.io/Standards/NonFungibleToken/Core.html) make use of the Callback Pattern and the Event Pattern.

### Fungible Token Standard

NEP-141 defines a `ft_transfer_call` method that transfers tokens from the sender to a receiver. As the name suggests, this method is an event publisher (`_call` is our clue). The receiver contract is expected to define a method, `ft_on_transfer`, which should return the number of unused tokens.

The `ft_transfer_call` method will make a cross contract call to the `ft_on_transfer` method, it will also register a callback, `ft_resolve_transfer`, that will take the unused tokens returned by `ft_on_transfer` and refund those tokens back to the sender.

### Non-Fungible Token Standard

Similarly, the [Non-Fungible Token Standard (NEP-171)](https://nomicon.io/Standards/NonFungibleToken/Core.html) defines a method `nft_transfer_call`. Again, the name suggests that this is an event publisher (`_call` is our clue).

1. a sender invokes the `nft_transfer_call` method to send an NFT to a receiver
2. the `nft_transfer_call` method transfers the NFT from sender to receiver
3. after the transfer a cross contract call is started
   - an `ActionReceipt` is created to call the `nft_on_transfer` method on the receiver contract
   - a callback `nft_resolve_transfer` is registered by creating a pending `ActionReceipt`
4. on the next block, the `nft_on_transfer` method is executed on the receiver contract and a `DataReceipt` is created
5. on the next block, the pending `ActionReceipt` from above is ready and the `nft_resolve_transfer` callback is executed

## Further Resources

- [Runtime Overview](https://www.youtube.com/watch?v=Xi_8PapFCjo)
- [Runtime Action and Data Receipts](https://www.youtube.com/watch?v=RBb3rJGtqOE)
- [Cross Contract High Level Example](https://github.com/near/near-sdk-rs/tree/master/examples/cross-contract-high-level)
- [Architecture](https://nomicon.io/Architecture.html)
- [Receipts](https://nomicon.io/RuntimeSpec/Receipts.html)
- [Promises API](https://nomicon.io/RuntimeSpec/Components/BindingsSpec/PromisesAPI.html)
