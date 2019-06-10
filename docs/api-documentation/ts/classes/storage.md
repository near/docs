# Storage

[near-runtime-ts](../) &gt; "near" &gt; [Storage](storage.md)

## Class: Storage

Represents contract storage.

### Hierarchy

**Storage**

### Index

#### Methods

* get
* getBytes
* getItem
* getString
* getU64
* hasKey
* keys
* remove
* removeItem
* set
* setBytes
* setItem
* setString
* setU64

### Methods

#### get   <a id="get"></a>

▸ **get**&lt;`T`&gt;\(key: `string`, defaultValue?: `T`\): `T`

_Defined in_ [_near.ts:143_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L143)

Gets given generic value stored under the key. Key is encoded as UTF-8 strings. Supported types: bools, integers, string and data objects defined in model.ts. For common/dynamic arrays use {@link \#getArray}

**Type parameters:**

**T**

**Parameters:**

| Name | Type | Default value | Description |
| :--- | :--- | :--- | :--- |
| key | `string` | - | A key to read from storage. |
| `Default value` defaultValue | `T` | null | The default value if the key is not available |

**Returns:** `T` A value of type T stored under the given key.

#### getBytes   <a id="getbytes"></a>

▸ **getBytes**\(key: `string`\): `Uint8Array`

_Defined in_ [_near.ts:80_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L80)

Get byte array stored under given key. Key is encoded as UTF-8 strings. Byte array stored as is.

It's convenient to use this together with `DomainObject.decode()`.

**Parameters:**

| Name | Type |
| :--- | :--- |
| key | `string` |

**Returns:** `Uint8Array`

#### getItem   <a id="getitem"></a>

▸ **getItem**\(key: `string`\): `string`

_Defined in_ [_near.ts:46_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L46)

_**deprecated**_: Use getString or get

**Parameters:**

| Name | Type |
| :--- | :--- |
| key | `string` |

**Returns:** `string`

#### getString   <a id="getstring"></a>

▸ **getString**\(key: `string`\): `string`

_Defined in_ [_near.ts:60_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L60)

Get string value stored under given key. Both key and value are encoded as UTF-8 strings.

**Parameters:**

| Name | Type |
| :--- | :--- |
| key | `string` |

**Returns:** `string`

#### getU64   <a id="getu64"></a>

▸ **getU64**\(key: `string`\): `u64`

_Defined in_ [_near.ts:113_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L113)

Get 64-bit unsigned int stored under given key. Key is encoded as UTF-8 strings. Number is encoded as decimal string.

**Parameters:**

| Name | Type |
| :--- | :--- |
| key | `string` |

**Returns:** `u64` int value or 0 if value is not found

#### hasKey   <a id="haskey"></a>

▸ **hasKey**\(key: `string`\): `bool`

_Defined in_ [_near.ts:84_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L84)

**Parameters:**

| Name | Type |
| :--- | :--- |
| key | `string` |

**Returns:** `bool`

#### keys   <a id="keys"></a>

▸ **keys**\(prefix: `string`\): `string`\[\]

_Defined in_ [_near.ts:24_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L24)

Returns list of keys starting with given prefix.

NOTE: Must be very careful to avoid exploding amount of compute with this method. Make sure there is a hard limit on number of keys returned even if contract state size grows.

**Parameters:**

| Name | Type |
| :--- | :--- |
| prefix | `string` |

**Returns:** `string`\[\]

#### remove   <a id="remove"></a>

▸ **remove**\(key: `string`\): `void`

_Defined in_ [_near.ts:88_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L88)

**Parameters:**

| Name | Type |
| :--- | :--- |
| key | `string` |

**Returns:** `void`

#### removeItem   <a id="removeitem"></a>

▸ **removeItem**\(key: `string`\): `void`

_Defined in_ [_near.ts:95_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L95)

_**deprecated**_: Use \#remove

**Parameters:**

| Name | Type |
| :--- | :--- |
| key | `string` |

**Returns:** `void`

#### set   <a id="set"></a>

▸ **set**&lt;`T`&gt;\(key: `string`, value: `T`\): `void`

_Defined in_ [_near.ts:124_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L124)

Stores given generic value under the key. Key is encoded as UTF-8 strings. Supported types: bools, integers, string and data objects defined in model.ts.

**Type parameters:**

**T**

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| key | `string` | A key to use for storage. |
| value | `T` | A value to store. |

**Returns:** `void`

#### setBytes   <a id="setbytes"></a>

▸ **setBytes**\(key: `string`, value: `Uint8Array`\): `void`

_Defined in_ [_near.ts:70_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L70)

Store byte array under given key. Key is encoded as UTF-8 strings. Byte array stored as is.

It's convenient to use this together with `domainObject.encode()`.

**Parameters:**

| Name | Type |
| :--- | :--- |
| key | `string` |
| value | `Uint8Array` |

**Returns:** `void`

#### setItem   <a id="setitem"></a>

▸ **setItem**\(key: `string`, value: `string`\): `void`

_Defined in_ [_near.ts:39_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L39)

_**deprecated**_: Use setString or set

**Parameters:**

| Name | Type |
| :--- | :--- |
| key | `string` |
| value | `string` |

**Returns:** `void`

#### setString   <a id="setstring"></a>

▸ **setString**\(key: `string`, value: `string`\): `void`

_Defined in_ [_near.ts:53_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L53)

Store string value under given key. Both key and value are encoded as UTF-8 strings.

**Parameters:**

| Name | Type |
| :--- | :--- |
| key | `string` |
| value | `string` |

**Returns:** `void`

#### setU64   <a id="setu64"></a>

▸ **setU64**\(key: `string`, value: `u64`\): `void`

_Defined in_ [_near.ts:103_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L103)

Store 64-bit unsigned int under given key. Key is encoded as UTF-8 strings. Number is encoded as decimal string.

**Parameters:**

| Name | Type |
| :--- | :--- |
| key | `string` |
| value | `u64` |

**Returns:** `void`

