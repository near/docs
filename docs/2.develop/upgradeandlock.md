---
id: upgrade-and-lock
title: Upgrading and Locking
---

NEAR allows to redeploy contracts into an account, thus updating its logic. At the same time, users can lock an account so nobody
(besides the contract itself) can upgrade the contract.

---

## Upgrading a Contract
NEAR accounts separate the contract's logic (code) from its state (storage), allowing the code to be changed. 

#### Persisting State
When deploying a contract into an account that already has one **the state persists**, i.e. the code changes, but the data stored remains the same.

#### Migrating State
Adding/modifying methods that only **read** the storage to a contract will yield no problems.

However, deploying a contract that expects a different state will raise an error (`Cannot deserialize the contract state`). To solve this you can either:
- Rollback to the previous contract
- [Add a method to migrate the contract's state](upgrade/production-basics.md).

---

## Locking a Contract
Removing all [full access keys](../4.tools/cli.md#near-delete-key-near-delete-key) from an account will effectively **lock it**.

When an account is locked nobody can perform transactions in the account's name (e.g. update the code or transfer money).

Locking an account brings more reassurance to the end-users, knowing that no external actor will be able to manipulate the contract's
logic or balance.

:::tip Upgrading Locked Contracts
Please do note that, while no external actor can update the contract, the contract **can still upgrade itself**. For example, our reference
DAO implementation includes an [upgrading mechanism](https://github.com/near-daos/sputnik-dao-contract/blob/main/sputnikdao2/src/upgrade.rs)
governed by the community.
:::
