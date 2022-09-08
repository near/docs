---
id: "near.NearConfig"
title: "Interface: NearConfig"
sidebar_label: "NearConfig"
custom_edit_url: null
---

[near](../modules/near.md).NearConfig

## Hierarchy

- **`NearConfig`**

  ↳ [`ConnectConfig`](browserConnect.ConnectConfig.md)

  ↳ [`ConnectConfig`](connect.ConnectConfig.md)

## Properties

### headers

 `Optional` **headers**: `Object`

NEAR RPC API headers. Can be used to pass API KEY and other parameters.

**`See`**

JsonRpcProvider.JsonRpcProvider | JsonRpcProvider

#### Index signature

▪ [key: `string`]: `string` \| `number`

#### Defined in

[near.ts:58](https://github.com/near/near-api-js/blob/ecc6fa8f/packages/near-api-js/src/near.ts#L58)

___

### helperUrl

 `Optional` **helperUrl**: `string`

[NEAR Contract Helper](https://github.com/near/near-contract-helper) url used to create accounts if no master account is provided

**`See`**

UrlAccountCreator

#### Defined in

[near.ts:29](https://github.com/near/near-api-js/blob/ecc6fa8f/packages/near-api-js/src/near.ts#L29)

___

### initialBalance

 `Optional` **initialBalance**: `string`

The balance transferred from the [masterAccount](near.NearConfig.md#masteraccount) to a created account

**`See`**

LocalAccountCreator

#### Defined in

[near.ts:35](https://github.com/near/near-api-js/blob/ecc6fa8f/packages/near-api-js/src/near.ts#L35)

___

### jsvmAccountId

 `Optional` **jsvmAccountId**: `string`

JVSM account ID for NEAR JS SDK

#### Defined in

[near.ts:69](https://github.com/near/near-api-js/blob/ecc6fa8f/packages/near-api-js/src/near.ts#L69)

___

### keyStore

 `Optional` **keyStore**: [`KeyStore`](../classes/key_stores_keystore.KeyStore.md)

Holds KeyPair | KeyPairs for signing transactions

#### Defined in

[near.ts:20](https://github.com/near/near-api-js/blob/ecc6fa8f/packages/near-api-js/src/near.ts#L20)

___

### masterAccount

 `Optional` **masterAccount**: `string`

The account to use when creating new accounts

**`See`**

LocalAccountCreator

#### Defined in

[near.ts:41](https://github.com/near/near-api-js/blob/ecc6fa8f/packages/near-api-js/src/near.ts#L41)

___

### networkId

 **networkId**: `string`

KeyPair | KeyPairs are stored in a KeyStore under the `networkId` namespace.

#### Defined in

[near.ts:46](https://github.com/near/near-api-js/blob/ecc6fa8f/packages/near-api-js/src/near.ts#L46)

___

### nodeUrl

 **nodeUrl**: `string`

NEAR RPC API url. used to make JSON RPC calls to interact with NEAR.

**`See`**

JsonRpcProvider.JsonRpcProvider | JsonRpcProvider

#### Defined in

[near.ts:52](https://github.com/near/near-api-js/blob/ecc6fa8f/packages/near-api-js/src/near.ts#L52)

___

### walletUrl

 `Optional` **walletUrl**: `string`

NEAR wallet url used to redirect users to their wallet in browser applications.

**`See`**

[https://docs.near.org/docs/tools/near-wallet](https://docs.near.org/docs/tools/near-wallet)

#### Defined in

[near.ts:64](https://github.com/near/near-api-js/blob/ecc6fa8f/packages/near-api-js/src/near.ts#L64)
