# Mastering Advanced Cross-Contract Calls on NEAR

Cross-contract calls are fundamental to building interconnected dApps on NEAR. While basic cross-contract calls handle simple interactions, advanced patterns enable you to orchestrate complex multi-contract workflows that power sophisticated blockchain applications.

## Understanding Advanced Cross-Contract Patterns

Advanced cross-contract calls extend beyond single contract interactions to enable three critical patterns:

1. **Sequential Batch Operations** - Execute multiple operations on the same contract atomically
2. **Parallel Multi-Contract Calls** - Interact with different contracts simultaneously 
3. **Coordinated Response Handling** - Process multiple results with sophisticated error management

## The Atomic Batch Pattern

### When Atomicity Matters

Batch operations ensure that multiple related actions either all succeed or all fail together. This is crucial for:

- **Financial Operations**: Multi-step token transfers or trades
- **State Consistency**: Related data updates that must stay synchronized
- **Complex Workflows**: Business logic requiring multiple sequential steps

### Implementation Strategy

```typescript
// Batch multiple operations to ensure atomicity
async batchActions(): Promise<void> {
    const batchPromise = NearBindgen.promiseBatchCreate(this.helloAccount);
    
    // Chain multiple calls - they execute sequentially
    NearBindgen.promiseBatchActionFunctionCall(
        batchPromise,
        "set_greeting",
        JSON.stringify({ greeting: "First greeting" }),
        0,
        GAS_FOR_SINGLE_CALL
    );
    
    NearBindgen.promiseBatchActionFunctionCall(
        batchPromise,
        "set_greeting", 
        JSON.stringify({ greeting: "Second greeting" }),
        0,
        GAS_FOR_SINGLE_CALL
    );
    
    // Register callback to handle the final result
    const callbackPromise = NearBindgen.promiseThen(
        batchPromise,
        near.currentAccountId(),
        "batchCallback",
        JSON.stringify({}),
        0,
        GAS_FOR_CALLBACK
    );
    
    NearBindgen.promiseReturn(callbackPromise);
}
```

### Key Characteristics of Batch Operations

- **Sequential Execution**: Each call waits for the previous to complete
- **All-or-Nothing**: If any call fails, the entire batch is reverted
- **Single Result**: Callback receives only the last operation's result
- **Gas Efficiency**: Reduced overhead compared to separate transactions

## The Parallel Execution Pattern  

### Maximizing Performance Through Concurrency

Parallel execution allows multiple independent operations to run simultaneously, significantly reducing total execution time.

### Strategic Use Cases

- **Data Aggregation**: Collecting information from multiple sources
- **Multi-Protocol Integration**: Interacting with different DeFi protocols
- **Load Distribution**: Spreading operations across multiple contract instances
- **Independent Operations**: Actions that don't depend on each other's results

### Implementation Approach

```rust
pub fn multiple_contracts(&mut self) -> Promise {
    // Create independent promises for parallel execution
    let greeting_promise = hello_near::ext(self.hello_account.clone())
        .with_static_gas(Gas::from_tgas(5))
        .get_greeting();
    
    let counter_promise = counter::ext(self.counter_account.clone()) 
        .with_static_gas(Gas::from_tgas(5))
        .get_num();
    
    let messages_promise = guestbook::ext(self.guestbook_account.clone())
        .with_static_gas(Gas::from_tgas(5))
        .total_messages();
    
    // Combine promises to execute in parallel
    greeting_promise
        .and(counter_promise)
        .and(messages_promise)
        .then(
            Self::ext(env::current_account_id())
                .with_static_gas(Gas::from_tgas(10))
                .multiple_contracts_callback()
        )
}
```

### Parallel Execution Benefits

- **Reduced Latency**: Operations execute simultaneously rather than sequentially
- **Independent Failure**: One failed call doesn't prevent others from succeeding
- **Scalability**: Can easily add more parallel operations
- **Resource Optimization**: Better utilization of network and computation resources

## Advanced Response Handling

### Processing Multiple Results Effectively

When dealing with multiple contract responses, robust error handling becomes critical for building reliable applications.

```rust
#[private]
pub fn multiple_contracts_callback(
    &mut self,
    #[callback_result] greeting_result: Result<String, PromiseError>,
    #[callback_result] counter_result: Result<i32, PromiseError>, 
    #[callback_result] messages_result: Result<u64, PromiseError>,
) -> ResponseSummary {
    let mut summary = ResponseSummary::new();
    
    // Process each result with specific error handling
    summary.greeting_status = match greeting_result {
        Ok(greeting) => {
            summary.greeting_data = Some(greeting);
            "success".to_string()
        },
        Err(error) => {
            log!("Greeting call failed: {:?}", error);
            "failed".to_string()
        }
    };
    
    summary.counter_status = match counter_result {
        Ok(count) => {
            summary.counter_data = Some(count);
            "success".to_string()
        },
        Err(error) => {
            log!("Counter call failed: {:?}", error);
            "failed".to_string()
        }
    };
    
    summary.messages_status = match messages_result {
        Ok(total) => {
            summary.messages_data = Some(total);
            "success".to_string()
        },
        Err(error) => {
            log!("Messages call failed: {:?}", error);
            "failed".to_string()
        }
    };
    
    summary
}
```

