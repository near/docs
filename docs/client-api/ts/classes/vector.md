# Vector

[near-runtime-ts](../) &gt; "near" &gt; collections &gt; [Vector](vector.md)

## Class: Vector

A vector class that implements a persistent array.

### Type parameters

**T**

### Hierarchy

**Vector**

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
* pop
* popBack
* push
* pushBack
* remove

### Constructors

#### constructor <a id="constructor"></a>

⊕ **new Vector**\(prefix: `string`\): [Vector](_near_.collections.vector.md)

_Defined in_ [_near.ts:237_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L237)

Creates or restores a persistent vector with a given storage prefix. Always use a unique storage prefix for different collections.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| prefix | `string` | A prefix to use for every key of this vector. |

**Returns:** [Vector](_near_.collections.vector.md)

### Accessors

#### back <a id="back"></a>

getback\(\): `T`

_Defined in_ [_near.ts:393_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L393)

**Returns:** `T` The last element of the vector. Asserts that the vector is not empty.

#### first <a id="first"></a>

getfirst\(\): `T`

_Defined in_ [_near.ts:416_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L416)

**Returns:** `T` The first element of the vector. Asserts that the vector is not empty.

#### front <a id="front"></a>

getfront\(\): `T`

_Defined in_ [_near.ts:408_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L408)

**Returns:** `T` The first element of the vector. Asserts that the vector is not empty.

#### isEmpty <a id="isempty"></a>

getisEmpty\(\): `bool`

_Defined in_ [_near.ts:278_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L278)

**Returns:** `bool` True if the vector is empty.

#### last <a id="last"></a>

getlast\(\): `T`

_Defined in_ [_near.ts:401_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L401)

**Returns:** `T` The last element of the vector. Asserts that the vector is not empty.

#### length <a id="length"></a>

getlength\(\): `i32`

_Defined in_ [_near.ts:285_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L285)

**Returns:** `i32` The length of the vector.

### Methods

#### containsIndex <a id="containsindex"></a>

▸ **containsIndex**\(index: `i32`\): `bool`

_Defined in_ [_near.ts:271_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L271)

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| index | `i32` | The index to check. |

**Returns:** `bool` True if the given index is within the range of the vector indices.

#### pop <a id="pop"></a>

▸ **pop**\(\): `T`

_Defined in_ [_near.ts:371_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L371)

Removes the last element from the vector and returns it. Asserts that the vector is not empty. Decreases the length of the vector.

**Returns:** `T` The removed last element of the vector.

#### popBack <a id="popback"></a>

▸ **popBack**\(\): `T`

_Defined in_ [_near.ts:386_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L386)

Removes the last element from the vector and returns it. Asserts that the vector is not empty. Decreases the length of the vector.

**Returns:** `T` The removed last element of the vector.

#### push <a id="push"></a>

▸ **push**\(element: `T`\): `i32`

_Defined in_ [_near.ts:349_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L349)

Adds a new element to the end of the vector. Increases the length of the vector.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| element | `T` | A new element to add. |

**Returns:** `i32` The index of a newly added element

#### pushBack <a id="pushback"></a>

▸ **pushBack**\(element: `T`\): `i32`

_Defined in_ [_near.ts:362_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L362)

Adds a new element to the end of the vector. Increases the length of the vector.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| element | `T` | A new element to add. |

**Returns:** `i32` The index of a newly added element

#### remove <a id="remove"></a>

▸ **remove**\(index: `i32`\): `void`

_Defined in_ [_near.ts:262_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L262)

Removes the content of the element from storage without changing length of the vector.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| index | `i32` | The index of the element to remove. |

**Returns:** `void` 

