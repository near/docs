---
id: "account_multisig.Account2FA"
title: "Class: Account2FA"
sidebar_label: "Account2FA"
custom_edit_url: null
---

[account_multisig](../modules/account_multisig.md).Account2FA

This class provides common account related RPC calls including signing transactions with a [KeyPair](utils_key_pair.KeyPair.md).

**`Hint`**

Use [WalletConnection](walletAccount.WalletConnection.md) in the browser to redirect to [NEAR Wallet](https://wallet.near.org/) for Account/key management using the [BrowserLocalStorageKeyStore](key_stores_browser_local_storage_key_store.BrowserLocalStorageKeyStore.md).

**`See`**

 - [https://docs.near.org/docs/develop/front-end/naj-quick-reference#account](https://docs.near.org/tools/near-api-js/quick-reference#account)
 - [Account Spec](https://nomicon.io/DataStructures/Account.html)

## Hierarchy

- [`AccountMultisig`](account_multisig.AccountMultisig.md)

  ↳ **`Account2FA`**

## Constructors

### constructor

**new Account2FA**(`connection`, `accountId`, `options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | [`Connection`](connection.Connection.md) |
| `accountId` | `string` |
| `options` | `any` |

#### Overrides

[AccountMultisig](account_multisig.AccountMultisig.md).[constructor](account_multisig.AccountMultisig.md#constructor)

#### Defined in

[account_multisig.ts:223](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account_multisig.ts#L223)

## Properties

### accountId

 `Readonly` **accountId**: `string`

#### Inherited from

[AccountMultisig](account_multisig.AccountMultisig.md).[accountId](account_multisig.AccountMultisig.md#accountid)

#### Defined in

[account.ts:161](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L161)

___

### connection

 `Readonly` **connection**: [`Connection`](connection.Connection.md)

#### Inherited from

[AccountMultisig](account_multisig.AccountMultisig.md).[connection](account_multisig.AccountMultisig.md#connection)

#### Defined in

[account.ts:160](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L160)

___

### getCode

 **getCode**: `getCodeFunction`

#### Defined in

[account_multisig.ts:218](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account_multisig.ts#L218)

___

### helperUrl

 **helperUrl**: `string` = `'https://helper.testnet.near.org'`

#### Defined in

[account_multisig.ts:221](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account_multisig.ts#L221)

___

### onAddRequestResult

 **onAddRequestResult**: (`any`: `any`) => `any`

#### Type declaration

(`any`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `any` | `any` |

##### Returns

`any`

#### Inherited from

[AccountMultisig](account_multisig.AccountMultisig.md).[onAddRequestResult](account_multisig.AccountMultisig.md#onaddrequestresult)

#### Defined in

[account_multisig.ts:53](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account_multisig.ts#L53)

___

### onConfirmResult

 **onConfirmResult**: (`any`: `any`) => `any`

#### Type declaration

(`any`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `any` | `any` |

##### Returns

`any`

#### Defined in

[account_multisig.ts:220](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account_multisig.ts#L220)

___

### sendCode

 **sendCode**: `sendCodeFunction`

******************************
Account2FA has options object where you can provide callbacks for:
- sendCode: how to send the 2FA code in case you don't use NEAR Contract Helper
- getCode: how to get code from user (use this to provide custom UI/UX for prompt of 2FA code)
- onResult: the tx result after it's been confirmed by NEAR Contract Helper
*******************************

#### Defined in

[account_multisig.ts:217](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account_multisig.ts#L217)

___

### storage

 **storage**: `any`

#### Inherited from

[AccountMultisig](account_multisig.AccountMultisig.md).[storage](account_multisig.AccountMultisig.md#storage)

#### Defined in

[account_multisig.ts:52](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account_multisig.ts#L52)

___

### verifyCode

 **verifyCode**: `verifyCodeFunction`

#### Defined in

[account_multisig.ts:219](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account_multisig.ts#L219)

## Methods

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

[AccountMultisig](account_multisig.AccountMultisig.md).[addKey](account_multisig.AccountMultisig.md#addkey)

#### Defined in

[account.ts:443](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L443)

___

### checkMultisigCodeAndStateStatus

**checkMultisigCodeAndStateStatus**(`contractBytes?`): `Promise`<{ `codeStatus`: `MultisigCodeStatus` ; `stateStatus`: [`MultisigStateStatus`](../enums/account_multisig.MultisigStateStatus.md)  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractBytes?` | `Uint8Array` |

#### Returns

`Promise`<{ `codeStatus`: `MultisigCodeStatus` ; `stateStatus`: [`MultisigStateStatus`](../enums/account_multisig.MultisigStateStatus.md)  }\>

#### Inherited from

[AccountMultisig](account_multisig.AccountMultisig.md).[checkMultisigCodeAndStateStatus](account_multisig.AccountMultisig.md#checkmultisigcodeandstatestatus)

#### Defined in

[account_multisig.ts:121](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account_multisig.ts#L121)

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

[AccountMultisig](account_multisig.AccountMultisig.md).[createAccount](account_multisig.AccountMultisig.md#createaccount)

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

[AccountMultisig](account_multisig.AccountMultisig.md).[createAndDeployContract](account_multisig.AccountMultisig.md#createanddeploycontract)

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

[AccountMultisig](account_multisig.AccountMultisig.md).[deleteAccount](account_multisig.AccountMultisig.md#deleteaccount)

#### Defined in

[account.ts:385](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L385)

___

### deleteAllRequests

**deleteAllRequests**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Inherited from

[AccountMultisig](account_multisig.AccountMultisig.md).[deleteAllRequests](account_multisig.AccountMultisig.md#deleteallrequests)

#### Defined in

[account_multisig.ts:160](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account_multisig.ts#L160)

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

[AccountMultisig](account_multisig.AccountMultisig.md).[deleteKey](account_multisig.AccountMultisig.md#deletekey)

#### Defined in

[account.ts:466](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L466)

___

### deleteRequest

**deleteRequest**(`request_id`): `Promise`<[`FinalExecutionOutcome`](../interfaces/providers_provider.FinalExecutionOutcome.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request_id` | `any` |

#### Returns

`Promise`<[`FinalExecutionOutcome`](../interfaces/providers_provider.FinalExecutionOutcome.md)\>

#### Inherited from

[AccountMultisig](account_multisig.AccountMultisig.md).[deleteRequest](account_multisig.AccountMultisig.md#deleterequest)

#### Defined in

[account_multisig.ts:153](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account_multisig.ts#L153)

___

### deleteUnconfirmedRequests

**deleteUnconfirmedRequests**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Inherited from

[AccountMultisig](account_multisig.AccountMultisig.md).[deleteUnconfirmedRequests](account_multisig.AccountMultisig.md#deleteunconfirmedrequests)

#### Defined in

[account_multisig.ts:167](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account_multisig.ts#L167)

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

[AccountMultisig](account_multisig.AccountMultisig.md).[deployContract](account_multisig.AccountMultisig.md#deploycontract)

#### Defined in

[account.ts:398](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L398)

___

### deployMultisig

**deployMultisig**(`contractBytes`): `Promise`<[`FinalExecutionOutcome`](../interfaces/providers_provider.FinalExecutionOutcome.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractBytes` | `Uint8Array` |

#### Returns

`Promise`<[`FinalExecutionOutcome`](../interfaces/providers_provider.FinalExecutionOutcome.md)\>

#### Defined in

[account_multisig.ts:250](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account_multisig.ts#L250)

___

### disable

**disable**(`contractBytes?`, `cleanupContractBytes?`): `Promise`<[`FinalExecutionOutcome`](../interfaces/providers_provider.FinalExecutionOutcome.md)\>

This method converts LAKs back to FAKs, clears state and deploys an 'empty' contract (contractBytes param)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractBytes?` | `Uint8Array` | [https://github.com/near/near-wallet/blob/master/packages/frontend/src/wasm/main.wasm?raw=true](https://github.com/near/near-wallet/blob/master/packages/frontend/src/wasm/main.wasm?raw=true) |
| `cleanupContractBytes?` | `Uint8Array` | [https://github.com/near/core-contracts/blob/master/state-cleanup/res/state_cleanup.wasm?raw=true](https://github.com/near/core-contracts/blob/master/state-cleanup/res/state_cleanup.wasm?raw=true) |

#### Returns

`Promise`<[`FinalExecutionOutcome`](../interfaces/providers_provider.FinalExecutionOutcome.md)\>

#### Defined in

[account_multisig.ts:353](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account_multisig.ts#L353)

___

### disableWithFAK

**disableWithFAK**(`__namedParameters`): `Promise`<[`FinalExecutionOutcome`](../interfaces/providers_provider.FinalExecutionOutcome.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.cleanupContractBytes?` | `Uint8Array` |
| `__namedParameters.contractBytes` | `Uint8Array` |

#### Returns

`Promise`<[`FinalExecutionOutcome`](../interfaces/providers_provider.FinalExecutionOutcome.md)\>

#### Defined in

[account_multisig.ts:288](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account_multisig.ts#L288)

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

[AccountMultisig](account_multisig.AccountMultisig.md).[findAccessKey](account_multisig.AccountMultisig.md#findaccesskey)

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

[AccountMultisig](account_multisig.AccountMultisig.md).[functionCall](account_multisig.AccountMultisig.md#functioncall)

#### Defined in

[account.ts:414](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L414)

___

### get2faDisableCleanupActions

**get2faDisableCleanupActions**(`cleanupContractBytes`): `Promise`<[`Action`](transaction.Action.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `cleanupContractBytes` | `Uint8Array` |

#### Returns

`Promise`<[`Action`](transaction.Action.md)[]\>

#### Defined in

[account_multisig.ts:311](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account_multisig.ts#L311)

___

### get2faDisableKeyConversionActions

**get2faDisableKeyConversionActions**(): `Promise`<[`Action`](transaction.Action.md)[]\>

#### Returns

`Promise`<[`Action`](transaction.Action.md)[]\>

#### Defined in

[account_multisig.ts:329](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account_multisig.ts#L329)

___

### get2faMethod

**get2faMethod**(): `Promise`<{ `detail`: `any` ; `kind`: `any`  }\>

#### Returns

`Promise`<{ `detail`: `any` ; `kind`: `any`  }\>

#### Defined in

[account_multisig.ts:437](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account_multisig.ts#L437)

___

### getAccessKeys

**getAccessKeys**(): `Promise`<[`AccessKeyInfoView`](../interfaces/providers_provider.AccessKeyInfoView.md)[]\>

Get all access keys for the account

**`See`**

[https://docs.near.org/api/rpc/access-keys#view-access-key-list](https://docs.near.org/api/rpc/access-keys#view-access-key-list)

#### Returns

`Promise`<[`AccessKeyInfoView`](../interfaces/providers_provider.AccessKeyInfoView.md)[]\>

#### Inherited from

[AccountMultisig](account_multisig.AccountMultisig.md).[getAccessKeys](account_multisig.AccountMultisig.md#getaccesskeys)

#### Defined in

[account.ts:595](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L595)

___

### getAccountBalance

**getAccountBalance**(): `Promise`<[`AccountBalance`](../interfaces/account.AccountBalance.md)\>

Returns calculated account balance

#### Returns

`Promise`<[`AccountBalance`](../interfaces/account.AccountBalance.md)\>

#### Inherited from

[AccountMultisig](account_multisig.AccountMultisig.md).[getAccountBalance](account_multisig.AccountMultisig.md#getaccountbalance)

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

[AccountMultisig](account_multisig.AccountMultisig.md).[getAccountDetails](account_multisig.AccountMultisig.md#getaccountdetails)

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

[AccountMultisig](account_multisig.AccountMultisig.md).[getActiveDelegatedStakeBalance](account_multisig.AccountMultisig.md#getactivedelegatedstakebalance)

#### Defined in

[account.ts:653](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L653)

___

### getCodeDefault

**getCodeDefault**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

#### Defined in

[account_multisig.ts:393](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account_multisig.ts#L393)

___

### getRecoveryMethods

**getRecoveryMethods**(): `Promise`<{ `accountId`: `string` ; `data`: `any`  }\>

#### Returns

`Promise`<{ `accountId`: `string` ; `data`: `any`  }\>

#### Defined in

[account_multisig.ts:429](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account_multisig.ts#L429)

___

### getRequest

**getRequest**(): `any`

#### Returns

`any`

#### Inherited from

[AccountMultisig](account_multisig.AccountMultisig.md).[getRequest](account_multisig.AccountMultisig.md#getrequest)

#### Defined in

[account_multisig.ts:195](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account_multisig.ts#L195)

___

### getRequestIds

**getRequestIds**(): `Promise`<`string`[]\>

#### Returns

`Promise`<`string`[]\>

#### Inherited from

[AccountMultisig](account_multisig.AccountMultisig.md).[getRequestIds](account_multisig.AccountMultisig.md#getrequestids)

#### Defined in

[account_multisig.ts:189](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account_multisig.ts#L189)

___

### postSignedJson

**postSignedJson**(`path`, `body`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `any` |
| `body` | `any` |

#### Returns

`Promise`<`any`\>

#### Defined in

[account_multisig.ts:456](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account_multisig.ts#L456)

___

### promptAndVerify

**promptAndVerify**(): `any`

#### Returns

`any`

#### Defined in

[account_multisig.ts:397](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account_multisig.ts#L397)

___

### sendCodeDefault

**sendCodeDefault**(): `Promise`<`any`\>

#### Returns

`Promise`<`any`\>

#### Defined in

[account_multisig.ts:381](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account_multisig.ts#L381)

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

[AccountMultisig](account_multisig.AccountMultisig.md).[sendMoney](account_multisig.AccountMultisig.md#sendmoney)

#### Defined in

[account.ts:363](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L363)

___

### setRequest

**setRequest**(`data`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |

#### Returns

`any`

#### Inherited from

[AccountMultisig](account_multisig.AccountMultisig.md).[setRequest](account_multisig.AccountMultisig.md#setrequest)

#### Defined in

[account_multisig.ts:202](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account_multisig.ts#L202)

___

### signAndSendTransaction

`Protected` **signAndSendTransaction**(`__namedParameters`): `Promise`<[`FinalExecutionOutcome`](../interfaces/providers_provider.FinalExecutionOutcome.md)\>

Sign a transaction to preform a list of actions and broadcast it using the RPC API.

**`See`**

[JsonRpcProvider.sendTransaction](providers_json_rpc_provider.JsonRpcProvider.md#sendtransaction)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`SignAndSendTransactionOptions`](../interfaces/account.SignAndSendTransactionOptions.md) |

#### Returns

`Promise`<[`FinalExecutionOutcome`](../interfaces/providers_provider.FinalExecutionOutcome.md)\>

#### Overrides

[AccountMultisig](account_multisig.AccountMultisig.md).[signAndSendTransaction](account_multisig.AccountMultisig.md#signandsendtransaction)

#### Defined in

[account_multisig.ts:237](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account_multisig.ts#L237)

___

### signAndSendTransactionWithAccount

**signAndSendTransactionWithAccount**(`receiverId`, `actions`): `Promise`<[`FinalExecutionOutcome`](../interfaces/providers_provider.FinalExecutionOutcome.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `receiverId` | `string` |
| `actions` | [`Action`](transaction.Action.md)[] |

#### Returns

`Promise`<[`FinalExecutionOutcome`](../interfaces/providers_provider.FinalExecutionOutcome.md)\>

#### Inherited from

[AccountMultisig](account_multisig.AccountMultisig.md).[signAndSendTransactionWithAccount](account_multisig.AccountMultisig.md#signandsendtransactionwithaccount)

#### Defined in

[account_multisig.ts:61](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account_multisig.ts#L61)

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

[AccountMultisig](account_multisig.AccountMultisig.md).[signTransaction](account_multisig.AccountMultisig.md#signtransaction)

#### Defined in

[account.ts:208](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L208)

___

### signatureFor

**signatureFor**(): `Promise`<{ `blockNumber`: `string` ; `blockNumberSignature`: `string`  }\>

#### Returns

`Promise`<{ `blockNumber`: `string` ; `blockNumberSignature`: `string`  }\>

#### Defined in

[account_multisig.ts:447](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account_multisig.ts#L447)

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

[AccountMultisig](account_multisig.AccountMultisig.md).[stake](account_multisig.AccountMultisig.md#stake)

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

[AccountMultisig](account_multisig.AccountMultisig.md).[state](account_multisig.AccountMultisig.md#state)

#### Defined in

[account.ts:172](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L172)

___

### verifyCodeDefault

**verifyCodeDefault**(`securityCode`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `securityCode` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[account_multisig.ts:415](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account_multisig.ts#L415)

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

[AccountMultisig](account_multisig.AccountMultisig.md).[viewFunction](account_multisig.AccountMultisig.md#viewfunction)

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

[AccountMultisig](account_multisig.AccountMultisig.md).[viewFunctionV1](account_multisig.AccountMultisig.md#viewfunctionv1)

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

[AccountMultisig](account_multisig.AccountMultisig.md).[viewFunctionV2](account_multisig.AccountMultisig.md#viewfunctionv2)

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

[AccountMultisig](account_multisig.AccountMultisig.md).[viewState](account_multisig.AccountMultisig.md#viewstate)

#### Defined in

[account.ts:577](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L577)
