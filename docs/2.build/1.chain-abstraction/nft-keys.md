---
id: nft-chain-keys
title: NFT Chain Keys Smart Contract
sidebar_label: NFT Chain Keys Contract
---

The NFT Chain Keys smart contract makes the ownership of remote accounts both provable and transferrable. This new paradigm allows you to create new end-user experiences that leverage provable and transferrable remote accounts as a core primitive. 

## Contract overview

The [MPC Account Recovery smart contract](https://github.com/near/mpc-recovery) provides a [`sign`](https://github.com/near/mpc-recovery#sign) method that accepts a `path` parameter. This allows one predecessor account to have access to an effectively unlimited number of MPC keys.

The NFT Chain Keys contract takes advantage of this property and allows secure transfers of MPC keys between users, using the [NEP-171 NFT contract standard](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core).
The contract also implements new functionality to enable chain key management features.

:::info

The essence of Multi-Party Computation (MPC) is to enable independent parties to perform shared computations on private information without revealing secrets to each other.

:::

### Standards

Besides the NEP-171 contract standard, the NFT Chain Keys contract complies with a full suite of NEP standards:

- [NEP-145: Storage Management](https://nomicon.io/Standards/StorageManagement)
- [NEP-171: NFT Core](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core)
- [NEP-177: Metadata](https://nomicon.io/Standards/Tokens/NonFungibleToken/Metadata)
- [NEP-178: Approval Management](https://nomicon.io/Standards/Tokens/NonFungibleToken/ApprovalManagement)
- [NEP-181: Enumeration](https://nomicon.io/Standards/Tokens/NonFungibleToken/Enumeration)

## Usage

Please refer to the smart contract [GitHub documentation](https://github.com/near/multichain-gas-station-contract/blob/master/nft_key/README.md) for usage information:

- [Creating new key tokens](https://github.com/near/multichain-gas-station-contract/tree/master/nft_key#creating-new-key-tokens): mint unlimited new NFT chain keys, as long as the account has sufficient storage.
- [Issuing signatures](https://github.com/near/multichain-gas-station-contract/tree/master/nft_key#issuing-signatures): generate new signatures based on a submitted payload.
- [Approvals](https://github.com/near/multichain-gas-station-contract/tree/master/nft_key#approvals): implement a separate set of approval management functions for using NFTs, which operate similarly to NEP-178.


---

## Use Cases for NFT Keys

:::info Disclaimer
The ideas presented in this section are just initial concepts, and shouldn’t be considered as fully fledged solutions.
:::

### Remote Account Marketplace

NFT Keys enable users to buy, sell, and trade remote accounts within a marketplace-style application.
For instance, _Alice_, possessing a set of remote accounts with value and history, can mint an NFT key and list these accounts for sale on the marketplace.
Potential buyers, like _Bob_, can browse the value of _Alice’s_ accounts and choose to make a purchase.
If _Bob_ decides to proceed, they would simply need to acquire ownership of the original NFT key from _Alice_ in exchange for payment, such as in `$NEAR`.
Once the transaction is completed, ownership of the accounts transfers to _Bob_.

### Bridgeless Multi-Chain DEX

You can create a Multi-chain DEX without bridging by combining Chain Signatures with NFT Keys.
Users wishing to swap asset `$A` for asset `$B` would initiate the swap on the bridgeless DEX.
Supported by liquidity providers (Automated Market Makers) across multiple chains, the DEX facilitates these swaps.
Here's how it works:

- A user proposes the swap, specifying asset `$A` in remote `account X` for asset `$B` in remote `account Y`.
- The liquidity provider receives asset `$A` from the user and sends the equivalent amount of asset `$B` to a newly created remote `account Y`, along with a minted NFT key.
- The NFT key is then sent to the user to complete the swap.

Although liquidity providers still need to leverage bridging to settle assets between different pools, users of this exchange type are exposed to reduced bridge risk.
