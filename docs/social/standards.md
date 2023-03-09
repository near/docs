---
id: standards
title: Standards
---

The data in SocialDB is organized as a simple JSON tree.
The only enforced rule is that the keys in the root are the account IDs that store the data.
This is done on purpose, so the SocialDB contract is not enforcing any structure or a schema.
Otherwise, the contract has to be modified for every schema change.
The control of the contract schemas can lead to the centralization and restrictions.
Instead, Near Social Standards live outside the SocialDB contract.

Currently, [Standards on Github](https://github.com/NearSocial/standards) is the default place for the standards, but this may change in the future.

### Schema description

- **`bold`** means the key is required.
- _`italic`_ means the key is optional.
- `[account_id]` means the dynamic key is an account ID. For example, `alex.near` as a key. It usually used to create some edge towards that account.

### Root schema

Each account should follow the **[Root schema](https://github.com/NearSocial/standards/blob/main/types/Root.md#root)**

