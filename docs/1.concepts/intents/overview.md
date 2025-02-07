---
id: overview
title: Intents Layer
sidebar_label: Overview
---

In NEAR, an **intent** can be thought of as a high-level declaration of what a user wants to achieve on the blockchain. Solvers are active market participants that fill in the intents issued by users.
The NEAR Intents Layer provides a message bus for communication between solvers and users.

In summary, the intents layer allow users to express what they want to accomplish (their intention) while the network figures out the best way to make it happen.
Developers building on NEAR can use intents to create more user-friendly interactions, as it abstracts some of the complexities of directly interacting with smart contracts.

NEAR Intents work by:
- Expressing needs: Define your `intent`.
- Network response: NEAR finds the optimal solution. (Solvers)
- Seamless execution: Tasks are completed when parameters are met.
- Collaboration: Agents work together if needed.

:::info
The NEAR intents protocol and the documentation are under active development.

The protocol has been renamed from _Defuse_ to **NEAR Intents**.
Any mentions of _Defuse_ in the source code and documentation are to be replaced.
:::

## Terminology

1. Intent Settlement:
   1. [Solver Bus.](#solver-bus) an off chain message bus used for communication and sending `permits` between solvers and users. In general, specific only to a single distribution channel with solvers that may be authorized / trusted by this distribution channel. In the beginning of the project, a single shared solver bus may exist.
   2. [Verifier](#verifier). Smart contract that verifies intents expressed as state changes (`diffs`) signed by corresponding owners (a.k.a `permits`). The combination of state changes is committed as long as the invariant (total delta is zero) was kept for each token after these changes were applied. Deployed on NEAR `mainnet`.
2. Entities:
   1. Distribution channels. Applications that have the users, who are interested in decentralized spot trading.
   2. Solvers. Active market participants that fill in the intents issued by users.


## Verifier

Source code and deployment for the verifier smart contract.

:::tip Source code

You can find the source code of the verifier smart contract in [this GitHub repository](https://github.com/near/intents).

:::

### Deployment

The smart contract for NEAR Intents protocol is deployed at [`intents.near`](https://nearblocks.io/address/intents.near).

:::warning
Currently there is no `testnet` deployment.
:::

## Solver Bus

An off chain message bus used for communication and sending `permits` between solvers and users.

![Solver Bus diagram](/docs/assets/intents/solver-relay-v2-user-docs.jpg)

On the diagram "Solver Bus" is called "Solver Relay" and "Verifier" is part of NEAR Intents Smart contracts.

---

## Examples

Below are solver and frontend reference implementations for interacting with NEAR Intents protocol:

- [Defuse Frontend](https://github.com/defuse-protocol/defuse-frontend): `near-intents.org` website
- [Defuse SDK](https://github.com/defuse-protocol/defuse-sdk): Typescript SDK powering `near-intents.org`
- [AMM Solver](https://github.com/defuse-protocol/near-intents-amm-solver): Sample solver with AMM functionality
- [Python Client](https://github.com/referencedev/test-intent): A Python example of interacting with the Solver Bus
