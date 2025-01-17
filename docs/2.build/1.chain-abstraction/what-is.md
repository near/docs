---
id: what-is
title: What is Chain Abstraction?
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs";

![img](/docs/assets/welcome-pages/chain-abstraction-landing.png)

`Chain abstraction` is about **abstracting away** the complexities of **blockchain technology** from end-user experiences while maintaining its benefits. Users should not have to worry about which blockchain they are using or whether they are using one at all. NEAR Protocol advances this vision by introducing a framework that transcends single-platform development, enabling applications to control assets across any blockchain.

:::info Example
As an example, using Chain Abstraction a web app could allow users to collect NFTs across different chains, without users ever needing to explicitly create a blockchain account or acquire crypto tokens.
:::

## Chain Abstraction: The Holistic View

The chain abstraction framework allows to create a **seamless** user experience, in which users can use blockchain-based applications without realizing they are using a blockchain.

To achieve this goal and enable hassle-free access to a wider range of crypto assets, smart contracts, and blockchain states, the chain abstraction framework leverages a trio of key technologies: the [intent layer](#intent-layer), [chain signatures](#chain-signatures), and the [omnibridge](#omnibridge).

You can see how these technologies interact together in the following high-level diagram:

![Chain Abstraction Stack](/docs/assets/chain-abstract-1.png)
_Chain Abstraction Stack high-level diagram_
 
- The [intent layer](#intent-layer) serves as a foundational framework for user requests.
- [Chain signatures](#chain-signatures) empower smart contracts to sign transactions across different assets and chains.
- [Omnibridge](#omnibridge) facilitates communication and state transitions between various blockchains, ensuring that transactions are executed smoothly.

### Intent layer

In NEAR, an intent can be thought of as a high-level declaration of what a user wants to achieve on the blockchain. Solvers are active market participants that fill in the intents issued by users.
The intent layer provides a message bus for communication between solvers and users.

In summary, the intent layer allow users to express what they want to accomplish (their intention) while the network figures out the best way to make it happen.
Developers building on NEAR can use intents to create more user-friendly interactions, as it abstracts some of the complexities of directly interacting with smart contracts.

NEAR intents work by:
- Expressing needs: Define your `intent`.
- Network response: NEAR finds the optimal solution. (Solvers)
- Seamless execution: Tasks are completed when parameters are met.
- Collaboration: Agents work together if needed.

:::info Example
A user creates a wishlist, and let NEAR Intents find the item, add it to the cart, and pay for it as soon as it goes on sale.
:::

### Chain Signatures

By using [Multi-Party Computation (MPC)](../../1.concepts/abstraction/chain-signatures.md#multi-party-computation-service), Chain Signatures enables accounts and smart contracts on the NEAR blockchain to sign and execute transactions on external chains, such as Bitcoin, Ethereum, and Base.

For example, this allows a dApp built on NEAR to interact with Bitcoin’s UTXO model, enabling advanced functionality like asset transfers or decentralized finance (DeFi) protocols.

:::tip
To learn more about Chain Signatures, the concepts, and how to implement it, check these articles:
- [What are Chain Signatures?](../../1.concepts/abstraction/chain-signatures.md)
- [Getting started with Chain Signatures](chain-signatures/getting-started.md)
- [Implementing Chain Signatures](chain-signatures/chain-signatures.md)
:::

### OmniBridge

The [OmniBridge](https://github.com/Near-One/omni-bridge) is a multi-chain asset bridge that facilitates secure and efficient asset transfers between different blockchain networks, leveraging NEAR Multi-Party Computation (MPC) and Chain Signatures technology.

OmniBridge acts as an aggregator of various message passing layers and light clients, enabling NEAR smart contracts to access states on external blockchains including Bitcoin, Ethereum, and Solana.

---

## Multi-chain signatures: One account, multiple chains

Currently, users and applications are siloed in different chains. This means that a user needs to create a new account for each chain they want to use. This is not only cumbersome for the user, but also for the developer who needs to maintain different codebases for each chain.

NEAR Protocol provides a multi-chain signature service that allows users to use their NEAR Account to sign transactions in **other chains**. This means that a user can use the same account to interact with **Ethereum**, **Binance Smart Chain**, **Avalanche**, and **NEAR**.

![Chain Signatures](/docs/assets/chain-abstract-2.png)

:::info
Multi-chain signatures work by combining **smart contracts** that produce signatures, with indexers that listen for these signatures, and relayers that submit the transactions to other networks. This allows users to hold assets and use applications in **any** network, only needing to have a single NEAR account.
:::

---

## Applications

Thanks to significant advancements in the cryptocurrency space, including cross-chain interactions, account management, and the raise of AI applications, truly innovative projects are being developed in the NEAR ecosystem.

### Bitcoin Use Cases

- [BitcoinFi](https://medium.com/@ProximityFi/building-bitcoin-native-dapps-with-nears-abstraction-stack-fb4aeb448eee#df89)
- [Payment Gateways for Merchants](https://medium.com/@ProximityFi/building-bitcoin-native-dapps-with-nears-abstraction-stack-fb4aeb448eee#0c38)
- [Cross-Chain NFT Platforms](https://medium.com/@ProximityFi/building-bitcoin-native-dapps-with-nears-abstraction-stack-fb4aeb448eee#521b)
- [Bitcoin Custody Solutions](https://medium.com/@ProximityFi/building-bitcoin-native-dapps-with-nears-abstraction-stack-fb4aeb448eee#6a7c)

### Relayers: Cover gas fees

Allowing users to start using a dApp without having to acquire funds is a powerful tool to increase user adoption. NEAR Protocol provides a service that allows developers to subsidize gas fees for their users.

This concept, known as "Account Abstraction" in other chains, is a **built-in feature** in NEAR. User can wrap transactions in messages known as **meta-transaction**, that any other account can relay to the network.

:::tip
In NEAR the relayers simply attach NEAR to cover gas fees, and pass the transaction to the network. There, the transaction is executed as if the **user had sent it**.
:::
