# Provider

## Hierarchy

**Provider**

↳ [JsonRpcProvider](../_providers_json_rpc_provider_/_providers_json_rpc_provider_.jsonrpcprovider.md)

## Methods

### `<Abstract>` getNetwork <a id="getnetwork"></a>

▸ **getNetwork**\(\): `Promise`&lt;[Network](../_utils_network_/_utils_network_.network.md)&gt;

_Defined in_ [_providers/provider.ts:26_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/providers/provider.ts#L26)

**Returns:** `Promise`&lt;[Network](../_utils_network_/_utils_network_.network.md)&gt;

### `<Abstract>` query <a id="query"></a>

▸ **query**\(path: _`string`_, data: _`string`_\): `Promise`&lt;`any`&gt;

_Defined in_ [_providers/provider.ts:30_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/providers/provider.ts#L30)

**Parameters:**

| Name | Type |
| :--- | :--- |
| path | `string` |
| data | `string` |

**Returns:** `Promise`&lt;`any`&gt;

### `<Abstract>` sendTransaction <a id="sendtransaction"></a>

▸ **sendTransaction**\(signedTransaction: _`SignedTransaction`_\): `Promise`&lt;[FinalTransactionResult](_providers_provider_.finaltransactionresult.md)&gt;

_Defined in_ [_providers/provider.ts:28_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/providers/provider.ts#L28)

**Parameters:**

| Name | Type |
| :--- | :--- |
| signedTransaction | `SignedTransaction` |

**Returns:** `Promise`&lt;[FinalTransactionResult](_providers_provider_.finaltransactionresult.md)&gt;

### `<Abstract>` txStatus <a id="txstatus"></a>

▸ **txStatus**\(txHash: _`Uint8Array`_\): `Promise`&lt;[FinalTransactionResult](_providers_provider_.finaltransactionresult.md)&gt;

_Defined in_ [_providers/provider.ts:29_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/providers/provider.ts#L29)

**Parameters:**

| Name | Type |
| :--- | :--- |
| txHash | `Uint8Array` |

**Returns:** `Promise`&lt;[FinalTransactionResult](_providers_provider_.finaltransactionresult.md)&gt;

