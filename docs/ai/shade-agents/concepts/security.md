---
id: security
title: Security Considerations
sidebar_label: Security Considerations
description: "Learn key security practices when deploying Shade Agents, including preventing duplicate actions, handling failed or unsent transactions, restricting API routes, removing agent contract keys, removing local deployment, approved measurements limits, public logs, storing agent keys, public PPIDs, fixed Docker images, trusting RPCs, and verifying the state."
---

import { SigsSupport } from '@site/src/components/sigsSupport';

:::warning
The Shade Agent Framework has not yet undergone a formal audit.

No representations or warranties are made regarding security, correctness, or fitness for any purpose. Use of this software is entirely at your own risk.
:::

---

## Restricting Actions

While TEEs are considered trusted and tamper-resistant, implementing tight restrictions or **guardrails** on agent actions within the agent contract is recommended so that even in the event a TEE is compromised and the private key to an agent is extracted, funds can't be withdrawn. You can read more about guardrails [here](terminology.md#on-chain-guardrails).

---

## Preventing Duplicate Actions

To ensure liveness, a Shade Agent should consist of multiple identical agents hosted by different providers/on different hardware. When multiple agents are running, all agents will respond to triggers (user inputs, cron jobs, API calls, etc.). You must ensure that the Shade Agent collectively performs the desired action only **once** in response to each update.

Consider a mindshare trading agent as an example. If Solana's mindshare increases relative to NEAR, the agent would swap SOL for NEAR. With two agents running, you must ensure this swap doesn't occur twice.

This logic is typically best implemented within the agent contract by only allowing one agent to perform the action at a time.

---

## Handling Failed or Unsent Transactions

A successful MPC signature on a transaction payload doesn't guarantee the transaction's success or transmission. Transactions may fail for various reasons, such as network congestion, incorrect nonce, or insufficient gas.

It's suggested you build your agent in such a way that if the transaction fails, then a new signature can be requested without allowing for more signing for the same action when the transaction is successful.

For some use cases, it may be beneficial to emit signed transactions from your agent contract, allowing anyone or an indexer to relay them if your agent fails to retrieve the result. Signed transactions can be built using [omni-transactions-rs](https://github.com/near/omni-transaction-rs). Exercise caution with unsent signatures.

---

## Restricting API Routes

In the quickstart, the agent can take an API request from anyone, allowing someone to drain the funds from the agent's account and the Ethereum Sepolia account through gas expenditure. If using API routes, you need to design your agent to only perform the action when the desired condition is met or implement authentication inside the route, for example, a user has signed an action with their wallet or they are logged in from their Google account.

---

## Removing Agent Contract Keys

Before deploying your agent contract to production, you should ensure that all **access keys** to the agent contract account have been removed. Otherwise, this would allow the access key owner to withdraw the funds held by the Shade Agent. This can be done using the CLI.

In the agent contract reference implementation, the contract code, approved measurements, and PPID can be updated by the owner. It's recommended that the owner be a **multisig**.

---

## Removing Local Deployment

When deploying to production, it's recommended to remove the **local deployment flow** from the agent contract entirely. Strip out the code that supports local mode (whitelist checks, default measurements, and PPID for local, and any `requires_tee: false` branches) so the contract only accepts TEE attestations. That way, there is no way to misconfigure or re-enable local mode, and no code path that trusts a whitelist instead of attestation.

---

## Approved Measurements Limits

The attestation verification process iterates over all approved measurements and verifies that the TEE's measurements match the approved measurements. If the approved measurements list grows too large, registration could fail due to the function call running into the **gas limit**. It's recommended to limit the number of approved measurements to a reasonable number.

---

## Public Logs

By default, the Shade Agent CLI deploys the agent with **public logs** enabled. You should not emit any sensitive information in the logs when this is enabled.

---

## Storing Agent Keys

The agent's **ephemeral keys should not be stored** anywhere, including on the host machine. This could lead to code that is not approved in the contract accessing keys that are approved in the contract.

---

## Public PPIDs

All PPIDs that are approved in the agent contract are made **public**. If you are using your own hardware, consider whether you are comfortable with its PPID being public since it could be used to track your hardware.

---

## Fixed Docker Images

Never reference Docker images by `latest` (e.g. pivortex/my-first-agent:latest) in your **Docker Compose** file; this can lead to different images being loaded in the TEE for the same measurements. Always reference versions of the image you want to use via **hash** (e.g. pivortex/my-first-agent@sha256:bf3faac9793f0fb46e89a4a4a299fad69a4bfd1e26a48846b9adf43b63cb263b).

---

## Trusting RPCs

Inside an agent, it's common to want to query the state of the blockchain and perform actions based on the state. Since **RPCs can lie** about the state of the blockchain and do not have crypto-economic security, it's suggested you design your agent to defend against this. Below are some solutions, which solution you use will differ depending on your use case and the design of your agent:

### Verifying the State

In some cases, you will be able to submit the state back to the smart contract from which the state was queried and verify that it matches the actual state. For example, the verifiable DAO example submits a hash of the proposal back to the DAO, so the DAO can verify that the decision was made based on the true state of the blockchain.

### Trustless Providers

You can use RPC providers that leverage cryptographic proofs or run in TEEs themselves to know that the result mirrors the true state of the blockchain.

### Multiple Reputable Providers

You can use multiple reputable RPC providers and check the result across each provider to make sure they match.

<SigsSupport />


