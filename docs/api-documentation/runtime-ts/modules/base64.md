# Base64

base64 encoding/decoding

## Index

### Variables

* ALPHA
* PADCHAR

### Functions

* decode
* encode
* getByte64

## Variables

### `<Const>` ALPHA

**● ALPHA**: _`string`_ = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"

_Defined in_ [_base64.ts:7_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/base64.ts#L7)

### `<Const>` PADCHAR

**● PADCHAR**: _`string`_ = "="

_Defined in_ [_base64.ts:6_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/base64.ts#L6)

## Functions

### decode

▸ **decode**\(s: _`string`_\): `Uint8Array`

_Defined in_ [_base64.ts:13_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/base64.ts#L13)

Decode base64-encoded string and return a Uint8Array.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| s | `string` | Base64 encoded string. |

**Returns:** `Uint8Array`

### encode

▸ **encode**\(bytes: _`Uint8Array`_\): `string`

_Defined in_ [_base64.ts:62_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/base64.ts#L62)

Encode Uint8Array in base64.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| bytes | `Uint8Array` | Byte array of type Uint8Array. |

**Returns:** `string`

### getByte64

▸ **getByte64**\(s: _`string`_, i: _`u32`_\): `u32`

_Defined in_ [_base64.ts:99_](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/base64.ts#L99)

**Parameters:**

| Name | Type |
| :--- | :--- |
| s | `string` |
| i | `u32` |

**Returns:** `u32`

