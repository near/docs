---
id: security
title: Security Considerations
sidebar_label: Security Considerations
---

import { SigsSupport } from '@site/src/components/sigsSupport';

Please review this list of security considerations before deploying a Shade Agent to Mainnet.

---

## Duplicate Actions

To ensure liveness, the Shade Agent should consist of multiple identical agents hosted by different providers/on different hardware. When multiple agents are running, all agents will respond to updates (user inputs, agent pings, API updates, etc.) or will create the same action whilst running on a cron. You must ensure that the Shade Agent collectively performs the desired action only `once` in response to each update.

Consider a Kaito Mindshare Trading Agent as an example. If Solana's mindshare increases relative to NEAR, the agent would swap SOL for NEAR. With two agents running, you must ensure this swap doesn't occur twice.

This logic is typically best implemented within the agent contract or a target smart contract being interacted with.

---

## Restricting Actions

While TEEs are considered trusted and tamper-resistant, implementing tight restrictions or `guard rails` on agent actions within the agent contract is recommended so that even if the private key to a agent was extracted funds can't be withdrew.

Examples of restrictions could be:
- The agent contract can only build transactions for a list of functions and smart contract addresses.
- The agent contract can only build transactions for specific chains.
- The agent contract can only build transactions that swap or send up to 0.1 ETH per 24 hours.

We recommend using the [omni-transactions-rs](https://github.com/near/omni-transaction-rs) library to build transactions within your agent contract rather than in the agent.

If the Shade Agent's multichain accounts do not hold funds themselves, but  is approved to 

Another solution is for the Shade Agent's multichain accounts to not hold funds themselves, but the Shade Agent accounts be a restricted admin on a contract on the target chain.

---

## Failed or Unsent Transactions

A successful MPC signature on a transaction payload doesn't guarantee the transaction's success or transmission. Transactions may fail for various reasons, such as network congestion, incorrect nonce, or insufficient gas.

We suggest you build your agent in such a way that if the transaction fails, then a new signature can be requested without allowing for signing when the transaction is successful. 

For some use cases, it may be beneficial to emit signed transactions from your agent contract, allowing anyone or an indexer to relay them if your agent fails to retrieve the result. Signed transactions can be built using [omni-transactions-rs](https://github.com/near/omni-transaction-rs). Exercise caution with unsent signatures.

---

## Parallel Transactions

Building on the above, the MPC signing a transaction payload doesn't change any nonce or state on the destination chain. So if you'd like to create an agent that can issue several parallel transactions, you will have to have an intimate knowledge of the destination chain and increment nonces for the derived accounts that you're generation signatures for.

This can cause a lot of issues in the EVM world, for example: Transactions can get stuck in the mempool if the nonce used is not in sequential order. A transaction with a higher nonce will remain pending if a previous transaction (with a lower nonce) hasn't been processed.

If your agent frequently tries to sign multiple transactions in parallel with the MPC, then you must keep track of which transactions are successful and handle failures appropriately so that all transactions eventually are included in blocks of the destination chain.

---

## Restricting Agent API Routes

In the quickstart, our agent can take an API request from anyone. In a lot of cases, a Shade Agent will run on a loop responding to actions or data every set time period. If using API routes, you need to design your agent to only perform the action when the desired condition is met or do some sort of verification or authentication inside the route, for example, a user has signed an action with their wallet, or they are logged in from their Google account.

---

## Trusting RPCs

Inside an agent, it is common to want to query the state of the blockchain and perform actions based on the state. Since RPCs can lie about the state of the blockchain and do not have crypto-economic security, we suggest you design your agent to defend against this. Below are some solutions, which solution you use will differ depending on your use case and the design of your agent:

#### Verifying the State 

In some cases, you will be able to submit the state back to the smart contract from which the state was queried and verify that it matches the actual state. For example, take a DAO on Ethereum that uses AI to vote on proposals. When a proposal goes live, the agent indexes the proposal, makes a decision on the proposal using an LLM, and then submits the yes/no decision back to the DAO. The agent should also submit a hash of the proposal back to the DAO, so the DAO can verify that the decision was made based on the true state of the blockchain.

#### Trustless Providers 

You can use RPC providers that leverage cryptographic proofs or run in TEEs themselves to know that the result is the true state of the blockchain.

#### Multiple Reputable Providers 

You can use multiple reputable RPC providers (like Infura and Alchemy) and check the result across each provider to make sure they match.
 

<SigsSupport />