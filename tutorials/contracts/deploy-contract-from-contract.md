---
id: deploy-contract-from-contract
title: How to Deploy a Contract from a Contract
description: "Learn how to use a factory contract to automate deploying another contract to sub-accounts on NEAR."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

Deploying a contract from another contract is a powerful pattern on NEAR, often implemented via a "factory" contract. This allows one smart contract to create and initialize sub-accounts with pre-compiled code, enabling scalable patterns like token factories or DAO spawners.

### Core Concept: The Factory Pattern
A factory contract stores compiled Wasm code (e.g., for a donation app or fungible token) and deploys it to new sub-accounts of itself. Key steps:

1. **Store the Code**: The factory holds the target contract's Wasm bytes internally.
2. **Create and Deploy**: On call, it creates a sub-account (e.g., `sub.factory.near`) and deploys the stored code using NEAR's `promise` system for cross-contract calls.
3. **Update Capability**: Factories can swap the stored code without redeploying themselves.

This leverages NEAR's account model, where accounts can only create sub-accounts of themselves. The factory acts as a "parent" deploying "children."

<CodeTabs>
  <Language value="rust" language="rust">
    <Github fname="deploy.rs"
            url="https://github.com/near-examples/factory-rust/blob/main/src/deploy.rs"
            start="14" end="66" />
  </Language>
</CodeTabs>

In this example, the factory deploys a simple donation contract, but you can replace it with any compiled Wasm (e.g., a DAO or NFT minter).

### Trade-Offs and Alternatives
- **Pros**: Automates deployment at scale; reduces manual steps; enables versioning via code updates.
- **Cons**: 
  - Gas Intensive: Deploying consumes significant gas (e.g., 300 TGas limit per call). Large Wasm files can hit limits during updates due to deserialization overhead—bypass this by reading raw input bytes instead of deserializing parameters.
  - Sub-Account Limits: Factories can only deploy to their own sub-accounts (e.g., not to arbitrary accounts like `user.near`). Post-deployment, the factory loses control over the child account.
  - Security Risks: If the factory is compromised, it could deploy malicious code. Always audit stored Wasm.
- **Alternatives**:
  - Manual Deployment: Use `near deploy` CLI for one-off cases—simpler but not automated.
  - Cross-Contract Calls Without Factory: Call `create_account` and `deploy_contract` directly from any contract, but this lacks the storage/update features of a full factory.
  - External Tools: Services like NEAR's account creator APIs for off-chain automation, though less on-chain pure.

Choose factories for repeatable, on-chain deployments; opt for alternatives if gas or flexibility is a concern.

### Implementing the Factory
Focus on the deployment logic:

<CodeTabs>
  <Language value="rust" language="rust">
    <Github fname="manager.rs"
            url="https://github.com/near-examples/factory-rust/blob/main/src/manager.rs"
            start="5" end="19" />
  </Language>
</CodeTabs>

- `create_factory_subaccount_and_deploy`: Creates the sub-account, deploys code, and initializes (e.g., sets a beneficiary).
- `update_stored_contract`: Reads raw input bytes to update stored Wasm—avoids gas issues with large files.

Compile your target contract to Wasm first, then base64-encode it for updates.

### Testing Deployments
- **Unit Tests**: Use NEAR's `near-sdk-sim` to simulate factory calls. Verify sub-account creation and code deployment via mock promises.
- **On-Chain Verification**: After calling the factory:
  - Check sub-account existence with `near state sub.factory.near`.
  - Query the deployed contract (e.g., `near view sub.factory.near get_beneficiary`).
  - Test edge cases: Gas exhaustion on large Wasm, invalid sub-account names, or update failures.
- **Trade-Off in Testing**: Simulations are fast but miss real gas costs; testnet deployments reveal limits (aim for <1Ⓝ attached for basic deploys).

This pattern scales NEAR apps efficiently—experiment on testnet to iterate.

:::note Versioning
Tested with near-cli 4.0.13, Rust 1.77.0.
:::
