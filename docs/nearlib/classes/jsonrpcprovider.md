---
id: "jsonrpcprovider"
title: "JsonRpcProvider"
sidebar_label: "JsonRpcProvider"
---

## Hierarchy

* [Provider](provider.md)

  ↳ **JsonRpcProvider**

## Index

### Constructors

* [constructor](jsonrpcprovider.md#constructor)

### Properties

* [connection](jsonrpcprovider.md#connection)

### Methods

* [block](jsonrpcprovider.md#block)
* [getNetwork](jsonrpcprovider.md#getnetwork)
* [query](jsonrpcprovider.md#query)
* [sendJsonRpc](jsonrpcprovider.md#private-sendjsonrpc)
* [sendTransaction](jsonrpcprovider.md#sendtransaction)
* [status](jsonrpcprovider.md#status)
* [txStatus](jsonrpcprovider.md#txstatus)

## Constructors

###  constructor

\+ **new JsonRpcProvider**(`url?`: string, `network?`: [Network](../interfaces/network.md)): *[JsonRpcProvider](jsonrpcprovider.md)*

*Defined in [providers/json-rpc-provider.ts:13](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/providers/json-rpc-provider.ts#L13)*

**Parameters:**

Name | Type |
------ | ------ |
`url?` | string |
`network?` | [Network](../interfaces/network.md) |

**Returns:** *[JsonRpcProvider](jsonrpcprovider.md)*

## Properties

###  connection

• **connection**: *[ConnectionInfo](../interfaces/connectioninfo.md)*

*Defined in [providers/json-rpc-provider.ts:13](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/providers/json-rpc-provider.ts#L13)*

## Methods

###  block

▸ **block**(`height`: number): *Promise‹[BlockResult](../interfaces/blockresult.md)›*

*Overrides [Provider](provider.md).[block](provider.md#abstract-block)*

*Defined in [providers/json-rpc-provider.ts:50](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/providers/json-rpc-provider.ts#L50)*

**Parameters:**

Name | Type |
------ | ------ |
`height` | number |

**Returns:** *Promise‹[BlockResult](../interfaces/blockresult.md)›*

___

###  getNetwork

▸ **getNetwork**(): *Promise‹[Network](../interfaces/network.md)›*

*Overrides [Provider](provider.md).[getNetwork](provider.md#abstract-getnetwork)*

*Defined in [providers/json-rpc-provider.ts:22](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/providers/json-rpc-provider.ts#L22)*

**Returns:** *Promise‹[Network](../interfaces/network.md)›*

___

###  query

▸ **query**(`path`: string, `data`: string): *Promise‹any›*

*Overrides [Provider](provider.md).[query](provider.md#abstract-query)*

*Defined in [providers/json-rpc-provider.ts:42](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/providers/json-rpc-provider.ts#L42)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |
`data` | string |

**Returns:** *Promise‹any›*

___

### `Private` sendJsonRpc

▸ **sendJsonRpc**(`method`: string, `params`: any[]): *Promise‹any›*

*Defined in [providers/json-rpc-provider.ts:54](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/providers/json-rpc-provider.ts#L54)*

**Parameters:**

Name | Type |
------ | ------ |
`method` | string |
`params` | any[] |

**Returns:** *Promise‹any›*

___

###  sendTransaction

▸ **sendTransaction**(`signedTransaction`: [SignedTransaction](signedtransaction.md)): *Promise‹[FinalTransactionResult](../interfaces/finaltransactionresult.md)›*

*Overrides [Provider](provider.md).[sendTransaction](provider.md#abstract-sendtransaction)*

*Defined in [providers/json-rpc-provider.ts:33](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/providers/json-rpc-provider.ts#L33)*

**Parameters:**

Name | Type |
------ | ------ |
`signedTransaction` | [SignedTransaction](signedtransaction.md) |

**Returns:** *Promise‹[FinalTransactionResult](../interfaces/finaltransactionresult.md)›*

___

###  status

▸ **status**(): *Promise‹[NodeStatusResult](../interfaces/nodestatusresult.md)›*

*Overrides [Provider](provider.md).[status](provider.md#abstract-status)*

*Defined in [providers/json-rpc-provider.ts:29](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/providers/json-rpc-provider.ts#L29)*

**Returns:** *Promise‹[NodeStatusResult](../interfaces/nodestatusresult.md)›*

___

###  txStatus

▸ **txStatus**(`txHash`: Uint8Array): *Promise‹[FinalTransactionResult](../interfaces/finaltransactionresult.md)›*

*Overrides [Provider](provider.md).[txStatus](provider.md#abstract-txstatus)*

*Defined in [providers/json-rpc-provider.ts:38](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/providers/json-rpc-provider.ts#L38)*

**Parameters:**

Name | Type |
------ | ------ |
`txHash` | Uint8Array |

**Returns:** *Promise‹[FinalTransactionResult](../interfaces/finaltransactionresult.md)›*
