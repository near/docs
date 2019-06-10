# Utility module: near

[near-runtime-ts](../) &gt; "near" &gt; [near](utility-module-near.md)

## Module: near

### Index

#### Functions

* base58
* hash
* hash32
* log
* random32
* randomBuffer
* str

### Functions

#### base58   <a id="base58"></a>

▸ **base58**\(source: `Uint8Array`\): `string`

_Defined in_ [_near.ts:846_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L846)

**Parameters:**

| Name | Type |
| :--- | :--- |
| source | `Uint8Array` |

**Returns:** `string`

#### hash   <a id="hash"></a>

▸ **hash**&lt;`T`&gt;\(data: `T`\): `Uint8Array`

_Defined in_ [_near.ts:796_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L796)

Hash given data. Returns hash as 32-byte array.

**Type parameters:**

**T**

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| data | `T` | data can be passed as either Uint8Array or anything with .toString \(hashed as UTF-8 string\). |

**Returns:** `Uint8Array`

#### hash32   <a id="hash32"></a>

▸ **hash32**&lt;`T`&gt;\(data: `T`\): `u32`

_Defined in_ [_near.ts:811_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L811)

Hash given data. Returns hash as 32-bit integer.

**Type parameters:**

**T**

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| data | `T` | data can be passed as either Uint8Array or anything with .toString \(hashed as UTF-8 string\). |

**Returns:** `u32`

#### log   <a id="log"></a>

▸ **log**\(msg: `string`\): `void`

_Defined in_ [_near.ts:837_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L837)

**Parameters:**

| Name | Type |
| :--- | :--- |
| msg | `string` |

**Returns:** `void`

#### random32   <a id="random32"></a>

▸ **random32**\(\): `u32`

_Defined in_ [_near.ts:833_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L833)

Returns random 32-bit integer.

**Returns:** `u32`

#### randomBuffer   <a id="randombuffer"></a>

▸ **randomBuffer**\(len: `u32`\): `Uint8Array`

_Defined in_ [_near.ts:824_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L824)

Returns random byte buffer of given length.

**Parameters:**

| Name | Type |
| :--- | :--- |
| len | `u32` |

**Returns:** `Uint8Array`

#### str   <a id="str"></a>

▸ **str**&lt;`T`&gt;\(value: `T`\): `string`

_Defined in_ [_near.ts:841_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L841)

**Type parameters:**

**T**

**Parameters:**

| Name | Type |
| :--- | :--- |
| value | `T` |

**Returns:** `string`

