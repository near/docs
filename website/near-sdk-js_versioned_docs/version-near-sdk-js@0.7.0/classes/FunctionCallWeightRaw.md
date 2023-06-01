---
id: "FunctionCallWeightRaw"
title: "Class: FunctionCallWeightRaw"
sidebar_label: "FunctionCallWeightRaw"
sidebar_position: 0
custom_edit_url: null
---

A function call weight raw promise action.

## Hierarchy

- [`PromiseAction`](PromiseAction.md)

  ↳ **`FunctionCallWeightRaw`**

## Constructors

### constructor

• **new FunctionCallWeightRaw**(`functionName`, `args`, `amount`, `gas`, `weight`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `functionName` | `string` | The name of the function to be called. |
| `args` | `Uint8Array` | The arguments to be passed to the function. |
| `amount` | `bigint` | The amount of NEAR to attach to the call. |
| `gas` | `bigint` | The amount of Gas to attach to the call. |
| `weight` | `bigint` | The weight of unused Gas to use. |

#### Overrides

[PromiseAction](PromiseAction.md).[constructor](PromiseAction.md#constructor)

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:159](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L159)

## Properties

### amount

• **amount**: `bigint`

The amount of NEAR to attach to the call.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:162](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L162)

___

### args

• **args**: `Uint8Array`

The arguments to be passed to the function.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:161](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L161)

___

### functionName

• **functionName**: `string`

The name of the function to be called.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:160](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L160)

___

### gas

• **gas**: `bigint`

The amount of Gas to attach to the call.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:163](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L163)

___

### weight

• **weight**: `bigint`

The weight of unused Gas to use.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:164](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L164)

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

[near-sdk-js/packages/near-sdk-js/src/promise.ts:169](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L169)
