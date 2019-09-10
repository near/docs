# "transaction"

## Type aliases

### AllTransactions <a id="alltransactions"></a>

**Ƭ AllTransactions**: _`SendMoneyTransaction` \| `CreateAccountTransaction` \| `DeployContractTransaction` \| `FunctionCallTransaction` \| `StakeTransaction` \| `SwapKeyTransaction` \| `AddKeyTransaction` \| `DeleteKeyTransaction`_

_Defined in_ [_transaction.ts:26_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/transaction.ts#L26)

## Variables

### `<Const>` TRANSACTION\_FIELD\_MAP <a id="transaction_field_map"></a>

**● TRANSACTION\_FIELD\_MAP**: _`Map`&lt;`Function`, `string`&gt;_ = new Map\(\[ \[CreateAccountTransaction, 'createAccount'\], \[DeployContractTransaction, 'deployContract'\], \[FunctionCallTransaction, 'functionCall'\], \[SendMoneyTransaction, 'sendMoney'\], \[StakeTransaction, 'stake'\], \[SwapKeyTransaction, 'swapKey'\], \[AddKeyTransaction, 'addKey'\], \[DeleteKeyTransaction, 'deleteKey'\], \]\)

_Defined in_ [_transaction.ts:15_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/transaction.ts#L15)

## Functions

### addKey <a id="addkey"></a>

▸ **addKey**\(nonce: _`number`_, originator: _`string`_, newKey: _`string`_, accessKey: _`AccessKey`_\): `AddKeyTransaction`

_Defined in_ [_transaction.ts:70_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/transaction.ts#L70)

**Parameters:**

| Name | Type |
| :--- | :--- |
| nonce | `number` |
| originator | `string` |
| newKey | `string` |
| accessKey | `AccessKey` |

**Returns:** `AddKeyTransaction`

### bigInt <a id="bigint"></a>

▸ **bigInt**\(num: _`BN`_\): `Uint128`

_Defined in_ [_transaction.ts:28_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/transaction.ts#L28)

**Parameters:**

| Name | Type |
| :--- | :--- |
| num | `BN` |

**Returns:** `Uint128`

### bignumHex2Dec <a id="bignumhex2dec"></a>

▸ **bignumHex2Dec**\(num: _`string`_\): `string`

_Defined in_ [_transaction.ts:33_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/transaction.ts#L33)

**Parameters:**

| Name | Type |
| :--- | :--- |
| num | `string` |

**Returns:** `string`

### createAccessKey <a id="createaccesskey"></a>

▸ **createAccessKey**\(contractId?: _`string`_, methodName?: _`string`_, balanceOwner?: _`string`_, amount?: _`BN`_\): `AccessKey`

_Defined in_ [_transaction.ts:61_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/transaction.ts#L61)

**Parameters:**

| Name | Type |
| :--- | :--- |
| `Optional` contractId | `string` |
| `Optional` methodName | `string` |
| `Optional` balanceOwner | `string` |
| `Optional` amount | `BN` |

**Returns:** `AccessKey`

### createAccount <a id="createaccount"></a>

▸ **createAccount**\(nonce: _`number`_, originator: _`string`_, newAccountId: _`string`_, publicKey: _`string`_, amount: _`BN`_\): `CreateAccountTransaction`

_Defined in_ [_transaction.ts:37_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/transaction.ts#L37)

**Parameters:**

| Name | Type |
| :--- | :--- |
| nonce | `number` |
| originator | `string` |
| newAccountId | `string` |
| publicKey | `string` |
| amount | `BN` |

**Returns:** `CreateAccountTransaction`

### deleteKey <a id="deletekey"></a>

▸ **deleteKey**\(nonce: _`number`_, originator: _`string`_, curKey: _`string`_\): `DeleteKeyTransaction`

_Defined in_ [_transaction.ts:74_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/transaction.ts#L74)

**Parameters:**

| Name | Type |
| :--- | :--- |
| nonce | `number` |
| originator | `string` |
| curKey | `string` |

**Returns:** `DeleteKeyTransaction`

### deployContract <a id="deploycontract"></a>

▸ **deployContract**\(nonce: _`number`_, contractId: _`string`_, wasmByteArray: _`Uint8Array`_\): `DeployContractTransaction`

_Defined in_ [_transaction.ts:41_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/transaction.ts#L41)

**Parameters:**

| Name | Type |
| :--- | :--- |
| nonce | `number` |
| contractId | `string` |
| wasmByteArray | `Uint8Array` |

**Returns:** `DeployContractTransaction`

### functionCall <a id="functioncall"></a>

▸ **functionCall**\(nonce: _`number`_, originator: _`string`_, contractId: _`string`_, methodName: _`string`_, args: _`Uint8Array`_, amount: _`BN`_\): `FunctionCallTransaction`

_Defined in_ [_transaction.ts:45_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/transaction.ts#L45)

**Parameters:**

| Name | Type |
| :--- | :--- |
| nonce | `number` |
| originator | `string` |
| contractId | `string` |
| methodName | `string` |
| args | `Uint8Array` |
| amount | `BN` |

**Returns:** `FunctionCallTransaction`

### sendMoney <a id="sendmoney"></a>

▸ **sendMoney**\(nonce: _`number`_, originator: _`string`_, receiver: _`string`_, amount: _`BN`_\): `SendMoneyTransaction`

_Defined in_ [_transaction.ts:49_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/transaction.ts#L49)

**Parameters:**

| Name | Type |
| :--- | :--- |
| nonce | `number` |
| originator | `string` |
| receiver | `string` |
| amount | `BN` |

**Returns:** `SendMoneyTransaction`

### signTransaction <a id="signtransaction"></a>

▸ **signTransaction**\(signer: [_Signer_](_signer_/_signer_.signer.md), transaction: _`any`_, accountId?: _`string`_, networkId?: _`string`_\): `Promise`&lt;\[`Uint8Array`, `SignedTransaction`\]&gt;

_Defined in_ [_transaction.ts:87_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/transaction.ts#L87)

**Parameters:**

| Name | Type |
| :--- | :--- |
| signer | [Signer](_signer_/_signer_.signer.md) |
| transaction | `any` |
| `Optional` accountId | `string` |
| `Optional` networkId | `string` |

**Returns:** `Promise`&lt;\[`Uint8Array`, `SignedTransaction`\]&gt;

### signedTransaction <a id="signedtransaction"></a>

▸ **signedTransaction**\(transaction: [_AllTransactions_](_transaction_.md#alltransactions), signature: [_Signature_](_utils_key_pair_/_utils_key_pair_.signature.md)\): `SignedTransaction`

_Defined in_ [_transaction.ts:78_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/transaction.ts#L78)

**Parameters:**

| Name | Type |
| :--- | :--- |
| transaction | [AllTransactions](_transaction_.md#alltransactions) |
| signature | [Signature](_utils_key_pair_/_utils_key_pair_.signature.md) |

**Returns:** `SignedTransaction`

### stake <a id="stake"></a>

▸ **stake**\(nonce: _`number`_, originator: _`string`_, amount: _`BN`_, publicKey: _`string`_\): `StakeTransaction`

_Defined in_ [_transaction.ts:53_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/transaction.ts#L53)

**Parameters:**

| Name | Type |
| :--- | :--- |
| nonce | `number` |
| originator | `string` |
| amount | `BN` |
| publicKey | `string` |

**Returns:** `StakeTransaction`

### swapKey <a id="swapkey"></a>

▸ **swapKey**\(nonce: _`number`_, originator: _`string`_, curKey: _`string`_, newKey: _`string`_\): `SwapKeyTransaction`

_Defined in_ [_transaction.ts:57_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/transaction.ts#L57)

**Parameters:**

| Name | Type |
| :--- | :--- |
| nonce | `number` |
| originator | `string` |
| curKey | `string` |
| newKey | `string` |

**Returns:** `SwapKeyTransaction`

