---
id: storage
title: Storage Cost Attacks
description: "Learn about storage security best practices in NEAR smart contracts, including storage costs, state management, and preventing storage-related vulnerabilities."
---

In NEAR Protocol, smart contracts pay for the storage they use. This storage cost model creates a potential attack vector where malicious actors can drain contract funds by forcing the contract to pay for excessive storage costs.

---

## How Storage Costs Work in NEAR

NEAR uses a [storage staking model](../../protocol/storage/storage-staking.md) where:

- **Contracts pay for storage** - The more data stored, the more NEAR balance required
- **Storage is locked** - Balance is locked to cover storage costs, not spent
- **Storage can be released** - Deleting data releases the locked balance back to the contract

**Critical Rule**: If your contract doesn't require users to cover their own storage costs, attackers can drain your contract's balance by creating many small storage entries.

---

## Attack Scenario: Guest Book Example

### Setup

1. You deploy a guest book smart contract to `example.near`
2. Users can add messages to the guest book
3. Users pay only a small gas fee to store their message
4. **Your contract pays the storage cost** for each message.

<hr class="subsection" />

### The Attack

**Problem**: If storing a message costs the user very little (just gas) but costs your contract significantly more (storage rent), this creates an economic imbalance that attackers can exploit.

**Attack Vector**:
- Attacker creates a script that sends thousands of small messages
- Each message costs the attacker minimal gas fees
- Each message forces your contract to lock NEAR for storage
- After many messages, your contract's balance is locked
- Contract can no longer function due to insufficient balance.

**Result**: Your contract becomes unusable, and you may need to fund it continuously or delete data to free balance.

<hr class="subsection" />

### Example Flow

1. Contract `example.near` starts with 10 NEAR balance
2. Each message requires 0.001 NEAR locked for storage
3. Attacker sends 10,000 messages
4. Contract must lock 10 NEAR (10,000 × 0.001)
5. Contract balance is fully locked
6. Contract cannot accept new messages or perform other operations.

---

## Solution: Require Users to Cover Storage

### Implementation

Require users to attach sufficient NEAR to cover the storage cost of their data:

```rust
pub fn add_message(&mut self, message: String) {
    let storage_cost = self.calculate_storage_cost(&message);
    assert!(env::attached_deposit() >= storage_cost, "Insufficient deposit for storage");
    
    // Store the message
    // Storage cost is covered by attached deposit
}
```

**Key Points**:
- Calculate the storage cost for the data being stored
- Require users to attach at least that amount as deposit
- The attached deposit covers the storage cost automatically
- Users who want to store data must pay for it.

<hr class="subsection" />

### Benefits

1. **Prevents storage drain attacks** - Attackers must pay for their own storage
2. **Economic sustainability** - Contract doesn't need continuous funding
3. **Fair cost distribution** - Users pay for what they use
4. **Prevents abuse** - Makes spam attacks expensive.

---

## Releasing Locked Storage Balance

**Important**: Storage balance is **locked**, not spent. You can release it by deleting data:

- When you delete stored data, the locked balance is returned to the contract
- This allows you to free up balance if needed
- Useful for maintenance or if you need to recover locked funds.

**Example**:
- Contract has 50 NEAR locked for storage
- You delete old/unused data
- 50 NEAR is unlocked and available in contract balance.

---

## Best Practices

1. **Always require users to cover storage costs** for data they store
2. **Calculate storage costs accurately** - ensure attached deposit covers the cost
3. **Document storage requirements** - tell users how much to attach
4. **Monitor contract balance** - ensure sufficient funds for operations
5. **Implement data expiration** - allow deletion of old data to free balance
6. **Test with attack scenarios** - simulate many small storage operations.

---

## Common Attack Patterns

### 1. Small Deposit Attack
- Attacker sends many tiny deposits
- Each requires storage (user records, transaction history)
- Contract balance drains from storage costs.

### 2. Data Spam Attack
- Attacker stores excessive amounts of data
- Contract must lock balance for all storage
- Contract becomes unusable.

### 3. Collection Growth Attack
- Attacker adds many items to collections (maps, vectors)
- Each item requires storage
- Contract balance depletes.

---

## Prevention Checklist

- [ ] Users must attach deposit to cover their storage costs
- [ ] Storage cost calculation is accurate
- [ ] Contract monitors and maintains sufficient balance
- [ ] Old data can be deleted to free balance
- [ ] Storage requirements are documented for users
- [ ] Attack scenarios have been tested.
