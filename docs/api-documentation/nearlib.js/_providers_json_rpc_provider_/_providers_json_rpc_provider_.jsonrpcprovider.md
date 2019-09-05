# JsonRpcProvider

## Hierarchy

[Provider](../_providers_provider_/_providers_provider_.provider.md)

**↳ JsonRpcProvider**

## Constructors

### constructor <a id="constructor"></a>

⊕ **new JsonRpcProvider**\(url?: _`string`_, network?: [_Network_](../_utils_network_/_utils_network_.network.md)\): [JsonRpcProvider](_providers_json_rpc_provider_.jsonrpcprovider.md)

_Defined in_ [_providers/json-rpc-provider.ts:13_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/providers/json-rpc-provider.ts#L13)

**Parameters:**

| Name | Type |
| :--- | :--- |
| `Optional` url | `string` |
| `Optional` network | [Network](../_utils_network_/_utils_network_.network.md) |

**Returns:** [JsonRpcProvider](_providers_json_rpc_provider_.jsonrpcprovider.md)

## Properties

### connection <a id="connection"></a>

**● connection**: [_ConnectionInfo_](../_utils_web_/_utils_web_.connectioninfo.md)

_Defined in_ [_providers/json-rpc-provider.ts:13_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/providers/json-rpc-provider.ts#L13)

## Methods

### getNetwork <a id="getnetwork"></a>

▸ **getNetwork**\(\): `Promise`&lt;[Network](../_utils_network_/_utils_network_.network.md)&gt;

_Overrides_ [_Provider_](../_providers_provider_/_providers_provider_.provider.md)_._[_getNetwork_](../_providers_provider_/_providers_provider_.provider.md#getnetwork)

_Defined in_ [_providers/json-rpc-provider.ts:22_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/providers/json-rpc-provider.ts#L22)

**Returns:** `Promise`&lt;[Network](../_utils_network_/_utils_network_.network.md)&gt;

### query <a id="query"></a>

▸ **query**\(path: _`string`_, data: _`string`_\): `Promise`&lt;`any`&gt;

_Overrides_ [_Provider_](../_providers_provider_/_providers_provider_.provider.md)_._[_query_](../_providers_provider_/_providers_provider_.provider.md#query)

_Defined in_ [_providers/json-rpc-provider.ts:38_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/providers/json-rpc-provider.ts#L38)

**Parameters:**

| Name | Type |
| :--- | :--- |
| path | `string` |
| data | `string` |

**Returns:** `Promise`&lt;`any`&gt;

### `<Private>` sendJsonRpc <a id="sendjsonrpc"></a>

▸ **sendJsonRpc**\(method: _`string`_, params: _`any`\[\]_\): `Promise`&lt;`any`&gt;

_Defined in_ [_providers/json-rpc-provider.ts:46_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/providers/json-rpc-provider.ts#L46)

**Parameters:**

| Name | Type |
| :--- | :--- |
| method | `string` |
| params | `any`\[\] |

**Returns:** `Promise`&lt;`any`&gt;

### sendTransaction <a id="sendtransaction"></a>

▸ **sendTransaction**\(signedTransaction: _`SignedTransaction`_\): `Promise`&lt;[FinalTransactionResult](../_providers_provider_/_providers_provider_.finaltransactionresult.md)&gt;

_Overrides_ [_Provider_](../_providers_provider_/_providers_provider_.provider.md)_._[_sendTransaction_](../_providers_provider_/_providers_provider_.provider.md#sendtransaction)

_Defined in_ [_providers/json-rpc-provider.ts:29_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/providers/json-rpc-provider.ts#L29)

**Parameters:**

| Name | Type |
| :--- | :--- |
| signedTransaction | `SignedTransaction` |

**Returns:** `Promise`&lt;[FinalTransactionResult](../_providers_provider_/_providers_provider_.finaltransactionresult.md)&gt;

### txStatus <a id="txstatus"></a>

▸ **txStatus**\(txHash: _`Uint8Array`_\): `Promise`&lt;[FinalTransactionResult](../_providers_provider_/_providers_provider_.finaltransactionresult.md)&gt;

_Overrides_ [_Provider_](../_providers_provider_/_providers_provider_.provider.md)_._[_txStatus_](../_providers_provider_/_providers_provider_.provider.md#txstatus)

_Defined in_ [_providers/json-rpc-provider.ts:34_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/providers/json-rpc-provider.ts#L34)

**Parameters:**

| Name | Type |
| :--- | :--- |
| txHash | `Uint8Array` |

**Returns:** `Promise`&lt;[FinalTransactionResult](../_providers_provider_/_providers_provider_.finaltransactionresult.md)&gt;

