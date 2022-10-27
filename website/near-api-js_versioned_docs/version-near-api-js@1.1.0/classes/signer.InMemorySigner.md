---
id: "signer.InMemorySigner"
title: "Class: InMemorySigner"
sidebar_label: "InMemorySigner"
custom_edit_url: null
---

[signer](../modules/signer.md).InMemorySigner

Signs using in memory key store.

## Hierarchy

- [`Signer`](signer.Signer.md)

  ↳ **`InMemorySigner`**

## Constructors

### constructor

**new InMemorySigner**(`keyStore`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyStore` | [`KeyStore`](key_stores_keystore.KeyStore.md) |

#### Overrides

[Signer](signer.Signer.md).[constructor](signer.Signer.md#constructor)

#### Defined in

[signer.ts:38](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/signer.ts#L38)

## Properties

### keyStore

 `Readonly` **keyStore**: [`KeyStore`](key_stores_keystore.KeyStore.md)

#### Defined in

[signer.ts:36](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/signer.ts#L36)

## Methods

### createKey

**createKey**(`accountId`, `networkId`): `Promise`<[`PublicKey`](utils_key_pair.PublicKey.md)\>

Creates a public key for the account given

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `accountId` | `string` | The NEAR account to assign a public key to |
| `networkId` | `string` | The targeted network. (ex. default, betanet, etc…) |

#### Returns

`Promise`<[`PublicKey`](utils_key_pair.PublicKey.md)\>

#### Overrides

[Signer](signer.Signer.md).[createKey](signer.Signer.md#createkey)

#### Defined in

[signer.ts:64](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/signer.ts#L64)

___

### getPublicKey

**getPublicKey**(`accountId?`, `networkId?`): `Promise`<[`PublicKey`](utils_key_pair.PublicKey.md)\>

Gets the existing public key for a given account

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `accountId?` | `string` | The NEAR account to assign a public key to |
| `networkId?` | `string` | The targeted network. (ex. default, betanet, etc…) |

#### Returns

`Promise`<[`PublicKey`](utils_key_pair.PublicKey.md)\>

Returns the public key or null if not found

#### Overrides

[Signer](signer.Signer.md).[getPublicKey](signer.Signer.md#getpublickey)

#### Defined in

[signer.ts:76](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/signer.ts#L76)

___

### signMessage

**signMessage**(`message`, `accountId?`, `networkId?`): `Promise`<[`Signature`](../interfaces/utils_key_pair.Signature.md)\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `Uint8Array` | A message to be signed, typically a serialized transaction |
| `accountId?` | `string` | the NEAR account signing the message |
| `networkId?` | `string` | The targeted network. (ex. default, betanet, etc…) |

#### Returns

`Promise`<[`Signature`](../interfaces/utils_key_pair.Signature.md)\>

#### Overrides

[Signer](signer.Signer.md).[signMessage](signer.Signer.md#signmessage)

#### Defined in

[signer.ts:90](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/signer.ts#L90)

___

### toString

**toString**(): `string`

#### Returns

`string`

#### Defined in

[signer.ts:102](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/signer.ts#L102)

___

### fromKeyPair

`Static` **fromKeyPair**(`networkId`, `accountId`, `keyPair`): `Promise`<[`Signer`](signer.Signer.md)\>

Creates a single account Signer instance with account, network and keyPair provided.

Intended to be useful for temporary keys (e.g. claiming a Linkdrop).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `networkId` | `string` | The targeted network. (ex. default, betanet, etc…) |
| `accountId` | `string` | The NEAR account to assign the key pair to |
| `keyPair` | [`KeyPair`](utils_key_pair.KeyPair.md) | The keyPair to use for signing |

#### Returns

`Promise`<[`Signer`](signer.Signer.md)\>

#### Defined in

[signer.ts:52](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/signer.ts#L52)
