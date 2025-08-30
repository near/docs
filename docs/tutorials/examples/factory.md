---
id: factory
title: Factory: Deploy a contract from a contract
description: "Build a reusable factory that deploys a compiled contract to new sub-accounts, and learn when to use it, trade-offs, and safety tips."
---

A **factory** is a smart contract that *stores* another contract’s compiled Wasm and can **programmatically deploy** that code to **new sub-accounts** (e.g. `sub.factory.testnet`). It’s ideal when you want to spin up many similar contracts—like many donations vaults, FTs/NFTs per community, or app-specific instances.

We’ll use the generic Rust factory that deploys a small **donation** contract. You can store any Wasm you want (FT, DAO, etc.).

---

## When (and when not) to use a factory

**Great for**
- **Mass deployment** of the same app pattern (per-user/per-team instances).
- **One-click onboarding**: a single call that creates the account, deploys code, and initializes it.

**Trade-offs & alternatives**
- Factories can deploy **only to their own sub-accounts** (e.g. `x.factory.testnet`). They cannot deploy to arbitrary accounts. If you need one global instance for everyone, consider the **Global Contracts** pattern instead.
- **Ownership/safety**: after creation, the sub-account is **independent**; the factory does not control it. Design access keys and initialization carefully.
- **Updates at scale**: Factories can update the **stored** code for *future* deployments; already-deployed sub-accounts won’t change. For upgrading code that’s already on an account, see contract upgrade patterns.

---

## The two core calls

1) **Create + deploy**  
`create_factory_subaccount_and_deploy(name, beneficiary, public_key?)` (payable)  
- Creates `name.<factory>`  
- Deploys the stored Wasm  
- Calls the new contract’s `init` (here: sets a **beneficiary**)  

2) **Update stored Wasm**  
`update_stored_contract()` (no params)  
- Reads **raw input bytes** directly from `env::input()` to avoid expensive JSON deserialization for large Wasm payloads. You pass the Wasm as **base64 bytes** from your client/CLI.

> The reference implementation lives here (Rust): `create_factory_subaccount_and_deploy` and `update_stored_contract`.

---

## Quickstart (testnet)

> You can use **NEAR CLI** from a terminal. If you prefer the new **near-cli-rs** (Rust), the flow is the same; examples below show both syntaxes where it matters.

### 1) Deploy the factory once
Use the example repo’s deploy flow or your own build. The reference example uses `cargo-near`/CI; deploy the factory to **testnet** (e.g., `factory.testnet`).

### 2) Create a child & deploy the stored contract

**near-cli (Node):**
```bash
near call <factory-account> create_factory_subaccount_and_deploy \
  '{"name":"sub","beneficiary":"<your.testnet>"}' \
  --deposit 1.24 --accountId <your.testnet> --gas 300000000000000
