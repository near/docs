```bash
near call v2.ref-finance.near swap "{\"actions\": [{\"pool_id\": 79, \"token_in\": \"token.v2.ref-finance.near\", \"amount_in\": \"100000000000000000\", \"token_out\": \"wrap.near\", \"min_amount_out\": \"1\"}]}" --gas 300000000000000 --depositYocto 1
 --accountId bob.near
```

<details>
<summary>Example response</summary>
<p>

```bash
'5019606679394603179450'
```

</p>

</details>