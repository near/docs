---
id: chain-signatures
title: Chain Signatures
sidebar_label: What are Chain Signatures?
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Chain Signatures unlock the ability for a single account to transact across multiple blockchain protocols, giving ownership of many accounts, data, and assets to one NEAR account. 🤯

This many-to-one ownership is made possible through NEAR's [unique account model](../basics/accounts/introduction.md), which allows many keys to be associated with a single account. Chain Signatures generates and uses one of these keys to sign payloads compatible with other blockchain platforms but still linked to a native NEAR account.

---

## How It Works

Chain Signatures are completed in four basic steps:

1. [Create Payload](#1-create-a-payload) - A payload is created to be signed and sent to a given blockchain platform.
2. [Signature Request](#2-request-signature) - A smart contract call is made to sign the payload.
3. [MPC Signing Service](#3-sign-with-mpc) - A service signs the payload linking it with the sender's NEAR account.
4. [Relay Signed Payload](#4-relaying-the-signature) - The signed payload is then sent to the destination chain for execution.

![chain-signatures](/docs/assets/welcome-pages/chain-signatures-overview.png)
_Diagram of a chain signature in NEAR_

<hr class="subsection" />

### 1. Create Payload

The first step is to construct a payload (transaction, message, data, etc.) that you want to send to another blockchain platform for execution.

This can be performed in the following steps:
<!-- TODO -->

1.

2.

3.

### 2. Signature Request

Once a payload is created and ready to sign, a signature request is made by calling `sign` a deployed smart contract `multichain.near`. This method takes two parameters:
  - **payload:** A payload (transaction, message, data, etc.) signed by a NEAR account
  - **path:** The destination for signed payload (ex. ethereum-1)

```rust
  pub fn sign(payload: [u8; 32], path: String) -> Signature
```
_[See the full code in Github](https://github.com/near/mpc-recovery/blob/bc85d66833ffa8537ec61d0b22cd5aa96fbe3197/contract/src/lib.rs#L263)_

For example, a user could request a signature for sending `...0.1 ETH to 0x060f1...` **(payload)** on `ethereum-1` **(path)**.

After a request is made, the `sign` method starts recursively calling itself while waiting for a signature from the [MPC signing service](#3-mpc-signing-service).

<details>
<summary> A Contract Recursively Calling Itself? </summary>

Due to NEAR's asynchronous nature, contracts can not pause and wait for a promise to resolve or process to complete before resuming. This can be resolved by utilizing callbacks or in this case, making the contract call itself again and again checking on each iteration if the result is ready.

Note that each call will take one block (~1 second) and after a period of time the contract will either complete the result and return it, or run out of GAS.

</details>

<hr class="subsection" />

### 3. MPC Signing Service

A multi-party computation service (`MPC service`, see bellow) is constantly listening for signature requests (i.e. users calling the `sign` method). When a call is detected, the service will:

1. Use the `accountId` of the requester, and the `path` (in our example, `ethereum-1`) to derive a key 
2. Sign the `payload` (in our example, a transaction transferring ETH) using the stored key
3. Call the contract `multichain.near`, storing the resulting `Signature`

:::tip
Every time an account makes a signature request using the same `path`, the same `key` will be derived. This allows to use always the same account to sign different transactions.
:::

<details>
<summary> What is an MPC Service? </summary>

MPC (multi-party computation) allows independent nodes to jointly sign a message while not reveling secrets to each-other. In practice, this means that each node creates a signature-share, which can be aggregated to sign a message, thus **no single node** can **sign by itself**. 

This means you can safely let the MPC network take care of your cross-chain keys, which will allow its nodes to sign requests in your behalf, but no single node will ever be able to access your accounts.

NEAR uses a modified version of MPC that allows for nodes to join and leave, without needing to re-derive a master key. 

If you want to learn more about how MPC works, we recommend to [**check this article**](https://www.zellic.io/blog/mpc-from-scratch/)

</details>

<hr class="subsection" />

### 4. Relaying the Signature

At this point - assuming the contract didn't run out of gas waiting - the contract will return the response for the signature request. This response is a valid signed transaction that can be readily sent to the target blockchain to be executed.

In the future, we will simplify this by using an indexer to automatically capture the signature, and submit it to a multi-chain [relayer](relayers.md).

:::tip
A multi-chain [relayer](relayers.md) is a service that knows how to relay signed transactions into their target networks so they are executed on-chain.
:::

<!-- ### Workflow

- A NEAR account requests a payload to be signed by a deployed [MPC](#multi-party-computation-mpc) smart contract
  > This request is performed by calling `sign` and passing the payload (hash from a message or transaction)
- A key is derived from the MPC root key using `account_id` and derivation path. (this ensures that it will be the same key if the two parameters are the same)
- Once the client gets the signature, it can send the transaction to a relayer
  > In a future release, an indexing service will listen to all `sign` events from the MPC contract and will trigger a multi-chain relayer -->