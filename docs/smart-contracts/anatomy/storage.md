---
id: storage
title: State
sidebar_label: State (Storage)
hide_table_of_contents: true
description: "Smart contracts store data in their account's state, which is public on the chain. The storage starts empty until a contract is deployed and the state is initialized."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs";
import {ExplainCode, Block, File} from '@site/src/components/CodeExplainer/code-explainer';

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

</ExplainCode>
