---
id: "utils_errors.ArgumentTypeError"
title: "Class: ArgumentTypeError"
sidebar_label: "ArgumentTypeError"
custom_edit_url: null
---

[utils/errors](../modules/utils_errors.md).ArgumentTypeError

## Hierarchy

- `Error`

  ↳ **`ArgumentTypeError`**

## Constructors

### constructor

**new ArgumentTypeError**(`argName`, `argType`, `argValue`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `argName` | `string` |
| `argType` | `string` |
| `argValue` | `any` |

#### Overrides

Error.constructor

#### Defined in

[utils/errors.ts:8](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/utils/errors.ts#L8)

## Properties

### cause

 `Optional` **cause**: `unknown`

#### Inherited from

Error.cause

#### Defined in

../../../../node_modules/typescript/lib/lib.es2022.error.d.ts:26

___

### message

 **message**: `string`

#### Inherited from

Error.message

#### Defined in

../../../../node_modules/typescript/lib/lib.es5.d.ts:1041

___

### name

 **name**: `string`

#### Inherited from

Error.name

#### Defined in

../../../../node_modules/typescript/lib/lib.es5.d.ts:1040

___

### stack

 `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

../../../../node_modules/typescript/lib/lib.es5.d.ts:1042

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

Error.prepareStackTrace

#### Defined in

../node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

 `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

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

Error.captureStackTrace

#### Defined in

../node_modules/@types/node/globals.d.ts:4
