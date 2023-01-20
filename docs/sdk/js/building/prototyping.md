---
id: prototyping
sidebar_label: Rapid Prototyping
title: "Upgrading Contracts: Rapid Prototyping"
---

# Rapid Prototyping

When you change the interface of a contract and re-deploy it, you may see this error:

    Cannot deserialize the contract state.

### Why does this happen?

When your contract is executed, the NEAR Runtime reads the serialized state from disk and attempts to load it using current contract code. When your code changes but the serialized state stays the same, it can't figure out how to do this.

### How can you avoid such errors?

When you're still in the Research & Development phase, building a prototype and deploying it locally or on [testnet](../../../1.concepts/basics/networks.md), you can just delete all previous contract state when you make a breaking change. See below for a couple ways to do this.

When you're ready to deploy a more stable contract, there are a couple of [production strategies](../../../2.develop/upgrade.md#migrating-the-state) that will help you update the contract state without deleting it all. And once your contract graduates from "trusted mode" (when maintainers control a [Full Access key](/concepts/basics/accounts/access-keys)) to community-governed mode (no more Full Access keys), you can set up your contract to [upgrade itself](../../../2.develop/upgrade.md#programmatic-update).


## Rapid Prototyping: Delete Everything All The Time

There are two ways to delete all account state:

1. `rm -rf neardev && near dev-deploy`
2. Deleting & recreating contract account

For both cases, let's consider the following example.

Let's say you deploy [a JS status message contract](https://github.com/near/near-sdk-js/blob/263c9695ab7bb853ced12886c4b3f8663070d900/examples/src/status-message-collections.js#L10-L42) contract to testnet, then call it with:

```bash
near call [contract] set_status '{"message": "lol"}' --accountId you.testnet
near view [contract] get_status '{"account_id": "you.testnet"}'
```

This will return the message that you set with the call to `set_status`, in this case `"lol"`.

At this point the contract is deployed and has some state. 

Now let's say you change the contract to store two kinds of data for each account, a status message and a tagline. You can add to the contract code a `LookupMap` for both status message and another one for the tagline, both indexed by the account ID. 

You build & deploy the contract again, thinking that maybe because the new `taglines` LookupMap has the same prefix as the old `records` LookupMap (the prefix is `a`, set by `new LookupMap("a"`), the tagline for `you.testnet` should be `"lol"`. But when you `near view` the contract, you get the "Cannot deserialize" message. What to do?

### 1. `rm -rf neardev && near dev-deploy`

When first getting started with a new project, the fastest way to deploy a contract is [`dev-deploy`](/concepts/basics/accounts/creating-accounts):

```bash
near dev-deploy [--wasmFile ./path/to/compiled.wasm]
```

This does a few things:

1. Creates a new testnet account with a name like `dev-1626793583587-89195915741581`
2. Stores this account name in a `neardev` folder within the project
3. Stores the private key for this account in the `~/.near-credentials` folder
4. Deploys your contract code to this account

The next time you run `dev-deploy`, it checks the `neardev` folder and re-deploys to the same account rather than making a new one.

But in the example above, we want to delete the account state. How do we do that?

The easiest way is just to delete the `neardev` folder, then run `near dev-deploy` again. This will create a brand new testnet account, with its own (empty) state, and deploy the updated contract to it.

### 2. Deleting & recreating contract account

If you want to have a predictable account name rather than an ever-changing `dev-*` account, the best way is probably to create a sub-account:

```bash title="Create sub-account"
near create-account app-name.you.testnet --masterAccount you.testnet
```

Then deploy your contract to it:

```bash title="Deploy to sub-account"
near deploy --accountId app-name.you.testnet [--wasmFile ./path/to/compiled.wasm]
```

In this case, how do you delete all contract state and start again? Delete the sub-account and recreate it.

```bash title="Delete sub-account"
near delete app-name.you.testnet you.testnet
```

This sends all funds still on the `app-name.you.testnet` account to `you.testnet` and deletes the contract that had been deployed to it, including all contract state.

Now you create the sub-account and deploy to it again using the commands above, and it will have empty state like it did the first time you deployed it.