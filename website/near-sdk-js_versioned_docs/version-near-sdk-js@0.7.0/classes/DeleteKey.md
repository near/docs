---
id: "DeleteKey"
title: "Class: DeleteKey"
sidebar_label: "DeleteKey"
sidebar_position: 0
custom_edit_url: null
---

A delete key promise action.

## Hierarchy

- [`PromiseAction`](PromiseAction.md)

  ↳ **`DeleteKey`**

## Constructors

### constructor

• **new DeleteKey**(`publicKey`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `publicKey` | [`PublicKey`](PublicKey.md) | The public key to delete from the account. |

#### Overrides

[PromiseAction](PromiseAction.md).[constructor](PromiseAction.md#constructor)

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:289](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L289)

## Properties

### publicKey

• **publicKey**: [`PublicKey`](PublicKey.md)

The public key to delete from the account.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:289](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L289)

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

[near-sdk-js/packages/near-sdk-js/src/promise.ts:293](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L293)
