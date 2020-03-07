---
id: connecting
title: Connecting to NEAR
sidebar_label: Connecting
---

Working with the NEAR network is currently possible under 3 deployment scenarios:

- TestNet
- DevNet (staging)
- "LocalNet" (offline development)

## TestNet

TestNet is intended for development on the NEAR platform.

Releases happen rarely.

TestNet status is available at https://rpc.nearprotocol.com/status

### State Management

We make every attempt to maintain the integrity of network state across updates.

## DevNet

DevNet is intended for developers who want to work with or test the latest (`master` branch) features of the NEAR platform. 

Releases happen daily at 0:00 UTC.

DevNet status is available at https://devnet-rpc.nearprotocol.com/status

### State Management

<blockquote class="warning">
<strong>heads up</strong><br><br>

The state of the network is **not preserved** across updates since breaking changes are likely.

</blockquote>

## LocalNet

LocalNet is intended for developers who want to work with the NEAR platform independent of the public blockchain.

More on local development [here](/docs/local-setup/local-dev-testnet)
