---
id: "utils_serialize.BorshError"
title: "Class: BorshError"
sidebar_label: "BorshError"
custom_edit_url: null
---

[utils/serialize](../modules/utils_serialize.md).BorshError

## Hierarchy

- `Error`

  ↳ **`BorshError`**

## Constructors

### constructor

**new BorshError**(`message`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Overrides

Error.constructor

#### Defined in

../node_modules/borsh/lib/index.d.ts:9

## Properties

### cause

 `Optional` **cause**: `unknown`

#### Inherited from

Error.cause

#### Defined in

../../../../node_modules/typescript/lib/lib.es2022.error.d.ts:26

___

### fieldPath

 **fieldPath**: `string`[]

#### Defined in

../node_modules/borsh/lib/index.d.ts:8

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

### originalMessage

 **originalMessage**: `string`

#### Defined in

../node_modules/borsh/lib/index.d.ts:7

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

### addToFieldPath

**addToFieldPath**(`fieldName`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fieldName` | `string` |

#### Returns

`void`

#### Defined in

../node_modules/borsh/lib/index.d.ts:10

___

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
