---
id: functions
title: Functions & Interface
hide_table_of_contents: true
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

import {ExplainCode, Block, File} from '@site/src/components/code-explainer';

Smart contracts expose functions so users can interact with them. There are different types of functions including `read-only`, `private` and `payable`.

<ExplainCode languages={["js", "rust"]} alternativeURL="/build/smart-contracts/anatomy/environment">
  <Block highlights={{"js": "8-10,13-15", "rust": "22-24,27-30"}} fname="hello">

    ### Contract's Interface
    All public functions in the contract are part of its interface. They can be called by anyone, and are the only way to interact with the contract

  </Block>
  <Block highlights={{"js":"8-10", "rust": "22-24"}} fname="hello">
    ### Read-Only Functions
    Contract's functions can be read-only, meaning they don't modify the state. Calling them is free for everyone, and does not require to have a NEAR account
  </Block>
  <Block highlights={{"js": "7"}} fname="hello">
    #### `@view`
    Read-only functions are marked with the `@view` decorator in TS/JS
  </Block>
  <Block highlights={{"rust": "22"}} fname="hello">
    #### `&self`
    Read-only functions are those that take an **immutable** reference to `self` in Rust
  </Block>
  <Block highlights={{"js":"13-16", "rust": "27-30"}} fname="hello">
    ### Call Functions
    The functions that modify the state or perform [actions](./actions.md) are called "call functions"

    They need to be called by a user with a NEAR account, since a transaction is required to execute them

    **Note:** The SDK provides a [contextual information](./environment.md), such as who is the caller
  </Block>
  <Block highlights={{"js": "12"}} fname="hello">
    #### `@call`
    Call functions are marked with the `@call` decorator in TS/JS
  </Block>
  <Block highlights={{"rust": "27"}} fname="hello">
    #### `mut &self`
    Call functions are those that take a **mutable** reference to `self` in Rust
  </Block>
  <Block highlights={{"js":"13", "rust": "17"}} fname="auction">
    ### Private Functions
    Many times you will want to have functions that **are exposed** as part of the contract's interface, but **should not be called directly** by users

    A classic example for this is [initialization functions](storage.md) and [callbacks from cross-contract calls](./crosscontract.md)

    These functions are marked as `private` in the contract's code, and can only be called by the contract itself
  </Block>
  <Block highlights={{"js": "13"}} fname="auction">
    #### `decorator({privateFunction: true})`
    Private functions are marked by passing `privateFunction: true` within the `@call` or `@initialization` decorators in TS/JS
  </Block>
  <Block highlights={{"rust": "17"}} fname="auction">
    #### [#private]
    Private functions are marked using the `#[private]` macro in Rust
  </Block>

  <File
    language="js"
    fname="hello" 
    url="https://github.com/near-examples/hello-near-examples/blob/main/contract-ts/src/contract.ts"
    start="2"
    end="18"
  />
  <File
    language="js"
    fname="auction" 
    url="https://github.com/near-examples/auction-examples/blob/main/contract-ts/src/contract.ts"
    start="2"
    end="51"
  />
  <File
    language="rust"
    fname="hello" 
    url="https://github.com/near-examples/hello-near-examples/blob/main/contract-rs/src/lib.rs"
    start="2"
    end="32"
  />
  <File
    language="rust"
    fname="auction"
    url="https://github.com/near-examples/auction-examples/blob/main/contract-rs/src/lib.rs"
    start="11"
    end="76"
  />
</ExplainCode>