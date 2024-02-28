---
id: chain-signatures
title: Cross-Chain Signatures
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

Chain Signatures unlock the ability for a single account to transact across multiple blockchain protocols, giving ownership of cross-chain accounts, data, and assets to one NEAR account.

In this document we cover the steps necessary to sign a transaction for another chain, we recommend you to read our [**overview of Chain Signatures**](../1.concepts/abstraction/chain-signatures.md) before, as well as some of its [**use cases**](../1.concepts/abstraction/signatures/use-case.md).

:::info

See our [web-app example](https://github.com/near-examples/near-multichain) and [component example](https://test.near.social/md1.testnet/widget/chainsig-sign-eth-tx) showing how a NEAR account can create an Ethereum testnet transaction.

:::

***

## Create the Payload

The first step is to use Chain Signatures is to construct a payload (transaction, message, data, etc.) for the target blockchain platform. This variates depending on the target blockchain, but in general, it's a hash of the message or transaction to be signed.

<Tabs groupId="code-tabs">
  <TabItem value="Ξ Ethereum">
    <Github language="js"
      url="https://github.com/near-examples/near-multichain/blob/main/src/ethereum.js"
      start="18" end="40" />

</TabItem>

<TabItem value="₿ Bitcoin">

```js
console.log("Coming soon...")
```

</TabItem>

</Tabs>

***

## Request & Reconstruct a Signature

Once a payload is created and ready to sign, a signature request is made by calling `sign` on the [MPC smart contract](../1.concepts/abstraction/chain-signatures.md#2-signature-request).

The method expects the `payload` to be signed for the target blockchain, and a `path` representing the account that should be used to sign the payload (learn more [here](../1.concepts/abstraction/chain-signatures.md#2-signature-request)).

<Tabs groupId="code-tabs">
  <TabItem value="Ξ Ethereum">
    <Github language="js"
      url="https://github.com/near-examples/near-multichain/blob/main/src/index.js"
      start="49" end="54" />

</TabItem>

<TabItem value="₿ Bitcoin">

```js
console.log("Coming soon...")
```

</TabItem>

</Tabs>

The contract will take some time to respond, as it needs to wait for the [`MPC signing service`](../1.concepts/abstraction/chain-signatures.md#3-mpc-signing-service). Once finished, the result will not be the signature on itself, but the elements needed to reconstruct the signature.

<Tabs groupId="code-tabs">
  <TabItem value="Ξ Ethereum">
    <Github language="js"
      url="https://github.com/near-examples/near-multichain/blob/main/src/ethereum.js"
      start="49" end="57" />

</TabItem>

<TabItem value="₿ Bitcoin">

```js
console.log("Coming soon...")
```

</TabItem>

</Tabs>

***

## Relaying the Signature

Once we have reconstructed the signature, we can relay it to the corresponding network. This will once again vary depending on the target blockchain.

<Tabs groupId="code-tabs">
  <TabItem value="Ξ Ethereum">
    <Github fname="index.js" language="js"
      url="https://github.com/near-examples/near-multichain/blob/main/src/ethereum.js"
      start="43" end="47" />

</TabItem>

<TabItem value="₿ Bitcoin">

```js
console.log("Coming soon...")
```

</TabItem>

</Tabs>
