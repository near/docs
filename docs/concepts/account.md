---
id: account
title: Account
sidebar_label: Account
---


NEAR uses readable account IDs instead of a hash of a public key. Summarising, account IDs are similar to a username and work like domains. For example, only account "alice" can create a sub-account like "app.alice", and now only "app.alice" can create "beta.app.alice".

## Rules
Account IDs have a minimum length of 2 characters. NEAR charges recurrent tax from the account balance for short account IDs with an exponentially decreasing rate based on length. IDs with length more than 10 characters don't pay any tax. This is necessary to avoid squatting short account names.

## Did you know?
Because we use Account ID instead of a hash, we can have multiple public keys per account. We call them Access Keys. An Access Key grants permissions to act on behalf of an account. There are currently 2 types of permissions with room for more: full-permission and function-call limited permission.

Function call permission of access keys is the most powerful usability feature of NEAR. It enables sending non-monetary function-call transactions from the owner's account to the receiver. The receiver ID is restricted by the access key. This enables multiple use-cases including:

1. Authorize front-end web applications without trusting the contract code or the web app itself. This is done by creating a new access key on your account and pointing it towards the contract of the web-app. This can be done through the web wallet.  This use case is demonstrated by the first example (NEAR Wallet integration) available now in [NEAR Studio](http://near.dev).

2. Allow a new user _without an account_ to use your dApp and your contract on-chain. The back-end creates a new access key for the user on the contract's account and points it towards the contract itself. Now the user can immediately use the web app without going through any wallet.

3. Limited access for the account. An account has a contract and only function-call access keys (no full-permission keys). Only the contract can initiate transactions from this account. It can be a multi-sig, a lockup contract, a delayed withdrawals or [@argentHQ](https://twitter.com/argenthq) guardians.

4. Proxy based blockchain access. It's like [@ATT](https://twitter.com/att) for blockchain. A user may be paying a monthly service fee instead of paying per transaction. Multiple options are possible.

All data for a single account is collocated on one shard. The account data consists of the following:

- Balance
- Locked balance (for staking)
- Code of the contract
- Key-value storage of the contract. Stored in a ordered trie
- Access Keys
- Postponed `ActionReceipts`
- Received `DataReceipts`


<blockquote class="info">
<strong>did you know?</strong><br><br>

The authoritative technical reference on NEAR accounts is here: https://nomicon.io/DataStructures/Account.html

</blockquote>


## Compared to Ethereum

If you're familiar with development on Ethereum, it's worth making a quick note about how accounts are different.  The image below summarizes some key differences.

![Ethereum vs NEAR accounts](/docs/assets/accounts-compare-ethereum-v-near.png)

*source: medium.com/@clinder*

## Accounts and Contracts

Each NEAR account can only hold 1 smart contract.  For applications where users should be able to organize multiple contracts you can create "sub-accounts" whose "master account" is the user account.  The format of a sub account would include a dot in the name like `contract1.user-A-account`, `contract2.user-A-account`, etc.  NEAR restricts the creation of accounts with a dot in the name such that these accounts can only by created by `user-A-account`, as if the user account is a top-level domain like `your-company.com` if you're familiar with this model.

Using NEAR Shell you could deploy new contracts to your account like this:

```bash
near deploy --contractName contract1.your-account --masterAccount your-account --wasmFile path/to/contract1.wasm
```
