# Vector

A vector class that implements a persistent array.

## Type parameters

#### T

## Hierarchy

**PersistentVector**

## Index

### Constructors

* constructor

### Accessors

* back
* first
* front
* isEmpty
* last
* length

### Methods

* containsIndex
* pop
* popBack
* push
* pushBack

## Constructors

### constructor

⊕ **new PersistentVector**\(prefix: _`string`_\): PersistentVector

_Defined in_ [_collections/persistentVector.ts:10_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentVector.ts#L10)

Creates or restores a persistent vector with a given storage prefix. Always use a unique storage prefix for different collections.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| prefix | `string` | A prefix to use for every key of this vector. |

**Returns:** PersistentVector

## Accessors

### back

**get back**\(\): `T`

_Defined in_ [_collections/persistentVector.ts:158_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentVector.ts#L158)

**Returns:** `T` The last element of the vector. Asserts that the vector is not empty.

### first

**get first**\(\): `T`

_Defined in_ [_collections/persistentVector.ts:181_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentVector.ts#L181)

**Returns:** `T` The first element of the vector. Asserts that the vector is not empty.

### front

**get front**\(\): `T`

_Defined in_ [_collections/persistentVector.ts:173_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentVector.ts#L173)

**Returns:** `T` The first element of the vector. Asserts that the vector is not empty.

### isEmpty

**get isEmpty**\(\): `bool`

_Defined in_ [_collections/persistentVector.ts:42_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentVector.ts#L42)

**Returns:** `bool` True if the vector is empty.

### last

**get last**\(\): `T`

_Defined in_ [_collections/persistentVector.ts:166_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentVector.ts#L166)

**Returns:** `T` The last element of the vector. Asserts that the vector is not empty.

### length

**get length**\(\): `i32`

_Defined in_ [_collections/persistentVector.ts:49_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentVector.ts#L49)

**Returns:** `i32` The length of the vector.

## Methods

### containsIndex

▸ **containsIndex**\(index: _`i32`_\): `bool`

_Defined in_ [_collections/persistentVector.ts:35_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentVector.ts#L35)

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| index | `i32` | The index to check. |

**Returns:** `bool` True if the given index is within the range of the vector indices.

### pop

▸ **pop**\(\): `T`

_Defined in_ [_collections/persistentVector.ts:136_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentVector.ts#L136)

Removes the last element from the vector and returns it. Asserts that the vector is not empty. Decreases the length of the vector.

**Returns:** `T` The removed last element of the vector.

### popBack

▸ **popBack**\(\): `T`

_Defined in_ [_collections/persistentVector.ts:151_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentVector.ts#L151)

Removes the last element from the vector and returns it. Asserts that the vector is not empty. Decreases the length of the vector.

**Returns:** `T` The removed last element of the vector.

### push

▸ **push**\(element: _`T`_\): `i32`

_Defined in_ [_collections/persistentVector.ts:114_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentVector.ts#L114)

Adds a new element to the end of the vector. Increases the length of the vector.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| element | `T` | A new element to add. |

**Returns:** `i32` The index of a newly added element

### pushBack

▸ **pushBack**\(element: _`T`_\): `i32`

_Defined in_ [_collections/persistentVector.ts:127_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentVector.ts#L127)

Adds a new element to the end of the vector. Increases the length of the vector.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| element | `T` | A new element to add. |

**Returns:** `i32` The index of a newly added element

