---
id: "providers_provider"
title: "Module: providers/provider"
sidebar_label: "providers/provider"
sidebar_position: 0
custom_edit_url: null
---

NEAR RPC API request types and responses

## Enumerations

- [ExecutionStatusBasic](../enums/providers_provider.ExecutionStatusBasic.md)
- [FinalExecutionStatusBasic](../enums/providers_provider.FinalExecutionStatusBasic.md)
- [IdType](../enums/providers_provider.IdType.md)

## Interfaces

- [AccessKeyInfoView](../interfaces/providers_provider.AccessKeyInfoView.md)
- [AccessKeyList](../interfaces/providers_provider.AccessKeyList.md)
- [AccessKeyView](../interfaces/providers_provider.AccessKeyView.md)
- [AccessKeyViewRaw](../interfaces/providers_provider.AccessKeyViewRaw.md)
- [AccessKeyWithPublicKey](../interfaces/providers_provider.AccessKeyWithPublicKey.md)
- [AccountView](../interfaces/providers_provider.AccountView.md)
- [BlockChange](../interfaces/providers_provider.BlockChange.md)
- [BlockChangeResult](../interfaces/providers_provider.BlockChangeResult.md)
- [BlockHeader](../interfaces/providers_provider.BlockHeader.md)
- [BlockHeaderInnerLiteView](../interfaces/providers_provider.BlockHeaderInnerLiteView.md)
- [BlockResult](../interfaces/providers_provider.BlockResult.md)
- [CallFunctionRequest](../interfaces/providers_provider.CallFunctionRequest.md)
- [ChangeResult](../interfaces/providers_provider.ChangeResult.md)
- [Chunk](../interfaces/providers_provider.Chunk.md)
- [ChunkHeader](../interfaces/providers_provider.ChunkHeader.md)
- [ChunkResult](../interfaces/providers_provider.ChunkResult.md)
- [CodeResult](../interfaces/providers_provider.CodeResult.md)
- [ContractCodeView](../interfaces/providers_provider.ContractCodeView.md)
- [CurrentEpochValidatorInfo](../interfaces/providers_provider.CurrentEpochValidatorInfo.md)
- [EpochValidatorInfo](../interfaces/providers_provider.EpochValidatorInfo.md)
- [ExecutionError](../interfaces/providers_provider.ExecutionError.md)
- [ExecutionOutcome](../interfaces/providers_provider.ExecutionOutcome.md)
- [ExecutionOutcomeWithId](../interfaces/providers_provider.ExecutionOutcomeWithId.md)
- [ExecutionOutcomeWithIdView](../interfaces/providers_provider.ExecutionOutcomeWithIdView.md)
- [ExecutionStatus](../interfaces/providers_provider.ExecutionStatus.md)
- [FinalExecutionOutcome](../interfaces/providers_provider.FinalExecutionOutcome.md)
- [FinalExecutionStatus](../interfaces/providers_provider.FinalExecutionStatus.md)
- [FunctionCallPermissionView](../interfaces/providers_provider.FunctionCallPermissionView.md)
- [GasPrice](../interfaces/providers_provider.GasPrice.md)
- [LightClientBlockLiteView](../interfaces/providers_provider.LightClientBlockLiteView.md)
- [LightClientProof](../interfaces/providers_provider.LightClientProof.md)
- [LightClientProofRequest](../interfaces/providers_provider.LightClientProofRequest.md)
- [MerkleNode](../interfaces/providers_provider.MerkleNode.md)
- [NearProtocolConfig](../interfaces/providers_provider.NearProtocolConfig.md)
- [NearProtocolRuntimeConfig](../interfaces/providers_provider.NearProtocolRuntimeConfig.md)
- [NextEpochValidatorInfo](../interfaces/providers_provider.NextEpochValidatorInfo.md)
- [NodeStatusResult](../interfaces/providers_provider.NodeStatusResult.md)
- [QueryResponseKind](../interfaces/providers_provider.QueryResponseKind.md)
- [SyncInfo](../interfaces/providers_provider.SyncInfo.md)
- [TotalWeight](../interfaces/providers_provider.TotalWeight.md)
- [Transaction](../interfaces/providers_provider.Transaction.md)
- [ValidatorStakeView](../interfaces/providers_provider.ValidatorStakeView.md)
- [ViewAccessKeyListRequest](../interfaces/providers_provider.ViewAccessKeyListRequest.md)
- [ViewAccessKeyRequest](../interfaces/providers_provider.ViewAccessKeyRequest.md)
- [ViewAccountRequest](../interfaces/providers_provider.ViewAccountRequest.md)
- [ViewCodeRequest](../interfaces/providers_provider.ViewCodeRequest.md)
- [ViewStateRequest](../interfaces/providers_provider.ViewStateRequest.md)
- [ViewStateResult](../interfaces/providers_provider.ViewStateResult.md)

## Type Aliases

### BlockId

 **BlockId**: `BlockHash` \| `BlockHeight`

#### Defined in

[providers/provider.ts:32](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/providers/provider.ts#L32)

___

### BlockReference

 **BlockReference**: { `blockId`: [`BlockId`](providers_provider.md#blockid)  } \| { `finality`: [`Finality`](providers_provider.md#finality)  } \| { `sync_checkpoint`: ``"genesis"`` \| ``"earliest_available"``  }

#### Defined in

[providers/provider.ts:36](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/providers/provider.ts#L36)

___

### BlockShardId

 **BlockShardId**: [[`BlockId`](providers_provider.md#blockid), [`ShardId`](providers_provider.md#shardid)]

#### Defined in

[providers/provider.ts:130](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/providers/provider.ts#L130)

___

### ChunkHash

 **ChunkHash**: `string`

#### Defined in

[providers/provider.ts:128](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/providers/provider.ts#L128)

___

### ChunkId

 **ChunkId**: [`ChunkHash`](providers_provider.md#chunkhash) \| [`BlockShardId`](providers_provider.md#blockshardid)

#### Defined in

[providers/provider.ts:131](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/providers/provider.ts#L131)

___

### Finality

 **Finality**: ``"optimistic"`` \| ``"near-final"`` \| ``"final"``

#### Defined in

[providers/provider.ts:34](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/providers/provider.ts#L34)

___

### MerklePath

 **MerklePath**: [`MerkleNode`](../interfaces/providers_provider.MerkleNode.md)[]

#### Defined in

[providers/provider.ts:266](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/providers/provider.ts#L266)

___

### RpcQueryRequest

 **RpcQueryRequest**: [`ViewAccountRequest`](../interfaces/providers_provider.ViewAccountRequest.md) \| [`ViewCodeRequest`](../interfaces/providers_provider.ViewCodeRequest.md) \| [`ViewStateRequest`](../interfaces/providers_provider.ViewStateRequest.md) \| [`ViewAccountRequest`](../interfaces/providers_provider.ViewAccountRequest.md) \| [`ViewAccessKeyRequest`](../interfaces/providers_provider.ViewAccessKeyRequest.md) \| [`ViewAccessKeyListRequest`](../interfaces/providers_provider.ViewAccessKeyListRequest.md) \| [`CallFunctionRequest`](../interfaces/providers_provider.CallFunctionRequest.md) & [`BlockReference`](providers_provider.md#blockreference)

#### Defined in

[providers/provider.ts:408](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/providers/provider.ts#L408)

___

### ShardId

 **ShardId**: `number`

#### Defined in

[providers/provider.ts:129](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/providers/provider.ts#L129)
