---
id: "globals"
title: "near-runtime-ts"
sidebar_label: "Globals"
---

## Index

### Modules

* [base58](modules/base58.md)
* [base64](modules/base64.md)
* [collections](modules/collections.md)
* [logging](modules/logging.md)
* [math](modules/math.md)
* [near](modules/near.md)
* [runtime_api](modules/runtime_api.md)
* [util](modules/util.md)

### Classes

* [Context](classes/context.md)
* [ContractPromise](classes/contractpromise.md)
* [ContractPromiseResult](classes/contractpromiseresult.md)
* [PersistentDeque](classes/persistentdeque.md)
* [PersistentMap](classes/persistentmap.md)
* [PersistentTopN](classes/persistenttopn.md)
* [PersistentVector](classes/persistentvector.md)
* [Storage](classes/storage.md)

### Variables

* [context](globals.md#let-context)
* [storage](globals.md#const-storage)

## Variables

### `Let` context

• **context**: *[Context](classes/context.md)* =  new Context()

*Defined in [contract.ts:325](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/contract.ts#L325)*

___

### `Const` storage

• **storage**: *[Storage](classes/storage.md)* =  new Storage()

*Defined in [storage.ts:219](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/storage.ts#L219)*

An instance of a Storage class that is used for working with contract storage on the blockchain.
