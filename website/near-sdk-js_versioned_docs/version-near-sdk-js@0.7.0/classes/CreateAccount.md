---
id: "CreateAccount"
title: "Class: CreateAccount"
sidebar_label: "CreateAccount"
sidebar_position: 0
custom_edit_url: null
---

A create account promise action.

## Hierarchy

- [`PromiseAction`](PromiseAction.md)

  ↳ **`CreateAccount`**

## Constructors

### constructor

• **new CreateAccount**()

#### Inherited from

[PromiseAction](PromiseAction.md).[constructor](PromiseAction.md#constructor)

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

[near-sdk-js/packages/near-sdk-js/src/promise.ts:24](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L24)
