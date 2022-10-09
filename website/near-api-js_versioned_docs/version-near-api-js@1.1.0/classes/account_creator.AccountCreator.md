---
id: "account_creator.AccountCreator"
title: "Class: AccountCreator"
sidebar_label: "AccountCreator"
custom_edit_url: null
---

[account_creator](../modules/account_creator.md).AccountCreator

Account creator provides an interface for implementations to actually create accounts

## Hierarchy

- **`AccountCreator`**

  ↳ [`LocalAccountCreator`](account_creator.LocalAccountCreator.md)

  ↳ [`UrlAccountCreator`](account_creator.UrlAccountCreator.md)

## Constructors

### constructor

**new AccountCreator**()

## Methods

### createAccount

`Abstract` **createAccount**(`newAccountId`, `publicKey`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `newAccountId` | `string` |
| `publicKey` | [`PublicKey`](utils_key_pair.PublicKey.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[account_creator.ts:11](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account_creator.ts#L11)
