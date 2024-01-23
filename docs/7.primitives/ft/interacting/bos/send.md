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

<hr class="subsection" />

### Register user

In order to transfer FTs to another account receiver account have to be registered in the token contract and make storage deposit. User can register their account or another account can do it for them.

How to check storage balance:

```js
const aliceStorageBalance = Near.view(tokenContract, "storage_balance_of", {
  account_id: "alice.near",
});
```

<details>
<summary>Example response</summary>
<p>

It returns `null` if account is not registered.

```json
{
  "available": "0",
  "total": "1250000000000000000000"
}
```

</p>

</details>

How to register another account:

```js
const newAliceStorageBalance = Near.call(
  tokenContract,
  "storage_deposit",
  { account_id: "alice.near" },
  undefined,
  1250000000000000000000
);
```

If you need to register your own account just pass `{}` as arguments to call.

<details>
<summary>Example response</summary>
<p>

```json
{
  "available": "0",
  "total": "1250000000000000000000"
}
```

</p>

</details>