---
id: "TextDecoder"
title: "Class: TextDecoder"
sidebar_label: "TextDecoder"
sidebar_position: 0
custom_edit_url: null
---

A subset of NodeJS TextDecoder API. Only support utf-8 and latin1 encoding.

## Constructors

### constructor

• **new TextDecoder**(`encoding?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `encoding` | `string` | `"utf-8"` |

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/utils.ts:177](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/utils.ts#L177)

## Properties

### encoding

• **encoding**: `string` = `"utf-8"`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/utils.ts:177](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/utils.ts#L177)

## Methods

### decode

▸ **decode**(`a`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `Uint8Array` |

#### Returns

`string`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/utils.ts:179](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/utils.ts#L179)
