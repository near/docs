---
id: roadmap
sidebar_label: Roadmap
title: Omni Bridge Roadmap
description: "Explore the Omni Bridge roadmap, including hybrid architecture launch, Chain Signatures migration path, and future development plans for cross-chain infrastructure."
---

Omni Bridge launches with a hybrid architecture, utilizing different verification methods based on chain-specific requirements and technical constraints. This approach allows us to support multiple chains from day one while progressively transitioning to full Chain Signatures integration.

## Supported Chains
Initial launch includes:

- **Ethereum** - _(Light client + Chain Signatures)_
- **Bitcoin** - _(Light client + Chain Signatures)_
- **Solana** - _(Wormhole + Chain Signatures)_
- **Base** - _(Wormhole + Chain Signatures)_
- **Arbitrum** - _(Wormhole + Chain Signatures)_

## Migration Path

1. **Phase 1: Hybrid Operation** (ongoing)
- ETH/BTC: Light client verification
- Other chains: Wormhole message passing
- All NEAR outbound: Chain Signatures

During this phase, cross-chain messages follow different verification paths depending on direction and chain. NEAR outbound transfers already utilize Chain Signatures, while inbound transfers vary by source chain.

2. **Phase 2: Full Chain Signatures**
- Progressive transition of all chains
- Removal of Wormhole dependency
- Enhanced decentralization

Phase 2 represents our move to a unified verification model. Each chain will transition to Chain Signatures verification as implementation and audits complete, gradually removing the hybrid architecture's complexity.

## Future Development
1. **Protocol Improvements**
- Enhanced fee mechanisms
- Cross-chain contract calls
- New token standards support

Beyond basic asset transfers, we're expanding the bridge's capabilities. Enhanced fee mechanisms will better handle gas price volatility, while cross-chain contract calls will enable more complex interactions.

2. **Infrastructure**
- Expanded relayer network
- Improved monitoring tools
- Enhanced developer tooling

Infrastructure development focuses on reliability and usability. An expanded relayer network improves transfer speeds and reliability, while better monitoring and developer tools make integration and maintenance easier.

## Get Involved

### Areas for Contribution
- Chain integrations
- Performance optimization
- Security analysis
- Developer tools

- [Near-One/omni-bridge](https://github.com/Near-One/omni-bridge) - Omni Bridge repository
- [Near-One/bridge-sdk-js](https://github.com/Near-One/bridge-sdk-js) - JavaScript SDK
- [Near-One/bridge-sdk-rs](https://github.com/Near-One/bridge-sdk-rs) - Rust SDK and Bridge CLI

The code is open source and we welcome contributions from the community. Whether you're interested in adding support for new chains, optimizing performance, or building developer tools, there's room for meaningful contribution.

Bridge infrastructure is a fundamental component of a multi-chain future. Through Chain Signatures, we're creating a more efficient, secure, and scalable approach to cross-chain communication. Join us in building it.


