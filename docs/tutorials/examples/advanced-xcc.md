---
id: advanced-xcc
title: Complex Cross Contract Call
description: "Master advanced cross-contract call patterns in NEAR Protocol, including callbacks, error handling, and complex multi-contract interactions."
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

This guide explores advanced cross-contract call patterns in NEAR, demonstrating how to orchestrate complex multi-contract interactions. You'll learn to batch function calls, execute contracts in parallel, and handle sophisticated callback scenarios.

:::info Simple Cross-Contract Calls

Check the tutorial on how to use [simple cross-contract calls](xcc.md)

:::

## Understanding NEAR's Asynchronous Architecture

Before diving into complex patterns, it's crucial to understand why NEAR handles cross-contract calls differently from other blockchains.

NEAR's sharded architecture makes all cross-contract interactions asynchronous and independent. This design choice enables massive scalability but requires a different mental model:

- **Independent execution**: Each contract runs in its own environment
- **Asynchronous results**: You cannot get immediate responses from external calls  
- **Promise-based coordination**: Use Promises to schedule and chain operations

Think of it like coordinating multiple teams across different time zones—you send instructions, continue with other work, and process responses as they arrive.

### Why This Design is Powerful

NEAR's asynchronous approach provides significant advantages:

- **Scalability**: Sharded execution means calls don't compete for resources
- **Flexibility**: Design sophisticated workflows impossible in synchronous systems
- **Reliability**: Failed calls in one contract don't cascade to others
- **Performance**: Parallel execution enables faster overall processing

---

## Obtaining the Cross Contract Call Example

You have two options to start the Cross Contract Call Example:

1. You can use the app through `Github Codespaces`, which will open a web-based interactive environment.
2. Clone the repository locally and use it from your computer.

