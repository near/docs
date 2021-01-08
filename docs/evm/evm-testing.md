---
id: evm-testing
title: Testing EVM contracts
sidebar_label: Testing
---

### Contents:
1. Test using the <a href="#near-web3-provider">NEAR Web3 Provider</a>.
2. Test by pointing to a <a href="#proxy-rpc">Ethereum RPC Proxy</a> address.

---

<h3 id="near-web3-provider">NEAR Web3 Provider</h3>

At the moment, running tests via NEAR Web3 Provider requires an extra step compared to the NEAR examples developers may be familiar with at:

<a href="https://near.dev" target="_blank">https://near.dev</a>

We'll need to use our betanet account to:

- Run tests that require only one account
- Create new test accounts before running tests that require multiple accounts. Typically, these tests will have accounts interacting with one another, like sending fungible tokens back and forth, for instance.

The first step is to get your account to save a key pair on your local machine. So far the betanet account you created with NEAR Wallet has key pairs living in the browser. We'll want to store a key pair as an unencrypted file in your computer's home directory. (Specifically `~/.near-credentials`.)

To create a local key pair, use the following NEAR CLI command and follow the instructions:

    near login

The test file for NEAR Pet Shop is simple and doesn't require the creation of more accounts. Use the command below:

    NEAR_MASTER_ACCOUNT=you.betanet truffle test --network near_betanet

NEAR CLI knows to look in the directory where the key pair file was saved after logging in.

An example of a test requiring multiple accounts is <a href="https://github.com/near/balancer-core/blob/42b2d351667761130dd7c88190b56024f6114e1f/test/pool.js#L9-L12" target="_blank">this test file from Balancer</a>. Before running a test like this, we'll use the third NEAR CLI command mentioned earlier:

    NEAR_ENV=betanet near evm-dev-init mike.betanet 3

This will create 3 [subaccounts](/docs/concepts/account#subaccounts) under `mike.betanet`. (It will use timestamps, for instance `1608085465606.mike.betanet`, `1608085468832.mike.betanet`, etc.) If the `3` part of the command was omitted, it would use the default of 5. After creating the necessary number of accounts, run the test with the same command (…`truffle test`…) from a moment ago.

<h3 id="proxy-rpc">Proxy RPC server</h3>

Testing can also be done by pointing to a local proxy RPC server. To demonstrate this, we can run the Balancer Core repository (for https://balancer.finance) and a local proxy RPC.

1. Follow the directions in the <a href="https://github.com/near/near-eth-rpc" target="_blank">README for the proxy RPC</a> to get a local server running.
2. Clone the <a href="https://github.com/balancer-labs/balancer-core" target="_blank">`balancer-core` repository</a>, following directions according to the README.

Then simply run:

    npm run test

The above command is the same as running `truffle test` if your system has <a href="https://www.trufflesuite.com/truffle" target="_blank">Truffle</a> installed globally.

Truffle's default network points to `localhost` at the port `8545` which is the same as tools like ganache and the NEAR Proxy Ethereum RPC Server [covered here](/docs/evm/near-eth-rpc).