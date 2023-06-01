---
id: "Stake"
title: "Class: Stake"
sidebar_label: "Stake"
sidebar_position: 0
custom_edit_url: null
---

A stake promise action.

## Hierarchy

- [`PromiseAction`](PromiseAction.md)

  ↳ **`Stake`**

## Constructors

### constructor

• **new Stake**(`amount`, `publicKey`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `bigint` | The amount of NEAR to tranfer. |
| `publicKey` | [`PublicKey`](PublicKey.md) | The public key to use for staking. |

#### Overrides

[PromiseAction](PromiseAction.md).[constructor](PromiseAction.md#constructor)

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:209](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L209)

## Properties

### amount

• **amount**: `bigint`

The amount of NEAR to tranfer.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:209](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L209)

___

### publicKey

• **publicKey**: [`PublicKey`](PublicKey.md)

The public key to use for staking.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:209](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L209)

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

[near-sdk-js/packages/near-sdk-js/src/promise.ts:213](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L213)
