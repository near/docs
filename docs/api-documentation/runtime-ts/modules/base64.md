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

*Defined in [base64.ts:7](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/base64.ts#L7)*

___

### `<Const>` PADCHAR

**● PADCHAR**: *`string`* = "="

*Defined in [base64.ts:6](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/base64.ts#L6)*

___

## Functions


###  decode

▸ **decode**(s: *`string`*): `Uint8Array`

*Defined in [base64.ts:13](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/base64.ts#L13)*

Decode base64-encoded string and return a Uint8Array.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| s | `string` |  Base64 encoded string. |

**Returns:** `Uint8Array`

___

###  encode

▸ **encode**(bytes: *`Uint8Array`*): `string`

*Defined in [base64.ts:62](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/base64.ts#L62)*

Encode Uint8Array in base64.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| bytes | `Uint8Array` |  Byte array of type Uint8Array. |

**Returns:** `string`

___

###  getByte64

▸ **getByte64**(s: *`string`*, i: *`u32`*): `u32`

*Defined in [base64.ts:99](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/base64.ts#L99)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| s | `string` |
| i | `u32` |

**Returns:** `u32`

___

