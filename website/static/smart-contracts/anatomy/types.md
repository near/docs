---
id: types
title: SDK Types
hide_table_of_contents: true
---






Lets discuss which types smart contracts use to input and output data, as well as how such data is stored and handled in the contract's code.

<ExplainCode languages="js,rust,python">

<Block highlights='{"js":"5,8,13"}' fname="hello-near">

    ### Native Types
    Smart contracts can receive, store and return data using JS native types:
    - `string`
    - `number`
    - `boolean`
    - `Array`
    - `Map`
    - `Object`
    - `BigInt`

</Block>

<Block highlights='{"rust":"6,13,22,27"}' fname="hello-near">

    ### Native Types
    Smart contracts can receive, store and return data using the following Rust types:
    - `string`
    - `i8-i32/u8-u32`
    - **`u64/128`**: It is preferable to use SDK types `U64` and `U128`
    - `bool`
    - `HashMap`
    - `Vector`

</Block>

<Block highlights='{"python":"11,16"}' fname="hello-near">

    ### Native Types
    Smart contracts can receive, store and return data using the following Python types:
    - `str`
    - `int`
    - `float`
    - `bool`
    - `list`
    - `dict`
    - `set`
    - `bytes`
    - `None`

</Block>

<Block highlights='{"rust": "1,15,24,81"}' fname="auction" type='info'>

:::warning `U64/U128`

Smart contracts can store `u64` and `u128`, but these types need to be converted to `string` for input/output, since JSON cannot serialize values with more than 52 bits

To simplify development, the SDK provides the `U64` and `U128` types which are automatically casted to `u64/u128` when stored, and to `string` when used as input/output

:::

</Block>

<Block highlights='{"python": "26,28"}' fname="auction" type='info'>

:::tip Python Large Numbers

Python's `int` type has unlimited precision, so it can handle large integers (like yoctoNEAR values) without any special handling. All values are automatically serialized and deserialized correctly.

:::

</Block>

<Block highlights='{"js":"3-6", "rust": "6-9", "python": "10-13"}' fname="auction">

    ### Complex Objects
    Smart contracts can store and return complex objects

    **Note:** Objects will always be received and returned as JSON

</Block>

<Block highlights='{"rust": "4"}' fname="auction">

    #### Serializers
    Objects that will be used as input or output need to be serializable to JSON, add the `#[near(serializer=json)]` macro

    Objects that will be stored in the contract's state need to be serializable to Borsh, add the `#[near(serializer=borsh)]` macro

</Block>

<Block highlights='{"python": "7,14,17,20"}' fname="auction">

    #### Serialization
    Python objects are automatically serialized and deserialized using JSON for input/output and Pickle for internal storage.

    Complex nested objects like lists and dictionaries can be used directly without additional configuration.

</Block>

<Block highlights='{"js": "5,10,28"}' fname="auction">

    ### Handling Tokens
    `$NEAR` tokens are typed as `BigInt` in JS, and their values represented in `yoctonear`

    **Note:** 1 NEAR = 10^24 yoctoNEAR

</Block>

<Block highlights='{"rust": "8,28,45"}' fname="auction">

    ### Handling Tokens
    `$NEAR` tokens are handled through the `NearToken` struct, which exposes methods to represent the value in `yoctonear`, `milinear` and `near`

    **Note:** 1 NEAR = 10^24 yoctonear

</Block>

<Block highlights='{"python": ""}' fname="auction">

    ### Handling Tokens
    `$NEAR` tokens are represented as integers in Python, with values in `yoctoNEAR`.
    The `near_sdk_py.constants` module provides `ONE_NEAR` and `ONE_TGAS` constants.

    **Note:** 1 NEAR = 10^24 yoctoNEAR

</Block>

<Block highlights='{"js": "4,29", "rust": "7,46", "python": ""}' fname="auction">

    ### Account
    The SDK exposes a special type to handle NEAR Accounts, which automatically checks if the account address is valid

</Block>

<Block highlights='{"python": ""}' fname="auction">

    ### Account IDs
    In Python, NEAR account IDs are represented as `str` types. The SDK performs validation
    when account IDs are used in contract calls or cross-contract interactions.

</Block>

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
from near_sdk_py import view, call, Contract

# Define contract class
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
```

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

</ExplainCode>
