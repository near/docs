```bash
near view tkn.near get_required_deposit '{"args":{"owner_id": "bob.near","total_supply": "1000000000","metadata":{"spec": "ft-1.0.0","name": "Test Token","symbol": "TTTEST","icon": "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7","decimals": 18}},"account_id": "bob.near"}' 
```

<details>
<summary>Example response</summary>
<p>

```bash
'2234830000000000000000000'
```

</p>

</details>

And then you can create a token.

```bash
near call tkn.near create_token '{"args":{"owner_id": "bob.near","total_supply": "1000000000","metadata":{"spec": "ft-1.0.0","name": "Test Token","symbol": "TTTEST","icon": "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7","decimals": 18}},"account_id": "bob.near"}' --gas 300000000000000 --depositYocto 2234830000000000000000000 --accountId bob.near
```