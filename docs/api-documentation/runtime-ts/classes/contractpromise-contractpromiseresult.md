# ContractPromise ContractPromiseResult

## ContractPromise and ContractPromiseResult

## Class: ContractPromise

Class to make asynchronous calls to other contracts and receive callbacks. Here is an example on how to create a new async call with the callback.

```text
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

#### id

**● id**: _`i32`_

_Defined in_ [_near.ts:1294_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1294)

### Methods

#### returnAsResult

▸ **returnAsResult**\(\): `void`

_Defined in_ [_near.ts:1397_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1397)

Returns the promise as a result of your function. Don't return any other results from the function. Your current function should be `void` and shouldn't return anything else. E.g.

```text
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

Now when you call `callMetaNear` method, it creates new promise to `metanear` contract. And saying that the result of the current execution depends on the result `addItem`. Even though this contract is not going to be called with a callback, the contract which calling `callMetaNear` would receive the result from `addItem`. This call essentially acts as a proxy.

You can also attach a callback on top of the promise before returning it, e.g.

```text
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

**Returns:** `void`

#### then

▸ **then**\(methodName: _`string`_, args: _`Uint8Array`_, amount: _`u128`_\): [ContractPromise](https://github.com/nearprotocol/docs/tree/4ea8b871a7a21b7579cbb350f27b4754826d42f8/docs/api-documentation/runtime-ts/classes/_near_.contractpromise.md)

_Defined in_ [_near.ts:1337_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1337)

Creating a callback for the AsyncCall Promise created with `create` method.

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| methodName | `string` | Method name on your contract to be called to receive the callback. NOTE: Your callback method name can start with \`_\`, which would prevent other contracts from calling it directly. Only callbacks can call methods with \`_\` prefix. |
| args | `Uint8Array` | Serialized arguments on your callback method, see \`create\` for details. |
| amount | `u128` | The amount of tokens from the called contract to be sent to the current contract with this call. |

\*\*Returns

#### `<Static>` all

▸ **all**\(promises: [_ContractPromise_](https://github.com/nearprotocol/docs/tree/4ea8b871a7a21b7579cbb350f27b4754826d42f8/docs/api-documentation/runtime-ts/classes/_near_.contractpromise.md)_\[\]_\): [ContractPromise](https://github.com/nearprotocol/docs/tree/4ea8b871a7a21b7579cbb350f27b4754826d42f8/docs/api-documentation/runtime-ts/classes/_near_.contractpromise.md)

_Defined in_ [_near.ts:1407_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1407)

Joins multiple async call promises into one, to aggregate results before the callback. NOTE: Given promises can only be new async calls and can't be callbacks. Joined promise can't be returned as a result

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| promises | [ContractPromise](https://github.com/nearprotocol/docs/tree/4ea8b871a7a21b7579cbb350f27b4754826d42f8/docs/api-documentation/runtime-ts/classes/_near_.contractpromise.md)\[\] | List of async call promises to join. |

\*\*Returns

#### `<Static>` create

▸ **create**\(contractName: _`string`_, methodName: _`string`_, args: _`Uint8Array`_, amount?: _`u128`_\): [ContractPromise](https://github.com/nearprotocol/docs/tree/4ea8b871a7a21b7579cbb350f27b4754826d42f8/docs/api-documentation/runtime-ts/classes/_near_.contractpromise.md)

_Defined in_ [_near.ts:1315_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1315)

Creates a new async call promise. Returns an instance of `ContractPromise`. The call would be scheduled if the this current execution of the contract succeeds without errors or failed asserts.

**Parameters:**

| Name | Type | Default value | Description |
| :--- | :--- | :--- | :--- |
| contractName | `string` | - | Account ID of the remote contract to call. E.g. \`metanear\`. |
| methodName | `string` | - | Method name on the remote contract to call. E.g. \`addItem\`. |
| args | `Uint8Array` | - | Serialized arguments to pass into the method. To get them create a new model specific for the method you calling, e.g. \`AddItemArgs\`. Then create an instance of it and populate arguments. After this, serialize it into bytes. E.g. `let itemArgs: AddItemArgs = { accountId: "alice.near", itemId: "Sword +9000", }; // Serialize args let args = itemArgs.encode();` |
| `Default value` amount | `u128` | 0 | The amount of tokens from your contract to be sent to the remote contract with this call. |

\*\*Returns

#### `<Static>` getResults

▸ **getResults**\(\): [ContractPromiseResult](https://github.com/nearprotocol/docs/tree/4ea8b871a7a21b7579cbb350f27b4754826d42f8/docs/api-documentation/runtime-ts/classes/_near_.contractpromiseresult.md)\[\]

_Defined in_ [_near.ts:1439_](https://github.com/nearprotocol/near-runtime-ts/blob/a2daf13/near.ts#L1439)

Method to receive async \(one or multiple\) results from the remote contract in the callback. Example of using it.

```text
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

\*\*Returns An array of results based on the number of promises the callback was created on. If the callback using `then` was scheduled only on one result, then one result will be returned.


# Class: ContractPromiseResult

Class to store results of the async calls on the remote contracts.

## Hierarchy

**ContractPromiseResult**

## Index

### Properties

* buffer
* status

---

## Properties


###  buffer

**● buffer**: *`Uint8Array`*

*Defined in [contract.ts:319](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/contract.ts#L319)*

___

###  status

**● status**: *`i32`*

*Defined in [contract.ts:316](https://github.com/nearprotocol/near-runtime-ts/blob/8dedca2/assembly/contract.ts#L316)*

___

