# Utility module: near

## Module: near

### Index

#### Classes

* [MapEntry](https://github.com/nearprotocol/docs/tree/59dd4aad80e70dc96fa9fbff5f98c18d604a0fc3/docs/api-documentation/runtime-ts/classes/_near_.near.mapentry.md)

#### Functions

* [base58](https://github.com/nearprotocol/docs/tree/59dd4aad80e70dc96fa9fbff5f98c18d604a0fc3/docs/api-documentation/runtime-ts/modules/_near_.near.md#base58)
* [bytesToString](https://github.com/nearprotocol/docs/tree/59dd4aad80e70dc96fa9fbff5f98c18d604a0fc3/docs/api-documentation/runtime-ts/modules/_near_.near.md#bytestostring)
* [hash](https://github.com/nearprotocol/docs/tree/59dd4aad80e70dc96fa9fbff5f98c18d604a0fc3/docs/api-documentation/runtime-ts/modules/_near_.near.md#hash)
* [hash32](https://github.com/nearprotocol/docs/tree/59dd4aad80e70dc96fa9fbff5f98c18d604a0fc3/docs/api-documentation/runtime-ts/modules/_near_.near.md#hash32)
* [log](https://github.com/nearprotocol/docs/tree/59dd4aad80e70dc96fa9fbff5f98c18d604a0fc3/docs/api-documentation/runtime-ts/modules/_near_.near.md#log)
* [parseFromBytes](https://github.com/nearprotocol/docs/tree/59dd4aad80e70dc96fa9fbff5f98c18d604a0fc3/docs/api-documentation/runtime-ts/modules/_near_.near.md#parsefrombytes)
* [parseFromString](https://github.com/nearprotocol/docs/tree/59dd4aad80e70dc96fa9fbff5f98c18d604a0fc3/docs/api-documentation/runtime-ts/modules/_near_.near.md#parsefromstring)
* [random32](https://github.com/nearprotocol/docs/tree/59dd4aad80e70dc96fa9fbff5f98c18d604a0fc3/docs/api-documentation/runtime-ts/modules/_near_.near.md#random32)
* [randomBuffer](https://github.com/nearprotocol/docs/tree/59dd4aad80e70dc96fa9fbff5f98c18d604a0fc3/docs/api-documentation/runtime-ts/modules/_near_.near.md#randombuffer)
* [str](https://github.com/nearprotocol/docs/tree/59dd4aad80e70dc96fa9fbff5f98c18d604a0fc3/docs/api-documentation/runtime-ts/modules/_near_.near.md#str)
* [stringToBytes](https://github.com/nearprotocol/docs/tree/59dd4aad80e70dc96fa9fbff5f98c18d604a0fc3/docs/api-documentation/runtime-ts/modules/_near_.near.md#stringtobytes)

### Functions

#### base58

▸ **base58**\(source: _`Uint8Array`_\): `string`

_Defined in_ [_near.ts:1209_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1209)

**Parameters:**

| Name | Type |
| :--- | :--- |
| source | `Uint8Array` |

**Returns:** `string`

#### bytesToString

▸ **bytesToString**\(bytes: _`Uint8Array`_\): `string`

_Defined in_ [_near.ts:1131_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1131)

**Parameters:**

| Name | Type |
| :--- | :--- |
| bytes | `Uint8Array` |

**Returns:** `string`

#### hash

▸ **hash**&lt;`T`&gt;\(data: _`T`_\): `Uint8Array`

_Defined in_ [_near.ts:1159_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1159)

Hash given data. Returns hash as 32-byte array.

**Type parameters:**

**T**

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| data | `T` | data can be passed as either Uint8Array or anything with .toString \(hashed as UTF-8 string\). |

**Returns:** `Uint8Array`

#### hash32

▸ **hash32**&lt;`T`&gt;\(data: _`T`_\): `u32`

_Defined in_ [_near.ts:1174_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1174)

Hash given data. Returns hash as 32-bit integer.

**Type parameters:**

**T**

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| data | `T` | data can be passed as either Uint8Array or anything with .toString \(hashed as UTF-8 string\). |

**Returns:** `u32`

#### log

▸ **log**\(msg: _`string`_\): `void`

_Defined in_ [_near.ts:1200_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1200)

**Parameters:**

| Name | Type |
| :--- | :--- |
| msg | `string` |

**Returns:** `void`

#### parseFromBytes

▸ **parseFromBytes**&lt;`T`&gt;\(bytes: _`Uint8Array`_, defaultValue?: _`T`_\): `T`

_Defined in_ [_near.ts:1119_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1119)

Parses the given bytes array to return a value of the given generic type. Supported types: bool, integer, string and data objects defined in model.ts.

**Type parameters:**

**T**

**Parameters:**

| Name | Type | Default value | Description |
| :--- | :--- | :--- | :--- |
| bytes | `Uint8Array` | - | Bytes to parse. |
| `Default value` defaultValue | `T` | null | The default value if the bytes are null |

**Returns:** `T` A parsed value of type T.

#### parseFromString

▸ **parseFromString**&lt;`T`&gt;\(s: _`string`_, defaultValue?: _`T`_\): `T`

_Defined in_ [_near.ts:1091_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1091)

Parses the given string to return a value of the given generic type. Supported types: bool, integer, string and data objects defined in model.ts.

**Type parameters:**

**T**

**Parameters:**

| Name | Type | Default value | Description |
| :--- | :--- | :--- | :--- |
| s | `string` | - | String to parse. |
| `Default value` defaultValue | `T` | null | The default value if the string is null |

**Returns:** `T` A parsed value of type T.

#### random32

▸ **random32**\(\): `u32`

_Defined in_ [_near.ts:1196_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1196)

Returns random 32-bit integer.

**Returns:** `u32`

#### randomBuffer

▸ **randomBuffer**\(len: _`u32`_\): `Uint8Array`

_Defined in_ [_near.ts:1187_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1187)

Returns random byte buffer of given length.

**Parameters:**

| Name | Type |
| :--- | :--- |
| len | `u32` |

**Returns:** `Uint8Array`

#### str

▸ **str**&lt;`T`&gt;\(value: _`T`_\): `string`

_Defined in_ [_near.ts:1204_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1204)

**Type parameters:**

**T**

**Parameters:**

| Name | Type |
| :--- | :--- |
| value | `T` |

**Returns:** `string`

#### stringToBytes

▸ **stringToBytes**\(s: _`string`_\): `Uint8Array`

_Defined in_ [_near.ts:1135_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1135)

**Parameters:**

| Name | Type |
| :--- | :--- |
| s | `string` |

**Returns:** `Uint8Array`

## External module: "near"

### Index

#### Modules

* base64
* collections
* near

#### Classes

* Context
* ContractPromise
* ContractPromiseResult
* Storage

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

* check\_ethash
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
* storage\_range
* storage\_remove
* storage\_write

### Type aliases

#### DataTypeIndex

**Ƭ DataTypeIndex**: _`u32`_

_Defined in_ [_near.ts:5_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L5)

### Variables

#### `<Const>` DATA\_TYPE\_CURRENT\_ACCOUNT\_ID

**● DATA\_TYPE\_CURRENT\_ACCOUNT\_ID**: [_DataTypeIndex_](https://github.com/nearprotocol/docs/tree/59dd4aad80e70dc96fa9fbff5f98c18d604a0fc3/docs/api-documentation/runtime-ts/modules/_near_.md#datatypeindex) = 2

_Defined in_ [_near.ts:8_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L8)

#### `<Const>` DATA\_TYPE\_INPUT

**● DATA\_TYPE\_INPUT**: [_DataTypeIndex_](https://github.com/nearprotocol/docs/tree/59dd4aad80e70dc96fa9fbff5f98c18d604a0fc3/docs/api-documentation/runtime-ts/modules/_near_.md#datatypeindex) = 4

_Defined in_ [_near.ts:10_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L10)

#### `<Const>` DATA\_TYPE\_ORIGINATOR\_ACCOUNT\_ID

**● DATA\_TYPE\_ORIGINATOR\_ACCOUNT\_ID**: [_DataTypeIndex_](https://github.com/nearprotocol/docs/tree/59dd4aad80e70dc96fa9fbff5f98c18d604a0fc3/docs/api-documentation/runtime-ts/modules/_near_.md#datatypeindex) = 1

_Defined in_ [_near.ts:7_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L7)

#### `<Const>` DATA\_TYPE\_RESULT

**● DATA\_TYPE\_RESULT**: [_DataTypeIndex_](https://github.com/nearprotocol/docs/tree/59dd4aad80e70dc96fa9fbff5f98c18d604a0fc3/docs/api-documentation/runtime-ts/modules/_near_.md#datatypeindex) = 5

_Defined in_ [_near.ts:11_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L11)

#### `<Const>` DATA\_TYPE\_STORAGE

**● DATA\_TYPE\_STORAGE**: [_DataTypeIndex_](https://github.com/nearprotocol/docs/tree/59dd4aad80e70dc96fa9fbff5f98c18d604a0fc3/docs/api-documentation/runtime-ts/modules/_near_.md#datatypeindex) = 3

_Defined in_ [_near.ts:9_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L9)

#### `<Const>` DATA\_TYPE\_STORAGE\_ITER

**● DATA\_TYPE\_STORAGE\_ITER**: [_DataTypeIndex_](https://github.com/nearprotocol/docs/tree/59dd4aad80e70dc96fa9fbff5f98c18d604a0fc3/docs/api-documentation/runtime-ts/modules/_near_.md#datatypeindex) = 6

_Defined in_ [_near.ts:12_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L12)

#### `<Const>` DEFAULT\_SCRATCH\_BUFFER\_SIZE

**● DEFAULT\_SCRATCH\_BUFFER\_SIZE**: _`usize`_ = 1 &lt;&lt; 16

_Defined in_ [_near.ts:3_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L3)

#### `<Let>` context

**● context**: [_Context_](https://github.com/nearprotocol/docs/tree/59dd4aad80e70dc96fa9fbff5f98c18d604a0fc3/docs/api-documentation/runtime-ts/classes/_near_.context.md) = new Context\(\)

_Defined in_ [_near.ts:1079_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1079)

#### `<Let>` storage

**● storage**: [_Storage_](https://github.com/nearprotocol/docs/tree/59dd4aad80e70dc96fa9fbff5f98c18d604a0fc3/docs/api-documentation/runtime-ts/classes/_near_.storage.md) = new Storage\(\)

_Defined in_ [_near.ts:247_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L247)

An instance of a Storage class that is used for working with contract storage on the blockchain.

### Functions

#### check\_ethash

▸ **check\_ethash**\(block\_number: _`u64`_, header\_hash\_ptr: _`usize`_, header\_hash\_len: _`u32`_, nonce: _`u64`_, mix\_hash\_ptr: _`usize`_, mix\_hash\_len: _`u32`_, difficulty: _`u64`_\): `bool`

_Defined in_ [_near.ts:1510_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1510)

**Parameters:**

| Name | Type |
| :--- | :--- |
| block\_number | `u64` |
| header\_hash\_ptr | `usize` |
| header\_hash\_len | `u32` |
| nonce | `u64` |
| mix\_hash\_ptr | `usize` |
| mix\_hash\_len | `u32` |
| difficulty | `u64` |

**Returns:** `bool`

#### data\_read

▸ **data\_read**\(type\_index: _`u32`_, key\_len: _`usize`_, key: _`usize`_, max\_buf\_len: _`usize`_, buf\_ptr: _`usize`_\): `usize`

_Defined in_ [_near.ts:1490_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1490)

**Parameters:**

| Name | Type |
| :--- | :--- |
| type\_index | `u32` |
| key\_len | `usize` |
| key | `usize` |
| max\_buf\_len | `usize` |
| buf\_ptr | `usize` |

**Returns:** `usize`

#### promise\_and

▸ **promise\_and**\(promise\_index1: _`u32`_, promise\_index2: _`u32`_\): `u32`

_Defined in_ [_near.ts:1507_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1507)

**Parameters:**

| Name | Type |
| :--- | :--- |
| promise\_index1 | `u32` |
| promise\_index2 | `u32` |

**Returns:** `u32`

#### promise\_create

▸ **promise\_create**\(account\_id\_len: _`usize`_, account\_id\_ptr: _`usize`_, method\_name\_len: _`usize`_, method\_name\_ptr: _`usize`_, args\_len: _`usize`_, args\_ptr: _`usize`_, amount\_ptr: _`usize`_\): `u32`

_Defined in_ [_near.ts:1493_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1493)

**Parameters:**

| Name | Type |
| :--- | :--- |
| account\_id\_len | `usize` |
| account\_id\_ptr | `usize` |
| method\_name\_len | `usize` |
| method\_name\_ptr | `usize` |
| args\_len | `usize` |
| args\_ptr | `usize` |
| amount\_ptr | `usize` |

**Returns:** `u32`

#### promise\_then

▸ **promise\_then**\(promise\_index: _`u32`_, method\_name\_len: _`usize`_, method\_name\_ptr: _`usize`_, args\_len: _`usize`_, args\_ptr: _`usize`_, amount\_ptr: _`usize`_\): `u32`

_Defined in_ [_near.ts:1500_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1500)

**Parameters:**

| Name | Type |
| :--- | :--- |
| promise\_index | `u32` |
| method\_name\_len | `usize` |
| method\_name\_ptr | `usize` |
| args\_len | `usize` |
| args\_ptr | `usize` |
| amount\_ptr | `usize` |

**Returns:** `u32`

#### result\_count

▸ **result\_count**\(\): `u32`

_Defined in_ [_near.ts:1480_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1480)

**Returns:** `u32`

#### result\_is\_ok

▸ **result\_is\_ok**\(index: _`u32`_\): `bool`

_Defined in_ [_near.ts:1482_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1482)

**Parameters:**

| Name | Type |
| :--- | :--- |
| index | `u32` |

**Returns:** `bool`

#### return\_promise

▸ **return\_promise**\(promise\_index: _`u32`_\): `void`

_Defined in_ [_near.ts:1487_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1487)

**Parameters:**

| Name | Type |
| :--- | :--- |
| promise\_index | `u32` |

**Returns:** `void`

#### return\_value

▸ **return\_value**\(value\_len: _`usize`_, value\_ptr: _`usize`_\): `void`

_Defined in_ [_near.ts:1485_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1485)

**Parameters:**

| Name | Type |
| :--- | :--- |
| value\_len | `usize` |
| value\_ptr | `usize` |

**Returns:** `void`

#### storage\_has\_key

▸ **storage\_has\_key**\(key\_len: _`usize`_, key\_ptr: _`usize`_\): `bool`

_Defined in_ [_near.ts:1471_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1471)

**Parameters:**

| Name | Type |
| :--- | :--- |
| key\_len | `usize` |
| key\_ptr | `usize` |

**Returns:** `bool`

#### storage\_iter

▸ **storage\_iter**\(prefix\_len: _`usize`_, prefix\_ptr: _`usize`_\): `u32`

_Defined in_ [_near.ts:1473_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1473)

**Parameters:**

| Name | Type |
| :--- | :--- |
| prefix\_len | `usize` |
| prefix\_ptr | `usize` |

**Returns:** `u32`

#### storage\_iter\_next

▸ **storage\_iter\_next**\(id: _`u32`_\): `u32`

_Defined in_ [_near.ts:1477_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1477)

**Parameters:**

| Name | Type |
| :--- | :--- |
| id | `u32` |

**Returns:** `u32`

#### storage\_range

▸ **storage\_range**\(start\_len: _`usize`_, start\_ptr: _`usize`_, end\_len: _`usize`_, end\_ptr: _`usize`_\): `u32`

_Defined in_ [_near.ts:1475_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1475)

**Parameters:**

| Name | Type |
| :--- | :--- |
| start\_len | `usize` |
| start\_ptr | `usize` |
| end\_len | `usize` |
| end\_ptr | `usize` |

**Returns:** `u32`

#### storage\_remove

▸ **storage\_remove**\(key\_len: _`usize`_, key\_ptr: _`usize`_\): `void`

_Defined in_ [_near.ts:1469_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1469)

**Parameters:**

| Name | Type |
| :--- | :--- |
| key\_len | `usize` |
| key\_ptr | `usize` |

**Returns:** `void`

#### storage\_write

▸ **storage\_write**\(key\_len: _`usize`_, key\_ptr: _`usize`_, value\_len: _`usize`_, value\_ptr: _`usize`_\): `void`

_Defined in_ [_near.ts:1467_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1467)

**Parameters:**

| Name | Type |
| :--- | :--- |
| key\_len | `usize` |
| key\_ptr | `usize` |
| value\_len | `usize` |
| value\_ptr | `usize` |

**Returns:** `void`

