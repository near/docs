---
id: "base64"
title: "base64"
sidebar_label: "base64"
---

base64 encoding/decoding

## Index

### Variables

* [ALPHA](base64.md#const-alpha)
* [PADCHAR](base64.md#const-padchar)

### Functions

* [decode](base64.md#decode)
* [encode](base64.md#encode)
* [getByte64](base64.md#getbyte64)

## Variables

### `Const` ALPHA

• **ALPHA**: *string* = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"

*Defined in [base64.ts:7](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/base64.ts#L7)*

___

### `Const` PADCHAR

• **PADCHAR**: *string* = "="

*Defined in [base64.ts:6](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/base64.ts#L6)*

## Functions

###  decode

▸ **decode**(`s`: string): *Uint8Array*

*Defined in [base64.ts:13](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/base64.ts#L13)*

Decode base64-encoded string and return a Uint8Array.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`s` | string | Base64 encoded string.  |

**Returns:** *Uint8Array*

___

###  encode

▸ **encode**(`bytes`: Uint8Array): *string*

*Defined in [base64.ts:62](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/base64.ts#L62)*

Encode Uint8Array in base64.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`bytes` | Uint8Array | Byte array of type Uint8Array.  |

**Returns:** *string*

___

###  getByte64

▸ **getByte64**(`s`: string, `i`: u32): *u32*

*Defined in [base64.ts:99](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/base64.ts#L99)*

**Parameters:**

Name | Type |
------ | ------ |
`s` | string |
`i` | u32 |

**Returns:** *u32*
