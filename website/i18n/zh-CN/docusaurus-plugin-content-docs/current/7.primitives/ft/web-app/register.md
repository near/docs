```js
await wallet.callMethod({
  method: 'storage_deposit',
  args: {
    account_id: 'alice.near',
  },
  contractId: TOKEN_CONTRACT_ADDRESS,
  deposit: 1250000000000000000000
});
```

_The `Wallet` object comes from our [quickstart template](https://github.com/near-examples/hello-near-examples/blob/main/frontend/near-wallet.js)_
