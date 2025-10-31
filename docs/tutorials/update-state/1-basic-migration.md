---
id: basic-migration
title: Basic State Migration
sidebar_label: Basic Migration
---

import {Github} from "@site/src/components/codetabs"

The most straightforward migration approach uses a dedicated `migrate` method that transforms old state into new state format.

## The Problem

Our base contract stores messages and payments separately:

<Github fname="lib.rs"
    url="https://github.com/near-examples/update-migrate-rust/blob/main/basic-updates/base/src/lib.rs"
    start="18" end="23" />

We want to update it to store payment information directly in each message:

<Github fname="lib.rs"
    url="https://github.com/near-examples/update-migrate-rust/blob/main/basic-updates/update/src/lib.rs"
    start="13" end="19" />

If we deploy this directly, the contract can't deserialize the old state because it expects `PostedMessage` with 4 fields but finds only 3.

## The Solution: Migrate Method

Create a migration method that reads the old state and writes the new state:

<Github fname="migrate.rs"
    url="https://github.com/near-examples/update-migrate-rust/blob/main/basic-updates/update/src/migrate.rs"
    start="18" end="45" />

### How It Works

**1. Define Old State Structure**

<Github fname="migrate.rs"
    url="https://github.com/near-examples/update-migrate-rust/blob/main/basic-updates/update/src/migrate.rs"
    start="3" end="13" />

Mirror the previous contract's state structure so we can deserialize it.

**2. Read Old State**

```rust
let mut old_state: OldState = env::state_read().expect("failed");
```

Deserialize the current state from storage using the old structure.

**3. Transform Data**

```rust
let mut new_messages: Vector<PostedMessage> = Vector::new(MESSAGES_PREFIX);

for (idx, posted) in old_state.messages.iter().enumerate() {
    let payment = old_state.payments.get(idx as u64)
        .expect("failed to get payment")
        .clone();

    new_messages.push(&PostedMessage {
        payment,
        premium: posted.premium,
        sender: posted.sender.clone(),
        text: posted.text.clone(),
    })
}
```

Iterate through old messages, combining them with their corresponding payments.

**4. Clean Up Old Data**

```rust
old_state.payments.clear();
```

Remove the old payments vector from storage to avoid wasting storage space.

**5. Return New State**

```rust
Self { messages: new_messages }
```

Return the transformed state which gets written to storage.

## Key Annotations

The `migrate` method uses special annotations:

```rust
#[private]
#[init(ignore_state)]
pub fn migrate() -> Self
```

- `#[private]`: Only the contract account can call this method
- `#[init(ignore_state)]`: Allows rewriting state (normally initialization fails if state exists)

## Deploying with Migration

Build the updated contract:

```bash
cd basic-updates/update
cargo near build
```

Deploy and migrate in one transaction:

```bash
cargo near deploy <contract-account> \
  with-init-call migrate json-args {} \
  prepaid-gas '100.0 Tgas' \
  attached-deposit '0 NEAR' \
  network-config testnet \
  sign-with-keychain send
```

This:
1. Deploys the new contract code
2. Immediately calls `migrate` to transform the state
3. Ensures the contract is usable after deployment

## Verifying Migration

Check that messages now include payment information:

```bash
near contract call-function as-read-only \
  <contract-account> get_messages \
  json-args {} \
  network-config testnet now
```

Expected result:
```json
[
  {
    "payment": "90000000000000000000000",
    "premium": false,
    "sender": "user.testnet",
    "text": "hello"
  }
]
```

The old `get_payments` method no longer exists:

```bash
near contract call-function as-read-only \
  <contract-account> get_payments \
  json-args {} \
  network-config testnet now
# Error: MethodNotFound
```

## Important Considerations

**Gas Requirements**: Large state migrations may require more gas. Test with your data volume.

**Atomicity**: If migration fails, the entire transaction reverts. The old contract remains deployed.

**Testing**: Always test migrations on testnet with realistic data before mainnet deployment.

**Backup**: Consider exporting state before migration for additional safety.

Next, we'll explore versioned state that makes future migrations easier.