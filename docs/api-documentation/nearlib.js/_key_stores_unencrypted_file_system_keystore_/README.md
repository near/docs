# "key\_stores/unencrypted\_file\_system\_keystore"

## Index

#### Classes

* [UnencryptedFileSystemKeyStore](_key_stores_unencrypted_file_system_keystore_.unencryptedfilesystemkeystore.md)

#### Interfaces

* [AccountInfo](_key_stores_unencrypted_file_system_keystore_.accountinfo.md)

#### Variables

* [exists](./#exists)
* [mkdir](./#mkdir)
* [readFile](./#readfile)
* [readdir](./#readdir)
* [unlink](./#unlink)
* [writeFile](./#writefile)

#### Functions

* [ensureDir](./#ensuredir)
* [loadJsonFile](./#loadjsonfile)
* [promisify](./#promisify)

## Variables

### `<Const>` exists <a id="exists"></a>

**● exists**: _`Function`_ = promisify\(fs.exists\)

_Defined in_ [_key\_stores/unencrypted\_file\_system\_keystore.ts:18_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/key_stores/unencrypted_file_system_keystore.ts#L18)

### `<Const>` mkdir <a id="mkdir"></a>

**● mkdir**: _`Function`_ = promisify\(fs.mkdir\)

_Defined in_ [_key\_stores/unencrypted\_file\_system\_keystore.ts:23_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/key_stores/unencrypted_file_system_keystore.ts#L23)

### `<Const>` readFile <a id="readfile"></a>

**● readFile**: _`Function`_ = promisify\(fs.readFile\)

_Defined in_ [_key\_stores/unencrypted\_file\_system\_keystore.ts:19_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/key_stores/unencrypted_file_system_keystore.ts#L19)

### `<Const>` readdir <a id="readdir"></a>

**● readdir**: _`Function`_ = promisify\(fs.readdir\)

_Defined in_ [_key\_stores/unencrypted\_file\_system\_keystore.ts:22_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/key_stores/unencrypted_file_system_keystore.ts#L22)

### `<Const>` unlink <a id="unlink"></a>

**● unlink**: _`Function`_ = promisify\(fs.unlink\)

_Defined in_ [_key\_stores/unencrypted\_file\_system\_keystore.ts:21_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/key_stores/unencrypted_file_system_keystore.ts#L21)

### `<Const>` writeFile <a id="writefile"></a>

**● writeFile**: _`Function`_ = promisify\(fs.writeFile\)

_Defined in_ [_key\_stores/unencrypted\_file\_system\_keystore.ts:20_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/key_stores/unencrypted_file_system_keystore.ts#L20)

## Functions

### ensureDir <a id="ensuredir"></a>

▸ **ensureDir**\(path: _`string`_\): `Promise`&lt;`void`&gt;

_Defined in_ [_key\_stores/unencrypted\_file\_system\_keystore.ts:38_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/key_stores/unencrypted_file_system_keystore.ts#L38)

**Parameters:**

| Name | Type |
| :--- | :--- |
| path | `string` |

**Returns:** `Promise`&lt;`void`&gt;

### loadJsonFile <a id="loadjsonfile"></a>

▸ **loadJsonFile**\(path: _`string`_\): `Promise`&lt;`any`&gt;

_Defined in_ [_key\_stores/unencrypted\_file\_system\_keystore.ts:33_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/key_stores/unencrypted_file_system_keystore.ts#L33)

**Parameters:**

| Name | Type |
| :--- | :--- |
| path | `string` |

**Returns:** `Promise`&lt;`any`&gt;

### `<Const>` promisify <a id="promisify"></a>

▸ **promisify**\(fn: _`any`_\): `Function`

_Defined in_ [_key\_stores/unencrypted\_file\_system\_keystore.ts:9_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/key_stores/unencrypted_file_system_keystore.ts#L9)

**Parameters:**

| Name | Type |
| :--- | :--- |
| fn | `any` |

**Returns:** `Function`

