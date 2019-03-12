---
name: TypeScript
route: /lib/ts
menu: Smart Contract API
---

# TypeScript

## TypeScript API

## External module: "near"

### Index

#### Modules

* [near](https://github.com/pndpo/docs/tree/9bcfe702f5f6ce1b5954e6ba697ddbc69a962761/docs/lib/_near_.near.md)

#### Classes

* [ContractContext](https://github.com/pndpo/docs/tree/9bcfe702f5f6ce1b5954e6ba697ddbc69a962761/docs/classes/_near_.contractcontext.md)
* [GlobalStorage](https://github.com/pndpo/docs/tree/9bcfe702f5f6ce1b5954e6ba697ddbc69a962761/docs/classes/_near_.globalstorage.md)

#### Type aliases

* [BufferTypeIndex](https://github.com/pndpo/docs/tree/9bcfe702f5f6ce1b5954e6ba697ddbc69a962761/docs/lib/_near_.md#buffertypeindex)

#### Variables

* [BUFFER\_TYPE\_CURRENT\_ACCOUNT\_ID](https://github.com/pndpo/docs/tree/9bcfe702f5f6ce1b5954e6ba697ddbc69a962761/docs/lib/_near_.md#buffer_type_current_account_id)
* [BUFFER\_TYPE\_ORIGINATOR\_ACCOUNT\_ID](https://github.com/pndpo/docs/tree/9bcfe702f5f6ce1b5954e6ba697ddbc69a962761/docs/lib/_near_.md#buffer_type_originator_account_id)
* [contractContext](https://github.com/pndpo/docs/tree/9bcfe702f5f6ce1b5954e6ba697ddbc69a962761/docs/lib/_near_.md#contractcontext-1)
* [globalStorage](https://github.com/pndpo/docs/tree/9bcfe702f5f6ce1b5954e6ba697ddbc69a962761/docs/lib/_near_.md#globalstorage-1)

#### Functions

* [input\_read\_into](https://github.com/pndpo/docs/tree/9bcfe702f5f6ce1b5954e6ba697ddbc69a962761/docs/lib/_near_.md#input_read_into)
* [input\_read\_len](https://github.com/pndpo/docs/tree/9bcfe702f5f6ce1b5954e6ba697ddbc69a962761/docs/lib/_near_.md#input_read_len)
* [read\_into](https://github.com/pndpo/docs/tree/9bcfe702f5f6ce1b5954e6ba697ddbc69a962761/docs/lib/_near_.md#read_into)
* [read\_len](https://github.com/pndpo/docs/tree/9bcfe702f5f6ce1b5954e6ba697ddbc69a962761/docs/lib/_near_.md#read_len)
* [return\_value](https://github.com/pndpo/docs/tree/9bcfe702f5f6ce1b5954e6ba697ddbc69a962761/docs/lib/_near_.md#return_value)
* [storage\_iter](https://github.com/pndpo/docs/tree/9bcfe702f5f6ce1b5954e6ba697ddbc69a962761/docs/lib/_near_.md#storage_iter)
* [storage\_iter\_next](https://github.com/pndpo/docs/tree/9bcfe702f5f6ce1b5954e6ba697ddbc69a962761/docs/lib/_near_.md#storage_iter_next)
* [storage\_iter\_peek\_into](https://github.com/pndpo/docs/tree/9bcfe702f5f6ce1b5954e6ba697ddbc69a962761/docs/lib/_near_.md#storage_iter_peek_into)
* [storage\_iter\_peek\_len](https://github.com/pndpo/docs/tree/9bcfe702f5f6ce1b5954e6ba697ddbc69a962761/docs/lib/_near_.md#storage_iter_peek_len)
* [storage\_read\_into](https://github.com/pndpo/docs/tree/9bcfe702f5f6ce1b5954e6ba697ddbc69a962761/docs/lib/_near_.md#storage_read_into)
* [storage\_read\_len](https://github.com/pndpo/docs/tree/9bcfe702f5f6ce1b5954e6ba697ddbc69a962761/docs/lib/_near_.md#storage_read_len)
* [storage\_write](https://github.com/pndpo/docs/tree/9bcfe702f5f6ce1b5954e6ba697ddbc69a962761/docs/lib/_near_.md#storage_write)

### Type aliases

#### BufferTypeIndex <a id="buffertypeindex"></a>

**Ƭ BufferTypeIndex**: `u32`

_Defined in_ [_near.ts:1_](https://github.com/nearprotocol/near-runtime-ts/blob/a6cbaa1/near.ts#L1)

### Variables

#### `<Const>` BUFFER\_TYPE\_CURRENT\_ACCOUNT\_ID <a id="buffer_type_current_account_id"></a>

**● BUFFER\_TYPE\_CURRENT\_ACCOUNT\_ID**: [_BufferTypeIndex_](https://github.com/pndpo/docs/tree/9bcfe702f5f6ce1b5954e6ba697ddbc69a962761/docs/lib/_near_.md#buffertypeindex) = 2

_Defined in_ [_near.ts:4_](https://github.com/nearprotocol/near-runtime-ts/blob/a6cbaa1/near.ts#L4)

#### `<Const>` BUFFER\_TYPE\_ORIGINATOR\_ACCOUNT\_ID <a id="buffer_type_originator_account_id"></a>

**● BUFFER\_TYPE\_ORIGINATOR\_ACCOUNT\_ID**: [_BufferTypeIndex_](https://github.com/pndpo/docs/tree/9bcfe702f5f6ce1b5954e6ba697ddbc69a962761/docs/lib/_near_.md#buffertypeindex) = 1

_Defined in_ [_near.ts:3_](https://github.com/nearprotocol/near-runtime-ts/blob/a6cbaa1/near.ts#L3)

#### `<Let>` contractContext <a id="contractcontext-1"></a>

**● contractContext**: [_ContractContext_](https://github.com/pndpo/docs/tree/9bcfe702f5f6ce1b5954e6ba697ddbc69a962761/docs/classes/_near_.contractcontext.md) = new ContractContext\(\)

_Defined in_ [_near.ts:147_](https://github.com/nearprotocol/near-runtime-ts/blob/a6cbaa1/near.ts#L147)

#### `<Let>` globalStorage <a id="globalstorage-1"></a>

**● globalStorage**: [_GlobalStorage_](https://github.com/pndpo/docs/tree/9bcfe702f5f6ce1b5954e6ba697ddbc69a962761/docs/classes/_near_.globalstorage.md) = new GlobalStorage\(\)

_Defined in_ [_near.ts:146_](https://github.com/nearprotocol/near-runtime-ts/blob/a6cbaa1/near.ts#L146)

### Functions

#### input\_read\_into <a id="input_read_into"></a>

▸ **input\_read\_into**\(ptr: `usize`\): `void`

_Defined in_ [_near.ts:299_](https://github.com/nearprotocol/near-runtime-ts/blob/a6cbaa1/near.ts#L299)

**Parameters:**

| Name | Type |
| :--- | :--- |
| ptr | `usize` |

**Returns:** `void`

#### input\_read\_len <a id="input_read_len"></a>

▸ **input\_read\_len**\(\): `usize`

_Defined in_ [_near.ts:297_](https://github.com/nearprotocol/near-runtime-ts/blob/a6cbaa1/near.ts#L297)

**Returns:** `usize`

#### read\_into <a id="read_into"></a>

▸ **read\_into**\(type\_index: `u32`, key: `usize`, value: `usize`\): `void`

_Defined in_ [_near.ts:307_](https://github.com/nearprotocol/near-runtime-ts/blob/a6cbaa1/near.ts#L307)

**Parameters:**

| Name | Type |
| :--- | :--- |
| type\_index | `u32` |
| key | `usize` |
| value | `usize` |

**Returns:** `void`

#### read\_len <a id="read_len"></a>

▸ **read\_len**\(type\_index: `u32`, key: `usize`\): `u32`

_Defined in_ [_near.ts:305_](https://github.com/nearprotocol/near-runtime-ts/blob/a6cbaa1/near.ts#L305)

**Parameters:**

| Name | Type |
| :--- | :--- |
| type\_index | `u32` |
| key | `usize` |

**Returns:** `u32`

#### return\_value <a id="return_value"></a>

▸ **return\_value**\(value\_ptr: `usize`\): `void`

_Defined in_ [_near.ts:302_](https://github.com/nearprotocol/near-runtime-ts/blob/a6cbaa1/near.ts#L302)

**Parameters:**

| Name | Type |
| :--- | :--- |
| value\_ptr | `usize` |

**Returns:** `void`

#### storage\_iter <a id="storage_iter"></a>

▸ **storage\_iter**\(prefix: `usize`\): `u32`

_Defined in_ [_near.ts:288_](https://github.com/nearprotocol/near-runtime-ts/blob/a6cbaa1/near.ts#L288)

**Parameters:**

| Name | Type |
| :--- | :--- |
| prefix | `usize` |

**Returns:** `u32`

#### storage\_iter\_next <a id="storage_iter_next"></a>

▸ **storage\_iter\_next**\(id: `u32`\): `u32`

_Defined in_ [_near.ts:290_](https://github.com/nearprotocol/near-runtime-ts/blob/a6cbaa1/near.ts#L290)

**Parameters:**

| Name | Type |
| :--- | :--- |
| id | `u32` |

**Returns:** `u32`

#### storage\_iter\_peek\_into <a id="storage_iter_peek_into"></a>

▸ **storage\_iter\_peek\_into**\(id: `u32`, value: `usize`\): `void`

_Defined in_ [_near.ts:294_](https://github.com/nearprotocol/near-runtime-ts/blob/a6cbaa1/near.ts#L294)

**Parameters:**

| Name | Type |
| :--- | :--- |
| id | `u32` |
| value | `usize` |

**Returns:** `void`

#### storage\_iter\_peek\_len <a id="storage_iter_peek_len"></a>

▸ **storage\_iter\_peek\_len**\(id: `u32`\): `usize`

_Defined in_ [_near.ts:292_](https://github.com/nearprotocol/near-runtime-ts/blob/a6cbaa1/near.ts#L292)

**Parameters:**

| Name | Type |
| :--- | :--- |
| id | `u32` |

**Returns:** `usize`

#### storage\_read\_into <a id="storage_read_into"></a>

▸ **storage\_read\_into**\(key: `usize`, value: `usize`\): `void`

_Defined in_ [_near.ts:286_](https://github.com/nearprotocol/near-runtime-ts/blob/a6cbaa1/near.ts#L286)

**Parameters:**

| Name | Type |
| :--- | :--- |
| key | `usize` |
| value | `usize` |

**Returns:** `void`

#### storage\_read\_len <a id="storage_read_len"></a>

▸ **storage\_read\_len**\(key: `usize`\): `usize`

_Defined in_ [_near.ts:284_](https://github.com/nearprotocol/near-runtime-ts/blob/a6cbaa1/near.ts#L284)

**Parameters:**

| Name | Type |
| :--- | :--- |
| key | `usize` |

**Returns:** `usize`

#### storage\_write <a id="storage_write"></a>

▸ **storage\_write**\(key: `usize`, value: `usize`\): `void`

_Defined in_ [_near.ts:282_](https://github.com/nearprotocol/near-runtime-ts/blob/a6cbaa1/near.ts#L282)

**Parameters:**

| Name | Type |
| :--- | :--- |
| key | `usize` |
| value | `usize` |

**Returns:** `void`

