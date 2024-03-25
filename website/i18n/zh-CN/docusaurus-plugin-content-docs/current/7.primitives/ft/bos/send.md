```js
const tokenContract = "token.v2.ref-finance.near";
Near.call(
  tokenContract,
  "ft_transfer",
  {
    receiver_id: "alice.near",
    amount: "100000000000000000",
  },
  undefined,
  1
);
```
