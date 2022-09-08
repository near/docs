---
id: "contract.ContractMethods"
title: "Interface: ContractMethods"
sidebar_label: "ContractMethods"
custom_edit_url: null
---

[contract](../modules/contract.md).ContractMethods

## Properties

### changeMethods

 **changeMethods**: `string`[]

Methods that change state. These methods cost gas and require a signed transaction.

**`See`**

Account.functionCall

#### Defined in

[contract.ts:37](https://github.com/near/near-api-js/blob/ecc6fa8f/packages/near-api-js/src/contract.ts#L37)

___

### viewMethods

 **viewMethods**: `string`[]

View methods do not require a signed transaction.

@@see Account.viewFunction

#### Defined in

[contract.ts:44](https://github.com/near/near-api-js/blob/ecc6fa8f/packages/near-api-js/src/contract.ts#L44)
