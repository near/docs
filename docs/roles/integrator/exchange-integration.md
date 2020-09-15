---
id: exchange-integration
title: Exchange Integration
sidebar_label: Exchange Integration
---

## Transactions

  ### [Basics](https://docs.near.org/docs/concepts/transaction)

  ### [Specifications](https://nomicon.io/RuntimeSpec/Transactions.html)

  ### Constructing Transactions
  - To construct & process transactions in JavaScript you will use [`near-api-js`](https://docs.near.org/docs/roles/developer/examples/near-api-js/introduction).
  - First, begin by importing `near-api-js` (assuming you have it already [installed](https://docs.near.org/docs/roles/developer/examples/near-api-js/introduction#setup-1))
  - Then, using the [Transaction Class](https://near.github.io/near-api-js/classes/_transaction_.transaction.html), construct a transaction by passing the following arguments to `createTransaction`:
      - signerId (accountID of the transaction originator)
      - signerPublicKey
      - receiverId (accountID of the transaction recipient)
      - nonceForPublicKey
      - [actions](/docs/concepts/transaction#action)
      - blockHash

  ```js
  const nearAPI = require("near-api-js");
  
  const transaction = nearAPI.transactions.createTransaction(signerId, signerPublicKey, receiverId, nonceForPublicKey, actions, blockHash);
  ```
  - Once your transaction is constructed, you will then need to sign it by calling the `signTransactionObject` method and pass `transaction`, `signerId`, and a `networkId` (i.e. `testnet`, `betanet`, or `mainnet`)

  **Note** The networkId is used only in `near-api-js` and is not included in the final on-chain transaction.

  ```js
  const signedTx = nearAPI.transactions.signTransactionObject(transaction, signerId, networkId)
  ```

  For a deeper look into the functionality, explore the [`transaction.ts` source code](https://github.com/near/near-api-js/blob/master/src/transaction.ts) in [`near-api-js`](https://github.com/near/near-api-js).

**Note:** NEAR requires transactions to be serialized in [Borsh](https://borsh.io/) which currently supports Rust, Javascript, & TypeScript.

## Balance Changes
Balance changes on accounts can be tracked by using our [changes endpoint](https://docs.near.org/docs/api/rpc-experimental#changes). You can test this out by sending tokens to an account using [`near-cli](/docs/development/near-cli).
  
  - First, make sure you have keys to your account locally.
  - Then send tokens using the following format. (The number at the end represents the amount you are sending)
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


## Account Creation
  - We support implicit account creation which allows exchanges to create accounts without paying for transactions. 
  - You can create an implicit account by following the steps in [this guide](/docs/roles/integrator/implicit-accounts).
  
## Transfer from Function Call
NEAR allows transfer to happen within a function call. More importantly, when an account is deployed with some contract,
it is possible that the only way to transfer tokens from that account is through a function call. Therefore, exchanges
need to support transfer through function calls as well. We recommend the following approaches:
* It is better if any transfer through function call is supported from the beginning. To do so, one needs to index all
receipt data on chain to filter out the ones that contain transfer actions to some specific addresses (addresses of the exchange).
We provide [an indexer framework](https://github.com/nearprotocol/nearcore/tree/master/chain/indexer) to help index on-chain
data which include receipts. An example usage of the indexer can be found [here](https://github.com/nearprotocol/nearcore/tree/master/tools/indexer/example).
* If the first approach is for some reason not feasible, there is a quicker but more hacky solution. At this stage, there
are two contracts that may have nontrivial amount of usage on mainnet, the [lockup contract](https://github.com/near/core-contracts/tree/master/lockup) and the [multisig contract](https://github.com/near/core-contracts/tree/master/multisig)
Exchanges can check specifically whether an account has either of the contract deployed and special case transactions
from such accounts. The check can be done through checking the code hash of the account and see if it matches the sha256
result of the ones we provided. We expect that, at this stage, most of the contracts deployed will use the wasm binary
we provide and therefore the potential nondeterminism in contract compilation should not be a concern. Still, we recommend
taking the first approach whenever possible to support all transfers at once.

**Example of transfer from a lockup contract**

A contract `evgeny.lockup.near` is deployed and we can check its owner by
```bash
> near view evgeny.lockup.near get_owner_account_id
View call: evgeny.lockup.near.get_owner_account_id()
'evgeny.near'
```
Now we want to transfer some unlocked tokens with the following call
```bash
near call evgeny.lockup.near transfer '{"amount":"100", "receiver_id": "evgeny.near"}' --accountId=evgeny.near
```

The result can be seen through tx status query:
```javascript
{
  status: { SuccessValue: '' },
  transaction: {
    signer_id: 'evgeny.near',
    public_key: 'ed25519:BVRTxEEMx3gFceSgJtnvPFbSnPDwwUzHe6KGduRh5Byq',
    nonce: 1,
    receiver_id: 'evgeny.lockup.near',
    actions: [
      {
        FunctionCall: {
          method_name: 'transfer',
          args: 'eyJhbW91bnQiOiIxMDAiLCJyZWNlaXZlcl9pZCI6ImV2Z2VueS5uZWFyIn0=',
          gas: 100000000000000,
          deposit: '0'
        }
      },
      [length]: 1
    ],
    signature: 'ed25519:3f72ZvUk5ndCpZLQJxQL2GiqTYEMPZVswvS6vZ1bCWYtyMB79Z1dfk3UXVZKPueXzobQt2QDjkKNNgYrDFa1rU32',
    hash: 'F3znNh6eW3PhzRbdwHkf8s6N8dteSbCuTW2SE5nw3xCM'
  },
  transaction_outcome: {
    proof: [
      {
        hash: '7nWrcYnsrv7JSkQ94KRJ7wNXBLf3c52eu75NKdcoAhQW',
        direction: 'Left'
      },
      [length]: 1
    ],
    block_hash: '4xt5bCDDUYmRZLPFsxxUgazNUfxLJEAms51hLm1Dgd5h',
    id: 'F3znNh6eW3PhzRbdwHkf8s6N8dteSbCuTW2SE5nw3xCM',
    outcome: {
      logs: [ [length]: 0 ],
      receipt_ids: [ 'C1WJeaJsA6sLs5fEMN64eEcCNzGRXbcEDjbTQnHoSEeu', [length]: 1 ],
      gas_burnt: 2428037268568,
      tokens_burnt: '242803726856800000000',
      executor_id: 'evgeny.near',
      status: {
        SuccessReceiptId: 'C1WJeaJsA6sLs5fEMN64eEcCNzGRXbcEDjbTQnHoSEeu'
      }
    }
  },
  receipts_outcome: [
    {
      proof: [
        {
          hash: '5cR8qNNJTBFZGpGLM31qAH2YMZks4aykTD17Mu3uuaeo',
          direction: 'Left'
        },
        [length]: 1
      ],
      block_hash: 'EDnREfYTF5RnhGiMZQEmzeMgNcYGiEnZV6xWkHFjc2rX',
      id: 'C1WJeaJsA6sLs5fEMN64eEcCNzGRXbcEDjbTQnHoSEeu',
      outcome: {
        logs: [ 'Transferring 100 to account @evgeny.near', [length]: 1 ],
        receipt_ids: [
          'EypQWKmzMuLPicKG4BCjBu2VvryLwDg9sfGvihLaXHym',
          'r2v52GRCTKGumzVEmbgUtiNYHBXbfZAPadKGMrk8xPZ',
          [length]: 2
        ],
        gas_burnt: 3434377868518,
        tokens_burnt: '343437786851800000000',
        executor_id: 'evgeny.lockup.near',
        status: {
          SuccessReceiptId: 'EypQWKmzMuLPicKG4BCjBu2VvryLwDg9sfGvihLaXHym'
        }
      }
    },
    {
      proof: [
        {
          hash: '7TQ8w8QUbHGVVZvTGgJPWaYswNhqHPXngKaKaSbC7Uax',
          direction: 'Left'
        },
        {
          hash: 'JDP2cCRGJgi8V4F97TzMquaZN7oPDFJT5n6pVjp7hjy9',
          direction: 'Right'
        },
        [length]: 2
      ],
      block_hash: 'Fx76dHZKmE73L2P9mDwKgcKbcvpT63B1Bi37FbhBLHC3',
      id: 'EypQWKmzMuLPicKG4BCjBu2VvryLwDg9sfGvihLaXHym',
      outcome: {
        logs: [ [length]: 0 ],
        receipt_ids: [ '4DfDVbE32QZrY7b1LfDipxrG7WUP8Jxhwiwnv44S3KfP', [length]: 1 ],
        gas_burnt: 223182562500,
        tokens_burnt: '22318256250000000000',
        executor_id: 'evgeny.near',
        status: { SuccessValue: '' }
      }
    },
    {
      proof: [ [length]: 0 ],
      block_hash: 'Aq4bxAW4haWViJA4KW2J2Lucmf8LkNusEKieHKQMbRpc',
      id: '4DfDVbE32QZrY7b1LfDipxrG7WUP8Jxhwiwnv44S3KfP',
      outcome: {
        logs: [ [length]: 0 ],
        receipt_ids: [ [length]: 0 ],
        gas_burnt: 0,
        tokens_burnt: '0',
        executor_id: 'evgeny.near',
        status: { SuccessValue: '' }
      }
    },
    {
      proof: [
        {
          hash: '5aVjvrdhrQuhMwqdFruQZS3qVqHGNYMp4BK4MvUTvKPn',
          direction: 'Left'
        },
        [length]: 1
      ],
      block_hash: 'Fx76dHZKmE73L2P9mDwKgcKbcvpT63B1Bi37FbhBLHC3',
      id: 'r2v52GRCTKGumzVEmbgUtiNYHBXbfZAPadKGMrk8xPZ',
      outcome: {
        logs: [ [length]: 0 ],
        receipt_ids: [ [length]: 0 ],
        gas_burnt: 0,
        tokens_burnt: '0',
        executor_id: 'evgeny.near',
        status: { SuccessValue: '' }
      }
    },
    [length]: 4
  ]
}
```
As we can see, there are four receipts generated in this function call.
One receipt `C1WJeaJsA6sLs5fEMN64eEcCNzGRXbcEDjbTQnHoSEeu` is the function call receipt converted from the transaction.
Another receipt `EypQWKmzMuLPicKG4BCjBu2VvryLwDg9sfGvihLaXHym` is the receipt that contains the transfer action generated by [the promise created in the function call](Another receipt is the receipt that contains the transfer action generated by the transfer call `https://github.com/near/core-contracts/blob/master/lockup/src/owner.rs#L484`).
The rest two are [refunds](https://nomicon.io/RuntimeSpec/Refunds.html).

**Example of transfer from a multisig contract**

Mutisig contract, as the name suggests, uses multiple signatures to confirm a transaction and therefore, actions performed
by the multisig contract involves multiple transactions. In the following example, we will show a how a transfer is done from
 a mutlisig contract that requires two confirmations.

- First step: `add_request_and_confirm`. This initiates the action that the multisig contract wants to perform with one
confirmation. The multisig contract `multsigtest.testnet` wants to transfer 1 NEAR to `mikepurvis.testnet` and it first
sends a transaction that calls `add_request_and_confirm` with a request
```json
{
  "request": {
    "receiver_id": "mikepurvis.testnet",
    "actions": [
      {
        "type": "Transfer",
        "amount": "1000000000000000000000000"
      }
    ]
  }
}
```
that indicates it wants to transfer 1 NEAR to `mikepurvis.testnet`. Notice that this transaction only records the action
but does not perform the actual transfer. The transaction result is as follows:
```javascript
{
  status: { SuccessValue: 'NA==' },
  transaction: {
    signer_id: 'multisigtest.testnet',
    public_key: 'ed25519:JDewsbE7nz6orFD4zJ3mVzqhfcaoSD6Hmi5as3AHHiTt',
    nonce: 6,
    receiver_id: 'multisigtest.testnet',
    actions: [
      {
        FunctionCall: {
          method_name: 'add_request_and_confirm',
          args: 'eyJyZXF1ZXN0Ijp7InJlY2VpdmVyX2lkIjoibWlrZXB1cnZpcy50ZXN0bmV0IiwiYWN0aW9ucyI6W3sidHlwZSI6IlRyYW5zZmVyIiwiYW1vdW50IjoiMTAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCJ9XX19',
          gas: 30000000000000,
          deposit: '0'
        }
      },
      [length]: 1
    ],
    signature: 'ed25519:27bGcHP4m9SGdXwnzLtvpiFC4iXorNCS77wRcHZnnns5CDxkyfdgCs9KzvEnbSRiR1LQ2T5jNUpeC6SWBCctCyxc',
    hash: 'Fdb4vJf6mfnaCsor6VJ63cyT415wwMKUMcQ7dE6NC21V'
  },
  transaction_outcome: {
    proof: [
      {
        hash: '2RnN1do55cCCBWP96sKe2Wx5AEJ39C3qo1pupeuozLYu',
        direction: 'Right'
      },
      [length]: 1
    ],
    block_hash: 'GgmsAbDsSjNK25xiV4hnMbLhWtSMzQ36GhnS7C7arN4u',
    id: 'Fdb4vJf6mfnaCsor6VJ63cyT415wwMKUMcQ7dE6NC21V',
    outcome: {
      logs: [ [length]: 0 ],
      receipt_ids: [ 'WKxEdpNqxuSLH5Q9Eu1x99j5KGPqHkPDFwv9s86dgiv', [length]: 1 ],
      gas_burnt: 2428234030760,
      tokens_burnt: '242823403076000000000',
      executor_id: 'multisigtest.testnet',
      status: {
        SuccessReceiptId: 'WKxEdpNqxuSLH5Q9Eu1x99j5KGPqHkPDFwv9s86dgiv'
      }
    }
  },
  receipts_outcome: [
    {
      proof: [
        {
          hash: '5Dx8KhQ4dMXkBCnWmMuoqxrBZ513JVGJ8pt9UVsrRQTz',
          direction: 'Left'
        },
        [length]: 1
      ],
      block_hash: 'GgmsAbDsSjNK25xiV4hnMbLhWtSMzQ36GhnS7C7arN4u',
      id: 'WKxEdpNqxuSLH5Q9Eu1x99j5KGPqHkPDFwv9s86dgiv',
      outcome: {
        logs: [ [length]: 0 ],
        receipt_ids: [ '83jbmEv7Sref4PXXtwDD7fphDNMxoUE6odQMYWVioene', [length]: 1 ],
        gas_burnt: 8026429916861,
        tokens_burnt: '802642991686100000000',
        executor_id: 'multisigtest.testnet',
        status: { SuccessValue: 'NA==' }
      }
    },
    {
      proof: [ [length]: 0 ],
      block_hash: '51cTk9UUZsXs4NgCACLnSi2jmEWTmyroRmwNTPJWYYf9',
      id: '83jbmEv7Sref4PXXtwDD7fphDNMxoUE6odQMYWVioene',
      outcome: {
        logs: [ [length]: 0 ],
        receipt_ids: [ [length]: 0 ],
        gas_burnt: 0,
        tokens_burnt: '0',
        executor_id: 'multisigtest.testnet',
        status: { SuccessValue: '' }
      }
    },
    [length]: 2
  ]
}
```
There are two receipts generated. `WKxEdpNqxuSLH5Q9Eu1x99j5KGPqHkPDFwv9s86dgiv` is the receipt converted from the transaction
while the other one is a refund.

- Second step: `confirm`. A second transaction is sent to confirm the transfer. This transaction takes the request id
returned by the first transaction and does the actual transfer. The transaction result is as follows
```javascript
{
  status: { SuccessValue: '' },
  transaction: {
    signer_id: 'multisigtest.testnet',
    public_key: 'ed25519:BmVX32jhvEd8d8outiQdjf66GGYV3pb7kaxrKTdNisCz',
    nonce: 5,
    receiver_id: 'multisigtest.testnet',
    actions: [
      {
        FunctionCall: {
          method_name: 'confirm',
          args: 'eyJyZXF1ZXN0X2lkIjo0fQ==',
          gas: 30000000000000,
          deposit: '0'
        }
      },
      [length]: 1
    ],
    signature: 'ed25519:LgstUHaaJwk8XRw4ZXCAZVvjjxo3LMiusHEuKLjanUps5yASoK4um9jxSMtLKKFbwaSHWV8u7cDvA38XEGKPcz4',
    hash: 'G6Bssn17ENzSaj82UM8BHrNunmRpKz8zPHboaWpydR56'
  },
  transaction_outcome: {
    proof: [
      {
        hash: '81WLZNhx345v7Lz3wkpjThEsCXn3ubEU3WaozgjAAHGF',
        direction: 'Right'
      },
      [length]: 1
    ],
    block_hash: 'FkqEi8RguPefoCn32bTHgJLcFBkxAiZjLnbbPwiRfGHA',
    id: 'G6Bssn17ENzSaj82UM8BHrNunmRpKz8zPHboaWpydR56',
    outcome: {
      logs: [ [length]: 0 ],
      receipt_ids: [ 'QFUa9onQazM5eWVNaE3GvUKFNmsLZctjMFKpnT78jZm', [length]: 1 ],
      gas_burnt: 2427972426482,
      tokens_burnt: '242797242648200000000',
      executor_id: 'multisigtest.testnet',
      status: {
        SuccessReceiptId: 'QFUa9onQazM5eWVNaE3GvUKFNmsLZctjMFKpnT78jZm'
      }
    }
  },
  receipts_outcome: [
    {
      proof: [
        {
          hash: '53di5JP1ozf1CywCGi17tM4QJznm1x1SvUoKqmXdcrXV',
          direction: 'Left'
        },
        [length]: 1
      ],
      block_hash: 'FkqEi8RguPefoCn32bTHgJLcFBkxAiZjLnbbPwiRfGHA',
      id: 'QFUa9onQazM5eWVNaE3GvUKFNmsLZctjMFKpnT78jZm',
      outcome: {
        logs: [ [length]: 0 ],
        receipt_ids: [
          '461KgLaEaY5mWW7uZEvtvAQLsQr9uS7JdCjx9rx6TG8u',
          '67ATZcaEtbxGU67Q3ThG3V2yH9QyGNufPBokTc6y4ZSk',
          [length]: 2
        ],
        gas_burnt: 10118497269629,
        tokens_burnt: '1011849726962900000000',
        executor_id: 'multisigtest.testnet',
        status: {
          SuccessReceiptId: '461KgLaEaY5mWW7uZEvtvAQLsQr9uS7JdCjx9rx6TG8u'
        }
      }
    },
    {
      proof: [
        {
          hash: '5Vkk9b1zk4PzoaUPKYtCX6R46rachhoEpzEg2WPTZKaU',
          direction: 'Right'
        },
        [length]: 1
      ],
      block_hash: 'EwjRUTSqDrN1XDi1pYkXywXV9hKBaJNNMGWDrqoASLSH',
      id: '461KgLaEaY5mWW7uZEvtvAQLsQr9uS7JdCjx9rx6TG8u',
      outcome: {
        logs: [ [length]: 0 ],
        receipt_ids: [ 'FtB1agXwqhBwNE6AM4po5yEZ7HXc1tzqPreLFnNungbA', [length]: 1 ],
        gas_burnt: 223182562500,
        tokens_burnt: '22318256250000000000',
        executor_id: 'mikepurvis.testnet',
        status: { SuccessValue: '' }
      }
    },
    {
      proof: [ [length]: 0 ],
      block_hash: 'G3Djt2LpVMuteYr9TSvTSL2ftMevoEkFuJimtTAmrE6Y',
      id: 'FtB1agXwqhBwNE6AM4po5yEZ7HXc1tzqPreLFnNungbA',
      outcome: {
        logs: [ [length]: 0 ],
        receipt_ids: [ [length]: 0 ],
        gas_burnt: 0,
        tokens_burnt: '0',
        executor_id: 'multisigtest.testnet',
        status: { SuccessValue: '' }
      }
    },
    {
      proof: [
        {
          hash: 'AUHT2dWiA8r7szSD83BVQc3DJrzb5aQR3NRapriXNAvZ',
          direction: 'Left'
        },
        [length]: 1
      ],
      block_hash: 'EwjRUTSqDrN1XDi1pYkXywXV9hKBaJNNMGWDrqoASLSH',
      id: '67ATZcaEtbxGU67Q3ThG3V2yH9QyGNufPBokTc6y4ZSk',
      outcome: {
        logs: [ [length]: 0 ],
        receipt_ids: [ [length]: 0 ],
        gas_burnt: 0,
        tokens_burnt: '0',
        executor_id: 'multisigtest.testnet',
        status: { SuccessValue: '' }
      }
    },
    [length]: 4
  ]
}
```
Notice that similar to the transfer from lockup contract, this transfer also generates four receipt:
`QFUa9onQazM5eWVNaE3GvUKFNmsLZctjMFKpnT78jZm` is the receipt converted from the function call transaction.
`461KgLaEaY5mWW7uZEvtvAQLsQr9uS7JdCjx9rx6TG8u` is the receipt generated by [the transfer promise](https://github.com/near/core-contracts/blob/c7b495a582e274ad0efeb20578cc940a0583afd1/multisig/src/lib.rs#L173).
The rest two are refunds.

## Finality
 - RPC queries allow you to specify three types of desired finality; `optimistic`, `near-final`, and `final`.
 - Exchanges should only use [`final` finality](/docs/api/rpc-params#using-final-finality).
 - See [Blockchain Finality](/docs/roles/integrator/integrating#finality) for more information.

## Running an Archival Node
- Setting up an archival node is the same as a [regular node](https://docs.near.org/docs/local-setup/running-testnet), but modifying your `config.json` by changing `archive` to `true`.

## Staking and Delegation
- [https://github.com/nearprotocol/stakewars](https://github.com/nearprotocol/stakewars)  
- [https://github.com/near/core-contracts](https://github.com/near/core-contracts)
