---
id: storage
title: State
sidebar_label: State (Storage)
hide_table_of_contents: true
---





Smart contracts store data in their account's state, which is public on the chain. The storage starts **empty** until a contract is deployed and the state is initialized.

It is important to know that the account's **code** and account's **storage** are **independent**. [Updating the code](../release/upgrade.md) does **not erase** the state.

<hr class="subsection" />

<ExplainCode languages="js,rust,python" >

<Block highlights='{"js": "3-6,10-13", "python": "7,10-14,17,20"}' fname="auction">

    ### Defining the State
    The attributes of the `class` marked as the contract define the data that will be stored.

    The contract can store all native types (e.g. `number`, `string`, `Array`, `Map`) as well as complex objects.

    For example, our Auction contract stores when the auction ends, and an object representing the highest bid.

    **Note:** The SDK also provides [collections](./collections.md) to efficiently store collections of data.

</Block>

<Block highlights='{"rust": "6-9,13-18"}' fname="auction">

    ### Defining the State
    The attributes of the `struct` marked as the contract define the data that will be stored.

    The contract can store all native types (e.g. `u8`, `string`, `HashMap`, `Vector`) as well as complex objects.

    For example, our Auction contract stores when the auction ends, and an object representing the highest bid.

    **Note:** The structures that will be saved need a special macro, that tells the SDK to store them [serialized in Borsh](./serialization.md).

    **Note:** The SDK also provides [collections](./collections.md) to efficiently store collections of data.

</Block>

<Block highlights='{"js":"", "rust": "", "python": ""}' fname="auction" type='info'>

:::warning

Contracts pay for their storage by locking part of their balance.

It currently costs ~**1Ⓝ** to store **100KB** of data.

:::

</Block>

<Block highlights='{"js": "", "rust": "", "python": ""}' fname="auction" >

    ### Initializing the State
    After the contract is deployed, its state is empty and needs to be initialized with
    some initial values.

    There are two ways to initialize a state:
      1. By creating an initialization function
      2. By setting default values

</Block>

<Block highlights='{"js": "8,15-20", "python": "3-22"}' fname="auction">

    ### I. Initialization Functions
    An option to initialize the state is to create an `initialization` function, which needs to be called before executing any other function.

    In our Auction example, the contract has an initialization function that sets when the auction ends. Note the `@initialization` decorator, and the forced initialization on `NearBindgen`.

    **Note:** It is a good practice to mark initialization functions as private. We will cover function types in the [functions section](./functions.md).

</Block>

<Block highlights='{"python": "15-30", "js": "10-13"}' fname="auction" type='info'>

:::warning

In Python, you need to manage the state initialization explicitly. The SDK doesn't enforce that initialization happens before other methods are called - you'll need to add your own checks if required.

:::

</Block>

<Block highlights='{"rust": "12,22-34"}' fname="auction">

    ### I. Initialization Functions
    An option to initialize the state is to create an `initialization` function, which needs to be called before executing any other function.

    In our Auction example, the contract has an initialization function that sets when the auction ends. The contract derives the `PanicOnDefault`, which forces the user to call the init method denoted by the `#[init]` macro.

    **Note:** It is a good practice to mark initialization functions as private. We will cover function types in the [functions section](./functions.md).

</Block>

<Block highlights='{"js": "5", "python": "5"}' fname="hello">

    ### II. Default State
    Another option to initialize the state is to set default values for the attributes of the class.

    Such is the case for our "Hello World" contract, which stores a `greeting` with the default value `"Hello"`.

    The first time the contract is called (somebody executes `get_greeting` or `set_greeting`), the default values will be stored in the state, and the state will be considered initialized.

    **Note:** The state can only be initialized once.

</Block>

<Block highlights='{"rust": "10-16"}' fname="hello">

    ### II. Default State
    Another option to initialize the state is to create a `Default` version of our contract's `struct`.

    For example, our "Hello World" contract has a default state with a `greeting` set to `"Hello"`.

    The first time the contract executes, the `Default` will be stored in the state, and the state will be considered initialized.

    **Note:** The state can only be initialized once.

</Block>

<Block highlights='{"js": "", "rust":"", "python": ""}' fname="hello">

    ### Lifecycle of the State
    When a function is called, the contract's state is loaded from the storage and put into memory.

    The state is actually [stored serialized](./serialization.md), and the SDK takes a bit of time to deserialize it before the method can access it.

    When the method finishes executing successfully, all the changes to the state are serialized, and saved back to the storage.

</Block>

<Block highlights='{"js": "", "rust":"", "python": ""}' fname="hello" type='info'>

:::warning State and Code

In NEAR, the contract's code and contract's storage are **independent**.

Updating the code of a contract does **not erase** the state, and can indeed lead to unexpected behavior or errors.

Make sure to read the [updating a contract](../release/upgrade.md) if you run into issues.

:::

</Block>

```js
import { NearBindgen, near, call, view, AccountId, NearPromise, initialize, assert } from "near-sdk-js";

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

  @initialize({ privateFunction: true })
  init({ end_time, auctioneer}: { end_time: bigint, auctioneer: AccountId}) {
    this.auction_end_time = end_time;
    this.highest_bid = { bidder: near.currentAccountId(), bid: BigInt(1) };
    this.auctioneer = auctioneer;
  }

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

  @call({})
  claim() {
    assert(this.auction_end_time <= near.blockTimestamp(), "Auction has not ended yet");
    assert(!this.claimed, "Auction has been claimed");
    this.claimed = true;
    return NearPromise.new(this.auctioneer).transfer(this.highest_bid.bid)
  }

  @view({})
  get_highest_bid(): Bid {
    return this.highest_bid;
  }

  @view({})
  get_auction_end_time(): BigInt {
    return this.auction_end_time;
  }
```

