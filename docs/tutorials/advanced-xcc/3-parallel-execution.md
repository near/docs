---
id: parallel-execution
title: Parallel Contract Execution for Maximum Efficiency
sidebar_label: Parallel Execution
description: "Execute multiple contracts simultaneously for maximum efficiency. Unlike batch actions, parallel calls don't rollback if one fails."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import {Github} from "@site/src/components/codetabs";

Parallel execution calls multiple contracts simultaneously. Each call executes independently - if one fails, others continue.

## Understanding Parallel Execution

Key characteristics:
1. **Simultaneous execution** - All contracts called at once
2. **Independent results** - Each succeeds/fails independently  
3. **Faster completion** - Limited by slowest call
4. **Array of results** - Callback receives all results

## Implementation

<Tabs>
  <TabItem value="js" label="JavaScript" default>

<Github fname="multiple_contracts.ts"
      url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/internal/multiple_contracts.ts"
      start="6" end="21" />

  </TabItem>
  <TabItem value="rust" label="Rust">

<Github fname="multiple_contracts.rs"
        url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-rs/src/multiple_contracts.rs"
        start="17" end="52" />

  </TabItem>
</Tabs>

## Handling Multiple Responses

Process an array of results:

<Tabs>
  <TabItem value="js" label="JavaScript" default>

<Github fname="multiple_contracts.ts"
      url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/internal/multiple_contracts.ts"
      start="24" end="41" />

  </TabItem>
  <TabItem value="rust" label="Rust">

<Github fname="multiple_contracts.rs"
        url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-rs/src/multiple_contracts.rs"
        start="55" end="85" />

  </TabItem>
</Tabs>

## Real-World Example: DeFi Portfolio

<Tabs>
  <TabItem value="js" label="JavaScript" default>

```typescript
@call({})
get_portfolio_data({
  user,
  token_contract,
  lending_contract,
  staking_contract
}: {
  user: AccountId;
  token_contract: AccountId;
  lending_contract: AccountId;
  staking_contract: AccountId;
}) {
  // Get balance
  const balance_promise = NearPromise.new(token_contract)
    .functionCall(
      "ft_balance_of", 
      JSON.stringify({account_id: user}),
      0n, 
      5_000_000_000_000n
    );

  // Get lending position
  const lending_promise = NearPromise.new(lending_contract)
    .functionCall(
      "get_position",
      JSON.stringify({account_id: user}),
      0n,
      10_000_000_000_000n
    );

  // Get staking rewards
  const staking_promise = NearPromise.new(staking_contract)
    .functionCall(
      "get_rewards",
      JSON.stringify({account_id: user}),
      0n,
      5_000_000_000_000n
    );

  // Execute all in parallel
  return balance_promise
    .and(lending_promise)
    .and(staking_promise)
    .then(
      NearPromise.new(env.current_account_id())
        .functionCall(
          "portfolio_callback",
          JSON.stringify({user}),
          0n,
          15_000_000_000_000n
        )
    );
}

@call({privateFunction: true})
portfolio_callback({user}: {user: AccountId}) {
  const results = [];
  
  for (let i = 0; i < 3; i++) {
    const result = getValueFromPromise(i);
    if (result.success) {
      results.push(JSON.parse(result.value));
    } else {
      results.push(null); // Handle failure
    }
  }
  
  return {
    user,
    balance: results[0],
    lending: results[1],
    staking: results[2]
  };
}
```

  </TabItem>
  <TabItem value="rust" label="Rust">

```rust
pub fn get_portfolio_data(
    &mut self,
    user: AccountId,
    token_contract: AccountId,
    lending_contract: AccountId,
    staking_contract: AccountId,
) -> Promise {
    // Get balance
    let balance_promise = Promise::new(token_contract)
        .function_call(
            "ft_balance_of".to_owned(),
            json!({"account_id": user}).to_string().into_bytes(),
            0,
            Gas::from_tgas(5),
        );

    // Get lending position
    let lending_promise = Promise::new(lending_contract)
        .function_call(
            "get_position".to_owned(),
            json!({"account_id": user}).to_string().into_bytes(),
            0,
            Gas::from_tgas(10),
        );

    // Get staking rewards
    let staking_promise = Promise::new(staking_contract)
        .function_call(
            "get_rewards".to_owned(),
            json!({"account_id": user}).to_string().into_bytes(),
            0,
            Gas::from_tgas(5),
        );

    // Execute all in parallel
    balance_promise
        .and(lending_promise)
        .and(staking_promise)
        .then(
            Promise::new(env::current_account_id())
                .function_call(
                    "portfolio_callback".to_owned(),
                    json!({"user": user}).to_string().into_bytes(),
                    0,
                    Gas::from_tgas(15),
                )
        )
}
```

  </TabItem>
</Tabs>

## Performance Benefits

```
Sequential: ~300ms (100ms × 3)
Parallel:   ~100ms (limited by slowest)
```

## Error Handling

```typescript
// Graceful degradation
const results = {
  balance: "0",
  rewards: "0"
};

if (balance_result.success) {
  results.balance = balance_result.value;
}
// Use defaults for failures
```

## Testing Parallel Execution

```bash
# Test parallel calls
near contract call-function as-transaction xcc.YOUR_NAME.testnet multiple_contracts json-args '{}' prepaid-gas '300.0 Tgas' attached-deposit '0 NEAR' sign-as YOUR_ACCOUNT.testnet network-config testnet sign-with-keychain send
```

## When to Use

| Use Parallel When: | Use Batch When: |
|-------------------|-----------------|
| Different contracts | Same contract |
| Independent operations | Sequential dependencies |
| Can handle partial failures | Need atomic rollback |
| Performance critical | Consistency critical |

Finally, let's cover [testing and deployment](4-testing-deployment.md)!