---
id: "account_creator.LocalAccountCreator"
title: "Class: LocalAccountCreator"
sidebar_label: "LocalAccountCreator"
custom_edit_url: null
---

[account_creator](../modules/account_creator.md).LocalAccountCreator

Account creator provides an interface for implementations to actually create accounts

## Hierarchy

- [`AccountCreator`](account_creator.AccountCreator.md)

  ↳ **`LocalAccountCreator`**

## Constructors

### constructor

**new LocalAccountCreator**(`masterAccount`, `initialBalance`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `masterAccount` | [`Account`](account.Account.md) |
| `initialBalance` | `BN` |

#### Overrides

[AccountCreator](account_creator.AccountCreator.md).[constructor](account_creator.AccountCreator.md#constructor)

#### Defined in

[account_creator.ts:18](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account_creator.ts#L18)

## Properties

### initialBalance

 `Readonly` **initialBalance**: `BN`

#### Defined in

[account_creator.ts:16](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account_creator.ts#L16)

___

### masterAccount

 `Readonly` **masterAccount**: [`Account`](account.Account.md)

#### Defined in

[account_creator.ts:15](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account_creator.ts#L15)

## Methods

### createAccount

**createAccount**(`newAccountId`, `publicKey`): `Promise`<`void`\>

Creates an account using a masterAccount, meaning the new account is created from an existing account

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `newAccountId` | `string` | The name of the NEAR account to be created |
| `publicKey` | [`PublicKey`](utils_key_pair.PublicKey.md) | The public key from the masterAccount used to create this account |

#### Returns

`Promise`<`void`\>

#### Overrides

[AccountCreator](account_creator.AccountCreator.md).[createAccount](account_creator.AccountCreator.md#createaccount)

#### Defined in

[account_creator.ts:30](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account_creator.ts#L30)
