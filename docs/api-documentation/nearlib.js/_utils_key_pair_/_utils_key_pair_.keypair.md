# KeyPair

## Hierarchy

**KeyPair**

↳ [KeyPairEd25519](_utils_key_pair_.keypaired25519.md)

## Methods

### `<Abstract>` getPublicKey <a id="getpublickey"></a>

▸ **getPublicKey**\(\): `string`

_Defined in_ [_utils/key\_pair.ts:17_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/utils/key_pair.ts#L17)

**Returns:** `string`

### `<Abstract>` sign <a id="sign"></a>

▸ **sign**\(message: _`Uint8Array`_\): [Signature](_utils_key_pair_.signature.md)

_Defined in_ [_utils/key\_pair.ts:14_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/utils/key_pair.ts#L14)

**Parameters:**

| Name | Type |
| :--- | :--- |
| message | `Uint8Array` |

**Returns:** [Signature](_utils_key_pair_.signature.md)

### `<Abstract>` toString <a id="tostring"></a>

▸ **toString**\(\): `string`

_Defined in_ [_utils/key\_pair.ts:16_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/utils/key_pair.ts#L16)

**Returns:** `string`

### `<Abstract>` verify <a id="verify"></a>

▸ **verify**\(message: _`Uint8Array`_, signature: _`Uint8Array`_\): `boolean`

_Defined in_ [_utils/key\_pair.ts:15_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/utils/key_pair.ts#L15)

**Parameters:**

| Name | Type |
| :--- | :--- |
| message | `Uint8Array` |
| signature | `Uint8Array` |

**Returns:** `boolean`

### `<Static>` fromRandom <a id="fromrandom"></a>

▸ **fromRandom**\(curve: _`string`_\): [KeyPair](_utils_key_pair_.keypair.md)

_Defined in_ [_utils/key\_pair.ts:19_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/utils/key_pair.ts#L19)

**Parameters:**

| Name | Type |
| :--- | :--- |
| curve | `string` |

**Returns:** [KeyPair](_utils_key_pair_.keypair.md)

### `<Static>` fromString <a id="fromstring"></a>

▸ **fromString**\(encodedKey: _`string`_\): [KeyPair](_utils_key_pair_.keypair.md)

_Defined in_ [_utils/key\_pair.ts:26_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/utils/key_pair.ts#L26)

**Parameters:**

| Name | Type |
| :--- | :--- |
| encodedKey | `string` |

**Returns:** [KeyPair](_utils_key_pair_.keypair.md)

