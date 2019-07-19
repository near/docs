# Signer

General signing interface, can be used for in memory signing, RPC singing, external wallet, HSM, etc.

## Hierarchy

**Signer**

↳ [InMemorySigner](_signer_.inmemorysigner.md)

## Methods

### `<Abstract>` createKey <a id="createkey"></a>

▸ **createKey**\(accountId: _`string`_, networkId?: _`string`_\): `Promise`&lt;`string`&gt;

_Defined in_ [_signer.ts:15_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/signer.ts#L15)

Creates new key and returns public key.

**Parameters:**

| Name | Type |
| :--- | :--- |
| accountId | `string` |
| `Optional` networkId | `string` |

**Returns:** `Promise`&lt;`string`&gt;

### `<Abstract>` getPublicKey <a id="getpublickey"></a>

▸ **getPublicKey**\(accountId?: _`string`_, networkId?: _`string`_\): `Promise`&lt;`string`&gt;

_Defined in_ [_signer.ts:22_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/signer.ts#L22)

Returns public key for given account / network.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| `Optional` accountId | `string` | accountId to retrieve from. |
| `Optional` networkId | `string` | network for this accountId. |

**Returns:** `Promise`&lt;`string`&gt;

### `<Abstract>` signHash <a id="signhash"></a>

▸ **signHash**\(hash: _`Uint8Array`_, accountId?: _`string`_, networkId?: _`string`_\): `Promise`&lt;[Signature](../_utils_key_pair_/_utils_key_pair_.signature.md)&gt;

_Defined in_ [_signer.ts:30_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/signer.ts#L30)

Signs given hash.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| hash | `Uint8Array` | hash to sign. |
| `Optional` accountId | `string` | accountId to use for signing. |
| `Optional` networkId | `string` | network for this accontId. |

**Returns:** `Promise`&lt;[Signature](../_utils_key_pair_/_utils_key_pair_.signature.md)&gt;

### signMessage <a id="signmessage"></a>

▸ **signMessage**\(message: _`Uint8Array`_, accountId?: _`string`_, networkId?: _`string`_\): `Promise`&lt;[Signature](../_utils_key_pair_/_utils_key_pair_.signature.md)&gt;

_Defined in_ [_signer.ts:38_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/signer.ts#L38)

Signs given message, by first hashing with sha256.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| message | `Uint8Array` | message to sign. |
| `Optional` accountId | `string` | accountId to use for signing. |
| `Optional` networkId | `string` | network for this accontId. |

**Returns:** `Promise`&lt;[Signature](../_utils_key_pair_/_utils_key_pair_.signature.md)&gt;

