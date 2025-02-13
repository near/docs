---
id: intents-bridge
title: Intents Bridge
sidebar_label: Intents Bridge
---


NEAR Intents utilizes multichain bridges for cross-chain settlement. Currently the following bridges are supported:

1. [Omni Bridge](#omni-bridge)
2. [PoA Bridge](#poa-bridge)

---

## Omni Bridge

<!-- TODO: incoming omnibridge docs that will be added after this PR is merged. Once those are merged update this section. -->

The [Omni Bridge](../omnibridge/overview.md) is the primary bridge solution supporting multiple networks and deposit options.

### Supported Networks

- Bitcoin
- Ethereum
- Arbitrum
- Base
- Solana
- TON

### Features
- Support for `ft_transfer_call()` with `msg` field (active deposit)
- Passive deposit functionality through:
  - NEAR-side smart contract owning deposit addresses
  - Protocol for bridging type correspondence (`ft_transfer` or `ft_transfer_call`)
  - Parameter-based derivation paths for deposit addresses

### Deposits & Withdrawals

The Omni Bridge handles deposits and withdrawals between other chains and NEAR FTs. For assets not yet supported by Omni Bridge, the [PoA Bridge](#poa-bridge) serves as an alternative.

#### Why Deposits are Required
Users need to deposit funds into NEAR Intents accounts to trade, which differs from traditional AMMs. This design choice is based on:

1. The necessity of bridging external crypto to NEAR
2. Single-transaction atomic settlement benefits
3. Centralized risk comparable to existing NEP-141 tokens

Future migration to a fully sharded architecture will occur once sharded FT standards are developed.

---

## PoA Bridge

The Proof of Authority (PoA) Bridge provides an alternative solution for transferring assets between blockchain networks and NEAR Intents.

![bridge diagram](/docs/assets/intents/poa-bridge-user-docs.jpg)

### Usage Guide

The PoA Bridge API provides a JSON-RPC interface for managing deposits and withdrawals between supported networks and NEAR Intents. See the [official documentation](https://docs.near-intents.org/near-intents/poa-bridge#json-rpc-endpoint) for more details.

1. **Check Asset Support**: Verify your token is supported
2. **Get Deposit Address**: Request a deposit address and transfer tokens
3. **Monitor Deposits**: Track recent deposits via API
4. **Manage Withdrawals**: Initiate and monitor withdrawals through contract or frontend

