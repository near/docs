# Deque

A deque class that implements a persistent bidirectional queue.

## Type parameters

#### T

## Hierarchy

**Deque**

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
* popBack
* popFront
* pushBack
* pushFront

## Constructors

### constructor

⊕ **new Deque**\(prefix: _`string`_\): [Deque](https://github.com/nearprotocol/docs/tree/59dd4aad80e70dc96fa9fbff5f98c18d604a0fc3/docs/api-documentation/runtime-ts/classes/collections/_near_.collections.deque.md)

_Defined in_ [_near.ts:459_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L459)

Creates or restores a persistent deque with a given storage prefix. Always use a unique storage prefix for different collections.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| prefix | `string` | A prefix to use for every key of this deque. |

**Returns:** [Deque](https://github.com/nearprotocol/docs/tree/59dd4aad80e70dc96fa9fbff5f98c18d604a0fc3/docs/api-documentation/runtime-ts/classes/collections/_near_.collections.deque.md)

## Accessors

### back

getback\(\): `T`

_Defined in_ [_near.ts:661_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L661)

**Returns:** `T` The last/back element of the deque.

### first

getfirst\(\): `T`

_Defined in_ [_near.ts:628_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L628)

**Returns:** `T` The first/front element of the deque.

### front

getfront\(\): `T`

_Defined in_ [_near.ts:620_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L620)

**Returns:** `T` The first/front element of the deque.

### isEmpty

getisEmpty\(\): `bool`

_Defined in_ [_near.ts:545_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L545)

**Returns:** `bool` True if the deque is empty.

### last

getlast\(\): `T`

_Defined in_ [_near.ts:669_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L669)

**Returns:** `T` The last/back element of the deque.

### length

getlength\(\): `i32`

_Defined in_ [_near.ts:538_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L538)

**Returns:** `i32` The length of the deque.

## Methods

### containsIndex

▸ **containsIndex**\(index: _`i32`_\): `bool`

_Defined in_ [_near.ts:522_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L522)

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| index | `i32` | The index to check. |

**Returns:** `bool` True if the given index is within the range of the deque indices.

### delete

▸ **delete**\(index: _`i32`_\): `void`

_Defined in_ [_near.ts:530_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L530)

Removes the content of the element from storage without changing length of the deque.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| index | `i32` | The index of the element to remove. |

**Returns:** `void`

### popBack

▸ **popBack**\(\): `T`

_Defined in_ [_near.ts:649_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L649)

Removes the last/back element from the deque and returns it. Asserts that the deque is not empty. Decreases the length of the deque.

**Returns:** `T` The removed first element of the queue.

### popFront

▸ **popFront**\(\): `T`

_Defined in_ [_near.ts:609_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L609)

Removes the first/front element from the deque and returns it. Asserts that the deque is not empty. Decreases the length of the deque.

**Returns:** `T` The removed first element of the queue.

### pushBack

▸ **pushBack**\(element: _`T`_\): `i32`

_Defined in_ [_near.ts:637_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L637)

Adds a new element to the end of the deque. Increases the length of the deque.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| element | `T` | A new element to add. |

**Returns:** `i32` The index of a newly added element

### pushFront

▸ **pushFront**\(element: _`T`_\): `i32`

_Defined in_ [_near.ts:598_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L598)

Adds a new element in front of the deque. Increases the length of the deque.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| element | `T` | A new element to add. |

**Returns:** `i32` The index of a newly added element

