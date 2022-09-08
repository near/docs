---
id: "key_stores_merge_key_store.MergeKeyStore"
title: "Class: MergeKeyStore"
sidebar_label: "MergeKeyStore"
custom_edit_url: null
---

[key_stores/merge_key_store](../modules/key_stores_merge_key_store.md).MergeKeyStore

KeyStores are passed to Near via NearConfig
and are used by the InMemorySigner to sign transactions.

**`Example`**

```ts
{@link connect}
```

## Hierarchy

- [`KeyStore`](key_stores_keystore.KeyStore.md)

  ↳ **`MergeKeyStore`**

## Constructors

### constructor

**new MergeKeyStore**(`keyStores`, `options?`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keyStores` | [`KeyStore`](key_stores_keystore.KeyStore.md)[] | read calls are attempted from start to end of array |
| `options` | `MergeKeyStoreOptions` | - |

#### Overrides

[KeyStore](key_stores_keystore.KeyStore.md).[constructor](key_stores_keystore.KeyStore.md#constructor)

#### Defined in

[key_stores/merge_key_store.ts:50](https://github.com/near/near-api-js/blob/ecc6fa8f/packages/near-api-js/src/key_stores/merge_key_store.ts#L50)

## Properties

### keyStores

 **keyStores**: [`KeyStore`](key_stores_keystore.KeyStore.md)[]

#### Defined in

[key_stores/merge_key_store.ts:44](https://github.com/near/near-api-js/blob/ecc6fa8f/packages/near-api-js/src/key_stores/merge_key_store.ts#L44)

___

### options

 `Private` **options**: `MergeKeyStoreOptions`

#### Defined in

[key_stores/merge_key_store.ts:43](https://github.com/near/near-api-js/blob/ecc6fa8f/packages/near-api-js/src/key_stores/merge_key_store.ts#L43)

## Methods

### clear

**clear**(): `Promise`<`void`\>

Removes all items from each key store

#### Returns

`Promise`<`void`\>

#### Overrides

[KeyStore](key_stores_keystore.KeyStore.md).[clear](key_stores_keystore.KeyStore.md#clear)

#### Defined in

[key_stores/merge_key_store.ts:96](https://github.com/near/near-api-js/blob/ecc6fa8f/packages/near-api-js/src/key_stores/merge_key_store.ts#L96)

___

### getAccounts

**getAccounts**(`networkId`): `Promise`<`string`[]\>

Gets the account(s) from the array of key stores

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `networkId` | `string` | The targeted network. (ex. default, betanet, etc…) @returns{Promise<string[]>} |

#### Returns

`Promise`<`string`[]\>

#### Overrides

[KeyStore](key_stores_keystore.KeyStore.md).[getAccounts](key_stores_keystore.KeyStore.md#getaccounts)

#### Defined in

[key_stores/merge_key_store.ts:121](https://github.com/near/near-api-js/blob/ecc6fa8f/packages/near-api-js/src/key_stores/merge_key_store.ts#L121)

___

### getKey

**getKey**(`networkId`, `accountId`): `Promise`<[`KeyPair`](utils_key_pair.KeyPair.md)\>

Gets a KeyPair from the array of key stores

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

[key_stores/merge_key_store.ts:72](https://github.com/near/near-api-js/blob/ecc6fa8f/packages/near-api-js/src/key_stores/merge_key_store.ts#L72)

___

### getNetworks

**getNetworks**(): `Promise`<`string`[]\>

Get the network(s) from the array of key stores

#### Returns

`Promise`<`string`[]\>

#### Overrides

[KeyStore](key_stores_keystore.KeyStore.md).[getNetworks](key_stores_keystore.KeyStore.md#getnetworks)

#### Defined in

[key_stores/merge_key_store.ts:106](https://github.com/near/near-api-js/blob/ecc6fa8f/packages/near-api-js/src/key_stores/merge_key_store.ts#L106)

___

### removeKey

**removeKey**(`networkId`, `accountId`): `Promise`<`void`\>

Removes a KeyPair from the array of key stores

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

[key_stores/merge_key_store.ts:87](https://github.com/near/near-api-js/blob/ecc6fa8f/packages/near-api-js/src/key_stores/merge_key_store.ts#L87)

___

### setKey

**setKey**(`networkId`, `accountId`, `keyPair`): `Promise`<`void`\>

Store a KeyPain to the first index of a key store array

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

[key_stores/merge_key_store.ts:62](https://github.com/near/near-api-js/blob/ecc6fa8f/packages/near-api-js/src/key_stores/merge_key_store.ts#L62)
