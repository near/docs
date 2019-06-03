# Collections

[near-runtime-ts](../) &gt; "near" &gt; [collections](collections.md)

## Module: collections

A namespace with classes and functions for persistent collections on the blockchain.

### Index

#### Classes

* [Deque](../classes/deque.md)
* [Map](../classes/map.md)
* [Vector](../classes/vector.md)

#### Variables

* \_KEY\_BACK\_INDEX\_SUFFIX
* \_KEY\_ELEMENT\_SUFFIX
* \_KEY\_FRONT\_INDEX\_SUFFIX
* \_KEY\_LENGTH\_SUFFIX

#### Functions

* deque
* map
* vector

### Variables

#### `<Const>` \_KEY\_BACK\_INDEX\_SUFFIX  <a id="_key_back_index_suffix"></a>

**● \_KEY\_BACK\_INDEX\_SUFFIX**: _":back"_ = ":back"

_Defined in_ [_near.ts:228_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L228)

#### `<Const>` \_KEY\_ELEMENT\_SUFFIX  <a id="_key_element_suffix"></a>

**● \_KEY\_ELEMENT\_SUFFIX**: _"::"_ = "::"

_Defined in_ [_near.ts:229_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L229)

#### `<Const>` \_KEY\_FRONT\_INDEX\_SUFFIX  <a id="_key_front_index_suffix"></a>

**● \_KEY\_FRONT\_INDEX\_SUFFIX**: _":front"_ = ":front"

_Defined in_ [_near.ts:227_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L227)

#### `<Const>` \_KEY\_LENGTH\_SUFFIX  <a id="_key_length_suffix"></a>

**● \_KEY\_LENGTH\_SUFFIX**: _":len"_ = ":len"

_Defined in_ [_near.ts:226_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L226)

### Functions

#### deque  <a id="deque-1"></a>

▸ **deque**&lt;`T`&gt;\(prefix: `string`\): [Deque](https://github.com/ckshei/nearprotocol_docs/tree/d6186ae6832aee077838ed1322d479d1357cf6f3/docs/client-api/ts/classes/_near_.collections.deque.md)&lt;`T`&gt;

_Defined in_ [_near.ts:721_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L721)

Creates or restores a persistent deque with a given storage prefix. Always use a unique storage prefix for different collections.

**Type parameters:**

**T**

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| prefix | `string` | A prefix to use for every key of this deque. |

**Returns:** [Deque](https://github.com/ckshei/nearprotocol_docs/tree/d6186ae6832aee077838ed1322d479d1357cf6f3/docs/client-api/ts/classes/_near_.collections.deque.md)&lt;`T`&gt;

#### map  <a id="map-1"></a>

▸ **map**&lt;`K`,`V`&gt;\(prefix: `string`\): [Map](https://github.com/ckshei/nearprotocol_docs/tree/d6186ae6832aee077838ed1322d479d1357cf6f3/docs/client-api/ts/classes/_near_.collections.map.md)&lt;`K`, `V`&gt;

_Defined in_ [_near.ts:730_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L730)

Creates or restores a persistent map with a given storage prefix. Always use a unique storage prefix for different collections.

**Type parameters:**

**K**

**V**

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| prefix | `string` | A prefix to use for every key of this map. |

**Returns:** [Map](https://github.com/ckshei/nearprotocol_docs/tree/d6186ae6832aee077838ed1322d479d1357cf6f3/docs/client-api/ts/classes/_near_.collections.map.md)&lt;`K`, `V`&gt;

#### vector  <a id="vector-1"></a>

▸ **vector**&lt;`T`&gt;\(prefix: `string`\): [Vector](https://github.com/ckshei/nearprotocol_docs/tree/d6186ae6832aee077838ed1322d479d1357cf6f3/docs/client-api/ts/classes/_near_.collections.vector.md)&lt;`T`&gt;

_Defined in_ [_near.ts:712_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L712)

Creates or restores a persistent vector with a given storage prefix. Always use a unique storage prefix for different collections.

**Type parameters:**

**T**

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| prefix | `string` | A prefix to use for every key of this vector. |

**Returns:** [Vector](https://github.com/ckshei/nearprotocol_docs/tree/d6186ae6832aee077838ed1322d479d1357cf6f3/docs/client-api/ts/classes/_near_.collections.vector.md)&lt;`T`&gt;

