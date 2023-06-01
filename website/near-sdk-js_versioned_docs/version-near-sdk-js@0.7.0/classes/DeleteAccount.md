---
id: "DeleteAccount"
title: "Class: DeleteAccount"
sidebar_label: "DeleteAccount"
sidebar_position: 0
custom_edit_url: null
---

A delete account promise action.

## Hierarchy

- [`PromiseAction`](PromiseAction.md)

  ↳ **`DeleteAccount`**

## Constructors

### constructor

• **new DeleteAccount**(`beneficiaryId`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `beneficiaryId` | `string` | The beneficiary of the account deletion - the account to recieve all of the remaining funds of the deleted account. |

#### Overrides

[PromiseAction](PromiseAction.md).[constructor](PromiseAction.md#constructor)

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:306](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L306)

## Properties

### beneficiaryId

• **beneficiaryId**: `string`

The beneficiary of the account deletion - the account to recieve all of the remaining funds of the deleted account.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:306](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L306)

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

[near-sdk-js/packages/near-sdk-js/src/promise.ts:310](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L310)
