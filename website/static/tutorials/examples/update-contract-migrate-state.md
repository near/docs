---
id: update-contract-migrate-state
title: Self Upgrade & State Migration
---



Three examples on how to handle updates and [state migration](../../smart-contracts/release/upgrade.md):
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
    ```
    #[private]
    #[init(ignore_state)]
    pub fn migrate() -> Self {
        // retrieve the current state from the contract
        let old_state: OldState = env::state_read().expect("failed");

        // iterate through the state migrating it to the new version
        let mut new_messages: Vector<PostedMessage> = Vector::new(b"p");

        for (idx, posted) in old_state.messages.iter().enumerate() {
            let payment = old_state
                .payments
                .get(idx as u64)
                .unwrap_or(NearToken::from_near(0));

            new_messages.push(&PostedMessage {
                payment,
                premium: posted.premium,
                sender: posted.sender,
                text: posted.text,
            })
        }

        // return the new state
        Self {
            messages: new_messages,
        }
    }
}
```
  </Language>
</CodeTabs>

#### The Migration Method
The migration method deserializes the current state (`OldState`) and iterates through the messages, updating them
to the new `PostedMessage` that includes the `payment` field.

:::tip
Notice that migrate is actually an [initialization method](../../smart-contracts/anatomy/storage.md) that ignores the existing state (`[#init(ignore_state)]`), thus being able to execute and rewrite the state.
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
    ```
#[near(serializers=[borsh])]
pub enum VersionedPostedMessage {
    V1(PostedMessageV1),
    V2(PostedMessageV2),
}

impl From<VersionedPostedMessage> for PostedMessageV2 {
    fn from(message: VersionedPostedMessage) -> Self {
        match message {
            VersionedPostedMessage::V2(posted) => posted,
            VersionedPostedMessage::V1(posted) => PostedMessageV2 {
                payment: NearToken::from_near(0),
                premium: posted.premium,
                sender: posted.sender,
                text: posted.text,
            },
        }
    }
}

```
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
    ```
    pub fn update_contract(&self) -> Promise {
        // Check the caller is authorized to update the code
        assert!(
            env::predecessor_account_id() == self.manager,
            "Only the manager can update the code"
        );

        // Receive the code directly from the input to avoid the
        // GAS overhead of deserializing parameters
        let code = env::input().expect("Error: No input").to_vec();

        // Deploy the contract on self
        Promise::new(env::current_account_id())
            .deploy_contract(code)
            .function_call(
                "migrate".to_string(),
                NO_ARGS,
                NearToken::from_near(0),
                CALL_GAS,
            )
            .as_return()
    }
}
```
  </Language>
</CodeTabs>
