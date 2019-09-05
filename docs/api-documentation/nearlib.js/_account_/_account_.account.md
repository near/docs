# Account

## Hierarchy

**Account**

## Constructors

### constructor <a id="constructor"></a>

⊕ **new Account**\(connection: [_Connection_](../_connection_/_connection_.connection.md), accountId: _`string`_\): [Account](_account_.account.md)

_Defined in_ [_account.ts:46_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/account.ts#L46)

**Parameters:**

| Name | Type |
| :--- | :--- |
| connection | [Connection](../_connection_/_connection_.connection.md) |
| accountId | `string` |

**Returns:** [Account](_account_.account.md)

## Properties

### `<Private>` \_ready <a id="_ready"></a>

**● \_ready**: _`Promise`&lt;`void`&gt;_

_Defined in_ [_account.ts:43_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/account.ts#L43)

### `<Private>` \_state <a id="_state"></a>

**● \_state**: [_AccountState_](_account_.accountstate.md)

_Defined in_ [_account.ts:41_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/account.ts#L41)

### accountId <a id="accountid"></a>

**● accountId**: _`string`_

_Defined in_ [_account.ts:40_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/account.ts#L40)

### connection <a id="connection"></a>

**● connection**: [_Connection_](../_connection_/_connection_.connection.md)

_Defined in_ [_account.ts:39_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/account.ts#L39)

## Accessors

### `<Protected>` ready <a id="ready"></a>

**get ready**\(\): `Promise`&lt;`void`&gt;

_Defined in_ [_account.ts:44_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/account.ts#L44)

**Returns:** `Promise`&lt;`void`&gt;

## Methods

### addKey <a id="addkey"></a>

▸ **addKey**\(publicKey: _`string`_, contractId?: _`string`_, methodName?: _`string`_, balanceOwner?: _`string`_, amount?: _`BN`_\): `Promise`&lt;[FinalTransactionResult](../_providers_provider_/_providers_provider_.finaltransactionresult.md)&gt;

_Defined in_ [_account.ts:155_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/account.ts#L155)

**Parameters:**

| Name | Type |
| :--- | :--- |
| publicKey | `string` |
| `Optional` contractId | `string` |
| `Optional` methodName | `string` |
| `Optional` balanceOwner | `string` |
| `Optional` amount | `BN` |

**Returns:** `Promise`&lt;[FinalTransactionResult](../_providers_provider_/_providers_provider_.finaltransactionresult.md)&gt;

### createAccount <a id="createaccount"></a>

▸ **createAccount**\(newAccountId: _`string`_, publicKey: _`string`_, amount: _`BN`_\): `Promise`&lt;[FinalTransactionResult](../_providers_provider_/_providers_provider_.finaltransactionresult.md)&gt;

_Defined in_ [_account.ts:134_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/account.ts#L134)

**Parameters:**

| Name | Type |
| :--- | :--- |
| newAccountId | `string` |
| publicKey | `string` |
| amount | `BN` |

**Returns:** `Promise`&lt;[FinalTransactionResult](../_providers_provider_/_providers_provider_.finaltransactionresult.md)&gt;

### createAndDeployContract <a id="createanddeploycontract"></a>

▸ **createAndDeployContract**\(contractId: _`string`_, publicKey: _`string`_, data: _`Uint8Array`_, amount: _`BN`_\): `Promise`&lt;[Account](_account_.account.md)&gt;

_Defined in_ [_account.ts:120_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/account.ts#L120)

**Parameters:**

| Name | Type |
| :--- | :--- |
| contractId | `string` |
| publicKey | `string` |
| data | `Uint8Array` |
| amount | `BN` |

**Returns:** `Promise`&lt;[Account](_account_.account.md)&gt;

### deleteKey <a id="deletekey"></a>

▸ **deleteKey**\(publicKey: _`string`_\): `Promise`&lt;[FinalTransactionResult](../_providers_provider_/_providers_provider_.finaltransactionresult.md)&gt;

_Defined in_ [_account.ts:162_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/account.ts#L162)

**Parameters:**

| Name | Type |
| :--- | :--- |
| publicKey | `string` |

**Returns:** `Promise`&lt;[FinalTransactionResult](../_providers_provider_/_providers_provider_.finaltransactionresult.md)&gt;

### deployContract <a id="deploycontract"></a>

▸ **deployContract**\(data: _`Uint8Array`_\): `Promise`&lt;[FinalTransactionResult](../_providers_provider_/_providers_provider_.finaltransactionresult.md)&gt;

_Defined in_ [_account.ts:140_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/account.ts#L140)

**Parameters:**

| Name | Type |
| :--- | :--- |
| data | `Uint8Array` |

**Returns:** `Promise`&lt;[FinalTransactionResult](../_providers_provider_/_providers_provider_.finaltransactionresult.md)&gt;

### fetchState <a id="fetchstate"></a>

▸ **fetchState**\(\): `Promise`&lt;`void`&gt;

_Defined in_ [_account.ts:53_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/account.ts#L53)

**Returns:** `Promise`&lt;`void`&gt;

### functionCall <a id="functioncall"></a>

▸ **functionCall**\(contractId: _`string`_, methodName: _`string`_, args: _`any`_\): `Promise`&lt;[FinalTransactionResult](../_providers_provider_/_providers_provider_.finaltransactionresult.md)&gt;

_Defined in_ [_account.ts:146_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/account.ts#L146)

**Parameters:**

| Name | Type |
| :--- | :--- |
| contractId | `string` |
| methodName | `string` |
| args | `any` |

**Returns:** `Promise`&lt;[FinalTransactionResult](../_providers_provider_/_providers_provider_.finaltransactionresult.md)&gt;

### getAccountDetails <a id="getaccountdetails"></a>

▸ **getAccountDetails**\(\): `Promise`&lt;`any`&gt;

_Defined in_ [_account.ts:182_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/account.ts#L182)

**Returns:** `Promise`&lt;`any`&gt;

### `<Private>` printLogs <a id="printlogs"></a>

▸ **printLogs**\(contractId: _`string`_, logs: _`string`\[\]_\): `void`

_Defined in_ [_account.ts:65_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/account.ts#L65)

**Parameters:**

| Name | Type |
| :--- | :--- |
| contractId | `string` |
| logs | `string`\[\] |

**Returns:** `void`

### `<Private>` retryTxResult <a id="retrytxresult"></a>

▸ **retryTxResult**\(txHash: _`Uint8Array`_\): `Promise`&lt;[FinalTransactionResult](../_providers_provider_/_providers_provider_.finaltransactionresult.md)&gt;

_Defined in_ [_account.ts:71_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/account.ts#L71)

**Parameters:**

| Name | Type |
| :--- | :--- |
| txHash | `Uint8Array` |

**Returns:** `Promise`&lt;[FinalTransactionResult](../_providers_provider_/_providers_provider_.finaltransactionresult.md)&gt;

### sendMoney <a id="sendmoney"></a>

▸ **sendMoney**\(receiver: _`string`_, amount: _`BN`_\): `Promise`&lt;[FinalTransactionResult](../_providers_provider_/_providers_provider_.finaltransactionresult.md)&gt;

_Defined in_ [_account.ts:128_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/account.ts#L128)

**Parameters:**

| Name | Type |
| :--- | :--- |
| receiver | `string` |
| amount | `BN` |

**Returns:** `Promise`&lt;[FinalTransactionResult](../_providers_provider_/_providers_provider_.finaltransactionresult.md)&gt;

### `<Private>` signAndSendTransaction <a id="signandsendtransaction"></a>

▸ **signAndSendTransaction**\(transaction: _`any`_\): `Promise`&lt;[FinalTransactionResult](../_providers_provider_/_providers_provider_.finaltransactionresult.md)&gt;

_Defined in_ [_account.ts:86_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/account.ts#L86)

**Parameters:**

| Name | Type |
| :--- | :--- |
| transaction | `any` |

**Returns:** `Promise`&lt;[FinalTransactionResult](../_providers_provider_/_providers_provider_.finaltransactionresult.md)&gt;

### stake <a id="stake"></a>

▸ **stake**\(publicKey: _`string`_, amount: _`BN`_\): `Promise`&lt;[FinalTransactionResult](../_providers_provider_/_providers_provider_.finaltransactionresult.md)&gt;

_Defined in_ [_account.ts:168_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/account.ts#L168)

**Parameters:**

| Name | Type |
| :--- | :--- |
| publicKey | `string` |
| amount | `BN` |

**Returns:** `Promise`&lt;[FinalTransactionResult](../_providers_provider_/_providers_provider_.finaltransactionresult.md)&gt;

### state <a id="state"></a>

▸ **state**\(\): `Promise`&lt;[AccountState](_account_.accountstate.md)&gt;

_Defined in_ [_account.ts:60_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/account.ts#L60)

**Returns:** `Promise`&lt;[AccountState](_account_.accountstate.md)&gt;

### viewFunction <a id="viewfunction"></a>

▸ **viewFunction**\(contractId: _`string`_, methodName: _`string`_, args: _`any`_\): `Promise`&lt;`any`&gt;

_Defined in_ [_account.ts:174_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/account.ts#L174)

**Parameters:**

| Name | Type |
| :--- | :--- |
| contractId | `string` |
| methodName | `string` |
| args | `any` |

**Returns:** `Promise`&lt;`any`&gt;

