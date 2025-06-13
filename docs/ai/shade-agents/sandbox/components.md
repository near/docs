---
id: sandbox-components
title: Sandbox Components
sidebar_label: Sandbox Components
---

import {Github} from "@site/src/components/codetabs"
import { SigsSupport } from '@site/src/components/sigsSupport';

In this section, we'll explore the main components of the Shade Agent sandbox and how you can modify the [sandbox template](https://github.com/NearDeFi/shade-agent-sandbox-template/tree/main) to build your own agent.

---

## Template Structure

The template we're using is a simple Shade Agent built with NextJS that acts as a verifiable ETH price oracle. It takes prices from two different APIs, takes the average, and then pushes the price to an Ethereum contract. 

In this template, we're using NextJS so you can easily interact with the agent from the frontend. All of the agent's logic is defined in the [API routes](https://github.com/NearDeFi/shade-agent-sandbox-template/tree/main/pages/api).

The project has three different APIs:
1) **getWorkerAccount** - This API simply fetches the worker's NEAR account Id and it's balance to displaying on the frontend by using the functions `getAgentAccount` and `getBalance` from the library `shade-agent-js`.
2) **getEthAccount** - This API returns the `Ethereum Sepolia account` that the Shade Agent uses to update the price of Ethereum in the Sepolia contract. This API is used so the user knows which account to fund for gas.
3) **sendTransaction** - This is where the core logic of the agent is defined. When this API is called, the will create and sign a transaction. We'll look deeper into how this function works in the next part.

The Sandbox uses the Sandbox API that is included in your TEE deployment and exposes several functions that make interacting with the agent contract easier. The Sandbox also handles the deployment of the agent contract, approving a worker code hash, and registering the worker agent under the hood.

---

## Signing Transactions

