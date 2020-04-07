---
id: "account"
title: "Account"
sidebar_label: "Account"
---

## Hierarchy

* **Account**

## Index

### Constructors

* [constructor](account.md#constructor)

### Properties

* [_accessKey](account.md#private-_accesskey)
* [_ready](account.md#private-_ready)
* [_state](account.md#private-_state)
* [accountId](account.md#accountid)
* [connection](account.md#connection)

### Accessors

* [ready](account.md#protected-ready)

### Methods

* [addKey](account.md#addkey)
* [createAccount](account.md#createaccount)
* [createAndDeployContract](account.md#createanddeploycontract)
* [deleteAccount](account.md#deleteaccount)
* [deleteKey](account.md#deletekey)
* [deployContract](account.md#deploycontract)
* [fetchState](account.md#fetchstate)
* [functionCall](account.md#functioncall)
* [getAccessKeys](account.md#getaccesskeys)
* [getAccountDetails](account.md#getaccountdetails)
* [printLogs](account.md#private-printlogs)
* [retryTxResult](account.md#private-retrytxresult)
* [sendMoney](account.md#sendmoney)
* [signAndSendTransaction](account.md#private-signandsendtransaction)
* [stake](account.md#stake)
* [state](account.md#state)
* [viewFunction](account.md#viewfunction)

## Constructors

###  constructor

\+ **new Account**(`connection`: [Connection](connection.md), `accountId`: string): *[Account](account.md)*

*Defined in [account.ts:46](https://github.com/near/near-api-js/blob/88ad17d/src.ts/account.ts#L46)*

**Parameters:**

Name | Type |
------ | ------ |
`connection` | [Connection](connection.md) |
`accountId` | string |

**Returns:** *[Account](account.md)*

## Properties

### `Private` _accessKey

• **_accessKey**: *[AccessKey](accesskey.md)*

*Defined in [account.ts:41](https://github.com/near/near-api-js/blob/88ad17d/src.ts/account.ts#L41)*

___

### `Private` _ready

• **_ready**: *Promise‹void›*

*Defined in [account.ts:43](https://github.com/near/near-api-js/blob/88ad17d/src.ts/account.ts#L43)*

___

### `Private` _state

• **_state**: *[AccountState](../interfaces/accountstate.md)*

*Defined in [account.ts:40](https://github.com/near/near-api-js/blob/88ad17d/src.ts/account.ts#L40)*

___

###  accountId

• **accountId**: *string*

*Defined in [account.ts:39](https://github.com/near/near-api-js/blob/88ad17d/src.ts/account.ts#L39)*

___

###  connection

• **connection**: *[Connection](connection.md)*

*Defined in [account.ts:38](https://github.com/near/near-api-js/blob/88ad17d/src.ts/account.ts#L38)*

## Accessors

### `Protected` ready

• **get ready**(): *Promise‹void›*

*Defined in [account.ts:44](https://github.com/near/near-api-js/blob/88ad17d/src.ts/account.ts#L44)*

**Returns:** *Promise‹void›*

## Methods

###  addKey

▸ **addKey**(`publicKey`: string | [PublicKey](publickey.md), `contractId?`: string, `methodName?`: string, `amount?`: BN): *Promise‹[FinalTransactionResult](../interfaces/finaltransactionresult.md)›*

*Defined in [account.ts:162](https://github.com/near/near-api-js/blob/88ad17d/src.ts/account.ts#L162)*

**Parameters:**

Name | Type |
------ | ------ |
`publicKey` | string &#124; [PublicKey](publickey.md) |
`contractId?` | string |
`methodName?` | string |
`amount?` | BN |

**Returns:** *Promise‹[FinalTransactionResult](../interfaces/finaltransactionresult.md)›*

___

###  createAccount

▸ **createAccount**(`newAccountId`: string, `publicKey`: string | [PublicKey](publickey.md), `amount`: BN): *Promise‹[FinalTransactionResult](../interfaces/finaltransactionresult.md)›*

*Defined in [account.ts:141](https://github.com/near/near-api-js/blob/88ad17d/src.ts/account.ts#L141)*

**Parameters:**

Name | Type |
------ | ------ |
`newAccountId` | string |
`publicKey` | string &#124; [PublicKey](publickey.md) |
`amount` | BN |

**Returns:** *Promise‹[FinalTransactionResult](../interfaces/finaltransactionresult.md)›*

___

###  createAndDeployContract

▸ **createAndDeployContract**(`contractId`: string, `publicKey`: string | [PublicKey](publickey.md), `data`: Uint8Array, `amount`: BN): *Promise‹[Account](account.md)›*

*Defined in [account.ts:130](https://github.com/near/near-api-js/blob/88ad17d/src.ts/account.ts#L130)*

**Parameters:**

Name | Type |
------ | ------ |
`contractId` | string |
`publicKey` | string &#124; [PublicKey](publickey.md) |
`data` | Uint8Array |
`amount` | BN |

**Returns:** *Promise‹[Account](account.md)›*

___

###  deleteAccount

▸ **deleteAccount**(`beneficiaryId`: string): *Promise‹[FinalTransactionResult](../interfaces/finaltransactionresult.md)›*

*Defined in [account.ts:146](https://github.com/near/near-api-js/blob/88ad17d/src.ts/account.ts#L146)*

**Parameters:**

Name | Type |
------ | ------ |
`beneficiaryId` | string |

**Returns:** *Promise‹[FinalTransactionResult](../interfaces/finaltransactionresult.md)›*

___

###  deleteKey

▸ **deleteKey**(`publicKey`: string | [PublicKey](publickey.md)): *Promise‹[FinalTransactionResult](../interfaces/finaltransactionresult.md)›*

*Defined in [account.ts:172](https://github.com/near/near-api-js/blob/88ad17d/src.ts/account.ts#L172)*

**Parameters:**

Name | Type |
------ | ------ |
`publicKey` | string &#124; [PublicKey](publickey.md) |

**Returns:** *Promise‹[FinalTransactionResult](../interfaces/finaltransactionresult.md)›*

___

###  deployContract

▸ **deployContract**(`data`: Uint8Array): *Promise‹[FinalTransactionResult](../interfaces/finaltransactionresult.md)›*

*Defined in [account.ts:150](https://github.com/near/near-api-js/blob/88ad17d/src.ts/account.ts#L150)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | Uint8Array |

**Returns:** *Promise‹[FinalTransactionResult](../interfaces/finaltransactionresult.md)›*

___

###  fetchState

▸ **fetchState**(): *Promise‹void›*

*Defined in [account.ts:53](https://github.com/near/near-api-js/blob/88ad17d/src.ts/account.ts#L53)*

**Returns:** *Promise‹void›*

___

###  functionCall

▸ **functionCall**(`contractId`: string, `methodName`: string, `args`: any, `gas`: number, `amount?`: BN): *Promise‹[FinalTransactionResult](../interfaces/finaltransactionresult.md)›*

*Defined in [account.ts:154](https://github.com/near/near-api-js/blob/88ad17d/src.ts/account.ts#L154)*

**Parameters:**

Name | Type |
------ | ------ |
`contractId` | string |
`methodName` | string |
`args` | any |
`gas` | number |
`amount?` | BN |

**Returns:** *Promise‹[FinalTransactionResult](../interfaces/finaltransactionresult.md)›*

___

###  getAccessKeys

▸ **getAccessKeys**(): *Promise‹any›*

*Defined in [account.ts:189](https://github.com/near/near-api-js/blob/88ad17d/src.ts/account.ts#L189)*

**Returns:** *Promise‹any›*

___

###  getAccountDetails

▸ **getAccountDetails**(): *Promise‹any›*

*Defined in [account.ts:194](https://github.com/near/near-api-js/blob/88ad17d/src.ts/account.ts#L194)*

**Returns:** *Promise‹any›*

___

### `Private` printLogs

▸ **printLogs**(`contractId`: string, `logs`: string[]): *void*

*Defined in [account.ts:72](https://github.com/near/near-api-js/blob/88ad17d/src.ts/account.ts#L72)*

**Parameters:**

Name | Type |
------ | ------ |
`contractId` | string |
`logs` | string[] |

**Returns:** *void*

___

### `Private` retryTxResult

▸ **retryTxResult**(`txHash`: Uint8Array): *Promise‹[FinalTransactionResult](../interfaces/finaltransactionresult.md)›*

*Defined in [account.ts:78](https://github.com/near/near-api-js/blob/88ad17d/src.ts/account.ts#L78)*

**Parameters:**

Name | Type |
------ | ------ |
`txHash` | Uint8Array |

**Returns:** *Promise‹[FinalTransactionResult](../interfaces/finaltransactionresult.md)›*

___

###  sendMoney

▸ **sendMoney**(`receiverId`: string, `amount`: BN): *Promise‹[FinalTransactionResult](../interfaces/finaltransactionresult.md)›*

*Defined in [account.ts:137](https://github.com/near/near-api-js/blob/88ad17d/src.ts/account.ts#L137)*

**Parameters:**

Name | Type |
------ | ------ |
`receiverId` | string |
`amount` | BN |

**Returns:** *Promise‹[FinalTransactionResult](../interfaces/finaltransactionresult.md)›*

___

### `Private` signAndSendTransaction

▸ **signAndSendTransaction**(`receiverId`: string, `actions`: [Action](action.md)[]): *Promise‹[FinalTransactionResult](../interfaces/finaltransactionresult.md)›*

*Defined in [account.ts:93](https://github.com/near/near-api-js/blob/88ad17d/src.ts/account.ts#L93)*

**Parameters:**

Name | Type |
------ | ------ |
`receiverId` | string |
`actions` | [Action](action.md)[] |

**Returns:** *Promise‹[FinalTransactionResult](../interfaces/finaltransactionresult.md)›*

___

###  stake

▸ **stake**(`publicKey`: string | [PublicKey](publickey.md), `amount`: BN): *Promise‹[FinalTransactionResult](../interfaces/finaltransactionresult.md)›*

*Defined in [account.ts:176](https://github.com/near/near-api-js/blob/88ad17d/src.ts/account.ts#L176)*

**Parameters:**

Name | Type |
------ | ------ |
`publicKey` | string &#124; [PublicKey](publickey.md) |
`amount` | BN |

**Returns:** *Promise‹[FinalTransactionResult](../interfaces/finaltransactionresult.md)›*

___

###  state

▸ **state**(): *Promise‹[AccountState](../interfaces/accountstate.md)›*

*Defined in [account.ts:67](https://github.com/near/near-api-js/blob/88ad17d/src.ts/account.ts#L67)*

**Returns:** *Promise‹[AccountState](../interfaces/accountstate.md)›*

___

###  viewFunction

▸ **viewFunction**(`contractId`: string, `methodName`: string, `args`: any): *Promise‹any›*

*Defined in [account.ts:180](https://github.com/near/near-api-js/blob/88ad17d/src.ts/account.ts#L180)*

**Parameters:**

Name | Type |
------ | ------ |
`contractId` | string |
`methodName` | string |
`args` | any |

**Returns:** *Promise‹any›*
