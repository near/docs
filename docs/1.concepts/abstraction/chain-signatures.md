---
id: chain-signatures
title: Chain Signatures
sidebar_label: What are Chain Signatures?
---

Chain Signatures unlock the ability for a single account to transact across multiple blockchain protocols, giving ownership of cross-chain accounts, data, and assets to one NEAR account.

This many-to-one ownership is made possible through a mixture of services across our tech stack:

1. A [smart contract](../basics/accounts/smartcontract.md) that holds requests for multi-chain signatures.
2. A [multiparty computation](https://www.zellic.io/blog/mpc-from-scratch/) service listening for signature requests.
3. A multi-chain [relayer](./relayers.md), which can submit signed transactions to other networks.

:::info
This section presents an overview of Chain Signatures. To create one, please switch to the [**building a Chain Signature**](../../8.abstraction/chain-signatures.md) document.
:::

---

## How It Works

![chain-signatures](/docs/assets/welcome-pages/chain-signatures-overview.png)
_Diagram of a chain signature in NEAR_

There are four steps involved on Chain Signatures:

1. [Create a Payload](#1-create-a-payload) - The user creates the transaction / message they want to sign
2. [Signature Request](#2-request-signature) - The user calls the NEAR `multichain` contract, requesting to sign the transaction
3. [MPC Signing Service](#3-sign-with-mpc) - A service captures the call, and returns the signed the transaction for the user
4. [Relay Signed Payload](#4-relaying-the-signature) - The signed payload is then sent to the destination chain for execution.

<hr class="subsection" />

### 1. Create Payload

The first step is to construct a payload (transaction, message, data, etc.) for the target blockchain platform. This variates depending on the target blockchain, but in general, it's a hash of the message or transaction to be signed.

<hr class="subsection" />

### 2. Signature Request

Once a payload is created and ready to sign, a signature request is made by calling `sign` on the deployed smart contract `multichain.near`. This method takes two parameters:
  1. **payload:** The payload (transaction, message, data, etc.) to be signed for the target blockchain
  2. **path:** A name representing the account that should be used to sign the payload (e.g. ethereum-1)

```rust
  pub fn sign(payload: [u8; 32], path: String) -> Signature
```
_[See the full code in Github](https://github.com/near/mpc-recovery/blob/bc85d66833ffa8537ec61d0b22cd5aa96fbe3197/contract/src/lib.rs#L263)_

For example, a user could request a signature to `send 0.1 ETH to 0x060f1...` **(payload)** using the `ethereum-1` account **(path)**.

After a request is made, the `sign` method starts recursively calling itself in order to wait while the [MPC signing service](#3-mpc-signing-service) signs the payload.

<details>
<summary> A Contract Recursively Calling Itself? </summary>

NEAR smart contracts are unable to halt execution and await the completion of a process. To solve this, one can make the contract call itself again and again checking on each iteration if the result is ready.

Note that each call will take one block, and thus result on ~1s of waiting. After some time the contract will either return a result - since somebody external provided it - or run out of GAS waiting.

</details>

<hr class="subsection" />

### 3. MPC Signing Service

A multi-party computation service (`MPC service`, see more below) is constantly listening for signature requests (i.e. users calling the `sign` method). When a call is detected, the service will:

1. Use the `accountId` of the requester, and the `path` (in our example, `ethereum-1`) to derive a key 
2. Sign the `payload` (in our example, a transaction transferring ETH) using the stored key
3. Call the contract `multichain.near`, storing the resulting `Signature`

:::tip
Every time an account makes a signature request using the same `path`, the same `key` will be derived. This allows to use always the same account to sign different transactions.
:::

<details>
<summary> What is an MPC Service? </summary>

MPC (multi-party computation) allows independent actors to do shared computations on private information, without revealing secrets to each-other.

NEAR uses its own MPC service to safely sign transactions for other chains on behalf of the user. In practice, **no single node** on the MPC can **sign by itself** since they do **not hold the user's keys**. Instead, nodes create signature-shares which are aggregated through multiple rounds to jointly sign the payload.

Generally, MPC signing services work by sharing a master key, which needs to be re-created each time a node joins or leaves. NEAR's MPC service allows for nodes to safely join and leave, without needing to re-derive a master key.

If you want to learn more about how MPC works, we recommend to [**check this article**](https://www.zellic.io/blog/mpc-from-scratch/)

</details>

<hr class="subsection" />

### 4. Relaying the Signature

At this point - assuming the contract didn't run out of gas waiting - the contract will return the response for the signature request. This response is a valid signed transaction that can be readily sent to the target blockchain to be executed.

To simplify relaying the transaction, we are building an indexer that will automatically capture the signature, and submit it to the target chain using a multi-chain [relayer](relayers.md).

:::tip
A multi-chain [relayer](relayers.md) is a service that knows how to relay signed transactions into their target networks so they are executed on-chain.
:::

<!-- ### Workflow

- A NEAR account requests a payload to be signed by a deployed [MPC](#multi-party-computation-mpc) smart contract
  > This request is performed by calling `sign` and passing the payload (hash from a message or transaction)
- A key is derived from the MPC root key using `account_id` and derivation path. (this ensures that it will be the same key if the two parameters are the same)
- Once the client gets the signature, it can send the transaction to a relayer
  > In a future release, an indexing service will listen to all `sign` events from the MPC contract and will trigger a multi-chain relayer -->