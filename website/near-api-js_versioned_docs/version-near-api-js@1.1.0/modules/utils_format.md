---
id: "utils_format"
title: "Module: utils/format"
sidebar_label: "utils/format"
sidebar_position: 0
custom_edit_url: null
---

## Variables

### NEAR\_NOMINATION

 `Const` **NEAR\_NOMINATION**: `BN`

Number of indivisible units in one NEAR. Derived from [NEAR_NOMINATION_EXP](utils_format.md#near_nomination_exp).

#### Defined in

[utils/format.ts:11](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/utils/format.ts#L11)

___

### NEAR\_NOMINATION\_EXP

 `Const` **NEAR\_NOMINATION\_EXP**: ``24``

Exponent for calculating how many indivisible units are there in one NEAR. See [NEAR_NOMINATION](utils_format.md#near_nomination).

#### Defined in

[utils/format.ts:6](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/utils/format.ts#L6)

## Functions

### formatNearAmount

**formatNearAmount**(`balance`, `fracDigits?`): `string`

Convert account balance value from internal indivisible units to NEAR. 1 NEAR is defined by [NEAR_NOMINATION](utils_format.md#near_nomination).
Effectively this divides given amount by [NEAR_NOMINATION](utils_format.md#near_nomination).

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `balance` | `string` | `undefined` | decimal string representing balance in smallest non-divisible NEAR units (as specified by [NEAR_NOMINATION](utils_format.md#near_nomination)) |
| `fracDigits` | `number` | `NEAR_NOMINATION_EXP` | number of fractional digits to preserve in formatted string. Balance is rounded to match given number of digits. |

#### Returns

`string`

Value in Ⓝ

#### Defined in

[utils/format.ts:28](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/utils/format.ts#L28)

___

### parseNearAmount

**parseNearAmount**(`amt?`): `string` \| ``null``

Convert human readable NEAR amount to internal indivisible units.
Effectively this multiplies given amount by [NEAR_NOMINATION](utils_format.md#near_nomination).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `amt?` | `string` | decimal string (potentially fractional) denominated in NEAR. |

#### Returns

`string` \| ``null``

The parsed yoctoⓃ amount or null if no amount was passed in

#### Defined in

[utils/format.ts:53](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/utils/format.ts#L53)
