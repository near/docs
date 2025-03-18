---
id: types
title: SDK Types
hide_table_of_contents: true
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs";
import CodeBlock from '@theme/CodeBlock';

import {ExplainCode, Block, File} from '@site/src/components/CodeExplainer/code-explainer';

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

<Block highlights='{"python":"6,9,12,15"}' fname="hello-near">

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

<Block highlights='{"js":"3-6", "rust": "6-9", "python": "5-7"}' fname="auction">

    ### Complex Objects
    Smart contracts can store and return complex objects

    **Note:** Objects will always be received and returned as JSON

</Block>

<Block highlights='{"rust": "4"}' fname="auction">

    #### Serializers
    Objects that will be used as input or output need to be serializable to JSON, add the `#[near(serializer=json)]` macro

    Objects that will be stored in the contract's state need to be serializable to Borsh, add the `#[near(serializer=borsh)]` macro

</Block>

<Block highlights='{"python": "18,19"}' fname="auction">

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

<Block highlights='{"python": "10,27"}' fname="auction">

    ### Handling Tokens
    `$NEAR` tokens are represented as integers in Python, with values in `yoctoNEAR`. 
    The `near_sdk_py.constants` module provides `ONE_NEAR` and `ONE_TGAS` constants.

    **Note:** 1 NEAR = 10^24 yoctoNEAR

</Block>

<Block highlights='{"js": "4,29", "rust": "7,46", "python": "22,25"}' fname="auction">

    ### Account
    The SDK exposes a special type to handle NEAR Accounts, which automatically checks if the account address is valid

</Block>

<Block highlights='{"python": "22,25"}' fname="auction">

    ### Account IDs
    In Python, NEAR account IDs are represented as `str` types. The SDK performs validation 
    when account IDs are used in contract calls or cross-contract interactions.

</Block>

<File language="js" fname="hello-near"
    url="https://github.com/near-examples/hello-near-examples/blob/main/contract-ts/src/contract.ts"
    start="2" end="18" />

<File language="rust" fname="hello-near"
    url="https://github.com/near-examples/hello-near-examples/blob/main/contract-rs/src/lib.rs"
    start="2" end="32" />

<File language="python" fname="hello-near">
# Import the necessary components from the NEAR SDK
from near_sdk_py import view, call, init

class HelloNear:
    def __init__(self):
        # Initialize state with default greeting
        self.greeting = "Hello"
    
    @view
    def get_greeting(self):
        """Returns the current greeting"""
        return self.greeting
    
    @call
    def set_greeting(self, message):
        """Sets a new greeting"""
        self.greeting = message
        return self.greeting
</File>

<File language="js" fname="auction"
    url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-ts/01-basic-auction/src/contract.ts"
    start="2" end="61" />

<File language="rust" fname="auction"
    url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/01-basic-auction/src/lib.rs"
    start="2" end="84" />

<File language="python" fname="auction">
from near_sdk_py import view, call, init, Context
from near_sdk_py.constants import ONE_NEAR

class Auction:
    def __init__(self):
        # Initialize state variables
        self.auction_end = 0  # Timestamp when auction ends
        self.highest_bid = {
            "account_id": "",
            "amount": 0
        }
    
    @init
    def initialize(self, duration_minutes):
        """Initialize the auction with a duration in minutes"""
        current_time_ms = Context.block_timestamp()
        self.auction_end = current_time_ms + (duration_minutes * 60 * 1000)
        return {"auction_end": self.auction_end}
    
    @call
    def place_bid(self):
        """Places a bid using the attached deposit"""
        # Get the caller's account ID
        account_id = Context.predecessor_account_id()
        
        # Get the attached deposit in yoctoNEAR
        deposit = Context.attached_deposit()
        
        # Check if auction has ended
        current_time = Context.block_timestamp()
        if current_time > self.auction_end:
            raise Exception("Auction has ended")
        
        # Check if bid is higher than current highest bid
        if deposit <= self.highest_bid["amount"]:
            raise Exception("Bid is not higher than current highest bid")
        
        # Set the new highest bid
        self.highest_bid = {
            "account_id": account_id,
            "amount": deposit
        }
        
        return self.highest_bid
</File>

</ExplainCode>
