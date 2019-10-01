---
id: "signer"
title: "Signer"
sidebar_label: "Signer"
---

General signing interface, can be used for in memory signing, RPC singing, external wallet, HSM, etc.

## Hierarchy

* **Signer**

  ↳ [InMemorySigner](inmemorysigner.md)

## Index

### Methods

* [createKey](signer.md#abstract-createkey)
* [getPublicKey](signer.md#abstract-getpublickey)
* [signHash](signer.md#abstract-signhash)
* [signMessage](signer.md#signmessage)

## Methods

### `Abstract` createKey

▸ **createKey**(`accountId`: string, `networkId?`: string): *Promise‹[PublicKey](publickey.md)›*

*Defined in [signer.ts:15](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/signer.ts#L15)*

Creates new key and returns public key.

**Parameters:**

Name | Type |
------ | ------ |
`accountId` | string |
`networkId?` | string |

**Returns:** *Promise‹[PublicKey](publickey.md)›*

___

### `Abstract` getPublicKey

▸ **getPublicKey**(`accountId?`: string, `networkId?`: string): *Promise‹[PublicKey](publickey.md)›*

*Defined in [signer.ts:22](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/signer.ts#L22)*

Returns public key for given account / network.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`accountId?` | string | accountId to retrieve from. |
`networkId?` | string | network for this accountId.  |

**Returns:** *Promise‹[PublicKey](publickey.md)›*

___

### `Abstract` signHash

▸ **signHash**(`hash`: Uint8Array, `accountId?`: string, `networkId?`: string): *Promise‹[Signature](signature.md)›*

*Defined in [signer.ts:30](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/signer.ts#L30)*

Signs given hash.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`hash` | Uint8Array | hash to sign. |
`accountId?` | string | accountId to use for signing. |
`networkId?` | string | network for this accontId.  |

**Returns:** *Promise‹[Signature](signature.md)›*

___

###  signMessage

▸ **signMessage**(`message`: Uint8Array, `accountId?`: string, `networkId?`: string): *Promise‹[Signature](signature.md)›*

*Defined in [signer.ts:38](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/signer.ts#L38)*

Signs given message, by first hashing with sha256.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`message` | Uint8Array | message to sign. |
`accountId?` | string | accountId to use for signing. |
`networkId?` | string | network for this accontId.  |

**Returns:** *Promise‹[Signature](signature.md)›*
