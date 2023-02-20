---
id: "Transfer"
title: "Class: Transfer"
sidebar_label: "Transfer"
sidebar_position: 0
custom_edit_url: null
---

A transfer promise action.

## Hierarchy

- [`PromiseAction`](PromiseAction.md)

  ↳ **`Transfer`**

## Constructors

### constructor

• **new Transfer**(`amount`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `bigint` | The amount of NEAR to tranfer. |

#### Overrides

[PromiseAction](PromiseAction.md).[constructor](PromiseAction.md#constructor)

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:190](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L190)

## Properties

### amount

• **amount**: `bigint`

The amount of NEAR to tranfer.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:190](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L190)

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

[near-sdk-js/packages/near-sdk-js/src/promise.ts:194](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L194)
