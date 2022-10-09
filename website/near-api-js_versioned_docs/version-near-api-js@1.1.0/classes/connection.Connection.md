---
id: "connection.Connection"
title: "Class: Connection"
sidebar_label: "Connection"
custom_edit_url: null
---

[connection](../modules/connection.md).Connection

Connects an account to a given network via a given provider

## Constructors

### constructor

**new Connection**(`networkId`, `provider`, `signer`, `jsvmAccountId`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `networkId` | `string` |
| `provider` | `Provider` |
| `signer` | [`Signer`](signer.Signer.md) |
| `jsvmAccountId` | `string` |

#### Defined in

[connection.ts:41](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/connection.ts#L41)

## Properties

### jsvmAccountId

 `Readonly` **jsvmAccountId**: `string`

#### Defined in

[connection.ts:39](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/connection.ts#L39)

___

### networkId

 `Readonly` **networkId**: `string`

#### Defined in

[connection.ts:36](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/connection.ts#L36)

___

### provider

 `Readonly` **provider**: `Provider`

#### Defined in

[connection.ts:37](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/connection.ts#L37)

___

### signer

 `Readonly` **signer**: [`Signer`](signer.Signer.md)

#### Defined in

[connection.ts:38](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/connection.ts#L38)

## Methods

### fromConfig

`Static` **fromConfig**(`config`): [`Connection`](connection.Connection.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | `any` | Contains connection info details |

#### Returns

[`Connection`](connection.Connection.md)

#### Defined in

[connection.ts:51](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/connection.ts#L51)
