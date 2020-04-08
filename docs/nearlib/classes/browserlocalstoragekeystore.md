---
id: "browserlocalstoragekeystore"
title: "BrowserLocalStorageKeyStore"
sidebar_label: "BrowserLocalStorageKeyStore"
---

## Hierarchy

* [KeyStore](keystore.md)

  ↳ **BrowserLocalStorageKeyStore**

## Index

### Constructors

* [constructor](browserlocalstoragekeystore.md#constructor)

### Properties

* [localStorage](browserlocalstoragekeystore.md#private-localstorage)
* [prefix](browserlocalstoragekeystore.md#private-prefix)

### Methods

* [clear](browserlocalstoragekeystore.md#clear)
* [getAccounts](browserlocalstoragekeystore.md#getaccounts)
* [getKey](browserlocalstoragekeystore.md#getkey)
* [getNetworks](browserlocalstoragekeystore.md#getnetworks)
* [removeKey](browserlocalstoragekeystore.md#removekey)
* [setKey](browserlocalstoragekeystore.md#setkey)
* [storageKeyForSecretKey](browserlocalstoragekeystore.md#private-storagekeyforsecretkey)
* [storageKeys](browserlocalstoragekeystore.md#private-storagekeys)

## Constructors

###  constructor

\+ **new BrowserLocalStorageKeyStore**(`localStorage`: any, `prefix`: string): *[BrowserLocalStorageKeyStore](browserlocalstoragekeystore.md)*

*Defined in [key_stores/browser_local_storage_key_store.ts:10](https://github.com/near/near-api-js/blob/88ad17d/src.ts/key_stores/browser_local_storage_key_store.ts#L10)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`localStorage` | any |  window.localStorage |
`prefix` | string |  LOCAL_STORAGE_KEY_PREFIX |

**Returns:** *[BrowserLocalStorageKeyStore](browserlocalstoragekeystore.md)*

## Properties

### `Private` localStorage

• **localStorage**: *any*

*Defined in [key_stores/browser_local_storage_key_store.ts:9](https://github.com/near/near-api-js/blob/88ad17d/src.ts/key_stores/browser_local_storage_key_store.ts#L9)*

___

### `Private` prefix

• **prefix**: *string*

*Defined in [key_stores/browser_local_storage_key_store.ts:10](https://github.com/near/near-api-js/blob/88ad17d/src.ts/key_stores/browser_local_storage_key_store.ts#L10)*

## Methods

###  clear

▸ **clear**(): *Promise‹void›*

*Overrides [KeyStore](keystore.md).[clear](keystore.md#abstract-clear)*

*Defined in [key_stores/browser_local_storage_key_store.ts:34](https://github.com/near/near-api-js/blob/88ad17d/src.ts/key_stores/browser_local_storage_key_store.ts#L34)*

**Returns:** *Promise‹void›*

___

###  getAccounts

▸ **getAccounts**(`networkId`: string): *Promise‹string[]›*

*Overrides [KeyStore](keystore.md).[getAccounts](keystore.md#abstract-getaccounts)*

*Defined in [key_stores/browser_local_storage_key_store.ts:53](https://github.com/near/near-api-js/blob/88ad17d/src.ts/key_stores/browser_local_storage_key_store.ts#L53)*

**Parameters:**

Name | Type |
------ | ------ |
`networkId` | string |

**Returns:** *Promise‹string[]›*

___

###  getKey

▸ **getKey**(`networkId`: string, `accountId`: string): *Promise‹[KeyPair](keypair.md)›*

*Overrides [KeyStore](keystore.md).[getKey](keystore.md#abstract-getkey)*

*Defined in [key_stores/browser_local_storage_key_store.ts:22](https://github.com/near/near-api-js/blob/88ad17d/src.ts/key_stores/browser_local_storage_key_store.ts#L22)*

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

*Defined in [key_stores/browser_local_storage_key_store.ts:42](https://github.com/near/near-api-js/blob/88ad17d/src.ts/key_stores/browser_local_storage_key_store.ts#L42)*

**Returns:** *Promise‹string[]›*

___

###  removeKey

▸ **removeKey**(`networkId`: string, `accountId`: string): *Promise‹void›*

*Overrides [KeyStore](keystore.md).[removeKey](keystore.md#abstract-removekey)*

*Defined in [key_stores/browser_local_storage_key_store.ts:30](https://github.com/near/near-api-js/blob/88ad17d/src.ts/key_stores/browser_local_storage_key_store.ts#L30)*

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

*Defined in [key_stores/browser_local_storage_key_store.ts:18](https://github.com/near/near-api-js/blob/88ad17d/src.ts/key_stores/browser_local_storage_key_store.ts#L18)*

**Parameters:**

Name | Type |
------ | ------ |
`networkId` | string |
`accountId` | string |
`keyPair` | [KeyPair](keypair.md) |

**Returns:** *Promise‹void›*

___

### `Private` storageKeyForSecretKey

▸ **storageKeyForSecretKey**(`networkId`: string, `accountId`: string): *string*

*Defined in [key_stores/browser_local_storage_key_store.ts:66](https://github.com/near/near-api-js/blob/88ad17d/src.ts/key_stores/browser_local_storage_key_store.ts#L66)*

**Parameters:**

Name | Type |
------ | ------ |
`networkId` | string |
`accountId` | string |

**Returns:** *string*

___

### `Private` storageKeys

▸ **storageKeys**(): *IterableIterator‹string›*

*Defined in [key_stores/browser_local_storage_key_store.ts:70](https://github.com/near/near-api-js/blob/88ad17d/src.ts/key_stores/browser_local_storage_key_store.ts#L70)*

**Returns:** *IterableIterator‹string›*
