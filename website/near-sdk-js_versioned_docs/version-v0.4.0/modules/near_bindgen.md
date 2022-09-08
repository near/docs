---
id: "near_bindgen"
title: "Module: near-bindgen"
sidebar_label: "near-bindgen"
sidebar_position: 0
custom_edit_url: null
---

## Functions

### NearBindgen

**NearBindgen**<`T`\>(`target`): { `prototype`: `__class`<`any`\> ; `_get`: () => `any` ; `_init`: () => {}  } & `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends (...`args`: `any`[]) => {} |

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `T` |

#### Returns

{ `prototype`: `__class`<`any`\> ; `_get`: () => `any` ; `_init`: () => {}  } & `T`

#### Defined in

[near-bindgen.ts:8](https://github.com/near/near-sdk-js/blob/59dba80/src/near-bindgen.ts#L8)

___

### call

**call**(`target`, `key`, `descriptor`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `Object` |
| `key` | `string` \| `symbol` |
| `descriptor` | `TypedPropertyDescriptor`<`Function`\> |

#### Returns

`void`

#### Defined in

[near-bindgen.ts:1](https://github.com/near/near-sdk-js/blob/59dba80/src/near-bindgen.ts#L1)

___

### view

**view**(`target`, `key`, `descriptor`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `Object` |
| `key` | `string` \| `symbol` |
| `descriptor` | `TypedPropertyDescriptor`<`Function`\> |

#### Returns

`void`

#### Defined in

[near-bindgen.ts:4](https://github.com/near/near-sdk-js/blob/59dba80/src/near-bindgen.ts#L4)
