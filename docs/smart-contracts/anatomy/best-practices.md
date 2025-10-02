---
id: best-practices
title: Best Practices
description: "A collection of best practices for writing smart contracts on NEAR."
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page provides a collection of best practices for writing smart contracts on NEAR. These practices are designed to help you write secure, efficient, and maintainable code.

# Best practices

<Tabs groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust">

Here we lay out some best practices for writing smart contracts on NEAR, such as:

- [Enable overflow checks](#enable-overflow-checks)
- [Use `require!` early](#use-require-early)
- [Use `log!`](#use-log)
- [Return `Promise`](#return-promise)
- [Reuse crates from `near-sdk`](#reuse-crates-from-near-sdk)
- [The difference between `std::panic!` and `env::panic`](#stdpanic-vs-envpanic)
- [Use workspaces](#use-workspaces)

---

## Enable overflow checks

It's usually helpful to panic on integer overflow. To enable it, add the following into your `Cargo.toml` file:

```toml
[profile.release]
overflow-checks = true
```

## Use `require!` early

Try to validate the input, context, state and access using `require!` before taking any actions. The earlier you panic, the more [gas](/protocol/gas) you will save for the caller.

```rust
#[near]
impl Contract {
    pub fn set_fee(&mut self, new_fee: Fee) {
        require!(env::predecessor_account_id() == self.owner_id, "Owner's method");
        new_fee.assert_valid();
        self.internal_set_fee(new_fee);
    }
}
```

**Note**: If you want debug information in the panic message or if you are using an SDK version before `4.0.0-pre.2`, 
the Rust `assert!` macro can be used instead of `require!`.

```rust
#[near]
impl Contract {
    pub fn set_fee(&mut self, new_fee: Fee) {
        assert_eq!(env::predecessor_account_id(), self.owner_id, "Owner's method");
        new_fee.assert_valid();
        self.internal_set_fee(new_fee);
    }
}
```

## Use `log!`

Use logging for debugging and notifying user.

When you need a formatted message, you can use the following macro:

```rust
log!("Transferred {} tokens from {} to {}", amount, sender_id, receiver_id);
```

It's equivalent to the following message:

```rust
env::log_str(format!("Transferred {} tokens from {} to {}", amount, sender_id, receiver_id).as_ref());
```

## Return `Promise`

If your method makes a cross-contract call, you probably want to return the newly created `Promise`.
This allows the caller (such as a near-cli or near-api-js call) to wait for the result of the promise instead of returning immediately.
Additionally, if the promise fails for some reason, returning it will let the caller know about the failure, as well as enabling NEAR Explorer and other tools to mark the whole transaction chain as failing.
This can prevent false-positives when the first or first few transactions in a chain succeed but a subsequent transaction fails.

E.g.

```rust
#[near]
impl Contract {
    pub fn withdraw_100(&mut self, receiver_id: AccountId) -> Promise {
        Promise::new(receiver_id).transfer(100)
    }
}
```

## Reuse crates from `near-sdk`

`near-sdk` re-exports the following crates:

- `borsh`
- `base64`
- `bs58`
- `serde`
- `serde_json`

Most common crates include `borsh` which is needed for internal STATE serialization and
`serde` for external JSON serialization.

When marking structs with `serde::Serialize` you need to use `#[serde(crate = "near_sdk::serde")]`
to point serde to the correct base crate.

```rust
/// Main contract structure serialized with Borsh
#[near(contract_state)]
#[derive(PanicOnDefault)]
pub struct Contract {
    pub pair: Pair,
}

/// Implements both `serde` and `borsh` serialization.
/// `serde` is typically useful when returning a struct in JSON format for a frontend.
#[near(serializers = [json, borsh])]
pub struct Pair {
    pub a: u32,
    pub b: u32,
}

#[near]
impl Contract {
    #[init]
    pub fn new(pair: Pair) -> Self {
        Self {
            pair,
        }
    }

    pub fn get_pair(self) -> Pair {
        self.pair
    }
}
```

## `std::panic!` vs `env::panic`

- `std::panic!` panics the current thread. It uses `format!` internally, so it can take arguments.
  SDK sets up a panic hook, which converts the generated `PanicInfo` from `panic!` into a string and uses `env::panic` internally to report it to Runtime.
  This may provide extra debugging information such as the line number of the source code where the panic happened.

- `env::panic` directly calls the host method to panic the contract.
  It doesn't provide any other extra debugging information except for the passed message.

## Use workspaces

Workspaces allow you to automate workflows and run tests for multiple contracts and cross-contract calls in a sandbox or testnet environment.
Read more, [workspaces-rs](https://github.com/near/workspaces-rs) or [workspaces-js](https://github.com/near/workspaces-js).

  </TabItem>
  <TabItem value="python" label="🐍 Python">

Here we lay out some best practices for writing smart contracts in Python on NEAR:

- [Validate early](#validate-early)
- [Use proper logging](#use-proper-logging)
- [Return Promises](#return-promises)
- [Handle storage efficiently](#handle-storage-efficiently)
- [Use type hints](#use-type-hints)
- [Follow security patterns](#follow-security-patterns)

---

## Validate early

Validate inputs, context, and state as early as possible in your functions. This saves gas by failing fast before executing expensive operations.

```python
from near_sdk_py import call, Context

class Contract:
    def __init__(self):
        self.owner_id = Context.current_account_id()
        
    @call
    def set_config(self, config_data):
        # Validate permissions early
        if Context.predecessor_account_id() != self.owner_id:
            raise Exception("Only owner can modify config")
            
        # Validate inputs early
        if "parameter" not in config_data or not isinstance(config_data["parameter"], int):
            raise Exception("Invalid config: missing or invalid parameter")
            
        # Only proceed after validation
        self._update_config(config_data)
```

## Use proper logging

Use the `Log` utility for structured logging. This allows external services to parse events from your contract easily.

```python
from near_sdk_py import call, Log

@call
def transfer(self, receiver_id, amount):
    # Business logic here...
    
    # Use informational logs for regular updates
    Log.info(f"Transferred {amount} tokens to {receiver_id}")
    
    # Use structured event logging for indexable events
    Log.event("transfer", {
        "sender": Context.predecessor_account_id(),
        "receiver": receiver_id,
        "amount": amount
    })
```

## Return Promises

When making cross-contract calls, return the Promise object to let the caller track the result. This is especially important for transactions that need to be monitored.

```python
from near_sdk_py import call
from near_sdk_py.promises import Contract

@call
def withdraw(self, amount, receiver_id):
    # Perform validations and business logic...
    
    # Return the promise for better caller experience
    return Contract(receiver_id).call(
        "deposit",
        amount=amount,
        sender=Context.predecessor_account_id()
    )
```

## Handle storage efficiently

Use the SDK collections for efficient storage handling, especially for growing data sets.

```python
from near_sdk_py.collections import UnorderedMap, Vector

class TokenContract:
    def __init__(self):
        # Use SDK collections for efficient storage
        self.tokens = Vector("t")  # Efficiently stores ordered items
        self.balances = UnorderedMap("b")  # Efficiently stores key-value pairs
        
    @call
    def mint(self, token_id):
        # Add to vector without loading all tokens
        self.tokens.append(token_id)
        
        # Update balance without loading all balances
        current = self.balances.get(Context.predecessor_account_id(), 0)
        self.balances[Context.predecessor_account_id()] = current + 1
```

## Use type hints

Python's type hints improve code readability and can help catch errors during development.

```python
from typing import Dict, List, Optional
from near_sdk_py import view, call

class Contract:
    def __init__(self):
        self.data: Dict[str, int] = {}
        
    @view
    def get_value(self, key: str) -> Optional[int]:
        return self.data.get(key)
        
    @call
    def set_values(self, updates: Dict[str, int]) -> List[str]:
        updated_keys = []
        for key, value in updates.items():
            self.data[key] = value
            updated_keys.append(key)
        return updated_keys
```

## Follow security patterns

Apply security best practices to protect your contract from common vulnerabilities.

```python
from near_sdk_py import call, Context
from near_sdk_py.constants import ONE_NEAR

class Contract:
    def __init__(self):
        self.owner = Context.current_account_id()
        self.minimum_deposit = ONE_NEAR // 100  # 0.01 NEAR
        
    @call
    def deposit(self):
        # Check sufficient deposit to prevent spam
        deposit = Context.attached_deposit()
        if deposit < self.minimum_deposit:
            raise Exception(f"Minimum deposit is {self.minimum_deposit}")
            
        # Re-entrancy protection pattern
        current_balance = self.balances.get(Context.predecessor_account_id(), 0)
        # Update state before external calls
        self.balances[Context.predecessor_account_id()] = current_balance + deposit
        
        # Only after state update, perform any external calls
        # ...
```

  </TabItem>
</Tabs>
