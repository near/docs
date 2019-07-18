# Class: Deque

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

---

## Constructors

###  constructor

⊕ **new Deque**(prefix: *`string`*): [Deque](_near_.collections.deque.md)

*Defined in [near.ts:459](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L459)*

Creates or restores a persistent deque with a given storage prefix. Always use a unique storage prefix for different collections.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| prefix | `string` |  A prefix to use for every key of this deque. |

**Returns:** [Deque](_near_.collections.deque.md)

---_

## Accessors

###  back

getback(): `T`

*Defined in [near.ts:661](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L661)*

**Returns:** `T`
The last/back element of the deque.

---

###  first

getfirst(): `T`

*Defined in [near.ts:628](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L628)*

**Returns:** `T`
The first/front element of the deque.

---

###  front

getfront(): `T`

*Defined in [near.ts:620](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L620)*

**Returns:** `T`
The first/front element of the deque.

---

###  isEmpty

getisEmpty(): `bool`

*Defined in [near.ts:545](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L545)*

**Returns:** `bool`
True if the deque is empty.

---

###  last

getlast(): `T`

*Defined in [near.ts:669](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L669)*

**Returns:** `T`
The last/back element of the deque.

---

###  length

getlength(): `i32`

*Defined in [near.ts:538](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L538)*

**Returns:** `i32`
The length of the deque.

---_

## Methods

###  containsIndex

▸ **containsIndex**(index: *`i32`*): `bool`

*Defined in [near.ts:522](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L522)*

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| index | `i32` |  The index to check. |

**Returns:** `bool`
True if the given index is within the range of the deque indices.

---

###  delete

▸ **delete**(index: *`i32`*): `void`

*Defined in [near.ts:530](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L530)*

Removes the content of the element from storage without changing length of the deque.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| index | `i32` |  The index of the element to remove. |

**Returns:** `void`

---

###  popBack

▸ **popBack**(): `T`

*Defined in [near.ts:649](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L649)*

Removes the last/back element from the deque and returns it. Asserts that the deque is not empty. Decreases the length of the deque.

**Returns:** `T`
The removed first element of the queue.

---

###  popFront

▸ **popFront**(): `T`

*Defined in [near.ts:609](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L609)*

Removes the first/front element from the deque and returns it. Asserts that the deque is not empty. Decreases the length of the deque.

**Returns:** `T`
The removed first element of the queue.

---

###  pushBack

▸ **pushBack**(element: *`T`*): `i32`

*Defined in [near.ts:637](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L637)*

Adds a new element to the end of the deque. Increases the length of the deque.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| element | `T` |  A new element to add. |

**Returns:** `i32`
The index of a newly added element

---

###  pushFront

▸ **pushFront**(element: *`T`*): `i32`

*Defined in [near.ts:598](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L598)*

Adds a new element in front of the deque. Increases the length of the deque.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| element | `T` |  A new element to add. |

**Returns:** `i32`
The index of a newly added element

---_

