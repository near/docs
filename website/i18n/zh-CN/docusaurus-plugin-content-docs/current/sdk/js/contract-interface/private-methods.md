---
sidebar_position: 2
title: "Private Methods"
---

# Private Methods

## When Using Callbacks

Usually, when a contract has to have a callback for a remote cross-contract call, this callback method should only be called by the contract itself to avoid someone else calling it and changing the state. A common pattern is to have an assertion that validates that the direct caller (predecessor account ID) matches to the contract's account (current account ID). The `({ privateFunction: true })` decorator simplifies this by making it a single line decorator while improving readability. A common pattern is to have an assertion that validates that the direct caller (predecessor account ID) matches to the contract's account (current account ID). The `({ privateFunction: true })` decorator simplifies this by making it a single line decorator while improving readability.

Use this annotation within the designated contract class with the [`NearBindgen({})` decorator](../contract-structure/near-bindgen.md) as follows:

```js
@call({ privateFunction: true })
my_method({}) {
    // ...
}
}
```

Which is equivalent to:

```js
@call({})
my_method({}) {
    if near.currentAccountId() != near.predecessorAccountId() {
        throw new Error("Method method is private");
    }
    // ...
}
}
```

Now with this annotation, only the account of the contract itself can call this method, either directly or through a promise.

## Writing Internal Methods

Not all functions need to be exposed publicly. It may be beneficial to write private methods for helper or utility functions, for instance. There are three approaches to write internal methods: It may be beneficial to write private methods for helper or utility functions, for instance. There are three approaches to write internal methods:

1. Declare the method without using the `call` or `view` decorators.

```js
helperMethod(a, b) {
  // ...
}
}
```

2. Using an internal helper function in the module scope.

```javascript
// Function that can be called in another JS file
function getFirstName(account) {
  // ...
}
}
```

3. Importing a helper function or class from another module.

Another way of not exporting methods is by having a separate class, that is not marked with `NearBindgen({})`.

```js
import { getFirstName } from "./helpers.js";

@NearBindgen({})
export class Contract {
  // ...
}

class Helpers {
  // ...
}
}

class Helpers {
  // ...
}
```
