---
id: "unencryptedfilesystemkeystore"
title: "UnencryptedFileSystemKeyStore"
sidebar_label: "UnencryptedFileSystemKeyStore"
---

## Hierarchy

* [KeyStore](keystore.md)

  ↳ **UnencryptedFileSystemKeyStore**

## Index

### Constructors

* [constructor](unencryptedfilesystemkeystore.md#constructor)

### Properties

* [keyDir](unencryptedfilesystemkeystore.md#keydir)

### Methods

* [clear](unencryptedfilesystemkeystore.md#clear)
* [getAccounts](unencryptedfilesystemkeystore.md#getaccounts)
* [getKey](unencryptedfilesystemkeystore.md#getkey)
* [getKeyFilePath](unencryptedfilesystemkeystore.md#private-getkeyfilepath)
* [getNetworks](unencryptedfilesystemkeystore.md#getnetworks)
* [removeKey](unencryptedfilesystemkeystore.md#removekey)
* [setKey](unencryptedfilesystemkeystore.md#setkey)

## Constructors

###  constructor

\+ **new UnencryptedFileSystemKeyStore**(`keyDir`: string): *[UnencryptedFileSystemKeyStore](unencryptedfilesystemkeystore.md)*

*Defined in [key_stores/unencrypted_file_system_keystore.ts:57](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/key_stores/unencrypted_file_system_keystore.ts#L57)*

**Parameters:**

Name | Type |
------ | ------ |
`keyDir` | string |

**Returns:** *[UnencryptedFileSystemKeyStore](unencryptedfilesystemkeystore.md)*

## Properties

###  keyDir

• **keyDir**: *string*

*Defined in [key_stores/unencrypted_file_system_keystore.ts:57](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/key_stores/unencrypted_file_system_keystore.ts#L57)*

## Methods

###  clear

▸ **clear**(): *Promise‹void›*

*Overrides [KeyStore](keystore.md).[clear](keystore.md#abstract-clear)*

*Defined in [key_stores/unencrypted_file_system_keystore.ts:85](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/key_stores/unencrypted_file_system_keystore.ts#L85)*

**Returns:** *Promise‹void›*

___

###  getAccounts

▸ **getAccounts**(`networkId`: string): *Promise‹string[]›*

*Overrides [KeyStore](keystore.md).[getAccounts](keystore.md#abstract-getaccounts)*

*Defined in [key_stores/unencrypted_file_system_keystore.ts:106](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/key_stores/unencrypted_file_system_keystore.ts#L106)*

**Parameters:**

Name | Type |
------ | ------ |
`networkId` | string |

**Returns:** *Promise‹string[]›*

___

###  getKey

▸ **getKey**(`networkId`: string, `accountId`: string): *Promise‹[KeyPair](keypair.md)›*

*Overrides [KeyStore](keystore.md).[getKey](keystore.md#abstract-getkey)*

*Defined in [key_stores/unencrypted_file_system_keystore.ts:70](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/key_stores/unencrypted_file_system_keystore.ts#L70)*

**Parameters:**

Name | Type |
------ | ------ |
`networkId` | string |
`accountId` | string |

**Returns:** *Promise‹[KeyPair](keypair.md)›*

___

### `Private` getKeyFilePath

▸ **getKeyFilePath**(`networkId`: string, `accountId`: string): *string*

*Defined in [key_stores/unencrypted_file_system_keystore.ts:93](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/key_stores/unencrypted_file_system_keystore.ts#L93)*

**Parameters:**

Name | Type |
------ | ------ |
`networkId` | string |
`accountId` | string |

**Returns:** *string*

___

###  getNetworks

▸ **getNetworks**(): *Promise‹string[]›*

*Overrides [KeyStore](keystore.md).[getNetworks](keystore.md#abstract-getnetworks)*

*Defined in [key_stores/unencrypted_file_system_keystore.ts:97](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/key_stores/unencrypted_file_system_keystore.ts#L97)*

**Returns:** *Promise‹string[]›*

___

###  removeKey

▸ **removeKey**(`networkId`: string, `accountId`: string): *Promise‹void›*

*Overrides [KeyStore](keystore.md).[removeKey](keystore.md#abstract-removekey)*

*Defined in [key_stores/unencrypted_file_system_keystore.ts:79](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/key_stores/unencrypted_file_system_keystore.ts#L79)*

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

*Defined in [key_stores/unencrypted_file_system_keystore.ts:64](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/key_stores/unencrypted_file_system_keystore.ts#L64)*

**Parameters:**

Name | Type |
------ | ------ |
`networkId` | string |
`accountId` | string |
`keyPair` | [KeyPair](keypair.md) |

**Returns:** *Promise‹void›*
