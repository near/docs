---
id: "PromiseAction"
title: "Class: PromiseAction"
sidebar_label: "PromiseAction"
sidebar_position: 0
custom_edit_url: null
---

A promise action which can be executed on the NEAR blockchain.

## Hierarchy

- **`PromiseAction`**

  ↳ [`CreateAccount`](CreateAccount.md)

  ↳ [`DeployContract`](DeployContract.md)

  ↳ [`FunctionCall`](FunctionCall.md)

  ↳ [`FunctionCallRaw`](FunctionCallRaw.md)

  ↳ [`FunctionCallWeight`](FunctionCallWeight.md)

  ↳ [`FunctionCallWeightRaw`](FunctionCallWeightRaw.md)

  ↳ [`Transfer`](Transfer.md)

  ↳ [`Stake`](Stake.md)

  ↳ [`AddFullAccessKey`](AddFullAccessKey.md)

  ↳ [`AddAccessKey`](AddAccessKey.md)

  ↳ [`DeleteKey`](DeleteKey.md)

  ↳ [`DeleteAccount`](DeleteAccount.md)

## Constructors

### constructor

• **new PromiseAction**()

## Methods

### add

▸ `Abstract` **add**(`promiseIndex`): `void`

The method that describes how a promise action adds it's _action_ to the promise batch with the provided index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `promiseIndex` | `_` | The index of the promise batch to attach the action to. |

#### Returns

`void`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:15](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L15)
