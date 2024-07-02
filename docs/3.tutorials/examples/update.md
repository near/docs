---
id: update-contract-migrate-state
title: Self Upgrade & State Migration
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

Three examples on how to handle updates and [state migration](../../2.build/2.smart-contracts/release/upgrade.md):
1. [State Migration](https://github.com/near-examples/update-migrate-rust/tree/main/basic-updates): How to implement a `migrate` method to migrate state between contract updates.
2. [State Versioning](https://github.com/near-examples/update-migrate-rust/tree/main/enum-updates): How to use readily use versioning on a state, to simplify updating it later.
3. [Self Update](https://github.com/near-examples/update-migrate-rust/tree/main/self-updates): How to implement a contract that can update itself.

---

## State Migration
The [State Migration example](https://github.com/near-examples/update-migrate-rust/tree/main/basic-updates) shows how to handle state-breaking changes
between contract updates.

It is composed by 2 contracts:
1. Base: A Guest Book where people can write messages.
2. Update: An update in which we remove a parameter and change the internal structure.

<CodeTabs>
  <Language value="rust" language="rust">
    <Github fname="migrate.rs"
            url="https://github.com/near-examples/update-migrate-rust/blob/main/basic-updates/update/src/migrate.rs"
            start="18" end="45" />
  </Language>
</CodeTabs>

#### The Migration Method
The migration method deserializes the current state (`OldState`) and iterates through the messages, updating them
to the new `PostedMessage` that includes the `payment` field.

:::tip
Notice that migrate is actually an [initialization method](../../2.build/2.smart-contracts/anatomy/anatomy.md#initialization-method) that ignores the existing state (`[#init(ignore_state)]`), thus being able to execute and rewrite the state.
:::

---

## State Versioning
The [State Versioning example](https://github.com/near-examples/update-migrate-rust/tree/main/enum-updates) shows how to use
[Enums](https://doc.rust-lang.org/book/ch06-01-defining-an-enum.html) to implement state versioning on a contract.

Versioning simplifies updating the contract since you only need to add a new version of the structure.
All versions can coexist, thus you will not need to change previously existing structures. 

The example is composed by 2 contracts:
1. Base: The Guest Book contract using versioned `PostedMessages` (`PostedMessagesV1`).
2. Update: An update that adds a new version of `PostedMessages` (`PostedMessagesV2`).

<CodeTabs>
  <Language value="rust" language="rust">
    <Github fname="versioned_msg.rs"
            url="https://github.com/near-examples/update-migrate-rust/blob/main/enum-updates/update/src/versioned_msg.rs"
            start="18" end="36" />
  </Language>
</CodeTabs>

---

## Self Update
The [Self Update example](https://github.com/near-examples/update-migrate-rust/tree/main/self-updates) shows how to implement a contract
that can update itself.

It is composed by 2 contracts:
1. Base: A Guest Book were people can write messages, implementing a `update_contract` method.
2. Update: An update in which we remove a parameter and change the internal structure.

<CodeTabs>
  <Language value="rust" language="rust">
    <Github fname="update.rs"
            url="https://github.com/near-examples/update-migrate-rust/blob/main/self-updates/base/src/update.rs"
            start="10" end="31" />
  </Language>
</CodeTabs>
