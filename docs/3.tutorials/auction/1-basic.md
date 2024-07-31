---
id: basic-auction
title: Basic Auction
sidebar_label: Basic Auction
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Github} from "@site/src/components/codetabs"

In this section of the tutorial, we'll clone a simple auction smart contract and analyze each section of the contract in-depth. We'll also look at how to test a smart contract, and then how to deploy and interact with the contract on testnet.

---

## Cloning the contract

To get started we'll clone the [tutorial repo](https://github.com/near-examples/auctions-tutorial).

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

The contract stores two main fields: what was the highest bid so far, and when the auction will end. To simplify storing the highest bid, the contract uses an auxillary structure called `Bid` that contains the bidder's account ID and the amount they bid.

<Tabs groupId="code-tabs">
    <TabItem value="js" label="🌐 JavaScript">

       <Github fname="contract.ts" language="javascript"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-ts/01-basic-auction/src/contract.ts#L4-L12"
                start="4" end="12" />

        <details> 
        
            <summary> Decorators </summary>

            Let's take a closer look at the decorator on `AuctionContract` and what it does:

            - `NearBindgen` extends the class and its methods to make the contract serializable and deserializable to read and write to the blockchain in binary form. It also exposes the contract's methods to the outside world, allowing the contract to be interacted with.
            - `requireInit` specifies that the contract has to be initialized using a method.

        </details>

        - `bid` is typed `BigInt` for storing a number of $NEAR tokens in `yoctonear` (10^-24 NEAR).
        - `bidder` is typed `AccountId` to automatically check whether the account address is valid.


    </TabItem>
    <TabItem value="rust" label="🦀 Rust">

        <Github fname="lib.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/01-basic-auction/src/lib.rs#L2-L17"
                start="5" end="17" />

        <details> 
        
            <summary> Macros </summary>

            Let's take a closer look at the macros the structures implement and what they do.

            `Contract` has the macros:
            - **contract_state**: enables borsh serialization and deserialization to read and write the structure to the blockchain in binary form, and generates a schema for the structure.
            - **serializers**: enables both borsh and JSON serialization and deserialization. The JSON serializer allows for the whole contract state to be outputted in JSON form. Although borsh is already enabled by contract_state, we have to specify it again in serializers if we want to add JSON. 
            - **PanicOnDefault**: forces the contract to have custom initialization (we will see this later). 

            `Bid` has the macros:
            - **serializers**: enables both borsh and JSON serialization and deserialization.
            - **Clone**: allows a Bid object to be duplicated.

        </details>

        - `bid` is typed `NearToken` for storing a number of $NEAR tokens. The type makes it easier to handle $NEAR tokens by implementing methods to express the value in `yoctonear` (10^-24 $NEAR), `milinear` and `near`. 
        - `bidder` is typed `AccountId` to automatically check whether the account address is valid.
        - `auction_end_time` is of type `U64`. Since u64 has to be converted to a string for input and output U64 automates the type casting between u64 and string.

    </TabItem>
</Tabs>


---

### Initializing the contract

Now let's take a look at the contract's methods.

First, the contract has an initialization function that determines the initial state of the contract. This contract requires custom initialization meaning the user is required to input parameters to determine the initial state of the contract.


<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

       <Github fname="contract.ts" language="javascript"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-ts/01-basic-auction/src/contract.ts#L14-L18"
                start="14" end="18" />

         <details> 
        
            <summary> Decorators </summary>

            Let's take a closer look at the decorator on `init` and what it does:

            - `initialize` denotes that `init` is an initialization function and can only be called once.
            - `privateFunction` is used to restrict the function to only be called by the account on which the contract is deployed.

        </details>

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Github fname="lib.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/01-basic-auction/src/lib.rs#L19-L31"
                start="19" end="31" />


         <details> 
        
            <summary> Macros </summary>

            Let's take a closer look at the macros and what they do:

            - The implementation of `Contract` is decorated with the `near` macro to declare that the methods inside of Contract can be called by the outside world.
            - `init` has the macro `init` to denote it is an initialization function and can only be called once.
            - `init` has the macro `private` to restrict the function to only be called by the account on which the contract is deployed.

        </details>


    </TabItem>

</Tabs>

When this function is called, the caller will decide the `end_time`, `bid` will be set to one yoctoNEAR and the `bidder` will be set to the account on which the contract is deployed so that if no one bids, no one will win the auction.

---

### Placing a bid

