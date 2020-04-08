---
id: "accountcreator"
title: "AccountCreator"
sidebar_label: "AccountCreator"
---

Account creator provides interface to specific implementation to acutally create account.

## Hierarchy

* **AccountCreator**

  ↳ [LocalAccountCreator](localaccountcreator.md)

  ↳ [UrlAccountCreator](urlaccountcreator.md)

## Index

### Methods

* [createAccount](accountcreator.md#abstract-createaccount)

## Methods

### `Abstract` createAccount

▸ **createAccount**(`newAccountId`: string, `publicKey`: [PublicKey](publickey.md)): *Promise‹void›*

*Defined in [account_creator.ts:11](https://github.com/near/near-api-js/blob/88ad17d/src.ts/account_creator.ts#L11)*

**Parameters:**

Name | Type |
------ | ------ |
`newAccountId` | string |
`publicKey` | [PublicKey](publickey.md) |

**Returns:** *Promise‹void›*
