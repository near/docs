---
id: chain-signatures
title: Chain Signatures
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

Chain signatures enable NEAR accounts, including smart contracts, to sign and execute transactions across many blockchain protocols.

This unlocks the next level of blockchain interoperability by giving ownership of diverse assets, cross-chain accounts, and data to a single NEAR account.

:::info

This guide will take you through a step by step process for creating a Chain Signature.

⭐️ For a deep dive into the concepts of Chain Signatures see [What are Chain Signatures?](/concepts/abstraction/chain-signatures)

⭐️ For complete examples of a NEAR account performing Eth transactions:

- [web-app example](https://github.com/near-examples/near-multichain)
- [component example](https://test.near.social/md1.testnet/widget/chainsig-sign-eth-tx) 

:::

## Create a Chain Signature

There are five steps to create a Chain Signature:

1. [Deriving the Foreign Address](#1-deriving-the-foreign-address) - Reconstruct the address that will be controlled on the target blockchain
2. [Creating a Transaction](#2-creating-the-transaction) - Create the transaction / message that will be signed for the target blockchain
3. [Requesting a Signature](#3-requesting-the-signature) - Call the NEAR `multichain` contract, requesting to sign the transaction
4. [Reconstructing the Signature](#4-reconstructing-the-signature) - Reconstruct the signature from the MPC service's response
5. [Relaying the Signed Transaction](#5-relaying-the-signature) - Send the signed transaction to the destination chain for execution.

![chain-signatures](/docs/assets/welcome-pages/chain-signatures-overview.png)
_Diagram of a chain signature in NEAR_

---

## 1. Deriving the Foreign Address

Chain Signatures use [`derivation paths`](../1.concepts/abstraction/chain-signatures.md#one-account-multiple-chains) to represent accounts on the target blockchain. The external address can be deterministically derived from:

- The NEAR address _(e.g., `ana.near`)_
- A derivation path _(a string such as `ethereum-1`, `ethereum-2`, etc)_
- The MPC service's public key

We recommend to use our example code to derive the address, as it's a complex process that involves hashing and encoding: 

<Tabs groupId="code-tabs">
  <TabItem value="Ξ Ethereum">
    <Github language="js"
      url="https://github.com/near-examples/near-multichain/blob/main/src/index.js" start="24" end="28" />
  </TabItem>

  <TabItem value="₿ Bitcoin">

  ```js
  console.log("Coming soon...")
  ```

  </TabItem>
</Tabs>

:::tip
The same NEAR account and path will always produce the same address on the target blockchain.

- `influencer.testnet` + `ethereum-1` = `0x1b48b83a308ea4beb845db088180dc3389f8aa3b`
- `influencer.testnet` + `ethereum-2` = `0x99c5d3025dc736541f2d97c3ef3c90de4d221315`
:::

---

## 2. Creating the Transaction
Constructing the transaction to be signed (transaction, message, data, etc.) variates depending on the target blockchain, but in general, it's just the hash of the message or transaction to be signed.

<Tabs groupId="code-tabs">
  <TabItem value="Ξ Ethereum">
    <Github language="js"
      url="https://github.com/near-examples/near-multichain/blob/main/src/ethereum.js"
      start="24" end="46" />
  </TabItem>
  <TabItem value="₿ Bitcoin">
  ```js
  console.log("Coming soon...")
  ```
  </TabItem>
</Tabs>

---

## 3. Requesting the Signature 
Once the transaction is created and ready to be signed, a signature request is made by calling `sign` on the [MPC smart contract](https://github.com/near/mpc-recovery/blob/develop/contract/src/lib.rs#L298). 

The method expects two parameters: 
  1. The `transaction` to be signed for the target blockchain
  2. The derivation `path` for the account we want to use to sign the transaction.

<Tabs groupId="code-tabs">
  <TabItem value="Ξ Ethereum">
    <Github language="js"
      url="https://github.com/near-examples/near-multichain/blob/main/src/index.js"
      start="60" end="64" />
  </TabItem>

  <TabItem value="₿ Bitcoin">

  ```js
  console.log("Coming soon...")
  ```

  </TabItem>
</Tabs>

The contract will take some time to respond, as the `sign` method starts recursively calling itself in order to wait while the **MPC service** signs the transaction.

<details>
<summary> A Contract Recursively Calling Itself? </summary>

NEAR smart contracts are unable to halt execution and await the completion of a process. To solve this, one can make the contract call itself again and again checking on each iteration if the result is ready.

Note that each call will take one block, and thus result on ~1s of waiting. After some time the contract will either return a result - since somebody external provided it - or run out of GAS waiting.

</details>

<details>
<summary> What is an MPC Service? </summary>

MPC (multi-party computation) allows independent actors to do shared computations on private information, without revealing secrets to each-other.

NEAR uses its own MPC service to safely sign transactions for other chains on behalf of the user. In practice, **no single node** on the MPC can **sign by itself** since they do **not hold the user's keys**. Instead, nodes create signature-shares which are aggregated through multiple rounds to jointly sign the transaction.

Generally, MPC signing services work by sharing a master key, which needs to be re-created each time a node joins or leaves. NEAR's MPC service allows for nodes to safely join and leave, without needing to re-derive a master key.

If you want to learn more about how MPC works, we recommend to [**check this article**](https://www.zellic.io/blog/mpc-from-scratch/)

</details>


---

## 4. Reconstructing the Signature 

The MPC contract will not return the signature of the transaction itself, but the elements we need to reconstruct such signature. 

<Tabs groupId="code-tabs">
  <TabItem value="Ξ Ethereum">
    <Github language="js"
      url="https://github.com/near-examples/near-multichain/blob/main/src/ethereum.js"
      start="48" end="60" />
  </TabItem>
  <TabItem value="₿ Bitcoin">

  ```js
  console.log("Coming soon...")
  ```
  </TabItem>
</Tabs>

---

## 5. Relaying the Signature

Once we have reconstructed the signature, we can relay it to the corresponding network. This will once again vary depending on the target blockchain.

<Tabs groupId="code-tabs">
  <TabItem value="Ξ Ethereum">
    <Github fname="index.js" language="js"
      url="https://github.com/near-examples/near-multichain/blob/main/src/ethereum.js"
      start="63" end="67" />
  </TabItem>

  <TabItem value="₿ Bitcoin">

  ```js
  console.log("Coming soon...")
  ```
  </TabItem>
</Tabs>


:::info 
:::
