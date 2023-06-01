---
id: "NearPromise"
title: "Class: NearPromise"
sidebar_label: "NearPromise"
sidebar_position: 0
custom_edit_url: null
---

A high level class to construct and work with NEAR promises.

## Constructors

### constructor

• **new NearPromise**(`subtype`, `shouldReturn`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `subtype` | `PromiseSubtype` | The subtype of the promise. |
| `shouldReturn` | `boolean` | Whether the promise should return. |

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:372](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L372)

## Properties

### shouldReturn

• `Private` **shouldReturn**: `boolean`

Whether the promise should return.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:372](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L372)

___

### subtype

• `Private` **subtype**: `PromiseSubtype`

The subtype of the promise.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:372](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L372)

## Methods

### addAccessKey

▸ **addAccessKey**(`publicKey`, `allowance`, `receiverId`, `functionNames`): [`NearPromise`](NearPromise.md)

Creates a add access key promise action and adds it to the current promise.
Uses 0n as the nonce.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `publicKey` | [`PublicKey`](PublicKey.md) | The public key to add as a access key. |
| `allowance` | `bigint` | The allowance for the key in yoctoNEAR. |
| `receiverId` | `string` | The account ID of the reciever. |
| `functionNames` | `string` | The names of funcitons to authorize. |

#### Returns

[`NearPromise`](NearPromise.md)

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:535](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L535)

___

### addAccessKeyWithNonce

▸ **addAccessKeyWithNonce**(`publicKey`, `allowance`, `receiverId`, `functionNames`, `nonce`): [`NearPromise`](NearPromise.md)

Creates a add access key promise action and adds it to the current promise.
Allows you to specify the nonce.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `publicKey` | [`PublicKey`](PublicKey.md) | The public key to add as a access key. |
| `allowance` | `bigint` | The allowance for the key in yoctoNEAR. |
| `receiverId` | `string` | The account ID of the reciever. |
| `functionNames` | `string` | The names of funcitons to authorize. |
| `nonce` | `bigint` | The nonce to use. |

#### Returns

[`NearPromise`](NearPromise.md)

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:560](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L560)

___

### addAction

▸ `Private` **addAction**(`action`): [`NearPromise`](NearPromise.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`PromiseAction`](PromiseAction.md) |

#### Returns

[`NearPromise`](NearPromise.md)

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:384](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L384)

___

### addFullAccessKey

▸ **addFullAccessKey**(`publicKey`): [`NearPromise`](NearPromise.md)

Creates a add full access key promise action and adds it to the current promise.
Uses 0n as the nonce.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `publicKey` | [`PublicKey`](PublicKey.md) | The public key to add as a full access key. |

#### Returns

[`NearPromise`](NearPromise.md)

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:511](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L511)

___

### addFullAccessKeyWithNonce

▸ **addFullAccessKeyWithNonce**(`publicKey`, `nonce`): [`NearPromise`](NearPromise.md)

Creates a add full access key promise action and adds it to the current promise.
Allows you to specify the nonce.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `publicKey` | [`PublicKey`](PublicKey.md) | The public key to add as a full access key. |
| `nonce` | `bigint` | The nonce to use. |

#### Returns

[`NearPromise`](NearPromise.md)

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:522](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L522)

___

### and

▸ **and**(`other`): [`NearPromise`](NearPromise.md)

Joins the provided promise with the current promise, making the current promise a joint promise subtype.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`NearPromise`](NearPromise.md) | The promise to join with the current promise. |

#### Returns

[`NearPromise`](NearPromise.md)

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:595](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L595)

___

### asReturn

▸ **asReturn**(): [`NearPromise`](NearPromise.md)

Sets the shouldReturn field to true.

#### Returns

[`NearPromise`](NearPromise.md)

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:624](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L624)

___

### constructRecursively

▸ **constructRecursively**(): `_`

Recursively goes through the current promise to get the promise index.

#### Returns

`_`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:632](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L632)

___

### createAccount

▸ **createAccount**(): [`NearPromise`](NearPromise.md)

Creates a create account promise action and adds it to the current promise.

#### Returns

[`NearPromise`](NearPromise.md)

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:397](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L397)

___

### deleteAccount

▸ **deleteAccount**(`beneficiaryId`): [`NearPromise`](NearPromise.md)

Creates a delete account promise action and adds it to the current promise.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `beneficiaryId` | `string` | The beneficiary of the account deletion - the account to recieve all of the remaining funds of the deleted account. |

#### Returns

