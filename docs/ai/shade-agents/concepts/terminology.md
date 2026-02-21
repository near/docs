---
id: terminology
title: Terminology
sidebar_label: Terminology
description: "Learn the key terms and concepts used in the Shade Agent Framework."
---

Below are the main terms and concepts used in the Shade Agent Framework.

---

## Shade Agent Framework

The Shade Agent Framework is a suite of tools for creating Web3 agents and off-chain services that are trust-minimized, decentralized, and verifiable. It leverages on-chain signing to allow agents to to hold assets and sign transactions on most blockchains and implement strict guardrails to prevent unauthorized actions.

It includes the Shade Agent API, the Shade Agent CLI, and an agent contract template. The framework aims to abstract most of the underlying TEE and blockchain interactions so you can focus on building your application.

---

## Shade Agent

A Shade Agent is an application built using the Shade Agent Framework. See the [what can you build section](../getting-started/introduction.md#what-can-you-build) for some examples.

---

## Agent

In the Shade Agent Framework, an agent is a single instance of the off-chain code running inside a TEE (or locally in development) that uses the Shade Agent API. One agent contract can have many registered agents: they may run the same code for redundancy or different code for different tasks.

---

## Agent's account

The agent’s account is the NEAR account ID that represents that agent on-chain. It is an implicit account (64-character hex) derived from the agent's ephemeral private key, meaning the private key and account ID are unique to the agent, and change each time the agent reboots. In local mode you can set the agents account ID to be deterministic to avoid re-whitelisting or re-funding the agent on each run.

---

## Agent contract

The agent contract is the on-chain NEAR smart contract that authorizes agents, enforces guardrails and gives agents access to on-chain signing. Agents must provide a valid attestation, have valid measurements, a valid PPID and not be expired to have access to on-chain signing. 

---

## On-chain guardrails

On-chain guardrails are restrictions that are enforced on the agent contract to prevent unauthorized actions even if the TEE is compromised. Examples include limiting transactions to specific functions, smart contracts, blockchains or amounts. Guardrails are usually implemented using the [omni-transaction-rs](https://github.com/Omni-rs/omni-transaction-rs) library.

---

## On-chain signing 

The agent contract can sign transactions for most chains via NEAR's [chain signatures](../../../chain-abstraction/chain-signatures.md) service, it's accessed by making cross contract calls to the MPC contract. All assets and state of the Shade Agent should be tied to the agent contract not the agent's account since agent's keys are ephemeral. 

---

## TEE

A trusted execution environment is a secure part of a CPU that runs code in an isolated and protected way. Execution and state stay private, including from the host. TEEs produce cryptographic attestations that prove it's running certain code inside a genuine TEE.

---

## Local

Local mode means the agent runs on your machine (or any non-TEE environment) instead of inside a TEE. There is no real attestation, and the contract uses a whitelist of allowed account IDs instead. Use local mode for development and testing only, not for production.

---

## Registering an agent

An agent registers with an agent contract by calling the `register_agent` method, which verifies it has a valid attestation. On successful registration the agent will be stored in the contract's state with its measurements, PPID, and validity period. 

---

## Whitelisted accounts

The whitelist is a set of NEAR account IDs that are allowed to register when the agent contract is in local mode. Because the contract cannot verify code or hardware in local mode, it instead restricts access to specific account IDs.

---

## Valid agent

A valid agent is one that is registered with the agent contract and still has measurements and a PPID that are approved, and its registration has not expired. Valid agents can call agent-gated methods.


---

## Attestation

An attestation is a cryptographic proof produced by a TEE that the application is running inside a genuine TEE. The agent submits its attestation when registering with the agent contract, and the contract verifies that it's a genuine attestation, and checks that the attestation contains a set of approved measurements and an approved PPID.

---

## Approved measurements

The measurements are hashes that uniquely identify the code running in the TEE, and the platform it's running on. The agent contract stores a list of approved measurements, which can be updated by the owner of the contract. There are 6 measurements: 
- **MRTD**: measures the initial setup of the trusted domain. This is constant.
- **RTMR0**: measures the virtual hardware. This is constant for a given number of vCPUs and memory allocation.
- **RTMR1**: measures the kernel. This is constant.
- **RTMR2**: measures the Dstack image version. This is constant for a given Dstack image version.
- **Key provider digest**: measures the key provider of the TEE. By default, Shade Agents contain Phala's key providers but don't actually use it since it uses a chain signatures for decentralized key management instead. This is constant for Phala's key provider.
- **App compose hash**: measures the application. This is constant for a given Docker Compose file and app layer configurations.

---

## PPID

The PPID (Provisioning Platform ID) is a unique identifier of a physical TEE machine. Recent exploits of TEEs have been due to attackers having physical access to the machine, revealing that the physical location of the machine is important in TEE security. By setting approved PPIDs, the agent contract can ensure that only agents running on specific machines can register. You should approve PPIDs for machines known to be located in secure data centers. By default, the CLI approves all PPIDs for Phala Cloud.

Note that on Phala Cloud, two different deployments can have the same PPID if they are running on the same server, since resources are virtualized.

---

## Docker

Docker is used in the Shade Agent Framework to deploy agents to TEEs.

- The Dockerfile defines how to build a single image for your agent (dependencies, entrypoint, etc.). The CLI uses it when building the image.
- The Docker image is a single packaged application for your agent.
- The Docker Compose file defines the full application stack of the agent that runs in the TEE. It defines the images for the agent, the allowed environment variables, ports, volumes, etc.

---

## Phala Cloud

Phala Cloud is a cloud provider for hosting applications inside Trusted Execution Environments. The Shade Agent Framework uses it as its default hosting provider for agents.

---

## DStack

DStack is a framework for running and proving applications inside of Trusted Execution Environments that Phala Cloud uses. The Shade Agent Framework only supports Dstack environments either on Phala Cloud, your own hardware or other providers.