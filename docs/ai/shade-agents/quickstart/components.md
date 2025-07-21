---
id: components
title: Key Components
sidebar_label: Key Components
---

import {Github} from "@site/src/components/codetabs"
import { SigsSupport } from '@site/src/components/sigsSupport';

In this section, we'll explore the main components of the [quickstart template](https://github.com/NearDeFi/shade-agent-template) and how you can modify it to build your own agent.

---

## Template Structure

The template we're using is a simple Shade Agent built with Hono and written in TypeScript that acts as a verifiable ETH price oracle. It takes prices from two different APIs, takes the average, and then pushes the price to an Ethereum contract. The template also comes with a frontend to make it easier to interact with the Shade Agent.

The project has three different APIs:
1) [**agentAccount**](https://github.com/NearDeFi/shade-agent-template/blob/main/src/routes/agentAccount.ts) - This API simply fetches the agent's NEAR account Id and its balance by using the `agentAccountId` and `agent("getBalance")` functions from the `shade-agent-js` library.
2) [**ethAccount**](https://github.com/NearDeFi/shade-agent-template/blob/main/src/routes/ethAccount.ts) - This API returns the `Ethereum Sepolia account` that the Shade Agent uses to update the price of Ethereum in the Sepolia contract. This API is used so the user knows which account to fund for gas.
3) [**transaction**](https://github.com/NearDeFi/shade-agent-template/blob/main/src/routes/transaction.ts) - This is where the core logic of the agent is defined. When this API is called, the agent will build and sign a transaction. We'll look deeper into this API route in the next part.

---

## Signing Transactions

In the [transaction API Route](https://github.com/NearDeFi/shade-agent-template/blob/main/src/routes/ethAccount.ts), we can see how we use the `requestSignature` function from the `shade-agent-js` library so the Shade Agent can sign a multichain transaction.

In this example, we're signing a transaction to call an Ethereum contract to update the stored price of ETH. First, we retrieve the price of ETH (in this example, the function queries two different APIs and calculates the average).

<Github fname="transaction.ts" language="javascript"
    url="https://github.com/NearDeFi/shade-agent-template/blob/main/src/routes/transaction.ts#L25"
    start="25" end="25" />

Next, we build the transaction and `transaction payload` to be signed. To do this, we're using the `chainsig.js library`. 
Using this library, we:
1. `Derive the Ethereum addresses` that will be sending the transaction. This function takes the agent contract account Id since this is the predecessor account that is calling the Chain Signatures [MPC contract](https://github.com/Near-One/mpc/tree/main/libs/chain-signatures/contract), and a path. The path can be whatever string you like, different paths will derive different addresses.
2. Create the `data`. This is what action we're performing, in this case, a function call to update the price in the contract.
3. `Build the transaction and the transaction payload` by inputting the derived address, the target Ethereum smart contract, and the data.

<Github fname="transaction.ts" language="javascript"
    url="https://github.com/NearDeFi/shade-agent-template/blob/main/src/routes/transaction.ts#L64-L80"
    start="64" end="80" />

Once we have the payload (also known as the hash), we can call the `requestSignature` function to sign the transaction.

<Github fname="transaction.ts" language="javascript"
    url="https://github.com/NearDeFi/shade-agent-template/blob/main/src/routes/transaction.ts#L37-L40"
    start="37" end="40" />

The result is the `signature`.

We then attach the signature to the Ethereum transaction and broadcast it to the target network.

<Github fname="transaction.ts" language="javascript"
    url="https://github.com/NearDeFi/shade-agent-template/blob/main/src/routes/transaction.ts#L44-L50"
    start="44" end="50" />

---

## Modifying this Example

The simplest way to create your own Shade Agent is to modify the example template and alter the transaction payload being signed in the [transaction.ts](https://github.com/NearDeFi/shade-agent-template/blob/main/src/routes/transaction.ts) API route. 

The `requestSignature` function supports signing for any blockchain that uses the `secp256k1` and `ed25519`signature scheme (Bitcoin, Ethereum, Solana, Sui, Doge, Cosmos, etc.). This function supports any arbitrary payload, allowing you to send multiple different transaction payloads through this function. By default, the `requestSignature` function signs for the `secp256k1` scheme. To switch to `ed25519`, specify the `keyType` in the arguments of the call as `Eddsa`.

In this example, we're using the [chainsig.js library](https://neardefi.github.io/chainsig.js/), which supports transaction building for several different chains. By defining a different [chain adapter](https://github.com/NearDeFi/shade-agent-template/blob/main/src/utils/ethereum.ts#L42-L51) and setting a different RPC provider, you can easily start building transactions for other chains the library supports.

Review our [chain signature docs](../../../chain-abstraction/chain-signatures/implementation.md) for building transactions to learn how to integrate different chains. Note that step 3 of requesting a signature differs here; instead, we use the `requestSignature` function from the `shade-agent-js`.

:::tip
If you're seeking inspiration for what to build, consider reviewing our [ideas page](../examples.md).
:::

---

## How the Quickstart Works

The Shade Agent Framework abstracts away a lot of the complexity of deploying a Shade Agent. Here we will illuminate key parts of how the deployment flow works. There are different flows for local and TEE deployment, which are selected by changing the contract prefix to `ac-proxy.` and `ac-sandbox.`, respectively.

### Local Deployment 
1) A `fake agent contract` is deployed to `ac-proxy.NEAR_ACCOUNT_ID` using NEAR's global contracts and initializes it with NEAR_ACCOUNT_ID as the owner. The contract is fake as it doesn't require the agent to be running in a TEE to register.
2) The `shade-agent-api image` is fetched from Docker Hub and is run locally on port 3040.
3) Inside the image, a fake agent account is deterministically derived using your funding account Id as a derivation path.
4) The agent account is funded using the NEAR_ACCOUNT_ID.
5) The `approve_codehash` function is called by the NEAR_ACCOUNT_ID.
6) The `register_agent` function is called by the fake agent. No verification actually happens here, as we know the agent is not running in a TEE. 
7) Whenever you use `requestSignature`, it calls the agent contract to get a signature without requiring a valid agent.

### TEE deployment 
1) A Docker image for your agent code is built and pushed to Docker Hub.
2) A `real agent contract` is deployed to ac-sandbox.NEAR_ACCOUNT_ID using NEAR's global contracts and initializes it with the NEAR_ACCOUNT_ID as the owner. The contract is real as it requires the agent to be running in a TEE to register.
3) A `TEE is deployed` to Phala Cloud with your agent image (on port 3000) and the sandbox API image (on port 3040).
4) Inside the TEE, an agent account is randomly derived using the `TEE's hardware-based entropy`.
5) The `approve_codehash` function is called by the NEAR_ACCOUNT_ID.
6) The `register_agent` function is called by the agent. The agent is checked to be running in a TEE and running the correct code.
7) Whenever you use `requestSignature`, the agent calls the agent contract, checks that the agent is verified, and returns a signature.

The CLI code can be found [here](https://github.com/NearDeFi/shade-agent-cli/blob/main), and the shade-agent-api code, along with the global contract code, can be found in this [repo](https://github.com/NearDeFi/shade-agent-js).

---

## Using Different Languages 

To build Shade Agents in different programming languages, you can call the APIs directly, instead of using the functions provided by shade-agent-js. The functions and APIs can be found [here](https://github.com/NearDeFi/shade-agent-js/blob/main/src/api.ts).

<SigsSupport />