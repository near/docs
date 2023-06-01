---
id: "utils_key_pair.KeyPairEd25519"
title: "Class: KeyPairEd25519"
sidebar_label: "KeyPairEd25519"
custom_edit_url: null
---

[utils/key_pair](../modules/utils_key_pair.md).KeyPairEd25519

This class provides key pair functionality for Ed25519 curve:
generating key pairs, encoding key pairs, signing and verifying.

## Hierarchy

- [`KeyPair`](utils_key_pair.KeyPair.md)

  ↳ **`KeyPairEd25519`**

## Constructors

### constructor

**new KeyPairEd25519**(`secretKey`)

Construct an instance of key pair given a secret key.
It's generally assumed that these are encoded in base58.

#### Parameters

| Name | Type |
| :------ | :------ |
| `secretKey` | `string` |

#### Overrides

[KeyPair](utils_key_pair.KeyPair.md).[constructor](utils_key_pair.KeyPair.md#constructor)

#### Defined in

[utils/key_pair.ts:113](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/utils/key_pair.ts#L113)

## Properties

### publicKey

 `Readonly` **publicKey**: [`PublicKey`](utils_key_pair.PublicKey.md)

#### Defined in

[utils/key_pair.ts:105](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/utils/key_pair.ts#L105)

___

### secretKey

 `Readonly` **secretKey**: `string`

#### Defined in

[utils/key_pair.ts:106](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/utils/key_pair.ts#L106)

## Methods

### getPublicKey

**getPublicKey**(): [`PublicKey`](utils_key_pair.PublicKey.md)

#### Returns

[`PublicKey`](utils_key_pair.PublicKey.md)

#### Overrides

[KeyPair](utils_key_pair.KeyPair.md).[getPublicKey](utils_key_pair.KeyPair.md#getpublickey)

#### Defined in

[utils/key_pair.ts:148](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/utils/key_pair.ts#L148)

___

### sign

**sign**(`message`): [`Signature`](../interfaces/utils_key_pair.Signature.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `Uint8Array` |

#### Returns

[`Signature`](../interfaces/utils_key_pair.Signature.md)

#### Overrides

[KeyPair](utils_key_pair.KeyPair.md).[sign](utils_key_pair.KeyPair.md#sign)

#### Defined in

[utils/key_pair.ts:135](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/utils/key_pair.ts#L135)

___

### toString

**toString**(): `string`

#### Returns

`string`

#### Overrides

[KeyPair](utils_key_pair.KeyPair.md).[toString](utils_key_pair.KeyPair.md#tostring)

#### Defined in

[utils/key_pair.ts:144](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/utils/key_pair.ts#L144)

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

#### Overrides

[KeyPair](utils_key_pair.KeyPair.md).[verify](utils_key_pair.KeyPair.md#verify)

#### Defined in

[utils/key_pair.ts:140](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/utils/key_pair.ts#L140)

___

### fromRandom

`Static` **fromRandom**(): [`KeyPairEd25519`](utils_key_pair.KeyPairEd25519.md)

Generate a new random keypair.

**`Example`**

```ts
const keyRandom = KeyPair.fromRandom();
keyRandom.publicKey
// returns [PUBLIC_KEY]

keyRandom.secretKey
// returns [SECRET_KEY]
```

#### Returns

[`KeyPairEd25519`](utils_key_pair.KeyPairEd25519.md)

#### Overrides

[KeyPair](utils_key_pair.KeyPair.md).[fromRandom](utils_key_pair.KeyPair.md#fromrandom)

#### Defined in

[utils/key_pair.ts:130](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/utils/key_pair.ts#L130)

___

### fromString

`Static` **fromString**(`encodedKey`): [`KeyPair`](utils_key_pair.KeyPair.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `encodedKey` | `string` |

#### Returns

[`KeyPair`](utils_key_pair.KeyPair.md)

#### Inherited from

[KeyPair](utils_key_pair.KeyPair.md).[fromString](utils_key_pair.KeyPair.md#fromstring)

#### Defined in

[utils/key_pair.ts:85](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/utils/key_pair.ts#L85)
