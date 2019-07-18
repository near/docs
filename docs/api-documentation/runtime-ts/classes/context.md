# Context

Provides context for contract execution, including information about transaction sender, etc.

## Hierarchy

**Context**

## Index

### Accessors

* blockIndex
* contractName
* frozenBalance
* liquidBalance
* receivedAmount
* sender
* storageUsage

### Methods

* deposit
* withdraw

## Accessors

### blockIndex

getblockIndex\(\): `u64`

_Defined in_ [_near.ts:1013_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1013)

Current block index.

**Returns:** `u64`

### contractName

getcontractName\(\): `string`

_Defined in_ [_near.ts:1006_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1006)

Account ID of contract.

**Returns:** `string`

### frozenBalance

getfrozenBalance\(\): `u128`

_Defined in_ [_near.ts:1029_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1029)

The amount of tokens that are locked in the account. Storage usage fee is deducted from this balance.

**Returns:** `u128`

### liquidBalance

getliquidBalance\(\): `u128`

_Defined in_ [_near.ts:1039_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1039)

The amount of tokens that can be used for running wasm, creating transactions, and sending to other contracts through cross-contract calls.

**Returns:** `u128`

### receivedAmount

getreceivedAmount\(\): `u128`

_Defined in_ [_near.ts:1020_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1020)

The amount of tokens received with this execution call.

**Returns:** `u128`

### sender

getsender\(\): `string`

_Defined in_ [_near.ts:999_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L999)

Account ID of transaction sender.

**Returns:** `string`

### storageUsage

getstorageUsage\(\): `u64`

_Defined in_ [_near.ts:1048_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1048)

The current storage usage in bytes.

**Returns:** `u64`

## Methods

### deposit

▸ **deposit**\(minAmount: _`u128`_, maxAmount: _`u128`_\): `u128`

_Defined in_ [_near.ts:1057_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1057)

Moves assets from liquid balance to frozen balance. If there is enough liquid balance will deposit the maximum amount. Otherwise will deposit as much as possible. Will fail if there is less than minimum amount on the liquid balance. Returns the deposited amount.

**Parameters:**

| Name | Type |
| :--- | :--- |
| minAmount | `u128` |
| maxAmount | `u128` |

**Returns:** `u128`

### withdraw

▸ **withdraw**\(minAmount: _`u128`_, maxAmount: _`u128`_\): `u128`

_Defined in_ [_near.ts:1070_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1070)

Moves assets from frozen balance to liquid balance. If there is enough frozen balance will withdraw the maximum amount. Otherwise will withdraw as much as possible. Will fail if there is less than minimum amount on the frozen balance. Returns the withdrawn amount.

**Parameters:**

| Name | Type |
| :--- | :--- |
| minAmount | `u128` |
| maxAmount | `u128` |

**Returns:** `u128`

