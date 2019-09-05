# MergeKeyStore

Keystore which can be used to merge multiple key stores into one virtual key store.

## Hierarchy

[KeyStore](../_key_stores_keystore_/_key_stores_keystore_.keystore.md)

**↳ MergeKeyStore**

## Constructors

### constructor <a id="constructor"></a>

⊕ **new MergeKeyStore**\(keyStores: [_KeyStore_](../_key_stores_keystore_/_key_stores_keystore_.keystore.md)_\[\]_\): [MergeKeyStore](_key_stores_merge_key_store_.mergekeystore.md)

_Defined in_ [_key\_stores/merge\_key\_store.ts:10_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/key_stores/merge_key_store.ts#L10)

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| keyStores | [KeyStore](../_key_stores_keystore_/_key_stores_keystore_.keystore.md)\[\] | first keystore gets all write calls, read calls are attempted from start to end of array |

**Returns:** [MergeKeyStore](_key_stores_merge_key_store_.mergekeystore.md)

## Properties

### keyStores <a id="keystores"></a>

**● keyStores**: [_KeyStore_](../_key_stores_keystore_/_key_stores_keystore_.keystore.md)_\[\]_

_Defined in_ [_key\_stores/merge\_key\_store.ts:10_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/key_stores/merge_key_store.ts#L10)

## Methods

### clear <a id="clear"></a>

▸ **clear**\(\): `Promise`&lt;`void`&gt;

_Overrides_ [_KeyStore_](../_key_stores_keystore_/_key_stores_keystore_.keystore.md)_._[_clear_](../_key_stores_keystore_/_key_stores_keystore_.keystore.md#clear)

_Defined in_ [_key\_stores/merge\_key\_store.ts:40_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/key_stores/merge_key_store.ts#L40)

**Returns:** `Promise`&lt;`void`&gt;

### getAccounts <a id="getaccounts"></a>

▸ **getAccounts**\(networkId: _`string`_\): `Promise`&lt;`string`\[\]&gt;

_Overrides_ [_KeyStore_](../_key_stores_keystore_/_key_stores_keystore_.keystore.md)_._[_getAccounts_](../_key_stores_keystore_/_key_stores_keystore_.keystore.md#getaccounts)

_Defined in_ [_key\_stores/merge\_key\_store.ts:56_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/key_stores/merge_key_store.ts#L56)

**Parameters:**

| Name | Type |
| :--- | :--- |
| networkId | `string` |

**Returns:** `Promise`&lt;`string`\[\]&gt;

### getKey <a id="getkey"></a>

▸ **getKey**\(networkId: _`string`_, accountId: _`string`_\): `Promise`&lt;[KeyPair](../_utils_key_pair_/_utils_key_pair_.keypair.md)&gt;

_Overrides_ [_KeyStore_](../_key_stores_keystore_/_key_stores_keystore_.keystore.md)_._[_getKey_](../_key_stores_keystore_/_key_stores_keystore_.keystore.md#getkey)

_Defined in_ [_key\_stores/merge\_key\_store.ts:24_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/key_stores/merge_key_store.ts#L24)

**Parameters:**

| Name | Type |
| :--- | :--- |
| networkId | `string` |
| accountId | `string` |

**Returns:** `Promise`&lt;[KeyPair](../_utils_key_pair_/_utils_key_pair_.keypair.md)&gt;

### getNetworks <a id="getnetworks"></a>

▸ **getNetworks**\(\): `Promise`&lt;`string`\[\]&gt;

_Overrides_ [_KeyStore_](../_key_stores_keystore_/_key_stores_keystore_.keystore.md)_._[_getNetworks_](../_key_stores_keystore_/_key_stores_keystore_.keystore.md#getnetworks)

_Defined in_ [_key\_stores/merge\_key\_store.ts:46_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/key_stores/merge_key_store.ts#L46)

**Returns:** `Promise`&lt;`string`\[\]&gt;

### removeKey <a id="removekey"></a>

▸ **removeKey**\(networkId: _`string`_, accountId: _`string`_\): `Promise`&lt;`void`&gt;

_Overrides_ [_KeyStore_](../_key_stores_keystore_/_key_stores_keystore_.keystore.md)_._[_removeKey_](../_key_stores_keystore_/_key_stores_keystore_.keystore.md#removekey)

_Defined in_ [_key\_stores/merge\_key\_store.ts:34_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/key_stores/merge_key_store.ts#L34)

**Parameters:**

| Name | Type |
| :--- | :--- |
| networkId | `string` |
| accountId | `string` |

**Returns:** `Promise`&lt;`void`&gt;

### setKey <a id="setkey"></a>

▸ **setKey**\(networkId: _`string`_, accountId: _`string`_, keyPair: [_KeyPair_](../_utils_key_pair_/_utils_key_pair_.keypair.md)\): `Promise`&lt;`void`&gt;

_Overrides_ [_KeyStore_](../_key_stores_keystore_/_key_stores_keystore_.keystore.md)_._[_setKey_](../_key_stores_keystore_/_key_stores_keystore_.keystore.md#setkey)

_Defined in_ [_key\_stores/merge\_key\_store.ts:20_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/key_stores/merge_key_store.ts#L20)

**Parameters:**

| Name | Type |
| :--- | :--- |
| networkId | `string` |
| accountId | `string` |
| keyPair | [KeyPair](../_utils_key_pair_/_utils_key_pair_.keypair.md) |

**Returns:** `Promise`&lt;`void`&gt;

