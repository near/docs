---
id: callbacks
title: Cross-Contract Calls
description: "Learn about callback security in NEAR smart contracts, including proper error handling, state management, and preventing callback-related vulnerabilities."
---

## Overview

NEAR Protocol smart contracts can call each other through cross-contract calls. This powerful feature enables building complex decentralized applications by composing smaller contracts together. However, cross-contract calls introduce critical security considerations that developers must understand and implement correctly.

---

## Fundamental Principle: Asynchronous and Independent Calls

All cross-contract calls in NEAR are **independent** and **asynchronous**. This means:

- The method that initiates the cross-contract call and the callback method that handles the response are **completely independent** execution contexts
- Between the initial call and the callback execution, **anyone can interact with your contract** - other users can call any public method
- The contract state can change between the call and callback, creating potential race conditions.

**Security Implications:**

1. **Callback Access Control**: Callback methods must be public to receive responses, but should only be callable by your contract itself
2. **State Management**: Never leave the contract in an exploitable or inconsistent state between the call and callback
3. **Error Handling**: Manually rollback any state changes in the callback if the external cross-contract call failed.

---

## Private Callbacks: Securing Callback Methods

**Problem**: When a cross-contract call completes, your contract needs to receive the callback. This requires the callback method to be public, but you typically want it to be private to prevent unauthorized access.

**Solution**: Verify that the `predecessor` (the account that called the method) equals `current_account` (your contract's account). This ensures only your contract can invoke the callback.

**Implementation in Rust**: Use the `#[private]` decorator macro, which automatically adds the predecessor check:

```rust
#[private]
pub fn callback_method(&mut self) {
    // Only your contract can call this
}
```

---

## Handling User Funds in Callbacks

**Critical Rule**: When a method panics or fails, any attached NEAR tokens automatically return to the `predecessor` (the account that initiated the transaction).

**Scenario**: 
1. User calls your contract and attaches 10 NEAR
2. Your contract makes a cross-contract call to another contract
3. The external call fails or panics
4. The 10 NEAR returns to **your contract** (not the original user).

**Security Requirement**: If the money originally came from a user calling your contract, you **must manually transfer it back** to the user in the callback handler.

**Example Flow**:
- User sends 10 NEAR → Your contract receives it
- Your contract calls external contract (fails)
- 10 NEAR returns to your contract automatically
- **You must transfer 10 NEAR back to user in callback**.

**Critical Warning**: Always ensure your callback has enough GAS allocated to perform the refund transfer. If the callback runs out of gas before completing the refund, the user's funds may be stuck.

---

## Async Callbacks and Reentrancy Attacks

**Critical Vulnerability**: Between a cross-contract call and its callback, **any public method of your contract can be executed** by anyone. This creates a window for reentrancy attacks, which are one of the most common and dangerous security vulnerabilities in smart contracts.

<hr class="subsection" />

### Reentrancy Attack Example: deposit_and_stake

**Vulnerable Implementation (WRONG)**:
1. User sends money to your contract
2. Contract immediately adds money to user's balance
3. Contract attempts to stake money in validator
4. If staking fails, callback removes balance.

**Attack Vector**: 
- Attacker calls `deposit_and_stake` with 10 NEAR
- Contract adds 10 NEAR to attacker's balance (step 2)
- Contract makes cross-contract call to validator (step 3)
- **Before callback executes**, attacker calls `withdraw` method
- Attacker withdraws 10 NEAR
- If staking fails, callback removes balance, but attacker already withdrew
- **Result**: Attacker receives money twice, contract loses funds.

**Secure Implementation (CORRECT)**:
1. User sends money to your contract
2. **Do NOT add to balance yet** - store in temporary state
3. Contract attempts to stake money in validator
4. In callback: **only if staking succeeded**, then add money to user's balance
5. If staking failed, return money to user.

**Key Principle**: Delay state changes until the callback confirms the external operation succeeded. Never update balances or critical state before the cross-contract call completes.

---

## Best Practices Summary

1. **Use `#[private]` decorator** for all callback methods in Rust
2. **Refund user funds** in callbacks if external calls fail
3. **Allocate sufficient GAS** for callback operations, especially refunds
4. **Delay state updates** until callback confirms success
5. **Never update balances** before cross-contract call completion
6. **Validate all inputs** in callback methods
7. **Check external call results** before committing state changes.
