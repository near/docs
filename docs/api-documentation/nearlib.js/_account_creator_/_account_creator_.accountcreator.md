# AccountCreator

Account creator provides interface to specific implementation to acutally create account.

## Hierarchy

**AccountCreator**

↳ [LocalAccountCreator](_account_creator_.localaccountcreator.md)

↳ [UrlAccountCreator](_account_creator_.urlaccountcreator.md)

## Methods

### `<Abstract>` createAccount <a id="createaccount"></a>

▸ **createAccount**\(newAccountId: _`string`_, publicKey: _`string`_\): `Promise`&lt;`void`&gt;

_Defined in_ [_account\_creator.ts:10_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/account_creator.ts#L10)

**Parameters:**

| Name | Type |
| :--- | :--- |
| newAccountId | `string` |
| publicKey | `string` |

**Returns:** `Promise`&lt;`void`&gt;

