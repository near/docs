---
id: storage
title: Million Small Deposits
---

In NEAR, your contract pays for the storage it uses. This means that, the more data you store, the more balance you need to cover the storage cost. If you don't ask the user to cover the storage used in the contract, then a million little deposits can leave you out of budget.

Let's walk through an example:

1. You launch [a guest book app](https://examples.near.org/guest-book), deploying your app's smart contract to the account `example.near`
2. Visitors to your app can add messages to the guest book. This means your users will pay a small gas fee to send their message to your contract.
3. When such a call comes in, NEAR will check that `example.near` has a large enough balance that it can stake an amount to cover the new storage needs. If it does not, the transaction will fail.

Note that this can create an attack surface. If sending data to your guest book costs users close to nothing while costing the contract owner significantly more, then a malicious user can exploit the imbalance to make maintaining the contract prohibitively expensive.

Take care, then, when designing your smart contracts to ensure that such attacks cost potential attackers more than it would be worth.