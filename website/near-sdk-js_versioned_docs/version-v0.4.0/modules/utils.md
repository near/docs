---
id: "utils"
title: "Module: utils"
sidebar_label: "utils"
sidebar_position: 0
custom_edit_url: null
---

## Type Aliases

### Bytes

 **Bytes**: `string`

#### Defined in

[utils.ts:4](https://github.com/near/near-sdk-js/blob/59dba80/src/utils.ts#L4)

___

### Mutable

 **Mutable**<`T`\>: { -readonly [P in keyof T]: T[P] }

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[utils.ts:52](https://github.com/near/near-sdk-js/blob/59dba80/src/utils.ts#L52)

## Functions

### assert

**assert**(`b`, `str`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `b` | `boolean` |
| `str` | `string` |

#### Returns

`void`

#### Defined in

[utils.ts:44](https://github.com/near/near-sdk-js/blob/59dba80/src/utils.ts#L44)

___

### bytes

**bytes**(`strOrU8Array`): [`Bytes`](utils.md#bytes)

#### Parameters

| Name | Type |
| :------ | :------ |
| `strOrU8Array` | `string` \| `Uint8Array` |

#### Returns

[`Bytes`](utils.md#bytes)

#### Defined in

[utils.ts:24](https://github.com/near/near-sdk-js/blob/59dba80/src/utils.ts#L24)

___

### bytesToU8Array

**bytesToU8Array**(`bytes`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `bytes` | `string` |

#### Returns

`Uint8Array`

#### Defined in

[utils.ts:16](https://github.com/near/near-sdk-js/blob/59dba80/src/utils.ts#L16)

___

### u8ArrayToBytes

**u8ArrayToBytes**(`array`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `array` | `Uint8Array` |

#### Returns

`string`

#### Defined in

[utils.ts:6](https://github.com/near/near-sdk-js/blob/59dba80/src/utils.ts#L6)
