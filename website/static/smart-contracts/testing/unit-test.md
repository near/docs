---
id: unit-test
title: Unit Testing
#sidebar_label: 🧫 Unit Testing
---

Unit tests allow you to test the contract methods individually. They are suitable to check the storage is updated correctly, and that methods return their expected values. They are written in the contract's language and execute locally.

If you used one of our [examples](https://github.com/near-examples/docs-examples) as template, then you simply need to navigate to the contract's folder, and use `yarn test`. In case you didn't, then we recommend you copy the necessary node files (e.g. `package.json`) from one of our templates.

:::tip
You can run `yarn test` from the root folder of each project to run both unit and [integration](integration-test.md) tests.
:::

---

## Snippet I: Testing a Counter

The tests in the [Counter Example](https://github.com/near-examples/counters) rely on basic functions to check that the `increment`, `decrement`, and `reset` methods work properly.

<CodeTabs>
  <Language value="rust" language="rust">
    ```
    #[test]
    fn increment() {
        // instantiate a contract variable with the counter at zero
        let mut contract = Counter { val: 0 };
        contract.increment(None);
        assert_eq!(1, contract.get_num());
    }

    #[test]
    fn increment_with_points() {
        // instantiate a contract variable with the counter at zero
        let mut contract = Counter { val: 0 };
        contract.increment(Some(10));
        assert_eq!(10, contract.get_num());
    }

    #[test]
    fn decrement() {
        let mut contract = Counter { val: 0 };
        contract.decrement(None);
        assert_eq!(-1, contract.get_num());
    }

```
    ```
[dev-dependencies]
near-sdk = { version = "5.1.0", features = ["unit-testing"] }
near-workspaces = { version = "0.16.0", features = ["unstable"] }
```
  </Language>
</CodeTabs>

---

## Snippet II: Modifying the Context

While doing unit testing you can modify the [Environment variables](../anatomy/environment.md) through the `VMContextBuilder`. This will enable you to, for example, simulate calls from different users, with specific attached deposit and GAS. Here we present a snippet on how we test the `donate` method from our [Donation Example](https://github.com/near-examples/donation-examples) by manipulating the `predecessor` and `attached_deposit`.

<CodeTabs>
  <Language value="rust" language="rust">
    ```
    #[test]
    fn donate() {
        let mut contract = Contract::init(BENEFICIARY.parse().unwrap());

        // Make a donation
        set_context("donor_a", ONE_NEAR);
        contract.donate();
        let first_donation = contract.get_donation_for_account("donor_a".parse().unwrap());

        // Check the donation was recorded correctly
        assert_eq!(
            u128::from(first_donation.total_amount),
            ONE_NEAR.as_yoctonear()
        );

        // Make another donation
        set_context("donor_b", ONE_NEAR.saturating_mul(2));
        contract.donate();
        let second_donation = contract.get_donation_for_account("donor_b".parse().unwrap());

        // Check the donation was recorded correctly
        assert_eq!(
            u128::from(second_donation.total_amount),
            ONE_NEAR.saturating_mul(2).as_yoctonear()
        );

        // User A makes another donation on top of their original
        set_context("donor_a", ONE_NEAR);
        contract.donate();
        let first_donation = contract.get_donation_for_account("donor_a".parse().unwrap());

        // Check the donation was recorded correctly
        assert_eq!(
            u128::from(first_donation.total_amount),
            ONE_NEAR.saturating_mul(2).as_yoctonear()
        );

        assert_eq!(u64::from(contract.number_of_donors()), 2);
    }

    // Auxiliar fn: create a mock context
    fn set_context(predecessor: &str, amount: NearToken) {
        let mut builder = VMContextBuilder::new();
        builder.predecessor_account_id(predecessor.parse().unwrap());
        builder.attached_deposit(amount);

        testing_env!(builder.build());
    }
}
```
    ```
[dev-dependencies]
near-sdk = { version = "5.7.0", features = ["unit-testing"] }
near-workspaces = { version = "0.16.0", features = ["unstable"] }
```
  </Language>
</CodeTabs>

---

## ⚠️ Limitations

Unit tests are useful to check for code integrity, and detect basic errors on isolated methods. However, since unit tests do not run on a blockchain, there are many things which they cannot detect. Unit tests are not suitable for:

- Testing [gas](../anatomy/environment.md) and [storage](../anatomy/storage.md) usage
- Testing [transfers](../anatomy/actions.md)
- Testing [cross-contract calls](../anatomy/crosscontract.md)
- Testing complex interactions, i.e. multiple users depositing money on the contract

For all these cases it is necessary to **complement** unit tests with [integration tests](integration-test.md).
