---
id: "key_stores_browser_local_storage_key_store.BrowserLocalStorageKeyStore"
title: "Class: BrowserLocalStorageKeyStore"
sidebar_label: "BrowserLocalStorageKeyStore"
custom_edit_url: null
---

[key_stores/browser_local_storage_key_store](../modules/key_stores_browser_local_storage_key_store.md).BrowserLocalStorageKeyStore

This class is used to store keys in the browsers local storage.

**`See`**

[https://docs.near.org/docs/develop/front-end/naj-quick-reference#key-store](https://docs.near.org/docs/develop/front-end/naj-quick-reference#key-store)

**`Example`**

```js
import { connect, keyStores } from 'near-api-js';

const keyStore = new keyStores.BrowserLocalStorageKeyStore();
const config = { 
  keyStore, // instance of BrowserLocalStorageKeyStore
  networkId: 'testnet',
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org',
  helperUrl: 'https://helper.testnet.near.org',
  explorerUrl: 'https://explorer.testnet.near.org'
};

// inside an async function
const near = await connect(config)
```

## Hierarchy

- [`KeyStore`](key_stores_keystore.KeyStore.md)

  ↳ **`BrowserLocalStorageKeyStore`**

## Constructors

### constructor

**new BrowserLocalStorageKeyStore**(`localStorage?`, `prefix?`)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `localStorage` | `any` | `window.localStorage` | defaults to window.localStorage |
| `prefix` | `string` | `LOCAL_STORAGE_KEY_PREFIX` | defaults to `near-api-js:keystore:` |

#### Overrides

[KeyStore](key_stores_keystore.KeyStore.md).[constructor](key_stores_keystore.KeyStore.md#constructor)

#### Defined in

[key_stores/browser_local_storage_key_store.ts:38](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/key_stores/browser_local_storage_key_store.ts#L38)

## Methods

### clear

**clear**(): `Promise`<`void`\>

Removes all items that start with `prefix` from local storage

#### Returns

`Promise`<`void`\>

#### Overrides

[KeyStore](key_stores_keystore.KeyStore.md).[clear](key_stores_keystore.KeyStore.md#clear)

#### Defined in

[key_stores/browser_local_storage_key_store.ts:80](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/key_stores/browser_local_storage_key_store.ts#L80)

___

### getAccounts

**getAccounts**(`networkId`): `Promise`<`string`[]\>

Gets the account(s) from local storage

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `networkId` | `string` | The targeted network. (ex. default, betanet, etc…) |

#### Returns

`Promise`<`string`[]\>

#### Overrides

[KeyStore](key_stores_keystore.KeyStore.md).[getAccounts](key_stores_keystore.KeyStore.md#getaccounts)

#### Defined in

[key_stores/browser_local_storage_key_store.ts:107](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/key_stores/browser_local_storage_key_store.ts#L107)

___

### getKey

**getKey**(`networkId`, `accountId`): `Promise`<[`KeyPair`](utils_key_pair.KeyPair.md)\>

Gets a [KeyPair](utils_key_pair.KeyPair.md) from local storage

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `networkId` | `string` | The targeted network. (ex. default, betanet, etc…) |
| `accountId` | `string` | The NEAR account tied to the key pair |

#### Returns

`Promise`<[`KeyPair`](utils_key_pair.KeyPair.md)\>

#### Overrides

[KeyStore](key_stores_keystore.KeyStore.md).[getKey](key_stores_keystore.KeyStore.md#getkey)

#### Defined in

[key_stores/browser_local_storage_key_store.ts:60](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/key_stores/browser_local_storage_key_store.ts#L60)

___

### getNetworks

**getNetworks**(): `Promise`<`string`[]\>

Get the network(s) from local storage

#### Returns

`Promise`<`string`[]\>

#### Overrides

[KeyStore](key_stores_keystore.KeyStore.md).[getNetworks](key_stores_keystore.KeyStore.md#getnetworks)

#### Defined in

[key_stores/browser_local_storage_key_store.ts:92](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/key_stores/browser_local_storage_key_store.ts#L92)

___

### removeKey

**removeKey**(`networkId`, `accountId`): `Promise`<`void`\>

Removes a [KeyPair](utils_key_pair.KeyPair.md) from local storage

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `networkId` | `string` | The targeted network. (ex. default, betanet, etc…) |
| `accountId` | `string` | The NEAR account tied to the key pair |

#### Returns

`Promise`<`void`\>

#### Overrides

[KeyStore](key_stores_keystore.KeyStore.md).[removeKey](key_stores_keystore.KeyStore.md#removekey)

#### Defined in

[key_stores/browser_local_storage_key_store.ts:73](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/key_stores/browser_local_storage_key_store.ts#L73)

___

### setKey

**setKey**(`networkId`, `accountId`, `keyPair`): `Promise`<`void`\>

Stores a [KeyPair](utils_key_pair.KeyPair.md) in local storage.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `networkId` | `string` | The targeted network. (ex. default, betanet, etc…) |
| `accountId` | `string` | The NEAR account tied to the key pair |
| `keyPair` | [`KeyPair`](utils_key_pair.KeyPair.md) | The key pair to store in local storage |

#### Returns

`Promise`<`void`\>

#### Overrides

[KeyStore](key_stores_keystore.KeyStore.md).[setKey](key_stores_keystore.KeyStore.md#setkey)

#### Defined in

[key_stores/browser_local_storage_key_store.ts:50](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/key_stores/browser_local_storage_key_store.ts#L50)
