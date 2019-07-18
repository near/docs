# Class: Map

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

---

## Constructors

###  constructor

⊕ **new Map**(prefix: *`string`*): [Map](_near_.collections.map.md)

*Defined in [near.ts:680](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L680)*

Creates or restores a persistent map with a given storage prefix. Always use a unique storage prefix for different collections.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| prefix | `string` |  A prefix to use for every key of this map. |

**Returns:** [Map](_near_.collections.map.md)

_---

## Methods

###  contains

▸ **contains**(key: *`K`*): `bool`

*Defined in [near.ts:720](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L720)*

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| key | `K` |  Key to check. |

**Returns:** `bool`
True if the given key present in the map.

---

###  delete

▸ **delete**(key: *`K`*): `void`

*Defined in [near.ts:728](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L728)*

Removes value and the key from the map.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| key | `K` |  Key to remove. |

**Returns:** `void`

---

###  get

▸ **get**(key: *`K`*, defaultValue?: *`V`*): `V`

*Defined in [near.ts:737](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L737)*

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| key | `K` | - |  Key of the element. |
| `Default value` defaultValue | `V` |  null |  The default value if the key is not present. |

**Returns:** `V`
Value for the given key or the default value.

---

###  set

▸ **set**(key: *`K`*, value: *`V`*): `void`

*Defined in [near.ts:746](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L746)*

Sets the new value for the given key.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| key | `K` |  Key of the element. |
| value | `V` |  The new value of the element. |

**Returns:** `void`

---

###  values

▸ **values**(start?: *`K`*, end?: *`K`*, limit?: *`i32`*, startInclusive?: *`bool`*): `V`[]

*Defined in [near.ts:706](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L706)*

Returns values of the map between the given start key and the end key.

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `Default value` start | `K` |  null |  Starting from which key to include values. Default is \`null\`, means from the beginning. |
| `Default value` end | `K` |  null |  Up to which key include values (inclusive). Default is \`null\`, means to the end. |
| `Default value` limit | `i32` |  -1 |  The maximum number of values to return. Default is \`-1\`, means no limit. |
| `Default value` startInclusive | `bool` | true |  Whether the start key is inclusive. Default is \`true\`, means include start key. It's useful to set it to false for pagination. |

**Returns:** `V`[]

_---

