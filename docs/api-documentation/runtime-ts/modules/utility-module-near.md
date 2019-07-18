# Module: near

## Index

### Classes

* [MapEntry](../classes/_near_.near.mapentry.md)

### Functions

* [base58](_near_.near.md#base58)
* [bytesToString](_near_.near.md#bytestostring)
* [hash](_near_.near.md#hash)
* [hash32](_near_.near.md#hash32)
* [log](_near_.near.md#log)
* [parseFromBytes](_near_.near.md#parsefrombytes)
* [parseFromString](_near_.near.md#parsefromstring)
* [random32](_near_.near.md#random32)
* [randomBuffer](_near_.near.md#randombuffer)
* [str](_near_.near.md#str)
* [stringToBytes](_near_.near.md#stringtobytes)

---

## Functions


###  base58

▸ **base58**(source: *`Uint8Array`*): `string`

*Defined in [near.ts:1209](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1209)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| source | `Uint8Array` |

**Returns:** `string`

---

###  bytesToString

▸ **bytesToString**(bytes: *`Uint8Array`*): `string`

*Defined in [near.ts:1131](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1131)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| bytes | `Uint8Array` |

**Returns:** `string`

---

###  hash

▸ **hash**<`T`>(data: *`T`*): `Uint8Array`

*Defined in [near.ts:1159](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1159)*

Hash given data. Returns hash as 32-byte array.

**Type parameters:**

#### T 
**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| data | `T` |  data can be passed as either Uint8Array or anything with .toString (hashed as UTF-8 string). |

**Returns:** `Uint8Array`

---

###  hash32

▸ **hash32**<`T`>(data: *`T`*): `u32`

*Defined in [near.ts:1174](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1174)*

Hash given data. Returns hash as 32-bit integer.

**Type parameters:**

#### T 
**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| data | `T` |  data can be passed as either Uint8Array or anything with .toString (hashed as UTF-8 string). |

**Returns:** `u32`

---

###  log

▸ **log**(msg: *`string`*): `void`

*Defined in [near.ts:1200](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1200)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| msg | `string` |

**Returns:** `void`

---

###  parseFromBytes

▸ **parseFromBytes**<`T`>(bytes: *`Uint8Array`*, defaultValue?: *`T`*): `T`

*Defined in [near.ts:1119](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1119)*

Parses the given bytes array to return a value of the given generic type. Supported types: bool, integer, string and data objects defined in model.ts.

**Type parameters:**

#### T 
**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| bytes | `Uint8Array` | - |  Bytes to parse. |
| `Default value` defaultValue | `T` |  null |  The default value if the bytes are null |

**Returns:** `T`
A parsed value of type T.

---

###  parseFromString

▸ **parseFromString**<`T`>(s: *`string`*, defaultValue?: *`T`*): `T`

*Defined in [near.ts:1091](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1091)*

Parses the given string to return a value of the given generic type. Supported types: bool, integer, string and data objects defined in model.ts.

**Type parameters:**

#### T 
**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| s | `string` | - |  String to parse. |
| `Default value` defaultValue | `T` |  null |  The default value if the string is null |

**Returns:** `T`
A parsed value of type T.

---

###  random32

▸ **random32**(): `u32`

*Defined in [near.ts:1196](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1196)*

Returns random 32-bit integer.

**Returns:** `u32`

---

###  randomBuffer

▸ **randomBuffer**(len: *`u32`*): `Uint8Array`

*Defined in [near.ts:1187](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1187)*

Returns random byte buffer of given length.

**Parameters:**

| Name | Type |
| ------ | ------ |
| len | `u32` |

**Returns:** `Uint8Array`

---

###  str

▸ **str**<`T`>(value: *`T`*): `string`

*Defined in [near.ts:1204](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1204)*

**Type parameters:**

#### T 
**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `T` |

**Returns:** `string`

---

###  stringToBytes

▸ **stringToBytes**(s: *`string`*): `Uint8Array`

*Defined in [near.ts:1135](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1135)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| s | `string` |

**Returns:** `Uint8Array`

---


# External module: "near"

## Index

### Modules

* base64
* collections
* near

### Classes

* Context
* ContractPromise
* ContractPromiseResult
* Storage

### Type aliases

* DataTypeIndex

### Variables

* DATA_TYPE_CURRENT_ACCOUNT_ID
* DATA_TYPE_INPUT
* DATA_TYPE_ORIGINATOR_ACCOUNT_ID
* DATA_TYPE_RESULT
* DATA_TYPE_STORAGE
* DATA_TYPE_STORAGE_ITER
* DEFAULT_SCRATCH_BUFFER_SIZE
* context
* storage

### Functions

* check_ethash
* data_read
* promise_and
* promise_create
* promise_then
* result_count
* result_is_ok
* return_promise
* return_value
* storage_has_key
* storage_iter
* storage_iter_next
* storage_range
* storage_remove
* storage_write

---

## Type aliases


###  DataTypeIndex

**Ƭ DataTypeIndex**: *`u32`*

*Defined in [near.ts:5](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L5)*

---

## Variables


### `<Const>` DATA_TYPE_CURRENT_ACCOUNT_ID

**● DATA_TYPE_CURRENT_ACCOUNT_ID**: *[DataTypeIndex](_near_.md#datatypeindex)* = 2

*Defined in [near.ts:8](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L8)*

---

### `<Const>` DATA_TYPE_INPUT

**● DATA_TYPE_INPUT**: *[DataTypeIndex](_near_.md#datatypeindex)* = 4

*Defined in [near.ts:10](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L10)*

---

### `<Const>` DATA_TYPE_ORIGINATOR_ACCOUNT_ID

**● DATA_TYPE_ORIGINATOR_ACCOUNT_ID**: *[DataTypeIndex](_near_.md#datatypeindex)* = 1

*Defined in [near.ts:7](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L7)*

---

### `<Const>` DATA_TYPE_RESULT

**● DATA_TYPE_RESULT**: *[DataTypeIndex](_near_.md#datatypeindex)* = 5

*Defined in [near.ts:11](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L11)*

---

### `<Const>` DATA_TYPE_STORAGE

**● DATA_TYPE_STORAGE**: *[DataTypeIndex](_near_.md#datatypeindex)* = 3

*Defined in [near.ts:9](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L9)*

---

### `<Const>` DATA_TYPE_STORAGE_ITER

**● DATA_TYPE_STORAGE_ITER**: *[DataTypeIndex](_near_.md#datatypeindex)* = 6

*Defined in [near.ts:12](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L12)*

---

### `<Const>` DEFAULT_SCRATCH_BUFFER_SIZE

**● DEFAULT_SCRATCH_BUFFER_SIZE**: *`usize`* =  1 << 16

*Defined in [near.ts:3](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L3)*

---

### `<Let>` context

**● context**: *[Context](../classes/_near_.context.md)* =  new Context()

*Defined in [near.ts:1079](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1079)*

---

### `<Let>` storage

**● storage**: *[Storage](../classes/_near_.storage.md)* =  new Storage()

*Defined in [near.ts:247](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L247)*

An instance of a Storage class that is used for working with contract storage on the blockchain.

---

## Functions


###  check_ethash

▸ **check_ethash**(block_number: *`u64`*, header_hash_ptr: *`usize`*, header_hash_len: *`u32`*, nonce: *`u64`*, mix_hash_ptr: *`usize`*, mix_hash_len: *`u32`*, difficulty: *`u64`*): `bool`

*Defined in [near.ts:1510](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1510)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| block_number | `u64` |
| header_hash_ptr | `usize` |
| header_hash_len | `u32` |
| nonce | `u64` |
| mix_hash_ptr | `usize` |
| mix_hash_len | `u32` |
| difficulty | `u64` |

**Returns:** `bool`

---

###  data_read

▸ **data_read**(type_index: *`u32`*, key_len: *`usize`*, key: *`usize`*, max_buf_len: *`usize`*, buf_ptr: *`usize`*): `usize`

*Defined in [near.ts:1490](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1490)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| type_index | `u32` |
| key_len | `usize` |
| key | `usize` |
| max_buf_len | `usize` |
| buf_ptr | `usize` |

**Returns:** `usize`

---

###  promise_and

▸ **promise_and**(promise_index1: *`u32`*, promise_index2: *`u32`*): `u32`

*Defined in [near.ts:1507](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1507)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| promise_index1 | `u32` |
| promise_index2 | `u32` |

**Returns:** `u32`

---

###  promise_create

▸ **promise_create**(account_id_len: *`usize`*, account_id_ptr: *`usize`*, method_name_len: *`usize`*, method_name_ptr: *`usize`*, args_len: *`usize`*, args_ptr: *`usize`*, amount_ptr: *`usize`*): `u32`

*Defined in [near.ts:1493](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1493)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| account_id_len | `usize` |
| account_id_ptr | `usize` |
| method_name_len | `usize` |
| method_name_ptr | `usize` |
| args_len | `usize` |
| args_ptr | `usize` |
| amount_ptr | `usize` |

**Returns:** `u32`

---

###  promise_then

▸ **promise_then**(promise_index: *`u32`*, method_name_len: *`usize`*, method_name_ptr: *`usize`*, args_len: *`usize`*, args_ptr: *`usize`*, amount_ptr: *`usize`*): `u32`

*Defined in [near.ts:1500](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1500)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| promise_index | `u32` |
| method_name_len | `usize` |
| method_name_ptr | `usize` |
| args_len | `usize` |
| args_ptr | `usize` |
| amount_ptr | `usize` |

**Returns:** `u32`

---

###  result_count

▸ **result_count**(): `u32`

*Defined in [near.ts:1480](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1480)*

**Returns:** `u32`

---

###  result_is_ok

▸ **result_is_ok**(index: *`u32`*): `bool`

*Defined in [near.ts:1482](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1482)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| index | `u32` |

**Returns:** `bool`

---

###  return_promise

▸ **return_promise**(promise_index: *`u32`*): `void`

*Defined in [near.ts:1487](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1487)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| promise_index | `u32` |

**Returns:** `void`

---

###  return_value

▸ **return_value**(value_len: *`usize`*, value_ptr: *`usize`*): `void`

*Defined in [near.ts:1485](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1485)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| value_len | `usize` |
| value_ptr | `usize` |

**Returns:** `void`

---

###  storage_has_key

▸ **storage_has_key**(key_len: *`usize`*, key_ptr: *`usize`*): `bool`

*Defined in [near.ts:1471](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1471)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| key_len | `usize` |
| key_ptr | `usize` |

**Returns:** `bool`

---

###  storage_iter

▸ **storage_iter**(prefix_len: *`usize`*, prefix_ptr: *`usize`*): `u32`

*Defined in [near.ts:1473](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1473)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| prefix_len | `usize` |
| prefix_ptr | `usize` |

**Returns:** `u32`

---

###  storage_iter_next

▸ **storage_iter_next**(id: *`u32`*): `u32`

*Defined in [near.ts:1477](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1477)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| id | `u32` |

**Returns:** `u32`

---

###  storage_range

▸ **storage_range**(start_len: *`usize`*, start_ptr: *`usize`*, end_len: *`usize`*, end_ptr: *`usize`*): `u32`

*Defined in [near.ts:1475](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1475)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| start_len | `usize` |
| start_ptr | `usize` |
| end_len | `usize` |
| end_ptr | `usize` |

**Returns:** `u32`

---

###  storage_remove

▸ **storage_remove**(key_len: *`usize`*, key_ptr: *`usize`*): `void`

*Defined in [near.ts:1469](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1469)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| key_len | `usize` |
| key_ptr | `usize` |

**Returns:** `void`

---

###  storage_write

▸ **storage_write**(key_len: *`usize`*, key_ptr: *`usize`*, value_len: *`usize`*, value_ptr: *`usize`*): `void`

*Defined in [near.ts:1467](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1467)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| key_len | `usize` |
| key_ptr | `usize` |
| value_len | `usize` |
| value_ptr | `usize` |

**Returns:** `void`

---

