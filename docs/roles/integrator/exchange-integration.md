---
id: exchange-integration
title: Exchange Integration
sidebar_label: Exchange Integration
---

## Transactions

  ### [Basics](https://docs.near.org/docs/concepts/transaction)

  ### [Specifications](https://nomicon.io/RuntimeSpec/Transactions.html)

  ### Constructing Transactions
  - To construct & process transactions in javascript you will need to use [`near-api-js`](https://docs.near.org/docs/roles/developer/examples/near-api-js/introduction).
  - First, begin by importing `near-api-js`
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

**Note:** NEAR requires transactions to be serialized in [Borsh](https://borsh.io/) which currently supports Rust, Javascript, & TypeScript.

## Balance Changes
Balance changes on accounts can be tracked by using our [changes endpoint](https://docs.near.org/docs/api/rpc-experimental#changes). You can test this out by sending tokens to an account using [`near-cli](/docs/development/near-cli).
  
  - First, make sure you are logged in.
    ```bash
    near login
    ```

  - Then send tokens using the following format. (The number at the end represents the amount you are sending)
    ```bash
    near send sender.testnet receiver.testnet 1 
    ```
    
  - You should see a result in your terminal that looks something like this:

    ![token transfer result](/docs/assets/token_transfer_result.png)

  - Go to the provided URL to view your transaction in [NEAR Explorer](https://explorer.testnet.near.org/).
  - On this page in NEAR Explorer, note and copy the `BLOCK HASH` for this transaction.
  - Now, go back to your terminal and run the following command using [HTTPie](https://httpie.org/docs#installation). 
  
  **Note** Make sure you replace the `block_id` with the `BLOCK HASH` you copied from explorer, as well as replacing the `account_ids` with the one you just sent tokens from.

  ```bash
  http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare \
      method=EXPERIMENTAL_changes \
      'params:={
          "block_id": "CJ24svU3C9FaULVjcNVnWuVZjK6mNaQ8p6AMyUDMqB37",
          "changes_type": "account_changes",
          "account_ids": ["sender.testnet"]
      }'
  ```
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

  You should see a result that looks like this:

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


## Finality
 - RPC queries allow you to specify three types of desired finality; `optimistic`, `near-final`, and `final`.
 - Exchanges should only use [`final` finality](https://docs.near.org/docs/api/rpc-params#using-final-finality).
 - See [Blockchain Finality](https://docs.near.org/docs/roles/integrator/integrating#finality) for more information.

## Running an Archival Node
- Setting up an archival node is the same as a [regular node](https://docs.near.org/docs/local-setup/running-testnet), but modifying your `config.json` by changing `archive` to `true`.

## Staking and Delegation
- [https://github.com/nearprotocol/stakewars](https://github.com/nearprotocol/stakewars)  
- [https://github.com/near/core-contracts](https://github.com/near/core-contracts)