An auction isn't an auction if you can't place a bid! The contract has a `bid` method that allows a user to place a bid by attaching $NEAR tokens to the method call. A successful implementation of the `bid` method will check whether the auction is still ongoing, check whether their bid is higher than the previous and, if it meets both criteria, it will update the `highest_bid` field accordingly and return tokens back to the previous bidder.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        <Github fname="contract.ts" language="javascript"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-ts/01-basic-auction/src/contract.ts#L20-L40"
                start="20" end="40" />

        When the user calls the `bid` method they will transfer $NEAR tokens to the contract; to enable the transfer of $NEAR tokens we set `payableFunction` to `true`. This method is what we call a "change method", also known as a "call method"; we know this as it has the `call` decorator. Change methods, by name, change the state of the contract and require the user to attach gas. 

        There are some specifics to this method that we should take a closer look at: 

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Github fname="lib.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/01-basic-auction/src/lib.rs#L33-L59"
                start="33" end="59" />

        When the user calls the `bid` method they will transfer $NEAR tokens to the contract; to enable the transfer of $NEAR tokens we need to decorate the method with the `payable` macro. This method is what we call a "change method", also known as a "call method"; we know this since it passes a mutable reference to `self` ($mut self). Change methods, by name, change the state of the contract and require the user to attach gas.

        There are some specifics to this method that we should take a closer look at: 

        - We use `require` as opposed to `assert` as it reduces the contract size by not including file and rust-specific data in the panic message.

    </TabItem>

</Tabs>

- The `block timestamp` is used to determine whether the auction is still ongoing. It gives the time as the number of nanoseconds since January 1, 1970, 0:00:00 UTC.
- The `predecessor` gives the account (or contract) that directly called the bid method, this can be different to the signer who initially signed the transaction leading to the execution of this method. If pivortex.near calls a contract proxy-contract.near which then calls bid on this contract the predecessor would be proxy-contract.near and the signer would be pivortex.near. For security purposes, so a malicious contract can't place a bid, we stick with predecessor using here.
- The contract returns a `promise` that will execute the transfer of $NEAR tokens back to the previous bidder.

---

### Viewing the contract state
 
The contract also implements "view methods"; these allows the user to view the data stored on the contract. View methods don't require any gas but cannot change the state of the contract. For example, this could be used to view, in the frontend, what the highest bid amount was so we make sure that we place a higher bid.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        View methods are decorated with `view`.

        <Github fname="contract.ts" language="javascript"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-ts/01-basic-auction/src/contract.ts#L42-L45"
                start="42" end="45" />

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        View methods take an immutable reference to `self` (&self).

        <Github fname="lib.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/01-basic-auction/src/lib.rs#L61-L63"
                start="61" end="63" />

    </TabItem>

</Tabs>


The contract has further view methods that follow a very similar structure. 

---

## Contract tests

Ok, now we've seen the contract we need to make sure it works as expected; this is done through testing. It's good practice to implement exhaustive tests so you can ensure that any little change to your code down the line doesn't break your contract.

