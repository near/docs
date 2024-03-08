---
id: state
title: State
---

Each account has an associated state where it stores its **metadata** and all the contract-related data **(contract's code + storage)**.

Accounts' states can be **read by anyone** in the network, but only the account itself can change it. 

Each account **pays for their own storage** by locking a part of their balance proportional to the space used.

---

### Account's Metadata
The state keeps track of relevant metadata from the contract. Particularly, the state stores the following fields:

1. `amount`: The accounts balance expressed in yoctoNEAR (1 Ⓝ = 10<sup>24</sup>yⓃ).
2. `code_hash`: A hash of the contract's Wasm file, filled with `1s` if no contract is present.
3. `storage_usage`: Amount of bytes used for storage by the account (code + metadata + data storage).

:::info
You can check an accounts metadata by running the following [near cli](../../4.tools/cli.md) command:

```bash
near state hello-nearverse.testnet
```
:::

---

### Contract's State
The state is also the place where both the **contract's code** and the **contract's storage** are stored.

The contract's storage is organized as **key-value pairs** encoded using base64 and JSON serialization (or [Borsh](https://borsh.io) in Rust).

:::info

You can check an accounts contract state by running the following [near cli](../../4.tools/cli.md) command:

```bash
near view-state hello-nearverse.testnet --finality final --utf8 true
```

:::

:::tip
When developing contracts our SDK will handle serializing the storage, so you can focus on what matters.
:::

---

### Paying for Storage (1 Ⓝ ~ 100kb)
In order to pay for storage, accounts needs to lock a portion of their balance proportional to the amount of data being stored. This means that:
- If more data is added and the **state increases ↑**, the account's **balance decreases ↓**.
- If data is deleted and the **state decreases ↓**, the account's **balance increases ↑**. 

Currently, it cost approximately **1 Ⓝ** to store **100kb** of data.
