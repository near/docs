---
id: "mergekeystore"
title: "MergeKeyStore"
sidebar_label: "MergeKeyStore"
---

Keystore which can be used to merge multiple key stores into one virtual key store.

## Hierarchy

* [KeyStore](keystore.md)

  ↳ **MergeKeyStore**

## Index

### Constructors

* [constructor](mergekeystore.md#constructor)

### Properties

* [keyStores](mergekeystore.md#keystores)

### Methods

* [clear](mergekeystore.md#clear)
* [getAccounts](mergekeystore.md#getaccounts)
* [getKey](mergekeystore.md#getkey)
* [getNetworks](mergekeystore.md#getnetworks)
* [removeKey](mergekeystore.md#removekey)
* [setKey](mergekeystore.md#setkey)

## Constructors

###  constructor

\+ **new MergeKeyStore**(`keyStores`: [KeyStore](keystore.md)[]): *[MergeKeyStore](mergekeystore.md)*

*Defined in [key_stores/merge_key_store.ts:10](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/key_stores/merge_key_store.ts#L10)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`keyStores` | [KeyStore](keystore.md)[] | first keystore gets all write calls, read calls are attempted from start to end of array  |

**Returns:** *[MergeKeyStore](mergekeystore.md)*

## Properties

###  keyStores

• **keyStores**: *[KeyStore](keystore.md)[]*

*Defined in [key_stores/merge_key_store.ts:10](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/key_stores/merge_key_store.ts#L10)*

## Methods

###  clear

▸ **clear**(): *Promise‹void›*

*Overrides [KeyStore](keystore.md).[clear](keystore.md#abstract-clear)*

*Defined in [key_stores/merge_key_store.ts:40](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/key_stores/merge_key_store.ts#L40)*

**Returns:** *Promise‹void›*

___

###  getAccounts

▸ **getAccounts**(`networkId`: string): *Promise‹string[]›*

*Overrides [KeyStore](keystore.md).[getAccounts](keystore.md#abstract-getaccounts)*

*Defined in [key_stores/merge_key_store.ts:56](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/key_stores/merge_key_store.ts#L56)*

**Parameters:**

Name | Type |
------ | ------ |
`networkId` | string |

**Returns:** *Promise‹string[]›*

___

###  getKey

▸ **getKey**(`networkId`: string, `accountId`: string): *Promise‹[KeyPair](keypair.md)›*

*Overrides [KeyStore](keystore.md).[getKey](keystore.md#abstract-getkey)*

*Defined in [key_stores/merge_key_store.ts:24](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/key_stores/merge_key_store.ts#L24)*

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

*Defined in [key_stores/merge_key_store.ts:46](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/key_stores/merge_key_store.ts#L46)*

**Returns:** *Promise‹string[]›*

___

###  removeKey

▸ **removeKey**(`networkId`: string, `accountId`: string): *Promise‹void›*

*Overrides [KeyStore](keystore.md).[removeKey](keystore.md#abstract-removekey)*

*Defined in [key_stores/merge_key_store.ts:34](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/key_stores/merge_key_store.ts#L34)*

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

*Defined in [key_stores/merge_key_store.ts:20](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/key_stores/merge_key_store.ts#L20)*

**Parameters:**

Name | Type |
------ | ------ |
`networkId` | string |
`accountId` | string |
`keyPair` | [KeyPair](keypair.md) |

**Returns:** *Promise‹void›*
