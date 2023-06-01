---
id: "UnorderedMap"
title: "Class: UnorderedMap<DataType>"
sidebar_label: "UnorderedMap"
sidebar_position: 0
custom_edit_url: null
---

An unordered map that stores data in NEAR storage.

## Type parameters

| Name |
| :------ |
| `DataType` |

## Constructors

### constructor

• **new UnorderedMap**<`DataType`\>(`prefix`)

#### Type parameters

| Name |
| :------ |
| `DataType` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The byte prefix to use when storing elements inside this collection. |

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/unordered-map.ts:26](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/unordered-map.ts#L26)

## Properties

### \_keys

• `Readonly` **\_keys**: [`Vector`](Vector.md)<`string`\>

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/unordered-map.ts:20](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/unordered-map.ts#L20)

___

### prefix

• `Readonly` **prefix**: `string`

The byte prefix to use when storing elements inside this collection.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/unordered-map.ts:26](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/unordered-map.ts#L26)

___

### values

• `Readonly` **values**: [`LookupMap`](LookupMap.md)<`ValueAndIndex`\>

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/unordered-map.ts:21](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/unordered-map.ts#L21)

## Accessors

### length

• `get` **length**(): `number`

The number of elements stored in the collection.

#### Returns

`number`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/unordered-map.ts:34](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/unordered-map.ts#L34)

## Methods

### [iterator]

▸ **[iterator]**(): `UnorderedMapIterator`<`DataType`\>

#### Returns

`UnorderedMapIterator`<`DataType`\>

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/unordered-map.ts:142](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/unordered-map.ts#L142)

___

### clear

▸ **clear**(): `void`

Remove all of the elements stored within the collection.

#### Returns

`void`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/unordered-map.ts:133](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/unordered-map.ts#L133)

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
| `[iterator]` | () => `UnorderedMapIterator`<`DataType`\> |

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/unordered-map.ts:151](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/unordered-map.ts#L151)

___

### extend

▸ **extend**(`keyValuePairs`): `void`

Extends the current collection with the passed in array of key-value pairs.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keyValuePairs` | [`string`, `DataType`][] | The key-value pairs to extend the collection with. |

#### Returns

`void`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/unordered-map.ts:181](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/unordered-map.ts#L181)

___

### get

▸ **get**(`key`, `options?`): `DataType`

Get the data stored at the provided key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The key at which to look for the data. |
| `options?` | `Omit`<`GetOptions`<`DataType`\>, ``"serializer"``\> | Options for retrieving the data. |

#### Returns

`DataType`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/unordered-map.ts:51](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/unordered-map.ts#L51)

___

### isEmpty

▸ **isEmpty**(): `boolean`

Checks whether the collection is empty.

#### Returns

`boolean`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/unordered-map.ts:41](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/unordered-map.ts#L41)

___

### keys

▸ **keys**(`«destructured»`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |

#### Returns

`string`[]

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/unordered-map.ts:217](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/unordered-map.ts#L217)

___

### remove

▸ **remove**(`key`, `options?`): `DataType`

Removes and retrieves the element with the provided key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The key at which to remove data. |
| `options?` | `Omit`<`GetOptions`<`DataType`\>, ``"serializer"``\> | Options for retrieving the data. |

#### Returns

`DataType`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/unordered-map.ts:102](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/unordered-map.ts#L102)

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

[near-sdk-js/packages/near-sdk-js/src/collections/unordered-map.ts:192](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/unordered-map.ts#L192)

___

### set

▸ **set**(`key`, `value`, `options?`): `DataType`

Store a new value at the provided key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The key at which to store in the collection. |
| `value` | `DataType` | The value to store in the collection. |
| `options?` | `GetOptions`<`DataType`\> | Options for retrieving and storing the data. |

#### Returns

`DataType`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/unordered-map.ts:73](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/unordered-map.ts#L73)

___

### toArray

▸ **toArray**(`options?`): [`string`, `DataType`][]

Return a JavaScript array of the data stored within the collection.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | `GetOptions`<`DataType`\> | Options for retrieving and storing the data. |

#### Returns

[`string`, `DataType`][]

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/unordered-map.ts:164](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/unordered-map.ts#L164)

___

### reconstruct

▸ `Static` **reconstruct**<`DataType`\>(`data`): [`UnorderedMap`](UnorderedMap.md)<`DataType`\>

Converts the deserialized data from storage to a JavaScript instance of the collection.

#### Type parameters

| Name |
| :------ |
| `DataType` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`UnorderedMap`](UnorderedMap.md)<`DataType`\> | The deserialized data to create an instance from. |

#### Returns

[`UnorderedMap`](UnorderedMap.md)<`DataType`\>

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/unordered-map.ts:201](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/unordered-map.ts#L201)
