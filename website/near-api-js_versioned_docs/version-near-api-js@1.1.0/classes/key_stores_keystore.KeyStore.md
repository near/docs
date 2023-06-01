---
id: "key_stores_keystore.KeyStore"
title: "Class: KeyStore"
sidebar_label: "KeyStore"
custom_edit_url: null
---

[key_stores/keystore](../modules/key_stores_keystore.md).KeyStore

KeyStores are passed to [Near](near.Near.md) via [NearConfig](../interfaces/near.NearConfig.md)
and are used by the [InMemorySigner](signer.InMemorySigner.md) to sign transactions.

**`See`**

[connect](../modules/connect.md)

## Hierarchy

- **`KeyStore`**

  ↳ [`BrowserLocalStorageKeyStore`](key_stores_browser_local_storage_key_store.BrowserLocalStorageKeyStore.md)

  ↳ [`InMemoryKeyStore`](key_stores_in_memory_key_store.InMemoryKeyStore.md)

  ↳ [`MergeKeyStore`](key_stores_merge_key_store.MergeKeyStore.md)

  ↳ [`UnencryptedFileSystemKeyStore`](key_stores_unencrypted_file_system_keystore.UnencryptedFileSystemKeyStore.md)

## Constructors

### constructor

**new KeyStore**()

## Methods

### clear

`Abstract` **clear**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[key_stores/keystore.ts:13](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/key_stores/keystore.ts#L13)

___

### getAccounts

`Abstract` **getAccounts**(`networkId`): `Promise`<`string`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `networkId` | `string` |

#### Returns

`Promise`<`string`[]\>

#### Defined in

[key_stores/keystore.ts:15](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/key_stores/keystore.ts#L15)

___

### getKey

`Abstract` **getKey**(`networkId`, `accountId`): `Promise`<[`KeyPair`](utils_key_pair.KeyPair.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `networkId` | `string` |
| `accountId` | `string` |

#### Returns

`Promise`<[`KeyPair`](utils_key_pair.KeyPair.md)\>

#### Defined in

[key_stores/keystore.ts:11](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/key_stores/keystore.ts#L11)

___

### getNetworks

`Abstract` **getNetworks**(): `Promise`<`string`[]\>

#### Returns

`Promise`<`string`[]\>

#### Defined in

[key_stores/keystore.ts:14](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/key_stores/keystore.ts#L14)

___

### removeKey

`Abstract` **removeKey**(`networkId`, `accountId`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `networkId` | `string` |
| `accountId` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[key_stores/keystore.ts:12](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/key_stores/keystore.ts#L12)

___

### setKey

`Abstract` **setKey**(`networkId`, `accountId`, `keyPair`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `networkId` | `string` |
| `accountId` | `string` |
| `keyPair` | [`KeyPair`](utils_key_pair.KeyPair.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[key_stores/keystore.ts:10](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/key_stores/keystore.ts#L10)
