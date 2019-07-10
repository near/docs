# Map

[near-runtime-ts](../../) &gt; "near" &gt; [collections](./) &gt; [Map](map.md)

## Class: Map

A map class that implements a persistent unordered map. NOTE: The Map doesn't store keys, so if you need to retrieve them, include keys in the values.

### Type parameters

**K**

**V**

### Hierarchy

**Map**

### Index

#### Constructors

* constructor

#### Methods

* contains
* delete
* get
* set
* values

### Constructors

#### constructor      <a id="constructor"></a>

⊕ **new Map**\(prefix: `string`\): [Map](map.md)

_Defined in_ [_near.ts:678_](https://github.com/nearprotocol/near-runtime-ts/blob/b0670e9/near.ts#L678)

Creates or restores a persistent map with a given storage prefix. Always use a unique storage prefix for different collections.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| prefix | `string` | A prefix to use for every key of this map. |

**Returns:** [Map](https://github.com/nearprotocol/docs/tree/02f899c11ed02bb3a999e4e86904f6a23c31ca4c/docs/client-api/ts/classes/collections/_near_.collections.map.md)

### Methods

#### contains      <a id="contains"></a>

▸ **contains**\(key: `K`\): `bool`

_Defined in_ [_near.ts:718_](https://github.com/nearprotocol/near-runtime-ts/blob/b0670e9/near.ts#L718)

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| key | `K` | Key to check. |

**Returns:** `bool` True if the given key present in the map.

#### delete      <a id="delete"></a>

▸ **delete**\(key: `K`\): `void`

_Defined in_ [_near.ts:726_](https://github.com/nearprotocol/near-runtime-ts/blob/b0670e9/near.ts#L726)

Removes value and the key from the map.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| key | `K` | Key to remove. |

**Returns:** `void`

#### get      <a id="get"></a>

▸ **get**\(key: `K`, defaultValue?: `V`\): `V`

_Defined in_ [_near.ts:735_](https://github.com/nearprotocol/near-runtime-ts/blob/b0670e9/near.ts#L735)

**Parameters:**

| Name | Type | Default value | Description |
| :--- | :--- | :--- | :--- |
| key | `K` | - | Key of the element. |
| `Default value` defaultValue | `V` | null | The default value if the key is not present. |

**Returns:** `V` Value for the given key or the default value.

#### set      <a id="set"></a>

▸ **set**\(key: `K`, value: `V`\): `void`

_Defined in_ [_near.ts:744_](https://github.com/nearprotocol/near-runtime-ts/blob/b0670e9/near.ts#L744)

Sets the new value for the given key.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| key | `K` | Key of the element. |
| value | `V` | The new value of the element. |

**Returns:** `void`

#### values      <a id="values"></a>

▸ **values**\(start?: `K`, end?: `K`, limit?: `i32`, startInclusive?: `bool`\): `V`\[\]

_Defined in_ [_near.ts:704_](https://github.com/nearprotocol/near-runtime-ts/blob/b0670e9/near.ts#L704)

Returns values of the map between the given start key and the end key.

**Parameters:**

| Name | Type | Default value | Description |
| :--- | :--- | :--- | :--- |
| `Default value` start | `K` | null | Starting from which key to include values. Default is \`null\`, means from the beginning. |
| `Default value` end | `K` | null | Up to which key include values \(inclusive\). Default is \`null\`, means to the end. |
| `Default value` limit | `i32` | -1 | The maximum number of values to return. Default is \`-1\`, means no limit. |
| `Default value` startInclusive | `bool` | true | Whether the start key is inclusive. Default is \`true\`, means include start key. It's useful to set it to false for pagination. |

**Returns:** `V`\[\]

