---
sidebar_position: 1
---

# Unit Tests

You can unit test abstracted logic implemented by smart contract functions like regular JavaScript functions with any testing library of your liking. A simple example would look as follows:

#### Contract
```js   
@NearBindgen({})
export class Contract {
  ...
  doSomething(): string {
    return callSomeFunction();
  }
}
```

#### Unit Test File
```js
describe('Contract', () => {
  it('callSomeFunction should work', () => {
    ...
    results = callSomeFunction();
    // then assert results are what you expect
    ....
  });
});
```

As for testing the smart contract functions themselves, we recommend using [integration tests](./integration-tests.md) instead as they fully replicate the environment on which that logic will run.  