---
id: zk
title: Zero Knowledge Proofs
sidebar_label: Zero Knowledge Proofs
hide_table_of_contents: false
---

Zero Knowledge (ZK) is the ability to prove a statement without revealing any information about the statement itself. Zero Knowledge Proofs (ZKPs) allow one party (the prover) to prove to another party (the verifier) that a statement is true without revealing any information beyond the validity of the statement via cryptographic methods.

ZKPs have several interesting applications in the blockchain space including:
- Privacy: ZKPs can be used to prove that a transaction is valid without revealing the sender, receiver, or amount.
- Scalability: ZKPs can be used to compress large amounts of data into a succinct proof, for example bundling many transactions off-chain into a single batch.
- Regulatory Compliance: ZKPs can be used to produce verifiable credentials for KYC without revealing personal information.
- Trustless verifications: ZKPs can be used to verify off-chain computations without trusting the party that performed the computation, for example verifying that a specific AI model was used to generate a response off-chain and that it actually used the input that was given to it.

There are a number of different types of proofs that each come with their own benefits and drawbacks, to name a few there are Groth 16, Plonk, BulletProof, and STARK.

On NEAR there are a few products that offer ZKPs as a service.

## Reclaim Protocol
The Reclaim SDKs make it simple to bring user activity, reputation, and identity from external websites into your own platform. For example:
- Import the number of rides a user has taken on Uber to build a competing ride-sharing platform.
- Import a user's purchasing preferences using Amazon to provide discounts to the right users.
- Enable economics on a blockchain using users' off-chain activity data.
- Use national IDs to perform KYC.

To get started with Reclaim check out their [NEAR specific documentation](https://docs.reclaimprotocol.org/near/quickstart).

## Holonym
Holonym enables one to prove facts about themselves without revealing the whole identity. It allows organizations and smart contracts to verify their users without storing their users' sensitive information. One of the main use cases is for KYC compliance. Examples of facts a user can prove include:
- "I have US residency"
- "I have never received this airdrop from any other crypto address"
- "I am over 18"
- "I am the same person who created this wallet"

Check out their [documentation](https://docs.holonym.id/for-users/using-with-near) to get started.

## Other resources
- [Zero Knowledge Community Telegram](https://t.me/NearZeroKnowledge)
- [Example Groth 16 Verifier](https://crates.io/crates/near_groth16_verifier)
- [Example Plonk Verifier](https://github.com/opact-protocol/tickets/tree/main/packages/contract-libraries/plonk_verifier)
- [ZK Light Client Implementation in plonky2](https://github.com/ZpokenWeb3/zk-light-client-implementation)
- [ZK Light Client Implementation in STARK or groth 16](https://github.com/risc0/demos/tree/main/near-zk-light-client)