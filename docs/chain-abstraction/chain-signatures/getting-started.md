---
id: getting-started
title: Getting Started with Chain Signatures
description: "Learn how to sign and execute cross-chain transactions"
---

Chain Signatures is a groundbreaking technology built on NEAR that enables all accounts, including smart contracts, to sign and execute transactions across multiple blockchains.

![img](https://pages.near.org/wp-content/uploads/2024/02/acct-abstraction-blog-1.png)

This innovation leverages Multi-Party Computation (MPC) and a distributed network of node operators to create joint signatures from arbitrary payloads, allowing NEAR accounts to control external blockchain accounts.

Chain Signatures enhances blockchain interoperability, giving ownership of diverse assets, cross-chain accounts, and data to a single NEAR account.

---

## How does it work?

When a NEAR account - could be a user or a **smart contract** - wants to interact with a foreign blockchain, it just need to follow four simple steps.

![Chain Signatures](/docs/assets/chain-abstraction/chain-abstract-2.svg)
_Chain signatures flow_

#### 1. Deriving Foreign Addresses

Chain Signatures uses [derivation paths](../chain-signatures.md#derivation-paths-one-account-multiple-chains) to represent accounts on foreign blockchains

The NEAR account’s name and the derivation path are used to mathematically derive a unique address for the user on the foreign blockchain

<details>

<summary> Derivation Paths </summary>

A NEAR account will always derive the same address on the foreign blockchain using the same derivation path

Notice that, since the foreign address is derived from the NEAR account name, it is not possible for another NEAR account to control the same address

</details>


#### 2. Creating the Transaction

The client constructs the foreign transaction to be signed, which varies depending on the target blockchain

:::tip

You can use the [Omni Transaction](https://github.com/near/omni-transaction-rs) Rust library to build transactions easily for different blockchains (like Bitcoin and Ethereum) inside NEAR contracts and Rust clients.

:::

#### 3. Requesting the Signature

A NEAR account or contract calls the sign method of the MPC smart contract ([v1.signer](https://nearblocks.io/address/v1.signer)) to sign the transaction and waits while our MPC service generates the signature

#### 4. Relaying the Signature

Once the signature is ready, the client reconstructs the signed transaction using the signature and broadcasts it to the destination blockchain

:::tip

Using Chain Signatures, developers can build cross-chain DeFi applications with seamless user experiences, eliminating the need for traditional bridges. This process eliminates the need for traditional bridges and enables developers to build innovative cross-chain DeFi applications with seamless user experiences.

:::

---

## Use Cases

Chain Signatures can be used to build a wide range of applications that leverage blockchain interoperability. Here are some examples:

1. **DeFi on Bitcoin (and other chain without smart contracts)**
   * Chain signatures allow NEAR smart contract to program assets on Bitcoin
   * Build lending, swaps, runes launchpads, passkey-based Bitcoin wallets, and more
2. **Chain agnostic applications**
   * Since chain signatures can sign transactions for all blockchains, developers can support every single chain with just one smart contract
   * Multichain DEXs, lending protocols, oracles, derivatives, and more
3. **Multichain account abstraction**
   * Users can control assets on all chains with just their NEAR account, and can utilize account abstraction features on any chain including passkeys, key rotation, etc
   * Using the multichain gas relayer, users can pay for gas fees on any chain using USDC
4. **Privacy**
   * Chain signatures can be used to encrypt and decrypt information in a programmatic way
   * This enables privacy applications, and even decrypting information based on ownership of assets/NFTs

---

## How to Get Started?

1. **Familiarize Yourself with Chain Signatures:**
   * Understand the [basics of Chain Signatures](/chain-abstraction/chain-signatures) and how they simplify blockchain interactions.
   * Review the technical [explainer](https://near.org/blog/unlocking-web3-usability-with-account-aggregation).
2. **Explore the Use Cases:**
   * Review [examples of use cases for Chain Signatures](https://pages.near.org/blog/unlocking-multichain-web3-with-near-chain-signatures/), such as Multichain DAO, Multichain NFT Minter, and Bitcoin Runes Airdrop.
3. **Access Resources and Documentation:**
   * Visit the [Chain Signatures documentation](/chain-abstraction/chain-signatures) for detailed technical information and code snippets.
   * Check out the [Linktree for Chain Signatures](https://linktr.ee/chainsignatures) for various resources, including demos and tutorials.
4. **Try the Demos:**
   * Use the [command-line-based demo](https://github.com/near-examples/chainsig-script) to derive accounts and send transactions on Bitcoin, Ethereum, Doge, and Ripple.
   * Check out the [web app demo](https://github.com/near-examples/near-multichain/tree/main).
5. **Engage with the Community:**
   * Join the [Chain Abstraction developers’ channel on Telegram](https://t.me/chain\_abstraction) to connect with other developers and get support.

---

## Where to Learn More?

To dive deeper into Chain Signatures and its applications, you can explore the following resources:

- **Technical Blogs and Deep Dives:** Read [high-level use cases](https://pages.near.org/blog/unlocking-multichain-web3-with-near-chain-signatures) and technical [explainer](https://near.org/blog/unlocking-web3-usability-with-account-aggregation) posts on the NEAR blog
* **Community and Support:** Engage with the NEAR community on social media platforms like Twitter and participate in discussions to stay updated on the latest developments
