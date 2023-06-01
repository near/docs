---
id: "AddAccessKey"
title: "Class: AddAccessKey"
sidebar_label: "AddAccessKey"
sidebar_position: 0
custom_edit_url: null
---

A add access key promise action.

## Hierarchy

- [`PromiseAction`](PromiseAction.md)

  ↳ **`AddAccessKey`**

## Constructors

### constructor

• **new AddAccessKey**(`publicKey`, `allowance`, `receiverId`, `functionNames`, `nonce`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `publicKey` | [`PublicKey`](PublicKey.md) | The public key to add as a access key. |
| `allowance` | `bigint` | The allowance for the key in yoctoNEAR. |
| `receiverId` | `string` | The account ID of the reciever. |
| `functionNames` | `string` | The names of funcitons to authorize. |
| `nonce` | `bigint` | The nonce to use. |

#### Overrides

[PromiseAction](PromiseAction.md).[constructor](PromiseAction.md#constructor)

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:258](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L258)

## Properties

### allowance

• **allowance**: `bigint`

The allowance for the key in yoctoNEAR.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:260](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L260)

___

### functionNames

• **functionNames**: `string`

The names of funcitons to authorize.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:262](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L262)

___

### nonce

• **nonce**: `bigint`

The nonce to use.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:263](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L263)

___

### publicKey

• **publicKey**: [`PublicKey`](PublicKey.md)

The public key to add as a access key.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:259](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L259)

___

### receiverId

• **receiverId**: `string`

The account ID of the reciever.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:261](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L261)

## Methods

### add

▸ **add**(`promiseIndex`): `void`

The method that describes how a promise action adds it's _action_ to the promise batch with the provided index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `promiseIndex` | `_` | The index of the promise batch to attach the action to. |

#### Returns

`void`

#### Overrides

[PromiseAction](PromiseAction.md).[add](PromiseAction.md#add)

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:268](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L268)
