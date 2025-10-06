---
id: anatomy
title: Basic Anatomy
hide_table_of_contents: true
description: "Learn the basic anatomy of all smart contracts."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"
import {ExplainCode, Block, File} from '@site/src/components/CodeExplainer/code-explainer';

Let's illustrate the basic anatomy of a simple "Hello World" contract. The code on this page comes from our [Hello NEAR repository](https://github.com/near-examples/hello-near-examples) on GitHub.

<ExplainCode languages="js,rust,python,go" >

<Block highlights='{"js": "1", "rust": "1", "python": "1","go":"1"}' fname="hello-near">

    ### Importing the SDK
    All contracts will import the **NEAR SDK**, enabling them to [access the execution environment](./environment.md), [call other contracts](./crosscontract.md), [transfer tokens](./actions.md), and much more.

    You can also use third-party libraries, though some might not work due to the limitations of the contract runtime.

</Block>

<Block highlights='{"js": "5-22", "rust":"5-7,20-31", "python": "5-19","go":"10-77"}' fname="hello-near">

    ### Contract's Main Structure
    The contract is described through a structure:
    - The attributes define which data the contract stores
    - The functions define its public (and private) interface

</Block>


<Block highlights='{"js": "3"}' fname="hello-near">

    ### Contract Class Decorator

    Note that the contract's class is decorated with `@NearBindgen`. This decorator tells the SDK which class defines the contract, so it knows:
    1. What to fetch from storage when the contract is loaded
    2. What to store when the contract is done executing
    3. The methods that are exposed to the outside world
    4. If the contract needs to be initialized (we will cover this later)

    **Note:** Only one class can be decorated with the `@NearBindgen` decorator

</Block>

<Block highlights='{"python": "4"}' fname="hello-near">

    ### Python Class Structure

    In Python, we use a class to define our contract. Unlike JavaScript or Rust, there isn't a specific decorator for the class itself. Instead, each method that should be exposed to the blockchain is decorated with the appropriate decorator (`@view`, `@call`, or `@init`).

    The contract's state is managed through instance variables and can be persisted using the Storage API or collections.

</Block>


<Block highlights='{"rust": "4,19"}' fname="hello-near">

    ### Contract Struct Macro

    Note that the contract's struct definition and the implementation are decorated with macros

    The `#[near(contract_state)]` macro tell the SDK that this structure defines the contract's state, so it knows:
    1. What to fetch from storage when the contract is loaded
    2. What to store when the contract is done executing

    The `#[near]` macro tells the SDK which functions are exposed to the outside world.

    **Note:** Only one struct can be decorated with the `#[near(contract_state)]` macro.

</Block>

<Block highlights='{"rust": "4,19"}' fname="hello-near" type='info'>

    <details>

    <summary> Interaction with other macros </summary>

    When `near` is built for the wasm32 target, it generates the external NEAR contract bindings.  To achieve this it is actually generating another function with the signature `pub extern "C" fn function_name()` that first deserializes the contract struct from NEAR storage and then calls the `contract.function_name(parameter1, parameter2, ...)`.

    If you have annotated your function with any attribute-like macros, these are then executed _twice_.  Specifically if the attribute like macro makes any modification to the function signature, or inserts any code that depends on the contract struct (in the form of `&self`, `&mut self`, or `self`) this will fail in the second invocation, because the externally exposed function does not have any concept of this struct.

    It is possible to detect this by checking which build target you are building for and limit the execution of the macro to operate only on the first pass.

    </details>

</Block>

<Block highlights='{"js": "5", "rust": "6,10-16", "python": "7-8", "go": "70"}' fname="hello-near">

    ### Storage (State)
    We call the data stored in the contract [the contract's state](./storage.md).

    In our Hello World example, the contract stores a single string (`greeting`), and the state starts initialized with the default value `"Hello"`.

    **Note:** We will cover more about the contract's state in the [state section](./storage.md).

</Block>

<Block highlights='{"js": "7-9"}' fname="hello-near">

    Javascript contracts need to further include a `schema` object that defines the contract's state and its types. This object is used by the SDK to correctly serialize and deserialize the contract's state.

</Block>

<Block highlights='{"python": "5-5,10-10,15-15"}' fname="hello-near">

    ### Method Decorators

    In Python, contract methods are decorated with `@view`, `@call`, or `@init` to define how they can be accessed.
    These decorators handle input parsing and serializing return values automatically.

</Block>

<Block highlights='{"js": "12-14", "rust": "22-24", "python": "10-13","go": "45-58"}' fname="hello-near">

    ### Read Only Functions
    Contract's functions can be read-only, meaning they don't modify the state. Calling them is free for everyone, and does not require to have a NEAR account.

    **Note:** We will cover more about function types in the [functions section](./functions.md).

</Block>

<Block highlights='{"js": "17-20", "rust": "27-30", "python": "15-19","go": "61-77"}' fname="hello-near">

    ### State Mutating Functions
    Functions that modify the state or call other contracts are considered state mutating functions. It is necessary to have a NEAR account to call them, as they require a transaction to be sent to the network.

    **Note:** We will cover more about function types in the [functions section](./functions.md).

</Block>

<File language="js" fname="hello-near"
    url="https://github.com/near-examples/hello-near-examples/blob/main/contract-ts/src/contract.ts"
    start="2" end="32" />

<File language="rust" fname="hello-near"
    url="https://github.com/near-examples/hello-near-examples/blob/main/contract-rs/src/lib.rs"
    start="2" end="32" />

<File language="python" fname="hello-near" url="https://github.com/r-near/near-py-examples/blob/main/hello-near.py" start="2" end="32" />
<File language="go" fname="hello-near" url="https://github.com/vlmoon99/near-sdk-go/blob/main/examples/greeting/contract/main.go" start="1" end="77" />
</ExplainCode>
