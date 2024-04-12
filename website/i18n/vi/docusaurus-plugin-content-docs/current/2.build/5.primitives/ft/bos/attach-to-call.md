```js
const tokenContract = "token.v2.ref-finance.near";
const result = Near.call(
  tokenContract,
  "ft_transfer_call",
  {
    receiver_id: "v2.ref-finance.near",
    amount: "100000000000000000",
    msg: "",
  },
  300000000000000,
  1
);
```

<details>
<summary>Example response</summary>
<p>

```json
'100000000000000000'
```

</p>

</details>
