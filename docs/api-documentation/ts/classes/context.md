# Context

[near-runtime-ts](../) &gt; "near" &gt; [Context](context.md)

## Class: Context

Provides context for contract execution, including information about transaction sender, etc.

### Hierarchy

**Context**

### Index

#### Accessors

* blockIndex
* contractName
* currentBalance
* gasLeft
* manaLeft
* receivedAmount
* sender

### Accessors

#### blockIndex     <a id="blockindex"></a>

getblockIndex\(\): `u64`

_Defined in_ [_near.ts:756_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L756)

Current block index.

**Returns:** `u64`

#### contractName     <a id="contractname"></a>

getcontractName\(\): `string`

_Defined in_ [_near.ts:749_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L749)

Account ID of contract.

**Returns:** `string`

#### currentBalance     <a id="currentbalance"></a>

getcurrentBalance\(\): `u64`

_Defined in_ [_near.ts:763_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L763)

Current balance of the contract.

**Returns:** `u64`

#### gasLeft     <a id="gasleft"></a>

getgasLeft\(\): `u64`

_Defined in_ [_near.ts:777_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L777)

The amount of available gas left for this execution call.

**Returns:** `u64`

#### manaLeft     <a id="manaleft"></a>

getmanaLeft\(\): `u32`

_Defined in_ [_near.ts:784_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L784)

The amount of available mana left for this execution call.

**Returns:** `u32`

#### receivedAmount     <a id="receivedamount"></a>

getreceivedAmount\(\): `u64`

_Defined in_ [_near.ts:770_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L770)

The amount of tokens received with this execution call.

**Returns:** `u64`

#### sender     <a id="sender"></a>

getsender\(\): `string`

_Defined in_ [_near.ts:742_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L742)

Account ID of transaction sender.

**Returns:** `string`

