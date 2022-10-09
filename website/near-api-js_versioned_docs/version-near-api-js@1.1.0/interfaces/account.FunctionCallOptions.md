---
id: "account.FunctionCallOptions"
title: "Interface: FunctionCallOptions"
sidebar_label: "FunctionCallOptions"
custom_edit_url: null
---

[account](../modules/account.md).FunctionCallOptions

Options used to initiate a function call (especially a change function call)

**`See`**

[viewFunction](../classes/account.Account.md#viewfunction) to initiate a view function call

## Hierarchy

- **`FunctionCallOptions`**

  ↳ [`ChangeFunctionCallOptions`](account.ChangeFunctionCallOptions.md)

  ↳ [`ViewFunctionCallOptions`](account.ViewFunctionCallOptions.md)

## Properties

### args

 **args**: `object`

named arguments to pass the method `{ messageText: 'my message' }`

#### Defined in

[account.ts:94](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L94)

___

### attachedDeposit

 `Optional` **attachedDeposit**: `BN`

amount of NEAR (in yoctoNEAR) to send together with the call

#### Defined in

[account.ts:98](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L98)

___

### contractId

 **contractId**: `string`

The NEAR account id where the contract is deployed

#### Defined in

[account.ts:88](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L88)

___

### gas

 `Optional` **gas**: `BN`

max amount of gas that method call can use

#### Defined in

[account.ts:96](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L96)

___

### jsContract

 `Optional` **jsContract**: `boolean`

Is contract from JS SDK, automatically encodes args from JS SDK to binary.

#### Defined in

[account.ts:106](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L106)

___

### methodName

 **methodName**: `string`

The name of the method to invoke

#### Defined in

[account.ts:90](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L90)

___

### stringify

 `Optional` **stringify**: (`input`: `any`) => `Buffer`

#### Type declaration

(`input`): `Buffer`

Convert input arguments into bytes array.

##### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `any` |

##### Returns

`Buffer`

#### Defined in

[account.ts:102](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L102)
