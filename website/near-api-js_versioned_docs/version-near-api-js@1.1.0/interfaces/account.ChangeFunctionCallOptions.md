---
id: "account.ChangeFunctionCallOptions"
title: "Interface: ChangeFunctionCallOptions"
sidebar_label: "ChangeFunctionCallOptions"
custom_edit_url: null
---

[account](../modules/account.md).ChangeFunctionCallOptions

Options used to initiate a function call (especially a change function call)

**`See`**

[viewFunction](../classes/account.Account.md#viewfunction) to initiate a view function call

## Hierarchy

- [`FunctionCallOptions`](account.FunctionCallOptions.md)

  ↳ **`ChangeFunctionCallOptions`**

## Properties

### args

 **args**: `object`

named arguments to pass the method `{ messageText: 'my message' }`

#### Inherited from

[FunctionCallOptions](account.FunctionCallOptions.md).[args](account.FunctionCallOptions.md#args)

#### Defined in

[account.ts:94](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L94)

___

### attachedDeposit

 `Optional` **attachedDeposit**: `BN`

amount of NEAR (in yoctoNEAR) to send together with the call

#### Inherited from

[FunctionCallOptions](account.FunctionCallOptions.md).[attachedDeposit](account.FunctionCallOptions.md#attacheddeposit)

#### Defined in

[account.ts:98](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L98)

___

### contractId

 **contractId**: `string`

The NEAR account id where the contract is deployed

#### Inherited from

[FunctionCallOptions](account.FunctionCallOptions.md).[contractId](account.FunctionCallOptions.md#contractid)

#### Defined in

[account.ts:88](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L88)

___

### gas

 `Optional` **gas**: `BN`

max amount of gas that method call can use

#### Inherited from

[FunctionCallOptions](account.FunctionCallOptions.md).[gas](account.FunctionCallOptions.md#gas)

#### Defined in

[account.ts:96](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L96)

___

### jsContract

 `Optional` **jsContract**: `boolean`

Is contract from JS SDK, automatically encodes args from JS SDK to binary.

#### Inherited from

[FunctionCallOptions](account.FunctionCallOptions.md).[jsContract](account.FunctionCallOptions.md#jscontract)

#### Defined in

[account.ts:106](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L106)

___

### methodName

 **methodName**: `string`

The name of the method to invoke

#### Inherited from

[FunctionCallOptions](account.FunctionCallOptions.md).[methodName](account.FunctionCallOptions.md#methodname)

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

#### Inherited from

[FunctionCallOptions](account.FunctionCallOptions.md).[stringify](account.FunctionCallOptions.md#stringify)

#### Defined in

[account.ts:102](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L102)

___

### walletCallbackUrl

 `Optional` **walletCallbackUrl**: `string`

Callback url to send the NEAR Wallet if using it to sign transactions.

**`See`**

RequestSignTransactionsOptions

#### Defined in

[account.ts:119](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L119)

___

### walletMeta

 `Optional` **walletMeta**: `string`

Metadata to send the NEAR Wallet if using it to sign transactions.

**`See`**

RequestSignTransactionsOptions

#### Defined in

[account.ts:114](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L114)
