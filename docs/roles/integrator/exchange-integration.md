---
id: exchange-integration
title: Exchange Integration
sidebar_label: Exchange Integration
---

### Transaction reference links
 - [Basics](/docs/concepts/transaction)
 - [Specifications](https://nomicon.io/RuntimeSpec/Transactions.html)
 - [Constructing Transactions](/docs/tutorials/create-transactions)

## Native NEAR (Ⓝ)

### Balance Changes

Balance changes on accounts can be tracked by using our [changes endpoint](/docs/api/rpc#view-account-changes). You can test this out by sending tokens to an account using [NEAR CLI](/docs/tools/near-cli).

- First, make sure you have keys to your account locally. The typical workflow is to set up an account at https://wallet.testnet.near.org, then run the NEAR CLI command `login`. (Example: `near login`)
- Then send tokens using the following format. (The number at the end represents the amount you are sending in Ⓝ.)
  ```bash
  near send sender.testnet receiver.testnet 1
  ```
- You should see a result in your terminal that looks something like this:

  ![token transfer result](/docs/assets/token_transfer_result.png)

- Go to the provided URL to view your transaction in [NEAR Explorer](https://explorer.testnet.near.org/).
- On this page in NEAR Explorer, note and copy the `BLOCK HASH` for this transaction.
- Now, go back to your terminal and run the following command using [HTTPie](https://httpie.org/docs#installation).

  ```bash
  http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare \
      method=EXPERIMENTAL_changes \
      'params:={
          "block_id": "CJ24svU3C9FaULVjcNVnWuVZjK6mNaQ8p6AMyUDMqB37",
          "changes_type": "account_changes",
          "account_ids": ["sender.testnet"]
      }'
  ```

  **Note** Make sure you replace the `block_id` with the `BLOCK HASH` you copied from explorer, as well as replacing the `account_ids` with the one you just sent tokens from.

- You should have a response that looks something like this:

  ![balance changes result](/docs/assets/balance_changes_result.png)

You can also view account balances by using the `query` method, which only requires an accountId.

- In your terminal, run:

  ```bash
  http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=query \
  params:='{
    "request_type": "view_account",
    "finality": "final",
    "account_id": "sender.testnet"
  }'
  ```

Your response should look like this:

![account balance query](/docs/assets/account_balance_query.png)

**Note:** Gas prices can change between blocks. Even for transactions with deterministic gas cost, the cost in NEAR could also be different.

### Accounts

Please see the [documentation for accounts](/docs/concepts/account) for basic information.

- For exchanges, NEAR supports [implicit account](https://nomicon.io/DataStructures/Account.html#implicit-account-ids) creation which allows the creation of accounts without paying for transactions.
- You can create an implicit account by following the steps in [this guide](/docs/roles/integrator/implicit-accounts).
- Accounts must have enough tokens cover its storage. Storage cost per byte is 0.0001 NEAR, and an account with one access key must maintain a balance of at least 0.0182 NEAR. For more details, see [this section of the economics paper](https://near.org/papers/economics-in-sharded-blockchain/#transaction-and-storage-fees).

### Transfer from Function Call

NEAR allows transfer to happen within a function call. More importantly, when an account is deployed with some contract, it is possible that the only way to transfer tokens from that account is through a function call. Therefore, exchanges need to support transfer through function calls as well. We recommend the following approach:

Exchange can [query block by height](/docs/api/rpc#block) to get blocks on each height, and for every block,
[query its chunk](/docs/api/rpc#chunk) to obtain the transactions included in the block. For each transaction,
[query its status](/docs/api/rpc#transaction-status-with-receipts) to see the receipts generated from
transactions. Since exchanges are only interested in transfers to their addresses, they only need to filter receipts that
only contain `Transfer` action and whose `predecessor_id` is not `system` (receipts with `predecessor_id` equal to `system`
are [refunds](https://nomicon.io/RuntimeSpec/Refunds.html)). Then, to check whether the receipt succeeds, it is sufficient
to look for the `receipt_id` in `receipts_outcome` and see if its status is `SuccessValue`.

Alternatively, exchange can use [the indexer framework](https://github.com/near/nearcore/tree/master/chain/indexer)
to help index on-chain data which include receipts. An example usage of the indexer can be found [here](https://github.com/near/nearcore/tree/master/tools/indexer/example).

Below we include examples from the contracts that are likely to be used to perform transfers through function calls.

**Example of transfer from a lockup contract**

A contract `evgeny.lockup.near` is deployed and we can check its owner by

```bash
> near view evgeny.lockup.near get_owner_account_id
View call: evgeny.lockup.near.get_owner_account_id()
'evgeny.near'
```

Now we want to transfer some unlocked tokens (1 NEAR) with the following call

```bash
near call evgeny.lockup.near transfer '{"amount":"1000000000000000000000000", "receiver_id": "evgeny.near"}' --accountId=evgeny.near
```

The result can be seen through tx status query:

```json
{
  "id": "123",
  "jsonrpc": "2.0",
  "result": {
    "receipts": [
      {
        "predecessor_id": "evgeny.near",
        "receipt": {
          "Action": {
            "actions": [
              {
                "FunctionCall": {
                  "args": "eyJhbW91bnQiOiIxMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwIiwicmVjZWl2ZXJfaWQiOiJldmdlbnkubmVhciJ9",
                  "deposit": "0",
                  "gas": 100000000000000,
                  "method_name": "transfer"
                }
              }
            ],
            "gas_price": "186029458",
            "input_data_ids": [],
            "output_data_receivers": [],
            "signer_id": "evgeny.near",
            "signer_public_key": "ed25519:BVRTxEEMx3gFceSgJtnvPFbSnPDwwUzHe6KGduRh5Byq"
          }
        },
        "receipt_id": "CyJL22SYqt26qgh2XVnk9MGfvzgyiiq5Lny7DdbTdTWU",
        "receiver_id": "evgeny.lockup.near"
      },
      {
        "predecessor_id": "evgeny.lockup.near",
        "receipt": {
          "Action": {
            "actions": [
              {
                "Transfer": {
                  "deposit": "1000000000000000000000000"
                }
              }
            ],
            "gas_price": "186029458",
            "input_data_ids": [],
            "output_data_receivers": [],
            "signer_id": "evgeny.near",
            "signer_public_key": "ed25519:BVRTxEEMx3gFceSgJtnvPFbSnPDwwUzHe6KGduRh5Byq"
          }
        },
        "receipt_id": "EvHfj4fUyVuLBRKNdCZmFGr4WfqwYf7YCbzFsRGFTFJC",
        "receiver_id": "evgeny.near"
      },
      {
        "predecessor_id": "system",
        "receipt": {
          "Action": {
            "actions": [
              {
                "Transfer": {
                  "deposit": "19200274886926125000"
                }
              }
            ],
            "gas_price": "0",
            "input_data_ids": [],
            "output_data_receivers": [],
            "signer_id": "evgeny.near",
            "signer_public_key": "ed25519:BVRTxEEMx3gFceSgJtnvPFbSnPDwwUzHe6KGduRh5Byq"
          }
        },
        "receipt_id": "J1bBKH43nXHYg4NuS97R1PFzdZchrJboVAdRsK5NRrAv",
        "receiver_id": "evgeny.near"
      },
      {
        "predecessor_id": "system",
        "receipt": {
          "Action": {
            "actions": [
              {
                "Transfer": {
                  "deposit": "18655658845681462514128"
                }
              }
            ],
            "gas_price": "0",
            "input_data_ids": [],
            "output_data_receivers": [],
            "signer_id": "evgeny.near",
            "signer_public_key": "ed25519:BVRTxEEMx3gFceSgJtnvPFbSnPDwwUzHe6KGduRh5Byq"
          }
        },
        "receipt_id": "6PFaxnNvK5r6qxBq5WfV9uGjoNM6qjhHwLehLP1qak9d",
        "receiver_id": "evgeny.near"
      }
    ],
    "receipts_outcome": [
      {
        "block_hash": "9boEKq9G1UFsEuzmuQrxh5dkRc8xsv8PSPGEkYiTyRLj",
        "id": "CyJL22SYqt26qgh2XVnk9MGfvzgyiiq5Lny7DdbTdTWU",
        "outcome": {
          "executor_id": "evgeny.lockup.near",
          "gas_burnt": 3574640311481,
          "logs": [
            "Transferring 1000000000000000000000000 to account @evgeny.near"
          ],
          "receipt_ids": [
            "EvHfj4fUyVuLBRKNdCZmFGr4WfqwYf7YCbzFsRGFTFJC",
            "6PFaxnNvK5r6qxBq5WfV9uGjoNM6qjhHwLehLP1qak9d"
          ],
          "status": {
            "SuccessReceiptId": "EvHfj4fUyVuLBRKNdCZmFGr4WfqwYf7YCbzFsRGFTFJC"
          },
          "tokens_burnt": "357464031148100000000"
        },
        "proof": []
      },
      {
        "block_hash": "7qn4BjmMD4QbyVvMa8QEzm7h5YuhoGTFTgLeNMUp85UQ",
        "id": "EvHfj4fUyVuLBRKNdCZmFGr4WfqwYf7YCbzFsRGFTFJC",
        "outcome": {
          "executor_id": "evgeny.near",
          "gas_burnt": 223182562500,
          "logs": [],
          "receipt_ids": ["J1bBKH43nXHYg4NuS97R1PFzdZchrJboVAdRsK5NRrAv"],
          "status": {
            "SuccessValue": ""
          },
          "tokens_burnt": "22318256250000000000"
        },
        "proof": [
          {
            "direction": "Right",
            "hash": "AwHdk5dushTSXHFBt3R5MiexjiXybwdnEaB7L9iJ5F6t"
          }
        ]
      },
      {
        "block_hash": "46788Ay85YGnQaH5tfbboQNWJs3gyXsPbcWzRyxqw56K",
        "id": "J1bBKH43nXHYg4NuS97R1PFzdZchrJboVAdRsK5NRrAv",
        "outcome": {
          "executor_id": "evgeny.near",
          "gas_burnt": 0,
          "logs": [],
          "receipt_ids": [],
          "status": {
            "SuccessValue": ""
          },
          "tokens_burnt": "0"
        },
        "proof": []
      },
      {
        "block_hash": "7qn4BjmMD4QbyVvMa8QEzm7h5YuhoGTFTgLeNMUp85UQ",
        "id": "6PFaxnNvK5r6qxBq5WfV9uGjoNM6qjhHwLehLP1qak9d",
        "outcome": {
          "executor_id": "evgeny.near",
          "gas_burnt": 0,
          "logs": [],
          "receipt_ids": [],
          "status": {
            "SuccessValue": ""
          },
          "tokens_burnt": "0"
        },
        "proof": [
          {
            "direction": "Left",
            "hash": "9RRJpH5VdDxsHpp323EshcAauV5wUNDyW9FpEJBRXXq8"
          }
        ]
      }
    ],
    "status": {
      "SuccessValue": ""
    },
    "transaction": {
      "actions": [
        {
          "FunctionCall": {
            "args": "eyJhbW91bnQiOiIxMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwIiwicmVjZWl2ZXJfaWQiOiJldmdlbnkubmVhciJ9",
            "deposit": "0",
            "gas": 100000000000000,
            "method_name": "transfer"
          }
        }
      ],
      "hash": "GXP8YaSonoN2eBY6dB3FbMN2NyYD2JeJJvKdvbL4Jmb2",
      "nonce": 6,
      "public_key": "ed25519:BVRTxEEMx3gFceSgJtnvPFbSnPDwwUzHe6KGduRh5Byq",
      "receiver_id": "evgeny.lockup.near",
      "signature": "ed25519:4nfzTMpQJKCY3KaqUTFig4Xy9uxwbMeQpMJjtNKsXmwiVqgcVSWRguZEgZM8L2x1jvdpZHsYjLCxc9cSBamXuXPH",
      "signer_id": "evgeny.near"
    },
    "transaction_outcome": {
      "block_hash": "4u7maz2U43W4DPxqQE8KoRNi5dTRHrAsKsFk2qDQsQEw",
      "id": "GXP8YaSonoN2eBY6dB3FbMN2NyYD2JeJJvKdvbL4Jmb2",
      "outcome": {
        "executor_id": "evgeny.near",
        "gas_burnt": 2428086459116,
        "logs": [],
        "receipt_ids": ["CyJL22SYqt26qgh2XVnk9MGfvzgyiiq5Lny7DdbTdTWU"],
        "status": {
          "SuccessReceiptId": "CyJL22SYqt26qgh2XVnk9MGfvzgyiiq5Lny7DdbTdTWU"
        },
        "tokens_burnt": "242808645911600000000"
      },
      "proof": []
    }
  }
}
```

As we can see, there are four receipts generated in this function call. If we apply the criteria mentioned above, we can
find in `receipts` field this object

```json
{
  "predecessor_id": "evgeny.lockup.near",
  "receipt": {
    "Action": {
      "actions": [
        {
          "Transfer": {
            "deposit": "1000000000000000000000000"
          }
        }
      ],
      "gas_price": "186029458",
      "input_data_ids": [],
      "output_data_receivers": [],
      "signer_id": "evgeny.near",
      "signer_public_key": "ed25519:BVRTxEEMx3gFceSgJtnvPFbSnPDwwUzHe6KGduRh5Byq"
    }
  },
  "receipt_id": "EvHfj4fUyVuLBRKNdCZmFGr4WfqwYf7YCbzFsRGFTFJC",
  "receiver_id": "evgeny.near"
}
```

which contains only `Transfer` action and whose `predecessor_id` is not `system`. Now we can check the status of the
execution by looking for the same receipt id `EvHfj4fUyVuLBRKNdCZmFGr4WfqwYf7YCbzFsRGFTFJC` in `receipts_outcome` field
of the rpc return result, this leads us to this execution outcome

```json
{
  "block_hash": "7qn4BjmMD4QbyVvMa8QEzm7h5YuhoGTFTgLeNMUp85UQ",
  "id": "EvHfj4fUyVuLBRKNdCZmFGr4WfqwYf7YCbzFsRGFTFJC",
  "outcome": {
    "executor_id": "evgeny.near",
    "gas_burnt": 223182562500,
    "logs": [],
    "receipt_ids": ["J1bBKH43nXHYg4NuS97R1PFzdZchrJboVAdRsK5NRrAv"],
    "status": {
      "SuccessValue": ""
    },
    "tokens_burnt": "22318256250000000000"
  },
  "proof": [
    {
      "direction": "Right",
      "hash": "AwHdk5dushTSXHFBt3R5MiexjiXybwdnEaB7L9iJ5F6t"
    }
  ]
}
```

and its status contains `SuccessValue`, which indicates that the receipt has succeeded. Therefore we know that
`1000000000000000000000000` yoctoNEAR, or 1 NEAR has been successfully transferred.

**Example of transfer from a multisig contract**

Mutisig contract, as the name suggests, uses multiple signatures to confirm a transaction and therefore, actions performed
by the multisig contract involves multiple transactions. In the following example, we will show a how a transfer is done from
a mutlisig contract that requires two confirmations.

- First step: `add_request_and_confirm`. This initiates the action that the multisig contract wants to perform with one
  confirmation. The multisig contract `multsigtest.testnet` wants to transfer 1 NEAR to `bowen` and it first
  sends a transaction that calls `add_request_and_confirm` with a request

```json
{
  "request": {
    "receiver_id": "bowen",
    "actions": [
      {
        "type": "Transfer",
        "amount": "1000000000000000000000000"
      }
    ]
  }
}
```

that indicates it wants to transfer 1 NEAR to `bowen`. Notice that this transaction only records the action
but does not perform the actual transfer. The transaction result is as follows:

```json
{
  "id": "123",
  "jsonrpc": "2.0",
  "result": {
    "receipts": [
      {
        "predecessor_id": "system",
        "receipt": {
          "Action": {
            "actions": [
              {
                "Transfer": {
                  "deposit": "3069687780141648922140"
                }
              }
            ],
            "gas_price": "0",
            "input_data_ids": [],
            "output_data_receivers": [],
            "signer_id": "multisigtest.testnet",
            "signer_public_key": "ed25519:JDewsbE7nz6orFD4zJ3mVzqhfcaoSD6Hmi5as3AHHiTt"
          }
        },
        "receipt_id": "4qgDptd7Wm6vswAhWMCsVpTjBEkmLJEUxSNVQS1wu3rD",
        "receiver_id": "multisigtest.testnet"
      }
    ],
    "receipts_outcome": [
      {
        "block_hash": "6uJWHTvUrtFQAurUyfuAfy9EdoR9FhLodGh44aHJta6m",
        "id": "94LiYwKJEDherHMNg9fqLy9ShFTDiQiUN3nDaGmLZwth",
        "outcome": {
          "executor_id": "multisigtest.testnet",
          "gas_burnt": 8024094920263,
          "logs": [],
          "receipt_ids": ["4qgDptd7Wm6vswAhWMCsVpTjBEkmLJEUxSNVQS1wu3rD"],
          "status": {
            "SuccessValue": "OA=="
          },
          "tokens_burnt": "802409492026300000000"
        },
        "proof": [
          {
            "direction": "Left",
            "hash": "GedzmwRkxA5VkT8GLBCnrPUmnEhWPXadPmiq4Ho1s9pH"
          },
          {
            "direction": "Right",
            "hash": "GirkzdS9YpsAz5fXuL5T3rXd93aRcnXNAdXYi241qpWK"
          }
        ]
      },
      {
        "block_hash": "4JyQ6guJKeWZxxXrKndLDuSa5URuirmBi6RzsbKYFsBE",
        "id": "4qgDptd7Wm6vswAhWMCsVpTjBEkmLJEUxSNVQS1wu3rD",
        "outcome": {
          "executor_id": "multisigtest.testnet",
          "gas_burnt": 0,
          "logs": [],
          "receipt_ids": [],
          "status": {
            "SuccessValue": ""
          },
          "tokens_burnt": "0"
        },
        "proof": []
      }
    ],
    "status": {
      "SuccessValue": "OA=="
    },
    "transaction": {
      "actions": [
        {
          "FunctionCall": {
            "args": "eyJyZXF1ZXN0Ijp7InJlY2VpdmVyX2lkIjoiYm93ZW4iLCJhY3Rpb25zIjpbeyJ0eXBlIjoiVHJhbnNmZXIiLCJhbW91bnQiOiIxMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwIn1dfX0=",
            "deposit": "0",
            "gas": 30000000000000,
            "method_name": "add_request_and_confirm"
          }
        }
      ],
      "hash": "FGREJkC1e8y95Rc35iD1LVRiDy1WcAZhAxxkSinfb2mL",
      "nonce": 10,
      "public_key": "ed25519:JDewsbE7nz6orFD4zJ3mVzqhfcaoSD6Hmi5as3AHHiTt",
      "receiver_id": "multisigtest.testnet",
      "signature": "ed25519:3NUKXd4uj2eEBqGQtRAxkTFW7UfG44tjvQNNHBDvN9ZswTTMRsDrMJSd1U3GqWF7QToqWQR9J8atNEVTemSWYw41",
      "signer_id": "multisigtest.testnet"
    },
    "transaction_outcome": {
      "block_hash": "6uJWHTvUrtFQAurUyfuAfy9EdoR9FhLodGh44aHJta6m",
      "id": "FGREJkC1e8y95Rc35iD1LVRiDy1WcAZhAxxkSinfb2mL",
      "outcome": {
        "executor_id": "multisigtest.testnet",
        "gas_burnt": 2428204963618,
        "logs": [],
        "receipt_ids": ["94LiYwKJEDherHMNg9fqLy9ShFTDiQiUN3nDaGmLZwth"],
        "status": {
          "SuccessReceiptId": "94LiYwKJEDherHMNg9fqLy9ShFTDiQiUN3nDaGmLZwth"
        },
        "tokens_burnt": "242820496361800000000"
      },
      "proof": [
        {
          "direction": "Right",
          "hash": "AsNAQabPFkmaugRGhCbzcEcR8Gnd22WXxPM2fb2cwHiv"
        },
        {
          "direction": "Right",
          "hash": "GirkzdS9YpsAz5fXuL5T3rXd93aRcnXNAdXYi241qpWK"
        }
      ]
    }
  }
}
```

- Second step: `confirm`. A second transaction is sent to confirm the transfer. This transaction takes the request id
  returned by the first transaction and does the actual transfer. The transaction result is as follows

```json
{
  "id": "123",
  "jsonrpc": "2.0",
  "result": {
    "receipts": [
      {
        "predecessor_id": "multisigtest.testnet",
        "receipt": {
          "Action": {
            "actions": [
              {
                "Transfer": {
                  "deposit": "1000000000000000000000000"
                }
              }
            ],
            "gas_price": "451542320",
            "input_data_ids": [],
            "output_data_receivers": [],
            "signer_id": "multisigtest.testnet",
            "signer_public_key": "ed25519:BmVX32jhvEd8d8outiQdjf66GGYV3pb7kaxrKTdNisCz"
          }
        },
        "receipt_id": "DZbHTEf3i3XznK4oJHQfcrteoiCL6WykRiA8vsn4LmAy",
        "receiver_id": "bowen"
      },
      {
        "predecessor_id": "system",
        "receipt": {
          "Action": {
            "actions": [
              {
                "Transfer": {
                  "deposit": "78458115804795000000"
                }
              }
            ],
            "gas_price": "0",
            "input_data_ids": [],
            "output_data_receivers": [],
            "signer_id": "multisigtest.testnet",
            "signer_public_key": "ed25519:BmVX32jhvEd8d8outiQdjf66GGYV3pb7kaxrKTdNisCz"
          }
        },
        "receipt_id": "6SxC9GfYdjqm7Ao5EAw51XUAjgoN8Lj2X9xJfxjDQYXd",
        "receiver_id": "multisigtest.testnet"
      },
      {
        "predecessor_id": "system",
        "receipt": {
          "Action": {
            "actions": [
              {
                "Transfer": {
                  "deposit": "112870156274913516718240"
                }
              }
            ],
            "gas_price": "0",
            "input_data_ids": [],
            "output_data_receivers": [],
            "signer_id": "multisigtest.testnet",
            "signer_public_key": "ed25519:BmVX32jhvEd8d8outiQdjf66GGYV3pb7kaxrKTdNisCz"
          }
        },
        "receipt_id": "CHfzz6NLcQMyiLHBQoczhgm5BFjLVfv9B7eCyXKLhhcT",
        "receiver_id": "multisigtest.testnet"
      }
    ],
    "receipts_outcome": [
      {
        "block_hash": "9JEiMrZ1SpAUEbQswde3Diptzwy35Vrvd41VZWG9hYVE",
        "id": "FfuhYhsgFL7sLC8pk1tuRnMHJdqycE6gEcfgZLW9fmFB",
        "outcome": {
          "executor_id": "multisigtest.testnet",
          "gas_burnt": 10109796553814,
          "logs": [],
          "receipt_ids": [
            "DZbHTEf3i3XznK4oJHQfcrteoiCL6WykRiA8vsn4LmAy",
            "CHfzz6NLcQMyiLHBQoczhgm5BFjLVfv9B7eCyXKLhhcT"
          ],
          "status": {
            "SuccessReceiptId": "DZbHTEf3i3XznK4oJHQfcrteoiCL6WykRiA8vsn4LmAy"
          },
          "tokens_burnt": "1010979655381400000000"
        },
        "proof": [
          {
            "direction": "Left",
            "hash": "9e2UcG6qBRahBh3V2Z8bGJLh5c4jXfZdP3WBJkCpJCfj"
          }
        ]
      },
      {
        "block_hash": "4LkVfqyhhrxDdVFmow6NxLf1jTaj6XVr7CVcUxxySd1R",
        "id": "DZbHTEf3i3XznK4oJHQfcrteoiCL6WykRiA8vsn4LmAy",
        "outcome": {
          "executor_id": "bowen",
          "gas_burnt": 223182562500,
          "logs": [],
          "receipt_ids": ["6SxC9GfYdjqm7Ao5EAw51XUAjgoN8Lj2X9xJfxjDQYXd"],
          "status": {
            "SuccessValue": ""
          },
          "tokens_burnt": "22318256250000000000"
        },
        "proof": [
          {
            "direction": "Right",
            "hash": "FFWaWUFt6sNx5XNHzGYsYBSYFWtGPoww5XQz1QmLVc8i"
          }
        ]
      },
      {
        "block_hash": "G6LDdnAa2b38TB4KZ89HAyVgfgyiRPDDgSxoZypbUYpx",
        "id": "6SxC9GfYdjqm7Ao5EAw51XUAjgoN8Lj2X9xJfxjDQYXd",
        "outcome": {
          "executor_id": "multisigtest.testnet",
          "gas_burnt": 0,
          "logs": [],
          "receipt_ids": [],
          "status": {
            "SuccessValue": ""
          },
          "tokens_burnt": "0"
        },
        "proof": []
      },
      {
        "block_hash": "4LkVfqyhhrxDdVFmow6NxLf1jTaj6XVr7CVcUxxySd1R",
        "id": "CHfzz6NLcQMyiLHBQoczhgm5BFjLVfv9B7eCyXKLhhcT",
        "outcome": {
          "executor_id": "multisigtest.testnet",
          "gas_burnt": 0,
          "logs": [],
          "receipt_ids": [],
          "status": {
            "SuccessValue": ""
          },
          "tokens_burnt": "0"
        },
        "proof": [
          {
            "direction": "Left",
            "hash": "DpDYAEKZTtSomgyeNcJ2i4qjvfqnCtf1CXa83Cz5wvEy"
          }
        ]
      }
    ],
    "status": {
      "SuccessValue": ""
    },
    "transaction": {
      "actions": [
        {
          "FunctionCall": {
            "args": "eyJyZXF1ZXN0X2lkIjo4fQ==",
            "deposit": "0",
            "gas": 250000000000000,
            "method_name": "confirm"
          }
        }
      ],
      "hash": "Fu39vwxC4mu9ks1DZA5Cib63RnBMHpFonk2DcbpioEYc",
      "nonce": 9,
      "public_key": "ed25519:BmVX32jhvEd8d8outiQdjf66GGYV3pb7kaxrKTdNisCz",
      "receiver_id": "multisigtest.testnet",
      "signature": "ed25519:2raQq7t3cmzSL2krE2xaNqXhAw7cKMoXrBjT2ZhAGfCVtGwzbbQ8zkB17vrCSFZDbFmPWSJpoqsw8qPZZiorwSzS",
      "signer_id": "multisigtest.testnet"
    },
    "transaction_outcome": {
      "block_hash": "9JEiMrZ1SpAUEbQswde3Diptzwy35Vrvd41VZWG9hYVE",
      "id": "Fu39vwxC4mu9ks1DZA5Cib63RnBMHpFonk2DcbpioEYc",
      "outcome": {
        "executor_id": "multisigtest.testnet",
        "gas_burnt": 2427972426482,
        "logs": [],
        "receipt_ids": ["FfuhYhsgFL7sLC8pk1tuRnMHJdqycE6gEcfgZLW9fmFB"],
        "status": {
          "SuccessReceiptId": "FfuhYhsgFL7sLC8pk1tuRnMHJdqycE6gEcfgZLW9fmFB"
        },
        "tokens_burnt": "242797242648200000000"
      },
      "proof": [
        {
          "direction": "Right",
          "hash": "B6hN48qeVP8J3hP8XGcANShM264QkNjgJAfMtsuknqex"
        }
      ]
    }
  }
}
```

Notice that similar to the transfer from lockup contract, there is also one receipt in the `receipts` field that meet
our requirements:

```json
{
  "predecessor_id": "multisigtest.testnet",
  "receipt": {
    "Action": {
      "actions": [
        {
          "Transfer": {
            "deposit": "1000000000000000000000000"
          }
        }
      ],
      "gas_price": "451542320",
      "input_data_ids": [],
      "output_data_receivers": [],
      "signer_id": "multisigtest.testnet",
      "signer_public_key": "ed25519:BmVX32jhvEd8d8outiQdjf66GGYV3pb7kaxrKTdNisCz"
    }
  },
  "receipt_id": "DZbHTEf3i3XznK4oJHQfcrteoiCL6WykRiA8vsn4LmAy",
  "receiver_id": "bowen"
}
```

and we can find its outcome in `receipts_outcome`:

```json
{
  "block_hash": "4LkVfqyhhrxDdVFmow6NxLf1jTaj6XVr7CVcUxxySd1R",
  "id": "DZbHTEf3i3XznK4oJHQfcrteoiCL6WykRiA8vsn4LmAy",
  "outcome": {
    "executor_id": "bowen",
    "gas_burnt": 223182562500,
    "logs": [],
    "receipt_ids": ["6SxC9GfYdjqm7Ao5EAw51XUAjgoN8Lj2X9xJfxjDQYXd"],
    "status": {
      "SuccessValue": ""
    },
    "tokens_burnt": "22318256250000000000"
  },
  "proof": [
    {
      "direction": "Right",
      "hash": "FFWaWUFt6sNx5XNHzGYsYBSYFWtGPoww5XQz1QmLVc8i"
    }
  ]
}
```

which indicates that the transaction is successful.

## Fungible tokens

Please see the [spec for the fungible token standard](https://nomicon.io/Standards/FungibleToken/README.html) and an [example implementation](https://github.com/near-examples/FT) for reference details.

One notable aspect of the standard is that method names are prefixed with `ft_`. This will be a helpful convention when querying for transactions related to fungible tokens.

### Get balance

Using the abstraction of the NEAR CLI tool, we can check the balance of a user's account with this command:

`near view ft.demo.testnet ft_balance_of '{"account_id": "mike.testnet"}'`

Returns:

```
View call: ft.demo.testnet.ft_balance_of({"account_id": "mike.testnet"})
'1000000'
```

Using HTTPie:

```bash
http post https://rpc.testnet.near.org jsonrpc=2.0 id=ftbalance method=query \
params:='{
  "request_type": "call_function",
  "finality": "final",
  "account_id": "ft.demo.testnet",
  "method_name": "ft_balance_of",
  "args_base64": "eyJhY2NvdW50X2lkIjogIm1pa2UudGVzdG5ldCJ9"
}'
```

Returns:

```bash
HTTP/1.1 200 OK
Alt-Svc: clear
Via: 1.1 google
access-control-allow-origin:
content-length: 176
content-type: application/json
date: Thu, 27 May 2021 12:53:38 GMT

{
    "id": "dontcare",
    "jsonrpc": "2.0",
    "result": {
        "block_hash": "3mvNHpZAsXiJ6SuHU1mbLVB4iXCfh5i5d41pnkaSoaJ5",
        "block_height": 49282350,
        "logs": [],
        "result": [
            34,
            49,
            48,
            48,
            48,
            48,
            48,
            48,
            34
        ]
    }
}
```

As mentioned earlier, the `result` is an array of bytes. There are various ways to convert bytes into a more human-readable form, such as the [dtool CLI](https://github.com/guoxbin/dtool#installation).

`dtool a2h '[34,49,48,48,48,48,48,48,34]' | dtool h2s`

Returns:

`"1000000"`

Note that the fungible token balance of the account `mike.testnet` is `1000000` wrapped in double-quotes. This is because of an issue with JSON serialization. Amounts given in arguments and results must be serialized as Base-10 strings, e.g. "100". This is done to avoid JSON limitation of max integer value of 2**53, which can certainly happen with fungible tokens.

### Simple transfer

### Transfer and call

#### Successful transfer and call

#### Failed transfer and call

## Blocks and Finality

Some important pieces of information regarding blocks and finality include:

- Expected block time is around 1s and expected time to finality is around 2s. The last final block can be queried by
  specifying `{"finality": "final"}` in the block query. For example, to get the latest final block on mainnet, one can run

```bash
http post https://rpc.mainnet.near.org method=block params:='{"finality":"final"}' id=123 jsonrpc=2.0
```

- Block height are not necessarily continuous and certain height may be skipped if for example block producer for that height
  is offline. For example, after a block at height 100 is produced, the block at height 101 may be skipped. When block at height
  102 is produced, its previous block is the block at height 100.

- Some blocks may not include new chunks if, for example, the previous chunk producer is offline. Even though in the rpc
  return result every block will have nonempty `chunks` field, it does not imply that there is a new chunk included in the block.
  The way to tell whether the chunk is included in the block is to check whether `height_included` in the chunk is the same
  as the height of the block.

## Running an Archival Node

- Setting up an archival node is the same as a [regular node](/docs/develop/node/running-a-node), but modifying your `config.json` by changing `archive` to `true` and specifying `tracked_shards`. Please make sure that the node is stopped while changing the config.

The config should contain the following fields, currently NEAR testnet and mainnet have only 1 (zero indexed) shard and that shard is tracked.

```
{
  ...
  "archive": true,
  "tracked_shards": [0],
  ...
}
```

In the future there will be the possibility to track different or multiple shards.

- Once the config has been changed you can restart the node it will start syncing new archival data, in the case where you want the full archival history you can just delete the data dir and start the node from scratch syncing full history or use one of the latest backups containing the data directory snapshot which can be copied under the near home dir (default: ~/.near/data).

All the backups can be downloaded from the public S3 bucket which contains the latest daily snapshots:

| Network | URL                                                                                         |
| ------- | ------------------------------------------------------------------------------------------- |
| Mainnet | https://near-protocol-public.s3.ca-central-1.amazonaws.com/backups/mainnet/archive/data.tar |
| Testnet | https://near-protocol-public.s3.ca-central-1.amazonaws.com/backups/testnet/archive/data.tar |

---

### Steps to start an archival node

Make sure [nearup](https://github.com/near/nearup) is installed.

1. `wget -b https://near-protocol-public.s3.ca-central-1.amazonaws.com/backups/{testnet|mainnet}/archive/data.tar`
2. `nearup run testnet`
3. Wait until initialization finishes, use `nearup logs --follow`
4. `nearup stop`
5. `tar -xvf data.tar -C ~/.near/testnet/data`
6. `nearup run testnet` - should start syncing headers at ~97%

## Staking and Delegation

- [https://github.com/nearprotocol/stakewars](https://github.com/nearprotocol/stakewars)
- [https://github.com/near/core-contracts](https://github.com/near/core-contracts)

> Got a question?
> <a href="https://stackoverflow.com/questions/tagged/nearprotocol">
> <h8>Ask it on StackOverflow!</h8></a>
