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

<ExplainCode languages="js,rust">

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

<Block highlights='{"rust": "1,15,24,81"}' fname="auction" type='info'>

:::warning `U64/U128`

Smart contracts can store `u64` and `u128`, but these types need to be converted to `string` for input/output, since JSON cannot serialize values with more than 52 bits

To simplify development, the SDK provides the `U64` and `U128` types which are automatically casted to `u64/u128` when stored, and to `string` when used as input/output

:::

</Block>

<Block highlights='{"js":"3-6", "rust": "6-9"}' fname="auction">

    ### Complex Objects
    Smart contracts can store and return complex objects

    **Note:** Objects will always be received and returned as JSON

</Block>

<Block highlights='{"rust": "4"}' fname="auction">

    #### Serializers
    Objects that will be used as input or output need to be serializable to JSON, add the `#[near(serializer=json)]` macro

    Objects that will be stored in the contract's state need to be serializable to Borsh, add the `#[near(serializer=borsh)]` macro

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

<Block highlights='{"js": "4,29", "rust": "7,46"}' fname="auction">

    ### Account
    The SDK exposes a special type to handle NEAR Accounts, which automatically checks if the account address is valid

</Block>

<File language="js" fname="hello-near"
    url="https://github.com/near-examples/hello-near-examples/blob/main/contract-ts/src/contract.ts"
    start="2" end="18" />

<File language="rust" fname="hello-near"
    url="https://github.com/near-examples/hello-near-examples/blob/main/contract-rs/src/lib.rs"
    start="2" end="32" />

<File language="js" fname="auction"
    url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-ts/01-basic-auction/src/contract.ts"
    start="2" end="61" />

<File language="rust" fname="auction"
    url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/01-basic-auction/src/lib.rs"
    start="2" end="84" />

</ExplainCode>


## PublicKey

[`PublicKey`](https://docs.rs/near-sdk/latest/near_sdk/struct.PublicKey.html) is in a binary format with base58 string serialization with human-readable curve.
The curve types currently supported are `secp256k1` and `ed25519` under [`near_sdk::CurveType`](https://docs.rs/near-sdk/latest/near_sdk/struct.PublicKey.html).

Example:
```rust
use near_sdk::{PublicKey, CurveType};

pub fn stake_tokens(
        &mut self,
        amount: U128,
    ) -> Promise {
        // Compressed ed25519 key
        let ed: PublicKey = "ed25519:6E8sCci9badyRkXb3JoRpBj5p8C6Tw41ELDZoiihKEtp".parse()
                    .unwrap();

        // Uncompressed secp256k1 key
        let secp256k1: PublicKey =   
            "secp256k1:qMoRgcoXai4mBPsdbHi1wfyxF9TdbPCF4qSDQTRP3TfescSRoUdSx6nmeQoN3aiwGzwMyGXAb1gUjBTv5AY8DXj"
                    .parse().unwrap();

        // Check the curve type of the public key
        match ed.curve_type() {
            near_sdk::CurveType::ED25519 => env::log_str("Using ED25519 curve."),
            near_sdk::CurveType::SECP256K1 => env::log_str("Using SECP256K1 curve."),
            _ => env::panic_str("Unsupported curve type!"),
        }

        // Use the staking contract to stake the tokens (using NEAR's PromiseAction::Stake)
        Promise::new(env::predecessor_account_id().clone())
            .stake(amount.0, public_key) // stake the tokens using the public key for verification
    }
```
