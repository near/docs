---
id: "LookupSet"
title: "Class: LookupSet<DataType>"
sidebar_label: "LookupSet"
sidebar_position: 0
custom_edit_url: null
---

A lookup set collection that stores entries in NEAR storage.

## Type parameters

| Name |
| :------ |
| `DataType` |

## Constructors

### constructor

• **new LookupSet**<`DataType`\>(`keyPrefix`)

#### Type parameters

| Name |
| :------ |
| `DataType` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keyPrefix` | `string` | The byte prefix to use when storing elements inside this collection. |

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/lookup-set.ts:12](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/lookup-set.ts#L12)

## Properties

### keyPrefix

• `Readonly` **keyPrefix**: `string`

The byte prefix to use when storing elements inside this collection.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/lookup-set.ts:12](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/lookup-set.ts#L12)

## Methods

### contains

▸ **contains**(`key`, `options?`): `boolean`

Checks whether the collection contains the value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `DataType` | The value for which to check the presence. |
| `options?` | `Pick`<`GetOptions`<`DataType`\>, ``"serializer"``\> | Options for storing data. |

#### Returns

`boolean`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/lookup-set.ts:20](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/lookup-set.ts#L20)

___

### extend

▸ **extend**(`keys`, `options?`): `void`

Extends the current collection with the passed in array of elements.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keys` | `DataType`[] | The elements to extend the collection with. |
| `options?` | `Pick`<`GetOptions`<`DataType`\>, ``"serializer"``\> | Options for storing the data. |

#### Returns

`void`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/lookup-set.ts:63](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/lookup-set.ts#L63)

___

### remove

▸ **remove**(`key`, `options?`): `boolean`

Returns true if the element was present in the set.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `DataType` | The entry to remove. |
| `options?` | `Pick`<`GetOptions`<`DataType`\>, ``"serializer"``\> | Options for storing data. |

#### Returns

`boolean`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/lookup-set.ts:34](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/lookup-set.ts#L34)

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

[near-sdk-js/packages/near-sdk-js/src/collections/lookup-set.ts:75](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/lookup-set.ts#L75)

___

### set

▸ **set**(`key`, `options?`): `boolean`

If the set did not have this value present, `true` is returned.
If the set did have this value present, `false` is returned.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `DataType` | The value to store in the collection. |
| `options?` | `Pick`<`GetOptions`<`DataType`\>, ``"serializer"``\> | Options for storing the data. |

#### Returns

`boolean`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/lookup-set.ts:49](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/lookup-set.ts#L49)

___

### reconstruct

▸ `Static` **reconstruct**<`DataType`\>(`data`): [`LookupSet`](LookupSet.md)<`DataType`\>

Converts the deserialized data from storage to a JavaScript instance of the collection.

#### Type parameters

| Name |
| :------ |
| `DataType` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`LookupSet`](LookupSet.md)<`unknown`\> | The deserialized data to create an instance from. |

#### Returns

[`LookupSet`](LookupSet.md)<`DataType`\>

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/lookup-set.ts:84](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/lookup-set.ts#L84)
