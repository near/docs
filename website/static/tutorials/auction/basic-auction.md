---
id: basic-auction
title: Basic Auction
---




In this section, we will analyze a simple auction contract, which allows users to place bids, track the highest bidder and claim tokens at the end of the auction. After, we will cover how to test the contract, as well as how to deploy it on `testnet`.

:::info Documentation

During this tutorial, we will be relying on the [Smart Contract Documentation](../../smart-contracts/quickstart.md) and its different sections

:::

:::tip Prerequisites

Make sure to read the [Prerequisites](./0-intro.md) section and install the necessary tools before starting this tutorial

:::

---

## Cloning the contract

To get started we'll clone the [tutorial's repository](https://github.com/near-examples/auctions-tutorial) from GitHub. The repository contains the same smart contracts written in JavaScript (`./contract-ts`) and Rust (`./contract-rs`).

Navigate to the folder of the language you prefer, and then to the `01-basic-auction` folder.

<Tabs groupId="code-tabs">

  <TabItem value="js" label="🌐 JavaScript">

  ```bash
  git clone git@github.com:near-examples/auctions-tutorial.git

  cd contract-ts/01-basic-auction
  ```

  </TabItem>

  <TabItem value="rust" label="🦀 Rust">

  ```bash
  git clone git@github.com:near-examples/auctions-tutorial.git

  cd contract-rs/01-basic-auction
  ```

  </TabItem>

</Tabs>


:::info Frontend

The repository also contains a frontend application that interacts with the contract. You can find it in the `frontends` folder. We will cover the frontend in a future section

:::

---

## The Contract's State

The contract allows users to place bids using $NEAR tokens and keeps track of the highest bidder. Lets start by looking at how we define the contract's state, this is, the data that the contract will store.

<Tabs groupId="code-tabs">

  <TabItem value="js" label="🌐 JavaScript">

    ```
class Bid {
  bidder: AccountId;
  bid: bigint;
}

@NearBindgen({ requireInit: true })
class AuctionContract {
  highest_bid: Bid = { bidder: '', bid: BigInt(0) };
  auction_end_time: bigint = BigInt(0);
  auctioneer: AccountId = "";
  claimed: boolean = false;

```

    #### Decorator
    The first thing to notice is that the main class of the contract is marked using the `@NearBindgen` decorator, which allows also to further specify that the contract **must be initialized** before being used.

    #### Storage (aka State)
    Another important information revealed by the code is that a contract can store different types of data, in this case:

    - `highest_bid` is an instance of a `Bid` which stores:
        - `bid`: a `BigInt` representing an amount of $NEAR tokens in `yoctonear` (`1Ⓝ = 10^24 yⓃ`)
        - `bidder`: an `AccountId` that represents which account placed the bid
    - `auction_end_time` a `BigInt` representing a `unix timestamp` in **nanoseconds**
    - `auctioneer` an `AccountId` that states who can withdraw the funds at the end of the auction
    - `claimed` a `boolean` that tracks if the auctioneer has claimed the funds

  </TabItem>

  <TabItem value="rust" label="🦀 Rust">

    ```
#[near(serializers = [json, borsh])]
#[derive(Clone)]
pub struct Bid {
    pub bidder: AccountId,
    pub bid: NearToken,
}

#[near(contract_state)]
#[derive(PanicOnDefault)]
pub struct Contract {
    highest_bid: Bid,
    auction_end_time: U64,
    auctioneer: AccountId,
    claimed: bool,
}

```

    #### Macros
    A first thing to notice is the use of the `#[near(contract_state)]` macro to denote the main structure and derive the `PanicOnDefault` to specify that the contract **must be initialized** before being used.

    We also use the `#[near(serializers = [json, borsh])]` macro to enable both `borsh` and `JSON` (de)serialization of the `Bid` structure. As a rule of thumb: use the `json` serializer for structs that will be used as input / output of functions, and `borsh` for those that will be saved to state.

    #### Storage (aka State)
    Another important information revealed by the code is that the contract can store different types of data.

    - `highest_bid` is an instance of a `Bid` which stores:
        - `bid`: a `NearToken` which simplifies handling $NEAR token amounts
        - `bidder`: the `AccountId` that placed the bid
    - `auction_end_time` is a `U64` representing a `unix timestamp` in **nanoseconds**
    - `auctioneer` an `AccountId` that states who can withdraw the funds at the end of the auction
    - `claimed` a `boolean` that tracks if the auctioneer has claimed the funds

  </TabItem>

</Tabs>


:::tip Learn More

You can read more about the contract's structure and the type of data it can store in the following documentation pages:
- [Basic Contract's Anatomy](../../smart-contracts/anatomy/anatomy.md)
- [Contract's State](../../smart-contracts/anatomy/storage.md)
- [Data Types](../../smart-contracts/anatomy/types.md)

:::

---

## Initialization Function

Lets now take a look at the initialization function, which we need to call to determine the time at which the auction will end.

<Tabs groupId="code-tabs">

  <TabItem value="js" label="🌐 JavaScript">

    ```
  @initialize({ privateFunction: true })
  init({ end_time, auctioneer}: { end_time: bigint, auctioneer: AccountId}) {
    this.auction_end_time = end_time;
    this.highest_bid = { bidder: near.currentAccountId(), bid: BigInt(1) };
    this.auctioneer = auctioneer;
  }

```

    #### Decorator
    We denote the initialization function using the `@initialize({ privateFunction: true })` decorator. The `privateFunction:true` denotes that the function can only be called by the account on which the contract is deployed.

  </TabItem>

  <TabItem value="rust" label="🦀 Rust">

    ```
    #[init]
    #[private] // only callable by the contract's account
    pub fn init(end_time: U64, auctioneer: AccountId) -> Self {
        Self {
            highest_bid: Bid {
                bidder: env::current_account_id(),
                bid: NearToken::from_yoctonear(1),
            },
            auction_end_time: end_time,
            claimed: false,
            auctioneer,
        }
    }

```

    #### Macros
    We denote the initialization function using the `#[init]` macro. Notice that the initialization function needs to return an instance of `Self`, i.e. the contract's structure.

    Meanwhile, the `#[private]` denotes that the function can only be called by the account on which the contract is deployed.

  </TabItem>

</Tabs>

#### End Time
The end time is represented using a `unix timestamp` in **nano seconds**, and needs to be given as a `String` when calling the initialization function. This is because smart contracts cannot receive numbers larger than `52 bits` and `unix timestamps` are represented in `64 bits`.

#### Initial Bid
Notice that we initialize the contract with a `1 yoctonear` bid, made from the `current account id`. This means that, after the contract is initialized, the first bid will be placed by the contract at 10^-24 NEAR.

#### Claimed
The `claimed` field is initialized as `false`, as the auctioneer has not claimed the funds yet.

#### Auctioneer
The auctioneer is set by the deployer on initialization and is the account that will be able to claim the funds at the end of the auction.

:::tip Learn More

You can read more about the contract's interface in our [contract functions documentation](../../smart-contracts/anatomy/functions.md), and learn about data types on the [data types documentation](../../smart-contracts/anatomy/types.md).

:::

---

## Read-only Functions

The contract implements four functions to give access to its stored data, i.e. the highest bid so far (the amount and by whom), the time at which the auction ends, the auctioneer, and whether the auction has been claimed.

<Tabs groupId="code-tabs">

  <TabItem value="js" label="🌐 JavaScript">

    ```
  @view({})
  get_highest_bid(): Bid {
    return this.highest_bid;
  }

  @view({})
  get_auction_end_time(): BigInt {
    return this.auction_end_time;
  }

  @view({})
  get_auctioneer(): AccountId {
    return this.auctioneer;
  }

  @view({})
  get_claimed(): boolean {
    return this.claimed;
  }
}
```

    Functions that do not change the contract's state (i.e. that only read from it) are called `view` functions, and are decorated using the `@view` decorator.

  </TabItem>

  <TabItem value="rust" label="🦀 Rust">

    ```
    pub fn get_highest_bid(&self) -> Bid {
        self.highest_bid.clone()
    }

    pub fn get_auction_end_time(&self) -> U64 {
        self.auction_end_time
    }

    pub fn get_auctioneer(&self) -> AccountId {
        self.auctioneer.clone()
    }

    pub fn get_claimed(&self) -> bool {
        self.claimed
    }
}
```

    Functions that do not change the contract's state (i.e. that only read from it) are called `view` functions and take a non-mutable reference to `self` (`&self`).

  </TabItem>

</Tabs>

View functions are **free to call**, and do **not require** a NEAR account to sign a transaction in order to call them.

:::tip Learn More

You can read more about the contract's interface in our [contract functions documentation](../../smart-contracts/anatomy/functions.md), and learn about data types on the [data types documentation](../../smart-contracts/anatomy/types.md).

:::


---

## Bidding Function

An auction is not an auction if you can't place a bid! For this, the contract includes a `bid` function, which users will call attaching some $NEAR tokens.

The function is quite simple: it verifies if the auction is still active and compares the attached deposit with the current highest bid. If the bid is higher, it updates the `highest_bid` and refunds the previous bidder.

<Tabs groupId="code-tabs">

  <TabItem value="js" label="🌐 JavaScript">

    ```
  @call({ payableFunction: true })
  bid(): NearPromise {
    // Assert the auction is still ongoing
    assert(this.auction_end_time > near.blockTimestamp(), "Auction has ended");

    // Current bid
    const bid = near.attachedDeposit();
    const bidder = near.predecessorAccountId();

    // Last bid
    const { bidder: lastBidder, bid: lastBid } = this.highest_bid;

    // Check if the deposit is higher than the current bid
    assert(bid > lastBid, "You must place a higher bid");

    // Update the highest bid
    this.highest_bid = { bidder, bid }; // Save the new bid

    // Transfer tokens back to the last bidder
    return NearPromise.new(lastBidder).transfer(lastBid);
  }

```

  </TabItem>

  <TabItem value="rust" label="🦀 Rust">

    ```
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

  </TabItem>

</Tabs>

#### Payable Functions
The first thing to notice is that the function changes the state, and thus is marked with a `@call` decorator in JS, while taking as input a mutable reference to self (`&mut self`) on Rust. To call this function, a NEAR account needs to sign a transaction and expend GAS.

Second, the function is marked as `payable`, this is because by default **functions do not accept $NEAR tokens**! If a user attaches tokens while calling a function that is not marked as `payable`, the transaction will fail.

#### The Environment
Notice that the function can access information about the environment in which it is running, such as who called the function (`predecessor account`), how many tokens they attached as deposit (`attached deposit`), and the approximate `unix timestamp` at which the function is executing (`block timestamp`).

#### Token Transfer
The function finishes by creating a `Promise` to transfer tokens to the previous bidder. This token amount will be deducted immediately and transferred in the next block after the current function has finished executing.

Note that on the first bid, the contract will send 1 yoctonear to itself, this is fine as we can safely assume that the contract will have the lowest denomination of $NEAR available to send to itself.

<details>

<summary> Handling Funds </summary>

When a user attaches tokens to a call, the tokens are deposited to the contract's account before the function is executed. However, if the function raises an error during its execution, the tokens are immediately refunded to the user.

</details>

:::tip Learn More

You can read more about the environment variables, payable functions and which actions the contract can perform here:
- [Environment Variables](../../smart-contracts/anatomy/environment.md)
- [Payable Functions](../../smart-contracts/anatomy/functions.md)
- [Transfers and Actions](../../smart-contracts/anatomy/actions.md)

:::

---

## Claim function

You'll notice that the contract has a final function called `claim`, this allows the auctioneer to claim the funds from the contract at the end of the auction. Since, on NEAR, a smart contract account and user account are the same, contracts can still have keys when they are deployed, thus a user could just claim the funds from the contract via a wallet. However, this presents a security issue since by having a key the key holder can take the funds from the contract at any point, maliciously change the contract's state or just delete the contract as a whole. By implementing a `claim` function we can later lock the contract by removing all access keys and have the auctioneer claim the funds via preset conditions via code.

<Tabs groupId="code-tabs">

  <TabItem value="js" label="🌐 JavaScript">

    ```
  @call({})
  claim() {
    assert(this.auction_end_time <= near.blockTimestamp(), "Auction has not ended yet");
    assert(!this.claimed, "Auction has been claimed");
    this.claimed = true;
    return NearPromise.new(this.auctioneer).transfer(this.highest_bid.bid)
  }

```

  </TabItem>

  <TabItem value="rust" label="🦀 Rust">

    ```
    pub fn claim(&mut self) -> Promise {
        require!(
            env::block_timestamp() > self.auction_end_time.into(),
            "Auction has not ended yet"
        );

        require!(!self.claimed, "Auction has already been claimed");
        self.claimed = true;

        // Transfer tokens to the auctioneer
        Promise::new(self.auctioneer.clone()).transfer(self.highest_bid.bid)
    }

```

  </TabItem>

</Tabs>

This function is quite simple it does four things:
1) Checks that the auction has ended (the current timestamp is past the auction end time).
2) Checks that the auction has not yet been claimed.
3) Sets the auction as now claimed.
4) And if these conditions hold true it transfers $NEAR equal to the highest bid to the auctioneer.

:::tip Learn More

You can read more about locking contracts in this section of the documentation: [locked accounts](../../protocol/access-keys.md#locked-accounts)

:::

---

## Conclusion

In this part of the tutorial, we've seen how a smart contract stores data, mutates the stored data, and views the data. In the [next part](./1.2-testing.md), we will cover how to test the contract, so we can ensure it works as expected before deploying it to `testnet`.