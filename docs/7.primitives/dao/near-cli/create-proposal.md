```bash
near call primitives.sputnik-dao.near add_proposal '{"proposal": {"description": "My first proposal$$$$https://docs.near.org/", "kind": { "Transfer": {"token_id": "", "receiver_id": "bob.near", "amount": "10000000000000000000000000"}}}}'  --deposit 0.1 --gas 300000000000000 --accountId bob.near
```