```js
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

Near.call("tkn.near", "create_token", args, 300000000000000, "2234830000000000000000000");
```
