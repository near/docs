import {Github} from "@site/src/components/codetabs";

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

All the examples are using a `Wallet` object, which comes from our basic template:

<Github fname="near-wallet.js"
  url="https://github.com/near-examples/hello-near-js/blob/master/frontend/near-wallet.js"
  start="20" end="27" />