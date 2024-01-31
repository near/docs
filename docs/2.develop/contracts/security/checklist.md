---
id: checklist
title: ✅ Checklist
---

Once you finished developing your smart contract please go through the following list in order to ensure everything is safe for the end user.

:::info
Check our [security articles](/develop/contracts/security/welcome) to understand how to improve the security of your contract.
:::

---

## Anatomy
1. All private methods are decorated as `private`.

## Environment
2. `predecessor` and `signer` are used correctly through the entire contract.

## Storage
3. Each time the state grows it is ensured that there is enough balance to cover it
4. All collections (i.e. Vector, Map, Tree, etc) have an unique id
5. Check for underflow and overflow!. In rust, you can do this by simply adding the `overflow-checks = true` flag in your `Cargo.toml`.

## Actions
6. When sending money, you leave enough in the contract to cover the storage cost
7. If you are tracking user's fund, you **deduct them before** sending them back to the user. 

## Callbacks
8. All private callbacks are marked as `private`
9. All cross-contract calls have a callback that checks for errors and rolls back the state if necessary
10. All cross-contract calls have a callback that checks for errors and returns money to the `predecessor` if necessary
11. All the callbacks are given enough GAS to execute entirely
12. The contract is not left in a exploitable state between a cross-contract call and its callback