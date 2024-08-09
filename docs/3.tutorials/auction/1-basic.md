---
id: basic-auction
title: Basic Auction
sidebar_label: Basic Auction
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Github, Language} from "@site/src/components/codetabs"

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

        - `bid` is typed `BigInt` which stores a number of $NEAR tokens in `yoctonear` (10^-24 NEAR).
        - `bidder` is typed `AccountId` which automatically check whether the account address is valid.


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
        - `bidder` is typed `AccountId` which automatically check whether the account address is valid.
        - `auction_end_time` is of type `U64`. Since u64 has to be converted to a string for input and output, U64 automates the type casting between u64 and string.

    </TabItem>
</Tabs>


---

### Initializing the contract

Now let's take a look at the contract's methods.

First, the contract has an initialization method that determines the initial state of the contract. This contract requires custom initialization meaning the user is required to input parameters to determine the initial state.


<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

       <Github fname="contract.ts" language="javascript"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-ts/01-basic-auction/src/contract.ts#L14-L18"
                start="14" end="18" />

         <details> 
        
            <summary> Decorators </summary>

            Let's take a closer look at the decorator on `init` and what it does:

            - `initialize` denotes that `init` is an initialization method meaning it can only be called once and has to be the first method to be called.
            - `privateFunction` is used to restrict the method to only be called by the account on which the contract is deployed.

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
            - `init` has the macro `init` to denote it is an initialization method meaning it can only be called once and has to be the first method to be called.
            - `init` has the macro `private` to restrict the method to only be called by the account on which the contract is deployed.

        </details>

    </TabItem>

</Tabs>

When this method is called, the caller will decide the `end_time`, `bid` will be set to one yoctoNEAR and the `bidder` will be set to the account on which the contract is deployed so that if no one bids, no one will win the auction.

---

### Placing a bid

An auction isn't an auction if you can't place a bid! The contract has a `bid` method that allows a user to place a bid by attaching $NEAR tokens to the method call. A successful implementation of the `bid` method will check whether the auction is still ongoing, check whether their bid is higher than the previous and, if it meets both criteria, it will update the `highest_bid` field accordingly and return tokens back to the previous bidder.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        <Github fname="contract.ts" language="javascript"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-ts/01-basic-auction/src/contract.ts#L20-L40"
                start="20" end="40" />

        When the user calls the `bid` method they will transfer $NEAR tokens to the contract; to enable the transfer of $NEAR tokens we set `payableFunction` to `true`. The method is decorated with `call` so the state of the contract can be changed within the method. These types of methods require a user to sign the transaction that calls the method and requires the user to attach gas.

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Github fname="lib.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/01-basic-auction/src/lib.rs#L33-L59"
                start="33" end="59" />

        When the user calls the `bid` method they will transfer $NEAR tokens to the contract; to enable the transfer of $NEAR tokens we need to decorate the method with the `payable` macro. The method takes a mutable reference to `self` (&mut self) so the state of the contract can be changed within the method. These types of methods require a user to sign the transaction that calls the method and requires the user to attach gas. 

        <details> 
        
            <summary> require over assert </summary>

                Require has been used here as opposed to assert as it reduces the contract 
                size by not including file and rust-specific data in the panic message.

        </details>    
    </TabItem>

</Tabs>

There are some specifics to this method that we should take a closer look at: 


- The `block timestamp` is used to determine whether the auction is still ongoing. It gives the time as the number of nanoseconds since January 1, 1970, 0:00:00 UTC.
- The `predecessor` gives the account (or contract) that directly called the bid method, this can be different to the signer who initially signed the transaction leading to the execution of this method. If pivortex.near calls a contract proxy-contract.near which then calls bid on this contract the predecessor would be proxy-contract.near and the signer would be pivortex.near. For security purposes, so a malicious contract can't place a bid in your name, we stick with predecessor using here.
- The contract returns a `Promise` that will execute the transfer of $NEAR tokens back to the previous bidder.

