---
id: request
title: "Abstract DAO: Requests"
description: "Learn how to create a signature request in Abstract DAO to execute actions on foreign EVM chains."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Abstract DAO contract works as an intermediary between decentralized organizations in NEAR and EVM networks. To better understand how it works it is better to start by using it by itself, without using a DAO yet.

Join us as we explore how to create a request in the Abstract DAO contract, that will be later used to derive signatures for foreign EVM chains. 

:::tip
We have deployed the Abstract DAO in two environments:

1. Testnet: `abstract-dao.testnet`
2. Dev (unstable): `dev.abstract-dao.testnet`
:::

---

## Ethereum Function Call

Imagine that our organization agreed on changing a value in a simple [counter we deployed on Sepolia Ethereum](https://sepolia.etherscan.io/address/0xe2a01146FFfC8432497ae49A7a6cBa5B9Abd71A3), and now want to leave this intent in the Abstract DAO.

For this, we will call the **`register_signature_request`** function on Abstract Dao saying: 

*We allow **executor.testnet** to request signatures for one of our Ethereum accounts, making it set a counter to `1000`*.

Here are the parameters, take a quick glance for now, since we will go over each one of them:

```js
{
  "request": {
    "derivation_seed_number": 0,
    "allowed_account_id": "executor.testnet",
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
    },
  }
}
```

There are 3 arguments in the call above: `derivation_seed_number`, `transaction_payload`, and `allowed_account_id` lets see them in depth.

<hr class="subsection" />

### Derivation Path

The parameter `derivation seed number` will be used to derive which external address we will be requesting signatures from, the address will be derived as:

`DAO Address` + `Derivation Path` + `Contract Address` = `EVM Address`

For example, if we register a request from the address `...` using the derivation path `0` we will obtain control the `0x...` account.

:::tip
Learn more about derivation paths [here](../../chain-abstraction/chain-signatures.md)
:::

<hr class="subsection" />

### Transaction Payload

The `transaction_payload` contains all the information on the transaction that we want to perform, particularly:

  - `to`: The recipient address of the transaction
  - `nonce`: The transaction nonce, used to ensure uniqueness
  - `function_data`: (optional) Defines the function that will be called on the recipient's contract, including:
    - `function_abi`: The ABI of the function being called
    - `arguments`: The input arguments for the function, all ABI encoded (e.g. integers are `base64`)

There are a couple important points to notice about this `transaction_payload`:

- **Readable Payload:** The parameters make it easy for anyone to quickly understand what transaction will be executed externally. The Abstract DAO is designed to be transparent and easy to audit, abstracting away the complexity of creating the transaction.

- **We Are Setting a Nonce:** By setting the nonce, we make sure that the transaction will only be valid once, as future transactions will need higher `nonces`

- **We Are Not Setting the GAS:** Gas prices are expected to vary wildly across EVMs, for which it makes no sense to setup a fixed gas amount and gas price for all the networks, for this is that we use the last parameter `allowed_account`

<hr class="subsection" />

### Allowed Account

In this case, the `allowed_account` will be the one in charge of generating the signatures. At the time of generating the signature, the account will also set the `gas_price` for the transaction on a per-chain basis.