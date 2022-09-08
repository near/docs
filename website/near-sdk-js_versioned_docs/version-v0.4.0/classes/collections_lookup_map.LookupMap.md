---
id: "collections_lookup_map.LookupMap"
title: "Class: LookupMap"
sidebar_label: "LookupMap"
custom_edit_url: null
---

[collections/lookup-map](../modules/collections_lookup_map.md).LookupMap

## Constructors

### constructor

**new LookupMap**(`keyPrefix`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyPrefix` | `string` |

#### Defined in

[collections/lookup-map.ts:7](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/lookup-map.ts#L7)

## Properties

### keyPrefix

 `Readonly` **keyPrefix**: `string`

#### Defined in

[collections/lookup-map.ts:5](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/lookup-map.ts#L5)

## Methods

### containsKey

**containsKey**(`key`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`boolean`

#### Defined in

[collections/lookup-map.ts:11](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/lookup-map.ts#L11)

___

### extend

**extend**(`objects`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `objects` | [`string`, `unknown`][] |

#### Returns

`void`

#### Defined in

[collections/lookup-map.ts:42](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/lookup-map.ts#L42)

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

[collections/lookup-map.ts:16](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/lookup-map.ts#L16)

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

[collections/lookup-map.ts:25](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/lookup-map.ts#L25)

___

### serialize

**serialize**(): `string`

#### Returns

`string`

#### Defined in

[collections/lookup-map.ts:48](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/lookup-map.ts#L48)

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

[collections/lookup-map.ts:33](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/lookup-map.ts#L33)

___

### deserialize

`Static` **deserialize**(`data`): [`LookupMap`](collections_lookup_map.LookupMap.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`LookupMap`](collections_lookup_map.LookupMap.md) |

#### Returns

[`LookupMap`](collections_lookup_map.LookupMap.md)

#### Defined in

[collections/lookup-map.ts:53](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/lookup-map.ts#L53)
