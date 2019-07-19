# UnencryptedFileSystemKeyStore

## Hierarchy

[KeyStore](../_key_stores_keystore_/_key_stores_keystore_.keystore.md)

**↳ UnencryptedFileSystemKeyStore**

## Constructors

### constructor <a id="constructor"></a>

⊕ **new UnencryptedFileSystemKeyStore**\(keyDir: _`string`_\): [UnencryptedFileSystemKeyStore](_key_stores_unencrypted_file_system_keystore_.unencryptedfilesystemkeystore.md)

_Defined in_ [_key\_stores/unencrypted\_file\_system\_keystore.ts:47_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/key_stores/unencrypted_file_system_keystore.ts#L47)

**Parameters:**

| Name | Type |
| :--- | :--- |
| keyDir | `string` |

**Returns:** [UnencryptedFileSystemKeyStore](_key_stores_unencrypted_file_system_keystore_.unencryptedfilesystemkeystore.md)

## Properties

### keyDir <a id="keydir"></a>

**● keyDir**: _`string`_

_Defined in_ [_key\_stores/unencrypted\_file\_system\_keystore.ts:47_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/key_stores/unencrypted_file_system_keystore.ts#L47)

## Methods

### clear <a id="clear"></a>

▸ **clear**\(\): `Promise`&lt;`void`&gt;

_Overrides_ [_KeyStore_](../_key_stores_keystore_/_key_stores_keystore_.keystore.md)_._[_clear_](../_key_stores_keystore_/_key_stores_keystore_.keystore.md#clear)

_Defined in_ [_key\_stores/unencrypted\_file\_system\_keystore.ts:75_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/key_stores/unencrypted_file_system_keystore.ts#L75)

**Returns:** `Promise`&lt;`void`&gt;

### getAccounts <a id="getaccounts"></a>

▸ **getAccounts**\(networkId: _`string`_\): `Promise`&lt;`string`\[\]&gt;

_Overrides_ [_KeyStore_](../_key_stores_keystore_/_key_stores_keystore_.keystore.md)_._[_getAccounts_](../_key_stores_keystore_/_key_stores_keystore_.keystore.md#getaccounts)

_Defined in_ [_key\_stores/unencrypted\_file\_system\_keystore.ts:96_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/key_stores/unencrypted_file_system_keystore.ts#L96)

**Parameters:**

| Name | Type |
| :--- | :--- |
| networkId | `string` |

**Returns:** `Promise`&lt;`string`\[\]&gt;

### getKey <a id="getkey"></a>

▸ **getKey**\(networkId: _`string`_, accountId: _`string`_\): `Promise`&lt;[KeyPair](../_utils_key_pair_/_utils_key_pair_.keypair.md)&gt;

_Overrides_ [_KeyStore_](../_key_stores_keystore_/_key_stores_keystore_.keystore.md)_._[_getKey_](../_key_stores_keystore_/_key_stores_keystore_.keystore.md#getkey)

_Defined in_ [_key\_stores/unencrypted\_file\_system\_keystore.ts:60_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/key_stores/unencrypted_file_system_keystore.ts#L60)

**Parameters:**

| Name | Type |
| :--- | :--- |
| networkId | `string` |
| accountId | `string` |

**Returns:** `Promise`&lt;[KeyPair](../_utils_key_pair_/_utils_key_pair_.keypair.md)&gt;

### `<Private>` getKeyFilePath <a id="getkeyfilepath"></a>

▸ **getKeyFilePath**\(networkId: _`string`_, accountId: _`string`_\): `string`

_Defined in_ [_key\_stores/unencrypted\_file\_system\_keystore.ts:83_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/key_stores/unencrypted_file_system_keystore.ts#L83)

**Parameters:**

| Name | Type |
| :--- | :--- |
| networkId | `string` |
| accountId | `string` |

**Returns:** `string`

### getNetworks <a id="getnetworks"></a>

▸ **getNetworks**\(\): `Promise`&lt;`string`\[\]&gt;

_Overrides_ [_KeyStore_](../_key_stores_keystore_/_key_stores_keystore_.keystore.md)_._[_getNetworks_](../_key_stores_keystore_/_key_stores_keystore_.keystore.md#getnetworks)

_Defined in_ [_key\_stores/unencrypted\_file\_system\_keystore.ts:87_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/key_stores/unencrypted_file_system_keystore.ts#L87)

**Returns:** `Promise`&lt;`string`\[\]&gt;

### removeKey <a id="removekey"></a>

▸ **removeKey**\(networkId: _`string`_, accountId: _`string`_\): `Promise`&lt;`void`&gt;

_Overrides_ [_KeyStore_](../_key_stores_keystore_/_key_stores_keystore_.keystore.md)_._[_removeKey_](../_key_stores_keystore_/_key_stores_keystore_.keystore.md#removekey)

_Defined in_ [_key\_stores/unencrypted\_file\_system\_keystore.ts:69_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/key_stores/unencrypted_file_system_keystore.ts#L69)

**Parameters:**

| Name | Type |
| :--- | :--- |
| networkId | `string` |
| accountId | `string` |

**Returns:** `Promise`&lt;`void`&gt;

### setKey <a id="setkey"></a>

▸ **setKey**\(networkId: _`string`_, accountId: _`string`_, keyPair: [_KeyPair_](../_utils_key_pair_/_utils_key_pair_.keypair.md)\): `Promise`&lt;`void`&gt;

_Overrides_ [_KeyStore_](../_key_stores_keystore_/_key_stores_keystore_.keystore.md)_._[_setKey_](../_key_stores_keystore_/_key_stores_keystore_.keystore.md#setkey)

_Defined in_ [_key\_stores/unencrypted\_file\_system\_keystore.ts:54_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/key_stores/unencrypted_file_system_keystore.ts#L54)

**Parameters:**

| Name | Type |
| :--- | :--- |
| networkId | `string` |
| accountId | `string` |
| keyPair | [KeyPair](../_utils_key_pair_/_utils_key_pair_.keypair.md) |

**Returns:** `Promise`&lt;`void`&gt;

