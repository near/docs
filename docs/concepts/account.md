---
id: account
title: Account
sidebar_label: Account
---


NEAR uses readable account IDs instead of a hash of a public key.

## Account ID Rules

- minimum length is 2
- maximum length is 64
- `Account ID` consists of `Account ID parts` separated by `.`
- `Account ID part` consists of lowercase alphanumeric symbols separated by either `_` or `-`.

Account names are similar to a domain names. Anyone can create a top level account (TLA) without separators, e.g. `near`. Only `near` can create `alice.near`. And only `alice.near` can create `app.alice.near` and so on. Note, `near` can NOT create `app.alice.near` directly.

Regex for a full account ID, without checking for length: `^(([a-z\d]+[\-_])*[a-z\d]+\.)*([a-z\d]+[\-_])*[a-z\d]+$`


## Top Level Accounts

Top level account names (TLAs) are very valuable as they provide root of trust and discoverability for companies, applications and users. To allow for fair access to them, the top level account names that are shorter than `MIN_ALLOWED_TOP_LEVEL_ACCOUNT_LENGTH` characters (32 at time of writing) will be auctioned off.

Specifically, only `REGISTRAR_ACCOUNT_ID` account can create new top level accounts that are shorter than `MIN_ALLOWED_TOP_LEVEL_ACCOUNT_LENGTH` characters. `REGISTRAR_ACCOUNT_ID` implements a standard `Account Naming` interface which allow it to create new accounts.

We are not going to deploy the `registrar` auction at launch. Instead we will allow it to be deployed by the Near Foundation at some point in the future.

## Access Keys

Because we use Account ID instead of a hash, we can have multiple public keys per account. We call them Access Keys. An Access Key grants permissions to act on behalf of an account. There are currently 2 types of permissions with room for more: full-permission and function-call limited permission.

Function call permission of access keys is the most powerful usability feature of NEAR. It enables sending non-monetary function-call transactions from the owner's account to the receiver. The receiver ID is restricted by the access key. This enables multiple use-cases including:

1. Authorize front-end web applications without trusting the contract code or the web app itself. This is done by creating a new access key on your account and pointing it towards the contract of the web-app. This can be done through the web wallet.  This use case is demonstrated by the first example (NEAR Wallet integration) available now in [examples](http://near.dev) <img src="../assets/icon-link.png" alt="^" style="display: inline; width: 0.8rem;"/> .

2. Allow a new user _without an account_ to use your dApp and your contract on-chain. The back-end creates a new access key for the user on the contract's account and points it towards the contract itself. Now the user can immediately use the web app without going through any wallet.

3. Limited access for the account. An account has a contract and only function-call access keys (no full-permission keys). Only the contract can initiate transactions from this account. It can be a multi-sig, a lockup contract, a delayed withdrawals or [@argentHQ](https://twitter.com/argenthq) <img src="../assets/icon-link.png" alt="^" style="display: inline; width: 0.8rem;"/> guardians.

4. Proxy based blockchain access. It's like [@ATT](https://twitter.com/att) <img src="../assets/icon-link.png" alt="^" style="display: inline; width: 0.8rem;"/> for blockchain. A user may be paying a monthly service fee instead of paying per transaction. Multiple options are possible.

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

The authoritative technical reference on NEAR accounts is here: https://nomicon.io/DataStructures/Account.html  <img src="../assets/icon-link.png" alt="^" style="display: inline; width: 0.8rem;"/>

</blockquote>


## Compared to Ethereum

If you're familiar with development on Ethereum, it's worth making a quick note about how accounts are different.  The image below summarizes some key differences.

![Ethereum vs NEAR accounts](/docs/assets/accounts-compare-ethereum-v-near.png)

*image source: medium.com/@clinder  <img src="../assets/icon-link.png" alt="^" style="display: inline; width: 0.8rem;"/>*

## Accounts and Contracts

Each NEAR account can only hold 1 smart contract.  For applications where users should be able to organize multiple contracts you can create "sub-accounts" whose "master account" is the user account.  The format of a sub account would include a dot in the name like `contract1.user-A-account`, `contract2.user-A-account`, etc.  NEAR restricts the creation of accounts with a dot in the name such that these accounts can only by created by `user-A-account`, as if the user account is a top-level domain like `your-company.com` if you're familiar with this model.

Using NEAR Shell you could deploy new contracts to your account like this:

```bash
near deploy --wasm-file path/to/contract.wasm --account-id contractAccount.developerAccount.testnet --master-account yourAccount.testnet
```

Note for this to work you will need to login with NEAR Shell and authorize it to use the master account (`yourAccount.testnet`) on your behalf.  Learn more about [NEAR Shell here](/docs/development/near-shell)
