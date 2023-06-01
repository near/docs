---
id: "signer.Signer"
title: "Class: Signer"
sidebar_label: "Signer"
custom_edit_url: null
---

[signer](../modules/signer.md).Signer

General signing interface, can be used for in memory signing, RPC singing, external wallet, HSM, etc.

## Hierarchy

- **`Signer`**

  ↳ [`InMemorySigner`](signer.InMemorySigner.md)

## Constructors

### constructor

**new Signer**()

## Methods

### createKey

`Abstract` **createKey**(`accountId`, `networkId?`): `Promise`<[`PublicKey`](utils_key_pair.PublicKey.md)\>

Creates new key and returns public key.

#### Parameters

| Name | Type |
| :------ | :------ |
| `accountId` | `string` |
| `networkId?` | `string` |

#### Returns

`Promise`<[`PublicKey`](utils_key_pair.PublicKey.md)\>

#### Defined in

[signer.ts:14](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/signer.ts#L14)

___

### getPublicKey

`Abstract` **getPublicKey**(`accountId?`, `networkId?`): `Promise`<[`PublicKey`](utils_key_pair.PublicKey.md)\>

Returns public key for given account / network.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `accountId?` | `string` | accountId to retrieve from. |
| `networkId?` | `string` | The targeted network. (ex. default, betanet, etc…) |

#### Returns

`Promise`<[`PublicKey`](utils_key_pair.PublicKey.md)\>

#### Defined in

[signer.ts:21](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/signer.ts#L21)

___

### signMessage

`Abstract` **signMessage**(`message`, `accountId?`, `networkId?`): `Promise`<[`Signature`](../interfaces/utils_key_pair.Signature.md)\>

Signs given message, by first hashing with sha256.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `Uint8Array` | message to sign. |
| `accountId?` | `string` | accountId to use for signing. |
| `networkId?` | `string` | The targeted network. (ex. default, betanet, etc…) |

#### Returns

`Promise`<[`Signature`](../interfaces/utils_key_pair.Signature.md)\>

#### Defined in

[signer.ts:29](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/signer.ts#L29)
