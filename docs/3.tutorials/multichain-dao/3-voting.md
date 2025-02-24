---
id: voting
title: MultiSig Voting
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Now that we understand how the Abstract DAO works, it is time to use it in within an organization. Lets see how to deploy a MultiSig contract, where users will vote on a multi-chain proposal.

---

## Creating a MultiSig Contract

As a first step we need to create an account and deploy a MultiSig contract on it, so users can start creating proposals and voting on them.

:::info Deploy Multisig
You can download the [compiled multisig](https://github.com/near/core-contracts/raw/refs/heads/master/multisig2/res/multisig2.wasm) from the near repository
:::


```bash
near create-account <accountId> --useFaucet

near deploy <accountId> multisig2.wasm
```

---

## Creating a Request on the Multisig Contract

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

---

## Voting on the Request

Once the request is submitted, members of the multisig contract have a set amount of time to vote to either Confirm or Reject the request. Each member needs to cast their vote using the following command:

```bash
near contract call-function as-transaction multisignature.testnet confirm json-args '{"request_id": 1}' prepaid-gas '100.0 Tgas' attached-deposit '1 yoctoNEAR' sign-as account.testnet network-config testnet
```

:::note
Replace provided `request_id` with value retrieved from the response when creating the request
:::

Once the request has received enough confirmations, it will be automatically executed. At this point, the signature request is successfully registered on the Multi-Chain DAO Governance Contract.

Now, the allowed account (specified in the request) can generate signatures for the transaction just as we saw in the [previous section](./2-signing.md.
