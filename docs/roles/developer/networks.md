---
id: networks
title: Connecting to NEAR
sidebar_label: Networks
---

NEAR Protocol operates on several networks each operating with their own independent validators and unique state. These networks are as follows:

* [`mainnet`](/docs/roles/developer/networks#mainnet)
* [`testnet`](/docs/roles/developer/networks#testnet)
* [`betanet`](/docs/roles/developer/networks#betanet)
* [`localnet`](/docs/roles/developer/networks#localnet)
  
---

## `mainnet`

> `mainnet` is for production ready smart contracts and live token transfers. Contracts ready for `mainnet` should have gone through rigorous testing and independent security reviews if necessary. `mainnet` is the only network where state is guaranteed to persist over time _(subject to the typical security guarantees of the network's validation process)_.

* [ [Status](https://rpc.mainnet.near.org/status) ]
* [ [Explorer](https://explorer.near.org) ]
* [ [Wallet](https://wallet.near.org) ]

**Note:** `near-cli` [network selection](/docs/development/near-cli#network-selection) flag is `production`.

---

## `testnet`

> `testnet` is intended for testing all aspects of the NEAR platform prior to `mainnet` deployment. From account creation, mock token transfers, development tooling, and smart contract development, the `testnet` environment should closely represent `mainnet` behavior. We make every attempt to maintain the integrity of network state across updates but this is still a volatile network that receives heavy testing. Therefore, we recommended all user-facing applications are deployed to `mainnet` to ensure persistent state.

* [ [Status](https://rpc.testnet.near.org/status) ]
* [ [Explorer](https://explorer.testnet.near.org) ]
* [ [Wallet](https://wallet.testnet.near.org) ]

**Note:** `near-cli` [network selection](/docs/development/near-cli#network-selection) flag is `development` _or_ `testnet`. _(This network is selected by default with `near-cli` and may not need additional configuration)_

---

## `betanet`

> `betanet` usually has daily releases with protocol features that are not yet stabilized. State is maintained as much as possible but no guarantees with its high volatility.

* [ [Status](https://rpc.betanet.near.org/status) ]
* [ [Explorer](https://explorer.betanet.near.org) ]
* [ [Wallet](https://wallet.betanet.near.org) ]

`near-cli` [network selection](/docs/development/near-cli#network-selection) variable is `betanet`

---

## `localnet`

> LocalNet is intended for developers who want to work with the NEAR platform independent of the public blockchain. You will need to generate nodes yourself.

More on local development [here](/docs/local-setup/local-dev-testnet)

`near-cli` [network selection](/docs/development/near-cli#network-selection) variable is `local`

---

>Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol">
  <h8>Ask it on StackOverflow!</h8>
</a>
