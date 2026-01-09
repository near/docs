---
id: checklist
title: ✅ Checklist
description: "Best practices for security and common safeguards."
---

Once you finished developing your smart contract please go through the following list in order to ensure everything is safe for the end user.

:::info
Check our [security articles](./introduction.md) to understand how to improve the security of your contract.
:::

---

## Overview

This comprehensive security checklist should be reviewed before deploying any NEAR smart contract to mainnet. Each item addresses a critical security concern that could lead to vulnerabilities, exploits, or loss of funds.

---

## Anatomy: Method Visibility and Access Control

### 1. All Private Methods Are Decorated as `private`

**Requirement**: Every method that should only be callable by the contract itself must be marked with the `#[private]` decorator in Rust.

**Why it matters**: 
- Prevents unauthorized external calls
- Ensures only your contract can invoke internal methods
- Protects callback methods from being called directly.

**How to verify**:
```rust
// ✅ CORRECT
#[private]
pub fn internal_method(&mut self) {
    // Only contract can call this
}

// ❌ WRONG - Missing #[private]
pub fn internal_method(&mut self) {
    // Anyone can call this!
}
```

---

## Environment: Predecessor and Signer Usage

### 2. `predecessor` and `signer` Are Used Correctly

**Requirement**: Throughout your contract, ensure you're using the correct environment variables:
- `predecessor` - The account that called the method (may be a contract)
- `signer` - The account that signed the transaction (always a human/account)

**Why it matters**:
- Using wrong variable can allow unauthorized access
- Critical for access control and authorization
- Affects who can perform sensitive operations.

**Common mistakes**:
- Using `predecessor` when you need `signer` (for user verification)
- Using `signer` when you need `predecessor` (for callback verification)
- Not checking either when you should.

**How to verify**:
```rust
// ✅ CORRECT - Check signer for user operations
assert_eq!(env::signer_account_id(), user_id, "Unauthorized");

// ✅ CORRECT - Check predecessor for callbacks
assert_eq!(env::predecessor_account_id(), env::current_account_id(), "Only contract");
```

---

## Storage: Cost Management and Data Structures

### 3. State Growth Has Sufficient Balance Coverage

**Requirement**: Every time your contract's state grows (stores new data), ensure there is enough contract balance to cover the storage cost. Storage costs are usually covered by the user who stores the data (e.g., when minting a new NFT.

**Why it matters**:
- Prevents storage drain attacks
- Ensures contract can continue operating
- Avoids transaction failures due to insufficient balance.

**How to verify**:
- Calculate storage cost for each state change
- Check contract balance before storing data
- Require users to attach deposit for their storage
- Monitor contract balance regularly.

<hr class="subsection" />

### 4. All Collections Have Unique IDs

**Requirement**: Every collection (Vector, Map, TreeMap, etc.) must have a unique identifier to prevent collisions and data corruption.

**Why it matters**:
- Prevents data from different collections mixing
- Avoids state corruption
- Ensures data integrity.

**How to verify**:
```rust
// ✅ CORRECT - Unique collection IDs
const USERS: StorageKey = StorageKey::new(b"users");
const ORDERS: StorageKey = StorageKey::new(b"orders");

// ❌ WRONG - Same ID for different collections
const DATA1: StorageKey = StorageKey::new(b"data");
const DATA2: StorageKey = StorageKey::new(b"data"); // Collision!
```

<hr class="subsection" />

### 5. Check for Underflow and Overflow

**Requirement**: Enable overflow checks in Rust to prevent integer underflow and overflow vulnerabilities.

**Why it matters**:
- Prevents arithmetic errors that can be exploited
- Avoids unexpected behavior from integer wrapping
- Critical for financial calculations.

**How to verify**:
Add to `Cargo.toml`:
```toml
[profile.release]
overflow-checks = true
```

**Alternative**: Use checked arithmetic methods:
```rust
// ✅ CORRECT - Checked arithmetic
let result = a.checked_add(b).expect("Overflow");

// ❌ WRONG - Unchecked arithmetic
let result = a + b; // Can overflow silently
```

---

## Actions: Money Transfers and Fund Management

### 6. Leave Enough Balance for Storage Costs

**Requirement**: When sending money from your contract, always leave sufficient balance to cover ongoing storage costs.

**Why it matters**:
- Prevents contract from becoming unusable
- Ensures contract can continue operating
- Avoids storage-related transaction failures.

**How to verify**:
```rust
// ✅ CORRECT - Reserve storage balance
let storage_cost = self.calculate_storage_cost();
let available = env::account_balance() - storage_cost;
assert!(amount <= available, "Insufficient balance after storage reserve");
Promise::new(receiver_id).transfer(amount);

// ❌ WRONG - Send all balance
Promise::new(receiver_id).transfer(env::account_balance()); // Leaves nothing!
```

