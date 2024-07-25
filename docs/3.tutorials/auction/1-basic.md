---
id: winning-an-nft
title: Winning an NFT
sidebar_label: Winning an NFT
---

In this section of the tutorial, you'll learn how to create a basic auction smart contract from scratch. The contract will allow users to place bids and track the highest bidder.

&nbsp;

## Creating a new project

To get started you'll need to create a new NEAR project.

In your command line run:

```
$ cargo near new auction-contract
```

Enter your new project 

```
$ cd auction-contract
```

Then go ahead and open up a code editor such as VS Code

```
$ code . 
```

Enter src > lib.rs, there already exists an example contract there so we'll just go ahead and delete everything and start from the start!

&nbsp;

## Defining the contract structure 

Smart contracts are simply structures that store data and implement methods to mutate and view that data. First, we'll define what data we are storing. We'll also need some imports along the way.

```rust
use near_sdk::json_types::U64;
use near_sdk::{env, near, require, AccountId, NearToken, PanicOnDefault, Promise};

#[near(serializers = [json, borsh])]
#[derive(Clone)]
pub struct Bid {
    pub bidder: AccountId,
    pub bid: NearToken,
}

#[near(contract_state, serializers = [json, borsh])]
#[derive(PanicOnDefault)]
pub struct Contract {
    highest_bid: Bid,
    auction_end_time: U64,
}
```

Here we define the Contract structure that has fields:
- **highest_bid**: stores the information of the highest bidder in an instance of another struct named Bid.
- **auction_end_time**: specifies the block_timestamp (which will be explained later) at which the auction will end.

Contract also has the macros:
- **contract_state**: enables borsh serialization and decentralization to read and write the structure to the blockchain in binary form and generates a schema.
- **serializers**: enables both borsh and JSON serialization and decentralization. The JSON serializer allows for the whole contract state to be outputted in JSON form. Although borsh is already enabled by contract_state, we have to specify it again in serializers if we want to add JSON. 
- **PanicOnDefault**: forces the contract to have custom initialization (we will see this later). 

&nbsp; 

Since highest_bid stores type Bid we have a nested structure. Bid itself has fields:
- **bidder**: specifies the unique human readable NEAR account ID of the bidder.
- **bid**: specifies the bid amount in YoctoNEAR (10^-24 NEAR).

Bid has macros:
- **serializers**: enables both borsh and JSON serialization and decentralization.
- **Clone**: allows a Bid object to be duplicated.

&nbsp;

## Initializing the contract

Now we have defined the data structures for the contract we next define its methods.

First, we set up an initialization function that will determine the initial state of the contract. As stated earlier this contract only offers custom initialization where the user is required to input parameters. 

```rust 
#[near]
impl Contract {
    #[init]
    #[private] // Only callable by the contract's account
    pub fn init(end_time: U64) -> Self {
        Self {
            highest_bid: Bid {
                bidder: env::current_account_id(),
                bid: NearToken::from_yoctonear(1),
            },
            auction_end_time: end_time,
        }
    }
```

We decorate the implementation of Contract with the `near` macro to declare that the methods inside of Contract can be called by the outside world. The `init` function has attributes `init` to denote it is an initialization function and `private` to restrict the function to only be called by the account on which the contract is deployed. The function takes the parameter `end_time` which specifies the block_timestamp of when the auction will end.

When this function is called the `auction_end_time` will be set and `highest_bid` will be set with `bidder` as the account on which the the contract is deployed and `bid` as 1 YoctoNEAR (10^-24 NEAR) so that if no one bids no one will win the auction.

&nbsp;

## Placing a bid

An auction isn't an auction if you can't place a bid! We'll now add a method that allows a user to place a bid by attaching NEAR tokens to the method call. The method needs to implement logic, it should check whether the auction is still ongoing, check whether their bid is higher than the previous and if it meets both criteria it should update the `highest_bid` field accordingly and return the funds back to the previous bidder.

