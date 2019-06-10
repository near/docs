# TopN

[near-runtime-ts](../../) &gt; "near" &gt; [collections](../../modules/collections.md) &gt; [TopN](topn.md)

## Class: TopN

A TopN class that can return first N keys of a type K sorted by rating. Rating is stored as i32. Default sort order is descending \(highest rated keys\), but can be changed to ascending \(lowest rated keys\).

### Type parameters

**K**

### Hierarchy

**TopN**

### Index

#### Constructors

* [constructor](https://github.com/nearprotocol/docs/tree/02f899c11ed02bb3a999e4e86904f6a23c31ca4c/docs/client-api/ts/classes/collections/_near_.collections.topn.md#constructor)

#### Accessors

* [isEmpty](https://github.com/nearprotocol/docs/tree/02f899c11ed02bb3a999e4e86904f6a23c31ca4c/docs/client-api/ts/classes/collections/_near_.collections.topn.md#isempty)
* [length](https://github.com/nearprotocol/docs/tree/02f899c11ed02bb3a999e4e86904f6a23c31ca4c/docs/client-api/ts/classes/collections/_near_.collections.topn.md#length)

#### Methods

* [contains](https://github.com/nearprotocol/docs/tree/02f899c11ed02bb3a999e4e86904f6a23c31ca4c/docs/client-api/ts/classes/collections/_near_.collections.topn.md#contains)
* [delete](https://github.com/nearprotocol/docs/tree/02f899c11ed02bb3a999e4e86904f6a23c31ca4c/docs/client-api/ts/classes/collections/_near_.collections.topn.md#delete)
* [getRating](https://github.com/nearprotocol/docs/tree/02f899c11ed02bb3a999e4e86904f6a23c31ca4c/docs/client-api/ts/classes/collections/_near_.collections.topn.md#getrating)
* [getTop](https://github.com/nearprotocol/docs/tree/02f899c11ed02bb3a999e4e86904f6a23c31ca4c/docs/client-api/ts/classes/collections/_near_.collections.topn.md#gettop)
* [getTopFromKey](https://github.com/nearprotocol/docs/tree/02f899c11ed02bb3a999e4e86904f6a23c31ca4c/docs/client-api/ts/classes/collections/_near_.collections.topn.md#gettopfromkey)
* [getTopWithRating](https://github.com/nearprotocol/docs/tree/02f899c11ed02bb3a999e4e86904f6a23c31ca4c/docs/client-api/ts/classes/collections/_near_.collections.topn.md#gettopwithrating)
* [getTopWithRatingFromKey](https://github.com/nearprotocol/docs/tree/02f899c11ed02bb3a999e4e86904f6a23c31ca4c/docs/client-api/ts/classes/collections/_near_.collections.topn.md#gettopwithratingfromkey)
* [incrementRating](https://github.com/nearprotocol/docs/tree/02f899c11ed02bb3a999e4e86904f6a23c31ca4c/docs/client-api/ts/classes/collections/_near_.collections.topn.md#incrementrating)
* [keysToRatings](https://github.com/nearprotocol/docs/tree/02f899c11ed02bb3a999e4e86904f6a23c31ca4c/docs/client-api/ts/classes/collections/_near_.collections.topn.md#keystoratings)
* [setRating](https://github.com/nearprotocol/docs/tree/02f899c11ed02bb3a999e4e86904f6a23c31ca4c/docs/client-api/ts/classes/collections/_near_.collections.topn.md#setrating)

### Constructors

#### constructor   <a id="constructor"></a>

⊕ **new TopN**\(prefix: `string`, descending?: `bool`\): [TopN](https://github.com/nearprotocol/docs/tree/02f899c11ed02bb3a999e4e86904f6a23c31ca4c/docs/client-api/ts/classes/collections/_near_.collections.topn.md)

_Defined in_ [_near.ts:764_](https://github.com/nearprotocol/near-runtime-ts/blob/b0670e9/near.ts#L764)

Creates or restores a persistent top N collection with a given storage prefix. Always use a unique storage prefix for different collections.

**Parameters:**

| Name | Type | Default value | Description |
| :--- | :--- | :--- | :--- |
| prefix | `string` | - | A prefix to use for every key of this collection. |
| `Default value` descending | `bool` | true | Sorting order of keys for rating. Default is descending \(the highest rated keys\). |

**Returns:** [TopN](https://github.com/nearprotocol/docs/tree/02f899c11ed02bb3a999e4e86904f6a23c31ca4c/docs/client-api/ts/classes/collections/_near_.collections.topn.md)

### Accessors

#### isEmpty   <a id="isempty"></a>

getisEmpty\(\): `bool`

_Defined in_ [_near.ts:808_](https://github.com/nearprotocol/near-runtime-ts/blob/b0670e9/near.ts#L808)

**Returns:** `bool` True if the TopN collection is empty.

#### length   <a id="length"></a>

getlength\(\): `i32`

_Defined in_ [_near.ts:815_](https://github.com/nearprotocol/near-runtime-ts/blob/b0670e9/near.ts#L815)

**Returns:** `i32` The number of unique elements in the TopN collection.

### Methods

#### contains   <a id="contains"></a>

▸ **contains**\(key: `K`\): `bool`

_Defined in_ [_near.ts:835_](https://github.com/nearprotocol/near-runtime-ts/blob/b0670e9/near.ts#L835)

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| key | `K` | Key to check. |

**Returns:** `bool` True if the given key is present.

#### delete   <a id="delete"></a>

▸ **delete**\(key: `K`\): `void`

_Defined in_ [_near.ts:843_](https://github.com/nearprotocol/near-runtime-ts/blob/b0670e9/near.ts#L843)

Removes rating and the key from the collection.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| key | `K` | Key to remove. |

**Returns:** `void`

#### getRating   <a id="getrating"></a>

▸ **getRating**\(key: `K`, defaultRating?: `i32`\): `i32`

_Defined in_ [_near.ts:913_](https://github.com/nearprotocol/near-runtime-ts/blob/b0670e9/near.ts#L913)

**Parameters:**

| Name | Type | Default value | Description |
| :--- | :--- | :--- | :--- |
| key | `K` | - | Key of the element. |
| `Default value` defaultRating | `i32` | 0 | The default rating to return if the key is not present. |

**Returns:** `i32` Value for the given key or the defaultRating.

#### getTop   <a id="gettop"></a>

▸ **getTop**\(limit: `i32`\): `K`\[\]

_Defined in_ [_near.ts:869_](https://github.com/nearprotocol/near-runtime-ts/blob/b0670e9/near.ts#L869)

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| limit | `i32` | The maximum limit of keys to return. |

**Returns:** `K`\[\] The array of top rated keys.

#### getTopFromKey   <a id="gettopfromkey"></a>

▸ **getTopFromKey**\(limit: `i32`, fromKey: `K`\): `K`\[\]

_Defined in_ [_near.ts:880_](https://github.com/nearprotocol/near-runtime-ts/blob/b0670e9/near.ts#L880)

Returns a top list starting from the given key \(exclusive\). It's useful for pagination.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| limit | `i32` | The maximum limit of keys to return. |
| fromKey | `K` | The key from which return top list \(exclisive\). |

**Returns:** `K`\[\] The array of top rated keys starting from the given key.

#### getTopWithRating   <a id="gettopwithrating"></a>

▸ **getTopWithRating**\(limit: `i32`\): [MapEntry](https://github.com/nearprotocol/docs/tree/02f899c11ed02bb3a999e4e86904f6a23c31ca4c/docs/client-api/ts/classes/collections/_near_.near.mapentry.md)&lt;`K`, `i32`&gt;\[\]

_Defined in_ [_near.ts:893_](https://github.com/nearprotocol/near-runtime-ts/blob/b0670e9/near.ts#L893)

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| limit | `i32` | The maximum limit of keys to return. |

**Returns:** [MapEntry](https://github.com/nearprotocol/docs/tree/02f899c11ed02bb3a999e4e86904f6a23c31ca4c/docs/client-api/ts/classes/collections/_near_.near.mapentry.md)&lt;`K`, `i32`&gt;\[\] The array of top rated keys with their corresponding rating.

#### getTopWithRatingFromKey   <a id="gettopwithratingfromkey"></a>

▸ **getTopWithRatingFromKey**\(limit: `i32`, fromKey: `K`\): [MapEntry](https://github.com/nearprotocol/docs/tree/02f899c11ed02bb3a999e4e86904f6a23c31ca4c/docs/client-api/ts/classes/collections/_near_.near.mapentry.md)&lt;`K`, `i32`&gt;\[\]

_Defined in_ [_near.ts:904_](https://github.com/nearprotocol/near-runtime-ts/blob/b0670e9/near.ts#L904)

Returns a top list with rating starting from the given key \(exclusive\). It's useful for pagination.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| limit | `i32` | The maximum limit of keys to return. |
| fromKey | `K` | The key from which return top list \(exclisive\). |

**Returns:** [MapEntry](https://github.com/nearprotocol/docs/tree/02f899c11ed02bb3a999e4e86904f6a23c31ca4c/docs/client-api/ts/classes/collections/_near_.near.mapentry.md)&lt;`K`, `i32`&gt;\[\] The array of top rated keys with their rating starting from the given key.

#### incrementRating   <a id="incrementrating"></a>

▸ **incrementRating**\(key: `K`, increment?: `i32`\): `void`

_Defined in_ [_near.ts:938_](https://github.com/nearprotocol/near-runtime-ts/blob/b0670e9/near.ts#L938)

Increments rating of the given key by the given increment \(1 by default\).

**Parameters:**

| Name | Type | Default value | Description |
| :--- | :--- | :--- | :--- |
| key | `K` | - | The key to update. |
| `Default value` increment | `i32` | 1 | The increment value for the rating \(1 by default\). |

**Returns:** `void`

#### keysToRatings   <a id="keystoratings"></a>

▸ **keysToRatings**\(keys: `K`_\[\]_\): [MapEntry](https://github.com/nearprotocol/docs/tree/02f899c11ed02bb3a999e4e86904f6a23c31ca4c/docs/client-api/ts/classes/collections/_near_.near.mapentry.md)&lt;`K`, `i32`&gt;\[\]

_Defined in_ [_near.ts:856_](https://github.com/nearprotocol/near-runtime-ts/blob/b0670e9/near.ts#L856)

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| keys | `K`\[\] | The array of keys to lookup rating. |

**Returns:** [MapEntry](https://github.com/nearprotocol/docs/tree/02f899c11ed02bb3a999e4e86904f6a23c31ca4c/docs/client-api/ts/classes/collections/_near_.near.mapentry.md)&lt;`K`, `i32`&gt;\[\] an array of key to rating pairs for the given keys.

#### setRating   <a id="setrating"></a>

▸ **setRating**\(key: `K`, rating: `i32`\): `void`

_Defined in_ [_near.ts:922_](https://github.com/nearprotocol/near-runtime-ts/blob/b0670e9/near.ts#L922)

Sets the new rating for the given key.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| key | `K` | The key to update. |
| rating | `i32` | The new rating of the key. |

**Returns:** `void`

