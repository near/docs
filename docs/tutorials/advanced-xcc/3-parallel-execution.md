# Parallel Contract Execution for Maximum Efficiency

Parallel execution allows you to call multiple contracts simultaneously, dramatically improving efficiency when you need to gather data or perform operations across different contracts. Unlike batch actions, **parallel calls execute independently - if one fails, the others continue**.

## Understanding Parallel Execution

When you execute contracts in parallel:
- **Simultaneous execution**: All contracts are called at the same time
- **Independent results**: Each call succeeds or fails independently  
- **Faster completion**: Total execution time is limited by the slowest call
- **Array of results**: Your callback receives all results as an array

## Implementing Parallel Execution

### TypeScript Implementation

```typescript
@call({})
multiple_contracts() {
  // Create independent promises
  const hello_promise = NearPromise.new(this.hello_account)
    .functionCall("get_greeting", JSON.stringify({}), 0n, 5_000_000_000_000n);

  const counter_promise = NearPromise.new(this.counter_account)  
    .functionCall("get_num", JSON.stringify({}), 0n, 5_000_000_000_000n);

  const guestbook_promise = NearPromise.new(this.guestbook_account)
    .functionCall("get_messages", JSON.stringify({}), 0n, 5_000_000_000_000n);

  // Combine for parallel execution
  return hello_promise
    .and(counter_promise)
    .and(guestbook_promise)
    .then(
      NearPromise.new(env.current_account_id())
        .functionCall("multiple_contracts_callback", JSON.stringify({}), 0n, 10_000_000_000_000n)
    );
}

@call({privateFunction: true})
multiple_contracts_callback() {
  const responses = [];
  
  for (let i = 0; i < 3; i++) {
    const result = getValueFromPromise(i);
    
    if (result.success) {
      switch(i) {
        case 0: responses.push(`Hello: ${result.value}`); break;
        case 1: responses.push(`Counter: ${result.value}`); break;
        case 2: 
          const messages = JSON.parse(result.value);
          responses.push(`Messages: ${messages.length} total`);
          break;
      }
    } else {
      responses.push(`Contract ${i} failed: ${result.error || 'Unknown error'}`);
    }
  }
  
  return responses.join(', ');
}
```

### Rust Implementation

```rust
pub fn multiple_contracts(&mut self) -> Promise {
  // Create independent promises
  let hello_promise = Promise::new(self.hello_account.clone())
    .function_call("get_greeting".to_owned(), json!({}).to_string().into_bytes(), 0, Gas::from_tgas(5));

  let counter_promise = Promise::new(self.counter_account.clone())
    .function_call("get_num".to_owned(), json!({}).to_string().into_bytes(), 0, Gas::from_tgas(5));

  let guestbook_promise = Promise::new(self.guestbook_account.clone())
    .function_call("get_messages".to_owned(), json!({}).to_string().into_bytes(), 0, Gas::from_tgas(5));

  // Combine for parallel execution
  hello_promise
    .and(counter_promise)
    .and(guestbook_promise)
    .then(Promise::new(env::current_account_id())
      .function_call("multiple_contracts_callback".to_owned(), json!({}).to_string().into_bytes(), 0, Gas::from_tgas(10)))
}

#[private]
pub fn multiple_contracts_callback(&mut self) -> String {
  let mut responses = Vec::new();
  
  for i in 0..3 {
    match env::promise_result(i) {
      PromiseResult::Successful(result) => {
        match i {
          0 => {
            let greeting: String = near_sdk::serde_json::from_slice(&result).unwrap_or_default();
            responses.push(format!("Hello: {}", greeting));
          }
          1 => {
            let count: i8 = near_sdk::serde_json::from_slice(&result).unwrap_or(0);
            responses.push(format!("Counter: {}", count));
          }
          2 => {
            let messages: Vec<String> = near_sdk::serde_json::from_slice(&result).unwrap_or_default();
            responses.push(format!("Messages: {} total", messages.len()));
          }
          _ => {}
        }
      }
      PromiseResult::Failed => responses.push(format!("Contract {} failed", i)),
    }
  }
  
  responses.join(", ")
}
```

## Real-World Example: DeFi Portfolio Dashboard

