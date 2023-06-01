---
id: "near"
title: "Namespace: near"
sidebar_label: "near"
sidebar_position: 0
custom_edit_url: null
---

## Functions

### accountBalance

▸ **accountBalance**(): `bigint`

Returns the current account's account balance.

#### Returns

`bigint`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:266](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L266)

___

### accountLockedBalance

▸ **accountLockedBalance**(): `bigint`

Returns the current account's locked balance.

#### Returns

`bigint`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:273](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L273)

___

### altBn128G1Multiexp

▸ **altBn128G1Multiexp**(`value`): `Uint8Array`

Computes multiexp on alt_bn128 curve using Pippenger's algorithm \sum_i
mul_i g_{1 i} should be equal result.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `Uint8Array` | equence of (g1:G1, fr:Fr), where G1 is point (x:Fq, y:Fq) on alt_bn128, alt_bn128 is Y^2 = X^3 + 3 curve over Fq. `value` is encoded as packed, little-endian `[((u256, u256), u256)]` slice. |

#### Returns

`Uint8Array`

multi exp sum

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:978](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L978)

___

### altBn128G1Sum

▸ **altBn128G1Sum**(`value`): `Uint8Array`

Computes sum for signed g1 group elements on alt_bn128 curve \sum_i
(-1)^{sign_i} g_{1 i} should be equal result.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `Uint8Array` | sequence of (sign:bool, g1:G1), where G1 is point (x:Fq, y:Fq) on alt_bn128, alt_bn128 is Y^2 = X^3 + 3 curve over Fq. value` is encoded a as packed, little-endian `[((u256, u256), ((u256, u256), (u256, u256)))]` slice. |

#### Returns

`Uint8Array`

sum over Fq.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:995](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L995)

___

### altBn128PairingCheck

▸ **altBn128PairingCheck**(`value`): `boolean`

Computes pairing check on alt_bn128 curve.
\sum_i e(g_{1 i}, g_{2 i}) should be equal one (in additive notation), e(g1, g2) is Ate pairing

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `Uint8Array` | sequence of (g1:G1, g2:G2), where G2 is Fr-ordered subgroup point (x:Fq2, y:Fq2) on alt_bn128 twist, alt_bn128 twist is Y^2 = X^3 + 3/(i+9) curve over Fq2 Fq2 is complex field element (re: Fq, im: Fq) G1 is point (x:Fq, y:Fq) on alt_bn128, alt_bn128 is Y^2 = X^3 + 3 curve over Fq `value` is encoded a as packed, little-endian `[((u256, u256), ((u256, u256), (u256, u256)))]` slice. |

#### Returns

`boolean`

whether pairing check pass

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:1015](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L1015)

___

### attachedDeposit

▸ **attachedDeposit**(): `bigint`

Returns the amount of NEAR attached to this function call.
Can only be called in payable functions.

#### Returns

`bigint`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:245](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L245)

___

### blockHeight

▸ **blockHeight**(): `bigint`

Returns the current block height.

#### Returns

`bigint`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:223](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L223)

___

### blockIndex

▸ **blockIndex**(): `bigint`

Returns the current block index.

#### Returns

`bigint`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:216](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L216)

___

### blockTimestamp

▸ **blockTimestamp**(): `bigint`

Returns the current block timestamp.

#### Returns

`bigint`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:230](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L230)

___

### currentAccountId

▸ **currentAccountId**(): `string`

Returns the account ID of the current contract - the contract that is being executed.

#### Returns

`string`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:208](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L208)

___

### ecrecover

▸ **ecrecover**(`hash`, `sig`, `v`, `malleabilityFlag`): `Uint8Array` \| ``null``

Recovers an ECDSA signer address from a 32-byte message hash and a corresponding
signature along with v recovery byte. Takes in an additional flag to check for
malleability of the signature which is generally only ideal for transactions.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hash` | `Uint8Array` | 32-byte message hash |
| `sig` | `Uint8Array` | signature |
| `v` | `number` | number of recovery byte |
| `malleabilityFlag` | `number` | whether to check malleability |

