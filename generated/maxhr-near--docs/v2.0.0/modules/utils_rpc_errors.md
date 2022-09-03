---
id: "utils_rpc_errors"
title: "Module: utils/rpc_errors"
sidebar_label: "utils/rpc_errors"
sidebar_position: 0
custom_edit_url: null
pagination_prev: null
pagination_next: null
---

## Classes

- [ServerError](../classes/utils_rpc_errors.ServerError.md)

## Functions

### formatError

**formatError**(`errorClassName`, `errorData`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `errorClassName` | `string` |
| `errorData` | `any` |

#### Returns

`string`

#### Defined in

[utils/rpc_errors.ts:38](https://github.com/maxhr/near--near-api-js/blob/a0c9a104/packages/near-api-js/src/utils/rpc_errors.ts#L38)

___

### parseResultError

**parseResultError**(`result`): `ServerTransactionError`

#### Parameters

| Name | Type |
| :------ | :------ |
| `result` | `any` |

#### Returns

`ServerTransactionError`

#### Defined in

[utils/rpc_errors.ts:28](https://github.com/maxhr/near--near-api-js/blob/a0c9a104/packages/near-api-js/src/utils/rpc_errors.ts#L28)

___

### parseRpcError

**parseRpcError**(`errorObj`): [`ServerError`](../classes/utils_rpc_errors.ServerError.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `errorObj` | `Record`<`string`, `any`\> |

#### Returns

[`ServerError`](../classes/utils_rpc_errors.ServerError.md)

#### Defined in

[utils/rpc_errors.ts:19](https://github.com/maxhr/near--near-api-js/blob/a0c9a104/packages/near-api-js/src/utils/rpc_errors.ts#L19)
