---
id: "localaccountcreator"
title: "LocalAccountCreator"
sidebar_label: "LocalAccountCreator"
---

## Hierarchy

* [AccountCreator](accountcreator.md)

  ↳ **LocalAccountCreator**

## Index

### Constructors

* [constructor](localaccountcreator.md#constructor)

### Properties

* [initialBalance](localaccountcreator.md#initialbalance)
* [masterAccount](localaccountcreator.md#masteraccount)

### Methods

* [createAccount](localaccountcreator.md#createaccount)

## Constructors

###  constructor

\+ **new LocalAccountCreator**(`masterAccount`: [Account](account.md), `initialBalance`: BN): *[LocalAccountCreator](localaccountcreator.md)*

*Defined in [account_creator.ts:16](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/account_creator.ts#L16)*

**Parameters:**

Name | Type |
------ | ------ |
`masterAccount` | [Account](account.md) |
`initialBalance` | BN |

**Returns:** *[LocalAccountCreator](localaccountcreator.md)*

## Properties

###  initialBalance

• **initialBalance**: *BN*

*Defined in [account_creator.ts:16](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/account_creator.ts#L16)*

___

###  masterAccount

• **masterAccount**: *[Account](account.md)*

*Defined in [account_creator.ts:15](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/account_creator.ts#L15)*

## Methods

###  createAccount

▸ **createAccount**(`newAccountId`: string, `publicKey`: [PublicKey](publickey.md)): *Promise‹void›*

*Overrides [AccountCreator](accountcreator.md).[createAccount](accountcreator.md#abstract-createaccount)*

*Defined in [account_creator.ts:24](https://github.com/nearprotocol/nearlib/blob/88ad17d/src.ts/account_creator.ts#L24)*

**Parameters:**

Name | Type |
------ | ------ |
`newAccountId` | string |
`publicKey` | [PublicKey](publickey.md) |

**Returns:** *Promise‹void›*
