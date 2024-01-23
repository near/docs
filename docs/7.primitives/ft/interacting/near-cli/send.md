```bash
near call token.v2.ref-finance.near ft_transfer '{"receiver_id": "alice.near", "amount": "100000000000000000"}' --depositYocto 1 --accountId bob.near
```

<hr class="subsection" />

### Register user

In order to transfer FTs to another account, the receiver account have to be registered in the token contract and make storage deposit. User can register their account or another account can do it for them.

How to check storage balance:

```bash
near view token.v2.ref-finance.near storage_balance_of '{"account_id": "alice.near"}'
```

<details>
<summary>Example response</summary>
<p>

It returns `null` if account is not registered.

```bash
{
  available: '0',
  total: '1250000000000000000000'
}
```

</p>

</details>

How to register another account:

```bash
near call token.v2.ref-finance.near storage_deposit '{"account_id": "alice.near"}' --depositYocto 1250000000000000000000 --accountId bob.near
```

If you need to register your own account just pass `{}` as arguments to call.

<details>
<summary>Example response</summary>
<p>

```bash
{
  available: '0',
  total: '1250000000000000000000'
}
```

</p>

</details>