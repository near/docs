---
id: upgrade-and-lock
title: Upgrading and Locking
---

NEAR allows to redeploy contracts into an account, thus updating its logic. At the same time, users can lock an account so nobody
(besides the contract itself) can upgrade the contract.

---

## Upgrading a Contract
NEAR accounts separate the contract's logic (code) from its state (storage), allowing the code/logic to change. 

When a contract is deployed on an account with an already deployed contract, **the state persists**, i.e. the states does not reset.

Since the state is persisted, adding/modifying methods that only **read** the storage will yield no problem. However, deploying a contract
that expects a different state will raise a `Cannot deserialize the contract state` error. In this case, you can either deploy in another
account, or [implement methods to migrate the contract's state](upgrade/production-basics.md).

---

## Locking a Contract
Removing all [full access keys](../4.tools/cli.md#near-delete-key-near-delete-key) from an account will effectively **lock it**. When the
account is locked nobody can perform a transaction in the contract account's name (e.g. update the code or transfer money).
This tends to bring more reassurance to the users, knowing that no external actor will be able to manipulate the contract's state or
balance.

:::tip Upgrading Locked Contracts
Please do note that, while no external actor can update the contract, the contract **can still upgrade itself**. For example, our reference
DAO implementation includes an [upgrading mechanism](https://github.com/near-daos/sputnik-dao-contract/blob/main/sputnikdao2/src/upgrade.rs)
governed by the community.
:::