#### Returns

`Uint8Array` \| ``null``

64 bytes representing the public key if the recovery was successful.

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:908](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L908)

___

### epochHeight

▸ **epochHeight**(): `bigint`

Returns the current epoch height.

#### Returns

`bigint`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:237](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L237)

___

### input

▸ **input**(): `string`

Returns the arguments passed to the current smart contract call as utf-8 string.

#### Returns

`string`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:400](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L400)

___

### inputRaw

▸ **inputRaw**(): `Uint8Array`

Returns the arguments passed to the current smart contract call.

#### Returns

`Uint8Array`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:392](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L392)

___

### keccak256

▸ **keccak256**(`value`): `Uint8Array`

Returns keccak256 hash of given value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `Uint8Array` | value to be hashed, in Bytes |

#### Returns

`Uint8Array`

hash result in Bytes

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:872](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L872)

___

### keccak512

▸ **keccak512**(`value`): `Uint8Array`

Returns keccak512 hash of given value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `Uint8Array` | value to be hashed, in Bytes |

#### Returns

`Uint8Array`

hash result in Bytes

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:882](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L882)

___

### log

▸ **log**(`...params`): `void`

Logs parameters in the NEAR WASM virtual machine.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...params` | `unknown`[] | Parameters to log. |

#### Returns

`void`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:160](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L160)

___

### logUtf16

▸ **logUtf16**(`msg`): `void`

Log the message in transaction logs

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `msg` | `Uint8Array` | message in raw bytes, which should be a valid UTF-16 sequence |

#### Returns

`void`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:945](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L945)

___

### logUtf8

▸ **logUtf8**(`msg`): `void`

Log the message in transaction logs

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `msg` | `Uint8Array` | message in raw bytes, which should be a valid UTF-8 sequence |

#### Returns

`void`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:937](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L937)

___

### panicUtf8

▸ **panicUtf8**(`msg`): `never`

Panic the transaction execution with given message

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `msg` | `Uint8Array` | panic message in raw bytes, which should be a valid UTF-8 sequence |

#### Returns

`never`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:929](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L929)

___

### predecessorAccountId

▸ **predecessorAccountId**(): `string`

Returns the account ID of the account that called the function.
Can only be called in a call or initialize function.

#### Returns

`string`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:200](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L200)

___

### prepaidGas

▸ **prepaidGas**(): `bigint`

Returns the amount of Gas that was attached to this function call.

#### Returns

`bigint`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:252](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L252)

___

### promiseAnd

▸ **promiseAnd**(`...promiseIndexes`): [`PromiseIndex`](../modules.md#promiseindex)

Join an arbitrary array of NEAR promises.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...promiseIndexes` | `_`[] | An arbitrary array of NEAR promise indexes to join. |

#### Returns

[`PromiseIndex`](../modules.md#promiseindex)

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:535](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L535)

___

### promiseBatchActionAddKeyWithFullAccess

▸ **promiseBatchActionAddKeyWithFullAccess**(`promiseIndex`, `publicKey`, `nonce`): `void`

Attach a add full access key promise action to the NEAR promise index with the provided promise index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `promiseIndex` | `_` | The index of the promise to attach a add full access key action to. |
| `publicKey` | `Uint8Array` | The public key to add as a full access key. |
| `nonce` | `number` \| `bigint` | The nonce to use. |

#### Returns

`void`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:682](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L682)

___

### promiseBatchActionAddKeyWithFunctionCall

▸ **promiseBatchActionAddKeyWithFunctionCall**(`promiseIndex`, `publicKey`, `nonce`, `allowance`, `receiverId`, `methodNames`): `void`

Attach a add access key promise action to the NEAR promise index with the provided promise index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `promiseIndex` | `_` | The index of the promise to attach a add access key action to. |
| `publicKey` | `Uint8Array` | The public key to add. |
| `nonce` | `number` \| `bigint` | The nonce to use. |
| `allowance` | [`NearAmount`](../modules.md#nearamount) | The allowance of the access key. |
| `receiverId` | `string` | The account ID of the receiver. |
| `methodNames` | `string` | The names of the method to allow the key for. |

#### Returns

`void`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:704](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L704)

