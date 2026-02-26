---
id: ethereum-migration
title: Ethereum to NEAR Migration Guide
sidebar_label: ETH → NEAR Migration
---

# Ethereum to NEAR Migration Guide

A comprehensive guide for Ethereum developers migrating to NEAR Protocol - covering concepts, code patterns, and practical migration steps.

## Why Migrate to NEAR?

- **Human-readable accounts**: `alice.near` instead of `0x7a3d...`
- **Predictable gas costs**: No fee spikes during congestion  
- **Built-in account abstraction**: Access keys with granular permissions
- **Horizontal scaling**: Sharded architecture grows with demand
- **Developer flexibility**: Build in Rust or JavaScript

---

## Conceptual Differences

### Account Model

| Ethereum | NEAR |
|----------|------|
| 20-byte address (`0x...`) | Named accounts (`alice.near`) |
| EOA vs Contract accounts | All accounts can hold code + data |
| Single private key = full control | Multiple access keys with permissions |
| No sub-accounts | Sub-accounts (`app.alice.near`) |

**Key Insight**: NEAR accounts are like domain names. You own `alice.near` and can create `app.alice.near`, `nft.alice.near`, etc.

### Access Keys

NEAR's killer feature for UX:

```
┌─────────────────────────────────────────────────────────────┐
│              Named Account (alice.near)                      │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │ FullAccess  │  │ FunctionCall│  │ FunctionCall│          │
│  │ Key (owner) │  │ Key (dApp)  │  │ Key (game)  │          │
│  │             │  │ Only: swap()│  │ Only: play()│          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
└─────────────────────────────────────────────────────────────┘
```

- **FullAccess keys**: Like Ethereum private keys - full control
- **FunctionCall keys**: Limited to specific contract methods, with allowance

### Gas Model

| Ethereum | NEAR |
|----------|------|
| Gas auction (higher bid = faster) | Fixed gas price |
| Fees spike during congestion | Predictable costs |
| User always pays | Contract can pay (prepaid gas) |
| ETH for gas | NEAR for gas |

**NEAR Gas Costs** (approximate):
- Simple transfer: ~0.00045 NEAR
- Contract call: ~0.0005-0.001 NEAR  
- Contract deploy: ~0.05-0.5 NEAR

### Storage Model

| Ethereum | NEAR |
|----------|------|
| Pay gas to write | Stake NEAR to reserve storage |
| Free reads | Paid reads AND writes |
| 256-bit storage slots | Key-value with serialization |

**Storage Staking**: 1 NEAR ≈ 10KB of storage. When you delete data, you get the stake back.

---

## Code Translation

### Basic Mappings

| Solidity | NEAR Rust | NEAR JS |
|----------|-----------|---------|
| `msg.sender` | `env::predecessor_account_id()` | `near.predecessorAccountId()` |
| `tx.origin` | `env::signer_account_id()` | `near.signerAccountId()` |
| `address(this)` | `env::current_account_id()` | `near.currentAccountId()` |
| `msg.value` | `env::attached_deposit()` | `near.attachedDeposit()` |
| `block.timestamp` | `env::block_timestamp()` | `near.blockTimestamp()` |
| `require(cond, msg)` | `require!(cond, msg)` | `assert(cond, msg)` |

### ERC-20 → NEP-141 Token

**Solidity (ERC-20):**
```solidity
function transfer(address to, uint256 amount) public returns (bool) {
    require(_balances[msg.sender] >= amount, "Insufficient balance");
    _balances[msg.sender] -= amount;
    _balances[to] += amount;
    emit Transfer(msg.sender, to, amount);
    return true;
}
```

**NEAR Rust (NEP-141):**
```rust
#[payable]
pub fn ft_transfer(&mut self, receiver_id: AccountId, amount: U128, memo: Option<String>) {
    require!(env::attached_deposit() >= 1, "Requires 1 yoctoNEAR");
    
    let sender_id = env::predecessor_account_id();
    let amount: u128 = amount.into();
    
    self.internal_transfer(&sender_id, &receiver_id, amount, memo);
}
```

