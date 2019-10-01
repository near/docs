---
id: "inmemorykeystore"
title: "InMemoryKeyStore"
sidebar_label: "InMemoryKeyStore"
---

Simple in-memory keystore for testing purposes.

## Hierarchy

* [KeyStore](keystore.md)

  ↳ **InMemoryKeyStore**

## Index

### Constructors

* [constructor](inmemorykeystore.md#constructor)

### Properties

* [keys](inmemorykeystore.md#private-keys)

### Methods

* [clear](inmemorykeystore.md#clear)
* [getAccounts](inmemorykeystore.md#getaccounts)
* [getKey](inmemorykeystore.md#getkey)
* [getNetworks](inmemorykeystore.md#getnetworks)
* [removeKey](inmemorykeystore.md#removekey)
* [setKey](inmemorykeystore.md#setkey)

## Constructors

###  constructor

\+ **new InMemoryKeyStore**(): *[InMemoryKeyStore](inmemorykeystore.md)*

*Defined in [key_stores/in_memory_key_store.ts:10](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/key_stores/in_memory_key_store.ts#L10)*

**Returns:** *[InMemoryKeyStore](inmemorykeystore.md)*

## Properties

### `Private` keys

• **keys**: *object*

*Defined in [key_stores/in_memory_key_store.ts:10](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/key_stores/in_memory_key_store.ts#L10)*

#### Type declaration:

* \[ **key**: *string*\]: string

## Methods

###  clear

▸ **clear**(): *Promise‹void›*

*Overrides [KeyStore](keystore.md).[clear](keystore.md#abstract-clear)*

*Defined in [key_stores/in_memory_key_store.ts:33](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/key_stores/in_memory_key_store.ts#L33)*

**Returns:** *Promise‹void›*

___

###  getAccounts

▸ **getAccounts**(`networkId`: string): *Promise‹string[]›*

*Overrides [KeyStore](keystore.md).[getAccounts](keystore.md#abstract-getaccounts)*

*Defined in [key_stores/in_memory_key_store.ts:46](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/key_stores/in_memory_key_store.ts#L46)*

**Parameters:**

Name | Type |
------ | ------ |
`networkId` | string |

**Returns:** *Promise‹string[]›*

___

###  getKey

▸ **getKey**(`networkId`: string, `accountId`: string): *Promise‹[KeyPair](keypair.md)›*

*Overrides [KeyStore](keystore.md).[getKey](keystore.md#abstract-getkey)*

*Defined in [key_stores/in_memory_key_store.ts:21](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/key_stores/in_memory_key_store.ts#L21)*

**Parameters:**

Name | Type |
------ | ------ |
`networkId` | string |
`accountId` | string |

**Returns:** *Promise‹[KeyPair](keypair.md)›*

___

###  getNetworks

▸ **getNetworks**(): *Promise‹string[]›*

*Overrides [KeyStore](keystore.md).[getNetworks](keystore.md#abstract-getnetworks)*

*Defined in [key_stores/in_memory_key_store.ts:37](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/key_stores/in_memory_key_store.ts#L37)*

**Returns:** *Promise‹string[]›*

___

###  removeKey

▸ **removeKey**(`networkId`: string, `accountId`: string): *Promise‹void›*

*Overrides [KeyStore](keystore.md).[removeKey](keystore.md#abstract-removekey)*

*Defined in [key_stores/in_memory_key_store.ts:29](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/key_stores/in_memory_key_store.ts#L29)*

**Parameters:**

Name | Type |
------ | ------ |
`networkId` | string |
`accountId` | string |

**Returns:** *Promise‹void›*

___

###  setKey

▸ **setKey**(`networkId`: string, `accountId`: string, `keyPair`: [KeyPair](keypair.md)): *Promise‹void›*

*Overrides [KeyStore](keystore.md).[setKey](keystore.md#abstract-setkey)*

*Defined in [key_stores/in_memory_key_store.ts:17](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/key_stores/in_memory_key_store.ts#L17)*

**Parameters:**

Name | Type |
------ | ------ |
`networkId` | string |
`accountId` | string |
`keyPair` | [KeyPair](keypair.md) |

**Returns:** *Promise‹void›*
