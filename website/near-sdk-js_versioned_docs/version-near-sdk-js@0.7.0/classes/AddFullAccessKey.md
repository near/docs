---
id: "AddFullAccessKey"
title: "Class: AddFullAccessKey"
sidebar_label: "AddFullAccessKey"
sidebar_position: 0
custom_edit_url: null
---

A add full access key promise action.

## Hierarchy

- [`PromiseAction`](PromiseAction.md)

  ↳ **`AddFullAccessKey`**

## Constructors

### constructor

• **new AddFullAccessKey**(`publicKey`, `nonce`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `publicKey` | [`PublicKey`](PublicKey.md) | The public key to add as a full access key. |
| `nonce` | `bigint` | The nonce to use. |

#### Overrides

[PromiseAction](PromiseAction.md).[constructor](PromiseAction.md#constructor)

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:232](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L232)

## Properties

### nonce

• **nonce**: `bigint`

The nonce to use.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:232](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L232)

___

### publicKey

• **publicKey**: [`PublicKey`](PublicKey.md)

The public key to add as a full access key.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:232](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L232)

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

[near-sdk-js/packages/near-sdk-js/src/promise.ts:236](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L236)
