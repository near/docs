# LocalAccountCreator

## Hierarchy

[AccountCreator](_account_creator_.accountcreator.md)

**↳ LocalAccountCreator**

## Constructors

### constructor <a id="constructor"></a>

⊕ **new LocalAccountCreator**\(masterAccount: [_Account_](../_account_/_account_.account.md), initialBalance: _`BN`_\): [LocalAccountCreator](_account_creator_.localaccountcreator.md)

_Defined in_ [_account\_creator.ts:15_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/account_creator.ts#L15)

**Parameters:**

| Name | Type |
| :--- | :--- |
| masterAccount | [Account](../_account_/_account_.account.md) |
| initialBalance | `BN` |

**Returns:** [LocalAccountCreator](_account_creator_.localaccountcreator.md)

## Properties

### initialBalance <a id="initialbalance"></a>

**● initialBalance**: _`BN`_

_Defined in_ [_account\_creator.ts:15_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/account_creator.ts#L15)

### masterAccount <a id="masteraccount"></a>

**● masterAccount**: [_Account_](../_account_/_account_.account.md)

_Defined in_ [_account\_creator.ts:14_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/account_creator.ts#L14)

## Methods

### createAccount <a id="createaccount"></a>

▸ **createAccount**\(newAccountId: _`string`_, publicKey: _`string`_\): `Promise`&lt;`void`&gt;

_Overrides_ [_AccountCreator_](_account_creator_.accountcreator.md)_._[_createAccount_](_account_creator_.accountcreator.md#createaccount)

_Defined in_ [_account\_creator.ts:23_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/account_creator.ts#L23)

**Parameters:**

| Name | Type |
| :--- | :--- |
| newAccountId | `string` |
| publicKey | `string` |

**Returns:** `Promise`&lt;`void`&gt;

