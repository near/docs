---
id: types
title: SDK Types
hide_table_of_contents: true
description: "Learn everything the SDK has to offer to efficiently store data."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/UI/Codetabs";
import CodeBlock from '@theme/CodeBlock';

import {ExplainCode, Block, File} from '@site/src/components/CodeExplainer/code-explainer';

Lets discuss which types smart contracts use to input and output data, as well as how such data is stored and handled in the contract's code.

<ExplainCode languages="rust,js,python,go">

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

<Block highlights='{"go": "13-14,20-22"}' fname="auction">

    ### Native Types
    Smart contracts can receive, store and return data using the following Go types:
    - `string`
    - `uint64`, `int64`, `float64`
    - `bool`
    - Custom structs (with `json:"..."` tags for serialization)

    **Note:** Go does not have a native 128-bit integer type. Use `types.Uint128` from the SDK to handle large token amounts.

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

<Block highlights='{"go": "44,49,87"}' fname="auction" type='info'>

:::warning `types.Uint128`

Go does not have a native 128-bit integer type. The SDK provides `types.Uint128` to handle large token amounts (e.g. yoctoNEAR values).

Use `types.U128FromString(str)` to parse from a string, and `.String()` to convert back for output. Use `types.U64ToUint128(n)` for small constants.

:::

</Block>

<Block highlights='{"js":"3-6", "rust": "6-9", "python": "10-13", "go": "12-15,17-23"}' fname="auction">

    ### Complex Objects
    Smart contracts can store and return complex objects

    **Note:** Objects will always be received and returned as JSON

</Block>

<Block highlights='{"rust": "4"}' fname="auction">

    #### Serializers
    Objects that will be used as input or output need to be serializable to JSON, add the `#[near(serializer=json)]` macro

    Objects that will be stored in the contract's state need to be serializable to Borsh, add the `#[near(serializer=borsh)]` macro

</Block>

<Block highlights='{"go": "13-14,19-22"}' fname="auction">

    #### JSON Tags

    In Go, struct fields used as input, output, or contract state must have `json:"field_name"` tags. The SDK uses these tags to serialize and deserialize data automatically.

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

<Block highlights='{"go": "44,49,69,87,92"}' fname="auction">

    ### Handling Tokens
    `$NEAR` tokens are represented as `types.Uint128` in Go, with values in `yoctoNEAR`.

    - `env.GetAttachedDeposit()` returns the attached deposit as `types.Uint128`
    - `types.U128FromString(str)` parses a token amount from string
    - `types.U64ToUint128(n)` converts a small constant to `Uint128`
    - `.String()` converts back to string for storage or output

    **Note:** 1 NEAR = 10^24 yoctoNEAR

</Block>

<Block highlights='{"js": "4,29", "rust": "7,46", "python": "", "go": "58,108"}' fname="auction">

    ### Account
    The SDK exposes a special type to handle NEAR Accounts, which automatically checks if the account address is valid

</Block>

<Block highlights='{"python": ""}' fname="auction">

    ### Account IDs
    In Python, NEAR account IDs are represented as `str` types. The SDK performs validation
    when account IDs are used in contract calls or cross-contract interactions.

</Block>

<Block highlights='{"go": "58,108"}' fname="auction">

    ### Account IDs
    In Go, NEAR account IDs are represented as `string`. Functions like `env.GetPredecessorAccountID()` and `env.GetCurrentAccountId()` return account IDs as plain strings.

</Block>

<File language="js" fname="hello-near"
    url="https://github.com/near-examples/hello-near-examples/blob/main/contract-ts/src/contract.ts"
    start="2" end="18" />

<File language="rust" fname="hello-near"
    url="https://github.com/near-examples/hello-near-examples/blob/main/contract-rs/src/lib.rs"
    start="2" end="32" />

<File language="python" fname="hello-near" url="https://github.com/r-near/near-py-examples/blob/main/hello-near.py" start="2" end="18"></File>

<File language="js" fname="auction"
    url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-ts/01-basic-auction/src/contract.ts"
    start="2" end="61" />

<File language="rust" fname="auction"
    url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/01-basic-auction/src/lib.rs"
    start="2" end="84" />
<File language="python" fname="auction" url="https://github.com/r-near/near-py-examples/blob/main/auction.py" start="2" end="122"></File>

<File language="go" fname="hello-near"
    url="https://github.com/vlmoon99/near-sdk-go/blob/main/examples/greeting/contract/main.go"
    start="1" end="77" />

<CodeBlock language="go" fname="auction">

```go
package main

import (
	"errors"

	"github.com/vlmoon99/near-sdk-go/env"
	"github.com/vlmoon99/near-sdk-go/promise"
	"github.com/vlmoon99/near-sdk-go/types"
)

// Bid represents a single bid placed in an auction.
type Bid struct {
	Bidder string `json:"bidder"`
	Bid    string `json:"bid"`
}

type InitInput struct {
	EndTime    uint64 `json:"end_time"`
	Auctioneer string `json:"auctioneer"`
}

// @contract:state
type AuctionContract struct {
	HighestBid     Bid    `json:"highest_bid"`
	AuctionEndTime uint64   `json:"auction_end_time"`
	Auctioneer     string   `json:"auctioneer"`
	Claimed        bool     `json:"claimed"`
}

// @contract:init
func (c *AuctionContract) Init(input InitInput) {
	currentAccount, _ := env.GetCurrentAccountId()
	c.HighestBid = Bid{
		Bidder: currentAccount,
		Bid:    "1",
	}
	c.AuctionEndTime = input.EndTime
	c.Auctioneer = input.Auctioneer
	env.LogString("Auction initialized")
}

// @contract:mutating
func (c *AuctionContract) Bid() error {
	blockTime := env.GetBlockTimeMs()
	if blockTime >= c.AuctionEndTime {
		return errors.New("auction has ended")
	}

	deposit, err := env.GetAttachedDeposit()
	if err != nil {
		return errors.New("failed to get attached deposit")
	}

	currentBid, err := types.U128FromString(c.HighestBid.Bid)
	if err != nil {
		return errors.New("invalid current bid amount in state")
	}

	if deposit.Cmp(currentBid) <= 0 {
		return errors.New("you must place a higher bid")
	}

	caller, err := env.GetPredecessorAccountID()
	if err != nil {
		return errors.New("failed to get caller account")
	}

	prevBidder := c.HighestBid.Bidder
	c.HighestBid = Bid{
		Bidder: caller,
		Bid:    deposit.String(),
	}

	promise.CreateBatch(prevBidder).Transfer(currentBid)

	return nil
}

// @contract:mutating
func (c *AuctionContract) Claim() error {
	blockTime := env.GetBlockTimeMs()
	if blockTime <= c.AuctionEndTime {
		return errors.New("auction has not ended yet")
	}

	if c.Claimed {
		return errors.New("auction has already been claimed")
	}

	c.Claimed = true

	winningBid, err := types.U128FromString(c.HighestBid.Bid)
	if err != nil {
		return errors.New("invalid winning bid amount in state")
	}

	promise.CreateBatch(c.Auctioneer).Transfer(winningBid)

	return nil
}

// @contract:view
func (c *AuctionContract) GetHighestBid() Bid {
	return c.HighestBid
}

// @contract:view
func (c *AuctionContract) GetAuctionEndTime() uint64 {
	return c.AuctionEndTime
}

// @contract:view
func (c *AuctionContract) GetAuctioneer() string {
	return c.Auctioneer
}

// @contract:view
func (c *AuctionContract) GetClaimed() bool {
	return c.Claimed
}
```

</CodeBlock>

</ExplainCode>
