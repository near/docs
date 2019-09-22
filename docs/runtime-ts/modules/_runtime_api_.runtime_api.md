---
id: "_runtime_api_.runtime_api"
title: "runtime_api"
sidebar_label: "runtime_api"
---

## Index

### Functions

* [abort](_runtime_api_.runtime_api.md#abort)
* [account_balance](_runtime_api_.runtime_api.md#account_balance)
* [attached_deposit](_runtime_api_.runtime_api.md#attached_deposit)
* [block_index](_runtime_api_.runtime_api.md#block_index)
* [current_account_id](_runtime_api_.runtime_api.md#current_account_id)
* [gas](_runtime_api_.runtime_api.md#gas)
* [input](_runtime_api_.runtime_api.md#input)
* [log_utf16](_runtime_api_.runtime_api.md#log_utf16)
* [log_utf8](_runtime_api_.runtime_api.md#log_utf8)
* [panic](_runtime_api_.runtime_api.md#panic)
* [predecessor_account_id](_runtime_api_.runtime_api.md#predecessor_account_id)
* [prepaid_gas](_runtime_api_.runtime_api.md#prepaid_gas)
* [promise_and](_runtime_api_.runtime_api.md#promise_and)
* [promise_create](_runtime_api_.runtime_api.md#promise_create)
* [promise_result](_runtime_api_.runtime_api.md#promise_result)
* [promise_results_count](_runtime_api_.runtime_api.md#promise_results_count)
* [promise_return](_runtime_api_.runtime_api.md#promise_return)
* [promise_then](_runtime_api_.runtime_api.md#promise_then)
* [random_seed](_runtime_api_.runtime_api.md#random_seed)
* [read_register](_runtime_api_.runtime_api.md#read_register)
* [register_len](_runtime_api_.runtime_api.md#register_len)
* [sha256](_runtime_api_.runtime_api.md#sha256)
* [signer_account_id](_runtime_api_.runtime_api.md#signer_account_id)
* [signer_account_pk](_runtime_api_.runtime_api.md#signer_account_pk)
* [storage_has_key](_runtime_api_.runtime_api.md#storage_has_key)
* [storage_iter_next](_runtime_api_.runtime_api.md#storage_iter_next)
* [storage_iter_prefix](_runtime_api_.runtime_api.md#storage_iter_prefix)
* [storage_iter_range](_runtime_api_.runtime_api.md#storage_iter_range)
* [storage_read](_runtime_api_.runtime_api.md#storage_read)
* [storage_remove](_runtime_api_.runtime_api.md#storage_remove)
* [storage_usage](_runtime_api_.runtime_api.md#storage_usage)
* [storage_write](_runtime_api_.runtime_api.md#storage_write)
* [used_gas](_runtime_api_.runtime_api.md#used_gas)
* [value_return](_runtime_api_.runtime_api.md#value_return)

## Functions

###  abort

▸ **abort**(`msg_ptr`: u32, `filename_ptr`: u32, `line`: u32, `col`: u32): *void*

*Defined in [runtime_api.ts:83](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/runtime_api.ts#L83)*

**Parameters:**

Name | Type |
------ | ------ |
`msg_ptr` | u32 |
`filename_ptr` | u32 |
`line` | u32 |
`col` | u32 |

**Returns:** *void*

___

###  account_balance

▸ **account_balance**(`balance_ptr`: u64): *void*

*Defined in [runtime_api.ts:45](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/runtime_api.ts#L45)*

**Parameters:**

Name | Type |
------ | ------ |
`balance_ptr` | u64 |

**Returns:** *void*

___

###  attached_deposit

▸ **attached_deposit**(`balance_ptr`: u64): *void*

*Defined in [runtime_api.ts:48](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/runtime_api.ts#L48)*

**Parameters:**

Name | Type |
------ | ------ |
`balance_ptr` | u64 |

**Returns:** *void*

___

###  block_index

▸ **block_index**(): *u64*

*Defined in [runtime_api.ts:35](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/runtime_api.ts#L35)*

**Returns:** *u64*

___

###  current_account_id

▸ **current_account_id**(`register_id`: u64): *void*

*Defined in [runtime_api.ts:20](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/runtime_api.ts#L20)*

**Parameters:**

Name | Type |
------ | ------ |
`register_id` | u64 |

**Returns:** *void*

___

###  gas

▸ **gas**(`gas_amount`: u32): *void*

*Defined in [runtime_api.ts:134](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/runtime_api.ts#L134)*

**Parameters:**

Name | Type |
------ | ------ |
`gas_amount` | u32 |

**Returns:** *void*

___

###  input

▸ **input**(`register_id`: u64): *void*

*Defined in [runtime_api.ts:32](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/runtime_api.ts#L32)*

**Parameters:**

Name | Type |
------ | ------ |
`register_id` | u64 |

**Returns:** *void*

___

###  log_utf16

▸ **log_utf16**(`len`: u64, `ptr`: u64): *void*

*Defined in [runtime_api.ts:80](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/runtime_api.ts#L80)*

**Parameters:**

Name | Type |
------ | ------ |
`len` | u64 |
`ptr` | u64 |

**Returns:** *void*

___

###  log_utf8

▸ **log_utf8**(`len`: u64, `ptr`: u64): *void*

*Defined in [runtime_api.ts:77](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/runtime_api.ts#L77)*

**Parameters:**

Name | Type |
------ | ------ |
`len` | u64 |
`ptr` | u64 |

**Returns:** *void*

___

###  panic

▸ **panic**(): *void*

*Defined in [runtime_api.ts:74](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/runtime_api.ts#L74)*

**Returns:** *void*

___

###  predecessor_account_id

▸ **predecessor_account_id**(`register_id`: u64): *void*

*Defined in [runtime_api.ts:29](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/runtime_api.ts#L29)*

**Parameters:**

Name | Type |
------ | ------ |
`register_id` | u64 |

**Returns:** *void*

___

###  prepaid_gas

▸ **prepaid_gas**(): *u64*

*Defined in [runtime_api.ts:51](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/runtime_api.ts#L51)*

**Returns:** *u64*

___

###  promise_and

▸ **promise_and**(`promise_idx_ptr`: u64, `promise_idx_count`: u64): *u64*

*Defined in [runtime_api.ts:96](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/runtime_api.ts#L96)*

**Parameters:**

Name | Type |
------ | ------ |
`promise_idx_ptr` | u64 |
`promise_idx_count` | u64 |

**Returns:** *u64*

___

###  promise_create

▸ **promise_create**(`account_id_len`: u64, `account_id_ptr`: u64, `method_name_len`: u64, `method_name_ptr`: u64, `arguments_len`: u64, `arguments_ptr`: u64, `amount_ptr`: u64, `gas`: u64): *u64*

*Defined in [runtime_api.ts:90](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/runtime_api.ts#L90)*

**Parameters:**

Name | Type |
------ | ------ |
`account_id_len` | u64 |
`account_id_ptr` | u64 |
`method_name_len` | u64 |
`method_name_ptr` | u64 |
`arguments_len` | u64 |
`arguments_ptr` | u64 |
`amount_ptr` | u64 |
`gas` | u64 |

**Returns:** *u64*

___

###  promise_result

▸ **promise_result**(`result_idx`: u64, `register_id`: u64): *u64*

*Defined in [runtime_api.ts:102](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/runtime_api.ts#L102)*

**Parameters:**

Name | Type |
------ | ------ |
`result_idx` | u64 |
`register_id` | u64 |

**Returns:** *u64*

___

###  promise_results_count

▸ **promise_results_count**(): *u64*

*Defined in [runtime_api.ts:99](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/runtime_api.ts#L99)*

**Returns:** *u64*

___

###  promise_return

▸ **promise_return**(`promise_id`: u64): *void*

*Defined in [runtime_api.ts:105](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/runtime_api.ts#L105)*

**Parameters:**

Name | Type |
------ | ------ |
`promise_id` | u64 |

**Returns:** *void*

___

###  promise_then

▸ **promise_then**(`promise_index`: u64, `account_id_len`: u64, `account_id_ptr`: u64, `method_name_len`: u64, `method_name_ptr`: u64, `arguments_len`: u64, `arguments_ptr`: u64, `amount_ptr`: u64, `gas`: u64): *u64*

*Defined in [runtime_api.ts:93](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/runtime_api.ts#L93)*

**Parameters:**

Name | Type |
------ | ------ |
`promise_index` | u64 |
`account_id_len` | u64 |
`account_id_ptr` | u64 |
`method_name_len` | u64 |
`method_name_ptr` | u64 |
`arguments_len` | u64 |
`arguments_ptr` | u64 |
`amount_ptr` | u64 |
`gas` | u64 |

**Returns:** *u64*

___

###  random_seed

▸ **random_seed**(`register_id`: u64): *void*

*Defined in [runtime_api.ts:61](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/runtime_api.ts#L61)*

**Parameters:**

Name | Type |
------ | ------ |
`register_id` | u64 |

**Returns:** *void*

___

###  read_register

▸ **read_register**(`register_id`: u64, `ptr`: u64): *void*

*Defined in [runtime_api.ts:10](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/runtime_api.ts#L10)*

**Parameters:**

Name | Type |
------ | ------ |
`register_id` | u64 |
`ptr` | u64 |

**Returns:** *void*

___

###  register_len

▸ **register_len**(`register_id`: u64): *u64*

*Defined in [runtime_api.ts:13](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/runtime_api.ts#L13)*

**Parameters:**

Name | Type |
------ | ------ |
`register_id` | u64 |

**Returns:** *u64*

___

###  sha256

▸ **sha256**(`value_len`: u64, `value_ptr`: u64, `register_id`: u64): *void*

*Defined in [runtime_api.ts:64](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/runtime_api.ts#L64)*

**Parameters:**

Name | Type |
------ | ------ |
`value_len` | u64 |
`value_ptr` | u64 |
`register_id` | u64 |

**Returns:** *void*

___

###  signer_account_id

▸ **signer_account_id**(`register_id`: u64): *void*

*Defined in [runtime_api.ts:23](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/runtime_api.ts#L23)*

**Parameters:**

Name | Type |
------ | ------ |
`register_id` | u64 |

**Returns:** *void*

___

###  signer_account_pk

▸ **signer_account_pk**(`register_id`: u64): *void*

*Defined in [runtime_api.ts:26](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/runtime_api.ts#L26)*

**Parameters:**

Name | Type |
------ | ------ |
`register_id` | u64 |

**Returns:** *void*

___

###  storage_has_key

▸ **storage_has_key**(`key_len`: u64, `key_ptr`: u64): *u64*

*Defined in [runtime_api.ts:121](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/runtime_api.ts#L121)*

**Parameters:**

Name | Type |
------ | ------ |
`key_len` | u64 |
`key_ptr` | u64 |

**Returns:** *u64*

___

###  storage_iter_next

▸ **storage_iter_next**(`iterator_id`: u64, `key_register_id`: u64, `value_register_id`: u64): *u64*

*Defined in [runtime_api.ts:130](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/runtime_api.ts#L130)*

**Parameters:**

Name | Type |
------ | ------ |
`iterator_id` | u64 |
`key_register_id` | u64 |
`value_register_id` | u64 |

**Returns:** *u64*

___

###  storage_iter_prefix

▸ **storage_iter_prefix**(`prefix_len`: u64, `prefix_ptr`: u64): *u64*

*Defined in [runtime_api.ts:124](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/runtime_api.ts#L124)*

**Parameters:**

Name | Type |
------ | ------ |
`prefix_len` | u64 |
`prefix_ptr` | u64 |

**Returns:** *u64*

___

###  storage_iter_range

▸ **storage_iter_range**(`start_len`: u64, `start_ptr`: u64, `end_len`: u64, `end_ptr`: u64): *u64*

*Defined in [runtime_api.ts:127](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/runtime_api.ts#L127)*

**Parameters:**

Name | Type |
------ | ------ |
`start_len` | u64 |
`start_ptr` | u64 |
`end_len` | u64 |
`end_ptr` | u64 |

**Returns:** *u64*

___

###  storage_read

▸ **storage_read**(`key_len`: u64, `key_ptr`: u64, `register_id`: u64): *u64*

*Defined in [runtime_api.ts:115](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/runtime_api.ts#L115)*

**Parameters:**

Name | Type |
------ | ------ |
`key_len` | u64 |
`key_ptr` | u64 |
`register_id` | u64 |

**Returns:** *u64*

___

###  storage_remove

▸ **storage_remove**(`key_len`: u64, `key_ptr`: u64, `register_id`: u64): *u64*

*Defined in [runtime_api.ts:118](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/runtime_api.ts#L118)*

**Parameters:**

Name | Type |
------ | ------ |
`key_len` | u64 |
`key_ptr` | u64 |
`register_id` | u64 |

**Returns:** *u64*

___

###  storage_usage

▸ **storage_usage**(): *u64*

*Defined in [runtime_api.ts:38](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/runtime_api.ts#L38)*

**Returns:** *u64*

___

###  storage_write

▸ **storage_write**(`key_len`: u64, `key_ptr`: u64, `value_len`: u64, `value_ptr`: u64, `register_id`: u64): *u64*

*Defined in [runtime_api.ts:112](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/runtime_api.ts#L112)*

**Parameters:**

Name | Type |
------ | ------ |
`key_len` | u64 |
`key_ptr` | u64 |
`value_len` | u64 |
`value_ptr` | u64 |
`register_id` | u64 |

**Returns:** *u64*

___

###  used_gas

▸ **used_gas**(): *u64*

*Defined in [runtime_api.ts:54](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/runtime_api.ts#L54)*

**Returns:** *u64*

___

###  value_return

▸ **value_return**(`value_len`: u64, `value_ptr`: u64): *void*

*Defined in [runtime_api.ts:71](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/runtime_api.ts#L71)*

**Parameters:**

Name | Type |
------ | ------ |
`value_len` | u64 |
`value_ptr` | u64 |

**Returns:** *void*
