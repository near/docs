---
id: migration
sidebar_label: Migrating Contracts
title: "Upgrading Contracts: Production App Basics"
---
import {CodeTabs, Language, Github} from "@site/components/codetabs";

# Upgrading Production Contracts

When deploying new code to production contracts, you obviously can't destroy old account state, as you do during rapid prototyping. So how to you prevent the dreaded error?

```
Cannot deserialize the contract state.
```

You can use a couple different approaches, depending on the complexity of your contract.

## Migration method

For cases like [the change to the `rust-status-message` contract](https://github.com/near-examples/rust-status-message/commit/a39e1fc55ee018b631e3304ba6f0884b7558873e), a simple migration method is all you need.

As a reminder, the goal is to change this:

<CodeTabs>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/rust-status-message/blob/b5fa6f2a30559d56a3a3ea52da8c26c5d3907606/src/lib.rs" start="7" end="17"/>
  </Language>
</CodeTabs>

into this:

```rust
pub struct StatusMessage {
    taglines: LookupMap<AccountId, String>,
    bios: LookupMap<AccountId, String>,
}

impl Default for StatusMessage {
    fn default() -> Self {
        Self {
            taglines: LookupMap::new(b"r".to_vec()),
            bios: LookupMap::new(b"b".to_vec()),
        }
    }
}
```

The NEAR Runtime looks at your current code as well as your contract's data, which is serialized and saved on-disk. When it executes the code, it tries to match these up. If you change the code but the data stays the same, it can't figure out how to do this. Previously we "solved" this by removing old serialized data. Now let's see how to update the data instead.

First, keep the old `struct` around for at least one deploy:

```rust
#[derive(BorshDeserialize, BorshSerialize)]
pub struct OldStatusMessage {
    records: LookupMap<AccountId, String>,
}

```

And add a `migrate` method to the main struct:

<CodeTabs>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/rust-status-message/blob/7f6afcc5ce414271fdf9bc750f666c062a6d697e/src/lib.rs" start="48" end="56"/>
  </Language>
</CodeTabs>

:::note Need a refresher?

<details>
<summary>Click here to see the full diff between the starting contract and the update + migration.</summary>

```diff
+#[derive(BorshDeserialize, BorshSerialize)]
+pub struct OldStatusMessage {
+    records: LookupMap<String, String>,
+}
+
 #[near_bindgen]
 #[derive(BorshDeserialize, BorshSerialize)]
 pub struct StatusMessage {
-    records: LookupMap<String, String>,
+    taglines: LookupMap<String, String>,
+    bios: LookupMap<String, String>,
 }
 
 impl Default for StatusMessage {
     fn default() -> Self {
         Self {
-            records: LookupMap::new(b"r".to_vec()),
+            taglines: LookupMap::new(b"r".to_vec()),
+            bios: LookupMap::new(b"b".to_vec()),
         }
     }
 }
 
 #[near_bindgen]
 impl StatusMessage {
-    pub fn set_status(&mut self, message: String) {
+    pub fn set_tagline(&mut self, message: String) {
         let account_id = env::signer_account_id();
-        self.records.insert(&account_id, &message);
+        self.taglines.insert(&account_id, &message);
+    }
+
+    pub fn get_tagline(&self, account_id: String) -> Option<String> {
+        return self.taglines.get(&account_id);
     }

-    pub fn get_status(&self, account_id: String) -> Option<String> {
-        return self.records.get(&account_id);
+    pub fn set_bio(&mut self, message: String) {
+        let account_id = env::signer_account_id();
+        self.bios.insert(&account_id, &message);
+    }
+
+    pub fn get_bio(&self, account_id: String) -> Option<String> {
+        return self.bios.get(&account_id);
+    }
+
+    #[private]
+    #[init(ignore_state)]
+    pub fn migrate() -> Self {
+        let old_state: OldStatusMessage = env::state_read().expect("failed");
+        Self {
+            taglines: old_state.records,
+            bios: LookupMap::new(b"b".to_vec()),
+        }
     }
 }
```

</details>

:::

When you deploy your change, call the `migrate` method:

    near deploy \
      --wasmFile res/status_message.wasm \
      --initFunction "migrate" \
      --initArgs "{}" \
      --accountId app-name.you.testnet

Finally, you can view old statuses with your new `get_tagline` method:

    near view app-name.you.testnet get_tagline '{"account_id": "you.testnet"}'

Hooray!

:::tip Tidying Up

At this point, all contract state has been migrated, and you don't need to keep the `OldStatusMessage` struct or the `migrate` method. Feel free to remove them and deploy again with no `initFunction` call. Your contract will be all tidy and ready for the next migration!

:::

## Using Enums

In the example above, all contract state is stored in one simple struct. Many real-world contracts are more complex, often having one struct referenced by another. For example, a [DAO](https://whiteboardcrypto.com/what-is-a-dao/) contract might look something like this:

```rust
#[derive(BorshSerialize, BorshDeserialize)]
pub enum ProposalStatus {
    Proposed,
    Approved,
    Rejected,
}

#[derive(BorshSerialize, BorshDeserialize)]
pub struct Proposal {
    pub description: String,
    pub status: ProposalStatus,
}

#[near_bindgen]
#[derive(BorshSerialize, BorshDeserialize)]
pub struct DAO {
    pub proposals: LookupMap<u64, Proposal>,
}
```

:::note

For a more complete DAO example, check out [SputnikDAO](https://github.com/near-daos/sputnik-dao-contract/blob/317ea4fb1e6eac8064ef29a78054b0586a3406c3/sputnikdao2/src/lib.rs), [Flux](https://github.com/fluxprotocol/amm/blob/3def886a7fbd2df4ba28e18f67e6ab12cd2eee0b/dao/src/lib.rs), and [others](https://github.com/search?q=near+dao).

:::

Say you want to update the structure of `Proposal` but keep `DAO` unchanged.

The first thing to note is that the contract could be storing a huge number of proposals, which makes it impossible to migrate all of them in one transaction due to [the gas limit](https://docs.near.org/concepts/basics/transactions/gas#thinking-in-gas). In an off-chain script, you could query the full state of the contract and update every single one of them via multiple transactions. But that may be prohibitively expensive, so you might opt to upgrade proposals to the new structure during the next interaction with them, rather than all at once (this disperses the upgrade cost to users of the contract).

In either case, your contract can end up with proposals using the original structure and the new structure at the same time, and the `DAO` struct needs to know how to load both of them. How do you do that?

Use [enums](https://doc.rust-lang.org/book/ch06-00-enums.html):

```rust
#[derive(BorshSerialize, BorshDeserialize)]
pub enum ProposalStatus {
    Proposed,
    Approved,
    Rejected,
}

#[derive(BorshSerialize, BorshDeserialize)]
pub struct ProposalV1 {
    pub description: String,
    pub status: ProposalStatus,
}

#[derive(BorshSerialize, BorshDeserialize)]
pub struct Proposal {
    pub title: String,
    pub description: String,
    pub status: ProposalStatus,
}

#[derive(BorshSerialize, BorshDeserialize)]
pub enum UpgradableProposal {
    V1(ProposalV1),
    V2(Proposal),
}

impl From<UpgradableProposal> for Proposal {
    fn from(proposal: UpgradableProposal) -> Self {
        match proposal {
            UpgradableAccount::V2(proposal) => proposal,
            UpgradableAccount::V1(v1) => Proposal {
                // set title to first 10 chars of description
                title: v1.description.get(..10).map(str::to_owned).unwrap_or_default(),
                description: v1.description,
                status: v1.status,
            }
        }
    }
}

#[near_bindgen]
#[derive(BorshSerialize, BorshDeserialize)]
pub struct DAO {
    pub proposals: LookupMap<u64, UpgradableProposal>,
}
```

:::danger Untested Example

The example above is not tested and may contain bugs or be incomplete.

Someone (us? you??) needs to create a full example repository that clearly demonstrates this upgrade path, and link to it in the snippets above.

In the meantime, you can see working examples and learn more about this pattern at the following links:

* https://github.com/evgenykuzyakov/berryclub/commit/d78491b88cbb16a79c15dfc3901e5cfb7df39fe8
* https://nomicon.io/ChainSpec/Upgradability.html
* https://github.com/mikedotexe/rust-contract-upgrades/pulls

:::


## Writing Upgradable Contracts

If you plan to upgrade your contracts throughout their lifetime, **start with enums**. Adding them only after you decide to upgrade is (usually) possible, but will result in harder-to-follow (and thus more error-prone) code.
