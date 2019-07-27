# Map

A map class that implements a persistent unordered map. NOTE: The Map doesn't store keys, so if you need to retrive them, include keys in the values.

## Type parameters

#### K

#### V

## Hierarchy

**Map**

## Index

### Constructors

* constructor

### Methods

* contains
* delete
* get
* set
* values

## Constructors

### constructor

⊕ **new Map**\(prefix: _`string`_\): [Map](https://github.com/nearprotocol/docs/tree/4ea8b871a7a21b7579cbb350f27b4754826d42f8/docs/api-documentation/runtime-ts/classes/collections/_near_.collections.map.md)

_Defined in_ [_near.ts:680_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L680)

Creates or restores a persistent map with a given storage prefix. Always use a unique storage prefix for different collections.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| prefix | `string` | A prefix to use for every key of this map. |

**Returns:** [Map](https://github.com/nearprotocol/docs/tree/4ea8b871a7a21b7579cbb350f27b4754826d42f8/docs/api-documentation/runtime-ts/classes/collections/_near_.collections.map.md)

## Methods

### contains

▸ **contains**\(key: _`K`_\): `bool`

_Defined in_ [_near.ts:720_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L720)

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| key | `K` | Key to check. |

**Returns:** `bool` True if the given key present in the map.

### delete

▸ **delete**\(key: _`K`_\): `void`

_Defined in_ [_near.ts:728_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L728)

Removes value and the key from the map.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| key | `K` | Key to remove. |

**Returns:** `void`

### get

▸ **get**\(key: _`K`_, defaultValue?: _`V`_\): `V`

_Defined in_ [_near.ts:737_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L737)

**Parameters:**

| Name | Type | Default value | Description |
| :--- | :--- | :--- | :--- |
| key | `K` | - | Key of the element. |
| `Default value` defaultValue | `V` | null | The default value if the key is not present. |

**Returns:** `V` Value for the given key or the default value.

### set

▸ **set**\(key: _`K`_, value: _`V`_\): `void`

_Defined in_ [_near.ts:746_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L746)

Sets the new value for the given key.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| key | `K` | Key of the element. |
| value | `V` | The new value of the element. |

**Returns:** `void`

### values

▸ **values**\(start?: _`K`_, end?: _`K`_, limit?: _`i32`_, startInclusive?: _`bool`_\): `V`\[\]

_Defined in_ [_near.ts:706_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L706)

Returns values of the map between the given start key and the end key.

**Parameters:**

| Name | Type | Default value | Description |
| :--- | :--- | :--- | :--- |
| `Default value` start | `K` | null | Starting from which key to include values. Default is \`null\`, means from the beginning. |
| `Default value` end | `K` | null | Up to which key include values \(inclusive\). Default is \`null\`, means to the end. |
| `Default value` limit | `i32` | -1 | The maximum number of values to return. Default is \`-1\`, means no limit. |
| `Default value` startInclusive | `bool` | true | Whether the start key is inclusive. Default is \`true\`, means include start key. It's useful to set it to false for pagination. |

**Returns:** `V`\[\]

