---
id: introduction
title: Shade Agents
sidebar_label: What are Shade Agents?
---

# What are Shade Agents?

Shade Agents are the first verifiable, non-custodial, multichain AI agents with no single point of failure. 

Shade Agents are:
- **AI Powered**\
Verifiably access LLMs. 

- **Multichain**\
Can custody any crypto asset and sign transactions on any chain.

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


# How do Shade Agents work? 

Shade Agents have three components: a `worker agent`, a `smart contract` and `decentralized key management`. 

Picture 


Worker agents are verifiable off-chain components that run inside of `TEE` (Trusted Execution Environment). These agents can interact with any data source, use AI models and propose transactions on any blockchain.

The smart contract verifies that the worker agent is running inside of a TEE is running the correct code. If verified, the worker agent is able to use the smart contract to sign transactions for nearly any blockchain via NEAR's MPC network (a.k.a [Chain Signatures](../chain-abstraction/chain-signatures.md)). 

:::tip
Anyone can run a worker agent and register it in the contract as long as it is running inside of a TEE and running the correct code, this ensures the agent is always live. With decentralized key management any correct instance of the worker agent has access to the same multichain accounts. The worker agents are designed to be stateless to allow for this.
:::

## Worker Agent 
To run a worker agent, the developer writes a program in any language they prefer, builds a Docker image for it, and deploys the image to a TEE. Anyone can run an instance of the worker agent for a Shade Agent to remove a single point of failure. 

<details>

<summary> What is a TEE? </summary>

A trusted execution environment is a secure area of a CPU that runs code in isolated and protected way. This means the expected code is running and its execution is not exposed outside of the enclave. TEEs  produce attestations to prove that the code is running within a TEE and that is running the specified code.

</details>

Upon startup, the Worker Agent uses hardware-based entropy and the TEE’s Key Management Service to create a unique, in-memory NEAR private key. The key is only stored within the TEE, and cannot be accessed outside of the TEE; it is used to derive a NEAR account which is used for authentication within the smart contract.

The worker agent generates:
- A remote attestation quote (which proves it is running inside a genuine TEE).
- The Docker images's SHA256 code hash (to prove that the expected code is running).

This information is submitted to the NEAR smart contract via a function call.

### Smart Contract

The smart contract verifies worker agents, checks transaction validity and grants access to MPC signing. When deploying the smart contract the developer initializes it the expected code hash of valid worker agents.

The smart contract exposes a method (e.g. `register_worker`) that receives the attestation data and code hash. It then confirms these are valid, if so then it will register the derived NEAR account id of the worker agent in the contracts storage as a valid worker agent.

The contract can now restrict methods to only be called by valid worker agents. These methods are used to sign multichain transactions via the MPC network. 

:::tip
The restricted methods can act as an additional layer of security to tightly restrict the Shade Agent to certain calls. For example it could restrict the agent to only create transactions on Solana, only be able to perform swaps but no transfers, only be able to transfer a maximum of 1 ETH per day, etc.
:::


### Decentralized Key Management  

Chain Signatures allow a NEAR smart contract to sign transactions for any blockchains using the `secp256k1` and `ed25519` signatures schemes (EVM, Bitcoin, Solana, Sui, XRP, etc.). Shade Agents use Chain Signatures to have an account on almost any blockchain.

By using decentralized key management it removes the risk of key loss or compromise from utilizing a single TEE. Any valid worker agent instance has access to the same keys.

### Upgradeability 

A developer or protocol may want to upgrade the code that is running inside of the Shade Agent. To do this the smart contract can implement an `upgrade code hash` function to change the stored worker agent code hash. Only worker agents running the new code can access the restricted methods.

:::tip
Upgradeability can be designed to fit the needs of the agent. A common upgrade method would be approving a new code hash via DAO vote or implementing a grace period.
:::