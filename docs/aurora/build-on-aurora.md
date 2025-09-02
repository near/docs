---
id: build-on-aurora
title: Build on Aurora
description: "Overview of building on Aurora and key concepts such as cross-chain compatibility, EVM compatibility, and onboarding users."
---

Developing your Dapp on Aurora is done in the same way as on any other EVM chain. The main steps in this process are:

- Writing and deploying your smart contracts in Solidity by using Hardhat, Foundry, Truffle, or Remix.
- Creating a frontend that interacts with these smart contracts and blockchain.

:::info
This section is just an overview of the development process on Aurora. For more detailed information, please refer to the [Aurora documentation](https://doc.aurora.dev/build-a-dapp/introduction).
:::

## Deploy Contracts

To deploy your first contract on Aurora, basically you need to:

1. Have a smart contract written in Solidity. If you don't have one, you can use the [Incrementer example contract](https://github.com/aurora-is-near/aurora-examples/tree/main/hardhat/incrementer-example).

2. Get an Aurora Private key (from MetaMask or other Web3 wallet).

3. Deploy the contract using Hardhat, Foundry, Truffle or Remix using the Aurora RPC endpoint. They're preconfigured in the Incrementer example ([hardhat.config.js](https://github.com/aurora-is-near/aurora-examples/blob/main/hardhat/incrementer-example/hardhat.config.js) file).

---

## Build Frontend

Aurora supports major EVM-compatible Connect Wallet modules, such as:

- [Wagmi](https://wagmi.sh/)
- [AppKit (known also as Web3Modal)](https://walletconnect.com/appkit)
- [RainbowKit](https://www.rainbowkit.com/)
- [ConnectKit](https://family.co/docs/connectkit)
- [Dynamic](https://dynamic.xyz/)
- [Privy](https://privy.io/).

Code examples and guides how to connect wallet and interact with smart contracts from the frontend can be found in the official [Aurora documentation](https://doc.aurora.dev/build-a-dapp/frontend/connect-wallet).

---

## Cross-Chain Applications

Aurora itself is a virtual chain, because it's EVM built as a smart contract. Every virtual chain on top of NEAR protocol can benefit from [Chain Signatures](../chain-abstraction/chain-signatures) technology.

Chain Signatures on virtual chains enable all addresses, both EOAs (Externally Owned Accounts) and smart contracts, to sign and execute transactions across many blockchain protocols.

You can use Chain Signatures on your virtual chain by:

- Deploying [Chain Signatures Signer](https://github.com/aurora-is-near/chain-signatures-signer) contract to your virtual chain.
- Using libs to derive accounts, create and relay transactions ([Chain Signatures JS](https://github.com/aurora-is-near/chain-signatures-js/), [Near Multichain Examples](https://github.com/near-examples/near-multichain/tree/main)).

To learn more about leveraging Chain Signatures on your virtual chain, please refer to the [Aurora documentation](https://doc.aurora.dev/crosschain/chain-signatures).

---

## Onboarding Users

To make onboarding users easier, even ones unfamiliar with the Web3 ecosystem, Aurora provides Aurora Pass, a mobile cryptocurrency wallet that makes your interactions with Aurora or any of the Aurora Chains easier than ever, whether transferring your assets or using a DApp.

**Key Features:**

- Simple and user-friendly interface.
- 50 free transactions for each user per month.
- Secure and non-custodial wallet.
- Send and receive assets on Aurora Mainnet and Aurora Chains.
- View your portfolio balances and recent transactions.
- Connect to DApps via WalletConnect v2.

To learn more about Aurora Pass, please refer to the [Aurora documentation](https://doc.aurora.dev/onboard/introduction).