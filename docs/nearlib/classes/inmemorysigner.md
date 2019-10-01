---
id: "inmemorysigner"
title: "InMemorySigner"
sidebar_label: "InMemorySigner"
---

Signs using in memory key store.

## Hierarchy

* [Signer](signer.md)

  ↳ **InMemorySigner**

## Index

### Constructors

* [constructor](inmemorysigner.md#constructor)

### Properties

* [keyStore](inmemorysigner.md#keystore)

### Methods

* [createKey](inmemorysigner.md#createkey)
* [getPublicKey](inmemorysigner.md#getpublickey)
* [signHash](inmemorysigner.md#signhash)
* [signMessage](inmemorysigner.md#signmessage)

## Constructors

###  constructor

\+ **new InMemorySigner**(`keyStore`: [KeyStore](keystore.md)): *[InMemorySigner](inmemorysigner.md)*

*Defined in [signer.ts:47](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/signer.ts#L47)*

**Parameters:**

Name | Type |
------ | ------ |
`keyStore` | [KeyStore](keystore.md) |

**Returns:** *[InMemorySigner](inmemorysigner.md)*

## Properties

###  keyStore

• **keyStore**: *[KeyStore](keystore.md)*

*Defined in [signer.ts:47](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/signer.ts#L47)*

## Methods

###  createKey

▸ **createKey**(`accountId`: string, `networkId`: string): *Promise‹[PublicKey](publickey.md)›*

*Overrides [Signer](signer.md).[createKey](signer.md#abstract-createkey)*

*Defined in [signer.ts:54](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/signer.ts#L54)*

**Parameters:**

Name | Type |
------ | ------ |
`accountId` | string |
`networkId` | string |

**Returns:** *Promise‹[PublicKey](publickey.md)›*

___

###  getPublicKey

▸ **getPublicKey**(`accountId?`: string, `networkId?`: string): *Promise‹[PublicKey](publickey.md)›*

*Overrides [Signer](signer.md).[getPublicKey](signer.md#abstract-getpublickey)*

*Defined in [signer.ts:60](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/signer.ts#L60)*

**Parameters:**

Name | Type |
------ | ------ |
`accountId?` | string |
`networkId?` | string |

**Returns:** *Promise‹[PublicKey](publickey.md)›*

___

###  signHash

▸ **signHash**(`hash`: Uint8Array, `accountId?`: string, `networkId?`: string): *Promise‹[Signature](signature.md)›*

*Overrides [Signer](signer.md).[signHash](signer.md#abstract-signhash)*

*Defined in [signer.ts:68](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/signer.ts#L68)*

**Parameters:**

Name | Type |
------ | ------ |
`hash` | Uint8Array |
`accountId?` | string |
`networkId?` | string |

**Returns:** *Promise‹[Signature](signature.md)›*

___

###  signMessage

▸ **signMessage**(`message`: Uint8Array, `accountId?`: string, `networkId?`: string): *Promise‹[Signature](signature.md)›*

*Inherited from [Signer](signer.md).[signMessage](signer.md#signmessage)*

*Defined in [signer.ts:38](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/signer.ts#L38)*

Signs given message, by first hashing with sha256.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`message` | Uint8Array | message to sign. |
`accountId?` | string | accountId to use for signing. |
`networkId?` | string | network for this accontId.  |

**Returns:** *Promise‹[Signature](signature.md)›*