```rust
#[payable]
pub fn bid(&mut self) -> Promise {
    // Assert the auction is still ongoing
    require!(
        env::block_timestamp() < self.auction_end_time.into(),
        "Auction has ended"
    );

    // Current bid
    let bid = env::attached_deposit();
    let bidder = env::predecessor_account_id();

    // Last bid
    let Bid {
        bidder: last_bidder,
        bid: last_bid,
    } = self.highest_bid.clone();

    // Check if the deposit is higher than the current bid
    require!(bid > last_bid, "You must place a higher bid");

    // Update the highest bid
    self.highest_bid = Bid { bidder, bid };

    // Transfer tokens back to the last bidder
    Promise::new(last_bidder).transfer(last_bid)
}
```

When the user calls the `bid` method they will transfer NEAR tokens to the contract; to enable the transfer of NEAR tokens we need to decorate the method with the `payable` attribute. This method is what we call a "change method", also known as a "call method"; we know this since it passes a mutable reference to itself ($mut self). Change methods require the user to pay gas and can change the state of the contract.

- First, the method checks that the auction is still ongoing by checking that the current `block_timestamp` is less than the auction end time. `block_timestamp` gives the time as the number of nanoseconds since January 1, 1970, 0:00:00 UTC. Here we use `require` as opposed to `assert` as it reduces the contract size by not including file and rust-specific data in the panic message.

- Next, the method sets the variables `bid` to the attached NEAR deposit in the method call (type NearToken) and `bidder` to the predecessor's account ID (type AccountId). Note that the predecessor is the account (or contract) that directly calls the bid method, this can be different from the signer (env::signer_account_id) who initially signed the transaction leading to the execution of this method. If pivortex.near calls a contract proxy-contract.near which then calls bid on this contract the predecessor would be proxy-contract.near and the signer would be pivortex.near. For security purposes, we stick with predecessor_account_id here.

- Then, the method deconstructs the `highest_bid` into two distinct variables and checks that the last bid was higher than the current bid. If so then the `highest_bid` will be updated to the current bid. 

- The contract then returns a `Promise` that will transfer NEAR of the amount `last_bid` to the `last_bidder`.

&nbsp;

## Viewing the contract state

We also implement "view methods" into this contract; this allows the user to view the data stored on the contract. View methods don't require any gas but cannot change the state of the contract. We know it is a view method since it takes an immutable reference to self (&self). An example use case here is being able to view, in the frontend, what the highest bid amount was so we make sure that we place a higher bet.

```rust
pub fn get_highest_bid(&self) -> Bid {
    self.highest_bid.clone()
}
```

In the repo there are further view methods that follow a very similar structure. 

&nbsp;

# Adding tests 

Ok now we have the contract we need to make sure it works as expected and is secure. It's good practice to implement exhaustive tests so you can ensure that any little to your change down the line doesn't break your contract. For further information on testing take a look at [this]() section in the docs.

## Unit tests

Unit tests allow you to test contract methods individually. For each change method, we should implement a unit test.

Let's create a test to ensure that the contract is initialized properly.

```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn init_contract() {
        let contract = Contract::init(U64::from(1000));

        let default_bid = contract.get_highest_bid();
        assert_eq!(default_bid.bidder, env::current_account_id());
        assert_eq!(default_bid.bid, NearToken::from_yoctonear(1));

        let end_time = contract.get_auction_end_time();
        assert_eq!(end_time, U64::from(1000));
    }
}
```

- First, we create a new contract and initialize it with an auction_end_time of 1000 (in reality this is very low but it does not matter here).

- Next, we call get_highest_bid and check that the bidder and bid are as expected.

- Lastly, we call get_auction_end_time and check that the end_time is as expected.

Simple enough.

We'll next implement a test to ensure the functionality of `bid` works as expected.

```rust
    #[test]
    fn bid() {
        // Create context for the call
        let mut builder = VMContextBuilder::new();
        builder.predecessor_account_id("bob.near".parse().unwrap());
        builder.attached_deposit(ONE_NEAR);
        testing_env!(builder.build());

        let mut contract = Contract::init(U64::from(1000));
        contract.bid();

        let first_bid = contract.get_highest_bid();
        assert_eq!(first_bid.bidder, "bob.near");
        assert_eq!(first_bid.bid, ONE_NEAR);
    }
```

