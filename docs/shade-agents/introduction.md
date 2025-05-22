---
id: introduction
title: Shade Agents
sidebar_label: What are Shade Agents?
---

import { SigsSupport } from '@site/src/components/sigsSupport';

# What are Shade Agents?

Shade Agents are the first truly `verifiable`, `non-custodial`, `multichain AI agents` with no single point of failure, enabling trust-minimized execution across multiple blockchains without the need for human intermediaries. These agents can autonomously sign transactions, interact with AI models and external data sources, manage assets, and perform privacy-preserving, verifiable computations to offer the flexibility and performance of Web2 with the verifiability of Web3. 

Shade Agents aren't just for personal agents - they power `Agentic Protocols`, an advanced evolution of decentralized applications designed to be autonomous, proactive, and intelligent.

Shade Agents are:
- **AI Powered**\
Verifiably access LLMs. 

- **Multichain**\
Can hold any crypto asset and sign transactions on any chain.

- **Non-custodial**\
No one entity controls the private keys of the agent (MPC signing). 

- **Verifiable**\
Agent code is known and executes as expected; no one can tamper with the agent.

- **Confidential**\
Inputs and state of the agent can be private. 

- **Flexible**\
Interact with off-chain data and APIs beyond blockchain VM limits.

- **Low cost**\
Run intensive computation cheaply without gas limits (~20% TEE overhead compared to standard servers).

:::tip
Take a look at what [you can build](./examples.md) with Shade Agents.
:::


# How do Shade Agents work? 
<br/>
Shade Agents have three main components: a `worker agent`, an `agent smart contract`, and `decentralized key management`. 

![Shade Agent Architecture](/docs/assets/shade-agents/shade-agent-stack-diagram.png)

Worker agents are verifiable off-chain components that run inside of a `TEE` (Trusted Execution Environment). These agents implement the logic of the agent and can interact with any data source, use AI models, and propose multichain transactions to be signed.

The agent contract `verifies` that the worker agent is running inside a TEE and is running the correct code. If verified, the worker agent can now use the agent contract to sign transactions for nearly any blockchain via NEAR's MPC network (a.k.a [Chain Signatures](../chain-abstraction/chain-signatures.md)). 

## Worker Agent 
To run a worker agent, the developer writes a program in any language they prefer, builds a `Docker image` for it, and deploys the image to a TEE. 

<details>

<summary> What is a TEE? </summary>

A trusted execution environment is a secure area of a CPU that runs code in an isolated and protected way. This means we know the expected code is running and its execution is not exposed outside of the enclave. TEEs produce attestations to prove that the code is running within a TEE and that it's running the specified code.

</details>

On startup, the worker agent uses hardware-based entropy and the TEE's Key Management Service to create a unique, in-memory NEAR private key. The key is only stored within the TEE and cannot be accessed outside of the TEE; it is used to derive a NEAR account, which is used for authentication within the agent contract.

The worker agent generates:
- A `remote attestation quote` (which proves it is running inside a genuine TEE).
- The Docker image's SHA256 `code hash` (to prove that the expected code is running).

This information is submitted to the agent contract via a function call.

Once the worker agent is registered, it can now make calls to the agent contract to `request signatures`.

:::tip
`Anyone` can run a worker agent and register it in the agent contract as long as it is running inside a TEE and running the correct code, which ensures the agent is `always live`. With decentralized key management, any correct instance of the worker agent has access to the same multichain accounts. Worker agents are designed to be `stateless` to allow for this.
:::


## Agent Smart Contract

The agent contract verifies worker agents, checks transaction validity, and grants access to MPC signing. When deploying the agent contract, the developer initializes it with the `expected code hash` of valid worker agents.

The agent contract exposes a `register worker` method that receives the `attestation data and code hash`. It then confirms these are valid; if so, it will register the NEAR account ID of the worker agent in the agent contract's storage as a valid worker agent.

The agent contract has `gated methods` that can only be called by valid worker agents. These methods are used to sign `multichain transactions` via the MPC network. 

:::tip
Inside the gated methods, we can add an additional layer of security to tightly restrict the Shade Agent to certain actions. For example, it could restrict the agent to only create transactions on Solana, only be able to perform swaps but no transfers, only be able to transfer a maximum of 1 ETH per day, etc.
:::


## Decentralized Key Management  

`Chain Signatures` allow a NEAR smart contract to sign transactions for any blockchains using the `secp256k1` and `ed25519` signature schemes (EVM, Bitcoin, Solana, Sui, XRP, etc.). Shade Agents use Chain Signatures to have an account on almost any blockchain.

By using decentralized key management, we remove the risk of `key loss or compromise` from utilizing a single TEE. Any valid worker agent instance has access to the same keys.

## Upgradeability 

A developer or protocol may want to change the code that is running inside of the Shade Agent. To do this, the agent contract implements an `upgrade code hash` method to change the stored `worker agent code hash`. Only worker agents running the new code can access the `gated methods`.

:::tip
Upgradeability can be designed to fit the needs of the agent. A common upgrade method would be approving a new code hash via DAO voting or implementing a grace period or cool down, where users can withdraw funds if they are not comfortable with the incoming code hash for the new worker agent.
:::

<SigsSupport />