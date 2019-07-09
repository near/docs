---
name: TypeScript
route: /lib/ts
menu: Smart Contract API
---

# TypeScript Runtime

## TypeScript

Smart contracts are written in [TypeScript](./). Here is the API reference for the runtime. Note that it's in active development, so please add an issue on Github if this is out of date and we'll fix it right away!

## External module: "near"

### Index

#### Modules

* [collections](modules/collections.md)
* [near](modules/utility-module-near.md)

#### Classes

* Collections
  * [Map](classes/collections/map.md)
  * [Deque](classes/collections/deque.md)
  * [Vector](classes/collections/vector.md)
* [Context](classes/context.md)
* [ContractPromise](classes/contractpromise-contractpromiseresult.md) [ContractPromiseResult](classes/contractpromise-contractpromiseresult.md)
* [Storage](classes/storage.md)

#### Type aliases

* DataTypeIndex

#### Variables

* DATA\_TYPE\_CURRENT\_ACCOUNT\_ID
* DATA\_TYPE\_INPUT
* DATA\_TYPE\_ORIGINATOR\_ACCOUNT\_ID
* DATA\_TYPE\_RESULT
* DATA\_TYPE\_STORAGE
* DATA\_TYPE\_STORAGE\_ITER
* DEFAULT\_SCRATCH\_BUFFER\_SIZE
* context
* storage

#### Functions

* data\_read
* promise\_and
* promise\_create
* promise\_then
* result\_count
* result\_is\_ok
* return\_promise
* return\_value
* storage\_has\_key
* storage\_iter
* storage\_iter\_next
* storage\_remove
* storage\_write

### Type aliases

#### DataTypeIndex     <a id="datatypeindex"></a>

**Ƭ DataTypeIndex**: `u32`

_Defined in_ [_near.ts:3_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L3)

### Variables

#### `<Const>` DATA\_TYPE\_CURRENT\_ACCOUNT\_ID     <a id="data_type_current_account_id"></a>

