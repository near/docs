---
id: chain-signatures
title: What are Chain Signatures?
sidebar_label: What are Chain Signatures?
description: "Learn how Chain Signatures enable NEAR accounts to sign and execute transactions across multiple blockchains using Multi-Party Computation for secure cross-chain operations."
---


Chain signatures enable NEAR accounts, including smart contracts, to sign and execute transactions across many blockchain protocols.

This unlocks the next level of blockchain interoperability by giving ownership of diverse assets, cross-chain accounts, and data to every single NEAR account.

![chain-signatures](/docs/assets/welcome-pages/chain-signatures-overview.png)
_Diagram of a chain signature in NEAR_

## Benefits

Integration with Chain Signatures brings many benefits to Web3 developers:

- Single Account, Multi-Chain Operations: Developers can manage interactions with external blockchains from one NEAR account. This simplifies key management and reduces the need for multiple wallets or addresses, enhancing user experience and security.

- Reduced Overhead in Cross-Chain Development: Chain Signatures eliminate the complexity of managing transactions across different blockchains. Developers can write smart contracts on NEAR that directly sign for cross-chain transactions, cutting down on code redundancy and potential points of failure.

- Secure Transaction Signing: Using [Multi-Party Computation (MPC)](#multi-party-computation-service), developers gain access to a decentralized signing process for multi-chain transactions. This means no single entity controls the signing key, reducing risks associated with centralized custodianship.

:::tip

Keep in mind that Chain Signatures is a “one way” solution to sign and execute outbound transactions happening on other blockchains.
If you're looking to access states on external blockchains, you should check out Omnibridge.

:::

## Interoperability

NEAR's chain abstraction stack allows developers to leverage powerful interoperability options across different blockchains. Developers can execute their business logic and deploy smart contracts on NEAR’s scalable blockchain infrastructure, while maintaining control over external accounts (such as Bitcoin, Ethereum, Base) and assets natively.

This integrated approach combines external blockchain assets with NEAR’s scalability, enabling the development of native dApps that offer superior performance and an optimized user experience. By combining the strengths of different ecosystems, NEAR Protocol unlocks an array of transformative possibilities without compromising on decentralization or scalability.

## Use Cases

The Chain Signatures architecture provides a decentralized method to interact with multiple blockchains from one NEAR account. With Chain Signatures, blockchain use cases expands to new levels.

### Bitcoin DeFi

Developers can build decentralized finance (DeFi) applications on NEAR, such as decentralized exchanges (DEXs), lending platforms, or yield farming protocols, while directly leveraging Bitcoin liquidity. The business logic resides on NEAR, while BTC is used for actual payments.

#### Examples

- Atomic Swaps: Facilitate trustless, instant exchanges between Bitcoin and other cryptocurrencies, enhancing liquidity and reducing counterparty risk.
- Receive Bitcoin payments with a native transfer to a Chain Signature derived account.
- Use Chain Signatures to control the payment flow and execute Bitcoin transactions, such as locking or transferring assets.
- Use smart contracts on NEAR to encapsulate business logic such as interest calculations, borrowing, order processing, reward distribution, and repayments.

### Cross-Chain NFT Platforms

Developers can create a NFT marketplace on NEAR where users purchase NFTs using external cryptocurrencies such as Bitcoin. The marketplace could handle:

- BTC payments via Chain Signatures and Omnibridge.
- NFT minting and trading logic on NEAR. (_NFTs could also be minted on multiple blockchains thanks to Chain Signatures_)

---

## How It Works

Controlling accounts and their assets on other blockchain platforms is made possible thanks to the interaction between three elements:

1. [**Derivation Paths**](#derivation-paths-one-account-multiple-chains) - A deterministic way to derive foreign addresses from one NEAR account
2. [**Multichain Smart Contract**](#multichain-smart-contract) - Receives requests to sign a transaction for other blockchains
3. [**Multiparty Computation Service**](#multi-party-computation-service) - Third-party service providing signatures to the contract

![Chain Signatures](/docs/assets/chain-abstraction/chain-abstract-2.svg)
_Chain signatures flow_

<hr class="subsection" />

### Derivation Paths: One Account, Multiple Chains

Chain Signatures link NEAR accounts to addresses in other blockchain using [Additive Key Derivation](https://eprint.iacr.org/2021/1330) (a simple mechanism for deriving many subkeys from a single master key). These keys are generated using `derivation paths` (or `paths` for short).

A `derivation path` is simply a string (e.g. `ethereum-1`, `ethereum-2`, etc) that in conjunction with the NEAR account derives a unique address on the target blockchain.

For example, we can derive multiple Ethereum addresses from `example.near` by using different paths:

  1. `example.near` + `ethereum-1` = `0x1b48b83a308ea4beb845db088180dc3389f8aa3b`
  2. `example.near` + `ethereum-2` = `0x99c5d3025dc736541f2d97c3ef3c90de4d221315`
  3. `example.near` + `...` = `0x...`

It is important to note that this allows us to discover the **public address** of the foreign account that we can control. To actually control the foreign account, we need to request signatures from the MPC service.

:::tip
In practice, the external address is deterministically derived using the NEAR address (`example.near`), the path (`ethereum-1`) and the MPC service's public key
:::

<hr class="subsection" />

### Multichain Smart Contract

A deployed multichain smart contract ([v1.signer](https://nearblocks.io/address/v1.signer)) is used to request signatures for transactions on other blockchains.

This contract has [a `sign` method](https://github.com/near/mpc/blob/01f33ed0a2a2c4c24ef49a2f36df3b20aa400816/libs/chain-signatures/contract/src/lib.rs#L242) that takes these three parameters:

  1. The `payload` (transaction or transaction hash) to be signed for the target blockchain.
  2. The `path` that identifies the account to be used to sign the transaction.
  3. The `domain_id` as an integer that identifies the signature scheme to be used for generating the signature. Currently this can be `0` for Secp256k1 or `1` for Ed25519.

For example, a user could request a signature to `send 0.1 ETH to 0x060f1...` **(transaction)** using the `ethereum-1` account **(path)** with `0` (Secp256k1) as **domain ID**.

After a request is made, the `sign` method will [yield execution](/blog/yield-resume) waiting while the [MPC signing service](#multi-party-computation-service) signs the transaction.

Once the signature is ready, the contract resumes computation and returns it to the user. This signature is a valid signed transaction that can be readily sent to the target blockchain to be executed.

:::tip
The `sign` method currently supports both Secp256k1 and Ed25519 signature schemes which enables signing transactions for the vast majority of the well-known blockchains including Bitcoin, Ethereum, Solana, BNB chain, Ton, or Stellar. In the future, the MPC participants can add more signature schemes via the `vote_add_domains` method.  
:::

<hr class="subsection" />

### Multi-Party Computation Service

The essence of Multi-Party Computation (MPC) is to enable independent parties to perform shared computations on private information without revealing secrets to each other. In practice, this system can be used with blockchain platforms to safely sign a transaction on behalf of a user without ever having to expose a private key.

NEAR's MPC service is comprised of several independent nodes, **none of which can sign by itself**, but instead create **signature-shares** that are **aggregated through multiple rounds** to **jointly** sign a transaction.

This service continuously listens for signature requests (i.e. users calling the `sign` method on the `v1.signer` smart contract) and when a call is detected the MPC service:

  1. Asks its nodes to jointly derive a signature for the `payload` using the account identified by the `path`
  2. Once complete, call the `v1.signer` contract to store the resulting `Signature`

:::info A Custom MPC Service
Generally, MPC signing services work by sharing a master key, which needs to be re-created each time a node joins or leaves.

NEAR's MPC service allows for nodes to safely join and leave, without needing to re-derive a master key.
:::

:::tip
Want to learn more about the mathematics that enable MPC? [**Check this awesome article**](https://www.zellic.io/blog/mpc-from-scratch/).
:::

---

## Concluding Remarks

Chain Signatures are a powerful tool that allows NEAR accounts to control accounts on other blockchains. This is a fundamental step towards enabling true ownership of cross-chain data and assets.

For the user, the process is made completely **on chain**, since they only need to make a call to a smart contract and wait for the response.

Thanks to `derivation paths`, a single NEAR account can control **multiple accounts** on different blockchains, and thanks to the MPC service, the user can be sure that **nobody but themselves** can request signatures for those accounts.
