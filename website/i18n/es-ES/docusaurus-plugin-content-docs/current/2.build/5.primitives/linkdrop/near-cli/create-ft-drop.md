```bash
near call v2.keypom.near create_drop '{"public_keys": <PUBLIC_KEYS>, "deposit_per_use": "10000000000000000000000", "ftData": {"contractId": "ft.primitives.near","senderId": "bob.near", "amount": "1"}}}' --depositYocto 23000000000000000000000 --gas 100000000000000 --accountId bob.near
```
