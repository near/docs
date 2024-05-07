---
id: types
title: SDK Types
hide_table_of_contents: true
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"
import CodeBlock from '@theme/CodeBlock'

import {ExplainCode, Block, File} from '@site/src/components/CodeExplainer/code-explainer';

Lets discuss which types smart contracts use to input and output data, as well as how such data is stored and handled in the contract's code.

<ExplainCode languages={["js", "rust"]}>
  <Block highlights={{"js": ""}} fname="auction">
    ### Native Types
    Smart contracts can receive, store and return data of the following types:
    - `string`
    - `number`
    - `boolean`
    - `Array`
    - `Map`
    - `Object`
    - `BigInt`
  </Block>
  <Block highlights={{"rust": ""}} fname="auction">
    ### Native Types
    Smart contracts can receive, store and return data of the following types:
    - `string`
    - `i8-i32/u8-u32`
    - `bool`
    - `HashMap`
    - `Vector`
  </Block>
  <Block highlights={{"rust": "1,15,22,64"}} fname="auction">
    ### `U64/U128`
    Smart contracts can **store** data in `u64` and `u128`, but since contracts receive and return information on JSON format, these types need to be converted to `string` to be used as input or output

    For this case, the SDK provides the `U64` and `U128` types, which are wrappers around `u64` and `u128` that can be converted to and from `string`
  </Block>
  <Block highlights={{"js": ""}} fname="auction">
    ### Handling Tokens
    `$NEAR` tokens are represented using `BigInt` in JS, and they are always represented in `yoctonear`

    **Note:** 1 NEAR = 10^24 yoctoNEAR
  </Block>
  <Block highlights={{"rust": ""}} fname="auction">
    ### Handling Tokens
    `$NEAR` tokens are handled through the `NearToken` struct, which exposes methods to represent the value in `yoctonear`, `milinear` and `near`

    **Note:** 1 NEAR = 10^24 yoctonear
  </Block>

  <File
    language="js"
    fname="auction" 
    url="https://github.com/near-examples/auction-examples/blob/main/contract-ts/src/contract.ts"
    start="2"
    end="51"
  />
  <File
    language="rust"
    fname="auction"
    url="https://github.com/near-examples/auction-examples/blob/main/contract-rs/src/lib.rs"
    start="2"
    end="68"
  />
  <CodeBlock
    language="js"
    fname="example" 
  >

    ```js
    @NearBindgen({})
    class Contract {
      helper_function(params... ){
        // this function cannot be called from the outside
      }

      @view({})
      interface_view(params...){
        // this function can be called from outside
      }

      @call({privateFunction: true}){
        // this function can be called from outside, but
        // only by the contract's account
      }
    }
    ```
  </CodeBlock>
  <CodeBlock
    language="rust"
    fname="example" 
  >

    ```rs
    const SOME_VALUE: u64 = 8;

    #[near_bindgen]
    impl MyContractStructure {
      fn internal_helper(mut &self, params... ){
        // this function cannot be called from the outside
      }

      pub fn public_log(/* Parameters here */) {
          near_sdk::log!("inside log message");
      }

      pub fn return_static_u64() -> u64 {
          SOME_VALUE
      }
    }
    ```
  </CodeBlock>
</ExplainCode>