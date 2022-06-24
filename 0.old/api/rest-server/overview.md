---
id: overview
title: NEAR API REST Server
sidebar_label: Overview
---

> [NEAR REST API Server](https://github.com/near-examples/near-api-rest-server) is a project that allows you create your own simple REST API server that interacts with the NEAR blockchain.

---

## Overview {#overview}

_Click on a route for more information and examples_

| Route                                      | Method | Description                                                                                                                 |
| ------------------------------------------ | ------ | --------------------------------------------------------------------------------------------------------------------------- |
| **CONTRACTS**                              |        |                                                                                                                             |
| [`/deploy`](/docs/api/rest-server/contracts#deploy)                       | POST   | Deploys a smart contract on NEAR.                                                                                           |
| [`/view`](/docs/api/rest-server/contracts#view)                           | POST   | Performs a smart contract **view** call with no gas burnt.                                                                  |
| [`/call`](/docs/api/rest-server/contracts#call)                           | POST   | Performs a smart contract **change** call that burns gas.                                                                   |
| **UTILS**                                  |        |                                                                                                                             |
| [`/init`](/docs/api/rest-server/utils#init)                           | POST   | Initializes the master account and updates `near-api-server-config.json`                                                    |
| [`/create_user`](/docs/api/rest-server/utils#create_user)             | POST   | Creates a NEAR [sub-account](https://docs.near.org/docs/concepts/account#subaccounts) and stores credentials in `/storage`. |
| [`/parse_seed_phrase`](/docs/api/rest-server/utils#parse_seed_phrase) | POST   | Displays public and private key pair from a given seed phrase .                                                             |
| **NFT EXAMPLE**                            |        |                                                                                                                             |
| [`/mint_nft`](/docs/api/rest-server/nfts#mint_nft)                   | POST   | Mints an NFT for a given contract.                                                                                          |
| [`/transfer_nft`](/docs/api/rest-server/nfts#transfer_nft)           | POST   | Transfers NFT ownership to a specified account.                                                                             |
| [`/view_nft`](/docs/api/rest-server/nfts#view_nft)                   | POST   | Returns owner, metadata, and approved account IDs for a given token ID.                                                     |

---

## Video Presentation {#video-presentation}

<iframe
  width="640"
  height="360"
  src="https://www.youtube-nocookie.com/embed/d71OscmH4cA"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen>
</iframe>
