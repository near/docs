---
id: "utils_serialize"
title: "Module: utils/serialize"
sidebar_label: "utils/serialize"
sidebar_position: 0
custom_edit_url: null
---

## Classes

- [BinaryReader](../classes/utils_serialize.BinaryReader.md)
- [BinaryWriter](../classes/utils_serialize.BinaryWriter.md)
- [BorshError](../classes/utils_serialize.BorshError.md)

## Type Aliases

### Schema

 **Schema**: `Map`<`Function`, `any`\>

#### Defined in

../node_modules/borsh/lib/index.d.ts:5

## Functions

### base\_decode

**base_decode**(`value`): `Buffer`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`Buffer`

#### Defined in

../node_modules/borsh/lib/index.d.ts:4

___

### base\_encode

**base_encode**(`value`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` \| `Uint8Array` |

#### Returns

`string`

#### Defined in

../node_modules/borsh/lib/index.d.ts:3

___

### deserialize

**deserialize**<`T`\>(`schema`, `classType`, `buffer`, `Reader?`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | [`Schema`](utils_serialize.md#schema) |
| `classType` | (`args`: `any`) => `T` |
| `buffer` | `Buffer` |
| `Reader?` | typeof [`BinaryReader`](../classes/utils_serialize.BinaryReader.md) |

#### Returns

`T`

#### Defined in

../node_modules/borsh/lib/index.d.ts:47

___

### serialize

**serialize**(`schema`, `obj`, `Writer?`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | [`Schema`](utils_serialize.md#schema) |
| `obj` | `any` |
| `Writer?` | typeof [`BinaryWriter`](../classes/utils_serialize.BinaryWriter.md) |

#### Returns

`Uint8Array`

#### Defined in

../node_modules/borsh/lib/index.d.ts:46
