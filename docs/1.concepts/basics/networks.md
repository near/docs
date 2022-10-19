---
id: networks
title: NEAR Networks
sidebar_label: Networks
---

NEAR Protocol operates on several networks each operating with their own independent validators and unique state. These networks are as follows:

* [`mainnet`](/concepts/basics/networks#mainnet)
* [`testnet`](/concepts/basics/networks#testnet)
* [`betanet`](/concepts/basics/networks#betanet)
* [`localnet`](/concepts/basics/networks#localnet)


## Mainnet {#mainnet}

`mainnet` is for production ready smart contracts and live token transfers. Contracts ready for `mainnet` should have gone through rigorous testing and independent security reviews if necessary. `mainnet` is the only network where state is guaranteed to persist over time _(subject to the typical security guarantees of the network's validation process)_.

* Status: `https://rpc.mainnet.near.org/status`
* [ [Explorer](https://explorer.near.org) ]
* [ [Wallet](https://wallet.near.org) ]
* [ [Data Snapshots](https://near-nodes.io/intro/node-data-snapshots) ]


## Testnet {#testnet}

`testnet` is a public network and the final testing network for `nearcore` changes before deployment to `mainnet`. `testnet` is intended for testing all aspects of the NEAR platform prior to `mainnet` deployment. From account creation, mock token transfers, development tooling, and smart contract development, the `testnet` environment closely resembles `mainnet` behavior. All `nearcore` changes are deployed as release candidates on first testnet, before the changes are released on `mainnet`. A number of `testnet` validators validate transactions and create new blocks. dApp developers deploy their applications on `testnet` before deploying on `mainnet`. It is important to note that `testnet` has its own transactions and states.

* Status: `https://rpc.testnet.near.org/status`
* [ [Explorer](https://explorer.testnet.near.org) ]
* [ [Wallet](https://wallet.testnet.near.org) ]
* [ [Data Snapshots](https://near-nodes.io/intro/node-data-snapshots) ]


## Betanet {#betanet}

`betanet` is a public network, where `nearcore` is run to test its stability and backward compatibility. Validators on `betanet` are participants in the Betanet Analysis Group, where they engage in active discussions, submit bug reports, and participate in issue resolution. On `betanet` protocol changes, there are automated hard forks, where the state is compressed into a new genesis. As such, new genesis exists frequently on `betanet`, and there are no historical data snapshots. `betanet` usually has daily releases with protocol features that are not yet stabilized. State is maintained as much as possible but there is no guarantees with its high volatility.

* Status: `https://rpc.betanet.near.org/status`
* [ [Wallet](https://wallet.betanet.near.org) ]


## Localnet {#localnet}

`localnet` is intended for developers who want to work with the NEAR platform independent of the public blockchain. You will need to generate nodes yourself. `localnet` gives you the total control over accounts, economics, and other factors for more advanced use cases (including making changes to `nearcore`). For developers, `localnet` is the right choice if you prefer to avoid leaking information about your work during the development process.


More on local development [here](https://near-nodes.io/validator/running-a-node)

`near-cli` [network selection](/tools/near-cli#network-selection) variable is `local`

---

:::tip Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol">
  <h8>Ask it on StackOverflow!</h8>
</a>
:::
