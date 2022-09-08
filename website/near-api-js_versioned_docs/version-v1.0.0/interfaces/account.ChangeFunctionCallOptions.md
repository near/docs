---
id: "account.ChangeFunctionCallOptions"
title: "Interface: ChangeFunctionCallOptions"
sidebar_label: "ChangeFunctionCallOptions"
custom_edit_url: null
---

[account](../modules/account.md).ChangeFunctionCallOptions

Options used to initiate a function call (especially a change function call)

**`See`**

viewFunction to initiate a view function call

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

[account.ts:93](https://github.com/near/near-api-js/blob/ecc6fa8f/packages/near-api-js/src/account.ts#L93)

___

### attachedDeposit

 `Optional` **attachedDeposit**: `BN`

amount of NEAR (in yoctoNEAR) to send together with the call

#### Inherited from

[FunctionCallOptions](account.FunctionCallOptions.md).[attachedDeposit](account.FunctionCallOptions.md#attacheddeposit)

#### Defined in

[account.ts:97](https://github.com/near/near-api-js/blob/ecc6fa8f/packages/near-api-js/src/account.ts#L97)

___

### contractId

 **contractId**: `string`

The NEAR account id where the contract is deployed

#### Inherited from

[FunctionCallOptions](account.FunctionCallOptions.md).[contractId](account.FunctionCallOptions.md#contractid)

#### Defined in

[account.ts:87](https://github.com/near/near-api-js/blob/ecc6fa8f/packages/near-api-js/src/account.ts#L87)

___

### gas

 `Optional` **gas**: `BN`

max amount of gas that method call can use

#### Inherited from

[FunctionCallOptions](account.FunctionCallOptions.md).[gas](account.FunctionCallOptions.md#gas)

#### Defined in

[account.ts:95](https://github.com/near/near-api-js/blob/ecc6fa8f/packages/near-api-js/src/account.ts#L95)

___

### jsContract

 `Optional` **jsContract**: `boolean`

Is contract from JS SDK, automatically encodes args from JS SDK to binary.

#### Inherited from

[FunctionCallOptions](account.FunctionCallOptions.md).[jsContract](account.FunctionCallOptions.md#jscontract)

#### Defined in

[account.ts:105](https://github.com/near/near-api-js/blob/ecc6fa8f/packages/near-api-js/src/account.ts#L105)

___

### methodName

 **methodName**: `string`

The name of the method to invoke

#### Inherited from

[FunctionCallOptions](account.FunctionCallOptions.md).[methodName](account.FunctionCallOptions.md#methodname)

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

#### Inherited from

[FunctionCallOptions](account.FunctionCallOptions.md).[stringify](account.FunctionCallOptions.md#stringify)

#### Defined in

[account.ts:101](https://github.com/near/near-api-js/blob/ecc6fa8f/packages/near-api-js/src/account.ts#L101)

___

### walletCallbackUrl

 `Optional` **walletCallbackUrl**: `string`

Callback url to send the NEAR Wallet if using it to sign transactions.

**`See`**

RequestSignTransactionsOptions

#### Defined in

[account.ts:118](https://github.com/near/near-api-js/blob/ecc6fa8f/packages/near-api-js/src/account.ts#L118)

___

### walletMeta

 `Optional` **walletMeta**: `string`

Metadata to send the NEAR Wallet if using it to sign transactions.

**`See`**

RequestSignTransactionsOptions

#### Defined in

[account.ts:113](https://github.com/near/near-api-js/blob/ecc6fa8f/packages/near-api-js/src/account.ts#L113)