### Storage Patterns

| Solidity | NEAR Rust |
|----------|-----------|
| `mapping(address => uint)` | `LookupMap<AccountId, u128>` |
| `mapping(address => mapping(...))` | Nested `LookupMap` with prefix |
| `uint[] array` | `Vector<T>` |
| `address[] with iteration` | `UnorderedSet<AccountId>` |

### Cross-Contract Calls

**Critical Difference**: NEAR cross-contract calls are ASYNCHRONOUS.

**Solidity (synchronous):**
```solidity
uint balance = IERC20(token).balanceOf(address(this));
// Balance available immediately
```

**NEAR Rust (async with callback):**
```rust
// Initiate call - returns Promise, not result
ext_token::ext(token_account)
    .ft_balance_of(env::current_account_id())
    .then(
        Self::ext(env::current_account_id())
            .on_balance_received()
    )

// Handle result in callback
#[private]
pub fn on_balance_received(&self, #[callback_result] result: Result<U128, PromiseError>) -> U128 {
    match result {
        Ok(balance) => balance,
        Err(_) => U128(0),
    }
}
```

---

## Migration Checklist

### 1. Environment Setup

```bash
# Install NEAR CLI
npm install -g near-cli-rs

# Install Rust (for contracts)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustup target add wasm32-unknown-unknown

# Create testnet account
near account create-account fund-myself myapp.testnet
```

### 2. Contract Migration Steps

1. **Audit Solidity contracts** - Identify all state variables, external calls, events
2. **Map to NEAR patterns** - Use the translation tables above
3. **Handle async calls** - Redesign any synchronous external calls
4. **Implement storage** - Choose appropriate collections (LookupMap vs UnorderedMap)
5. **Add NEP-297 events** - Replace Solidity events with standard logging
6. **Test thoroughly** - Use near-workspaces for integration tests

### 3. Frontend Migration

**Before (ethers.js):**
```javascript
const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();
const contract = new ethers.Contract(address, abi, signer);
await contract.transfer(to, amount);
```

**After (NEAR wallet-selector):**
```javascript
import { setupWalletSelector } from '@near-wallet-selector/core';

const selector = await setupWalletSelector({ network: 'mainnet', modules: [...] });
const wallet = await selector.wallet();

await wallet.signAndSendTransaction({
    receiverId: 'token.near',
    actions: [{
        type: 'FunctionCall',
        params: { methodName: 'ft_transfer', args: { receiver_id: to, amount }, gas: '30000000000000', deposit: '1' }
    }]
});
```

---

## Common Gotchas

### 1. Async Cross-Contract Calls
Your Solidity mental model won't work. Design state machines that handle callbacks.

### 2. Storage Costs
Unlike Ethereum's "pay once" model, NEAR requires ongoing storage staking. Optimize data structures.

### 3. 1 yoctoNEAR Security Deposit
NEP-141 transfers require 1 yoctoNEAR attached to prevent exploits. Don't forget it!

### 4. Access Key Management
Leverage function-call keys for better UX. Users can approve limited permissions without full wallet access.

### 5. Account Creation Costs
Creating accounts costs NEAR (for storage). Budget for this in your dApp economics.

---

## Aurora: The Fast Path

If you need to migrate quickly, [Aurora](https://aurora.dev) runs a full EVM on NEAR:

- Deploy Solidity contracts unchanged
- Use existing Ethereum tooling (Hardhat, Foundry)
- Bridge assets from Ethereum
- Slightly higher fees than native NEAR

**Best for**: Quick migrations, complex Solidity codebases, teams without Rust experience.

---

## Resources

- [NEAR Documentation](https://docs.near.org)
- [near-sdk-rs (Rust SDK)](https://docs.rs/near-sdk)
- [near-sdk-js (JavaScript SDK)](https://github.com/near/near-sdk-js)
- [NEAR Examples](https://github.com/near-examples)
- [Aurora Documentation](https://doc.aurora.dev)
