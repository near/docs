# ContractPromise ContractPromiseResult

[near-runtime-ts](../) &gt; "near" &gt; [ContractPromise](contractpromise-contractpromiseresult.md)

## Class: ContractPromise

### Hierarchy

**ContractPromise**

### Index

#### Properties

* id

#### Methods

* returnAsResult
* then
* all
* create
* getResults

### Properties

#### id <a id="id"></a>

**● id**: `i32`

_Defined in_ [_near.ts:901_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L901)

### Methods

#### returnAsResult <a id="returnasresult"></a>

▸ **returnAsResult**\(\): `void`

_Defined in_ [_near.ts:934_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L934)

**Returns:** `void`

#### then <a id="then"></a>

▸ **then**\(methodName: `string`, args: `Uint8Array`, mana: `u32`\): [ContractPromise](_near_.contractpromise.md)

_Defined in_ [_near.ts:920_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L920)

**Parameters:**

| Name | Type |
| :--- | :--- |
| methodName | `string` |
| args | `Uint8Array` |
| mana | `u32` |

**Returns:** [ContractPromise](_near_.contractpromise.md)

#### `<Static>` all <a id="all"></a>

▸ **all**\(promises: [_ContractPromise_](_near_.contractpromise.md)_\[\]_\): [ContractPromise](_near_.contractpromise.md)

_Defined in_ [_near.ts:938_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L938)

**Parameters:**

| Name | Type |
| :--- | :--- |
| promises | [ContractPromise](_near_.contractpromise.md)\[\] |

**Returns:** [ContractPromise](_near_.contractpromise.md)

#### `<Static>` create <a id="create"></a>

▸ **create**\(contractName: `string`, methodName: `string`, args: `Uint8Array`, mana: `u32`, amount?: `u64`\): [ContractPromise](_near_.contractpromise.md)

_Defined in_ [_near.ts:903_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L903)

**Parameters:**

| Name | Type | Default value |
| :--- | :--- | :--- |
| contractName | `string` | - |
| methodName | `string` | - |
| args | `Uint8Array` | - |
| mana | `u32` | - |
| `Default value` amount | `u64` | 0 |

**Returns:** [ContractPromise](_near_.contractpromise.md)

#### `<Static>` getResults <a id="getresults"></a>

▸ **getResults**\(\): [ContractPromiseResult](_near_.contractpromiseresult.md)\[\]

_Defined in_ [_near.ts:947_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L947)

**Returns:** [ContractPromiseResult](_near_.contractpromiseresult.md)\[\]

[near-runtime-ts](../README.md) &gt; ["near"](../modules/_near_.md) &gt; [ContractPromiseResult](../classes/_near_.contractpromiseresult.md)

## Class: ContractPromiseResult

### Hierarchy

**ContractPromiseResult**

### Index

#### Properties

* [buffer](_near_.contractpromiseresult.md#buffer)
* [success](_near_.contractpromiseresult.md#success)

### Properties

#### buffer <a id="buffer"></a>

**● buffer**: `Uint8Array`

_Defined in_ [_near.ts:965_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L965)

#### success <a id="success"></a>

**● success**: `bool`

_Defined in_ [_near.ts:964_](https://github.com/nearprotocol/near-runtime-ts/blob/30d6281/near.ts#L964)

