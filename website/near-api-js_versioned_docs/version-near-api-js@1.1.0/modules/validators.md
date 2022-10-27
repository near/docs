---
id: "validators"
title: "Module: validators"
sidebar_label: "validators"
sidebar_position: 0
custom_edit_url: null
---

## Interfaces

- [ChangedValidatorInfo](../interfaces/validators.ChangedValidatorInfo.md)
- [EpochValidatorsDiff](../interfaces/validators.EpochValidatorsDiff.md)

## Functions

### diffEpochValidators

**diffEpochValidators**(`currentValidators`, `nextValidators`): [`EpochValidatorsDiff`](../interfaces/validators.EpochValidatorsDiff.md)

Diff validators between current and next epoch.
Returns additions, subtractions and changes to validator set.

**`Params`**

currentValidators: list of current validators.

**`Params`**

nextValidators: list of next validators.

#### Parameters

| Name | Type |
| :------ | :------ |
| `currentValidators` | [`CurrentEpochValidatorInfo`](../interfaces/providers_provider.CurrentEpochValidatorInfo.md)[] |
| `nextValidators` | [`NextEpochValidatorInfo`](../interfaces/providers_provider.NextEpochValidatorInfo.md)[] |

#### Returns

[`EpochValidatorsDiff`](../interfaces/validators.EpochValidatorsDiff.md)

#### Defined in

[validators.ts:84](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/validators.ts#L84)

___

### findSeatPrice

**findSeatPrice**(`validators`, `maxNumberOfSeats`, `minimumStakeRatio`, `protocolVersion?`): `BN`

Finds seat price given validators stakes and number of seats.
 Calculation follow the spec: https://nomicon.io/Economics/README.html#validator-selection

**`Params`**

validators: current or next epoch validators.

**`Params`**

maxNumberOfSeats: maximum number of seats in the network.

**`Params`**

minimumStakeRatio: minimum stake ratio

**`Params`**

protocolVersion: version of the protocol from genesis config

#### Parameters

| Name | Type |
| :------ | :------ |
| `validators` | ([`CurrentEpochValidatorInfo`](../interfaces/providers_provider.CurrentEpochValidatorInfo.md) \| [`NextEpochValidatorInfo`](../interfaces/providers_provider.NextEpochValidatorInfo.md))[] |
| `maxNumberOfSeats` | `number` |
| `minimumStakeRatio` | `number`[] |
| `protocolVersion?` | `number` |

#### Returns

`BN`

#### Defined in

[validators.ts:14](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/validators.ts#L14)
