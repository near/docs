---
id: "near"
title: "Near"
sidebar_label: "Near"
---

## Hierarchy

* **Near**

## Index

### Constructors

* [constructor](near.md#constructor)

### Properties

* [accountCreator](near.md#accountcreator)
* [config](near.md#config)
* [connection](near.md#connection)

### Methods

* [account](near.md#account)
* [createAccount](near.md#createaccount)
* [loadContract](near.md#loadcontract)
* [sendTokens](near.md#sendtokens)

## Constructors

###  constructor

\+ **new Near**(`config`: any): *[Near](near.md)*

*Defined in [near.ts:14](https://github.com/near/near-api-js/blob/88ad17d/src.ts/near.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`config` | any |

**Returns:** *[Near](near.md)*

## Properties

###  accountCreator

• **accountCreator**: *[AccountCreator](accountcreator.md)*

*Defined in [near.ts:14](https://github.com/near/near-api-js/blob/88ad17d/src.ts/near.ts#L14)*

___

###  config

• **config**: *any*

*Defined in [near.ts:12](https://github.com/near/near-api-js/blob/88ad17d/src.ts/near.ts#L12)*

___

###  connection

• **connection**: *[Connection](connection.md)*

*Defined in [near.ts:13](https://github.com/near/near-api-js/blob/88ad17d/src.ts/near.ts#L13)*

## Methods

###  account

▸ **account**(`accountId`: string): *Promise‹[Account](account.md)›*

*Defined in [near.ts:33](https://github.com/near/near-api-js/blob/88ad17d/src.ts/near.ts#L33)*

**Parameters:**

Name | Type |
------ | ------ |
`accountId` | string |

**Returns:** *Promise‹[Account](account.md)›*

___

###  createAccount

▸ **createAccount**(`accountId`: string, `publicKey`: [PublicKey](publickey.md)): *Promise‹[Account](account.md)›*

*Defined in [near.ts:39](https://github.com/near/near-api-js/blob/88ad17d/src.ts/near.ts#L39)*

**Parameters:**

Name | Type |
------ | ------ |
`accountId` | string |
`publicKey` | [PublicKey](publickey.md) |

**Returns:** *Promise‹[Account](account.md)›*

___

###  loadContract

▸ **loadContract**(`contractId`: string, `options`: object): *Promise‹[Contract](contract.md)›*

*Defined in [near.ts:52](https://github.com/near/near-api-js/blob/88ad17d/src.ts/near.ts#L52)*

Backwards compatibility method. Use `new nearlib.Contract(yourAccount, contractId, { viewMethods, changeMethods })` instead.

**Parameters:**

▪ **contractId**: *string*

▪ **options**: *object*

Name | Type |
------ | ------ |
`changeMethods` | string[] |
`sender` | string |
`viewMethods` | string[] |

**Returns:** *Promise‹[Contract](contract.md)›*

___

###  sendTokens

▸ **sendTokens**(`amount`: BN, `originator`: string, `receiver`: string): *Promise‹string›*

*Defined in [near.ts:64](https://github.com/near/near-api-js/blob/88ad17d/src.ts/near.ts#L64)*

Backwards compatibility method. Use `yourAccount.sendMoney` instead.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`amount` | BN | - |
`originator` | string | - |
`receiver` | string |   |

**Returns:** *Promise‹string›*
