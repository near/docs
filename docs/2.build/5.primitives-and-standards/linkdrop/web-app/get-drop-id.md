

```js
const dropSupplyForOwner = await wallet.viewMethod({
  contractId: KEYPOM_CONTRACT_ADDRESS
  method: 'get_drop_supply_for_owner',
  args: { account_id: accountId },
});

const dropsForOwner = await wallet.viewMethod({
  contractId: KEYPOM_CONTRACT_ADDRESS
  method: 'get_drops_for_owner',
  args: { account_id: accountId, from_index: (dropSupplyForOwner - 1).toString() }
});

const dropId = dropsForOwner[dropsForOwner.length - 1].drop_id;
```

_The `Wallet` object comes from our [quickstart template](https://github.com/near-examples/hello-near-examples/blob/main/frontend/near-wallet.js)_ 