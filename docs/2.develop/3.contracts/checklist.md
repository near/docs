---
id: checklist
title: ✅ Checklist
---

Once you finished developing your smart contract please go through the following list in order to ensure everything is safe for the end user.

### Anatomy
1. There are no `private` methods marked as public by mistake

### Environment
2. `predecessor` and `signer` are used correctly through the entire contract

### Storage
3. Each time the state grows it is ensured that there is enough Balance to cover it

### Actions
4. When sending money, you left enough in the contract to cover the storage cost

### Callbacks
5. All private callbacks are marked as `[#private]` in RUST, or `assert` the caller (`predecessor`) is the contract (`current_account`)
6. All cross-contract calls have a callback that checks for errors and rollbacks the state if necessary
7. All cross-contract calls have a callback that checks for errors and returns money to the `predecessor` if necessary
8. All the callbacks are given enough GAS to finish without errors
9. The contract is not left in a exploitable state between a cross-contract call and its callback