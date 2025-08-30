---
id: near-drop
title: "NEAR Drop: Create claimable token drops with FunctionCall keys"
description: "What drops are, when to use them, how they work under the hood with FunctionCall keys, and how to create/claim NEAR, FT, and NFT drops."
---

A **drop** lets you lock value (Ⓝ, FT, or NFT) behind a **public key** and allow **whoever holds the private key** to claim it. This pattern enables smooth onboarding (share a link/QR → user claims) and gift campaigns without asking the recipient to pre-fund gas or already have an account.

This tutorial explains the concept, trade-offs, and the two claim flows (to an existing account or creating a brand-new account), using the simplified contract behind community tools like linkdrops.

---

## When (and when not) to use drops

**Great for**
- **Onboarding**: give newcomers value + an account in one step.
- **Campaigns / rewards**: distribute coupons, POAP-style NFTs, or micro-grants.
- **Gasless feel**: the **contract** owns a temporary FunctionCall key, so claimers don’t need to pre-fund gas.

**Consider alternatives**
- If you already know the recipients, a **direct transfer** (FT/NFT) can be simpler.
- For large lists with allowlists, consider **Merkle airdrops** or claim-by-proof approaches.
- If you need **multiple assets per claim**, this example doesn’t mix NEAR+FT+NFT in a single drop (pick one type per drop).

---

## How a drop works (mental model)

1. **Create**: The creator calls `create_near_drop` / `create_ft_drop` / `create_nft_drop`, attaching enough deposit to cover storage and the assets. They pass one or more **public keys**.
2. **Key install**: The contract stores a mapping `PublicKey → DropId` and **adds each key** to **its own account** as a **FunctionCall key** restricted to the claim methods.
3. **Share**: The creator shares the **private key** that corresponds to the public key.
4. **Claim**: The claimer uses that private key to sign a call to `claim_for` (send to an **existing** account) or `create_account_and_claim` (create a **new** account, then send).
5. **Finalize**: The contract verifies the key is valid for a remaining drop, transfers the asset, **decrements** the drop counter, and can clean up when it reaches zero.

**Important:** the claimer is effectively signing *as the contract account* via that FunctionCall key, but they are **limited to claim methods only**.

---

## Contract surface (concept)

- **Create**
  - `create_near_drop(public_keys, amount_per_drop)`
  - `create_ft_drop(public_keys, ft_contract, amount_per_drop)`
  - `create_nft_drop(public_key, nft_contract)`
- **Claim**
  - `claim_for(account_id)` — send to an **existing** account
  - `create_account_and_claim(account_id)` — **create** the account, then send

**State**
- `drop_id_by_key: PublicKey → DropId` — who can claim what
- `drop_by_id: DropId → Drop` — amount/type/counter/metadata
- `top_level_account` — used when creating new accounts (e.g. `testnet`)

> Note: In this simplified implementation you **do not mix** asset types per drop: choose **NEAR**, **FT**, or **NFT**.

---

## Security, UX, and trade-offs

- **FunctionCall keys**: add them with **method restrictions** (only claim methods) and sensible **allowance/gas**; remove when exhausted.
- **Key handling**: anyone with the **private key** can claim — treat it like a bearer coupon. Use **one-time keys** when possible.
- **Storage & deposits**: creators must cover storage for (a) the drop struct, (b) the key→drop mapping, and (c) adding the key to the account.
- **Scale**: thousands of keys mean higher storage; consider batching and a cleanup path when counters hit zero.
- **Account creation**: the contract can create **only under `top_level_account`** (e.g., `*.testnet`). Choose it to match your network and naming plan.

---

## Quickstart (testnet)

> Keep this focused: create one NEAR drop with two keys, then see how you’d claim.

### 0) Deploy once (minimal)
```bash
# Build
cargo near build

# Deploy & init (top_level_account = "testnet")
cargo near deploy <account-id> \
  with-init-call new \
  json-args '{"top_level_account":"testnet"}' \
  prepaid-gas '100 Tgas' attached-deposit '0 NEAR' \
  network-config testnet sign-with-keychain send
