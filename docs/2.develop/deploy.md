---
id: deploy
title: Deploy & Maintain
---

After your contract is ready you can deploy it in the NEAR network for everyone to use it. Briefly
after that you might need to maintain the contract, either to fix a bug or add new functionality.
Let us here guide you on how to deploy, update and finally lock your smart contract, so its code
cannot change anymore.

---

## Deploying a Contract

Thanks to the `NEAR CLI` deploying a contract is as simple as:

1. Compiling the contract to wasm (done automatically through `yarn build` in our templates).
2. Deploy it into the desired account using the [NEAR Command Line Interface (CLI)](/concepts/tools/near-cli):

```bash
# Login to NEAR
near login

# Deploy wasm to the <accountId> account
near deploy <accountId> <route_to_wasm>
```

:::tip
By default the contract will be deployed to the testnet. To deploy into `mainnet` you can set the `NEAR_ENV` variable to mainnet (`export NEAR_ENV=mainnet`).
:::

:::tip
You can use `near dev_deploy` to deploy the contract into a newly created account!
:::

---

## Upgrading a Contract
If the contract's account has a [Full Access Key](../1.concepts/1.basics/account.md#full-access-keys-full-access-keys), then
you will be able to re-deploy another contract on top of it later. On doing so, take into account that re-deploying a contract
does not wipe the state. This means that while the code will change **the state will persist**.

Since the state is persisted, adding/modifying methods that **read** the storage and returns a value will yield no problem. However,
deploying a contract with a different state will raise a `Cannot deserialize the contract state` error.

### Migrating Contract's State
If the new contract has a different state but you need anyway to deploy it, you have the option to implement a new method to `migrate`
the contract's state. Please check our [migration page](https://www.near-sdk.io/upgrading/production-basics).

---

## Locking a Contract
If you remove the [full access key](../3.tools/cli.md#near-delete-key-near-delete-key) from the account, then the account will become
`locked`. When the account is locked nobody can perform a transaction in the contract account's name (e.g. update the code or transfer money).
This tends to bring more reassurance to the users, knowing that no external actor will be able to manipulate the contract's state or
balance.

:::tip Upgrading Locked Contracts
Please do note that, while no external actor can update the contract, the contract **can still upgrade itself!**. For example, our reference
DAO implementation includes an [upgrading mechanism](https://github.com/near-daos/sputnik-dao-contract/blob/main/sputnikdao2/src/upgrade.rs)
governed by the community.
:::