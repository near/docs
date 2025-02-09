---
id: architecture
title: NEAR intents
sidebar_label: Architecture
---

# Architecture

This document explains the architecture of NEAR Intents smart contracts that is used for spot trading of fungible tokens on multiple chains.

## Design choices

1. Speed. The solution prioritizes speed.
2. Security & Decentralization. The solution is as decentralized and secure as possible. Speed matters more.
3. Permissionless. The solution is permissionless (anyone can list any network or token and create a liquid market for it on their own).

4. Scalability. All the systems should be scalable, including on-chain contracts. NEAR architecture dictates that there should be a multitude of contracts that perform the same operation. From here we would call these contracts shards and the whole approach – sharded contracts.


## Intent flow

Let's review the intent flow for deposited assets:

[![Flow](/docs/assets/intents/off-chain-arch-4.png)](/docs/assets/intents/off-chain-arch-4.png)

### Intent flow for deposited assets

1. Initial state: user has an account with FT1 token deposited; user wants to swap 1 FT1 to FT2
2. FE sends an RFQ to solver bus
3. router receives the RFQ request and starts to search for the most optimal path for such swap by sending RFQ requests to “trader” solvers.
4. “Trader” solvers reply with signed messages “I’m ok to swap X of token A to Y of token B” (along with nonce, deadline, etc…)
5. As soon as the path FT1 -> FT2 has been found, router sends a response to the user with the final price: “Are you ok to swap 1 FT1 -> 2 FT2”?
6. user signs “I’m ok to swap 1 FT1 to 2 FT2” and replies back to router
7. router aggregates all these signed messages into a transaction and sends it to Verifier Contract
8. Verifier Contract verifies all signed state changes and commits them on-chain.


:::note

Intent flow for some assets may be enhanced to reduce solver risks and improve the price for the user (to be developed later).

:::


## Deposits & Withdrawals


Deposits and withdrawals from other chains into NEAR FTs are handled by the [OmniBridge](#). NEAR intents uses omni-bridge as a bridging service. For the assets that are not supported by [Omni-bridge](#omni-bridge-overview) yet, there is an option to use [PoA bridge](poa-bridge.md).

Users need to deposit funds in NEAR intents account to trade. This is different from the ordinary AMMs. Reasoning for this step is the following:

1. Users anyway need to bridge all crypto outside from NEAR into NEAR, which is kind of a deposit; so the only part of the UX that would change is the necessity of deposits from NEAR.
2. Depositing tokens into a single NEAR intents contract allows for single transaction atomic settlement with no asyncronisity implications.
3. The single point of failure that is created at this point is not much worse than NEP-141 USDT (or any other stablecoin NEP-141), since it would concentrate the majority of trades.

The proper time to migrate to fully sharded architecture would be at the point when the sharded FT standard is developed and in place. Probably this standard should take into account the needs of the intent settlement.

### Omni-bridge overview

1. Supported networks:
   1. Bitcoin
   2. Ethereum
   3. Arbitrum
   4. Base
   5. Solana
   6. TON
2. Support for `ft_transfer_call()` with `msg` field (active deposit option)
3. Passive deposit functionality
   1. NEAR-side smart-contract which will own a bunch of depositing addresses
   2. A protocol of correspondence of type of bridging (`ft_transfer` or `ft_transfer_call`) with all the necessary parameters and the derivation path for a specific deposit address (say, derivation=hash(type, params)

