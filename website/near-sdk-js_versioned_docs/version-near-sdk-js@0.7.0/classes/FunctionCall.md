---
id: "FunctionCall"
title: "Class: FunctionCall"
sidebar_label: "FunctionCall"
sidebar_position: 0
custom_edit_url: null
---

A function call promise action.

## Hierarchy

- [`PromiseAction`](PromiseAction.md)

  ↳ **`FunctionCall`**

## Constructors

### constructor

• **new FunctionCall**(`functionName`, `args`, `amount`, `gas`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `functionName` | `string` | The name of the function to be called. |
| `args` | `string` | The utf-8 string arguments to be passed to the function. |
| `amount` | `bigint` | The amount of NEAR to attach to the call. |
| `gas` | `bigint` | The amount of Gas to attach to the call. |

#### Overrides

[PromiseAction](PromiseAction.md).[constructor](PromiseAction.md#constructor)

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:59](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L59)

## Properties

### amount

• **amount**: `bigint`

The amount of NEAR to attach to the call.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:62](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L62)

___

### args

• **args**: `string`

The utf-8 string arguments to be passed to the function.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:61](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L61)

___

### functionName

• **functionName**: `string`

The name of the function to be called.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:60](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L60)

___

### gas

• **gas**: `bigint`

The amount of Gas to attach to the call.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:63](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L63)

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

[near-sdk-js/packages/near-sdk-js/src/promise.ts:68](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L68)
