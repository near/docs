```js
const tokenContract = "token.v2.ref-finance.near";
const tokenPriceResult = fetch(
  `https://indexer.ref.finance/get-token-price?token_id=${tokenContract}`
).body;
const tokenPriceValue = JSON.parse(tokenPriceResult);
```

<details>
<summary>Example response</summary>
<p>

```json
{
  "token_contract_id": "token.v2.ref-finance.near",
  "price": "0.08153090"
}
```

</p>

</details>

:::tip
Ref Finance has a method to [get all token prices at once](https://indexer.ref.finance/list-token-price).
:::
