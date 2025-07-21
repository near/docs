---
id: lock
title: Locking Accounts
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In NEAR, you can lock an account by removing all its [full access keys](/tools/near-cli#delete-key). This is useful to prevent any further transactions from being executed in the account's name, effectively locking it.

Removing all [full access keys](/tools/near-cli#delete-key) from an account will effectively **lock it**.

When an account is locked nobody can perform transactions in the account's name (e.g. update the code or transfer money).

#### How to Lock an Account
<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near keys <dev-account>
  # result: [access_key: {"nonce": ..., "public_key": '<key>'}]

  near delete-key <dev-account> '<key>'
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  near account list-keys <dev-account> network-config testnet now
  # result:

  +---+------------+-------+-------------+
  | # | Public Key | Nonce | Permissions |
  +---+------------+-------+-------------+
  ..    '<key>'      ...        ...
  +---+------------+-------+-------------+

  near account delete-key <dev-account> '<key>' network-config testnet sign-with-keychain send
  ```
  </TabItem>
</Tabs>

#### Why Locking an Account

Locking an account brings more reassurance to end-users, since they know no external actor will be able to manipulate the account's
contract or balance.

:::tip Upgrading Locked Contracts

Please do note that, while no external actor can update the contract, the contract **can still upgrade itself**. See [this article](upgrade.md#programmatic-update) for details.

:::