```js
import { NearBindgen, near, call, view } from 'near-sdk-js';

@NearBindgen({})
class HelloNear {
  greeting: string = 'Hello';

  static schema = { // JS contracts need a schema
    "greeting": "string"
  };

  @view({}) // This method is read-only and can be called for free
  get_greeting(): string {
    return this.greeting;
  }

  @call({}) // This method changes the state, for which it cost gas
  set_greeting({ greeting }: { greeting: string }): void {
    near.log(`Saving greeting ${greeting}`);
```

```rust
use near_sdk::json_types::U64;
use near_sdk::{env, near, require, AccountId, NearToken, PanicOnDefault, Promise};

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

#[near]
impl Contract {
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

    pub fn get_highest_bid(&self) -> Bid {
        self.highest_bid.clone()
    }

    pub fn get_auction_end_time(&self) -> U64 {
        self.auction_end_time
    }
```

```rust
use near_sdk::{log, near};

// Define the contract structure
#[near(contract_state)]
pub struct Contract {
    greeting: String,
}

// Define the default, which automatically initializes the contract
impl Default for Contract {
    fn default() -> Self {
        Self {
            greeting: "Hello".to_string(),
        }
    }
}

// Implement the contract structure
#[near]
impl Contract {
    // Public method - returns the greeting saved, defaulting to DEFAULT_GREETING
    pub fn get_greeting(&self) -> String {
        self.greeting.clone()
    }

    // Public method - accepts a greeting, such as "howdy", and records it
    pub fn set_greeting(&mut self, greeting: String) {
        log!("Saving greeting: {}", greeting);
        self.greeting = greeting;
    }
}

```

```python

class AuctionContract(Contract):
    @init
    def initialize(self, end_time, auctioneer):
        """Initialize the auction contract with an end time and auctioneer account"""
        # Save auction end time
        self.storage["auction_end_time"] = end_time
        
        # Initialize highest bid with current account and 1 yocto
        initial_bid = {
            "bidder": self.current_account_id,
            "bid": ONE_YOCTO
        }
        self.storage["highest_bid"] = initial_bid
        
        # Set auctioneer
        self.storage["auctioneer"] = auctioneer
        
        # Initialize claimed status
        self.storage["claimed"] = False
        
        return {"success": True}
    
    @call
    def bid(self):
        """Place a bid in the auction"""
        # Get auction end time
        auction_end_time = self.storage["auction_end_time"]
        
        # Assert the auction is still ongoing
        current_time = self.block_timestamp
        if current_time >= auction_end_time:
            raise InvalidInput("Auction has ended")
        
        # Current bid
        bid_amount = self.attached_deposit
        bidder = self.predecessor_account_id
        
        # Get last bid
        highest_bid = self.storage["highest_bid"]
        last_bidder = highest_bid["bidder"]
        last_bid = highest_bid["bid"]
        
        # Check if the deposit is higher than the current bid
        if bid_amount <= last_bid:
            raise InvalidInput("You must place a higher bid")
        
        # Update the highest bid
        new_highest_bid = {
            "bidder": bidder,
            "bid": bid_amount
        }
        self.storage["highest_bid"] = new_highest_bid
        
        # Log the new bid
        self.log_event("new_bid", {
            "bidder": bidder,
            "amount": bid_amount
        })
        
        # Transfer tokens back to the last bidder
        return CrossContract(last_bidder).transfer(last_bid).value()
    
    @call
    def claim(self):
        """Claim the auction proceeds after it has ended"""
        # Get auction end time and claimed status
        auction_end_time = self.storage["auction_end_time"]
        claimed = self.storage.get("claimed", False)
        
        # Assert the auction has ended
        current_time = self.block_timestamp
        if current_time <= auction_end_time:
            raise InvalidInput("Auction has not ended yet")
        
        # Assert the auction has not been claimed
        if claimed:
            raise InvalidInput("Auction has already been claimed")
        
        # Mark as claimed
        self.storage["claimed"] = True
        
        # Get highest bid and auctioneer
        highest_bid = self.storage["highest_bid"]
        auctioneer = self.storage["auctioneer"]
        
        # Log the claim
        self.log_event("auction_claimed", {
            "winner": highest_bid["bidder"],
            "amount": highest_bid["bid"]
        })
        
        # Transfer tokens to the auctioneer
        return CrossContract(auctioneer).transfer(highest_bid["bid"]).value()
    
    @view
    def get_highest_bid(self):
        """Returns the current highest bid information"""
        return self.storage.get("highest_bid")
    
    @view
    def get_auction_end_time(self):
        """Returns the auction end time"""
        return self.storage.get("auction_end_time")
    
    @view
    def get_auction_status(self):
        """Returns the overall status of the auction"""
        current_time = self.block_timestamp
        auction_end_time = self.storage["auction_end_time"]
        highest_bid = self.storage["highest_bid"]
        claimed = self.storage.get("claimed", False)
        
        return {
            "is_active": current_time < auction_end_time,
            "time_remaining": max(0, auction_end_time - current_time),
            "highest_bidder": highest_bid["bidder"],
            "highest_bid": highest_bid["bid"],
            "claimed": claimed,
            "auctioneer": self.storage["auctioneer"]
        }

```

```python
class HelloNear:
    @init
    def new(self):
        # Initialize state with default greeting
        self.storage["greeting"] = "Hello"
    
    @view
    def get_greeting(self) -> str:
        """Returns the current greeting"""
        return self.storage["greeting"]
    
    @call
    def set_greeting(self, message: str) -> str:
        """Sets a new greeting"""
        self.storage["greeting"] = message
        return message

```

</ExplainCode>
