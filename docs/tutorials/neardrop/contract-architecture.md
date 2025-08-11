---
id: contract-architecture
title: Contract Architecture
sidebar_label: Contract Architecture
description: "Understand the NEAR Drop smart contract structure, including the core data types, storage patterns, and how different drop types are organized and managed."
---

import {Github} from "@site/src/components/codetabs"

Before diving into implementation, let's understand the architecture of the NEAR Drop smart contract. This foundation will help you understand how the different components work together to create a seamless token distribution system.

---

## Core Contract Structure

The NEAR Drop contract is organized around several key concepts that work together to manage token distributions efficiently.

### Main Contract State

The contract's state is designed to handle multiple types of drops while maintaining efficient storage and lookup patterns:

<Github language="rust" start="22" end="29" url="https://github.com/near-examples/near-drop/blob/main/src/lib.rs" />

Let's break down each field:

- **`top_level_account`**: The account used to create new NEAR accounts (typically `testnet` or `mainnet`)
- **`next_drop_id`**: A simple counter that assigns unique identifiers to each drop
- **`drop_id_by_key`**: Maps public keys to their corresponding drop IDs for efficient lookups
- **`drop_by_id`**: Stores the actual drop data indexed by drop ID

:::info Storage Efficiency
This dual-mapping approach allows for efficient lookups both by public key (when claiming) and by drop ID (when managing drops), while keeping storage costs reasonable.
:::

---

## Drop Types

The contract supports three different types of token drops, each represented as an enum variant:

<Github language="rust" start="8" end="16" url="https://github.com/near-examples/near-drop/blob/main/src/drop_types.rs" />

### NEAR Token Drops

The simplest drop type distributes native NEAR tokens:

<Github language="rust" start="9" end="16" url="https://github.com/near-examples/near-drop/blob/main/src/near_drop.rs" />

Key characteristics:
- **`amount`**: Amount of NEAR tokens to distribute per claim
- **Simple Transfer**: Uses native NEAR transfer functionality
- **No External Dependencies**: Works without additional contracts

### Fungible Token Drops

For distributing NEP-141 compatible fungible tokens:

<Github language="rust" start="16" end="24" url="https://github.com/near-examples/near-drop/blob/main/src/ft_drop.rs" />

Key characteristics:
- **`ft_contract`**: The contract address of the fungible token
- **`amount`**: Number of tokens to distribute per claim
- **Cross-Contract Calls**: Requires interaction with FT contract
- **Storage Registration**: Recipients must be registered on the FT contract

### Non-Fungible Token Drops

For distributing unique NFTs:

<Github language="rust" start="15" end="22" url="https://github.com/near-examples/near-drop/blob/main/src/nft_drop.rs" />

Key characteristics:
- **`nft_contract`**: The contract address of the NFT collection
- **`token_id`**: Specific NFT token being distributed
- **Unique Distribution**: Each NFT can only be claimed once
- **Metadata Preservation**: Maintains all NFT properties and metadata

---

## Access Key System

One of NEAR Drop's most powerful features is its use of function-call access keys to enable gasless claiming.

### How It Works

1. **Key Generation**: When creating a drop, the contract generates or accepts public keys
2. **Access Key Addition**: The contract adds these keys as function-call keys to itself
3. **Limited Permissions**: Keys can only call specific claiming functions
4. **Gasless Operations**: Recipients don't need NEAR tokens to claim

### Key Permissions

The function-call access keys are configured with specific permissions:

```rust
// Example of adding a function-call access key
Promise::new(env::current_account_id())
    .add_access_key(
        public_key.clone(),
        FUNCTION_CALL_ALLOWANCE,
        env::current_account_id(),
        "claim_for,create_account_and_claim".to_string(),
    )
```

This setup allows keys to:
- Call `claim_for` to claim drops to existing accounts
- Call `create_account_and_claim` to create new accounts and claim drops
- Nothing else - providing security through limited permissions

---

## Storage Cost Management

The contract carefully manages storage costs, which are paid by the drop creator:

### Cost Components

1. **Drop Data Storage**: Storing drop information in the contract state
2. **Key-to-Drop Mapping**: Mapping public keys to drop IDs
3. **Access Key Storage**: Adding function-call keys to the contract account

### Storage Calculation Example

```rust
// Simplified storage cost calculation
fn calculate_storage_cost(&self, num_keys: u64) -> NearToken {
    let drop_storage = DROP_STORAGE_COST;
    let key_storage = num_keys * KEY_STORAGE_COST;
    let access_key_storage = num_keys * ACCESS_KEY_STORAGE_COST;
    
    drop_storage + key_storage + access_key_storage
}
```

:::tip Storage Optimization
The contract uses efficient data structures and minimal storage patterns to keep costs low while maintaining functionality.
:::

---

## Security Model

The NEAR Drop contract implements several security measures:

### Access Control

- **Drop Creation**: Only the drop creator can modify their drops
- **Function-Call Keys**: Limited to specific claiming functions only
- **Account Validation**: Ensures only valid NEAR accounts can be created

### Preventing Abuse

- **One-Time Claims**: Each key can only be used once per drop
- **Key Cleanup**: Used keys are removed to prevent reuse
- **Counter Management**: Drop counters prevent double-claiming

### Error Handling

```rust
// Example error handling pattern
if self.drop_id_by_key.get(&public_key).is_none() {
    env::panic_str("No drop found for this key");
}

if drop.counter == 0 {
    env::panic_str("All drops have been claimed");
}
```

---

## Cross-Contract Integration

The contract is designed to work seamlessly with other NEAR standards:

### Fungible Token Integration

- Implements NEP-141 interaction patterns
- Handles storage registration automatically
- Manages transfer and callback flows

### NFT Integration  

- Supports NEP-171 NFT transfers
- Preserves token metadata and properties
- Handles ownership transfers correctly

### Account Creation Integration

- Works with the linkdrop contract pattern
- Handles account funding and key management
- Supports both testnet and mainnet account creation

---

## File Organization

The contract code is organized into logical modules:

```
src/
├── lib.rs              # Main contract logic and state
├── drop_types.rs       # Drop type definitions
├── near_drop.rs        # NEAR token drop implementation
├── ft_drop.rs          # Fungible token drop implementation  
├── nft_drop.rs         # NFT drop implementation
└── claim.rs            # Claiming logic for all drop types
```

This modular structure makes the code:
- **Easy to Understand**: Each file has a clear purpose
- **Maintainable**: Changes to one drop type don't affect others
- **Extensible**: New drop types can be added easily

---

## Next Steps

Now that you understand the contract architecture, let's start implementing the core functionality, beginning with NEAR token drops.

[Continue to NEAR Token Drops →](./near-drops)

---

:::note Key Takeaways
- The contract uses efficient storage patterns with dual mappings
- Three drop types support different token standards (NEAR, FT, NFT)
- Function-call access keys enable gasless claiming operations
- Security is maintained through limited key permissions and proper validation
- Modular architecture makes the contract maintainable and extensible
:::