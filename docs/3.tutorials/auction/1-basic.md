---
id: basic-auction
title: Basic Auction
sidebar_label: Basic Auction
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Github} from "@site/src/components/codetabs"

In this section of the tutorial, we'll clone a simple auction smart contract and analyze each section in-depth. The contract allows users to place bids and track the highest bidder. We'll also look at how to test a smart contract and then run tests, and then how to deploy and interact with the contract on testnet.

---

## Cloning the contract

To get started we'll clone the [tutorial repo](https://github.com/near-examples/auctions-tutorial)

<Tabs groupId="code-tabs">
    <TabItem value="js" label="🌐 JavaScript">

        ```
        git clone git@github.com:near-examples/auctions-tutorial.git

        cd contract-ts/01-basic-auction
        ```

    </TabItem>
    <TabItem value="rust" label="🦀 Rust">

        ```
        git clone git@github.com:near-examples/auctions-tutorial.git

        cd contract-rs/01-basic-auction
        ```

    </TabItem>
</Tabs>

The repository is structured in three folders, two contain the same smart contracts written in JavaScript and Rust and the third contains a frontend that interacts with the contracts.

Navigate to the folder of the language you prefer, and then to the `01-basic-auction` folder.

---

## Anatomy of the Contract 

Let's take a look at the contract structure. The contract is a simple auction contract that allows users to place bids and track the highest bidder.


### Contract's Definition

The contract stores two main attributes: what was the highest bid so far, and when the auction will end. To simplify storing the highest bid, the contract uses an auxiliary structure called `Bid` that contains the bidder's account ID and the amount they bid.

<Tabs groupId="code-tabs">
    <TabItem value="js" label="🌐 JavaScript">

       <Github fname="contract.ts" language="javascript"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-ts/01-basic-auction/src/contract.ts"
                start="4" end="12" />
    </TabItem>
    <TabItem value="rust" label="🦀 Rust">

        <Github fname="lib.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/01-basic-auction/src/lib.rs#L2-L17"
                start="5" end="17" />

        <details> 
        
            <summary> Macros </summary>

            This is a dropdown

        </details>

    </TabItem>
</Tabs>


The `Contract` structure that has fields:
- **highest_bid**: stores the information about the highest bidder in another struct named Bid.
- **auction_end_time**: specifies the block_timestamp (which will be explained later) at which the auction will end.

`Contract` also has the macros:
- **contract_state**: enables borsh serialization and deserialization to read and write the structure to the blockchain in binary form and generates a schema.
- **serializers**: enables both borsh and JSON serialization and deserialization. The JSON serializer allows for the whole contract state to be outputted in JSON form. Although borsh is already enabled by contract_state, we have to specify it again in serializers if we want to add JSON. 
- **PanicOnDefault**: forces the contract to have custom initialization (we will see this later). 

&nbsp; 

Since `highest_bid` stores type `Bid` we have a nested structure. Bid itself has fields:
- **bidder**: specifies the unique human readable NEAR account ID of the bidder.
- **bid**: specifies the bid amount in yoctoNEAR (10^-24 NEAR).

Bid has macros:
- **serializers**: enables both borsh and JSON serialization and deserialization.
- **Clone**: allows a Bid object to be duplicated.

---

## Initializing the contract

Now let's take a look at the contract's methods

First, the contract implements an initialization function that determines the initial state of the contract. As stated earlier, this contract requires custom initialization meaning the user is required to input parameters on initialization. 


<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">



    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Github fname="lib.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/01-basic-auction/src/lib.rs#L19-L31"
                start="19" end="31" />

    </TabItem>

</Tabs>


The implementation of Contract is decorated with the `near` macro to declare that the methods inside of Contract can be called by the outside world. The `init` function has macros `init` to denote it is an initialization function and `private` to restrict the function to only be called by the account on which the contract is deployed. The function takes the parameter `end_time` which specifies the block_timestamp of when the auction will end.