___

### promiseBatchActionCreateAccount

▸ **promiseBatchActionCreateAccount**(`promiseIndex`): `void`

Attach a create account promise action to the NEAR promise index with the provided promise index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `promiseIndex` | `_` | The index of the promise to attach a create account action to. |

#### Returns

`void`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:571](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L571)

___

### promiseBatchActionDeleteAccount

▸ **promiseBatchActionDeleteAccount**(`promiseIndex`, `beneficiaryId`): `void`

Attach a delete account promise action to the NEAR promise index with the provided promise index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `promiseIndex` | `_` | The index of the promise to attach a delete account action to. |
| `beneficiaryId` | `string` | The account ID of the beneficiary - the account that receives the remaining amount of NEAR. |

#### Returns

`void`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:744](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L744)

___

### promiseBatchActionDeleteKey

▸ **promiseBatchActionDeleteKey**(`promiseIndex`, `publicKey`): `void`

Attach a delete key promise action to the NEAR promise index with the provided promise index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `promiseIndex` | `_` | The index of the promise to attach a delete key action to. |
| `publicKey` | `Uint8Array` | The public key to delete. |

#### Returns

`void`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:728](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L728)

___

### promiseBatchActionDeployContract

▸ **promiseBatchActionDeployContract**(`promiseIndex`, `code`): `void`

Attach a deploy contract promise action to the NEAR promise index with the provided promise index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `promiseIndex` | `_` | The index of the promise to attach a deploy contract action to. |
| `code` | `Uint8Array` | The WASM byte code of the contract to be deployed. |

#### Returns

`void`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:583](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L583)

___

### promiseBatchActionFunctionCall

▸ **promiseBatchActionFunctionCall**(`promiseIndex`, `methodName`, `args`, `amount`, `gas`): `void`

