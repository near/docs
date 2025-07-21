---
id: introduction
title: Shade Agents
sidebar_label: What are Shade Agents?
description: "Learn about Shade Agents - decentralized and trustless AI agents that control accounts and assets across multiple blockchains using TEEs and NEAR's decentralized key management."
---

import { SigsSupport } from '@site/src/components/sigsSupport';

The shade agent framework allows developers to build decentralized and trustless AI agents that control accounts and assets across multiple blockchains.

Previous Web3 agents fall into one of two categories:
1. They are trustless and verifiable by using a trusted execution environment (TEE), but if the TEE goes down, the private keys and funds of the agent are lost.
2. The agent’s accounts are persistent, but the agents are centralized.

Shade Agents provide verifiability by and non-custody by operating in TEEs, but also persistent control of accounts by using NEAR's decentralized key management. Any agent running the same code inside a TEE has access to the same accounts. You don't need to worry about private keys being lost or exposed. 

Thanks to combining TEE with the NEAR tech stack, Shade Agents can autonomously sign transactions across any chain, interact with AI models and external data sources, manage assets, and perform privacy-preserving, verifiable computations, offering the flexibility and performance of Web2 with the verifiability of Web3.

:::info
Shade Agents power [Agentic Protocols](./examples.md#agentic-protocols): a new type of decentralized application designed to be autonomous, proactive, and intelligent.
:::

---

## How do Shade Agents work?

Shade Agents consist of two main components: a `worker agent` and an `agent smart contract`.

![Shade Agent Architecture](/docs/assets/shade-agents/shade-agent-stack-diagram.png)

When a worker agent is booted up in a TEE, the `TEE's hardware-based entropy` generates a random private key and account. This private key is exclusively used to call the agent contract, not for storing funds.

<details>

<summary>What is a TEE?</summary>

A trusted execution environment is a secure area of a CPU that runs code in an isolated and protected way. This means we know the expected code is running and its execution is not exposed outside of the enclave. TEEs produce attestations to prove that the code is running within a TEE and that it's running the specified code.

</details>

The worker agent calls the `register_worker` function on the `agent contract smart contract`, providing two pieces of information generated inside the TEE:
- A `remote attestation quote` (which proves it is running inside a genuine TEE).
- The Docker image's SHA256 `code hash` (to prove that the expected code is running).


If the attestation quote is valid and the code hash matches the expected code hash of the worker agent (defined during agent contract deployment), the worker agent's account is approved as a valid worker agent inside the agent contract.

Once registered, the `worker agent` can call the `sign_tx` function on the agent contract, enabling it to sign transactions on behalf of the Shade Agent. `sign_tx` leverages [chain signatures](../../chain-abstraction/chain-signatures.md) for decentralized key management, allowing the Shade Agent to hold assets and sign transactions on nearly any chain.

`Anyone` can deploy the same Docker image of the `worker agent` to a different TEE. Since the Docker image will have the same code hash, it can then be registered as a new valid worker for the agent, and thus gain access to signing transactions using the agent's accounts. This means the accounts are persisted across TEE instances of the agent. To facilitate this functionality, worker agents are designed to be stateless.

---

## Agent Contract Functions

The Agent Contract has three main functions:

#### Approve Code Hash

After the contract is deployed, a `code hash` is set to ensure that only worker agents running the correct code (i.e. it has the same code hash) can be registered in the agent contract.

Developers or protocols may need to modify the code running inside worker agents. Because of this, when the contract is initialized an `owner` account Id is set. Only the owner can approve a new `code hash`.


:::tip
Upgradeability can be designed to meet the agent's requirements. Common upgrade methods include approving a new code hash through DAO voting or implementing a grace period or cooldown, allowing users to withdraw funds if they're uncomfortable with the incoming code hash for the new worker agent.
:::

#### Register Worker

The register worker function verifies that the worker agent is running in a TEE and executing the expected code (as defined by the set `code hash`). Upon successful verification, the worker agent's account Id becomes registered and gains access to transaction signing (sign_ts).

#### Sign Tx

The `sign_tx` function serves as the gateway to access the Shade Agent's multichain accounts and sign transactions. It employs `method access control` so that only registered worker agents can use this function. 

:::tip
Developers should not sign transactions from the worker agents themselves (except for functions on the agent contract) as these accounts will be lost if the worker agent goes down. The magic of Shade Agents is that the multichain accounts are tied to the agent contract, which are persistent and accessible by any instance of a valid worker agent.
:::

The sign tx function accepts three arguments:
- The transaction `payload` - a hash of the transaction to be signed.
- The `derivation_path` - a string that modifies the address on the target chain being used. Shade Agents can access a near-unlimited number of accounts, and the account being used can be changed by modifying the path. The same path will always map to the same account for a given agent contract.
- The `key_version` - sets the signature scheme required for the transaction. Shade Agents can sign transactions for any blockchain using the `secp256k1` and `ed25519` signature schemes (EVM, Bitcoin, Solana, Sui, XRP, etc.).

:::tip
Within worker agent gated functions, we can implement an additional layer of security to strictly limit the Shade Agent's actions. For example, it could be restricted to only create transactions on Solana, perform swaps but not transfers, or transfer a maximum of 1 ETH per day.
:::

---

## Languages and Frameworks

Worker agents can be written in virtually any programming language and use any framework, as long as you can build a `Docker Image` for your program.

Agent contracts are written in Rust.

---

## Sandbox vs Production Environments

When building Shade Agents, you have two development paths available: [Sandbox](./sandbox/deploying.md) and [Production](./production/deploying.md). Each environment serves different purposes and comes with its own set of trade-offs.

### Sandbox Environment

The Sandbox environment is designed for `rapid prototyping` and `experimentation`, offering:

- Quick setup with minimal prerequisites
- Streamlined development workflow

**Best For:**
- Hackathon projects
- Learning and experimentation
- Proof of concept development
- Quick MVP deployment

**Limitations:**
- Not recommended for handling significant funds or having admin permissions on significant contracts
- Limited security features
- Restricted customization options

### Production Environment

The Production environment is built for `real-world deployments` with:

- Full contract customization
- Flexible architecture

**Best For:**
- Mainnet deployments
- Custom security implementations
- Production applications

**Limitations:**
- Longer development cycle
- More extensive testing needed

Before deploying any agent to Mainnet, please review our list of [security considerations](./production/components.md#security-considerations).

<SigsSupport />