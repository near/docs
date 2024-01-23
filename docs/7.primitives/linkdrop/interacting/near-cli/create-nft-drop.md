```bash
near call v2.keypom.near create_drop '{"public_keys": <PUBLIC_KEYS>, "deposit_per_use": "10000000000000000000000", "nft": {"sender_id": "bob.near", "contract_id": "nft.primitives.near"}}' --deposit 23000000000000000000000 --gas 100000000000000 --accountId bob.near
```