---
id: contracts
title: NEAR API REST Server
sidebar_label: Contracts
---

> [NEAR REST API Server](https://github.com/near-examples/near-api-rest-server) is a project that allows you create your own simple REST API server that interacts with the NEAR blockchain.

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
