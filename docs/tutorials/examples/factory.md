---
id: factory
title: Factory
description: "A factory is a smart contract that stores a compiled contract, and automatizes deploying the stored contract onto new sub-accounts."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

A factory is a smart contract that stores a compiled contract, and automatizes deploying the stored contract onto new sub-accounts.

We have a [**A Generic Factory**](https://github.com/near-examples/factory-rust) that deploys the [donation contract](./donation.md). This donation contract can be changed for whichever compiled contract you like (e.g. a fungible token or DAO). 

---

## Overview {#generic-factory}

The factory is a smart contract that:

1. Creates sub-accounts of itself and deploys its contract on them (`create_factory_subaccount_and_deploy`).
2. Can change the stored contract using the `update_stored_contract` method.

<CodeTabs>
  <Language value="rust" language="rust">
    <Github fname="deploy.rs"
            url="https://github.com/near-examples/factory-rust/blob/main/src/deploy.rs"
            start="14" end="66" />
    <Github fname="manager.rs"
            url="https://github.com/near-examples/factory-rust/blob/main/src/manager.rs"
            start="5" end="19" />
  </Language>
</CodeTabs>

---

## Quickstart

1. Make sure you have installed [rust](https://www.rust-lang.org/).
2. Install the [`NEAR CLI`](/tools/near-cli#installation)

<hr className="subsection" />

### Build and Deploy the Factory

You can automatically compile and deploy the contract in the NEAR testnet by running:

```bash
./deploy.sh
```

Once finished, check the `neardev/dev-account` file to find the address in which the contract was deployed:

```bash
cat ./neardev/dev-account
# e.g. dev-1659899566943-21539992274727
```

<hr className="subsection" />

### Deploy the Stored Contract Into a Sub-Account

`create_factory_subaccount_and_deploy` will create a sub-account of the factory and deploy the
stored contract on it.

```bash
near call <factory-account> create_factory_subaccount_and_deploy '{ "name": "sub", "beneficiary": "<account-to-be-beneficiary>"}' --deposit 1.24 --accountId <account-id> --gas 300000000000000
```

This will create the `sub.<factory-account>`, which will have a `donation` contract deployed on it:

```bash
near view sub.<factory-account> get_beneficiary
# expected response is: <account-to-be-beneficiary>
```

<hr className="subsection" />

### Update the Stored Contract

`update_stored_contract` enables to change the compiled contract that the factory stores.

The method is interesting because it has no declared parameters, and yet it takes
an input: the new contract to store as a stream of bytes.

To use it, we need to transform the contract we want to store into its `base64`
representation, and pass the result as input to the method:

```bash
# Use near-cli to update stored contract
export BYTES=`cat ./src/to/new-contract/contract.wasm | base64`
near call <factory-account> update_stored_contract "$BYTES" --base64 --accountId <factory-account> --gas 30000000000000
```

> This works because the arguments of a call can be either a `JSON` object or a `String Buffer`

---

## Factories - Concepts & Limitations

Factories are an interesting concept, here we further explain some of their implementation aspects,
as well as their limitations.

<hr className="subsection" />

### Automatically Creating Accounts

NEAR accounts can only create sub-accounts of itself, therefore, the `factory` can only create and
deploy contracts on its own sub-accounts.

This means that the factory:

1. **Can** create `sub.factory.testnet` and deploy a contract on it.
2. **Cannot** create sub-accounts of the `predecessor`.
3. **Can** create new accounts (e.g. `account.testnet`), but **cannot** deploy contracts on them.

It is important to remember that, while `factory.testnet` can create `sub.factory.testnet`, it has
no control over it after its creation.

<hr className="subsection" />

### The Update Method

The `update_stored_contracts` has a very short implementation:

```rust
#[private]
pub fn update_stored_contract(&mut self) {
  self.code = env::input().expect("Error: No input").to_vec();
}
```

On first sight it looks like the method takes no input parameters, but we can see that its only
line of code reads from `env::input()`. What is happening here is that `update_stored_contract`
**bypasses** the step of **deserializing the input**.

You could implement `update_stored_contract(&mut self, new_code: Vec<u8>)`,
which takes the compiled code to store as a `Vec<u8>`, but that would trigger the contract to:

1. Deserialize the `new_code` variable from the input.
2. Sanitize it, making sure it is correctly built.

When dealing with big streams of input data (as is the compiled `wasm` file to be stored), this process
of deserializing/checking the input ends up **consuming the whole GAS** for the transaction.

<hr className="subsection" />

### How to deploy a contract from a contract

As we saw above (### Deploy the Stored Contract Into a Sub-Account), after calling the `create_factory_subaccount_and_deploy` function, a sub-account is created and the `donation` contract is deployed:
```rust
  let code = self.code.clone().unwrap();
  let contract_bytes = code.len() as u128;
  let contract_storage_cost = NEAR_PER_STORAGE.saturating_mul(contract_bytes);
  // Require a little more since storage cost is not exact
  let minimum_needed = contract_storage_cost.saturating_add(NearToken::from_millinear(100));
  assert!(
      attached >= minimum_needed,
      "Attach at least {minimum_needed} yⓃ"
  );

  let init_args = near_sdk::serde_json::to_vec(&DonationInitArgs { beneficiary }).unwrap();

  let mut promise = Promise::new(subaccount.clone())
      .create_account()
      .transfer(attached)
      .deploy_contract(code)
      .function_call(
          "init".to_owned(),
          init_args,
          NO_DEPOSIT,
          TGAS.saturating_mul(5),
      );
```
From the above code, we can see that the factory contract performs two main actions:

	•	It creates a sub-account
	•	It transfers the attached funds from the user to the sub-account (used to pay the fee for deploying the `donation` contract)
	•	Then it calls the init function of the `donation` contract (which is the deployment initializer function) with the given init_args.

From this, we can infer that deploying any custom contract works in a similar manner.

Example: Deploying a near_drop contract from a factory contract:

	•	Clone the `near_drop` code from: https://github.com/near-examples/near-drop
	•	Build it and obtain the `near_drop.wasm` file
	•	Run the function: `update_stored_contract`

This function deploy `near_drop` contract
```rust
    #[init]
    #[private]
    pub fn new(top_level_account: AccountId) -> Self {
        Self {
            top_level_account,
            next_drop_id: 0,
            drop_id_by_key: LookupMap::new(StorageKey::DropIdByKey),
            drop_by_id: LookupMap::new(StorageKey::DropById),
        }
    }
```
We need change init args and function_call to deploy `near_drop` contract

Add a new Args struct:
```rust
#[derive(Serialize)]
#[serde(crate = "near_sdk::serde")]
struct NearDropInitArgs {
    top_level_account: AccountId,
}
```
And use it like this:
```rust
  let init_args = near_sdk::serde_json::to_vec(&NearDropInitArgs { top_level_account: subaccount.clone() }).unwrap();

  let mut promise = Promise::new(subaccount.clone())
      .create_account()
      .transfer(attached)
      .deploy_contract(code)
      .function_call(
          "new".to_owned(),
          init_args,
          NO_DEPOSIT,
          TGAS.saturating_mul(5),
      );
```

Additionally, you can write a helper function to calculate the minimum amount of NEAR that needs to be attached when deploying a contract:
```rust
  pub fn get_minimum_needed(&self) -> u128 {
    let code = self.code.clone().unwrap();
    let contract_bytes = code.len() as u128;
    let contract_storage_cost = NEAR_PER_STORAGE.saturating_mul(contract_bytes);
    // Require a little more since storage cost is not exact
    let minimum_needed = contract_storage_cost.saturating_add(NearToken::from_millinear(100));
    minimum_needed
  }
```
```bash
# Use near-cli to get the minimum NEAR required to attach
near view <factory-account> get_minimum_needed
```

In summary, to deploy a custom contract from a factory contract, follow these steps:

	1.	Build your smart contract
	2.	Compile it and get the .wasm file
	3.	Update the contract code in the factory
	4.	Modify the init args and deployment logic to fit the custom contract

:::note Versioning for this article

At the time of this writing, this example works with the following versions:

- near-cli: `4.0.13`
- node: `18.19.1`
- rustc: `1.77.0`

:::
