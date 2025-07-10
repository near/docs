---
id: registering-accounts
title: Registering Accounts
sidebar_label: Registering Accounts
---



In the previous tutorial, you looked at how to mint an initial circulating supply of tokens and how you could log events as per the [events standard](https://nomicon.io/Standards/Tokens/FungibleToken/Event). You then deployed the contract and saw the FTs in your wallet balance. In this tutorial, you'll learn about the [storage management](https://nomicon.io/Standards/StorageManagement) standard and how you can register accounts in your FT contract in order to prevent a malicious party from draining your contract of all its funds.

---

## Introduction

Whenever a new person receives any fungible tokens, they're added to the `accounts` lookup map on the contract. By doing this, you're adding bytes to the contract. If you made it so any user could receive FTs for free, that system could easily be abused. Users could essentially "drain" the contract of all its funds by sending small amounts of FTs to many accounts. For this reason, you'll want to charge users for the information they're storing and the bytes they're using on the contract. This way of charging users, however, should be standardized so it works across all contracts.

*Enter the [storage management](https://nomicon.io/Standards/StorageManagement) standard*

<img width="65%" src="/docs/assets/fts/storage-standard-meme.png" />

<hr className="subsection" />

### Storage Management Standard

The storage management standard is a set of rules that govern how a contract should charge users for storage. It outlines functions and behaviors such that all contracts implementing the standard are interoperable with each other. The 3 functions you'll need to implement are:
- **`storage_deposit`** - Allows a user to deposit some amount of storage to the contract. If the user over deposits, they're refunded for the excess $NEAR.
- **`storage_balance_of`** - Query for the storage paid by a given user
- **`storage_balance_bounds`** - Query for the minimum and maximum amount of storage needed to interact with a given contract.

With these functions outlined, you could make a reasonable assumption that the flow would be:
1. If a user doesn't exist on the contract, they need to deposit some storage to cover the bytes they use.
2. Once the user deposits $NEAR via the `storage_deposit` function, they're free to interact with the contract.

You might be asking yourself what the deposit amount should be. There are two ways you can go about getting this information:
- Dynamically calculate the bytes every individual user would take up in the `storage_deposit` function by inserting them into `accounts` map, measuring the bytes, and then removing them from the map after.
- Calculate the bytes for inserting a largest possible account ID once upon initializing the contract and simply charge every user the same amount.

For the purpose of simplicity, we'll assume the second method.

---

## Modifications to the Contract

This "bytes for longest account ID" should be stored in the contract's state such that we can pull the value during the `storage_deposit` function and ensure the user attaches enough $NEAR. Open the `src/lib.rs` file and add the following code to the `Contract` struct. If you're just joining us now, you can find the skeleton code for this tutorial in the `3.initial-supply` folder.

```
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
#[borsh(crate = "near_sdk::borsh")]
pub struct Contract {
    /// Keep track of each account's balances
    pub accounts: LookupMap<AccountId, NearToken>,

    /// Total supply of all tokens.
    pub total_supply: NearToken,

    /// The bytes for the largest possible account ID that can be registered on the contract 
    pub bytes_for_longest_account_id: StorageUsage,

    /// Metadata for the contract itself
```

You'll now need a way to calculate this amount which will be done in the initialization function. Move to the `src/internal.rs` file and add the following private function `measure_bytes_for_longest_account_id` which will add the longest possible account ID and remove it while measuring how many bytes the operation took. It will then set the `bytes_for_longest_account_id` field to the result.

```
    /// This will insert the account, measure the storage, and remove the account. It is called in the initialization function.
    pub(crate) fn measure_bytes_for_longest_account_id(&mut self) {
        let initial_storage_usage = env::storage_usage();
        let tmp_account_id = AccountId::from_str(&"a".repeat(64)).unwrap();
        self.accounts.insert(&tmp_account_id, &ZERO_TOKEN);
        self.bytes_for_longest_account_id = env::storage_usage() - initial_storage_usage;
        self.accounts.remove(&tmp_account_id);
    }
}
```

You'll also want to create a function for _registering_ an account after they've paid for storage. To do this, you can simply insert them into the `accounts` map with a balance of 0. This way, you know that any account currently in the map is considered "registered" and have paid for storage. Any account that attempts to receive FTs must be in the map with a balance of 0 or greater. If they aren't, the contract should throw.

```
    pub(crate) fn internal_register_account(&mut self, account_id: &AccountId) {
        if self.accounts.insert(account_id, &ZERO_TOKEN).is_some() {
            env::panic_str("The account is already registered");
        }
    }

    /// Internal method for measuring how many bytes it takes to insert the longest possible account ID into our map
```

Let's also create a function to panic with a custom message if the user doesn't exist yet.

```
    pub(crate) fn internal_unwrap_balance_of(&self, account_id: &AccountId) -> NearToken {
        match self.accounts.get(account_id) {
            Some(balance) => balance,
            None => {
                env::panic_str(format!("The account {} is not registered", &account_id).as_str())
            }
        }
    }

    /// Internal method for depositing some amount of FTs into an account. 
```

Now when you call the `internal_deposit` function, rather than defaulting the user's balance to `0` if they don't exist yet via:

```rust
let balance = self.accounts.get(&account_id).unwrap_or(0);
```
You can replace it with the following:

```
    pub(crate) fn internal_deposit(&mut self, account_id: &AccountId, amount: NearToken) {
        // Get the current balance of the account. If they're not registered, panic.
        let balance = self.internal_unwrap_balance_of(account_id);
        
        // Add the amount to the balance and insert the new balance into the accounts map
        if let Some(new_balance) = balance.checked_add(amount) {
            self.accounts.insert(account_id, &new_balance);
        } else {
            env::panic_str("Balance overflow");
        }
    }

    /// Internal method for registering an account with the contract.
```

With this finished, your `internal.rs` should look as follows:

```rust
use near_sdk::{require};

use crate::*;

impl Contract {
    pub(crate) fn internal_unwrap_balance_of(&self, account_id: &AccountId) -> Balance {
      ...
    }

    pub(crate) fn internal_deposit(&mut self, account_id: &AccountId, amount: Balance) {
      ...
    }

    pub(crate) fn internal_register_account(&mut self, account_id: &AccountId) {
      ...
    }

    pub(crate) fn measure_bytes_for_longest_account_id(&mut self) {
      ...
    }
}
```

There's only one problem you need to solve with this. When initializing the contract, the implementation will throw. This is because you call `internal_deposit` and the owner doesn't have a balance yet. To fix this, let's modify the initialization function to register the owner before depositing the FTs in their account. In addition, you should measure the bytes for the registration in this function.

```
    /// Initializes the contract with the given total supply owned by the given `owner_id` with
    /// the given fungible token metadata.
    #[init]
    pub fn new(
        owner_id: AccountId,
        total_supply: U128,
        metadata: FungibleTokenMetadata,
    ) -> Self {
        let casted_total_supply = NearToken::from_yoctonear(total_supply.0);
        // Create a variable of type Self with all the fields initialized. 
        let mut this = Self {
            // Set the total supply
            total_supply: casted_total_supply,
            // Set the bytes for the longest account ID to 0 temporarily until it's calculated later
            bytes_for_longest_account_id: 0,
            // Storage keys are simply the prefixes used for the collections. This helps avoid data collision
            accounts: LookupMap::new(StorageKey::Accounts),
            metadata: LazyOption::new(
                StorageKey::Metadata,
                Some(&metadata),
            ),
        };

        // Measure the bytes for the longest account ID and store it in the contract.
        this.measure_bytes_for_longest_account_id();

        // Register the owner's account and set their balance to the total supply.
        this.internal_register_account(&owner_id);
        this.internal_deposit(&owner_id, casted_total_supply);
        
        // Emit an event showing that the FTs were minted
        FtMint {
            owner_id: &owner_id,
            amount: &casted_total_supply,
            memo: Some("Initial token supply is minted"),
        }
        .emit();

        // Return the Contract object
        this
    }
}
```

<hr className="subsection" />

### Implementing Storage Standard

With this finished, you're now ready to implement the storage management standard. If you remember, the three functions you'll be implementing, we can break each down into their core functionality and decide how to proceed.

- **`storage_balance_bounds`** - Query for the minimum and maximum amount of storage needed to interact with a given contract.

Since you're creating a fungible token contract and the storage price won't change (unless the `$NEAR` cost per byte changes), the minimum and maximum storage costs should be the same. These values should be equal to the amount of bytes for the longest account ID you calculated in the `measure_bytes_for_longest_account_id` function multiplied by the current `$NEAR` price per byte. Switch to the `src/storage.rs` file to get started.

```
    fn storage_balance_bounds(&self) -> StorageBalanceBounds {
        // Calculate the required storage balance by taking the bytes for the longest account ID and multiplying by the current byte cost
        let required_storage_balance =
            env::storage_byte_cost().saturating_mul(self.bytes_for_longest_account_id.into());
        
        // Storage balance bounds will have min == max == required_storage_balance
        StorageBalanceBounds {
            min: required_storage_balance,
            max: Some(required_storage_balance),
        }
    }

```

- **`storage_balance_of`** - Query for the storage paid by a given user.

As we mentioned earlier, you can tell if somebody has paid for storage by checking if they're in the `accounts` map. If they are, you know that they've paid the amount returned by `storage_balance_bounds`.

```
    fn storage_balance_of(&self, account_id: AccountId) -> Option<StorageBalance> {
        // Get the storage balance of the account. Available will always be 0 since you can't overpay for storage.
        if self.accounts.contains_key(&account_id) {
            Some(StorageBalance { total: self.storage_balance_bounds().min, available: ZERO_TOKEN })
        } else {
            None
        }
    }
}
```

- **`storage_deposit`** - Allows a user to deposit some amount of storage to the contract. If the user over deposits, they're refunded for the excess $NEAR.

In order to implement this logic, you first need to get the attached deposit. You'll also need to ensure that the user hasn't already paid for storage (i.e. they're in the `accounts` map). If they are, simply refund the caller for the $NEAR they attached to the call.

If the user isn't registered yet, you should get the storage cost by calling `storage_balance_bounds` and make sure they've attached enough to cover that amount. Once this if finished, you can register them and refund any excess $NEAR.

```
    #[allow(unused_variables)]
    #[payable]
    fn storage_deposit(
        &mut self,
        account_id: Option<AccountId>,
        registration_only: Option<bool>,
    ) -> StorageBalance {
        // Get the amount of $NEAR to deposit
        let amount = env::attached_deposit();
        // If an account was specified, use that. Otherwise, use the predecessor account.
        let account_id = account_id.unwrap_or_else(env::predecessor_account_id);
        
        // If the account is already registered, refund the deposit.
        if self.accounts.contains_key(&account_id) {
            log!("The account is already registered, refunding the deposit");
            if amount.gt(&ZERO_TOKEN) {
                Promise::new(env::predecessor_account_id()).transfer(amount);
            } 
        // Register the account and refund any excess $NEAR
        } else {
            // Get the minimum required storage and ensure the deposit is at least that amount
            let min_balance = self.storage_balance_bounds().min;
            if amount < min_balance {
                env::panic_str("The attached deposit is less than the minimum storage balance");
            }

            // Register the account
            self.internal_register_account(&account_id);
            // Perform a refund
            let refund = amount.saturating_sub(min_balance);
            if refund.gt(&ZERO_TOKEN) {
                Promise::new(env::predecessor_account_id()).transfer(refund);
            }
        }

        // Return the storage balance of the account
        StorageBalance { total: self.storage_balance_bounds().min, available: ZERO_TOKEN }
    }

```

With this finished, you're ready to build and deploy the contract!

---

## Deploying the contract {#redeploying-contract}

Since the current contract you have is already initialized, let's create a sub-account and deploy to again.

### Creating a sub-account

Run the following command to create a sub-account `storage` of your main account with an initial balance of 3 NEAR which will be transferred from the original to your new account.

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">
  
  ```bash
  near create-account storage.$FT_CONTRACT_ID --use-account $FT_CONTRACT_ID --initial-balance 3 --network-id testnet
  ```
  </TabItem>

  <TabItem value="full" label="Full">
  
  ```bash
  near account create-account fund-myself storage.$FT_CONTRACT_ID '3 NEAR' autogenerate-new-keypair save-to-keychain sign-as $FT_CONTRACT_ID network-config testnet sign-with-keychain send
  ```
  </TabItem>
</Tabs>

Next, you'll want to export an environment variable for ease of development:

```bash
export STORAGE_FT_CONTRACT_ID=storage.$FT_CONTRACT_ID
```

Build the contract as you did in the previous tutorials:

```bash
cd 3.initial-supply
cargo near build
```

<hr className="subsection" />

### Deploying and Initialization {#deploying-initialization}

It's time to deploy the contract, initialize it and mint the total supply. Let's once again create an initial supply of 1000 `gtNEAR`.

```bash
cargo near deploy build-non-reproducible-wasm $STORAGE_FT_CONTRACT_ID with-init-call new_default_meta json-args '{"owner_id": "'$STORAGE_FT_CONTRACT_ID'", "total_supply": "1000000000000000000000000000"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' network-config testnet sign-with-keychain send
```

If you now query for the storage paid by the owner, you should see that they're registered!

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">
  
  ```bash
  near view $STORAGE_FT_CONTRACT_ID storage_balance_of '{"account_id": "'$STORAGE_FT_CONTRACT_ID'"}' --networkId testnet
  ```
  </TabItem>

  <TabItem value="full" label="Full">
  
  ```bash
  near contract call-function as-read-only $STORAGE_FT_CONTRACT_ID storage_balance_of json-args '{"account_id": "'$STORAGE_FT_CONTRACT_ID'"}' network-config testnet now
  ```
  </TabItem>
</Tabs>

This should return a struct. The Total amount is roughly `0.00125 $NEAR` to register and the user has 0 available $NEAR since it's all being used up to pay for registration.

```js
{ total: '1250000000000000000000', available: '0' }
```

You can also query for the storage balance required to interact with the contract:

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">
  
  ```bash
  near view $STORAGE_FT_CONTRACT_ID storage_balance_bounds '{}' --networkId testnet
  ```
  </TabItem>

  <TabItem value="full" label="Full">
  
  ```bash
  near contract call-function as-read-only $STORAGE_FT_CONTRACT_ID storage_balance_bounds json-args {} network-config testnet now
  ```
  </TabItem>
</Tabs>

You'll see that it returns the same amount as the `storage_balance_of` query above with the min equal to the max:

```js
{ min: '1250000000000000000000', max: '1250000000000000000000' }
```

---

## Conclusion

Today you went through and created the logic for registering users on the contract. This logic adheres to the [storage management standard](https://nomicon.io/Standards/StorageManagement) and is customized to meet our needs when writing a FT contract. You then built, deployed, and tested those changes. In the [next tutorial](5.transfers.md), you'll look at the basics of how to transfer FTs to other users.

---

:::note Versioning for this article
At the time of this writing, this example works with the following versions:

- rustc: `1.77.1`
- near-sdk-rs: `5.1.0` (with enabled `legacy` feature)
- cargo-near: `0.13.2`
- near-cli-rs: `0.17.0`
:::
