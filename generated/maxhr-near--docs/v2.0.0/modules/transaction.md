---
id: "transaction"
title: "Module: transaction"
sidebar_label: "transaction"
sidebar_position: 0
custom_edit_url: null
pagination_prev: null
pagination_next: null
---

## Classes

- [AccessKey](../classes/transaction.AccessKey.md)
- [AccessKeyPermission](../classes/transaction.AccessKeyPermission.md)
- [Action](../classes/transaction.Action.md)
- [AddKey](../classes/transaction.AddKey.md)
- [CreateAccount](../classes/transaction.CreateAccount.md)
- [DeleteAccount](../classes/transaction.DeleteAccount.md)
- [DeleteKey](../classes/transaction.DeleteKey.md)
- [DeployContract](../classes/transaction.DeployContract.md)
- [FullAccessPermission](../classes/transaction.FullAccessPermission.md)
- [FunctionCall](../classes/transaction.FunctionCall.md)
- [FunctionCallPermission](../classes/transaction.FunctionCallPermission.md)
- [IAction](../classes/transaction.IAction.md)
- [Signature](../classes/transaction.Signature.md)
- [SignedTransaction](../classes/transaction.SignedTransaction.md)
- [Stake](../classes/transaction.Stake.md)
- [Transaction](../classes/transaction.Transaction.md)
- [Transfer](../classes/transaction.Transfer.md)

## Variables

### SCHEMA

 `Const` **SCHEMA**: `Map`<`Class`<`any`\>, `any`\>

#### Defined in

