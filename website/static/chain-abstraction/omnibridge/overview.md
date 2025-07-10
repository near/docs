---
id: overview
sidebar_label: Overview
title: Omni Bridge Overview
---

The [Omni Bridge](https://github.com/Near-One/omni-bridge) is a multi-chain asset bridge that facilitates secure and efficient asset transfers between different blockchain networks. It solves key challenges in cross-chain communication by leveraging [Chain Signatures](/chain-abstraction/chain-signatures) and its decentralized [Multi-Party Computation (MPC) service](/chain-abstraction/chain-signatures#multi-party-computation-service) to enable trustless cross-chain asset transfers. 

:::tip
To learn more see [How Omni Bridge Works](./how-it-works.md).
:::

## Supported Chains

Omni Bridge launches with a hybrid architecture, utilizing different verification methods based on chain-specific requirements and technical constraints. This approach allows us to support multiple chains from day one while progressively transitioning to full Chain Signatures integration.

Initial launch includes:

- **Ethereum** - _(Light client + Chain Signatures)_
- **Bitcoin** - _(Light client + Chain Signatures)_
- **Solana** - _(Currently Wormhole, transitioning to Chain Signatures)_
- **Base** - _(Currently Wormhole, transitioning to Chain Signatures)_
- **Arbitrum** - _(Currently Wormhole, transitioning to Chain Signatures)_

:::info
See [Omni Bridge Roadmap](./roadmap.md) for more details.
:::

## Resources

- [Near-One/omni-bridge](https://github.com/Near-One/omni-bridge) - Omni Bridge repository
- [Near-One/bridge-sdk-js](https://github.com/Near-One/bridge-sdk-js) - JavaScript SDK
- [Near-One/bridge-sdk-rs](https://github.com/Near-One/bridge-sdk-rs) - Rust SDK

