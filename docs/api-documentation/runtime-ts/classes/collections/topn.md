# Class: PersistentTopN

A TopN class that can return first N keys of a type K sorted by rating. Rating is stored as i32. Default sort order is descending (highest rated keys), but can be changed to ascending (lowest rated keys).

## Type parameters
#### K 
## Hierarchy

**PersistentTopN**

## Index

### Constructors

* constructor

### Accessors

* isEmpty
* length

### Methods

* contains
* delete
* getRating
* getTop
* getTopFromKey
* getTopWithRating
* getTopWithRatingFromKey
* incrementRating
* keysToRatings
* setRating

---

## Constructors


###  constructor

⊕ **new PersistentTopN**(prefix: *`string`*, descending?: *`bool`*): PersistentTopN

*Defined in [collections/persistentTopn.ts:30](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentTopn.ts#L30)*

Creates or restores a persistent top N collection with a given storage prefix. Always use a unique storage prefix for different collections.

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| prefix | `string` | - |  A prefix to use for every key of this collection. |
| `Default value` descending | `bool` | true |  Sorting order of keys for rating. Default is descending (the highest rated keys). |

**Returns:** PersistentTopN

___

## Accessors


###  isEmpty

**get isEmpty**(): `bool`

*Defined in [collections/persistentTopn.ts:75](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentTopn.ts#L75)*

**Returns:** `bool`
True if the TopN collection is empty.

___

###  length

**get length**(): `i32`

*Defined in [collections/persistentTopn.ts:83](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentTopn.ts#L83)*

**Returns:** `i32`
The number of unique elements in the TopN collection.

___

## Methods


###  contains

▸ **contains**(key: *`K`*): `bool`

*Defined in [collections/persistentTopn.ts:104](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentTopn.ts#L104)*

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| key | `K` |  Key to check. |

**Returns:** `bool`
True if the given key is present.

___

###  delete

▸ **delete**(key: *`K`*): `void`

*Defined in [collections/persistentTopn.ts:112](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentTopn.ts#L112)*

Removes rating and the key from the collection.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| key | `K` |  Key to remove. |

**Returns:** `void`

___

###  getRating

▸ **getRating**(key: *`K`*, defaultRating?: *`i32`*): `i32`

*Defined in [collections/persistentTopn.ts:184](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentTopn.ts#L184)*

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| key | `K` | - |  Key of the element. |
| `Default value` defaultRating | `i32` | 0 |  The default rating to return if the key is not present. |

**Returns:** `i32`
Value for the given key or the defaultRating.

___

###  getTop

▸ **getTop**(limit: *`i32`*): `K`[]

*Defined in [collections/persistentTopn.ts:138](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentTopn.ts#L138)*

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| limit | `i32` |  The maximum limit of keys to return. |

**Returns:** `K`[]
The array of top rated keys.

___

###  getTopFromKey

▸ **getTopFromKey**(limit: *`i32`*, fromKey: *`K`*): `K`[]

*Defined in [collections/persistentTopn.ts:149](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentTopn.ts#L149)*

Returns a top list starting from the given key (exclusive). It's useful for pagination.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| limit | `i32` |  The maximum limit of keys to return. |
| fromKey | `K` |  The key from which return top list (exclisive). |

**Returns:** `K`[]
The array of top rated keys starting from the given key.

___

###  getTopWithRating

▸ **getTopWithRating**(limit: *`i32`*): MapEntry

*Defined in [collections/persistentTopn.ts:164](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentTopn.ts#L164)*

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| limit | `i32` |  The maximum limit of keys to return. |

**Returns:** MapEntry
The array of top rated keys with their corresponding rating.

___

###  getTopWithRatingFromKey

▸ **getTopWithRatingFromKey**(limit: *`i32`*, fromKey: *`K`*): MapEntry

*Defined in [collections/persistentTopn.ts:175](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentTopn.ts#L175)*

Returns a top list with rating starting from the given key (exclusive). It's useful for pagination.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| limit | `i32` |  The maximum limit of keys to return. |
| fromKey | `K` |  The key from which return top list (exclisive). |

**Returns:** MapEntry
The array of top rated keys with their rating starting from the given key.

___

###  incrementRating

▸ **incrementRating**(key: *`K`*, increment?: *`i32`*): `void`

*Defined in [collections/persistentTopn.ts:209](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentTopn.ts#L209)*

Increments rating of the given key by the given increment (1 by default).

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| key | `K` | - |  The key to update. |
| `Default value` increment | `i32` | 1 |  The increment value for the rating (1 by default). |

**Returns:** `void`

___

###  keysToRatings

▸ **keysToRatings**(keys: *`K`[]*): MapEntry

*Defined in [collections/persistentTopn.ts:125](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentTopn.ts#L125)*

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| keys | `K`[] |  The array of keys to lookup rating. |

**Returns:** MapEntry
an array of key to rating pairs for the given keys.

___

###  setRating

▸ **setRating**(key: *`K`*, rating: *`i32`*): `void`

*Defined in [collections/persistentTopn.ts:193](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentTopn.ts#L193)*

Sets the new rating for the given key.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| key | `K` |  The key to update. |
| rating | `i32` |  The new rating of the key. |

**Returns:** `void`

___

