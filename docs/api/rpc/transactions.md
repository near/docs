---
id: transactions
title: Transactions
description: "Send transactions and query their status using the RPC"
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { TryOutOnLantstool } from '@site/src/components/lantstool/TryOutOnLantstool';
import { LantstoolLabel } from '@site/src/components/lantstool/LantstoolLabel/LantstoolLabel';
import { SplitLayoutContainer, SplitLayoutLeft, SplitLayoutRight } from '@site/src/components/SplitLayout';

The RPC API enables you to send transactions and query their status on the NEAR blockchain. This includes sending new transactions, checking transaction status, retrieving receipts, and monitoring transaction execution.

---

## Quick Reference

| Method | Parameters | Description |
| --- | --- | --- |
| [`send_tx`](#send-tx) | `signed_tx_base64`, `wait_until` | Send a transaction and optionally wait for execution |
| [`tx`](#transaction-status) | `tx_hash`, `sender_account_id`, `wait_until` | Query transaction status by hash |
| [`EXPERIMENTAL_tx_status`](#transaction-status-with-receipts) | `tx_hash`, `sender_account_id`, `wait_until` | Query transaction status with receipt details |
| [`EXPERIMENTAL_receipt`](#receipt-by-id) | `receipt_id` | Fetch receipt by ID |
| [`broadcast_tx_async`](#send-transaction-async) | `signed_tx_base64` | (Deprecated) Send transaction asynchronously |
| [`broadcast_tx_commit`](#send-transaction-await) | `signed_tx_base64` | (Deprecated) Send transaction and wait for completion |

---
## Send transaction {#send-tx}

<SplitLayoutContainer>
  <SplitLayoutLeft title="Description">
    Sends transaction.
    Returns the guaranteed execution status and the results the blockchain can provide at the moment.

    - **method**: `send_tx`
    - **params**:
      - `signed_tx_base64`: SignedTransaction encoded in base64
      - [Optional] `wait_until`: the required minimal execution level.
        The default value is `EXECUTED_OPTIMISTIC`.
        [Read more here](#tx-status-result).

    Using `send_tx` with `wait_until = NONE` is equal to legacy `broadcast_tx_async` method. <br />
    Using `send_tx` with finality `wait_until = EXECUTED_OPTIMISTIC` is equal to legacy `broadcast_tx_commit` method.
  </SplitLayoutLeft>
  <SplitLayoutRight title="Example">
    <Tabs groupId="code-tabs">
      <TabItem value="json" label="JSON" default>
        ```json
      {
        "jsonrpc": "2.0",
        "id": "dontcare",
        "method": "send_tx",
        "params": {
          "signed_tx_base64": "DgAAAHNlbmRlci50ZXN0bmV0AOrmAai64SZOv9e/naX4W15pJx0GAap35wTT1T/DwcbbDwAAAAAAAAAQAAAAcmVjZWl2ZXIudGVzdG5ldNMnL7URB1cxPOu3G8jTqlEwlcasagIbKlAJlF5ywVFLAQAAAAMAAACh7czOG8LTAAAAAAAAAGQcOG03xVSFQFjoagOb4NBBqWhERnnz45LY4+52JgZhm1iQKz7qAdPByrGFDQhQ2Mfga8RlbysuQ8D8LlA6bQE=",
          "wait_until": "INCLUDED_FINAL"
        }
      }
        ```
      </TabItem>
      <TabItem value="http" label="HTTPie">
        ```bash
      http POST https://rpc.testnet.near.org \
      jsonrpc=2.0 \
      id=dontcare \
      method=send_tx \
      params:='{
        "signed_tx_base64": "DgAAAHNlbmRlci50ZXN0bmV0AOrmAai64SZOv9e/naX4W15pJx0GAap35wTT1T/DwcbbDwAAAAAAAAAQAAAAcmVjZWl2ZXIudGVzdG5ldNMnL7URB1cxPOu3G8jTqlEwlcasagIbKlAJlF5ywVFLAQAAAAMAAACh7czOG8LTAAAAAAAAAGQcOG03xVSFQFjoagOb4NBBqWhERnnz45LY4+52JgZhm1iQKz7qAdPByrGFDQhQ2Mfga8RlbysuQ8D8LlA6bQE=",
        "wait_until": "EXECUTED"
      }'
        ```
      </TabItem>
    </Tabs>
  </SplitLayoutRight>
</SplitLayoutContainer>

<details>
  <summary>Example response: </summary>
  
  ```json
  {
    "jsonrpc": "2.0",
    "result": {
      "final_execution_status": "FINAL",
      "status": {
        "SuccessValue": ""
      },
      "transaction": {
        "signer_id": "sender.testnet",
        "public_key": "ed25519:Gowpa4kXNyTMRKgt5W7147pmcc2PxiFic8UHW9rsNvJ6",
        "nonce": 13,
        "receiver_id": "receiver.testnet",
        "actions": [
          {
            "Transfer": {
              "deposit": "1000000000000000000000000"
            }
          }
        ],
        "signature": "ed25519:7oCBMfSHrZkT7tzPDBxxCd3tWFhTES38eks3MCZMpYPJRfPWKxJsvmwQiVBBxRLoxPTnXVaMU2jPV3MdFKZTobH",
        "hash": "ASS7oYwGiem9HaNwJe6vS2kznx2CxueKDvU9BAYJRjNR"
      },
      "transaction_outcome": {
        "proof": [],
        "block_hash": "9MzuZrRPW1BGpFnZJUJg6SzCrixPpJDfjsNeUobRXsLe",
        "id": "ASS7oYwGiem9HaNwJe6vS2kznx2CxueKDvU9BAYJRjNR",
        "outcome": {
          "logs": [],
          "receipt_ids": ["BLV2q6p8DX7pVgXRtGtBkyUNrnqkNyU7iSksXG7BjVZh"],
          "gas_burnt": 223182562500,
          "tokens_burnt": "22318256250000000000",
          "executor_id": "sender.testnet",
          "status": {
            "SuccessReceiptId": "BLV2q6p8DX7pVgXRtGtBkyUNrnqkNyU7iSksXG7BjVZh"
          }
        }
      },
      "receipts_outcome": [
        {
          "proof": [],
          "block_hash": "5Hpj1PeCi32ZkNXgiD1DrW4wvW4Xtic74DJKfyJ9XL3a",
          "id": "BLV2q6p8DX7pVgXRtGtBkyUNrnqkNyU7iSksXG7BjVZh",
          "outcome": {
            "logs": [],
            "receipt_ids": ["3sawynPNP8UkeCviGqJGwiwEacfPyxDKRxsEWPpaUqtR"],
            "gas_burnt": 223182562500,
            "tokens_burnt": "22318256250000000000",
            "executor_id": "receiver.testnet",
            "status": {
              "SuccessValue": ""
            }
          }
        }
      ]
    },
    "id": "dontcare"
  }
  ```
</details>
<details>
<summary>Error handling:</summary>

When making RPC API requests, you may encounter various errors related to network configuration, rate limiting, or request formatting. For comprehensive information about error types, causes, and solutions, see the [RPC Errors](/api/rpc/errors) documentation.

</details>

---
## Transaction Status {#transaction-status}

<SplitLayoutContainer>
  <SplitLayoutLeft title="Description">
    Queries status of a transaction by hash and returns the final transaction result.

    - **method**: `tx`
    - **params**:
      - `tx_hash` _(see [NearBlocks Explorer](https://testnet.nearblocks.io) for a valid transaction hash)_
      - `sender_account_id` _(used to determine which shard to query for transaction)_
      - [Optional] `wait_until`: the required minimal execution level.
        The default value is `EXECUTED_OPTIMISTIC`.
        Read more [here](/api/rpc/transactions#tx-status-result).

    A Transaction status request with `wait_until != NONE` will wait until the
    transaction appears on the blockchain. If the transaction does not exist,
    the method will wait until the timeout is reached. If you only need to check
    whether the transaction exists, use `wait_until = NONE`, it will return
    the response immediately.
  </SplitLayoutLeft>
  <SplitLayoutRight title="Example">
    <Tabs groupId="code-tabs">
      <TabItem value="json" label="JSON" default>
        ```json
        {
          "jsonrpc": "2.0",
          "id": "dontcare",
          "method": "tx",
          "params": {
            "tx_hash": "7AfonAhbK4ZbdBU9VPcQdrTZVZBXE25HmZAMEABs9To1",
            "sender_account_id": "rpc-examples.testnet",
            "wait_until": "FINAL"
          }
        }
        ```
      </TabItem>
      <TabItem value="js" label="JavaScript">
        ```js
          const response = await near.connection.provider.txStatus(
    '7AfonAhbK4ZbdBU9VPcQdrTZVZBXE25HmZAMEABs9To1',
    'rpc-examples.testnet',
    'FINAL',
  );
        ```
      </TabItem>
      <TabItem value="http" label="HTTPie">
        ```bash
http POST https://archival-rpc.testnet.near.org \
  jsonrpc=2.0 \
  id=dontcare \
  method=tx \
  params:='{
    "tx_hash": "7AfonAhbK4ZbdBU9VPcQdrTZVZBXE25HmZAMEABs9To1",
    "sender_account_id": "rpc-examples.testnet",
    "wait_until": "FINAL"
  }'
        ```
      </TabItem>
      <TabItem value="Lantstool" label={<LantstoolLabel />}>
        <TryOutOnLantstool path="docs/5.api/rpc/transactions/get-transaction.json" />
      </TabItem>
    </Tabs>
  </SplitLayoutRight>
</SplitLayoutContainer>

<details>
  <summary>Example response:</summary>
  
  ```json
  {
    "jsonrpc": "2.0",
    "result": {
      "final_execution_status": "FINAL",
      "receipts_outcome": [
        {
          "block_hash": "ApNYvBCU3Nnn8TeESvJ7Anfw8vfbmwcXmavypAWtKv6p",
          "id": "23r1wWsMAVtZysr9wNV6TCSdZTUyPbhBZ3McJ6zStpaE",
          "outcome": {
            "executor_id": "contract.rpc-examples.testnet",
            "gas_burnt": 4174947687500,
            "logs": [],
            "metadata": {
              "gas_profile": [],
              "version": 3
            },
            "receipt_ids": ["AZz7tN4cSK9Ngeq7KUFWSm8yi9WLsVjqYiohNYzW8Pc4"],
            "status": {
              "SuccessValue": ""
            },
            "tokens_burnt": "417494768750000000000"
          },
          "proof": [
            {
              "direction": "Left",
              "hash": "CuLK7PnND8x1XooFysdUbG9VqG2yzKKjPSFXSGsuKzn4"
            }
          ]
        }
      ],
      "status": {
        "SuccessValue": ""
      },
      "transaction": {
        "actions": [
          "CreateAccount",
          {
            "Transfer": {
              "deposit": "5000000000000000000000000"
            }
          },
          {
            "AddKey": {
              "access_key": {
                "nonce": 0,
                "permission": "FullAccess"
              },
              "public_key": "ed25519:vJBU18AtvePANmepMoY3rtV3wt1RHwqoktak82E4d2M"
            }
          }
        ],
        "hash": "7AfonAhbK4ZbdBU9VPcQdrTZVZBXE25HmZAMEABs9To1",
        "nonce": 187307146000001,
        "priority_fee": 0,
        "public_key": "ed25519:vJBU18AtvePANmepMoY3rtV3wt1RHwqoktak82E4d2M",
        "receiver_id": "contract.rpc-examples.testnet",
        "signature": "ed25519:34NgQAukvyKajXFDB6XzKpfd2YDUo3QyTdkUeCgwm24J3dkju7Ejm71VRkRsJwdpKwH1HQWqSV2frnF26yQYEZpJ",
        "signer_id": "rpc-examples.testnet"
      },
      "transaction_outcome": {
        "block_hash": "G1xSnhtrDiaEZNef41kiY8ePQCAwsF2gyVcRNa7B6xaP",
        "id": "7AfonAhbK4ZbdBU9VPcQdrTZVZBXE25HmZAMEABs9To1",
        "outcome": {
          "executor_id": "rpc-examples.testnet",
          "gas_burnt": 4174947687500,
          "logs": [],
          "metadata": {
            "gas_profile": null,
            "version": 1
          },
          "receipt_ids": ["23r1wWsMAVtZysr9wNV6TCSdZTUyPbhBZ3McJ6zStpaE"],
          "status": {
            "SuccessReceiptId": "23r1wWsMAVtZysr9wNV6TCSdZTUyPbhBZ3McJ6zStpaE"
          },
          "tokens_burnt": "417494768750000000000"
        },
        "proof": [
          {
            "direction": "Left",
            "hash": "Ft2GVFu6zuQGbUU7DB7opgshYLPvuvfNnGqMAny1kgPj"
          }
        ]
      }
    },
    "id": "dontcare"
  }
  ```
</details>
<details>
<summary>Error handling:</summary>

When making RPC API requests, you may encounter various errors related to network configuration, rate limiting, or request formatting. For comprehensive information about error types, causes, and solutions, see the [RPC Errors](/api/rpc/errors) documentation.

</details>

---
## Transaction Status with Receipts {#transaction-status-with-receipts}

<SplitLayoutContainer>
  <SplitLayoutLeft title="Description">
    Queries status of a transaction by hash, returning the final transaction
    result _and_ details of all receipts.

    - **method**: `EXPERIMENTAL_tx_status`
    - **params**:
      - `tx_hash` _(see [NearBlocks Explorer](https://testnet.nearblocks.io) for a valid transaction hash)_
      - `sender_account_id` _(used to determine which shard to query for transaction)_
      - [Optional] `wait_until`: the required minimal execution level.
        The default value is `EXECUTED_OPTIMISTIC`.
        Read more [here](/api/rpc/transactions#tx-status-result).

    A Transaction status request with `wait_until != NONE` will wait until the
    transaction appears on the blockchain. If the transaction does not exist,
    the method will wait until the timeout is reached. If you only need to check
    whether the transaction exists, use `wait_until = NONE`, it will return the response immediately.
  </SplitLayoutLeft>
  <SplitLayoutRight title="Example">
    <Tabs groupId="code-tabs">
      <TabItem value="json" label="JSON" default>
        ```json
        {
          "jsonrpc": "2.0",
          "id": "dontcare",
          "method": "EXPERIMENTAL_tx_status",
          "params": {
            "tx_hash": "7AfonAhbK4ZbdBU9VPcQdrTZVZBXE25HmZAMEABs9To1",
            "sender_account_id": "rpc-examples.testnet",
            "wait_until": "FINAL"
          }
        }
        ```
      </TabItem>
      <TabItem value="js" label="JavaScript">
        ```js
const response = await near.connection.provider.txStatusReceipts(
  '7AfonAhbK4ZbdBU9VPcQdrTZVZBXE25HmZAMEABs9To1',
  'rpc-examples.testnet',
  'FINAL',
);
        ```
      </TabItem>
      <TabItem value="http" label="HTTPie">
        ```bash
        http POST https://archival-rpc.testnet.near.org \
  jsonrpc=2.0 \
  id=dontcare \
  method=EXPERIMENTAL_tx_status \
  params:='{
    "tx_hash": "7AfonAhbK4ZbdBU9VPcQdrTZVZBXE25HmZAMEABs9To1",
    "sender_account_id": "rpc-examples.testnet",
    "wait_until": "FINAL"
  }'
        ```
      </TabItem>
      <TabItem value="Lantstool" label={<LantstoolLabel />}>
        <TryOutOnLantstool path="docs/5.api/rpc/transactions/get-detailed-transaction.json" />
      </TabItem>
    </Tabs>
  </SplitLayoutRight>
</SplitLayoutContainer>

<details>
  <summary>Example response:</summary>
  
  ```json
{
  "jsonrpc": "2.0",
  "result": {
    "final_execution_status": "FINAL",
    "receipts": [
      {
        "predecessor_id": "rpc-examples.testnet",
        "priority": 0,
        "receipt": {
          "Action": {
            "actions": [
              "CreateAccount",
              {
                "Transfer": {
                  "deposit": "5000000000000000000000000"
                }
              },
              {
                "AddKey": {
                  "access_key": {
                    "nonce": 0,
                    "permission": "FullAccess"
                  },
                  "public_key": "ed25519:vJBU18AtvePANmepMoY3rtV3wt1RHwqoktak82E4d2M"
                }
              }
            ],
            "gas_price": "103000000",
            "input_data_ids": [],
            "is_promise_yield": false,
            "output_data_receivers": [],
            "signer_id": "rpc-examples.testnet",
            "signer_public_key": "ed25519:vJBU18AtvePANmepMoY3rtV3wt1RHwqoktak82E4d2M"
          }
        },
        "receipt_id": "23r1wWsMAVtZysr9wNV6TCSdZTUyPbhBZ3McJ6zStpaE",
        "receiver_id": "contract.rpc-examples.testnet"
      },
      {
        "predecessor_id": "system",
        "priority": 0,
        "receipt": {
          "Action": {
            "actions": [
              {
                "Transfer": {
                  "deposit": "12524843062500000000"
                }
              }
            ],
            "gas_price": "0",
            "input_data_ids": [],
            "is_promise_yield": false,
            "output_data_receivers": [],
            "signer_id": "rpc-examples.testnet",
            "signer_public_key": "ed25519:vJBU18AtvePANmepMoY3rtV3wt1RHwqoktak82E4d2M"
          }
        },
        "receipt_id": "AZz7tN4cSK9Ngeq7KUFWSm8yi9WLsVjqYiohNYzW8Pc4",
        "receiver_id": "rpc-examples.testnet"
      }
    ],
    "receipts_outcome": [
      {
        "block_hash": "ApNYvBCU3Nnn8TeESvJ7Anfw8vfbmwcXmavypAWtKv6p",
        "id": "23r1wWsMAVtZysr9wNV6TCSdZTUyPbhBZ3McJ6zStpaE",
        "outcome": {
          "executor_id": "contract.rpc-examples.testnet",
          "gas_burnt": 4174947687500,
          "logs": [],
          "metadata": {
            "gas_profile": [],
            "version": 3
          },
          "receipt_ids": ["AZz7tN4cSK9Ngeq7KUFWSm8yi9WLsVjqYiohNYzW8Pc4"],
          "status": {
            "SuccessValue": ""
          },
          "tokens_burnt": "417494768750000000000"
        },
        "proof": [
          {
            "direction": "Left",
            "hash": "CuLK7PnND8x1XooFysdUbG9VqG2yzKKjPSFXSGsuKzn4"
          }
        ]
      },
      {
        "block_hash": "4C1384HReTY7NR7jVk2aMDyccCNVM5zeQDQ6z84cj1N4",
        "id": "AZz7tN4cSK9Ngeq7KUFWSm8yi9WLsVjqYiohNYzW8Pc4",
        "outcome": {
          "executor_id": "rpc-examples.testnet",
          "gas_burnt": 223182562500,
          "logs": [],
          "metadata": {
            "gas_profile": [],
            "version": 3
          },
          "receipt_ids": [],
          "status": {
            "SuccessValue": ""
          },
          "tokens_burnt": "0"
        },
        "proof": [
          {
            "direction": "Left",
            "hash": "7agjDTstRCDmAn4LvPnHDu8yxhbSWCD7VNhzr7nLq37N"
          },
          {
            "direction": "Left",
            "hash": "54QAYN39nMUp6uz6vhNbDNRbvAmk16mw7R1WvxnmG1Xr"
          }
        ]
      }
    ],
    "status": {
      "SuccessValue": ""
    },
    "transaction": {
      "actions": [
        "CreateAccount",
        {
          "Transfer": {
            "deposit": "5000000000000000000000000"
          }
        },
        {
          "AddKey": {
            "access_key": {
              "nonce": 0,
              "permission": "FullAccess"
            },
            "public_key": "ed25519:vJBU18AtvePANmepMoY3rtV3wt1RHwqoktak82E4d2M"
          }
        }
      ],
      "hash": "7AfonAhbK4ZbdBU9VPcQdrTZVZBXE25HmZAMEABs9To1",
      "nonce": 187307146000001,
      "priority_fee": 0,
      "public_key": "ed25519:vJBU18AtvePANmepMoY3rtV3wt1RHwqoktak82E4d2M",
      "receiver_id": "contract.rpc-examples.testnet",
      "signature": "ed25519:34NgQAukvyKajXFDB6XzKpfd2YDUo3QyTdkUeCgwm24J3dkju7Ejm71VRkRsJwdpKwH1HQWqSV2frnF26yQYEZpJ",
      "signer_id": "rpc-examples.testnet"
    },
    "transaction_outcome": {
      "block_hash": "G1xSnhtrDiaEZNef41kiY8ePQCAwsF2gyVcRNa7B6xaP",
      "id": "7AfonAhbK4ZbdBU9VPcQdrTZVZBXE25HmZAMEABs9To1",
      "outcome": {
        "executor_id": "rpc-examples.testnet",
        "gas_burnt": 4174947687500,
        "logs": [],
        "metadata": {
          "gas_profile": null,
          "version": 1
        },
        "receipt_ids": ["23r1wWsMAVtZysr9wNV6TCSdZTUyPbhBZ3McJ6zStpaE"],
        "status": {
          "SuccessReceiptId": "23r1wWsMAVtZysr9wNV6TCSdZTUyPbhBZ3McJ6zStpaE"
        },
        "tokens_burnt": "417494768750000000000"
      },
      "proof": [
        {
          "direction": "Left",
          "hash": "Ft2GVFu6zuQGbUU7DB7opgshYLPvuvfNnGqMAny1kgPj"
        },
        {
          "direction": "Left",
          "hash": "39hCSJBs64y18wcM8qtasQQnkfXYBhvHau3bEbULgV3E"
        },
        {
          "direction": "Right",
          "hash": "GkZCCuNqu2qpwd5Xwo2g4qwRvXXmgV2k71YM7EYhg5HK"
        }
      ]
    }
  },
  "id": "dontcare"
}
  ```
</details>
<details>
<summary>Error handling:</summary>

When making RPC API requests, you may encounter various errors related to network configuration, rate limiting, or request formatting. For comprehensive information about error types, causes, and solutions, see the [RPC Errors](/api/rpc/errors) documentation.

</details>

---
## Receipt by ID {#receipt-by-id}

<SplitLayoutContainer>
  <SplitLayoutLeft title="Description">
    Fetches a receipt by its ID (as is, without a status or execution outcome)

    - **method**: `EXPERIMENTAL_receipt`
    - **params**:
      - `receipt_id` _(see [NearBlocks Explorer](https://testnet.nearblocks.io) for a valid receipt id)_
  </SplitLayoutLeft>
  <SplitLayoutRight title="Example">
    <Tabs groupId="code-tabs">
      <TabItem value="json" label="JSON" default>
        ```json
        {
          "jsonrpc": "2.0",
          "id": "dontcare",
          "method": "EXPERIMENTAL_receipt",
          "params": {
            "receipt_id": "23r1wWsMAVtZysr9wNV6TCSdZTUyPbhBZ3McJ6zStpaE"
          }
        }
        ```
      </TabItem>
      <TabItem value="http" label="HTTPie">
        ```bash
        http POST https://rpc.testnet.near.org \
          jsonrpc=2.0 \
          id=dontcare \
          method=EXPERIMENTAL_receipt \
          params:='{"receipt_id": "23r1wWsMAVtZysr9wNV6TCSdZTUyPbhBZ3McJ6zStpaE"}'
        ```
      </TabItem>
      <TabItem value="Lantstool" label={<LantstoolLabel />}>
        <TryOutOnLantstool path="docs/5.api/rpc/transactions/get-receipt.json" />
      </TabItem>
    </Tabs>
  </SplitLayoutRight>
</SplitLayoutContainer>

<details>
  <summary>Example response:</summary>
  
  ```json
  {
    "jsonrpc": "2.0",
    "result": {
      "predecessor_id": "rpc-examples.testnet",
      "priority": 0,
      "receipt": {
        "Action": {
          "actions": [
            "CreateAccount",
            {
              "Transfer": {
                "deposit": "5000000000000000000000000"
              }
            },
            {
              "AddKey": {
                "access_key": {
                  "nonce": 0,
                  "permission": "FullAccess"
                },
                "public_key": "ed25519:vJBU18AtvePANmepMoY3rtV3wt1RHwqoktak82E4d2M"
              }
            }
          ],
          "gas_price": "103000000",
          "input_data_ids": [],
          "is_promise_yield": false,
          "output_data_receivers": [],
          "signer_id": "rpc-examples.testnet",
          "signer_public_key": "ed25519:vJBU18AtvePANmepMoY3rtV3wt1RHwqoktak82E4d2M"
        }
      },
      "receipt_id": "23r1wWsMAVtZysr9wNV6TCSdZTUyPbhBZ3McJ6zStpaE",
      "receiver_id": "contract.rpc-examples.testnet"
    },
    "id": "dontcare"
  }
  ```
</details>
<details>
<summary>Error handling:</summary>

When making RPC API requests, you may encounter various errors related to network configuration, rate limiting, or request formatting. For comprehensive information about error types, causes, and solutions, see the [RPC Errors](/api/rpc/errors) documentation.

</details>

---
## Transaction Execution Levels {#tx-status-result}

All the methods listed above have `wait_until` request parameter, and
`final_execution_status` response value. They correspond to the same enum
`TxExecutionStatus`. See the detailed explanation for all the options:

```rust
#[serde(rename_all = "SCREAMING_SNAKE_CASE")]
pub enum TxExecutionStatus {
  /// Transaction is waiting to be included into the block
  None,
  /// Transaction is included into the block. The block may be not finalized yet
  Included,
  /// Transaction is included into the block +
  /// All non-refund transaction receipts finished their execution.
  /// The corresponding blocks for tx and each receipt may be not finalized yet
  #[default]
  ExecutedOptimistic,
  /// Transaction is included into finalized block
  IncludedFinal,
  /// Transaction is included into finalized block +
  /// All non-refund transaction receipts finished their execution.
  /// The corresponding blocks for each receipt may be not finalized yet
  Executed,
  /// Transaction is included into finalized block +
  /// Execution of all transaction receipts is finalized, including refund receipts
  Final,
}
```

---

## Deprecated methods {#deprecated}

## [deprecated] Send transaction (async) {#send-transaction-async}

<SplitLayoutContainer>
  <SplitLayoutLeft title="Description">
    Consider using [`send_tx`](/api/rpc/transactions#send-tx) instead

    Sends a transaction and immediately returns transaction hash.

    - **method**: `broadcast_tx_async`
    - **params**: [SignedTransaction encoded in base64]
  </SplitLayoutLeft>
  <SplitLayoutRight title="Example">
    <Tabs groupId="code-tabs">
      <TabItem value="json" label="JSON" default>
        ```json
        {
          "jsonrpc": "2.0",
          "id": "dontcare",
          "method": "broadcast_tx_async",
          "params": [
            "DgAAAHNlbmRlci50ZXN0bmV0AOrmAai64SZOv9e/naX4W15pJx0GAap35wTT1T/DwcbbDwAAAAAAAAAQAAAAcmVjZWl2ZXIudGVzdG5ldNMnL7URB1cxPOu3G8jTqlEwlcasagIbKlAJlF5ywVFLAQAAAAMAAACh7czOG8LTAAAAAAAAAGQcOG03xVSFQFjoagOb4NBBqWhERnnz45LY4+52JgZhm1iQKz7qAdPByrGFDQhQ2Mfga8RlbysuQ8D8LlA6bQE="
          ]
        }
        ```
      </TabItem>
      <TabItem value="http" label="HTTPie">
        ```bash
        http POST https://rpc.testnet.near.org \
          jsonrpc=2.0 \
          id=dontcare \
          method=broadcast_tx_async \
          params:='[
            "DgAAAHNlbmRlci50ZXN0bmV0AOrmAai64SZOv9e/naX4W15pJx0GAap35wTT1T/DwcbbDwAAAAAAAAAQAAAAcmVjZWl2ZXIudGVzdG5ldNMnL7URB1cxPOu3G8jTqlEwlcasagIbKlAJlF5ywVFLAQAAAAMAAACh7czOG8LTAAAAAAAAAGQcOG03xVSFQFjoagOb4NBBqWhERnnz45LY4+52JgZhm1iQKz7qAdPByrGFDQhQ2Mfga8RlbysuQ8D8LlA6bQE="
          ]'
        ```
      </TabItem>
    </Tabs>
  </SplitLayoutRight>
</SplitLayoutContainer>

<details>
  <summary>Example response:</summary>
  
  ```json
  {
    "jsonrpc": "2.0",
    "result": "9yzcZFHqtKqTUPnz9dx2DfTjDnFemPEQjbgVqSBdnvKr",
    "id": "dontcare"
  }
  ```
</details>
<details>
<summary>Error handling:</summary>

When making RPC API requests, you may encounter various errors related to network configuration, rate limiting, or request formatting. For comprehensive information about error types, causes, and solutions, see the [RPC Errors](/api/rpc/errors) documentation.

</details>

Final transaction results can be queried using [Transaction Status](#transaction-status)
or [NearBlocks Explorer](https://testnet.nearblocks.io/) using the above
`result` hash returning a result similar to the example below.

![NEAR-Explorer-transactionHash](/assets/docs/api/NEAR-Explorer-transactionHash.png)

---

## [deprecated] Send transaction (await) {#send-transaction-await}

<SplitLayoutContainer>
  <SplitLayoutLeft title="Description">
    Consider using [`send_tx`](/api/rpc/transactions#send-tx) instead

    Sends a transaction and waits until transaction is fully complete. _(Has a 10 second timeout)_

    - **method**: `broadcast_tx_commit`
    - **params**: `[SignedTransaction encoded in base64]`
  </SplitLayoutLeft>
  <SplitLayoutRight title="Example">
    <Tabs groupId="code-tabs">
      <TabItem value="json" label="JSON" default>
        ```json
        {
          "jsonrpc": "2.0",
          "id": "dontcare",
          "method": "broadcast_tx_commit",
          "params": [
            "DgAAAHNlbmRlci50ZXN0bmV0AOrmAai64SZOv9e/naX4W15pJx0GAap35wTT1T/DwcbbDQAAAAAAAAAQAAAAcmVjZWl2ZXIudGVzdG5ldIODI4YfV/QS++blXpQYT+bOsRblTRW4f547y/LkvMQ9AQAAAAMAAACh7czOG8LTAAAAAAAAAAXcaTJzu9GviPT7AD4mNJGY79jxTrjFLoyPBiLGHgBi8JK1AnhK8QknJ1ourxlvOYJA2xEZE8UR24THmSJcLQw="
          ]
        }
        ```
      </TabItem>
      <TabItem value="http" label="HTTPie">
        ```bash
        http POST https://rpc.testnet.near.org \
          jsonrpc=2.0 \
          id=dontcare \
          method=broadcast_tx_commit \
          params:='[
            "DwAAAG5lYXJrYXQudGVzdG5ldABuTi5L1rwnlb35hc9tn5WELkxfiGfGh1Q5aeGNQDejo0QAAAAAAAAAEAAAAGpvc2hmb3JkLnRlc3RuZXSiWAc6W9KlqXS5fK+vjFRDV5pAxHRKU0srKX/cmdRTBgEAAAADAAAAoe3MzhvC0wAAAAAAAAB9rOE9zc5zQYLL1j6VTh3I4fQbERs6I07gJfrAC6jo8DB4HolR9Xps3v4qrZxkgZjwv6wB0QOROM4UEbeOaBoB"
          ]'
        ```
      </TabItem>
    </Tabs>
  </SplitLayoutRight>
</SplitLayoutContainer>

<details>
  <summary>Example response: </summary>
  
  ```json
  {
    "jsonrpc": "2.0",
    "result": {
      "final_execution_status": "FINAL",
      "status": {
        "SuccessValue": ""
      },
      "transaction": {
        "signer_id": "sender.testnet",
        "public_key": "ed25519:Gowpa4kXNyTMRKgt5W7147pmcc2PxiFic8UHW9rsNvJ6",
        "nonce": 13,
        "receiver_id": "receiver.testnet",
        "actions": [
          {
            "Transfer": {
              "deposit": "1000000000000000000000000"
            }
          }
        ],
        "signature": "ed25519:7oCBMfSHrZkT7tzPDBxxCd3tWFhTES38eks3MCZMpYPJRfPWKxJsvmwQiVBBxRLoxPTnXVaMU2jPV3MdFKZTobH",
        "hash": "ASS7oYwGiem9HaNwJe6vS2kznx2CxueKDvU9BAYJRjNR"
      },
      "transaction_outcome": {
        "proof": [],
        "block_hash": "9MzuZrRPW1BGpFnZJUJg6SzCrixPpJDfjsNeUobRXsLe",
        "id": "ASS7oYwGiem9HaNwJe6vS2kznx2CxueKDvU9BAYJRjNR",
        "outcome": {
          "logs": [],
          "receipt_ids": ["BLV2q6p8DX7pVgXRtGtBkyUNrnqkNyU7iSksXG7BjVZh"],
          "gas_burnt": 223182562500,
          "tokens_burnt": "22318256250000000000",
          "executor_id": "sender.testnet",
          "status": {
            "SuccessReceiptId": "BLV2q6p8DX7pVgXRtGtBkyUNrnqkNyU7iSksXG7BjVZh"
          }
        }
      },
      "receipts_outcome": [
        {
          "proof": [],
          "block_hash": "5Hpj1PeCi32ZkNXgiD1DrW4wvW4Xtic74DJKfyJ9XL3a",
          "id": "BLV2q6p8DX7pVgXRtGtBkyUNrnqkNyU7iSksXG7BjVZh",
          "outcome": {
            "logs": [],
            "receipt_ids": ["3sawynPNP8UkeCviGqJGwiwEacfPyxDKRxsEWPpaUqtR"],
            "gas_burnt": 223182562500,
            "tokens_burnt": "22318256250000000000",
            "executor_id": "receiver.testnet",
            "status": {
              "SuccessValue": ""
            }
          }
        }
      ]
    },
    "id": "dontcare"
  }
  ```
</details>
<details>
<summary>Error handling:</summary>

When making RPC API requests, you may encounter various errors related to network configuration, rate limiting, or request formatting. For comprehensive information about error types, causes, and solutions, see the [RPC Errors](/api/rpc/errors) documentation.

</details>

---

## Error Handling

### Common Error Types

| Error Code | Description | Solution |
|------------|-------------|----------|
| `UnknownTransaction` | Transaction not found | Verify transaction hash and sender account |
| `TimeoutError` | Transaction timeout | Use appropriate wait_until parameter or retry |
| `InvalidTransaction` | Invalid transaction format | Check transaction structure and signature |
| `InvalidAccount` | Invalid account format | Use valid account ID format (e.g., `account.near`) |
| `InsufficientStake` | Not enough stake for operation | Ensure account has sufficient NEAR tokens |
| `MethodNotFound` | Invalid method name | Check method spelling and API version |
| `ParseError` | JSON parsing error | Verify JSON format and structure |
| `ServerError` | Internal server error | Retry request or use different RPC endpoint |

---

## Best Practices

- **Use appropriate wait_until levels**: Choose the right execution level based on your requirements
  - `NONE`: For fire-and-forget scenarios
  - `INCLUDED`: When you need confirmation the transaction is in a block
  - `EXECUTED_OPTIMISTIC`: For most use cases (default)
  - `FINAL`: When you need absolute finality guarantees

- **Handle timeouts gracefully**: Implement proper timeout handling and retry logic
- **Monitor gas usage**: Track gas consumption to optimize transaction costs
- **Batch operations**: When possible, batch multiple actions in a single transaction
