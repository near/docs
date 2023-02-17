---
id: "LookupMap"
title: "Class: LookupMap<DataType>"
sidebar_label: "LookupMap"
sidebar_position: 0
custom_edit_url: null
---

A lookup map that stores data in NEAR storage.

## Type parameters

| Name |
| :------ |
| `DataType` |

## Constructors

### constructor

• **new LookupMap**<`DataType`\>(`keyPrefix`)

#### Type parameters

| Name |
| :------ |
| `DataType` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keyPrefix` | `string` | The byte prefix to use when storing elements inside this collection. |

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/lookup-map.ts:16](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/lookup-map.ts#L16)

## Properties

### keyPrefix

• `Readonly` **keyPrefix**: `string`

The byte prefix to use when storing elements inside this collection.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/lookup-map.ts:16](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/lookup-map.ts#L16)

## Methods

### containsKey

▸ **containsKey**(`key`): `boolean`

Checks whether the collection contains the value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The value for which to check the presence. |

#### Returns

`boolean`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/lookup-map.ts:23](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/lookup-map.ts#L23)

___

### extend

▸ **extend**(`keyValuePairs`, `options?`): `void`

Extends the current collection with the passed in array of key-value pairs.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keyValuePairs` | [`string`, `DataType`][] | The key-value pairs to extend the collection with. |
| `options?` | `GetOptions`<`DataType`\> | Options for storing the data. |

#### Returns

`void`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/lookup-map.ts:95](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/lookup-map.ts#L95)

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

[near-sdk-js/packages/near-sdk-js/src/collections/lookup-map.ts:34](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/lookup-map.ts#L34)

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

[near-sdk-js/packages/near-sdk-js/src/collections/lookup-map.ts:50](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/lookup-map.ts#L50)

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

[near-sdk-js/packages/near-sdk-js/src/collections/lookup-map.ts:109](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/lookup-map.ts#L109)

___

### set

▸ **set**(`key`, `newValue`, `options?`): `DataType`

Store a new value at the provided key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The key at which to store in the collection. |
| `newValue` | `DataType` | The value to store in the collection. |
| `options?` | `GetOptions`<`DataType`\> | Options for retrieving and storing the data. |

#### Returns

`DataType`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/lookup-map.ts:72](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/lookup-map.ts#L72)

___

### reconstruct

▸ `Static` **reconstruct**<`DataType`\>(`data`): [`LookupMap`](LookupMap.md)<`DataType`\>

Converts the deserialized data from storage to a JavaScript instance of the collection.

#### Type parameters

| Name |
| :------ |
| `DataType` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`LookupMap`](LookupMap.md)<`unknown`\> | The deserialized data to create an instance from. |

#### Returns

[`LookupMap`](LookupMap.md)<`DataType`\>

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/collections/lookup-map.ts:118](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/collections/lookup-map.ts#L118)
