---
id: "api"
title: "Module: api"
sidebar_label: "api"
sidebar_position: 0
custom_edit_url: null
---

## Enumerations

- [PromiseResult](../enums/api.PromiseResult.md)

## Functions

### accountBalance

**accountBalance**(): `BigInt`

#### Returns

`BigInt`

#### Defined in

[api.ts:264](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L264)

___

### accountLockedBalance

**accountLockedBalance**(): `BigInt`

#### Returns

`BigInt`

#### Defined in

[api.ts:268](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L268)

___

### altBn128G1Multiexp

**altBn128G1Multiexp**(`value`): [`Bytes`](utils.md#bytes)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

[`Bytes`](utils.md#bytes)

#### Defined in

[api.ts:149](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L149)

___

### altBn128G1Sum

**altBn128G1Sum**(`value`): [`Bytes`](utils.md#bytes)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

[`Bytes`](utils.md#bytes)

#### Defined in

[api.ts:154](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L154)

___

### altBn128PairingCheck

**altBn128PairingCheck**(`value`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`boolean`

#### Defined in

[api.ts:159](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L159)

___

### attachedDeposit

**attachedDeposit**(): `BigInt`

#### Returns

`BigInt`

#### Defined in

[api.ts:53](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L53)

___

### blockHeight

**blockHeight**(): `BigInt`

#### Returns

`BigInt`

#### Defined in

[api.ts:41](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L41)

___

### blockIndex

**blockIndex**(): `BigInt`

#### Returns

`BigInt`

#### Defined in

[api.ts:37](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L37)

___

### blockTimestamp

**blockTimestamp**(): `BigInt`

#### Returns

`BigInt`

#### Defined in

[api.ts:45](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L45)

___

### currentAccountId

**currentAccountId**(): `string`

#### Returns

`string`

#### Defined in

[api.ts:250](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L250)

___

### ecrecover

**ecrecover**(`hash`, `sig`, `v`, `malleabilityFlag`): [`Bytes`](utils.md#bytes) \| ``null``

#### Parameters

| Name | Type |
| :------ | :------ |
| `hash` | `string` |
| `sig` | `string` |
| `v` | `number` |
| `malleabilityFlag` | `number` |

#### Returns

[`Bytes`](utils.md#bytes) \| ``null``

#### Defined in

[api.ts:90](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L90)

___

### epochHeight

**epochHeight**(): `BigInt`

#### Returns

`BigInt`

#### Defined in

[api.ts:49](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L49)

___

### input

**input**(): [`Bytes`](utils.md#bytes)

#### Returns

[`Bytes`](utils.md#bytes)

#### Defined in

[api.ts:255](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L255)

___

### jsvmAccountId

**jsvmAccountId**(): `string`

#### Returns

`string`

#### Defined in

[api.ts:168](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L168)

___

### jsvmArgs

**jsvmArgs**(): [`Bytes`](utils.md#bytes)

#### Returns

[`Bytes`](utils.md#bytes)

#### Defined in

[api.ts:183](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L183)

___

### jsvmCall

**jsvmCall**(`contractName`, `method`, `args`): `any` \| ``null``

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractName` | `string` |
| `method` | `string` |
| `args` | `any` |

#### Returns

`any` \| ``null``

#### Defined in

[api.ts:229](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L229)

___

### jsvmCallRaw

**jsvmCallRaw**(`contractName`, `method`, `args`): [`Bytes`](utils.md#bytes) \| ``null``

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractName` | `string` |
| `method` | `string` |
| `args` | `any` |

#### Returns

[`Bytes`](utils.md#bytes) \| ``null``

#### Defined in

[api.ts:220](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L220)

___

### jsvmJsContractName

**jsvmJsContractName**(): `string`

#### Returns

`string`

#### Defined in

[api.ts:173](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L173)

___

### jsvmMethodName

**jsvmMethodName**(): `string`

#### Returns

`string`

#### Defined in

[api.ts:178](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L178)

___

### jsvmStorageHasKey

**jsvmStorageHasKey**(`key`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`boolean`

#### Defined in

[api.ts:212](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L212)

___

### jsvmStorageRead

**jsvmStorageRead**(`key`): [`Bytes`](utils.md#bytes) \| ``null``

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

[`Bytes`](utils.md#bytes) \| ``null``

#### Defined in

[api.ts:196](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L196)

___

### jsvmStorageRemove

**jsvmStorageRemove**(`key`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`boolean`

#### Defined in

[api.ts:204](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L204)

___

### jsvmStorageWrite

**jsvmStorageWrite**(`key`, `value`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `string` |

#### Returns

`boolean`

#### Defined in

[api.ts:188](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L188)

___

### jsvmValueReturn

**jsvmValueReturn**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Defined in

[api.ts:245](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L245)

___

### keccak256

**keccak256**(`value`): [`Bytes`](utils.md#bytes)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

[`Bytes`](utils.md#bytes)

#### Defined in

[api.ts:75](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L75)

___

### keccak512

**keccak512**(`value`): [`Bytes`](utils.md#bytes)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

[`Bytes`](utils.md#bytes)

#### Defined in

[api.ts:80](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L80)

___

### log

**log**(...`params`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...params` | `any`[] |

#### Returns

`void`

#### Defined in

[api.ts:14](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L14)

___

### logUtf16

**logUtf16**(`msg`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `string` |

#### Returns

`void`

#### Defined in

[api.ts:119](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L119)

___

### logUtf8

**logUtf8**(`msg`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `string` |

#### Returns

`void`

#### Defined in

[api.ts:115](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L115)

___

### panic

**panic**(`msg?`): `never`

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg?` | `string` |

#### Returns

`never`

#### Defined in

[api.ts:103](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L103)

___

### panicUtf8

**panicUtf8**(`msg`): `never`

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `string` |

#### Returns

`never`

#### Defined in

[api.ts:111](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L111)

___

### predecessorAccountId

**predecessorAccountId**(): `string`

#### Returns

`string`

#### Defined in

[api.ts:32](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L32)

___

### prepaidGas

**prepaidGas**(): `BigInt`

#### Returns

`BigInt`

#### Defined in

[api.ts:57](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L57)

___

### promiseAnd

**promiseAnd**(...`promiseIndex`): `BigInt`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...promiseIndex` | `number`[] \| `BigInt`[] |

#### Returns

`BigInt`

#### Defined in

[api.ts:304](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L304)

___

### promiseBatchActionAddKeyWithFullAccess

**promiseBatchActionAddKeyWithFullAccess**(`promiseIndex`, `publicKey`, `nonce`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `promiseIndex` | `number` \| `BigInt` |
| `publicKey` | `string` |
| `nonce` | `number` \| `BigInt` |

#### Returns

`void`

#### Defined in

[api.ts:361](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L361)

___

### promiseBatchActionAddKeyWithFunctionCall

**promiseBatchActionAddKeyWithFunctionCall**(`promiseIndex`, `publicKey`, `nonce`, `allowance`, `receiverId`, `methodNames`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `promiseIndex` | `number` \| `BigInt` |
| `publicKey` | `string` |
| `nonce` | `number` \| `BigInt` |
| `allowance` | `number` \| `BigInt` |
| `receiverId` | `string` |
| `methodNames` | `string` |

#### Returns

`void`

#### Defined in

[api.ts:373](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L373)

___

### promiseBatchActionCreateAccount

**promiseBatchActionCreateAccount**(`promiseIndex`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `promiseIndex` | `number` \| `BigInt` |

#### Returns

`void`

#### Defined in

[api.ts:319](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L319)

___

### promiseBatchActionDeleteAccount

**promiseBatchActionDeleteAccount**(`promiseIndex`, `beneficiaryId`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `promiseIndex` | `number` \| `BigInt` |
| `beneficiaryId` | `string` |

#### Returns

`void`

#### Defined in

[api.ts:398](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L398)

___

### promiseBatchActionDeleteKey

**promiseBatchActionDeleteKey**(`promiseIndex`, `publicKey`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `promiseIndex` | `number` \| `BigInt` |
| `publicKey` | `string` |

#### Returns

`void`

#### Defined in

[api.ts:391](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L391)

___

### promiseBatchActionDeployContract

**promiseBatchActionDeployContract**(`promiseIndex`, `code`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `promiseIndex` | `number` \| `BigInt` |
| `code` | `string` |

#### Returns

`void`

#### Defined in

[api.ts:323](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L323)

___

### promiseBatchActionFunctionCall

**promiseBatchActionFunctionCall**(`promiseIndex`, `methodName`, `args`, `amount`, `gas`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `promiseIndex` | `number` \| `BigInt` |
| `methodName` | `string` |
| `args` | `string` |
| `amount` | `number` \| `BigInt` |
| `gas` | `number` \| `BigInt` |

#### Returns

`void`

#### Defined in

[api.ts:330](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L330)

___

### promiseBatchActionStake

**promiseBatchActionStake**(`promiseIndex`, `amount`, `publicKey`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `promiseIndex` | `number` \| `BigInt` |
| `amount` | `number` \| `BigInt` |
| `publicKey` | `string` |

#### Returns

`void`

#### Defined in

[api.ts:353](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L353)

___

### promiseBatchActionTransfer

**promiseBatchActionTransfer**(`promiseIndex`, `amount`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `promiseIndex` | `number` \| `BigInt` |
| `amount` | `number` \| `BigInt` |

#### Returns

`void`

#### Defined in

[api.ts:346](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L346)

___

### promiseBatchCreate

**promiseBatchCreate**(`accountId`): `BigInt`

#### Parameters

| Name | Type |
| :------ | :------ |
| `accountId` | `string` |

#### Returns

`BigInt`

#### Defined in

[api.ts:308](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L308)

___

### promiseBatchThen

**promiseBatchThen**(`promiseIndex`, `accountId`): `BigInt`

#### Parameters

| Name | Type |
| :------ | :------ |
| `promiseIndex` | `number` \| `BigInt` |
| `accountId` | `string` |

#### Returns

`BigInt`

#### Defined in

[api.ts:312](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L312)

___

### promiseCreate

**promiseCreate**(`accountId`, `methodName`, `args`, `amount`, `gas`): `BigInt`

#### Parameters

| Name | Type |
| :------ | :------ |
| `accountId` | `string` |
| `methodName` | `string` |
| `args` | `string` |
| `amount` | `number` \| `BigInt` |
| `gas` | `number` \| `BigInt` |

#### Returns

`BigInt`

#### Defined in

[api.ts:276](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L276)

___

### promiseResult

**promiseResult**(`resultIdx`): [`Bytes`](utils.md#bytes) \| [`NotReady`](../enums/api.PromiseResult.md#notready) \| [`Failed`](../enums/api.PromiseResult.md#failed)

#### Parameters

| Name | Type |
| :------ | :------ |
| `resultIdx` | `number` \| `BigInt` |

#### Returns

[`Bytes`](utils.md#bytes) \| [`NotReady`](../enums/api.PromiseResult.md#notready) \| [`Failed`](../enums/api.PromiseResult.md#failed)

#### Defined in

[api.ts:415](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L415)

___

### promiseResultsCount

**promiseResultsCount**(): `BigInt`

#### Returns

`BigInt`

#### Defined in

[api.ts:405](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L405)

___

### promiseReturn

**promiseReturn**(`promiseIdx`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `promiseIdx` | `number` \| `BigInt` |

#### Returns

`void`

#### Defined in

[api.ts:431](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L431)

___

### promiseThen

**promiseThen**(`promiseIndex`, `accountId`, `methodName`, `args`, `amount`, `gas`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `promiseIndex` | `number` \| `BigInt` |
| `accountId` | `string` |
| `methodName` | `string` |
| `args` | `string` |
| `amount` | `number` \| `BigInt` |
| `gas` | `number` \| `BigInt` |

#### Returns

`any`

#### Defined in

[api.ts:286](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L286)

___

### randomSeed

**randomSeed**(): [`Bytes`](utils.md#bytes)

#### Returns

[`Bytes`](utils.md#bytes)

#### Defined in

[api.ts:65](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L65)

___

### ripemd160

**ripemd160**(`value`): [`Bytes`](utils.md#bytes)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

[`Bytes`](utils.md#bytes)

#### Defined in

[api.ts:85](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L85)

___

### sha256

**sha256**(`value`): [`Bytes`](utils.md#bytes)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

[`Bytes`](utils.md#bytes)

#### Defined in

[api.ts:70](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L70)

___

### signerAccountId

**signerAccountId**(): `string`

#### Returns

`string`

#### Defined in

[api.ts:22](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L22)

___

### signerAccountPk

**signerAccountPk**(): [`Bytes`](utils.md#bytes)

#### Returns

[`Bytes`](utils.md#bytes)

#### Defined in

[api.ts:27](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L27)

___

### storageByteCost

**storageByteCost**(): `BigInt`

#### Returns

`BigInt`

#### Defined in

[api.ts:451](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L451)

___

### storageGetEvicted

**storageGetEvicted**(): [`Bytes`](utils.md#bytes)

#### Returns

[`Bytes`](utils.md#bytes)

#### Defined in

[api.ts:241](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L241)

___

### storageHasKey

**storageHasKey**(`key`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`boolean`

#### Defined in

[api.ts:132](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L132)

___

### storageRead

**storageRead**(`key`): [`Bytes`](utils.md#bytes) \| ``null``

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

[`Bytes`](utils.md#bytes) \| ``null``

#### Defined in

[api.ts:123](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L123)

___

### storageRemove

**storageRemove**(`key`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`boolean`

#### Defined in

[api.ts:443](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L443)

___

### storageUsage

**storageUsage**(): `BigInt`

#### Returns

`BigInt`

#### Defined in

[api.ts:260](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L260)

___

### storageWrite

**storageWrite**(`key`, `value`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `string` |

#### Returns

`boolean`

#### Defined in

[api.ts:435](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L435)

___

### usedGas

**usedGas**(): `BigInt`

#### Returns

`BigInt`

#### Defined in

[api.ts:61](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L61)

___

### validatorStake

**validatorStake**(`accountId`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `accountId` | `string` |

#### Returns

`any`

#### Defined in

[api.ts:141](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L141)

___

### validatorTotalStake

**validatorTotalStake**(): `BigInt`

#### Returns

`BigInt`

#### Defined in

[api.ts:145](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L145)

___

### valueReturn

**valueReturn**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Defined in

[api.ts:272](https://github.com/near/near-sdk-js/blob/59dba80/src/api.ts#L272)
