---
id: "account_creator.UrlAccountCreator"
title: "Class: UrlAccountCreator"
sidebar_label: "UrlAccountCreator"
custom_edit_url: null
---

[account_creator](../modules/account_creator.md).UrlAccountCreator

Account creator provides an interface for implementations to actually create accounts

## Hierarchy

- [`AccountCreator`](account_creator.AccountCreator.md)

  ↳ **`UrlAccountCreator`**

## Constructors

### constructor

**new UrlAccountCreator**(`connection`, `helperUrl`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | [`Connection`](connection.Connection.md) |
| `helperUrl` | `string` |

#### Overrides

[AccountCreator](account_creator.AccountCreator.md).[constructor](account_creator.AccountCreator.md#constructor)

#### Defined in

[account_creator.ts:39](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account_creator.ts#L39)

## Properties

### connection

 `Readonly` **connection**: [`Connection`](connection.Connection.md)

#### Defined in

[account_creator.ts:36](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account_creator.ts#L36)

___

### helperUrl

 `Readonly` **helperUrl**: `string`

#### Defined in

[account_creator.ts:37](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account_creator.ts#L37)

## Methods

### createAccount

**createAccount**(`newAccountId`, `publicKey`): `Promise`<`void`\>

Creates an account using a helperUrl
This is [hosted here](https://helper.nearprotocol.com) or set up locally with the [near-contract-helper](https://github.com/nearprotocol/near-contract-helper) repository

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

[account_creator.ts:52](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account_creator.ts#L52)
