---
id: "keystore"
title: "KeyStore"
sidebar_label: "KeyStore"
---

Key store interface for `InMemorySigner`.

## Hierarchy

* **KeyStore**

  ↳ [InMemoryKeyStore](inmemorykeystore.md)

  ↳ [BrowserLocalStorageKeyStore](browserlocalstoragekeystore.md)

  ↳ [UnencryptedFileSystemKeyStore](unencryptedfilesystemkeystore.md)

  ↳ [MergeKeyStore](mergekeystore.md)

## Index

### Methods

* [clear](keystore.md#abstract-clear)
* [getAccounts](keystore.md#abstract-getaccounts)
* [getKey](keystore.md#abstract-getkey)
* [getNetworks](keystore.md#abstract-getnetworks)
* [removeKey](keystore.md#abstract-removekey)
* [setKey](keystore.md#abstract-setkey)

## Methods

### `Abstract` clear

▸ **clear**(): *Promise‹void›*

*Defined in [key_stores/keystore.ts:12](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/key_stores/keystore.ts#L12)*

**Returns:** *Promise‹void›*

___

### `Abstract` getAccounts

▸ **getAccounts**(`networkId`: string): *Promise‹string[]›*

*Defined in [key_stores/keystore.ts:14](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/key_stores/keystore.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`networkId` | string |

**Returns:** *Promise‹string[]›*

___

### `Abstract` getKey

▸ **getKey**(`networkId`: string, `accountId`: string): *Promise‹[KeyPair](keypair.md)›*

*Defined in [key_stores/keystore.ts:10](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/key_stores/keystore.ts#L10)*

**Parameters:**

Name | Type |
------ | ------ |
`networkId` | string |
`accountId` | string |

**Returns:** *Promise‹[KeyPair](keypair.md)›*

___

### `Abstract` getNetworks

▸ **getNetworks**(): *Promise‹string[]›*

*Defined in [key_stores/keystore.ts:13](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/key_stores/keystore.ts#L13)*

**Returns:** *Promise‹string[]›*

___

### `Abstract` removeKey

▸ **removeKey**(`networkId`: string, `accountId`: string): *Promise‹void›*

*Defined in [key_stores/keystore.ts:11](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/key_stores/keystore.ts#L11)*

**Parameters:**

Name | Type |
------ | ------ |
`networkId` | string |
`accountId` | string |

**Returns:** *Promise‹void›*

___

### `Abstract` setKey

▸ **setKey**(`networkId`: string, `accountId`: string, `keyPair`: [KeyPair](keypair.md)): *Promise‹void›*

*Defined in [key_stores/keystore.ts:9](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/key_stores/keystore.ts#L9)*

**Parameters:**

Name | Type |
------ | ------ |
`networkId` | string |
`accountId` | string |
`keyPair` | [KeyPair](keypair.md) |

**Returns:** *Promise‹void›*
