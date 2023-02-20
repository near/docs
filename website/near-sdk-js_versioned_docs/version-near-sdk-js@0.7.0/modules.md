---
id: "modules"
title: "near-sdk-js"
sidebar_label: "Modules"
sidebar_position: 0
custom_edit_url: null
---

## Namespaces

- [near](namespaces/near.md)

## Enumerations

- [CurveType](enums/CurveType.md)
- [PromiseError](enums/PromiseError.md)
- [PromiseResult](enums/PromiseResult.md)

## Classes

- [AddAccessKey](classes/AddAccessKey.md)
- [AddFullAccessKey](classes/AddFullAccessKey.md)
- [Base58Error](classes/Base58Error.md)
- [CreateAccount](classes/CreateAccount.md)
- [DeleteAccount](classes/DeleteAccount.md)
- [DeleteKey](classes/DeleteKey.md)
- [DeployContract](classes/DeployContract.md)
- [FunctionCall](classes/FunctionCall.md)
- [FunctionCallRaw](classes/FunctionCallRaw.md)
- [FunctionCallWeight](classes/FunctionCallWeight.md)
- [FunctionCallWeightRaw](classes/FunctionCallWeightRaw.md)
- [InvalidLengthError](classes/InvalidLengthError.md)
- [LookupMap](classes/LookupMap.md)
- [LookupSet](classes/LookupSet.md)
- [NearPromise](classes/NearPromise.md)
- [ParsePublicKeyError](classes/ParsePublicKeyError.md)
- [PromiseAction](classes/PromiseAction.md)
- [PromiseJoint](classes/PromiseJoint.md)
- [PublicKey](classes/PublicKey.md)
- [Stake](classes/Stake.md)
- [TextDecoder](classes/TextDecoder.md)
- [TextEncoder](classes/TextEncoder.md)
- [Transfer](classes/Transfer.md)
- [UnknownCurve](classes/UnknownCurve.md)
- [UnorderedMap](classes/UnorderedMap.md)
- [UnorderedSet](classes/UnorderedSet.md)
- [Vector](classes/Vector.md)
- [VectorIterator](classes/VectorIterator.md)

## Interfaces

- [Env](interfaces/Env.md)
- [IntoStorageKey](interfaces/IntoStorageKey.md)

## Type Aliases

### AccountId

Ƭ **AccountId**: `string`