When this function is called the `auction_end_time` will be set and `highest_bid` will be set with `bid` as 1 YoctoNEAR (the smallest unit of NEAR) and `bidder` as the account on which the contract is deployed so that if no one bids no one will win the auction.

---

## Placing a bid

An auction isn't an auction if you can't place a bid! The contract has a `bid` method that allows a user to place a bid by attaching NEAR tokens to the method call. A successful implementation of the `bid` method will check whether the auction is still ongoing, check whether their bid is higher than the previous and if it meets both criteria it will update the `highest_bid` field accordingly and return tokens back to the previous bidder.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

    TODO

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Github fname="lib.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/01-basic-auction/src/lib.rs#L33-L59"
                start="33" end="59" />

    </TabItem>

</Tabs>

---

When the user calls the `bid` method they will transfer NEAR tokens to the contract; to enable the transfer of NEAR tokens we need to decorate the method with the `payable` macro. This method is what we call a "change method", also known as a "call method"; we know this since it passes a mutable reference to itself ($mut self). Change methods, by name, change the state of the contract and require the user to attach gas.

- First, the method checks that the auction is still ongoing by checking that the current `block_timestamp` is less than the auction end time. `block_timestamp` gives the time as the number of nanoseconds since January 1, 1970, 0:00:00 UTC. Here we use `require` as opposed to `assert` as it reduces the contract size by not including file and rust-specific data in the panic message.

- Next, the method sets the variables `bid` to the attached NEAR deposit in the method call (type NearToken) and `bidder` to the predecessor's account ID (type AccountId). Note that the predecessor is the account (or contract) that directly calls the bid method, this can be different from the signer (env::signer_account_id) who initially signed the transaction leading to the execution of this method. If pivortex.near calls a contract proxy-contract.near which then calls bid on this contract the predecessor would be proxy-contract.near and the signer would be pivortex.near. For security purposes, we stick with predecessor_account_id here.

- Then, the method deconstructs the `highest_bid` into two distinct variables and checks that the last bid was higher than the current bid. If so then the `highest_bid` will be updated to the current bid. 

- The contract then returns a `Promise` that will transfer NEAR of the amount `last_bid` to the `last_bidder`.

---

## Viewing the contract state

The contract also implements "view methods"; this allows the user to view the data stored on the contract. View methods don't require any gas but cannot change the state of the contract. View methods take an immutable reference to self (&self). An example use case here is being able to view, in the frontend, what the highest bid amount was so we make sure that we place a higher bet.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

    TODO

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Github fname="lib.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/01-basic-auction/src/lib.rs#L61-L63"
                start="61" end="63" />

    </TabItem>

</Tabs>


The contract has further view methods that follow a very similar structure. 

---

# Testing the contract

Ok, now we've seen the contract we need to make sure it works as expected; this is done through testing. It's good practice to implement exhaustive tests so you can ensure that any little change to your code down the line doesn't break your contract. For further information on testing take a look at [this](../../2.build/2.smart-contracts/testing/introduction.md) section in the docs.

---

## Unit tests

Unit tests allow you to test contract methods individually. For each change method, there should be a unit test and check that it changes the state of the contract in the expected way.

Let's look at a test that ensures the contract is initialized properly.


<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

    TODO

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Github fname="lib.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/01-basic-auction/src/lib.rs#L78-L92"
                start="78" end="92" />

    </TabItem>

</Tabs>

