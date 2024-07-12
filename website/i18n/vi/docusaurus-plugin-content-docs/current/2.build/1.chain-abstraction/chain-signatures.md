---
id: chain-signatures
title: Implementing Chain Signatures
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

Chain signatures enable NEAR accounts, including smart contracts, to sign and execute transactions across many blockchain protocols.

This unlocks the next level of blockchain interoperability by giving ownership of diverse assets, cross-chain accounts, and data to a single NEAR account.

:::info

This guide will take you through a step by step process for creating a Chain Signature.

⭐️ For complete examples of a NEAR account performing transactions in other chains:

- [CLI script](https://github.com/mattlockyer/mpc-script)
- [web-app example](https://github.com/near-examples/near-multichain)
- [component example](https://test.near.social/bot.testnet/widget/chainsig-sign-eth-tx)

:::

---

## Create a Chain Signature

There are five steps to create a Chain Signature:

1. [Deriving the Foreign Address](#1-deriving-the-foreign-address) - Construct the address that will be controlled on the target blockchain
2. [Creating a Transaction](#2-creating-the-transaction) - Create the transaction or message to be signed
3. [Requesting a Signature](#3-requesting-the-signature) - Call the NEAR `multichain` contract requesting it to sign the transaction
4. [Reconstructing the Signature](#4-reconstructing-the-signature) - Reconstruct the signature from the MPC service's response
5. [Relaying the Signed Transaction](#5-relaying-the-signature) - Send the signed transaction to the destination chain for execution

![chain-signatures](/docs/assets/welcome-pages/chain-signatures-overview.png)
_Diagram of a chain signature in NEAR_

:::info MPC testnet contracts

If you want to try things out, these are the smart contracts available on `testnet`:

- `v2.multichain-mpc.testnet`: [MPC signer](https://github.com/near/mpc/tree/v0.2.0/contract) contract, latest release, made up of 8 MPC nodes
- `canhazgas.testnet`: [Multichain Gas Station](multichain-gas-relayer/gas-station.md) contract
- `nft.kagi.testnet`: [NFT Chain Key](nft-keys.md) contract

:::

---

## 1. Deriving the Foreign Address

Chain Signatures use [`derivation paths`](../../1.concepts/abstraction/chain-signatures.md#one-account-multiple-chains) to represent accounts on the target blockchain. The external address to be controlled can be deterministically derived from:

- The NEAR address (e.g., `example.near`, `example.testnet`, etc.)
- A derivation path (a string such as `ethereum-1`, `ethereum-2`, etc.)
- The MPC service's public key
  - `secp256k1:4NfTiv3UsGahebgTaHyD9vF8KYKMBnfd6kh94mK6xv8fGBiJB8TBtFMP5WWXz6B89Ac1fbpzPwAvoyQebemHFwx3`

We provide code to derive the address, as it's a complex process that involves multiple steps of hashing and encoding:

<Tabs groupId="code-tabs">
  <TabItem value="Ξ Ethereum">
    <Github language="js"
      url="https://github.com/near-examples/near-multichain/blob/main/src/services/ethereum.js" start="14" end="18" />

</TabItem>

<TabItem value="₿ Bitcoin">
    <Github language="js"
      url="https://github.com/near-examples/near-multichain/blob/main/src/services/bitcoin.js" start="14" end="18" />

</TabItem>

</Tabs>

:::info

The same NEAR account and path will always produce the same address on the target blockchain.

- `example.near` + `ethereum-1` = `0x1b48b83a308ea4beb845db088180dc3389f8aa3b`
- `example.near` + `ethereum-2` = `0x99c5d3025dc736541f2d97c3ef3c90de4d221315`

:::

:::tip

We recommend hardcoding the derivation paths in your application to ensure the signature request is made to the correct account

#### v2.multichain-mpc.testnet

`secp256k1:4NfTiv3UsGahebgTaHyD9vF8KYKMBnfd6kh94mK6xv8fGBiJB8TBtFMP5WWXz6B89Ac1fbpzPwAvoyQebemHFwx3`

:::

---

## 2. Creating the Transaction

Constructing the transaction to be signed (transaction, message, data, etc.) varies depending on the target blockchain, but generally it's the hash of the message or transaction to be signed.

<Tabs groupId="code-tabs">
  <TabItem value="Ξ Ethereum">
    <Github language="js"
      url="https://github.com/near-examples/near-multichain/blob/main/src/services/ethereum.js"
      start="32" end="48" />

In Ethereum, constructing the transaction is simple since you only need to specify the address of the receiver and how much you want to send.

</TabItem>

<TabItem value="₿ Bitcoin">
    <Github language="js"
      url="https://github.com/near-examples/near-multichain/blob/main/src/services/bitcoin.js"
      start="28" end="80" />

In bitcoin, you construct a new transaction by using all the Unspent Transaction Outputs (UTXOs) of the account as input, and then specify the output address and amount you want to send.

</TabItem>

</Tabs>

---

## 3. Requesting the Signature

Once the transaction is created and ready to be signed, a signature request is made by calling `sign` on the [MPC smart contract](https://github.com/near/mpc-recovery/blob/f31e39f710f2fb76706e7bb638a13cf1fa1dbf26/contract/src/lib.rs#L298).

The method requires two parameters:

1. The `transaction` to be signed for the target blockchain
2. The derivation `path` for the account we want to use to sign the transaction

<Tabs groupId="code-tabs">
  <TabItem value="Ξ Ethereum">
    <Github language="js"
      url="https://github.com/near-examples/near-multichain/blob/main/src/services/ethereum.js"
      start="57" end="61" />

</TabItem>

  <TabItem value="₿ Bitcoin">
    <Github language="js"
      url="https://github.com/near-examples/near-multichain/blob/main/src/services/bitcoin.js"
      start="87" end="98" />

For bitcoin, all UTXOs are signed independently and then combined into a single transaction.

</TabItem>

</Tabs>

:::tip
Notice that the `payload` is being reversed before requesting the signature, to match the little-endian format expected by the contract
:::

:::info

The contract will take some time to respond, as the `sign` method starts recursively calling itself waiting for the **MPC service** to sign the transaction.

<details>
<summary> A Contract Recursively Calling Itself? </summary>

NEAR smart contracts are currently unable to halt execution and await the completion of a process. To solve this while we await the ability to [yield & resume](https://docs.near.org/blog/yield-resume), one can make the contract call itself again and again checking on each iteration to see if the result is ready.

**Note:** Each call will take one block which equates to ~1 second of waiting. After some time the contract will either return a result that an external party provided or return an error running out of GAS waiting.

</details>

:::

---

## 4. Reconstructing the Signature

The MPC contract will not return the signature of the transaction itself, but the elements needed to reconstruct the signature.

This allows the contract to generalize the signing process for multiple blockchains.

<Tabs groupId="code-tabs">
  <TabItem value="Ξ Ethereum">
    <Github language="js"
      url="https://github.com/near-examples/near-multichain/blob/main/src/services/ethereum.js"
      start="62" end="71" />

In Ethereum, the signature is reconstructed by concatenating the `r`, `s`, and `v` values returned by the contract.

The `v` parameter is a parity bit that depends on the `sender` address. We reconstruct the signature using both possible values (`v=0` and `v=1`) and check which one corresponds to our `sender` address.

</TabItem>

<TabItem value="₿ Bitcoin">
    <Github language="js"
      url="https://github.com/near-examples/near-multichain/blob/main/src/services/bitcoin.js"
      start="105" end="116" />

In Bitcoin, the signature is reconstructed by concatenating the `r` and `s` values returned by the contract.

</TabItem>

</Tabs>

---

## 5. Relaying the Signature

Once we have reconstructed the signature, we can relay it to the corresponding network. This will once again vary depending on the target blockchain.

<Tabs groupId="code-tabs">
  <TabItem value="Ξ Ethereum">
    <Github language="js"
      url="https://github.com/near-examples/near-multichain/blob/main/src/services/ethereum.js"
      start="80" end="84" />

</TabItem>

<TabItem value="₿ Bitcoin">
    <Github language="js"
      url="https://github.com/near-examples/near-multichain/blob/main/src/services/bitcoin.js"
      start="119" end="127" />

</TabItem>

</Tabs>

:::info
⭐️ For a deep dive into the concepts of Chain Signatures see [What are Chain Signatures?](/concepts/abstraction/chain-signatures)

⭐️ For complete examples of a NEAR account performing Eth transactions:

- [web-app example](https://github.com/near-examples/near-multichain)
- [component example](https://test.near.social/bot.testnet/widget/chainsig-sign-eth-tx)

:::
