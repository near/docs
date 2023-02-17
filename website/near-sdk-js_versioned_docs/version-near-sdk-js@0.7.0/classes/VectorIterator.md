---
id: "VectorIterator"
title: "Class: VectorIterator<DataType>"
sidebar_label: "VectorIterator"
sidebar_position: 0
custom_edit_url: null
---

An iterator for the Vector collection.

## Type parameters

| Name |
| :------ |
| `DataType` |

## Constructors

### constructor

• **new VectorIterator**<`DataType`\>(`vector`, `options?`)

#### Type parameters

| Name |
| :------ |
| `DataType` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vector` | [`Vector`](Vector.md)<`DataType`\> | The vector collection to create an iterator for. |
| `options?` | `GetOptions`<`DataType`\> | Options for retrieving and storing data. |

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/vector.ts:246](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/vector.ts#L246)

## Properties

### current

• `Private` **current**: `number` = `0`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/vector.ts:240](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/vector.ts#L240)

___

### options

• `Private` `Optional` `Readonly` **options**: `GetOptions`<`DataType`\>

Options for retrieving and storing data.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/vector.ts:248](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/vector.ts#L248)

___

### vector

• `Private` **vector**: [`Vector`](Vector.md)<`DataType`\>

The vector collection to create an iterator for.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/vector.ts:247](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/vector.ts#L247)

## Methods

### next

▸ **next**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `done` | `boolean` |
| `value` | `DataType` |

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/vector.ts:251](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/vector.ts#L251)
