```bash
near call primitives.sputnik-dao.near act_proposal '{"id": 0, "action": "VoteApprove"}' --gas 300000000000000 --accountId bob.near
```

:::note
Available vote options: `VoteApprove`, `VoteReject`, `VoteRemove`.
:::
