---
id: "connection"
title: "Connection"
sidebar_label: "Connection"
---

## Hierarchy

* **Connection**

## Index

### Constructors

* [constructor](connection.md#constructor)

### Properties

* [networkId](connection.md#networkid)
* [provider](connection.md#provider)
* [signer](connection.md#signer)

### Methods

* [fromConfig](connection.md#static-fromconfig)

## Constructors

###  constructor

\+ **new Connection**(`networkId`: string, `provider`: [Provider](provider.md), `signer`: [Signer](signer.md)): *[Connection](connection.md)*

*Defined in [connection.ts:25](https://github.com/near/near-api-js/blob/88ad17d/src.ts/connection.ts#L25)*

**Parameters:**

Name | Type |
------ | ------ |
`networkId` | string |
`provider` | [Provider](provider.md) |
`signer` | [Signer](signer.md) |

**Returns:** *[Connection](connection.md)*

## Properties

###  networkId

• **networkId**: *string*

*Defined in [connection.ts:23](https://github.com/near/near-api-js/blob/88ad17d/src.ts/connection.ts#L23)*

___

###  provider

• **provider**: *[Provider](provider.md)*

*Defined in [connection.ts:24](https://github.com/near/near-api-js/blob/88ad17d/src.ts/connection.ts#L24)*

___

###  signer

• **signer**: *[Signer](signer.md)*

*Defined in [connection.ts:25](https://github.com/near/near-api-js/blob/88ad17d/src.ts/connection.ts#L25)*

## Methods

### `Static` fromConfig

▸ **fromConfig**(`config`: any): *[Connection](connection.md)*

*Defined in [connection.ts:33](https://github.com/near/near-api-js/blob/88ad17d/src.ts/connection.ts#L33)*

**Parameters:**

Name | Type |
------ | ------ |
`config` | any |

**Returns:** *[Connection](connection.md)*
