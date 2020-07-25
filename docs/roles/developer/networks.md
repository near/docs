---
id: networks
title: Connecting to NEAR
sidebar_label: Networks
---

The core NEAR blockchain is open source so it is possible that there could be an infinite number of blockchains running it.  Each is a completely separate network with separate validators and separate state.  For the purposes of application development, there are only a few networks that you will likely find relevant:

- MainNet
- TestNet
- BetaNet
- LocalNet

## MainNet

MainNet is the network where user-facing or value-holding applications should be deployed. This is intended for apps that are production ready, and have already gone through thorough testing and, if necessary, independent security reviews.

NEAR's MainNet is currently in undergoing a multi-phase rollout.  Restrictions are placed on account creation and token transfer until the final stage.  Find more info on this approach to releasing MainNet here: [The Road to MainNet and Beyond](https://near.org/blog/mainnet-roadmap/).

MainNet status is available at https://rpc.testnet.near.org/status

The MainNet explorer is available at https://explorer.mainnet.near.org/

The flag for this in near-shell is 'production'

### State Persistence

MainNet is the only network where state is guaranteed to persist over time (subject, of course, to the typical security guarantees of the network's validation process).


## TestNet

TestNet is intended for development of apps on the NEAR platform before they are released to MainNet.

TestNet status is available at https://rpc.testnet.near.org/status

The TestNet explorer is available at https://explorer.testnet.near.org/

The flag for this in near-shell is 'development'

### State Management

We make every attempt to maintain the integrity of network state across updates, but this is still a volatile network that receives heavy testing.  It is therefore recommended that all user-facing applications are deployed to MainNet.

## BetaNet

BetaNet is intended **primarily** for validators who wish to test their infrastructure.

Releases happen weekly.

BetaNet status is available at https://rpc.betanet.near.org/status

The BetaNet explorer is available at https://explorer.betanet.near.org/

The flag for this in near-shell is 'betanet'

### State Management

State is maintained as well as possible but with no guarantees and high volatility.

## LocalNet

LocalNet is intended for developers who want to work with the NEAR platform independent of the public blockchain. You will need to generate nodes youerself.

More on local development [here](/docs/local-setup/local-dev-testnet)

The flag for this in near-shell is 'local'

## Testing Environments

Staging/testing environments are mostly for us to test our code and run CI. We don't recommend you use these unless you're contributing to the code base.

The flags in near-shell are 'test', 'ci' and 'ci-betnet'.
