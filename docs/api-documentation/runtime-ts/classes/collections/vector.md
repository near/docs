# Class: Vector

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

---

## Constructors

###  constructor

⊕ **new Vector**(prefix: *`string`*): [Vector](_near_.collections.vector.md)

*Defined in [near.ts:266](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L266)*

Creates or restores a persistent vector with a given storage prefix. Always use a unique storage prefix for different collections.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| prefix | `string` |  A prefix to use for every key of this vector. |

**Returns:** [Vector](_near_.collections.vector.md)

---

## Accessors



###  back

getback(): `T`

*Defined in [near.ts:422](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L422)*

**Returns:** `T`
The last element of the vector. Asserts that the vector is not empty.

---


###  first

getfirst(): `T`

*Defined in [near.ts:445](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L445)*

**Returns:** `T`
The first element of the vector. Asserts that the vector is not empty.

---


###  front

getfront(): `T`

*Defined in [near.ts:437](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L437)*

**Returns:** `T`
The first element of the vector. Asserts that the vector is not empty.

---


###  isEmpty

getisEmpty(): `bool`

*Defined in [near.ts:307](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L307)*

**Returns:** `bool`
True if the vector is empty.

---


###  last

getlast(): `T`

*Defined in [near.ts:430](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L430)*

**Returns:** `T`
The last element of the vector. Asserts that the vector is not empty.

---


###  length

getlength(): `i32`

*Defined in [near.ts:314](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L314)*

**Returns:** `i32`
The length of the vector.

---

## Methods



###  containsIndex

▸ **containsIndex**(index: *`i32`*): `bool`

*Defined in [near.ts:300](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L300)*

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| index | `i32` |  The index to check. |

**Returns:** `bool`
True if the given index is within the range of the vector indices.

---


###  delete

▸ **delete**(index: *`i32`*): `void`

*Defined in [near.ts:291](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L291)*

Removes the content of the element from storage without changing length of the vector.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| index | `i32` |  The index of the element to remove. |

**Returns:** `void`

---


###  pop

▸ **pop**(): `T`

*Defined in [near.ts:400](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L400)*

Removes the last element from the vector and returns it. Asserts that the vector is not empty. Decreases the length of the vector.

**Returns:** `T`
The removed last element of the vector.

---


###  popBack

▸ **popBack**(): `T`

*Defined in [near.ts:415](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L415)*

Removes the last element from the vector and returns it. Asserts that the vector is not empty. Decreases the length of the vector.

**Returns:** `T`
The removed last element of the vector.

---


###  push

▸ **push**(element: *`T`*): `i32`

*Defined in [near.ts:378](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L378)*

Adds a new element to the end of the vector. Increases the length of the vector.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| element | `T` |  A new element to add. |

**Returns:** `i32`
The index of a newly added element

---


###  pushBack

▸ **pushBack**(element: *`T`*): `i32`

*Defined in [near.ts:391](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L391)*

Adds a new element to the end of the vector. Increases the length of the vector.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| element | `T` |  A new element to add. |

**Returns:** `i32`
The index of a newly added element

---