---
id: "PromiseResult"
title: "Enumeration: PromiseResult"
sidebar_label: "PromiseResult"
sidebar_position: 0
custom_edit_url: null
---

A Promise result in near can be one of:
- NotReady = 0 - the promise you are specifying is still not ready, not yet failed nor successful.
- Successful = 1 - the promise has been successfully executed and you can retrieve the resulting value.
- Failed = 2 - the promise execution has failed.

## Enumeration Members

### Failed

• **Failed** = ``2``

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/types/vm_types.ts:19](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/types/vm_types.ts#L19)

___

### NotReady

• **NotReady** = ``0``

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/types/vm_types.ts:17](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/types/vm_types.ts#L17)

___

### Successful

• **Successful** = ``1``

#### Defined in

[near-sdk-js/packages/near-sdk-js/src/types/vm_types.ts:18](https://github.com/near/near-sdk-js/blob/2847870/packages/near-sdk-js/src/types/vm_types.ts#L18)
