---
id: anatomy
title: Basic Anatomy
hide_table_of_contents: true
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

import {ExplainCode, Block, File} from '@site/src/components/CodeExplainer/code-explainer';

Let's illustrate the basic anatomy of a simple "Hello World" contract. The code on this page comes from our [Hello NEAR repository](https://github.com/near-examples/hello-near-examples) on Github.

<ExplainCode languages={["js", "rust"]} >
  <Block highlights={{"js": "1", "rust": "1"}} fname="contract">
    ### Importing the SDK
    All contracts will import the **NEAR SDK**, enabling them to [access the execution environment](./environment.md), [call other contracts](./crosscontract.md), [transfer tokens](./actions.md), and much more

    You can also use third-party libraries, thought some might not work due to the limitations of the contract runtime
  </Block>
  <Block highlights={{"js": "4-17", "rust":"5-7,20-31"}} fname="contract">
    ### Contract's Class / Structure
    The contract is described through a `Class` / `Struct` :
    - The attributes define which data the contract stores
    - The functions define its public (and private) interface 
  </Block>
  <Block highlights={{"js": "3"}} fname="contract">
    ### Contract Class Decorator
    
    Note that the contract's class is decorated with `@NearBindgen`. This decorator tells the SDK which class defines the contract, so it knows:
    1. What to fetch from storage when the contract is loaded
    2. What to store when the contract is done executing
    3. The methods that are exposed to the outside world

    **Note:** Only one class can be decorated with the `@NearBindgen` decorator

  </Block>
  <Block highlights={{"rust": "4,19"}} fname="contract">
    ### Contract Struct Macro
    
    Note that the contract's struct definition and the implementation are decorated with macros
    
    The `#[near(contract_state)]` macro tell the SDK that this structure defines the contract's state, so it knows:
    1. What to fetch from storage when the contract is loaded
    2. What to store when the contract is done executing

    The `#[near]` macro tells the SDK which functions are exposed to the outside world

    **Note:** Only one struct can be decorated with the `#[near(contract_state)]` macro
  </Block>
  <Block highlights={{"js": "5", "rust": "6,10-16"}} fname="contract">
    ### Storage (State)
    We call the data stored in the contract [the contract's state](./storage.md).
    
    In our Hello World example, the contract stores a single string (`greeting`), and the state starts initialized with the default value `"Hello"` 

    **Note:** We will cover more about the contract's state in the [state section](./storage.md)
  </Block>
  <Block highlights={{"js": "8-10", "rust": "22-24"}} fname="contract">
    ### Read Only Functions
    Contract's functions can be read-only, meaning they don't modify the state. Calling them is free for everyone, and does not require to have a NEAR account

    **Note:** We will cover more about function types in the [functions section](./functions.md)
  </Block>
  <Block highlights={{"js": "13-16", "rust": "27-30"}} fname="contract">
    ### State Mutating Functions
    Functions that modify the state or call other contracts are considered state mutating functions. It is necessary to have a NEAR account to call them, as they require a transaction to be sent to the network

    **Note:** We will cover more about function types in the [functions section](./functions.md)
  </Block>
  <File
    language="js"
    fname="contract" 
    url="https://github.com/near-examples/hello-near-examples/blob/main/contract-ts/src/contract.ts"
    start="2"
    end="18"
  />
  <File
    language="rust"
    fname="contract" 
    url="https://github.com/near-examples/hello-near-examples/blob/main/contract-rs/src/lib.rs"
    start="2"
    end="32"
  />
</ExplainCode>