```js
const args = {
  config: {
    name: "Primitives",
    purpose: "Building primitives on NEAR",
    metadata: ""
  },
  policy: ["bob.near"]
};
Near.call(
  "sputnik-dao.near",
  "create",
  {
    name: "primitives",
    args: Buffer.from(JSON.stringify(args)).toString("base64"),
  },
  300000000000000,
  6000000000000000000000000
);
```


:::note
The full list of roles and permissions you can find [here](https://github.com/near-daos/sputnik-dao-contract#roles-and-permissions).
:::