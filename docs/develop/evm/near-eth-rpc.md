---
id: near-eth-rpc
title: Proxy Ethereum RPC Server
sidebar_label: Proxy RPC Server
---

There is a [proxy server for the Web3 JSON-RPC API to the Aurora
Engine](https://github.com/aurora-is-near/aurora-relayer).

Similar to the [NEAR Web3 Provider](/docs/develop/evm/near-web3-provider),
Ethereum method calls are translated into interactions with the EVM contract,
except this approach offers more flexibility when it comes to tooling. Using the
provider, existing tooling like Truffle or Hardhat must allow for the swapping
of providers. With the proxy server, existing Ethereum offerings (wallets,
benchmarking tools, development frameworks...) can simply point to the RPC
endpoint.

The proxy can be used for testing as well, similar to how one might spin up a <a href="https://www.trufflesuite.com/ganache" target="_blank">Ganache server</a> for this purpose. Using this approach, existing Ethereum projects can run tests without modifications, unlike the approach when testing with the NEAR Web3 Provider. Please see the [EVM testing](/docs/develop/evm/evm-testing#proxy-rpc) section for more details. 

