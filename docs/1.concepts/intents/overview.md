---
id: overview
title: Intents Layer
sidebar_label: Overview
---

Intents layer

:::info
The NEAR intents protocol and the documentation are under active development.

The protocol has been renamed from Defuse to "NEAR Intents".

Any mentions of Defuse in the source code and documentation are to be replaced
:::

## Terminology

1. Intent Settlement:
   1. [Solver Bus.](solver-relayer-api/introduction.md) an off chain message bus used for communication and sending “permits” between solvers and users. In general, specific only to a single distribution channel with solvers that may be authorised / trusted by this distribution channel. In the beginning of the project, a single shared solver bus may exist.
   2. [Verifier](verifier.md). Smart contract that verifies intents expressed as state changes (“diffs”) signed by corresponding owners (a.k.a “permits”). The combination of state changes is committed as long as the invariant (total delta is zero) was kept for each token after these changes were applied. Deployed on NEAR mainnet.
2. Entities:
   1. Distribution channels. Applications that have the users, who are interested in decentralised spot trading.
   2. Solvers. Active market participants that fill in the intents issued by users.


## Verifier

description: Source code and deployment for the verifier smart contract

### Deployment

The smart contract for NEAR Intents protocol is deployed at [`intents.near`](https://nearblocks.io/address/intents.near)&#x20;

There is no `testnet` deployment.

:::tip Source code

https://github.com/near/intents

:::


## Solver Bus

An off chain message bus used for communication and sending `permits` between solvers and users.


On the diagram "Solver Bus" is called "Solver Relay" and "Verifier" is part of Defuse Smart contracts :)

<img src="../.gitbook/assets/solver-relay-v2-user-docs.jpg" alt="" />



## Architecture

description: Spot trading architecture


This document explains the architecture of NEAR Intents smart contracts that is used for spot trading of fungible tokens on multiple chains.

## Design choices

1. Speed. The solution prioritises speed.
2. Security & Decentralisation. The solution is as decentralised and secure as possible. Speed matters more.
3. Permissionless. The solution is permissionless (anyone can list any network or token and create a liquid market for it on their own).

Scalability. All the systems should be scalable, including on-chain contracts. NEAR architecture dictates that there should be a multitude of contracts that perform the same operation. From here we would call these contracts shards and the whole approach – sharded contracts.


## Intent flow

description: Deposited assets


<img src="../.gitbook/assets/off-chain-arch-4 (4).png" alt="" />

<p>Intent flow for deposited assets</p>

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

description: Bridge


Deposits and withdrawals from other chains into NEAR FTs are handled by the omni-bridge. NEAR intents uses omni-bridge as a bridging service. For the assets that are not supported by omni-bridge yet, there is an option to use PoA bridge.

Users need to deposit funds in NEAR intents account to trade. This is different from the ordinary AMMs. Reasoning for this step is the following:

1. Users anyway need to bridge all crypto outside from NEAR into NEAR, which is kind of a deposit; so the only part of the UX that would change is the necessity of deposits from NEAR.
2. Depositing tokens into a single NEAR intents contract allows for single transaction atomic settlement with no asyncronisity implications.
3. The single point of failure that is created at this point is not much worse than NEP-141 USDT (or any other stablecoin NEP-141), since it would concentrate the majority of trades.

The proper time to migrate to fully sharded architecture would be at the point when the sharded FT standard is developed and in place. Probably this standard should take into account the needs of the intent settlement.

### Omni-bridge overview

1. Networks support:
   1. Bitcoin
   2. Ethereum
   3. Arbitrum
   4. Base
   5. Solana
   6. TON
2. Support for ft\_transfer\_call() with \`msg\` field (active deposit option)
3. Passive deposit functionality
   1. NEAR-side smart-contract which will own a bunch of depositing addresses
   2. A protocol of correspondence of type of bridging (ft\_transfer or ft\_transfer\_call) with all the necessary parameters and the derivation path for a specific deposit address (say, derivation=hash(type, params)