Note that in the case of the first bid the contract will send 1 YoctoNEAR to itself, this is fine as we can safely assume that the contract will have the lowest denomination of NEAR available to send to itself.

---

### Viewing the contract state
 
The contract implements methods that do not change the contract's state but just view it. These methods don't require gas. We would want, for example, a method to see, in the frontend, what the highest bid amount was so we make sure to place a higher bid. 


<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        View methods are decorated with `view` so they cannot change the contract's state.

        <Github fname="contract.ts" language="javascript"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-ts/01-basic-auction/src/contract.ts#L42-L45"
                start="42" end="45" />

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        View methods take an immutable reference to `self` (&self) so they cannot change the contract's state.

        <Github fname="lib.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/01-basic-auction/src/lib.rs#L61-L63"
                start="61" end="63" />

    </TabItem>

</Tabs>


The contract has two further view methods: the first retrieves the end time of the auction and the second retrieves all the information stored in the `Contract` struct.

---

## Contract tests

Ok, now we've seen the contract we need to make sure it works as expected; this is done through testing. It's good practice to implement exhaustive tests so you can ensure that any little change to your code down the line doesn't break your contract.

In our rust repository, we have a unit test to check that the contract is initialized properly. Unit tests are used to test contract methods individually, these tests work well when little context is required. However, because our contract has operations like sending accounts $NEAR tokens, which happen external to the contract, we need an environment to test the contract.

---

## Sandbox testing

Integration tests allow you to deploy your contract (or contracts) in a sandbox to interact with it in a realistic environment where, for example, accounts have trackable balances Throughout this section, you'll see there is just one large test. This is because the contract only has one possible flow meaning all methods can be properly tested in one test. 

---

### Creating the sandbox

The first thing the test does is create the sandbox environment.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        Enter sandbox-test > main.ava.js

        <Github fname="main.ava.js" language="javascript"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-ts/01-basic-auction/sandbox-test/main.ava.js#L12"
                start="12" end="12" />

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        Enter tests > test_basics.rs

        <Github fname="test_basics.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/01-basic-auction/tests/test_basics.rs#L10"
                start="10" end="10" />

    </TabItem>

</Tabs>

---

### Creating user accounts

Next, the test creates a couple of user accounts that will be used to send transactions to the contract. Each account is given an account ID and an initial balance.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        <Github fname="main.ava.js" language="javascript"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-ts/01-basic-auction/sandbox-test/main.ava.js#L15-L18"
                start="15" end="18" />

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Language value="rust" language="rust">
            <Github fname="Call create_subaccount" 
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/01-basic-auction/tests/test_basics.rs#L16-L17"
                start="12" end="17" />
            <Github fname="create_subaccount definition" 
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/01-basic-auction/tests/test_basics.rs#L93-L105"
                start="93" end="105" />
        </Language>

    </TabItem>

</Tabs>

---

### Deploying the contract

Likewise, a "contract" account is created and the contract WASM is deployed to it.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        The contract comes from compiling the contract to WASM using the build script in the `package.json` file and then reading it.

        <Github fname="main.ava.js" language="javascript"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-ts/01-basic-auction/sandbox-test/main.ava.js#L22"
                start="22" end="22" />

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        The contract comes from the test compiling the contract to WASM using `cargo near build` and then reading it.

        <Github fname="test_basics.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/01-basic-auction/tests/test_basics.rs#L11"
                start="20" end="21" />

    </TabItem>

</Tabs>

---

### Initializing the contract

To initialize the contract `init` is called with `end_time` set to 60 seconds in the future.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        <Github fname="main.ava.js" language="javascript"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-ts/01-basic-auction/sandbox-test/main.ava.js#L25-L27"
                start="25" end="27" />

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Github fname="test_basics.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/01-basic-auction/tests/test_basics.rs#L23-L32"
                start="23" end="32" />

    </TabItem>

</Tabs>

---

### Testing methods

