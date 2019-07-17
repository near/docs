[near-runtime-ts](../README.md) > ["near"](../modules/_near_.md)

# External module: "near"

## Index

### Modules

* [base64](_near_.base64.md)
* [collections](_near_.collections.md)
* [near](_near_.near.md)

### Classes

* [Context](../classes/_near_.context.md)
* [ContractPromise](../classes/_near_.contractpromise.md)
* [ContractPromiseResult](../classes/_near_.contractpromiseresult.md)
* [Storage](../classes/_near_.storage.md)

### Type aliases

* [DataTypeIndex](_near_.md#datatypeindex)

### Variables

* [DATA_TYPE_CURRENT_ACCOUNT_ID](_near_.md#data_type_current_account_id)
* [DATA_TYPE_INPUT](_near_.md#data_type_input)
* [DATA_TYPE_ORIGINATOR_ACCOUNT_ID](_near_.md#data_type_originator_account_id)
* [DATA_TYPE_RESULT](_near_.md#data_type_result)
* [DATA_TYPE_STORAGE](_near_.md#data_type_storage)
* [DATA_TYPE_STORAGE_ITER](_near_.md#data_type_storage_iter)
* [DEFAULT_SCRATCH_BUFFER_SIZE](_near_.md#default_scratch_buffer_size)
* [context](_near_.md#context-1)
* [storage](_near_.md#storage-1)

### Functions

* [check_ethash](_near_.md#check_ethash)
* [data_read](_near_.md#data_read)
* [promise_and](_near_.md#promise_and)
* [promise_create](_near_.md#promise_create)
* [promise_then](_near_.md#promise_then)
* [result_count](_near_.md#result_count)
* [result_is_ok](_near_.md#result_is_ok)
* [return_promise](_near_.md#return_promise)
* [return_value](_near_.md#return_value)
* [storage_has_key](_near_.md#storage_has_key)
* [storage_iter](_near_.md#storage_iter)
* [storage_iter_next](_near_.md#storage_iter_next)
* [storage_range](_near_.md#storage_range)
* [storage_remove](_near_.md#storage_remove)
* [storage_write](_near_.md#storage_write)

---

## Type aliases

<a id="datatypeindex"></a>

###  DataTypeIndex

**Ƭ DataTypeIndex**: *`u32`*

*Defined in [near.ts:5](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L5)*

___

## Variables

<a id="data_type_current_account_id"></a>

### `<Const>` DATA_TYPE_CURRENT_ACCOUNT_ID

**● DATA_TYPE_CURRENT_ACCOUNT_ID**: *[DataTypeIndex](_near_.md#datatypeindex)* = 2

*Defined in [near.ts:8](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L8)*

___
<a id="data_type_input"></a>

### `<Const>` DATA_TYPE_INPUT

**● DATA_TYPE_INPUT**: *[DataTypeIndex](_near_.md#datatypeindex)* = 4

*Defined in [near.ts:10](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L10)*

___
<a id="data_type_originator_account_id"></a>

### `<Const>` DATA_TYPE_ORIGINATOR_ACCOUNT_ID

**● DATA_TYPE_ORIGINATOR_ACCOUNT_ID**: *[DataTypeIndex](_near_.md#datatypeindex)* = 1

*Defined in [near.ts:7](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L7)*

___
<a id="data_type_result"></a>

### `<Const>` DATA_TYPE_RESULT

**● DATA_TYPE_RESULT**: *[DataTypeIndex](_near_.md#datatypeindex)* = 5

*Defined in [near.ts:11](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L11)*

___
<a id="data_type_storage"></a>

### `<Const>` DATA_TYPE_STORAGE

**● DATA_TYPE_STORAGE**: *[DataTypeIndex](_near_.md#datatypeindex)* = 3

*Defined in [near.ts:9](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L9)*

___
<a id="data_type_storage_iter"></a>

### `<Const>` DATA_TYPE_STORAGE_ITER

**● DATA_TYPE_STORAGE_ITER**: *[DataTypeIndex](_near_.md#datatypeindex)* = 6

*Defined in [near.ts:12](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L12)*

___
<a id="default_scratch_buffer_size"></a>

### `<Const>` DEFAULT_SCRATCH_BUFFER_SIZE

**● DEFAULT_SCRATCH_BUFFER_SIZE**: *`usize`* =  1 << 16

*Defined in [near.ts:3](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L3)*

___
<a id="context-1"></a>

### `<Let>` context

**● context**: *[Context](../classes/_near_.context.md)* =  new Context()

*Defined in [near.ts:1079](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1079)*

___
<a id="storage-1"></a>

### `<Let>` storage

**● storage**: *[Storage](../classes/_near_.storage.md)* =  new Storage()

*Defined in [near.ts:247](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L247)*

An instance of a Storage class that is used for working with contract storage on the blockchain.

___

## Functions

<a id="check_ethash"></a>

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

___
<a id="data_read"></a>

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

___
<a id="promise_and"></a>

###  promise_and

▸ **promise_and**(promise_index1: *`u32`*, promise_index2: *`u32`*): `u32`

*Defined in [near.ts:1507](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1507)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| promise_index1 | `u32` |
| promise_index2 | `u32` |

**Returns:** `u32`

___
<a id="promise_create"></a>

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

___
<a id="promise_then"></a>

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

___
<a id="result_count"></a>

###  result_count

▸ **result_count**(): `u32`

*Defined in [near.ts:1480](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1480)*

**Returns:** `u32`

___
<a id="result_is_ok"></a>

###  result_is_ok

▸ **result_is_ok**(index: *`u32`*): `bool`

*Defined in [near.ts:1482](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1482)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| index | `u32` |

**Returns:** `bool`

___
<a id="return_promise"></a>

###  return_promise

▸ **return_promise**(promise_index: *`u32`*): `void`

*Defined in [near.ts:1487](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1487)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| promise_index | `u32` |

**Returns:** `void`

___
<a id="return_value"></a>

###  return_value

▸ **return_value**(value_len: *`usize`*, value_ptr: *`usize`*): `void`

*Defined in [near.ts:1485](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1485)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| value_len | `usize` |
| value_ptr | `usize` |

**Returns:** `void`

___
<a id="storage_has_key"></a>

###  storage_has_key

▸ **storage_has_key**(key_len: *`usize`*, key_ptr: *`usize`*): `bool`

*Defined in [near.ts:1471](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1471)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| key_len | `usize` |
| key_ptr | `usize` |

**Returns:** `bool`

___
<a id="storage_iter"></a>

###  storage_iter

▸ **storage_iter**(prefix_len: *`usize`*, prefix_ptr: *`usize`*): `u32`

*Defined in [near.ts:1473](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1473)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| prefix_len | `usize` |
| prefix_ptr | `usize` |

**Returns:** `u32`

___
<a id="storage_iter_next"></a>

###  storage_iter_next

▸ **storage_iter_next**(id: *`u32`*): `u32`

*Defined in [near.ts:1477](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1477)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| id | `u32` |

**Returns:** `u32`

___
<a id="storage_range"></a>

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

___
<a id="storage_remove"></a>

###  storage_remove

▸ **storage_remove**(key_len: *`usize`*, key_ptr: *`usize`*): `void`

*Defined in [near.ts:1469](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1469)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| key_len | `usize` |
| key_ptr | `usize` |

**Returns:** `void`

___
<a id="storage_write"></a>

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

___

