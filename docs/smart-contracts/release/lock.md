---
id: lock
title: Locking Accounts
description: "Learn how to lock NEAR smart contracts to prevent unauthorized modifications and ensure contract immutability when needed."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In NEAR, you can lock an account by removing all its [full access keys](/tools/near-cli#delete-key). This is useful to prevent any further transactions from being executed in the account's name, effectively locking it.

Removing all [full access keys](/tools/near-cli#delete-key) from an account will effectively **lock it**.

When an account is locked nobody can perform transactions in the account's name (e.g. update the code or transfer money).

#### How to Lock an Account

```bash
near list-keys <dev-account>
# result: [access_key: {"nonce": ..., "public_key": '<key>'}]

near delete-key <dev-account> '<key>'
```

#### Why Locking an Account

Locking an account brings more reassurance to end-users, since they know no external actor will be able to manipulate the account's
contract or balance.

:::tip Upgrading Locked Contracts

While no external actor can update the contract, the contract **can still upgrade itself**, see [this article](upgrade.md#programmatic-update) for details

:::
