---
id: "collections_unordered_map.UnorderedMap"
title: "Class: UnorderedMap"
sidebar_label: "UnorderedMap"
custom_edit_url: null
---

[collections/unordered-map](../modules/collections_unordered_map.md).UnorderedMap

## Constructors

### constructor

**new UnorderedMap**(`prefix`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `prefix` | `string` |

#### Defined in

[collections/unordered-map.ts:15](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/unordered-map.ts#L15)

## Properties

### keyIndexPrefix

 `Readonly` **keyIndexPrefix**: `string`

#### Defined in

[collections/unordered-map.ts:11](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/unordered-map.ts#L11)

___

### keys

 `Readonly` **keys**: [`Vector`](collections_vector.Vector.md)

#### Defined in

[collections/unordered-map.ts:12](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/unordered-map.ts#L12)

___

### length

 `Readonly` **length**: `number`

#### Defined in

[collections/unordered-map.ts:9](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/unordered-map.ts#L9)

___

### prefix

 `Readonly` **prefix**: `string`

#### Defined in

[collections/unordered-map.ts:10](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/unordered-map.ts#L10)

___

### values

 `Readonly` **values**: [`Vector`](collections_vector.Vector.md)

#### Defined in

[collections/unordered-map.ts:13](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/unordered-map.ts#L13)

## Methods

### [iterator]

**[iterator]**(): `UnorderedMapIterator`

#### Returns

`UnorderedMapIterator`

#### Defined in

[collections/unordered-map.ts:138](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/unordered-map.ts#L138)

___

### clear

**clear**(): `void`

#### Returns

`void`

#### Defined in

[collections/unordered-map.ts:121](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/unordered-map.ts#L121)

___

### deserializeIndex

**deserializeIndex**(`rawIndex`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `rawIndex` | `string` |

#### Returns

`number`

#### Defined in

[collections/unordered-map.ts:49](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/unordered-map.ts#L49)

___

### extend

**extend**(`kvs`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `kvs` | [`string`, `unknown`][] |

#### Returns

`void`

#### Defined in

[collections/unordered-map.ts:142](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/unordered-map.ts#L142)

___

### get

**get**(`key`): `unknown`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`unknown`

#### Defined in

[collections/unordered-map.ts:61](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/unordered-map.ts#L61)

___

### getIndexRaw

**getIndexRaw**(`key`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`string`

#### Defined in

[collections/unordered-map.ts:55](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/unordered-map.ts#L55)

___

### isEmpty

**isEmpty**(): `boolean`

#### Returns

`boolean`

#### Defined in

[collections/unordered-map.ts:34](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/unordered-map.ts#L34)

___

### len

**len**(): `number`

#### Returns

`number`

#### Defined in

[collections/unordered-map.ts:25](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/unordered-map.ts#L25)

___

### remove

**remove**(`key`): `unknown`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`unknown`

#### Defined in

[collections/unordered-map.ts:91](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/unordered-map.ts#L91)

___

### serialize

**serialize**(): `string`

#### Returns

`string`

#### Defined in

[collections/unordered-map.ts:148](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/unordered-map.ts#L148)

___

### serializeIndex

**serializeIndex**(`index`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

`string`

#### Defined in

[collections/unordered-map.ts:43](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/unordered-map.ts#L43)

___

### set

**set**(`key`, `value`): `unknown`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `unknown` |

#### Returns

`unknown`

#### Defined in

[collections/unordered-map.ts:75](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/unordered-map.ts#L75)

___

### toArray

**toArray**(): [`string`, `unknown`][]

#### Returns

[`string`, `unknown`][]

#### Defined in

[collections/unordered-map.ts:130](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/unordered-map.ts#L130)

___

### deserialize

`Static` **deserialize**(`data`): [`UnorderedMap`](collections_unordered_map.UnorderedMap.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`UnorderedMap`](collections_unordered_map.UnorderedMap.md) |

#### Returns

[`UnorderedMap`](collections_unordered_map.UnorderedMap.md)

#### Defined in

[collections/unordered-map.ts:153](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/unordered-map.ts#L153)
