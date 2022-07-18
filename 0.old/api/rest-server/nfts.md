---
id: nfts
title: NEAR API REST Server
sidebar_label: NFTs
---

> [NEAR REST API Server](https://github.com/near-examples/near-api-rest-server) is a project that allows you create your own simple REST API server that interacts with the NEAR blockchain.

---

## NFTs {#nfts}

### `/mint_nft` {#mint_nft}

> _Mints a new NFT on a specified contract._

**Method:** **`POST`**

#### Standard NFT Minting {#standard-nft-minting}

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

#### Simple NFT Minting {#simple-nft-minting}

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

#### Batch NFT minting (simple) {#batch-nft-minting-simple}

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

### `/transfer_nft` {#transfer_nft}

> _Transfers ownership of NFT from specified contract on behalf of provided `enforce_owner_id` signed with `owner_private_key`._

**Method:** **`POST`**

#### Standard Transfer NFT {#standard-transfer-nft}

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

#### Simple Transfer NFTs {#simple-transfer-nfts}

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

### `view_nft` {#view_nft}

#### Standard View NFT {#standard-view-nft}

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

#### Simple View NFT {#simple-view-nft}

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
