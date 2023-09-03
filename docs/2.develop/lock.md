---
id: lock
title: Locking Accounts
---

Removing all [full access keys](../4.tools/cli.md#near-delete-key-near-delete-key) from an account will effectively **lock it**.

When an account is locked nobody can perform transactions in the account's name (e.g. update the code or transfer money).

#### How to Lock an Account
<Tabs className="language-tabs" groupId="code-tabs">
<TabItem value="Near-CLI">

```bash
near keys <dev-account>
# result: [access_key: {"nonce": ..., "public_key": '<key>'}]

near delete-key <dev-account> '<key>'
```
</TabItem>
<TabItem value="Near-CLI-rs">

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
