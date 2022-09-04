---
id: "transaction.SignedTransaction"
title: "Class: SignedTransaction"
sidebar_label: "SignedTransaction"
custom_edit_url: null
---

[transaction](../modules/transaction.md).SignedTransaction

## Hierarchy

- `Assignable`

  ↳ **`SignedTransaction`**

## Constructors

### constructor

**new SignedTransaction**(`properties`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `properties` | `any` |

#### Inherited from

Assignable.constructor

#### Defined in

[utils/enums.ts:17](https://github.com/maxhr/near--near-api-js/blob/d8efa7d5/packages/near-api-js/src/utils/enums.ts#L17)

## Properties

### signature

 **signature**: [`Signature`](transaction.Signature.md)

#### Defined in

[transaction.ts:122](https://github.com/maxhr/near--near-api-js/blob/d8efa7d5/packages/near-api-js/src/transaction.ts#L122)

___

### transaction

 **transaction**: [`Transaction`](transaction.Transaction.md)

#### Defined in

[transaction.ts:121](https://github.com/maxhr/near--near-api-js/blob/d8efa7d5/packages/near-api-js/src/transaction.ts#L121)

## Methods

### encode

**encode**(): `Uint8Array`

#### Returns

`Uint8Array`

#### Defined in

[transaction.ts:124](https://github.com/maxhr/near--near-api-js/blob/d8efa7d5/packages/near-api-js/src/transaction.ts#L124)

___

### decode

`Static` **decode**(`bytes`): [`SignedTransaction`](transaction.SignedTransaction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `bytes` | `Buffer` |

#### Returns

[`SignedTransaction`](transaction.SignedTransaction.md)

#### Defined in

[transaction.ts:128](https://github.com/maxhr/near--near-api-js/blob/d8efa7d5/packages/near-api-js/src/transaction.ts#L128)
