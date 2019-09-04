# TopN

A TopN class that can return first N keys of a type K sorted by rating. Rating is stored as i32. Default sort order is descending \(highest rated keys\), but can be changed to ascending \(lowest rated keys\).

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

## Constructors

### constructor

⊕ **new PersistentTopN**\(prefix: _`string`_, descending?: _`bool`_\): PersistentTopN

_Defined in_ [_collections/persistentTopn.ts:30_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentTopn.ts#L30)

Creates or restores a persistent top N collection with a given storage prefix. Always use a unique storage prefix for different collections.

**Parameters:**

| Name | Type | Default value | Description |
| :--- | :--- | :--- | :--- |
| prefix | `string` | - | A prefix to use for every key of this collection. |
| `Default value` descending | `bool` | true | Sorting order of keys for rating. Default is descending \(the highest rated keys\). |

**Returns:** PersistentTopN

## Accessors

### isEmpty

**get isEmpty**\(\): `bool`

_Defined in_ [_collections/persistentTopn.ts:75_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentTopn.ts#L75)

**Returns:** `bool` True if the TopN collection is empty.

### length

**get length**\(\): `i32`

_Defined in_ [_collections/persistentTopn.ts:83_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentTopn.ts#L83)

**Returns:** `i32` The number of unique elements in the TopN collection.

## Methods

### contains

▸ **contains**\(key: _`K`_\): `bool`

_Defined in_ [_collections/persistentTopn.ts:104_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentTopn.ts#L104)

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| key | `K` | Key to check. |

**Returns:** `bool` True if the given key is present.

### delete

▸ **delete**\(key: _`K`_\): `void`

_Defined in_ [_collections/persistentTopn.ts:112_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentTopn.ts#L112)

Removes rating and the key from the collection.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| key | `K` | Key to remove. |

**Returns:** `void`

### getRating

▸ **getRating**\(key: _`K`_, defaultRating?: _`i32`_\): `i32`

_Defined in_ [_collections/persistentTopn.ts:184_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentTopn.ts#L184)

**Parameters:**

| Name | Type | Default value | Description |
| :--- | :--- | :--- | :--- |
| key | `K` | - | Key of the element. |
| `Default value` defaultRating | `i32` | 0 | The default rating to return if the key is not present. |

**Returns:** `i32` Value for the given key or the defaultRating.

### getTop

▸ **getTop**\(limit: _`i32`_\): `K`\[\]

_Defined in_ [_collections/persistentTopn.ts:138_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentTopn.ts#L138)

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| limit | `i32` | The maximum limit of keys to return. |

**Returns:** `K`\[\] The array of top rated keys.

### getTopFromKey

▸ **getTopFromKey**\(limit: _`i32`_, fromKey: _`K`_\): `K`\[\]

_Defined in_ [_collections/persistentTopn.ts:149_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentTopn.ts#L149)

Returns a top list starting from the given key \(exclusive\). It's useful for pagination.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| limit | `i32` | The maximum limit of keys to return. |
| fromKey | `K` | The key from which return top list \(exclisive\). |

**Returns:** `K`\[\] The array of top rated keys starting from the given key.

### getTopWithRating

▸ **getTopWithRating**\(limit: _`i32`_\): MapEntry

_Defined in_ [_collections/persistentTopn.ts:164_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentTopn.ts#L164)

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| limit | `i32` | The maximum limit of keys to return. |

**Returns:** MapEntry The array of top rated keys with their corresponding rating.

### getTopWithRatingFromKey

▸ **getTopWithRatingFromKey**\(limit: _`i32`_, fromKey: _`K`_\): MapEntry

_Defined in_ [_collections/persistentTopn.ts:175_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentTopn.ts#L175)

Returns a top list with rating starting from the given key \(exclusive\). It's useful for pagination.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| limit | `i32` | The maximum limit of keys to return. |
| fromKey | `K` | The key from which return top list \(exclisive\). |

**Returns:** MapEntry The array of top rated keys with their rating starting from the given key.

### incrementRating

▸ **incrementRating**\(key: _`K`_, increment?: _`i32`_\): `void`

_Defined in_ [_collections/persistentTopn.ts:209_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentTopn.ts#L209)

Increments rating of the given key by the given increment \(1 by default\).

**Parameters:**

| Name | Type | Default value | Description |
| :--- | :--- | :--- | :--- |
| key | `K` | - | The key to update. |
| `Default value` increment | `i32` | 1 | The increment value for the rating \(1 by default\). |

**Returns:** `void`

### keysToRatings

▸ **keysToRatings**\(keys: _`K`\[\]_\): MapEntry

_Defined in_ [_collections/persistentTopn.ts:125_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentTopn.ts#L125)

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| keys | `K`\[\] | The array of keys to lookup rating. |

**Returns:** MapEntry an array of key to rating pairs for the given keys.

### setRating

▸ **setRating**\(key: _`K`_, rating: _`i32`_\): `void`

_Defined in_ [_collections/persistentTopn.ts:193_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentTopn.ts#L193)

Sets the new rating for the given key.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| key | `K` | The key to update. |
| rating | `i32` | The new rating of the key. |

**Returns:** `void`

