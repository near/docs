---
id: prototyping
sidebar_label: Rapid Prototyping
title: "Upgrading Contracts: Rapid Prototyping"
---
import {CodeTabs, Language, Github} from "@site/components/codetabs";

# Rapid Prototyping

When you change the interface of a contract and re-deploy it, you may see this error:

    Cannot deserialize the contract state.

### Why does this happen?

When your contract is executed, the NEAR Runtime reads the serialized state from disk and attempts to load it using current contract code. When your code changes but the serialized state stays the same, it can't figure out how to do this.

### How can you avoid such errors?

When you're still in the Research & Development phase, building a prototype and deploying it locally or on [testnet](/concepts/basics/networks), you can just delete all previous contract state when you make a breaking change. See below for a couple ways to do this.

When you're ready to deploy a more stable contract, there are a couple of [production strategies](../../../2.develop/upgrade.md#migrating-the-state) that will help you update the contract state without deleting it all. And once your contract graduates from "trusted mode" (when maintainers control a [Full Access key](/concepts/basics/accounts/access-keys)) to community-governed mode (no more Full Access keys), you can set up your contract to [upgrade itself](../../../2.develop/upgrade.md#programmatic-update).


## Rapid Prototyping: Delete Everything All The Time

There are two ways to delete all account state:

1. `rm -rf neardev && near dev-deploy`
2. Deleting & recreating contract account

For both cases, let's consider the following example.

The [rust-status-message](https://github.com/near-examples/rust-status-message) example contract has the following structure:

<CodeTabs>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/rust-status-message/blob/b5fa6f2a30559d56a3a3ea52da8c26c5d3907606/src/lib.rs" start="5" end="29"/>
  </Language>
</CodeTabs>

Let's say you deploy this contract to testnet, then call it with:

```bash
near call [contract] set_status '{"message": "lol"}' --accountId you.testnet
near view [contract] get_status '{"account_id": "you.testnet"}'
```

This will return the message that you set with the call to `set_status`, in this case `"lol"`.

At this point the contract is deployed and has some state. 

Now let's say you change the contract to store two kinds of data for each account:

```rust
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct StatusMessage {
    taglines: LookupMap<AccountId, String>,
    bios: LookupMap<AccountId, String>,
}

impl Default for StatusMessage {
    fn default() -> Self {
        Self {
            taglines: LookupMap::new(b"r"),
            bios: LookupMap::new(b"b"),
        }
    }
}

#[near_bindgen]
impl StatusMessage {
    pub fn set_tagline(&mut self, message: String) {
        let account_id = env::signer_account_id();
        self.taglines.insert(&account_id, &message);
    }

    pub fn get_tagline(&self, account_id: AccountId) -> Option<String> {
        return self.taglines.get(&account_id);
    }

    pub fn set_bio(&mut self, message: String) {
        let account_id = env::signer_account_id();
        self.bios.insert(&account_id, &message);
    }

    pub fn get_bio(&self, account_id: AccountId) -> Option<String> {
        return self.bios.get(&account_id);
    }
}
```

You build & deploy the contract again, thinking that maybe because the new `taglines` LookupMap has the same prefix as the old `records` LookupMap (the prefix is `r`, set by `LookupMap::new(b"r".to_vec())`), the tagline for `you.testnet` should be `"lol"`. But when you `near view` the contract, you get the "Cannot deserialize" message. What to do?

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
