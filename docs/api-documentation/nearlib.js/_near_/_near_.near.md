# Near

## Hierarchy

**Near**

## Constructors

### constructor <a id="constructor"></a>

⊕ **new Near**\(config: _`any`_\): [Near](_near_.near.md)

_Defined in_ [_near.ts:14_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/near.ts#L14)

**Parameters:**

| Name | Type |
| :--- | :--- |
| config | `any` |

**Returns:** [Near](_near_.near.md)

## Properties

### accountCreator <a id="accountcreator"></a>

**● accountCreator**: [_AccountCreator_](../_account_creator_/_account_creator_.accountcreator.md)

_Defined in_ [_near.ts:14_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/near.ts#L14)

### config <a id="config"></a>

**● config**: _`any`_

_Defined in_ [_near.ts:12_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/near.ts#L12)

### connection <a id="connection"></a>

**● connection**: [_Connection_](../_connection_/_connection_.connection.md)

_Defined in_ [_near.ts:13_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/near.ts#L13)

## Methods

### account <a id="account"></a>

▸ **account**\(accountId: _`string`_\): `Promise`&lt;[Account](../_account_/_account_.account.md)&gt;

_Defined in_ [_near.ts:33_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/near.ts#L33)

**Parameters:**

| Name | Type |
| :--- | :--- |
| accountId | `string` |

**Returns:** `Promise`&lt;[Account](../_account_/_account_.account.md)&gt;

### createAccount <a id="createaccount"></a>

▸ **createAccount**\(accountId: _`string`_, publicKey: _`string`_\): `Promise`&lt;[Account](../_account_/_account_.account.md)&gt;

_Defined in_ [_near.ts:39_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/near.ts#L39)

**Parameters:**

| Name | Type |
| :--- | :--- |
| accountId | `string` |
| publicKey | `string` |

**Returns:** `Promise`&lt;[Account](../_account_/_account_.account.md)&gt;

### deployContract <a id="deploycontract"></a>

▸ **deployContract**\(contractId: _`string`_, wasmByteArray: _`Uint8Array`_\): `Promise`&lt;`string`&gt;

_Defined in_ [_near.ts:63_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/near.ts#L63)

Backwards compatibility method. Use `contractAccount.deployContract` or `yourAccount.createAndDeployContract` instead.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| contractId | `string` | - |
| wasmByteArray | `Uint8Array` |  |

**Returns:** `Promise`&lt;`string`&gt;

### loadContract <a id="loadcontract"></a>

▸ **loadContract**\(contractId: _`string`_, options: _`object`_\): `Promise`&lt;[Contract](../_contract_/_contract_.contract.md)&gt;

_Defined in_ [_near.ts:52_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/near.ts#L52)

Backwards compatibility method. Use `new nearlib.Contract(yourAccount, contractId, { viewMethods, changeMethods })` instead.

**Parameters:**

**contractId: `string`**

**options: `object`**

| Name | Type |
| :--- | :--- |
| changeMethods | `string`\[\] |
| sender | `string` |
| viewMethods | `string`\[\] |

**Returns:** `Promise`&lt;[Contract](../_contract_/_contract_.contract.md)&gt;

### sendTokens <a id="sendtokens"></a>

▸ **sendTokens**\(amount: _`BN`_, originator: _`string`_, receiver: _`string`_\): `Promise`&lt;`string`&gt;

_Defined in_ [_near.ts:76_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/near.ts#L76)

Backwards compatibility method. Use `yourAccount.sendMoney` instead.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| amount | `BN` | - |
| originator | `string` | - |
| receiver | `string` |  |

**Returns:** `Promise`&lt;`string`&gt;

