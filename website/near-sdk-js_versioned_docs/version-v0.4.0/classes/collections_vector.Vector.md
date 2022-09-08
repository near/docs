---
id: "collections_vector.Vector"
title: "Class: Vector"
sidebar_label: "Vector"
custom_edit_url: null
---

[collections/vector](../modules/collections_vector.md).Vector

## Constructors

### constructor

**new Vector**(`prefix`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `prefix` | `string` |

#### Defined in

[collections/vector.ts:21](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/vector.ts#L21)

## Properties

### length

 **length**: `number`

#### Defined in

[collections/vector.ts:18](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/vector.ts#L18)

___

### prefix

 `Readonly` **prefix**: `string`

#### Defined in

[collections/vector.ts:19](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/vector.ts#L19)

## Methods

### [iterator]

**[iterator]**(): [`VectorIterator`](collections_vector.VectorIterator.md)

#### Returns

[`VectorIterator`](collections_vector.VectorIterator.md)

#### Defined in

[collections/vector.ts:101](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/vector.ts#L101)

___

### clear

**clear**(): `void`

#### Returns

`void`

#### Defined in

[collections/vector.ts:105](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/vector.ts#L105)

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

[collections/vector.ts:95](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/vector.ts#L95)

___

### get

**get**(`index`): `unknown`

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

`unknown`

#### Defined in

[collections/vector.ts:34](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/vector.ts#L34)

___

### isEmpty

**isEmpty**(): `boolean`

#### Returns

`boolean`

#### Defined in

[collections/vector.ts:30](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/vector.ts#L30)

___

### len

**len**(): `number`

#### Returns

`number`

#### Defined in

[collections/vector.ts:26](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/vector.ts#L26)

___

### pop

**pop**(): `unknown`

#### Returns

`unknown`

#### Defined in

[collections/vector.ts:67](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/vector.ts#L67)

___

### push

**push**(`element`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | `unknown` |

#### Returns

`void`

#### Defined in

[collections/vector.ts:61](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/vector.ts#L61)

___

### replace

**replace**(`index`, `element`): `unknown`

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |
| `element` | `unknown` |

#### Returns

`unknown`

#### Defined in

[collections/vector.ts:82](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/vector.ts#L82)

___

### serialize

**serialize**(): `string`

#### Returns

`string`

#### Defined in

[collections/vector.ts:121](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/vector.ts#L121)

___

### swapRemove

**swapRemove**(`index`): `unknown`

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

`unknown`

#### Defined in

[collections/vector.ts:45](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/vector.ts#L45)

___

### toArray

**toArray**(): `unknown`[]

#### Returns

`unknown`[]

#### Defined in

[collections/vector.ts:113](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/vector.ts#L113)

___

### deserialize

`Static` **deserialize**(`data`): [`Vector`](collections_vector.Vector.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`Vector`](collections_vector.Vector.md) |

#### Returns

[`Vector`](collections_vector.Vector.md)

#### Defined in

[collections/vector.ts:126](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/vector.ts#L126)