- First, the test creates a new contract and initializse it with an `auction_end_time` of 1000 (in reality this is very low but it doesn't matter in this context).

- Next, the test calls `get_highest_bid` and check that the `bidder` and `bid` are as expected.

- Lastly, the test calls `get_auction_end_time` and checks that the `end_time` is as expected.

Simple enough.

We'll next implement a test to ensure the `bid` method works as expected.


**Not in repo yet**
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

Since this method requires an attached deposit and gets the predecessor's account ID we create context with `VMContextBuilder` to set the predecessor to "bob.near" and the deposit amount to one NEAR token when we call bid.

---

## Integration tests

Integration tests allow you to deploy your contract (or contracts) in a sandbox to interact with it in a realistic environment.

For testing, you'll notice that some crates are imported. The Bid structure is imported from auction-contract which you'll notice is the name of the package in `Cargo.toml` and UTC is imported from chrono which is listed as a dependency in the toml.


First, in the tests file a test function is defined, a sandbox testing environment is created and the compiled auction contract is fetched to be interacted with.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

    TODO

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        Enter tests > test_basics.rs

        <Github fname="test_basics.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/01-basic-auction/tests/test_basics.rs#L8-L11"
                start="8" end="11" />

    </TabItem>

</Tabs>


Next, the test creates a couple of user accounts that are used to send transactions from. Each account is given an account ID and an initial balance.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

    TODO

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Github fname="test_basics.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/01-basic-auction/tests/test_basics.rs#L13-L20"
                start="13" end="20" />

    </TabItem>

</Tabs>

Likewise, a "contract" account is created but here the contract WASM is deployed to it.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

    TODO

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Github fname="test_basics.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/01-basic-auction/tests/test_basics.rs#L37"
                start="37" end="37" />

    </TabItem>

</Tabs>

When the contract is initialized `end_time` is passed, which is set to 60 seconds in the future. After calling `init`, the test checks that the transaction was successful.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

    TODO

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Github fname="test_basics.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/01-basic-auction/tests/test_basics.rs#L39-L49"
                start="39" end="49" />

    </TabItem>

</Tabs>

Now the contract is deployed and initialized, bids are made to the contract from the account and it's checked that the state changes as intended.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

    TODO

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Github fname="test_basics.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/01-basic-auction/tests/test_basics.rs#L67-L79"
                start="67" end="79" />

    </TabItem>

</Tabs>


When testing we should also check that the contract does not allow invalid calls. The next part checks that the contract doesn't allow for bids with fewer NEAR tokens than the previous to be made.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

    TODO

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Github fname="test_basics.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/01-basic-auction/tests/test_basics.rs#L82-L94"
                start="82" end="94" />

    </TabItem>

</Tabs>

---

## Testing and deploying 

Cool, we've seen how tests are written. Now let's actually run the tests.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

    TODO

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        ```
        $ cargo test
        ```

        If all the tests are successful we can build and deploy the contract to testnet

        ```
        $ cargo near build
        ```

        We'll need a testnet account to deploy the contract to, so if you don't have one you can use

        ```
        $ cargo near create-dev-account use-random-account-id
        ```

        Then deploy with

        ```
        $ cargo near deploy <contractId> with-init-call init json-args '{"end_time": "3000000000000000000"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' network-config testnet
        ```

    </TabItem>

</Tabs>


Now the contract is deployed and initialized we can send transactions to it using the CLI. NEAR's CLI is interactive meaning you can type `near` and click through all the possible options without having to remember certain commands. But here you can use the following full commands to call the contract methods:

Call `bid`, you may want to create another testnet account for the signer

```
$ near contract call-function as-transaction <contractId> bid json-args {} prepaid-gas '100.0 Tgas' attached-deposit '1 NEAR' sign-as <accountId> network-config testnet
```

Call `get_highest_bid`

```
$ near contract call-function as-read-only <contractId> get_highest_bid json-args {} network-config testnet now
```

---

## Conclusion 

In this part of the tutorial, we've seen how a smart contract stores data, mutates the stored data and views the data. We also looked at how both unit and integration tests are written and how to execute them. Finally, we saw how to compile, deploy and interact with the contract through the CLI on testnet. In the [next part](./2-locking.md), we'll edit the existing contract and add a new method so the contract can be locked. We'll also update the tests accordingly to reflect the changes to the contract.






