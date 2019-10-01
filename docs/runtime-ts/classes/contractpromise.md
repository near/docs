---
id: "contractpromise"
title: "ContractPromise"
sidebar_label: "ContractPromise"
---

Class to make asynchronous calls to other contracts and receive callbacks.
Here is an example on how to create a new async call with the callback.
```
export function callMetaNear(): void {
  let itemArgs: AddItemArgs = {
    accountId: "alice.near",
    itemId: "Sword +9000",s
  };
  let promise = ContractPromise.create(
    "metanear",
    "addItem",
    itemArgs.encode(),
    0,
  );
  // Setting up args for the callback
  let requestArgs: OnItemAddedArgs = {
    "itemAddedRequestId": "UNIQUE_REQUEST_ID",
  };
  let callbackPromise = promise.then(
     "_onItemAdded",
     requestArgs.encode(),
     2,  // Attaching 2 additional requests, in case we need to do another call
  );
  callbackPromise.returnAsResult();
}
```
See docs on used methods for more details.

## Hierarchy

* **ContractPromise**

## Index

### Properties

* [id](contractpromise.md#id)

### Methods

* [returnAsResult](contractpromise.md#returnasresult)
* [then](contractpromise.md#then)
* [all](contractpromise.md#static-all)
* [create](contractpromise.md#static-create)
* [getResults](contractpromise.md#static-getresults)

## Properties

###  id

• **id**: *u64*

*Defined in [contract.ts:121](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/contract.ts#L121)*

## Methods

###  returnAsResult

▸ **returnAsResult**(): *void*

*Defined in [contract.ts:251](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/contract.ts#L251)*

Returns the promise as a result of your function. Don't return any other results from the function.
Your current function should be `void` and shouldn't return anything else. E.g.
```
export function callMetaNear(): void {
  let itemArgs: AddItemArgs = {
    accountId: "alice.near",
    itemId: "Sword +9000",
  };
  let promise = ContractPromise.create(
    "metanear",
    "addItem",
    itemArgs.encode(),
    0,
    0,
  );
  promise.returnAsResult();
}
```

Now when you call `callMetaNear` method, it creates new promise to `metanear` contract.
And saying that the result of the current execution depends on the result `addItem`.
Even though this contract is not going to be called with a callback, the contract which
calling `callMetaNear` would receive the result from `addItem`. This call essentially acts
as a proxy.

You can also attach a callback on top of the promise before returning it, e.g.

```
  ...
  let promise = ContractPromise.create(
     ...
  );
  // Setting up args for the callback
  let requestArgs: OnItemAddedArgs = {
    "itemAddedRequestId": "UNIQUE_REQUEST_ID",
  };
  let callbackPromise = promise.then(
     "_onItemAdded",
     requestArgs.encode(),
     2,  // Attaching 2 additional requests, in case we need to do another call
  );
  callbackPromise.returnAsResult();
}
```

**Returns:** *void*

___

###  then

▸ **then**(`contractName`: string, `methodName`: string, `args`: Uint8Array, `gas`: u64, `amount`: u128): *[ContractPromise](contractpromise.md)*

*Defined in [contract.ts:179](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/contract.ts#L179)*

Creating a callback for the AsyncCall Promise created with `create` method.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`contractName` | string | - | Name of your contract. |
`methodName` | string | - | Method name on your contract to be called to receive the callback.     NOTE: Your callback method name can start with `_`, which would prevent other     contracts from calling it directly. Only callbacks can call methods with `_` prefix. |
`args` | Uint8Array | - | Serialized arguments on your callback method, see `create` for details. |
`gas` | u64 | - | The amount of gas attached to the call. |
`amount` | u128 |  u128.fromU64(0) | The amount of tokens from the called contract to be sent to the current contract with this call.  |

**Returns:** *[ContractPromise](contractpromise.md)*

___

### `Static` all

▸ **all**(`promises`: [ContractPromise](contractpromise.md)[]): *[ContractPromise](contractpromise.md)*

*Defined in [contract.ts:261](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/contract.ts#L261)*

**Parameters:**

Name | Type |
------ | ------ |
`promises` | [ContractPromise](contractpromise.md)[] |

**Returns:** *[ContractPromise](contractpromise.md)*

___

### `Static` create

▸ **create**(`contractName`: string, `methodName`: string, `args`: Uint8Array, `gas`: u64, `amount`: u128): *[ContractPromise](contractpromise.md)*

*Defined in [contract.ts:143](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/contract.ts#L143)*

Creates a new async call promise. Returns an instance of `ContractPromise`.
The call would be scheduled if the this current execution of the contract succeeds
without errors or failed asserts.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`contractName` | string | - | Account ID of the remote contract to call. E.g. `metanear`. |
`methodName` | string | - | Method name on the remote contract to call. E.g. `addItem`. |
`args` | Uint8Array | - | Serialized arguments to pass into the method. To get them create a new model     specific for the method you calling, e.g. `AddItemArgs`. Then create an instance of it     and populate arguments. After this, serialize it into bytes. E.g.     ```     let itemArgs: AddItemArgs = {       accountId: "alice.near",       itemId: "Sword +9000",     };     // Serialize args     let args = itemArgs.encode();     ``` |
`gas` | u64 | - | The amount of gas attached to the call |
`amount` | u128 |  u128.fromU64(0) | The amount of tokens from your contract to be sent to the remote contract with this call.  |

**Returns:** *[ContractPromise](contractpromise.md)*

___

### `Static` getResults

▸ **getResults**(): *[ContractPromiseResult](contractpromiseresult.md)[]*

*Defined in [contract.ts:295](https://github.com/nearprotocol/near-runtime-ts/blob/2617e93/assembly/contract.ts#L295)*

Method to receive async (one or multiple) results from the remote contract in the callback.
Example of using it.
```
// This function is prefixed with `_`, so other contracts or people can't call it directly.
export function _onItemAdded(itemAddedRequestId: string): bool {
  // Get all results
  let results = ContractPromise.getResults();
  let addItemResult = results[0];
  // Verifying the remote contract call succeeded.
  if (addItemResult.success) {
    // Decoding data from the bytes buffer into the local object.
    let data = AddItemResult.decode(addItemResult.buffer);
    if (data.itemPower > 9000) {
      return true;
    }
  }
  return false;
}
```

**Returns:** *[ContractPromiseResult](contractpromiseresult.md)[]*

An array of results based on the number of promises the callback was created on.
    If the callback using `then` was scheduled only on one result, then one result will be returned.
