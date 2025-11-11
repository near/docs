---
id: ft-contract-tools
title: Create FT using Contract Tools
sidebar_label: Create FT using Contract Tools
description: "Learn how to create a fungible token (FT) using Contract Tools package"
---

import {Github} from "@site/src/components/UI/Codetabs";
import MovingForwardSupportSection from '@site/src/components/MovingForwardSupportSection';

In this tutorial, we will create a fungible token (FT) using the [NEAR SDK Contract Tools](https://github.com/near/near-sdk-contract-tools) package. This package is a collection of common tools and patterns to simplify smart contract development, including:

- Storage fee management
- Escrow pattern and derive macro
- Owner pattern and derive macro
- Pause pattern and derive macro
- Role-based access control
- Derive macros for NEP standards
  - NEP-141 (fungible token), extension NEP-148
  - NEP-145 (storage management), and integrations for the fungible token and non-fungible token standards
  - NEP-171 (non-fungible token), extensions NEP-177, NEP-178, NEP-181
  - NEP-297 (events)

---

## Introduction

While one can create a fungible token (FT) contract from scratch using only the `near-sdk` and `near_contract_standards` (e.g. [FT contract](https://github.com/near-examples/FT)), a simpler approach is to use `near-sdk-contract-tools`.

`near-sdk-contract-tools` allows us implement the logic for minting/burning logic, access control, and other FT standards by simply deriving macros on our contract struct, as `OpenZeppelin` does for Ethereum contracts.

---

## Basic FT Methods

To derive basic FT methods to our contract, we need to derive `FungibleToken` macro to our contract struct:

<Github fname="lib.rs" language="rust"
        url="https://github.com/near-examples/ft-contract-tools/blob/main/src/lib.rs"
        start="9" end="12" />

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

To bring basic owner methods to our contract, we can also derive the `Owner` macro which adds the following methods:
- `own_get_owner`
- `own_get_proposed_owner`
- `own_accept_owner`
- `own_propose_owner`
- `own_renounce_owner`

---

## Initialization

To initialize the basic FT contract with custom owner, metadata and storage bounds implement `new` method:

<Github fname="lib.rs" language="rust"
        url="https://github.com/near-examples/ft-contract-tools/blob/main/src/lib.rs"
        start="14" end="45" />

---

## Transfer Hook

If we want to customize how the transfer of tokens work (i.e. modify the `ft_transfer` method), we need to implement a hook. Hooks are a way to **wrap (inject code before and after)** component functions:

<Github fname="transfer_hook.rs" language="rust"
        url="https://github.com/near-examples/ft-contract-tools/blob/main/src/transfer_hook.rs"
        start="5" end="33" />

Then derive it to our contract struct:

<Github fname="lib.rs" language="rust"
        url="https://github.com/near-examples/ft-contract-tools/blob/main/src/lib.rs"
        start="9" end="12" />

---

## Minting

By default, the FT standards do not include a minting method. However, we can easily mint tokens for the owner by implementing a `mint` method, which only the owner can call:

<Github fname="mint.rs" language="rust"
        url="https://github.com/near-examples/ft-contract-tools/blob/main/src/mint.rs"
        start="5" end="33" />

:::tip

You can modify this method as you need, for example, to allow minting only when the contract is not paused (requires deriving [`Pausable`](https://github.com/near/near-sdk-contract-tools/tree/develop?tab=readme-ov-file#macro-combinations) hook), or to allow minting only to specific accounts with a certain role or from whitelist with custom limitations

:::

---

## Burning

In the same way that minting is not included in the FT standards, burning is also not included. However, we can also easily implement it.

To burn tokens from the owner's account, we can add a `burn` method which is also only callable by the owner:

<Github fname="burn.rs" language="rust"
        url="https://github.com/near-examples/ft-contract-tools/blob/main/src/burn.rs"
        start="5" end="25" />

---

## Conclusion

Using `near-sdk-contract-tools` is a very simple and flexible way to create FT contract with minimal boilerplate which allows us to focus on the business logic.

You can further extend this contract with more features like pausing, role-based access control, escrow pattern, and more by deriving corresponding macros from the package.

<MovingForwardSupportSection />
