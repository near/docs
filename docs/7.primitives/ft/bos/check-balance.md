:::info
Remember about fungible token precision. You may need this value to show a response of balance requests in an understandable-to-user way in your app. How to get precision value (decimals) you may find [above](#get-token-metadata).
:::

```js
const tokenContract = "token.v2.ref-finance.near";
const userTokenBalance = Near.view(tokenContract, "ft_balance_of", {
  account_id: "bob.near",
});
```

<details>
<summary>Example response</summary>
<p>

```json
"3479615037675962643842"
```

</p>

</details>