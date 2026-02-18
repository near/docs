---
id: fts
title: Fungible Tokens Zero to Hero
sidebar_label: Build a FT Contract from Scratch
description: "Master NEAR fungible tokens from pre-deployed contracts to building fully-featured FT smart contracts."
---

In this _Zero to Hero_ series, you'll find a set of tutorials covering every aspect of a fungible token (FT) smart contract. You'll start by interacting with a pre-deployed contract and by the end you'll have built a fully-fledged FT smart contract that supports every extension of the standards.

---

## Prerequisites

To complete these tutorials successfully, you'll need:

- [Rust](/smart-contracts/quickstart#prerequisites)
- [A NEAR wallet](https://testnet.mynearwallet.com)
- [NEAR-CLI](/tools/near-cli#installation)
- [cargo-near](https://github.com/near/cargo-near)

:::info New to Rust?
If you are new to Rust and want to dive into smart contract development, our [Quick-start guide](https://docs.near.org/smart-contracts/quickstart) is a great place to start.
:::

---

## Overview

These are the steps that will bring you from **_Zero_** to **_Hero_** in no time! 💪

| Step | Name                                                         | Description                                                                                                                                     | Try in NearPlay |
| ---- | ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| 1    | [Pre-deployed contract](https://near-examples.github.io/ft-tutorial/predeployed-contract) | Receive FTs without the need to code, create, or deploy a smart contract.                                                                       | - |
| 2    | [Contract architecture](https://near-examples.github.io/ft-tutorial/skeleton)             | Learn the basic architecture of the FT smart contract and compile the code.                                                                     | [![Open in NearPlay](https://img.shields.io/badge/Open%20in%20NearPlay-14b8a6?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0ibTE4IDcgNCA0LTQgNE00IDEybDQgNC00LTQgNC00Ii8+PC9zdmc+&logoColor=white)](https://nearplay.app/embed/9fc2893b-3189-474f-aa56-6153f30a3c8d) |
| 3    | [Defining a Token](https://near-examples.github.io/ft-tutorial/defining-a-token)          | Flesh out what it means to have a FT and how you can customize your own.                                                                         | [![Open in NearPlay](https://img.shields.io/badge/Open%20in%20NearPlay-14b8a6?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0ibTE4IDcgNCA0LTQgNE00IDEybDQgNC00LTQgNC00Ii8+PC9zdmc+&logoColor=white)](https://nearplay.app/embed/2da829b9-b042-4a74-b39c-6258464a620a) |
| 4    | [Circulating Supply](https://near-examples.github.io/ft-tutorial/circulating-supply)      | Learn how to create an initial supply and have the token show up in your wallet.                                                                | [![Open in NearPlay](https://img.shields.io/badge/Open%20in%20NearPlay-14b8a6?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0ibTE4IDcgNCA0LTQgNE00IDEybDQgNC00LTQgNC00Ii8+PC9zdmc+&logoColor=white)](https://nearplay.app/embed/bcb2b84a-d97e-4e00-a095-0f8f11d6ec1e) |
| 5    | [Registering Accounts](https://near-examples.github.io/ft-tutorial/registering-accounts)  | Explore how you can implement and understand the storage management standard to avoid malicious users from draining your funds.                 | [![Open in NearPlay](https://img.shields.io/badge/Open%20in%20NearPlay-14b8a6?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0ibTE4IDcgNCA0LTQgNE00IDEybDQgNC00LTQgNC00Ii8+PC9zdmc+&logoColor=white)](https://nearplay.app/embed/a561a30e-b7d4-41fa-b1cb-3663c369b9b9) |
| 6    | [Transferring FTs](https://near-examples.github.io/ft-tutorial/transfers)                 | Learn how to transfer FTs and discover some of the true powers that the core standard brings                                                    | [![Open in NearPlay](https://img.shields.io/badge/Open%20in%20NearPlay-14b8a6?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0ibTE4IDcgNCA0LTQgNE00IDEybDQgNC00LTQgNC00Ii8+PC9zdmc+&logoColor=white)](https://nearplay.app/embed/dcdae678-db6a-45e0-9de2-c1294aa05bfd) |
| 7    | [Marketplace](https://near-examples.github.io/ft-tutorial/marketplace)                    | Learn about how common marketplaces operate on NEAR and dive into some of the code that allows buying and selling NFTs by using Fungible Tokens. | [![Open in NearPlay](https://img.shields.io/badge/Open%20in%20NearPlay-14b8a6?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0ibTE4IDcgNCA0LTQgNE00IDEybDQgNC00LTQgNC00Ii8+PC9zdmc+&logoColor=white)](https://nearplay.app/embed/e313c93f-4752-4b68-808d-55ad0a98476a) |

---

## Next steps

Ready to start? Jump to the [Pre-deployed Contract](https://near-examples.github.io/ft-tutorial/predeployed-contract) tutorial and begin your learning journey!

If you already know about fungible tokens and smart contracts, feel free to skip and jump directly to the tutorial of your interest. The tutorials have been designed so you can start at any given point!
