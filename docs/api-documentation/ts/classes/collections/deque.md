# Deque

[near-runtime-ts ](../../)&gt; "near" &gt; [collections](./) &gt; [Deque](deque.md)

## Class: Deque

A deque class that implements a persistent bidirectional queue.

### Type parameters

**T**

### Hierarchy

**Deque**

### Index

#### Constructors

* constructor

#### Accessors

* back
* first
* front
* isEmpty
* last
* length

#### Methods

* containsIndex
* popBack
* popFront
* pushBack
* pushFront
* remove

### Constructors

#### constructor  <a id="constructor"></a>

⊕ **new Deque**\(prefix: `string`\): [Deque](https://github.com/nearprotocol/docs/tree/02f899c11ed02bb3a999e4e86904f6a23c31ca4c/docs/client-api/ts/classes/collections/_near_.collections.deque.md)

_Defined in_ [_near.ts:430_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L430)

Creates or restores a persistent deque with a given storage prefix. Always use a unique storage prefix for different collections.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| prefix | `string` | A prefix to use for every key of this deque. |

**Returns:** [Deque](https://github.com/nearprotocol/docs/tree/02f899c11ed02bb3a999e4e86904f6a23c31ca4c/docs/client-api/ts/classes/collections/_near_.collections.deque.md)

### Accessors

#### back  <a id="back"></a>

getback\(\): `T`

_Defined in_ [_near.ts:632_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L632)

**Returns:** `T` The last/back element of the deque.

#### first  <a id="first"></a>

getfirst\(\): `T`

_Defined in_ [_near.ts:599_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L599)

**Returns:** `T` The first/front element of the deque.

#### front  <a id="front"></a>

getfront\(\): `T`

_Defined in_ [_near.ts:591_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L591)

**Returns:** `T` The first/front element of the deque.

#### isEmpty  <a id="isempty"></a>

getisEmpty\(\): `bool`

_Defined in_ [_near.ts:516_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L516)

**Returns:** `bool` True if the deque is empty.

#### last  <a id="last"></a>

getlast\(\): `T`

_Defined in_ [_near.ts:640_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L640)

**Returns:** `T` The last/back element of the deque.

#### length  <a id="length"></a>

getlength\(\): `i32`

_Defined in_ [_near.ts:509_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L509)

**Returns:** `i32` The length of the deque.

### Methods

#### containsIndex  <a id="containsindex"></a>

▸ **containsIndex**\(index: `i32`\): `bool`

_Defined in_ [_near.ts:493_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L493)

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| index | `i32` | The index to check. |

**Returns:** `bool` True if the given index is within the range of the deque indices.

#### popBack  <a id="popback"></a>

▸ **popBack**\(\): `T`

_Defined in_ [_near.ts:620_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L620)

Removes the last/back element from the deque and returns it. Asserts that the deque is not empty. Decreases the length of the deque.

**Returns:** `T` The removed first element of the queue.

#### popFront  <a id="popfront"></a>

▸ **popFront**\(\): `T`

_Defined in_ [_near.ts:580_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L580)

Removes the first/front element from the deque and returns it. Asserts that the deque is not empty. Decreases the length of the deque.

**Returns:** `T` The removed first element of the queue.

#### pushBack  <a id="pushback"></a>

▸ **pushBack**\(element: `T`\): `i32`

_Defined in_ [_near.ts:608_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L608)

Adds a new element to the end of the deque. Increases the length of the deque.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| element | `T` | A new element to add. |

**Returns:** `i32` The index of a newly added element

#### pushFront  <a id="pushfront"></a>

▸ **pushFront**\(element: `T`\): `i32`

_Defined in_ [_near.ts:569_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L569)

Adds a new element in front of the deque. Increases the length of the deque.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| element | `T` | A new element to add. |

**Returns:** `i32` The index of a newly added element

#### remove  <a id="remove"></a>

▸ **remove**\(index: `i32`\): `void`

_Defined in_ [_near.ts:501_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L501)

Removes the content of the element from storage without changing length of the deque.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| index | `i32` | The index of the element to remove. |

**Returns:** `void`

