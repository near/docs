---
id: "FunctionCallWeight"
title: "Class: FunctionCallWeight"
sidebar_label: "FunctionCallWeight"
sidebar_position: 0
custom_edit_url: null
---

A function call weight promise action.

## Hierarchy

- [`PromiseAction`](PromiseAction.md)

  ↳ **`FunctionCallWeight`**

## Constructors

### constructor

• **new FunctionCallWeight**(`functionName`, `args`, `amount`, `gas`, `weight`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `functionName` | `string` | The name of the function to be called. |
| `args` | `string` | The utf-8 string arguments to be passed to the function. |
| `amount` | `bigint` | The amount of NEAR to attach to the call. |
| `gas` | `bigint` | The amount of Gas to attach to the call. |
| `weight` | `bigint` | The weight of unused Gas to use. |

#### Overrides

[PromiseAction](PromiseAction.md).[constructor](PromiseAction.md#constructor)

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:124](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L124)

## Properties

### amount

• **amount**: `bigint`

The amount of NEAR to attach to the call.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:127](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L127)

___

### args

• **args**: `string`

The utf-8 string arguments to be passed to the function.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:126](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L126)

___

### functionName

• **functionName**: `string`

The name of the function to be called.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:125](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L125)

___

### gas

• **gas**: `bigint`

The amount of Gas to attach to the call.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:128](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L128)

___

### weight

• **weight**: `bigint`

The weight of unused Gas to use.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:129](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L129)

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

[near-sdk-js/packages/near-sdk-js/src/promise.ts:134](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L134)
