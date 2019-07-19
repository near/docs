# InMemorySigner

Signs using in memory key store.

## Hierarchy

[Signer](_signer_.signer.md)

**↳ InMemorySigner**

## Constructors

### constructor <a id="constructor"></a>

⊕ **new InMemorySigner**\(keyStore: [_KeyStore_](../_key_stores_keystore_/_key_stores_keystore_.keystore.md)\): [InMemorySigner](_signer_.inmemorysigner.md)

_Defined in_ [_signer.ts:47_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/signer.ts#L47)

**Parameters:**

| Name | Type |
| :--- | :--- |
| keyStore | [KeyStore](../_key_stores_keystore_/_key_stores_keystore_.keystore.md) |

**Returns:** [InMemorySigner](_signer_.inmemorysigner.md)

## Properties

### keyStore <a id="keystore"></a>

**● keyStore**: [_KeyStore_](../_key_stores_keystore_/_key_stores_keystore_.keystore.md)

_Defined in_ [_signer.ts:47_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/signer.ts#L47)

## Methods

### createKey <a id="createkey"></a>

▸ **createKey**\(accountId: _`string`_, networkId: _`string`_\): `Promise`&lt;`string`&gt;

_Overrides_ [_Signer_](_signer_.signer.md)_._[_createKey_](_signer_.signer.md#createkey)

_Defined in_ [_signer.ts:54_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/signer.ts#L54)

**Parameters:**

| Name | Type |
| :--- | :--- |
| accountId | `string` |
| networkId | `string` |

**Returns:** `Promise`&lt;`string`&gt;

### getPublicKey <a id="getpublickey"></a>

▸ **getPublicKey**\(accountId?: _`string`_, networkId?: _`string`_\): `Promise`&lt;`string`&gt;

_Overrides_ [_Signer_](_signer_.signer.md)_._[_getPublicKey_](_signer_.signer.md#getpublickey)

_Defined in_ [_signer.ts:60_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/signer.ts#L60)

**Parameters:**

| Name | Type |
| :--- | :--- |
| `Optional` accountId | `string` |
| `Optional` networkId | `string` |

**Returns:** `Promise`&lt;`string`&gt;

### signHash <a id="signhash"></a>

▸ **signHash**\(hash: _`Uint8Array`_, accountId?: _`string`_, networkId?: _`string`_\): `Promise`&lt;[Signature](../_utils_key_pair_/_utils_key_pair_.signature.md)&gt;

_Overrides_ [_Signer_](_signer_.signer.md)_._[_signHash_](_signer_.signer.md#signhash)

_Defined in_ [_signer.ts:65_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/signer.ts#L65)

**Parameters:**

| Name | Type |
| :--- | :--- |
| hash | `Uint8Array` |
| `Optional` accountId | `string` |
| `Optional` networkId | `string` |

**Returns:** `Promise`&lt;[Signature](../_utils_key_pair_/_utils_key_pair_.signature.md)&gt;

### signMessage <a id="signmessage"></a>

▸ **signMessage**\(message: _`Uint8Array`_, accountId?: _`string`_, networkId?: _`string`_\): `Promise`&lt;[Signature](../_utils_key_pair_/_utils_key_pair_.signature.md)&gt;

_Inherited from_ [_Signer_](_signer_.signer.md)_._[_signMessage_](_signer_.signer.md#signmessage)

_Defined in_ [_signer.ts:38_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/signer.ts#L38)

Signs given message, by first hashing with sha256.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| message | `Uint8Array` | message to sign. |
| `Optional` accountId | `string` | accountId to use for signing. |
| `Optional` networkId | `string` | network for this accontId. |

**Returns:** `Promise`&lt;[Signature](../_utils_key_pair_/_utils_key_pair_.signature.md)&gt;