Attach a function call promise action to the NEAR promise index with the provided promise index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `promiseIndex` | `_` | The index of the promise to attach a function call action to. |
| `methodName` | `string` | The name of the method to be called. |
| `args` | `string` | The utf-8 string arguments to call the method with. |
| `amount` | [`NearAmount`](../modules.md#nearamount) | The amount of NEAR to attach to the call. |
| `gas` | [`NearAmount`](../modules.md#nearamount) | The amount of Gas to attach to the call. |

#### Returns

`void`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:627](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L627)

___

### promiseBatchActionFunctionCallRaw

▸ **promiseBatchActionFunctionCallRaw**(`promiseIndex`, `methodName`, `args`, `amount`, `gas`): `void`

Attach a function call promise action to the NEAR promise index with the provided promise index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `promiseIndex` | `_` | The index of the promise to attach a function call action to. |
| `methodName` | `string` | The name of the method to be called. |
| `args` | `Uint8Array` | The arguments to call the method with. |
| `amount` | [`NearAmount`](../modules.md#nearamount) | The amount of NEAR to attach to the call. |
| `gas` | [`NearAmount`](../modules.md#nearamount) | The amount of Gas to attach to the call. |

#### Returns

`void`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:602](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L602)

___

### promiseBatchActionFunctionCallWeight

▸ **promiseBatchActionFunctionCallWeight**(`promiseIndex`, `methodName`, `args`, `amount`, `gas`, `weight`): `void`

Attach a function call with weight promise action to the NEAR promise index with the provided promise index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `promiseIndex` | `_` | The index of the promise to attach a function call with weight action to. |
| `methodName` | `string` | The name of the method to be called. |
| `args` | `string` | The utf-8 string arguments to call the method with. |
| `amount` | [`NearAmount`](../modules.md#nearamount) | The amount of NEAR to attach to the call. |
| `gas` | [`NearAmount`](../modules.md#nearamount) | The amount of Gas to attach to the call. |
| `weight` | `bigint` | The weight of unused Gas to use. |

#### Returns

`void`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:792](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L792)

___

### promiseBatchActionFunctionCallWeightRaw

▸ **promiseBatchActionFunctionCallWeightRaw**(`promiseIndex`, `methodName`, `args`, `amount`, `gas`, `weight`): `void`

Attach a function call with weight promise action to the NEAR promise index with the provided promise index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `promiseIndex` | `_` | The index of the promise to attach a function call with weight action to. |
| `methodName` | `string` | The name of the method to be called. |
| `args` | `Uint8Array` | The arguments to call the method with. |
| `amount` | [`NearAmount`](../modules.md#nearamount) | The amount of NEAR to attach to the call. |
| `gas` | [`NearAmount`](../modules.md#nearamount) | The amount of Gas to attach to the call. |
| `weight` | `bigint` | The weight of unused Gas to use. |

#### Returns

`void`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:764](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L764)

___

### promiseBatchActionStake

▸ **promiseBatchActionStake**(`promiseIndex`, `amount`, `publicKey`): `void`

Attach a stake promise action to the NEAR promise index with the provided promise index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `promiseIndex` | `_` | The index of the promise to attach a stake action to. |
| `amount` | [`NearAmount`](../modules.md#nearamount) | The amount of NEAR to stake. |
| `publicKey` | `Uint8Array` | The public key with which to stake. |

#### Returns

`void`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:663](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L663)

___

### promiseBatchActionTransfer

▸ **promiseBatchActionTransfer**(`promiseIndex`, `amount`): `void`

Attach a transfer promise action to the NEAR promise index with the provided promise index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `promiseIndex` | `_` | The index of the promise to attach a transfer action to. |
| `amount` | [`NearAmount`](../modules.md#nearamount) | The amount of NEAR to transfer. |

#### Returns

`void`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:649](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L649)

___

### promiseBatchCreate

▸ **promiseBatchCreate**(`accountId`): [`PromiseIndex`](../modules.md#promiseindex)

Create a NEAR promise which will have multiple promise actions inside.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `accountId` | `string` | The account ID of the target contract. |

#### Returns

[`PromiseIndex`](../modules.md#promiseindex)

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:546](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L546)

___

### promiseBatchThen

▸ **promiseBatchThen**(`promiseIndex`, `accountId`): [`PromiseIndex`](../modules.md#promiseindex)

Attach a callback NEAR promise to a batch of NEAR promise actions.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `promiseIndex` | `_` | The NEAR promise index of the batch. |
| `accountId` | `string` | The account ID of the target contract. |

#### Returns

[`PromiseIndex`](../modules.md#promiseindex)

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:556](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L556)

___

### promiseCreate

▸ **promiseCreate**(`accountId`, `methodName`, `args`, `amount`, `gas`): [`PromiseIndex`](../modules.md#promiseindex)

Create a NEAR promise call to a contract on the blockchain.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `accountId` | `string` | The account ID of the target contract. |
| `methodName` | `string` | The name of the method to be called. |
| `args` | `string` | The utf-8 string arguments to call the method with. |
| `amount` | [`NearAmount`](../modules.md#nearamount) | The amount of NEAR attached to the call. |
| `gas` | [`NearAmount`](../modules.md#nearamount) | The amount of Gas attached to the call. |

#### Returns

[`PromiseIndex`](../modules.md#promiseindex)

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:464](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L464)

___

### promiseCreateRaw

▸ **promiseCreateRaw**(`accountId`, `methodName`, `args`, `amount`, `gas`): [`PromiseIndex`](../modules.md#promiseindex)

Create a NEAR promise call to a contract on the blockchain.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `accountId` | `string` | The account ID of the target contract. |
| `methodName` | `string` | The name of the method to be called. |
| `args` | `Uint8Array` | The arguments to call the method with. |
| `amount` | [`NearAmount`](../modules.md#nearamount) | The amount of NEAR attached to the call. |
| `gas` | [`NearAmount`](../modules.md#nearamount) | The amount of Gas attached to the call. |

#### Returns

[`PromiseIndex`](../modules.md#promiseindex)

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:439](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L439)

___

### promiseResult

▸ **promiseResult**(`promiseIndex`): `string`

Returns the result of the NEAR promise for the passed promise index as utf-8 string

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `promiseIndex` | `_` | The index of the promise to return the result for. |

#### Returns

`string`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:844](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L844)

___

### promiseResultRaw

▸ **promiseResultRaw**(`promiseIndex`): `Uint8Array`

Returns the result of the NEAR promise for the passed promise index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `promiseIndex` | `_` | The index of the promise to return the result for. |

#### Returns

`Uint8Array`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:822](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L822)

___

### promiseResultsCount

▸ **promiseResultsCount**(): `bigint`

The number of promise results available.

#### Returns

`bigint`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:813](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L813)

___

### promiseReturn

▸ **promiseReturn**(`promiseIndex`): `void`

Executes the promise in the NEAR WASM virtual machine.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `promiseIndex` | `_` | The index of the promise to execute. |

#### Returns

`void`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:853](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L853)

___

### promiseThen

▸ **promiseThen**(`promiseIndex`, `accountId`, `methodName`, `args`, `amount`, `gas`): [`PromiseIndex`](../modules.md#promiseindex)

Attach a callback NEAR promise to be executed after a provided promise.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `promiseIndex` | `_` | The promise after which to call the callback. |
| `accountId` | `string` | The account ID of the contract to perform the callback on. |
| `methodName` | `string` | The name of the method to call. |
| `args` | `string` | The utf-8 string arguments to call the method with. |
| `amount` | [`NearAmount`](../modules.md#nearamount) | The amount of NEAR to attach to the call. |
| `gas` | [`NearAmount`](../modules.md#nearamount) | The amount of Gas to attach to the call. |

#### Returns

[`PromiseIndex`](../modules.md#promiseindex)

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:512](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L512)

___

### promiseThenRaw

▸ **promiseThenRaw**(`promiseIndex`, `accountId`, `methodName`, `args`, `amount`, `gas`): [`PromiseIndex`](../modules.md#promiseindex)

Attach a callback NEAR promise to be executed after a provided promise.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `promiseIndex` | `_` | The promise after which to call the callback. |
| `accountId` | `string` | The account ID of the contract to perform the callback on. |
| `methodName` | `string` | The name of the method to call. |
| `args` | `Uint8Array` | The arguments to call the method with. |
| `amount` | [`NearAmount`](../modules.md#nearamount) | The amount of NEAR to attach to the call. |
| `gas` | [`NearAmount`](../modules.md#nearamount) | The amount of Gas to attach to the call. |

#### Returns

[`PromiseIndex`](../modules.md#promiseindex)

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:484](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L484)

___

### randomSeed

▸ **randomSeed**(): `Uint8Array`

Returns a random string of bytes.

#### Returns

`Uint8Array`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:425](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L425)

___

### ripemd160

▸ **ripemd160**(`value`): `Uint8Array`

Returns ripemd160 hash of given value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `Uint8Array` | value to be hashed, in Bytes |

#### Returns

`Uint8Array`

hash result in Bytes

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:892](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L892)

___

### sha256

▸ **sha256**(`value`): `Uint8Array`

Returns sha256 hash of given value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `Uint8Array` | value to be hashed, in Bytes |

#### Returns

`Uint8Array`

hash result in Bytes

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:862](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L862)

___

### signerAccountId

▸ **signerAccountId**(): `string`

Returns the account ID of the account that signed the transaction.
Can only be called in a call or initialize function.

#### Returns

`string`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:182](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L182)

___

### signerAccountPk

▸ **signerAccountPk**(): `Uint8Array`

Returns the public key of the account that signed the transaction.
Can only be called in a call or initialize function.

#### Returns

`Uint8Array`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:191](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L191)

___

### storageByteCost

▸ **storageByteCost**(): `bigint`

Returns the cost of storing 0 Byte on NEAR storage.

#### Returns

`bigint`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:385](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L385)

___

### storageGetEvicted

▸ **storageGetEvicted**(): `string`

Get the last written or removed value from NEAR storage as utf-8 string.

#### Returns

`string`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:333](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L333)

___

### storageGetEvictedRaw

▸ **storageGetEvictedRaw**(): `Uint8Array`

Get the last written or removed value from NEAR storage.

#### Returns

`Uint8Array`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:326](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L326)

___

### storageHasKey

▸ **storageHasKey**(`key`): `boolean`

Checks for the existance of a value under the provided utf-8 string key in NEAR storage.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The utf-8 string key to check for in storage. |

#### Returns

`boolean`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:319](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L319)

___

### storageHasKeyRaw

▸ **storageHasKeyRaw**(`key`): `boolean`

Checks for the existance of a value under the provided key in NEAR storage.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `Uint8Array` | The key to check for in storage. |

#### Returns

`boolean`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:310](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L310)

___

### storageRead

▸ **storageRead**(`key`): `string` \| ``null``

Reads the utf-8 string value from NEAR storage that is stored under the provided key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The utf-8 string key to read from storage. |

#### Returns

`string` \| ``null``

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:297](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L297)

___

### storageReadRaw

▸ **storageReadRaw**(`key`): `Uint8Array` \| ``null``

Reads the value from NEAR storage that is stored under the provided key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `Uint8Array` | The key to read from storage. |

#### Returns

`Uint8Array` \| ``null``

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:282](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L282)

___

### storageRemove

▸ **storageRemove**(`key`): `boolean`

Removes the value of the provided utf-8 string key from NEAR storage.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The utf-8 string key to be removed. |

#### Returns

`boolean`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:378](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L378)

___

### storageRemoveRaw

▸ **storageRemoveRaw**(`key`): `boolean`

Removes the value of the provided key from NEAR storage.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `Uint8Array` | The key to be removed. |

#### Returns

`boolean`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:369](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L369)

