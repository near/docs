---
id: storage
title: State
sidebar_label: State (Storage)
hide_table_of_contents: true
description: "Explore how NEAR smart contracts manage their state."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/UI/Codetabs";
import {ExplainCode, Block, File} from '@site/src/components/CodeExplainer/code-explainer';
import CodeBlock from '@theme/CodeBlock';

Smart contracts store data in their account's state, which is public on the chain. The storage starts **empty** until a contract is deployed and the state is initialized.

It is important to know that the account's **code** and account's **storage** are **independent**. [Updating the code](../release/upgrade.md) does **not erase** the state.

<hr class="subsection" />

<ExplainCode languages="rust,js,python,go" >

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

<Block highlights='{"go": "17-23"}' fname="auction">

    ### Defining the State
    The attributes of the `struct` marked with `@contract:state` define the data that will be stored.

    The contract can store all native types (e.g. `uint64`, `string`, `bool`) as well as complex objects, serialized as JSON.

    For example, our Auction contract stores when the auction ends, and an object representing the highest bid.

</Block>

<Block highlights='{"js":"", "rust": "", "python": "", "go": ""}' fname="auction" type='info'>

:::warning

Contracts pay for their storage by locking part of their balance.

It currently costs ~**1Ⓝ** to store **100KB** of data.

:::

</Block>

<Block highlights='{"js": "", "rust": "", "python": "", "go": ""}' fname="auction" >

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

<Block highlights='{"go": "25-35"}' fname="auction">

    ### I. Initialization Functions
    An option to initialize the state is to create an `initialization` function, which needs to be called before executing any other function.

    In our Auction example, the contract has an initialization function that sets when the auction ends. The function is marked with the `@contract:init` comment directive.

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

<Block highlights='{"go": ""}' fname="hello">

    ### II. Default State
    In Go, when no `@contract:init` function is called, the contract's state struct is zero-initialized using Go's default zero values (empty strings, zeros, false booleans).

    **Note:** The state can only be initialized once.

</Block>

<Block highlights='{"js": "", "rust":"", "python": "", "go": ""}' fname="hello">

    ### Lifecycle of the State
    When a function is called, the contract's state is loaded from the storage and put into memory.

    The state is actually [stored serialized](./serialization.md), and the SDK takes a bit of time to deserialize it before the method can access it.

    When the method finishes executing successfully, all the changes to the state are serialized, and saved back to the storage.

</Block>

<Block highlights='{"js": "", "rust":"", "python": "", "go": ""}' fname="hello" type='info'>

:::warning State and Code

In NEAR, the contract's code and contract's storage are **independent**.

Updating the code of a contract does **not erase** the state, and can indeed lead to unexpected behavior or errors.

Make sure to read the [updating a contract](../release/upgrade.md) if you run into issues.

:::

</Block>

<File language="js" fname="auction"
    url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-ts/01-basic-auction/src/contract.ts"
    start="2" end="60" />

<File language="js" fname="hello"
    url="https://github.com/near-examples/hello-near-examples/blob/main/contract-ts/src/contract.ts"
    start="2" end="18" />

<File language="rust" fname="auction"
    url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/01-basic-auction/src/lib.rs"
    start="2" end="83" />

<File language="rust" fname="hello"
    url="https://github.com/near-examples/hello-near-examples/blob/main/contract-rs/src/lib.rs"
    start="2" end="32" />

<File language="python" fname="auction" url="https://github.com/r-near/near-py-examples/blob/main/auction.py" start="2" end="122"></File>

<File language="python" fname="hello" url="https://github.com/r-near/near-py-examples/blob/main/hello-near.py" start="5" end="20"></File>

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

<File language="go" fname="hello"
    url="https://github.com/vlmoon99/near-sdk-go/blob/main/examples/greeting/contract/main.go"
    start="1" end="77" />

</ExplainCode>
