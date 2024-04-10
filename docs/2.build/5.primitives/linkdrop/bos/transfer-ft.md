```js
Near.call([
  {
    contractName: ftContract,
    methodName: "ft_transfer",
    args: {
      receiver_id: keypomContract,
      amount: "1",
    },
    deposit: "1",
    gas: "300000000000000",
  },
]);
```