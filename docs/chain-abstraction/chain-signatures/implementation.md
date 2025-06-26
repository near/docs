---
id: implementation
title: Implementing Chain Signatures
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

Chain signatures enable NEAR accounts, including smart contracts, to sign and execute transactions across many blockchain protocols.

This unlocks the next level of blockchain interoperability by giving ownership of diverse assets, cross-chain accounts, and data to a single NEAR account.

---

## Create a Chain Signature

There are five steps to create a Chain Signature:

1. [Deriving the Foreign Address](#1-deriving-the-foreign-address) - Derive the address that will be controlled on the target blockchain.
2. [Creating a Transaction](#2-creating-the-transaction) - Create the transaction or message to be signed.
3. [Requesting a Signature](#3-requesting-the-signature) - Call the NEAR MPC contract requesting it to sign the transaction.
4. [Formatting the Signature](#4-formatting-the-signature) - Format the signature from the MPC contract and add it to the transaction.
5. [Relaying the Signed Transaction](#5-relaying-the-signed-transaction) - Send the signed transaction to the destination chain for execution.

![chain-signatures](/docs/assets/welcome-pages/chain-signatures-overview.png)
_Diagram of a chain signature in NEAR_

The [chainsig.js](https://github.com/NearDeFi/chainsig.js) library provides a convenient interface for completing each of these steps.

:::tip
For building transactions inside of NEAR smart contracts written in Rust, you can use the [Omni Transaction](https://github.com/near/omni-transaction-rs) library to easily build transactions for different blockchains (like Bitcoin and Ethereum).
:::


:::info MPC Contracts

There is an [MPC contract](https://github.com/Near-One/mpc/tree/main/libs/chain-signatures/contract) available on both `mainnet` and `testnet`:
- Mainnet: `v1.signer`
- Testnet: `v1.signer-prod.testnet`

The MPC network is made up of 8 nodes.

:::

--- 

## Chain Signatures Contract 

To interact with the chain signatures library you first need to instantiate a `ChainSignaturesContract`.

<Github language="js"
  url="https://github.com/near-examples/near-multichain/blob/main/src/config.js#L17-L20" start="17" end="20" />

The `networkId` and `contractId` are set to the values specified in the previous section depending which network you are on.

---

## Chain Adapters

To interact with a specific chain, you need to instantiate the relevant `chainAdapter`.

<Tabs groupId="code-tabs">
  <TabItem value="Ξ EVM">
    <Github language="js"
      url="https://github.com/near-examples/near-multichain/blob/main/src/components/EVM/EVM.jsx#L35-L42" start="35" end="42" />

  The EVM chain adapter takes the `ChainSignaturesContract` as an argument as well as `publicClient` which is constructed from an EVM RPC URL. 

  :::tip
  To use different EVM networks, simply specify the RPC URL for your desired network.
  The example demonstrates compatibility with multiple EVM-compatible networks including Ethereum, Base, BNB Chain, Avalanche, Polygon, Arbitrum, zkSync, and many others.
  You can find RPC URLs for various networks at [ChainList](https://chainlist.org/?testnets=true).
  :::

</TabItem>

<TabItem value="₿ Bitcoin">
    <Github language="js"
      url="https://github.com/near-examples/near-multichain/blob/main/src/components/Bitcoin.jsx#L10-L18" start="10" end="18" />

  The Bitcoin chain adapter takes the `ChainSignaturesContract` as an argument as well as the `network` ("mainnet", "testnet" or "regtest") and a `btcRpcAdapter` which handles communication with the Bitcoin network.

</TabItem>

<TabItem value="◎ Solana">
    <Github language="js"
      url="https://github.com/near-examples/near-multichain/blob/main/src/components/Solana.jsx#L12-L17" start="12" end="17" />

  The Solana chain adapter takes the `ChainSignaturesContract` as an argument as well as a `connection` which is constructed from a Solana RPC URL. If you want to use Mainnet, then you need to choose a Mainnet RPC.

</TabItem>

</Tabs>

---

## 1. Deriving the Foreign Address

Chain Signatures use [`derivation paths`](../chain-signatures.md#derivation-paths-one-account-multiple-chains) to represent accounts on the target blockchain. The foreign address to be controlled can be deterministically derived from:

- The NEAR account calling the MPC contract (e.g., `example.near`, `example.testnet`, etc.)
- A derivation path (a string such as `ethereum-1`, `ethereum-2`, etc.)
- The MPC service's master public key (we don't need to worry about this as it is defined in the library we're using).

To derive the address call the `deriveAddressAndPublicKey` method passing the near account Id from which the address is being derived and the derivation path. 

<Tabs groupId="code-tabs">
  <TabItem value="Ξ EVM">
    <Github language="js"
      url="https://github.com/near-examples/near-multichain/blob/main/src/components/EVM/EVM.jsx#L93-L96" start="93" end="96" />

</TabItem>

<TabItem value="₿ Bitcoin">
    <Github language="js"
      url="https://github.com/near-examples/near-multichain/blob/main/src/components/Bitcoin.jsx#L45-L48" start="45" end="48" />

</TabItem>

<TabItem value="◎ Solana">
    <Github language="js"
      url="https://github.com/near-examples/near-multichain/blob/main/src/components/Solana.jsx#L42" start="42" end="42" />

  On Solana, your address is the same as your public key.

</TabItem>

</Tabs>

:::info

The same NEAR account and path will always produce the same address on the target blockchain.

- `example.near` + `ethereum-1` = `0x1b48b83a308ea4beb845db088180dc3389f8aa3b`
- `example.near` + `ethereum-2` = `0x99c5d3025dc736541f2d97c3ef3c90de4d221315`

:::

---

## 2. Creating the Transaction

To construct the transaction to be signed use the method `prepareTransactionForSigning`. 


<CodeTabs>
  <TabItem value="Ξ EVM" language="js">
        Constructing a transaction to transfer ETH is very simple. The `value` is the amount of ETH in Wei as type BigInt (1 ETH = 10<sup>18</sup> Wei).
        <Github language="js"
          url="https://github.com/near-examples/near-multichain/blob/main/src/components/EVM/Transfer.jsx#L17-L21"
          start="17" end="21"/>

    This method returns the `unsigned transaction` and the transaction `hash(es)` (also known as the `payload`).
  </TabItem>
      
  <TabItem value="₿ Bitcoin" language="js">
    Constructing a transaction to transfer BTC is very simple. The `value` is the amount of BTC in satoshis as a string (1 BTC = 100,000,000 sats).
    <Github language="js"
      url="https://github.com/near-examples/near-multichain/blob/main/src/components/Bitcoin.jsx#L67-L72"
      start="67" end="72"/>

    This method returns the `unsigned transaction` and the transaction `hash(es)` (also known as the `payload`).
  </TabItem>

  <TabItem value="◎ Solana" language="js">
    Constructing a transaction to transfer SOL is very simple. The `value` is the amount of SOL in lamports as type BigInt (1 SOL = 1,000,000,000 lamports).
    <Github language="js"
      url="https://github.com/near-examples/near-multichain/blob/main/src/components/Solana.jsx#L57-L61" start="57" end="61" />

    This method returns the `unsigned transaction`.
  </TabItem>
</CodeTabs>

<details>

<summary> EVM Function Calls </summary>

To call a function on a smart contract we need the ABI of the contract, in our repo this is defined in the [config.js](https://github.com/near-examples/near-multichain/blob/main/src/config.js#L23-L63) file (this can be gathered from Remix or using Etherscan).

Then define a `Contract` object using the `ethers` library

<Github language="js"
  url="https://github.com/near-examples/near-multichain/blob/main/src/components/EVM/FunctionCall.jsx#L18-L18"
  start="18" end="18"/>

Then to construct the transaction

<Github language="js"
  url="https://github.com/near-examples/near-multichain/blob/main/src/components/EVM/FunctionCall.jsx#L31-L37"
  start="31" end="37"/>


This approach allows you to call smart contract functions by encoding the function data and including it in the transaction.

</details>

---

## 3. Requesting the Signature

Once the transaction is created and ready to be signed, a signature request is made by calling `sign` on the MPC smart contract.

The method requires four parameters:

  1. The `payloads` (or hashes) to be signed for the target blockchain
  2. The derivation `path` for the account we want to use to sign the transaction
  3. The `keyType`, `Ecdsa` for `Secp256k1` signatures and `Eddsa` for `Ed25519` signatures.
  4. The `signerAccount` which contains the `accountId` that is signing and the `signAndSendTransactions` function from the [wallet selector](../../tools/wallet-selector.md).

<Tabs groupId="code-tabs">
  <TabItem value="Ξ EVM">
    <Github language="js"
      url="https://github.com/near-examples/near-multichain/blob/main/src/components/EVM/EVM.jsx#L115-L123"
      start="115" end="123" />

</TabItem>

  <TabItem value="₿ Bitcoin">
    <Github language="js"
      url="https://github.com/near-examples/near-multichain/blob/main/src/components/Bitcoin.jsx#L79-L87"
      start="79" end="87" />

For Bitcoin, it is common to have multiple UTXOs to sign when sending a single transaction. We create a NEAR transaction (to call `sign` on the MPC contract) for each UTXO and send them to be signed by the MPC individually. Each signature is then parsed from each transaction outcome to produce an array of signatures.

  </TabItem>

<TabItem value="◎ Solana">
  To get the payload, serialize the transaction to a `uint8Array` and then convert it to hex.
    <Github language="js"
      url="https://github.com/near-examples/near-multichain/blob/main/src/components/Solana.jsx#L68-L76" start="68" end="76" />

</TabItem>

</Tabs>

:::info

The contract will take some time to respond, as the `sign` method [yields execution](/blog/yield-resume), waiting for the MPC service to sign the transaction.

:::

---

## 4. Formatting the Signature

Once the signature is returned from the MPC it needs to be formatted and added to the transaction to produce a signed transaction.

<Tabs groupId="code-tabs">
  <TabItem value="Ξ EVM">
    <Github language="js"
      url="https://github.com/near-examples/near-multichain/blob/main/src/components/EVM/EVM.jsx#L125-L128"
      start="125" end="128" />


</TabItem>

<TabItem value="₿ Bitcoin">
        <Github language="js"
      url="https://github.com/near-examples/near-multichain/blob/main/src/components/Bitcoin.jsx#L93-L96"
      start="93" end="96" />
 
For Bitcoin, the array of signatures is added to the transaction to produce a complete signed transaction.

</TabItem>

<TabItem value="◎ Solana">
    <Github language="js"
      url="https://github.com/near-examples/near-multichain/blob/main/src/components/Solana.jsx#L82-L86" start="82" end="86" />

</TabItem>

</Tabs>

---

## 5. Relaying the Signed Transaction

Now that we have a signed transaction, we can relay it to the target network using `broadcastTx`.

<Tabs groupId="code-tabs">
  <TabItem value="Ξ EVM">
      <Github language="js"
      url="https://github.com/near-examples/near-multichain/blob/main/src/components/EVM/EVM.jsx#L150"
      start="150" end="150" />

</TabItem>

<TabItem value="₿ Bitcoin">
    <Github language="js"
      url="https://github.com/near-examples/near-multichain/blob/main/src/components/Bitcoin.jsx#L117"
      start="117" end="117" />

</TabItem>

<TabItem value="◎ Solana">
    <Github language="js"
      url="https://github.com/near-examples/near-multichain/blob/main/src/components/Solana.jsx#L106" start="106" end="106" />

</TabItem>

</Tabs>

The method returns a transaction hash which can be used to locate the transaction on an explorer.

:::info
⭐️ For a deep dive into the concepts of Chain Signatures, see [What are Chain Signatures?](../chain-signatures.md)

⭐️ For a complete example of a NEAR account using chain signatures in a frontend, see our [web app example](https://github.com/near-examples/near-multichain).

:::
