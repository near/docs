---
id: "key_stores_unencrypted_file_system_keystore.UnencryptedFileSystemKeyStore"
title: "Class: UnencryptedFileSystemKeyStore"
sidebar_label: "UnencryptedFileSystemKeyStore"
custom_edit_url: null
---

[key_stores/unencrypted_file_system_keystore](../modules/key_stores_unencrypted_file_system_keystore.md).UnencryptedFileSystemKeyStore

This class is used to store keys on the file system.

**`See`**

[https://docs.near.org/docs/develop/front-end/naj-quick-reference#key-store](https://docs.near.org/docs/develop/front-end/naj-quick-reference#key-store)

**`Example`**

```js
const { homedir } = require('os');
const { connect, keyStores } = require('near-api-js');

const keyStore = new keyStores.UnencryptedFileSystemKeyStore(`${homedir()}/.near-credentials`);
const config = { 
  keyStore, // instance of UnencryptedFileSystemKeyStore
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

  ↳ **`UnencryptedFileSystemKeyStore`**

## Constructors

### constructor

**new UnencryptedFileSystemKeyStore**(`keyDir`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keyDir` | `string` | base directory for key storage. Keys will be stored in `keyDir/networkId/accountId.json` |

#### Overrides

[KeyStore](key_stores_keystore.KeyStore.md).[constructor](key_stores_keystore.KeyStore.md#constructor)

#### Defined in

[key_stores/unencrypted_file_system_keystore.ts:88](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/key_stores/unencrypted_file_system_keystore.ts#L88)

## Methods

### clear

**clear**(): `Promise`<`void`\>

Deletes all unencrypted files from the `keyDir` path.

#### Returns

`Promise`<`void`\>

#### Overrides

[KeyStore](key_stores_keystore.KeyStore.md).[clear](key_stores_keystore.KeyStore.md#clear)

#### Defined in

[key_stores/unencrypted_file_system_keystore.ts:134](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/key_stores/unencrypted_file_system_keystore.ts#L134)

___

### getAccounts

**getAccounts**(`networkId`): `Promise`<`string`[]\>

Gets the account(s) files in `keyDir/networkId`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `networkId` | `string` | The targeted network. (ex. default, betanet, etc…) |

#### Returns

`Promise`<`string`[]\>

#### Overrides

[KeyStore](key_stores_keystore.KeyStore.md).[getAccounts](key_stores_keystore.KeyStore.md#getaccounts)

#### Defined in

[key_stores/unencrypted_file_system_keystore.ts:164](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/key_stores/unencrypted_file_system_keystore.ts#L164)

___

### getKey

**getKey**(`networkId`, `accountId`): `Promise`<[`KeyPair`](utils_key_pair.KeyPair.md)\>

Gets a [KeyPair](utils_key_pair.KeyPair.md) from an unencrypted file

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

[key_stores/unencrypted_file_system_keystore.ts:111](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/key_stores/unencrypted_file_system_keystore.ts#L111)

___

### getNetworks

**getNetworks**(): `Promise`<`string`[]\>

Get the network(s) from files in `keyDir`

#### Returns

`Promise`<`string`[]\>

#### Overrides

[KeyStore](key_stores_keystore.KeyStore.md).[getNetworks](key_stores_keystore.KeyStore.md#getnetworks)

#### Defined in

[key_stores/unencrypted_file_system_keystore.ts:151](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/key_stores/unencrypted_file_system_keystore.ts#L151)

___

### removeKey

**removeKey**(`networkId`, `accountId`): `Promise`<`void`\>

Deletes an unencrypted file holding a [KeyPair](utils_key_pair.KeyPair.md)

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

[key_stores/unencrypted_file_system_keystore.ts:125](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/key_stores/unencrypted_file_system_keystore.ts#L125)

___

### setKey

**setKey**(`networkId`, `accountId`, `keyPair`): `Promise`<`void`\>

Store a [KeyPair](utils_key_pair.KeyPair.md) in an unencrypted file

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

[key_stores/unencrypted_file_system_keystore.ts:99](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/key_stores/unencrypted_file_system_keystore.ts#L99)
