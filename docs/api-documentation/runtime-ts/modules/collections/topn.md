# TopN

A TopN class that can return first N keys of a type K sorted by rating. Rating is stored as i32. Default sort order is descending \(highest rated keys\), but can be changed to ascending \(lowest rated keys\).

## Type parameters

#### K

## Hierarchy

**TopN**

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

⊕ **new TopN**\(prefix: _`string`_, descending?: _`bool`_\): [TopN](https://github.com/nearprotocol/docs/tree/59dd4aad80e70dc96fa9fbff5f98c18d604a0fc3/docs/api-documentation/runtime-ts/classes/collections/_near_.collections.topn.md)

_Defined in_ [_near.ts:766_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L766)

Creates or restores a persistent top N collection with a given storage prefix. Always use a unique storage prefix for different collections.

**Parameters:**

| Name | Type | Default value | Description |
| :--- | :--- | :--- | :--- |
| prefix | `string` | - | A prefix to use for every key of this collection. |
| `Default value` descending | `bool` | true | Sorting order of keys for rating. Default is descending \(the highest rated keys\). |

**Returns:** [TopN](https://github.com/nearprotocol/docs/tree/59dd4aad80e70dc96fa9fbff5f98c18d604a0fc3/docs/api-documentation/runtime-ts/classes/collections/_near_.collections.topn.md)

## Accessors

### isEmpty

getisEmpty\(\): `bool`

_Defined in_ [_near.ts:810_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L810)

**Returns:** `bool` True if the TopN collection is empty.

### length

getlength\(\): `i32`

_Defined in_ [_near.ts:817_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L817)

**Returns:** `i32` The number of unique elements in the TopN collection.

## Methods

### contains

▸ **contains**\(key: _`K`_\): `bool`

_Defined in_ [_near.ts:837_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L837)

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| key | `K` | Key to check. |

**Returns:** `bool` True if the given key is present.

### delete

▸ **delete**\(key: _`K`_\): `void`

_Defined in_ [_near.ts:845_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L845)

Removes rating and the key from the collection.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| key | `K` | Key to remove. |

**Returns:** `void`

### getRating

▸ **getRating**\(key: _`K`_, defaultRating?: _`i32`_\): `i32`

_Defined in_ [_near.ts:915_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L915)

**Parameters:**

| Name | Type | Default value | Description |
| :--- | :--- | :--- | :--- |
| key | `K` | - | Key of the element. |
| `Default value` defaultRating | `i32` | 0 | The default rating to return if the key is not present. |

**Returns:** `i32` Value for the given key or the defaultRating.

### getTop

▸ **getTop**\(limit: _`i32`_\): `K`\[\]

_Defined in_ [_near.ts:871_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L871)

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| limit | `i32` | The maximum limit of keys to return. |

**Returns:** `K`\[\] The array of top rated keys.

### getTopFromKey

▸ **getTopFromKey**\(limit: _`i32`_, fromKey: _`K`_\): `K`\[\]

_Defined in_ [_near.ts:882_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L882)

Returns a top list starting from the given key \(exclusive\). It's useful for pagination.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| limit | `i32` | The maximum limit of keys to return. |
| fromKey | `K` | The key from which return top list \(exclisive\). |

**Returns:** `K`\[\] The array of top rated keys starting from the given key.

### getTopWithRating

▸ **getTopWithRating**\(limit: _`i32`_\): [MapEntry](https://github.com/nearprotocol/docs/tree/59dd4aad80e70dc96fa9fbff5f98c18d604a0fc3/docs/api-documentation/runtime-ts/classes/collections/_near_.near.mapentry.md)&lt;`K`, `i32`&gt;\[\]

_Defined in_ [_near.ts:895_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L895)

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| limit | `i32` | The maximum limit of keys to return. |

**Returns:** [MapEntry](https://github.com/nearprotocol/docs/tree/59dd4aad80e70dc96fa9fbff5f98c18d604a0fc3/docs/api-documentation/runtime-ts/classes/collections/_near_.near.mapentry.md)&lt;`K`, `i32`&gt;\[\] The array of top rated keys with their corresponding rating.

### getTopWithRatingFromKey

▸ **getTopWithRatingFromKey**\(limit: _`i32`_, fromKey: _`K`_\): [MapEntry](https://github.com/nearprotocol/docs/tree/59dd4aad80e70dc96fa9fbff5f98c18d604a0fc3/docs/api-documentation/runtime-ts/classes/collections/_near_.near.mapentry.md)&lt;`K`, `i32`&gt;\[\]

_Defined in_ [_near.ts:906_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L906)

Returns a top list with rating starting from the given key \(exclusive\). It's useful for pagination.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| limit | `i32` | The maximum limit of keys to return. |
| fromKey | `K` | The key from which return top list \(exclisive\). |

**Returns:** [MapEntry](https://github.com/nearprotocol/docs/tree/59dd4aad80e70dc96fa9fbff5f98c18d604a0fc3/docs/api-documentation/runtime-ts/classes/collections/_near_.near.mapentry.md)&lt;`K`, `i32`&gt;\[\] The array of top rated keys with their rating starting from the given key.

### incrementRating

▸ **incrementRating**\(key: _`K`_, increment?: _`i32`_\): `void`

_Defined in_ [_near.ts:940_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L940)

Increments rating of the given key by the given increment \(1 by default\).

**Parameters:**

| Name | Type | Default value | Description |
| :--- | :--- | :--- | :--- |
| key | `K` | - | The key to update. |
| `Default value` increment | `i32` | 1 | The increment value for the rating \(1 by default\). |

**Returns:** `void`

### keysToRatings

▸ **keysToRatings**\(keys: _`K`\[\]_\): [MapEntry](https://github.com/nearprotocol/docs/tree/59dd4aad80e70dc96fa9fbff5f98c18d604a0fc3/docs/api-documentation/runtime-ts/classes/collections/_near_.near.mapentry.md)&lt;`K`, `i32`&gt;\[\]

_Defined in_ [_near.ts:858_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L858)

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| keys | `K`\[\] | The array of keys to lookup rating. |

**Returns:** [MapEntry](https://github.com/nearprotocol/docs/tree/59dd4aad80e70dc96fa9fbff5f98c18d604a0fc3/docs/api-documentation/runtime-ts/classes/collections/_near_.near.mapentry.md)&lt;`K`, `i32`&gt;\[\] an array of key to rating pairs for the given keys.

### setRating

▸ **setRating**\(key: _`K`_, rating: _`i32`_\): `void`

_Defined in_ [_near.ts:924_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L924)

Sets the new rating for the given key.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| key | `K` | The key to update. |
| rating | `i32` | The new rating of the key. |

**Returns:** `void`

