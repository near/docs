# "utils/web"

## Index

#### Interfaces

* [ConnectionInfo](_utils_web_.connectioninfo.md)

#### Variables

* [fetch](./#fetch)

#### Functions

* [fetchJson](./#fetchjson)

## Variables

### `<Const>` fetch <a id="fetch"></a>

**● fetch**: _`any`_ = \(typeof window === 'undefined' \|\| window.name === 'nodejs'\) ? require\('node-fetch'\) : window.fetch

_Defined in_ [_utils/web.ts:14_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/utils/web.ts#L14)

## Functions

### fetchJson <a id="fetchjson"></a>

▸ **fetchJson**\(connection: _`string` \|_ [_ConnectionInfo_](_utils_web_.connectioninfo.md), json?: _`string`_\): `Promise`&lt;`any`&gt;

_Defined in_ [_utils/web.ts:16_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/utils/web.ts#L16)

**Parameters:**

| Name | Type |
| :--- | :--- |
| connection | `string` \| [ConnectionInfo](_utils_web_.connectioninfo.md) |
| `Optional` json | `string` |

**Returns:** `Promise`&lt;`any`&gt;

