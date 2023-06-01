---
id: "key_stores_in_memory_key_store.InMemoryKeyStore"
title: "Class: InMemoryKeyStore"
sidebar_label: "InMemoryKeyStore"
custom_edit_url: null
---

[key_stores/in_memory_key_store](../modules/key_stores_in_memory_key_store.md).InMemoryKeyStore

Simple in-memory keystore for mainly for testing purposes.

**`See`**

[https://docs.near.org/docs/develop/front-end/naj-quick-reference#key-store](https://docs.near.org/docs/develop/front-end/naj-quick-reference#key-store)

**`Example`**

```js
import { connect, keyStores, utils } from 'near-api-js';

const privateKey = '.......';
const keyPair = utils.KeyPair.fromString(privateKey);

const keyStore = new keyStores.InMemoryKeyStore();
keyStore.setKey('testnet', 'example-account.testnet', keyPair);

const config = { 
  keyStore, // instance of InMemoryKeyStore
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

  ↳ **`InMemoryKeyStore`**

## Constructors

### constructor

**new InMemoryKeyStore**()

#### Overrides

[KeyStore](key_stores_keystore.KeyStore.md).[constructor](key_stores_keystore.KeyStore.md#constructor)

#### Defined in

[key_stores/in_memory_key_store.ts:35](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/key_stores/in_memory_key_store.ts#L35)

## Methods

### clear

**clear**(): `Promise`<`void`\>

Removes all [KeyPair](utils_key_pair.KeyPair.md) from in-memory storage

#### Returns

`Promise`<`void`\>

#### Overrides

[KeyStore](key_stores_keystore.KeyStore.md).[clear](key_stores_keystore.KeyStore.md#clear)

#### Defined in

[key_stores/in_memory_key_store.ts:76](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/key_stores/in_memory_key_store.ts#L76)

___

### getAccounts

**getAccounts**(`networkId`): `Promise`<`string`[]\>

Gets the account(s) from in-memory storage

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `networkId` | `string` | The targeted network. (ex. default, betanet, etc…) |

#### Returns

`Promise`<`string`[]\>

#### Overrides

[KeyStore](key_stores_keystore.KeyStore.md).[getAccounts](key_stores_keystore.KeyStore.md#getaccounts)

#### Defined in

[key_stores/in_memory_key_store.ts:97](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/key_stores/in_memory_key_store.ts#L97)

___

### getKey

**getKey**(`networkId`, `accountId`): `Promise`<[`KeyPair`](utils_key_pair.KeyPair.md)\>

Gets a [KeyPair](utils_key_pair.KeyPair.md) from in-memory storage

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

[key_stores/in_memory_key_store.ts:56](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/key_stores/in_memory_key_store.ts#L56)

___

### getNetworks

**getNetworks**(): `Promise`<`string`[]\>

Get the network(s) from in-memory storage

#### Returns

`Promise`<`string`[]\>

#### Overrides

[KeyStore](key_stores_keystore.KeyStore.md).[getNetworks](key_stores_keystore.KeyStore.md#getnetworks)

#### Defined in

[key_stores/in_memory_key_store.ts:84](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/key_stores/in_memory_key_store.ts#L84)

___

### removeKey

**removeKey**(`networkId`, `accountId`): `Promise`<`void`\>

Removes a [KeyPair](utils_key_pair.KeyPair.md) from in-memory storage

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

[key_stores/in_memory_key_store.ts:69](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/key_stores/in_memory_key_store.ts#L69)

___

### setKey

**setKey**(`networkId`, `accountId`, `keyPair`): `Promise`<`void`\>

Stores a [KeyPair](utils_key_pair.KeyPair.md) in in-memory storage item

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

[key_stores/in_memory_key_store.ts:46](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/key_stores/in_memory_key_store.ts#L46)
