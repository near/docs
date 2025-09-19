```bash
near call nft.primitives.near nft_mint '{"token_id": "1", "receiver_id": "bob.near", "token_metadata": {"title": "NFT Primitive Token", "description": "Awesome NFT Primitive Token", "media": "string"}}' --depositYocto 10000000000000000000000, --accountId bob.near
```