A string that represents a NEAR account ID.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/types/account_id.ts:4](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/types/account_id.ts#L4)

___

### Balance

Ƭ **Balance**: `bigint`

The amount of tokens in yoctoNEAR.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/types/primitives.ts:16](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/types/primitives.ts#L16)

___

### BlockHeight

Ƭ **BlockHeight**: `bigint`

A large integer representing the block height.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/types/primitives.ts:8](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/types/primitives.ts#L8)

___

### EpochHeight

Ƭ **EpochHeight**: `bigint`

A large integer representing the epoch height.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/types/primitives.ts:12](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/types/primitives.ts#L12)

___

### Gas

Ƭ **Gas**: `bigint`

The Gas amount specified in yoctoNEAR.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/types/gas.ts:4](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/types/gas.ts#L4)

___

### GasWeight

Ƭ **GasWeight**: `bigint`

The amount of Gas Weight in integers - whole numbers.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/types/primitives.ts:24](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/types/primitives.ts#L24)

___

### IteratorIndex

Ƭ **IteratorIndex**: `bigint`

The index for iterators.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/types/vm_types.ts:8](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/types/vm_types.ts#L8)

___

### Mutable

Ƭ **Mutable**<`T`\>: { -readonly [P in keyof T]: T[P] }

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/utils.ts:70](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/utils.ts#L70)

___

### NearAmount

Ƭ **NearAmount**: `number` \| `bigint`

A number that specifies the amount of NEAR in yoctoNEAR.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/utils.ts:23](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/utils.ts#L23)

___

### Nonce

Ƭ **Nonce**: `bigint`

A large integer representing the nonce.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/types/primitives.ts:20](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/types/primitives.ts#L20)

___

### PromiseIndex

Ƭ **PromiseIndex**: `number` \| `bigint` & `PromiseIndexBrand`

A PromiseIndex which represents the ID of a NEAR Promise.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/utils.ts:19](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/utils.ts#L19)

___

### PromiseOrValue

Ƭ **PromiseOrValue**<`T`\>: [`NearPromise`](classes/NearPromise.md) \| `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/promise.ts:650](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/promise.ts#L650)

___

### ReceiptIndex

Ƭ **ReceiptIndex**: `bigint`

The index for NEAR receipts.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/types/vm_types.ts:4](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/types/vm_types.ts#L4)

___

### Register

Ƭ **Register**: `number` \| `bigint`

A number that specifies the ID of a register in the NEAR WASM virtual machine.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/utils.ts:27](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/utils.ts#L27)

___

### StorageUsage

Ƭ **StorageUsage**: `bigint`

The amount of storage used in yoctoNEAR.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/types/primitives.ts:4](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/types/primitives.ts#L4)

## Variables

### ERR\_INCONSISTENT\_STATE

• `Const` **ERR\_INCONSISTENT\_STATE**: ``"The collection is an inconsistent state. Did previous smart contract execution terminate unexpectedly?"``

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/utils.ts:35](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/utils.ts#L35)

___

### ERR\_INDEX\_OUT\_OF\_BOUNDS

• `Const` **ERR\_INDEX\_OUT\_OF\_BOUNDS**: ``"Index out of bounds"``

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/utils.ts:37](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/utils.ts#L37)

___

### ONE\_NEAR

• `Const` **ONE\_NEAR**: [`Balance`](modules.md#balance)

One NEAR. 1 NEAR = 10^24 yoctoNEAR.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/types/primitives.ts:32](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/types/primitives.ts#L32)

___

### ONE\_TERA\_GAS

• `Const` **ONE\_TERA\_GAS**: [`Gas`](modules.md#gas)

One TGas - Tera Gas. 10^12 yoctoNEAR.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/types/gas.ts:8](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/types/gas.ts#L8)

___

### ONE\_YOCTO

• `Const` **ONE\_YOCTO**: [`Balance`](modules.md#balance)

One yoctoNEAR. 10^-24 NEAR.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/types/primitives.ts:28](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/types/primitives.ts#L28)

## Functions

### NearBindgen

▸ **NearBindgen**(`options`): `any`

Extends this class with the methods needed to make the contract storable/serializable and readable/deserializable to and from the blockchain.
Also tells the SDK to capture and expose all view, call and initialize functions.
Tells the SDK whether the contract requires initialization and whether to use a custom serialization/deserialization function when storing/reading the state.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | Options to configure the contract behaviour. |
| `options.requireInit?` | `boolean` | Whether the contract requires initialization. |
| `options.deserializer?` | (`value`: `Uint8Array`) => `unknown` | - |
| `options.serializer?` | (`value`: `unknown`) => `Uint8Array` | - |

#### Returns

`any`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/near-bindgen.ts:146](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/near-bindgen.ts#L146)

___

### assert

▸ **assert**(`expression`, `message`): asserts expression

Asserts that the expression passed to the function is truthy, otherwise throws a new Error with the provided message.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `unknown` | The expression to be asserted. |
| `message` | `string` | The error message to be printed. |

#### Returns

asserts expression

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/utils.ts:61](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/utils.ts#L61)

___

### bytes

▸ **bytes**(`s`): `Uint8Array`

Convert a string to Uint8Array, each character must have a char code between 0-255.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `s` | `string` | string that with only Latin1 character to convert |

#### Returns

`Uint8Array`

result Uint8Array

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/utils.ts:195](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/utils.ts#L195)

___

### call

▸ **call**(`options`): `DecoratorFunction`

Tells the SDK to expose this function as a call function.
Adds the neccessary checks if the function is private or payable.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | Options to configure the function behaviour. |
| `options.payableFunction?` | `boolean` | Whether the function can accept an attached deposit. |
| `options.privateFunction?` | `boolean` | Whether the function can be called by other contracts. |

#### Returns

`DecoratorFunction`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/near-bindgen.ts:52](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/near-bindgen.ts#L52)

___

### concat

▸ **concat**(`array1`, `array2`): `Uint8Array`

Concat two Uint8Array

#### Parameters

| Name | Type |
| :------ | :------ |
| `array1` | `Uint8Array` |
| `array2` | `Uint8Array` |

#### Returns

`Uint8Array`

the concatenation of two array

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/utils.ts:48](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/utils.ts#L48)

___

### curveTypeFromStr

▸ **curveTypeFromStr**(`value`): [`CurveType`](enums/CurveType.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

[`CurveType`](enums/CurveType.md)

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/types/public_key.ts:49](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/types/public_key.ts#L49)

___

### decode

▸ **decode**(`a`): `string`

Decode the Uint8Array to string in UTF-8 encoding

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `a` | `Uint8Array` | array to decode |

#### Returns

`string`

result string

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/utils.ts:222](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/utils.ts#L222)

___

### deserialize

▸ **deserialize**(`valueToDeserialize`): `unknown`

#### Parameters

| Name | Type |
| :------ | :------ |
| `valueToDeserialize` | `Uint8Array` |

#### Returns

`unknown`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/utils.ts:130](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/utils.ts#L130)

___

### encode

▸ **encode**(`s`): `Uint8Array`

Encode the string to Uint8Array with UTF-8 encoding

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `s` | `string` | String to encode |

#### Returns

`Uint8Array`

result Uint8Array

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/utils.ts:213](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/utils.ts#L213)

___

### getValueWithOptions

▸ **getValueWithOptions**<`DataType`\>(`value`, `options?`): `DataType` \| ``null``

#### Type parameters

| Name |
| :------ |
| `DataType` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Uint8Array` |
| `options` | `Omit`<`GetOptions`<`DataType`\>, ``"serializer"``\> |

#### Returns

`DataType` \| ``null``

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/utils.ts:72](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/utils.ts#L72)

___

### includeBytes

▸ **includeBytes**(`pathToWasm`): `string`

A macro that reads the WASM code from the specified path at compile time.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pathToWasm` | `string` | The path to the WASM file to read code from. |

#### Returns

`string`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/near-bindgen.ts:222](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/near-bindgen.ts#L222)

___

### initialize

▸ **initialize**(`_empty`): `DecoratorFunction`

Tells the SDK to use this function as the initialization function of the contract.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `_empty` | `EmptyParameterObject` | An empty object. |

#### Returns

`DecoratorFunction`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/near-bindgen.ts:18](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/near-bindgen.ts#L18)

___

### middleware

▸ **middleware**<`Arguments`\>(`...middlewares`): `DecoratorFunction`

Tells the SDK to apply an array of passed in middleware to the function execution.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Arguments` | extends `any`[] |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...middlewares` | `Middleware`<`Arguments`\>[] | The middlewares to be executed. |

#### Returns

`DecoratorFunction`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/near-bindgen.ts:111](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/near-bindgen.ts#L111)

___

### serialize

▸ **serialize**(`valueToSerialize`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `valueToSerialize` | `unknown` |

#### Returns

`Uint8Array`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/utils.ts:104](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/utils.ts#L104)

___

### serializeValueWithOptions

▸ **serializeValueWithOptions**<`DataType`\>(`value`, `«destructured»?`): `Uint8Array`

#### Type parameters

| Name |
| :------ |
| `DataType` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `DataType` |
| `«destructured»` | `Pick`<`GetOptions`<`DataType`\>, ``"serializer"``\> |

#### Returns

`Uint8Array`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/utils.ts:95](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/utils.ts#L95)

___

### str

▸ **str**(`a`): `string`

Convert a Uint8Array to string, each uint8 to the single character of that char code

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `a` | `Uint8Array` | Uint8Array to convert |

#### Returns

`string`

result string

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/utils.ts:204](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/utils.ts#L204)

___

### validateAccountId

▸ **validateAccountId**(`accountId`): `boolean`

Validates the Account ID according to the NEAR protocol
[Account ID rules](https://nomicon.io/DataStructures/Account#account-id-rules).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `accountId` | `string` | The Account ID string you want to validate. |

#### Returns

`boolean`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/utils.ts:156](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/utils.ts#L156)

___

### view

▸ **view**(`_empty`): `DecoratorFunction`

Tells the SDK to expose this function as a view function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `_empty` | `EmptyParameterObject` | An empty object. |

#### Returns

`DecoratorFunction`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/near-bindgen.ts:33](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/near-bindgen.ts#L33)