Now the contract is deployed and initialized, bids are made to the contract and it's checked that the state changes as intended. 

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        <Github fname="main.ava.js" language="javascript"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-ts/01-basic-auction/sandbox-test/main.ava.js#L45-L48"
                start="45" end="48" />

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Github fname="test_basics.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/01-basic-auction/tests/test_basics.rs#L35-L46"
                start="35" end="46" />

    </TabItem>

</Tabs>

---

### Checking user balances

When a higher bid is placed the previous bidder should be returned the $NEAR they bid. This is checked by querying the $NEAR balance of the user account. We might think that the test would check whether Alice's balance is back to 10 $NEAR but it does not. This is because some $NEAR is consumed as `gas` fees when Alice calls `bid`. Instead, Alice's balance is recorded after she bids, then once another user bids it checks that exactly 1 $NEAR has been added to her balance.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        <Github fname="main.ava.js" language="javascript"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-ts/01-basic-auction/sandbox-test/main.ava.js#L50-L60"
                start="50" end="60" />

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Github fname="test_basics.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/01-basic-auction/tests/test_basics.rs#L48-L66"
                start="48" end="66" />

    </TabItem>

</Tabs>

---

### Testing invalid calls

When testing we should also check that the contract does not allow invalid calls. The next part checks that the contract doesn't allow for bids with fewer $NEAR tokens than the previous to be made.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        <Github fname="main.ava.js" language="javascript"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-ts/01-basic-auction/sandbox-test/main.ava.js#L63"
                start="63" end="63" />

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Github fname="test_basics.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/01-basic-auction/tests/test_basics.rs#L69-L75"
                start="69" end="75" />

    </TabItem>

</Tabs>

---

### Fast forwarding time

To test the contract when the auction is over the test uses `fast forward` to advance time in the sandbox. Note that fast forward takes the number of blocks to advance not the number of seconds. The test advances 200 blocks so the time will now be past the minute auction end time that was set. 

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        <Github fname="main.ava.js" language="javascript"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-ts/01-basic-auction/sandbox-test/main.ava.js#L65-L66"
                start="65" end="66" />

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Github fname="test_basics.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/01-basic-auction/tests/test_basics.rs#L77-L79"
                start="77" end="79" />

    </TabItem>

</Tabs>

Now that the auction has ended the contract shouldn't allow any more bids.

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

        <Github fname="main.ava.js" language="javascript"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-ts/01-basic-auction/sandbox-test/main.ava.js#L69"
                start="69" end="69" />

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        <Github fname="test_basics.rs" language="rust"
                url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/01-basic-auction/tests/test_basics.rs#L82-L88"
                start="82" end="88" />

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
        near contract deploy <accountId> use-file <path to WASM> with-init-call init json-args '{"end_time": "300000000000000000"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' network-config testnet
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
        cargo near deploy <accountId> with-init-call init json-args '{"end_time": "300000000000000000"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' network-config testnet
        ```

    </TabItem>

</Tabs>


Now the contract is deployed and initialized we can send transactions to it using the CLI. NEAR's CLI is interactive meaning you can type `near` and click through all the possible options without having to remember certain commands. But here you can use the following full commands to call the contract's methods:

Call `bid`, you may want to create another testnet account for the signer

```
near contract call-method as-transaction <contractId> bid json-args {} prepaid-gas '100.0 Tgas' attached-deposit '1 NEAR' sign-as <accountId> network-config testnet
```

Call `get_highest_bid`

```
near contract call-method as-read-only <contractId> get_highest_bid json-args {} network-config testnet now
```

---

## Conclusion 

In this part of the tutorial, we've seen how a smart contract stores data, mutates the stored data and views the data. We also looked at how tests are written and how to execute them. Finally, we learned to compile, deploy and interact with the contract through the CLI on testnet. 

There is a core problem to this contract; there needs to exist a key to the contract for the auctioneer to claim the funds. This allows for the key holder to do with the contract as they please, for example withdrawing funds from the contract at any point. In the [next part](./2-locking.md), we'll learn how to lock a contract by specifying an auctioneer on initialization who can claim the funds through a new method we'll introduce.