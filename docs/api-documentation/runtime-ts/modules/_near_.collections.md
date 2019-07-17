[near-runtime-ts](../README.md) > ["near"](../modules/_near_.md) > [collections](../modules/_near_.collections.md)

# Module: collections

A namespace with classes and functions for persistent collections on the blockchain.

## Index

### Classes

* [Deque](../classes/_near_.collections.deque.md)
* [Map](../classes/_near_.collections.map.md)
* [TopN](../classes/_near_.collections.topn.md)
* [Vector](../classes/_near_.collections.vector.md)

### Variables

* [_KEY_BACK_INDEX_SUFFIX](_near_.collections.md#_key_back_index_suffix)
* [_KEY_ELEMENT_SUFFIX](_near_.collections.md#_key_element_suffix)
* [_KEY_FRONT_INDEX_SUFFIX](_near_.collections.md#_key_front_index_suffix)
* [_KEY_LENGTH_SUFFIX](_near_.collections.md#_key_length_suffix)
* [_KEY_RATING_SUFFIX](_near_.collections.md#_key_rating_suffix)
* [_RATING_OFFSET](_near_.collections.md#_rating_offset)

### Functions

* [deque](_near_.collections.md#deque-1)
* [map](_near_.collections.md#map-1)
* [topN](_near_.collections.md#topn-1)
* [vector](_near_.collections.md#vector-1)

---

## Variables

<a id="_key_back_index_suffix"></a>

### `<Const>` _KEY_BACK_INDEX_SUFFIX

**● _KEY_BACK_INDEX_SUFFIX**: *":back"* = ":back"

*Defined in [near.ts:255](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L255)*

___
<a id="_key_element_suffix"></a>

### `<Const>` _KEY_ELEMENT_SUFFIX

**● _KEY_ELEMENT_SUFFIX**: *"::"* = "::"

*Defined in [near.ts:256](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L256)*

___
<a id="_key_front_index_suffix"></a>

### `<Const>` _KEY_FRONT_INDEX_SUFFIX

**● _KEY_FRONT_INDEX_SUFFIX**: *":front"* = ":front"

*Defined in [near.ts:254](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L254)*

___
<a id="_key_length_suffix"></a>

### `<Const>` _KEY_LENGTH_SUFFIX

**● _KEY_LENGTH_SUFFIX**: *":len"* = ":len"

*Defined in [near.ts:253](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L253)*

___
<a id="_key_rating_suffix"></a>

### `<Const>` _KEY_RATING_SUFFIX

**● _KEY_RATING_SUFFIX**: *":r"* = ":r"

*Defined in [near.ts:257](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L257)*

___
<a id="_rating_offset"></a>

### `<Const>` _RATING_OFFSET

**● _RATING_OFFSET**: *`u64`* = 2147483648

*Defined in [near.ts:258](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L258)*

___

## Functions

<a id="deque-1"></a>

###  deque

▸ **deque**<`T`>(prefix: *`string`*): [Deque](../classes/_near_.collections.deque.md)<`T`>

*Defined in [near.ts:968](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L968)*

Creates or restores a persistent deque with a given storage prefix. Always use a unique storage prefix for different collections.

**Type parameters:**

#### T 
**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| prefix | `string` |  A prefix to use for every key of this deque. |

**Returns:** [Deque](../classes/_near_.collections.deque.md)<`T`>

___
<a id="map-1"></a>

###  map

▸ **map**<`K`,`V`>(prefix: *`string`*): [Map](../classes/_near_.collections.map.md)<`K`, `V`>

*Defined in [near.ts:977](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L977)*

Creates or restores a persistent map with a given storage prefix. Always use a unique storage prefix for different collections.

**Type parameters:**

#### K 
#### V 
**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| prefix | `string` |  A prefix to use for every key of this map. |

**Returns:** [Map](../classes/_near_.collections.map.md)<`K`, `V`>

___
<a id="topn-1"></a>

###  topN

▸ **topN**<`K`>(prefix: *`string`*, descending?: *`bool`*): [TopN](../classes/_near_.collections.topn.md)<`K`>

*Defined in [near.ts:987](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L987)*

Creates or restores a persistent TopN with a given storage prefix. Always use a unique storage prefix for different collections.

**Type parameters:**

#### K 
**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| prefix | `string` | - |  A prefix to use for every key of this collection. |
| `Default value` descending | `bool` | true |  Sorting order of keys for rating. Default is descending (the highest rated keys). |

**Returns:** [TopN](../classes/_near_.collections.topn.md)<`K`>

___
<a id="vector-1"></a>

###  vector

▸ **vector**<`T`>(prefix: *`string`*): [Vector](../classes/_near_.collections.vector.md)<`T`>

*Defined in [near.ts:959](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L959)*

Creates or restores a persistent vector with a given storage prefix. Always use a unique storage prefix for different collections.

**Type parameters:**

#### T 
**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| prefix | `string` |  A prefix to use for every key of this vector. |

**Returns:** [Vector](../classes/_near_.collections.vector.md)<`T`>

___

