---
id: "UnknownCurve"
title: "Class: UnknownCurve"
sidebar_label: "UnknownCurve"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`ParsePublicKeyError`](ParsePublicKeyError.md)

  ↳ **`UnknownCurve`**

## Constructors

### constructor

• **new UnknownCurve**()

#### Overrides

[ParsePublicKeyError](ParsePublicKeyError.md).[constructor](ParsePublicKeyError.md#constructor)

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/types/public_key.ts:73](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/types/public_key.ts#L73)

## Properties

### cause

• `Optional` **cause**: `unknown`

#### Inherited from

[ParsePublicKeyError](ParsePublicKeyError.md).[cause](ParsePublicKeyError.md#cause)

#### Defined in

sdk-js-docs/my-website/node_modules/typescript/lib/lib.es2022.error.d.ts:26

___

### message

• **message**: `string`

#### Inherited from

[ParsePublicKeyError](ParsePublicKeyError.md).[message](ParsePublicKeyError.md#message)

#### Defined in

sdk-js-docs/my-website/node_modules/typescript/lib/lib.es5.d.ts:1054

___

### name

• **name**: `string`

#### Inherited from

[ParsePublicKeyError](ParsePublicKeyError.md).[name](ParsePublicKeyError.md#name)

#### Defined in

sdk-js-docs/my-website/node_modules/typescript/lib/lib.es5.d.ts:1053

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

[ParsePublicKeyError](ParsePublicKeyError.md).[stack](ParsePublicKeyError.md#stack)

#### Defined in

sdk-js-docs/my-website/node_modules/typescript/lib/lib.es5.d.ts:1055

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

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

[ParsePublicKeyError](ParsePublicKeyError.md).[prepareStackTrace](ParsePublicKeyError.md#preparestacktrace)

#### Defined in

near-sdk-js/packages/near-sdk-js/node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

[ParsePublicKeyError](ParsePublicKeyError.md).[stackTraceLimit](ParsePublicKeyError.md#stacktracelimit)

#### Defined in

near-sdk-js/packages/near-sdk-js/node_modules/@types/node/globals.d.ts:13

## Methods

### captureStackTrace

▸ `Static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

[ParsePublicKeyError](ParsePublicKeyError.md).[captureStackTrace](ParsePublicKeyError.md#capturestacktrace)

#### Defined in

near-sdk-js/packages/near-sdk-js/node_modules/@types/node/globals.d.ts:4
