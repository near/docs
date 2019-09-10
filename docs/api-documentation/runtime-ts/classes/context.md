# Context

Provides context for contract execution, including information about transaction sender, etc.

## Hierarchy

**Context**

## Index

### Accessors

* accountBalance
* attachedDeposit
* blockIndex
* contractName
* prepaidGas
* receivedAmount
* sender
* storageUsage
* usedGas

## Accessors

### accountBalance

**get accountBalance**\(\): `u128`

_Defined in_ [_contract.ts:54_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/contract.ts#L54)

The amount of tokens received with this execution call.

_**deprecated**_: use attachedDeposit.

**Returns:** `u128`

### attachedDeposit

**get attachedDeposit**\(\): `u128`

_Defined in_ [_contract.ts:44_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/contract.ts#L44)

The amount of tokens received with this execution call.

_**deprecated**_: use attachedDeposit.

**Returns:** `u128`

### blockIndex

**get blockIndex**\(\): `u64`

_Defined in_ [_contract.ts:28_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/contract.ts#L28)

Current block index.

**Returns:** `u64`

### contractName

**get contractName**\(\): `string`

_Defined in_ [_contract.ts:20_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/contract.ts#L20)

Account ID of contract.

**Returns:** `string`

### prepaidGas

**get prepaidGas**\(\): `u64`

_Defined in_ [_contract.ts:63_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/contract.ts#L63)

Get the amount of prepaid gas attached to the call \(in units of gas\).

**Returns:** `u64`

### receivedAmount

**get receivedAmount**\(\): `u128`

_Defined in_ [_contract.ts:36_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/contract.ts#L36)

The amount of tokens received with this execution call.

_**deprecated**_: use attachedDeposit.

**Returns:** `u128`

### sender

**get sender**\(\): `string`

_Defined in_ [_contract.ts:12_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/contract.ts#L12)

Account ID of transaction sender.

**Returns:** `string`

### storageUsage

**get storageUsage**\(\): `u64`

_Defined in_ [_contract.ts:77_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/contract.ts#L77)

The current storage usage in bytes.

**Returns:** `u64`

### usedGas

**get usedGas**\(\): `u64`

_Defined in_ [_contract.ts:70_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/contract.ts#L70)

Get the amount of gas \(in units of gas\) that was already burnt during the contract execution and attached to promises \(cannot exceed prepaid gas\).

**Returns:** `u64`

