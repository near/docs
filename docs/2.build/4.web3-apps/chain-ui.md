---
id: chain-deployed-ui
title: Chain Deployed UI
sidebar_label: On-Chain UI
---

This is a Pagoda experiment for deploying frontends directly on chain. These frontends are built with typical Web2 tooling (e.g. React + Vite + npm dependencies) then the resulting bundles are compressed and stored in the state of a smart contract.

The concept is simple: storage on NEAR is cheap enough that it is feasible to host small apps on chain, especially if some optimization is added to reduce redundant code between deployed dapps. This offers a straightforward path to decentralized hosting as an alternative to, or to complement, static deploy platforms like Github Pages, Vercel, etc.

> Do I need to have an understanding of smart contract development or deployment to use this?

No, a smart contract will be deployed which is able to store and serve bundles for any user. You only need to understand how to sign a transaction (with help from our tooling) and to have enough NEAR tokens to pay for storage.

> How does the cost compare to Web2 hosting solutions?

The cost structure will look very different.

Many web developers are used to starting with free hosting for small apps, since that is widely subsidized by Web2 hosting companies. After that, subsciption plans are common.

When deploying on chain, you pay for the storage space of your built+minified+compressed bundles. This means it is more important to pay attention to the size of dependencies you include in your application, as packages that are bloated or do not support proper tree-shaking will directly affect your cost.

NEAR uses storage staking, where NEAR tokens are locked while storage is being used and refundable in the event of deleting that data from smart contract state. The cost of storage is 1 NEAR per 100kb. See specific templates and demos for a clearer idea of bundle sizes and their associated cost.

## Storage Optimization

By building off a provided template with preconfigured code splitting, it is possible to yield separate bundles for the template boilerplate and the custom dapp code. The template boilerplate can be uploaded once then served for every dapp built on that template. This decreases the cost of a deploy to only the custom dapp code + dependencies.

## Asset Hosting

There is not yet a specific recommendation for hosting the larger assets a web app may rely on (e.g. images). Leveraging a decentralized storage service would make sense to maintain a fully decentralized deploy.

Until there is tooling to support deploying assets, they should be loaded as remote sources by URL.

## Gateway

A gateway server is necessary to convert browser resource requests to RPC calls. For convenience, gateways may be deployed to cloud hosts, but this causes some centralization. It can be mitigated by having multiple gateways run by different parties. It is important that a user trust the gateway provider however, since the gateway is ultimately what is in control of the experience being served to the user's browser.

A gateway server could also be distributed as a binary to be run locally on a user's machine.

## RPC

An RPC provider services requests for chain data. For resilience, gateways should ideally be capable of falling back to a different provider in the event the primary provider is experiencing degraded service.