[transaction.ts:150](https://github.com/maxhr/near--near-api-js/blob/a0c9a104/packages/near-api-js/src/transaction.ts#L150)

## Functions

### addKey

**addKey**(`publicKey`, `accessKey`): [`Action`](../classes/transaction.Action.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `publicKey` | [`PublicKey`](../classes/utils_key_pair.PublicKey.md) |
| `accessKey` | [`AccessKey`](../classes/transaction.AccessKey.md) |

#### Returns

[`Action`](../classes/transaction.Action.md)

#### Defined in

[transaction.ts:86](https://github.com/maxhr/near--near-api-js/blob/a0c9a104/packages/near-api-js/src/transaction.ts#L86)

___

### createAccount

**createAccount**(): [`Action`](../classes/transaction.Action.md)

#### Returns

[`Action`](../classes/transaction.Action.md)

#### Defined in

[transaction.ts:46](https://github.com/maxhr/near--near-api-js/blob/a0c9a104/packages/near-api-js/src/transaction.ts#L46)

___

### createTransaction

**createTransaction**(`signerId`, `publicKey`, `receiverId`, `nonce`, `actions`, `blockHash`): [`Transaction`](../classes/transaction.Transaction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerId` | `string` |
| `publicKey` | [`PublicKey`](../classes/utils_key_pair.PublicKey.md) |
| `receiverId` | `string` |
| `nonce` | `number` |
| `actions` | [`Action`](../classes/transaction.Action.md)[] |
| `blockHash` | `Uint8Array` |

#### Returns

[`Transaction`](../classes/transaction.Transaction.md)

#### Defined in

[transaction.ts:224](https://github.com/maxhr/near--near-api-js/blob/a0c9a104/packages/near-api-js/src/transaction.ts#L224)

___

### deleteAccount

**deleteAccount**(`beneficiaryId`): [`Action`](../classes/transaction.Action.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `beneficiaryId` | `string` |

#### Returns

[`Action`](../classes/transaction.Action.md)

#### Defined in

[transaction.ts:94](https://github.com/maxhr/near--near-api-js/blob/a0c9a104/packages/near-api-js/src/transaction.ts#L94)

___

### deleteKey

**deleteKey**(`publicKey`): [`Action`](../classes/transaction.Action.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `publicKey` | [`PublicKey`](../classes/utils_key_pair.PublicKey.md) |

#### Returns

[`Action`](../classes/transaction.Action.md)

#### Defined in

[transaction.ts:90](https://github.com/maxhr/near--near-api-js/blob/a0c9a104/packages/near-api-js/src/transaction.ts#L90)

___

### deployContract

**deployContract**(`code`): [`Action`](../classes/transaction.Action.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `code` | `Uint8Array` |

#### Returns

[`Action`](../classes/transaction.Action.md)

#### Defined in

[transaction.ts:50](https://github.com/maxhr/near--near-api-js/blob/a0c9a104/packages/near-api-js/src/transaction.ts#L50)

___

### fullAccessKey

**fullAccessKey**(): [`AccessKey`](../classes/transaction.AccessKey.md)

#### Returns

[`AccessKey`](../classes/transaction.AccessKey.md)

#### Defined in

[transaction.ts:27](https://github.com/maxhr/near--near-api-js/blob/a0c9a104/packages/near-api-js/src/transaction.ts#L27)

___

### functionCall

**functionCall**(`methodName`, `args`, `gas`, `deposit`, `stringify?`, `jsContract?`): [`Action`](../classes/transaction.Action.md)

Constructs [Action](../classes/transaction.Action.md) instance representing contract method call.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `methodName` | `string` | `undefined` | the name of the method to call |
| `args` | `object` \| `Uint8Array` | `undefined` | arguments to pass to method. Can be either plain JS object which gets serialized as JSON automatically  or `Uint8Array` instance which represents bytes passed as is. |
| `gas` | `BN` | `undefined` | max amount of gas that method call can use |
| `deposit` | `BN` | `undefined` | amount of NEAR (in yoctoNEAR) to send together with the call |
| `stringify` | (`args`: `any`) => `Buffer` | `stringifyJsonOrBytes` | Convert input arguments into bytes array. |
| `jsContract` | `boolean` | `false` | Is contract from JS SDK, skips stringification of arguments. |

#### Returns

[`Action`](../classes/transaction.Action.md)

#### Defined in

[transaction.ts:71](https://github.com/maxhr/near--near-api-js/blob/a0c9a104/packages/near-api-js/src/transaction.ts#L71)

___

### functionCallAccessKey

**functionCallAccessKey**(`receiverId`, `methodNames`, `allowance?`): [`AccessKey`](../classes/transaction.AccessKey.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `receiverId` | `string` |
| `methodNames` | `string`[] |
| `allowance?` | `BN` |

#### Returns

[`AccessKey`](../classes/transaction.AccessKey.md)

#### Defined in

[transaction.ts:31](https://github.com/maxhr/near--near-api-js/blob/a0c9a104/packages/near-api-js/src/transaction.ts#L31)

___

### signTransaction

**signTransaction**(`transaction`, `signer`, `accountId?`, `networkId?`): `Promise`<[`Uint8Array`, [`SignedTransaction`](../classes/transaction.SignedTransaction.md)]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `transaction` | [`Transaction`](../classes/transaction.Transaction.md) |
| `signer` | [`Signer`](../classes/signer.Signer.md) |
| `accountId?` | `string` |
| `networkId?` | `string` |

#### Returns

`Promise`<[`Uint8Array`, [`SignedTransaction`](../classes/transaction.SignedTransaction.md)]\>

#### Defined in

[transaction.ts:246](https://github.com/maxhr/near--near-api-js/blob/a0c9a104/packages/near-api-js/src/transaction.ts#L246)

**signTransaction**(`receiverId`, `nonce`, `actions`, `blockHash`, `signer`, `accountId?`, `networkId?`): `Promise`<[`Uint8Array`, [`SignedTransaction`](../classes/transaction.SignedTransaction.md)]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `receiverId` | `string` |
| `nonce` | `number` |
| `actions` | [`Action`](../classes/transaction.Action.md)[] |
| `blockHash` | `Uint8Array` |
| `signer` | [`Signer`](../classes/signer.Signer.md) |
| `accountId?` | `string` |
| `networkId?` | `string` |

#### Returns

`Promise`<[`Uint8Array`, [`SignedTransaction`](../classes/transaction.SignedTransaction.md)]\>

#### Defined in

[transaction.ts:247](https://github.com/maxhr/near--near-api-js/blob/a0c9a104/packages/near-api-js/src/transaction.ts#L247)

___

### stake

**stake**(`stake`, `publicKey`): [`Action`](../classes/transaction.Action.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `stake` | `BN` |
| `publicKey` | [`PublicKey`](../classes/utils_key_pair.PublicKey.md) |

#### Returns

[`Action`](../classes/transaction.Action.md)

#### Defined in

[transaction.ts:82](https://github.com/maxhr/near--near-api-js/blob/a0c9a104/packages/near-api-js/src/transaction.ts#L82)

___

### stringifyJsonOrBytes

**stringifyJsonOrBytes**(`args`): `Buffer`

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `any` |

#### Returns

`Buffer`

#### Defined in

[transaction.ts:54](https://github.com/maxhr/near--near-api-js/blob/a0c9a104/packages/near-api-js/src/transaction.ts#L54)

___

### transfer

**transfer**(`deposit`): [`Action`](../classes/transaction.Action.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `deposit` | `BN` |

#### Returns

[`Action`](../classes/transaction.Action.md)

#### Defined in

[transaction.ts:78](https://github.com/maxhr/near--near-api-js/blob/a0c9a104/packages/near-api-js/src/transaction.ts#L78)
