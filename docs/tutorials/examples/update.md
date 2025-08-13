---
id: migrate-state
title: How to Migrate State on Your Contract
description: "Learn how to migrate state when updating smart contracts on NEAR Protocol, including implementation, trade-offs, alternatives, and testing."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

## Understanding State Migration
When updating a smart contract on NEAR, changes to the state structure (e.g., adding/removing fields) can break compatibility with existing data. State migration allows you to transform old state to fit the new contract version during the upgrade process.

This is done via a `migrate` method, called after deploying the new contract code. It deserializes the old state, transforms it, and serializes the new state.

### Key Concept: The Migration Method
Implement a migration method as an initialization function that ignores the existing state and rewrites it. For example, starting from a basic Guest Book contract (old state: messages without payment), migrate to a version that adds a `payment` field.

The example uses two contracts:
- Base: Simple Guest Book.
- Update: Adds `payment` to messages and restructures internally.

<CodeTabs>
  <Language value="rust" language="rust">
    <Github fname="migrate.rs"
            url="https://github.com/near-examples/update-migrate-rust/blob/main/basic-updates/update/src/migrate.rs"
            start="18" end="45" />
  </Language>
</CodeTabs>

:::tip
The `migrate` method uses `#[init(ignore_state)]` to overwrite the state safely.
:::

In this code, it iterates through old messages, adds a default `payment` (e.g., 0), and saves the updated structure.

## Trade-Offs
- **Gas Consumption**: Migration runs in a single transaction, so large states may exceed gas limits. Break it into batches if needed.
- **Downtime**: The contract is paused during migration; users can't interact until complete.
- **Complexity**: Manual transformation risks errors, like data loss if fields are mismatched.

## Alternatives
- **State Versioning with Enums**: Wrap state in an enum (e.g., `VersionedState`). Add new variants for updates without migrating old data. All versions coexist, simplifying future changes.

  Example: Evolve `PostedMessage` from V1 to V2.

  <CodeTabs>
    <Language value="rust" language="rust">
      <Github fname="versioned_msg.rs"
              url="https://github.com/near-examples/update-migrate-rust/blob/main/enum-updates/update/src/versioned_msg.rs"
              start="18" end="36" />
    </Language>
  </CodeTabs>

- **Self-Updating Contracts**: Implement an `update_contract` method to deploy new code and trigger migration internally.

  <CodeTabs>
    <Language value="rust" language="rust">
      <Github fname="update.rs"
              url="https://github.com/near-examples/update-migrate-rust/blob/main/self-updates/base/src/update.rs"
              start="10" end="31" />
    </Language>
  </CodeTabs>

  This avoids external deployment but requires careful access control (e.g., only owner can update).

Choose versioning for frequent small changes; migration for major overhauls.

## How to Test State Migration
1. Deploy the base contract and add sample data (e.g., post messages).
2. Deploy the updated contract code over the same account.
3. Call the `migrate` method (attach enough gas for large states).
4. Query the state to verify: Old data should be transformed (e.g., new fields added), and no data lost.
5. Test edge cases: Empty state, maximum state size, and invalid old data.

Use NEAR's testnet for gas estimation. Tools like `near-cli` can simulate calls without deploying.

For full code examples:
- [State Migration](https://github.com/near-examples/update-migrate-rust/tree/main/basic-updates)
- [State Versioning](https://github.com/near-examples/update-migrate-rust/tree/main/enum-updates)
- [Self Update](https://github.com/near-examples/update-migrate-rust/tree/main/self-updates)
