---
id: "account.FunctionCallOptions"
title: "Interface: FunctionCallOptions"
sidebar_label: "FunctionCallOptions"
custom_edit_url: null
---

[account](../modules/account.md).FunctionCallOptions

Options used to initiate a function call (especially a change function call)

**`See`**

viewFunction to initiate a view function call

## Hierarchy

- **`FunctionCallOptions`**

  ↳ [`ChangeFunctionCallOptions`](account.ChangeFunctionCallOptions.md)

  ↳ [`ViewFunctionCallOptions`](account.ViewFunctionCallOptions.md)

## Properties

### args

 **args**: `object`

named arguments to pass the method `{ messageText: 'my message' }`

#### Defined in

[account.ts:93](https://github.com/near/near-api-js/blob/ecc6fa8f/packages/near-api-js/src/account.ts#L93)

___

### attachedDeposit

 `Optional` **attachedDeposit**: `BN`

amount of NEAR (in yoctoNEAR) to send together with the call

#### Defined in

[account.ts:97](https://github.com/near/near-api-js/blob/ecc6fa8f/packages/near-api-js/src/account.ts#L97)

___

### contractId

 **contractId**: `string`

The NEAR account id where the contract is deployed

#### Defined in

[account.ts:87](https://github.com/near/near-api-js/blob/ecc6fa8f/packages/near-api-js/src/account.ts#L87)

___

### gas

 `Optional` **gas**: `BN`

max amount of gas that method call can use

#### Defined in

[account.ts:95](https://github.com/near/near-api-js/blob/ecc6fa8f/packages/near-api-js/src/account.ts#L95)

___

### jsContract

 `Optional` **jsContract**: `boolean`

Is contract from JS SDK, automatically encodes args from JS SDK to binary.

#### Defined in

[account.ts:105](https://github.com/near/near-api-js/blob/ecc6fa8f/packages/near-api-js/src/account.ts#L105)

___

### methodName

 **methodName**: `string`

The name of the method to invoke

#### Defined in

[account.ts:89](https://github.com/near/near-api-js/blob/ecc6fa8f/packages/near-api-js/src/account.ts#L89)

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

[account.ts:101](https://github.com/near/near-api-js/blob/ecc6fa8f/packages/near-api-js/src/account.ts#L101)
