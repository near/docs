# Deque

A deque class that implements a persistent bidirectional queue.

## Type parameters

#### T

## Hierarchy

**PersistentDeque**

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
* popBack
* popFront
* pushBack
* pushFront

## Constructors

### constructor

⊕ **new PersistentDeque**\(prefix: _`string`_\): PersistentDeque

_Defined in_ [_collections/persistentDeque.ts:12_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentDeque.ts#L12)

Creates or restores a persistent deque with a given storage prefix. Always use a unique storage prefix for different collections.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| prefix | `string` | A prefix to use for every key of this deque. |

**Returns:** PersistentDeque

## Accessors

### back

**get back**\(\): `T`

_Defined in_ [_collections/persistentDeque.ts:205_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentDeque.ts#L205)

**Returns:** `T` The last/back element of the deque.

### first

**get first**\(\): `T`

_Defined in_ [_collections/persistentDeque.ts:172_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentDeque.ts#L172)

**Returns:** `T` The first/front element of the deque.

### front

**get front**\(\): `T`

_Defined in_ [_collections/persistentDeque.ts:164_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentDeque.ts#L164)

**Returns:** `T` The first/front element of the deque.

### isEmpty

**get isEmpty**\(\): `bool`

_Defined in_ [_collections/persistentDeque.ts:89_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentDeque.ts#L89)

**Returns:** `bool` True if the deque is empty.

### last

**get last**\(\): `T`

_Defined in_ [_collections/persistentDeque.ts:213_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentDeque.ts#L213)

**Returns:** `T` The last/back element of the deque.

### length

**get length**\(\): `i32`

_Defined in_ [_collections/persistentDeque.ts:82_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentDeque.ts#L82)

**Returns:** `i32` The length of the deque.

## Methods

### containsIndex

▸ **containsIndex**\(index: _`i32`_\): `bool`

_Defined in_ [_collections/persistentDeque.ts:75_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentDeque.ts#L75)

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| index | `i32` | The index to check. |

**Returns:** `bool` True if the given index is within the range of the deque indices.

### popBack

▸ **popBack**\(\): `T`

_Defined in_ [_collections/persistentDeque.ts:193_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentDeque.ts#L193)

Removes the last/back element from the deque and returns it. Asserts that the deque is not empty. Decreases the length of the deque.

**Returns:** `T` The removed first element of the queue.

### popFront

▸ **popFront**\(\): `T`

_Defined in_ [_collections/persistentDeque.ts:153_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentDeque.ts#L153)

Removes the first/front element from the deque and returns it. Asserts that the deque is not empty. Decreases the length of the deque.

**Returns:** `T` The removed first element of the queue.

### pushBack

▸ **pushBack**\(element: _`T`_\): `i32`

_Defined in_ [_collections/persistentDeque.ts:181_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentDeque.ts#L181)

Adds a new element to the end of the deque. Increases the length of the deque.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| element | `T` | A new element to add. |

**Returns:** `i32` The index of a newly added element

### pushFront

▸ **pushFront**\(element: _`T`_\): `i32`

_Defined in_ [_collections/persistentDeque.ts:142_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentDeque.ts#L142)

Adds a new element in front of the deque. Increases the length of the deque.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| element | `T` | A new element to add. |

**Returns:** `i32` The index of a newly added element

