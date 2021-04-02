---
id: evm-testing
title: Testing EVM contracts
sidebar_label: Testing Contracts
---

1. Test using the [NEAR Web3 Provider](#near-web3-provider).
2. Test by pointing to a [Proxy RPC Server](#proxy-rpc-server).

## NEAR Web3 Provider

At the moment, running tests via NEAR Web3 Provider requires an extra step compared to the NEAR examples developers may be familiar with at:

https://near.dev

We'll need to use our TestNet account to:

- Run tests that require only one account
- Create new test accounts before running tests that require multiple accounts. Typically, these tests will have accounts interacting with one another, like sending fungible tokens back and forth, for instance.

The first step is to get your account to save a key pair on your local machine.
So far the TestNet account you created with NEAR Wallet has key pairs living in the browser. We'll want to store a key pair as an unencrypted file in your computer's home directory. (Specifically `~/.near-credentials`.)

To create a local key pair, use the following NEAR CLI command and follow the instructions:

    near login

The test file for NEAR Pet Shop is simple and doesn't require the creation of more accounts. Use the command below:

    NEAR_MASTER_ACCOUNT=you.testnet truffle test --network near_testnet

NEAR CLI knows to look in the directory where the key pair file was saved after logging in.

An example of a test requiring multiple accounts is [this test file from
Balancer](https://github.com/near/balancer-core/blob/42b2d351667761130dd7c88190b56024f6114e1f/test/pool.js#L9-L12).
Before running a test like this, we'll use the third NEAR CLI command mentioned
earlier:

    NEAR_ENV=testnet near evm-dev-init mike.testnet 3

This will create 3 [subaccounts](/docs/concepts/account#subaccounts) under
`mike.testnet`. (It will use timestamps, for instance
`1608085465606.mike.testnet`, `1608085468832.mike.testnet`, etc.) If the `3`
part of the command was omitted, it would use the default of 5. After creating
the necessary number of accounts, run the test with the same command
(...`truffle test`...) from a moment ago.

## Proxy RPC Server

Testing can also be done by pointing to a local proxy RPC server. To demonstrate this, we can run the Balancer Core repository (for https://balancer.finance) and a local proxy RPC.

1. Follow the directions in the [README for the proxy
RPC](https://github.com/aurora-is-near/aurora-relayer) to get a local server running.
2. Clone the [`balancer-core` repository](https://github.com/balancer-labs/balancer-core), following directions according to the README.

Then simply run:

    npm run test

The above command is the same as running `truffle test` if your system has
[Truffle](https://www.trufflesuite.com/truffle) installed globally.

Truffle's default network points to `localhost` at the port `8545` which is the same as tools like Ganache and the proxy server [covered here](/docs/develop/evm/near-eth-rpc).
