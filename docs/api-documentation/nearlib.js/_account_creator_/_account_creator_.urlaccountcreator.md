# UrlAccountCreator

## Hierarchy

[AccountCreator](_account_creator_.accountcreator.md)

**↳ UrlAccountCreator**

## Constructors

### constructor <a id="constructor"></a>

⊕ **new UrlAccountCreator**\(connection: [_Connection_](../_connection_/_connection_.connection.md), helperUrl: _`string`_\): [UrlAccountCreator](_account_creator_.urlaccountcreator.md)

_Defined in_ [_account\_creator.ts:31_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/account_creator.ts#L31)

**Parameters:**

| Name | Type |
| :--- | :--- |
| connection | [Connection](../_connection_/_connection_.connection.md) |
| helperUrl | `string` |

**Returns:** [UrlAccountCreator](_account_creator_.urlaccountcreator.md)

## Properties

### connection <a id="connection"></a>

**● connection**: [_Connection_](../_connection_/_connection_.connection.md)

_Defined in_ [_account\_creator.ts:30_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/account_creator.ts#L30)

### helperConnection <a id="helperconnection"></a>

**● helperConnection**: [_ConnectionInfo_](../_utils_web_/_utils_web_.connectioninfo.md)

_Defined in_ [_account\_creator.ts:31_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/account_creator.ts#L31)

## Methods

### createAccount <a id="createaccount"></a>

▸ **createAccount**\(newAccountId: _`string`_, publicKey: _`string`_\): `Promise`&lt;`void`&gt;

_Overrides_ [_AccountCreator_](_account_creator_.accountcreator.md)_._[_createAccount_](_account_creator_.accountcreator.md#createaccount)

_Defined in_ [_account\_creator.ts:39_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/account_creator.ts#L39)

**Parameters:**

| Name | Type |
| :--- | :--- |
| newAccountId | `string` |
| publicKey | `string` |

**Returns:** `Promise`&lt;`void`&gt;

