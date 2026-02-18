---
id: introduction
title: Shade Agents
sidebar_label: What are Shade Agents?
description: "Learn about Shade Agents - decentralized and trustless AI agents that control accounts and assets across multiple blockchains using TEEs and NEAR's decentralized key management."
---

import { SigsSupport } from '@site/src/components/sigsSupport';

:::warning
The Shade Agent Framework is experimental and contains known critical vulnerabilities.

It must not be used in production or on mainnet and is intended solely for testing and non-critical use on testnet.

No representations or warranties are made regarding security, correctness, or fitness for any purpose. Use of this software is entirely at your own risk.

A production-ready version of the framework is currently in development.
:::

The Shade Agent Framework is a suite of tools for creating Web3 agents and off-chain services that are trust-minimized, decentralized, and verifiable. It leverages on-chain signing allowing agents to hold assets and sign transactions on most blockchains and implement strict guardrails to prevent unauthorized actions.

Previous Web3 agents fall into one of two categories:
1. They are trustless and verifiable by using a trusted execution environment (TEE), but if the TEE goes down, the private keys and funds of the agent are lost.
2. The agent’s accounts are persistent, but the agents are centralized.

Shade Agents provide verifiability and non-custody by operating in TEEs, but also persistent control of accounts by using NEAR's decentralized key management. Any instance of an agent running the same code inside a TEE can access the same accounts, meaning you don't need to worry about private keys being lost or exposed. 

Thanks to combining TEEs with the NEAR tech stack, Shade Agents can autonomously sign transactions across most chains, interact with AI models and external data sources, manage assets, and perform privacy-preserving, verifiable computations, offering the flexibility and performance of Web2 with the verifiability of Web3.

:::info
Shade Agents power [Agentic Protocols](../concepts/what-can-you-build.md#agentic-protocols): a new type of decentralized application designed to be autonomous, proactive, and intelligent.
:::

---

## How do Shade Agents work?

Shade Agents consist of two main components: the `agent` and the `agent smart contract`.

![Shade Agent Architecture](/assets/docs/ai/shade-agent-stack-diagram.png)

When an agent is booted up in a TEE, it generates a random ephemeral private key and NEAR account. This private key is exclusively used to call the agent contract, not for storing funds.

<details>

<summary>What is a TEE?</summary>

A trusted execution environment is a secure part of a CPU that runs code in an isolated and protected way. Execution and state stay private, including from the host. TEEs produce cryptographic attestations that prove it's running certain code inside a genuine TEE.

</details>

The agent calls the `register_agent` function on the `agent smart contract`, providing its `attestation`. The attestation contains: 
- A proof that it's running inside a genuine TEE.
- The [measurements](../concepts/terminology.md#measurements) of the code running in the TEE (which uniquely identifies the code and platform it's running on).

If the attestation is valid, the measurements fit the approved measurements in the contract, and it's running on a certain machine (identified by a [PPID](../concepts/terminology.md#ppid)), then the agent's account is registered inside the agent contract.

Once registered, the `agent` can call the agent-gated functions on the agent contract. An example of this is the `request_signature` function, enabling it to sign transactions on behalf of the Shade Agent. `request_signature` leverages [chain signatures](../../../chain-abstraction/chain-signatures.md) for decentralized key management, allowing the Shade Agent to hold assets and sign transactions on nearly any chain.

If `anyone` deploys the same code to a different TEE with the same measurements and PPID, it can also register in the contract, and thus gain access to signing transactions using the Shade Agent's accounts. This means the accounts are persisted across different TEE instances. To facilitate this functionality, agents are designed to be stateless.

---

## Agent Contract Functions

The Agent Contract has four main functions:

#### Approve Measurements

After the contract is deployed, a set of `measurements` is set to ensure that only agents running the correct code (i.e. it has the same measurements) can be registered in the agent contract.

Developers or protocols may need to modify the code running inside agents over time. Because of this, when the contract is initialized, an `owner` account ID is set. Only the owner can approve a new set of `measurements`.

The `shade-agent-cli` handles the deployment of the agent contract and automatically approves the measurements of your agent.

:::tip
Upgradeability can be designed for the specific use case. Common upgrade methods include approving a new set of measurements through DAO voting or implementing a grace period or cool down, allowing users to withdraw funds if they're uncomfortable with the incoming measurements for the new agent.
:::

#### Approve PPIDs

Similar to how measurements are approved, the owner also approves a set of `PPIDs` to ensure that only agents running on specific machines can register.

#### Register Agent

The `register_agent` function verifies that the agent is running in a TEE, is executing the expected code (as defined by the approved measurements), and is running on a certain machine (as defined by the approved PPIDs). Upon successful verification, the agent's account ID becomes registered and gains access to agent-gated functions.

The `shade-agent-api` makes it easy to register; just use the `register` method.

#### Request Signature

The `request_signature` function serves as the gateway to access the Shade Agent's multichain accounts and sign transactions. It employs `method access control` so that only registered agents can use this function. 

:::tip
Developers should not sign transactions from the agents themselves (except for functions on the agent contract), as these accounts will be lost if the agent goes down. The magic of Shade Agents is that the multichain accounts are tied to the agent contract, which are persistent and accessible by any instance of a valid agent.
:::

The request signature function accepts three arguments:
- The transaction `payload` - a hash of the transaction to be signed.
- The `derivation path` - a string that modifies the address on the target chain being used. Shade Agents can access a near-unlimited number of accounts, and the account being used can be changed by modifying the path. The same path will always map to the same account for a given agent contract.
- The `key version` - sets the signature scheme required for the transaction. Shade Agents can sign transactions for any blockchain using the `secp256k1` and `ed25519` signature schemes (EVM, Bitcoin, Solana, Sui, XRP, etc.).

The `shade-agent-api` exposes the `requestSignature` function to sign transactions on behalf of the Shade Agent within your agent.

:::tip
`request_signature` is only an example of an agent-gated function. You can implement any function you want on the agent contract. It's recommended to implement [on-chain guardrails](../concepts/terminology.md#on-chain-guardrails) to prevent unauthorized actions even in the case of a compromised TEE.
:::

---

## Languages and Frameworks

The agent is just a backend service that runs inside a TEE instead of a centralized server. You can run the agent on an internal cron job, respond to actions, or it can expose API routes that can be called.

Agents are written in TypeScript/JavaScript using the `shade-agent-api` and agent contracts are written in Rust.

---

## Next Steps 

Now that you've learned what Shade Agents are and why they're powerful, head to the [quickstart](./quickstart/deploying.md) to deploy your first agent and see how to build them.

<SigsSupport />