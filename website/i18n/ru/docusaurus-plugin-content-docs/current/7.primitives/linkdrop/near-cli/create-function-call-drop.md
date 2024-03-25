```bash
near call v2.keypom.near create_drop '{"public_keys": <PUBLIC_KEYS>, "deposit_per_use": "10000000000000000000000", "fcData": {"methods": [[{"receiverId": "nft.primitives.near","methodName": "nft_mint","args": {"token_id": "1", "metadata": {"title": "My NFT drop","description": "","media": ""}, "accountIdField": "receiver_id", "attachedDeposit": "10000000000000000000000"}]]}}' --depositYocto 23000000000000000000000 --gas 100000000000000 --accountId bob.near
```
