---
id: "UnorderedSet"
title: "Class: UnorderedSet<DataType>"
sidebar_label: "UnorderedSet"
sidebar_position: 0
custom_edit_url: null
---

An unordered set that stores data in NEAR storage.

## Type parameters

| Name |
| :------ |
| `DataType` |

## Constructors

### constructor

• **new UnorderedSet**<`DataType`\>(`prefix`)

#### Type parameters

| Name |
| :------ |
| `DataType` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` | The byte prefix to use when storing elements inside this collection. |

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/unordered-set.ts:35](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/unordered-set.ts#L35)

## Properties

### \_elements

• `Readonly` **\_elements**: [`Vector`](Vector.md)<`DataType`\>

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/unordered-set.ts:30](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/unordered-set.ts#L30)

___

### elementIndexPrefix

• `Readonly` **elementIndexPrefix**: `string`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/unordered-set.ts:29](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/unordered-set.ts#L29)

___

### prefix

• `Readonly` **prefix**: `string`

The byte prefix to use when storing elements inside this collection.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/unordered-set.ts:35](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/unordered-set.ts#L35)

## Accessors

### length

• `get` **length**(): `number`

The number of elements stored in the collection.

#### Returns

`number`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/unordered-set.ts:43](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/unordered-set.ts#L43)

## Methods

### [iterator]

▸ **[iterator]**(): [`VectorIterator`](VectorIterator.md)<`DataType`\>

#### Returns

[`VectorIterator`](VectorIterator.md)<`DataType`\>

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/unordered-set.ts:157](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/unordered-set.ts#L157)

___

### clear

▸ **clear**(`options?`): `void`

Remove all of the elements stored within the collection.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Pick`<`GetOptions`<`DataType`\>, ``"serializer"``\> |

#### Returns

`void`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/unordered-set.ts:147](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/unordered-set.ts#L147)

___

### contains

▸ **contains**(`element`, `options?`): `boolean`

Checks whether the collection contains the value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | `DataType` | The value for which to check the presence. |
| `options?` | `Pick`<`GetOptions`<`DataType`\>, ``"serializer"``\> | Options for storing data. |

#### Returns

`boolean`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/unordered-set.ts:60](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/unordered-set.ts#L60)

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

[near-sdk-js/packages/near-sdk-js/src/collections/unordered-set.ts:166](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/unordered-set.ts#L166)

___

### elements

▸ **elements**(`«destructured»`): `DataType`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `limit?` | `number` |
| › `options?` | `GetOptions`<`DataType`\> |
| › `start?` | `number` |

#### Returns

`DataType`[]

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/unordered-set.ts:230](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/unordered-set.ts#L230)

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

[near-sdk-js/packages/near-sdk-js/src/collections/unordered-set.ts:196](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/unordered-set.ts#L196)

___

### isEmpty

▸ **isEmpty**(): `boolean`

Checks whether the collection is empty.

#### Returns

`boolean`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/unordered-set.ts:50](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/unordered-set.ts#L50)

___

### remove

▸ **remove**(`element`, `options?`): `boolean`

Returns true if the element was present in the set.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | `DataType` | The entry to remove. |
| `options?` | `GetOptions`<`DataType`\> | Options for retrieving and storing data. |

#### Returns

`boolean`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/unordered-set.ts:101](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/unordered-set.ts#L101)

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

[near-sdk-js/packages/near-sdk-js/src/collections/unordered-set.ts:207](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/unordered-set.ts#L207)

___

### set

▸ **set**(`element`, `options?`): `boolean`

If the set did not have this value present, `true` is returned.
If the set did have this value present, `false` is returned.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | `DataType` | The value to store in the collection. |
| `options?` | `Pick`<`GetOptions`<`DataType`\>, ``"serializer"``\> | Options for storing the data. |

#### Returns

`boolean`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/unordered-set.ts:76](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/unordered-set.ts#L76)

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

[near-sdk-js/packages/near-sdk-js/src/collections/unordered-set.ts:179](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/unordered-set.ts#L179)

___

### reconstruct

▸ `Static` **reconstruct**<`DataType`\>(`data`): [`UnorderedSet`](UnorderedSet.md)<`DataType`\>

Converts the deserialized data from storage to a JavaScript instance of the collection.

#### Type parameters

| Name |
| :------ |
| `DataType` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`UnorderedSet`](UnorderedSet.md)<`DataType`\> | The deserialized data to create an instance from. |

#### Returns

[`UnorderedSet`](UnorderedSet.md)<`DataType`\>

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/unordered-set.ts:216](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/unordered-set.ts#L216)
