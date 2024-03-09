---
id: chain-signatures
title: What are Chain Signatures?
sidebar_label: What are Chain Signatures?
---

Chain signatures enable NEAR accounts, including smart contracts, to sign and execute transactions across many blockchain protocols.

This unlocks the next level of blockchain interoperability by giving ownership of diverse assets, cross-chain accounts, and data to a single NEAR account.

:::info Looking for code?

To get started using Chain Signatures in your project see **[Create a Chain Signature](../../8.abstraction/chain-signatures.md)**.

:::

---

## How It Works

Controlling accounts and their assets on other blockchain platforms is made possible thanks to the interaction between three elements:

1. [**Derivation Paths**](#derivation-paths-one-account-multiple-chains) - A deterministic way to derive multiple foreign addresses from one NEAR account
2. [**Multichain Smart Contract**](#multichain-smart-contract) - Receives requests to sign a transaction for other blockchains
3. [**Multiparty Computation Service (MPC)**](#multi-party-computation-service-mpc) Third-party service providing signatures to the contract

<hr class="subsection" />

### Derivation Paths: One Account, Multiple Chains

Chain Signatures link NEAR accounts to other blockchain accounts using what is called `derivation paths` (or `paths` for short).

A path is just a string (e.g. `ethereum-1`, `ethereum-2`, etc) that in conjunction with the NEAR account derives a unique address on the target blockchain.

For example, we can derive multiple Ethereum accounts from `example.near` by using different paths:

  1. `example.near` + `ethereum-1` = `0x1b48b83a308ea4beb845db088180dc3389f8aa3b`
  2. `example.near` + `ethereum-2` = `0x99c5d3025dc736541f2d97c3ef3c90de4d221315`
  3. `example.near` + `...` = `0x...` 

:::info Technical Details

The external address is deterministically derived from the account's ID, the path, and the MPC service's public key.

See our Build section to see [how the derivation is implemented](../../8.abstraction/chain-signatures.md#1-deriving-the-foreign-address).
:::

<hr class="subsection" />

### Multichain Smart Contract

A deployed smart contract is used to request signatures for transactions on other blockchains.

The contract has a `sign` method that takes two parameters:

  1. The `transaction` (transaction) to be signed for the target blockchain
  2. The `path` that identifies the account you want to use to sign the transaction.

For example, a user could request a signature to `send 0.1 ETH to 0x060f1...` **(transaction)** using the `ethereum-1` account **(path)**.

After a request is made, the `sign` method starts recursively calling itself in order to wait while the [MPC signing service](#multi-party-computation-service-mpc) signs the transaction.

Once the signature is ready, the contract will gain access to it, and return it to the user. This signature is a valid signed transaction that can be readily sent to the target blockchain to be executed.

<details>
<summary> A Contract Recursively Calling Itself? </summary>

NEAR smart contracts are unable to halt execution and await the completion of a process. To solve this, one can make the contract call itself again and again checking on each iteration if the result is ready.

Note that each call will take one block, and thus result on ~1s of waiting. After some time the contract will either return a result - since somebody external provided it - or run out of GAS waiting.

</details>

:::info Technical Details
Curious on how you can use the contract? Check the technical docs: [requesting the signature](../../8.abstraction/chain-signatures.md#3-requesting-the-signature).
:::

<hr class="subsection" />

### Multi-Party Computation Service (MPC)

 What is an MPC Service?

MPC (multi-party computation) allows independent actors to do shared computations on private information, without revealing secrets to each other.

NEAR uses its own MPC service to safely sign transactions for other chains on behalf of the user. In practice, **no single node** on the MPC can **sign by itself** since they do **not hold the user's keys**. Instead, nodes create signature-shares which are aggregated through multiple rounds to jointly sign the transaction.

Generally, MPC signing services work by sharing a master key, which needs to be re-created each time a node joins or leaves. NEAR's MPC service allows for nodes to safely join and leave, without needing to re-derive a master key.

If you want to learn more about how MPC works, we recommend to [**check this article**](https://www.zellic.io/blog/mpc-from-scratch/)




The NEAR MPC service is constantly listening for signature requests (i.e. users calling the `sign` method). When a call is detected, the MPC service will:
  1. Ask its nodes to jointly derive a signature for the `payload` using the account identified by the `path`
  2. Call the multichain contract, storing the resulting `Signature`

It is important to notice that the signature process is not performed by a single node, but by multiple nodes working together to sign the payload.

**No single node can sign by itself** since they do **not hold the user's keys**. Instead, nodes create **signature-shares** which are **aggregated through multiple rounds** to **jointly** sign the payload.

:::info A Custom MPC Service
Generally, MPC signing services work by sharing a master key, which needs to be re-created each time a node joins or leaves

NEAR's MPC service allows for nodes to safely join and leave, without needing to re-derive a master key
:::

:::tip
Want to learn more about the mathematics that enable MPC? [**Check this awesome article**](https://www.zellic.io/blog/mpc-from-scratch/)
:::

---

## Concluding Remarks
Chain Signatures are a powerful tool that allows NEAR accounts to control accounts on other blockchains. This is a fundamental step towards enabling true ownership of cross-chain data and assets.

For the user, the process is made completely **on chain**, since they only need to make a call to a smart contract and wait for the response.

Thanks to `derivation paths`, a single NEAR account can control **multiple accounts** on different blockchains, and thanks to the MPC service, the user can be sure that **nobody but themselves** can request signatures for those accounts.

