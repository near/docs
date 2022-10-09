---
id: "connect.ConnectConfig"
title: "Interface: ConnectConfig"
sidebar_label: "ConnectConfig"
custom_edit_url: null
---

[connect](../modules/connect.md).ConnectConfig

## Hierarchy

- [`NearConfig`](near.NearConfig.md)

  ↳ **`ConnectConfig`**

## Properties

### headers

 `Optional` **headers**: `Object`

NEAR RPC API headers. Can be used to pass API KEY and other parameters.

**`See`**

[JsonRpcProvider](../classes/providers_json_rpc_provider.JsonRpcProvider.md)

#### Index signature

▪ [key: `string`]: `string` \| `number`

#### Inherited from

[NearConfig](near.NearConfig.md).[headers](near.NearConfig.md#headers)

#### Defined in

[near.ts:58](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/near.ts#L58)

___

### helperUrl

 `Optional` **helperUrl**: `string`

[NEAR Contract Helper](https://github.com/near/near-contract-helper) url used to create accounts if no master account is provided

**`See`**

[UrlAccountCreator](../classes/account_creator.UrlAccountCreator.md)

#### Inherited from

[NearConfig](near.NearConfig.md).[helperUrl](near.NearConfig.md#helperurl)

#### Defined in

[near.ts:29](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/near.ts#L29)

___

### initialBalance

 `Optional` **initialBalance**: `string`

The balance transferred from the [masterAccount](connect.ConnectConfig.md#masteraccount) to a created account

**`See`**

[LocalAccountCreator](../classes/account_creator.LocalAccountCreator.md)

#### Inherited from

[NearConfig](near.NearConfig.md).[initialBalance](near.NearConfig.md#initialbalance)

#### Defined in

[near.ts:35](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/near.ts#L35)

___

### jsvmAccountId

 `Optional` **jsvmAccountId**: `string`

JVSM account ID for NEAR JS SDK

#### Inherited from

[NearConfig](near.NearConfig.md).[jsvmAccountId](near.NearConfig.md#jsvmaccountid)

#### Defined in

[near.ts:69](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/near.ts#L69)

___

### keyPath

 `Optional` **keyPath**: `string`

Initialize an [InMemoryKeyStore](../classes/key_stores_in_memory_key_store.InMemoryKeyStore.md) by reading the file at keyPath.

#### Defined in

[connect.ts:36](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/connect.ts#L36)

___

### keyStore

 `Optional` **keyStore**: [`KeyStore`](../classes/key_stores_keystore.KeyStore.md)

Holds [KeyPairs](../classes/utils_key_pair.KeyPair.md) for signing transactions

#### Inherited from

[NearConfig](near.NearConfig.md).[keyStore](near.NearConfig.md#keystore)

#### Defined in

[near.ts:20](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/near.ts#L20)

___

### masterAccount

 `Optional` **masterAccount**: `string`

The account to use when creating new accounts

**`See`**

[LocalAccountCreator](../classes/account_creator.LocalAccountCreator.md)

#### Inherited from

[NearConfig](near.NearConfig.md).[masterAccount](near.NearConfig.md#masteraccount)

#### Defined in

[near.ts:41](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/near.ts#L41)

___

### networkId

 **networkId**: `string`

[KeyPairs](../classes/utils_key_pair.KeyPair.md) are stored in a [KeyStore](../classes/key_stores_keystore.KeyStore.md) under the `networkId` namespace.

#### Inherited from

[NearConfig](near.NearConfig.md).[networkId](near.NearConfig.md#networkid)

#### Defined in

[near.ts:46](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/near.ts#L46)

___

### nodeUrl

 **nodeUrl**: `string`

NEAR RPC API url. used to make JSON RPC calls to interact with NEAR.

**`See`**

[JsonRpcProvider](../classes/providers_json_rpc_provider.JsonRpcProvider.md)

#### Inherited from

[NearConfig](near.NearConfig.md).[nodeUrl](near.NearConfig.md#nodeurl)

#### Defined in

[near.ts:52](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/near.ts#L52)

___

### walletUrl

 `Optional` **walletUrl**: `string`

NEAR wallet url used to redirect users to their wallet in browser applications.

**`See`**

[https://wallet.near.org/](https://wallet.near.org/)

#### Inherited from

[NearConfig](near.NearConfig.md).[walletUrl](near.NearConfig.md#walleturl)

#### Defined in

[near.ts:64](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/near.ts#L64)
