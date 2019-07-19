# Vector

A vector class that implements a persistent array.

## Type parameters

#### T

## Hierarchy

**Vector**

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
* delete
* pop
* popBack
* push
* pushBack

## Constructors

### constructor

⊕ **new Vector**\(prefix: _`string`_\): [Vector](https://github.com/nearprotocol/docs/tree/4ea8b871a7a21b7579cbb350f27b4754826d42f8/docs/api-documentation/runtime-ts/classes/collections/_near_.collections.vector.md)

_Defined in_ [_near.ts:266_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L266)

Creates or restores a persistent vector with a given storage prefix. Always use a unique storage prefix for different collections.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| prefix | `string` | A prefix to use for every key of this vector. |

**Returns:** [Vector](https://github.com/nearprotocol/docs/tree/4ea8b871a7a21b7579cbb350f27b4754826d42f8/docs/api-documentation/runtime-ts/classes/collections/_near_.collections.vector.md)

## Accessors

### back

getback\(\): `T`

_Defined in_ [_near.ts:422_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L422)

**Returns:** `T` The last element of the vector. Asserts that the vector is not empty.

### first

getfirst\(\): `T`

_Defined in_ [_near.ts:445_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L445)

**Returns:** `T` The first element of the vector. Asserts that the vector is not empty.

### front

getfront\(\): `T`

_Defined in_ [_near.ts:437_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L437)

**Returns:** `T` The first element of the vector. Asserts that the vector is not empty.

### isEmpty

getisEmpty\(\): `bool`

_Defined in_ [_near.ts:307_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L307)

**Returns:** `bool` True if the vector is empty.

### last

getlast\(\): `T`

_Defined in_ [_near.ts:430_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L430)

**Returns:** `T` The last element of the vector. Asserts that the vector is not empty.

### length

getlength\(\): `i32`

_Defined in_ [_near.ts:314_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L314)

**Returns:** `i32` The length of the vector.

## Methods

### containsIndex

▸ **containsIndex**\(index: _`i32`_\): `bool`

_Defined in_ [_near.ts:300_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L300)

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| index | `i32` | The index to check. |

**Returns:** `bool` True if the given index is within the range of the vector indices.

### delete

▸ **delete**\(index: _`i32`_\): `void`

_Defined in_ [_near.ts:291_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L291)

Removes the content of the element from storage without changing length of the vector.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| index | `i32` | The index of the element to remove. |

**Returns:** `void`

### pop

▸ **pop**\(\): `T`

_Defined in_ [_near.ts:400_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L400)

Removes the last element from the vector and returns it. Asserts that the vector is not empty. Decreases the length of the vector.

**Returns:** `T` The removed last element of the vector.

### popBack

▸ **popBack**\(\): `T`

_Defined in_ [_near.ts:415_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L415)

Removes the last element from the vector and returns it. Asserts that the vector is not empty. Decreases the length of the vector.

**Returns:** `T` The removed last element of the vector.

### push

▸ **push**\(element: _`T`_\): `i32`

_Defined in_ [_near.ts:378_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L378)

Adds a new element to the end of the vector. Increases the length of the vector.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| element | `T` | A new element to add. |

**Returns:** `i32` The index of a newly added element

### pushBack

▸ **pushBack**\(element: _`T`_\): `i32`

_Defined in_ [_near.ts:391_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L391)

Adds a new element to the end of the vector. Increases the length of the vector.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| element | `T` | A new element to add. |

**Returns:** `i32` The index of a newly added element

