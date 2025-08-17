# Advanced Cross-Contract Calls: Building Complex Multi-Contract Interactions

Cross-contract calls are the backbone of composable blockchain applications. While simple cross-contract calls allow basic interactions between contracts, advanced patterns enable sophisticated multi-contract orchestrations that power complex decentralized applications.

## What Are Advanced Cross-Contract Calls?

Advanced cross-contract calls go beyond single contract interactions to enable:

- **Batch Operations**: Execute multiple calls to the same contract atomically
- **Parallel Execution**: Call multiple different contracts simultaneously  
- **Complex Callbacks**: Handle multiple responses and error states
- **Transaction Composition**: Build sophisticated workflows across contracts

## Why Use Advanced Cross-Contract Calls?

### Atomic Operations
When you batch multiple calls to the same contract, they execute sequentially. If any call fails, **all operations are reverted**, ensuring data consistency.

### Performance Optimization
Parallel calls to different contracts execute simultaneously, reducing overall transaction time compared to sequential individual calls.

### Complex Business Logic
Real-world dApps often need to coordinate between multiple specialized contracts (tokens, governance, rewards, etc.).

## Core Patterns

### 1. Batch Actions Pattern

Use batch actions when you need multiple operations on the same contract to succeed or fail together.

**When to Use:**
- Multiple token transfers that must all succeed
- Sequential state updates that depend on each other
- Bulk operations that require atomicity

**Key Characteristics:**
- All calls execute sequentially
- Complete rollback if any call fails
- Callback receives only the last call's response

```rust
// Batch multiple calls to the same contract
pub fn batch_actions(&mut self) -> Promise {
    let promise = hello_near::ext(self.hello_account.clone())
        .with_static_gas(Gas::from_tgas(5))
        .set_greeting("batch_1".to_string())
        .then(
            hello_near::ext(self.hello_account.clone())
                .with_static_gas(Gas::from_tgas(5))
                .set_greeting("batch_2".to_string())
        );
    
    return promise.then(
        Self::ext(env::current_account_id())
            .with_static_gas(Gas::from_tgas(5))
            .batch_actions_callback()
    );
}
```

### 2. Multiple Contracts Pattern

Use this pattern when you need to gather information or trigger actions across multiple independent contracts.

**When to Use:**
- Price feeds from multiple oracles
- Multi-token balance checks
- Distributed voting or consensus systems
- Cross-protocol integrations