Here we now create context with `VMContextBuilder` to set the predecessor to "bob.near" and the deposit amount to one NEAR token when we call bid.

&nbsp;


## Integration tests

Integration tests allow you to deploy your contract (or contracts) in a sandbox to interact with it in a realistic environment.

For testing, we're going to have to import some crates. We will need to import the Bid struct from our contract so in our Cargo.toml we'll rename the package "auction-contract" and add chrono to our dependencies 

```
chrono = "0.4.38"
```

Enter tests > test_basics.rs, there already exists an example test there so we'll just go ahead and delete everything.

First, we need to define our test function, create the sandbox testing environment and get the compiled auction contract to interact with.

```rust
#[tokio::test]
async fn test_contract_is_operational() -> Result<(), Box<dyn std::error::Error>> {
    let sandbox = near_workspaces::sandbox().await?;
    let contract_wasm = near_workspaces::compile_project("./").await?;
```

Next, we'll create a couple of user accounts that we'll use to send transactions from. We'll give each an account ID and an initial balance:

```rust
  let alice = root
        .create_subaccount("alice")
        .initial_balance(FIVE_NEAR)
        .transact()
        .await?
        .unwrap();
```

We'll do the same for the "contract" account and deploy the contract WASM to it.

```rust
let contract = contract_account.deploy(&contract_wasm).await?.unwrap();
```

When we initialize the contract we need to pass `end_time` so we'll set that to 60 seconds in the future. After calling `init` we'll check that the transaction was successful.

```rust
    let now = Utc::now().timestamp();
    let a_minute_from_now = (now + 60) * 1000000000;
    log!("a_minute_from_now: {}", a_minute_from_now);

    let init = contract
        .call("init")
        .args_json(json!({"end_time": a_minute_from_now.to_string()}))
        .transact()
        .await?;

    assert!(init.is_success());
```

Now we have a contract deployed and initialized we can make bids to the contract from an account and check that the state changes as intended.

```rust
    let bob_bid = bob
        .call(contract.id(), "bid")
        .deposit(NearToken::from_near(2))
        .transact()
        .await?;

    assert!(bob_bid.is_success());

    let highest_bid_json = contract.view("get_highest_bid").await?;
    let highest_bid: Bid = highest_bid_json.json::<Bid>()?;

    assert_eq!(highest_bid.bid, NearToken::from_near(2));
    assert_eq!(highest_bid.bidder, *bob.id());
```

When testing we should also check that the contract does not allow invalid calls. We will check that the contract doesn't allow us to make a bid with less NEAR tokens than the previous.

```rust
    let alice_bid = alice
        .call(contract.id(), "bid")
        .deposit(NearToken::from_near(1))
        .transact()
        .await?;

    assert!(alice_bid.is_failure());

    let highest_bid_json = contract.view("get_highest_bid").await?;
    let highest_bid: Bid = highest_bid_json.json::<Bid>()?;

    assert_eq!(highest_bid.bid, NearToken::from_near(2));
    assert_eq!(highest_bid.bidder, *bob.id());
```

&nbsp;

## Testing and deploying 

Now we have the tests written let's actually test it.

```
$ cargo test
```

If all the tests run well we can build and deploy the contract to testnet.

```
$ cargo near build
```

We'll need a testnet account to deploy the contract to, so if you don't have one you can use:

```
$ cargo near create-dev-account use-random-account-id
```

Then deploy with: 

```
$ cargo near deploy <accountId> with-init-call init json-args '{"end_time": "3000000000000000000"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' network-config testnet
```

Now the contract is deployed and initialized we can send transaction to it using the CLI, NEAR's CLI is interactive meaning you can type `near` and click through all the possible options. But you can use the following full commands to call the contract methods:

Call `bid`

```
$
```

Call 

```
$
```














