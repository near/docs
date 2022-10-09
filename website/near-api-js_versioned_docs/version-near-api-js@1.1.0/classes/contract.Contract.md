---
id: "contract.Contract"
title: "Class: Contract"
sidebar_label: "Contract"
custom_edit_url: null
---

[contract](../modules/contract.md).Contract

Defines a smart contract on NEAR including the change (mutable) and view (non-mutable) methods

**`See`**

[https://docs.near.org/tools/near-api-js/quick-reference#contract](https://docs.near.org/tools/near-api-js/quick-reference#contract)

**`Example`**

```js
import { Contract } from 'near-api-js';

async function contractExample() {
  const methodOptions = {
    viewMethods: ['getMessageByAccountId'],
    changeMethods: ['addMessage']
  };
  const contract = new Contract(
    wallet.account(),
    'contract-id.testnet',
    methodOptions
  );

  // use a contract view method
  const messages = await contract.getMessages({
    accountId: 'example-account.testnet'
  });

  // use a contract change method
  await contract.addMessage({
     meta: 'some info',
     callbackUrl: 'https://example.com/callback',
     args: { text: 'my message' },
     amount: 1
  })
}
```

## Constructors

### constructor

**new Contract**(`account`, `contractId`, `options`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | [`Account`](account.Account.md) | NEAR account to sign change method transactions |
| `contractId` | `string` | NEAR account id where the contract is deployed |
| `options` | [`ContractMethods`](../interfaces/contract.ContractMethods.md) | NEAR smart contract methods that your application will use. These will be available as `contract.methodName` |

#### Defined in

[contract.ts:90](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/contract.ts#L90)

## Properties

### account

 `Readonly` **account**: [`Account`](account.Account.md)

#### Defined in

[contract.ts:82](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/contract.ts#L82)

___

### contractId

 `Readonly` **contractId**: `string`

#### Defined in

[contract.ts:83](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/contract.ts#L83)

## Methods

### \_changeMethod

`Private` **_changeMethod**(`__namedParameters`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `ChangeMethodOptions` |

#### Returns

`Promise`<`any`\>

#### Defined in

[contract.ts:132](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/contract.ts#L132)
