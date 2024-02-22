---
id: gas-station
title: Multichain Gas Station Contract
sidebar_label: Multichain Gas Station
---

This smart contract accepts payments in NEAR tokens in exchange for gas funding on non-NEAR foreign chains. Part of the NEAR Multichain effort, it works in conjunction with the [MPC recovery service](https://github.com/near/mpc-recovery) to generate on-chain signatures.

## What is it?

This smart contract is a piece of the NEAR Multichain project, which makes NEAR Protocol an effortlessly cross-chain network. This contract accepts EVM transaction request payloads and facilitates the signing, gas funding, and relaying of the signed transactions to their destination chains. It works in conjunction with a few different services, including:

- The [MPC recovery service](https://github.com/near/mpc-recovery), also called the "MPC signer service", includes a network of trusted MPC signers, which hold keyshares and cooperatively sign transactions on behalf of the MPC network. It also includes an on-chain component, called the "MPC signer contract," which accepts on-chain signature requests and returns signatures computed by the MPC network.
- The [multichain relayer server](https://github.com/near/multichain-relayer-server) scans _this_ smart contract for signed transaction payloads and emits them to foreign chain RPCs.

## How does it work?

Currently, relaying one transaction to a foreign chain requires three transactions. However, [NEP-516 (delayed receipts / runtime triggers)](https://github.com/near/NEPs/issues/516) will reduce this number to one.

Transaction breakdown:

1. The first transaction is a call to the `create_transaction` function. This function accepts an EVM transaction request payload and a deposit amount (to pay for gas on the foreign chain) and returns an `id` and a `pending_transactions_count`.
2. The second transaction is a call to the `sign_next` function. This function accepts the `id` returned in step 1 and returns a signed payload. This payload is the gas funding transaction, transferring funds from a paymaster account on the foreign chain to the user's account on the foreign chain. It must be submitted to the foreign chain before the second signed payload.
3. The third transaction is another call to the `sign_next` function, identical to the one before. This function accepts an `id` and returns a signed payload. This payload is the signed user transaction.

Three transactions are required because of the gas restrictions imposed by the protocol. Currently (pre-NEP-516), the MPC signing function requires a _lot_ of gas, so dividing up the signing process into three parts is required to maximize the amount of gas available to each signing call.

Once this service and its supporting services are live, the multichain relayer server will be monitoring this gas station contract and relaying the signed transactions in the proper order as they become available, so it will not be strictly necessary for the users of this contract to ensure that the transactions are properly relayed, unless the user wishes to relay the transactions using their own RPC (e.g. to minimize latency).
