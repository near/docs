---
id: account
title: Account
sidebar_label: Account
---

NEAR Protocol has an account names system. Account ID is similar to a username.

Data for an single account is collocated in one shard. The account data consists of the following:

- Balance
- Locked balance (for staking)
- Code of the contract
- Key-value storage of the contract. Stored in a ordered trie
- Access Keys
- Postponed `ActionReceipts`
- Received `DataReceipts`

<blockquote class="warning">
<strong>work in progress</strong> <span>add diagram and code</span><br><br>

The current authority on NEAR accounts is here: https://nomicon.io/Primitives/Account.html

</blockquote>
