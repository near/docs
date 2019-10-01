---
id: "provider"
title: "Provider"
sidebar_label: "Provider"
---

## Hierarchy

* **Provider**

  ↳ [JsonRpcProvider](jsonrpcprovider.md)

## Index

### Methods

* [block](provider.md#abstract-block)
* [getNetwork](provider.md#abstract-getnetwork)
* [query](provider.md#abstract-query)
* [sendTransaction](provider.md#abstract-sendtransaction)
* [status](provider.md#abstract-status)
* [txStatus](provider.md#abstract-txstatus)

## Methods

### `Abstract` block

▸ **block**(`height`: number): *Promise‹[BlockResult](../interfaces/blockresult.md)›*

*Defined in [providers/provider.ts:80](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/providers/provider.ts#L80)*

**Parameters:**

Name | Type |
------ | ------ |
`height` | number |

**Returns:** *Promise‹[BlockResult](../interfaces/blockresult.md)›*

___

### `Abstract` getNetwork

▸ **getNetwork**(): *Promise‹[Network](../interfaces/network.md)›*

*Defined in [providers/provider.ts:74](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/providers/provider.ts#L74)*

**Returns:** *Promise‹[Network](../interfaces/network.md)›*

___

### `Abstract` query

▸ **query**(`path`: string, `data`: string): *Promise‹any›*

*Defined in [providers/provider.ts:79](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/providers/provider.ts#L79)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |
`data` | string |

**Returns:** *Promise‹any›*

___

### `Abstract` sendTransaction

▸ **sendTransaction**(`signedTransaction`: [SignedTransaction](signedtransaction.md)): *Promise‹[FinalTransactionResult](../interfaces/finaltransactionresult.md)›*

*Defined in [providers/provider.ts:77](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/providers/provider.ts#L77)*

**Parameters:**

Name | Type |
------ | ------ |
`signedTransaction` | [SignedTransaction](signedtransaction.md) |

**Returns:** *Promise‹[FinalTransactionResult](../interfaces/finaltransactionresult.md)›*

___

### `Abstract` status

▸ **status**(): *Promise‹[NodeStatusResult](../interfaces/nodestatusresult.md)›*

*Defined in [providers/provider.ts:75](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/providers/provider.ts#L75)*

**Returns:** *Promise‹[NodeStatusResult](../interfaces/nodestatusresult.md)›*

___

### `Abstract` txStatus

▸ **txStatus**(`txHash`: Uint8Array): *Promise‹[FinalTransactionResult](../interfaces/finaltransactionresult.md)›*

*Defined in [providers/provider.ts:78](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/providers/provider.ts#L78)*

**Parameters:**

Name | Type |
------ | ------ |
`txHash` | Uint8Array |

**Returns:** *Promise‹[FinalTransactionResult](../interfaces/finaltransactionresult.md)›*
