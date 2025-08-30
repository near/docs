---
id: update-contract-migrate-state
title: Self Upgrade & State Migration
description: "Learn how to implement upgradeable smart contracts on NEAR Protocol, including migration patterns and state management during contract updates."
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"
# NEAR Contract Upgrades & State Migration

"State migration" means that when your smart contract is deployed on NEAR and it has users’ data stored, upgrading to a new version of the contract does not lead to a loss of that data. In other words, it lets you upgrade your contract while keeping users’ state intact.If you don’t, the contract may produce errors like `Cannot deserialize state`.

---

## State Migration 
Old state sturcture
```bash 
#[near(serializers=[borsh])]
pub struct OldPostedMessage {
    pub premium: bool,
    pub sender: AccountId,
    pub text: String,
}

#[near(serializers=[borsh])]
pub struct OldState {
    messages: Vector<OldPostedMessage>,
    payments: Vector<NearToken>,
}
```
New State Structure

```
#[near(serializers=[json, borsh])]
pub struct PostedMessage {
    pub payment: NearToken,
    pub premium: bool,
    pub sender: AccountId,
    pub text: String,
}

#[near(contract_state)]
pub struct GuestBook {
    messages: Vector<PostedMessage>,
}
```

### Migrating State
Asking the contract to migrate the state from old to new

```bash 
#[near]
impl GuestBook {
    #[private]
    #[init(ignore_state)]
    pub fn migrate() -> Self {
        // 1. Loading the old state from the storage
        let mut old_state: OldState = env::state_read().expect("failed");

        
        let mut new_messages: Vector<PostedMessage> = Vector::new(MESSAGES_PREFIX);

        // 2. Iterating over the old messsages and connecting them with the corresponding payments
        for (idx, posted) in old_state.messages.iter().enumerate() {
            let payment = old_state.payments
                .get(idx as u64)
                .expect("failed to get payment")
                .clone();

            new_messages.push(&PostedMessage {
                payment,
                premium: posted.premium,
                sender: posted.sender.clone(),
                text: posted.text.clone(),
            })
        }

        // 4. Clean up the old payments vector to avoid dangling state
        old_state.payments.clear();

        // 5. Return the new GuestBook state
        Self {
            messages: new_messages,
        }
    }
}
```
### Retreiving the data after migration

now when you try to retreive the messages `get_messages` will always return messages including the new field changed in the contract

```bash
   # NEAR CLI
   near view <target-account-id> get_messages
```
