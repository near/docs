---
id: "DeployContract"
title: "Class: DeployContract"
sidebar_label: "DeployContract"
sidebar_position: 0
custom_edit_url: null
---

A deploy contract promise action.

## Hierarchy

- [`PromiseAction`](PromiseAction.md)

  ↳ **`DeployContract`**

## Constructors

### constructor

• **new DeployContract**(`code`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `code` | `Uint8Array` | The code of the contract to be deployed. |

#### Overrides

[PromiseAction](PromiseAction.md).[constructor](PromiseAction.md#constructor)

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:38](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L38)

## Properties

### code

• **code**: `Uint8Array`

The code of the contract to be deployed.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:38](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L38)

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

[near-sdk-js/packages/near-sdk-js/src/promise.ts:42](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L42)