| Codespaces                                                                                                                      | Clone locally                                               |
| ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| [![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/near-examples/cross-contract-calls?quickstart=1) | 🌐 `https://github.com/near-examples/cross-contract-calls` |

---

## Structure of the Example

The smart contract is available in two flavors: Rust and JavaScript

<Tabs groupId="code-tabs">

  <TabItem value="js" label="🌐 JavaScript">

```bash
┌── sandbox-ts # sandbox testing
│    ├── external-contracts
│    │    ├── counter.wasm
│    │    ├── guest-book.wasm
│    │    └── hello-near.wasm
│    └── main.ava.ts
├── src # contract's code
│    ├── internal
│    │    ├── batch_actions.ts
│    │    ├── constants.ts
│    │    ├── multiple_contracts.ts
│    │    ├── similar_contracts.ts
│    │    └── utils.ts
│    └── contract.ts
├── package.json
├── README.md
└── tsconfig.json
```

  </TabItem>

  <TabItem value="rust" label="🦀 Rust">

```bash
┌── tests # sandbox testing
│    ├── external-contracts
│    │    ├── counter.wasm
│    │    ├── guest-book.wasm
│    │    └── hello-near.wasm
│    └── main.ava.ts
├── src # contract's code
│    ├── batch_actions.rs
│    ├── lib.rs
│    ├── multiple_contracts.rs
│    └── similar_contracts.rs
├── Cargo.toml # package manager
├── README.md
└── rust-toolchain.toml
```

  </TabItem>

</Tabs>

---

## Smart Contract Patterns

### Pattern 1: Batch Actions

Batch actions let you aggregate multiple function calls to the same contract into a single atomic transaction. This is perfect when you need sequential operations that must all succeed or all fail together.

**Use case**: Multi-step operations that require consistency, such as complex DeFi transactions or multi-stage data updates.

<CodeTabs>
  <Language value="js" language="js">
    <Github fname="contract.ts"
          url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/contract.ts"
          start="38" end="41" />
    <Github fname="batch_actions.ts"
          url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/internal/batch_actions.ts"
          start="5" end="17" />
  </Language>
  <Language value="rust" language="rust">
    <Github fname="batch_actions.rs"
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-rs/src/batch_actions.rs"
            start="8" end="20" />
  </Language>
</CodeTabs>

#### Handling Batch Responses

With batch actions, your callback receives the result from the **last action** in the sequence. This design makes sense because if any earlier action failed, the entire batch would have reverted.

<CodeTabs>
  <Language value="js" language="js">
    <Github fname="contract.ts"
      url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/contract.ts"
      start="43" end="46" />
    <Github fname="batch_actions.ts"
      url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/internal/batch_actions.ts"
      start="19" end="29" />
    <Github fname="utils.ts"
      url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/internal/utils.ts"
      start="3" end="20" />
  </Language>
  <Language value="rust" language="rust">
    <Github fname="batch_actions.rs"
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-rs/src/batch_actions.rs"
            start="22" end="35" />
  </Language>
</CodeTabs>

---

### Pattern 2: Calling Multiple Contracts in Parallel

When you need to interact with multiple contracts simultaneously, NEAR's parallel execution shines. Each call executes independently—if one fails, the others continue unaffected.

**Use case**: Gathering data from multiple sources, executing independent operations, or building resilient multi-protocol interactions.

<CodeTabs>
  <Language value="js" language="js">
    <Github fname="contract.ts"
      url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/contract.ts"
      start="48" end="51" />
    <Github fname="multiple_contracts.ts"
      url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/internal/multiple_contracts.ts"
      start="6" end="21" />
  </Language>
  <Language value="rust" language="rust">
    <Github fname="multiple_contracts.rs"
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-rs/src/multiple_contracts.rs"
            start="16" end="55" />
  </Language>
</CodeTabs>

#### Processing Multiple Responses

With parallel calls, your callback receives an **array of responses**. Each response either contains the returned value or an error message, allowing you to handle partial failures gracefully.

<CodeTabs>
  <Language value="js" language="js">
    <Github fname="contract.ts"
      url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/contract.ts"
      start="53" end="58" />
    <Github fname="multiple_contracts.ts"
      url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/internal/multiple_contracts.ts"
      start="24" end="41" />
    <Github fname="utils.ts"
      url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/internal/utils.ts"
      start="3" end="20" />
  </Language>
  <Language value="rust" language="rust">
    <Github fname="multiple_contracts.rs"
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-rs/src/multiple_contracts.rs"
            start="58" end="92" />
  </Language>
</CodeTabs>

---

### Pattern 3: Multiple Calls with Uniform Response Types

This pattern is particularly useful when calling multiple instances of similar contracts or the same method across different contracts. It demonstrates a clean way to handle uniform response types.

**Use case**: Polling multiple data sources, aggregating results from similar contracts, or implementing multi-oracle patterns.

<CodeTabs>
  <Language value="js" language="js">
    <Github fname="contract.ts"
      url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/contract.ts"
      start="65" end="70" />
    <Github fname="similar_contracts.ts"
      url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/internal/similar_contracts.ts"
      start="6" end="35" />
  </Language>
  <Language value="rust" language="rust">
    <Github fname="similar_contracts.rs"
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-rs/src/similar_contracts.rs"
            start="8" end="31" />
  </Language>
</CodeTabs>

#### Iterating Through Uniform Responses

When all external contracts return the same data type, you can process responses more elegantly:

<CodeTabs>
  <Language value="js" language="js">
    <Github fname="contract.ts"
      url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/contract.ts"
      start="62" end="65" />
    <Github fname="similar_contracts.ts"
      url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/internal/similar_contracts.ts"
      start="37" end="54" />
    <Github fname="utils.ts"
      url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/internal/utils.ts"
      start="3" end="20" />
  </Language>
  <Language value="rust" language="rust">
    <Github fname="similar_contracts.rs"
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-rs/src/similar_contracts.rs"
            start="32" end="57" />
  </Language>
</CodeTabs>

---

## Production Considerations

### Critical Callback Behavior

Understanding callback execution is essential for building reliable applications:

- **Callbacks always execute**: Whether external calls succeed or fail, your callback will run
- **Manual rollbacks required**: Failed external calls don't automatically revert your contract's state changes
- **Token handling**: Failed calls return attached NEAR tokens to your contract, not the original caller

### Error Handling Strategy

Implement comprehensive error handling in your callbacks:

```javascript
@call({ privateFunction: true })
robust_callback({ user_data, transaction_id }) {
  const result = near.promiseResult(0);
  
  if (result.length === 0) {
    // External call failed - implement cleanup
    this.revert_user_changes(user_data);
    this.refund_if_needed(user_data.amount);
    this.log_failure(transaction_id);
    return { success: false, error: "External operation failed" };
  }
  
  try {
    const response = JSON.parse(result);
    return this.process_success(response, user_data);
  } catch (error) {
    // Invalid response format
    this.handle_parse_error(transaction_id);
    return { success: false, error: "Invalid response format" };
  }
}
```

### Gas Management Tips

- **Allocate sufficient gas**: Cross-contract calls consume more gas than single-contract operations
- **Account for callback execution**: Reserve gas for your callback function
- **Handle gas estimation failures**: Implement fallbacks when gas estimates are insufficient

---

## Testing the Contract

The contract includes comprehensive testing to validate complex interaction patterns. Run the following commands to execute tests:

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 JavaScript">

  ```bash
  cd contract-advanced-ts
  yarn
  yarn test
  ```

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">
  
  ```bash
  cd contract-advanced-rs
  cargo test
  ```

  </TabItem>

</Tabs>

:::tip Testing Cross-Contract Logic
The integration tests use a sandbox environment to simulate multi-contract interactions. This is essential for validating that your callback logic handles both success and failure scenarios correctly.
:::

<hr class="subsection" />

### Deploying the Contract to the NEAR network

In order to deploy the contract you will need to create a NEAR account.

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  # Create a new account pre-funded by a faucet
  near create-account <accountId> --useFaucet
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  # Create a new account pre-funded by a faucet
  near account create-account sponsor-by-faucet-service <my-new-dev-account>.testnet autogenerate-new-keypair save-to-keychain network-config testnet create
  ```
  </TabItem>
</Tabs>

Go into the directory containing the smart contract (`cd contract-advanced-ts` or `cd contract-advanced-rs`), build and deploy it:

<Tabs groupId="code-tabs">

  <TabItem value="js" label="🌐 JavaScript">

    ```bash
    npm run build
    near deploy <accountId> ./build/cross_contract.wasm --initFunction new --initArgs '{"hello_account":"hello.near-example.testnet","guestbook_account":"guestbook_account.near-example.testnet","counter_account":"counter_account.near-example.testnet"}'
    ```

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">
  
  ```bash
  cargo near deploy build-non-reproducible-wasm <accountId> with-init-call new json-args '{"hello_account":"hello.near-example.testnet","guestbook_account":"guestbook_account.near-example.testnet","counter_account":"counter_account.near-example.testnet"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' network-config testnet sign-with-keychain send
  ```

  </TabItem>

</Tabs>

<hr class="subsection" />

### CLI: Interacting with the Contract

Test the different cross-contract patterns using these commands:

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">
  
  ```bash
  # Execute contracts sequentially (batch pattern)
  near call <accountId> batch_actions --accountId <accountId> --gas 300000000000000   

  # Execute contracts in parallel (multiple contracts pattern)
  near call <accountId> multiple_contracts --accountId <accountId> --gas 300000000000000   

  # Execute multiple instances with same return type
  near call <accountId> similar_contracts --accountId <accountId> --gas 300000000000000
  ```
  </TabItem>

  <TabItem value="full" label="Full">
  
  ```bash
  # Execute contracts sequentially (batch pattern)
  near contract call-function as-transaction <accountId> batch_actions json-args '{}' prepaid-gas '300.0 Tgas' attached-deposit '0 NEAR' sign-as <accountId> network-config testnet sign-with-keychain send

  # Execute contracts in parallel (multiple contracts pattern)
  near contract call-function as-transaction <accountId> multiple_contracts json-args '{}' prepaid-gas '300.0 Tgas' attached-deposit '0 NEAR' sign-as <accountId> network-config testnet sign-with-keychain send

  # Execute multiple instances with same return type
  near contract call-function as-transaction <accountId> similar_contracts json-args '{}' prepaid-gas '300.0 Tgas' attached-deposit '0 NEAR' sign-as <accountId> network-config testnet sign-with-keychain send
  ```
  </TabItem>
</Tabs>

---

## Advanced Implementation Patterns

### Coordinating Complex Multi-Contract Workflows

For sophisticated applications, you might need to coordinate between multiple contracts with interdependent operations:

```javascript
// Example: Coordinated DeFi operation across multiple protocols
contract_a = CrossContract(this.dex_contract);
promise_a = contract_a.call("get_price", { token: "USDC" });

contract_b = CrossContract(this.lending_contract);  
promise_b = contract_b.call("get_collateral_ratio", { user: user_id });

combined_promise = promise_a.join(
    [promise_b],
    "execute_leveraged_trade",
    contract_ids=[this.dex_contract, this.lending_contract]
);

return combined_promise.value();
```

### Error Recovery Strategies

Implement robust error handling for production applications:

```javascript
@call({ privateFunction: true })
complex_operation_callback({ user_id, operation_data, original_state }) {
  const results = this.get_all_promise_results();
  
  // Check if any critical operations failed
  const critical_failures = results.filter((result, index) => 
    !result.success && operation_data.critical_operations.includes(index)
  );
  
  if (critical_failures.length > 0) {
    // Rollback strategy for critical failures
    this.restore_user_state(user_id, original_state);
    this.refund_user_funds(user_id, operation_data.total_amount);
    return { 
      success: false, 
      error: "Critical operations failed",
      failed_operations: critical_failures.length 
    };
  }
  
  // Process partial success scenarios
  return this.handle_partial_success(results, user_id);
}
```

---

## Best Practices for Complex Cross-Contract Calls

### 1. Design for Partial Failures

Always assume some external calls might fail and design your application to handle partial success gracefully.

### 2. Implement Comprehensive Logging

Add detailed logging to track cross-contract call outcomes:

```javascript
near.log(`Cross-contract call initiated: ${contract_id}.${method_name}`);
near.log(`Callback executed with status: ${result.success ? 'SUCCESS' : 'FAILED'}`);
```

### 3. Optimize Gas Usage

Cross-contract calls consume significant gas. Profile your operations and optimize:

- Use appropriate gas allocations for each external call
- Consider the gas cost of your callback processing
- Implement gas estimation for complex workflows

### 4. State Management Strategy

Plan your state changes carefully:

- Save original state before making external calls
- Implement clear rollback procedures
- Use consistent patterns across your application

---

## Troubleshooting Common Issues

:::warning Gas Limitations
If you encounter "Exceeded the prepaid gas" errors, increase the gas amount in your external contract calls. Complex multi-contract operations require substantial gas allocation.
:::

:::info Callback Debugging
Use NEAR's sandbox testing environment to debug callback logic. The sandbox lets you simulate various failure scenarios and validate your error handling.
:::

:::note Version Compatibility
At the time of this writing, this example works with the following versions:

- near-cli: `4.0.13`
- node: `18.19.1`  
- rustc: `1.77.0`
:::

---

## Taking Your Skills Further

Mastering these complex cross-contract patterns opens up possibilities for building sophisticated applications:

- **DeFi protocols** that coordinate across multiple markets
- **Multi-step workflows** that span several specialized contracts  
- **Resilient systems** that gracefully handle partial failures
- **High-performance applications** that leverage parallel execution

The key is understanding that NEAR's asynchronous nature isn't a constraint—it's a powerful feature that enables building applications that would be impossible on synchronous blockchains.

Start with these patterns, experiment with combining them, and you'll discover new ways to architect complex blockchain applications that take full advantage of NEAR's unique capabilities.
