---
id: utils
title: NEAR API REST Server
sidebar_label: Utils
---

> [NEAR REST API Server](https://github.com/near-examples/near-api-rest-server) is a project that allows you create your own simple REST API server that interacts with the NEAR blockchain.

---

## Utils {#utils}

### `/init` {#init}

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

### `/create_user` {#create_user}

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

### `/parse_seed_phrase` {#parse_seed_phrase}

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
