---
id: "providers_json_rpc_provider.JsonRpcProvider"
title: "Class: JsonRpcProvider"
sidebar_label: "JsonRpcProvider"
custom_edit_url: null
---

[providers/json-rpc-provider](../modules/providers_json_rpc_provider.md).JsonRpcProvider

Client class to interact with the [NEAR RPC API](https://docs.near.org/api/rpc/introduction).

**`See`**

[https://github.com/near/nearcore/tree/master/chain/jsonrpc](https://github.com/near/nearcore/tree/master/chain/jsonrpc)

## Hierarchy

- `Provider`

  ↳ **`JsonRpcProvider`**

## Constructors

### constructor

**new JsonRpcProvider**(`connectionInfo`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `connectionInfo` | [`ConnectionInfo`](../interfaces/utils_web.ConnectionInfo.md) | Connection info |

#### Overrides

Provider.constructor

#### Defined in

[providers/json-rpc-provider.ts:60](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/providers/json-rpc-provider.ts#L60)

## Methods

### accessKeyChanges

**accessKeyChanges**(`accountIdArray`, `blockQuery`): `Promise`<[`ChangeResult`](../interfaces/providers_provider.ChangeResult.md)\>

Gets access key changes for a given array of accountIds
See [docs for more info](https://docs.near.org/docs/develop/front-end/rpc#view-access-key-changes-all)

#### Parameters

| Name | Type |
| :------ | :------ |
| `accountIdArray` | `string`[] |
| `blockQuery` | [`BlockReference`](../modules/providers_provider.md#blockreference) |

#### Returns

`Promise`<[`ChangeResult`](../interfaces/providers_provider.ChangeResult.md)\>

#### Overrides

Provider.accessKeyChanges

#### Defined in

[providers/json-rpc-provider.ts:222](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/providers/json-rpc-provider.ts#L222)

___

### accountChanges

**accountChanges**(`accountIdArray`, `blockQuery`): `Promise`<[`ChangeResult`](../interfaces/providers_provider.ChangeResult.md)\>

Gets account changes for a given array of accountIds
pass block_id OR finality as blockQuery, not both
See [docs for more info](https://docs.near.org/docs/develop/front-end/rpc#view-account-changes)

#### Parameters

| Name | Type |
| :------ | :------ |
| `accountIdArray` | `string`[] |
| `blockQuery` | [`BlockReference`](../modules/providers_provider.md#blockreference) |

#### Returns

`Promise`<[`ChangeResult`](../interfaces/providers_provider.ChangeResult.md)\>

#### Overrides

Provider.accountChanges

#### Defined in

[providers/json-rpc-provider.ts:256](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/providers/json-rpc-provider.ts#L256)

___

### block

**block**(`blockQuery`): `Promise`<[`BlockResult`](../interfaces/providers_provider.BlockResult.md)\>

Query for block info from the RPC
pass block_id OR finality as blockQuery, not both

**`See`**

[https://docs.near.org/api/rpc/block-chunk](https://docs.near.org/api/rpc/block-chunk)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `blockQuery` | [`BlockId`](../modules/providers_provider.md#blockid) \| [`BlockReference`](../modules/providers_provider.md#blockreference) | [BlockReference](../modules/providers_provider.md#blockreference) (passing a [BlockId](../modules/providers_provider.md#blockid) is deprecated) |

#### Returns

`Promise`<[`BlockResult`](../interfaces/providers_provider.BlockResult.md)\>

#### Overrides

Provider.block

#### Defined in

[providers/json-rpc-provider.ts:162](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/providers/json-rpc-provider.ts#L162)

___

### blockChanges

**blockChanges**(`blockQuery`): `Promise`<[`BlockChangeResult`](../interfaces/providers_provider.BlockChangeResult.md)\>

Query changes in block from the RPC
pass block_id OR finality as blockQuery, not both

**`See`**

[https://docs.near.org/api/rpc/block-chunk](https://docs.near.org/api/rpc/block-chunk)

#### Parameters

| Name | Type |
| :------ | :------ |
| `blockQuery` | [`BlockReference`](../modules/providers_provider.md#blockreference) |

#### Returns

`Promise`<[`BlockChangeResult`](../interfaces/providers_provider.BlockChangeResult.md)\>

#### Overrides

Provider.blockChanges

#### Defined in

[providers/json-rpc-provider.ts:173](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/providers/json-rpc-provider.ts#L173)

___

### chunk

**chunk**(`chunkId`): `Promise`<[`ChunkResult`](../interfaces/providers_provider.ChunkResult.md)\>

Queries for details about a specific chunk appending details of receipts and transactions to the same chunk data provided by a block

**`See`**

[https://docs.near.org/api/rpc/block-chunk](https://docs.near.org/api/rpc/block-chunk)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `chunkId` | [`ChunkId`](../modules/providers_provider.md#chunkid) | Hash of a chunk ID or shard ID |

#### Returns

`Promise`<[`ChunkResult`](../interfaces/providers_provider.ChunkResult.md)\>

#### Overrides

Provider.chunk

#### Defined in

[providers/json-rpc-provider.ts:185](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/providers/json-rpc-provider.ts#L185)

___

### contractCodeChanges

**contractCodeChanges**(`accountIdArray`, `blockQuery`): `Promise`<[`ChangeResult`](../interfaces/providers_provider.ChangeResult.md)\>

Gets contract code changes for a given array of accountIds
pass block_id OR finality as blockQuery, not both
Note: Change is returned in a base64 encoded WASM file
See [docs for more info](https://docs.near.org/docs/develop/front-end/rpc#view-contract-code-changes)

#### Parameters

| Name | Type |
| :------ | :------ |
| `accountIdArray` | `string`[] |
| `blockQuery` | [`BlockReference`](../modules/providers_provider.md#blockreference) |

#### Returns

`Promise`<[`ChangeResult`](../interfaces/providers_provider.ChangeResult.md)\>

#### Overrides

Provider.contractCodeChanges

#### Defined in

[providers/json-rpc-provider.ts:293](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/providers/json-rpc-provider.ts#L293)

___

### contractStateChanges

**contractStateChanges**(`accountIdArray`, `blockQuery`, `keyPrefix?`): `Promise`<[`ChangeResult`](../interfaces/providers_provider.ChangeResult.md)\>

Gets contract state changes for a given array of accountIds
pass block_id OR finality as blockQuery, not both
Note: If you pass a keyPrefix it must be base64 encoded
See [docs for more info](https://docs.near.org/docs/develop/front-end/rpc#view-contract-state-changes)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `accountIdArray` | `string`[] | `undefined` |
| `blockQuery` | [`BlockReference`](../modules/providers_provider.md#blockreference) | `undefined` |
| `keyPrefix` | `string` | `''` |

#### Returns

`Promise`<[`ChangeResult`](../interfaces/providers_provider.ChangeResult.md)\>

#### Overrides

Provider.contractStateChanges

#### Defined in

[providers/json-rpc-provider.ts:274](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/providers/json-rpc-provider.ts#L274)

___

### experimental\_protocolConfig

**experimental_protocolConfig**(`blockReference`): `Promise`<[`NearProtocolConfig`](../interfaces/providers_provider.NearProtocolConfig.md)\>

Gets the protocol config at a block from RPC

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `blockReference` | [`BlockReference`](../modules/providers_provider.md#blockreference) \| { `sync_checkpoint`: ``"genesis"``  } | specifies the block to get the protocol config for |

#### Returns

`Promise`<[`NearProtocolConfig`](../interfaces/providers_provider.NearProtocolConfig.md)\>

#### Overrides

Provider.experimental\_protocolConfig

#### Defined in

[providers/json-rpc-provider.ts:204](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/providers/json-rpc-provider.ts#L204)

___

### gasPrice

**gasPrice**(`blockId`): `Promise`<[`GasPrice`](../interfaces/providers_provider.GasPrice.md)\>

Returns gas price for a specific block_height or block_hash.

**`See`**

[https://docs.near.org/api/rpc/gas](https://docs.near.org/api/rpc/gas)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `blockId` | [`BlockId`](../modules/providers_provider.md#blockid) | Block hash or height, or null for latest. |

#### Returns

`Promise`<[`GasPrice`](../interfaces/providers_provider.GasPrice.md)\>

#### Overrides

Provider.gasPrice

#### Defined in

[providers/json-rpc-provider.ts:310](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/providers/json-rpc-provider.ts#L310)

___

### lightClientProof

**lightClientProof**(`request`): `Promise`<[`LightClientProof`](../interfaces/providers_provider.LightClientProof.md)\>

Gets a light client execution proof for verifying execution outcomes

**`See`**

[https://github.com/nearprotocol/NEPs/blob/master/specs/ChainSpec/LightClient.md#light-client-proof](https://github.com/nearprotocol/NEPs/blob/master/specs/ChainSpec/LightClient.md#light-client-proof)

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`LightClientProofRequest`](../interfaces/providers_provider.LightClientProofRequest.md) |

#### Returns

`Promise`<[`LightClientProof`](../interfaces/providers_provider.LightClientProof.md)\>

#### Overrides

Provider.lightClientProof

#### Defined in

[providers/json-rpc-provider.ts:213](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/providers/json-rpc-provider.ts#L213)

___

### query

**query**<`T`\>(...`args`): `Promise`<`T`\>

Query the RPC by passing an [RpcQueryRequest](../modules/providers_provider.md#rpcqueryrequest)

**`See`**

[https://docs.near.org/api/rpc/contracts](https://docs.near.org/api/rpc/contracts)

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends [`QueryResponseKind`](../interfaces/providers_provider.QueryResponseKind.md) | the shape of the returned query response |

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

#### Returns

`Promise`<`T`\>

#### Overrides

Provider.query

#### Defined in

[providers/json-rpc-provider.ts:140](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/providers/json-rpc-provider.ts#L140)

___

### sendJsonRpc

**sendJsonRpc**<`T`\>(`method`, `params`): `Promise`<`T`\>

Directly call the RPC specifying the method and params

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `method` | `string` | RPC method |
| `params` | `object` | Parameters to the method |

#### Returns

`Promise`<`T`\>

#### Defined in

[providers/json-rpc-provider.ts:320](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/providers/json-rpc-provider.ts#L320)

___

### sendTransaction

**sendTransaction**(`signedTransaction`): `Promise`<[`FinalExecutionOutcome`](../interfaces/providers_provider.FinalExecutionOutcome.md)\>

Sends a signed transaction to the RPC and waits until transaction is fully complete

**`See`**

[https://docs.near.org/docs/develop/front-end/rpc#send-transaction-await](https://docs.near.org/docs/develop/front-end/rpc#general-validator-status)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `signedTransaction` | [`SignedTransaction`](transaction.SignedTransaction.md) | The signed transaction being sent |

#### Returns

`Promise`<[`FinalExecutionOutcome`](../interfaces/providers_provider.FinalExecutionOutcome.md)\>

#### Overrides

Provider.sendTransaction

#### Defined in

[providers/json-rpc-provider.ts:79](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/providers/json-rpc-provider.ts#L79)

___

### sendTransactionAsync

**sendTransactionAsync**(`signedTransaction`): `Promise`<[`FinalExecutionOutcome`](../interfaces/providers_provider.FinalExecutionOutcome.md)\>

Sends a signed transaction to the RPC and immediately returns transaction hash
See [docs for more info](https://docs.near.org/docs/develop/front-end/rpc#send-transaction-async)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `signedTransaction` | [`SignedTransaction`](transaction.SignedTransaction.md) | The signed transaction being sent |

#### Returns

`Promise`<[`FinalExecutionOutcome`](../interfaces/providers_provider.FinalExecutionOutcome.md)\>

#### Overrides

Provider.sendTransactionAsync

#### Defined in

[providers/json-rpc-provider.ts:90](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/providers/json-rpc-provider.ts#L90)

___

### singleAccessKeyChanges

**singleAccessKeyChanges**(`accessKeyArray`, `blockQuery`): `Promise`<[`ChangeResult`](../interfaces/providers_provider.ChangeResult.md)\>

Gets single access key changes for a given array of access keys
pass block_id OR finality as blockQuery, not both
See [docs for more info](https://docs.near.org/docs/develop/front-end/rpc#view-access-key-changes-single)

#### Parameters

| Name | Type |
| :------ | :------ |
| `accessKeyArray` | [`AccessKeyWithPublicKey`](../interfaces/providers_provider.AccessKeyWithPublicKey.md)[] |
| `blockQuery` | [`BlockReference`](../modules/providers_provider.md#blockreference) |

#### Returns

`Promise`<[`ChangeResult`](../interfaces/providers_provider.ChangeResult.md)\>

#### Overrides

Provider.singleAccessKeyChanges

#### Defined in

[providers/json-rpc-provider.ts:239](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/providers/json-rpc-provider.ts#L239)

___

### status

**status**(): `Promise`<[`NodeStatusResult`](../interfaces/providers_provider.NodeStatusResult.md)\>

Gets the RPC's status

**`See`**

[https://docs.near.org/docs/develop/front-end/rpc#general-validator-status](https://docs.near.org/docs/develop/front-end/rpc#general-validator-status)

#### Returns

`Promise`<[`NodeStatusResult`](../interfaces/providers_provider.NodeStatusResult.md)\>

#### Overrides

Provider.status

#### Defined in

[providers/json-rpc-provider.ts:69](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/providers/json-rpc-provider.ts#L69)

___

### txStatus

**txStatus**(`txHash`, `accountId`): `Promise`<[`FinalExecutionOutcome`](../interfaces/providers_provider.FinalExecutionOutcome.md)\>

Gets a transaction's status from the RPC

**`See`**

[https://docs.near.org/docs/develop/front-end/rpc#transaction-status](https://docs.near.org/docs/develop/front-end/rpc#general-validator-status)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `txHash` | `string` \| `Uint8Array` | A transaction hash as either a Uint8Array or a base58 encoded string |
| `accountId` | `string` | The NEAR account that signed the transaction |

#### Returns

`Promise`<[`FinalExecutionOutcome`](../interfaces/providers_provider.FinalExecutionOutcome.md)\>

#### Overrides

Provider.txStatus

#### Defined in

[providers/json-rpc-provider.ts:102](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/providers/json-rpc-provider.ts#L102)

___

### txStatusReceipts

**txStatusReceipts**(`txHash`, `accountId`): `Promise`<[`FinalExecutionOutcome`](../interfaces/providers_provider.FinalExecutionOutcome.md)\>

Gets a transaction's status from the RPC with receipts
See [docs for more info](https://docs.near.org/docs/develop/front-end/rpc#transaction-status-with-receipts)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `txHash` | `string` \| `Uint8Array` | The hash of the transaction |
| `accountId` | `string` | The NEAR account that signed the transaction |

#### Returns

`Promise`<[`FinalExecutionOutcome`](../interfaces/providers_provider.FinalExecutionOutcome.md)\>

#### Overrides

Provider.txStatusReceipts

#### Defined in

[providers/json-rpc-provider.ts:125](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/providers/json-rpc-provider.ts#L125)

___

### txStatusString

`Private` **txStatusString**(`txHash`, `accountId`): `Promise`<[`FinalExecutionOutcome`](../interfaces/providers_provider.FinalExecutionOutcome.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `txHash` | `string` |
| `accountId` | `string` |

#### Returns

`Promise`<[`FinalExecutionOutcome`](../interfaces/providers_provider.FinalExecutionOutcome.md)\>

#### Defined in

[providers/json-rpc-provider.ts:114](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/providers/json-rpc-provider.ts#L114)

___

### txStatusUint8Array

`Private` **txStatusUint8Array**(`txHash`, `accountId`): `Promise`<[`FinalExecutionOutcome`](../interfaces/providers_provider.FinalExecutionOutcome.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `txHash` | `Uint8Array` |
| `accountId` | `string` |

#### Returns

`Promise`<[`FinalExecutionOutcome`](../interfaces/providers_provider.FinalExecutionOutcome.md)\>

#### Defined in

[providers/json-rpc-provider.ts:110](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/providers/json-rpc-provider.ts#L110)

___

### validators

**validators**(`blockId`): `Promise`<[`EpochValidatorInfo`](../interfaces/providers_provider.EpochValidatorInfo.md)\>

Query validators of the epoch defined by the given block id.

**`See`**

[https://docs.near.org/api/rpc/network#validation-status](https://docs.near.org/api/rpc/network#validation-status)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `blockId` | [`BlockId`](../modules/providers_provider.md#blockid) | Block hash or height, or null for latest. |

#### Returns

`Promise`<[`EpochValidatorInfo`](../interfaces/providers_provider.EpochValidatorInfo.md)\>

#### Overrides

Provider.validators

#### Defined in

[providers/json-rpc-provider.ts:195](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/providers/json-rpc-provider.ts#L195)
