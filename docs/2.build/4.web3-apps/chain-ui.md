---
id: chain-deployed-ui
title: Chain Deployed UI
sidebar_label: Chain Deployed UI
---

Chain Deployed UI is a [decentralized frontend solution](frontend.md#decentralized-frontend-solutions) that lets you to deploy dApp frontends directly on the NEAR blockchain. A frontend can be built with typical Web2 tooling (e.g. React + Vite + node.js dependencies), and the resulting compressed bundle can be stored in the state of a smart contract.

## Overview

Thanks to the fact that storage on NEAR is cheap, it's feasible to host small applications on chain, especially if some optimization is added to reduce redundant code between deployed dApps. This offers a straightforward path to decentralized hosting as an alternative to static deployment platforms such as Vercel, GitHub Pages, Render, and others.


> Do I need to have an understanding of smart contract development or deployment to use this?

No, a smart contract will be deployed which is able to store and serve bundles for any user. You only need to understand how to sign a transaction (with help from our tooling) and to have enough NEAR tokens to pay for storage.

### How it works

x

### Pros

- Decentralized front-ends are less susceptible to single points of failure, making them more resistant to attacks and server downtimes
- By decentralizing the hosting of your front-end, you minimize the risk of censoring or blocking content by centralized authorities.
- Users might trust a decentralized application more, knowing that it operates on a transparent and immutable blockchain.
- Data displayed on the front-end is more likely to be accurate and tamper-proof since it's typically fetched directly from the blockchain.

### Cons

- Implementing a decentralized front-end can be more complex than traditional web development, requiring knowledge of additional technologies like [IPFS](https://ipfs.tech), [Arweave](https://arweave.org), or blockchain interactions.
- Decentralized networks can face issues such as latency or lower speeds compared to traditional centralized servers, potentially affecting user experience.
The ecosystem for developing decentralized frontends is still maturing, which means there might be fewer tools and libraries available than for traditional web development.
- While decentralized storage costs have been decreasing, they can still be higher than traditional hosting, especially if the dApp generates a lot of data transactions.

## Requirements

### Gateway

A gateway server is necessary to convert browser resource requests to RPC calls. For convenience, gateways may be deployed to cloud hosts, but this causes some centralization. It can be mitigated by having multiple gateways run by different parties. It is important that a user trust the gateway provider however, since the gateway is ultimately what is in control of the experience being served to the user's browser.

A gateway server could also be distributed as a binary to be run locally on a user's machine.

### RPC

An [RPC provider](../../5.api/rpc/providers.md) services requests for chain data. For resilience, gateways should ideally be capable of falling back to a different provider in the event the primary provider is experiencing degraded service.

## Considerations

Compared to classic Web2 hosting solutions, the cost structure of a chain-deployed dApp will look very different.

When deploying on chain, you pay for the storage space of your compressed bundles. This means that it's critical to pay attention to the size of dependencies you include in your application, as packages that are bloated or do not support proper tree-shaking will directly affect your cost.

:::info

NEAR uses [storage staking](../../1.concepts/storage/storage-staking.md), where NEAR tokens are locked while storage is being used and refundable in the event of deleting that data from smart contract state. The cost of storage is `1 NEAR` per `100 Kb`.

:::

### Storage Optimization

Additional storage optimization can be achieved by building your dApp from a provided template with preconfigured code splitting. This allows you to yield separate bundles for the template boilerplate and the custom dApp code:
- The template boilerplate can be uploaded once, and then served for every dApp built using that template.
- This decreases the deployment cost, since you only need to deploy the custom dApp code and specific dependencies.

### Asset Hosting

For hosting large assets (such as images and videos) that your web app may require, you could leverage a [decentralized storage service](../../1.concepts/storage/decentralized-storage.md) to maintain a fully decentralized deployment. Some of these solutions are:
- [Arweave](https://arweave.org)
- [Crust](https://crust.network)
- [IPFS](https://ipfs.tech)