## Gas Optimization Strategies

### Calculating Gas Requirements

Advanced cross-contract calls require careful gas planning to ensure successful execution:

```rust
// Define gas constants for different operations
const SIMPLE_CALL_GAS: Gas = Gas::from_tgas(5);
const COMPLEX_CALL_GAS: Gas = Gas::from_tgas(10);
const CALLBACK_BASE_GAS: Gas = Gas::from_tgas(5);
const GAS_PER_PROMISE: Gas = Gas::from_tgas(2);

// Calculate total gas for multiple promises
fn calculate_required_gas(promise_count: u64) -> Gas {
    let call_gas = Gas::from_tgas(5 * promise_count);
    let callback_gas = Gas::from_tgas(5 + 2 * promise_count);
    Gas::from_tgas(call_gas.0 + callback_gas.0)
}
```

### Gas Management Best Practices

1. **Reserve Buffer Gas**: Always allocate 20-30% extra gas for unexpected overhead
2. **Monitor Usage**: Track actual gas consumption in tests and production
3. **Optimize Callbacks**: Keep callback logic minimal to reduce gas costs
4. **Break Complex Operations**: Split large operations into smaller, manageable chunks

## Error Handling and Recovery Patterns

### Designing Resilient Systems

Advanced cross-contract calls introduce multiple failure points. Implementing proper error handling ensures your application remains robust:

```typescript
// Error recovery with retry logic
class CrossContractManager {
    async executeWithRetry(operation: () => Promise<any>, maxRetries: number = 3): Promise<any> {
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                return await operation();
            } catch (error) {
                near.log(`Attempt ${attempt} failed: ${error.message}`);
                
                if (attempt === maxRetries) {
                    throw new Error(`Operation failed after ${maxRetries} attempts: ${error.message}`);
                }
                
                // Exponential backoff
                await this.delay(Math.pow(2, attempt) * 1000);
            }
        }
    }
    
    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
```

### Error Classification and Response

- **Transient Errors**: Network issues, temporary unavailability - retry with backoff
- **Contract Errors**: Invalid parameters, insufficient funds - log and handle gracefully  
- **System Errors**: Gas exhaustion, timeout - adjust parameters and retry
- **Business Logic Errors**: Invalid state transitions - propagate to user with clear message

## Testing Complex Cross-Contract Interactions

### Comprehensive Testing Strategy

```rust
#[cfg(test)]
mod tests {
    use super::*;
    use near_sdk::test_utils::{accounts, VMContextBuilder};
    use near_sdk::testing_env;
    
    #[test]
    fn test_parallel_execution() {
        let context = VMContextBuilder::new()
            .current_account_id(accounts(0))
            .predecessor_account_id(accounts(0))
            .build();
        testing_env!(context);
        
        let mut contract = CrossContractExample::new(
            accounts(1), // hello_account
            accounts(2), // counter_account  
            accounts(3), // guestbook_account
        );
        
        // Test multiple contracts call
        let promise = contract.multiple_contracts();
        
        // Verify promise was created successfully
        assert!(!promise.is_null());
    }
    
    #[test] 
    fn test_batch_atomicity() {
        // Test that batch operations maintain atomicity
        let mut contract = setup_contract();
        
        // This should succeed entirely or fail entirely
        let result = contract.batch_actions();
        
        // Verify the atomic nature of the operation
        // Either all operations succeed or none do
    }
    
    #[test]
    fn test_error_handling() {
        // Test callback behavior with various error conditions
        let mut contract = setup_contract();
        
        // Simulate different error scenarios
        let callback_result = contract.multiple_contracts_callback(
            Err(PromiseError::Failed),
            Ok(42),
            Err(PromiseError::NotReady),
        );
        
        // Verify graceful error handling
        assert_eq!(callback_result.greeting_status, "failed");
        assert_eq!(callback_result.counter_status, "success");
        assert_eq!(callback_result.messages_status, "failed");
    }
}
```

## Real-World Implementation Examples

### DeFi Yield Farming Strategy

