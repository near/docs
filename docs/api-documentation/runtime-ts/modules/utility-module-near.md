# Module: util

## Index

### Functions

* UTF8Length
* bytesToString
* parseFromBytes
* parseFromString
* stringToBytes
* toUTF8
* uint8ArrayToBuffer

---

## Functions


###  UTF8Length

▸ **UTF8Length**(str: *`string`*, nullTerminated?: *`boolean`*): `usize`

*Defined in [util.ts:17](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/util.ts#L17)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| str | `string` | - |
| `Default value` nullTerminated | `boolean` | false |

**Returns:** `usize`

___

###  bytesToString

▸ **bytesToString**(bytes: *`Uint8Array`*): `string` \| `null`

*Defined in [util.ts:10](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/util.ts#L10)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| bytes | `Uint8Array` |

**Returns:** `string` \| `null`

___

###  parseFromBytes

▸ **parseFromBytes**<`T`>(bytes: *`Uint8Array`*): `T`

*Defined in [util.ts:36](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/util.ts#L36)*

Parses the given bytes array to return a value of the given generic type. Supported types: bool, integer, string and data objects defined in model.ts.

**Type parameters:**

#### T 
**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| bytes | `Uint8Array` |  Bytes to parse. Bytes must be not null. |

**Returns:** `T`
A parsed value of type T.

___

###  parseFromString

▸ **parseFromString**<`T`>(s: *`string`*): `T`

*Defined in [util.ts:53](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/util.ts#L53)*

Parses the given string to return a value of the given generic type. Supported types: bool, integer, string and data objects defined in model.ts.

**Type parameters:**

#### T 
**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| s | `string` |  String to parse. Must be not null. |

**Returns:** `T`
A parsed value of type T.

___

###  stringToBytes

▸ **stringToBytes**(s: *`string`*): `Uint8Array`

*Defined in [util.ts:3](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/util.ts#L3)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| s | `string` |

**Returns:** `Uint8Array`

___

###  toUTF8

▸ **toUTF8**(str: *`string`*, nullTerminated?: *`boolean`*): `usize`

*Defined in [util.ts:21](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/util.ts#L21)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| str | `string` | - |
| `Default value` nullTerminated | `boolean` | false |

**Returns:** `usize`

___

###  uint8ArrayToBuffer

▸ **uint8ArrayToBuffer**(array: *`Uint8Array`*): `ArrayBuffer`

*Defined in [util.ts:25](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/util.ts#L25)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| array | `Uint8Array` |

**Returns:** `ArrayBuffer`

___

