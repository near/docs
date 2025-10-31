---
id: ft-contract-tools
title: Create FT using Contract Tools
sidebar_label: Create FT using Contract Tools
description: "Learn how to create a fungible token (FT) using Contract Tools package"
---

import {Github} from "@site/src/components/UI/Codetabs";
import MovingForwardSupportSection from '@site/src/components/MovingForwardSupportSection';

In this tutorial, we will create a fungible token (FT) using [Contract Tools](https://github.com/near/near-sdk-contract-tools) package. This package is a collection of common tools and patterns in NEAR smart contract development:

- Storage fee management.
- Escrow pattern and derive macro.
- Owner pattern and derive macro.
- Pause pattern and derive macro.
- Role-based access control.
- Derive macros for NEP standards:
  - NEP-141 (fungible token), extension NEP-148.
  - NEP-145 (storage management), and integrations for the fungible token and non-fungible token standards.
  - NEP-171 (non-fungible token), extensions NEP-177, NEP-178, NEP-181.
  - NEP-297 (events).

---

## Introduction

The difference of this example from the [FT contract](https://github.com/near-examples/FT) based on `near_contract_standards` package is the approach of using deriving macros to implement NEP standards and common patterns.

When we use deriving macros, we can bring `near_contract_standards` implementations into our contract without writing boilerplate code for the each method. That allows us to focus on the unique logic of our contract like minting/burning logic, access control, other custom features. So, this collection of common tools and patterns (mostly in the form of derive macros) is as a sort of OpenZeppelin for NEAR.

---

## Basic FT Methods

To derive basic FT methods to our contract, we need to derive `FungibleToken` macro to our contract struct:

<Github fname="main.rs" language="rust"
        url="https://github.com/near-examples/ft-contract-tools/blob/main/src/lib.rs"
        start="4" end="6" />

This will bring all the basic FT methods defined in NEP-141 standard to our contract:
- `new`
- `contract_source_metadata`
- `ft_balance_of`
- `ft_metadata`
- `ft_total_supply`
- `storage_balance_bounds`
- `storage_balance_of`
- `ft_resolve_transfer`
- `ft_transfer`
- `ft_transfer_call`
- `storage_deposit`
- `storage_unregister`
- `storage_withdraw`

To bring basic owner methods to our contract, we derived also `Owner` macro which adds the following methods:
- `own_get_owner`
- `own_get_proposed_owner`
- `own_accept_owner`
- `own_propose_owner`
- `own_renounce_owner`

---

## Initialization

To initialize the basic FT contract with custom owner, metadata and storage bounds implement `new` method:

<Github fname="main.rs" language="rust"
        url="https://github.com/near-examples/ft-contract-tools/blob/main/src/lib.rs"
        start="10" end="27" />

---

## Minting

To mint initial supply of tokens to the owner implement `mint` method and restrict access only to the owner of the contract:

<Github fname="main.rs" language="rust"
        url="https://github.com/near-examples/ft-contract-tools/blob/main/src/lib.rs"
        start="29" end="54" />

:::tip
You can modify this method as you need, for example, to allow minting only when the contract is not paused (requires deriving [`Pausable`](https://github.com/near/near-sdk-contract-tools/tree/develop?tab=readme-ov-file#macro-combinations) hook), or to allow minting only to specific accounts with a certain role or from whitelist with custom limitations.
:::

---

## Burning

To burn tokens from the owner's account, we implement `burn` method and also restrict access:

<Github fname="main.rs" language="rust"
        url="https://github.com/near-examples/ft-contract-tools/blob/main/src/lib.rs"
        start="56" end="70" />

---

## Conclusion

Using `near-sdk-contract-tools` is very simple and flexible way to create FT contract with minimal boilerplate code and focusing on business logic. You can further extend this contract with more features like pausing, role-based access control, escrow pattern, and more by deriving corresponding macros from the package.

<MovingForwardSupportSection />