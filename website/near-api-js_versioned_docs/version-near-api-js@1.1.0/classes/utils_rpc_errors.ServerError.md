---
id: "utils_rpc_errors.ServerError"
title: "Class: ServerError"
sidebar_label: "ServerError"
custom_edit_url: null
---

[utils/rpc_errors](../modules/utils_rpc_errors.md).ServerError

## Hierarchy

- [`TypedError`](utils_errors.TypedError.md)

  ↳ **`ServerError`**

## Constructors

### constructor

**new ServerError**(`message?`, `type?`, `context?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `string` |
| `type?` | `string` |
| `context?` | [`ErrorContext`](utils_errors.ErrorContext.md) |

#### Inherited from

[TypedError](utils_errors.TypedError.md).[constructor](utils_errors.TypedError.md#constructor)

#### Defined in

[utils/errors.ts:16](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/utils/errors.ts#L16)

## Properties

### cause

 `Optional` **cause**: `unknown`

#### Inherited from

[TypedError](utils_errors.TypedError.md).[cause](utils_errors.TypedError.md#cause)

#### Defined in

../../../../node_modules/typescript/lib/lib.es2022.error.d.ts:26

___

### context

 `Optional` **context**: [`ErrorContext`](utils_errors.ErrorContext.md)

#### Inherited from

[TypedError](utils_errors.TypedError.md).[context](utils_errors.TypedError.md#context)

#### Defined in

[utils/errors.ts:15](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/utils/errors.ts#L15)

___

### message

 **message**: `string`

#### Inherited from

[TypedError](utils_errors.TypedError.md).[message](utils_errors.TypedError.md#message)

#### Defined in

../../../../node_modules/typescript/lib/lib.es5.d.ts:1041

___

### name

 **name**: `string`

#### Inherited from

[TypedError](utils_errors.TypedError.md).[name](utils_errors.TypedError.md#name)

#### Defined in

../../../../node_modules/typescript/lib/lib.es5.d.ts:1040

___

### stack

 `Optional` **stack**: `string`

#### Inherited from

[TypedError](utils_errors.TypedError.md).[stack](utils_errors.TypedError.md#stack)

#### Defined in

../../../../node_modules/typescript/lib/lib.es5.d.ts:1042

___

### type

 **type**: `string`

#### Inherited from

[TypedError](utils_errors.TypedError.md).[type](utils_errors.TypedError.md#type)

#### Defined in

[utils/errors.ts:14](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/utils/errors.ts#L14)

___

### prepareStackTrace

 `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

(`err`, `stackTraces`): `any`

Optional override for formatting stack traces

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

#### Inherited from

[TypedError](utils_errors.TypedError.md).[prepareStackTrace](utils_errors.TypedError.md#preparestacktrace)

#### Defined in

../node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

 `Static` **stackTraceLimit**: `number`

#### Inherited from

[TypedError](utils_errors.TypedError.md).[stackTraceLimit](utils_errors.TypedError.md#stacktracelimit)

#### Defined in

../node_modules/@types/node/globals.d.ts:13

## Methods

### captureStackTrace

`Static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

[TypedError](utils_errors.TypedError.md).[captureStackTrace](utils_errors.TypedError.md#capturestacktrace)

#### Defined in

../node_modules/@types/node/globals.d.ts:4
