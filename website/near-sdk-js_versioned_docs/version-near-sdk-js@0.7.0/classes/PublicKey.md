---
id: "PublicKey"
title: "Class: PublicKey"
sidebar_label: "PublicKey"
sidebar_position: 0
custom_edit_url: null
---

A abstraction on top of the NEAR public key string.

## Constructors

### constructor

• **new PublicKey**(`data`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `Uint8Array` | The string you want to create a PublicKey from. |

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/types/public_key.ts:91](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/types/public_key.ts#L91)

## Properties

### data

• **data**: `Uint8Array`

The actual value of the public key.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/types/public_key.ts:85](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/types/public_key.ts#L85)

___

### type

• `Private` **type**: [`CurveType`](../enums/CurveType.md)

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/types/public_key.ts:86](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/types/public_key.ts#L86)

## Methods

### curveType

▸ **curveType**(): [`CurveType`](../enums/CurveType.md)

The curve type of the public key.

#### Returns

[`CurveType`](../enums/CurveType.md)

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/types/public_key.ts:105](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/types/public_key.ts#L105)

___

### fromString

▸ `Static` **fromString**(`publicKeyString`): [`PublicKey`](PublicKey.md)

Create a public key from a public key string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `publicKeyString` | `string` | The public key string you want to create a PublicKey from. |

#### Returns

[`PublicKey`](PublicKey.md)

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/types/public_key.ts:114](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/types/public_key.ts#L114)