```typescript
@call({})
get_portfolio_summary({user_account, token_contract, lending_contract, dex_contract}) {
  // Execute multiple protocol calls in parallel
  const balance_promise = NearPromise.new(token_contract)
    .functionCall("ft_balance_of", JSON.stringify({account_id: user_account}), 0n, 5_000_000_000_000n);

  const lending_promise = NearPromise.new(lending_contract)
    .functionCall("get_account_positions", JSON.stringify({account_id: user_account}), 0n, 10_000_000_000_000n);

  const dex_promise = NearPromise.new(dex_contract)
    .functionCall("get_user_liquidity", JSON.stringify({account_id: user_account}), 0n, 8_000_000_000_000n);

  return balance_promise.and(lending_promise).and(dex_promise)
    .then(NearPromise.new(env.current_account_id())
      .functionCall("portfolio_callback", JSON.stringify({user_account}), 0n, 15_000_000_000_000n));
}

@call({privateFunction: true})
portfolio_callback({user_account}) {
  const portfolio = {};
  
  // Process results with fallbacks
  const balance_result = getValueFromPromise(0);
  portfolio.token_balance = balance_result.success ? JSON.parse(balance_result.value) : "0";
  
  const lending_result = getValueFromPromise(1);
  portfolio.lending = lending_result.success ? JSON.parse(lending_result.value) : {supplied: "0", borrowed: "0"};
  
  const dex_result = getValueFromPromise(2);
  portfolio.liquidity_positions = dex_result.success ? JSON.parse(dex_result.value) : [];

  return {user_account, portfolio, timestamp: env.block_timestamp_ms()};
}
```

## Performance Benefits

Parallel execution provides significant performance improvements:

```typescript
// Sequential: ~300ms total
await contract1.method(); // 100ms
await contract2.method(); // 100ms  
await contract3.method(); // 100ms

// Parallel: ~100ms total (limited by slowest call)
Promise.all([contract1.method(), contract2.method(), contract3.method()]);
```

## Error Handling Strategies

### Graceful Degradation
Always provide fallback values for failed calls:

```typescript
portfolio_callback() {
  const results = {balance: "0", rewards: "0", positions: []};
  
  // Try each result, use defaults if failed
  const balance_result = getValueFromPromise(0);
  if (balance_result.success) {
    results.balance = JSON.parse(balance_result.value);
  }
  
  return results; // Always return something useful
}
```

## Best Practices

### ✅ Do
- Document which promise index corresponds to which contract
- Implement fallback values for failed calls
- Allocate appropriate gas for each contract type
- Monitor which contracts are slow or frequently failing

### ❌ Avoid
- Confusing result indices with contract calls
- Not handling individual contract failures gracefully
- Underestimating gas requirements for callbacks

## Gas Optimization

```typescript
// Allocate appropriate gas by operation complexity
const light_call_gas = 5_000_000_000_000n;   // Simple view calls
const heavy_call_gas = 30_000_000_000_000n;   // Complex operations

// Add 10-20% buffer for safety
const total_gas = estimated_gas * 1.2;
```

## When to Use Parallel vs Batch

| Use Parallel When | Use Batch When |
|------------------|----------------|
| ✅ Different contracts | ✅ Same contract multiple times |
| ✅ Independent operations | ✅ Sequential dependent operations |
| ✅ Can handle partial failures | ✅ Need atomic rollback |
| ✅ Performance is critical | ✅ Consistency is critical |

## Testing

```typescript
test('parallel execution handles mixed results', async (t) => {
  const result = await contract.call('multiple_contracts', {}, {gas: '300000000000000'});
  
  // Verify results from all contracts
  t.true(result.includes('Hello:'));
  t.true(result.includes('Counter:'));
  t.true(result.includes('Messages:'));
});
```

## Next Steps

Now that you understand parallel execution, explore these related topics:

- **[Advanced Response Handling](4-response-handling.md)**: Learn sophisticated patterns for processing complex results from multiple contracts

:::tip Performance vs Reliability Trade-off

Parallel execution optimizes for performance and availability - you get results faster and can handle individual failures. However, if you need strong consistency guarantees, consider using [batch actions](2-batch-actions.md) instead.

:::