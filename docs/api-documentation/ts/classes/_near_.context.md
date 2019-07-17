[near-runtime-ts](../README.md) > ["near"](../modules/_near_.md) > [Context](../classes/_near_.context.md)

# Class: Context

Provides context for contract execution, including information about transaction sender, etc.

## Hierarchy

**Context**

## Index

### Accessors

* [blockIndex](_near_.context.md#blockindex)
* [contractName](_near_.context.md#contractname)
* [frozenBalance](_near_.context.md#frozenbalance)
* [liquidBalance](_near_.context.md#liquidbalance)
* [receivedAmount](_near_.context.md#receivedamount)
* [sender](_near_.context.md#sender)
* [storageUsage](_near_.context.md#storageusage)

### Methods

* [deposit](_near_.context.md#deposit)
* [withdraw](_near_.context.md#withdraw)

---

## Accessors

<a id="blockindex"></a>

###  blockIndex

getblockIndex(): `u64`

*Defined in [near.ts:1013](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1013)*

Current block index.

**Returns:** `u64`

___
<a id="contractname"></a>

###  contractName

getcontractName(): `string`

*Defined in [near.ts:1006](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1006)*

Account ID of contract.

**Returns:** `string`

___
<a id="frozenbalance"></a>

###  frozenBalance

getfrozenBalance(): `u128`

*Defined in [near.ts:1029](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1029)*

The amount of tokens that are locked in the account. Storage usage fee is deducted from this balance.

**Returns:** `u128`

___
<a id="liquidbalance"></a>

###  liquidBalance

getliquidBalance(): `u128`

*Defined in [near.ts:1039](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1039)*

The amount of tokens that can be used for running wasm, creating transactions, and sending to other contracts through cross-contract calls.

**Returns:** `u128`

___
<a id="receivedamount"></a>

###  receivedAmount

getreceivedAmount(): `u128`

*Defined in [near.ts:1020](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1020)*

The amount of tokens received with this execution call.

**Returns:** `u128`

___
<a id="sender"></a>

###  sender

getsender(): `string`

*Defined in [near.ts:999](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L999)*

Account ID of transaction sender.

**Returns:** `string`

___
<a id="storageusage"></a>

###  storageUsage

getstorageUsage(): `u64`

*Defined in [near.ts:1048](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1048)*

The current storage usage in bytes.

**Returns:** `u64`

___

## Methods

<a id="deposit"></a>

###  deposit

▸ **deposit**(minAmount: *`u128`*, maxAmount: *`u128`*): `u128`

*Defined in [near.ts:1057](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1057)*

Moves assets from liquid balance to frozen balance. If there is enough liquid balance will deposit the maximum amount. Otherwise will deposit as much as possible. Will fail if there is less than minimum amount on the liquid balance. Returns the deposited amount.

**Parameters:**

| Name | Type |
| ------ | ------ |
| minAmount | `u128` |
| maxAmount | `u128` |

**Returns:** `u128`

___
<a id="withdraw"></a>

###  withdraw

▸ **withdraw**(minAmount: *`u128`*, maxAmount: *`u128`*): `u128`

*Defined in [near.ts:1070](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1070)*

Moves assets from frozen balance to liquid balance. If there is enough frozen balance will withdraw the maximum amount. Otherwise will withdraw as much as possible. Will fail if there is less than minimum amount on the frozen balance. Returns the withdrawn amount.

**Parameters:**

| Name | Type |
| ------ | ------ |
| minAmount | `u128` |
| maxAmount | `u128` |

**Returns:** `u128`

___

