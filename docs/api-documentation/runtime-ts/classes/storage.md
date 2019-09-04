# Storage

Represents contract storage.

## Hierarchy

**Storage**

## Index

### Methods

* contains
* delete
* get
* getBytes
* getPrimitive
* getSome
* getString
* hasKey
* keyRange
* keys
* set
* setBytes
* setString

## Methods

### contains

▸ **contains**\(key: _`string`_\): `bool`

_Defined in_ [_storage.ts:90_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/storage.ts#L90)

Returns true if the given key is present in the storage.

**Parameters:**

| Name | Type |
| :--- | :--- |
| key | `string` |

**Returns:** `bool`

### delete

▸ **delete**\(key: _`string`_\): `void`

_Defined in_ [_storage.ts:103_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/storage.ts#L103)

Deletes a given key from the storage.

**Parameters:**

| Name | Type |
| :--- | :--- |
| key | `string` |

**Returns:** `void`

### get

▸ **get**&lt;`T`&gt;\(key: _`string`_, defaultValue?: _`T` \| `null`_\): `T` \| `null`

_Defined in_ [_storage.ts:138_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/storage.ts#L138)

Gets given generic value stored under the key. Key is encoded as UTF-8 strings. Supported types: string and data objects defined in model.ts. Please use getPrimitive for getting primitives with a default value, and getSome for primitives and non-primitives in case it's known that a particular key exists.

**Type parameters:**

#### T

**Parameters:**

| Name | Type | Default value | Description |
| :--- | :--- | :--- | :--- |
| key | `string` | - | A key to read from storage. |
| `Default value` defaultValue | `T` \| `null` | null | The default value if the key is not available |

**Returns:** `T` \| `null` A value of type T stored under the given key.

### getBytes

▸ **getBytes**\(key: _`string`_\): `Uint8Array` \| `null`

_Defined in_ [_storage.ts:83_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/storage.ts#L83)

Get byte array stored under given key. Key is encoded as UTF-8 strings. Byte array stored as is.

It's convenient to use this together with `DomainObject.decode()`.

**Parameters:**

| Name | Type |
| :--- | :--- |
| key | `string` |

**Returns:** `Uint8Array` \| `null`

### getPrimitive

▸ **getPrimitive**&lt;`T`&gt;\(key: _`string`_, defaultValue: _`T`_\): `T`

_Defined in_ [_storage.ts:156_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/storage.ts#L156)

Gets given generic value stored under the key. Key is encoded as UTF-8 strings. Supported types: bool, integer.

**Type parameters:**

#### T

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| key | `string` | A key to read from storage. |
| defaultValue | `T` | The default value if the key is not available |

**Returns:** `T` A value of type T stored under the given key.

### getSome

▸ **getSome**&lt;`T`&gt;\(key: _`string`_\): `T`

_Defined in_ [_storage.ts:174_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/storage.ts#L174)

Gets given generic value stored under the key. Key is encoded as UTF-8 strings. Supported types: bool, integer, string and data objects defined in model.ts. This function will throw if throw if the key does not exist in the storage.

**Type parameters:**

#### T

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| key | `string` | A key to read from storage. |

**Returns:** `T` A value of type T stored under the given key.

### getString

▸ **getString**\(key: _`string`_\): `string` \| `null`

_Defined in_ [_storage.ts:59_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/storage.ts#L59)

Get string value stored under given key. Both key and value are encoded as UTF-8 strings.

**Parameters:**

| Name | Type |
| :--- | :--- |
| key | `string` |

**Returns:** `string` \| `null`

### hasKey

▸ **hasKey**\(key: _`string`_\): `bool`

_Defined in_ [_storage.ts:96_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/storage.ts#L96)

**Parameters:**

| Name | Type |
| :--- | :--- |
| key | `string` |

**Returns:** `bool`

### keyRange

▸ **keyRange**\(start: _`string`_, end: _`string`_, limit?: _`i32`_\): `string`\[\]

_Defined in_ [_storage.ts:18_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/storage.ts#L18)

Returns list of keys between the given start key and the end key. Both inclusive. NOTE: Must be very careful to avoid exploding amount of compute with this method.

**Parameters:**

| Name | Type | Default value | Description |
| :--- | :--- | :--- | :--- |
| start | `string` | - | The start key used as a lower bound in lexicographical order. Inclusive. |
| end | `string` | - | The end key used as a upper bound in lexicographical order. Inclusive. |
| `Default value` limit | `i32` | -1 | The maximum number of keys to return. Default is \`-1\`, means no limit. |

**Returns:** `string`\[\]

### keys

▸ **keys**\(prefix: _`string`_, limit?: _`i32`_\): `string`\[\]

_Defined in_ [_storage.ts:37_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/storage.ts#L37)

Returns list of keys starting with given prefix. NOTE: Must be very careful to avoid exploding amount of compute with this method.

**Parameters:**

| Name | Type | Default value | Description |
| :--- | :--- | :--- | :--- |
| prefix | `string` | - | The key prefix. |
| `Default value` limit | `i32` | -1 | The maximum number of keys to return. Default is \`-1\`, means no limit. |

**Returns:** `string`\[\]

### set

▸ **set**&lt;`T`&gt;\(key: _`string`_, value: _`T`_\): `void`

_Defined in_ [_storage.ts:115_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/storage.ts#L115)

Stores given generic value under the key. Key is encoded as UTF-8 strings. Supported types: bool, integer, string and data objects defined in model.ts.

**Type parameters:**

#### T

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| key | `string` | A key to use for storage. |
| value | `T` | A value to store. |

**Returns:** `void`

### setBytes

▸ **setBytes**\(key: _`string`_, value: _`Uint8Array`_\): `void`

_Defined in_ [_storage.ts:70_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/storage.ts#L70)

Store byte array under given key. Key is encoded as UTF-8 strings. Byte array stored as is.

It's convenient to use this together with `domainObject.encode()`.

**Parameters:**

| Name | Type |
| :--- | :--- |
| key | `string` |
| value | `Uint8Array` |

**Returns:** `void`

### setString

▸ **setString**\(key: _`string`_, value: _`string`_\): `void`

_Defined in_ [_storage.ts:48_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/storage.ts#L48)

Store string value under given key. Both key and value are encoded as UTF-8 strings.

**Parameters:**

| Name | Type |
| :--- | :--- |
| key | `string` |
| value | `string` |

**Returns:** `void`

