---
id: "near.Near"
title: "Class: Near"
sidebar_label: "Near"
custom_edit_url: null
---

[near](../modules/near.md).Near

This is the main class developers should use to interact with NEAR.

**`Example`**

```js
const near = new Near(config);
```

## Constructors

### constructor

**new Near**(`config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`NearConfig`](../interfaces/near.NearConfig.md) |

#### Defined in

[near.ts:84](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/near.ts#L84)

## Properties

### accountCreator

 `Readonly` **accountCreator**: [`AccountCreator`](account_creator.AccountCreator.md)

#### Defined in

[near.ts:82](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/near.ts#L82)

___

### config

 `Readonly` **config**: `any`

#### Defined in

[near.ts:80](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/near.ts#L80)

___

### connection

 `Readonly` **connection**: [`Connection`](connection.Connection.md)

#### Defined in

[near.ts:81](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/near.ts#L81)

## Methods

### account

**account**(`accountId`): `Promise`<[`Account`](account.Account.md)\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `accountId` | `string` | near accountId used to interact with the network. |

#### Returns

`Promise`<[`Account`](account.Account.md)\>

#### Defined in

[near.ts:108](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/near.ts#L108)

___

### createAccount

**createAccount**(`accountId`, `publicKey`): `Promise`<[`Account`](account.Account.md)\>

Create an account using the [AccountCreator](account_creator.AccountCreator.md). Either:
* using a masterAccount with [LocalAccountCreator](account_creator.LocalAccountCreator.md)
* using the helperUrl with [UrlAccountCreator](account_creator.UrlAccountCreator.md)

**`See`**

[masterAccount](../interfaces/near.NearConfig.md#masteraccount) and [helperUrl](../interfaces/near.NearConfig.md#helperurl)

#### Parameters

| Name | Type |
| :------ | :------ |
| `accountId` | `string` |
| `publicKey` | [`PublicKey`](utils_key_pair.PublicKey.md) |

#### Returns

`Promise`<[`Account`](account.Account.md)\>

#### Defined in

[near.ts:122](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/near.ts#L122)
