---
id: batch-actions
title: Implementing Batch Actions with Atomic Rollback
sidebar_label: Batch Actions
description: "Learn to batch multiple function calls to the same contract with atomic rollback - if one fails, they all get reverted."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import {Github} from "@site/src/components/codetabs";

Batch actions execute multiple function calls to the same contract sequentially with **atomic rollback** - if any action fails, all actions are reverted.

## Understanding Batch Actions

Key characteristics:
1. **Sequential execution** - Actions run one after another
2. **Atomic rollback** - All succeed or all fail  
3. **Single gas payment** - Shared gas allocation
4. **Last result access** - Callback receives final action's result

## Implementation

<Tabs>
  <TabItem value="js" label="JavaScript" default>

<Github fname="batch_actions.ts"
      url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/internal/batch_actions.ts"
      start="5" end="17" />

  </TabItem>
  <TabItem value="rust" label="Rust">

<Github fname="batch_actions.rs"
        url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-rs/src/batch_actions.rs"
        start="8" end="20" />

  </TabItem>
</Tabs>

## Handling Batch Responses

The callback receives only the **last action's result**:

<Tabs>
  <TabItem value="js" label="JavaScript" default>

<Github fname="batch_actions.ts"
      url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/internal/batch_actions.ts"
      start="19" end="29" />

  </TabItem>
  <TabItem value="rust" label="Rust">

<Github fname="batch_actions.rs"
        url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-rs/src/batch_actions.rs"
        start="22" end="35" />

  </TabItem>
</Tabs>

## Real-World Example: DeFi Operations

<Tabs>
  <TabItem value="js" label="JavaScript" default>

```typescript
@call({})
batch_defi_operations({
  token_contract,
  amount,
  recipient
}: {
  token_contract: AccountId;
  amount: string;
  recipient: AccountId;
}) {
  return NearPromise.new(token_contract)
    // 1. Approve spending
    .functionCall(
      "ft_approve", 
      JSON.stringify({
        spender_id: env.current_account_id(), 
        amount
      }),
      1n,
      10_000_000_000_000n
    )
    // 2. Transfer tokens
    .functionCall(
      "ft_transfer",
      JSON.stringify({
        receiver_id: recipient, 
        amount
      }), 
      1n,
      15_000_000_000_000n
    )
    // 3. Get balance
    .functionCall(
      "ft_balance_of",
      JSON.stringify({
        account_id: recipient
      }),
      0n,
      5_000_000_000_000n
    )
    .then(
      NearPromise.new(env.current_account_id())
        .functionCall(
          "defi_callback",
          JSON.stringify({amount}),
          0n,
          10_000_000_000_000n
        )
    );
}
```

  </TabItem>
  <TabItem value="rust" label="Rust">

```rust
pub fn batch_defi_operations(
    &mut self,
    token_contract: AccountId,
    amount: U128,
    recipient: AccountId,
) -> Promise {
    Promise::new(token_contract.clone())
        // 1. Approve spending
        .function_call(
            "ft_approve".to_owned(),
            json!({
                "spender_id": env::current_account_id(), 
                "amount": amount
            }).to_string().into_bytes(),
            1,
            Gas::from_tgas(10),
        )
        // 2. Transfer tokens  
        .function_call(
            "ft_transfer".to_owned(),
            json!({
                "receiver_id": recipient, 
                "amount": amount
            }).to_string().into_bytes(),
            1,
            Gas::from_tgas(15),
        )
        // 3. Get balance
        .function_call(
            "ft_balance_of".to_owned(),
            json!({
                "account_id": recipient
            }).to_string().into_bytes(),
            0,
            Gas::from_tgas(5),
        )
        .then(
            Promise::new(env::current_account_id())
                .function_call(
                    "defi_callback".to_owned(),
                    json!({"amount": amount}).to_string().into_bytes(),
                    0,
                    Gas::from_tgas(10),
                )
        )
}
```

  </TabItem>
</Tabs>

## Testing Batch Actions

```bash
# Test batch execution
near contract call-function as-transaction xcc.YOUR_NAME.testnet batch_actions json-args '{}' prepaid-gas '300.0 Tgas' attached-deposit '0 NEAR' sign-as YOUR_ACCOUNT.testnet network-config testnet sign-with-keychain send
```

## Best Practices

### ✅ Gas Planning
```typescript
// Allocate appropriate gas per action
.functionCall("simple", args, 0n, 5_000_000_000_000n)   // 5 TGas
.functionCall("complex", args, 0n, 15_000_000_000_000n) // 15 TGas  
```

### ✅ Error Handling
```typescript
if (result.success) {
  return `Success: ${result.value}`;
} else {
  // All actions rolled back
  return "Batch failed - all reverted";
}
```

### ❌ Common Mistakes
- Insufficient gas allocation
- Wrong action order for dependencies
- Not handling callback failures

## When to Use Batch Actions

Perfect for:
- **Atomic operations** across multiple calls
- **Sequential execution** with dependencies  
- **Single contract** multiple operations
- **All-or-nothing** execution requirements

Next, let's explore [parallel execution](3-parallel-execution.md) for calling multiple contracts simultaneously!