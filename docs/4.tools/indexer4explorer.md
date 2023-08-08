---
id: indexer-for-explorer
title: NEAR Indexer for Explorer
sidebar_label: Query the Blockchain History
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

While developing a decentralized app you might want to query usage information for a contract such as:

1. Which users have called a specific method in my contract?
2. How much money and gas did they deposit?
3. Which transactions failed?

In order to simplify asking these questions is that we developed the [NEAR Indexer for Explorer](https://github.com/near/near-indexer-for-explorer).
The NEAR Indexer for Explorer is a **public-access** **read-only** PostgreSQL database where **all** blockchain actions are stored.

Both `testnet` and `mainnet` networks have active instances that fill the database with all the data from the network starting from the genesis as [Explorer](https://explorer.near.org/) requires.

:::info GitHub repo

NEAR Indexer for Explorer is an indexer built on top of [NEAR Indexer microframework](https://near-indexers.io/docs/projects/near-indexer-framework). It watches the network and stores all the data from the blockchain in the PostgreSQL database.
You can find the source code on [this GitHub repository](https://github.com/near/near-indexer-for-explorer).

:::


:::warning
The database could go down or take time to reflect the most current blockchain info. Do not use it in production.
For a reliable source of real-time and past information, please run your own [indexer](https://near-indexers.io/).
:::

---

## Connecting to the Database

You can use any database manager compatible with PostgreSQL. If you don't know any, we can recommend you to try [DBeaver Community](https://dbeaver.io/).

| Network | Host                                 | Port | Database         | Username        | Password     |
| ------- | ------------------------------------ | ---- | ---------------- | --------------- | ------------ |
| mainnet | mainnet.db.explorer.indexer.near.dev | 5432 | mainnet_explorer | public_readonly | nearprotocol |
| testnet | testnet.db.explorer.indexer.near.dev | 5432 | testnet_explorer | public_readonly | nearprotocol |


<Tabs>
  <TabItem value="testnet" label="testnet" default>

    postgres://public_readonly:nearprotocol@testnet.db.explorer.indexer.near.dev/testnet_explorer


  </TabItem>
  <TabItem value="mainnet" label="mainnet">

    postgres://public_readonly:nearprotocol@mainnet.db.explorer.indexer.near.dev/mainnet_explorer

  </TabItem>
</Tabs>

---

## Example Queries
### Transactions Calling a Method
Query for all transactions that called `contribute` in the `v1.faucet.nonofficial.testnet` testnet account.

```sql
select r.predecessor_account_id, t.transaction_hash 
from receipts r, action_receipt_actions ara, transactions t
where r.receiver_account_id ='v1.faucet.nonofficial.testnet'
  and ara.receipt_id = r.receipt_id
  and ara.action_kind = 'FUNCTION_CALL'
  and ara.args @> '{"method_name": "contribute"}'
  and t.transaction_hash = r.originated_from_transaction_hash
```

<hr class="subsection" />

### Users, Status, and Attached Money
Query for all users that called `contribute` in `v1.faucet.nonofficial.testnet`, how much they attached to the call, and the transaction status.

```sql
select t.transaction_hash, eo.status, r.predecessor_account_id , ara.args -> 'deposit' as deposit
from receipts r, action_receipt_actions ara, transactions t, execution_outcomes eo
where r.receiver_account_id ='v1.faucet.nonofficial.testnet'
  and ara.receipt_id = r.receipt_id and ara.action_kind = 'FUNCTION_CALL'
  and ara.args @> '{"method_name": "contribute"}'
  and t.transaction_hash = r.originated_from_transaction_hash
  and r.receipt_id = eo.receipt_id
```

<hr class="subsection" />

### Sent Money
Query for all the transfers going out from `v1.faucet.nonofficial.testnet`.

```sql
select r.receiver_account_id, ara.args -> 'deposit' as deposit	
from receipts r, action_receipt_actions ara
where r.predecessor_account_id  ='v1.faucet.nonofficial.testnet'
  and ara.receipt_id = r.receipt_id and ara.action_kind = 'TRANSFER'
```
