# BrowserLocalStorageKeyStore

## Hierarchy

[KeyStore](../_key_stores_keystore_/_key_stores_keystore_.keystore.md)

**↳ BrowserLocalStorageKeyStore**

## Constructors

### constructor <a id="constructor"></a>

⊕ **new BrowserLocalStorageKeyStore**\(localStorage?: _`any`_, prefix?: _`string`_\): [BrowserLocalStorageKeyStore](_key_stores_browser_local_storage_key_store_.browserlocalstoragekeystore.md)

_Defined in_ [_key\_stores/browser\_local\_storage\_key\_store.ts:10_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/key_stores/browser_local_storage_key_store.ts#L10)

**Parameters:**

| Name | Type | Default value |
| :--- | :--- | :--- |
| `Default value` localStorage | `any` | window.localStorage |
| `Default value` prefix | `string` | LOCAL\_STORAGE\_KEY\_PREFIX |

**Returns:** [BrowserLocalStorageKeyStore](_key_stores_browser_local_storage_key_store_.browserlocalstoragekeystore.md)

## Properties

### `<Private>` localStorage <a id="localstorage"></a>

**● localStorage**: _`any`_

_Defined in_ [_key\_stores/browser\_local\_storage\_key\_store.ts:9_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/key_stores/browser_local_storage_key_store.ts#L9)

### `<Private>` prefix <a id="prefix"></a>

**● prefix**: _`string`_

_Defined in_ [_key\_stores/browser\_local\_storage\_key\_store.ts:10_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/key_stores/browser_local_storage_key_store.ts#L10)

## Methods

### clear <a id="clear"></a>

▸ **clear**\(\): `Promise`&lt;`void`&gt;

_Overrides_ [_KeyStore_](../_key_stores_keystore_/_key_stores_keystore_.keystore.md)_._[_clear_](../_key_stores_keystore_/_key_stores_keystore_.keystore.md#clear)

_Defined in_ [_key\_stores/browser\_local\_storage\_key\_store.ts:34_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/key_stores/browser_local_storage_key_store.ts#L34)

**Returns:** `Promise`&lt;`void`&gt;

### getAccounts <a id="getaccounts"></a>

▸ **getAccounts**\(networkId: _`string`_\): `Promise`&lt;`string`\[\]&gt;

_Overrides_ [_KeyStore_](../_key_stores_keystore_/_key_stores_keystore_.keystore.md)_._[_getAccounts_](../_key_stores_keystore_/_key_stores_keystore_.keystore.md#getaccounts)

_Defined in_ [_key\_stores/browser\_local\_storage\_key\_store.ts:53_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/key_stores/browser_local_storage_key_store.ts#L53)

**Parameters:**

| Name | Type |
| :--- | :--- |
| networkId | `string` |

**Returns:** `Promise`&lt;`string`\[\]&gt;

### getKey <a id="getkey"></a>

▸ **getKey**\(networkId: _`string`_, accountId: _`string`_\): `Promise`&lt;[KeyPair](../_utils_key_pair_/_utils_key_pair_.keypair.md)&gt;

_Overrides_ [_KeyStore_](../_key_stores_keystore_/_key_stores_keystore_.keystore.md)_._[_getKey_](../_key_stores_keystore_/_key_stores_keystore_.keystore.md#getkey)

_Defined in_ [_key\_stores/browser\_local\_storage\_key\_store.ts:22_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/key_stores/browser_local_storage_key_store.ts#L22)

**Parameters:**

| Name | Type |
| :--- | :--- |
| networkId | `string` |
| accountId | `string` |

**Returns:** `Promise`&lt;[KeyPair](../_utils_key_pair_/_utils_key_pair_.keypair.md)&gt;

### getNetworks <a id="getnetworks"></a>

▸ **getNetworks**\(\): `Promise`&lt;`string`\[\]&gt;

_Overrides_ [_KeyStore_](../_key_stores_keystore_/_key_stores_keystore_.keystore.md)_._[_getNetworks_](../_key_stores_keystore_/_key_stores_keystore_.keystore.md#getnetworks)

_Defined in_ [_key\_stores/browser\_local\_storage\_key\_store.ts:42_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/key_stores/browser_local_storage_key_store.ts#L42)

**Returns:** `Promise`&lt;`string`\[\]&gt;

### removeKey <a id="removekey"></a>

▸ **removeKey**\(networkId: _`string`_, accountId: _`string`_\): `Promise`&lt;`void`&gt;

_Overrides_ [_KeyStore_](../_key_stores_keystore_/_key_stores_keystore_.keystore.md)_._[_removeKey_](../_key_stores_keystore_/_key_stores_keystore_.keystore.md#removekey)

_Defined in_ [_key\_stores/browser\_local\_storage\_key\_store.ts:30_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/key_stores/browser_local_storage_key_store.ts#L30)

**Parameters:**

| Name | Type |
| :--- | :--- |
| networkId | `string` |
| accountId | `string` |

**Returns:** `Promise`&lt;`void`&gt;

### setKey <a id="setkey"></a>

▸ **setKey**\(networkId: _`string`_, accountId: _`string`_, keyPair: [_KeyPair_](../_utils_key_pair_/_utils_key_pair_.keypair.md)\): `Promise`&lt;`void`&gt;

_Overrides_ [_KeyStore_](../_key_stores_keystore_/_key_stores_keystore_.keystore.md)_._[_setKey_](../_key_stores_keystore_/_key_stores_keystore_.keystore.md#setkey)

_Defined in_ [_key\_stores/browser\_local\_storage\_key\_store.ts:18_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/key_stores/browser_local_storage_key_store.ts#L18)

**Parameters:**

| Name | Type |
| :--- | :--- |
| networkId | `string` |
| accountId | `string` |
| keyPair | [KeyPair](../_utils_key_pair_/_utils_key_pair_.keypair.md) |

**Returns:** `Promise`&lt;`void`&gt;

### `<Private>` storageKeyForSecretKey <a id="storagekeyforsecretkey"></a>

▸ **storageKeyForSecretKey**\(networkId: _`string`_, accountId: _`string`_\): `string`

_Defined in_ [_key\_stores/browser\_local\_storage\_key\_store.ts:66_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/key_stores/browser_local_storage_key_store.ts#L66)

**Parameters:**

| Name | Type |
| :--- | :--- |
| networkId | `string` |
| accountId | `string` |

**Returns:** `string`

### `<Private>` storageKeys <a id="storagekeys"></a>

▸ **storageKeys**\(\): `IterableIterator`&lt;`string`&gt;

_Defined in_ [_key\_stores/browser\_local\_storage\_key\_store.ts:70_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/key_stores/browser_local_storage_key_store.ts#L70)

**Returns:** `IterableIterator`&lt;`string`&gt;

