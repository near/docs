---
id: key-components
title: Key Components
sidebar_label: Key Components
---

import {Github} from "@site/src/components/codetabs"
import { SigsSupport } from '@site/src/components/sigsSupport';

In this section, we will walk through the main components of a Shade Agent and how you can modify this [template](https://github.com/PiVortex/shade-agent-template) to build your own agent.

---

## Approving a Code Hash

When an agent contract is deployed, it's initialized with an `owner` account Id. This owner can set and update the `worker agent code hash`.

The code hash dictates that only workers running the correct code can use the `gated methods` of the agent contract and request signatures.

After deploying the agent contract, the owner should submit the code hash. This is done by calling the `approve_codehash` method. This method first checks if it's the owner account Id calling the method then inserts the new code hash into the map of code hashes.

<Github fname="lib.rs" language="rust"
    url="https://github.com/PiVortex/shade-agent-template/blob/main/contract/src/lib.rs#L62-L65"
    start="62" end="65" />

In the template, this method is called in the `contract deployment script`, so you don't need to manually call it.

This same method is used to add new code hashes. Since a NEAR account can be a smart contract, you can implement upgradability restrictions on the owner account. A common upgrade method would be approving a new code hash via DAO voting or implementing a grace period or cool down, where users can withdraw funds if they are not comfortable with the incoming code hash for the new worker agent..

You could also add a method to delete previous code hashes to ensure that out-of-date workers no longer have access to the agent contract.

---

## Worker Account Derivation 

When the TEE boots up, a `private key` and `worker agent account Id` is derived. These are used to call the agent contract.

The function to derive a worker agent is provided by the `shade-agent-js` library.

<Github fname="register.js" language="javascript"
    url="https://github.com/PiVortex/shade-agent-template/blob/main/pages/api/derive.js#L19"
    start="19" end="19" />

The worker agent's private key is generated from the combined `entropy` from the crypto module and the TEE instance. 

When running the worker agent locally, the worker agent account is replaced by the account Id set in your environment variables.

---

## Registering a Worker 

To register a worker, the worker agent calls the [register_worker method](https://github.com/PiVortex/shade-agent-template/blob/main/contract/src/lib.rs#L79-L101).

<Github fname="register.js" language="javascript"
    url="https://github.com/PiVortex/shade-agent-template/blob/main/pages/api/register.js#L12"
    start="12" end="12" />

You don't really need to worry about how this process works, as it is all abstracted away by the `shade-agent-js` library, but essentially the worker agent generates a `remote attestation quote` and the Docker image's SHA256 `code hash`. Then, the agent contract then uses the attestation quote to check that the worker agent is truly running inside a TEE and verifies the code hash matches one of the worker code hashes in the list. If so, the account Id of the worker agent is registered inside the agent contract.

<Github fname="lib.rs" language="rust"
    url="https://github.com/PiVortex/shade-agent-template/blob/main/contract/src/lib.rs#L94-L98"
    start="94" end="98" />

The worker agent now has access to call any worker agent gated methods (is able to sign transactions).

---

## Signing Transactions

The Shade Agent signs transactions via the `MPC contract`. The agent contract exposes a method that takes a `transaction payload`, checks the caller is a registered worker agent, and, if so, makes a call to the MPC contract to sign the payload. 

<Github fname="lib.rs" language="rust"
    url="https://github.com/PiVortex/shade-agent-template/blob/main/contract/src/lib.rs#L68-L75"
    start="68" end="75" />

The MPC call takes a `path` as an argument. This determines which address on the target blockchain is being used.

In this example, the transaction we're signing is a function call to an Ethereum contract to update the stored price of ETH. First, we get the price of ETH (in the example, this function queries two different APIs and takes the average).

<Github fname="sendTransaction.js" language="javascript"
    url="https://github.com/PiVortex/shade-agent-template/blob/main/pages/api/sendTransaction.js#L15"
    start="15" end="15" />

Next, we build the transaction and transaction payload. To do this, we:
1. `Derive the Ethereum addresses` that will be sending the transaction. This function takes the contractId since this is the predecessor account that is calling the MPC contract, and a path. The path can be whatever you like, but different paths will derive different addresses.
2. `Build the transaction` by inputting the derived address, the target Ethereum smart contract, the amount of ETH we are attaching to the call, and the data (what action is happening, in our case, a function call).
3. Get the `payload` from the transaction.

<Github fname="sendTransaction.js" language="javascript"
    url="https://github.com/PiVortex/shade-agent-template/blob/main/pages/api/sendTransaction.js#L58-L66"
    start="58" end="66" />

Once we have the payload, we can call the `agent_sign` method on the agent contract with the payload as an argument. The Shade Agent library exposes a `contract call function` that signs the call to the agent contract with the worker's private key.

<Github fname="sendTransaction.js" language="javascript"
    url="https://github.com/PiVortex/shade-agent-template/blob/main/pages/api/sendTransaction.js#L24-L29"
    start="24" end="29" />

The result is the parts of the `signature`.

We then take the signature, attach it to the Ethereum transaction, and broadcast it to the network.

<Github fname="sendTransaction.js" language="javascript"
    url="https://github.com/PiVortex/shade-agent-template/blob/main/pages/api/sendTransaction.js#L42-L52"
    start="42" end="52" />

---

## Modifying this Example 

The easiest way to create your own agent is to modify the example template and change the transaction payload being sent to the agent contract in the [sendTransaction.js](https://github.com/PiVortex/shade-agent-template/blob/main/pages/api/sendTransaction.js) API route. You can create a payload for any chain that supports `secp256k1` and `ed25519` signatures. The `agent_sign` method can be used whenever you have a payload to sign, so you can send as many different transaction payloads through this method as you like.

If you are looking for ideas of what to build, consider reviewing our [ideas page](./examples.md).

---

## Security Considerations

Please review this list of security considerations before deploying anything to mainnet.

### Duplicate Agents, Duplicate Actions

To ensure liveness, the Shade Agent should be composed of a few identical worker agents hosted by different providers/on different hardware. When multiple agents are running, all agents will respond to an update (a user input, agent ping, update from an API, etc.). You need to make sure that the agent collectively only takes the desired action `once` as a result of this update. 

Let's take an example of a Kaito Mindshare Trading Agent. If the mindshare of Solana increases compared to NEAR, the agent would swap SOL for NEAR. If two worker agents are running, then you need to ensure this swap doesn't happen twice.

This logic is usually best implemented inside of the agent contract.

### Restricting Actions

Whilst TEEs are considered to be trusted and tamper-resistant, it is a good idea to implement tight restrictions or `guard rails` on actions that the agent can take within the agent contract. 

Examples of restrictions could be:
- The agent contract can only build transactions for a list of functions and smart contract addresses.
- The agent contract can only build transactions for specific chains.
- The agent contract can only build transactions that swap or send up to 0.1 ETH per 24 hours.

We recommend you use the [omni-transactions-rs](https://github.com/near/omni-transaction-rs) library to build transactions inside of your agent contract instead of the worker agent. 

### Failed or Unsent Transactions

Just because the MPC successfully signed a transaction payload, this does not mean the transaction itself will be successful or will be sent at all. A transaction may fail for a few reasons, like the target network being too congested, the transaction having the incorrect nonce, or having insufficient gas.

We suggest you build your agent in such a way that if the transaction fails, then a new signature can be requested without allowing for unlimited signing.

It may also be relevant in some use cases to emit the signed transaction from your agent contract so that anyone/an indexer can relay them in case your worker agent fails to retrieve the result. Signed transactions can be built using [omni-transactions-rs](https://github.com/near/omni-transaction-rs). Be careful about having unsent signatures floating about.

### Parallel Transactions

Building on the above example, the MPC signing a transaction payload doesn't change any nonce or state on the destination chain. So if you'd like to create an agent that can issue several parallel transactions, you will have to have an intimate knowledge of the destination chain and increment nonces for the derived accounts that you're generation signatures for.

This can cause a lot of issues in the EVM world, for example: Transactions can get stuck in the mempool if the nonce used is not in sequential order. A transaction with a higher nonce will remain pending if a previous transaction (with a lower nonce) hasn't been processed.

If your agent frequently tries to sign multiple transactions in parallel with the MPC, then you must keep track of which transactions are successful and handle failures appropriately so that all transactions eventually are included in blocks of the destination chain.

<SigsSupport />