___

### storageUsage

▸ **storageUsage**(): `bigint`

Returns the current accounts NEAR storage usage.

#### Returns

`bigint`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:340](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L340)

___

### storageWrite

▸ **storageWrite**(`key`, `value`): `boolean`

Writes the provided utf-8 string to NEAR storage under the provided key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The utf-8 string key under which to store the value. |
| `value` | `string` | The utf-8 string value to store. |

#### Returns

`boolean`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:360](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L360)

___

### storageWriteRaw

▸ **storageWriteRaw**(`key`, `value`): `boolean`

Writes the provided bytes to NEAR storage under the provided key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `Uint8Array` | The key under which to store the value. |
| `value` | `Uint8Array` | The value to store. |

#### Returns

`boolean`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:350](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L350)

___

### usedGas

▸ **usedGas**(): `bigint`

Returns the amount of Gas that has been used by this function call until now.

#### Returns

`bigint`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:259](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L259)

___

### validatorStake

▸ **validatorStake**(`accountId`): `bigint`

Returns the number of staked NEAR of given validator, in yoctoNEAR

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `accountId` | `string` | validator's AccountID |

#### Returns

`bigint`

- staked amount

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:954](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L954)

___

### validatorTotalStake

▸ **validatorTotalStake**(): `bigint`

Returns the number of staked NEAR of all validators, in yoctoNEAR

#### Returns

`bigint`

total staked amount

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:962](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L962)

___

### valueReturn

▸ **valueReturn**(`value`): `void`

Returns the utf-8 string value from the NEAR WASM virtual machine.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | The utf-8 string value to return. |

#### Returns

`void`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:418](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L418)

___

### valueReturnRaw

▸ **valueReturnRaw**(`value`): `void`

Returns the value from the NEAR WASM virtual machine.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `Uint8Array` | The value to return. |

#### Returns

`void`

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/api.ts:409](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/api.ts#L409)
