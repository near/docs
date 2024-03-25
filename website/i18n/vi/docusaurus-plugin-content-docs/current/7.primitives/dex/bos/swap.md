```js
const ammContract = "v2.ref-finance.near";
const result = Near.call(
  ammContract,
  "swap",
  {
    actions: [
      {
        pool_id: 79,
        token_in: "token.v2.ref-finance.near",
        token_out: "wrap.near",
        amount_in: "100000000000000000",
        min_amount_out: "1",
      },
    ],
  },
  300000000000000,
  1
);
```

<details>
<summary>Example response</summary>

```json
"5019606679394603179450"
```

</details>
