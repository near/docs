---
id: "keypair"
title: "KeyPair"
sidebar_label: "KeyPair"
---

## Hierarchy

* **KeyPair**

  ↳ [KeyPairEd25519](keypaired25519.md)

## Index

### Methods

* [getPublicKey](keypair.md#abstract-getpublickey)
* [sign](keypair.md#abstract-sign)
* [toString](keypair.md#abstract-tostring)
* [verify](keypair.md#abstract-verify)
* [fromRandom](keypair.md#static-fromrandom)
* [fromString](keypair.md#static-fromstring)

## Methods

### `Abstract` getPublicKey

▸ **getPublicKey**(): *[PublicKey](publickey.md)*

*Defined in [utils/key_pair.ts:71](https://github.com/near/near-api-js/blob/88ad17d/src.ts/utils/key_pair.ts#L71)*

**Returns:** *[PublicKey](publickey.md)*

___

### `Abstract` sign

▸ **sign**(`message`: Uint8Array): *[Signature](signature.md)*

*Defined in [utils/key_pair.ts:68](https://github.com/near/near-api-js/blob/88ad17d/src.ts/utils/key_pair.ts#L68)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | Uint8Array |

**Returns:** *[Signature](signature.md)*

___

### `Abstract` toString

▸ **toString**(): *string*

*Defined in [utils/key_pair.ts:70](https://github.com/near/near-api-js/blob/88ad17d/src.ts/utils/key_pair.ts#L70)*

**Returns:** *string*

___

### `Abstract` verify

▸ **verify**(`message`: Uint8Array, `signature`: Uint8Array): *boolean*

*Defined in [utils/key_pair.ts:69](https://github.com/near/near-api-js/blob/88ad17d/src.ts/utils/key_pair.ts#L69)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | Uint8Array |
`signature` | Uint8Array |

**Returns:** *boolean*

___

### `Static` fromRandom

▸ **fromRandom**(`curve`: string): *[KeyPair](keypair.md)*

*Defined in [utils/key_pair.ts:73](https://github.com/near/near-api-js/blob/88ad17d/src.ts/utils/key_pair.ts#L73)*

**Parameters:**

Name | Type |
------ | ------ |
`curve` | string |

**Returns:** *[KeyPair](keypair.md)*

___

### `Static` fromString

▸ **fromString**(`encodedKey`: string): *[KeyPair](keypair.md)*

*Defined in [utils/key_pair.ts:80](https://github.com/near/near-api-js/blob/88ad17d/src.ts/utils/key_pair.ts#L80)*

**Parameters:**

Name | Type |
------ | ------ |
`encodedKey` | string |

**Returns:** *[KeyPair](keypair.md)*
