---
id: "utils_serialize.BinaryWriter"
title: "Class: BinaryWriter"
sidebar_label: "BinaryWriter"
custom_edit_url: null
---

[utils/serialize](../modules/utils_serialize.md).BinaryWriter

## Constructors

### constructor

**new BinaryWriter**()

#### Defined in

../node_modules/borsh/lib/index.d.ts:15

## Properties

### buf

 **buf**: `Buffer`

#### Defined in

../node_modules/borsh/lib/index.d.ts:13

___

### length

 **length**: `number`

#### Defined in

../node_modules/borsh/lib/index.d.ts:14

___

### writeBuffer

 `Private` **writeBuffer**: `any`

#### Defined in

../node_modules/borsh/lib/index.d.ts:24

## Methods

### maybeResize

**maybeResize**(): `void`

#### Returns

`void`

#### Defined in

../node_modules/borsh/lib/index.d.ts:16

___

### toArray

**toArray**(): `Uint8Array`

#### Returns

`Uint8Array`

#### Defined in

../node_modules/borsh/lib/index.d.ts:28

___

### writeArray

**writeArray**(`array`, `fn`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `array` | `any`[] |
| `fn` | `any` |

#### Returns

`void`

#### Defined in

../node_modules/borsh/lib/index.d.ts:27

___

### writeFixedArray

**writeFixedArray**(`array`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `array` | `Uint8Array` |

#### Returns

`void`

#### Defined in

../node_modules/borsh/lib/index.d.ts:26

___

### writeString

**writeString**(`str`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`void`

#### Defined in

../node_modules/borsh/lib/index.d.ts:25

___

### writeU128

**writeU128**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` \| `BN` |

#### Returns

`void`

#### Defined in

../node_modules/borsh/lib/index.d.ts:21

___

### writeU16

**writeU16**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Defined in

../node_modules/borsh/lib/index.d.ts:18

___

### writeU256

**writeU256**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` \| `BN` |

#### Returns

`void`

#### Defined in

../node_modules/borsh/lib/index.d.ts:22

___

### writeU32

**writeU32**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Defined in

../node_modules/borsh/lib/index.d.ts:19

___

### writeU512

**writeU512**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` \| `BN` |

#### Returns

`void`

#### Defined in

../node_modules/borsh/lib/index.d.ts:23

___

### writeU64

**writeU64**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` \| `BN` |

#### Returns

`void`

#### Defined in

../node_modules/borsh/lib/index.d.ts:20

___

### writeU8

**writeU8**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Defined in

../node_modules/borsh/lib/index.d.ts:17
