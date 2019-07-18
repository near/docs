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

_Defined in_ [_near.ts:1598_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1598)

### `<Const>` PADCHAR  <a id="padchar"></a>

**● PADCHAR**: _`string`_ = "="

_Defined in_ [_near.ts:1597_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1597)

## Functions

### decode  <a id="decode"></a>

▸ **decode**\(s: _`string`_\): `Uint8Array`

_Defined in_ [_near.ts:1608_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1608)

Decode base64-encoded string and return a Uint8Array.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| s | `string` | Base64 encoded string. |

**Returns:** `Uint8Array`

### encode  <a id="encode"></a>

▸ **encode**\(bytes: _`Uint8Array`_\): `string`

_Defined in_ [_near.ts:1657_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1657)

Encode Uint8Array in base64.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| bytes | `Uint8Array` | Byte array of type Uint8Array. |

**Returns:** `string`

### getByte64  <a id="getbyte64"></a>

▸ **getByte64**\(s: _`string`_, i: _`u32`_\): `u32`

_Defined in_ [_near.ts:1600_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1600)

**Parameters:**

| Name | Type |
| :--- | :--- |
| s | `string` |
| i | `u32` |

**Returns:** `u32`

