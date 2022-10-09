---
id: "utils_serialize.BinaryReader"
title: "Class: BinaryReader"
sidebar_label: "BinaryReader"
custom_edit_url: null
---

[utils/serialize](../modules/utils_serialize.md).BinaryReader

## Constructors

### constructor

**new BinaryReader**(`buf`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `buf` | `Buffer` |

#### Defined in

../node_modules/borsh/lib/index.d.ts:33

## Properties

### buf

 **buf**: `Buffer`

#### Defined in

../node_modules/borsh/lib/index.d.ts:31

___

### offset

 **offset**: `number`

#### Defined in

../node_modules/borsh/lib/index.d.ts:32

___

### readBuffer

 `Private` **readBuffer**: `any`

#### Defined in

../node_modules/borsh/lib/index.d.ts:41

## Methods

### readArray

**readArray**(`fn`): `any`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | `any` |

#### Returns

`any`[]

#### Defined in

../node_modules/borsh/lib/index.d.ts:44

___

### readFixedArray

**readFixedArray**(`len`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `len` | `number` |

#### Returns

`Uint8Array`

#### Defined in

../node_modules/borsh/lib/index.d.ts:43

___

### readString

**readString**(): `string`

#### Returns

`string`

#### Defined in

../node_modules/borsh/lib/index.d.ts:42

___

### readU128

**readU128**(): `BN`

#### Returns

`BN`

#### Defined in

../node_modules/borsh/lib/index.d.ts:38

___

### readU16

**readU16**(): `number`

#### Returns

`number`

#### Defined in

../node_modules/borsh/lib/index.d.ts:35

___

### readU256

**readU256**(): `BN`

#### Returns

`BN`

#### Defined in

../node_modules/borsh/lib/index.d.ts:39

___

### readU32

**readU32**(): `number`

#### Returns

`number`

#### Defined in

../node_modules/borsh/lib/index.d.ts:36

___

### readU512

**readU512**(): `BN`

#### Returns

`BN`

#### Defined in

../node_modules/borsh/lib/index.d.ts:40

___

### readU64

**readU64**(): `BN`

#### Returns

`BN`

#### Defined in

../node_modules/borsh/lib/index.d.ts:37

___

### readU8

**readU8**(): `number`

#### Returns

`number`

#### Defined in

../node_modules/borsh/lib/index.d.ts:34
