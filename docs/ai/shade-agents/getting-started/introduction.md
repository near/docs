---
id: introduction
title: Shade Agents
sidebar_label: What are Shade Agents?
description: "Learn about Shade Agents - decentralized and trustless AI agents that control accounts and assets across multiple blockchains using TEEs and NEAR's decentralized key management."
---

import { SigsSupport } from '@site/src/components/sigsSupport';

The Shade Agent Framework allows developers to build decentralized and trustless AI agents that control accounts and assets across multiple blockchains.

Previous Web3 agents fall into one of two categories:
1. They are trustless and verifiable by using a trusted execution environment (TEE), but if the TEE goes down, the private keys and funds of the agent are lost.
2. The agent’s accounts are persistent, but the agents are centralized.

Shade Agents provide verifiability and non-custody by operating in TEEs, but also persistent control of accounts by using NEAR's decentralized key management. Any instance of an agent running the same code inside a TEE can access the same accounts meaning you don't need to worry about private keys being lost or exposed. 

Thanks to combining TEEs with the NEAR tech stack, Shade Agents can autonomously sign transactions across any chain, interact with AI models and external data sources, manage assets, and perform privacy-preserving, verifiable computations, offering the flexibility and performance of Web2 with the verifiability of Web3.

:::info
Shade Agents power [Agentic Protocols](../concepts/what-can-you-build.md#agentic-protocols): a new type of decentralized application designed to be autonomous, proactive, and intelligent.
:::

---

## How do Shade Agents work?

Shade Agents consist of two main components: the `agent` and the `agent smart contract`.

![Shade Agent Architecture](/assets/docs/ai/shade-agent-stack-diagram.png)

When an agent is booted up in a TEE, the `TEE's hardware-based entropy` generates a random private key and account. This private key is exclusively used to call the agent contract, not for storing funds.

<details>

<summary>What is a TEE?</summary>

A trusted execution environment is a secure area of a CPU that runs code in an isolated and protected way. This means one can verify that the expected code is running and its execution is not exposed outside of the enclave. TEEs produce attestations to prove that the code is running within a TEE and that it's running the specified code.

</details>

The agent calls the `register_agent` function on the `agent smart contract`, providing two pieces of information generated inside the TEE:
- A `remote attestation quote` (which proves it is running inside a genuine TEE).
- The Docker image's SHA256 `code hash` (to prove that the expected code is running).

If the attestation quote is valid and the code hash matches the expected code hash of the agent (defined during the agent contract's deployment), the agent's account is approved as a valid agent inside the agent contract.

Once registered, the `agent` can call the `request_signature` function on the agent contract, enabling it to sign transactions on behalf of the Shade Agent. `request_signature` leverages [chain signatures](../../../chain-abstraction/chain-signatures.md) for decentralized key management, allowing the Shade Agent to hold assets and sign transactions on nearly any chain.

`Anyone` can deploy the same Docker image of the `agent` to a different TEE. Since the Docker image will have the same code hash, it can then be registered as a new valid agent, and thus gain access to signing transactions using the Shade Agent's accounts. This means the accounts are persisted across different TEE instances. To facilitate this functionality, agents are designed to be stateless.

---

## Agent Contract Functions

The Agent Contract has three main functions:

#### Approve Code Hash

After the contract is deployed, a `code hash` is set to ensure that only agents running the correct code (i.e. it has the same code hash) can be registered in the agent contract.

Developers or protocols may need to modify the code running inside agents over time. Because of this, when the contract is initialized an `owner` account ID is set. Only the owner can approve a new `code hash`.

The `shade-agent-cli` handles the deployment of the agent contract and automatically approves the code hash of your agent.

:::tip
Upgradeability can be designed for the specific use case. Common upgrade methods include approving a new code hash through DAO voting or implementing a grace period or cool down, allowing users to withdraw funds if they're uncomfortable with the incoming code hash for the new agent.
:::

#### Register Agent

The `register_agent` function verifies that the agent is running in a TEE and executing the expected code (as defined by the approved code hash). Upon successful verification, the agent's account ID becomes registered and gains access to transaction signing (request_signature).

The `shade-agent-api` automatically registers the agent when booting up in the TEE.

#### Request Signature

The `request_signature` function serves as the gateway to access the Shade Agent's multichain accounts and sign transactions. It employs `method access control` so that only registered agents can use this function. 

:::tip
Developers should not sign transactions from the agents themselves (except for functions on the agent contract) as these accounts will be lost if the agent goes down. The magic of Shade Agents is that the multichain accounts are tied to the agent contract, which are persistent and accessible by any instance of a valid agent.
:::

The request signature function accepts three arguments:
- The transaction `payload` - a hash of the transaction to be signed.
- The `derivation path` - a string that modifies the address on the target chain being used. Shade Agents can access a near-unlimited number of accounts, and the account being used can be changed by modifying the path. The same path will always map to the same account for a given agent contract.
- The `key version` - sets the signature scheme required for the transaction. Shade Agents can sign transactions for any blockchain using the `secp256k1` and `ed25519` signature schemes (EVM, Bitcoin, Solana, Sui, XRP, etc.).

The `shade-agent-api` exposes the `requestSignature` function to sign transactions on behalf of the Shade Agent within your agent.

:::tip
Within agent gated functions, you can implement an additional layer of security to strictly limit the Shade Agent's actions. For example, it could be restricted to only create transactions for Solana, perform swaps but not transfers, or transfer a maximum of 1 ETH per day.
:::

---

## Languages and Frameworks

The agent is just a backend service that runs inside a TEE instead of a centralized server. You can run the agent on an internal cron job, respond to actions, or it can expose API routes that can be called.

Agents can be written in virtually any programming language and use any framework, as long as you can build a `Docker image` for your program.

If you require a custom agent contract, which not all use cases do, then these are written in Rust.

---

## Next Steps 

Now that you've learned what Shade Agents are and why they're powerful, head to the [quickstart](./quickstart/deploying.md) to deploy your first agent and see how to build them.

<SigsSupport />