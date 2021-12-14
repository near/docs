---
id: introduction
title: Zero to Hero NFT tutorials
sidebar_label: Introduction
---

In this _Zero to Hero_ series, you'll find a set of tutorials that will cover every aspect of a non-fungible token (NFT) smart contract.
You'll start by minting an NFT using a pre-deployed contract, and you'll end up building a fully-fledged NFT smart contract that supports every extension, including royalties, events and an NFT marketplace.

## Prerequisites

To complete these tutorial successfully, you'll need:

- [A NEAR account](#near-account) (Wallet)
- [Rust toolchain](/docs/develop/contracts/rust/intro#installing-the-rust-toolchain)
- [NEAR command-line interface](/docs/tools/near-cli#setup) (`near-cli`)

:::info New to Rust?
If you are new to Rust and want to dive into smart contract development, our [Quick-start guide](/docs/develop/contracts/rust/intro) is a great place to start.
:::

### NEAR Account

To store your non-fungible tokens you'll need a [NEAR Wallet](https://wallet.testnet.near.org/).

:::tip
If you don't have a Wallet account yet, you can create one easily by following [these instructions](/docs/develop/basics/create-account).
:::

Once you have your Wallet account, you can click on the [Collectibles](https://wallet.testnet.near.org/?tab=collectibles) tab where all your NFTs will be listed:

![Wallet](/docs/assets/nfts/nft-wallet.png)

### Installing the `near-cli`

To install the CLI, follow the instructions from the `near-cli` [installation
guide](/docs/tools/near-cli#setup). If you already have the command line
interface, you can skip these steps.

## Tutorials

These are the NFT tutorials that will bring you from _Zero_ to _Hero_ in no time:

1. [Pre-deployed contract](/docs/tutorials/contracts/nfts/predeployed-contract): the first tutorial introduces you to minting an NFT without the need to code, create, or deploy a smart contract.
1. [Contract architecture](/docs/tutorials/contracts/nfts/skeleton): in the second tutorial you'll learn the basic architecture of the NFT smart contract, and you'll compile this skeleton code with the Rust toolchain.
1. [Minting](/docs/tutorials/contracts/nfts/minting): here you'll flesh out the skeleton so the smart contract can mint a non-fungible token.
1. [Upgrade a contract](/docs/tutorials/contracts/nfts/upgrade-contract): in this tutorial you'll discover the process to upgrade an existing smart contract.
1. [Enumeration](/docs/tutorials/contracts/nfts/enumeration): here you'll find different enumeration methods that can be used to return the smart contract's states.
1. [Core](/docs/tutorials/contracts/nfts/core): in this tutorial you'll extend the NFT contract using the core standard, which will allow you to transfer non-fungible tokens. 
1. [Approvals](/docs/tutorials/contracts/nfts/approvals): here you'll expand the contract allowing other accounts to transfer NFTs on your behalf.
1. [Royalty](/docs/tutorials/contracts/nfts/royalty): here you'll add the ability for non-fungible tokens to have royalties. This will allow people to get a percentage of the purchase price when an NFT is purchased.

<!--
1. [Events](/docs/tutorials/contracts/nfts/events): in this tutorial you'll explore the events extension, allowing the contract to react on certain events.
1. [Marketplace](/docs/tutorials/contracts/nfts/marketplace): in the last tutorial you'll be exploring some key aspects of the marketplace contract.
-->

## Next steps

If you're ready to start, jump to the [Pre-deployed Contract](/docs/tutorials/contracts/nfts/predeployed-contract) tutorial and begin your learning journey.
If you already know about non-fungible tokens and smart contracts, feel free to skip and jump directly to the tutorial of your interest. The tutorials have been designed so you can start at any given point.

:::info Questions?
Join us on [Discord](https://near.chat/) and let us know in the `#development` channels. 
We also host daily [Office Hours](https://near.org/office-hours/) live Monday – Friday 11AM – 12PM PT (6PM – 7PM UTC), where the DevRel team will answer any questions you may have.
:::