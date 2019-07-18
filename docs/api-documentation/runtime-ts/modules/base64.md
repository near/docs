# Module: base64

base64 encoding/decoding

## Index

### Variables

* ALPHA
* PADCHAR

### Functions

* decode
* encode
* getByte64

---

## Variables


### `<Const>` ALPHA

**● ALPHA**: *`string`* = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"

*Defined in [near.ts:1598](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1598)*

---
<a id="padchar"></a>

### `<Const>` PADCHAR

**● PADCHAR**: *`string`* = "="

*Defined in [near.ts:1597](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1597)*

---

## Functions

<a id="decode"></a>

###  decode

▸ **decode**(s: *`string`*): `Uint8Array`

*Defined in [near.ts:1608](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1608)*

Decode base64-encoded string and return a Uint8Array.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| s | `string` |  Base64 encoded string. |

**Returns:** `Uint8Array`

---
<a id="encode"></a>

###  encode

▸ **encode**(bytes: *`Uint8Array`*): `string`

*Defined in [near.ts:1657](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1657)*

Encode Uint8Array in base64.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| bytes | `Uint8Array` |  Byte array of type Uint8Array. |

**Returns:** `string`

---
<a id="getbyte64"></a>

###  getByte64

▸ **getByte64**(s: *`string`*, i: *`u32`*): `u32`

*Defined in [near.ts:1600](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1600)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| s | `string` |
| i | `u32` |

**Returns:** `u32`

---

