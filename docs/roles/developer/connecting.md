---
id: connecting
title: Connecting to NEAR
sidebar_label: Connecting
---

Working with the NEAR network is currently possible under 5 deployment scenarios:

- MainNet
- TestNet
- BetaNet
- LocalNet

## MainNet

Our MainNet is in Phase 0, a higly restricted Proof of Authority network. This is intended for apps that are production ready, and have already gone through testing. Find more info on our multi-phase approach to releasing MainNet here: [The Road to MainNet and Beyond](https://near.org/blog/mainnet-roadmap/)

MainNet status is available at https://rpc.testnet.near.org/status

The flag for this in near-shell is 'production'

### State Management MainNet

We guarantee maintanaince of state on MainNet.

## TestNet

TestNet is intended for development on the NEAR platform.

TestNet status is available at https://rpc.testnet.near.org/status

The flag for this in near-shell is 'development'

### State Management

We make every attempt to maintain the integrity of network state across updates, but this is still a volitile network that receives heavy testing.

## BetaNet

BetaNet is intended **primarily** for validators who wish to test their infrastructure. If you are interested in testing an application that

Releases happen weekly.

BetaNet status is available at https://rpc.betanet.near.org/status

The flag for this in near-shell is 'betanet'

### State Management

State is maintained as well as possible.

## LocalNet

LocalNet is intended for developers who want to work with the NEAR platform independent of the public blockchain. You will need to generate nodes youerself.

More on local development [here](/docs/local-setup/local-dev-testnet)

The flag for this in near-shell is 'local'

## Testing Environments

Staging/testing environments are mostly for us to test our code and run CI. We don't recommend you use these unless you're contributing to the code base.

The flags in near-shell are 'test', 'ci' and 'ci-betnet'.
