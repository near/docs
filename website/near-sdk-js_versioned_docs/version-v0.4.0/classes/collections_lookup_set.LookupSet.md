---
id: "collections_lookup_set.LookupSet"
title: "Class: LookupSet"
sidebar_label: "LookupSet"
custom_edit_url: null
---

[collections/lookup-set](../modules/collections_lookup_set.md).LookupSet

## Constructors

### constructor

**new LookupSet**(`keyPrefix`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyPrefix` | `string` |

#### Defined in

[collections/lookup-set.ts:7](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/lookup-set.ts#L7)

## Properties

### keyPrefix

 `Readonly` **keyPrefix**: `string`

#### Defined in

[collections/lookup-set.ts:5](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/lookup-set.ts#L5)

## Methods

### contains

**contains**(`key`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`boolean`

#### Defined in

[collections/lookup-set.ts:11](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/lookup-set.ts#L11)

___

### extend

**extend**(`keys`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `keys` | `string`[] |

#### Returns

`void`

#### Defined in

[collections/lookup-set.ts:29](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/lookup-set.ts#L29)

___

### remove

**remove**(`key`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`boolean`

#### Defined in

[collections/lookup-set.ts:17](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/lookup-set.ts#L17)

___

### serialize

**serialize**(): `string`

#### Returns

`string`

#### Defined in

[collections/lookup-set.ts:35](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/lookup-set.ts#L35)

___

### set

**set**(`key`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`boolean`

#### Defined in

[collections/lookup-set.ts:24](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/lookup-set.ts#L24)

___

### deserialize

`Static` **deserialize**(`data`): [`LookupSet`](collections_lookup_set.LookupSet.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`LookupSet`](collections_lookup_set.LookupSet.md) |

#### Returns

[`LookupSet`](collections_lookup_set.LookupSet.md)

#### Defined in

[collections/lookup-set.ts:40](https://github.com/near/near-sdk-js/blob/59dba80/src/collections/lookup-set.ts#L40)
