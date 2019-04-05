# Map

[near-runtime-ts](../) &gt; "near" &gt; collections &gt; [Map](map.md)

## Class: Map

A map class that implements a persistent unordered map.

### Type parameters

**K**

**V**

### Hierarchy

**Map**

### Index

#### Constructors

* constructor

#### Methods

* containsKey
* get
* removeKey
* set

### Constructors

#### constructor <a id="constructor"></a>

⊕ **new Map**\(prefix: `string`\): [Map](_near_.collections.map.md)

_Defined in_ [_near.ts:650_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L650)

Creates or restores a persistent map with a given storage prefix. Always use a unique storage prefix for different collections.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| prefix | `string` | A prefix to use for every key of this map. |

**Returns:** [Map](_near_.collections.map.md)

### Methods

#### containsKey <a id="containskey"></a>

▸ **containsKey**\(key: `K`\): `bool`

_Defined in_ [_near.ts:676_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L676)

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| key | `K` | Key to check. |

**Returns:** `bool` True if the given key present in the map.

#### get <a id="get"></a>

▸ **get**\(key: `K`, defaultValue?: `V`\): `V`

_Defined in_ [_near.ts:693_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L693)

**Parameters:**

| Name | Type | Default value | Description |
| :--- | :--- | :--- | :--- |
| key | `K` | - | Key of the element. |
| `Default value` defaultValue | `V` | null | The default value if the key is not present. |

**Returns:** `V` Value for the given key or the default value.

#### removeKey <a id="removekey"></a>

▸ **removeKey**\(key: `K`\): `void`

_Defined in_ [_near.ts:684_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L684)

Removes value and the key from the map.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| key | `K` | Key to remove. |

**Returns:** `void`

#### set <a id="set"></a>

▸ **set**\(key: `K`, value: `V`\): `void`

_Defined in_ [_near.ts:702_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L702)

Sets the new value for the given key.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| key | `K` | Key of the element. |
| value | `V` | The new value of the element. |

**Returns:** `void`

