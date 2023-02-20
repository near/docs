---
id: "FunctionCallRaw"
title: "Class: FunctionCallRaw"
sidebar_label: "FunctionCallRaw"
sidebar_position: 0
custom_edit_url: null
---

A function call raw promise action.

## Hierarchy

- [`PromiseAction`](PromiseAction.md)

  ↳ **`FunctionCallRaw`**

## Constructors

### constructor

• **new FunctionCallRaw**(`functionName`, `args`, `amount`, `gas`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `functionName` | `string` | The name of the function to be called. |
| `args` | `Uint8Array` | The arguments to be passed to the function. |
| `amount` | `bigint` | The amount of NEAR to attach to the call. |
| `gas` | `bigint` | The amount of Gas to attach to the call. |

#### Overrides

[PromiseAction](PromiseAction.md).[constructor](PromiseAction.md#constructor)

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:91](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L91)

## Properties

### amount

• **amount**: `bigint`

The amount of NEAR to attach to the call.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:94](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L94)

___

### args

• **args**: `Uint8Array`

The arguments to be passed to the function.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:93](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L93)

___

### functionName

• **functionName**: `string`

The name of the function to be called.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:92](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L92)

___

### gas

• **gas**: `bigint`

The amount of Gas to attach to the call.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:95](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L95)

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

[near-sdk-js/packages/near-sdk-js/src/promise.ts:100](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L100)
