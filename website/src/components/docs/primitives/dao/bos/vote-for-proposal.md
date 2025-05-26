```js
Near.call(
  'primitives.sputnik-dao.near',
  'act_proposal',
  { id: 0, action: 'VoteApprove' },
  300000000000000,
);
```

:::note
Available vote options: `VoteApprove`, `VoteReject`, `VoteRemove`.
:::