---

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">
 
        Enter sandbox-test > main.ava.js

        NEAR Workspaces allow you to deploy your contract (or contracts) in a sandbox to interact with it in a realistic environment. Here we are using AVA for testing.

        ---

        #### Setup before a test

        Before running a test it's essential to perform some setup steps.
        1) Create a sandbox environment.
        2) Create accounts to interact with the contract.
        3) Deploy the contract.
        4) Initialise the contract 
        5) Store the sandbox and accounts in the test's context.

        Here the sandbox is created.

        <Github fname="main.ava.js" language="javascript"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-ts/01-basic-auction/sandbox-test/main.ava.js#L9-L12"
                start="9" end="12" />

        Next, the test creates a couple of user accounts that are used to send transactions from. Each account is given an account ID and an initial balance. 

        <Github fname="main.ava.js" language="javascript"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-ts/01-basic-auction/sandbox-test/main.ava.js#L15-L17"
                start="15" end="17" />

        Then the contract is deployed to an account named "contract". The compiled contract comes from the test running the `build` script in the `package.json` file.

        <Github fname="main.ava.js" language="javascript"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-ts/01-basic-auction/sandbox-test/main.ava.js#L22"
                start="22" end="22" />

        To initialize the contract, `init` is called with `end_time` set to 60 seconds in the future.

        <Github fname="main.ava.js" language="javascript"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-ts/01-basic-auction/sandbox-test/main.ava.js#L22"
                start="25" end="27" />

        Lastly, the sandbox and accounts are saved in the test's context so they can be used later.

        <Github fname="main.ava.js" language="javascript"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-ts/01-basic-auction/sandbox-test/main.ava.js#L30-L31"
                start="30" end="31" />

        ---

        #### Tests

        In our file there are three different tests:
        1) One bid is placed.
        2) Two bids are placed. 
        3) A bid is placed, the auction ends, and a second bid is attempted.

        We'll take a look at the last two.

        In this test, it checks that the highest bidder is properly recorded when two bids are placed and that the lesser bidder is refunded.

        <Github fname="main.ava.js" language="javascript"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-ts/01-basic-auction/sandbox-test/main.ava.js#L52-L66"
                start="52" end="66" />

        In the next test it simply checks that bids cannot be placed after the auction closes. Time in the sandbox is moved forward using `fastForward`.

        <Github fname="main.ava.js" language="javascript"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-ts/01-basic-auction/sandbox-test/main.ava.js#L68-L79"
                start="68" end="79" />

        ---

        #### Closing the sandbox

        After a test is run the sandbox should be closed.

        <Github fname="main.ava.js" language="javascript"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-ts/01-basic-auction/sandbox-test/main.ava.js#L34-L39"
                start="34" end="39" />

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        #### Unit tests

        Unit tests are used to test contract methods individually. Let's look at a test that ensures the contract is initialized properly.

        <Github fname="lib.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/01-basic-auction/src/lib.rs#L78-L93"
                start="78" end="93" />

        - First, the test creates a new contract and initializes it with an `auction_end_time` of 1000 (in reality this is very low but it doesn't matter in this context).

        - Next, the test calls `get_highest_bid` and checks that the `bidder` and `bid` are as expected.

        - Lastly, the test calls `get_auction_end_time` and checks that the `end_time` is as expected.

        Simple enough!

        ---

        #### Integration tests

        Integration tests allow you to deploy your contract (or contracts) in a sandbox to interact with it in a realistic environment where, for example, accounts have trackable balances.

        Enter tests > test_basics.rs

        First, the sandbox testing environment is created and the compiled auction contract is fetched.

        <Github fname="test_basics.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/01-basic-auction/tests/test_basics.rs#L8-L11"
                start="8" end="11" />


        Next, the test creates a couple of user accounts that are used to send transactions from. Each account is given an account ID and an initial balance.

        <Github fname="test_basics.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/01-basic-auction/tests/test_basics.rs#L13-L20"
                start="13" end="20" />

        Likewise, a "contract" account is created and the contract WASM is deployed to it.

        <Github fname="test_basics.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/01-basic-auction/tests/test_basics.rs#L37"
                start="37" end="37" />

        To initialize the contract `init` is called with `end_time` set to 60 seconds in the future. Afterward, it's checked that the transaction was successful. 

        <Github fname="test_basics.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/01-basic-auction/tests/test_basics.rs#L39-L49"
                start="39" end="49" />


        Now the contract is deployed and initialized, bids are made to the contract and it's checked that the state changes as intended.

        <Github fname="test_basics.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/01-basic-auction/tests/test_basics.rs#L67-L79"
                start="67" end="79" />


        When testing we should also check that the contract does not allow invalid calls. The next part checks that the contract doesn't allow for bids with fewer $NEAR tokens than the previous to be made.

        <Github fname="test_basics.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/01-basic-auction/tests/test_basics.rs#L82-L94"
                start="82" end="94" />

    </TabItem>

</Tabs>
---

## Testing and deploying 

Cool, now we've seen how tests are written, let's go ahead and run the tests. We'll then build and deploy the contract to testnet.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        Install dependencies

        ```
        npm install
        ```

        Run tests and build the contract WASM

        ```
        npm run test 
        ```

        You'll need a testnet account to deploy the contract to, so if you don't have one you can use

        ```
        near account create-account sponsor-by-faucet-service <accountId> autogenerate-new-keypair 
        ```

        Then deploy and initialize the contract with


        ```
        near contract deploy <accountId> use-file build/hello_near.wasm with-init-call init json-args '{"end_time": "300000000000000000"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' network-config testnet
        ```


    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        Run tests

        ```
        cargo test
        ```

        If all the tests are successful we can build the contract WASM

        ```
        cargo near build
        ```

        You'll need a testnet account to deploy the contract to, so if you don't have one you can use

        ```
        cargo near create-dev-account use-random-account-id
        ```

        Then deploy and initialize the contract with

        ```
        cargo near dep0loy <accountId> with-init-call init json-args '{"end_time": "300000000000000000"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' network-config testnet
        ```

    </TabItem>

</Tabs>


Now the contract is deployed and initialized we can send transactions to it using the CLI. NEAR's CLI is interactive meaning you can type `near` and click through all the possible options without having to remember certain commands. But here you can use the following full commands to call the contract's methods:

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

In this part of the tutorial, we've seen how a smart contract stores data, mutates the stored data and views the data. We also looked at how tests are written and how to execute them. Finally, we learned to compile, deploy and interact with the contract through the CLI on testnet. In the [next part](./2-locking.md), we'll edit the existing contract and add a new method so the contract to learn how to lock a contract. 