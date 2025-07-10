---
id: factory
title: Factory
---




A factory is a smart contract that stores a compiled contract, and automatizes deploying the stored contract onto new sub-accounts.

We have a [**A Generic Factory**](https://github.com/near-examples/factory-rust) that deploys the [donation contract](./donation.md). This donation contract can be changed for whichever compiled contract you like (e.g. a fungible token or DAO). 

---

## Overview {#generic-factory}

The factory is a smart contract that:

1. Creates sub-accounts of itself and deploys its contract on them (`create_factory_subaccount_and_deploy`).
2. Can change the stored contract using the `update_stored_contract` method.

<CodeTabs>
  <Language value="rust" language="rust">
    ```
    #[payable]
    pub fn create_factory_subaccount_and_deploy(
        &mut self,
        name: String,
        beneficiary: AccountId,
        public_key: Option<PublicKey>,
    ) -> Promise {
        // Assert the sub-account is valid
        let current_account = env::current_account_id().to_string();
        let subaccount: AccountId = format!("{name}.{current_account}").parse().unwrap();
        assert!(
            env::is_valid_account_id(subaccount.as_bytes()),
            "Invalid subaccount"
        );

        // Assert enough tokens are attached to create the account and deploy the contract
        let attached = env::attached_deposit();

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

        // Add full access key is the user passes one
        if let Some(pk) = public_key {
            promise = promise.add_full_access_key(pk);
        }

        // Add callback
        promise.then(
            Self::ext(env::current_account_id()).create_factory_subaccount_and_deploy_callback(
                subaccount,
                env::predecessor_account_id(),
                attached,
            ),
        )
```
    ```
#[near]
impl Contract {
    #[private]
    pub fn update_stored_contract(&mut self) {
        // This method receives the code to be stored in the contract directly
        // from the contract's input. In this way, it avoids the overhead of
        // deserializing parameters, which would consume a huge amount of GAS
        self.code.set(env::input());
    }

    pub fn get_code(&self) -> &Vec<u8> {
        // If a contract wants to update themselves, they can ask for the code needed
        self.code.get().as_ref().unwrap()
    }
}

```
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

:::note Versioning for this article

At the time of this writing, this example works with the following versions:

- near-cli: `4.0.13`
- node: `18.19.1`
- rustc: `1.77.0`

:::
