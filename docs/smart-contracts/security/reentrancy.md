---
id: reentrancy
title: Reentrancy Attacks
description: "Learn about reentrancy attacks in NEAR smart contracts and how to prevent them with proper security measures and coding practices."
---

Reentrancy attacks are one of the most common and dangerous security vulnerabilities in smart contracts. In NEAR Protocol, the asynchronous nature of cross-contract calls creates a window of opportunity for attackers to exploit state inconsistencies.


Between a cross-contract call and its callback, **any public method of your contract can be executed** by anyone. This fundamental property of NEAR's asynchronous execution model means that:

- **Any method** could be executed between a method execution and its callback
- **The same method** could be executed multiple times before the callback completes
- **State changes** made before the callback can be exploited by malicious actors

**Critical Rule**: Always ensure your contract state remains consistent and secure after each method finishes executing, even if a callback is pending.

---

## Fundamental Assumptions

When designing secure smart contracts, you must assume:

1. **Any method can execute** between your method and its callback
2. **The same method can be re-entered** multiple times before the callback executes
3. **Attackers will exploit** any state inconsistencies they can find
4. **State changes are visible** immediately after a method completes, even before callbacks.

---

## Reentrancy Attack Example: deposit_and_stake

### Vulnerable Implementation (WRONG)

Consider a `deposit_and_stake` function with the following flawed logic:

1. User sends money to the contract
2. Contract **immediately adds money to user's balance** (state change)
3. Contract makes cross-contract call to stake money in validator
4. If staking fails, callback removes the balance.

**Attack Scenario**:
- Attacker calls `deposit_and_stake` with 10 NEAR
- Contract adds 10 NEAR to attacker's balance (step 2 completes)
- Contract initiates cross-contract call to validator (step 3)
- **Before callback executes**, attacker calls `withdraw()` method
- Attacker successfully withdraws 10 NEAR (balance was already updated)
- If staking fails, callback removes balance, but attacker already withdrew
- **Result**: Attacker receives 10 NEAR, contract loses funds.

```rust
// ❌ VULNERABILITY: Reentrancy attack - state updated before external call
pub fn deposit_and_stake(&mut self) {
    let amount = env::attached_deposit();
    let account_id = env::signer_account_id();

    // VULNERABILITY: Updates balance BEFORE external call completes
    let balance = self
        .balances
        .get(&account_id)
        .unwrap_or(&NearToken::ZERO)
        .saturating_add(amount);
    self.balances.insert(account_id.clone(), balance);

    let _ = Promise::new("validator.near".parse().unwrap())
        .function_call(
            "deposit_and_stake".to_string(),
            NO_ARGS,
            amount,
            Gas::from_tgas(10),
        )
        .then(
            Self::ext(env::current_account_id())
                .with_static_gas(XCC_GAS)
                .callback_after_stake(),
        );
}
```

**Why This Happens**: The state change (adding to balance) happens before the external call completes. The attacker exploits the time window between the state update and the callback.

<hr class="subsection" />

### Secure Implementation (CORRECT)

The solution is to delay state changes until the callback confirms success:

1. User sends money to the contract
2. **Do NOT add to balance yet** - store in temporary/pending state
3. Contract makes cross-contract call to stake money in validator
4. **In callback**: Only if staking succeeded, then add money to user's balance
5. If staking failed, return money to user (no balance update needed).

**Key Principle**: Never update critical state (like balances) before external operations complete. Always wait for callback confirmation before committing state changes.

---

## Prevention Strategies

### 1. Delay State Updates
- Never update balances or critical state before cross-contract calls
- Store pending operations in temporary state
- Only commit state changes in callbacks after confirming success.

### 2. Use Checks-Effects-Interactions Pattern
- **Checks**: Validate all inputs and preconditions
- **Effects**: Update state (but only after external calls complete)
- **Interactions**: Make external calls last.

### 3. Implement Reentrancy Guards
- Use flags to prevent re-entry during critical operations
- Mark methods as "in progress" during execution
- Clear flags only after all operations complete.

### 4. Validate in Callbacks
- Always check the result of external calls in callbacks
- Rollback any state changes if external operations failed
- Never assume external calls will succeed.

---

## Best Practices

1. **Assume reentrancy is possible** - design your contract defensively
2. **Minimize state changes** before external calls
3. **Validate everything** in callbacks before committing state
4. **Test with attack scenarios** - simulate reentrancy attempts
5. **Review callback logic** carefully - this is where vulnerabilities hide
6. **Keep state consistent** at all times, even during async operations