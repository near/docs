---
id: "urlaccountcreator"
title: "UrlAccountCreator"
sidebar_label: "UrlAccountCreator"
---

## Hierarchy

* [AccountCreator](accountcreator.md)

  ↳ **UrlAccountCreator**

## Index

### Constructors

* [constructor](urlaccountcreator.md#constructor)

### Properties

* [connection](urlaccountcreator.md#connection)
* [helperConnection](urlaccountcreator.md#helperconnection)

### Methods

* [createAccount](urlaccountcreator.md#createaccount)

## Constructors

###  constructor

\+ **new UrlAccountCreator**(`connection`: [Connection](connection.md), `helperUrl`: string): *[UrlAccountCreator](urlaccountcreator.md)*

*Defined in [account_creator.ts:32](https://github.com/near/near-api-js/blob/88ad17d/src.ts/account_creator.ts#L32)*

**Parameters:**

Name | Type |
------ | ------ |
`connection` | [Connection](connection.md) |
`helperUrl` | string |

**Returns:** *[UrlAccountCreator](urlaccountcreator.md)*

## Properties

###  connection

• **connection**: *[Connection](connection.md)*

*Defined in [account_creator.ts:31](https://github.com/near/near-api-js/blob/88ad17d/src.ts/account_creator.ts#L31)*

___

###  helperConnection

• **helperConnection**: *[ConnectionInfo](../interfaces/connectioninfo.md)*

*Defined in [account_creator.ts:32](https://github.com/near/near-api-js/blob/88ad17d/src.ts/account_creator.ts#L32)*

## Methods

###  createAccount

▸ **createAccount**(`newAccountId`: string, `publicKey`: [PublicKey](publickey.md)): *Promise‹void›*

*Overrides [AccountCreator](accountcreator.md).[createAccount](accountcreator.md#abstract-createaccount)*

*Defined in [account_creator.ts:40](https://github.com/near/near-api-js/blob/88ad17d/src.ts/account_creator.ts#L40)*

**Parameters:**

Name | Type |
------ | ------ |
`newAccountId` | string |
`publicKey` | [PublicKey](publickey.md) |

**Returns:** *Promise‹void›*
