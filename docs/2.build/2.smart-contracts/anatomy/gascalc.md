---
id: gascalc
title: Gas estimation
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs";
import CodeBlock from '@theme/CodeBlock';
import {ExplainCode, Block, File} from '@site/src/components/CodeExplainer/code-explainer';

This guide explains how to estimate, allocate, and check gas for cross-contract calls in NEAR. It includes practical examples, tools like near-cli, and API usage to streamline gas estimation. All examples are in Rust.

## Overview of Gas in NEAR
Gas in NEAR is used to measure computational resources for transactions. When calling cross-contract functions, you need to allocate gas carefully to prevent failures or inefficiencies. Key components include:

 - Gas burned: Gas consumed during execution.
 - Refunded gas: Unused prepaid gas returned to the caller.
 - Used gas: The total amount of gas deducted from the transaction (includes burned and refunded gas)
 - Prepaid Gas: Gas attached to a transaction upfront, allocated by the caller.

## Cross-Contract Call Workflow
When invoking another contract:

1. Attach prepaid gas to the transaction.
2. Allocate gas for:
   - The called contract.
   - Any callbacks or subsequent operations.
   - The current function’s execution.
3. Test and benchmark, monitor gas usage (burned, used, refunded) to optimize allocation.

Gas to Attach = Gas for Current Function + Gas for Target Contract + Gas for Callback

:::note
Near sets a gas limit per transaction: 300 Tgas (300 × 10^12 gas)
:::

### Example: Simple Cross-Contract Call

```rust
use near_sdk::Promise;

const TGAS: u64 = 1_000_000_000_000; // 1 TeraGas
const GAS_FOR_TARGET: u64 = 50 * TGAS; // Gas for the target contract
const GAS_FOR_CALLBACK: u64 = 20 * TGAS; // Gas reserved for the callback

#[near]
impl MyContract {
    /// Initiates a cross-contract call
    pub fn call_another_contract(&self, target_contract: AccountId, args: Vec<u8>) {
        // Ensure there's enough gas for the call and the callback
        assert!(
            env::prepaid_gas() > GAS_FOR_TARGET + GAS_FOR_CALLBACK,
            "Not enough gas attached"
        );

        // Call the target contract
        Promise::new(target_contract.clone())
            .function_call(
                "target_function".to_string(),
                args,
                0,                // No attached deposit
                GAS_FOR_TARGET,   // Gas for this function
            )
            // Add a callback to handle the response
            .then(
                Promise::new(env::current_account_id())
                    .function_call(
                        "on_callback".to_string(),
                        vec![],
                        0,              // No attached deposit
                        GAS_FOR_CALLBACK,
                    )
            );
    }

    /// Callback handler
    pub fn on_callback(&self) {
        if let Some(result) = env::promise_result(0) {
            match result {
                PromiseResult::Successful(data) => {
                    env::log_str("Callback succeeded");
                    // Process the data if needed
                }
                PromiseResult::Failed => {
                    env::log_str("Callback failed");
                }
                _ => (),
            }
        }
    }
}
```

## How to Check Gas Usage
### Testnet / mainnet
You can use `nearblocks` explorer to see gas usage. You may first check for existing transactions in mainnet or testnet and see how much gas did they use. Here is an example of a token swap transaction on a decentralized exchange. 

For example, for swap operation transaction `s5dL1DTiJ5pJugU2KpyTWLCbCT3pCXM3Pw8zSrTfqD4` in mainnet, go to https://nearblocks.io/txns/s5dL1DTiJ5pJugU2KpyTWLCbCT3pCXM3Pw8zSrTfqD4

There you can see `Usage by Txn: 37.97 Tgas`
That means that the transaction used 37.97 TGas. So the amount of gas you should attach to call the contract is 37.97 Tgas.

### Sandbox
When developing contract, you may want to know how much gas is used every time you change the contract code. In order to do that, you can run your code in sandox and see how much gas is used. 

On integrations tests [page](../testing/integration-test.md) you can find how to run sandbox. 

Use `env::used_gas()` inside your contract to check how much gas is used
```rust
env::log_str(&format!("Gas used: {}", env::used_gas()));
```


## Setting gas in cross-contract call

The following are the two different ways to make a contract call. Take a look on how the way of setting gas changes. 

Example: Using `Promise::new().function_call`
```rust
use near_sdk::Promise;

#[near]
impl Contract {
    fn call_other_contract() {
        Promise::new("receiver.testnet".to_string())
            .function_call(
                "target_function".to_string(), // Method name to call on the contract
                b"{}".to_vec(),         // Arguments to pass as a byte array (empty in this case)
                0,                      // Attached deposit (in yoctoNEAR), set to 0 here
                10_000_000_000_000,     // Gas attached for this call
            )
    }
}
```

Example: Using `ext` structure and `with_static_gas` method
```rust
#[ext_contract(ext_target)]
pub trait TargetContract {
    fn target_function(&self, arg1: String);
}

#[near]
impl Contract {
    pub fn call_with_static_gas(&self, target: AccountId) -> Promise {
        ext_target::ext("receiver.testnet".to_string())
            .with_static_gas(10_000_000_000_000)
            .target_fuction("hello")
    }
}
```

## Using prepaid gas

In order to check whether the gas required is attached to a call, you can use `env::prepaid_gas`. It allows to stop the execution in complex workflows where you know in advance that the gas attached may be insufficient:
```rust
#[near]
impl MyContract {
    pub fn example_prepaid(&self, target: AccountId, args: Vec<u8>) {
        assert!(
            env::prepaid_gas() > 80 * TGAS,
            "Insufficient prepaid gas"
        );
        // ... 
    }
}
```

Sometimes, you just don't know how much gas will be used. It can happen when you make a cross-contract call to a contract that is not predefined and it's gas usage may be unpredictable. Also, if your contract's code is changing rapidly, it's gas usage may change rapidly as well. In order to make your code still work and make the user decide how much gas to attach, you can use a trick with `env::prepaid_gas` when making cross-contract call.

Instead of estimating the gas for a cross-contract call, use a part of `prepaid_gas`, for example, one third:
```rust
#[near]
impl Contract {
    pub fn call_with_static_gas(&self, target: AccountId) -> Promise {
        ...
        ext_target::ext("receiver.testnet".to_string())
            .with_static_gas(env::prepaid_gas() / 3)
            .target_fuction("hello")
        ...
    }
}
```
It will allow you to enable the user to execute contract method when the gas usage unexpectedly increases.

## Common Pitfalls to Avoid
1. Running Out of Gas:
   - Ensure that the total gas attached to the transaction is within the 300 Tgas limit.
   - Always allocate some gas for callbacks if you expect them.
   - Reserve extra gas for scenarios where the target contract performs unexpectedly resource-intensive operations.
2. Over-Allocation:
   - While unused gas is refunded, attaching excessive gas may cause unnecessary delays in execution due to prioritization in the network.
3. Mismanaging Deposits:
   - Ensure attached deposits are explicitly set to 0 if not required to avoid unexpected costs