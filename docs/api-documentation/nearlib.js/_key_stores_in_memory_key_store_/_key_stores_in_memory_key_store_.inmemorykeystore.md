# InMemoryKeyStore

Simple in-memory keystore for testing purposes.

## Hierarchy

[KeyStore](../_key_stores_keystore_/_key_stores_keystore_.keystore.md)

**↳ InMemoryKeyStore**

## Constructors

### constructor <a id="constructor"></a>

⊕ **new InMemoryKeyStore**\(\): [InMemoryKeyStore](_key_stores_in_memory_key_store_.inmemorykeystore.md)

_Defined in_ [_key\_stores/in\_memory\_key\_store.ts:10_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/key_stores/in_memory_key_store.ts#L10)

**Returns:** [InMemoryKeyStore](_key_stores_in_memory_key_store_.inmemorykeystore.md)

## Properties

### `<Private>` keys <a id="keys"></a>

**● keys**: _`object`_

_Defined in_ [_key\_stores/in\_memory\_key\_store.ts:10_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/key_stores/in_memory_key_store.ts#L10)

#### Type declaration

## Methods

### clear <a id="clear"></a>

▸ **clear**\(\): `Promise`&lt;`void`&gt;

_Overrides_ [_KeyStore_](../_key_stores_keystore_/_key_stores_keystore_.keystore.md)_._[_clear_](../_key_stores_keystore_/_key_stores_keystore_.keystore.md#clear)

_Defined in_ [_key\_stores/in\_memory\_key\_store.ts:33_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/key_stores/in_memory_key_store.ts#L33)

**Returns:** `Promise`&lt;`void`&gt;

### getAccounts <a id="getaccounts"></a>

▸ **getAccounts**\(networkId: _`string`_\): `Promise`&lt;`string`\[\]&gt;

_Overrides_ [_KeyStore_](../_key_stores_keystore_/_key_stores_keystore_.keystore.md)_._[_getAccounts_](../_key_stores_keystore_/_key_stores_keystore_.keystore.md#getaccounts)

_Defined in_ [_key\_stores/in\_memory\_key\_store.ts:46_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/key_stores/in_memory_key_store.ts#L46)

**Parameters:**

| Name | Type |
| :--- | :--- |
| networkId | `string` |

**Returns:** `Promise`&lt;`string`\[\]&gt;

### getKey <a id="getkey"></a>

▸ **getKey**\(networkId: _`string`_, accountId: _`string`_\): `Promise`&lt;[KeyPair](../_utils_key_pair_/_utils_key_pair_.keypair.md)&gt;

_Overrides_ [_KeyStore_](../_key_stores_keystore_/_key_stores_keystore_.keystore.md)_._[_getKey_](../_key_stores_keystore_/_key_stores_keystore_.keystore.md#getkey)

_Defined in_ [_key\_stores/in\_memory\_key\_store.ts:21_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/key_stores/in_memory_key_store.ts#L21)

**Parameters:**

| Name | Type |
| :--- | :--- |
| networkId | `string` |
| accountId | `string` |

**Returns:** `Promise`&lt;[KeyPair](../_utils_key_pair_/_utils_key_pair_.keypair.md)&gt;

### getNetworks <a id="getnetworks"></a>

▸ **getNetworks**\(\): `Promise`&lt;`string`\[\]&gt;

_Overrides_ [_KeyStore_](../_key_stores_keystore_/_key_stores_keystore_.keystore.md)_._[_getNetworks_](../_key_stores_keystore_/_key_stores_keystore_.keystore.md#getnetworks)

_Defined in_ [_key\_stores/in\_memory\_key\_store.ts:37_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/key_stores/in_memory_key_store.ts#L37)

**Returns:** `Promise`&lt;`string`\[\]&gt;

### removeKey <a id="removekey"></a>

▸ **removeKey**\(networkId: _`string`_, accountId: _`string`_\): `Promise`&lt;`void`&gt;

_Overrides_ [_KeyStore_](../_key_stores_keystore_/_key_stores_keystore_.keystore.md)_._[_removeKey_](../_key_stores_keystore_/_key_stores_keystore_.keystore.md#removekey)

_Defined in_ [_key\_stores/in\_memory\_key\_store.ts:29_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/key_stores/in_memory_key_store.ts#L29)

**Parameters:**

| Name | Type |
| :--- | :--- |
| networkId | `string` |
| accountId | `string` |

**Returns:** `Promise`&lt;`void`&gt;

### setKey <a id="setkey"></a>

▸ **setKey**\(networkId: _`string`_, accountId: _`string`_, keyPair: [_KeyPair_](../_utils_key_pair_/_utils_key_pair_.keypair.md)\): `Promise`&lt;`void`&gt;

_Overrides_ [_KeyStore_](../_key_stores_keystore_/_key_stores_keystore_.keystore.md)_._[_setKey_](../_key_stores_keystore_/_key_stores_keystore_.keystore.md#setkey)

_Defined in_ [_key\_stores/in\_memory\_key\_store.ts:17_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/key_stores/in_memory_key_store.ts#L17)

**Parameters:**

| Name | Type |
| :--- | :--- |
| networkId | `string` |
| accountId | `string` |
| keyPair | [KeyPair](../_utils_key_pair_/_utils_key_pair_.keypair.md) |

**Returns:** `Promise`&lt;`void`&gt;

