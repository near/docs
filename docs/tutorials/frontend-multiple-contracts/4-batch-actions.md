---
id: batch-actions
title: Batching Actions Within a Contract
sidebar_label: Batch Actions
---

While transactions to different contracts are independent, you can batch multiple actions targeting the **same contract** into a single transaction. If any action in the batch fails, they **all get reverted**.

## Why Batch Actions?

Batching ensures atomicity - either all actions succeed or none do. Common use cases include:

- Registering a user and transferring tokens in one transaction
- Approving and transferring NFTs atomically
- Multiple sequential contract calls that must all succeed

## Action Types

NEAR supports several action types:
- `FunctionCall` - Call a contract method
- `Transfer` - Send NEAR tokens
- `CreateAccount` - Create a new account
- `AddKey` - Add an access key
- `DeleteKey` - Remove an access key
- `DeleteAccount` - Delete an account

## Batching Actions Example

Here's a practical example of registering a user for FT storage and transferring tokens:

```javascript
const REGISTER_DEPOSIT = "1250000000000000000000"; // 0.00125 NEAR
const THIRTY_TGAS = "30000000000000";

const ftTx = {
  receiverId: "token.near",
  actions: [
    // First action: Register storage for receiver
    {
      type: 'FunctionCall',
      params: {
        methodName: 'storage_deposit',
        args: { account_id: "alice.near" },
        gas: THIRTY_TGAS,
        deposit: REGISTER_DEPOSIT
      }
    },
    // Second action: Transfer tokens
    {
      type: 'FunctionCall',
      params: {
        methodName: 'ft_transfer',
        args: { 
          receiver_id: "alice.near", 
          amount: "1000000000000000000" // 1 token
        },
        gas: THIRTY_TGAS,
        deposit: "1" // 1 yoctoNEAR required by standard
      }
    }
  ]
};

await wallet.signAndSendTransactions({ transactions: [ftTx] });
```

## Execution Flow

Actions execute **sequentially** within the transaction:

1. `storage_deposit` registers alice.near for FT storage
2. If successful, `ft_transfer` transfers tokens to alice.near
3. If either fails, **both revert**

## Example: Guest Book Actions

The Guest Book transaction in our example already uses action batching:

```javascript
const guestTx = {
  receiverId: GUEST_ADDRESS,
  actions: [
    {
      type: 'FunctionCall',
      params: {
        methodName: 'add_message',
        args: { text: greeting.value },
        gas: THIRTY_TGAS,
        deposit: GUEST_DEPOSIT
      }
    }
    // You could add more actions here targeting the same contract
  ]
};
```

While this example has only one action, you could add more:

```javascript
const guestTx = {
  receiverId: GUEST_ADDRESS,
  actions: [
    {
      type: 'FunctionCall',
      params: {
        methodName: 'add_message',
        args: { text: "First message" },
        gas: THIRTY_TGAS,
        deposit: NO_DEPOSIT
      }
    },
    {
      type: 'FunctionCall',
      params: {
        methodName: 'add_message',
        args: { text: "Second message" },
        gas: THIRTY_TGAS,
        deposit: NO_DEPOSIT
      }
    }
  ]
};
```

Both messages get added, or neither does.

## Key Differences

**Multiple Transactions (Independent):**
```javascript
const tx1 = { receiverId: "contract1.near", actions: [...] };
const tx2 = { receiverId: "contract2.near", actions: [...] };
await wallet.signAndSendTransactions({ transactions: [tx1, tx2] });
// If tx1 fails, tx2 can still succeed
```

**Batched Actions (Atomic):**
```javascript
const tx = {
  receiverId: "contract.near",
  actions: [action1, action2, action3]
};
await wallet.signAndSendTransactions({ transactions: [tx] });
// If any action fails, ALL revert
```

## Error Handling

When a batch fails, you'll receive an error indicating which action failed:

```javascript
try {
  await wallet.signAndSendTransactions({ transactions: [ftTx] });
} catch (error) {
  console.error("Batch failed:", error);
  // All actions in the batch have been reverted
}
```

## Best Practices

1. **Use batching for atomic operations**: When actions must succeed together
2. **Keep batches small**: Large batches may exceed gas limits
3. **Order matters**: Actions execute sequentially, so order dependencies correctly
4. **Test failure scenarios**: Ensure rollback behavior is correct

## Combining Both Approaches

You can combine multiple transactions AND batch actions:

```javascript
const tx1 = {
  receiverId: "contract1.near",
  actions: [action1, action2] // Batched, atomic
};

const tx2 = {
  receiverId: "contract2.near", 
  actions: [action3, action4] // Batched, atomic
};

// Independent transactions, each with batched actions
await wallet.signAndSendTransactions({ transactions: [tx1, tx2] });
```

This provides maximum flexibility - atomic operations within each contract, with independent execution across contracts.

## Summary

You've learned how to:
- Set up wallet integration for multiple contracts
- Query data from multiple contracts simultaneously
- Send independent transactions to multiple contracts
- Batch actions within a single contract for atomic operations

This pattern is essential for building complex Web3 applications that interact with multiple protocols and contracts in the NEAR ecosystem.