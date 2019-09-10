# Map

A map class that implements a persistent unordered map. NOTE: The Map doesn't store keys, so if you need to retrive them, include keys in the values.

## Type parameters

#### K

#### V

## Hierarchy

**PersistentMap**

## Index

### Constructors

* constructor

### Methods

* contains
* delete
* get
* getSome
* set
* values

## Constructors

### constructor

⊕ **new PersistentMap**\(prefix: _`string`_\): PersistentMap

_Defined in_ [_collections/persistentMap.ts:9_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentMap.ts#L9)

Creates or restores a persistent map with a given storage prefix. Always use a unique storage prefix for different collections.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| prefix | `string` | A prefix to use for every key of this map. |

**Returns:** PersistentMap

## Methods

### contains

▸ **contains**\(key: _`K`_\): `bool`

_Defined in_ [_collections/persistentMap.ts:48_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentMap.ts#L48)

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| key | `K` | Key to check. |

**Returns:** `bool` True if the given key present in the map.

### delete

▸ **delete**\(key: _`K`_\): `void`

_Defined in_ [_collections/persistentMap.ts:56_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentMap.ts#L56)

Removes value and the key from the map.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| key | `K` | Key to remove. |

**Returns:** `void`

### get

▸ **get**\(key: _`K`_, defaultValue?: _`V` \| `null`_\): `V` \| `null`

_Defined in_ [_collections/persistentMap.ts:65_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentMap.ts#L65)

**Parameters:**

| Name | Type | Default value | Description |
| :--- | :--- | :--- | :--- |
| key | `K` | - | Key of the element. |
| `Default value` defaultValue | `V` \| `null` | null | The default value if the key is not present. |

**Returns:** `V` \| `null` Value for the given key or the default value.

### getSome

▸ **getSome**\(key: _`K`_\): `V`

_Defined in_ [_collections/persistentMap.ts:73_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentMap.ts#L73)

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| key | `K` | Key of the element. |

**Returns:** `V` Value for the given key or the default value.

### set

▸ **set**\(key: _`K`_, value: _`V`_\): `void`

_Defined in_ [_collections/persistentMap.ts:82_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentMap.ts#L82)

Sets the new value for the given key.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| key | `K` | Key of the element. |
| value | `V` | The new value of the element. |

**Returns:** `void`

### values

▸ **values**\(start: _`K`_, end: _`K`_, limit?: _`i32`_, startInclusive?: _`bool`_\): `V`\[\]

_Defined in_ [_collections/persistentMap.ts:36_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/collections/persistentMap.ts#L36)

Returns values of the map between the given start key and the end key.

**Parameters:**

| Name | Type | Default value | Description |
| :--- | :--- | :--- | :--- |
| start | `K` | - | Starting from which key to include values. Default is \`null\`, means from the beginning. |
| end | `K` | - | Up to which key include values \(inclusive\). Default is \`null\`, means to the end. |
| `Default value` limit | `i32` | -1 | The maximum number of values to return. Default is \`-1\`, means no limit. |
| `Default value` startInclusive | `bool` | true | Whether the start key is inclusive. Default is \`true\`, means include start key. It's useful to set it to false for pagination. |

**Returns:** `V`\[\]

