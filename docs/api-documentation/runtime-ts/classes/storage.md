# Class: Storage

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

---

## Methods


###  contains

▸ **contains**(key: *`string`*): `bool`

*Defined in [storage.ts:90](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/storage.ts#L90)*

Returns true if the given key is present in the storage.

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `string` |

**Returns:** `bool`

___

###  delete

▸ **delete**(key: *`string`*): `void`

*Defined in [storage.ts:103](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/storage.ts#L103)*

Deletes a given key from the storage.

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `string` |

**Returns:** `void`

___

###  get

▸ **get**<`T`>(key: *`string`*, defaultValue?: *`T` \| `null`*): `T` \| `null`

*Defined in [storage.ts:138](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/storage.ts#L138)*

Gets given generic value stored under the key. Key is encoded as UTF-8 strings. Supported types: string and data objects defined in model.ts. Please use getPrimitive for getting primitives with a default value, and getSome for primitives and non-primitives in case it's known that a particular key exists.

**Type parameters:**

#### T 
**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| key | `string` | - |  A key to read from storage. |
| `Default value` defaultValue | `T` \| `null` |  null |  The default value if the key is not available |

**Returns:** `T` \| `null`
A value of type T stored under the given key.

___

###  getBytes

▸ **getBytes**(key: *`string`*): `Uint8Array` \| `null`

*Defined in [storage.ts:83](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/storage.ts#L83)*

Get byte array stored under given key. Key is encoded as UTF-8 strings. Byte array stored as is.

It's convenient to use this together with `DomainObject.decode()`.

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `string` |

**Returns:** `Uint8Array` \| `null`

___

###  getPrimitive

▸ **getPrimitive**<`T`>(key: *`string`*, defaultValue: *`T`*): `T`

*Defined in [storage.ts:156](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/storage.ts#L156)*

Gets given generic value stored under the key. Key is encoded as UTF-8 strings. Supported types: bool, integer.

**Type parameters:**

#### T 
**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| key | `string` |  A key to read from storage. |
| defaultValue | `T` |  The default value if the key is not available |

**Returns:** `T`
A value of type T stored under the given key.

___

###  getSome

▸ **getSome**<`T`>(key: *`string`*): `T`

*Defined in [storage.ts:174](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/storage.ts#L174)*

Gets given generic value stored under the key. Key is encoded as UTF-8 strings. Supported types: bool, integer, string and data objects defined in model.ts. This function will throw if throw if the key does not exist in the storage.

**Type parameters:**

#### T 
**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| key | `string` |  A key to read from storage. |

**Returns:** `T`
A value of type T stored under the given key.

___

###  getString

▸ **getString**(key: *`string`*): `string` \| `null`

*Defined in [storage.ts:59](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/storage.ts#L59)*

Get string value stored under given key. Both key and value are encoded as UTF-8 strings.

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `string` |

**Returns:** `string` \| `null`

___

###  hasKey

▸ **hasKey**(key: *`string`*): `bool`

*Defined in [storage.ts:96](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/storage.ts#L96)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `string` |

**Returns:** `bool`

___

###  keyRange

▸ **keyRange**(start: *`string`*, end: *`string`*, limit?: *`i32`*): `string`[]

*Defined in [storage.ts:18](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/storage.ts#L18)*

Returns list of keys between the given start key and the end key. Both inclusive. NOTE: Must be very careful to avoid exploding amount of compute with this method.

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| start | `string` | - |  The start key used as a lower bound in lexicographical order. Inclusive. |
| end | `string` | - |  The end key used as a upper bound in lexicographical order. Inclusive. |
| `Default value` limit | `i32` |  -1 |  The maximum number of keys to return. Default is \`-1\`, means no limit. |

**Returns:** `string`[]

___

###  keys

▸ **keys**(prefix: *`string`*, limit?: *`i32`*): `string`[]

*Defined in [storage.ts:37](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/storage.ts#L37)*

Returns list of keys starting with given prefix. NOTE: Must be very careful to avoid exploding amount of compute with this method.

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| prefix | `string` | - |  The key prefix. |
| `Default value` limit | `i32` |  -1 |  The maximum number of keys to return. Default is \`-1\`, means no limit. |

**Returns:** `string`[]

___

###  set

▸ **set**<`T`>(key: *`string`*, value: *`T`*): `void`

*Defined in [storage.ts:115](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/storage.ts#L115)*

Stores given generic value under the key. Key is encoded as UTF-8 strings. Supported types: bool, integer, string and data objects defined in model.ts.

**Type parameters:**

#### T 
**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| key | `string` |  A key to use for storage. |
| value | `T` |  A value to store. |

**Returns:** `void`

___

###  setBytes

▸ **setBytes**(key: *`string`*, value: *`Uint8Array`*): `void`

*Defined in [storage.ts:70](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/storage.ts#L70)*

Store byte array under given key. Key is encoded as UTF-8 strings. Byte array stored as is.

It's convenient to use this together with `domainObject.encode()`.

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `string` |
| value | `Uint8Array` |

**Returns:** `void`

___

###  setString

▸ **setString**(key: *`string`*, value: *`string`*): `void`

*Defined in [storage.ts:48](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/storage.ts#L48)*

Store string value under given key. Both key and value are encoded as UTF-8 strings.

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `string` |
| value | `string` |

**Returns:** `void`

___

