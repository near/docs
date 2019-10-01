---
id: "signedtransaction"
title: "SignedTransaction"
sidebar_label: "SignedTransaction"
---

## Hierarchy

* [Assignable](assignable.md)

  ↳ **SignedTransaction**

## Index

### Constructors

* [constructor](signedtransaction.md#constructor)

### Properties

* [signature](signedtransaction.md#signature)
* [transaction](signedtransaction.md#transaction)

### Methods

* [encode](signedtransaction.md#encode)

## Constructors

###  constructor

\+ **new SignedTransaction**(`properties`: any): *[SignedTransaction](signedtransaction.md)*

*Inherited from [Assignable](assignable.md).[constructor](assignable.md#constructor)*

*Defined in [transaction.ts:24](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/transaction.ts#L24)*

**Parameters:**

Name | Type |
------ | ------ |
`properties` | any |

**Returns:** *[SignedTransaction](signedtransaction.md)*

## Properties

###  signature

• **signature**: *Signature*

*Defined in [transaction.ts:122](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/transaction.ts#L122)*

___

###  transaction

• **transaction**: *[Transaction](transaction.md)*

*Defined in [transaction.ts:121](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/transaction.ts#L121)*

## Methods

###  encode

▸ **encode**(): *Uint8Array*

*Defined in [transaction.ts:124](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/transaction.ts#L124)*

**Returns:** *Uint8Array*
