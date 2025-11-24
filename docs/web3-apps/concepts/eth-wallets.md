---
title: EVM Wallets on NEAR
id: eth-wallets-on-near
description: "Understand how NEAR supports Ethereum wallets"
---

Thanks to the [NEAR Wallet Selector](./web-login.md#wallet-selector), users can login into NEAR applications using [Ethereum-compatible wallets](https://ethereum.org/en/wallets/), such as MetaMask, Trust Wallet, and others. 

To make this possible, different components interact to translate Ethereum transactions into NEAR transactions, and vice-versa. Let's see how they work!

:::info

This page provides a high-level overview on how these components works, for a detailed specification please see the [NEAR Enhancement Proposal (NEP-518)](https://github.com/near/NEPs/issues/518).

:::

:::tip Searching for a tutorial?

Check our step-by-step tutorial on how to add Ethereum wallets support to your NEAR app using the [NEAR Wallet Selector](../tutorials/web-login/ethereum-wallets.md)

:::

---

## Components Overview

Since Ethereum wallets create _ethereum transactions_ and talk with _ethereum RPCs_, three components are needed to make them work on NEAR:

1. A `Transaction Encoder` service, that encodes NEAR actions into Ethereum transactions 
2. A `Translator RPC` service, that translates Ethereum RPC calls into NEAR RPC calls
3. A `Wallet Contract` that allows NEAR accounts to process EVM transactions

<img src="/website/static/assets/blog/web3wallets/diagram.png" height="600px" style={{width: "auto", display: "block", margin: "0 auto"}} />
*High-level architecture of Ethereum wallets on NEAR*

<hr class="subsection" />

### Transaction Encoder

The `Translator Encoder` - implemented [directly in the NEAR Wallet Selector](https://github.com/near/wallet-selector/blob/main/packages/ethereum-wallets/src/lib/index.ts) - takes the intent of the user (e.g. call `set_greeting` on `hello.near`) and translates it into an Ethereum transaction that the EVM wallet can sign.

#### To (field)
The `to` field of the Ethereum transaction is transformed following these rules:
- If the `receiverId` matches `^0x[a-f0-9]{40}$` (e.g. `0xD79...314`), then the `to` field is set to the `receiverId`
- Otherwise (e.g. `ana.near` or an implicit account) the `to` field is set as `keccak-256(receiverId)[12,32]`

#### Data (field)
The `data` field meanwhile contains the RLP-encoded NEAR actions wanted by the user, encoded as function calls on Ethereum, for example:
- `FunctionCall(to: string, method: string, args: bytes, yoctoNear: uint32)`
- `Transfer(to: string, yoctoNear: uint32)`
- `Stake(public_key: bytes, yoctoNear: uint32)`
- `AddKey(public_key: bytes, nonce: uint64, is_full_access: bool, allowance: uint256, receiver_id: string, method_names: string[])`

:::info

For more information on how other fields (such as `value`, `gas`, and `chainId`) are set, please refer to the [NEP-518 technical specification](https://github.com/near/NEPs/issues/518)

:::

<hr class="subsection" />

### Translator RPC

The `Translator RPC` is a service deployed at `https://eth-rpc.mainnet.near.org` (for mainnet) and `https://eth-rpc.testnet.near.org` (for testnet) that translates Ethereum RPC calls into NEAR RPC calls.

In other words, the `Translator RPC` simply acts as a relayer, taking the Ethereum transactions signed by the user and translating them into a function call into the `Wallet Contract` deployed in the user's account.

<hr class="subsection" />

### Wallet Contract

The `Wallet Contract` is a smart contract on NEAR that allows NEAR accounts to process EVM transactions.

The contract exposes a method called `rlp_execute`, which takes as argument an RLP-encoded Ethereum transaction, verifies its signature, and executes the NEAR actions encoded in the `data` field of the transaction.

Every NEAR account created through an EVM wallet has the `Wallet Contract` deployed on it.

:::tip Wallet Accounts

Remember that in NEAR **all accounts** can **have contracts**, and that **contracts** can perform **all the actions** that the **account can do**.

:::

---

## How it Works?

Let's see how the components described above interact when a user logs in and uses an application.

<hr class="subsection" />

### First Time Login

The first time you login through your EVM wallet, the wallet selector will contact the account `ethereum-wallets.near` to create a NEAR account with the same address as your Ethereum wallet. For example, if your address on Metamask is `0xD79...314`, the NEAR account created will be `0xD79...314`.

On this account, the `Wallet Contract` is deployed and a function-call key is added for the `rlp_execute` function of the contract

<img src="/website/static/assets/blog/web3wallets/login.png" style={{width: "auto", display: "block", margin: "0 auto"}} />
*On your first login, a NEAR accounts with the same address as your Ethereum wallet is created, and the Wallet Contract is deployed on it*

<hr class="subsection" />

### Using the Account

Once you have logged in, you can start interacting with the application. If at some point the application needs to interact with the blockchain, Metamask will ask you to sign a transaction.

Under the hood, Metamask will create an Ethereum transaction and send it to the `Translator API`, deployed at `https://eth-rpc.mainnet.near.org`.

The `Translator API` will then translate the Ethereum transaction into a **function call** into the `Wallet Contract` deployed in your account. Particularly, it will call the `rlp_execute` function, passing the Ethereum transaction as an argument. 

<img src="/website/static/assets/blog/web3wallets/function-call.png" style={{width: "auto", display: "block", margin: "0 auto"}} />

The `Wallet Contract` will then execute the function call, and the application will receive the result.

---

## Resources

Check the following resources to learn more about Ethereum wallets on NEAR:

- [Adding EVM Wallets to your NEAR App](../tutorials/web-login/ethereum-wallets.md) - Step-by-step tutorial on how to add Ethereum wallets support to your NEAR app
- [NEP-518 Technical Specification](https://github.com/near/NEPs/issues/518) - Full technical specification of how Ethereum wallets work on NEAR
