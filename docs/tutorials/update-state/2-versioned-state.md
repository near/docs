---
id: versioned-state
title: State Versioning with Enums
sidebar_label: Versioned State
---

import {Github} from "@site/src/components/codetabs"

State versioning uses Rust enums to allow multiple versions of your data structures to coexist, making future updates much simpler.

## The Versioning Approach

Instead of storing messages directly, wrap them in a versioned enum:

<Github fname="versioned_msg.rs"
    url="https://github.com/near-examples/update-migrate-rust/blob/main/enum-updates/base/src/versioned_msg.rs"
    start="3" end="12" />

This lets you add new versions without breaking existing data.

## Base Contract with Versioning

Store versioned messages:

<Github fname="lib.rs"
    url="https://github.com/near-examples/update-migrate-rust/blob/main/enum-updates/base/src/lib.rs"
    start="13" end="16" />

When adding messages, wrap them in the version enum:

<Github fname="lib.rs"
    url="https://github.com/near-examples/update-migrate-rust/blob/main/enum-updates/base/src/lib.rs"
    start="24" end="35" />

## Retrieving Messages

Convert versioned messages to a specific version when reading:

<Github fname="lib.rs"
    url="https://github.com/near-examples/update-migrate-rust/blob/main/enum-updates/base/src/lib.rs"
    start="37" end="48" />

The `From` implementation handles the conversion:

<Github fname="versioned_msg.rs"
    url="https://github.com/near-examples/update-migrate-rust/blob/main/enum-updates/base/src/versioned_msg.rs"
    start="14" end="20" />

## Adding a New Version

When you need to update the message structure, add a new enum variant:

<Github fname="versioned_msg.rs"
    url="https://github.com/near-examples/update-migrate-rust/blob/main/enum-updates/update/src/versioned_msg.rs"
    start="9" end="18" />

Update the enum to include both versions:

<Github fname="versioned_msg.rs"
    url="https://github.com/near-examples/update-migrate-rust/blob/main/enum-updates/update/src/versioned_msg.rs"
    start="20" end="24" />

## Automatic Migration

The key benefit: implement `From` to automatically convert old versions:

<Github fname="versioned_msg.rs"
    url="https://github.com/near-examples/update-migrate-rust/blob/main/enum-updates/update/src/versioned_msg.rs"
    start="26" end="38" />

When reading messages, V1 messages automatically convert to V2 with default values for new fields.

## Updated Contract

The updated contract uses V2 for new messages:

<Github fname="lib.rs"
    url="https://github.com/near-examples/update-migrate-rust/blob/main/enum-updates/update/src/lib.rs"
    start="24" end="36" />

Reading still works seamlessly:

<Github fname="lib.rs"
    url="https://github.com/near-examples/update-migrate-rust/blob/main/enum-updates/update/src/lib.rs"
    start="38" end="49" />

## No Migration Method Needed

Deploy the updated contract directly:

```bash
cd enum-updates/update
cargo near build

cargo near deploy <contract-account> \
  without-init-call \
  network-config testnet \
  sign-with-keychain send
```

No migration method needed! Old V1 messages coexist with new V2 messages.

## Testing the Update

Add a new message:

```bash
near contract call-function as-transaction \
  <contract-account> add_message \
  json-args '{"text": "new message"}' \
  prepaid-gas '100.0 Tgas' \
  attached-deposit '0.1 NEAR' \
  sign-as <your-account> \
  network-config testnet \
  sign-with-keychain send
```

Retrieve all messages:

```bash
near contract call-function as-read-only \
  <contract-account> get_messages \
  json-args {} \
  network-config testnet now
```

Result shows both old and new messages in V2 format:

```json
[
  {
    "payment": "0",
    "premium": false,
    "sender": "user1.testnet",
    "text": "old message"
  },
  {
    "payment": "100000000000000000000000",
    "premium": true,
    "sender": "user2.testnet",
    "text": "new message"
  }
]
```

Old V1 messages get `payment: "0"` automatically.

## Advantages of Versioning

**No downtime**: Deploy updates without migration methods

**Gradual migration**: Old data converts on-read, not all at once

**Gas efficiency**: No large migration transaction needed

**Flexibility**: Easy to add multiple versions over time

**Safety**: Old data remains unchanged in storage

## When to Use Versioning

Versioning works best when:
- You anticipate future schema changes
- You want zero-downtime updates
- Reading old data with default values is acceptable
- Storage efficiency isn't critical (versions add overhead)

## Versioning Multiple Structures

You can version multiple structures:

```rust
pub enum VersionedUser {
    V1(UserV1),
    V2(UserV2),
}

pub enum VersionedPost {
    V1(PostV1),
    V2(PostV2),
}

pub struct Contract {
    users: Vector<VersionedUser>,
    posts: Vector<VersionedPost>,
}
```

Each structure versions independently.

## Handling Many Versions

As versions accumulate, consider consolidating:

```rust
// After several versions, manually migrate V1-V3 to V4
pub fn consolidate_old_versions(&mut self) {
    let mut new_messages = Vector::new(b"m");
    
    for msg in self.messages.iter() {
        let v4_msg = match msg {
            VersionedMessage::V1(m) => convert_v1_to_v4(m),
            VersionedMessage::V2(m) => convert_v2_to_v4(m),
            VersionedMessage::V3(m) => convert_v3_to_v4(m),
            VersionedMessage::V4(m) => m,
        };
        new_messages.push(v4_msg);
    }
    
    self.messages = new_messages;
}
```

Next, we'll explore self-updating contracts that can deploy and migrate themselves.