---
id: "transaction"
title: "Module: transaction"
sidebar_label: "transaction"
sidebar_position: 0
custom_edit_url: null
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

[transaction.ts:149](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/transaction.ts#L149)

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

[transaction.ts:85](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/transaction.ts#L85)

___

### createAccount

**createAccount**(): [`Action`](../classes/transaction.Action.md)

#### Returns

[`Action`](../classes/transaction.Action.md)

#### Defined in

[transaction.ts:45](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/transaction.ts#L45)

___

### createTransaction

**createTransaction**(`signerId`, `publicKey`, `receiverId`, `nonce`, `actions`, `blockHash`): [`Transaction`](../classes/transaction.Transaction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerId` | `string` |
| `publicKey` | [`PublicKey`](../classes/utils_key_pair.PublicKey.md) |
| `receiverId` | `string` |
| `nonce` | `string` \| `number` \| `BN` |
| `actions` | [`Action`](../classes/transaction.Action.md)[] |
| `blockHash` | `Uint8Array` |

#### Returns

[`Transaction`](../classes/transaction.Transaction.md)

#### Defined in

[transaction.ts:223](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/transaction.ts#L223)

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

[transaction.ts:93](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/transaction.ts#L93)

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

[transaction.ts:89](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/transaction.ts#L89)

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

[transaction.ts:49](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/transaction.ts#L49)

___

### fullAccessKey

**fullAccessKey**(): [`AccessKey`](../classes/transaction.AccessKey.md)

#### Returns

[`AccessKey`](../classes/transaction.AccessKey.md)

#### Defined in

[transaction.ts:26](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/transaction.ts#L26)

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

[transaction.ts:70](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/transaction.ts#L70)

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

[transaction.ts:30](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/transaction.ts#L30)

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

[transaction.ts:245](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/transaction.ts#L245)

**signTransaction**(`receiverId`, `nonce`, `actions`, `blockHash`, `signer`, `accountId?`, `networkId?`): `Promise`<[`Uint8Array`, [`SignedTransaction`](../classes/transaction.SignedTransaction.md)]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `receiverId` | `string` |
| `nonce` | `BN` |
| `actions` | [`Action`](../classes/transaction.Action.md)[] |
| `blockHash` | `Uint8Array` |
| `signer` | [`Signer`](../classes/signer.Signer.md) |
| `accountId?` | `string` |
| `networkId?` | `string` |

#### Returns

`Promise`<[`Uint8Array`, [`SignedTransaction`](../classes/transaction.SignedTransaction.md)]\>

#### Defined in

[transaction.ts:246](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/transaction.ts#L246)

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

[transaction.ts:81](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/transaction.ts#L81)

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

[transaction.ts:53](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/transaction.ts#L53)

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

[transaction.ts:77](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/transaction.ts#L77)
