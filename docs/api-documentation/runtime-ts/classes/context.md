# Class: Context

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

---

## Accessors


###  accountBalance

**get accountBalance**(): `u128`

*Defined in [contract.ts:54](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/contract.ts#L54)*

The amount of tokens received with this execution call.

*__deprecated__*: use attachedDeposit.

**Returns:** `u128`

___

###  attachedDeposit

**get attachedDeposit**(): `u128`

*Defined in [contract.ts:44](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/contract.ts#L44)*

The amount of tokens received with this execution call.

*__deprecated__*: use attachedDeposit.

**Returns:** `u128`

___

###  blockIndex

**get blockIndex**(): `u64`

*Defined in [contract.ts:28](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/contract.ts#L28)*

Current block index.

**Returns:** `u64`

___

###  contractName

**get contractName**(): `string`

*Defined in [contract.ts:20](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/contract.ts#L20)*

Account ID of contract.

**Returns:** `string`

___

###  prepaidGas

**get prepaidGas**(): `u64`

*Defined in [contract.ts:63](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/contract.ts#L63)*

Get the amount of prepaid gas attached to the call (in units of gas).

**Returns:** `u64`

___

###  receivedAmount

**get receivedAmount**(): `u128`

*Defined in [contract.ts:36](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/contract.ts#L36)*

The amount of tokens received with this execution call.

*__deprecated__*: use attachedDeposit.

**Returns:** `u128`

___

###  sender

**get sender**(): `string`

*Defined in [contract.ts:12](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/contract.ts#L12)*

Account ID of transaction sender.

**Returns:** `string`

___

###  storageUsage

**get storageUsage**(): `u64`

*Defined in [contract.ts:77](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/contract.ts#L77)*

The current storage usage in bytes.

**Returns:** `u64`

___

###  usedGas

**get usedGas**(): `u64`

*Defined in [contract.ts:70](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/contract.ts#L70)*

Get the amount of gas (in units of gas) that was already burnt during the contract execution and attached to promises (cannot exceed prepaid gas).

**Returns:** `u64`

___