[`NearPromise`](NearPromise.md)

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:586](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L586)

___

### deleteKey

▸ **deleteKey**(`publicKey`): [`NearPromise`](NearPromise.md)

Creates a delete key promise action and adds it to the current promise.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `publicKey` | [`PublicKey`](PublicKey.md) | The public key to delete from the account. |

#### Returns

[`NearPromise`](NearPromise.md)

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:577](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L577)

___

### deployContract

▸ **deployContract**(`code`): [`NearPromise`](NearPromise.md)

Creates a deploy contract promise action and adds it to the current promise.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `code` | `Uint8Array` | The code of the contract to be deployed. |

#### Returns

[`NearPromise`](NearPromise.md)

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:406](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L406)

___

### functionCall

▸ **functionCall**(`functionName`, `args`, `amount`, `gas`): [`NearPromise`](NearPromise.md)

Creates a function call promise action and adds it to the current promise.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `functionName` | `string` | The name of the function to be called. |
| `args` | `string` | The utf-8 string arguments to be passed to the function. |
| `amount` | `bigint` | The amount of NEAR to attach to the call. |
| `gas` | `bigint` | The amount of Gas to attach to the call. |

#### Returns

[`NearPromise`](NearPromise.md)

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:418](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L418)

___

### functionCallRaw

▸ **functionCallRaw**(`functionName`, `args`, `amount`, `gas`): [`NearPromise`](NearPromise.md)

Creates a function call raw promise action and adds it to the current promise.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `functionName` | `string` | The name of the function to be called. |
| `args` | `Uint8Array` | The arguments to be passed to the function. |
| `amount` | `bigint` | The amount of NEAR to attach to the call. |
| `gas` | `bigint` | The amount of Gas to attach to the call. |

#### Returns

[`NearPromise`](NearPromise.md)

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:435](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L435)

___

### functionCallWeight

▸ **functionCallWeight**(`functionName`, `args`, `amount`, `gas`, `weight`): [`NearPromise`](NearPromise.md)

Creates a function call weight promise action and adds it to the current promise.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `functionName` | `string` | The name of the function to be called. |
| `args` | `string` | The utf-8 string arguments to be passed to the function. |
| `amount` | `bigint` | The amount of NEAR to attach to the call. |
| `gas` | `bigint` | The amount of Gas to attach to the call. |
| `weight` | `bigint` | The weight of unused Gas to use. |

#### Returns

[`NearPromise`](NearPromise.md)

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:453](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L453)

___

### functionCallWeightRaw

▸ **functionCallWeightRaw**(`functionName`, `args`, `amount`, `gas`, `weight`): [`NearPromise`](NearPromise.md)

Creates a function call weight raw promise action and adds it to the current promise.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `functionName` | `string` | The name of the function to be called. |
| `args` | `Uint8Array` | The arguments to be passed to the function. |
| `amount` | `bigint` | The amount of NEAR to attach to the call. |
| `gas` | `bigint` | The amount of Gas to attach to the call. |
| `weight` | `bigint` | The weight of unused Gas to use. |

#### Returns

[`NearPromise`](NearPromise.md)

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:474](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L474)

___

### onReturn

▸ **onReturn**(): `void`

Called by NearBindgen, when return object is a NearPromise instance.

#### Returns

`void`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:645](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L645)

___

### stake

▸ **stake**(`amount`, `publicKey`): [`NearPromise`](NearPromise.md)

Creates a stake promise action and adds it to the current promise.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `bigint` | The amount of NEAR to tranfer. |
| `publicKey` | [`PublicKey`](PublicKey.md) | The public key to use for staking. |

#### Returns

[`NearPromise`](NearPromise.md)

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:501](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L501)

___

### then

▸ **then**(`other`): [`NearPromise`](NearPromise.md)

Adds a callback to the current promise.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`NearPromise`](NearPromise.md) | The promise to be executed as the promise. |

#### Returns

[`NearPromise`](NearPromise.md)

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:605](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L605)

___

### transfer

▸ **transfer**(`amount`): [`NearPromise`](NearPromise.md)

Creates a transfer promise action and adds it to the current promise.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `bigint` | The amount of NEAR to tranfer. |

#### Returns

[`NearPromise`](NearPromise.md)

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:491](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L491)

___

### new

▸ `Static` **new**(`accountId`): [`NearPromise`](NearPromise.md)

Creates a new promise to the provided account ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `accountId` | `string` | The account ID on which to call the promise. |

#### Returns

[`NearPromise`](NearPromise.md)

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:379](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L379)
