---
id: "transaction.Transaction"
title: "Class: Transaction"
sidebar_label: "Transaction"
custom_edit_url: null
---

[transaction](../modules/transaction.md).Transaction

## Hierarchy

- `Assignable`

  ↳ **`Transaction`**

## Constructors

### constructor

**new Transaction**(`properties`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `properties` | `any` |

#### Inherited from

Assignable.constructor

#### Defined in

[utils/enums.ts:17](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/utils/enums.ts#L17)

## Properties

### actions

 **actions**: [`Action`](transaction.Action.md)[]

#### Defined in

[transaction.ts:107](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/transaction.ts#L107)

___

### blockHash

 **blockHash**: `Uint8Array`

#### Defined in

[transaction.ts:108](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/transaction.ts#L108)

___

### nonce

 **nonce**: `BN`

#### Defined in

[transaction.ts:105](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/transaction.ts#L105)

___

### publicKey

 **publicKey**: [`PublicKey`](utils_key_pair.PublicKey.md)

#### Defined in

[transaction.ts:104](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/transaction.ts#L104)

___

### receiverId

 **receiverId**: `string`

#### Defined in

[transaction.ts:106](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/transaction.ts#L106)

___

### signerId

 **signerId**: `string`

#### Defined in

[transaction.ts:103](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/transaction.ts#L103)

## Methods

### encode

**encode**(): `Uint8Array`

#### Returns

`Uint8Array`

#### Defined in

[transaction.ts:110](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/transaction.ts#L110)

___

### decode

`Static` **decode**(`bytes`): [`Transaction`](transaction.Transaction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `bytes` | `Buffer` |

#### Returns

[`Transaction`](transaction.Transaction.md)

#### Defined in

[transaction.ts:114](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/transaction.ts#L114)
