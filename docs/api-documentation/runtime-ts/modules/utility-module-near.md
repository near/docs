# Utility module: near

## Index

### Functions

* UTF8Length
* bytesToString
* parseFromBytes
* parseFromString
* stringToBytes
* toUTF8
* uint8ArrayToBuffer

## Functions

### UTF8Length

▸ **UTF8Length**\(str: _`string`_, nullTerminated?: _`boolean`_\): `usize`

_Defined in_ [_util.ts:17_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/util.ts#L17)

**Parameters:**

| Name | Type | Default value |
| :--- | :--- | :--- |
| str | `string` | - |
| `Default value` nullTerminated | `boolean` | false |

**Returns:** `usize`

### bytesToString

▸ **bytesToString**\(bytes: _`Uint8Array`_\): `string` \| `null`

_Defined in_ [_util.ts:10_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/util.ts#L10)

**Parameters:**

| Name | Type |
| :--- | :--- |
| bytes | `Uint8Array` |

**Returns:** `string` \| `null`

### parseFromBytes

▸ **parseFromBytes**&lt;`T`&gt;\(bytes: _`Uint8Array`_\): `T`

_Defined in_ [_util.ts:36_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/util.ts#L36)

Parses the given bytes array to return a value of the given generic type. Supported types: bool, integer, string and data objects defined in model.ts.

**Type parameters:**

#### T

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| bytes | `Uint8Array` | Bytes to parse. Bytes must be not null. |

**Returns:** `T` A parsed value of type T.

### parseFromString

▸ **parseFromString**&lt;`T`&gt;\(s: _`string`_\): `T`

_Defined in_ [_util.ts:53_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/util.ts#L53)

Parses the given string to return a value of the given generic type. Supported types: bool, integer, string and data objects defined in model.ts.

**Type parameters:**

#### T

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| s | `string` | String to parse. Must be not null. |

**Returns:** `T` A parsed value of type T.

### stringToBytes

▸ **stringToBytes**\(s: _`string`_\): `Uint8Array`

_Defined in_ [_util.ts:3_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/util.ts#L3)

**Parameters:**

| Name | Type |
| :--- | :--- |
| s | `string` |

**Returns:** `Uint8Array`

### toUTF8

▸ **toUTF8**\(str: _`string`_, nullTerminated?: _`boolean`_\): `usize`

_Defined in_ [_util.ts:21_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/util.ts#L21)

**Parameters:**

| Name | Type | Default value |
| :--- | :--- | :--- |
| str | `string` | - |
| `Default value` nullTerminated | `boolean` | false |

**Returns:** `usize`

### uint8ArrayToBuffer

▸ **uint8ArrayToBuffer**\(array: _`Uint8Array`_\): `ArrayBuffer`

_Defined in_ [_util.ts:25_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/util.ts#L25)

**Parameters:**

| Name | Type |
| :--- | :--- |
| array | `Uint8Array` |

**Returns:** `ArrayBuffer`