<hr class="subsection" />

### 7. Deduct User Funds Before Sending

**Requirement**: If you're tracking user funds in your contract state, **always deduct them from the state before sending money back to the user**.

**Why it matters**:
- Prevents reentrancy attacks
- Ensures state consistency
- Follows checks-effects-interactions pattern.

**How to verify**:
```rust
// ✅ CORRECT - Deduct first, then send
let user_balance = self.get_balance(&user_id);
self.set_balance(&user_id, 0); // Deduct first
Promise::new(user_id).transfer(user_balance); // Then send

// ❌ WRONG - Send first, then deduct (vulnerable to reentrancy)
Promise::new(user_id).transfer(user_balance);
self.set_balance(&user_id, 0); // Too late!
```

---

## Callbacks: Cross-Contract Call Security

### 8. All Private Callbacks Are Marked as `private`

**Requirement**: Every callback method that should only be callable by your contract must use the `#[private]` decorator.

**Why it matters**: Prevents external actors from calling your callbacks directly and bypassing security checks.

```rust
// ✅ CORRECT - Callback method can be called only by contract itself
#[private]
pub fn callback_after_stake(&mut self, #[callback_result] result: Result<(), PromiseError>) {
    // Attacker can call this and manipulate state!
    match result {
        Ok(_) => {
            self.balances
                .insert(self.pending_user.clone(), self.pending_amount);
        }
        Err(_) => {
            // Attacker can trigger this to rollback legitimate operations
        }
    }
}

// ❌ WRONG - Callback without #[private] - can be called directly
pub fn callback_after_stake(&mut self, #[callback_result] result: Result<(), PromiseError>) {
    // Attacker can call this and manipulate state!
    match result {
        Ok(_) => {
            self.balances
                .insert(self.pending_user.clone(), self.pending_amount);
        }
        Err(_) => {
            // Attacker can trigger this to rollback legitimate operations
        }
    }
}
```

<hr class="subsection" />


### 9. All Cross-Contract Calls Have Callbacks

**Requirement**: Every cross-contract call must have a corresponding callback to handle the response.

**Why it matters**: 
- Allows error handling
- Enables state rollback on failure
- Ensures proper completion of async operations.

<hr class="subsection" />

### 10. Callbacks Check for Errors and Roll Back State

**Requirement**: All callbacks must check if the external call succeeded or failed, and roll back any state changes if the call failed.

**Why it matters**: 
- Prevents inconsistent state
- Ensures atomicity of operations
- Protects against partial failures.

**How to verify**:
```rust
#[private]
pub fn callback(&mut self, result: Result<(), String>) {
    match result {
        Ok(_) => {
            // External call succeeded, commit state
            self.commit_state();
        }
        Err(_) => {
            // External call failed, rollback state
            self.rollback_state();
        }
    }
}
```

<hr class="subsection" />

### 11. Callbacks Return Money to Predecessor If Necessary

**Requirement**: If user funds were involved in a failed cross-contract call, the callback must return the money to the original user (predecessor).

**Why it matters**: 
- Prevents user fund loss
- Ensures proper refund handling
- Maintains user trust.

<hr class="subsection" />

### 12. Callbacks Are Free of `panic!`

**Requirement**: Callback methods should never use `panic!` or cause panics. Use proper error handling instead.

**Why it matters**: 
- Panics can leave contract in inconsistent state
- Prevents proper error recovery
- May cause user fund loss.

**How to verify**: Search codebase for `panic!` in callback methods and replace with proper error handling.

<hr class="subsection" />

### 13. Callbacks Have Sufficient GAS

**Requirement**: All callbacks must be allocated enough GAS to execute completely, including any refunds or state updates.

**Why it matters**: 
- Prevents partial execution
- Ensures refunds can complete
- Avoids stuck transactions.

**How to verify**: Calculate GAS needs for callback operations and ensure sufficient allocation.

<hr class="subsection" />

### 14. Contract Not Left in Exploitable State Between Call and Callback

**Requirement**: Between a cross-contract call and its callback, the contract must not be in a state that can be exploited by other transactions.

**Why it matters**: 
- Prevents reentrancy attacks
- Ensures state consistency
- Protects against race conditions.

**How to verify**: Review state changes - ensure critical updates happen in callbacks, not before external calls.

---

## Additional Security Considerations

Beyond this checklist, also consider:

- **Input validation** - Validate all user inputs
- **Access control** - Verify caller permissions
- **Economic security** - Ensure economic incentives are correct
- **Testing** - Comprehensive test coverage
- **Code review** - External security review
- **Monitoring** - Post-deployment monitoring