In the [sendTransactions API Route](https://github.com/NearDeFi/shade-agent-sandbox-template/blob/main/pages/api/sendTransaction.js), we can see how we use the `singWithAgent` function from the `shade-agent-js` library to have the agent sign a transaction.

In this example, we're signing a transaction to call an Ethereum contract to update the stored price of ETH. First, we retrieve the price of ETH (in this example, the function queries two different APIs and calculates the average).

<Github fname="sendTransaction.js" language="javascript"
    url="https://github.com/NearDeFi/shade-agent-sandbox-template/blob/main/pages/api/sendTransaction.js#L13"
    start="13" end="13" />

Next, we build the transaction and `transaction payload` to be sent to the agent to sign. To do this, we're using the `chainsig.js library`. 
Using this library, we:
1. `Derive the Ethereum addresses` that will be sending the transaction. This function takes the agent contract Id since this is the predecessor account that is calling the Chain Signatures [MPC contract](https://github.com/Near-One/mpc/tree/main/libs/chain-signatures/contract), and a path. The path can be whatever string you like, but different paths will derive different addresses.
2. Create the `data`. This is what action we're performing, in this case, a function call to update the price in the contract.
3. `Build the transaction` by inputting the derived address, the target Ethereum smart contract, and the data.
4. Get the `payload` from the transaction.

<Github fname="sendTransaction.js" language="javascript"
    url="https://github.com/NearDeFi/shade-agent-sandbox-template/blob/main/pages/api/sendTransaction.js#L53-L64"
    start="53" end="64" />

Once we have the payload (also known as the hash), we can call the `signWithAgent` function. This calls the function on the agent contract, which will then sign the transaction.

<Github fname="sendTransaction.js" language="javascript"
    url="https://github.com/NearDeFi/shade-agent-sandbox-template/blob/main/pages/api/sendTransaction.js#L22-L24"
    start="22" end="24" />

The result is the parts of the `signature`.

We then attach the signature to the Ethereum transaction and broadcast it to the target network.

<Github fname="sendTransaction.js" language="javascript"
    url="https://github.com/NearDeFi/shade-agent-sandbox-template/blob/main/pages/api/sendTransaction.js#L36-L43"
    start="36" end="43" />

---

## Modifying this Example

The simplest way to create your own agent is to modify the example template and alter the transaction payload being sent to the agent contract in the [sendTransaction.js](https://github.com/NearDeFi/shade-agent-sandbox-template/blob/main/pages/api/sendTransaction.js) API route. 

:::tip
The `signWithAgent` function supports signing for any blockchain that uses the `secp256k1` signature scheme (Bitcoin, Ethereum, Doge, Cosmos, etc., with support for ed25519 coming soon). This function supports any arbitrary payload, allowing you to send multiple different transaction payloads through this function.
:::

In this example, we're using the [chainsig.js library](https://github.com/NearDeFi/chainsig.js), which supports transaction building for several different chains. By defining a different [chain adapter](https://github.com/NearDeFi/shade-agent-sandbox-template/blob/main/utils/ethereum.js#L42-L49), you can easily start building transactions for other chains the library supports.

Review our [chain signature docs](../../../chain-abstraction/chain-signatures/implementation.md) for building transactions to learn how to integrate different chains. Note that step 3 of requesting a signature differs since we're calling the agent contract here instead of the MPC directly, and we're signing with a private key instead of a wallet.

:::tip
If you're seeking inspiration for what to build, consider reviewing our [ideas page](../examples.md).
:::

---

## How the Sandbox Works

The Shade Agent Sandbox abstracts away a lot of the complexity of deploying a Shade Agent. Here we will illuminate key parts of how the deployment flow works. There are different flows for local and TEE deployment, which are selected by changing the contract prefix to `ac-proxy.` and `ac-sandbox.` respectively.

### Local Deployment 
1) A `fake agent contract` is deployed to `ac-proxy.NEAR_ACCOUNT_ID` using NEAR's global contracts and initializes it with NEAR_ACCOUNT_ID as the owner. The contract is fake as it doesn't require the worker agent to be running in a TEE to register.
2) The `Sandbox API image` is fetched from Docker Hub and is run locally on port 3040.
3) Inside the image, a fake worker agent account is deterministically derived using your account id as a derivation path.
4) The worker agent is funded using the NEAR_ACCOUNT_ID.
5) The `approve_codehash` function is called by the NEAR_ACCOUNT_ID.
6) The `register_worker` function is called by the fake worker. No verification actually happens here, as we know the worker is not running in a TEE. 
7) Whenever you use `signWithAgent`, it calls the agent contract to get a signature without requiring a valid worker.

### TEE deployment 
1) A Docker image for your worker agent code is built and pushed to Docker Hub.
2) A `real agent contract` is deployed to ac-sandbox.NEAR_ACCOUNT_ID using NEAR's global contracts and initializes it with the NEAR_ACCOUNT_ID as the owner. The contract is real as it requires the worker agent to be running in a TEE to register.
3) A `TEE is deployed` to Phala Cloud with your worker agent image (on port 3000) and the sandbox API image (on port 3040).
4) Inside the TEE, a worker agent account is randomly derived using the `TEE's hardware-based entropy`.
5) The `approve_codehash` function is called by the NEAR_ACCOUNT_ID.
6) The `register_worker` function is called by the worker. The worker is checked is check to be running in a TEE and running the correct code.
7) Whenever you use `signWithAgent` the worker agent calls the agent contract, checks the worker is verified and returns a signature .

The CLI code can be found [here](https://github.com/NearDeFi/shade-agent-cli/blob/main), and the Sandbox API code, along with the sandbox global contract code, can be found in this [repo](https://github.com/NearDeFi/shade-agent-js).

---

## Using Different Languages 

To use the Sandbox in different programming languages, you can call the APIs directly, instead of using the functions provided by shade-agent-js. The functions and APIs can be found [here](https://github.com/NearDeFi/shade-agent-js/blob/c63a1bd61bc129fcc5d1860c2a572eb239280948/src/agentHelpers.ts).

<SigsSupport />