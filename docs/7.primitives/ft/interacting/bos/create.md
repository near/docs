```js
const contract = "tkn.near";
const args = {
  args: {
    owner_id: "bob.near",
    total_supply: "1000000000",
    metadata: {
      spec: "ft-1.0.0",
      name: "Test Token",
      symbol: "test",
      icon: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
      decimals: 18,
    },
  },
  account_id: "bob.near",
};
const requiredStorageDeposit = Near.view(
  contract,
  "get_required_deposit",
  args
);
```

<details>
<summary>Example response</summary>
<p>

```json
'2234830000000000000000000'
```

</p>

</details>

Then you can create a token.

```js
Near.call(contract, "create_token", args, 300000000000000, requiredStorageDeposit);
```