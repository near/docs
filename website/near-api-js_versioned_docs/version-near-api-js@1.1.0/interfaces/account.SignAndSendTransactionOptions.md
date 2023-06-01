---
id: "account.SignAndSendTransactionOptions"
title: "Interface: SignAndSendTransactionOptions"
sidebar_label: "SignAndSendTransactionOptions"
custom_edit_url: null
---

[account](../modules/account.md).SignAndSendTransactionOptions

Options used to initiate sining and sending transactions

## Properties

### actions

 **actions**: [`Action`](../classes/transaction.Action.md)[]

#### Defined in

[account.ts:68](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L68)

___

### receiverId

 **receiverId**: `string`

#### Defined in

[account.ts:67](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L67)

___

### returnError

 `Optional` **returnError**: `boolean`

#### Defined in

[account.ts:79](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L79)

___

### walletCallbackUrl

 `Optional` **walletCallbackUrl**: `string`

Callback url to send the NEAR Wallet if using it to sign transactions.

**`See`**

RequestSignTransactionsOptions

#### Defined in

[account.ts:78](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L78)

___

### walletMeta

 `Optional` **walletMeta**: `string`

Metadata to send the NEAR Wallet if using it to sign transactions.

**`See`**

RequestSignTransactionsOptions

#### Defined in

[account.ts:73](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/account.ts#L73)
