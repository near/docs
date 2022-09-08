---
id: "collections_unordered_set.UnorderedSet"
title: "Class: UnorderedSet"
sidebar_label: "UnorderedSet"
custom_edit_url: null
---

[collections/unordered-set](../modules/collections_unordered_set.md).UnorderedSet

## Constructors

### constructor

**new UnorderedSet**(`prefix`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `prefix` | `string` |

#### Defined in

[collections/unordered-set.ts:15](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/unordered-set.ts#L15)

## Properties

### elementIndexPrefix

 `Readonly` **elementIndexPrefix**: `string`

#### Defined in

[collections/unordered-set.ts:12](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/unordered-set.ts#L12)

___

### elements

 `Readonly` **elements**: [`Vector`](collections_vector.Vector.md)

#### Defined in

[collections/unordered-set.ts:13](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/unordered-set.ts#L13)

___

### length

 `Readonly` **length**: `number`

#### Defined in

[collections/unordered-set.ts:10](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/unordered-set.ts#L10)

___

### prefix

 `Readonly` **prefix**: `string`

#### Defined in

[collections/unordered-set.ts:11](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/unordered-set.ts#L11)

## Methods

### [iterator]

**[iterator]**(): [`VectorIterator`](collections_vector.VectorIterator.md)

#### Returns

[`VectorIterator`](collections_vector.VectorIterator.md)

#### Defined in

[collections/unordered-set.ts:107](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/unordered-set.ts#L107)

___

### clear

**clear**(): `void`

#### Returns

`void`

#### Defined in

[collections/unordered-set.ts:91](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/unordered-set.ts#L91)

___

### contains

**contains**(`element`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | `unknown` |

#### Returns

`boolean`

#### Defined in

[collections/unordered-set.ts:43](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/unordered-set.ts#L43)

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

[collections/unordered-set.ts:37](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/unordered-set.ts#L37)

___

### extend

**extend**(`elements`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `elements` | `unknown`[] |

#### Returns

`void`

#### Defined in

[collections/unordered-set.ts:111](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/unordered-set.ts#L111)

___

### isEmpty

**isEmpty**(): `boolean`

#### Returns

`boolean`

#### Defined in

[collections/unordered-set.ts:27](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/unordered-set.ts#L27)

___

### len

**len**(): `number`

#### Returns

`number`

#### Defined in

[collections/unordered-set.ts:23](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/unordered-set.ts#L23)

___

### remove

**remove**(`element`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | `unknown` |

#### Returns

`boolean`

#### Defined in

[collections/unordered-set.ts:61](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/unordered-set.ts#L61)

___

### serialize

**serialize**(): `string`

#### Returns

`string`

#### Defined in

[collections/unordered-set.ts:117](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/unordered-set.ts#L117)

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

[collections/unordered-set.ts:31](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/unordered-set.ts#L31)

___

### set

**set**(`element`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | `unknown` |

#### Returns

`boolean`

#### Defined in

[collections/unordered-set.ts:48](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/unordered-set.ts#L48)

___

### toArray

**toArray**(): `string`[]

#### Returns

`string`[]

#### Defined in

[collections/unordered-set.ts:99](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/unordered-set.ts#L99)

___

### deserialize

`Static` **deserialize**(`data`): [`UnorderedSet`](collections_unordered_set.UnorderedSet.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`UnorderedSet`](collections_unordered_set.UnorderedSet.md) |

#### Returns

[`UnorderedSet`](collections_unordered_set.UnorderedSet.md)

#### Defined in

[collections/unordered-set.ts:122](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/unordered-set.ts#L122)
