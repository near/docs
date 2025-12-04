---
id: nft-contract-tools
title: Create NFT using Contract Tools
sidebar_label: Create NFT using Contract Tools
description: "Learn how to create a non-fungible token (NFT) using Contract Tools package"
---

import {Github} from "@site/src/components/UI/Codetabs";
import MovingForwardSupportSection from '@site/src/components/MovingForwardSupportSection';

In this tutorial, you will create a non-fungible token (NFT) using the [NEAR SDK Contract Tools](https://github.com/near/near-sdk-contract-tools) package. This package is a collection of common tools and patterns to simplify smart contract development, including:

- Storage fee management
- Escrow pattern and derive macro
- Owner pattern and derive macro
- Pause pattern and derive macro
- Role-based access control
- Derive macros for [NEP standards](./standard.md)
  - [NEP-141](https://github.com/near/NEPs/blob/master/neps/nep-0141.md) (fungible token), extension [NEP-148](https://github.com/near/NEPs/blob/master/neps/nep-0148.md)
  - [NEP-145](https://github.com/near/NEPs/blob/master/neps/nep-0145.md) (storage management), and integrations for the fungible token and non-fungible token standards
  - [NEP-171](https://github.com/near/NEPs/blob/master/neps/nep-0171.md) (non-fungible token), extensions [NEP-177](https://github.com/near/NEPs/blob/master/neps/nep-0177.md), [NEP-178](https://github.com/near/NEPs/blob/master/neps/nep-0178.md), [NEP-181](https://github.com/near/NEPs/blob/master/neps/nep-0181.md)
  - [NEP-297](https://github.com/near/NEPs/blob/master/neps/nep-0297.md) (events)

---

## Introduction

While one can create a non-fungible token (NFT) contract from scratch using only the `near-sdk` and `near_contract_standards` (e.g. [NFT contract](https://github.com/near-examples/NFT)), a simpler approach is to use `near-sdk-contract-tools`.

`near-sdk-contract-tools` allows you to implement the minting/burning logic, access control, and other NFT standards by simply deriving macros on the contract's `struct`, as `OpenZeppelin` does for Ethereum contracts.

---

## Basic NFT Methods

To derive basic NFT methods to your smart contract, you need to derive the `NonFungibleToken` macro to the contract's `struct`:

<Github fname="lib.rs" language="rust"
        url="https://github.com/near-examples/nft-contract-tools/blob/main/src/lib.rs"
        start="9" end="12" />

This will bring all the basic NFT methods to the contract:
- `new`
- `contract_source_metadata`
- `nft_is_approved`
- `nft_metadata`
- `nft_supply_for_owner`
- `nft_token`
- `nft_tokens`
- `nft_tokens_for_owner`
- `nft_total_supply`
- `nft_approve`
- `nft_resolve_transfer`
- `nft_revoke`
- `nft_revoke_all`
- `nft_transfer`
- `nft_transfer_call`
- `storage_balance_bounds`
- `storage_balance_of`
- `storage_deposit`
- `storage_unregister`
- `storage_withdraw`

To bring basic owner methods to the contract, you also need to derive the `Owner` macro, which adds the following methods:
- `own_get_owner`
- `own_get_proposed_owner`
- `own_accept_owner`
- `own_propose_owner`
- `own_renounce_owner`

---

## Initialization

To initialize the basic NFT contract with a custom owner, metadata, and storage bounds, implement the `new` method:

<Github fname="lib.rs" language="rust"
        url="https://github.com/near-examples/nft-contract-tools/blob/main/src/lib.rs"
        start="14" end="45" />

---

## Transfer Hook

If you want to customize how the token transfer works (i.e., modify the `nft_transfer` method), you need to implement a hook. Hooks are a way to **wrap (inject code before and after)** component functions:

<Github fname="transfer_hook.rs" language="rust"
        url="https://github.com/near-examples/nft-contract-tools/blob/main/src/transfer_hook.rs"
        start="5" end="33" />

Then derive it to our contract struct:

<Github fname="lib.rs" language="rust"
        url="https://github.com/near-examples/nft-contract-tools/blob/main/src/lib.rs"
        start="9" end="12" />

---

## Minting

By default, the NFT standards do not include a minting method. However, you can easily mint tokens for the owner by implementing an `nft_mint` method:

<Github fname="mint.rs" language="rust"
        url="https://github.com/near-examples/nft-contract-tools/blob/main/src/mint.rs"
        start="10" end="40" />

:::tip

You can modify this method as you need, for example, to allow minting only when the contract is not paused (requires deriving [`Pausable`](https://github.com/near/near-sdk-contract-tools/tree/develop?tab=readme-ov-file#macro-combinations) hook), or to enable minting only to specific accounts with a certain role or from a whitelist with custom limitations.

:::

---

## Burning

In the same way that minting is not included in the NFT standards, burning is also not included. However, you can also easily implement it.

To allow users to burn their tokens, you can add a `burn` method:

<Github fname="burn.rs" language="rust"
        url="https://github.com/near-examples/nft-contract-tools/blob/main/src/burn.rs"
        start="5" end="25" />

---

## Conclusion

Using `near-sdk-contract-tools` is a simple and flexible way to create an NFT contract with minimal boilerplate, which allows you to focus on the business logic.

You can further extend this contract with more features like pausing, role-based access control, escrow pattern, and more by deriving corresponding macros from the package.

<MovingForwardSupportSection />