```rust
// Coordinate multiple DeFi operations across different protocols
pub fn execute_yield_strategy(&mut self, amount: U128) -> Promise {
    // Parallel execution for price discovery
    let price_oracle_a = oracle_a::ext(self.oracle_a_account.clone())
        .get_price("NEAR/USD");
    
    let price_oracle_b = oracle_b::ext(self.oracle_b_account.clone())
        .get_price("NEAR/USD");
    
    // Execute strategy based on price information
    price_oracle_a
        .and(price_oracle_b)
        .then(
            Self::ext(env::current_account_id())
                .process_price_data_and_execute_strategy(amount)
        )
}

#[private]
pub fn process_price_data_and_execute_strategy(
    &mut self,
    amount: U128,
    #[callback_result] price_a: Result<U128, PromiseError>,
    #[callback_result] price_b: Result<U128, PromiseError>,
) -> Promise {
    let average_price = self.calculate_average_price(price_a, price_b);
    
    // Based on price, execute optimal strategy
    if average_price > self.threshold_price {
        self.execute_lending_strategy(amount)
    } else {
        self.execute_liquidity_strategy(amount)
    }
}
```

### Multi-Token Portfolio Management

```rust
// Manage a portfolio across multiple token contracts
pub fn rebalance_portfolio(&mut self) -> Promise {
    // Get balances from multiple token contracts simultaneously
    let usdc_balance = token::ext(self.usdc_contract.clone())
        .ft_balance_of(env::current_account_id());
    
    let dai_balance = token::ext(self.dai_contract.clone()) 
        .ft_balance_of(env::current_account_id());
    
    let near_balance = token::ext(self.wnear_contract.clone())
        .ft_balance_of(env::current_account_id());
    
    usdc_balance
        .and(dai_balance)
        .and(near_balance)
        .then(
            Self::ext(env::current_account_id())
                .execute_rebalancing_logic()
        )
}
```

## Performance Optimization Techniques

### Minimizing Cross-Contract Call Overhead

1. **Batch Related Operations**: Group multiple calls to the same contract
2. **Optimize Promise Chains**: Structure promises to minimize callback complexity  
3. **Cache Frequently Used Data**: Reduce redundant cross-contract calls
4. **Use View Methods**: Prefer view calls for read-only operations when possible

### Monitoring and Analytics

```rust
// Track performance metrics for optimization
#[derive(BorshSerialize, BorshDeserialize)]
pub struct PerformanceMetrics {
    pub total_calls: u64,
    pub successful_calls: u64, 
    pub failed_calls: u64,
    pub average_gas_used: u64,
    pub total_execution_time: u64,
}

impl CrossContractExample {
    pub fn record_call_metrics(&mut self, success: bool, gas_used: u64, execution_time: u64) {
        self.metrics.total_calls += 1;
        
        if success {
            self.metrics.successful_calls += 1;
        } else {
            self.metrics.failed_calls += 1;
        }
        
        self.metrics.average_gas_used = 
            (self.metrics.average_gas_used * (self.metrics.total_calls - 1) + gas_used) 
            / self.metrics.total_calls;
            
        self.metrics.total_execution_time += execution_time;
    }
}
```

## Advanced Troubleshooting

### Common Issues and Solutions

**Promise Chain Failures**
- Verify gas allocation for each step in the chain
- Check that all referenced contracts are deployed and accessible
- Ensure callback methods are marked as `#[private]`

**Inconsistent State After Parallel Calls**
- Design contracts to handle concurrent access gracefully
- Use atomic operations where state consistency is critical
- Implement proper error recovery mechanisms

**Gas Estimation Errors**
- Profile actual gas usage in sandbox tests
- Account for network congestion variations
- Implement dynamic gas adjustment based on operation complexity

## Security Considerations

### Protecting Against Cross-Contract Vulnerabilities

1. **Validate All External Responses**: Never trust data from external contracts without validation
2. **Implement Access Controls**: Ensure callback methods are private and properly authenticated
3. **Handle Reentrancy**: Design state changes to be safe against reentrancy attacks
4. **Gas Griefing Protection**: Set reasonable gas limits to prevent abuse

```rust
#[private]  
pub fn secure_callback(
    &mut self,
    #[callback_result] result: Result<String, PromiseError>,
) -> String {
    // Validate the result before using it
    match result {
        Ok(data) => {
            // Sanitize and validate the data
            if self.validate_external_data(&data) {
                self.process_secure_data(data)
            } else {
                "Invalid data received from external contract".to_string()
            }
        },
        Err(error) => {
            near_sdk::log!("External call failed: {:?}", error);
            "External call failed".to_string()
        }
    }
}

fn validate_external_data(&self, data: &str) -> bool {
    // Implement validation logic specific to your use case
    !data.is_empty() && data.len() <= MAX_DATA_LENGTH
}
```

## Conclusion

Advanced cross-contract calls unlock the full potential of composable blockchain applications on NEAR. By mastering batch operations, parallel execution, and sophisticated error handling, you can build robust, efficient, and scalable multi-contract systems.

The key to success lies in understanding when to use each pattern, properly managing gas and errors, and thoroughly testing complex interactions. As you implement these patterns, always prioritize security, user experience, and system reliability.

Start with simple use cases and gradually build complexity as you become comfortable with these advanced patterns. The NEAR ecosystem's composability depends on developers who can effectively orchestrate multiple contracts to create innovative blockchain solutions.