**● DATA\_TYPE\_CURRENT\_ACCOUNT\_ID**: [_DataTypeIndex_](https://github.com/nearprotocol/docs/tree/02f899c11ed02bb3a999e4e86904f6a23c31ca4c/docs/client-api/ts/_near_.md#datatypeindex) = 2

_Defined in_ [_near.ts:6_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L6)

#### `<Const>` DATA\_TYPE\_INPUT     <a id="data_type_input"></a>

**● DATA\_TYPE\_INPUT**: [_DataTypeIndex_](https://github.com/nearprotocol/docs/tree/02f899c11ed02bb3a999e4e86904f6a23c31ca4c/docs/client-api/ts/_near_.md#datatypeindex) = 4

_Defined in_ [_near.ts:8_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L8)

#### `<Const>` DATA\_TYPE\_ORIGINATOR\_ACCOUNT\_ID     <a id="data_type_originator_account_id"></a>

**● DATA\_TYPE\_ORIGINATOR\_ACCOUNT\_ID**: [_DataTypeIndex_](https://github.com/nearprotocol/docs/tree/02f899c11ed02bb3a999e4e86904f6a23c31ca4c/docs/client-api/ts/_near_.md#datatypeindex) = 1

_Defined in_ [_near.ts:5_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L5)

#### `<Const>` DATA\_TYPE\_RESULT     <a id="data_type_result"></a>

**● DATA\_TYPE\_RESULT**: [_DataTypeIndex_](https://github.com/nearprotocol/docs/tree/02f899c11ed02bb3a999e4e86904f6a23c31ca4c/docs/client-api/ts/_near_.md#datatypeindex) = 5

_Defined in_ [_near.ts:9_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L9)

#### `<Const>` DATA\_TYPE\_STORAGE     <a id="data_type_storage"></a>

**● DATA\_TYPE\_STORAGE**: [_DataTypeIndex_](https://github.com/nearprotocol/docs/tree/02f899c11ed02bb3a999e4e86904f6a23c31ca4c/docs/client-api/ts/_near_.md#datatypeindex) = 3

_Defined in_ [_near.ts:7_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L7)

#### `<Const>` DATA\_TYPE\_STORAGE\_ITER     <a id="data_type_storage_iter"></a>

**● DATA\_TYPE\_STORAGE\_ITER**: [_DataTypeIndex_](https://github.com/nearprotocol/docs/tree/02f899c11ed02bb3a999e4e86904f6a23c31ca4c/docs/client-api/ts/_near_.md#datatypeindex) = 6

_Defined in_ [_near.ts:10_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L10)

#### `<Const>` DEFAULT\_SCRATCH\_BUFFER\_SIZE     <a id="default_scratch_buffer_size"></a>

**● DEFAULT\_SCRATCH\_BUFFER\_SIZE**: `usize` = 1 &lt;&lt; 16

_Defined in_ [_near.ts:1_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L1)

#### `<Let>` context     <a id="context-1"></a>

**● context**: [_Context_](https://github.com/nearprotocol/docs/tree/02f899c11ed02bb3a999e4e86904f6a23c31ca4c/docs/client-api/classes/_near_.context.md) = new Context\(\)

_Defined in_ [_near.ts:789_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L789)

#### `<Let>` storage     <a id="storage-1"></a>

**● storage**: [_Storage_](https://github.com/nearprotocol/docs/tree/02f899c11ed02bb3a999e4e86904f6a23c31ca4c/docs/client-api/classes/_near_.storage.md) = new Storage\(\)

_Defined in_ [_near.ts:220_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L220)

An instance of a Storage class that is used for working with contract storage on the blockchain.

### Functions

#### data\_read     <a id="data_read"></a>

▸ **data\_read**\(type\_index: `u32`, key\_len: `usize`, key: `usize`, max\_buf\_len: `usize`, buf\_ptr: `usize`\): `usize`

_Defined in_ [_near.ts:992_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L992)

**Parameters:**

| Name | Type |
| :--- | :--- |
| type\_index | `u32` |
| key\_len | `usize` |
| key | `usize` |
| max\_buf\_len | `usize` |
| buf\_ptr | `usize` |

**Returns:** `usize`

#### promise\_and     <a id="promise_and"></a>

▸ **promise\_and**\(promise\_index1: `u32`, promise\_index2: `u32`\): `u32`

_Defined in_ [_near.ts:1010_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L1010)

**Parameters:**

| Name | Type |
| :--- | :--- |
| promise\_index1 | `u32` |
| promise\_index2 | `u32` |

**Returns:** `u32`

#### promise\_create     <a id="promise_create"></a>

▸ **promise\_create**\(account\_id\_len: `usize`, account\_id\_ptr: `usize`, method\_name\_len: `usize`, method\_name\_ptr: `usize`, args\_len: `usize`, args\_ptr: `usize`, mana: `u32`, amount: `u64`\): `u32`

_Defined in_ [_near.ts:995_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L995)

**Parameters:**

| Name | Type |
| :--- | :--- |
| account\_id\_len | `usize` |
| account\_id\_ptr | `usize` |
| method\_name\_len | `usize` |
| method\_name\_ptr | `usize` |
| args\_len | `usize` |
| args\_ptr | `usize` |
| mana | `u32` |
| amount | `u64` |

**Returns:** `u32`

#### promise\_then     <a id="promise_then"></a>

▸ **promise\_then**\(promise\_index: `u32`, method\_name\_len: `usize`, method\_name\_ptr: `usize`, args\_len: `usize`, args\_ptr: `usize`, mana: `u32`\): `u32`

_Defined in_ [_near.ts:1003_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L1003)

**Parameters:**

| Name | Type |
| :--- | :--- |
| promise\_index | `u32` |
| method\_name\_len | `usize` |
| method\_name\_ptr | `usize` |
| args\_len | `usize` |
| args\_ptr | `usize` |
| mana | `u32` |

**Returns:** `u32`

#### result\_count     <a id="result_count"></a>

▸ **result\_count**\(\): `u32`

_Defined in_ [_near.ts:982_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L982)

**Returns:** `u32`

#### result\_is\_ok     <a id="result_is_ok"></a>

▸ **result\_is\_ok**\(index: `u32`\): `bool`

_Defined in_ [_near.ts:984_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L984)

**Parameters:**

| Name | Type |
| :--- | :--- |
| index | `u32` |

**Returns:** `bool`

#### return\_promise     <a id="return_promise"></a>

▸ **return\_promise**\(promise\_index: `u32`\): `void`

_Defined in_ [_near.ts:989_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L989)

**Parameters:**

| Name | Type |
| :--- | :--- |
| promise\_index | `u32` |

**Returns:** `void`

#### return\_value     <a id="return_value"></a>

▸ **return\_value**\(value\_len: `usize`, value\_ptr: `usize`\): `void`

_Defined in_ [_near.ts:987_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L987)

**Parameters:**

| Name | Type |
| :--- | :--- |
| value\_len | `usize` |
| value\_ptr | `usize` |

**Returns:** `void`

#### storage\_has\_key     <a id="storage_has_key"></a>

▸ **storage\_has\_key**\(key\_len: `usize`, key\_ptr: `usize`\): `bool`

_Defined in_ [_near.ts:975_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L975)

**Parameters:**

| Name | Type |
| :--- | :--- |
| key\_len | `usize` |
| key\_ptr | `usize` |

**Returns:** `bool`

#### storage\_iter     <a id="storage_iter"></a>

▸ **storage\_iter**\(prefix\_len: `usize`, prefix\_ptr: `usize`\): `u32`

_Defined in_ [_near.ts:977_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L977)

**Parameters:**

| Name | Type |
| :--- | :--- |
| prefix\_len | `usize` |
| prefix\_ptr | `usize` |

**Returns:** `u32`

#### storage\_iter\_next     <a id="storage_iter_next"></a>

▸ **storage\_iter\_next**\(id: `u32`\): `u32`

_Defined in_ [_near.ts:979_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L979)

**Parameters:**

| Name | Type |
| :--- | :--- |
| id | `u32` |

**Returns:** `u32`

#### storage\_remove     <a id="storage_remove"></a>

▸ **storage\_remove**\(key\_len: `usize`, key\_ptr: `usize`\): `void`

_Defined in_ [_near.ts:973_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L973)

**Parameters:**

| Name | Type |
| :--- | :--- |
| key\_len | `usize` |
| key\_ptr | `usize` |

**Returns:** `void`

#### storage\_write     <a id="storage_write"></a>

▸ **storage\_write**\(key\_len: `usize`, key\_ptr: `usize`, value\_len: `usize`, value\_ptr: `usize`\): `void`

_Defined in_ [_near.ts:971_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L971)

**Parameters:**

| Name | Type |
| :--- | :--- |
| key\_len | `usize` |
| key\_ptr | `usize` |
| value\_len | `usize` |
| value\_ptr | `usize` |

**Returns:** `void`

