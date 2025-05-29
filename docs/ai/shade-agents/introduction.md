---
id: introduction
title: Shade Agents
sidebar_label: What are Shade Agents?
---

import { SigsSupport } from '@site/src/components/sigsSupport';

# What are Shade Agents?

Shade Agents are an AI agent framework to create verifiable agents that can control accounts across multiple blockchains with the assurance that the agent cannot lose access to its accounts and that its private keys will never be revealed. They are the first truly **verifiable**, **non-custodial**, **multichain AI agents** with no single point of failure.

Current Web3 agents fall into one of two camps:
1. They are trustless and verifiable by creating and using a private key within a trusted execution environment (TEE), but if the TEE goes down, the accounts and funds are lost.
2. The accounts are persistent, but the agents are centralized.

Shade Agents provide verifiability, non-custody, and persistent accounts by operating in TEEs and implementing decentralized key management. Any agent running with the same code inside a TEE can access the same accounts.

These agents can autonomously sign transactions across any chain, interact with AI models and external data sources, manage assets, and perform privacy-preserving, verifiable computations, offering the flexibility and performance of Web2 with the verifiability of Web3.

:::info
Shade Agents power [Agentic Protocols](./examples.md#agentic-protocols): a new type of decentralized application designed to be autonomous, proactive, and intelligent.
:::

---

## How do Shade Agents work?

Shade Agents consist of two main components: a `worker agent` and an `agent smart contract`.

![Shade Agent Architecture](/docs/assets/shade-agents/shade-agent-stack-diagram.png)

When a worker agent is booted up in a TEE, the `TEE's hardware-based entropy` generates a random private key and account. This private key is exclusively used to call the agent contract, not for storing funds.

The worker agent calls the `register_worker` function on the agent contract, providing two pieces of information generated inside the TEE:
- A `remote attestation quote` (which proves it is running inside a genuine TEE).
- The Docker image's SHA256 `code hash` (to prove that the expected code is running).

If the attestation quote is valid and the code hash matches the expected code hash of the worker agent (defined during agent contract deployment), the worker agent's accounts are added to a list of valid worker agents.

Once registered, the worker agent can call the `sign_tx` function on the agent contract, enabling it to sign transactions on behalf of the Shade Agent. The Shade Agent utilizes [chain signatures](../../chain-abstraction/chain-signatures.md) for decentralized key management, allowing it to hold assets and sign transactions on nearly any chain.

`Anyone` can deploy the same Docker image of the worker agent to a TEE and have it register as a valid worker agent and access the sign_tx function to use the same accounts. This means the accounts are never lost and the service is `always live`. Worker agents are designed to be stateless to facilitate this functionality.

<details>

<summary>What is a TEE?</summary>

A trusted execution environment is a secure area of a CPU that runs code in an isolated and protected way. This means we know the expected code is running and its execution is not exposed outside of the enclave. TEEs produce attestations to prove that the code is running within a TEE and that it's running the specified code.

</details>

---

## Agent Contract Functions

The Agent Contract has three main functions:

#### Approve Code Hash

After contract deployment, a `code hash` is set to ensure that only worker agents running the correct worker code can register.

Developers or protocols may need to modify the code running inside worker agents. When the contract is first deployed, it's initialized with an `owner` account Id. Only the owner can call the approve code hash function to update the worker agent code.

:::tip
Upgradeability can be designed to meet the agent's requirements. Common upgrade methods include approving a new code hash through DAO voting or implementing a grace period or cooldown, allowing users to withdraw funds if they're uncomfortable with the incoming code hash for the new worker agent.
:::

#### Register Worker

The register worker function verifies that the worker agent is running in a TEE and executing the expected code. Upon successful verification, the worker agent's account Id becomes registered and gains access to `gated functions` (sign_tx).

#### Sign Tx

The `sign_tx` function serves as the gateway to access the Shade Agent's multichain accounts and sign transactions. It employs `method access control` so that only valid worker agent account Ids are able to use this function. Developers should not sign transactions from the worker agents themselves (except for functions on the agent contract) as these accounts will be lost if the worker agent goes down. The magic of Shade Agents is that the multichain accounts are tied to the agent contract, which are persistent and accessible by any instance of a valid worker agent.

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

<SigsSupport />