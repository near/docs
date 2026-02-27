---
id: components
title: Key Components
sidebar_label: Key Components
description: "Learn about the components of a simple Shade Agent."
---

import {Github} from "@site/src/components/UI/Codetabs"
import { SigsSupport } from '@site/src/components/sigsSupport';

In this section, we'll explore the main components of the [quickstart template](https://github.com/NearDeFi/shade-agent-template) to understand how to develop a Shade Agent. We'll also look at how to modify the template to build an agent for your use case.

---

## Template Structure

The template we're using is a simple Shade Agent built with Hono and written in **TypeScript** that acts as a verifiable ETH price oracle. It takes prices from two different APIs, takes the average, and then pushes the price to an Ethereum contract. 

The agent has three main files:
1) [**index.ts**](https://github.com/NearDeFi/shade-agent-template/blob/main/src/index.ts) - This is the entry point that sets up the **Shade Agent Client**, **registers** the agent and defines the routes for the agent. We'll review this file in more detail in the next section.
2) [**transaction**](https://github.com/NearDeFi/shade-agent-template/blob/main/src/routes/transaction.ts) - This is where the core logic of the agent is defined. When this API is called, the agent will build a transaction payload and request a signature from the agent contract. We'll look deeper into this API route later on this page.
3) [**agentInfo**](https://github.com/NearDeFi/shade-agent-template/blob/2.0/src/routes/agentInfo.ts) - This API simply fetches the agent's NEAR account ID and its balance by using the `agent.accountId()` and `agent.balance()` methods from the `shade-agent-js` library.
4) [**ethAccount**](https://github.com/NearDeFi/shade-agent-template/blob/main/src/routes/ethAccount.ts) - This API returns the **Ethereum Sepolia account** that the Shade Agent uses to update the price of Ethereum in the Sepolia contract. This API is used so the user knows which account to fund for gas.

The repo also contains an **agent contract**. We won't review the agent contract as it's the same as the reference implementation [featured here](../../reference/agent-contract.md), but we encourage you to review the reference implementation after this section.

---

## Registering the Agent

First, in the [index.ts](https://github.com/NearDeFi/shade-agent-template/blob/2.0/src/index.ts) file, the **Shade Agent Client** is **initialized**. 

The client is initialized with the following arguments:
- `networkId` is set to `testnet` since the agent contract was deployed to testnet.
- `agentContractId` is set to the agent contract ID and is fetched from the environment variables.
- `sponsor` is set to the sponsor account details from the environment variables. It is used later to fund the agent.
- `derivationPath` is set to the sponsor's private key from the environment variables. For local deployment, this derives a deterministic account ID for the agent, making testing easier (for TEE deployment, this does nothing as ignored). The derivation path needs to be random and private; a private key fulfills this criterion well.

<Github fname="index.ts" language="TypeScript"
    url="https://github.com/NearDeFi/shade-agent-template/blob/2.0/src/index.ts#L36-L46"
    start="36" end="46" />

Next, the agent is **funded** with 0.3 NEAR via the `sponsor` account using the `agent.fund()` method. This is done to ensure the agent has enough NEAR to pay for gas when sending transactions.

<Github fname="index.ts" language="TypeScript"
    url="https://github.com/NearDeFi/shade-agent-template/blob/2.0/src/index.ts#L51-L54"
    start="51" end="54" />

After this, the agent **registers** itself with the agent contract. To make it easier for local deployment, a loop is started that checks if the agent is whitelisted; if not, it will wait for 10 seconds and try again until it's whitelisted, at which point the agent will register.

<Github fname="index.ts" language="TypeScript"
    url="https://github.com/NearDeFi/shade-agent-template/blob/2.0/src/index.ts#L56-L72"
    start="56" end="72" />

Since registrations expire (every 7 days by default), an interval is set to **re-register** the agent every 6 days.

<Github fname="index.ts" language="TypeScript"
    url="https://github.com/NearDeFi/shade-agent-template/blob/2.0/src/index.ts#L75-L85"
    start="75" end="85" />

The agent is now registered and ready to sign transactions.

---

## Signing Transactions

In the [transaction API Route](https://github.com/NearDeFi/shade-agent-template/blob/main/src/routes/transaction.ts), the `agent.call()` method from the `shade-agent-js` library is used to call a function on the agent contract.

In this example, the agent is calling the `request_signature` function on the agent contract. This function takes a transaction payload for nearly any blockchain and requests a signature via [Chain Signatures](../../../../chain-abstraction/chain-signatures/implementation.md). Here, we're signing a transaction to call an Ethereum contract to update the stored price of ETH. First, we retrieve the price of ETH (in this example, the function queries two different APIs and calculates the average).

<Github fname="transaction.ts" language="TypeScript"
    url="https://github.com/NearDeFi/shade-agent-template/blob/2.0/src/routes/transaction.ts#L25"
    start="25" end="25" />

Next, we build the **transaction payload** to be signed. To do this, we're using the `chainsig.js` library.
Using this library, we:
1. **Derive the Ethereum address** that will be sending the transaction. This function takes the agent contract account ID since this is the predecessor account that is calling the Chain Signatures [MPC contract](https://github.com/Near-One/mpc/tree/main/libs/chain-signatures/contract), and a path. The path can be whatever string you like; different paths will derive different addresses.
2. Create the `data`. This is what action we're performing, in this case, a function call to update the price in the contract.
3. **Build the transaction and the transaction payload** by inputting the derived address, the target Ethereum smart contract, and the data.

<Github fname="transaction.ts" language="TypeScript"
    url="https://github.com/NearDeFi/shade-agent-template/blob/2.0/src/routes/transaction.ts#L68-L84"
    start="68" end="84" />

Once we have the payload (also known as the hash), we can call the `request_signature` function on the agent contract to sign the transaction. We specify the `keyType` as `Ecdsa` as we're signing for a blockchain that uses the **secp256k1** signature scheme.

<Github fname="transaction.ts" language="TypeScript"
    url="https://github.com/NearDeFi/shade-agent-template/blob/2.0/src/routes/transaction.ts#L37-L44"
    start="37" end="44" />

The result is the **signature**.

We then attach the signature to the Ethereum transaction and broadcast it to the target network.

<Github fname="transaction.ts" language="TypeScript"
    url="https://github.com/NearDeFi/shade-agent-template/blob/2.0/src/routes/transaction.ts#L47-L54"
    start="47" end="54" />

---

## Modifying This Template 

### Using Different Chains

We set up a **chain adapter** for Ethereum Sepolia in the [Ethereum.ts](https://github.com/NearDeFi/shade-agent-template/blob/main/src/utils/ethereum.ts) file using the `chainsig.js` library. This library allows us to easily construct transaction payloads to be signed by the agent.

<Github fname="ethereum.ts" language="TypeScript"
    url="https://github.com/NearDeFi/shade-agent-template/blob/2.0/src/utils/ethereum.ts#L42-L51"
    start="42" end="51" />

You can set up chain adapters for a variety of chains, including NEAR, EVM, Bitcoin, Solana, SUI, XRP, and Cosmos, to allow your agent to interact with multiple different chains. You can see a full list of the chains currently supported [here](https://github.com/NearDeFi/chainsig.js/tree/main?tab=readme-ov-file#supported-chains), but feel free to contribute any chain that is not yet supported.

Implementation details differ slightly from chain to chain; as such, we recommend you review our [chain signature docs](../../../../chain-abstraction/chain-signatures/implementation.md). Note that step 3 of requesting a signature is different; we use the `agent.call()` method from `shade-agent-js` instead.

If you are using a chain that uses the **ed25519** signature scheme (NEAR, Solana, SUI, Aptos, etc.), you should specify the `keyType` as `Eddsa` when calling `request_signature`.

### Implementing Guardrails 

As you move into production, it's recommended to implement on-chain guardrails in your agent contract to prevent malicious actions even if the TEE is compromised. You can read more about guardrails [here](../../concepts/terminology.md#on-chain-guardrails).

---

## Next Steps

Now that you've explored the basics of Shade Agents, we recommend diving deeper into the [framework overview](../../concepts/framework-overview.md) to understand the core components for building production-ready Shade Agents.

<SigsSupport />