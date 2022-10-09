---
id: "walletAccount.ConnectedWalletAccount"
title: "Class: ConnectedWalletAccount"
sidebar_label: "ConnectedWalletAccount"
custom_edit_url: null
---

[walletAccount](../modules/walletAccount.md).ConnectedWalletAccount

[Account](account.Account.md) implementation which redirects to wallet using [WalletConnection](walletAccount.WalletConnection.md) when no local key is available.

## Hierarchy

- [`Account`](account.Account.md)

  ↳ **`ConnectedWalletAccount`**

## Constructors

### constructor

**new ConnectedWalletAccount**(`walletConnection`, `connection`, `accountId`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `walletConnection` | [`WalletConnection`](walletAccount.WalletConnection.md) |
| `connection` | [`Connection`](connection.Connection.md) |
| `accountId` | `string` |

#### Overrides

[Account](account.Account.md).[constructor](account.Account.md#constructor)

#### Defined in

[wallet-account.ts:287](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/wallet-account.ts#L287)

## Properties

### accountId

 `Readonly` **accountId**: `string`

#### Inherited from

[Account](account.Account.md).[accountId](account.Account.md#accountid)

#### Defined in

[account.ts:161](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L161)

___

### connection

 `Readonly` **connection**: [`Connection`](connection.Connection.md)

#### Inherited from

[Account](account.Account.md).[connection](account.Account.md#connection)

#### Defined in

[account.ts:160](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L160)

___

### walletConnection

 **walletConnection**: [`WalletConnection`](walletAccount.WalletConnection.md)

#### Defined in

[wallet-account.ts:285](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/wallet-account.ts#L285)

## Methods

### accessKeyForTransaction

**accessKeyForTransaction**(`receiverId`, `actions`, `localKey?`): `Promise`<`any`\>

Helper function returning the access key (if it exists) to the receiver that grants the designated permission

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `receiverId` | `string` | The NEAR account seeking the access key for a transaction |
| `actions` | [`Action`](transaction.Action.md)[] | The action(s) sought to gain access to |
| `localKey?` | [`PublicKey`](utils_key_pair.PublicKey.md) | A local public key provided to check for access |

#### Returns

`Promise`<`any`\>

#### Defined in

[wallet-account.ts:383](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/wallet-account.ts#L383)

___

### accessKeyMatchesTransaction

**accessKeyMatchesTransaction**(`accessKey`, `receiverId`, `actions`): `Promise`<`boolean`\>

Check if given access key allows the function call or method attempted in transaction

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `accessKey` | `any` | Array of {access_key: AccessKey, public_key: PublicKey} items |
| `receiverId` | `string` | The NEAR account attempting to have access |
| `actions` | [`Action`](transaction.Action.md)[] | The action(s) needed to be checked for access |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[wallet-account.ts:346](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/wallet-account.ts#L346)

___

### addKey

**addKey**(`publicKey`, `contractId?`, `methodNames?`, `amount?`): `Promise`<[`FinalExecutionOutcome`](../interfaces/providers_provider.FinalExecutionOutcome.md)\>

**`See`**

[https://docs.near.org/concepts/basics/accounts/access-keys](https://docs.near.org/concepts/basics/accounts/access-keys)

**`Todo`**

expand this API to support more options.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `publicKey` | `string` \| [`PublicKey`](utils_key_pair.PublicKey.md) | A public key to be associated with the contract |
| `contractId?` | `string` | NEAR account where the contract is deployed |
| `methodNames?` | `string` \| `string`[] | The method names on the contract that should be allowed to be called. Pass null for no method names and '' or [] for any method names. |
| `amount?` | `BN` | Payment in yoctoⓃ that is sent to the contract during this function call |

#### Returns

`Promise`<[`FinalExecutionOutcome`](../interfaces/providers_provider.FinalExecutionOutcome.md)\>

#### Inherited from

[Account](account.Account.md).[addKey](account.Account.md#addkey)

#### Defined in

[account.ts:443](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L443)

___

### createAccount

**createAccount**(`newAccountId`, `publicKey`, `amount`): `Promise`<[`FinalExecutionOutcome`](../interfaces/providers_provider.FinalExecutionOutcome.md)\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `newAccountId` | `string` | NEAR account name to be created |
| `publicKey` | `string` \| [`PublicKey`](utils_key_pair.PublicKey.md) | A public key created from the masterAccount |
| `amount` | `BN` | - |

#### Returns

`Promise`<[`FinalExecutionOutcome`](../interfaces/providers_provider.FinalExecutionOutcome.md)\>

#### Inherited from

[Account](account.Account.md).[createAccount](account.Account.md#createaccount)

#### Defined in

[account.ts:374](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L374)

___

### createAndDeployContract

**createAndDeployContract**(`contractId`, `publicKey`, `data`, `amount`): `Promise`<[`Account`](account.Account.md)\>

Create a new account and deploy a contract to it

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractId` | `string` | NEAR account where the contract is deployed |
| `publicKey` | `string` \| [`PublicKey`](utils_key_pair.PublicKey.md) | The public key to add to the created contract account |
| `data` | `Uint8Array` | The compiled contract code |
| `amount` | `BN` | of NEAR to transfer to the created contract account. Transfer enough to pay for storage https://docs.near.org/docs/concepts/storage-staking |

#### Returns

`Promise`<[`Account`](account.Account.md)\>

#### Inherited from

[Account](account.Account.md).[createAndDeployContract](account.Account.md#createanddeploycontract)

#### Defined in

[account.ts:349](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L349)

___

### deleteAccount

**deleteAccount**(`beneficiaryId`): `Promise`<[`FinalExecutionOutcome`](../interfaces/providers_provider.FinalExecutionOutcome.md)\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `beneficiaryId` | `string` | The NEAR account that will receive the remaining Ⓝ balance from the account being deleted |

#### Returns

`Promise`<[`FinalExecutionOutcome`](../interfaces/providers_provider.FinalExecutionOutcome.md)\>

#### Inherited from

[Account](account.Account.md).[deleteAccount](account.Account.md#deleteaccount)

#### Defined in

[account.ts:385](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L385)

___

### deleteKey

**deleteKey**(`publicKey`): `Promise`<[`FinalExecutionOutcome`](../interfaces/providers_provider.FinalExecutionOutcome.md)\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `publicKey` | `string` \| [`PublicKey`](utils_key_pair.PublicKey.md) | The public key to be deleted |

#### Returns

`Promise`<[`FinalExecutionOutcome`](../interfaces/providers_provider.FinalExecutionOutcome.md)\>

#### Inherited from

[Account](account.Account.md).[deleteKey](account.Account.md#deletekey)

#### Defined in

[account.ts:466](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L466)

___

### deployContract

**deployContract**(`data`): `Promise`<[`FinalExecutionOutcome`](../interfaces/providers_provider.FinalExecutionOutcome.md)\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `Uint8Array` | The compiled contract code |

#### Returns

`Promise`<[`FinalExecutionOutcome`](../interfaces/providers_provider.FinalExecutionOutcome.md)\>

#### Inherited from

[Account](account.Account.md).[deployContract](account.Account.md#deploycontract)

#### Defined in

[account.ts:398](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L398)

___

### findAccessKey

**findAccessKey**(`receiverId`, `actions`): `Promise`<{ `accessKey`: [`AccessKeyView`](../interfaces/providers_provider.AccessKeyView.md) ; `publicKey`: [`PublicKey`](utils_key_pair.PublicKey.md)  }\>

Finds the [AccessKeyView](../interfaces/providers_provider.AccessKeyView.md) associated with the accounts [PublicKey](utils_key_pair.PublicKey.md) stored in the [KeyStore](key_stores_keystore.KeyStore.md).

**`Todo`**

Find matching access key based on transaction (i.e. receiverId and actions)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `receiverId` | `string` | currently unused (see todo) |
| `actions` | [`Action`](transaction.Action.md)[] | currently unused (see todo) |

#### Returns

`Promise`<{ `accessKey`: [`AccessKeyView`](../interfaces/providers_provider.AccessKeyView.md) ; `publicKey`: [`PublicKey`](utils_key_pair.PublicKey.md)  }\>

`{ publicKey PublicKey; accessKey: AccessKeyView }`

#### Inherited from

[Account](account.Account.md).[findAccessKey](account.Account.md#findaccesskey)

#### Defined in

[account.ts:297](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L297)

___

### functionCall

**functionCall**(`__namedParameters`): `Promise`<[`FinalExecutionOutcome`](../interfaces/providers_provider.FinalExecutionOutcome.md)\>

Execute function call

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`ChangeFunctionCallOptions`](../interfaces/account.ChangeFunctionCallOptions.md) |

#### Returns

`Promise`<[`FinalExecutionOutcome`](../interfaces/providers_provider.FinalExecutionOutcome.md)\>

#### Inherited from

[Account](account.Account.md).[functionCall](account.Account.md#functioncall)

#### Defined in

[account.ts:414](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L414)

___

### getAccessKeys

**getAccessKeys**(): `Promise`<[`AccessKeyInfoView`](../interfaces/providers_provider.AccessKeyInfoView.md)[]\>

Get all access keys for the account

**`See`**

[https://docs.near.org/api/rpc/access-keys#view-access-key-list](https://docs.near.org/api/rpc/access-keys#view-access-key-list)

#### Returns

`Promise`<[`AccessKeyInfoView`](../interfaces/providers_provider.AccessKeyInfoView.md)[]\>

#### Inherited from

[Account](account.Account.md).[getAccessKeys](account.Account.md#getaccesskeys)

#### Defined in

[account.ts:595](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L595)

___

### getAccountBalance

**getAccountBalance**(): `Promise`<[`AccountBalance`](../interfaces/account.AccountBalance.md)\>

Returns calculated account balance

#### Returns

`Promise`<[`AccountBalance`](../interfaces/account.AccountBalance.md)\>

#### Inherited from

[Account](account.Account.md).[getAccountBalance](account.Account.md#getaccountbalance)

#### Defined in

[account.ts:629](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L629)

___

### getAccountDetails

**getAccountDetails**(): `Promise`<{ `authorizedApps`: [`AccountAuthorizedApp`](../interfaces/account.AccountAuthorizedApp.md)[]  }\>

Returns a list of authorized apps

**`Todo`**

update the response value to return all the different keys, not just app keys.

#### Returns

`Promise`<{ `authorizedApps`: [`AccountAuthorizedApp`](../interfaces/account.AccountAuthorizedApp.md)[]  }\>

#### Inherited from

[Account](account.Account.md).[getAccountDetails](account.Account.md#getaccountdetails)

#### Defined in

[account.ts:609](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L609)

___

### getActiveDelegatedStakeBalance

**getActiveDelegatedStakeBalance**(): `Promise`<`ActiveDelegatedStakeBalance`\>

Returns the NEAR tokens balance and validators of a given account that is delegated to the staking pools that are part of the validators set in the current epoch.

NOTE: If the tokens are delegated to a staking pool that is currently on pause or does not have enough tokens to participate in validation, they won't be accounted for.

#### Returns

`Promise`<`ActiveDelegatedStakeBalance`\>

#### Inherited from

[Account](account.Account.md).[getActiveDelegatedStakeBalance](account.Account.md#getactivedelegatedstakebalance)

#### Defined in

[account.ts:653](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L653)

___

### sendMoney

**sendMoney**(`receiverId`, `amount`): `Promise`<[`FinalExecutionOutcome`](../interfaces/providers_provider.FinalExecutionOutcome.md)\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `receiverId` | `string` | NEAR account receiving Ⓝ |
| `amount` | `BN` | Amount to send in yoctoⓃ |

#### Returns

`Promise`<[`FinalExecutionOutcome`](../interfaces/providers_provider.FinalExecutionOutcome.md)\>

#### Inherited from

[Account](account.Account.md).[sendMoney](account.Account.md#sendmoney)

#### Defined in

[account.ts:363](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L363)

___

### signAndSendTransaction

`Protected` **signAndSendTransaction**(`__namedParameters`): `Promise`<[`FinalExecutionOutcome`](../interfaces/providers_provider.FinalExecutionOutcome.md)\>

Sign a transaction by redirecting to the NEAR Wallet

**`See`**

[requestSignTransactions](walletAccount.WalletConnection.md#requestsigntransactions)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`SignAndSendTransactionOptions`](../interfaces/account.SignAndSendTransactionOptions.md) |

#### Returns

`Promise`<[`FinalExecutionOutcome`](../interfaces/providers_provider.FinalExecutionOutcome.md)\>

#### Overrides

[Account](account.Account.md).[signAndSendTransaction](account.Account.md#signandsendtransaction)

#### Defined in

[wallet-account.ts:298](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/wallet-account.ts#L298)

___

### signTransaction

`Protected` **signTransaction**(`receiverId`, `actions`): `Promise`<[`Uint8Array`, [`SignedTransaction`](transaction.SignedTransaction.md)]\>

Create a signed transaction which can be broadcast to the network

**`See`**

[JsonRpcProvider.sendTransaction](providers_json_rpc_provider.JsonRpcProvider.md#sendtransaction)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `receiverId` | `string` | NEAR account receiving the transaction |
| `actions` | [`Action`](transaction.Action.md)[] | list of actions to perform as part of the transaction |

#### Returns

`Promise`<[`Uint8Array`, [`SignedTransaction`](transaction.SignedTransaction.md)]\>

#### Inherited from

[Account](account.Account.md).[signTransaction](account.Account.md#signtransaction)

#### Defined in

[account.ts:208](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L208)

___

### stake

**stake**(`publicKey`, `amount`): `Promise`<[`FinalExecutionOutcome`](../interfaces/providers_provider.FinalExecutionOutcome.md)\>

**`See`**

[https://near-nodes.io/validator/staking-and-delegation](https://near-nodes.io/validator/staking-and-delegation)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `publicKey` | `string` \| [`PublicKey`](utils_key_pair.PublicKey.md) | The public key for the account that's staking |
| `amount` | `BN` | The account to stake in yoctoⓃ |

#### Returns

`Promise`<[`FinalExecutionOutcome`](../interfaces/providers_provider.FinalExecutionOutcome.md)\>

#### Inherited from

[Account](account.Account.md).[stake](account.Account.md#stake)

#### Defined in

[account.ts:479](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L479)

___

### state

**state**(): `Promise`<[`AccountView`](../interfaces/providers_provider.AccountView.md)\>

Returns basic NEAR account information via the `view_account` RPC query method

**`See`**

[https://docs.near.org/api/rpc/contracts#view-account](https://docs.near.org/api/rpc/contracts#view-account)

#### Returns

`Promise`<[`AccountView`](../interfaces/providers_provider.AccountView.md)\>

#### Inherited from

[Account](account.Account.md).[state](account.Account.md#state)

#### Defined in

[account.ts:172](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L172)

___

### viewFunction

**viewFunction**(...`restArgs`): `Promise`<`any`\>

Invoke a contract view function using the RPC API.

**`See`**

[https://docs.near.org/api/rpc/contracts#call-a-contract-function](https://docs.near.org/api/rpc/contracts#call-a-contract-function)

#### Parameters

| Name | Type |
| :------ | :------ |
| `...restArgs` | `any` |

#### Returns

`Promise`<`any`\>

#### Inherited from

[Account](account.Account.md).[viewFunction](account.Account.md#viewfunction)

#### Defined in

[account.ts:512](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L512)

___

### viewFunctionV1

**viewFunctionV1**(`contractId`, `methodName`, `args?`, `__namedParameters?`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractId` | `string` |
| `methodName` | `string` |
| `args` | `any` |
| `__namedParameters` | `Object` |
| `__namedParameters.blockQuery?` | [`BlockReference`](../modules/providers_provider.md#blockreference) |
| `__namedParameters.jsContract?` | `boolean` |
| `__namedParameters.parse?` | (`response`: `Uint8Array`) => `any` |
| `__namedParameters.stringify?` | (`input`: `any`) => `Buffer` |

#### Returns

`Promise`<`any`\>

#### Inherited from

[Account](account.Account.md).[viewFunctionV1](account.Account.md#viewfunctionv1)

#### Defined in

[account.ts:524](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L524)

___

### viewFunctionV2

**viewFunctionV2**(`__namedParameters`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`ViewFunctionCallOptions`](../interfaces/account.ViewFunctionCallOptions.md) |

#### Returns

`Promise`<`any`\>

#### Inherited from

[Account](account.Account.md).[viewFunctionV2](account.Account.md#viewfunctionv2)

#### Defined in

[account.ts:535](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L535)

___

### viewState

**viewState**(`prefix`, `blockQuery?`): `Promise`<{ `key`: `Buffer` ; `value`: `Buffer`  }[]\>

Returns the state (key value pairs) of this account's contract based on the key prefix.
Pass an empty string for prefix if you would like to return the entire state.

**`See`**

[https://docs.near.org/api/rpc/contracts#view-contract-state](https://docs.near.org/api/rpc/contracts#view-contract-state)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `string` \| `Uint8Array` | allows to filter which keys should be returned. Empty prefix means all keys. String prefix is utf-8 encoded. |
| `blockQuery` | [`BlockReference`](../modules/providers_provider.md#blockreference) | specifies which block to query state at. By default returns last "optimistic" block (i.e. not necessarily finalized). |

#### Returns

`Promise`<{ `key`: `Buffer` ; `value`: `Buffer`  }[]\>

#### Inherited from

[Account](account.Account.md).[viewState](account.Account.md#viewstate)

#### Defined in

[account.ts:577](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L577)
