---
id: signing
title: Signing EIP-1559 Transaction
sidebar_label: Signing EIP-1559 Transaction
---

In the previous section, we explored the principles and concepts behind the Near Multi-Chain DAO Governance Contract. Now, it's time to put that knowledge into action by actually generating a signature.

## Step 1: Crafting the EIP-1559 Transaction Payload

The `register_signature_request` function on the Multi-Chain DAO Governance Contract is used to record the intent to generate a signature for a specific transaction payload. This function allows you to define who can sign the transaction and what the transaction contains.

Here’s the sample payload you will submit to the contract:

```json
{
  "request": {
    "allowed_account_id": "executor.testnet",
    "derivation_seed_number": 0,
    "transaction_payload": {
      "to": "0xe2a01146FFfC8432497ae49A7a6cBa5B9Abd71A3",
      "nonce": "0",
      "function_data": {
        "function_abi": {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_num",
              "type": "uint256"
            }
          ],
          "name": "set",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        "arguments": [
          {
            "Uint": "A97"
          }
        ]
      }
    }
  }
}
```

#### Arguments

- `allowed_account_id`: This is the account allowed to sign the transaction later. It grants permission to this account to generate the required signatures for the transaction.

- `derivation_seed_number`: This number is used to craft the derivation path along with predecessor account id. Learn more about derivation paths [here](/concepts/abstraction/chain-signatures#derivation-paths-one-account-multiple-chains).

- `transaction_payload`: This is the actual payload of the transaction that will become EIP-1559 compatible later. In this case, it contains the following:

  - `to`: The recipient address of the transaction.
  - `nonce`: The transaction nonce, used to ensure uniqueness.
  - `function_data`: (optional) Defines the function that will be called on the recipient's contract. It includes:
    - `function_abi`: The ABI of the function being called.
    - `arguments`: The input arguments for the function, encoded appropriately.

:::note
Integer arguments must be base64 encoded
:::

## Step 2: Creating a Request on the Multisig Contract

To call `register_signature_request` on the Multi-Chain DAO Governance Contract, you need to submit a request through your Multisig contract. This ensures that the decision to generate a signature is confirmed by the necessary members.

```bash
near contract call-function as-transaction multisignature.testnet add_request json-args '{
    "request": {
        "receiver_id": "abstract-dao.testnet",
        "actions": [
            {
                "type": "FunctionCall",
                "method_name": "register_signature_request",
                "args": {
                    "request": {
                        "allowed_account_id": "executor.testnet",
                        "derivation_seed_number": 0,
                        "transaction_payload": {
                            "to": "0xe2a01146FFfC8432497ae49A7a6cBa5B9Abd71A3",
                            "nonce": "0",
                            "function_data": {
                                "function_abi": {
                                    "inputs": [
                                        {
                                            "internalType": "uint256",
                                            "name": "_num",
                                            "type": "uint256"
                                        }
                                    ],
                                    "name": "set",
                                    "outputs": [],
                                    "stateMutability": "nonpayable",
                                    "type": "function"
                                },
                                "arguments": [
                                    {
                                        "Uint": "A97"
                                    }
                                ]
                            }
                        }
                    }
                },
                "gas": "100000000000000",
                "deposit": "0.1"
            }
        ]
    }
}' prepaid-gas '100.0 Tgas' attached-deposit '1 yoctoNEAR' sign-as executor.testnet network-config testnet
```

## Step 3: Voting on the Request

Once the request is submitted, members of the multisig contract have a set amount of time to vote to either Confirm or Reject the request. Each member needs to cast their vote using the following command:

```bash
near contract call-function as-transaction multisignature.testnet confirm json-args '{"request_id": 1}' prepaid-gas '100.0 Tgas' attached-deposit '1 yoctoNEAR' sign-as account.testnet network-config testnet
```

:::note
Replace provided `request_id` with value retrieved from the response when creating the request
:::

Once the request has received enough confirmations, it will be automatically executed. At this point, the signature request is successfully registered on the Multi-Chain DAO Governance Contract.

:::info

Response example returned by Multi-chain DAO Contract

```json
{
  "allowed_account_id": "denbite.testnet",
  "deadline": 1728986555728267025,
  "derivation_path": "denbite.testnet-0",
  "mpc_account_id": "v1.signer-prod.testnet",
  "request_id": 1
}
```

Please pay attention to `deadline` field, which represents the Unix timestamp in the future until which the `get_signature` function is allowed to be executed. Usually, the window is 24 hours after the signature request is registered.

:::

Now, the allowed account (specified in the request) can generate signatures for the transaction.

## Step 4: Signing the Transaction For Different Chain IDs

To sign a transaction for a specific chain, the following command can be used

```bash
near contract call-function as-transaction abstract-dao.testnet get_signature json-args '{
    "request_id": 1,
    "other_payload": {
        "chain_id": 11155111,
        "max_fee_per_gas": "1000000000",
        "max_priority_fee_per_gas": "100000000"
    }
}' prepaid-gas '300.0 Tgas' attached-deposit '0.05 NEAR' sign-as executor.testnet network-config testnet
```

:::note

- Replace provided `request_id` with value returned from `register_signature_request` function (see the response example above).
- Replace provided `chain_id` with destination chain that best fits your case (in this example 11155111 stands for Sepolia Testnet)

:::

:::info

Signature response is going to look similar to the following

```json
{
  "signature": {
    "big_r": {
      "affine_point": "02D532992B0ECBF67800DB14E04530D9BA55609AD31213CC7ABDB554E8FDA986D3"
    },
    "recovery_id": 1,
    "s": {
      "scalar": "40E81711B8174712B9F34B2540EE0F642802387D15543CBFC84211BB04B83AC3"
    }
  },
  "tx": "0x02f85083aa36a702850485034c878517a4eb0789829dd094e2a01146fffc8432497ae49a7a6cba5b9abd71a380a460fe47b1000000000000000000000000000000000000000000000000000000000000a84bc0"
}
```
