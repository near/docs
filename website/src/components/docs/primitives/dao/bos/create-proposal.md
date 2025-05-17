```js
Near.call(
  'primitives.sputnik-dao.near',
  'add_proposal',
  {
    proposal: {
      description: 'My first proposal',
      kind: {
        Transfer: {
          token_id: '',
          receiver_id: 'bob.near',
          amount: '10000000000000000000000000',
        },
      },
    },
  },
  300000000000000,
  100000000000000000000000,
);
```
