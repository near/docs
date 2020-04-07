---
id: "publickey"
title: "PublicKey"
sidebar_label: "PublicKey"
---

PublicKey representation that has type and bytes of the key.

## Hierarchy

* **PublicKey**

## Index

### Constructors

* [constructor](publickey.md#constructor)

### Properties

* [data](publickey.md#data)
* [keyType](publickey.md#keytype)

### Methods

* [toString](publickey.md#tostring)
* [from](publickey.md#static-from)
* [fromString](publickey.md#static-fromstring)

## Constructors

###  constructor

\+ **new PublicKey**(`keyType`: [KeyType](../enums/keytype.md), `data`: Uint8Array): *[PublicKey](publickey.md)*

*Defined in [utils/key_pair.ts:37](https://github.com/near/near-api-js/blob/88ad17d/src.ts/utils/key_pair.ts#L37)*

**Parameters:**

Name | Type |
------ | ------ |
`keyType` | [KeyType](../enums/keytype.md) |
`data` | Uint8Array |

**Returns:** *[PublicKey](publickey.md)*

## Properties

###  data

• **data**: *Uint8Array*

*Defined in [utils/key_pair.ts:37](https://github.com/near/near-api-js/blob/88ad17d/src.ts/utils/key_pair.ts#L37)*

___

###  keyType

• **keyType**: *[KeyType](../enums/keytype.md)*

*Defined in [utils/key_pair.ts:36](https://github.com/near/near-api-js/blob/88ad17d/src.ts/utils/key_pair.ts#L36)*

## Methods

###  toString

▸ **toString**(): *string*

*Defined in [utils/key_pair.ts:62](https://github.com/near/near-api-js/blob/88ad17d/src.ts/utils/key_pair.ts#L62)*

**Returns:** *string*

___

### `Static` from

▸ **from**(`value`: string | [PublicKey](publickey.md)): *[PublicKey](publickey.md)*

*Defined in [utils/key_pair.ts:44](https://github.com/near/near-api-js/blob/88ad17d/src.ts/utils/key_pair.ts#L44)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | string &#124; [PublicKey](publickey.md) |

**Returns:** *[PublicKey](publickey.md)*

___

### `Static` fromString

▸ **fromString**(`encodedKey`: string): *[PublicKey](publickey.md)*

*Defined in [utils/key_pair.ts:51](https://github.com/near/near-api-js/blob/88ad17d/src.ts/utils/key_pair.ts#L51)*

**Parameters:**

Name | Type |
------ | ------ |
`encodedKey` | string |

**Returns:** *[PublicKey](publickey.md)*
