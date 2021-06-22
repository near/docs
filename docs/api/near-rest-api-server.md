---
id: near-api-rest-server
title: NEAR API REST Server
sidebar_label: REST API Server
---

> [NEAR REST API Server](https://github.com/near-examples/near-api-rest-server) is a project that allows you create your own simple REST API server that interacts with the NEAR blockchain.

---

## Overview

_Click on a route for more information and examples_

| Route                                      | Method | Description                                                                                                                 |
| ------------------------------------------ | ------ | --------------------------------------------------------------------------------------------------------------------------- |
| **CONTRACTS**                              |        |                                                                                                                             |
| [`/deploy`](#deploy)                       | POST   | Deploys a smart contract on NEAR.                                                                                           |
| [`/view`](#view)                           | POST   | Performs a smart contract **view** call with no gas burnt.                                                                  |
| [`/call`](#call)                           | POST   | Performs a smart contract **change** call that burns gas.                                                                   |
| **UTILS**                                  |        |                                                                                                                             |
| [`/init`](#init)                           | POST   | Initializes the master account and updates `near-api-server-config.json`                                                    |
| [`/create_user`](#create_user)             | POST   | Creates a NEAR [sub-account](https://docs.near.org/docs/concepts/account#subaccounts) and stores credentials in `/storage`. |
| [`/parse_seed_phrase`](#parse_seed_phrase) | POST   | Displays public and private key pair from a given seed phrase .                                                             |
| **NFT EXAMPLE**                            |        |                                                                                                                             |
| [`/mint_nft`](#mint_nft)                   | POST   | Mints an NFT for a given contract.                                                                                          |
| [`/transfer_nft`](#transfer_nft)           | POST   | Transfers NFT ownership to a specified account.                                                                             |
| [`/view_nft`](#view_nft)                   | POST   | Returns owner, metadata, and approved account IDs for a given token ID.                                                     |

---

## Requirements

- [NEAR Account](https://docs.near.org/docs/develop/basics/create-account) _(with access to private key or seed phrase)_
- [Node.js](https://nodejs.org/en/download/package-manager/)
- [npm](https://www.npmjs.com/get-npm) or [Yarn](https://yarnpkg.com/getting-started/install)
- API request tool such as [Postman](https://www.postman.com/downloads/)

---

## Setup

1. Clone repository

```bash
git clone git@github.com:near-examples/near-api-server.git
```

2. Install dependencies

```bash
npm install
```

3. Configure `near-api-server.config.json`

Default settings:

```json
{
  "server_host": "localhost",
  "server_port": 3000,
  "rpc_node": "https://rpc.testnet.near.org",
  "allow_rpc_update": false
}
```

_**Note:** `allow_rpc_update` determines if this param can be changed via `/init` route._

4. Start server

```bash
node app
```

---

## Contracts

### `/deploy`

> _Deploys a smart contract to the NEAR blockchain based on the wasm file located in `/contracts` folder._

**Method:** **`POST`**

| Param                            | Description                                                                          |
| -------------------------------- | ------------------------------------------------------------------------------------ |
| `account_id`                     | _Account id that you will be deploying the contract to._                             |
| `seed_phrase` _OR_ `private_key` | _Seed phrase OR private key of the account id above._                                |
| `contract`                       | _wasm file of compiled contract located in the `/contracts` folder of this project._ |

_**Note:** Use [`near login`](https://docs.near.org/docs/tools/near-cli#near-login) to save your key pair to your local machine._

**Example:**

```json
{
  "account_id": "example.testnet",
  "seed_phrase": "witch collapse practice feed shame open despair creek road again ice least",
  "contract": "nft_simple.wasm"
}
```

<details>
<summary>**Example Response:** </summary>
<p>

```json
{
  "status": {
    "SuccessValue": ""
  },
  "transaction": {
    "signer_id": "example.testnet",
    "public_key": "ed25519:Cgg4i7ciid8uG4K5Vnjzy5N4PXLst5aeH9ApRAUA3y8U",
    "nonce": 5,
    "receiver_id": "example.testnet",
    "actions": [
      {
        "DeployContract": {
          "code": "hT9saWV3aok50F8JundSIWAW+lxOcBOns1zenB2fB4E="
        }
      }
    ],
    "signature": "ed25519:3VrppDV8zMMRXErdBJVU9MMbbKZ4SK1pBZqXoyw3oSSiXTeyR2W7upNhhZPdFJ1tNBr9h9SnsTVeBm5W9Bhaemis",
    "hash": "HbokHoCGcjGQZrz8yU8QDqBeAm5BN8iPjaSMXu7Yp2KY"
  },
  "transaction_outcome": {
    "proof": [
      {
        "hash": "Dfjn2ro1dXrPqgzd5zU7eJpCMKnATm295ceocX73Qiqn",
        "direction": "Right"
      },
      {
        "hash": "9raAgMrEmLpL6uiynMAi9rykJrXPEZN4WSxLJUJXbipY",
        "direction": "Right"
      }
    ],
    "block_hash": "B64cQPDNkwiCcN3SGXU2U5Jz5M9EKF1hC6uDi4S15Fb3",
    "id": "HbokHoCGcjGQZrz8yU8QDqBeAm5BN8iPjaSMXu7Yp2KY",
    "outcome": {
      "logs": [],
      "receipt_ids": ["D94GcZVXE2WgPGuaJPJq8MdeEUidrN1FPkuU75NXWm7X"],
      "gas_burnt": 1733951676474,
      "tokens_burnt": "173395167647400000000",
      "executor_id": "example.testnet",
      "status": {
        "SuccessReceiptId": "D94GcZVXE2WgPGuaJPJq8MdeEUidrN1FPkuU75NXWm7X"
      }
    }
  },
  "receipts_outcome": [
    {
      "proof": [
        {
          "hash": "3HLkv7KrQ9LPptX658QiwkFagv8NwjcxF6ti15Een4uh",
          "direction": "Left"
        },
        {
          "hash": "9raAgMrEmLpL6uiynMAi9rykJrXPEZN4WSxLJUJXbipY",
          "direction": "Right"
        }
      ],
      "block_hash": "B64cQPDNkwiCcN3SGXU2U5Jz5M9EKF1hC6uDi4S15Fb3",
      "id": "D94GcZVXE2WgPGuaJPJq8MdeEUidrN1FPkuU75NXWm7X",
      "outcome": {
        "logs": [],
        "receipt_ids": [],
        "gas_burnt": 1733951676474,
        "tokens_burnt": "173395167647400000000",
        "executor_id": "example.testnet",
        "status": {
          "SuccessValue": ""
        }
      }
    }
  ]
}
```

</p>
</details>

---

### `/view`

> _Performs a smart contract view call that is free of charge (no gas burnt)._

**Method:** **`POST`**

| Param      | Description                                                                               |
| ---------- | ----------------------------------------------------------------------------------------- |
| `contract` | _Account id of the smart contract you are calling._                                       |
| `method`   | _Name of the public method on the contract you are calling._                              |
| `params`   | _Arguments the method of the contract takes. Pass an empty object if no args are needed._ |

**Example:**

```json
{
  "contract": "inotel.pool.f863973.m0",
  "method": "get_accounts",
  "params": { "from_index": 0, "limit": 5 }
}
```

<details>
<summary>**Example Response:** </summary>
<p>

```json
[
  {
    "account_id": "ino.lockup.m0",
    "unstaked_balance": "0",
    "staked_balance": "2719843984800963837328608365424",
    "can_withdraw": true
  },
  {
    "account_id": "ino.testnet",
    "unstaked_balance": "2",
    "staked_balance": "3044983795632859169857527919579",
    "can_withdraw": true
  },
  {
    "account_id": "ino.stakewars.testnet",
    "unstaked_balance": "2",
    "staked_balance": "21704174266817478470830456026",
    "can_withdraw": true
  },
  {
    "account_id": "ds4.testnet",
    "unstaked_balance": "3",
    "staked_balance": "10891355794195012441764921",
    "can_withdraw": true
  },
  {
    "account_id": "32oijafsiodjfas.testnet",
    "unstaked_balance": "3",
    "staked_balance": "383757424103247547511904666",
    "can_withdraw": true
  }
]
```

</p>
</details>

---

### `/call`

> _Performs a smart contract call that changes state and burns gas._

**Method:** **`POST`**

| Param                            | Description                                                                                                           |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `account_id`                     | _Account id that will be performing the call and will be charged for gas and attached tokens / deposit._              |
| `seed_phrase` _OR_ `private_key` | _Seed phrase OR private key of the account id above._                                                                 |
| `contract`                       | _Account id of the smart contract you will be calling._                                                               |
| `method`                         | _Public method on the smart contract that you will be calling._                                                       |
| `params`                         | _Arguments the method of the contract takes. Pass an empty object if no args are needed._                             |
| `attached_gas`                   | _Amount of gas you will be attaching to the call in [TGas](https://docs.near.org/docs/concepts/gas#thinking-in-gas)._ |
| `attached_tokens`                | _Amount of tokens to be sent to the contract you are calling in yoctoNEAR (10^-24 NEAR)._                             |

_**Note:** Use [`near login`](https://docs.near.org/docs/tools/near-cli#near-login) to save your key pair to your local machine._

**Example:**

```json
{
  "account_id": "example.testnet",
  "private_key": "2Kh6PJjxH5PTTsVnYqtgnnwXHeafvVGczDXoCb33ws8reyq8J4oBYix1KP2ugRQ7q9NQUyPcVFTtbSG3ARVKETfK",
  "contract": "guest-book.testnet",
  "method": "addMessage",
  "params": { "text": "Hello World" },
  "attached_gas": "100000000000000",
  "attached_tokens": "0"
}
```

<details>
<summary>**Example Response:** </summary>
<p>

```json
{
  "status": {
    "SuccessValue": ""
  },
  "transaction": {
    "signer_id": "example.testnet",
    "public_key": "ed25519:ASZEids5Qa8XMHX2S7LRL4bQRczi4YuMWXSM7S1HE5b",
    "nonce": 4,
    "receiver_id": "guest-book.testnet",
    "actions": [
      {
        "FunctionCall": {
          "method_name": "addMessage",
          "args": "eyJ0ZXh0IjoiSGVsbG8gV29ybGQifQ==",
          "gas": 100000000000000,
          "deposit": "0"
        }
      }
    ],
    "signature": "ed25519:4T9FqsjYBxcitjd5GgHrv3i3hcdcJSNcwwG3jBUgs7zZCZ3uShAK44Hi3oYFefhr8e5UW3LLD49ofRpGXKwGqqot",
    "hash": "CniHtfQVzcyVWJaUrQibJyGdhLi5axsjsoSRvvFbJ1jv"
  },
  "transaction_outcome": {
    "proof": [
      {
        "hash": "EkzDGbbBHSAuJcCPmhKSqbnBKyLrMgXkrTEZZZQudHeH",
        "direction": "Right"
      },
      {
        "hash": "36j4PK6fsLChiVTBQnXS1ywVSgJgHo7FtWzd5y5jkK1B",
        "direction": "Right"
      }
    ],
    "block_hash": "CUAu2deED8UX4vkerCbsTMR7YkeKt8RQXknYMNrVvM7C",
    "id": "CniHtfQVzcyVWJaUrQibJyGdhLi5axsjsoSRvvFbJ1jv",
    "outcome": {
      "logs": [],
      "receipt_ids": ["B7xAYoga5vrKERK7wY7EHa2Z74LaRJwqPsh4esLrKeQF"],
      "gas_burnt": 2427992549888,
      "tokens_burnt": "242799254988800000000",
      "executor_id": "example.testnet",
      "status": {
        "SuccessReceiptId": "B7xAYoga5vrKERK7wY7EHa2Z74LaRJwqPsh4esLrKeQF"
      }
    }
  },
  "receipts_outcome": [
    {
      "proof": [
        {
          "hash": "6Uo6BajpAxiraJEv69RwhjYnC86u56cw29vRDB1SV4dv",
          "direction": "Right"
        }
      ],
      "block_hash": "Ecq6pK74uiJFKxPTaasYuQcsEznnQjdzMAfsyrBpDo2u",
      "id": "B7xAYoga5vrKERK7wY7EHa2Z74LaRJwqPsh4esLrKeQF",
      "outcome": {
        "logs": [],
        "receipt_ids": ["6S6m1TYuVPYovLu9FHGV5oLRnDXeNQ8NhXxYjcr91xAN"],
        "gas_burnt": 3766420707221,
        "tokens_burnt": "376642070722100000000",
        "executor_id": "guest-book.testnet",
        "status": {
          "SuccessValue": ""
        }
      }
    },
    {
      "proof": [
        {
          "hash": "2za2YKUhyMfWbeEL7UKZxZcQbAqEmSPgPoYh9QDdeJQi",
          "direction": "Left"
        },
        {
          "hash": "61aHEiTBBbPU8UEXgSQh42TujFkHXQQMSuTh13PLPwbG",
          "direction": "Right"
        }
      ],
      "block_hash": "6LfpzvCBkqq7h5uG9VjAHMwSpC3HMMBSAGNGhbrAJzKP",
      "id": "6S6m1TYuVPYovLu9FHGV5oLRnDXeNQ8NhXxYjcr91xAN",
      "outcome": {
        "logs": [],
        "receipt_ids": [],
        "gas_burnt": 0,
        "tokens_burnt": "0",
        "executor_id": "example.testnet",
        "status": {
          "SuccessValue": ""
        }
      }
    }
  ]
}
```

</p>
</details>

---

## Utils

### `/init`

> _Configures `near-api-server.config.json` and creates a master account that stores credentials in this file. This allows for "simple methods" to be called where you won't have to pass as many parameters, primarily the master account id and private key or seed phrase._

**ATTN: SERVER MUST BE RESTARTED AFTER CALLING THIS ENDPOINT**

**Method:** **`POST`**

| Param                            | Description                                                                                                             |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `master_account_id`              | _Master account that has full access to the NFT contract below_                                                         |
| `seed_phrase` _OR_ `private_key` | _Seed phrase OR private key of the account id above._                                                                   |
| `nft_contract`                   | _Contract account that has NFT contract deployed to it_                                                                 |
| `server_host`                    | _Public IP address for your API server (localhost is default)_                                                          |
| `server_port`                    | _(Port your API server will listen on)_                                                                                 |
| `rpc_node`                       | _[Network](https://docs.near.org/docs/concepts/networks) your server will be running on (testnet, mainnet, or betanet)_ |

_**Note:** Use [`near login`](https://docs.near.org/docs/tools/near-cli#near-login) to save your key pair to your local machine._

**Example:**

```json
{
  "master_account_id": "example.testnet",
  "seed_phrase": "seed phrase for master_account_id goes here",
  "nft_contract": "nft-contract.example.testnet",
  "server_host": "localhost",
  "server_port": 3000,
  "rpc_node": "https://rpc.testnet.near.org"
}
```

**Example Response:**

```json
{
  "text": "Settings updated."
}
```

---

### `/create_user`

> _Creates a NEAR [sub-account](https://docs.near.org/docs/concepts/account#subaccounts) using initialized master account and saves credentials to `/storage` directory. Requires [`/init`](#init) configuration with master account._

**Note:** _Only letters, digits, and - or \_ separators are allowed._

**Method:** **`POST`**

**Example:**

```
{
    "name" : "satoshi"
}
```

**Example Response:**

```json
{
  "text": "Account satoshi.example.testnet created. Public key: ed25519:HW4koiHqLi5WdVHWy9fqBWHbLRrzfmvCiRAUVhMa14T2"
}
```

---

### `/parse_seed_phrase`

> _Converts seed phrase into public / private key pair._

**Method:** **`POST`**

**Example:**

```
{
    "seed_phrase" : "witch collapse practice feed shame open despair creek road again ice least"
}
```

**Example Response:**

```
{
    "seedPhrase": "witch collapse practice feed shame open despair creek road again ice least",
    "secretKey": "ed25519:41oHMLtYygTsgwDzaMdjWRq48Sy9xJsitJGmMxgA9A7nvd65aT8vQwAvRdHi1nruPP47B6pNhW5T5TK8SsqCZmjn",
    "publicKey": "ed25519:Cgg4i7ciid8uG4K5Vnjzy5N4PXLst5aeH9ApRAUA3y8U"
}
```

---

## NFTs

### `/mint_nft`

> _Mints a new NFT on a specified contract._

**Method:** **`POST`**

#### Standard NFT Minting

| Param                            | Description                                            |
| -------------------------------- | ------------------------------------------------------ |
| `token_id`                       | _ID for new token you are minting_                     |
| `metadata`                       | _Metadata for the new token as a string._              |
| `account_id`                     | _Account ID for the new token owner._                  |
| `seed_phrase` _OR_ `private_key` | _Seed phrase OR private key for the NFT contract._     |
| `nft_contract`                   | _Account ID for the NFT contract your are minting on._ |

_**Note:** Use [`near login`](https://docs.near.org/docs/tools/near-cli#near-login) to save your key pair to your local machine._

**Example:**

```
{
    "token_id": "EXAMPLE-TOKEN",
    "metadata": "https://ipfs.io/ipfs/Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu",
    "account_id": "example.testnet",
    "private_key": "41oHMLtYygTsgwDzaMdjWRq48Sy9xJsitJGmMxgA9A7nvd65aT8vQwAvRdHi1nruPP47B6pNhW5T5TK8SsqCZmjn",
    "contract": "nft.example.near",
}
```

**Example Response:**

```json
[
  {
    "token": {
      "owner_id": "example.testnet",
      "metadata": "https://ipfs.io/ipfs/Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu",
      "approved_account_ids": [],
      "token_id": "EXAMPLE_TOKEN"
    },
    "tx": "Be7tV1h2dvhg53S2rartojeSUbNfQTB7ypuprmb6xRhw"
  }
]
```

---

#### Simple NFT Minting

_Requires [`/init`](#init) configuration with master account._

**Example:**

```json
{
  "token_id": "EXAMPLE_TOKEN",
  "metadata": "https://ipfs.io/ipfs/Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu"
}
```

**Example Response:**

```json
[
  {
    "token": {
      "owner_id": "example.testnet",
      "metadata": "https://ipfs.io/ipfs/Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu",
      "approved_account_ids": [],
      "token_id": "EXAMPLE_TOKEN"
    },
    "tx": "Be7tV1h2dvhg53S2rartojeSUbNfQTB7ypuprmb6xRhw"
  }
]
```

_(`tx` is the transaction hash that can be queried in [NEAR Explorer](http://explorer.testnet.near.org))_

---

#### Batch NFT minting (simple)

_Requires [`/init`](#init) configuration with master account._

**Example:**

```json
{
  "token_id": "EXAMPLE_TOKEN_{inc}",
  "metadata": "https://ipfs.io/ipfs/Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu",
  "min": 31,
  "max": 33
}
```

_(This creates `EXAMPLE_TOKEN_1`, `EXAMPLE_TOKEN_2`, & `EXAMPLE_TOKEN_3`)_

**Example Response:**

```json
[
  {
    "tx": "mAL92gb6g6hhubZBRewJk5vSwmmzm2SXmwdAfYqfWcG"
  },
  {
    "tx": "Dv9h8nWJLujkKpmw58ZR4QwAgPVprb4j5QarDUumoGEX"
  },
  {
    "tx": "J48F3vALJBbbUguKXp6e16g5vKVwzC2LtVBpsfEVFpYa"
  }
]
```

_(Above response are transaction hashes that can be queried in [NEAR Explorer](http://explorer.testnet.near.org))_

---

### `/transfer_nft`

> _Transfers ownership of NFT from specified contract on behalf of provided `enforce_owner_id` signed with `owner_private_key`._

**Method:** **`POST`**

#### Standard Transfer NFT

| Param               | Description                                               |
| ------------------- | --------------------------------------------------------- |
| `token_id`          | _Token ID of the token being transferred_                 |
| `receiver_id`       | _Account ID taking ownership of the NFT_                  |
| `enforce_owner_id`  | _Account ID for the account that currently owns the NFT._ |
| `memo`              | _Optional message to the new token holder._               |
| `owner_private_key` | _Private key of the `enforce_owner_id`._                  |
| `nft_contract`      | _NFT contract that the token being transferred is on._    |

_**Note:** Use [`near login`](https://docs.near.org/docs/tools/near-cli#near-login) to save your key pair to your local machine._

**Example:**

```json
{
  "token_id": "EXAMPLE-TOKEN",
  "receiver_id": "receiver.testnet",
  "enforce_owner_id": "example.testnet",
  "memo": "Here's a token I thought you might like! :)",
  "owner_private_key": "YOUR_PRIVATE_KEY",
  "contract": "nft.example.near"
}
```

**Example Response:**

```json
{
  "owner_id": "receiver.testnet",
  "metadata": "https://ipfs.io/ipfs/Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu",
  "approved_account_ids": [],
  "tx": "5WdNgmNeA5UNpSMDRXemwJc95MB6J22LcvAaimuN5YzF"
}
```

_(`tx` is the transaction hash that can be queried in [NEAR Explorer](http://explorer.testnet.near.org))_

---

#### Simple Transfer NFTs

> _Requires [`/init`](#init) configuration with master account._

| Param              | Description                                               |
| ------------------ | --------------------------------------------------------- |
| `token_id`         | _Token ID of the token being transferred_                 |
| `receiver_id`      | _Account ID taking ownership of the NFT_                  |
| `enforce_owner_id` | _Account ID for the account that currently owns the NFT._ |
| `memo`             | _Optional message to new token holder._                   |

**Example:**

```json
{
  "token_id": "EXAMPLE-TOKEN",
  "receiver_id": "receiver.testnet",
  "enforce_owner_id": "example.testnet",
  "memo": "Here's a token I thought you might like! :)"
}
```

**Example Response:**

```json
{
  "owner_id": "receiver.testnet",
  "metadata": "https://ipfs.io/ipfs/Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu",
  "approved_account_ids": [],
  "tx": "5WdNgmNeA5UNpSMDRXemwJc95MB6J22LcvAaimuN5YzF"
}
```

_(`tx` is the transaction hash that can be queried in [NEAR Explorer](http://explorer.testnet.near.org))_

---

### `view_nft`

#### Standard View NFT

> _Returns owner, metadata, and approved account IDs for a given token ID._

**Method:** **`POST`**

**Example:**

```json
{
  "token_id": "EXAMPLE-TOKEN",
  "contract": "nft.example.testnet"
}
```

**Example Response:**

```json
{
  "owner_id": "example.testnet",
  "metadata": "https://ipfs.io/ipfs/Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu",
  "approved_account_ids": []
}
```

---

#### Simple View NFT

> _Receive detailed information about NFT using URL params. Requires [`/init`](#init) configuration with master account._

**Example:**

`http://localhost:3000/view_nft/EXAMPLE-TOKEN`

**Example Response:**

```json
{
  "owner_id": "example.testnet",
  "metadata": "https://ipfs.io/ipfs/Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu",
  "approved_account_ids": []
}
```

---

## Faker data

> Use the following tags below to use random data for testing purposes.

- `{username}`
- `{number}`
- `{word}`
- `{words}`
- `{image}`
- `{color}`

## Video Presentation

<iframe
  width="640"
  height="360"
  src="https://www.youtube-nocookie.com/embed/d71OscmH4cA"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen>
</iframe>
