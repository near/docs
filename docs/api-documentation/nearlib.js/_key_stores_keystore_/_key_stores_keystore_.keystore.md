# KeyStore

Key store interface for `InMemorySigner`.

## Hierarchy

**KeyStore**

↳ [InMemoryKeyStore](../_key_stores_in_memory_key_store_/_key_stores_in_memory_key_store_.inmemorykeystore.md)

↳ [BrowserLocalStorageKeyStore](../_key_stores_browser_local_storage_key_store_/_key_stores_browser_local_storage_key_store_.browserlocalstoragekeystore.md)

↳ [UnencryptedFileSystemKeyStore](../_key_stores_unencrypted_file_system_keystore_/_key_stores_unencrypted_file_system_keystore_.unencryptedfilesystemkeystore.md)

↳ [MergeKeyStore](../_key_stores_merge_key_store_/_key_stores_merge_key_store_.mergekeystore.md)

## Methods

### `<Abstract>` clear <a id="clear"></a>

▸ **clear**\(\): `Promise`&lt;`void`&gt;

_Defined in_ [_key\_stores/keystore.ts:12_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/key_stores/keystore.ts#L12)

**Returns:** `Promise`&lt;`void`&gt;

### `<Abstract>` getAccounts <a id="getaccounts"></a>

▸ **getAccounts**\(networkId: _`string`_\): `Promise`&lt;`string`\[\]&gt;

_Defined in_ [_key\_stores/keystore.ts:14_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/key_stores/keystore.ts#L14)

**Parameters:**

| Name | Type |
| :--- | :--- |
| networkId | `string` |

**Returns:** `Promise`&lt;`string`\[\]&gt;

### `<Abstract>` getKey <a id="getkey"></a>

▸ **getKey**\(networkId: _`string`_, accountId: _`string`_\): `Promise`&lt;[KeyPair](../_utils_key_pair_/_utils_key_pair_.keypair.md)&gt;

_Defined in_ [_key\_stores/keystore.ts:10_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/key_stores/keystore.ts#L10)

**Parameters:**

| Name | Type |
| :--- | :--- |
| networkId | `string` |
| accountId | `string` |

**Returns:** `Promise`&lt;[KeyPair](../_utils_key_pair_/_utils_key_pair_.keypair.md)&gt;

### `<Abstract>` getNetworks <a id="getnetworks"></a>

▸ **getNetworks**\(\): `Promise`&lt;`string`\[\]&gt;

_Defined in_ [_key\_stores/keystore.ts:13_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/key_stores/keystore.ts#L13)

**Returns:** `Promise`&lt;`string`\[\]&gt;

### `<Abstract>` removeKey <a id="removekey"></a>

▸ **removeKey**\(networkId: _`string`_, accountId: _`string`_\): `Promise`&lt;`void`&gt;

_Defined in_ [_key\_stores/keystore.ts:11_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/key_stores/keystore.ts#L11)

**Parameters:**

| Name | Type |
| :--- | :--- |
| networkId | `string` |
| accountId | `string` |

**Returns:** `Promise`&lt;`void`&gt;

### `<Abstract>` setKey <a id="setkey"></a>

▸ **setKey**\(networkId: _`string`_, accountId: _`string`_, keyPair: [_KeyPair_](../_utils_key_pair_/_utils_key_pair_.keypair.md)\): `Promise`&lt;`void`&gt;

_Defined in_ [_key\_stores/keystore.ts:9_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/key_stores/keystore.ts#L9)

**Parameters:**

| Name | Type |
| :--- | :--- |
| networkId | `string` |
| accountId | `string` |
| keyPair | [KeyPair](../_utils_key_pair_/_utils_key_pair_.keypair.md) |

**Returns:** `Promise`&lt;`void`&gt;

