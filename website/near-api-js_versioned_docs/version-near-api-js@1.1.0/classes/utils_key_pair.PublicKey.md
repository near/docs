---
id: "utils_key_pair.PublicKey"
title: "Class: PublicKey"
sidebar_label: "PublicKey"
custom_edit_url: null
---

[utils/key_pair](../modules/utils_key_pair.md).PublicKey

PublicKey representation that has type and bytes of the key.

## Hierarchy

- `Assignable`

  ↳ **`PublicKey`**

## Constructors

### constructor

**new PublicKey**(`properties`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `properties` | `any` |

#### Inherited from

Assignable.constructor

#### Defined in

[utils/enums.ts:17](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/utils/enums.ts#L17)

## Properties

### data

 **data**: `Uint8Array`

#### Defined in

[utils/key_pair.ts:36](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/utils/key_pair.ts#L36)

___

### keyType

 **keyType**: [`ED25519`](../enums/utils_key_pair.KeyType.md#ed25519)

#### Defined in

[utils/key_pair.ts:35](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/utils/key_pair.ts#L35)

## Methods

### toString

**toString**(): `string`

#### Returns

`string`

#### Defined in

[utils/key_pair.ts:56](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/utils/key_pair.ts#L56)

___

### verify

**verify**(`message`, `signature`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `Uint8Array` |
| `signature` | `Uint8Array` |

#### Returns

`boolean`

#### Defined in

[utils/key_pair.ts:60](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/utils/key_pair.ts#L60)

___

### from

`Static` **from**(`value`): [`PublicKey`](utils_key_pair.PublicKey.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` \| [`PublicKey`](utils_key_pair.PublicKey.md) |

#### Returns

[`PublicKey`](utils_key_pair.PublicKey.md)

#### Defined in

[utils/key_pair.ts:38](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/utils/key_pair.ts#L38)

___

### fromString

`Static` **fromString**(`encodedKey`): [`PublicKey`](utils_key_pair.PublicKey.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `encodedKey` | `string` |

#### Returns

[`PublicKey`](utils_key_pair.PublicKey.md)

#### Defined in

[utils/key_pair.ts:45](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/utils/key_pair.ts#L45)
