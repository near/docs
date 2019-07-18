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
* getItem
* getString
* getU64
* hasKey
* keyRange
* keys
* remove
* removeItem
* set
* setBytes
* setItem
* setString
* setU64

---

## Methods


###  contains

▸ **contains**(key: *`string`*): `bool`

*Defined in [near.ts:115](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L115)*

Returns true if the given key is present in the storage.

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `string` |

**Returns:** `bool`

---

###  delete

▸ **delete**(key: *`string`*): `void`

*Defined in [near.ts:124](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L124)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `string` |

**Returns:** `void`

---

###  get

▸ **get**<`T`>(key: *`string`*, defaultValue?: *`T`*): `T`

*Defined in [near.ts:187](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L187)*

Gets given generic value stored under the key. Key is encoded as UTF-8 strings. Supported types: bool, integer, string and data objects defined in model.ts.

**Type parameters:**

#### T 
**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| key | `string` | - |  A key to read from storage. |
| `Default value` defaultValue | `T` |  null |  The default value if the key is not available |

**Returns:** `T`
A value of type T stored under the given key.

---

###  getBytes

▸ **getBytes**(key: *`string`*): `Uint8Array`

*Defined in [near.ts:108](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L108)*

Get byte array stored under given key. Key is encoded as UTF-8 strings. Byte array stored as is.

It's convenient to use this together with `DomainObject.decode()`.

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `string` |

**Returns:** `Uint8Array`

---

###  getItem

▸ **getItem**(key: *`string`*): `string`

*Defined in [near.ts:74](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L74)*

*__deprecated__*:
 Use getString or get

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `string` |

**Returns:** `string`

---

###  getString

▸ **getString**(key: *`string`*): `string`

*Defined in [near.ts:88](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L88)*

Get string value stored under given key. Both key and value are encoded as UTF-8 strings.

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `string` |

**Returns:** `string`

---

###  getU64

▸ **getU64**(key: *`string`*): `u64`

*Defined in [near.ts:158](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L158)*

Get 64-bit unsigned int stored under given key. Key is encoded as UTF-8 strings. Number is encoded as decimal string.

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `string` |

**Returns:** `u64`
int value or 0 if value is not found

---

###  hasKey

▸ **hasKey**(key: *`string`*): `bool`

*Defined in [near.ts:120](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L120)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `string` |

**Returns:** `bool`

---

###  keyRange

▸ **keyRange**(start: *`string`*, end: *`string`*, limit?: *`i32`*): `string`[]

*Defined in [near.ts:44](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L44)*

Returns list of keys between the given start key and the end key. Both inclusive. NOTE: Must be very careful to avoid exploding amount of compute with this method.

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| start | `string` | - |  The start key used as a lower bound in lexicographical order. Inclusive. |
| end | `string` | - |  The end key used as a upper bound in lexicographical order. Inclusive. |
| `Default value` limit | `i32` |  -1 |  The maximum number of keys to return. Default is \`-1\`, means no limit. |

**Returns:** `string`[]

---

###  keys

▸ **keys**(prefix: *`string`*, limit?: *`i32`*): `string`[]

*Defined in [near.ts:57](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L57)*

Returns list of keys starting with given prefix. NOTE: Must be very careful to avoid exploding amount of compute with this method.

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| prefix | `string` | - |  The key prefix. |
| `Default value` limit | `i32` |  -1 |  The maximum number of keys to return. Default is \`-1\`, means no limit. |

**Returns:** `string`[]

---

###  remove

▸ **remove**(key: *`string`*): `void`

*Defined in [near.ts:132](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L132)*

*__deprecated__*:
 Use #delete

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `string` |

**Returns:** `void`

---

###  removeItem

▸ **removeItem**(key: *`string`*): `void`

*Defined in [near.ts:140](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L140)*

*__deprecated__*:
 Use #delete

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `string` |

**Returns:** `void`

---

###  set

▸ **set**<`T`>(key: *`string`*, value: *`T`*): `void`

*Defined in [near.ts:169](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L169)*

Stores given generic value under the key. Key is encoded as UTF-8 strings. Supported types: bool, integer, string and data objects defined in model.ts.

**Type parameters:**

#### T 
**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| key | `string` |  A key to use for storage. |
| value | `T` |  A value to store. |

**Returns:** `void`

---

###  setBytes

▸ **setBytes**(key: *`string`*, value: *`Uint8Array`*): `void`

*Defined in [near.ts:98](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L98)*

Store byte array under given key. Key is encoded as UTF-8 strings. Byte array stored as is.

It's convenient to use this together with `domainObject.encode()`.

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `string` |
| value | `Uint8Array` |

**Returns:** `void`

---

###  setItem

▸ **setItem**(key: *`string`*, value: *`string`*): `void`

*Defined in [near.ts:67](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L67)*

*__deprecated__*:
 Use setString or set

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `string` |
| value | `string` |

**Returns:** `void`

---

###  setString

▸ **setString**(key: *`string`*, value: *`string`*): `void`

*Defined in [near.ts:81](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L81)*

Store string value under given key. Both key and value are encoded as UTF-8 strings.

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `string` |
| value | `string` |

**Returns:** `void`

---

###  setU64

▸ **setU64**(key: *`string`*, value: *`u64`*): `void`

*Defined in [near.ts:148](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L148)*

Store 64-bit unsigned int under given key. Key is encoded as UTF-8 strings. Number is encoded as decimal string.

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `string` |
| value | `u64` |

**Returns:** `void`

---

