```js
const keypomContract = "v2.keypom.near";
const dropAmount = "10000000000000000000000";

Near.call([
  {
    contractName: keypomContract,
    methodName: "create_drop",
    args: {
      public_keys: state.publicKeys,
      deposit_per_use: dropAmount,
    },
    deposit: "23000000000000000000000", // state.publicKeys.length * dropAmount + 3000000000000000000000,
    gas: "100000000000000",
  },
]);
```
