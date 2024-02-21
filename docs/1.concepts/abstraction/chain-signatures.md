---
id: chain-signatures
title: Chain Signatures
sidebar_label: What are Chain Signatures?
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Chain signatures unlock the ability for a single account to transact across multiple blockchain protocols, giving ownership of many accounts, data, and assets to one NEAR account. 🤯

This many-to-one ownership is made possible through NEAR's [unique account model](../basics/accounts/introduction.md), which allows many keys to be associated with a single account. Chain Signatures leverages this ability by generating keys for accounts on multiple blockchain platforms that map to a single NEAR account.

1. A [MPC service](#1-signing-up-for-the-mpc-service) handling user's keys and listening for requests to sign payloads.
2. A NEAR [smart contract](#2-signature-request) that holds requests for multi-chain signatures.
3. A multi-chain [relayer](#4-relaying-the-signature), which can submit signed transactions to other networks.

---

## Overview of a chain signature

Lets see how the different elements of chain signature (accounts, contracts, MPC and relayers) interact to allow a NEAR account to send a transaction to another chain.

![chain-signatures](/docs/assets/welcome-pages/chain-signatures-overview.png)
_Diagram of a chain signature in NEAR_

<hr class="subsection" />

### 1. Signature Request
In order to request a chain signature, the user first calls the `sign` method on the `multichain.near`, which posses the following signature:

```rust
  pub fn sign(payload: [u8; 32], path: String) -> Signature
```
_[See the full code in Github](https://github.com/near/mpc-recovery/blob/bc85d66833ffa8537ec61d0b22cd5aa96fbe3197/contract/src/lib.rs#L263)_

The method takes two parameters indicating: the **transaction** that the user wants to sign (`payload`), and which **account** (`path`) should be used to sign (more on this [later](#3-mpc-signature)).

For example, the user could ask to sign a transaction to `send 0.1ETH to ...` (payload) using the account `ethereum-1` (path).

After a request is made, the `sign` method will start recursively calling itself while waiting for a signature from the [MPC service](#3-mpc-signature).

<details>
<summary> A Contract Recursively Calling Itself? </summary>

NEAR contracts do not have a way to wait for an external agent and then resume computations. Instead, one can make the contract call itself again, and check on each iteration if the result is ready.

Each call will take 1 block, and thus 1 second of waiting. After a certain period of time, either the contract will have the result and return it, or it will run our of GAS.
</details>

<hr class="subsection" />

### 2. MPC Signature
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

### 3. Relaying the Signature
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