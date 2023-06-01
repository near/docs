---
id: "Vector"
title: "Class: Vector<DataType>"
sidebar_label: "Vector"
sidebar_position: 0
custom_edit_url: null
---

An iterable implementation of vector that stores its content on the trie.
Uses the following map: index -> element

## Type parameters

| Name |
| :------ |
| `DataType` |

## Constructors

### constructor

• **new Vector**<`DataType`\>(`prefix`, `length?`)

#### Type parameters

| Name |
| :------ |
| `DataType` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `prefix` | `string` | `undefined` | The byte prefix to use when storing elements inside this collection. |
| `length` | `number` | `0` | The initial length of the collection. By default 0. |

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/vector.ts:30](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/vector.ts#L30)

## Properties

### length

• **length**: `number` = `0`

The initial length of the collection. By default 0.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/vector.ts:30](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/vector.ts#L30)

___

### prefix

• `Readonly` **prefix**: `string`

The byte prefix to use when storing elements inside this collection.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/vector.ts:30](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/vector.ts#L30)

## Methods

### [iterator]

▸ **[iterator]**(): [`VectorIterator`](VectorIterator.md)<`DataType`\>

#### Returns

[`VectorIterator`](VectorIterator.md)<`DataType`\>

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/vector.ts:169](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/vector.ts#L169)

___

### clear

▸ **clear**(): `void`

Remove all of the elements stored within the collection.

#### Returns

`void`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/vector.ts:206](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/vector.ts#L206)

___

### createIteratorWithOptions

▸ `Private` **createIteratorWithOptions**(`options?`): `Object`

Create a iterator on top of the default collection iterator using custom options.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | `GetOptions`<`DataType`\> | Options for retrieving and storing the data. |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `[iterator]` | () => [`VectorIterator`](VectorIterator.md)<`DataType`\> |

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/vector.ts:178](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/vector.ts#L178)

___

### extend

▸ **extend**(`elements`): `void`

Extends the current collection with the passed in array of elements.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `elements` | `DataType`[] | The elements to extend the collection with. |

#### Returns

`void`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/vector.ts:163](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/vector.ts#L163)

___

### get

▸ **get**(`index`, `options?`): `DataType`

Get the data stored at the provided index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index at which to look for the data. |
| `options?` | `Omit`<`GetOptions`<`DataType`\>, ``"serializer"``\> | Options for retrieving the data. |

#### Returns

`DataType`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/vector.ts:45](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/vector.ts#L45)

___

### isEmpty

▸ **isEmpty**(): `boolean`

Checks whether the collection is empty.

#### Returns

`boolean`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/vector.ts:35](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/vector.ts#L35)

___

### pop

▸ **pop**(`options?`): `DataType`

Removes and retrieves the element with the highest index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | `Omit`<`GetOptions`<`DataType`\>, ``"serializer"``\> | Options for retrieving the data. |

#### Returns

`DataType`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/vector.ts:114](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/vector.ts#L114)

___

### push

▸ **push**(`element`, `options?`): `void`

Adds data to the collection.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | `DataType` | The data to store. |
| `options?` | `Pick`<`GetOptions`<`DataType`\>, ``"serializer"``\> | Options for storing the data. |

#### Returns

`void`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/vector.ts:96](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/vector.ts#L96)

___

### replace

▸ **replace**(`index`, `element`, `options?`): `DataType`

Replaces the data stored at the provided index with the provided data and returns the previously stored data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index at which to replace the data. |
| `element` | `DataType` | The data to replace with. |
| `options?` | `GetOptions`<`DataType`\> | Options for retrieving and storing the data. |

#### Returns

`DataType`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/vector.ts:137](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/vector.ts#L137)

___

### serialize

▸ **serialize**(`options?`): `Uint8Array`

Serialize the collection.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | `Pick`<`GetOptions`<`DataType`\>, ``"serializer"``\> | Options for storing the data. |

#### Returns

`Uint8Array`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/vector.ts:220](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/vector.ts#L220)

___

### swapRemove

▸ **swapRemove**(`index`, `options?`): `DataType`

Removes an element from the vector and returns it in serialized form.
The removed element is replaced by the last element of the vector.
Does not preserve ordering, but is `O(1)`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index at which to remove the element. |
| `options?` | `GetOptions`<`DataType`\> | Options for retrieving and storing the data. |

#### Returns

`DataType`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/vector.ts:67](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/vector.ts#L67)

___

### toArray

▸ **toArray**(`options?`): `DataType`[]

Return a JavaScript array of the data stored within the collection.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | `GetOptions`<`DataType`\> | Options for retrieving and storing the data. |

#### Returns

`DataType`[]

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/vector.ts:191](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/vector.ts#L191)

___

### reconstruct

▸ `Static` **reconstruct**<`DataType`\>(`data`): [`Vector`](Vector.md)<`DataType`\>

Converts the deserialized data from storage to a JavaScript instance of the collection.

#### Type parameters

| Name |
| :------ |
| `DataType` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`Vector`](Vector.md)<`DataType`\> | The deserialized data to create an instance from. |

#### Returns

[`Vector`](Vector.md)<`DataType`\>

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/vector.ts:229](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/vector.ts#L229)
