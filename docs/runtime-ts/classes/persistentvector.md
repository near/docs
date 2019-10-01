---
id: "persistentvector"
title: "PersistentVector"
sidebar_label: "PersistentVector"
---

A vector class that implements a persistent array.

## Type parameters

▪ **T**

## Hierarchy

* **PersistentVector**

## Indexable

* \[ **key**: *number*\]: T

A vector class that implements a persistent array.

## Index

### Constructors

* [constructor](persistentvector.md#constructor)

### Accessors

* [back](persistentvector.md#back)
* [first](persistentvector.md#first)
* [front](persistentvector.md#front)
* [isEmpty](persistentvector.md#isempty)
* [last](persistentvector.md#last)
* [length](persistentvector.md#length)

### Methods

* [containsIndex](persistentvector.md#containsindex)
* [pop](persistentvector.md#pop)
* [popBack](persistentvector.md#popback)
* [push](persistentvector.md#push)
* [pushBack](persistentvector.md#pushback)

## Constructors

###  constructor

\+ **new PersistentVector**(`prefix`: string): *[PersistentVector](persistentvector.md)*

*Defined in [collections/persistentVector.ts:12](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/collections/persistentVector.ts#L12)*

Creates or restores a persistent vector with a given storage prefix.
Always use a unique storage prefix for different collections.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`prefix` | string | A prefix to use for every key of this vector.  |

**Returns:** *[PersistentVector](persistentvector.md)*

## Accessors

###  back

• **get back**(): *T*

*Defined in [collections/persistentVector.ts:160](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/collections/persistentVector.ts#L160)*

**Returns:** *T*

The last element of the vector. Asserts that the vector is not empty.

___

###  first

• **get first**(): *T*

*Defined in [collections/persistentVector.ts:183](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/collections/persistentVector.ts#L183)*

**Returns:** *T*

The first element of the vector. Asserts that the vector is not empty.

___

###  front

• **get front**(): *T*

*Defined in [collections/persistentVector.ts:175](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/collections/persistentVector.ts#L175)*

**Returns:** *T*

The first element of the vector. Asserts that the vector is not empty.

___

###  isEmpty

• **get isEmpty**(): *bool*

*Defined in [collections/persistentVector.ts:44](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/collections/persistentVector.ts#L44)*

**Returns:** *bool*

True if the vector is empty.

___

###  last

• **get last**(): *T*

*Defined in [collections/persistentVector.ts:168](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/collections/persistentVector.ts#L168)*

**Returns:** *T*

The last element of the vector. Asserts that the vector is not empty.

___

###  length

• **get length**(): *i32*

*Defined in [collections/persistentVector.ts:51](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/collections/persistentVector.ts#L51)*

**Returns:** *i32*

The length of the vector.

## Methods

###  containsIndex

▸ **containsIndex**(`index`: i32): *bool*

*Defined in [collections/persistentVector.ts:37](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/collections/persistentVector.ts#L37)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`index` | i32 | The index to check. |

**Returns:** *bool*

True if the given index is within the range of the vector indices.

___

###  pop

▸ **pop**(): *T*

*Defined in [collections/persistentVector.ts:138](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/collections/persistentVector.ts#L138)*

Removes the last element from the vector and returns it. Asserts that the vector is not empty.
Decreases the length of the vector.

**Returns:** *T*

The removed last element of the vector.

___

###  popBack

▸ **popBack**(): *T*

*Defined in [collections/persistentVector.ts:153](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/collections/persistentVector.ts#L153)*

Removes the last element from the vector and returns it. Asserts that the vector is not empty.
Decreases the length of the vector.

**Returns:** *T*

The removed last element of the vector.

___

###  push

▸ **push**(`element`: T): *i32*

*Defined in [collections/persistentVector.ts:116](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/collections/persistentVector.ts#L116)*

Adds a new element to the end of the vector. Increases the length of the vector.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`element` | T | A new element to add. |

**Returns:** *i32*

The index of a newly added element

___

###  pushBack

▸ **pushBack**(`element`: T): *i32*

*Defined in [collections/persistentVector.ts:129](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/collections/persistentVector.ts#L129)*

Adds a new element to the end of the vector. Increases the length of the vector.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`element` | T | A new element to add. |

**Returns:** *i32*

The index of a newly added element
