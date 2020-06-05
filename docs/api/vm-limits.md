---
id: vm-limits
title: Runtime Limits
sidebar_label: Runtime Limits
---

The NEAR blockchain executes smart contracts as Wasm binaries inside a custom virtual machine -- this environment is known as the NEAR Runtime.

To guarantee a minimum acceptable level of performance and reliability of these contracts, the NEAR Runtime imposes limits on the resources that contracts can consume (ie. size of deployed contract, number of operations performed, amount of data manipulated in memory).

These limits are defined in the file `nearcore/runtime/near-vm-logic/src/config.rs` and included here for convenience.

## Runtime Limit Configuration

The code below was taken from [here](https://github.com/nearprotocol/nearcore/blob/9ed24269598ac1f1e8e33319c80c17faac51ba93/runtime/near-vm-logic/src/config.rs#L22) <img src="../assets/icon-link.png" alt="^" style="display: inline; width: 0.8rem;"/>

```rust
/// Describes limits for VM and Runtime.
pub struct VMLimitConfig {

    /// Max amount of gas that can be used, excluding gas attached to promises.
    pub max_gas_burnt: Gas,
    /// Max burnt gas per view method.
    pub max_gas_burnt_view: Gas,


    /// How tall the stack is allowed to grow?
    /// See https://wiki.parity.io/WebAssembly-StackHeight to find out
    /// how the stack frame cost is calculated.
    pub max_stack_height: u32,
    /// The initial number of memory pages.
    /// NOTE: It's not a limiter itself, but it's a value we use for initial_memory_pages.
    pub initial_memory_pages: u32,
    /// What is the maximal memory pages amount is allowed to have for
    /// a contract.
    pub max_memory_pages: u32,


    /// Limit of memory used by registers.
    pub registers_memory_limit: u64,
    /// Maximum number of bytes that can be stored in a single register.
    pub max_register_size: u64,
    /// Maximum number of registers that can be used simultaneously.
    pub max_number_registers: u64,


    /// Maximum number of log entries.
    pub max_number_logs: u64,
    /// Maximum total length in bytes of all log messages.
    pub max_total_log_length: u64,


    /// Max total prepaid gas for all function call actions per receipt.
    pub max_total_prepaid_gas: Gas,


    /// Max number of actions per receipt.
    pub max_actions_per_receipt: u64,
    /// Max total length of all method names (including terminating character) for a function call
    /// permission access key.
    pub max_number_bytes_method_names: u64,
    /// Max length of any method name (without terminating character).
    pub max_length_method_name: u64,
    /// Max length of arguments in a function call action.
    pub max_arguments_length: u64,
    /// Max length of returned data
    pub max_length_returned_data: u64,
    /// Max contract size
    pub max_contract_size: u64,


    /// Max storage key size
    pub max_length_storage_key: u64,
    /// Max storage value size
    pub max_length_storage_value: u64,
    /// Max number of promises that a function call can create
    pub max_promises_per_function_call_action: u64,
    /// Max number of input data dependencies
    pub max_number_input_data_dependencies: u64,
}
```

## Default Runtime Limits

The default limits can be overridden in the NEAR Genesis configuration.

The code below was taken from [here](https://github.com/nearprotocol/nearcore/blob/9ed24269598ac1f1e8e33319c80c17faac51ba93/runtime/near-vm-logic/src/config.rs#L116) <img src="../assets/icon-link.png" alt="^" style="display: inline; width: 0.8rem;"/>

```rust
max_gas_burnt: 2 * 10u64.pow(14),           // with 10**15 block gas limit this will allow 5 calls.
max_gas_burnt_view: 2 * 10u64.pow(14),      // same as `max_gas_burnt` for now


// NOTE: Stack height has to be 16K, otherwise Wasmer produces non-deterministic results.
// For experimentation try `test_stack_overflow`.
max_stack_height: 16 * 1024,                // 16Kib of stack.
initial_memory_pages: 2u32.pow(10),         // 64Mib of memory.
max_memory_pages: 2u32.pow(11),             // 128Mib of memory.


// By default registers are limited by 1GiB of memory.
registers_memory_limit: 2u64.pow(30),
// By default each register is limited by 100MiB of memory.
max_register_size: 2u64.pow(20) * 100,
// By default there is at most 100 registers.
max_number_registers: 100,


max_number_logs: 100,
// Total logs size is 16Kib
max_total_log_length: 16 * 1024,


// Fills 10 blocks. It defines how long a single receipt might live.
max_total_prepaid_gas: 10 * 10u64.pow(15),


// Safety limit. Unlikely to hit it for most common transactions and receipts.
max_actions_per_receipt: 100,
// Should be low enough to deserialize an access key without paying.
max_number_bytes_method_names: 2000,
max_length_method_name: 256,                // basic safety limit
max_arguments_length: 4 * 2u64.pow(20),     // 4 Mib
max_length_returned_data: 4 * 2u64.pow(20), // 4 Mib
max_contract_size: 4 * 2u64.pow(20),        // 4 Mib,


max_length_storage_key: 4 * 2u64.pow(20),   // 4 Mib
max_length_storage_value: 4 * 2u64.pow(20), // 4 Mib
// Safety limit and unlikely abusable.
max_promises_per_function_call_action: 1024,
// Unlikely to hit it for normal development.
max_number_input_data_dependencies: 128,
```