---
id: "utils_key_pair.KeyPair"
title: "Class: KeyPair"
sidebar_label: "KeyPair"
custom_edit_url: null
---

[utils/key_pair](../modules/utils_key_pair.md).KeyPair

## Hierarchy

- **`KeyPair`**

  ↳ [`KeyPairEd25519`](utils_key_pair.KeyPairEd25519.md)

## Constructors

### constructor

**new KeyPair**()

## Methods

### getPublicKey

`Abstract` **getPublicKey**(): [`PublicKey`](utils_key_pair.PublicKey.md)

#### Returns

[`PublicKey`](utils_key_pair.PublicKey.md)

#### Defined in

[utils/key_pair.ts:72](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/utils/key_pair.ts#L72)

___

### sign

`Abstract` **sign**(`message`): [`Signature`](../interfaces/utils_key_pair.Signature.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `Uint8Array` |

#### Returns

[`Signature`](../interfaces/utils_key_pair.Signature.md)

#### Defined in

[utils/key_pair.ts:69](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/utils/key_pair.ts#L69)

___

### toString

`Abstract` **toString**(): `string`

#### Returns

`string`

#### Defined in

[utils/key_pair.ts:71](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/utils/key_pair.ts#L71)

___

### verify

`Abstract` **verify**(`message`, `signature`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `Uint8Array` |
| `signature` | `Uint8Array` |

#### Returns

`boolean`

#### Defined in

[utils/key_pair.ts:70](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/utils/key_pair.ts#L70)

___

### fromRandom

`Static` **fromRandom**(`curve`): [`KeyPair`](utils_key_pair.KeyPair.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `curve` | `string` | Name of elliptical curve, case-insensitive |

#### Returns

[`KeyPair`](utils_key_pair.KeyPair.md)

Random KeyPair based on the curve

#### Defined in

[utils/key_pair.ts:78](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/utils/key_pair.ts#L78)

___

### fromString

`Static` **fromString**(`encodedKey`): [`KeyPair`](utils_key_pair.KeyPair.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `encodedKey` | `string` |

#### Returns

[`KeyPair`](utils_key_pair.KeyPair.md)

#### Defined in

[utils/key_pair.ts:85](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/utils/key_pair.ts#L85)
