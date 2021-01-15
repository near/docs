---
id: near-eth-rpc
title: Proxy Ethereum RPC Server
sidebar_label: Web3 JSON-RPC API
---

There is a <a href="https://github.com/near/near-eth-rpc" target="_blank">proxy server for the Ethereum JSON RPC to the NEAR EVM</a>.

Similar to the [NEAR Web3 Provider](/docs/evm/near-web3-provider), Ethereum routes are translated into interactions with the EVM precompile, except this approach offers more flexibility when it comes to tooling. Using the provider, existing tooling like Truffle or Hardhat must allow for the swapping of providers. With the proxy server, existing Ethereum offerings (wallets, benchmarking tools, development frameworks…) can simply point to the RPC server.

The proxy can be used for testing as well, similar to how one might spin up a <a href="https://www.trufflesuite.com/ganache" target="_blank">ganache server</a> for this purpose. Using this approach, existing Ethereum projects can run tests without modifications, unlike the approach when testing with the NEAR Web3 Provider. Please see the [EVM testing](/docs/evm/evm-testing#proxy-rpc) section for more details. 