**Key Characteristics:**
- All calls execute in parallel
- Independent failure (one failing doesn't affect others)
- Callback receives array of all responses

```rust
// Call multiple different contracts in parallel
pub fn multiple_contracts(&mut self) -> Promise {
    let hello_promise = hello_near::ext(self.hello_account.clone())
        .with_static_gas(Gas::from_tgas(5))
        .get_greeting();
    
    let counter_promise = counter::ext(self.counter_account.clone())
        .with_static_gas(Gas::from_tgas(5))
        .get_num();
    
    let guestbook_promise = guestbook::ext(self.guestbook_account.clone())
        .with_static_gas(Gas::from_tgas(5))
        .total_messages();

    return hello_promise
        .and(counter_promise)
        .and(guestbook_promise)
        .then(
            Self::ext(env::current_account_id())
                .with_static_gas(Gas::from_tgas(10))
                .multiple_contracts_callback()
        );
}
```

### 3. Similar Contracts Pattern

A specialized case for calling multiple instances of the same contract type - useful for distributed systems.

**When to Use:**
- Sharded data across multiple contract instances
- Load balancing across contract replicas
- Multi-region deployments

## Handling Responses and Errors

### Processing Multiple Responses

```rust
#[private]
pub fn multiple_contracts_callback(
    &mut self,
    #[callback_result] hello_result: Result<String, PromiseError>,
    #[callback_result] counter_result: Result<i32, PromiseError>,
    #[callback_result] guestbook_result: Result<u64, PromiseError>,
) -> Vec<String> {
    let mut results = Vec::new();
    
    // Handle each result independently
    match hello_result {
        Ok(greeting) => results.push(format!("Hello: {}", greeting)),
        Err(_) => results.push("Hello contract failed".to_string()),
    }
    
    match counter_result {
        Ok(count) => results.push(format!("Counter: {}", count)),
        Err(_) => results.push("Counter contract failed".to_string()),
    }
    
    match guestbook_result {
        Ok(messages) => results.push(format!("Messages: {}", messages)),
        Err(_) => results.push("Guestbook contract failed".to_string()),
    }
    
    results
}
```

### Error Handling Strategies

1. **Graceful Degradation**: Continue execution even if some calls fail
2. **Fail-Fast**: Abort the entire operation if critical calls fail
3. **Retry Logic**: Implement exponential backoff for transient failures
4. **Partial Success**: Return successful results while flagging failures

## Gas Management

Advanced cross-contract calls require careful gas planning:

```rust
// Reserve gas for each operation
const SINGLE_CALL_GAS: Gas = Gas::from_tgas(5);
const CALLBACK_GAS: Gas = Gas::from_tgas(10);

// Calculate total gas needed
let total_gas = SINGLE_CALL_GAS.0 * number_of_calls + CALLBACK_GAS.0;
```

**Best Practices:**
- Always reserve extra gas for callbacks
- Monitor gas usage in tests
- Implement gas-efficient error handling
- Consider breaking complex operations into smaller transactions

## Testing Advanced Patterns

```rust
#[tokio::test]
async fn test_multiple_contracts() -> Result<(), Box<dyn std::error::Error>> {
    let sandbox = near_workspaces::sandbox().await?;
    
    // Deploy all required contracts
    let main_contract = deploy_main_contract(&sandbox).await?;
    let hello_contract = deploy_hello_contract(&sandbox).await?;
    let counter_contract = deploy_counter_contract(&sandbox).await?;
    
    // Test parallel execution
    let result = main_contract
        .call("multiple_contracts")
        .max_gas()
        .transact()
        .await?;
    
    // Verify all contracts were called successfully
    assert!(result.is_success());
    let responses: Vec<String> = result.json()?;
    assert_eq!(responses.len(), 3);
    
    Ok(())
}
```

## Common Pitfalls and Solutions

### 1. Gas Exhaustion
**Problem**: Complex operations running out of gas
**Solution**: Break operations into smaller chunks or increase gas allocation

### 2. Callback Complexity
**Problem**: Callbacks becoming too complex to manage
**Solution**: Use structured error handling and consider state machines

### 3. Race Conditions
**Problem**: Parallel calls creating inconsistent state
**Solution**: Design contracts to handle concurrent access gracefully

### 4. Error Propagation
**Problem**: Losing context of which specific call failed
**Solution**: Return detailed error information in callback results

## Real-World Applications

### DeFi Composability
```rust
// Execute a complex DeFi strategy across multiple protocols
pub fn execute_strategy(&mut self, amount: U128) -> Promise {
    // 1. Swap tokens on DEX
    let swap_promise = dex::ext(self.dex_account.clone())
        .swap_tokens(amount, "token_a", "token_b");
    
    // 2. Provide liquidity to pool (parallel with lending)
    let liquidity_promise = pool::ext(self.pool_account.clone())
        .add_liquidity("token_b", amount);
    
    // 3. Lend remaining tokens for yield
    let lending_promise = lending::ext(self.lending_account.clone())
        .lend_tokens("token_b", amount);
    
    return swap_promise
        .then(liquidity_promise.and(lending_promise))
        .then(Self::ext(env::current_account_id()).strategy_callback());
}
```

### Multi-Token Operations
```rust
// Batch transfer multiple tokens atomically
pub fn multi_token_transfer(&mut self, transfers: Vec<Transfer>) -> Promise {
    let mut promise_chain = None;
    
    for transfer in transfers {
        let transfer_promise = token::ext(transfer.token_contract)
            .transfer(transfer.recipient, transfer.amount);
        
        promise_chain = match promise_chain {
            None => Some(transfer_promise),
            Some(chain) => Some(chain.then(transfer_promise)),
        };
    }
    
    promise_chain.unwrap().then(
        Self::ext(env::current_account_id()).transfer_callback()
    )
}
```

## Best Practices Summary

1. **Design for Failure**: Always handle error cases gracefully
2. **Optimize Gas Usage**: Monitor and optimize gas consumption
3. **Test Thoroughly**: Use sandbox testing for complex scenarios
4. **Keep Callbacks Simple**: Avoid complex logic in callback functions
5. **Document Dependencies**: Clearly specify required contract interfaces
6. **Monitor Performance**: Track execution times and success rates

## Next Steps

- Explore the [complete example implementation](https://github.com/near-examples/cross-contract-calls)
- Learn about [simple cross-contract calls](xcc.md) for basic patterns
- Study [promise batching](../concepts/promises.md) for advanced orchestration
- Review [gas optimization techniques](../concepts/gas.md) for efficient execution

Advanced cross-contract calls unlock the full composability potential of the NEAR ecosystem. By mastering these patterns, you can build sophisticated applications that seamlessly integrate multiple contracts and protocols.
